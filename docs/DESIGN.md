# GRC ENGINE DESIGN SYSTEM — DESIGN.md

> **Notice for Coding & Design Agents:** This document is the authoritative UI/UX standard for GRC Engine. All generated React code, component abstractions, layout structures, and visual styling MUST adhere strictly to the rules, tokens, and anti-patterns defined herein.

---

## 1. Purpose & Scope

- **Product Name:** GRC Engine (Continuous Compliance & Automated Infrastructure Governance Platform)
- **Target Users:** CISOs, Security Engineers, SecOps Leads, DevSecOps Engineers, and External Compliance Auditors (SOC 2, ISO 27001, NIST SP 800-53, HIPAA, CIS).
- **Main Jobs to be Done:**
  1. Map real-time cloud and engineering telemetry to canonical security controls without manual spreadsheets.
  2. Evaluate deterministic policy directives (OPA Rego, Kyverno) continuously with zero drift.
  3. Generate tamper-evident, auditor-grade cryptographic evidence proofs (SHA-256 digests) and PDF attestations.
  4. Enforce attribute-based access control (ABAC) and role-based clearance across infrastructure mutations.
- **Brand Voice & Personality:** High-Assurance Systems Ledger. Calm, precise, authoritative, transparent, developer-native, and zero-slop.
- **Supported Platforms:** Web Application (Desktop-first, Responsive Mobile/Tablet).
- **Responsive Breakpoints:**
  - `sm`: `640px`
  - `md`: `768px`
  - `lg`: `1024px`
  - `xl`: `1280px`
  - `2xl`: `1536px`

---

## 2. Product & User Principles

1. **Evidence Grounded in Telemetry:** Never present superficial "100% compliant" badges without linking directly to verifiable telemetry streams and cryptographic SHA-256 digests.
2. **Speed & Direct Manipulation:** Input latency must be zero ($0\text{ms}$). Give instant physical press feedback on `pointerdown` (`active:scale-[0.97]`).
3. **Interruptible Motion:** Use velocity-aware springs (`damping: 28, stiffness: 320`) for transitions. Never lock the UI thread during animations.
4. **Scannable System Hierarchy:** Sans-serif for human copy and headings; monospace strictly reserved for system identifiers (`CTL-001`), hashes (`sha256:...`), code directives, and numerical metrics.
5. **No AI Visual Slop:** Strictly forbid decorative purple-to-indigo gradients, parchment/cream backgrounds, low-contrast text, ambient blur orbs, and generic template card grids.

---

## 3. Visual Hierarchy & Layout Rules

- **Page Shell:** 
  - Outer page container: `bg-slate-50 dark:bg-[#070D1E] text-slate-900 dark:text-slate-100 font-sans min-h-screen`.
  - Header: Sticky header with saturated glass backdrop (`bg-white/80 dark:bg-[#070D1E]/80 backdrop-blur-xl saturate-180 border-b border-slate-200/80 dark:border-slate-800/80`).
  - Sidebar: Collapsible navigation sidebar with crisp border boundaries (`border-r border-slate-200 dark:border-slate-800`).
- **Container Max Width:** `max-w-[1400px]` for dashboard workspace pages; `max-w-6xl` (`1152px`) for editorial landing pages.
- **Card Hierarchy:**
  - Level 1 Cards: `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6`.
  - Level 2 Inset Containers: `bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4`.
  - Code/Telemetry Blocks: `bg-slate-950 text-slate-100 font-mono text-xs rounded-xl p-4 border border-slate-800`.

---

## 4. Token & Visual System Guidance

