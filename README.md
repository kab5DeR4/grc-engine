# 🛡️ GRC Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://react.dev/)
[![NIST OSCAL](https://img.shields.io/badge/NIST-OSCAL%201.1.0-blue)](https://pages.nist.gov/OSCAL/)

**GRC Engine** is an automated Governance, Risk, and Compliance (GRC) verification platform. It parses corporate policy documents, evaluates structural security controls using Retrieval-Augmented Generation (RAG), continuously verifies live operational telemetry against cloud/system APIs, and exports machine-readable audit artifacts compliant with global cybersecurity standards.

---

## 🌟 Key Features

* **🧠 Context-Aware Semantic Audit (RAG):** Uses vector embeddings (`sentence-transformers`) and localized/cloud LLMs (`Llama 3` via Ollama or Groq API) to evaluate policy semantics beyond standard keyword matching.
* **🔄 Dual-Engine Execution:**
  * **Local Air-Gapped Mode:** Runs 100% on-device using local vector stores (`ChromaDB`) and local inference (`Ollama`) for zero-trust data privacy.
  * **Hybrid Cloud Mode:** Offloads processing to ultra-fast hosted vector databases (`Qdrant`/`Pinecone`) and cloud LLM APIs (`Groq`) for scalable production deployments.
* **🌐 Continuous Control Monitoring (CCM):** Automatically queries live environment telemetry (AWS Boto3, GitHub APIs, OS configs) to cross-verify if written policies are actually enforced.
* **📋 Multi-Framework Compliance Mapping:** Evaluates compliance and identifies gaps against:
  * **ISO/IEC 27001:2022** (Annex A Controls)
  * **NIST Cybersecurity Framework 2.0** (Identify, Protect, Detect, Respond, Recover)
  * **EU GDPR** (Article 32 Technical & Organizational Measures)
  * **EU NIS2 Directive** (Article 21 Cybersecurity Risk Management)
* **📜 NIST OSCAL Export:** Outputs machine-readable audit reports in standard NIST OSCAL (`assessment-results.json`) format alongside executive HTML reports.
* **⚡ Interactive Risk Simulator & Remediation:** Dynamically updates composite risk metrics ($Likelihood \times Impact$) and generates actionable remediation tickets (e.g., automated GitHub Issues).

---

## 🏗️ System Architecture
# GRC Audit Platform

A Governance, Risk, and Compliance (GRC) security policy auditing tool. It checks policy PDF documents against various cybersecurity frameworks locally using a React frontend and a FastAPI backend.

## Features

- **Local Processing**: PDF extraction and evaluations run locally.
- **Rules Engine**: Uses regex, boundary checks, and basic negation detection (e.g. detects *"MFA is not enforced"*).
- **Standards Mapping**: Maps 19 security controls against:
  - ISO/IEC 27001:2022
  - NIST Cybersecurity Framework 2.0
  - EU GDPR
  - EU NIS2 Directive
- **Quote Extraction**: Extracts snippets from the policy as evidence.
- **Risk Simulator**: Toggle controls in the UI to see how compliance and risk metrics change.
- **Reports**: Generates HTML and JSON audit reports.

## Architecture

```
   [PDF Upload]
        │
        ▼
   [FastAPI] (server.py)
        │
        ▼
   [PDF Parsing] (pypdf)
        │
        ▼
   [Audit Engine] (audit_engine.py)
        │
        ▼
   [Report Generation] (reports/audit_report.json, html)
        │
        ▼
   [React UI]
```

## How to Run

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Start the server:
```bash
python server.py
```
Or via uvicorn:
```bash
uvicorn server:app --reload --port 8000
```

3. Open `http://localhost:8000` in your browser.

## Deployment

The app is lightweight since it uses regex rather than heavy ML models.
- **RAM**: < 80 MB
- **Execution**: < 0.5s per PDF
- Can be hosted on most standard platforms (Docker, Render, AWS, etc.)

## License

MIT License.
