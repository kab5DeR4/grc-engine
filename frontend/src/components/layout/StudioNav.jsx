import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

const StudioNav = memo(function StudioNav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDemoStore();
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // smooth scroll for hash anchors or navigate with hash
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveDropdown(null);
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

  // Real, working platform modules mapped to actual app routes
  const platformCategories = [
    {
      category: 'Core Engine',
      items: [
        {
          name: 'Live Dashboard',
          desc: 'Real-time posture & compliance verdicts',
          href: '/dashboard',
          badge: 'Live',
        },
        {
          name: 'Architecture Topology',
          desc: 'Interactive node graph & system boundaries',
          href: '/architecture',
        },
        {
          name: 'Framework Catalogue',
          desc: 'SOC 2, ISO 27001 & NIST CSF specifications',
          href: '/catalogue',
        },
        {
          name: 'Evaluation Model',
          desc: 'Automated continuous policy translation',
          id: 'platform',
        },
      ],
    },
    {
      category: 'Audit & Verification',
      items: [
        {
          name: 'Controls Matrix',
          desc: 'Automated testing across technical controls',
          href: '/controls',
        },
        {
          name: 'Automated Scanners',
          desc: 'Cloud infra & code scanning engine',
          href: '/scans',
        },
        {
          name: 'Findings & Remediation',
          desc: 'Live vulnerability & gap issue tracking',
          href: '/findings',
        },
        {
          name: 'Audit Reports',
          desc: 'Auditor-ready export packages & proofs',
          href: '/reports',
        },
      ],
    },
    {
      category: 'Studio & Evidence',
      items: [
        {
          name: 'System Drawing',
          desc: 'Interactive visual compliance diagrams',
          href: '/drawing',
        },
        {
          name: 'Gap Study',
          desc: 'Framework baseline evaluation workbench',
          href: '/study',
        },
        {
          name: 'Policy Practice',
          desc: 'Operational workflow & policy execution',
          href: '/practice',
        },
        {
          name: 'Evidence Archive',
          desc: 'Cryptographic proof storage & logs',
          href: '/archive',
        },
      ],
    },
    {
      category: 'Ecosystem & Sync',
      items: [
        {
          name: 'Cloud & CI/CD Integrations',
          desc: 'AWS, GCP, GitHub, Okta & pipeline sync',
          href: '/integrations',
        },
        {
          name: 'Active Connected Hub',
          desc: 'Manage live API sync & data pipelines',
          href: '/dashboard/integrations',
        },
        {
          name: 'Platform Features',
          desc: 'Deep dive into engine capabilities',
          href: '/features',
        },
        {
          name: 'Pipeline Telemetry',
          desc: 'Continuous evidence capture flow',
          id: 'integrations',
        },
      ],
    },
  ];

  const solutionsItems = [
    {
      category: 'Frameworks',
      items: [
        { name: 'SOC 2 Type II', desc: 'Continuous security & trust control verification', href: '/features' },
        { name: 'ISO / IEC 27001', desc: 'ISMS risk management and continuous audit prep', href: '/features' },
        { name: 'NIST CSF v2.0', desc: 'Core cybersecurity framework alignment & mapping', href: '/features' },
      ],
    },
    {
      category: 'Audience Solutions',
      items: [
        { name: 'Engineering & DevOps', desc: 'Automate evidence collection in CI/CD pipelines', href: '/integrations' },
        { name: 'Security & GRC Teams', desc: 'Centralized controls matrix with live proofs', href: '/controls' },
        { name: 'Auditors & Compliance Leads', desc: 'Instant auditor-grade reports & verification logs', href: '/reports' },
      ],
    },
  ];

  const resourcesItems = [
    {
      category: 'Documentation & Guides',
      items: [
        { name: 'API Documentation', desc: 'REST endpoints, webhooks & schemas', href: '/docs' },
        { name: 'Architecture Guide', desc: 'Interactive topology exploration', href: '/architecture' },
        { name: 'Features Breakdown', desc: 'Complete breakdown of all engine modules', href: '/features' },
      ],
    },
    {
      category: 'Company & Plans',
      items: [
        { name: 'Pricing & Tiers', desc: 'Transparent enterprise & team plans', href: '/pricing' },
        { name: 'Schedule Consultation', desc: 'Talk with our compliance engineering team', href: '/contact' },
        { name: 'Live App Demo', desc: 'Jump directly into the live studio workspace', href: '/dashboard' },
      ],
    },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        scrolled || activeDropdown || mobileMenuOpen 
          ? 'bg-[#E7E3DA]/95 dark:bg-[#141312]/95 backdrop-blur-md border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 shadow-sm' 
          : 'bg-[#E7E3DA]/80 dark:bg-[#141312]/80 backdrop-blur-sm border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10'
      }`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Main Header Bar */}
      <div className="h-[60px] flex items-center justify-between px-6 lg:px-12 max-w-[1600px] mx-auto">
        {/* Wordmark */}
        <Link 
          to="/" 
          className="flex items-center gap-1 text-decoration-none mr-8 group" 
          onClick={() => { setMobileMenuOpen(false); setActiveDropdown(null); }}
        >
          <span className="font-serif text-[20px] font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-tight">
            GRC Engine
          </span>
          <span className="text-[#9B3418] dark:text-[#FF6B4A] font-serif text-[20px] font-bold">.</span>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 h-full mr-auto">
          {/* PLATFORM Dropdown */}
          <div 
            className="relative flex items-center h-full px-3 cursor-pointer group"
            onMouseEnter={() => setActiveDropdown('platform')}
          >
            <button
              onClick={(e) => handleNavClick(e, 'platform')}
              className={`text-[13.5px] font-medium flex items-center gap-1.5 transition-colors bg-transparent border-none p-0 cursor-pointer ${
                activeDropdown === 'platform' 
                  ? 'text-[#9B3418] dark:text-[#FF6B4A]' 
                  : 'text-[#1A1917]/80 dark:text-[#E7E3DA]/80 group-hover:text-[#1A1917] dark:group-hover:text-[#E7E3DA]'
              }`}
            >
              Platform
              <svg 
                width="10" 
                height="6" 
                viewBox="0 0 10 6" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className={`transition-transform duration-200 opacity-60 ${activeDropdown === 'platform' ? 'rotate-180 text-[#9B3418] dark:text-[#FF6B4A]' : ''}`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* SOLUTIONS Dropdown */}
          <div 
            className="relative flex items-center h-full px-3 cursor-pointer group"
            onMouseEnter={() => setActiveDropdown('solutions')}
          >
            <button
              onClick={(e) => handleNavClick(e, 'capabilities')}
              className={`text-[13.5px] font-medium flex items-center gap-1.5 transition-colors bg-transparent border-none p-0 cursor-pointer ${
                activeDropdown === 'solutions' 
                  ? 'text-[#9B3418] dark:text-[#FF6B4A]' 
                  : 'text-[#1A1917]/80 dark:text-[#E7E3DA]/80 group-hover:text-[#1A1917] dark:group-hover:text-[#E7E3DA]'
              }`}
            >
              Solutions
              <svg 
                width="10" 
                height="6" 
                viewBox="0 0 10 6" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className={`transition-transform duration-200 opacity-60 ${activeDropdown === 'solutions' ? 'rotate-180 text-[#9B3418] dark:text-[#FF6B4A]' : ''}`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* INTEGRATIONS Link */}
          <Link
            to="/integrations"
            className="px-3 h-full flex items-center text-[13.5px] font-medium text-[#1A1917]/80 dark:text-[#E7E3DA]/80 hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors"
            onMouseEnter={() => setActiveDropdown(null)}
          >
            Integrations
          </Link>

          {/* RESOURCES Dropdown */}
          <div 
            className="relative flex items-center h-full px-3 cursor-pointer group"
            onMouseEnter={() => setActiveDropdown('resources')}
          >
            <button
              className={`text-[13.5px] font-medium flex items-center gap-1.5 transition-colors bg-transparent border-none p-0 cursor-pointer ${
                activeDropdown === 'resources' 
                  ? 'text-[#9B3418] dark:text-[#FF6B4A]' 
                  : 'text-[#1A1917]/80 dark:text-[#E7E3DA]/80 group-hover:text-[#1A1917] dark:group-hover:text-[#E7E3DA]'
              }`}
            >
              Resources
              <svg 
                width="10" 
                height="6" 
                viewBox="0 0 10 6" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className={`transition-transform duration-200 opacity-60 ${activeDropdown === 'resources' ? 'rotate-180 text-[#9B3418] dark:text-[#FF6B4A]' : ''}`}
              >
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* PRICING Link */}
          <Link
            to="/pricing"
            className="px-3 h-full flex items-center text-[13.5px] font-medium text-[#1A1917]/80 dark:text-[#E7E3DA]/80 hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors"
            onMouseEnter={() => setActiveDropdown(null)}
          >
            Pricing
          </Link>
          
          {/* DOCS Link */}
          <Link
            to="/docs"
            className="px-3 h-full flex items-center text-[13.5px] font-medium text-[#1A1917]/80 dark:text-[#E7E3DA]/80 hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors"
            onMouseEnter={() => setActiveDropdown(null)}
          >
            Docs
          </Link>
        </nav>

        {/* Right Actions Cluster */}
        <div className="flex items-center space-x-4 h-full" onMouseEnter={() => setActiveDropdown(null)}>
          <div className="hidden lg:flex items-center space-x-4 mr-1">
            <Link 
              to="/contact" 
              className="text-[13px] font-medium text-[#1A1917]/80 dark:text-[#E7E3DA]/80 hover:text-[#9B3418] dark:hover:text-[#FF6B4A] transition-colors"
            >
              Contact Sales
            </Link>
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1A1917]/70 dark:text-[#E7E3DA]/70 hover:text-[#1A1917] dark:hover:text-[#E7E3DA] hover:bg-[#1A1917]/5 dark:hover:bg-[#E7E3DA]/5 transition-colors bg-transparent border-none cursor-pointer"
            title="Toggle Dark Mode"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Sign in Button */}
          <Link 
            to="/login" 
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 border border-[#1A1917]/25 dark:border-[#E7E3DA]/25 rounded text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] hover:bg-[#1A1917]/5 dark:hover:bg-[#E7E3DA]/5 transition-colors"
          >
            Sign in
          </Link>
          
          {/* Get Started CTA */}
          <Link 
            to="/dashboard" 
            className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded text-[13px] font-medium text-[#E7E3DA] bg-[#1A1917] hover:bg-[#9B3418] dark:text-[#1A1917] dark:bg-[#E7E3DA] dark:hover:bg-[#FF6B4A] dark:hover:text-white transition-all shadow-sm"
          >
            Open Studio
          </Link>

          {/* Mobile Menu Toggle (Hidden on Desktop) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1917] dark:text-[#E7E3DA] bg-transparent border-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Corporate Full-Width Mega Menu Panel */}
      {activeDropdown && (
        <div 
          className="absolute top-[60px] left-0 right-0 bg-[#E7E3DA] dark:bg-[#141312] border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 shadow-2xl z-40 transition-all duration-200 animate-fade-down"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
            
            {/* PLATFORM MEGA MENU */}
            {activeDropdown === 'platform' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {platformCategories.map((group, idx) => (
                    <div key={idx} className="flex flex-col space-y-3">
                      <div className="text-[11px] font-semibold tracking-wider text-[#9B3418] dark:text-[#FF6B4A] uppercase">
                        {group.category}
                      </div>
                      <div className="flex flex-col space-y-1">
                        {group.items.map((item, itemIdx) => (
                          item.id ? (
                            <button
                              key={itemIdx}
                              onClick={(e) => handleNavClick(e, item.id)}
                              className="text-left p-2 rounded hover:bg-[#DCD7CB]/60 dark:hover:bg-[#1E1D1A] transition-colors group cursor-pointer bg-transparent border-none"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] group-hover:text-[#9B3418] dark:group-hover:text-[#FF6B4A] transition-colors">
                                  {item.name}
                                </span>
                              </div>
                              <div className="text-[11.5px] text-[#6E6A61] dark:text-[#9E988B] leading-snug">
                                {item.desc}
                              </div>
                            </button>
                          ) : (
                            <Link
                              key={itemIdx}
                              to={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="p-2 rounded hover:bg-[#DCD7CB]/60 dark:hover:bg-[#1E1D1A] transition-colors group text-decoration-none"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] group-hover:text-[#9B3418] dark:group-hover:text-[#FF6B4A] transition-colors">
                                  {item.name}
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#55B685]/15 text-[#55B685] uppercase">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11.5px] text-[#6E6A61] dark:text-[#9E988B] leading-snug">
                                {item.desc}
                              </div>
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dropdown Bottom Feature Strip */}
                <div className="mt-6 pt-4 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex flex-wrap items-center justify-between gap-4 text-[12px]">
                  <span className="text-[#6E6A61] dark:text-[#9E988B]">
                    Looking for direct topology access? Continuous evaluation engine runs live across all nodes.
                  </span>
                  <Link 
                    to="/architecture" 
                    onClick={() => setActiveDropdown(null)}
                    className="font-medium text-[#9B3418] dark:text-[#FF6B4A] hover:underline flex items-center gap-1"
                  >
                    Open Architecture Graph →
                  </Link>
                </div>
              </div>
            )}

            {/* SOLUTIONS MEGA MENU */}
            {activeDropdown === 'solutions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
                {solutionsItems.map((group, idx) => (
                  <div key={idx} className="flex flex-col space-y-3">
                    <div className="text-[11px] font-semibold tracking-wider text-[#9B3418] dark:text-[#FF6B4A] uppercase">
                      {group.category}
                    </div>
                    <div className="flex flex-col space-y-1">
                      {group.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-2.5 rounded hover:bg-[#DCD7CB]/60 dark:hover:bg-[#1E1D1A] transition-colors group text-decoration-none"
                        >
                          <div className="text-[13.5px] font-medium text-[#1A1917] dark:text-[#E7E3DA] group-hover:text-[#9B3418] dark:group-hover:text-[#FF6B4A] transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[12px] text-[#6E6A61] dark:text-[#9E988B] leading-snug">
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* RESOURCES MEGA MENU */}
            {activeDropdown === 'resources' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
                {resourcesItems.map((group, idx) => (
                  <div key={idx} className="flex flex-col space-y-3">
                    <div className="text-[11px] font-semibold tracking-wider text-[#9B3418] dark:text-[#FF6B4A] uppercase">
                      {group.category}
                    </div>
                    <div className="flex flex-col space-y-1">
                      {group.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-2.5 rounded hover:bg-[#DCD7CB]/60 dark:hover:bg-[#1E1D1A] transition-colors group text-decoration-none"
                        >
                          <div className="text-[13.5px] font-medium text-[#1A1917] dark:text-[#E7E3DA] group-hover:text-[#9B3418] dark:group-hover:text-[#FF6B4A] transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[12px] text-[#6E6A61] dark:text-[#9E988B] leading-snug">
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Mobile Drawer (Responsive fallback) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 right-0 bg-[#E7E3DA] dark:bg-[#141312] border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            <div className="text-[10px] font-semibold text-[#9B3418] dark:text-[#FF6B4A] uppercase tracking-wider">Platform Modules</div>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-[14px] text-[#1A1917] dark:text-[#E7E3DA] py-1">Live Dashboard</Link>
            <Link to="/controls" onClick={() => setMobileMenuOpen(false)} className="text-[14px] text-[#1A1917] dark:text-[#E7E3DA] py-1">Controls Matrix</Link>
            <Link to="/scans" onClick={() => setMobileMenuOpen(false)} className="text-[14px] text-[#1A1917] dark:text-[#E7E3DA] py-1">Automated Scanners</Link>
            <Link to="/reports" onClick={() => setMobileMenuOpen(false)} className="text-[14px] text-[#1A1917] dark:text-[#E7E3DA] py-1">Audit Reports</Link>
            <Link to="/architecture" onClick={() => setMobileMenuOpen(false)} className="text-[14px] text-[#1A1917] dark:text-[#E7E3DA] py-1">Architecture Topology</Link>
            <Link to="/integrations" onClick={() => setMobileMenuOpen(false)} className="text-[14px] text-[#1A1917] dark:text-[#E7E3DA] py-1">Integrations</Link>
            <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-[14px] text-[#1A1917] dark:text-[#E7E3DA] py-1">Pricing</Link>
            <Link to="/docs" onClick={() => setMobileMenuOpen(false)} className="text-[14px] text-[#1A1917] dark:text-[#E7E3DA] py-1">Documentation</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-[14px] text-[#1A1917] dark:text-[#E7E3DA] py-1">Contact Sales</Link>
          </div>
          <div className="pt-4 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 border border-[#1A1917]/20 dark:border-[#E7E3DA]/20 rounded text-[13px]">
              Sign in
            </Link>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-[#1A1917] text-[#E7E3DA] dark:bg-[#E7E3DA] dark:text-[#1A1917] rounded text-[13px] font-medium">
              Open Studio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
});

export default StudioNav;
