import { memo } from 'react';
import { X, Check } from 'lucide-react';

const ProblemComparison = memo(function ProblemComparison() {
  const traditionalSteps = [
    { title: 'Request evidence', detail: 'Back-and-forth emails asking engineers for manual proof.' },
    { title: 'Collect screenshots', detail: 'Manual screenshots of cloud consoles and admin settings.' },
    { title: 'Search spreadsheets', detail: 'Outdated trackers and checklists that rot after audit completion.' },
    { title: 'Manually map controls', detail: 'Subjective interpretations across disconnected spreadsheets.' },
    { title: 'Review findings', detail: 'Annual fire drills trying to assemble evidence packages.' },
    { title: 'Repeat for the next audit', detail: 'Start the entire manual cycle over every year.' },
  ];

  const grcEngineSteps = [
    { title: 'Discover technical state', detail: 'Read-only connectors continuously query cloud and code assets.' },
    { title: 'Collect evidence', detail: 'Structured configuration snapshots computed with SHA-256 digests.' },
    { title: 'Map evidence to controls', detail: 'Single technical telemetry stream mapped across SOC 2, ISO, and NIST.' },
    { title: 'Evaluate automatically', detail: 'Deterministic policy rules verify pass/fail state in milliseconds.' },
    { title: 'Preserve verification context', detail: 'Exact configuration payloads and timestamps saved in an immutable ledger.' },
    { title: 'Continuously reassess', detail: 'Automated scans detect and alert on compliance drift as it happens.' },
  ];

  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
            The Shift
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Compliance shouldn't depend on screenshots and spreadsheets.
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Manual compliance creates point-in-time documents disconnected from reality. GRC Engine makes compliance an ongoing property of your infrastructure.
          </p>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Column 1: Traditional Workflow */}
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Traditional Workflow
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Manual &bull; Point-in-time
              </span>
            </div>

            <div className="space-y-3.5">
              {traditionalSteps.map((step, idx) => (
                <div key={step.title} className="flex items-start gap-3 text-xs">
                  <div className="w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={10} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-medium text-zinc-800 dark:text-zinc-300">
                      {step.title}
                    </div>
                    <div className="text-zinc-500 leading-relaxed">
                      {step.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono text-zinc-400">
              Outcome: High friction, stale documentation, zero continuous certainty.
            </div>
          </div>

          {/* Column 2: GRC Engine Workflow */}
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-500" />
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  GRC Engine Workflow
                </h3>
              </div>
              <span className="text-[11px] font-mono text-orange-600 dark:text-orange-400 font-medium">
                Automated &bull; Verifiable
              </span>
            </div>

            <div className="space-y-3.5">
              {grcEngineSteps.map((step, idx) => (
                <div key={step.title} className="flex items-start gap-3 text-xs">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      {step.title}
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {step.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              Outcome: Continuous compliance backed by cryptographic proof.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

ProblemComparison.displayName = 'ProblemComparison';
export default ProblemComparison;
