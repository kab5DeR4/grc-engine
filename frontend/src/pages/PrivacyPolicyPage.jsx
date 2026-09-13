import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, Server, ArrowLeft } from 'lucide-react';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy — GRC Engine';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      <StudioNav />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full space-y-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 no-underline transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck size={14} />
            <span>GDPR & CCPA Compliant Baseline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Privacy Policy & Data Handling
          </h1>
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Last Updated: September 14, 2026 | Effective Date: Immediately
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Lock size={18} className="text-orange-500" />
              1. Our Zero-Knowledge Architecture Commitment
            </h2>
            <p>
              GRC Engine is built on a <strong>local-first, deterministic security principle</strong>. When evaluating compliance against source code repositories or cloud infrastructure, the platform never stores source code or persistent credentials on remote servers. All telemetry is evaluated in-transit and distilled directly into cryptographic SHA-256 evidence records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Eye size={18} className="text-orange-500" />
              2. Data We Collect and Process
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Account & Authentication Information:</strong> Work email, hashed credentials (salted bcrypt), and session identifiers for organization workspaces.
              </li>
              <li>
                <strong>Integration Tokens:</strong> Personal Access Tokens (PATs) and integration configurations are encrypted using AES-GCM and used strictly for read-only security posture assessment.
              </li>
              <li>
                <strong>Cryptographic Audit Artifacts:</strong> Hashed JSON evidence states containing metadata (e.g., branch protection status, dependabot configuration) used to generate audit reports.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Server size={18} className="text-orange-500" />
              3. Data Retention & Cryptographic Verification
            </h2>
            <p>
              Audit records and generated evidence artifacts are stored immutably to support auditor non-repudiation. Organization administrators maintain the right to export, purge, or rotate all workspace tokens and historical scans at any time from the Workspace Settings console.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              4. Cookies and Local Storage
            </h2>
            <p>
              We only use essential local storage items strictly required for authentication tokens and interface preferences (such as light/dark mode selection and density settings). We do not deploy third-party advertising trackers or sell your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              5. Contact & Privacy Inquiries
            </h2>
            <p>
              For data access requests or security questions regarding our evidence custody chain, please contact our security team at <span className="font-mono text-zinc-900 dark:text-zinc-100">security@grcengine.dev</span>.
            </p>
          </section>
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
