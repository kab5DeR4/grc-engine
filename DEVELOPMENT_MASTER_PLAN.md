# GRC Engine — Complete Development Master Plan & Engineering Roadmap

> **Author:** Roshan Nale  
> **Project:** GRC Engine (`kab5DeR4/grc-engine`)  
> **Architecture Direction:** Infrastructure-First Compliance Discovery & Continuous Monitoring  
> **Current Date:** September 2026  
> **Repository Baseline:** Commit `a2af245`  

---

## Executive Summary & You Are Here

```text
========================================================================================
                               CURRENT DEVELOPMENT STATUS
========================================================================================
  PRODUCT VISION          : [====================] 100%  (Pivot to Infra-First Locked)
  UI/UX DESIGN SYSTEM     : [==================..]  85%  (Studio brutalist aesthetic)
  FRONTEND SHELL / DEMO   : [===============.....]  75%  (Rich mock Zustand store)
  BACKEND FOUNDATION      : [===.................]  15%  (Legacy PDF regex engine)
  DATABASE & ORM          : [....................]   0%  (None exists)
  AUTH & MULTI-TENANCY    : [....................]   0%  (Simulated in UI only)
  INFRA CONNECTORS        : [....................]   0%  (GitHub/AWS connectors absent)
  ASSET DISCOVERY         : [....................]   0%  (No real discovery engine)
  CONTROL NORMALIZATION   : [....................]   0%  (Only text regex on PDF)
  EVALUATION ENGINE       : [....................]   0%  (Only PDF keyword scoring)
  EVIDENCE LEDGER         : [....................]   0%  (Simulated in UI only)
  DRIFT DETECTION         : [....................]   0%  (Simulated in UI only)
  AI / RAG EXPLANATIONS   : [....................]   0%  (Placeholder README only)
  TESTING & HARDENING     : [=...................]   5%  (Single health endpoint)
========================================================================================
```

---

## 1. Current Product Definition

**GRC Engine** is an **Infrastructure-First Compliance Discovery Platform**.

Traditional GRC platforms (like Vanta, Drata, or legacy Archer) historically began as document repositories and questionnaires: an administrator uploads written security policies and manually checks off compliance checklists.

GRC Engine turns this paradigm upside down:
- **Infrastructure is the single source of truth.**
- The platform connects directly to developer and cloud infrastructure (version control, cloud providers, identity providers, container runtimes).
- It discovers technical assets, inspects real live configuration states, extracts technical security controls, normalizes them into standard controls, deterministically evaluates them against regulatory frameworks (SOC 2, ISO 27001, NIST CSF), collects cryptographic evidence proofs, and continuously detects compliance drift.
- Human policies are audited *against* actual technical reality, surfacing the exact gap between what an organization claims it does and what its systems actually enforce.

```text
+-------------------+
|   Organization    |
+---------+---------+
          |
          v
+-------------------+
|  Infrastructure   |  (GitHub, AWS, etc.)
+---------+---------+
          |
          v
+-------------------+
|  Asset Discovery  |  (Repositories, S3 Buckets, IAM Roles)
+---------+---------+
          |
          v
+-------------------+
| Control Discovery |  (Branch Protection, MFA, KMS Encryption)
+---------+---------+
          |
          v
+-------------------+
|   Normalization   |  (Vendor-Agnostic Canonical Controls)
+---------+---------+
          |
          v
+-------------------+
| Framework Mapping |  (SOC 2 CC8.1, ISO 27001 A.8.28, NIST PR.DS-01)
+---------+---------+
          |
          v
+-------------------+
|    Evaluation     |  (Deterministic Rule Engine: PASS / FAIL)
+---------+---------+
          |
          v
+-------------------+
| Evidence Ledger   |  (Cryptographic SHA-256 Artifact Packaging)
+---------+---------+
          |
          v
+-------------------+
|  Drift Detection  |  (Real-Time Webhook + Scheduled Delta Checks)
+---------+---------+
          |
          v
+-------------------+
| AI Explanation    |  (Root Cause Summaries & Remediation Code)
+---------+---------+
          |
          v
+-------------------+
| Report & Monitor  |  (Auditor Attestation Packages & Executive Views)
+-------------------+
```

---

## 2. Product Philosophy

1. **Infrastructure as the Source of Truth:** Never believe a PDF policy until code or cloud configuration proves it.
2. **Deterministic Compliance, Probabilistic Assistance:**
   - Compliance evaluations, pass/fail verdicts, and risk scores must be 100% deterministic, reproducible, and verifiable.
   - AI/LLM models must **never** decide compliance verdicts. AI is strictly an explanation and remediation assistant (summarizing findings, suggesting Terraform/IaC fixes, drafting auditor memos).
3. **Zero Security Friction for Developers:** Connect via read-only APIs or native webhooks without requiring agents on every machine for initial discovery.
4. **Tamper-Evident Evidence:** Every compliance proof is an immutable snapshot with a SHA-256 cryptographic digest, ensuring auditors can verify proof integrity.
5. **Separation of Concerns:** Clear demarcation between Data Ingestion (Connectors), Normalization (Canonical Model), Evaluation (Rule Engine), and Presentation (Dashboard/Reports).

---

## 3. Current Architecture vs. Target Architecture

