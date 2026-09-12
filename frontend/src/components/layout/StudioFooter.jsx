import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUp, ExternalLink } from 'lucide-react';

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

function LinkedinIcon({ size = 16, className = '' }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" r="2" />
    </svg>
  );
}

const StudioFooter = memo(function StudioFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-100/80 dark:bg-[var(--ground)] text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-800 pt-14 pb-10 px-4 sm:px-6 md:px-8 font-sans transition-colors">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
          
          {/* Brand Column (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-decoration-none">
              <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-sky-400 flex items-center justify-center text-white dark:text-slate-950 font-bold text-xs">
                G
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                GRC Engine<span className="text-sky-600 dark:text-sky-400">.</span>
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
              Infrastructure-native compliance evidence. Turn real technical configuration state into deterministic, audit-ready verification.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a 
                href="https://github.com/kab5DeR4/grc-engine" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-xs" 
                title="GitHub Repository"
              >
                <GithubIcon size={15} />
              </a>
              <a 
                href="https://www.linkedin.com/in/roshan-nale-551006316/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-xs" 
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={15} />
              </a>
              <a 
                href="mailto:rnale88@gmail.com" 
                className="w-8 h-8 rounded-lg bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shadow-xs" 
                title="Contact Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Product Column (Col 3) */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <div className="font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-slate-200 text-xs">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  Posture Dashboard
                </Link>
              </li>
              <li>
                <Link to="/controls" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  Controls Matrix
                </Link>
              </li>
              <li>
                <Link to="/archive" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  Evidence Vault (SHA-256)
                </Link>
              </li>
              <li>
                <Link to="/findings" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  Findings &amp; Remediation
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  Audit Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Frameworks Column (Col 3) */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <div className="font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-slate-200 text-xs">
              Frameworks
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  SOC 2 Type II
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  ISO / IEC 27001:2022
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  NIST CSF v2.0
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  CIS Controls v8
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  HIPAA &amp; GDPR Art 32
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column (Col 2) */}
          <div className="lg:col-span-2 space-y-3 text-xs sm:text-sm">
            <div className="font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-slate-200 text-xs">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  Architecture
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  Integrations
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/kab5DeR4/grc-engine" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} GRC Engine by Roshan Nale. Open-source under MIT License.
          </div>
          <div className="flex items-center gap-6">
            <span>Deterministic &bull; Cryptographic &bull; Sovereign</span>
            <button 
              onClick={scrollToTop} 
              className="text-sky-600 dark:text-sky-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer bg-transparent border-none"
            >
              <span>Back to top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
});

StudioFooter.displayName = 'StudioFooter';

export default StudioFooter;
