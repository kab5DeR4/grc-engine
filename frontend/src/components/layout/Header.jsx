import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isDemo = location.pathname !== '/';

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-charcoal/10">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-baseline group hover:opacity-80 transition-opacity">
          <span className="font-display text-3xl uppercase tracking-normal text-charcoal">GRC ENGINE</span>
          <span className="font-display text-3xl text-yellow">.</span>
        </Link>

        {!isDemo && (
          <nav className="hidden md:flex items-center gap-8">
            <a href="#product" className="font-sans text-sm font-medium text-charcoal hover:text-yellow transition-colors">Product</a>
            <a href="#solutions" className="font-sans text-sm font-medium text-charcoal hover:text-yellow transition-colors">Solutions</a>
            <a href="#pricing" className="font-sans text-sm font-medium text-charcoal hover:text-yellow transition-colors">Pricing</a>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-6">
        {isDemo && (
          <div className="px-3 py-1 bg-yellow/20 border border-yellow/50 rounded-full">
            <span className="text-[10px] font-bold text-charcoal uppercase tracking-widest font-sans">Demo Mode</span>
          </div>
        )}
        <Link to="/" className="hidden sm:block font-sans text-sm font-medium text-charcoal hover:text-yellow transition-colors">
          Login
        </Link>
        <Link to="/demo" className="bg-charcoal text-white font-sans text-sm font-medium px-6 py-2.5 rounded-full hover:bg-dark-gray transition-colors hover:-translate-y-0.5 transform">
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;
