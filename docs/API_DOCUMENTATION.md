# GRC Engine — REST API Documentation

Comprehensive API reference for the **GRC Engine** backend platform.

---

## 1. Overview & Base Configuration

| Environment | Base URL | Documentation URL |
| :--- | :--- | :--- |
| **Local Development** | `http://127.0.0.1:8000` | `http://127.0.0.1:8000/docs` |
| **API Version** | `v1` (`/api/v1`) | `http://127.0.0.1:8000/api/v1/openapi.json` |
| **Interactive Redoc** | — | `http://127.0.0.1:8000/redoc` |

### Global Headers & Auth
- **Content-Type:** `application/json` (or `multipart/form-data` for policy PDF uploads)
- **Authorization:** `Bearer <JWT_ACCESS_TOKEN>` for protected routes
- **Rate Limits:** 100 requests/minute for unauthenticated endpoints; 1000 requests/minute for authenticated tokens.

---

## 2. Authentication Endpoints (`/api/v1/auth`)

### 2.1 Register Initial Admin & Organization
Creates an organization tenant and root `PLATFORM_ADMIN` user account.

- **Method / Path:** `POST /api/v1/auth/register`
- **Authentication:** None required

#### Request Body
```json
{
  "email": "ciso@acmesystems.io",
  "password": "SecurePassword987!",
  "full_name": "Elena Rostova",
  "organization_name": "Acme Systems Global"
}
```

#### Response (`200 OK`)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "7bf3ad92-f041-48f8-b391-7299a9a30489",
    "email": "ciso@acmesystems.io",
    "full_name": "Elena Rostova",
    "role": "PLATFORM_ADMIN",
    "organization_id": "99b9cf2a-7182-4aa8-9f1c-62b881372551"
  }
}
```

#### cURL Example
```bash
curl -X POST http://127.0.0.1:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ciso@acmesystems.io",
    "password": "SecurePassword987!",
    "full_name": "Elena Rostova",
    "organization_name": "Acme Systems Global"
  }'
```

---

### 2.2 Authenticate & Obtain JWT
- **Method / Path:** `POST /api/v1/auth/login`
- **Authentication:** None required

#### Request Body
```json
{
  "email": "admin@grcengine.com",
  "password": "demo123"
}
```

#### Response (`200 OK`)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "USR-8901",
    "email": "admin@grcengine.com",
    "full_name": "Roshan Nale",
    "role": "PLATFORM_ADMIN",
    "organization_id": "ORG-ACME-01"
  }
}
```

---

### 2.3 Fetch Current Operator Profile
- **Method / Path:** `GET /api/v1/auth/me`
- **Authentication:** `Bearer <JWT_ACCESS_TOKEN>`

#### Response (`200 OK`)
```json
{
  "id": "USR-8901",
  "email": "admin@grcengine.com",
  "full_name": "Roshan Nale",
  "role": "PLATFORM_ADMIN",
  "organization_id": "ORG-ACME-01"
}
```

---

## 3. Infrastructure Integrations (`/api/v1/integrations`)

### 3.1 Test GitHub Connection (PAT or Sandbox)
Pre-flight reachability and permission verification without database mutation.

- **Method / Path:** `POST /api/v1/integrations/github/test`
- **Authentication:** Optional

#### Request Body
```json
{
  "integration_type": "GITHUB",
  "credentials": {
    "token": "ghp_liveTokenHereOptional"
  },
  "config_options": {},
  "is_mock": true
}
```

#### Response (`200 OK`)
```json
{
  "success": true,
  "message": "Successfully connected to Mock GitHub Provider (ACME Corp Sandbox).",
  "identity": {
    "login": "acme-security-bot",
    "name": "ACME Security Automation Bot",
    "id": 992014,
    "html_url": "https://github.com/acme-corp",
    "scopes": ["repo", "read:org", "security_events"]
  },
  "rate_limit": {
    "limit": "5000",
    "remaining": "4995",
    "reset": "1725540000"
  }
}
```

---

### 3.2 Connect Infrastructure Provider
Validates connectivity, encrypts credentials, and creates active integration record.

- **Method / Path:** `POST /api/v1/integrations/github/connect`
- **Authentication:** `Bearer <JWT_ACCESS_TOKEN>` (Optional for demo)

