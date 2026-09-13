import { memo } from 'react';

// subtle technical evidence graph background
const HeroEvidenceBackground = memo(function HeroEvidenceBackground() {
  return (
    <div 
      aria-hidden="true" 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10"
    >
      {/* faint coordinate grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full stroke-zinc-900/[0.04] dark:stroke-white/[0.04] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)]"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="hero-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 48 0 L 0 0 0 48" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
      </svg>

      {/* subtle connection lines and evidence nodes (desktop only, hidden on small screens) */}
      <div className="hidden md:block absolute inset-0 [mask-image:radial-gradient(ellipse_50%_40%_at_50%_35%,#000_50%,transparent_100%)]">
        <svg className="w-full h-full opacity-40 dark:opacity-30" viewBox="0 0 1200 600" fill="none">
          {/* connecting evidence paths */}
          <path
            d="M 280 180 L 460 220 L 600 160 L 780 230 L 940 190"
            stroke="currentColor"
            strokeWidth="1"
            className="text-zinc-300 dark:text-zinc-700"
            strokeDasharray="4 4"
          />
          <path
            d="M 460 220 L 600 320 L 780 230"
            stroke="currentColor"
            strokeWidth="1"
            className="text-zinc-300 dark:text-zinc-700"
            strokeDasharray="4 4"
          />
          <path
            d="M 600 160 L 600 320"
            stroke="currentColor"
            strokeWidth="1"
            className="text-orange-500/20 dark:text-orange-400/20"
          />

          {/* subtle evidence nodes */}
          {/* Node 1: Source */}
          <circle cx="280" cy="180" r="3" className="fill-zinc-400 dark:fill-zinc-600" />
          <circle cx="280" cy="180" r="7" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1" fill="none" />

          {/* Node 2: Ingestion */}
          <circle cx="460" cy="220" r="3.5" className="fill-zinc-500 dark:fill-zinc-500" />

          {/* Node 3: Verification Core (accented) */}
          <circle cx="600" cy="160" r="4" className="fill-orange-600 dark:fill-orange-500" />
          <circle 
            cx="600" 
            cy="160" 
            r="10" 
            className="stroke-orange-500/30 dark:stroke-orange-400/30 animate-pulse" 
            strokeWidth="1" 
            fill="none" 
            style={{ animationDuration: '6s' }}
          />

          {/* Node 4: Ledger */}
          <circle cx="600" cy="320" r="3" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Node 5: Framework */}
          <circle cx="780" cy="230" r="3.5" className="fill-zinc-500 dark:fill-zinc-500" />

          {/* Node 6: Attestation */}
          <circle cx="940" cy="190" r="3" className="fill-zinc-400 dark:fill-zinc-600" />
          <circle cx="940" cy="190" r="7" className="stroke-zinc-300 dark:stroke-zinc-700" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* very soft gradient fade at bottom to transition seamlessly into content */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
    </div>
  );
});

HeroEvidenceBackground.displayName = 'HeroEvidenceBackground';
export default HeroEvidenceBackground;
