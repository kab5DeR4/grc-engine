import { memo } from 'react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

const CoreWorkflowSection = memo(function CoreWorkflowSection() {
  const steps = [
    {
      num: '01',
      title: 'Control',
      description: 'Define technical security standards across regulatory frameworks like SOC 2, ISO 27001, and NIST CSF.',
    },
    {
      num: '02',
      title: 'Discover',
      description: 'Inspect live source repositories, cloud infrastructure, and identity providers using read-only connectors.',
    },
    {
      num: '03',
      title: 'Collect',
      description: 'Snapshot exact configuration states and compute tamper-evident SHA-256 evidence payloads.',
    },
    {
      num: '04',
      title: 'Verify',
      description: 'Deterministically evaluate extracted states against explicit policy rules without probabilistic guesswork.',
    },
    {
      num: '05',
      title: 'Report',
      description: 'Produce auditor-verifiable attestation records backed by immutable cryptographic proof.',
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans border-t border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
            System Workflow
          </div>
          <AnimatedBlurTextHeading 
            as="h2" 
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            From compliance requirements to technical evidence.
          </AnimatedBlurTextHeading>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A continuous verification cycle that eliminates manual audits by anchoring policy directly in source code and cloud configuration.
          </p>
        </div>

        {/* Clean visual sequence — not giant cards, but a clean connected sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
          {steps.map((step, idx) => (
            <div 
              key={step.num}
              className="relative p-4 rounded-lg bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-orange-600 dark:text-orange-400">
                    {step.num}
                  </span>
                  {idx < steps.length - 1 && (
                    <span className="hidden md:inline text-zinc-300 dark:text-zinc-700 text-xs font-mono">
                      &rarr;
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-[10px] font-mono text-zinc-400">
                Phase {idx + 1} of 5
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

CoreWorkflowSection.displayName = 'CoreWorkflowSection';
export default CoreWorkflowSection;
