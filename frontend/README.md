# GRC Engine — Frontend

> Studio editorial brutalist frontend interface for Governance, Risk & Compliance. Built with React 19, Vite, Tailwind CSS, and Zustand.

---

## Features & Capabilities

- **Studio Editorial Brutalist Design System:** Custom theme engine with 4 curated palettes (*Bone, Obsidian, Blueprint, Auditor*) and interactive density modes (*Editorial vs. Compact*).
- **Live RBAC Persona Simulator:** Real-time role switching between *Security Lead, Compliance Auditor, DevOps Engineer, and Read-Only Executive* with instant UI adaptation.
- **Posture Overview Dashboard:** High-level compliance health metrics, framework adherence percentages, and risk scores across SOC 2, ISO 27001, NIST CSF 2.0, and CIS v8.
- **Integrations Hub:** Connection management & ping telemetry for cloud providers and dev tools (GitHub, AWS, GCP, Azure, Kubernetes, Okta).
- **Controls Registry & Catalogue:** Comprehensive inventory of compliance controls mapped directly to framework requirements.
- **Findings & Vulnerability Console:** Security gaps detection, severity classification, and simulated step-by-step remediation flows.
- **Evidence Locker & Vault:** Cryptographic proof inspector with SHA-256 hash chains for tamper-evident auditor verification.
- **Telemetry Scanner:** Live compliance scanning simulation and execution logs.
- **Audit Trail & Governance:** Immutable event log tracking every system action and configuration change.

---

## Tech Stack

- **React 19** — Frontend component framework
- **Vite 8** — Next-gen frontend tooling and rapid HMR
- **Zustand 5** — Reactive client state & telemetry simulation store
- **Tailwind CSS 3** — Design tokens, themes, and utility classes
- **Lucide React** — Consistent icon set
- **Framer Motion 13** — Page transitions and smooth micro-interactions
- **Oxlint** — Ultra-fast static analysis and linting

---

## Project Structure

```text
frontend/
├── public/              # Static assets & brand logos
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── audit/       # PDF audit uploader and report viewers
│   │   ├── layout/      # AppShell, Sidebar, Header, PageTransition
│   │   ├── studio/      # Theme selector, density switcher, and style tokens
│   │   └── ui/          # Generic cards, modals, tables, and buttons
│   ├── data/            # Canonical frameworks and controls definitions
│   ├── lib/             # Theme helpers, crypto utilities, and formatters
│   ├── pages/           # Application views (Dashboard, Integrations, Controls, Findings, Evidence, Settings)
│   ├── store/           # Zustand stores (demoStore.js, authStore.js)
│   ├── App.jsx          # Root routing and shell integration
│   ├── index.css        # Global CSS variables, custom scrollbars, and brutalist tokens
│   └── main.jsx         # Application entry point
├── tailwind.config.js   # Tailwind theme extensions (bone, ink, pigment)
└── vite.config.js       # Vite bundler configuration
```

---

## Getting Started

### Prerequisites

Node.js `v18+` and npm installed.

### Installation & Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:5173` to explore the dashboard.

### Production Build

```bash
npm run build
```

---

## License

MIT License.


