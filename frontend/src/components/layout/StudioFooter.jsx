import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 15 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// studio footer component memoized for faster layout fr
const StudioFooter = memo(function StudioFooter() {
  return (
    <footer className="w-full bg-[#E7E3DA] hairline-t pt-12 pb-6 px-6 md:px-12 flex flex-col justify-between min-h-[220px]">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 flex-1 w-full">
          <div>
            <div className="font-serif text-[18px] mb-2 font-bold">GRC ENGINE<span className="text-[#9B3418]">.</span></div>
            <p className="mono-body text-[11px] max-w-xs text-[#4A4741]">
              A studio-grade governance, risk & telemetry engine built on kinematic structural principles and continuous compliance telemetry.
            </p>
          </div>

          <div>
            <div className="mono-label text-[#9B3418] mb-3">PRODUCT</div>
            <ul className="space-y-2 mono-body text-[11.5px]">
              <li><Link to="/features" className="pigment-link">FEATURES</Link></li>
              <li><Link to="/pricing" className="pigment-link">PRICING</Link></li>
              <li><Link to="/docs" className="pigment-link">DOCUMENTATION</Link></li>
              <li><Link to="/integrations" className="pigment-link">INTEGRATIONS</Link></li>
            </ul>
          </div>

          <div>
            <div className="mono-label text-[#9B3418] mb-3">COMPANY</div>
            <ul className="space-y-2 mono-body text-[11.5px]">
              <li><Link to="/about" className="pigment-link">ABOUT US</Link></li>
              <li><Link to="/blog" className="pigment-link">BLOG</Link></li>
              <li><Link to="/careers" className="pigment-link">CAREERS</Link></li>
              <li><Link to="/contact" className="pigment-link">CONTACT</Link></li>
            </ul>
          </div>

          <div>
            <div className="mono-label text-[#9B3418] mb-3">LEGAL</div>
            <ul className="space-y-2 mono-body text-[11.5px]">
              <li><Link to="/privacy" className="pigment-link">PRIVACY POLICY</Link></li>
              <li><Link to="/terms" className="pigment-link">TERMS OF SERVICE</Link></li>
              <li><Link to="/security" className="pigment-link">SECURITY</Link></li>
              <li><Link to="/cookies" className="pigment-link">COOKIE POLICY</Link></li>
            </ul>
          </div>
        </div>

        {/* Vertical social links on the right */}
        <div className="flex flex-row md:flex-col items-center md:items-end space-x-6 md:space-x-0 md:space-y-6 mt-8 md:mt-0 md:ml-12">
          <a href="https://github.com/rnale88" target="_blank" rel="noreferrer" className="pigment-link text-[#6E6A61] hover:text-[#9B3418] transition-colors" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href="https://www.linkedin.com/in/roshan-nale-551006316/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BRL8PJz8UQ8Gs1mr1jf6SuA%3D%3D" target="_blank" rel="noreferrer" className="pigment-link text-[#6E6A61] hover:text-[#9B3418] transition-colors" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </a>
          <a href="mailto:rnale88@gmail.com" className="pigment-link text-[#6E6A61] hover:text-[#9B3418] transition-colors" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="hairline-t pt-4 flex flex-col sm:flex-row justify-between items-center text-[10.5px] mono-label text-[#6E6A61]">
        <div>© {new Date().getFullYear()} ATELIER GRC ENGINE. BY ROSHAN NALE.</div>
        <div className="flex flex-wrap items-center space-x-6 mt-2 sm:mt-0">
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
});

export default StudioFooter;
