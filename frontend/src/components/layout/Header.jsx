import { memo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronDown, Sliders, Check } from 'lucide-react';
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
    <header className="h-[60px] flex items-center justify-between px-3 sm:px-6 bg-[#E7E3DA] dark:bg-[#1A1917] hairline-b sticky top-0 z-40 transition-colors font-mono">
      <div className="flex items-center gap-3">
        <span className="text-[#1A1917] dark:text-[#E7E3DA] text-[11px] font-bold hidden md:inline-block tracking-widest uppercase">
          ACME-PRODUCTION-WORKSPACE
        </span>

        {/* Live RBAC Role Switcher Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setRoleDropdownOpen(prev => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all text-[10.5px] font-bold text-[#1A1917] dark:text-[#E7E3DA] hover:border-[#9B3418] transition-colors"
            title="Switch RBAC Persona to test permissions"
          >
            <Shield size={13} className="text-[#9B3418]" />
            <span>ROLE: [{roleDetail.shortLabel}]</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${roleDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {roleDropdownOpen && (
            <div className="absolute left-0 mt-1 w-64 bg-[#E7E3DA] dark:bg-[#1E1D1A] hairline-all shadow-2xl z-50 p-1 space-y-1">
              <div className="px-2 py-1.5 text-[9px] mono-label text-[#6E6A61] hairline-b">
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
                    className={`w-full text-left px-2.5 py-2 text-[11px] flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-[#1A1917] text-[#E7E3DA] font-bold'
                        : 'text-[#1A1917] dark:text-[#E7E3DA] hover:bg-[#DCD7CB] dark:hover:bg-[#2A2825]'
                    }`}
                  >
                    <div>
                      <div>{role.name}</div>
                      <div className="text-[9px] opacity-70 font-normal">{role.clearanceLevel}</div>
                    </div>
                    {isSelected && <Check size={13} className="text-[#9B3418]" />}
                  </button>
                );
              })}
              <div className="pt-1 hairline-t">
                <Link
                  to="/settings/members"
                  onClick={() => setRoleDropdownOpen(false)}
                  className="w-full block text-center text-[9.5px] mono-label text-[#9B3418] p-1.5 hover:underline"
                >
                  VIEW FULL RBAC MATRIX →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Prominent Real / Demo Segmented Switch */}
        <div 
          className="flex items-center bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all p-0.5 text-[10.5px] font-mono select-none"
          title={backendStatusMessage || (isLiveMode ? 'Connected to live FastAPI backend at http://localhost:8000' : 'Running on offline sandbox mock data')}
        >
          <button
            type="button"
            onClick={() => setLiveMode(false)}
            className={`px-2.5 py-1 transition-all flex items-center gap-1.5 cursor-pointer ${
              !isLiveMode 
                ? 'bg-[#9B3418] text-white font-bold shadow-sm' 
                : 'text-[#6E6A61] dark:text-[#A8A49C] hover:text-[#1A1917] dark:hover:text-[#E7E3DA]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-90 inline-block"></span>
            <span>DEMO DATA</span>
          </button>
          <button
            type="button"
            onClick={() => setLiveMode(true)}
            className={`px-2.5 py-1 transition-all flex items-center gap-1.5 cursor-pointer ${
              isLiveMode 
                ? 'bg-green-700 text-white font-bold shadow-sm' 
                : 'text-[#6E6A61] dark:text-[#A8A49C] hover:text-[#1A1917] dark:hover:text-[#E7E3DA]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLiveMode ? 'bg-white animate-pulse' : 'bg-green-600'}`}></span>
            <span>REAL DATA (LIVE API)</span>
          </button>
        </div>
        
        {/* Theme and Density Selector */}
        <ThemeDensitySelector />

        {/* Settings Shortcut Button */}
        <Link
          to="/settings/profile"
          className="studio-btn text-[10.5px] py-1.5 px-2.5 flex items-center gap-1"
          title="Workspace & User Settings"
        >
          <Sliders size={13} />
          <span className="hidden sm:inline">[ SETTINGS ]</span>
        </Link>

        {/* Scan Button with RBAC Enforced Check */}
        {canRunScan ? (
          <button 
            onClick={handleScanClick}
            disabled={scanRunning}
            className="studio-btn studio-btn-pigment text-[10.5px] py-1.5 px-3 uppercase"
          >
            {scanRunning ? '[ SCANNING... ]' : '[ RUN SYSTEM SCAN ]'}
          </button>
        ) : (
          <button 
            disabled
            className="studio-btn opacity-50 cursor-not-allowed text-[10px] py-1.5 px-2.5 border-dashed"
            title={`Scan execution requires PLATFORM ADMIN or SECURITY ENGINEER role. Current role: ${roleDetail.name}`}
          >
            [ SCAN RESTRICTED: RBAC ]
          </button>
        )}

        <Link to="/login" className="studio-btn text-[10.5px] py-1.5 px-2.5 sm:px-3 uppercase">
          [ LOGOUT ]
        </Link>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
