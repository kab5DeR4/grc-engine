import { Link } from 'react-router-dom';

export default function CloseSection() {
  return (
    <section className="relative w-full bg-[#DCD7CB] pt-24 pb-0 px-6 md:px-12 overflow-hidden isolate hairline-b">
      
      {/* Top Content Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 pb-12 hairline-b">
        
        {/* Headline & Fine Print */}
        <div className="max-w-2xl">
          <div className="mono-label text-[#9B3418] mb-4">SECTION 06 — CONTINUOUS TELEMETRY ENFORCEMENT</div>
          <h2 className="serif-heading text-[32px] sm:text-[42px] md:text-[52px] leading-[1.05] text-[#1A1917] mb-6">
            Provable security in structure, <span className="serif-italic-pigment">permanence in compliance</span>.
          </h2>
          <p className="mono-body text-[12.5px] text-[#4A4741]">
            ATELIER GRC TOOLKIT — REVISION 4.12.0 — ALL CONTROL MATHEMATICS OFFICIALLY VERIFIED UNDER NIST & SOC2 STANDARDS.
          </p>
        </div>

        {/* Two Buttons pushed to opposite edge */}
        <div className="mt-8 lg:mt-0 flex flex-wrap items-center gap-4">
          <Link to="/contact" className="studio-btn-primary studio-btn text-[11px]">
            [ DISCUSS AUDIT ]
          </Link>
          <Link to="/reports" className="studio-btn studio-btn-pigment text-[11px]">
            [ DOWNLOAD REPORT ]
          </Link>
        </div>

      </div>

      {/* Bookend Oversized Cropped Wordmark */}
      <div className="w-full overflow-hidden pointer-events-none select-none text-center">
        <div 
          className="font-serif font-bold text-[#1A1917] tracking-[-0.03em] whitespace-nowrap leading-none text-center w-full"
          style={{
            fontSize: 'clamp(50px, 9.5vw, 180px)',
            transform: 'translateY(0.17em)',
          }}
        >
          GRC ENGINE
        </div>
      </div>

    </section>
  );
}
