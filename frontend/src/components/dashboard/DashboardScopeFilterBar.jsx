import { memo } from 'react';
import { Filter, Calendar, Shield, Cloud, Terminal, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';

export const DashboardScopeFilterBar = memo(function DashboardScopeFilterBar({
  selectedEnv = 'ALL',
  onSelectEnv,
  selectedFramework = 'ALL',
  onSelectFramework,
  auditWindow = 'Q3 2026',
  onSelectAuditWindow,
  auditorMode = false,
  onToggleAuditorMode,
  activeDrift = 0,
  isLive = false,
  hasLiveIntegrations = false,
}) {
  const environments = [
    { id: 'ALL', label: 'All Clouds & Repos' },
    { id: 'AWS', label: 'AWS Production' },
    { id: 'GITHUB', label: 'GitHub Repos' },
    { id: 'K8S', label: 'Kubernetes EKS' },
  ];

  const frameworks = [
    { id: 'ALL', label: 'All Frameworks' },
    { id: 'SOC2', label: 'SOC 2 Type II' },
    { id: 'ISO27001', label: 'ISO 27001' },
    { id: 'NIST', label: 'NIST SP 800-53' },
    { id: 'CIS', label: 'CIS Benchmark' },
  ];

  const auditWindows = ['Q3 2026 (Live Audit)', 'Annual 2026 Continuous', 'Q4 2026 Scheduled'];

  return (
    <div className="bg-[var(--surface)] p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-sans">
      
      {/* Left side filters */}
      <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
        
        {/* Environment Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/60 p-1 rounded-lg border border-slate-200/80 dark:border-slate-800">
          <Cloud size={13} className="text-slate-500 ml-1.5 shrink-0" />
          {environments.map((env) => (
            <button
              key={env.id}
              type="button"
              onClick={() => onSelectEnv(env.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                selectedEnv === env.id
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {env.label}
            </button>
          ))}
        </div>

        {/* Framework Quick Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
          <Shield size={13} className="text-slate-500 shrink-0" />
          <select
            value={selectedFramework}
            aria-label="Filter by Compliance Standard"
            onChange={(e) => onSelectFramework(e.target.value)}
            className="bg-transparent text-slate-800 dark:text-slate-200 text-[11px] font-medium border-none outline-none cursor-pointer pr-1"
          >
            {frameworks.map((fw) => (
              <option key={fw.id} value={fw.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {fw.label}
              </option>
            ))}
          </select>
        </div>

        {/* Audit Period Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/60 px-2.5 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
          <Calendar size={13} className="text-slate-500 shrink-0" />
          <select
            value={auditWindow}
            aria-label="Filter by Audit Window Period"
            onChange={(e) => onSelectAuditWindow(e.target.value)}
            className="bg-transparent text-slate-800 dark:text-slate-200 text-[11px] font-medium border-none outline-none cursor-pointer pr-1"
          >
            {auditWindows.map((win) => (
              <option key={win} value={win} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {win}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Right side Auditor Mode Toggle & Merkle Ledger status */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
        
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
          <span className={`w-1.5 h-1.5 rounded-full ${
            isLive 
              ? (hasLiveIntegrations ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500') 
              : 'bg-emerald-500 animate-pulse'
          }`}></span>
          <span>
            MERKLE ROOT: <strong>{isLive ? (hasLiveIntegrations ? '0x8f9c...2d1b' : 'Standby') : '0x4f8a...8e21'}</strong> ({isLive ? (hasLiveIntegrations ? 'live immutable' : 'awaiting ingress') : 'tamper-evident'})
          </span>
        </div>

        {/* Auditor Perspective Switch */}
        <button
          type="button"
          onClick={onToggleAuditorMode}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            auditorMode
              ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
          }`}
          title="Toggle formal CPA/Auditor verification mode"
        >
          <Sparkles size={12} className={auditorMode ? 'text-white' : 'text-orange-500'} />
          <span>{auditorMode ? 'Auditor Mode: Active' : 'Auditor Mode'}</span>
        </button>

      </div>

    </div>
  );
});

DashboardScopeFilterBar.displayName = 'DashboardScopeFilterBar';
export default DashboardScopeFilterBar;
