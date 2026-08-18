import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import { Moon, Sun } from 'lucide-react';

// header component memoized so page headers stay light fr
const Header = memo(() => {
  const { runScan, scanRunning, lastScan, isDarkMode, toggleDarkMode } = useDemoStore();

  return (
    <header className="h-[60px] flex items-center justify-between px-8 bg-[#E7E3DA] dark:bg-[#1A1917] hairline-b sticky top-0 z-40 transition-colors">
      <div className="flex items-center">
        <span className="text-[#1A1917] dark:text-[#E7E3DA] font-mono text-[11px] font-bold hidden sm:inline-block tracking-widest uppercase">
          ACME-PRODUCTION-WORKSPACE
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="px-2.5 py-1 bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all flex items-center gap-2 transition-colors">
          <div className="w-1.5 h-1.5 bg-[#9B3418] dark:bg-[#FF6B4A] animate-pulse"></div>
          <span className="text-[10px] font-mono font-bold text-[#9B3418] dark:text-[#FF6B4A] uppercase tracking-wider">Demo Mode</span>
        </div>
        
        <button 
          onClick={toggleDarkMode}
          className="studio-btn py-1.5 px-3 flex items-center justify-center transition-colors"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <button 
          onClick={runScan}
          disabled={scanRunning}
          className="studio-btn studio-btn-pigment text-[10.5px] py-1.5 px-3 uppercase"
        >
          {scanRunning ? '[ SCANNING... ]' : '[ RUN SYSTEM SCAN ]'}
        </button>

        <Link to="/login" className="studio-btn text-[10.5px] py-1.5 px-3 uppercase">
          [ LOGOUT ]
        </Link>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
