import { useState, useEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeDensitySelector from '../ui/ThemeDensitySelector';
import { useDemoStore } from '../../store/demoStore';

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

const StudioNav = memo(function StudioNav() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
          ? 'bg-[var(--surface)] border-b border-[var(--hairline)] shadow-sm' 
          : 'bg-[var(--surface)] border-b border-transparent'
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 group text-decoration-none select-none" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-sky-400 flex items-center justify-center text-white dark:text-slate-950 font-bold text-xs shadow-xs transition-transform duration-150 group-active:scale-95">
            G
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            GRC Engine<span className="text-sky-600 dark:text-sky-400">.</span>
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7">
          <Link
            to="/dashboard"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none"
          >
            Platform
          </Link>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('security')}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            Security
          </button>
          <Link
            to="/docs"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-decoration-none"
          >
            Documentation
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/kab5DeR4/grc-engine"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-medium text-decoration-none active:scale-95"
            title="View source on GitHub"
          >
            <GithubIcon size={15} />
            <span>GitHub</span>
          </a>

          <ThemeDensitySelector />

          <button 
            type="button"
            onClick={handleDemoLaunch}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:text-slate-950 dark:bg-sky-400 dark:hover:bg-sky-300 transition-all shadow-xs cursor-pointer border-none active:scale-95"
          >
            <span>Try Demo</span>
            <ArrowRight size={13} />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-transparent border-none cursor-pointer active:scale-90 transition-transform"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Spring Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="md:hidden bg-[var(--surface)] border-b border-[var(--hairline)] p-5 space-y-3 shadow-md overflow-hidden"
          >
            <Link 
              to="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-800 dark:text-slate-200 py-1.5 text-decoration-none"
            >
              Platform
            </Link>
            <button 
              onClick={() => handleNavClick('how-it-works')}
              className="block w-full text-left text-sm font-medium text-slate-800 dark:text-slate-200 py-1.5 bg-transparent border-none p-0 cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNavClick('security')}
              className="block w-full text-left text-sm font-medium text-slate-800 dark:text-slate-200 py-1.5 bg-transparent border-none p-0 cursor-pointer"
            >
              Security
            </button>
            <Link 
              to="/docs" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-800 dark:text-slate-200 py-1.5 text-decoration-none"
            >
              Documentation
            </Link>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <a
                href="https://github.com/kab5DeR4/grc-engine"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 text-center text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-decoration-none"
              >
                GitHub
              </a>
              <button
                onClick={handleDemoLaunch}
                className="flex-1 py-2 text-center text-xs font-semibold bg-slate-900 text-white dark:bg-sky-400 dark:text-slate-950 rounded-lg border-none"
              >
                Try Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

StudioNav.displayName = 'StudioNav';

export default StudioNav;
