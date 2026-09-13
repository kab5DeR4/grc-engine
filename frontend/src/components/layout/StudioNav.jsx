import { useState, useEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Sun, Moon, Search } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import AnimatedPillNavItem from '../ui/AnimatedPillNavItem';
import ReleaseNotesModal from '../ui/ReleaseNotesModal';

const StudioNav = memo(function StudioNav() {
  const navigate = useNavigate();
  const { setDemoMode, isDarkMode, toggleDarkMode } = useDemoStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [releaseNotesOpen, setReleaseNotesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 100);
    };
    handleScroll();
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

  const triggerCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
  };

  return (
    <>
      <ReleaseNotesModal 
        isOpen={releaseNotesOpen} 
        onClose={() => setReleaseNotesOpen(false)} 
      />

      <header 
        className={`fixed top-0 left-0 right-0 z-40 font-sans transition-all duration-300 ease-out ${
          scrolled || mobileMenuOpen 
            ? 'bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs' 
            : 'bg-transparent border-b border-transparent shadow-none'
        }`}
      >
        <div 
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ease-out ${
            scrolled ? 'h-[52px]' : 'h-16'
          }`}
        >
          
          {/* Left: GRC Engine Logo / Wordmark */}
          <div className="flex items-center gap-2">
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
            </Link>

            <button
              type="button"
              onClick={() => setReleaseNotesOpen(true)}
              className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 text-orange-700 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/60 transition-colors cursor-pointer"
              title="Click to view v1.0 release notes"
            >
              v1.0
            </button>
          </div>

          {/* Center: GSAP Animated Pill Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <AnimatedPillNavItem 
              label="Platform" 
              onClick={() => navigate('/dashboard')} 
            />
            <AnimatedPillNavItem 
              label="How It Works" 
              onClick={() => handleNavScroll('how-it-works')} 
            />
            <AnimatedPillNavItem 
              label="Security" 
              onClick={() => handleNavScroll('security')} 
            />
            <AnimatedPillNavItem 
              label="Documentation" 
              onClick={() => navigate('/docs')} 
            />
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Search Shortcut */}
            <button
              type="button"
              onClick={triggerCommandPalette}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-white/80 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer"
              title="Search and Navigation (Ctrl+K)"
            >
              <Search size={13} />
              <span className="font-mono text-[10px]">Ctrl+K</span>
            </button>

            {/* Theme Switcher Button */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer shadow-xs"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun size={15} className="text-amber-400" />
              ) : (
                <Moon size={15} className="text-zinc-700" />
              )}
            </button>

            {/* Sign In link */}
            <Link 
              to="/login?mode=login"
              className="hidden sm:inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors no-underline"
            >
              Sign In
            </Link>

            {/* Sign Up button */}
            <Link 
              to="/login?mode=signup"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-all no-underline shadow-xs"
            >
              Sign Up
            </Link>

            {/* Launch Product CTA */}
            <button 
              type="button"
              onClick={handleDemoLaunch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-sm transition-all border border-zinc-900 dark:border-zinc-100 active:scale-[0.98] cursor-pointer"
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
              <Link
                to="/login?mode=login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded no-underline"
              >
                Sign In
              </Link>
              <Link
                to="/login?mode=signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center text-xs font-medium bg-orange-600 text-white rounded no-underline"
              >
                Sign Up
              </Link>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleDemoLaunch}
                className="w-full py-2 text-center text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded border-none cursor-pointer"
              >
                Launch Product Demo
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
});

StudioNav.displayName = 'StudioNav';
export default StudioNav;