#### Request Body
```json
{
  "integration_type": "GITHUB",
  "name": "Production GitHub Organization",
  "credentials": {
    "token": "ghp_xxxxxxxxxxxxxxxxxxxx"
  },
  "config_options": {
    "org_name": "acme-corp",
    "auto_discover": true
  },
  "is_mock": true
}
```

---

### 3.3 List Active Integrations
- **Method / Path:** `GET /api/v1/integrations`

#### Response (`200 OK`)
```json
[
  {
    "id": "c1f7a01e-4509-4781-8072-bb2893d987a1",
    "organization_id": "ORG-ACME-01",
    "provider_type": "github",
    "name": "Production GitHub Organization",
    "category": "CI/CD",
    "status": "CONNECTED",
    "telemetry_summary": {
      "verified": true,
      "identity": { "login": "acme-security-bot" }
    },
    "last_sync_at": "2026-09-08T14:30:00Z",
    "created_at": "2026-09-08T12:00:00Z"
  }
]
```

---

## 4. Discovered Assets & Infrastructure Inventory (`/api/v1/assets`)

### 4.1 List Discovered Infrastructure Assets
- **Method / Path:** `GET /api/v1/assets`
- **Query Parameters:**
  - `asset_type` (Optional): Filter by `github_repository`, `aws_s3_bucket`, `aws_iam_role`.

#### Response (`200 OK`)
```json
[
  {
    "id": "a910bf22-9981-4209-90b1-12cfa7893012",
    "organization_id": "ORG-ACME-01",
    "integration_id": "c1f7a01e-4509-4781-8072-bb2893d987a1",
    "asset_type": "github_repository",
    "name": "payments-service",
    "identifier": "acme-corp/payments-service",
    "criticality": "TIER_1",
    "is_monitored": true,
    "compliance_score": 100.0,
    "raw_metadata": {
      "default_branch": "main",
      "visibility": "private",
      "owner": "acme-corp"
    },
    "created_at": "2026-09-08T12:05:00Z"
  }
]
```

---

## 5. Compliance Controls & Framework Catalog (`/api/v1/controls`)

### 5.1 List Supported Regulatory Frameworks
- **Method / Path:** `GET /api/v1/controls/frameworks`

#### Response (`200 OK`)
```json
[
  {
    "id": "fw-soc2-id",
    "code": "SOC2",
    "name": "SOC 2 Type II (Trust Services Criteria)",
    "version": "2022",
    "description": "AICPA Trust Services Criteria for Security, Availability, and Confidentiality.",
    "requirements": [
      {
        "id": "req-cc81-id",
        "clause_id": "CC8.1",
        "title": "Change Management & Peer Review",
        "description": "Requires formal authorization, testing, and independent peer review prior to release.",
        "category": "Change Management"
      }
    ]
  }
]
```

---

### 5.2 List Canonical Control Definitions
- **Method / Path:** `GET /api/v1/controls/definitions`

#### Response (`200 OK`)
```json
[
  {
    "id": "ctrl-gh-01-id",
    "code": "CTL-GH-01",
    "name": "Default Branch Protection Active",
    "category": "CI/CD & Source Code",
    "description": "Production default branch (main/master) enforces branch protection rules preventing direct force pushes.",
    "default_severity": "CRITICAL",
    "severity_weight": 15,
    "provider_type": "github",
    "telemetry_spec": "PROTECTED: TRUE"
  }
]
```

---

## 6. Findings & Gap Remediation (`/api/v1/findings`)

### 6.1 List Findings & Drift Gaps
- **Method / Path:** `GET /api/v1/findings`
- **Query Parameters:**
  - `status` (Optional): `OPEN`, `RESOLVED`, `SUPPRESSED`
  - `severity` (Optional): `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`

#### Response (`200 OK`)
```json
[
  {
    "id": "find-01-uuid",
    "organization_id": "ORG-ACME-01",
    "asset_id": "asset-uuid",
    "canonical_control_id": "ctrl-gh-02-uuid",
    "finding_code": "FIND-GH-002",
    "title": "Insufficient Peer Review Approvals on payments-service",
    "description": "payments-service repository requires only 1 approving review instead of minimum 2.",
    "severity": "HIGH",
    "status": "OPEN",
    "remediation_action": "Update branch protection rule on main branch to require 2 approving reviews.",
    "remediation_snippet": "gh api -X PUT /repos/acme-corp/payments-service/branches/main/protection -F required_pull_request_reviews.required_approving_review_count=2",
    "created_at": "2026-09-08T12:00:00Z",
    "updated_at": "2026-09-08T12:00:00Z"
  }
]
```

