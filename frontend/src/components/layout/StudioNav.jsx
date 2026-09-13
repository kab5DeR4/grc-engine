import { useState, useEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

// minimal github svg icon
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

const StudioNav = memo(function StudioNav() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavScroll = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleDemoLaunch = () => {
    setDemoMode(true);
    setMobileMenuOpen(false);
    navigate('/dashboard');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 font-sans ${
        scrolled || mobileMenuOpen 
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800 shadow-sm' 
          : 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200/50 dark:border-zinc-800/50'
      }`}
    >
      <div className="h-14 max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Left: GRC Engine Logo / Wordmark */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 hover:opacity-90 transition-opacity no-underline group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-5 h-5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-mono font-semibold text-xs transition-transform group-hover:scale-105">
            G
          </div>
          <span className="font-medium text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
            GRC Engine
          </span>
          <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/60">
            v1.0
          </span>
        </Link>

        {/* Center: Quiet Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-normal text-zinc-600 dark:text-zinc-400">
          <Link
            to="/dashboard"
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors no-underline"
          >
            Platform
          </Link>
          <button
            type="button"
            onClick={() => handleNavScroll('how-it-works')}
            className="bg-transparent border-none p-0 cursor-pointer text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => handleNavScroll('security')}
            className="bg-transparent border-none p-0 cursor-pointer text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            Security
          </button>
          <Link
            to="/docs"
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors no-underline"
          >
            Documentation
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kab5DeR4/grc-engine"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors no-underline"
            title="View source on GitHub"
          >
            <GithubIcon size={14} />
            <span className="font-medium">GitHub</span>
          </a>

          <button 
            type="button"
            onClick={handleDemoLaunch}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-sm transition-all border border-zinc-900 dark:border-zinc-100 active:scale-[0.98]"
          >
            <span>Launch Product</span>
            <ArrowRight size={13} className="text-orange-400 dark:text-orange-600" />
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-transparent border-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3 text-sm">
          <Link 
            to="/dashboard" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-700 dark:text-zinc-300 py-1.5 no-underline"
          >
            Platform
          </Link>
          <button 
            type="button"
            onClick={() => handleNavScroll('how-it-works')}
            className="block w-full text-left text-zinc-700 dark:text-zinc-300 py-1.5 bg-transparent border-none p-0 cursor-pointer text-sm"
          >
            How It Works
          </button>
          <button 
            type="button"
            onClick={() => handleNavScroll('security')}
            className="block w-full text-left text-zinc-700 dark:text-zinc-300 py-1.5 bg-transparent border-none p-0 cursor-pointer text-sm"
          >
            Security
          </button>
          <Link 
            to="/docs" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-zinc-700 dark:text-zinc-300 py-1.5 no-underline"
          >
            Documentation
          </Link>
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
            <a
              href="https://github.com/kab5DeR4/grc-engine"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2 text-center text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded no-underline"
            >
              GitHub
            </a>
            <button
              type="button"
              onClick={handleDemoLaunch}
              className="flex-1 py-2 text-center text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded border-none cursor-pointer"
            >
              Launch Product
            </button>
          </div>
        </div>
      )}
    </header>
  );
});

StudioNav.displayName = 'StudioNav';
export default StudioNav;