### Colors (Tailwind v3 Palette Tokens)
- **Background Ground:** `bg-slate-50` (Light) / `bg-[#070D1E]` (Dark)
- **Surface Panels:** `bg-white` (Light) / `bg-slate-900` (Dark)
- **Elevated Insets:** `bg-slate-100` (Light) / `bg-slate-800` (Dark)
- **Code & Terminal Surfaces:** `bg-slate-950 text-slate-100 border-slate-800`
- **Text Ink:** `text-slate-900` (Primary Light) / `text-white` (Primary Dark), `text-slate-600` (Secondary Light) / `text-slate-400` (Secondary Dark)
- **Brand Accent (Sky):** `sky-500` (`#0ea5e9`), `sky-600` (`#0284c7`), `sky-400` (`#38bdf8`)
- **Pass / Compliant (Emerald):** `bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20`
- **Fail / Critical Drift (Rose):** `bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20`
- **Warn / Action Needed (Amber):** `bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20`

### Typography
- **Primary Body & UI Face:** `font-sans` (`Inter`, system-ui).
- **Data & System Identifier Face:** `font-mono` (`Azeret Mono`, `SF Mono`, `Consolas`).

### Spacing & Radius
- **Border Radius:**
  - Buttons / Controls: `rounded-xl` (`12px`) or `rounded-lg` (`8px`).
  - Cards / Modals: `rounded-2xl` (`16px`).
  - Badges / Pills: `rounded-full` or `rounded-md` (`6px`).
- **Touch Target Minimum:** $\ge 36\text{px} \times 36\text{px}$ (with `px-3.5 py-2` padding).

### Motion Spring Tokens (Framer Motion)
- **Page View Transitions:** `{ type: "spring", damping: 28, stiffness: 320, mass: 0.8 }`
- **Modals, Drawers & Popovers:** `{ type: "spring", damping: 25, stiffness: 350 }`
- **Press Physics:** `active:scale-[0.97] transition-transform duration-75`

---

## 5. Component Selection & Usage Rules

1. **Buttons:**
   - **Primary Action:** `bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 rounded-xl text-xs font-mono font-bold uppercase active:scale-95 transition-all shadow-xs`.
   - **Secondary Action:** `bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold active:scale-95 transition-all`.
   - **Danger / Destructive:** `border border-rose-300 dark:border-rose-800 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-mono font-bold active:scale-95 transition-all`.

2. **Status Badges:**
   - Always pair color with text labels and icon indicators (`CheckCircle2`, `XCircle`, `AlertTriangle`). Never rely on color alone.

3. **Tabs & Segmented Controls:**
   - Selected Pill: `bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 font-bold shadow-xs`.
   - Unselected Pill: `bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300`.

4. **Modals & Drawers:**
   - Must include an accessible backdrop scrim (`bg-slate-950/70 backdrop-blur-xs`), explicit close button (`X`), and keyboard `Escape` handler.

---

## 6. Interaction States & Behavior

- **Default:** High-contrast crisp border, baseline text opacity.
- **Hover:** Border shifts (`border-slate-300 dark:border-slate-700`), background subtle highlight, text opacity $100\%$.
- **Focus-Visible:** Mandatory keyboard ring (`focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none`).
- **Active / Pointer-Down:** Immediate scale compression (`active:scale-[0.97]`).
- **Disabled:** `opacity-50 cursor-not-allowed pointer-events-none`.

---

## 7. Content & Microcopy Guidance

- **Voice:** Direct, concise, technical, clear. Simple developer English.
- **Capitalization:**
  - UI Labels, Status Badges, System Tokens: `UPPERCASE` (`VERIFIED PASS`, `SOVEREIGN IDENTITY`, `CRITICAL`).
  - Headings & Paragraphs: Sentence case or title case for major page headings.
- **Action Verbs:** Use concrete engineering verbs: `RUN AUDIT`, `TEST DIRECTIVE ASSERTION`, `GENERATE TOKEN`, `EXPORT ATT-PDF`, `VERIFY HASH`.

---

## 8. Accessibility Requirements (WCAG 2.1 AA)

- **Contrast:** Minimum 4.5:1 for body copy; 3:1 for large headers and interactive icons.
- **Keyboard Navigation:** Full tab order traversal across all forms, buttons, drawers, and modal dialogs.
- **Screen Reader Labels:** All icon-only buttons MUST include an `aria-label` or `title` attribute.
- **Reduced Motion:** Check `useReducedMotion()` from Framer Motion; disable `scale` and `y` offsets when `prefers-reduced-motion: reduce` is active.

