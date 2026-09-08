# GRC Engine — Control Evaluation Examples & Telemetry Normalization

Real-world end-to-end examples showing raw vendor telemetry ingestion, canonical normalization, deterministic evaluation rules, and tamper-evident evidence output.

---

## Example 1: GitHub Branch Protection Active (`CTL-GH-01`)

### 1.1 Regulatory Mapping
- **SOC 2 Type II:** CC8.1 (Change Management & Authorization)
- **ISO/IEC 27001:2022:** A.8.28 (Secure Coding Principles)
- **CIS Controls v8:** 16.2 (Establish Secure Code Review)

### 1.2 Raw Vendor Telemetry (GitHub REST API)
```json
{
  "url": "https://api.github.com/repos/acme-corp/payments-service/branches/main/protection",
  "protected": true,
  "enforce_admins": {
    "enabled": true
  },
  "required_linear_history": {
    "enabled": true
  },
  "allow_force_pushes": {
    "enabled": false
  },
  "allow_deletions": {
    "enabled": false
  }
}
```

### 1.3 Deterministic Rule Engine Code
```python
def evaluate_branch_protection(raw_telemetry: dict) -> tuple[str, str, int]:
    """
    Evaluates branch protection rule.
    Returns: (status, reason, severity_weight)
    """
    is_protected = raw_telemetry.get("protected", False)
    allow_force = raw_telemetry.get("allow_force_pushes", {}).get("enabled", False)
    enforce_admins = raw_telemetry.get("enforce_admins", {}).get("enabled", False)

    if not is_protected:
        return "FAIL", "Production default branch (main) has zero protection rules enabled.", 15
    if allow_force:
        return "FAIL", "Force pushes are permitted on production branch.", 15
    if not enforce_admins:
        return "WARNING", "Branch protection is active but does not enforce rules on administrators.", 5

    return "PASS", "Strict branch protection is active, force pushes are blocked, and admin enforcement is enabled.", 0
```

### 1.4 Cryptographic Evidence Proof Output
```json
{
  "evidence_code": "EVD-GH-001",
  "control_code": "CTL-GH-01",
  "asset_identifier": "acme-corp/payments-service",
  "source_uri": "https://api.github.com/repos/acme-corp/payments-service/branches/main/protection",
  "sha256_hash": "a819b104928f09d18e7c10b48a01f94c8e718b90192a837482910fa8bc123456",
  "evaluation": {
    "status": "PASS",
    "score_impact": 0,
    "evaluated_at": "2026-09-08T14:30:00Z"
  }
}
```

---

## Example 2: Dual Peer Review Approvals (`CTL-GH-02`) — Detection of a Compliance Gap

### 2.1 Regulatory Mapping
- **SOC 2 Type II:** CC8.1 (Change Management & Dual Control)
- **ISO/IEC 27001:2022:** A.8.32 (Change Management Authorization)

### 2.2 Raw Vendor Telemetry (GitHub REST API)
```json
{
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": false,
    "require_code_owner_reviews": false
  }
}
```

### 2.3 Evaluation Verdict: `FAIL` (Gap Detected)
- **Required Baseline:** `required_approving_review_count >= 2`
- **Observed State:** `required_approving_review_count == 1`
- **Calculated Risk Severity:** `HIGH (10 Points)`

### 2.4 Auto-Generated Finding & Remediation
```json
{
  "finding_code": "FIND-GH-002",
  "canonical_control": "CTL-GH-02",
  "severity": "HIGH",
  "title": "Insufficient Approving Reviews on payment-service",
  "description": "The default branch requires only 1 peer approval. SOC 2 CC8.1 requires dual (2) independent peer reviews before deployment to production.",
  "remediation_action": "Update repository branch protection settings to require at least 2 approving reviews and dismiss stale approvals.",
  "remediation_cli_command": "gh api -X PUT /repos/acme-corp/payment-service/branches/main/protection -F required_pull_request_reviews.required_approving_review_count=2 -F required_pull_request_reviews.dismiss_stale_reviews=true",
  "remediation_terraform": "resource \"github_branch_protection\" \"main\" {\n  repository_id = \"payment-service\"\n  pattern       = \"main\"\n  required_pull_request_reviews {\n    required_approving_review_count = 2\n    dismiss_stale_reviews           = true\n  }\n}"
}
```

---

## Example 3: Secret Scanning & Push Protection (`CTL-GH-03`)

### 3.1 Regulatory Mapping
- **SOC 2 Type II:** CC6.8 (Unauthorized Software & Secret Leakage Prevention)
- **ISO/IEC 27001:2022:** A.5.17 (Authentication Information Protection)
- **NIST CSF 2.0:** PR.AA-01 (Identity & Credential Safeguards)

### 3.2 Raw Vendor Telemetry
```json
{
  "security_and_analysis": {
    "secret_scanning": {
      "status": "enabled"
    },
    "secret_scanning_push_protection": {
      "status": "enabled"
    },
    "dependabot_security_updates": {
      "status": "enabled"
    }
  }
}
```

### 3.3 Evaluation Output & SHA-256 Digest
- **Status:** `PASS`
- **Canonical Hash:** `4f2910ab38c1092e478b0129a8f902c38190e87291a0c764839201bc89104fa2`
- **Reason:** Real-time push protection blocks high-entropy secrets and API tokens from entering git history.

---

## Example 4: AWS KMS Envelope Encryption & 90-Day Key Rotation (`CTL-KMS-01`)

### 4.1 Regulatory Mapping
- **ISO/IEC 27001:2022:** A.8.24 (Use of Cryptography)
- **NIST CSF 2.0:** PR.DS-01 (Data-at-Rest Protection)

### 4.2 Raw Vendor Telemetry (AWS KMS `DescribeKey` & `GetKeyRotationStatus`)
```json
{
  "KeyMetadata": {
    "KeyId": "arn:aws:kms:us-east-1:123456789012:key/b8192a01-44bf-42a1-9a10-09a8b7c6d5e4",
    "KeyUsage": "ENCRYPT_DECRYPT",
    "KeySpec": "SYMMETRIC_DEFAULT",
    "KeyManager": "CUSTOMER",
    "Enabled": true,
    "MultiRegion": false
  },
  "KeyRotationEnabled": true,
  "RotationPeriodInDays": 90
}
```

### 4.3 Evaluation Output
- **Status:** `PASS`
- **Reason:** Customer Managed Key (CMK) uses hardware HSM FIPS 140-3 envelope encryption with automated 90-day cryptographic key rotation.
