# GRC Engine — Frontend

The frontend user interface for the Governance, Risk, and Compliance (GRC) Engine platform. Built with React, Vite, Framer Motion, and Tailwind CSS.

## Features

- **Posture Overview Dashboard**: Real-time compliance monitoring, posture score, and telemetry scan simulation.
- **Integration Management**: Connector interfaces for third-party cloud infrastructure and developer tooling (AWS, GCP, GitHub, Okta, Jira, Slack).
- **Architecture Mapping**: Infrastructure topology mapping displaying real-time security compliance indicators directly over system assets.
- **Controls Registry**: Standard compliance checks mapped across frameworks such as SOC 2, ISO 27001, HIPAA, and GDPR.
- **Tactical Remediation Playbook**: Step-by-step resolution guides for active compliance gaps and security findings.
- **Findings & Vulnerabilities Console**: Centralized interface to review, ignore, or simulate resolution of compliance issues.
- **Evidence Locker**: Document and asset repository mapping system configuration dumps and policies directly to audit controls.
- **Telemetry Scanner**: Diagnostic tool for running continuous compliance evaluation scans across connected environments.
- **Auditor Readiness Reports**: One-click generation of audit-ready compliance reporting (SOC 2 readiness, ISO 27001 Annex A, GDPR).
- **Standards Catalogue**: Searchable reference database mapping standard control definitions, rules, and framework criteria.

## Tech Stack

- **React 19** - Frontend user interface library
- **Vite 8** - Build tool and development server
- **Zustand 5** - State management
- **Framer Motion 13** - UI animations and transitions
- **Tailwind CSS 3** - Utility-first styling framework
- **Oxlint** - Static code linter

## Project Structure

```
├── public/              # Static public assets
├── src/
│   ├── components/      # Shared layout, navigation, and page components
│   ├── data/            # Mock dataset definitions
│   ├── lib/             # Utility functions
│   ├── pages/           # Application views and subpages
│   ├── store/           # Global state containers (Zustand)
│   ├── App.jsx          # Root application component and routing
│   ├── index.css        # Global CSS styles and design tokens
│   └── main.jsx         # Application entry point
├── clean.cjs            # Page header/footer cleanup utility script
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## Getting Started

### Prerequisites

Ensure you have Node.js (v18+ recommended) installed.

### Installation

Install project dependencies:

```bash
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

### Build for Production

Compile production assets:

```bash
npm run build
```

### Linting

Run Oxlint for static code analysis:

```bash
npm run lint
```
