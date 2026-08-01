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