### What the Codebase Has Today:
```text
[Frontend: React/Vite/Zustand] <-------- NO CONNECTION --------> [Backend: FastAPI]
  ├── Studio Landing Page                                           ├── /health
  ├── Mock Zustand Store (demoStore.js)                             ├── /api/audit (PDF upload)
  ├── 13 Dashboard/Studio Views                                     ├── /api/export-report (HTML)
  └── Local Browser State                                           └── audit_engine.py (Regex on PDF)
```

### Target Production Architecture:
```text
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                            │
│   React 18 + Vite + Tailwind + Zustand (Demo Mode / Real Mode Toggle)   │
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
│            PostgreSQL / SQLite via SQLAlchemy + Alembic              │
│  (Orgs, Users, Integrations, Assets, Controls, Findings, Evidence)   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 4. What Has Actually Been Built

| Component | Actual Implementation | Fidelity |
|---|---|---|
| **Frontend Design System** | Studio editorial brutalist aesthetic (`#E7E3DA` bone, `#1A1917` ink, `#9B3418` pigment, `Azeret Mono`, `Instrument Serif`). Theme switcher (Bone, Obsidian, Blueprint, Auditor) + Density switcher (Editorial vs Compact). | 95% Complete |
| **Frontend Shell & Layout** | `AppShell`, collapsible `Sidebar`, sticky `Header` with live RBAC persona dropdown, `PageTransition` animations, `ScrollToTopButton`. | 90% Complete |
| **Frontend Mock Telemetry Store** | `demoStore.js` with comprehensive mock models: 4 frameworks, 6 infrastructure systems, 19 findings, 5 evidence items, full RBAC permission matrix (4 personas), audit trail with SHA-256 hash chaining. | 85% Complete |
| **Settings & Governance UI** | Profile & WebAuthn keys, Workspace regulatory matrix, Members RBAC matrix, Developer API tokens, Notification webhooks, Tamper-evident Audit Trail view. | 90% Complete |
| **Legacy PDF Audit Engine** | `backend/audit_engine.py`: 19 controls matrix with regex patterns and 45-character negation context window. Calculates risk score (0-100) and coverage against ISO 27001, NIST CSF, GDPR, NIS2. | 80% Complete (for PDF) |
| **Report Generation** | `backend/report_generator.py`: Generates HTML reports with hand-drawn styling from PDF scan data. | 75% Complete (for PDF) |
| **Vercel Prototype Deployment** | Frontend bundle compiled and deployed live at `https://grc-engine.vercel.app`. | 100% Deployed |

---

## 5. What Is Partially Built

1. **Dashboard Integrations (`DashboardIntegrations.jsx`):** Has connection configuration UI and simulated ping telemetry for AWS, Azure, GCP, K8s, GitHub Actions, GitLab CI, but is entirely in-memory mock data.
2. **Findings Management (`FindingsPage.jsx`):** Renders findings, severity badges, and an interactive "Simulate Remediation" button that modifies client state, but has no backend persistence.
3. **Scans Page (`ScansPage.jsx`):** Has progress bar animation and simulated streaming logs via `setInterval`, but does not trigger a real scan.
4. **Controls Catalogue (`ControlsPage.jsx`):** Displays 6 hardcoded controls with category and search filters, but is disconnected from the 19 controls in the backend or the Zustand store.
5. **Public Marketing Pages:** `LandingPage`, `FeaturesPage`, `PricingPage`, `DocsPage`, `IntegrationsPage`, `ContactPage` all exist and render cleanly, but include mixed architectural studio metaphors (`SectionDrawing`, `PinnedStudy`) that diverge from the core GRC message.

---

## 6. What Is Only Planned

1. **AI/RAG System (`/ai-rag`):** Currently just a 13-line README noting ChromaDB and OpenAI chunking.
2. **Continuous Compliance Monitoring:** Background jobs / cron scanners.
3. **Real-time Drift Detection:** Webhook listeners comparing current state against baseline snapshots.
4. **AWS Infrastructure Connector:** Boto3 scripts for IAM, S3, CloudTrail, KMS.
5. **Attestation Report Export:** Real backend PDF rendering for audit compliance packages.

---

## 7. What Is Missing

1. **Backend Database:** No SQLite, PostgreSQL, SQLAlchemy, SQLModel, or Alembic migrations.
2. **Backend Authentication & Authorization:** No JWT tokens, password hashing, or role verification on endpoints.
3. **Data Model Entities:** No database tables for Organization, User, Integration, Asset, Control, Mapping, Finding, Evidence.
4. **Connector Framework:** No base connector class, no credential vault, no GitHub API client.
5. **Technical Control Normalizer:** No code converting raw GitHub/AWS JSON into canonical control states.
6. **Infrastructure Evaluation Engine:** No rules evaluating live JSON against compliance frameworks.
7. **Frontend-to-Backend API Link:** Zero `fetch()` or API client calls in the frontend.
8. **Automated Tests:** No unit tests or integration tests for backend or frontend.

---

## 8. Current Frontend Status

- **Pages (20 total):**
  - **Operational GRC Pages:** `Dashboard`, `DashboardIntegrations`, `ControlsPage`, `FindingsPage`, `ScansPage`, `ReportsPage`, `SettingsPage`.
  - **Marketing / Public:** `LandingPage`, `FeaturesPage`, `PricingPage`, `DocsPage`, `IntegrationsPage`, `ContactPage`, `LoginPage`.
  - **Studio Metaphor Pages (from template):** `DrawingPage`, `StudyPage`, `PracticePage`, `ArchivePage` (acting as Evidence), `CataloguePage`, `Architecture`.
