# GRC Engine — Known Limitations & Technical Trade-offs

Senior engineering transparency regarding architectural boundaries, scale limitations, and deliberate design trade-offs in **GRC Engine v1.0.0**.

---

## 1. Provider API Rate Limiting & Scale Boundaries

- **Limitation:** In massive enterprise GitHub organizations (>2,500 repositories), querying branch protection and security analysis settings for every repository sequentially can exhaust the 5,000 requests/hour GitHub PAT rate limit.
- **Current Behavior:** The connector catches `403 Rate Limited` and reports remaining quota with reset timestamp, but halts ongoing scans until the reset epoch.
- **Architectural Trade-off:** We chose fine-grained per-branch REST queries over bulk GraphQL queries in v1.0 to ensure 100% field compatibility across GitHub Enterprise Server and GitHub Cloud.
- **Roadmap Resolution:** v1.2 introduces GitHub App installation tokens with elevated 15,000 req/hr limits and batch GraphQL asset queries.

---

## 2. Storage Tier: SQLite (Local Dev) vs PostgreSQL (Production)

- **Limitation:** Default local development uses SQLite via `aiosqlite`. Under concurrent multi-threaded writes (e.g. 50 parallel scan jobs inserting evidence artifacts simultaneously), SQLite can encounter `database is locked` table contention.
- **Mitigation:** Production environments must configure `DATABASE_URL=postgresql+asyncpg://...` where connection pooling and row-level locking handle high-concurrency write bursts.

---

## 3. Polling Latency vs Real-Time Webhook Ingestion

- **Limitation:** Infrastructure state is currently evaluated via scheduled poll cycles (e.g. every 6 hours) or manual operator triggers. Security drift that occurs between intervals remains undetected until the subsequent scan run.
- **Roadmap Resolution:** v1.2 adds webhook receivers (`/api/v1/webhooks/github`, `/api/v1/webhooks/aws-eventbridge`) to trigger instant sub-second drift evaluation upon `branch_protection_rule.deleted` or `iam_policy.updated` events.

---

## 4. Policy Document Parsing & Scanned PDF OCR

- **Limitation:** The policy audit CLI and PDF parser (`pypdf`) extract native vector text layers. PDFs generated as rasterized image scans (e.g. photocopied paper contracts without embedded OCR text) will return zero characters.
- **Mitigation:** The system raises `HTTP 422 Unprocessable Entity` with a clear message requesting a searchable vector PDF or OCR-preprocessed document.

---

## 5. Memory Footprint During Massive Repo Tree Ingestion

- **Limitation:** In-memory AST normalization of huge infrastructure-as-code repositories (>100,000 lines of Terraform) can spike server RAM up to 1.2 GB per worker.
- **Mitigation:** Future versions stream AST nodes chunk-by-chunk using generator pipelines rather than loading the entire syntax tree into memory.
