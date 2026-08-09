import { Link } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';

const Header = () => {
  const { runScan, scanRunning, lastScan } = useDemoStore();

  return (
    <header className="h-[60px] flex items-center justify-between px-8 bg-[#E7E3DA] hairline-b sticky top-0 z-40">
      <div className="flex items-center">
        <span className="text-[#1A1917] font-mono text-[11px] font-bold hidden sm:inline-block tracking-widest uppercase">
          ACME-PRODUCTION-WORKSPACE
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="px-2.5 py-1 bg-[#DCD7CB] hairline-all flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#9B3418] animate-pulse"></div>
          <span className="text-[10px] font-mono font-bold text-[#9B3418] uppercase tracking-wider">Demo Mode</span>
        </div>

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
};

export default Header;
