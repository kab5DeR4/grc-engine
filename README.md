# GRC Engine — Architecture & Monorepo

Welcome to the GRC Engine repository. This project is structured as a modular monorepo containing three core components:

```
grc-engine/
├── frontend/    # High-performance React (Vite) Brutalist UI & Landing Funnel
├── backend/     # Python FastAPI / Audit Engine backend service
└── ai-rag/      # RAG Pipeline, document embeddings, and AI training scripts
```

## Structure Overview

### 1. Frontend (`/frontend`)
Built with React, Vite, Framer Motion, and Tailwind CSS. Features an interactive landing page, brutalist design system, and custom macOS-inspired Magnification Dock navigation.

### 2. Backend (`/backend`)
Python-based audit engine, API handlers, policy processors, and report generators.

### 3. AI & RAG (`/ai-rag`)
Modular pipeline for indexing compliance documentation (SOC 2, ISO 27001) into vector storage and serving real-time AI security remediation assistance.
