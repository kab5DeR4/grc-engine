# GRC Engine — Security Architecture & Access Control Model

Comprehensive specification of **GRC Engine's** cryptographic proof engine, role-based access control (RBAC), multi-tenant data isolation, and privacy-first data sanitization.

---

## 1. Core Security Principles

GRC Engine is built upon five non-negotiable security invariants:

1. **Infrastructure as the Single Source of Truth:** Compliance status is derived strictly from observable, verifiable technical state (e.g., branch protection rules, KMS encryption settings, MFA enforcement), not subjective self-attestation questionnaires.
2. **Deterministic Evaluation (Zero Hallucinations):** Compliance pass/fail logic is 100% mathematical and rule-based. No probabilistic AI determines whether a regulatory control passes or fails.
3. **Cryptographic Proofs & Tamper-Evident Ledgers:** Every ingested configuration snapshot is hashed using SHA-256 over canonically sorted JSON keys to guarantee audit-trail immutability.
4. **Privacy-First Data Sanitization:** Only metadata required for compliance evaluation is extracted. Repository code contents, proprietary algorithms, and sensitive database values are never transmitted, ingested, or stored.
5. **Strict Multi-Tenant Isolation:** Multi-tenancy is enforced natively at the database and API query layer using organization-scoped foreign keys.

---

## 2. Role-Based Access Control (RBAC) Framework

The platform defines four specialized operator personas designed for enterprise security and audit workflows:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        CLEARANCE HIERARCHY                             │
├────────────────────────┬─────────┬─────────────────────────────────────┤
│ Persona / Role         │ Level   │ Operational Scope                   │
├────────────────────────┼─────────┼─────────────────────────────────────┤
│ PLATFORM_ADMIN         │ Level 5 │ Root Sovereign: Full system control │
│ SECURITY_ENGINEER      │ Level 4 │ SecOps: Scan execution & fixes      │
│ EXTERNAL_AUDITOR       │ Level 2 │ Attestation: Read & report export   │
│ READ_ONLY_VIEWER       │ Level 1 │ Governance: Read-only dashboards    │
└────────────────────────┴─────────┴─────────────────────────────────────┘
```

### 2.1 Permission Matrix

| Feature / Action | Platform Admin | Security Engineer | External Auditor | Read-Only Viewer |
| :--- | :---: | :---: | :---: | :---: |
| **Run Compliance Scans** (`run_scans`) | ✅ Allowed | ✅ Allowed | ❌ Restricted | ❌ Restricted |
| **Simulate Remediation** (`simulate_remediation`) | ✅ Allowed | ✅ Allowed | ❌ Restricted | ❌ Restricted |
| **View Evidence Vault** (`view_evidence`) | ✅ Allowed | ✅ Allowed | 🔍 Read Only | 🔍 Read Only |
| **Export Attestation PDF/HTML** (`export_pdf`) | ✅ Allowed | ✅ Allowed | ✅ Allowed | ❌ Restricted |
| **Manage API Keys & Integrations** (`manage_api_keys`) | ✅ Allowed | ❌ Restricted | ❌ Restricted | ❌ Restricted |
| **Modify Workspace Settings** (`manage_workspace`) | ✅ Allowed | ❌ Restricted | ❌ Restricted | ❌ Restricted |

---

## 3. Cryptographic Evidence Ledger & Verification

### 3.1 Canonical Payload Hashing Pipeline

To prevent JSON key ordering anomalies from altering hash outputs across different programming languages or JSON parsers, GRC Engine enforces **Canonical JSON Serialization**:

```text
[ Raw Telemetry JSON ]
         │
         ▼
[ Key Alphabetical Sorting ] ──► json.dumps(payload, sort_keys=True, separators=(',', ':'))
         │
         ▼
[ UTF-8 Byte Stream ]
         │
         ▼
[ SHA-256 Digest Computation ] ──► hashlib.sha256(bytes).hexdigest()
         │
         ▼
[ 64-Hex Cryptographic Proof ] ──► e3b0c44298fc1c149afbf4c8996fb92427ae41e4...
```

### 3.2 Verification Algorithm (Python Reference)

```python
import hashlib
import json

def verify_evidence_artifact(raw_payload: dict, recorded_sha256: str) -> bool:
    """
    Deterministically computes SHA-256 hash of canonical JSON payload
    and asserts match against immutable recorded hash.
    """
    canonical_json_str = json.dumps(raw_payload, sort_keys=True)
    computed_hash = hashlib.sha256(canonical_json_str.encode("utf-8")).hexdigest()
    return computed_hash == recorded_sha256
```

---

## 4. Secret & Credential Management

- **Storage:** Infrastructure provider tokens (GitHub PATs, AWS IAM access keys) are encrypted using AES-256 before database insertion.
- **Masking:** API endpoints strictly return masked token prefixes: `ghp_live_9a7f****************************e2b4`. Full plaintext secrets are never returned in HTTP payloads or WebSocket feeds.
- **Logging Sanitization:** All server logging handlers intercept request headers and query parameters, replacing sensitive fields (`Authorization`, `token`, `password`, `secret`) with `[REDACTED]`.

---

## 5. Multi-Tenant Data Isolation

The data model enforces strict hierarchical isolation:

```text
Organization (Root Tenant)
   └── Workspace (e.g. Production Vault)
         ├── Integrations (GitHub, AWS)
         ├── Assets (Repositories, S3 Buckets, IAM Roles)
         │     ├── Evaluation Results
         │     ├── Findings (Gaps)
         │     └── Evidence Artifacts (SHA-256 Proofs)
         └── Audit Logs (Genesis Chain)
```

Every database query in the FastAPI API router filters by `organization_id`:

```python
# Guaranteed tenant isolation at ORM layer
query = select(Asset).where(Asset.organization_id == current_user.organization_id)
```

---

## 6. Authentication & Session Security

- **Password Hashing:** Industry-standard **Bcrypt** with dynamic salt rounds (cost factor: 12) for resistance against offline GPU/ASIC dictionary attacks.
- **Access Tokens:** Signed **JSON Web Tokens (JWT)** using HMAC-SHA256 (`HS256`) with strict signature validation and expiration (`ACCESS_TOKEN_EXPIRE_MINUTES`).
- **Hardware Token (WebAuthn / FIDO2) Support:** Production configurations support hardware security keys (YubiKey 5C NFC, Apple Secure Enclave / Touch ID) for multi-factor authentication enforcement.
