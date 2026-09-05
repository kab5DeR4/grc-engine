# GRC Engine

Privacy-first compliance discovery and policy auditing platform.

[ [Live Demo](https://grc-engine.vercel.app) ] [ [Documentation](https://github.com/kab5DeR4/grc-engine/blob/main/DEVELOPMENT_MASTER_PLAN.md) ] [ [Architecture](#architecture) ]

```
   ██████╗ ██████╗  ██████╗    ███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗
  ██╔════╝ ██╔══██╗██╔════╝    ██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝
  ██║  ███╗██████╔╝██║         █████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║█████╗  
  ██║   ██║██╔══██╗██║         ██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██╔══╝  
  ╚██████╔╝██║  ██║╚██████╗    ███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║███████╗
   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝
```

[![Live Demo](https://img.shields.io/badge/Live_Demo-grc--engine.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://grc-engine.vercel.app)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![SQLAlchemy 2.0](https://img.shields.io/badge/SQLAlchemy-2.0+-D71F00.svg?style=for-the-badge&logo=sqlalchemy&logoColor=white)](https://www.sqlalchemy.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

**GRC Engine** analyzes security policies against structured compliance controls and produces:

- 🔍 **Control detection** across source control and infrastructure configurations
- 📦 **Evidence extraction** with immutable SHA-256 cryptographic digests
- 🎯 **Risk scoring** (0–100) with weighted severity formulas
- 📋 **Framework mapping** across **SOC 2 Type II, ISO/IEC 27001:2022, NIST CSF 2.0, CIS v8, and GDPR**
- ⚠️ **Compliance gaps** and drift detection
- 💡 **Remediation recommendations** (copy-paste Terraform & CLI commands)
- 📄 **HTML / JSON reports** for auditor attestation packages

---

## Architecture

GRC Engine turns traditional compliance upside down: **Infrastructure is the single source of truth.**

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                            │
│   React 19 + Vite + Tailwind + Zustand (Demo Mode / Live API Toggle)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ REST API / WebSockets
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

## Demo

> Experience the live dashboard with real-time persona switching (Platform Admin, Security Engineer, External Auditor) and theme selector.

<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/7160d545-925f-4257-adbf-bab943823652" />


🚀 **Try the interactive app:** [https://grc-engine.vercel.app](https://grc-engine.vercel.app)

---

## How It Works

```text
[ Infrastructure ] ➔ [ Asset Discovery ] ➔ [ Control Normalizer ] ➔ [ Deterministic Rules ] ➔ [ Cryptographic Proof ]
   (GitHub, AWS)        (Repos, S3, IAM)     (Canonical State)         (PASS / FAIL)          (SHA-256 Ledger)
```

1. **Connect Infrastructure:** Link source control (GitHub) or cloud providers via read-only tokens.
2. **Discover Assets & Collect State:** Auto-discover repositories, branch protection rules, secret scanning, and IAM configurations.
3. **Normalize Technical Controls:** Transform vendor-specific JSON into unified canonical security controls (e.g. `CANONICAL_CODE_REVIEW_APPROVALS`).
4. **Deterministic Evaluation:** Mathematical, 100% reproducible compliance pass/fail scoring against SOC 2, ISO 27001, and NIST CSF. Zero hallucinations.
5. **Cryptographic Proofs & Attestation:** Evidence payloads are hashed with SHA-256 to create tamper-evident audit logs.
6. **Remediation & Monitoring:** Generate copy-paste fix scripts and monitor for continuous compliance drift.

---

## Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS | Studio brutalist design system (`#E7E3DA` bone, `#1A1917` ink) |
| **State Management** | Zustand 5 | Reactive client-side store with Dual Mode (Demo vs Live API) |
| **API Gateway** | FastAPI, Uvicorn, Pydantic v2 | High-performance async REST API with OpenAPI & JWT auth |
| **Database & ORM** | SQLAlchemy 2.0, Alembic, aiosqlite | Async relational engine supporting SQLite & PostgreSQL |
| **Security & Hashing** | `python-jose`, `passlib`, `hashlib` | SHA-256 evidence integrity proofs & bcrypt password hashing |
| **AI / Remediation** | LiteLLM, OpenAI / Anthropic *(WIP)* | Remediation code generation and executive risk summaries |
| **Legacy Engine** | `pypdf`, Python regex | 19-control text matrix for static policy documents |

---

## Limitations

- **Infrastructure Provider Scope:** Current live connector focuses on GitHub; AWS and GCP connectors are queued in roadmap.
- **Agentless Discovery:** Collects posture via provider APIs and webhooks; does not run daemon agents inside virtual machines.
- **AI Boundaries:** LLM models are strictly restricted to root-cause explanations and remediation script generation—AI **never** decides pass/fail compliance verdicts.

---

[![Milestone Progress](https://img.shields.io/github/milestones/progress/kab5DeR4/grc-engine/1?style=flat-square&color=2ea44f)](https://github.com/kab5DeR4/grc-engine/milestones)

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

# Run migrations & seed baseline frameworks (SOC 2, ISO 27001, NIST)
alembic upgrade head
python scripts/seed_db.py

# Start server
python server.py
```
> Server runs on `http://127.0.0.1:8000` (API documentation at `/docs`).

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
> Frontend runs on `http://localhost:5173`.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
