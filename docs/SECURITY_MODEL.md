# GRC Engine — Security Architecture & Access Control Model

Comprehensive specification of **GRC Engine's** cryptographic proof engine, role-based access control (RBAC), multi-tenant data isolation, and privacy-first data sanitization.

---

## 1. Core Security Principles

GRC Engine is built upon five non-negotiable security invariants:

1. **Infrastructure as the Single Source of Truth:** Compliance status is derived strictly from observable, verifiable technical state (e.g., branch protection rules, KMS encryption settings, MFA enforcement), not subjective self-attestation questionnaires.
2. **Deterministic Evaluation (Zero Hallucinations):** Compliance pass/fail logic is 100% mathematical and rule-based. No probabilistic AI determines whether a regulatory control passes or fails.
3. **Cryptographic Proofs & Independent Trust Anchors:** Every ingested configuration snapshot receives a deterministic SHA-256 payload digest over canonical JSON keys and is anchored via an HMAC-signed manifest and append-only ledger independent of the mutable database store.
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

## 3. Cryptographic Evidence Ledger & Verification Architecture

### 3.1 Cryptographic Taxonomy & Mechanism Disambiguation

GRC Engine strictly distinguishes between four distinct cryptographic and storage concepts:

| Mechanism | Definition | Role in GRC Engine | Limitation / Threat Boundary |
| :--- | :--- | :--- | :--- |
| **Cryptographic Digest (SHA-256)** | An unkeyed, deterministic, one-way hash mapping variable data to a 256-bit fingerprint. | Computed over canonically sorted JSON telemetry (`separators=(',', ':')`) to produce `payload_digest`. | Detects payload corruption or unauthorized edits **only if** the digest itself is checked against an independently trusted anchor. Storing a digest adjacent to mutable data does not prevent an attacker from modifying both. |
| **Message Authentication Code (MAC / HMAC-SHA256)** | A keyed cryptographic checksum computed using a shared secret key. | Authenticates the structured Evidence Manifest (`evidence_id`, `organization_id`, `control_id`, `collected_at`, `payload_digest`) using an independent protected signing key (`EVIDENCE_SIGNING_KEY`). | Protects integrity and authenticity against attackers with database write access, provided the signing key is maintained outside the database. |
| **Digital Signature** | An asymmetric cryptographic scheme (e.g. Ed25519, ECDSA P-256) using a private key to sign and public key to verify. | Used for auditor attestation packages, JWT bearer tokens, and external audit manifests. | Requires PKI / key management infrastructure. |
| **Immutable Storage** | Storage architectures where records cannot be modified or deleted once written (append-only ledgers, WORM storage, object lock). | Enforced via an independent append-only hash chain ledger (`evidence_anchors.jsonl`), DB-level ORM immutability event listeners, and API rejection of `PUT`/`PATCH`/`DELETE`. | A SQL table column labeled `status="VERIFIED_IMMUTABLE"` in a mutable relational database is NOT immutable by itself. |

---

### 3.2 Dual-Layer Verification Architecture

To solve the risk where an attacker with database access could alter both `raw_payload_json` and its adjacent `sha256_hash` column, GRC Engine implements a **two-layer trust model**:

```text
[ Raw Telemetry JSON ]
         │
         ▼
[ Key Alphabetical Sorting ] ──► json.dumps(payload, sort_keys=True, separators=(',', ':'))
         │
         ▼
[ SHA-256 Payload Digest ]   ──► hashlib.sha256(canonical_bytes).hexdigest()
         │
         ├───► Layer 1: Payload Digest (Matches raw data against recorded hash)
         │
         ▼
[ Evidence Manifest ]        ──► { evidence_id, org_id, control_id, collected_at, payload_digest }
         │
         ▼
[ Independent Trust Anchor ] ──► HMAC-SHA256(EVIDENCE_SIGNING_KEY, canonical_manifest)
         │                       (Secret key isolated from database store)
         ▼
[ Append-Only Anchor Ledger ]──► Chained to previous anchor hash in append-only storage
```

---

### 3.3 Verification Pipeline (Python Reference)

Verification at `GET /api/v1/evidence/{id}/verify` requires satisfying two independent conditions:

```python
import hmac
import hashlib
import json

def verify_evidence_integrity(
    raw_payload: dict,
    recorded_digest: str,
    manifest: dict,
    manifest_signature: str,
    signing_key: str,
    anchor_ledger
) -> dict:
    """
    Dual-layer verification:
    1. Payload Digest Check: verifies payload hasn't drifted from recorded digest.
    2. Trust Anchor MAC Check: verifies digest & metadata match independent secret.
    """
    # 1. Payload digest verification
    canonical_payload = json.dumps(raw_payload, sort_keys=True, separators=(',', ':'))
    computed_digest = hashlib.sha256(canonical_payload.encode("utf-8")).hexdigest()
    digest_matches = (computed_digest == recorded_digest)

    # 2. Independent trust anchor MAC verification
    canonical_manifest = json.dumps(manifest, sort_keys=True, separators=(',', ':'))
    expected_signature = hmac.new(
        signing_key.encode("utf-8"),
        canonical_manifest.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()
    trust_anchor_verified = hmac.compare_digest(expected_signature, manifest_signature)

    # Record must also exist in append-only anchor chain
    ledger_entry = anchor_ledger.get_anchor(manifest["evidence_id"])
    if not ledger_entry or ledger_entry.get("payload_digest") != recorded_digest:
        trust_anchor_verified = False

    # Valid ONLY if both layers pass
    is_valid = digest_matches and trust_anchor_verified
    return {
        "digest_matches": digest_matches,
        "trust_anchor_verified": trust_anchor_verified,
        "is_valid": is_valid
    }
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
