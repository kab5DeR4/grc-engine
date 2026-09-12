import { Link } from 'react-router-dom';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import { Shield, Activity, Share2, Lock, Zap, Server, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FeaturesPage() {
  const capabilities = [
    { icon: Activity, title: 'Continuous Ingestion', desc: 'Real-time telemetry streams from GitHub, AWS, and Kubernetes tracking infrastructure mutations down to the millisecond.' },
    { icon: Shield, title: 'Deterministic Rules', desc: 'Explicit Boolean assertions written in code that produce explainable, reproducible PASS / FAIL verdicts without AI hallucinations.' },
    { icon: Lock, title: 'Cryptographic Proofs', desc: 'Every evidence artifact receives an immutable SHA-256 fingerprint upon capture, preserving a tamper-evident audit trail.' },
    { icon: Share2, title: 'Multi-Framework Mapping', desc: 'Canonical controls map simultaneously across SOC 2 Type II, ISO 27001, NIST CSF, and CIS Controls v8.' },
    { icon: Zap, title: 'Instant Drift Alerts', desc: 'Real-time notification triggers when production configuration drifts from your baseline compliance policies.' },
    { icon: Server, title: 'Sovereign VPC Deployable', desc: 'Run as a self-contained service within your own VPC or air-gapped network for total data residency and zero exfiltration.' }
  ];

  return (
    <div className="w-full min-h-screen bg-[var(--ground)] text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors">
      <StudioNav />
      
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 sm:px-6 md:px-8 text-center border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Platform Capabilities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08]">
            Engineering capabilities built for <span className="text-sky-600 dark:text-sky-400">verification</span>.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Turn technical infrastructure state into continuous, explainable compliance intelligence. Replace static paperwork with deterministic assertions and cryptographic proofs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link 
              to="/dashboard" 
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 text-sm font-bold transition-all duration-150 active:scale-[0.98] inline-flex items-center gap-2 shadow-sm text-decoration-none"
            >
              <span>Explore Platform Demo</span>
              <ArrowRight size={15} />
            </Link>
            <Link 
              to="/docs" 
              className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-all duration-150 active:scale-[0.98] text-decoration-none border border-slate-200 dark:border-slate-750"
            >
              Read Architecture Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            Architecture Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for precision and scale.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-xl bg-white dark:bg-[var(--ground)] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Icon size={19} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Deep Dive Feature Strip */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-slate-50 dark:bg-[var(--ground)] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              Observability &bull; Real-Time Telemetry
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              See everything. Miss nothing.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Traditional compliance relies on annual point-in-time assessments that are outdated the day after an audit. GRC Engine connects directly to cloud APIs to ingest configuration telemetry continuously.
            </p>
            <div className="space-y-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>100% read-only API-driven telemetry collection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Agentless architecture with zero runtime performance impact</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>Cryptographically sealed evidence records with historical retention</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 font-mono text-xs shadow-md space-y-2">
            <div className="border-b border-slate-800 pb-3 mb-3 flex justify-between text-[11px] text-slate-400">
              <span className="font-bold text-slate-200">INGESTION STREAM</span>
              <span className="text-emerald-400 font-semibold">&bull; LIVE SYNC ACTIVE</span>
            </div>
            <div className="space-y-1.5 opacity-90 leading-relaxed text-[11.5px]">
              <p className="text-slate-300">&gt; Ingesting AWS VPC flow logs &amp; security groups... [OK]</p>
              <p className="text-slate-300">&gt; Evaluating S3 bucket KMS default encryption... [PASS]</p>
              <p className="text-emerald-400">&gt; GitHub main branch protection rules: 2 approvals required... [PASS]</p>
              <p className="text-slate-300">&gt; Okta WebAuthn hardware token attestation... [PASS]</p>
              <p className="text-sky-400">&gt; Fingerprinting proof: sha256:7f83b165... [SEALED]</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ready to upgrade your compliance intelligence?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Explore GRC Engine today and experience deterministic infrastructure compliance.
          </p>
          <div className="pt-2">
            <Link 
              to="/dashboard"
              className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 text-sm font-bold transition-all duration-150 active:scale-[0.98] inline-flex items-center gap-2 shadow-md text-decoration-none"
            >
              <span>Explore the Platform</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <StudioFooter />
    </div>
  );
}
