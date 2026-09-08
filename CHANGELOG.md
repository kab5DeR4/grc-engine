# Changelog

All notable changes to the **GRC Engine** platform will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-09-08

### Added
- **API Gateway & Modular Router:** Implemented FastAPI v1 API routes (`/api/v1/auth`, `/integrations`, `/assets`, `/controls`, `/findings`, `/evidence`, `/scans`, `/reports`).
- **ORM & Migrations:** Async SQLAlchemy 2.0 domain models with Alembic schema management and SQLite/PostgreSQL support.
- **Connectors Architecture:** Base connector interface and dual-mode GitHub connector (live PAT + mock sandbox).
- **Canonical Control Engine:** Standardized 19-control catalog mapped to SOC 2 Type II, ISO 27001:2022, NIST CSF 2.0, CIS Controls v8, and GDPR.
- **Evidence Vault:** Tamper-evident SHA-256 cryptographic proof hashing and independent verification endpoint.
- **RBAC Matrix:** 4 operational clearance personas (`PLATFORM_ADMIN`, `SECURITY_ENGINEER`, `EXTERNAL_AUDITOR`, `READ_ONLY_VIEWER`).
- **Frontend Studio:** React 19 + Tailwind + Zustand interactive dashboard with live persona switching, theme selector, and remediation simulator.
- **CI/CD Pipelines:** GitHub Actions workflows for matrix test runs, linting, production build verification, and security audits.
- **Documentation Suite:** Complete REST API specification, STRIDE threat model, security model, control evaluation examples, sample evidence JSON, sample compliance reports, known limitations, and engineering roadmap.
