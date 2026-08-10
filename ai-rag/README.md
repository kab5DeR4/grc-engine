# AI & RAG Pipeline Setup

This directory is reserved for RAG ingestion pipelines, vector database connectors (ChromaDB / Qdrant), and LLM prompts for automated compliance remediation.

## Planned Architecture
- **Document Chunking**: Recursive character splitting for PDF security policies.
- **Embedding Model**: OpenAI text-embedding-3-small or local HuggingFace embeddings.
- **Vector Storage**: Local ChromaDB instance for fast similarity search.
- **Retrieval Augmented Audit**: Querying relevant NIST/SOC2 controls against policy chunks.

// WIP notes for next sprint: wire up LangChain / LlamaIndex connectors here!

