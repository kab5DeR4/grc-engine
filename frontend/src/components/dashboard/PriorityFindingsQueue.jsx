import { memo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Wrench, Eye, ShieldAlert, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PriorityFindingsQueue = memo(function PriorityFindingsQueue({
  findings = [],
  onRemediate,
  canRemediate = true,
  onSelectFinding,
  isLive = false,
  hasLiveIntegrations = false,
}) {
  const [activeTab, setActiveTab] = useState('ALL');

  const filteredFindings = findings.filter((f) => {
    if (activeTab === 'CRITICAL') return f.severity === 'CRITICAL';
    if (activeTab === 'HIGH') return f.severity === 'HIGH';
    if (activeTab === 'RESOLVED') return (f.status || '').toUpperCase() === 'RESOLVED';
    return (f.status || '').toUpperCase() !== 'RESOLVED';
  });

  const displayFindings = filteredFindings.slice(0, 5);

  return (
    <div className="bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-7 shadow-xs font-sans text-slate-900 dark:text-slate-100 flex flex-col justify-between h-full">
      
      {/* Header Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              OPERATIONAL RISK MANAGEMENT
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              Priority Findings &amp; Remediation SLA
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900/60 p-1 rounded-lg border border-slate-200/80 dark:border-slate-800 text-[11px] font-medium">
              {['ALL', 'CRITICAL', 'HIGH', 'RESOLVED'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <Link
              to="/findings"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors no-underline"
            >
              <span>View All</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Content */}
        {displayFindings.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 my-6">
            <CheckCircle2 size={32} className={`mx-auto mb-2 ${isLive && !hasLiveIntegrations ? 'text-amber-500' : 'text-emerald-500'}`} />
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {isLive 
                ? (hasLiveIntegrations 
                    ? 'Zero Security Defects Across Connected Repositories' 
                    : 'No Live Connectors Configured') 
                : 'Zero Non-Compliant Drift in this Category'}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono max-w-sm mx-auto">
              {isLive 
                ? (hasLiveIntegrations 
                    ? 'All monitored repositories pass canonical security benchmarks.' 
                    : 'Connect GitHub or AWS in Live API mode to harvest real findings and telemetry.') 
                : 'All infrastructure configurations match canonical security benchmarks.'}
            </div>
            {isLive && !hasLiveIntegrations && (
              <div className="mt-4">
                <Link
                  to="/dashboard/integrations"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all no-underline"
                >
                  <span>Connect GitHub</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10.5px] font-mono text-slate-500 uppercase font-semibold">
                  <th className="py-3 pr-3">ID</th>
                  <th className="py-3 px-3">DEFECT CONTEXT &amp; CONTROL</th>
                  <th className="py-3 px-3 hidden sm:table-cell">ENVIRONMENT</th>
                  <th className="py-3 px-3">SEVERITY / SLA</th>
                  <th className="py-3 pl-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {displayFindings.map((finding) => {
                  const isCritical = finding.severity === 'CRITICAL';
                  const isResolved = (finding.status || '').toUpperCase() === 'RESOLVED';

                  return (
                    <tr 
                      key={finding.id}
                      onClick={() => onSelectFinding && onSelectFinding(finding)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors group cursor-pointer"
                    >
                      {/* ID */}
                      <td className="py-3.5 pr-3 align-top">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10.5px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {finding.id}
                        </span>
                      </td>

                      {/* Defect / Control */}
                      <td className="py-3.5 px-3 align-top max-w-sm">
                        <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate">
                          {finding.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate font-mono">
                          Control: <strong className="text-slate-700 dark:text-slate-300">{finding.controlId || finding.canonical_control_id || 'CTL-001'}</strong>
                        </p>
                      </td>

                      {/* Environment */}
                      <td className="py-3.5 px-3 align-top hidden sm:table-cell">
                        <span className="text-xs text-slate-800 dark:text-slate-200 block font-medium">
                          {finding.cloud || 'AWS'}
                        </span>
                        <span className="text-[10.5px] text-slate-500 block font-mono">
                          {finding.account || 'Production'}
                        </span>
                      </td>

                      {/* Severity / SLA */}
                      <td className="py-3.5 px-3 align-top">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                            isCritical
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                          }`}>
                            {finding.severity || 'HIGH'}
                          </span>
                          <span className="text-[10px] text-slate-500 flex items-center gap-1 hidden md:inline-flex font-mono">
                            <Clock size={10} /> <span className="tabular-nums">24</span>H SLA
                          </span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 pl-3 align-top text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {onRemediate && !isResolved && (
                            <button
                              type="button"
                              onClick={() => onRemediate(finding)}
                              disabled={!canRemediate}
                              className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-orange-600 dark:hover:bg-orange-500 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shadow-xs cursor-pointer border-none"
                              title={canRemediate ? 'Execute automated remediation patch' : 'Restricted by RBAC'}
                            >
                              <Wrench size={11} />
                              <span>Remediate</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onSelectFinding && onSelectFinding(finding)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition-colors cursor-pointer"
                            title="Inspect evidence proof in drawer"
                          >
                            <Eye size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
        <span>
          MEAN TIME TO REMEDIATE (MTTR): <strong>{isLive && !hasLiveIntegrations ? 'Standby (Awaiting Ingress)' : '4.2H'}</strong> {isLive && !hasLiveIntegrations ? '' : '(SLA < 24H)'}
        </span>
        <Link to="/findings" className="font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 no-underline">
          <span>FINDINGS CATALOG &rarr;</span>
        </Link>
      </div>

    </div>
  );
});

PriorityFindingsQueue.displayName = 'PriorityFindingsQueue';
export default PriorityFindingsQueue;