---

### 6.2 Mark Finding as Resolved
- **Method / Path:** `POST /api/v1/findings/{finding_id}/resolve`

#### Response (`200 OK`)
```json
{
  "id": "find-01-uuid",
  "status": "RESOLVED",
  "updated_at": "2026-09-08T14:40:00Z"
}
```

---

## 7. Tamper-Evident Evidence Vault (`/api/v1/evidence`)

### 7.1 List Evidence Proof Artifacts
- **Method / Path:** `GET /api/v1/evidence`

#### Response (`200 OK`)
```json
[
  {
    "id": "ev-artifact-uuid",
    "organization_id": "ORG-ACME-01",
    "scan_id": "scan-job-uuid",
    "asset_id": "asset-uuid",
    "control_definition_id": "ctrl-gh-01-uuid",
    "sha256_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "source_uri": "https://api.github.com/repos/acme-corp/payments-service/branches/main/protection",
    "created_at": "2026-09-08T12:00:00Z"
  }
]
```

---

### 7.2 Cryptographically Verify Evidence Hash
Recalculates deterministic SHA-256 hash of raw JSON telemetry payload stored in database and asserts match against recorded ledger digest.

- **Method / Path:** `GET /api/v1/evidence/{evidence_id}/verify`

#### Response (`200 OK`)
```json
{
  "id": "ev-artifact-uuid",
  "recorded_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "computed_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "is_valid": true,
  "verified_at": "2026-09-08T14:45:00Z"
}
```

---

## 8. Continuous Scans & Job Triggering (`/api/v1/scans`)

### 8.1 Trigger Compliance Scan
- **Method / Path:** `POST /api/v1/scans/trigger`

#### Request Body
```json
{
  "target_scope": "REPOSITORIES"
}
```

#### Response (`200 OK`)
```json
{
  "id": "scan-9021-uuid",
  "organization_id": "ORG-ACME-01",
  "status": "PENDING",
  "target_scope": "REPOSITORIES",
  "assets_scanned_count": 0,
  "controls_evaluated_count": 0,
  "findings_count": 0,
  "started_at": "2026-09-08T14:48:00Z",
  "completed_at": null
}
```

---

## 9. Executive Reports & Attestation Packages (`/api/v1/reports`)

### 9.1 Get Executive Compliance Summary Metrics
- **Method / Path:** `GET /api/v1/reports/summary`

#### Response (`200 OK`)
```json
{
  "compliance_score": 94,
  "total_assets": 8,
  "open_findings_count": 2,
  "evidence_proofs_count": 14,
  "frameworks_evaluated": [
    "SOC 2 Type II",
    "ISO/IEC 27001:2022",
    "NIST Cybersecurity Framework 2.0",
    "CIS Critical Security Controls v8"
  ],
  "generated_at": "2026-09-08T14:50:00Z"
}
```

---

### 9.2 Export Formal Attestation HTML Report
- **Method / Path:** `POST /api/export-report`
- **Produces:** `text/html; charset=utf-8` (Downloadable HTML file)

---

## 10. Status Codes & Error Formatting

All error responses adhere to standard RFC-7807 JSON error bodies:

```json
{
  "detail": "Descriptive explanation of the validation or domain error.",
  "error_code": 404
}
```

| HTTP Status | Meaning | Scenario |
| :--- | :--- | :--- |
| `200 OK` | Success | Request succeeded and body returned. |
| `400 Bad Request` | Client Error | Malformed payload or missing required parameter. |
| `401 Unauthorized` | Auth Failure | Missing or expired JWT Bearer token. |
| `403 Forbidden` | RBAC Denied | Operator role lacks permission for action. |
| `404 Not Found` | Resource Missing | Specified ID was not found in tenant database. |
| `422 Unprocessable Entity` | Validation Error | Request failed Pydantic schema validation. |
| `500 Internal Error` | Server Error | Unhandled backend exception (logged with stack trace). |
