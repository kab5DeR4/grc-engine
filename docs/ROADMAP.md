# GRC Engine — Engineering Roadmap & Release Milestones

Strategic architectural roadmap for **GRC Engine**, tracking delivered capabilities and future engineering milestones.

---

## 🗺️ Milestone Overview

```text
2026 Q3 (v1.0)           2026 Q4 (v1.1)           2027 Q1 (v1.2)           2027 Q2 (v2.0)
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ v1.0.0 BASELINE │ ───► │ CLOUD & REGO    │ ───► │ REAL-TIME DRIFT │ ───► │ ENTERPRISE SOV. │
│ - FastAPI v1    │      │ - AWS Connector │      │ - Webhooks Ingest│     │ - Azure / GCP   │
│ - GitHub PAT/Mock│     │ - OPA / Rego    │      │ - Auto-Fix PRs  │      │ - Air-Gapped K8s│
│ - SHA-256 Ledger│      │ - PDF Exporter  │      │ - SIEM Connect  │      │ - Hardware HSM  │
└─────────────────┘      └─────────────────┘      └─────────────────┘      └─────────────────┘
```

---

## ✅ Version 1.0.0 — Production Baseline (Delivered)

- [x] **Modular Backend Architecture:** FastAPI application server with async SQLAlchemy 2.0 ORM, Alembic migrations, and CORS middleware.
- [x] **Infrastructure Connectors:** Full GitHub connector supporting live Personal Access Tokens (PATs) and high-fidelity mock sandboxes.
- [x] **Canonical Control Catalog:** 19 standardized security controls mapped to SOC 2 Type II, ISO 27001:2022, NIST CSF 2.0, CIS Controls v8, and GDPR.
- [x] **Deterministic Evaluation Core:** Mathematical, zero-hallucination compliance pass/fail evaluator.
- [x] **Tamper-Evident Evidence Vault:** SHA-256 cryptographic proof generation with `/api/v1/evidence/{id}/verify` endpoint.
- [x] **Studio UI & RBAC:** React 19 + Tailwind + Zustand dashboard featuring 4 distinct personas (Platform Admin, Security Engineer, Auditor, Viewer) and 4 editorial themes.
- [x] **CI/CD & Test Suite:** Automated GitHub Actions workflows running matrix tests across Python 3.11/3.12 and Node 20/22.

---

## 🚀 Version 1.1.0 — Cloud Connectors & Rego Policy Engine (Q4 2026)

- [ ] **Native AWS Cloud Connector:**
  - Automated IAM cross-account role assumption (`sts:AssumeRole`).
  - Discovery for S3 bucket encryption, KMS key rotation, IAM MFA enforcement, and CloudTrail immutability.
- [ ] **Open Policy Agent (OPA) Integration:**
  - Support for custom user-authored Rego compliance rules.
  - Runtime rule hot-reloading without server restarts.
- [ ] **Headless PDF Report Generator:**
  - Pixel-perfect PDF attestation export with embedded QR verification codes.

---

## ⚡ Version 1.2.0 — Real-Time Drift & Auto-Remediation (Q1 2027)

- [ ] **Real-Time Webhook Receivers:**
  - Ingestion endpoints for GitHub App webhooks and AWS EventBridge rules.
  - Sub-second drift detection upon security configuration changes.
- [ ] **Automated Remediation PR Generator:**
  - One-click GitHub pull request generation containing Terraform/OpenTofu code to fix failing controls.
- [ ] **Enterprise SIEM Forwarders:**
  - Direct telemetry export to Splunk HTTP Event Collector (HEC), Datadog, and AWS Security Lake.

---

## 🛡️ Version 2.0.0 — Enterprise Sovereign & Multi-Cloud (Q2 2027)

- [ ] **Multi-Cloud Expansion:** Native connectors for Google Cloud Platform (GCP) and Microsoft Azure.
- [ ] **Hardware HSM Proof Signing:** Hardware-backed PKCS#11 digital signatures on attestation evidence ledgers.
- [ ] **Air-Gapped Helm Packaging:** Kubernetes operator distribution for sovereign offline defense environments.
