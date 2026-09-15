import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import HeroEvidenceBackground from './HeroEvidenceBackground';

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

const HeroSection = memo(function HeroSection() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();

  const handleLaunchDemo = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-20 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <HeroEvidenceBackground />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-8 sm:space-y-10">
        
        {/* Subtle Conceptual Product-Flow Indicator (Restrained enterprise workflow, hidden on mobile for clean hierarchy) */}
        <div className="hidden sm:inline-flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 rounded-md border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/95 text-[11px] font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400 select-none shadow-xs">
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">CONTROL</span>
          <span className="text-zinc-300 dark:text-zinc-700 select-none text-xs" aria-hidden="true">→</span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">EVIDENCE</span>
          <span className="text-zinc-300 dark:text-zinc-700 select-none text-xs" aria-hidden="true">→</span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">VERIFICATION</span>
          <span className="text-zinc-300 dark:text-zinc-700 select-none text-xs" aria-hidden="true">→</span>
          <span className="text-orange-600 dark:text-orange-400 font-semibold">RESULT</span>
        </div>

        {/* Hero Narrative: Headline, Subtitle, CTAs */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <h1 className="text-[2.25rem] xs:text-4xl sm:text-6xl md:text-[4.25rem] lg:text-[4.75rem] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1] sm:leading-[1.06]">
            <span className="block">Compliance,</span>
            <span className="block">grounded in verifiable</span>
            <span className="block">evidence.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Connect compliance controls to evidence from your infrastructure and source code. Continuously evaluate technical state, verify controls, and preserve the evidence behind every result.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 pt-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleLaunchDemo}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white border border-zinc-950 dark:border-zinc-100 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.99] cursor-pointer w-full sm:w-auto"
            >
              <span>Explore Interactive Demo</span>
              <ArrowRight size={15} className="text-orange-400 dark:text-orange-600 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </button>

            <a
              href="https://github.com/kab5DeR4/grc-engine"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-800 shadow-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-zinc-400 dark:hover:border-zinc-700 active:translate-y-0 active:scale-[0.99] no-underline w-full sm:w-auto"
            >
              <GithubIcon size={16} className="text-zinc-700 dark:text-zinc-300" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;
