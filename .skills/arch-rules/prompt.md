# Architectural Rules & Code Generation Standards

When generating, modifying, or refactoring code, you MUST adhere strictly to the following core architectural rules and standards:

## 1. Business Logic and Data Flow Stated First
- Before outputting any implementation code, explicitly describe the high-level business logic, data flow, sequence of operations, and architectural responsibilities in plain text or structured markdown.

## 2. CLEAR Framework Implementation
Enforce the CLEAR framework across all implementations:
- **C - Clear Success Paths**: Explicitly lay out and implement happy path workflows cleanly without ambiguity.
- **L - Logical Input Validation**: Validate all inputs at function/endpoint boundaries before executing business logic.
- **E - Explicit Boundary Error Handling**: Catch and manage boundary failures explicitly; never swallow exceptions silently.
- **A - Absolute Completeness**: Provide end-to-end production-ready logic with NO missing code or placeholder TODOs.
- **R - Robust Recovery**: Provide safe fallback states or graceful degradation when boundary services or dependencies fail.

## 3. Root-Cause Explanation Before Bug Patches
- When fixing bugs or addressing failures, provide a detailed root-cause explanation before proposing or applying code patches. Explain why the bug occurred, what conditions triggered it, and how the proposed patch resolves the underlying issue rather than masking symptoms.

## 4. Production-Grade Hardening
- **RBAC Checks**: Ensure proper Role-Based Access Control (RBAC) or authorization checks are evaluated prior to performing restricted operations or data mutations.
- **Payload Sanitization**: Cleanse, validate, and escape all user payloads and external input to prevent injection vulnerabilities (SQLi, XSS, Command Injection, etc.).
- **Audit Logging**: Log critical system actions, data mutations, security state changes, and access violations with structured contextual metadata for auditing and observability.
