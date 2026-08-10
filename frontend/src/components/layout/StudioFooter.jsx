import { Link } from 'react-router-dom';

export default function StudioFooter() {
  return (
    <footer className="w-full bg-[#E7E3DA] hairline-t pt-12 pb-6 px-6 md:px-12 flex flex-col justify-between min-h-[220px]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="font-serif text-[18px] mb-2 font-bold">GRC ENGINE<span className="text-[#9B3418]">.</span></div>
          <p className="mono-body text-[11px] max-w-xs text-[#4A4741]">
            A studio-grade governance, risk & telemetry engine built on kinematic structural principles and continuous compliance telemetry.
          </p>
        </div>

        <div>
          <div className="mono-label text-[#9B3418] mb-3">NAVIGATION</div>
          <ul className="space-y-2 mono-body text-[11.5px]">
            <li><Link to="/controls" className="pigment-link">CONTROLS CATALOG</Link></li>
            <li><Link to="/drawing" className="pigment-link">TOPOLOGY DRAWINGS</Link></li>
            <li><Link to="/study" className="pigment-link">KINEMATIC MODELS</Link></li>
            <li><Link to="/practice" className="pigment-link">PRACTICE STANDARDS</Link></li>
          </ul>
        </div>

        <div>
          <div className="mono-label text-[#9B3418] mb-3">VERIFICATION</div>
          <ul className="space-y-2 mono-body text-[11.5px]">
            <li><Link to="/archive" className="pigment-link">EVIDENCE VAULT</Link></li>
            <li><Link to="/scans" className="pigment-link">POLICY SCANS</Link></li>
            <li><Link to="/findings" className="pigment-link">RISK FINDINGS</Link></li>
            <li><Link to="/reports" className="pigment-link">AUDIT REPORTS</Link></li>
          </ul>
        </div>

        <div>
          <div className="mono-label text-[#9B3418] mb-3">TELEMETRY DATA</div>
          <div className="mono-body text-[11px] space-y-1 text-[#6E6A61]">
            <div>LAT 37.7749° N, LONG 122.4194° W</div>
            <div>VERIFIED: NIST SP 800-53 REV 5</div>
            <div>STATUS: CONTINUOUS ENFORCEMENT</div>
            <div>SHA-256: 8f92a1c...b04e9</div>
          </div>
        </div>
      </div>

      <div className="hairline-t pt-4 flex flex-col sm:flex-row justify-between items-center text-[10.5px] mono-label text-[#6E6A61]">
        <div>© 2026 ATELIER GRC ENGINE. ALL CONTROL MATHEMATICS VERIFIED.</div>
        <div className="flex items-center space-x-6 mt-2 sm:mt-0">
          <Link to="/contact" className="pigment-link">COMMISSION AUDIT</Link>
          <Link to="/catalogue" className="pigment-link">CATALOGUE</Link>
          {/* back to top button for convenience lol */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="pigment-link bg-transparent border-none p-0 cursor-pointer text-[#9B3418]"
          >
            [ TOP ↑ ]
          </button>
        </div>
      </div>
    </footer>
  );
}
