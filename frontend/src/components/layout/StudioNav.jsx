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
      {/* Main Header Bar */}
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

        {/* Actions & Dropdown Trigger */}
        <div className="flex items-center space-x-3">
          {/* Header Dropdown Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="studio-btn text-[10.5px] py-[6px] px-3 flex items-center gap-2 dark:text-[#E7E3DA] dark:border-[#E7E3DA] transition-colors"
          >
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            <span className="mono-label text-[10px]">{mobileMenuOpen ? '[ CLOSE ]' : '[ MENU ]'}</span>
          </button>

          <button 
            onClick={toggleDarkMode}
            className="hidden sm:flex studio-btn py-[6px] px-3 items-center justify-center transition-colors dark:text-[#E7E3DA] dark:border-[#E7E3DA]"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <Link to="/contact" className="hidden md:inline-block pigment-link mono-label text-[10.5px] dark:text-[#E7E3DA] transition-colors">
            [ INQUIRE ]
          </Link>
          <Link to="/login" className="hidden sm:inline-flex studio-btn studio-btn-pigment text-[10.5px] py-[6px] px-4 transition-colors">
            [ LOGIN ]
          </Link>
        </div>
      </div>

      {/* Standard Header Dropdown Menu (Full Width Panel) */}
      {mobileMenuOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-[#E7E3DA] dark:bg-[#161514] hairline-b shadow-2xl transition-all duration-300 z-40 overflow-hidden animate-fade-up">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Core Platform Sections */}
            <div className="space-y-4">
              <div className="mono-label text-[#9B3418] dark:text-[#FF6B4A] text-[10px] tracking-widest uppercase border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 pb-2">
                01 // CORE PLATFORM
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <button
                    key={link.name}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="text-left py-2 px-3 hover:bg-[#DCD7CB] dark:hover:bg-[#22201D] transition-colors flex items-center justify-between group"
                  >
                    <span className="mono-label text-[11px] text-[#1A1917] dark:text-[#E7E3DA] group-hover:text-[#9B3418] dark:group-hover:text-[#FF6B4A]">
                      0{idx + 1}. {link.name}
                    </span>
                    <span className="text-[10px] text-[#6E6A61] dark:text-[#8A857A]">→</span>
                  </button>
                ))}
                <Link
                  to="/architecture"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-[#DCD7CB] dark:hover:bg-[#22201D] transition-colors flex items-center justify-between group"
                >
                  <span className="mono-label text-[11px] text-[#1A1917] dark:text-[#E7E3DA] group-hover:text-[#9B3418] dark:group-hover:text-[#FF6B4A]">
                    04. STUDIO ARCHITECTURE
                  </span>
                  <span className="text-[10px] text-[#6E6A61] dark:text-[#8A857A]">→</span>
                </Link>
              </div>
            </div>

            {/* Column 2: Resources & Documentation */}
            <div className="space-y-4">
              <div className="mono-label text-[#9B3418] dark:text-[#FF6B4A] text-[10px] tracking-widest uppercase border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 pb-2">
                02 // RESOURCES & SPECS
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  to="/features" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-[#DCD7CB] dark:hover:bg-[#22201D] mono-label text-[10.5px] text-[#1A1917] dark:text-[#E7E3DA] transition-colors"
                >
                  [ FEATURES ]
                </Link>
                <Link 
                  to="/pricing" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-[#DCD7CB] dark:hover:bg-[#22201D] mono-label text-[10.5px] text-[#1A1917] dark:text-[#E7E3DA] transition-colors"
                >
                  [ PRICING ]
                </Link>
                <Link 
                  to="/docs" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-[#DCD7CB] dark:hover:bg-[#22201D] mono-label text-[10.5px] text-[#1A1917] dark:text-[#E7E3DA] transition-colors"
                >
                  [ API DOCS ]
                </Link>
                <Link 
                  to="/integrations" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-[#DCD7CB] dark:hover:bg-[#22201D] mono-label text-[10.5px] text-[#1A1917] dark:text-[#E7E3DA] transition-colors"
                >
                  [ CATALOGUE ]
                </Link>
                <Link 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-[#DCD7CB] dark:hover:bg-[#22201D] mono-label text-[10.5px] text-[#1A1917] dark:text-[#E7E3DA] transition-colors col-span-2"
                >
                  [ INQUIRE AUDIT ]
                </Link>
              </div>
            </div>

            {/* Column 3: Live System Status & Action */}
            <div className="space-y-4 bg-[#DCD7CB]/50 dark:bg-[#1E1D1A]/50 p-4 hairline-all">
              <div className="mono-label text-[#9B3418] dark:text-[#FF6B4A] text-[10px] tracking-widest uppercase flex items-center justify-between">
                <span>SYSTEM STATUS</span>
                <span className="flex items-center gap-1 text-[9px] text-[#55B685]">
                  <span className="w-1.5 h-1.5 bg-[#55B685] rounded-full animate-pulse"></span> ONLINE
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#1A1917] dark:text-[#E7E3DA]">ATELIER GRC VERDICT</div>
                <div className="text-[24px] font-serif font-bold text-[#1A1917] dark:text-[#E7E3DA]">94.2% <span className="text-[12px] font-mono text-[#55B685]">COMPLIANT</span></div>
              </div>
              <div className="pt-2 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-between">
                <span className="mono-label text-[10px] text-[#6E6A61] dark:text-[#8A857A]">THEME MODE</span>
                <button 
                  onClick={toggleDarkMode}
                  className="studio-btn py-1 px-3 flex items-center gap-2 text-[10px] dark:text-[#E7E3DA] dark:border-[#E7E3DA]"
                >
                  {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
                  <span>{isDarkMode ? 'LIGHT' : 'DARK'}</span>
                </button>
              </div>
              <Link 
                to="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="studio-btn studio-btn-pigment w-full text-center py-2 text-[10.5px] mt-2 block"
              >
                [ LAUNCH DEMO DASHBOARD ]
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
});

export default StudioNav;
