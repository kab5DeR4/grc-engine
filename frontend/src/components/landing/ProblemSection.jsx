import { memo } from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProblemSection = memo(function ProblemSection() {
  const problems = [
    {
      title: 'Manual Screenshot Drudgery',
      desc: 'Engineers spend hundreds of hours manually capturing cloud settings and console screenshots for annual audit binders.',
    },
    {
      title: 'Point-in-Time Blindspots',
      desc: 'Audits test an organization once a year, missing security drift and misconfigurations that occur the other 364 days.',
    },
    {
      title: 'Subjective Checkbox Compliance',
      desc: 'Self-attested questionnaires create an illusion of security without proving that technical controls are actually enforced in code.',
    },
  ];

  const solutions = [
    {
      title: 'Continuous Evidence Ingestion',
      desc: 'Read-only connectors continuously stream raw JSON configuration state from GitHub, AWS, GCP, Okta, and Kubernetes.',
    },
    {
      title: 'Deterministic Control Evaluation',
      desc: 'Explicit boolean and threshold assertions evaluate every control in code with explainable PASS / FAIL outcomes.',
    },
    {
      title: 'Cryptographic Audit Proofs',
      desc: 'Every evidence payload is stamped with a SHA-256 hash at capture time, creating an immutable ledger for external auditors.',
    },
  ];

  return (
    <section className="w-full bg-slate-50 dark:bg-[var(--ground)] py-18 sm:py-22 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-200 dark:border-slate-800 font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono font-bold tracking-wider text-sky-600 dark:text-sky-400 uppercase mb-2">
            The Fundamental Problem
          </div>
          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] font-serif mb-4">
            The disconnect between <span className="italic font-normal text-rose-600 dark:text-rose-400">technical reality</span> and compliance.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-600 dark:text-slate-300 leading-relaxed">
            The problem is not that compliance frameworks are useless. The problem is that traditional compliance relies on static documents and questionnaires disconnected from the actual infrastructure running in production.
          </p>
        </div>

        {/* Comparison Grid: Traditional vs Technical Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          
          {/* Traditional Compliance Column */}
          <div className="p-6 sm:p-8 rounded-xl bg-rose-50/50 dark:bg-rose-950/10 border border-rose-200/80 dark:border-rose-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-rose-200 dark:border-rose-900/40 mb-6">
                <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                  Traditional Questionnaire Audits
                </span>
                <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 px-2 py-0.5 rounded font-semibold">
                  Broken &amp; Fragile
                </span>
              </div>

              <div className="space-y-6">
                {problems.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle size={15} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-slate-900 dark:text-slate-100 font-mono">
                        {p.title}
                      </h3>
                      <p className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-200 dark:border-rose-900/30 text-xs font-mono text-rose-700 dark:text-rose-400">
              Result: Weeks of audit panic, stale evidence, and compliance theater.
            </div>
          </div>

          {/* GRC Engine Approach Column */}
          <div className="p-6 sm:p-8 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-200/80 dark:border-emerald-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-200 dark:border-emerald-900/40 mb-6">
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  GRC Engine Technical Verification
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded font-semibold">
                  Continuous &amp; Verifiable
                </span>
              </div>

              <div className="space-y-6">
                {solutions.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={15} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-slate-900 dark:text-slate-100 font-mono">
                        {s.title}
                      </h3>
                      <p className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-200 dark:border-emerald-900/30 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                Result: 365-day audit readiness with cryptographic integrity.
              </span>
              <Link to="/controls" className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 text-decoration-none">
                <span>View Controls</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

ProblemSection.displayName = 'ProblemSection';

export default ProblemSection;