---

## 9. Responsive Behavior

- **Desktop ($\ge 1024\text{px}$):** Multi-column split views (e.g. Left Directive List + Right Live AST Inspector; Left Controls List + Right Inspector Sheet).
- **Tablet ($768\text{px} - 1023\text{px}$):** 2-column grid adaptation, collapsible sidebar menu.
- **Mobile ($< 768\text{px}$):** Single-column stacked layout, full-screen mobile menu drawer with spring slide-down. Touch hit targets minimum $36\text{px}$.

---

## 10. AI & AST UI Patterns

- **Interactive Policy Sandbox:** Allow developers to edit telemetry JSON payloads and execute live OPA/Kyverno AST rule evaluations with millisecond execution feedback.
- **Tamper-Evident SHA-256 Proof Inspector:** Render full cryptographic hash certificates with 1-click copy and FIPS 140-3 hardware signing verification.

---

## 11. Anti-Patterns & Prohibited Choices

- ❌ **NO Cream/Parchment Default Backgrounds:** Never use `#E7E3DA`, `#DCD7CB`, or `#9B3418`. Use slate tokens.
- ❌ **NO Purple-on-White AI Gradients:** Avoid generic AI purple/indigo gradient text or buttons.
- ❌ **NO Ambient Decorative Orbs:** Do not insert floating background blur blobs.
- ❌ **NO Full-Page Monospace Copy:** Do not set `font-mono` on page wrapper containers or long body text.
- ❌ **NO Destructive Commits:** Never execute git commits unless explicitly instructed by the user.

---

## 12. Canonical Design References

- **Live Repository:** [kab5DeR4/grc-engine](https://github.com/kab5DeR4/grc-engine)
- **Live Vercel Application:** [grc-engine.vercel.app](https://grc-engine.vercel.app/)
- **Core Code Files:**
  - App Shell: [AppShell.jsx](file:///C:/Users/rnale/Desktop/Home/grc-engine/frontend/src/components/layout/AppShell.jsx)
  - Navigation: [StudioNav.jsx](file:///C:/Users/rnale/Desktop/Home/grc-engine/frontend/src/components/layout/StudioNav.jsx), [Header.jsx](file:///C:/Users/rnale/Desktop/Home/grc-engine/frontend/src/components/layout/Header.jsx), [Sidebar.jsx](file:///C:/Users/rnale/Desktop/Home/grc-engine/frontend/src/components/layout/Sidebar.jsx)
  - Transitions: [PageTransition.jsx](file:///C:/Users/rnale/Desktop/Home/grc-engine/frontend/src/components/layout/PageTransition.jsx)
  - Key Pages: [LandingPage.jsx](file:///C:/Users/rnale/Desktop/Home/grc-engine/frontend/src/pages/LandingPage.jsx), [Dashboard.jsx](file:///C:/Users/rnale/Desktop/Home/grc-engine/frontend/src/pages/Dashboard.jsx), [Architecture.jsx](file:///C:/Users/rnale/Desktop/Home/grc-engine/frontend/src/pages/Architecture.jsx)

---

## 13. Preflight Checklist Before Generating UI

- [ ] Am I using `bg-slate-50 dark:bg-[#070D1E]` for the background?
- [ ] Are all Lucide React icons explicitly imported at the top of the file?
- [ ] Is `font-sans` used for human text and `font-mono` strictly for system data tokens?
- [ ] Do interactive buttons have `active:scale-95` or `whileTap={{ scale: 0.98 }}` tactile feedback?
- [ ] Have I tested dark and light mode contrast compatibility?

---

## 14. Final UI QA Checklist

- [ ] `npx oxlint` passes with **0 errors and 0 warnings**.
- [ ] `npm run build` succeeds cleanly without compilation failures.
- [ ] All interactive buttons, modals, and tabs function seamlessly without layout shift.
