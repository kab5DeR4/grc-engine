import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

// harmonized inline architectural banner
const MidPageCtaSection = memo(function MidPageCtaSection() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();

  const handleLaunch = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  return (
    <section className="w-full py-6 sm:py-8 px-4 sm:px-6 md:px-8 font-sans bg-[var(--ground)]">
      <div className="max-w-7xl mx-auto rounded-xl bg-[var(--surface)] text-[var(--ink)] p-5 sm:p-7 md:p-8 text-left shadow-sm border border-[var(--hairline)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Content Lockup */}
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            <Terminal size={12} />
            <span>CONTINUOUS TELEMETRY SANDBOX</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight sm:tracking-tighter text-[var(--ink)] leading-tight">
            See what your infrastructure can actually prove.
          </h3>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
            Connect a cloud environment or launch the live posture cockpit to inspect automated control assertions and cryptographic evidence reports in real time.
          </p>
        </div>

        {/* Right Action Block */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleLaunch}
            className="px-5 py-2.5 rounded-lg bg-[var(--ink)] text-[var(--ground)] hover:opacity-90 text-xs font-bold transition-all inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer border-none active:scale-[0.97] shrink-0"
          >
            <span>Launch Live Posture Deck</span>
            <ArrowRight size={14} />
          </button>
          
          <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[var(--ink-muted)] self-center md:self-end">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>Simulated Data &bull; Zero Setup</span>
          </div>
        </div>

      </div>
    </section>
  );
});

MidPageCtaSection.displayName = 'MidPageCtaSection';

export default MidPageCtaSection;
