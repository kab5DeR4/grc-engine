import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

function GithubIcon({ size = 15, className = '' }) {
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

const FinalCtaSection = memo(function FinalCtaSection() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();

  const handleLaunch = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  return (
    <section className="w-full py-10 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 bg-[var(--ground)] font-sans text-center">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Headline */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            <ShieldCheck size={13} />
            <span>CONTINUOUS GOVERNANCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight sm:tracking-tighter leading-tight">
            See what your infrastructure can actually prove.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] max-w-lg mx-auto leading-relaxed">
            Explore GRC Engine to connect technical configuration state with audit-ready compliance intelligence.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleLaunch}
            className="px-6 py-2.5 rounded-lg bg-[var(--ink)] hover:opacity-90 text-[var(--ground)] text-xs font-bold transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer border-none active:scale-[0.97]"
          >
            <span>Launch Posture Deck</span>
            <ArrowRight size={14} />
          </button>

          <a
            href="https://github.com/kab5DeR4/grc-engine"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--ink)] border border-[var(--hairline)] text-xs font-mono font-semibold transition-all text-decoration-none inline-flex items-center gap-1.5 shadow-xs active:scale-[0.97]"
          >
            <GithubIcon size={14} />
            <span>GitHub</span>
            <ExternalLink size={11} className="opacity-60" />
          </a>
        </div>

      </div>
    </section>
  );
});

FinalCtaSection.displayName = 'FinalCtaSection';

export default FinalCtaSection;
