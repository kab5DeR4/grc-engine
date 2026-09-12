import { useState, useMemo } from 'react';
import { useDemoStore } from '../store/demoStore';
import RbacPermissionBanner from '../components/settings/RbacPermissionBanner';
import { Wrench } from 'lucide-react';

export default function FindingsPage() {
  const { 
    findings, 
    liveFindings, 
    isLiveMode, 
    simulateRemediation, 
    resolveLiveFinding, 
    hasPermission 
  } = useDemoStore();
  const [filter, setFilter] = useState('ALL');
  const canRemediate = hasPermission('simulate_remediation');

  const activeFindings = useMemo(() => {
    if (isLiveMode && liveFindings && liveFindings.length > 0) {
      return liveFindings.map(f => ({
        id: f.finding_code || f.id,
        rawId: f.id,
        control: f.canonical_control_id || 'CTL-GH-01',
        severity: f.severity || 'HIGH',
        sla: '24h SLA',
        status: f.status || 'OPEN',
        title: f.title,
        remediation: f.remediation_action || f.description,
      }));
    }
    return findings;
  }, [isLiveMode, liveFindings, findings]);

  const filtered = activeFindings.filter(f => {
    if (filter === 'ALL') return true;
    const normalized = (f.status || '').toUpperCase();
    return normalized === filter;
  });

  const handleRemediate = async (item) => {
    try {
      if (isLiveMode && item.rawId) {
        await resolveLiveFinding(item.rawId, 'Remediation confirmed via console');
      } else {
        simulateRemediation(item.id, item.control || item.control_id);
      }
    } catch (err) {
      alert(`Failed to apply remediation: ${err.message}`);
    }
  };

  return (
    <div className="w-full h-full text-slate-900 dark:text-slate-100 font-sans max-w-[1520px] mx-auto pb-16 space-y-8">
      
      {/* Page Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wider">
            Risk &amp; Drift Management
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Active Findings &amp; <span className="text-sky-600 dark:text-sky-400">Remediation SLA</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Prioritized inventory of security findings and control failures requiring engineering remediation to preserve audit readiness.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 self-start md:self-auto">
          {['ALL', 'OPEN', 'RESOLVED'].map(st => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                filter === st 
                  ? 'bg-slate-900 text-white dark:bg-sky-400 dark:text-slate-950 border-transparent shadow-xs' 
                  : 'bg-[var(--surface)] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* RBAC restriction banner */}
      {!canRemediate && (
        <RbacPermissionBanner
          actionName="simulating automated control remediation"
          requiredRole="PLATFORM ADMIN or SECURITY ENGINEER"
        />
      )}

      {/* Findings List */}
      <div className="space-y-4">
        {filtered.map(item => {
          const isResolved = item.status === 'Resolved' || item.status === 'RESOLVED';
          return (
            <div 
              key={item.id} 
              className="p-6 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-xs font-mono">
                  <span className="font-bold text-sky-600 dark:text-sky-400">{item.id}</span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-slate-500 font-semibold">{item.control || item.control_id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold ${
                    item.severity === 'CRITICAL' 
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' 
                      : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-slate-500">{item.sla}</span>
                  <span className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] ${
                    isResolved 
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  }`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h2>

              <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="text-[10.5px] font-mono font-bold text-sky-600 dark:text-sky-400 block uppercase">
                  Automated Remediation Guidance:
                </span>
                <p className="leading-relaxed font-mono text-[11.5px]">{item.remediation}</p>
              </div>

              {!isResolved && (
                <div className="pt-2 flex justify-end">
                  {canRemediate ? (
                    <button
                      type="button"
                      onClick={() => handleRemediate(item)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center gap-1.5 shadow-xs border-none"
                    >
                      <Wrench size={13} />
                      <span>{isLiveMode ? 'Resolve Finding (API)' : 'Simulate Remediation'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="px-3.5 py-1.5 rounded-xl opacity-50 cursor-not-allowed text-xs font-mono border border-dashed border-slate-300 dark:border-slate-700 text-slate-500"
                      title="Remediation simulation restricted for External Auditors."
                    >
                      Remediation Restricted (RBAC)
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
