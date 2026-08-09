import { Link, useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';

export default function SplitHero() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();

  const handleDemo = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  return (
    <section className="relative w-full h-[calc(100vh-60px)] min-h-[680px] mt-[60px] bg-[#DCD7CB] overflow-hidden isolate flex items-stretch px-6 md:px-12 hairline-b">
      
      {/* Left Copy Stack */}
      <div className="relative z-20 max-w-[540px] lg:max-w-[46vw] py-6 md:py-8 flex flex-col justify-between h-full">
        <div className="my-auto py-4">
          {/* Eyebrow */}
          <div className="mono-label text-[#9B3418] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#9B3418] inline-block"></span>
            ATELIER GRC ENGINE — VOL. 04 / 2026
          </div>

          {/* Headline with serif and italic pigment phrase */}
          <h1 className="serif-heading text-[32px] sm:text-[42px] md:text-[clamp(34px,3.8vw,56px)] leading-[1.04] text-[#1A1917] mb-5">
            Continuous governance powered by <span className="serif-italic-pigment">measurable data</span>.
          </h1>

          {/* Monospaced Lede */}
          <p className="mono-body text-[12.5px] sm:text-[13px] leading-[1.65] text-[#4A4741] mb-8 max-w-[460px]">
            An advanced platform that continuously monitors your compliance posture, identifies threats, and verifies policy enforcement using concrete data instead of guesswork. Designed to provide provable, automated security.
          </p>

          {/* Two Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/login" className="studio-btn-primary studio-btn text-[11px] py-2.5 px-5">
              [ GET STARTED ]
            </Link>
            <button onClick={handleDemo} className="studio-btn studio-btn-pigment text-[11px] py-2.5 px-5 uppercase">
              [ TRY DEMO ]
            </button>
          </div>
        </div>

        {/* Corner-pinned Monospaced Caption */}
        <div className="pt-4 hairline-t flex items-center justify-between text-[10.5px] mono-label text-[#6E6A61]">
          <span>FIG 01.0 — KINEMATIC SUBJECT</span>
          <span>LAT 37.7749° N / SECURED</span>
        </div>
      </div>

      {/* Right Area: Static Perfectly Composed Split Wordmark & Cut-out Subject */}
      <div className="absolute top-0 right-0 bottom-0 left-0 md:left-auto md:w-[70vw] lg:w-[65vw] pointer-events-none flex flex-col justify-center items-end pr-4 md:pr-12">
        
        {/* Split Wordmark Line 1: Stacked ABOVE subject in z-index */}
        <div 
          className="relative z-30 font-serif font-bold text-[#1A1917] tracking-[-0.03em] select-none text-right"
          style={{
            fontSize: 'clamp(60px, 13vw, 195px)',
            lineHeight: 0.82,
          }}
        >
          GOVERNANCE
        </div>

        {/* Cut-out Subject Standing in the Gap */}
        <div 
          className="relative z-20 my-[-28px] md:my-[-42px] flex justify-end"
          style={{
            filter: 'drop-shadow(0px 18px 28px rgba(26,25,23,0.22))',
          }}
        >
          <img 
            src="/grc_cutout_subject.png" 
            alt="GRC Engine Monolith Cutout"
            className="h-[280px] sm:h-[380px] md:h-[48vh] lg:h-[54vh] max-h-[480px] w-auto max-w-[88vw] object-contain"
          />
        </div>

        {/* Split Wordmark Line 2: Stacked BENEATH subject in z-index */}
        <div 
          className="relative z-10 font-serif font-bold text-[#1A1917] tracking-[-0.03em] select-none text-right"
          style={{
            fontSize: 'clamp(60px, 13vw, 195px)',
            lineHeight: 0.82,
          }}
        >
          ENGINE
        </div>

      </div>

    </section>
  );
}