- **Navigation:**
  - Sidebar links 13 views.
  - Top header includes RBAC Persona Switcher (`Platform Admin`, `Security Engineer`, `External Auditor`, `Read-Only Viewer`) and Theme/Density modal.
- **Identified UX Issues:**
  - Landing page contains abstract "Kinematics", "Technical Scaled Drawings", and "Pinned Study" sections that confuse visitors looking for a GRC product.
  - `/drawing`, `/study`, `/practice`, and `/catalogue` clutter the dashboard navigation with non-standard GRC terminology.
  - Controls page uses hardcoded local array (`controlsData`) rather than Zustand store or backend data.
  - No visual toggle between "Demo Mode (Mock Data)" and "Live Connected Mode".
  - `MagnificationDock.jsx` is dead code.

---

## 9. Current Backend Status

- **FastAPI Application (`server.py`):**
  - `/health`: returns `{"status": "ok", "service": "grc-audit-backend"}`.
  - `/api/audit`: accepts PDF upload, extracts text with `pypdf`, passes to `audit_policy()`, saves JSON/HTML to disk.
  - `/api/export-report`: accepts `SimulatedReportPayload`, writes HTML report.
- **Audit Engine (`audit_engine.py`):**
  - Contains 19 controls dictionary with regex patterns and severity weights.
  - Checks negative context window (`NEGATION_PATTERNS`).
  - Produces risk score (0-100) and framework breakdown.
  - Designed solely for PDF policy document text, not cloud or code infrastructure.
- **Deficiencies:**
  - Completely synchronous file-based operations.
  - Zero database integration.
  - No infrastructure scanning capabilities.

---

## 10. Current AI/RAG Status

- **Files:** Only `ai-rag/README.md`.
- **State:** 0% code implemented.
- **Directional Correction:** RAG must **not** perform compliance evaluation. Its role will strictly be:
  1. Summarizing failing findings into executive risk summaries.
  2. Generating remediation code (e.g. GitHub Actions workflow YAML, branch protection API commands, Terraform snippets).
  3. Answering auditor questions against captured evidence.

---

## 11. Current Database Status

- **Status:** Completely absent.
- **Immediate Requirement:** Initialize SQLAlchemy 2.0 with SQLite for local development (seamlessly upgradeable to PostgreSQL for production) and Alembic for schema migrations.

---

## 12. Current Deployment Status

- **Frontend:** Live on Vercel at `https://grc-engine.vercel.app`. Automatically builds via Vite.
- **Backend:** Currently local-only (`127.0.0.1:8000`). Not deployed to cloud hosting (e.g., Render, Railway, AWS).
- **Environment Separation:** Missing `.env.example` configurations for API URLs.

---

## 13. Current Demo Status

- **Strengths:** The frontend demo mode is exceptionally polished visually. It demonstrates complete RBAC switching, themes, density modes, and simulates remediation workflows.
- **Weaknesses:** It is an island. Actions taken in demo mode do not reflect what the backend actually computes. When we build real features, we must keep Demo Mode intact as an offline fallback while adding Live Mode.

---

## 14. Gap Analysis (What We Have vs. What We Need)

| Dimension | Today (Legacy / Mock) | Target MVP | Gap |
|---|---|---|---|
| **Data Source** | Static PDF files & hardcoded JS objects | Live GitHub API | Need GitHub REST API client |
| **Asset Type** | Policy clauses | GitHub Repositories | Need Asset domain model & discovery service |
| **Controls** | 19 text regex patterns | 5 live technical GitHub controls | Need Control normalizer for GitHub settings |
| **Evaluator** | Keyword frequency in text | Boolean checks on API response | Need deterministic rule evaluator |
| **Evidence** | Quoted PDF paragraphs | JSON payload + SHA-256 hash | Need evidence packaging & hashing service |
| **Findings** | Fixed list in Zustand store | Dynamically generated from evaluations | Need Finding model & persistence |
| **UI Integration** | 100% Mock Zustand Store | API client calling FastAPI | Need Axios/Fetch service & mode toggle |

---

## 15. Correct MVP Definition

The MVP must be a **complete, demonstrably functional vertical slice** that proves the core thesis: *Infrastructure is the source of truth for compliance.*

### The MVP Scope:
- **Target Integration:** **GitHub** (the primary tool of modern dev teams).
- **Single Organization / Workspace:** ACME Corp (or connected user account).
- **Target Assets:** Discovered GitHub Repositories.
- **5 High-Impact Technical Controls:**
  1. `CTL-GH-01`: **Branch Protection Active** on default branch.
  2. `CTL-GH-02`: **Enforce Code Reviews** (minimum 1 or 2 required reviewers before merge).
  3. `CTL-GH-03`: **Secret Scanning & Push Protection** enabled.
  4. `CTL-GH-04`: **Vulnerability Alerts & Dependabot** active.
  5. `CTL-GH-05`: **Dismiss Stale Approvals** on new commits.
- **Target Frameworks:**
  - **SOC 2 Type II:** CC8.1 (Change Management), CC6.8 (Unauthorized Code Prevention).
  - **ISO/IEC 27001:2022:** A.8.28 (Secure Coding), A.8.32 (Change Management).
  - **NIST CSF 2.0:** PR.PS-01 (Software Quality & Maintenance).
