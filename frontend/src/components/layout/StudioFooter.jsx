import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const StudioFooter = memo(function StudioFooter() {
  return (
    <footer className="w-full bg-[#E7E3DA] dark:bg-[#121110] text-[#1A1917] dark:text-[#E7E3DA] border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 pt-14 pb-8 px-4 sm:px-6 md:px-8 lg:px-12 font-sans transition-colors duration-200">
      <div className="w-full max-w-[92vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Main Footer Links Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 flex-1 w-full">
            
            {/* Brand Column */}
            <div>
              <Link to="/" className="inline-block font-serif text-[20px] font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-tight mb-3 text-decoration-none">
                GRC Engine<span className="text-[#9B3418] dark:text-[#FF6B4A]">.</span>
              </Link>
              <p className="text-[13px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed max-w-xs">
                An enterprise-grade governance, risk & compliance engine built for continuous cloud telemetry and automated auditor-ready proof generation.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <div className="text-[12px] font-semibold tracking-wider text-[#9B3418] dark:text-[#FF6B4A] uppercase mb-4">
                Product
              </div>
              <ul className="space-y-2.5 text-[13.5px]">
                <li><Link to="/features" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Pricing & Plans</Link></li>
                <li><Link to="/docs" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Documentation</Link></li>
                <li><Link to="/integrations" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Integrations</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <div className="text-[12px] font-semibold tracking-wider text-[#9B3418] dark:text-[#FF6B4A] uppercase mb-4">
                Company
              </div>
              <ul className="space-y-2.5 text-[13.5px]">
                <li><Link to="/contact" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Contact Sales</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <div className="text-[12px] font-semibold tracking-wider text-[#9B3418] dark:text-[#FF6B4A] uppercase mb-4">
                Legal & Trust
              </div>
              <ul className="space-y-2.5 text-[13.5px]">
                <li><Link to="/docs" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/docs" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Terms of Service</Link></li>
                <li><Link to="/docs" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Security Overview</Link></li>
                <li><Link to="/docs" className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors">Cookie Preferences</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Links Cluster */}
          <div className="flex flex-row md:flex-col items-center md:items-end space-x-5 md:space-x-0 md:space-y-4 shrink-0">
            <a 
              href="https://github.com/rnale88" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#9B3418] dark:hover:text-[#FF6B4A] transition-colors p-2 rounded-lg hover:bg-[#1A1917]/5 dark:hover:bg-[#E7E3DA]/5" 
              aria-label="GitHub"
            >
              <GithubIcon size={19} />
            </a>
            <a 
              href="https://www.linkedin.com/in/roshan-nale-551006316/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BRL8PJz8UQ8Gs1mr1jf6SuA%3D%3D" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#9B3418] dark:hover:text-[#FF6B4A] transition-colors p-2 rounded-lg hover:bg-[#1A1917]/5 dark:hover:bg-[#E7E3DA]/5" 
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={19} />
            </a>
            <a 
              href="mailto:rnale88@gmail.com" 
              className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#9B3418] dark:hover:text-[#FF6B4A] transition-colors p-2 rounded-lg hover:bg-[#1A1917]/5 dark:hover:bg-[#E7E3DA]/5" 
              aria-label="Email"
            >
              <Mail size={19} />
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="pt-6 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex flex-col sm:flex-row justify-between items-center text-[12.5px] text-[#6E6A61] dark:text-[#9E988B] gap-3">
          <div>© {new Date().getFullYear()} GRC Engine by Roshan Nale. All rights reserved.</div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="text-[#9B3418] dark:text-[#FF6B4A] hover:underline font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none"
          >
            Back to top ↑
          </button>
        </div>

      </div>
    </footer>
  );
});

export default StudioFooter;
