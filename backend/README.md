# GRC Engine — Backend

> High-performance FastAPI backend service powering deterministic compliance evaluation, async SQLAlchemy 2.0 ORM persistence, Alembic migrations, and cryptographic evidence management.

---

## Architecture & Modules

- **FastAPI Application (`server.py`):** Async REST API gateway exposing health probes, database endpoints, and legacy policy analyzers.
- **Database Engine (`database.py`):** Async SQLAlchemy 2.0 engine configured with SQLite (`aiosqlite`) for local development and PostgreSQL compatibility for production.
- **Data Models (`models/`):** 11 core domain entities:
  - `Organization` & `Workspace`
  - `User` & `ApiKey`
  - `Integration` (GitHub, AWS, GCP connectors)
  - `Asset` (discovered repositories, cloud resources)
  - `Control`, `Framework`, `FrameworkRequirement`, `ControlMapping`
  - `Evidence`, `Finding`, `ScanJob`, `AuditLog`
- **Migrations (`alembic/`):** Version-controlled schema migrations with auto-generation and upgrade commands.
- **Compliance Baseline Seeds (`scripts/seed_db.py`):** Auto-populates baseline frameworks (SOC 2 Type II, ISO/IEC 27001:2022, NIST CSF 2.0, CIS Critical Security Controls v8).
- **Legacy PDF Audit Engine (`audit_engine.py`):** Preserved local-first policy text parsing and negation-aware regex scanning under `/api/legacy/audit`.

---

## Setup & Running

### 1. Environment Setup

```bash
# Create and activate virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On Linux / macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Database Migrations & Seeding

```bash
# Run Alembic migrations to create tables
alembic upgrade head

# Seed baseline compliance frameworks & controls
python scripts/seed_db.py
```

### 3. Run Development Server

```bash
# Run server
python server.py

# Or directly with uvicorn
uvicorn server:app --reload --port 8000
```

- API Base URL: `http://127.0.0.1:8000`
- Interactive Swagger Docs: `http://127.0.0.1:8000/docs`
- ReDoc Docs: `http://127.0.0.1:8000/redoc`

---

## Security & Data Integrity

- **Deterministic Evaluation:** 100% reproducible pass/fail verdicts and risk calculation.
- **Tamper-Evident Evidence Vault:** Audit artifacts hashed using SHA-256 for cryptographic non-repudiation.
- **Local-First Privacy:** No sensitive infrastructure tokens or policy data leaves your secure perimeter.

---

## License

MIT License.


