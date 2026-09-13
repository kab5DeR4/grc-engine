import { memo } from 'react';
import { Link } from 'react-router-dom';

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

const StudioFooter = memo(function StudioFooter() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800 py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Brand info */}
          <div className="space-y-1.5">
            <Link to="/" className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 no-underline">
              <div className="w-5 h-5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-mono font-semibold text-xs">
                G
              </div>
              <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                GRC Engine
              </span>
            </Link>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Compliance, grounded in verifiable evidence. Infrastructure-first continuous posture attestation.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-600 dark:text-zinc-400">
            <Link to="/dashboard" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors no-underline">
              Product
            </Link>
            <Link to="/docs" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors no-underline">
              Documentation
            </Link>
            <a 
              href="https://github.com/kab5DeR4/grc-engine" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5 no-underline"
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
            <a 
              href="#security" 
              className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors no-underline"
            >
              Security
            </a>
            <Link to="/contact" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors no-underline">
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} GRC Engine. MIT Open Source License.
          </div>
          <div className="font-mono text-[11px] text-zinc-400">
            sha256 &bull; read-only &bull; zero hallucination
          </div>
        </div>

      </div>
    </footer>
  );
});

StudioFooter.displayName = 'StudioFooter';
export default StudioFooter;
