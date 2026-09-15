import { memo } from 'react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';
import { motion } from 'framer-motion';

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
    <section id="how-it-works" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans border-t border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono tracking-wider uppercase text-zinc-500 font-semibold">
            System Workflow
          </div>
          <AnimatedBlurTextHeading 
            as="h2" 
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            From compliance requirements to technical evidence.
          </AnimatedBlurTextHeading>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A continuous verification cycle that eliminates manual audits by anchoring policy directly in source code and cloud configuration.
          </p>
        </div>

        {/* Workflow visualization */}
        <div className="relative mt-12">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-[14px] left-0 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800">
            <motion.div 
              className="h-full bg-orange-500/50 dark:bg-orange-500/50"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {/* Mobile Connecting Line */}
          <div className="md:hidden absolute top-0 left-[14px] w-[1px] h-full bg-zinc-200 dark:bg-zinc-800">
             <motion.div 
              className="w-full bg-orange-500/50 dark:bg-orange-500/50"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div 
                key={step.num}
                className="relative flex md:flex-col items-start gap-4 md:gap-6 flex-1 group"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-[10px] font-mono font-medium text-orange-600 dark:text-orange-500 transition-colors group-hover:border-orange-500/50 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 z-10">
                  {step.num}
                </div>
                <div className="space-y-1.5 md:space-y-2 mt-0.5 md:mt-0">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed md:max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
});

CoreWorkflowSection.displayName = 'CoreWorkflowSection';
export default CoreWorkflowSection;
