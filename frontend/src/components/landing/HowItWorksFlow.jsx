import { memo } from 'react';
import { Search, Layers, Cpu, ShieldCheck, FileCheck2 } from 'lucide-react';

const HowItWorksFlow = memo(function HowItWorksFlow() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Ingest raw configuration state from repositories, clouds, and identity providers.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Normalize',
      desc: 'Translate heterogeneous vendor schemas into standard canonical controls.',
      icon: Layers,
    },
    {
      num: '03',
      title: 'Evaluate',
      desc: 'Execute deterministic, explainable rule logic against each control requirement.',
      icon: Cpu,
    },
    {
      num: '04',
      title: 'Verify',
      desc: 'Stamp evidence with SHA-256 fingerprints to create an immutable audit record.',
      icon: ShieldCheck,
    },
    {
      num: '05',
      title: 'Report',
      desc: 'Connect verified outcomes to SOC 2, ISO 27001, and auditor export packages.',
      icon: FileCheck2,
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-20 sm:py-24 px-4 sm:px-6 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            Engine Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            How GRC Engine works.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            A 5-step continuous pipeline turning infrastructure state into audit proofs.
          </p>
        </div>

        {/* 5-Step Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="p-5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                      {step.num}
                    </span>
                    <Icon size={16} className="text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

HowItWorksFlow.displayName = 'HowItWorksFlow';

export default HowItWorksFlow;
