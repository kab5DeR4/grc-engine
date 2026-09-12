import { memo } from 'react';
import { ArrowRight, Server, Database, ShieldCheck, Scale } from 'lucide-react';

const StatementTransition = memo(function StatementTransition() {
  const steps = [
    { label: 'Infrastructure', sub: 'GitHub, AWS, K8s', icon: Server },
    { label: 'Evidence', sub: 'Raw State Payloads', icon: Database },
    { label: 'Controls', sub: 'Deterministic Rules', icon: ShieldCheck },
    { label: 'Compliance', sub: 'SOC 2, ISO, NIST', icon: Scale },
  ];

  return (
    <section className="w-full py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-slate-50/60 dark:bg-[var(--ground)] border-y border-slate-200/80 dark:border-slate-800/80 font-sans">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Large Statement */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Your infrastructure already contains the evidence.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            GRC Engine discovers that evidence, evaluates it against explicit controls, and connects the results to compliance frameworks.
          </p>
        </div>

        {/* Visual Transition Pipeline */}
        <div className="pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 max-w-3xl mx-auto">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex-1 sm:flex-initial p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 shadow-xs flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.sub}
                      </div>
                    </div>
                  </div>

                  {idx < steps.length - 1 && (
                    <ArrowRight size={15} className="hidden sm:inline text-slate-400 dark:text-slate-600 shrink-0 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
});

StatementTransition.displayName = 'StatementTransition';

export default StatementTransition;
