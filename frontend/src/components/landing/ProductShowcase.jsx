import { useState, memo } from 'react';
import { 
  Activity, 
  Database, 
  ShieldCheck, 
  FileCheck2, 
  ArrowRight, 
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductShowcase = memo(function ProductShowcase() {
  const [activeModule, setActiveModule] = useState('POSTURE');

  const modules = [
    {
      id: 'POSTURE',
      title: 'Compliance Posture Command Center',
      tagline: 'Continuous Health Benchmarks Across Frameworks',
      desc: 'Real-time visibility into your compliance state. Watch scores update continuously as cloud configurations change and new code deploys.',
      targetRoute: '/dashboard',
      actionLabel: 'Launch Dashboard',
      icon: Activity,
    },
    {
      id: 'EVIDENCE',
      title: 'Cryptographic Evidence Vault',
      tagline: 'Immutable SHA-256 Audit Records',
      desc: 'Every configuration snapshot is hashed upon ingestion. Review raw payloads, verify cryptographic proofs, and eliminate manual screenshot folders.',
      targetRoute: '/archive',
      actionLabel: 'Explore Evidence Vault',
      icon: Database,
    },
    {
      id: 'CONTROLS',
      title: 'Deterministic Control Evaluation',
      tagline: 'Policy-as-Code Assertion Engine',
      desc: 'Inspect exact boolean and threshold logic applied to every control. Explainable, reproducible audit verdicts with zero probabilistic bias.',
      targetRoute: '/controls',
      actionLabel: 'Inspect Controls Matrix',
      icon: ShieldCheck,
    },
    {
      id: 'REPORTS',
      title: 'Auditor-Ready Report Packages',
      tagline: 'Machine-Verifiable Proof Bundles',
      desc: 'Generate complete audit packages formatted specifically for AICPA and ISO 27001 external auditors with cryptographic hash chains included.',
      targetRoute: '/reports',
      actionLabel: 'View Report Generator',
      icon: FileCheck2,
    },
  ];

  const current = modules.find((m) => m.id === activeModule) || modules[0];

  return (
    <section id="showcase" className="w-full bg-slate-50 dark:bg-[var(--ground)] py-18 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-200 dark:border-slate-800 font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono font-bold tracking-wider text-sky-600 dark:text-sky-400 uppercase mb-2">
            Platform Showcase
          </div>
          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] font-serif mb-4">
            Engineered for <span className="italic font-normal text-sky-600 dark:text-sky-400">precision &amp; transparency</span>.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Directly interact with the core components of the GRC Engine platform. Experience real compliance engineering workflows designed for engineering and audit teams.
          </p>
        </div>

        {/* Tab Switcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isSelected = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-850 border-slate-900 dark:border-sky-400 shadow-md -translate-y-0.5'
                    : 'bg-slate-100/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-850 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                    <Icon size={15} />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                    {mod.title.split(' ')[0]} {mod.title.split(' ')[1]}
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug">
                  {mod.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Showcase Main Display Panel */}
        <div className="bg-[var(--ground)] border border-slate-300 dark:border-slate-700/80 rounded-xl p-6 sm:p-8 md:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">
                  {current.tagline}
                </div>
                <h3 className="text-[24px] sm:text-[28px] font-bold text-slate-900 dark:text-slate-100 font-serif leading-tight">
                  {current.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                  {current.desc}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to={current.targetRoute}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 text-xs font-mono font-bold transition-all inline-flex items-center gap-2 shadow-xs text-decoration-none"
                >
                  <span>{current.actionLabel}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Interactive Realistic Product Mock View */}
            <div className="lg:col-span-7 bg-[var(--surface)]/90 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 font-mono text-xs shadow-inner">
              
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">
                    VIEW // {activeModule}
                  </span>
                </div>
                <span>Sync: Active (18ms)</span>
              </div>

              {/* MODULE 1: COMPLIANCE POSTURE */}
              {activeModule === 'POSTURE' && (
                <div className="space-y-3.5">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        SOC 2 Type II Security Suite
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">98.4% PASSING</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[98.4%]"></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                      <span>140 Controls Verified</span>
                      <span>2 In Remediation Review</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Lock size={16} className="text-sky-500" />
                        ISO / IEC 27001:2022 ISMS
                      </span>
                      <span className="font-bold text-sky-600 dark:text-sky-400">100% VERIFIED</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full w-[100%]"></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                      <span>93 ISMS Technical Controls Active</span>
                      <span className="text-emerald-500 font-semibold">Zero Cryptographic Drift</span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 2: EVIDENCE VAULT */}
              {activeModule === 'EVIDENCE' && (
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-slate-100">EVD-2026-98104 // GitHub Branch Rules</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">SEALED</span>
                    </div>
                    <div className="text-[11px] text-sky-600 dark:text-sky-400 truncate">
                      sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
                    </div>
                    <div className="text-[10.5px] text-slate-500 flex justify-between pt-1 border-t border-slate-100 dark:border-slate-700">
                      <span>Captured: 10:42:01 UTC</span>
                      <span>Target: main branch / PR approval check</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-slate-100">EVD-2026-98105 // AWS S3 Default KMS</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">SEALED</span>
                    </div>
                    <div className="text-[11px] text-sky-600 dark:text-sky-400 truncate">
                      sha256:3d1e498f4bb61b619280d5d36e2f1f0088cb39d2e1b9b5f5e2786a344917a102
                    </div>
                    <div className="text-[10.5px] text-slate-500 flex justify-between pt-1 border-t border-slate-100 dark:border-slate-700">
                      <span>Captured: 10:42:02 UTC</span>
                      <span>Target: s3://prod-data-vault-01</span>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 3: CONTROLS EVALUATION */}
              {activeModule === 'CONTROLS' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
                    <div className="text-sky-400 font-bold text-xs">// RULE EVALUATION: RULE-IAM-04</div>
                    <div className="text-slate-400">assert(user.has_mfa === true &amp;&amp; user.fido2_enabled === true);</div>
                    <div className="text-emerald-400 font-bold text-xs">==&gt; DETERMINISTIC VERDICT: PASS (142 of 142 Users Enforced)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">Auditor Reasoning:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Hardware Key Attestation</span>
                  </div>
                </div>
              )}

              {/* MODULE 4: AUDIT REPORTS */}
              {activeModule === 'REPORTS' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                        AICPA SOC 2 Type II Package (Q3 2026)
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Contains 420 cryptographic evidence logs and control assertions.
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-sky-400 dark:text-slate-950 font-bold text-[11px] text-center">
                      Ready for Export
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-[var(--surface)] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                    Format: Big 4 machine-verifiable JSON ledger + PDF auditor summary.
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

ProductShowcase.displayName = 'ProductShowcase';

export default ProductShowcase;
