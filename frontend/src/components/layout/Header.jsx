import { memo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';
import { ROLE_DETAILS } from '../../data/demo/rbac';
import ThemeDensitySelector from '../ui/ThemeDensitySelector';

// header component with live rbac persona selector and dual mode live toggle fr
const Header = memo(() => {
  const { 
    runScan, 
    triggerLiveScan, 
    scanRunning, 
    currentUser, 
    setCurrentUserRole, 
    hasPermission,
    isLiveMode,
    setLiveMode,
    checkBackendHealth,
    backendStatusMessage
  } = useDemoStore();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const canRunScan = hasPermission('run_scans');
  const roleDetail = ROLE_DETAILS[currentUser?.role] || ROLE_DETAILS.PLATFORM_ADMIN;

  // check backend status on mount
  useEffect(() => {
    checkBackendHealth();
  }, [checkBackendHealth]);

  const handleScanClick = async () => {
    if (isLiveMode) {
      try {
        await triggerLiveScan('ALL');
      } catch {
        runScan();
      }
    } else {
      runScan();
    }
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[64px] flex items-center justify-between px-4 sm:px-8 bg-[var(--surface)] border-b border-[var(--hairline)] sticky top-0 z-40 transition-colors duration-150 font-sans">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="font-bold text-slate-700 dark:text-slate-300">WORKSPACE</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">SOVEREIGN VAULT</span>
        </div>

        {/* Live RBAC Role Switcher Dropdown */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setRoleDropdownOpen(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 transition-all cursor-pointer active:scale-95"
            title="Switch RBAC Persona to test permissions"
          >
            <Shield size={13} className="text-sky-600 dark:text-sky-400" />
            <span>ROLE: [{roleDetail.shortLabel}]</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${roleDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {roleDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="absolute left-0 mt-1.5 w-64 bg-[var(--surface)] rounded-xl border border-[var(--hairline)] shadow-md z-50 p-1.5 space-y-1 font-sans"
              >
                <div className="px-3 py-2 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 uppercase tracking-wider">
                  SELECT RBAC TEST PERSONA
                </div>
                {Object.values(ROLE_DETAILS).map((role) => {
                  const isSelected = currentUser.role === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        setCurrentUserRole(role.id);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between transition-all cursor-pointer active:scale-98 ${
                        isSelected
                          ? 'bg-slate-900 text-white font-bold dark:bg-sky-400 dark:text-slate-950 shadow-xs'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{role.name}</div>
                        <div className="text-[10px] opacity-75 font-mono font-normal">{role.clearanceLevel}</div>
                      </div>
                      {isSelected && <Check size={14} className={isSelected ? 'text-white dark:text-slate-950 font-bold' : ''} />}
                    </button>
                  );
                })}
                <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to="/settings/members"
                    onClick={() => setRoleDropdownOpen(false)}
                    className="w-full block text-center text-[10.5px] font-mono font-bold text-sky-600 dark:text-sky-400 p-1.5 hover:underline"
                  >
                    VIEW FULL RBAC MATRIX →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real / Demo Segmented Switch */}
        <div 
          className="flex items-center bg-slate-100 dark:bg-slate-800/90 rounded-xl p-1 text-xs select-none border border-slate-200 dark:border-slate-700 font-mono"
          title={backendStatusMessage || (isLiveMode ? 'Connected to live FastAPI backend at http://localhost:8000' : 'Running on offline sandbox mock data')}
        >
          <button
            type="button"
            onClick={() => setLiveMode(false)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
              !isLiveMode 
                ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs font-bold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <span>Sandbox</span>
          </button>
          <button
            type="button"
            onClick={() => setLiveMode(true)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isLiveMode 
                ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs font-bold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLiveMode ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            <span>Live API</span>
          </button>
        </div>
        
        {/* Theme Selector */}
        <ThemeDensitySelector />

        {/* Scan Button with High Contrast and Tactile Spring Physics */}
        {canRunScan ? (
          <button 
            type="button"
            onClick={handleScanClick}
            disabled={scanRunning}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            {scanRunning ? 'Evaluating...' : 'Run Audit'}
          </button>
        ) : (
          <button 
            type="button"
            disabled
            className="px-3.5 py-1.5 rounded-xl opacity-50 cursor-not-allowed text-xs font-mono border border-dashed border-slate-300 dark:border-slate-700 text-slate-500"
            title={`Scan execution requires PLATFORM ADMIN role. Current: ${roleDetail.name}`}
          >
            Restricted
          </button>
        )}

        <Link 
          to="/login" 
          className="px-3.5 py-2 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-all active:scale-95"
        >
          Logout
        </Link>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
