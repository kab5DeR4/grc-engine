# GRC Engine

> Privacy-first Governance, Risk & Compliance auditing for security policies.

GRC Engine analyzes security-policy PDFs against a predefined control matrix mapped to **ISO/IEC 27001:2022, NIST CSF 2.0, GDPR, and EU NIS2**.

It uses a deterministic rule-based engine to identify security controls, extract evidence, calculate risk, identify compliance gaps, and generate remediation recommendations.

## Features

*  PDF security-policy auditing
*  19 cybersecurity controls
*  ISO 27001, NIST CSF, GDPR & NIS2 mapping
*  Rule-based control detection
*  Negation-aware matching
*  Evidence extraction
*  Weighted risk scoring
*  Compliance & framework coverage
*  Remediation recommendations
*  JSON & HTML reports
*  Local-first processing
*  React + FastAPI architecture

## Architecture

```text
              ┌─────────────────┐
              │   React Frontend│
              │ Vite + Tailwind │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │     FastAPI     │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   PDF Parser    │
              │     pypdf       │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   Audit Engine  │
              │ Rules + Regex   │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              ▼                 ▼
        Risk Analysis      Framework Mapping
              │                 │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │     Reports     │
              │ JSON + HTML     │
              └─────────────────┘
```
## Quick Start

### Backend

```bash
cd backend

python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
python server.py
```

Backend:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend

npm install
npm run dev
```

## 🧰 Tech Stack

| Layer          | Technology     |
| -------------- | -------------- |
| Frontend       | React          |
| Build          | Vite           |
| Styling        | Tailwind CSS   |
| State          | Zustand        |
| Animation      | Framer Motion  |
| Backend        | FastAPI        |
| Server         | Uvicorn        |
| PDF Processing | pypdf          |
| Audit Engine   | Python + Regex |
| Reports        | JSON + HTML    |

## AI / RAG

An `ai-rag/` module is planned for future development.

Planned capabilities include:

* Semantic document search
* Vector database integration
* RAG-based compliance Q&A
* AI remediation recommendations
* Framework-aware compliance assistance

> The current audit engine is deterministic and does **not** require an LLM.

## Limitations

GRC Engine is currently a prototype.

The current engine:

* Relies primarily on keyword/regex matching
* Does not verify real-world implementation of controls
* Requires extractable PDF text
* Does not replace professional compliance audits
* Does not yet include the planned AI/RAG layer

## Roadmap

* [x] PDF auditing
* [x] Control detection
* [x] Risk scoring
* [x] Framework mapping
* [x] Evidence extraction
* [x] HTML/JSON reports
* [x] React dashboard
* [ ] RAG pipeline
* [ ] Vector database
* [ ] AI compliance assistant
* [ ] Policy versioning
* [ ] Continuous compliance monitoring

```bash
git checkout -b feature/my-feature
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

Then open a pull request.