- **Verification:** User enters a GitHub Personal Access Token (or uses mock GitHub connector for demo) -> Engine discovers repositories -> Inspects branch protections -> Evaluates controls -> Surfaces real findings -> Generates cryptographic evidence -> Displays in dashboard -> Exports auditor report.

---

## 16. The First End-to-End Vertical Slice

```text
[User in Frontend]
       │
       ▼ Enters GitHub PAT or clicks "Connect GitHub"
[POST /api/integrations/github/connect]
       │
       ▼ Validates token & scopes (repo, read:org)
[POST /api/scans/trigger]
       │
       ▼ Calls GitHub API: GET /user/repos
[Asset Engine creates: Asset(type="github_repository", name="grc-engine", ...)]
       │
       ▼ Calls GitHub API: GET /repos/{owner}/{repo}/branches/main/protection
[Normalizer extracts technical attributes:
   - protected: true/false
   - required_approving_review_count: 1
   - dismiss_stale_reviews: true
   - secret_scanning: enabled]
       │
       ▼ Normalizes into Canonical Controls
[Evaluator runs Deterministic Rules:
   - IF required_approving_review_count < 2 THEN FAIL (SOC 2 CC8.1)]
       │
       ▼
[Generates Finding: "Repository 'grc-engine' permits single-approver merges"]
       │
       ▼
[Evidence Vault packages API response, calculates SHA-256 hash, stores Proof]
       │
       ▼
[Frontend fetches: GET /api/dashboard/summary & GET /api/findings]
       │
       ▼
[Dashboard displays LIVE real-world compliance posture!]
```

---

## 17. Complete Development Roadmap (16 Phases)

```text
Phase 00 : Project Reset & Code Hygiene
Phase 01 : Database Architecture & Core Domain Models
Phase 02 : Backend Application Core & Configuration
Phase 03 : Connector Engine & GitHub Integration
Phase 04 : Asset Discovery Subsystem
Phase 05 : Technical Control Normalization Subsystem
Phase 06 : Compliance Framework Matrix & Deterministic Evaluation
Phase 07 : Cryptographic Evidence Vault
Phase 08 : Findings, Risk Scoring & Remediation Engine
Phase 09 : Drift Detection & Continuous Monitoring Subsystem
Phase 10 : Frontend API Client & Dual Mode (Demo vs Live)
Phase 11 : Dashboard Real-Time Integration & Navigation Pruning
Phase 12 : AI Explanation & Automated Remediation Layer
Phase 13 : Executive & Auditor Attestation Reporting
Phase 14 : AWS Infrastructure Connector
Phase 15 : Security Hardening, Automated Testing & Production Release
```

---

## 18. Detailed Engineering Tasks & Phase Breakdowns

### Phase 00: Project Reset & Code Hygiene
- [x] Analyze repository ground truth against all specifications.
- [x] Remove unused `MagnificationDock.jsx` from `frontend/src/components/layout/`.
- [x] Create root `.env.example` with backend and frontend environment variable templates.
- [x] Clean up redundant navigation items in `StudioNav.jsx` and `Sidebar.jsx` that point to non-GRC aesthetic templates (`/drawing`, `/study`, `/practice`, `/catalogue`).
- [x] Retain legacy PDF audit tools under dedicated namespace so existing functionality is preserved.


### Phase 01: Database Architecture & Core Domain Models
- [x] Add `sqlalchemy>=2.0.0`, `alembic>=1.13.0`, `aiosqlite`, and `pydantic-settings>=2.0.0` to `backend/requirements.txt`.
- [ ] Set up `backend/database.py` with SQLAlchemy `async_session` and base model classes.

- [ ] Implement core models in `backend/models/`:
  - `Organization` & `Workspace`
  - `User` & `ApiKey`
  - `Integration` (type, credentials, status, last_sync)
  - `Asset` (organization_id, integration_id, asset_type, identifier, raw_metadata)
  - `ControlDefinition` & `ControlInstance`
  - `Framework` & `FrameworkRequirement`
  - `ControlMapping` (links Canonical Control to Framework Requirement)
  - `EvaluationResult` (scan_id, control_id, status, details)
  - `Finding` (severity, title, description, remediation, status)
  - `EvidenceArtifact` (sha256_hash, payload, source_uri, timestamp)
  - `ScanJob` (status, started_at, completed_at, log)
  - `AuditLog` (actor, action, target, sha256_hash)
- [ ] Initialize Alembic migrations in `backend/alembic/`.
- [ ] Create seed script `backend/scripts/seed_db.py` to populate baseline frameworks (SOC 2, ISO 27001, NIST CSF).

### Phase 02: Backend Application Core & Configuration
- [ ] Refactor `backend/server.py` into modular FastAPI structure:
  - `backend/api/v1/endpoints/`: `auth.py`, `integrations.py`, `scans.py`, `assets.py`, `controls.py`, `findings.py`, `evidence.py`, `reports.py`.
  - `backend/core/config.py`: Pydantic settings loading from `.env`.
  - `backend/core/security.py`: Password hashing (bcrypt) and JWT creation/verification.
- [ ] Add CORS middleware configured for frontend origins.
- [ ] Add global exception handlers and request logging middleware.

