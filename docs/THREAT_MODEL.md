# GRC Engine — Threat Model & Security Architecture Analysis

> **Methodology:** STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) + DREAD Risk Scoring  
> **Scope:** Web Application, API Gateway, Infrastructure Connectors, Deterministic Rule Engine, Cryptographic Evidence Vault, and PostgreSQL/SQLite Database Layer.  
> **Version:** 1.0.0 (Production Hardened)

---

## 1. System Architecture & Trust Boundaries

GRC Engine ingests sensitive infrastructure configuration state from third-party cloud providers (GitHub, AWS, Azure, GCP) to evaluate regulatory compliance and generate tamper-evident attestation records.

```text
                                  TRUST BOUNDARY 1: PUBLIC INTERNET
                                                │
[ External Auditor / Dev / Admin ] ─────────────┼────────► [ HTTPS / Reverse Proxy ]
                                                │                    │
                                                │                    ▼
                                                │        ┌─────────────────────────┐
                                                │        │  FastAPI Gateway (v1)   │
                                                │        │  - JWT Bearer Validator │
                                                │        │  - RBAC Policy Gate     │
                                                │        │  - Request Rate Limiter │
                                                │        └───────────┬─────────────┘
                                                │                    │
                   TRUST BOUNDARY 2: BACKEND APPLICATION CORE        │
 ────────────────────────────────────────────────────────────────────┼──────────────
                                                                     ▼
                        ┌────────────────────────────────────────────────────────┐
                        │ GRC Engine Business Services                          │
                        │ ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ │
                        │ │ Ingest Manager │ │ Normalizer Svc │ │ Rule Engine  │ │
                        │ └───────┬────────┘ └────────┬───────┘ └──────┬───────┘ │
                        │         │                   │                │         │
                        │ ┌───────┴────────┐ ┌────────┴───────┐ ┌──────┴───────┐ │
                        │ │ Evidence Vault │ │ Drift Detector │ │ Report Gen   │ │
                        │ └────────────────┘ └────────────────┘ └──────────────┘ │
                        └───────────────────────────┬────────────────────────────┘
                                                    │
                   TRUST BOUNDARY 3: PERSISTENCE & SECRETS
 ────────────────────────────────────────────────────────────────────┼──────────────
                                                    ▼
                        ┌────────────────────────────────────────────────────────┐
                        │ Storage Tier (Isolated Per Tenant)                     │
                        │ - Encrypted Credentials (AES-256-GCM / KMS)            │
                        │ - SHA-256 Tamper-Evident Evidence Vault                │
                        │ - Immutable Audit Trail Ledger                         │
                        └────────────────────────────────────────────────────────┘
```

---

## 2. Threat Actor Taxonomy

| Actor Profile | Motivation | Capability | Typical Attack Vectors |
| :--- | :--- | :--- | :--- |
| **External Attacker** | Data breach, service disruption, ransomware | Medium to High | Token brute-forcing, API abuse, dependency vulnerabilities, MITM. |
| **Compromised Provider Credential** | Unauthorized lateral movement via stolen PAT/IAM key | High | Replay attacks, unauthorized scans, repo data harvesting. |
| **Malicious Insider / Rogue Operator** | Falsifying audit records to pass SOC 2 / ISO 27001 | High | Tampering with evaluation findings, altering evidence payloads in DB. |
| **Cross-Tenant Adversary** | Espionage into neighboring organization data | High | Insecure Direct Object References (IDOR), SQL injection, tenant leak. |

---

## 3. STRIDE Threat Analysis by Component

### 3.1 API Gateway & Authentication Service

| STRIDE Category | Threat Description | Severity (DREAD) | Implemented Mitigation | Verification Mechanism |
| :--- | :--- | :---: | :--- | :--- |
| **Spoofing** | Adversary forges JWT tokens using weak secret or algorithm confusion (`none` algorithm). | **Critical (8.8)** | Strict HMAC-SHA256 signature verification with high-entropy secret; token expiration enforced; algorithm whitelist (`HS256` only). | `test_auth.py::test_create_access_token` |
| **Tampering** | Replay of expired authentication tokens or intercepted request parameters. | **High (7.2)** | Short-lived access tokens (60 min default); TLS 1.3 enforced; unique request timestamps in audit headers. | `test_auth.py::test_register_and_login_flow` |
| **Repudiation** | Operator performs administrative actions (e.g. resolving a finding or modifying RBAC) and denies it. | **Medium (5.4)** | Genesis-chained `AuditLog` records containing immutable actor ID, IP address, timestamp, and SHA-256 verification hash. | `models/audit.py`, `test_scans_and_reports.py` |
| **Information Disclosure** | Verbose server stack traces exposing database queries or internal file paths. | **High (7.0)** | Global FastAPI exception handlers intercepting raw errors and returning sanitised RFC-7807 JSON errors without leaking internals. | `server.py::general_exception_handler` |
| **Denial of Service** | Volumetric HTTP requests exhausting database connection pool or CPU workers. | **High (7.4)** | Process time monitoring headers, connection pooling with overflow limits, reverse-proxy rate limiting (100 req/min). | `server.py::add_process_time_header` |
| **Elevation of Privilege** | Read-only viewer accessing `/api/v1/integrations/github/connect` or resolving findings. | **Critical (8.6)** | Role-Based Access Control (RBAC) dependency gates (`PLATFORM_ADMIN`, `SECURITY_ENGINEER`, `EXTERNAL_AUDITOR`, `READ_ONLY_VIEWER`). | `api/deps.py`, `frontend/src/data/demo/rbac.js` |

