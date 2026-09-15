import { memo } from 'react';
import { X, Check } from 'lucide-react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

const ProblemComparison = memo(function ProblemComparison() {
  const traditionalSteps = [
    { title: 'Policy', detail: 'Written in Word, disconnected from reality.' },
    { title: 'Manual review', detail: 'Subjective assessments by external auditors.' },
    { title: 'Screenshots', detail: 'Point-in-time pictures that are instantly out of date.' },
    { title: 'Spreadsheets', detail: 'Fragile trackers for evidence collection.' },
    { title: 'Audit', detail: 'Painful annual fire drills to prove compliance.' },
  ];

  const grcEngineSteps = [
    { title: 'Control', detail: 'Codified policy mapped to specific technical rules.' },
    { title: 'Evidence', detail: 'Cryptographic configuration state from source.' },
    { title: 'Verification', detail: 'Deterministic pass/fail logic evaluated in milliseconds.' },
    { title: 'Result', detail: 'Continuous visibility into security posture.' },
    { title: 'Traceable evidence', detail: 'Immutable ledger of every check and outcome.' },
  ];

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono tracking-wider uppercase text-zinc-500 font-semibold">
            The Gap
          </div>
          <AnimatedBlurTextHeading 
            as="h2" 
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            Compliance shouldn't depend on screenshots.
          </AnimatedBlurTextHeading>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative max-w-5xl mx-auto">
          
          {/* Column 1: Traditional Workflow */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <h3 className="text-sm font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Traditional Workflow
              </h3>
            </div>

            <div className="space-y-4">
              {traditionalSteps.map((step, idx) => (
                <div key={step.title} className="flex items-start gap-4 text-sm group">
                  <div className="w-5 h-5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center shrink-0 mt-0.5 border border-zinc-200 dark:border-zinc-700">
                    <X size={12} strokeWidth={2} />
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-zinc-600 dark:text-zinc-400">
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VS Divider on Desktop */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-3/4 bg-zinc-200 dark:bg-zinc-800 flex-col items-center justify-center">
            <div className="bg-zinc-50 dark:bg-zinc-950 px-2 py-4">
               <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest rotate-90 whitespace-nowrap">vs</div>
            </div>
          </div>

          {/* Column 2: GRC Engine Workflow */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-orange-200 dark:border-orange-900/50">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <h3 className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                GRC Engine Workflow
              </h3>
            </div>

            <div className="space-y-4">
              {grcEngineSteps.map((step, idx) => (
                <div key={step.title} className="flex items-start gap-4 text-sm">
                  <div className="w-5 h-5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      {step.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Central Thesis Statement */}
        <div className="text-center pt-8 max-w-2xl mx-auto">
          <p className="inline-block px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            From documentation-driven review to evidence-driven verification.
          </p>
        </div>

      </div>
    </section>
  );
});

ProblemComparison.displayName = 'ProblemComparison';
export default ProblemComparison;