### Phase 03: Connector Engine & GitHub Integration
- [ ] Create base connector interface `backend/connectors/base.py` (`test_connection()`, `discover_assets()`, `collect_control_state()`).
- [ ] Implement `backend/connectors/github.py` using `httpx`:
  - Token validation endpoint (`GET /user`).
  - Repository lister (`GET /user/repos` or `GET /orgs/{org}/repos`).
  - Branch protection inspector (`GET /repos/{owner}/{repo}/branches/{branch}/protection`).
  - Secret scanning status inspector.
  - Dependabot status inspector.
- [ ] Add mock GitHub connector for deterministic offline demo mode.
- [ ] Expose API endpoints:
  - `POST /api/v1/integrations/github/connect`
  - `GET /api/v1/integrations/github/status`
  - `POST /api/v1/integrations/github/test`

### Phase 04: Asset Discovery Subsystem
- [ ] Implement `backend/services/asset_discovery.py`:
  - Iterates connected integrations.
  - Extracts inventory (repository name, visibility, default branch, stars, archived status).
  - Upserts into `assets` table.
- [ ] Add asset query API: `GET /api/v1/assets` (with filtering by integration, type, status).

### Phase 05: Technical Control Normalization Subsystem
- [ ] Implement `backend/services/normalizer.py`:
  - Translates raw vendor-specific API responses into standardized control state objects.
  - Example: converts GitHub's `required_approving_review_count: 1` into normalized canonical control `CANONICAL_CODE_REVIEW_APPROVALS` with value `1`.
- [ ] Define canonical control definitions library in `backend/rules/canonical_controls.py`.

### Phase 06: Compliance Framework Matrix & Deterministic Evaluation
- [ ] Define evaluation rules in `backend/rules/evaluators/`:
  - Branch protection evaluation rule.
  - Approver count evaluation rule (>= 2 required for SOC 2 CC8.1 high-assurance).
  - Secret scanning evaluation rule.
  - Vulnerability alerting evaluation rule.
- [ ] Implement deterministic evaluation engine `backend/services/evaluation_engine.py`:
  - Executes rules against normalized control states.
  - Produces deterministic `PASS`, `FAIL`, or `WARNING`.
  - Calculates framework coverage percentages.

### Phase 07: Cryptographic Evidence Vault
- [ ] Implement `backend/services/evidence_vault.py`:
  - Serializes raw JSON configuration payloads from GitHub.
  - Computes standard SHA-256 digest (`hashlib.sha256`).
  - Stores immutable evidence artifact record with cryptographic proof hash.
  - Supports verification endpoint: validates whether stored evidence matches original hash.
- [ ] Expose `GET /api/v1/evidence` and `GET /api/v1/evidence/{id}/verify`.

