import { memo } from 'react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

const CoreCapabilitiesSection = memo(function CoreCapabilitiesSection() {
  const capabilities = [
    {
      num: '01',
      title: 'Evidence Collection',
      description: 'Collect technical evidence from connected infrastructure and source-code systems.'
    },
    {
      num: '02',
      title: 'Control Evaluation',
      description: 'Evaluate technical state against compliance requirements.'
    },
    {
      num: '03',
      title: 'Risk & Posture',
      description: 'Surface gaps and provide an understandable security/compliance posture.'
    },
    {
      num: '04',
      title: 'Evidence Integrity',
      description: 'Preserve traceability between results and the evidence used to produce them.'
    }
  ];

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono tracking-wider uppercase text-zinc-500 font-semibold">
            Core Capabilities
          </div>
          <AnimatedBlurTextHeading 
            as="h2" 
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            A unified verification platform.
          </AnimatedBlurTextHeading>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Everything required to build, evaluate, and prove continuous compliance.
          </p>
        </div>

        {/* 2x2 Editorial Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          {capabilities.map((cap, idx) => (
            <div 
              key={cap.num}
              className="bg-zinc-50/50 dark:bg-zinc-900/50 p-8 sm:p-10 flex flex-col justify-between space-y-12 transition-colors hover:bg-white dark:hover:bg-zinc-900 group"
            >
              <div className="text-xs font-mono text-zinc-400 group-hover:text-orange-500 transition-colors">
                {cap.num} //
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {cap.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

CoreCapabilitiesSection.displayName = 'CoreCapabilitiesSection';
export default CoreCapabilitiesSection;
