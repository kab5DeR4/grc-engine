# GRC Engine — Evaluator & Demo Walkthrough Guide

A step-by-step walkthrough guide to evaluate the full capabilities of **GRC Engine** in under 5 minutes.

---

## 🎯 Quick Links & Demo Credentials

| Target | URL / Location | Purpose |
| :--- | :--- | :--- |
| **Live Interactive Dashboard** | [https://grc-engine.vercel.app](https://grc-engine.vercel.app) | Full cloud UI with live persona toggling |
| **Local Backend API** | `http://127.0.0.1:8000/docs` | Interactive Swagger API documentation |
| **CLI Audit Tool** | `backend/app.py` | Command-line policy & PDF evaluation tool |

### Demo Credentials (For Evaluation)

```text
┌────────────────────────┬─────────────────────────────┬──────────────┬────────────────────────────┐
│ Persona / Role         │ Email                       │ Password     │ Access Scope               │
├────────────────────────┼─────────────────────────────┼──────────────┼────────────────────────────┤
│ 👑 Platform Admin      │ admin@grcengine.com         │ demo123      │ Full sovereign control     │
│ 🛡️ Security Engineer   │ marcus.vance@acmesystems.io │ demo123      │ Scans, drift, remediation  │
│ 🔍 External Auditor    │ sarah.jenkins@ey-audit.com  │ demo123      │ Read-only evidence & export│
│ 📊 Read-Only Viewer    │ maya.patel@acmesystems.io   │ demo123      │ Executive summary views    │
└────────────────────────┴─────────────────────────────┴──────────────┴────────────────────────────┘
```

> 💡 *Note: In the live web dashboard, you can also click **[ TRY DEMO WITHOUT LOGIN ]** or switch personas in 1-click via the top-bar role selector.*

---

## 🧭 Walkthrough Path A: Interactive UI Experience (3 Minutes)

### Step 1: Launch the Studio Dashboard
1. Open [https://grc-engine.vercel.app](https://grc-engine.vercel.app) (or your local `http://localhost:5173`).
2. Click **[ TRY DEMO WITHOUT LOGIN ]** or enter `admin@grcengine.com` / `demo123`.
3. Notice the brutalist architectural layout, live compliance score dial (94/100), and active framework chips.

### Step 2: Test Real-Time Persona Switching
1. In the header bar, click the **Persona Selector** (default: `Platform Admin`).
2. Switch to **External Auditor**:
   - Notice the UI immediately updates to display auditor clearance tags.
   - Destructive actions (e.g. initiating destructive remediation runs or creating API keys) are gracefully restricted with read-only badges.
3. Switch back to **Platform Admin** or **Security Engineer**.

### Step 3: Explore Discovered Infrastructure Assets
1. Navigate to **Integrations** / **Infrastructure**:
   - Inspect connected GitHub repositories (`payments-service`, `auth-core`, `payment-service`).
   - Click on **payments-service** to inspect its real-time telemetry (branch protection rules, required approvals: 2, secret scanning: ENABLED).

### Step 4: Inspect Compliance Gaps & Copy-Paste Remediation
1. Navigate to **Findings**:
   - Locate finding `FIND-GH-002` (*Insufficient Approving Reviews on payment-service*).
   - Click the finding to expand its root cause analysis, affected framework clauses (SOC 2 CC8.1 & ISO 27001 A.8.32), and copy-paste CLI fix script.
   - Click **[ SIMULATE REMEDIATION ]** to observe real-time score adjustment.

### Step 5: Cryptographic Proof Verification in Evidence Vault
1. Navigate to **Evidence Vault**:
   - Inspect the table of immutable SHA-256 artifacts.
   - Select any evidence record and click **[ CRYPTOGRAPHIC INTEGRITY PROOF ]**.
   - Observe the 64-character hex signature computed over canonical JSON telemetry.

### Step 6: Export Auditor Attestation Package
1. Navigate to **Reports**:
   - Review the regulatory compliance matrix covering **SOC 2 Type II, ISO 27001, NIST CSF 2.0, CIS v8, and GDPR**.
   - Click **[ EXPORT AUDIT REPORT (HTML) ]** to download the formal compliance attestation package.

---

## ⚡ Walkthrough Path B: REST API Fast Path (1 Minute via Terminal)

Run these quick curl commands against your running backend (`http://127.0.0.1:8000`):

```bash
# 1. Health check
curl http://127.0.0.1:8000/health

# 2. Authenticate
curl -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@grcengine.com", "password": "demo123"}'

# 3. List regulatory frameworks
curl http://127.0.0.1:8000/api/v1/controls/frameworks

# 4. Trigger an instant compliance scan
curl -X POST http://127.0.0.1:8000/api/v1/scans/trigger \
  -H "Content-Type: application/json" \
  -d '{"target_scope": "REPOSITORIES"}'

# 5. Fetch executive compliance summary
curl http://127.0.0.1:8000/api/v1/reports/summary
```

---

## 🖥️ Walkthrough Path C: Local CLI Policy Audit

To audit a security policy directly from the terminal:

```bash
cd backend
python app.py
```
1. When prompted, enter path to a policy PDF (or press enter for built-in sample).
2. The CLI executes deterministic regex control matching, flags gaps, computes risk scores (0–100), and outputs `reports/audit_report.html` and `reports/audit_report.json`.
