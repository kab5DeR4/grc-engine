import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

const StudioNav = memo(function StudioNav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDemoStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PLATFORM', id: 'platform' },
    { name: 'CAPABILITIES', id: 'capabilities' },
    { name: 'INTEGRATIONS', id: 'integrations' },
  ];

  // smooth scroll go brrr when clicking nav items
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // fixed navbar height at 60px so calc(100vh - 60px) in hero works cleanly
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-[#E7E3DA]/95 dark:bg-[#1A1917]/95 backdrop-blur-[14px] hairline-b' : 'bg-[#E7E3DA]/60 dark:bg-[#1A1917]/60 backdrop-blur-[8px] hairline-b'
      }`}
    >
      <div className="h-[60px] flex items-center justify-between px-6 md:px-12">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-1 group text-decoration-none" onClick={() => setMobileMenuOpen(false)}>
          <span className="font-serif text-[19px] tracking-[-0.015em] text-[#1A1917] dark:text-[#E7E3DA] font-semibold transition-colors">
            GRC ENGINE
          </span>
          <span className="text-[#9B3418] dark:text-[#FF6B4A] font-serif text-[19px] font-bold transition-colors">.</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.id)}
              className="pigment-link mono-label text-[10.5px] uppercase cursor-pointer bg-transparent border-none p-0 dark:text-[#E7E3DA] transition-colors"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Button & Contact */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode}
            className="hidden sm:flex studio-btn py-[6px] px-3 items-center justify-center transition-colors dark:text-[#E7E3DA] dark:border-[#E7E3DA]"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <Link to="/contact" className="hidden sm:inline-block pigment-link mono-label text-[10.5px] dark:text-[#E7E3DA] transition-colors">
            [ INQUIRE ]
          </Link>
          <Link to="/login" className="hidden sm:inline-flex studio-btn text-[10.5px] py-[6px] px-4 dark:text-[#E7E3DA] dark:border-[#E7E3DA] transition-colors">
            [ LOGIN ]
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 dark:text-[#E7E3DA]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 w-full bg-[#E7E3DA] dark:bg-[#1A1917] hairline-b py-4 px-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-left mono-label text-[12px] uppercase p-2 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 dark:text-[#E7E3DA]"
            >
              {link.name}
            </button>
          ))}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="mono-label dark:text-[#E7E3DA]">Theme</span>
              <button 
                onClick={toggleDarkMode}
                className="studio-btn py-[6px] px-3 flex items-center justify-center transition-colors dark:text-[#E7E3DA] dark:border-[#E7E3DA]"
              >
                {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="studio-btn py-2 text-center dark:text-[#E7E3DA] dark:border-[#E7E3DA]"
            >
              [ INQUIRE ]
            </Link>
            <Link 
              to="/login" 
              onClick={() => setMobileMenuOpen(false)}
              className="studio-btn studio-btn-pigment py-2 text-center"
            >
              [ LOGIN ]
            </Link>
          </div>
        </div>
      )}
    </header>
  );
});

export default StudioNav;
