import { memo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronDown, Check, RefreshCw, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../../store/demoStore';
import { ROLE_DETAILS } from '../../data/demo/rbac';
import ThemeDensitySelector from '../ui/ThemeDensitySelector';

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
    <header className="h-14 flex items-center justify-between px-4 sm:px-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border-b border-white/20 dark:border-slate-700/40 shadow-[0_4px_30px_rgba(0,0,0,0.05)] sticky top-0 z-40 font-sans transition-all">
      
      {/* Left: Environment Breadcrumb & Live Health Dot */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-medium text-slate-700 dark:text-slate-300">Sovereign Vault</span>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">{isLiveMode ? 'Production' : 'Sandbox'}</span>
        </div>

        {/* Live RBAC Role Switcher Dropdown */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setRoleDropdownOpen(prev => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
            title="Switch RBAC Persona to test permissions"
          >
            <Shield size={12} className="text-orange-600 dark:text-orange-500" />
            <span>Role: {roleDetail.shortLabel}</span>
            <ChevronDown size={11} className={`transition-transform duration-150 ${roleDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {roleDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -2 }}
                transition={{ duration: 0.12 }}
                className="absolute left-0 mt-1 w-64 bg-[var(--surface)] rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg z-50 p-1.5 space-y-0.5 font-sans"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Switch RBAC Persona
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
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-md flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white font-medium dark:bg-slate-100 dark:text-slate-900'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-[10px] opacity-75 font-mono">{role.clearanceLevel}</div>
                      </div>
                      {isSelected && <Check size={13} className="shrink-0" />}
                    </button>
                  );
                })}
                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to="/settings/members"
                    onClick={() => setRoleDropdownOpen(false)}
                    className="w-full block text-center text-[10.5px] font-mono text-orange-600 dark:text-orange-400 py-1 hover:underline no-underline"
                  >
                    View RBAC Matrix &rarr;
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Actions: Segmented Sandbox/Live Toggle, Theme, Scan Button, Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Sandbox vs Live API Segmented Control */}
        <div 
          className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs select-none border border-slate-200 dark:border-slate-700 font-mono"
          title={backendStatusMessage || (isLiveMode ? 'Connected to live FastAPI backend at http://localhost:8000' : 'Running on offline sandbox mock data')}
        >
          <button
            type="button"
            onClick={() => setLiveMode(false)}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border-none ${
              !isLiveMode 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-medium' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sandbox
          </button>
          <button
            type="button"
            onClick={() => setLiveMode(true)}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1.5 cursor-pointer border-none ${
              isLiveMode 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-medium' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLiveMode ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>Live API</span>
          </button>
        </div>
        
        <ThemeDensitySelector />

        {/* Run Scan Button */}
        {canRunScan ? (
          <button 
            type="button"
            onClick={handleScanClick}
            disabled={scanRunning}
            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white rounded-lg text-xs font-medium transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border border-zinc-900 dark:border-zinc-100 active:scale-[0.98]"
          >
            <RefreshCw size={12} className={scanRunning ? 'animate-spin text-orange-400 dark:text-orange-600' : ''} />
            <span>{scanRunning ? 'Scanning...' : 'Trigger Scan'}</span>
          </button>
        ) : (
          <button 
            type="button"
            disabled
            className="px-2.5 py-1 rounded-md opacity-50 cursor-not-allowed text-xs font-mono border border-dashed border-slate-300 dark:border-slate-700 text-slate-500"
            title={`Scan execution restricted for ${roleDetail.name}`}
          >
            Restricted
          </button>
        )}

        <Link 
          to="/login" 
          className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors no-underline"
          title="Sign Out"
        >
          <LogOut size={16} />
        </Link>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
