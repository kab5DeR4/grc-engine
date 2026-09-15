import { memo } from 'react';
import { ExternalLink, Check } from 'lucide-react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const OpenSourceSection = memo(function OpenSourceSection() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono tracking-wider uppercase text-zinc-500 font-semibold">
            Trust & Transparency
          </div>
          <AnimatedBlurTextHeading 
            as="h2" 
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            Built in the open.
          </AnimatedBlurTextHeading>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Security tools require trust. GRC Engine is open source, allowing you to inspect the implementation, review the architecture, and verify the deterministic evaluation engine yourself.
          </p>
        </div>

        {/* Main Content Container */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center gap-8 relative overflow-hidden">
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-mono text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-2">
              <Check size={14} className="text-emerald-600 dark:text-emerald-500" />
              <span>MIT License</span>
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-emerald-600 dark:text-emerald-500" />
              <span>FastAPI Python Core</span>
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-emerald-600 dark:text-emerald-500" />
              <span>React 19 Frontend</span>
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <a
              href="https://github.com/kab5DeR4/grc-engine"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:text-zinc-900 dark:bg-zinc-100 dark:hover:bg-white shadow-sm transition-colors no-underline"
            >
              <GithubIcon size={18} />
              <span>View on GitHub</span>
              <ExternalLink size={14} className="opacity-70 ml-1" />
            </a>
            <span className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-1 rounded">
              kab5DeR4/grc-engine
            </span>
          </div>

        </div>

      </div>
    </section>
  );
});

OpenSourceSection.displayName = 'OpenSourceSection';
export default OpenSourceSection;
