# Release Notes — GRC Engine v1.0.0

**Release Version:** `v1.0.0`  
**Release Name:** Infrastructure-First Compliance & Cryptographic Proof Platform  
**Date:** September 8, 2026  
**Git Tag:** `v1.0.0`

---

## 🌟 Highlights

GRC Engine v1.0.0 marks the formal production release of the open-source **Infrastructure-First Continuous Compliance Platform**. GRC Engine replaces subjective manual compliance questionnaires with automated, mathematical infrastructure discovery and tamper-evident cryptographic proofs.

```text
  ██████╗ ██████╗  ██████╗    ███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗
 ██╔════╝ ██╔══██╗██╔════╝    ██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝
 ██║  ███╗██████╔╝██║         █████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║█████╗  
 ██║   ██║██╔══██╗██║         ██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██╔══╝  
 ╚██████╔╝██║  ██║╚██████╗    ███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║███████╗
  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝
```

---

## 🚀 Key Features in v1.0.0

### 1. Modular FastAPI Backend & Async SQLAlchemy ORM
- Complete `/api/v1` REST API covering Authentication, Integrations, Assets, Controls, Findings, Evidence, Scans, and Reports.
- Native asynchronous database layer using SQLAlchemy 2.0 with Alembic schema baseline migrations.
- Enterprise error handling adhering to RFC-7807 problem details with performance timing headers.

### 2. Infrastructure Connector Framework & GitHub Ingestion
- Dual-mode GitHub connector supporting live GitHub Personal Access Tokens (PATs) and high-fidelity offline mock sandboxes.
- Automated collection of branch protection rules, required review counts, admin enforcement, secret scanning, and Dependabot status.

### 3. Canonical Control Catalog & Regulatory Framework Mappings
- **19 Canonical Technical Controls** pre-mapped to:
  - **SOC 2 Type II** (CC6.1, CC6.8, CC8.1)
  - **ISO/IEC 27001:2022** (A.5.15, A.5.17, A.8.8, A.8.15, A.8.24, A.8.28, A.8.32)
  - **NIST CSF 2.0** (PR.AA-01, PR.AA-03, PR.DS-01, PR.PS-01, DE.CM-01)
  - **CIS Critical Security Controls v8** (16.2)
  - **GDPR Technical Safeguards** (Article 32)

### 4. Tamper-Evident SHA-256 Evidence Vault
- Every ingested configuration payload is hashed using SHA-256 over alphabetically sorted JSON keys.
- Cryptographic verification endpoint (`GET /api/v1/evidence/{id}/verify`) independently confirms data integrity against database tampering.

### 5. React 19 Studio UI with Persona & Theme Switching
- Architectural brutalist dashboard featuring real-time compliance dial, framework health cards, and copy-paste remediation scripts.
- Instant persona switching across 4 roles: **Platform Admin**, **Security Engineer**, **External Auditor**, and **Read-Only Viewer**.
- 4 customizable aesthetic themes: **Bone**, **Obsidian**, **Blueprint**, and **Auditor**.

### 6. Automated Testing & CI/CD Pipeline
- Comprehensive test suite covering authentication, connectors, deterministic scoring, evidence verification, and scans.
- Multi-version GitHub Actions matrix CI testing Python 3.11/3.12 and Node 20/22.

---

## 📦 Creating the Git Release Tag

To create and push the formal release tag to GitHub:

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release v1.0.0: GRC Engine Production Baseline"

# Push tag to remote
git push origin v1.0.0
```
