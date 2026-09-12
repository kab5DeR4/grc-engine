import { memo } from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';

const WhyInfrastructureNativeSection = memo(function WhyInfrastructureNativeSection() {
  const comparisonRows = [
    {
      dimension: 'Evidence Collection',
      traditional: 'Manual screenshot uploads & console binders',
      grcEngine: 'Continuous automated ingestion via read-only APIs',
    },
    {
      dimension: 'Workflow & Tracking',
      traditional: 'Static spreadsheet trackers & email questionnaires',
      grcEngine: 'Infrastructure-connected canonical controls in code',
    },
    {
      dimension: 'Audit Frequency',
      traditional: 'Point-in-time annual audits with 364 days of blindspots',
      grcEngine: 'Always-current real-time posture with drift alerts',
    },
    {
      dimension: 'Proof Integrity',
      traditional: 'Subjective self-attestation ("Trust me" documentation)',
      grcEngine: 'Cryptographically verifiable SHA-256 evidence fingerprints',
    },
    {
      dimension: 'Team Collaboration',
      traditional: 'Siloed compliance team chasing engineers for proof',
      grcEngine: 'Shared single source of truth for Engineering & Compliance',
    },
  ];

  return (
    <section className="w-full py-6 sm:py-8 sm:py-6 sm:py-8 sm:py-28 px-4 sm:px-6 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            Why Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Why infrastructure-native compliance?
          </h2>
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-1">
            Compare how traditional compliance suites handle audits versus GRC Engine&apos;s technical evidence architecture.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[var(--ground)] shadow-lg overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[var(--surface)]/90 border-b border-slate-200 dark:border-slate-800 p-4 sm:p-5 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            <div className="md:col-span-3">Capability / Dimension</div>
            <div className="hidden md:block md:col-span-4 text-rose-600 dark:text-rose-400">Traditional GRC</div>
            <div className="hidden md:block md:col-span-5 text-emerald-600 dark:text-emerald-400">GRC Engine (Infrastructure-Native)</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            {comparisonRows.map((row) => (
              <div 
                key={row.dimension}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-3 md:gap-4 items-center hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors"
              >
                {/* Dimension */}
                <div className="md:col-span-3 font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                  {row.dimension}
                </div>

                {/* Traditional GRC */}
                <div className="md:col-span-4 flex items-start gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={13} strokeWidth={2.5} />
                  </div>
                  <span>{row.traditional}</span>
                </div>

                {/* GRC Engine */}
                <div className="md:col-span-5 flex items-start gap-2 text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={13} strokeWidth={2.5} />
                  </div>
                  <span>{row.grcEngine}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Built for security engineers, compliance leads, and external auditors</span>
            </span>
            <span className="font-mono text-slate-500 text-[11px]">
              Single source of technical truth
            </span>
          </div>

        </div>

      </div>
    </section>
  );
});

WhyInfrastructureNativeSection.displayName = 'WhyInfrastructureNativeSection';

export default WhyInfrastructureNativeSection;
