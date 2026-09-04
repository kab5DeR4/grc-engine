# GRC Engine

> Continuous, Automated Governance, Risk & Compliance (GRC) platform powered by deterministic infrastructure evaluation & tamper-evident evidence.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![SQLAlchemy 2.0](https://img.shields.io/badge/SQLAlchemy-2.0+-D71F00.svg?style=flat&logo=sqlalchemy)](https://www.sqlalchemy.org)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

GRC Engine transitions security compliance from manual annual PDF audits to **continuous infrastructure verification**. It programmatically connects to cloud environments, source control, and developer tooling to prove security controls with cryptographic evidence.

---

## Key Features

* **Continuous Infrastructure Evaluation:** Scan real-world resources (GitHub repositories, cloud configs) against security controls.
* **Deterministic Compliance Engine:** 100% reproducible pass/fail verdicts and risk calculation across **SOC 2, ISO/IEC 27001, NIST CSF 2.0, CIS v8, and GDPR**.
* **Cryptographic Evidence Vault:** Every audit artifact is captured with an immutable SHA-256 cryptographic digest.
* **Modern Database Architecture:** SQLAlchemy 2.0 async engine with Alembic schema migrations and auto-seeding for compliance baselines.
* **Studio Editorial Brutalist UI:** Highly responsive, themeable React interface with live RBAC persona preview, posture metrics, and remediation guides.
* **Legacy PDF Security Auditing:** Preserved local-first PDF policy text analyzer with 19-control regex matrix under `/api/legacy/audit`.

---

## Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                            │
│           React 19 + Vite + Tailwind CSS + Zustand Telemetry           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ REST API (FastAPI)
┌───────────────────────────────────▼────────────────────────────────────┐
│                             API GATEWAY                                │
│        FastAPI Application Server + JWT Auth + RBAC Middleware         │
└──────┬──────────────┬─────────────┬─────────────┬─────────────┬────────┘
       │              │             │             │             │
┌──────▼──────┐┌──────▼──────┐┌─────▼──────┐┌─────▼──────┐┌─────▼──────┐
│ Organization││  Connector  ││ Normalizer ││ Evaluation ││  Evidence  │
│  & Auth Svc ││   Manager   ││   Engine   ││   Engine   ││   Vault    │
└──────┬──────┘└──────┬──────┘└─────┬──────┘└─────┬──────┘└─────┬──────┘
       │              │             │             │             │
       │       ┌──────┴──────┐      │             │             │
       │       │ GitHub / AWS│      │             │             │
       │       │ Connectors  │      │             │             │
       │       └──────┬──────┘      │             │             │
       │              ▼             │             │             │
┌──────▼──────────────┴─────────────▼─────────────▼─────────────▼──────┐
│                           DATA LAYER                                 │
│            PostgreSQL / SQLite via SQLAlchemy 2.0 + Alembic          │
│  (Orgs, Users, Integrations, Assets, Controls, Findings, Evidence)   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Backend Setup

```bash
cd backend

# Create & activate virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations & seed baseline frameworks (SOC 2, ISO 27001, NIST, CIS)
alembic upgrade head
python scripts/seed_db.py

# Start backend server
python server.py
```

Backend API will be live at `http://127.0.0.1:8000` (Swagger docs at `/docs`).

### 2. Frontend Setup

```bash
cd frontend

# Install packages
npm install

# Start Vite development server
npm run dev
```

Frontend will be running at `http://localhost:5173`.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS | High-performance responsive UI & Studio design system |
| **State Management** | Zustand 5 | Client-side reactive telemetry & mock offline preview |
| **Backend Framework** | FastAPI, Uvicorn | Async REST API gateway & OpenAPI specs |
| **Database & ORM** | SQLAlchemy 2.0, Alembic, SQLite / PostgreSQL | Async ORM models & version-controlled schema migrations |
| **Parsing & Auditing** | `pypdf`, Python regex | Legacy policy parsing & rule verification |

---

## Roadmap

- [x] **Phase 00:** Project reset, UI cleanup, navigation streamlining & environment templates.
- [x] **Phase 01:** Async database layer, 11 ORM models, Alembic migrations & baseline compliance seeds.
- [ ] **Phase 02:** Modular FastAPI v1 REST API gateway, JWT auth & Pydantic settings.
- [ ] **Phase 03:** Live GitHub REST API connector for repository posture & branch protection inspection.
- [ ] **Phase 04:** Asset discovery engine for auto-cataloging infrastructure inventory.
- [ ] **Phase 05:** Technical control normalization layer.
- [ ] **Phase 06:** Deterministic evaluation engine & continuous posture scoring.
- [ ] **Phase 07:** Cryptographic Evidence Vault (SHA-256 tamper-evident logs).
- [ ] **Phase 08:** End-to-end frontend integration & live scanning mode.

---

## License

MIT License.

*Built with passion, late night coding & coffee.*

