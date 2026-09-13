import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scale, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service — GRC Engine';
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
            <Scale size={14} />
            <span>Enterprise Software Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Last Updated: September 14, 2026 | Governing Law: Delaware, United States
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <FileText size={18} className="text-orange-500" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, deploying, or utilizing the GRC Engine platform, API gateways, or associated automated compliance telemetry services, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of an enterprise entity, you represent that you possess lawful authority to bind said entity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-orange-500" />
              2. Permitted Use & Integration Audits
            </h2>
            <p>
              You agree to connect only infrastructure, cloud repositories, and GitHub organizations for which you hold explicit administrative ownership or verifiable authorization to conduct security evaluation. Automated scanning must not be weaponized for denial-of-service or unauthorized penetration testing against third-party systems.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              3. Deterministic Evidence Disclaimers
            </h2>
            <p>
              While GRC Engine provides high-fidelity, deterministic evidence collection and cryptographic proof logs mapped to framework standards (SOC 2, ISO 27001, NIST CSF), the service serves as technical tooling and does not constitute formal legal counsel or guarantee certified audit issuance by independent accredited CPA/AICPA auditing firms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              4. Service Availability & Rate Limits
            </h2>
            <p>
              GRC Engine enforces rate limits across public API surfaces to ensure infrastructure availability. We reserve the right to throttle abusive or automated high-frequency polling exceeding standard operational thresholds.
            </p>
          </section>
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