### Phase 08: Findings, Risk Scoring & Remediation Engine
- [ ] Implement `backend/services/findings_service.py`:
  - Generates `Finding` records for each failing control.
  - Assigns severity based on framework impact (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`).
  - Computes weighted risk score (0-100) and overall compliance percentage.
  - Generates concrete remediation guidance (e.g. precise GitHub CLI command or API curl to fix the branch protection).
- [ ] Expose `GET /api/v1/findings` and `POST /api/v1/findings/{id}/remediate-simulate`.

### Phase 09: Drift Detection & Continuous Monitoring Subsystem
- [ ] Implement `backend/services/drift_detector.py`:
  - Compares current evaluation against previous evaluation snapshot for each asset.
  - Detects state changes:
    - Passed control that became failing -> `NEGATIVE_DRIFT` (triggers alert).
    - Failing control that became passing -> `RESOLVED_DRIFT`.
- [ ] Expose drift history API: `GET /api/v1/drift`.

### Phase 10: Frontend API Client & Dual Mode (Demo vs Live)
- [ ] Create `frontend/src/lib/api.js` (configured Axios or Fetch client with base URL handling and auth headers).
- [ ] Update `frontend/src/store/demoStore.js` to support dual mode:
  - `mode: 'DEMO' | 'LIVE'`
  - In `DEMO` mode: uses local mock data.
  - In `LIVE` mode: fetches from backend API.
- [ ] Add visual mode indicator and toggle in `Header.jsx`.

### Phase 11: Dashboard Real-Time Integration & Navigation Pruning
- [ ] Connect `Dashboard.jsx`, `FindingsPage.jsx`, `DashboardIntegrations.jsx`, `ControlsPage.jsx`, and `ReportsPage.jsx` to live API endpoints when in LIVE mode.
- [ ] Prune sidebar navigation: rename `/archive` to clear label `Evidence Vault`, merge or redirect redundant studio pages (`/drawing`, `/study`, `/practice`, `/catalogue`) into proper GRC sections.
- [ ] Ensure all buttons have explicit actions or disabled states with explanatory tooltips.

### Phase 12: AI Explanation & Automated Remediation Layer
- [ ] Implement `ai-rag/explainer.py`:
  - Uses OpenAI / Anthropic / local LLM via LiteLLM.
  - Input: failing finding + normalized control state + framework clause.
  - Output: Executive summary, technical root cause, and copy-paste remediation snippet (Terraform / GitHub CLI).
- [ ] Expose `POST /api/v1/ai/explain-finding/{finding_id}`.

### Phase 13: Executive & Auditor Attestation Reporting
- [ ] Enhance report generation to pull from live database:
  - Framework compliance scorecard.
  - Discovered asset list.
  - Control verification status.
  - Tamper-evident evidence ledger with SHA-256 hashes.
  - Downloadable JSON attestation bundle and printable HTML/PDF.

### Phase 14: AWS Infrastructure Connector
- [ ] Add `boto3` to backend dependencies.
- [ ] Implement `backend/connectors/aws.py`:
  - S3 bucket public access block & server-side encryption inspection.
  - IAM password policy and MFA status inspection.
  - CloudTrail multi-region audit logging inspection.
- [ ] Normalize AWS controls and map to SOC 2 CC6.1, ISO 27001 A.8.24, NIST PR.DS-01.

### Phase 15: Security Hardening, Automated Testing & Production Release
- [ ] Write backend unit tests (`pytest`) for normalizer, evaluators, and evidence vault.
- [ ] Write frontend component and router tests (`vitest`).
- [ ] Configure CI workflow in `.github/workflows/test.yml`.
- [ ] Dockerize backend (`Dockerfile`) and create `docker-compose.yml` for local multi-container run.
- [ ] Production deployment of backend (Render/Railway/Fly.io) and link to Vercel frontend.

---

## 19. Dependency Order

```text
Database Models (Phase 01)
       ↓
Backend API Structure (Phase 02)
       ↓
Connector Abstraction & GitHub Connector (Phase 03)
       ↓
Asset Discovery (Phase 04)
       ↓
Control Normalization (Phase 05)
       ↓
Compliance Rule Evaluation (Phase 06)
       ↓
Evidence Vault & Hashing (Phase 07)
       ↓
Findings & Risk Engine (Phase 08)
       ↓
Drift Detection (Phase 09)
       ↓
Frontend API Client & Dual Mode (Phase 10)
       ↓
Dashboard Live Wiring (Phase 11)
       ↓
AI Explanation Layer (Phase 12)
       ↓
Auditor Reporting (Phase 13)
       ↓
AWS Connector (Phase 14)
       ↓
Hardening & Production (Phase 15)
```

---

## 20. Frontend Roadmap

1. **Sprint F1 (Hygiene & Clarity):**
   - Prune non-GRC navigation items.
   - Clean up orphan components.
   - Add explicit "Demo Mode / Live API" selector switch in the header.
2. **Sprint F2 (API Integration Layer):**
   - Create unified API service layer (`frontend/src/lib/api.js`).
   - Wire Zustand actions to API endpoints with automatic fallback to mock data if backend is unreachable.
3. **Sprint F3 (Controls & Assets Views):**
   - Upgrade `ControlsPage.jsx` to render dynamic normalized controls.
   - Build a dedicated `AssetsPage.jsx` showing discovered repositories and cloud resources.
4. **Sprint F4 (Live Findings & Evidence):**
   - Connect `FindingsPage.jsx` and `ArchivePage.jsx` (Evidence Vault) to real database records.
   - Show cryptographic hash verification badges in the UI.
5. **Sprint F5 (Live Scans & Attestation Reports):**
   - Connect `ScansPage.jsx` to real scan triggers via Server-Sent Events (SSE) or polling.
   - Upgrade `ReportsPage.jsx` to download real cryptographically signed JSON attestation packages.

---

## 21. Backend Roadmap

1. **Sprint B1 (Database & ORM):** SQLAlchemy 2.0 async engine, Pydantic schemas, Alembic migrations, SQLite/PostgreSQL support.
2. **Sprint B2 (Auth & Gateway):** Organization tenant context, API keys, JWT tokens.
3. **Sprint B3 (GitHub Connector):** Async HTTP client communicating with GitHub API, fetching repos and branch protections.
4. **Sprint B4 (Discovery & Normalizer):** Ingestion pipelines transforming raw GitHub JSON into canonical controls.
5. **Sprint B5 (Evaluator & Evidence Vault):** Deterministic compliance logic mapping to SOC 2 and ISO 27001; SHA-256 evidence generation.
6. **Sprint B6 (Drift & Reports):** Delta comparisons, audit logging, JSON/HTML report generation.

---

## 22. Database Roadmap

```text
Tables to Implement:
- organizations (id, name, slug, created_at)
- workspaces (id, organization_id, name, environment)
- users (id, organization_id, email, hashed_password, role)
- api_keys (id, organization_id, user_id, name, key_hash, scopes, expires_at)
- integrations (id, organization_id, type, name, credentials_encrypted, status, last_sync)
- assets (id, organization_id, integration_id, asset_type, external_id, name, metadata_json)
- canonical_controls (id, code, name, category, description, severity_weight)
- framework_requirements (id, framework, clause_id, title, description)
- control_mappings (id, canonical_control_id, framework_requirement_id)
- scan_jobs (id, organization_id, trigger_type, status, started_at, completed_at)
- evaluation_results (id, scan_id, asset_id, canonical_control_id, status, details_json)
- findings (id, organization_id, scan_id, asset_id, control_id, severity, title, status)
- evidence_artifacts (id, scan_id, asset_id, control_id, sha256_hash, payload_json, created_at)
- drift_events (id, organization_id, asset_id, control_id, previous_status, new_status, detected_at)
- audit_logs (id, organization_id, actor, action, target, prev_hash, current_hash, timestamp)
```

---

## 23. Integration Roadmap

- **Tier 1 (MVP):** GitHub (Repos, Branch Protection, Secret Scanning, Dependabot).
- **Tier 2 (Post-MVP):** AWS (S3 Encryption & Public Access, IAM MFA & Policies, CloudTrail).
- **Tier 3 (Enterprise):** Azure (Key Vault, Defender), GCP (IAM, Storage), Kubernetes (Pod Security Standards).
- **Tier 4 (Notifications):** Slack Webhooks, Jira Issue Creation, PagerDuty Alerts.

---

## 24. Compliance Engine Roadmap

- **Rule Representation:** Pure Python deterministic evaluation functions (no opaque black boxes).
- **Control Categorization:**
  - `ACCESS_CONTROL` (MFA, review requirements, least privilege)
  - `CRYPTOGRAPHY` (TLS versions, KMS key rotation, encryption at rest)
  - `VULNERABILITY_MANAGEMENT` (Dependabot, automated CVE scans)
  - `LOGGING_AND_AUDITING` (Audit trail retention, WORM storage)
- **Framework Support Staging:**
  - Milestone 1: SOC 2 Type II (Common Criteria 6, 7, 8) + ISO/IEC 27001:2022 (Annex A.8)
  - Milestone 2: NIST CSF 2.0 + CIS Benchmarks
  - Milestone 3: GDPR Article 32 + HIPAA Security Rule

---

## 25. Evidence Roadmap

- **Integrity Strategy:**
  1. Capture raw API response from provider.
  2. Compute canonical JSON representation (sorted keys, no whitespace).
  3. Compute SHA-256 digest.
  4. Store with ISO 8601 UTC timestamp and asset URI.
  5. Chain audit logs using previous hash reference (tamper-evident Merkle-like chain).

---

## 26. Drift Roadmap

- **Detection Modes:**
  1. **Scheduled Polling:** Hourly / daily automated scan jobs comparing state against previous baseline.
  2. **Webhook Driven:** GitHub push/branch protection webhook triggers instant targeted re-evaluation.
- **Drift Classification:**
  - `NEGATIVE_DRIFT`: Passing control failed (e.g. Branch protection removed) -> Urgent finding generated.
  - `POSITIVE_DRIFT`: Failing control resolved -> Finding automatically marked resolved.

---

## 27. AI Roadmap

- **Core Principle:** AI assists, it never evaluates.
- **Capabilities:**
  1. **Finding Explainer:** Translates technical violation (e.g., `enforce_admins: false`) into plain-language business impact.
  2. **Remediation Script Generator:** Generates Terraform / Pulumi / CLI scripts to fix the gap.
  3. **Auditor Narrative Assistant:** Drafts management response memos for auditor attestation reports.

---

## 28. Reporting Roadmap

- **Format 1: Executive Dashboard (Real-time in browser).**
- **Format 2: Attestation HTML Report (Printable to PDF via CSS print media queries).**
- **Format 3: Machine-Readable JSON Attestation Bundle (Contains evidence payloads and SHA-256 hashes for automated verification).**

---

## 29. Testing Roadmap

- **Unit Tests:**
  - GitHub connector payload parsers.
  - Canonical control normalizers.
  - Deterministic evaluation rules.
  - SHA-256 evidence hashing.
- **Integration Tests:**
  - End-to-end scan workflow with mock GitHub server.
  - Database migrations and rollbacks.
- **Frontend Tests:**
  - Store state transitions in Demo Mode and Live Mode.
  - RBAC permission guards.

---

## 30. Security Roadmap

- Encryption of integration secrets in database (AES-256-GCM via `cryptography` library).
- Least privilege API scopes requested (read-only scopes for GitHub and AWS).
- RBAC enforcement on all mutation endpoints.
- Rate limiting and payload size limits on all public endpoints.

---

## 31. Deployment Roadmap

- **Local:** `docker-compose up` running PostgreSQL, FastAPI backend, and Vite frontend.
- **Cloud:**
  - Frontend: Vercel (already active).
  - Backend: Render / Railway / Fly.io with managed PostgreSQL.
  - Secret Management: Environment variables via cloud dashboard.

---

## 32. Explicit "Do Not Build Yet" List

To ensure successful delivery of the MVP without drowning in complexity, the following items are strictly deferred:
- ❌ **No Kubernetes Helm agents**
- ❌ **No Azure / GCP integrations**
- ❌ **No Terraform / IaC static code analysis**
- ❌ **No automated remediation bots (mutating client infrastructure automatically)**
- ❌ **No enterprise SAML / Okta SSO**
- ❌ **No complex knowledge-graph multi-agent LLM systems**
- ❌ **No heavy vector databases (ChromaDB/Pinecone) until document Q&A is prioritized**
- ❌ **No custom DSL for compliance rules (pure Python rules are superior for MVP)**

---

## 33. Git / Commit Milestone Strategy

Follow Conventional Commits format (`type(scope): message`):
- `feat(db): initialize sqlalchemy models and alembic migrations`
- `feat(api): scaffold v1 modular fast api routes and config`
- `feat(github): add github api connector and repository discovery`
- `feat(controls): implement technical control normalizer for github`
- `feat(engine): add deterministic compliance evaluator for soc2 and iso27001`
- `feat(evidence): implement sha256 evidence packaging and ledger`
- `feat(findings): add finding generation and remediation service`
- `feat(ui): add api client and dual demo-live mode toggle`
- `feat(reports): add auditor attestation export package`
- `test(core): add unit tests for evaluation and hashing engine`

**Releases & Tags:**
- `v0.1.0-alpha`: Database + GitHub Discovery working end-to-end.
- `v0.2.0-beta`: Full vertical slice (GitHub -> Evaluation -> Finding -> Evidence -> UI).
- `v1.0.0`: Production-ready MVP with Attestation Reports and dual Demo/Live mode.

---

## 34. LinkedIn Development-Post Strategy

| Post | Milestone Prerequisite | Topic / Narrative | Visuals |
|---|---|---|---|
| **Post 1** | Project Announcement | **Already Published** (Concept, early prototype, React/Vite + FastAPI PDF auditor). | Prototype screenshot |
| **Post 2** | Architecture Reset | **"Why Infrastructure Must Be the Source of Truth in GRC"** — The fundamental problem with document-only compliance. Introducing the discovery-first engine. | High-level pipeline architecture diagram |
| **Post 3** | Database & Domain Model | **"Modeling Compliance as Code"** — How we designed the relational schema connecting raw cloud assets to SOC 2 and ISO 27001 controls. | Clean schema diagram / ERD snippet |
| **Post 4** | First Real GitHub Scan | **"Scanning GitHub for Compliance in Under 3 Seconds"** — Connecting the real GitHub API, discovering repositories, and inspecting branch protections. | Screen recording of terminal + API response |
| **Post 5** | Control Normalization | **"The Hardest Part of GRC: Normalizing Cloud Chaos"** — How we convert diverse API responses into standardized technical controls. | Before/After code snippet of normalization |
| **Post 6** | First Deterministic Verdict | **"Zero Hallucinations: Building a Deterministic Compliance Engine"** — Why rules must be mathematical and reproducible, not prompt-engineered. | Side-by-side rule evaluation output |
| **Post 7** | Evidence & Proofs | **"Cryptographic Proofs for Auditors"** — Generating SHA-256 tamper-evident evidence packages from infrastructure state. | Evidence card with SHA-256 verification badge |
| **Post 8** | Frontend Live Connection | **"Bridging the Gap: Live Telemetry Replaces Mock Data"** — Toggling the frontend from Demo Mode to live GitHub telemetry. | Video showing live scan updating the dashboard |
| **Post 9** | Real Drift Detection | **"Catching Compliance Drift in Real Time"** — Simulating someone disabling branch protection on GitHub and watching the engine detect it immediately. | Live alert / drift timeline GIF |
| **Post 10** | AI Remediation Layer | **"AI That Fixes Gaps Instead of Hallucinating Compliance"** — Using LLMs to generate instant copy-paste Terraform and GitHub CLI fixes. | UI screenshot showing generated fix script |
| **Post 11** | Full End-to-End Demo | **"From Repo Connection to Auditor Report in 60 Seconds"** — The complete vertical slice in action. | 60-second polished walkthrough video |
| **Post 12** | Project Launch / MVP | **"GRC Engine MVP is Open Source"** — Announcing the functional release, lessons learned, and inviting early feedback. | Clean product carousel + repo link |

---

## 35. Project Progress Ledger

```text
GRC ENGINE — DEVELOPMENT STATUS LEDGER
Last Updated: September 2026
Branch: main

CURRENT PHASE            : Phase 01 — Database Foundation & Domain Models
CURRENT TASK             : 1.2 Set up backend/database.py with async session & base model
LAST COMPLETED MILESTONE : Phase 00 — Project Reset & Code Hygiene (100% Complete)
NEXT MILESTONE           : Phase 01 — Working Database with Core Domain Models & Seed Data


BLOCKERS                 : None

SUBSYSTEM STATUS:
- PRODUCT DEFINITION     : [COMPLETED] Infrastructure-First Platform
- FRONTEND SHELL         : [PROTOTYPE] Studio Brutalist UI & Demo Store
- BACKEND SERVER         : [PARTIAL] FastAPI with legacy PDF audit
- DATABASE               : [NOT STARTED] Needs SQLAlchemy & Alembic
- GITHUB CONNECTOR       : [NOT STARTED] Needs HTTPX connector
- AWS CONNECTOR          : [DEFERRED] Tier 2
- COMPLIANCE EVALUATOR   : [NOT STARTED] Needs deterministic rule engine
- EVIDENCE VAULT         : [NOT STARTED] Needs SHA-256 packaging
- DRIFT DETECTION        : [NOT STARTED] Needs state comparison engine
- AI EXPLANATION         : [NOT STARTED] Needs LiteLLM integration
- REPORTING              : [PARTIAL] Legacy HTML report only
- TESTING                : [NOT STARTED] Needs pytest suite
- DEPLOYMENT             : [FRONTEND LIVE / BACKEND LOCAL]

LINKEDIN JOURNEY:
- Post 1 : [x] Completed (Announcement)
- Post 2 : [ ] Next (Infrastructure as Source of Truth Architecture)
- Post 3 : [ ] Scheduled (Domain Models & Database Architecture)
```

---

## 36. Exactly What You Should Work On First

Your next task is:

> **"Your next task is: Initialize the Backend Database Foundation with SQLAlchemy, Alembic, and the Core Domain Models (Organization, Workspace, Integration, Asset, CanonicalControl, ControlMapping, EvaluationResult, Finding, EvidenceArtifact, AuditLog)."**

This provides the persistent foundation that every subsequent step (GitHub connector, asset discovery, control normalization, evaluation, evidence vault, and frontend integration) strictly depends on.