---

### 3.2 Infrastructure Connector Layer (GitHub / AWS)

| STRIDE Category | Threat Description | Severity (DREAD) | Implemented Mitigation | Verification Mechanism |
| :--- | :--- | :---: | :--- | :--- |
| **Information Disclosure** | Personal Access Tokens (PATs) or AWS Access Keys logged in plain text. | **Critical (9.0)** | Tokens are masked in API responses (`ghp_live_9a7f****************************e2b4`); excluded from server log strings. | `connectors/github.py`, `api/v1/endpoints/integrations.py` |
| **Spoofing** | Mock connector injected in production environment to fabricate false compliance passes. | **High (8.0)** | Explicit `is_mock` flag logged with clear visual audit badges; production mode rejects empty credentials. | `connectors/__init__.py::get_connector` |
| **Tampering** | Man-in-the-Middle altering GitHub REST API responses to hide failing branch protection. | **Critical (8.4)** | Strict HTTPS with modern cipher suites and TLS certificate validation via `httpx` async client. | `connectors/github.py` |
| **Denial of Service** | GitHub API Rate Limit exhaustion halting continuous compliance monitoring. | **Medium (6.2)** | Connector inspects `X-RateLimit-Remaining` headers; implements exponential backoff and rate limit telemetry caching. | `connectors/base.py`, `test_connectors.py` |

---

### 3.3 Evidence Vault & Cryptographic Ledger

| STRIDE Category | Threat Description | Severity (DREAD) | Implemented Mitigation | Verification Mechanism |
| :--- | :--- | :---: | :--- | :--- |
| **Tampering** | Database administrator directly edits `evidence_artifacts.raw_payload_json` to turn FAIL into PASS. | **Critical (9.2)** | Every evidence record stores a cryptographically independent SHA-256 digest calculated over canonically sorted JSON keys. The `/verify` endpoint detects any payload alteration. | `test_controls_and_evidence.py::test_evidence_verification_endpoint` |
| **Repudiation** | Attestation package exported for auditors lacks verifiable authenticity proof. | **High (7.8)** | HTML and JSON reports include cryptographic proof manifests with SHA-256 hash digests and generator version metadata. | `report_generator.py`, `docs/SAMPLE_EVIDENCE.json` |

---

## 4. DREAD Scoring Breakdown

The DREAD model scores risks from 1–10 across five dimensions:
- **D**amage Potential
- **R**eproducibility
- **E**xploitability
- **A**ffected Users
- **D**iscoverability

$$\text{Risk Score} = \frac{D + R + E + A + D}{5}$$

```text
┌────────────────────────────────────────┬───┬───┬───┬───┬───┬───────┬──────────┐
│ Threat Scenario                        │ D │ R │ E │ A │ D │ Score │ Rating   │
├────────────────────────────────────────┼───┼───┼───┼───┼───┼───────┼──────────┤
│ Evidence Payload DB Tampering          │ 9 │ 9 │ 8 │ 10│ 10│  9.2  │ CRITICAL │
│ Unencrypted Token Leakage              │ 9 │ 9 │ 8 │ 10│ 9 │  9.0  │ CRITICAL │
│ JWT Secret Forgery / Algorithm Swap    │ 9 │ 9 │ 8 │ 10│ 8 │  8.8  │ CRITICAL │
│ Unauthorized Finding Resolution (IDOR) │ 8 │ 9 │ 8 │ 9 │ 9 │  8.6  │ HIGH     │
│ In-Transit MITM Telemetry Alteration   │ 8 │ 8 │ 8 │ 9 │ 9 │  8.4  │ HIGH     │
│ GitHub API Rate Limit DoS              │ 6 │ 7 │ 6 │ 6 │ 6 │  6.2  │ MEDIUM   │
└────────────────────────────────────────┴───┴───┴───┴───┴───┴───────┴──────────┘
```

---

## 5. Security Controls & Defensive Invariants

1. **Deterministic Immutability Invariant:** Once an evidence artifact is generated, its SHA-256 digest is permanently bound to its raw payload. Any subsequent mutation of the database row invalidates `GET /api/v1/evidence/{id}/verify`.
2. **Zero-Trust Telemetry Invariant:** External connector data is parsed through strict Pydantic DTOs before entering the evaluation pipeline. No unstructured inputs can execute arbitrary code.
3. **Tenant Isolation Invariant:** All SQLAlchemy queries filter explicitly by `organization_id`. Cross-tenant record access is strictly rejected at the ORM query layer.
4. **Credential Privacy Invariant:** Vendor secrets (PATs, access keys) are never stored in plain text, never returned in full in API responses, and never printed to server log streams.
