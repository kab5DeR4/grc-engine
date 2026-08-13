import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const StudioNav = memo(function StudioNav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

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
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled ? 'bg-[#E7E3DA]/85 backdrop-blur-[14px] hairline-b' : 'bg-[#E7E3DA]/60 backdrop-blur-[8px] hairline-b'
      }`}
    >
      {/* Wordmark */}
      <Link to="/" className="flex items-center gap-1 group text-decoration-none">
        <span className="font-serif text-[19px] tracking-[-0.015em] text-[#1A1917] font-semibold">
          GRC ENGINE
        </span>
        <span className="text-[#9B3418] font-serif text-[19px] font-bold">.</span>
      </Link>

      {/* Nav Links */}
      <nav className="hidden lg:flex items-center space-x-8">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={(e) => handleNavClick(e, link.id)}
            className="pigment-link mono-label text-[10.5px] uppercase cursor-pointer bg-transparent border-none p-0"
          >
            {link.name}
          </button>
        ))}
      </nav>

      {/* Action Button & Contact */}
      <div className="flex items-center space-x-4">
        <Link to="/contact" className="hidden sm:inline-block pigment-link mono-label text-[10.5px]">
          [ INQUIRE ]
        </Link>
        <Link to="/login" className="studio-btn text-[10.5px] py-[6px] px-4">
          [ LOGIN ]
        </Link>
      </div>
    </header>
  );
});

export default StudioNav;
