import { memo } from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PriorityFindingsQueue = memo(function PriorityFindingsQueue({
  findings = [],
  onRemediate,
  canRemediate = true,
}) {
  const displayFindings = findings.slice(0, 4);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700/80 p-6 md:p-8 shadow-sm font-mono text-slate-900 dark:text-slate-100 flex flex-col justify-between h-full">
      
      {/* Header Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              OPERATIONAL RISK MANAGEMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Priority Findings & Remediation SLA
            </h3>
          </div>
          <Link
            to="/findings"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-500 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors self-start sm:self-auto bg-slate-50 dark:bg-slate-800"
          >
            <span>CHECK ALL ({findings.length})</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Content */}
        {displayFindings.length === 0 ? (
          <div className="p-10 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 my-6">
            <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Zero Active Non-Compliant Drift Detected
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              All infrastructure configurations match canonical security benchmarks.
            </div>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-[10.5px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 px-4">DEFECT / CONTROL</th>
                  <th className="py-3 px-4 hidden sm:table-cell">ENVIRONMENT</th>
                  <th className="py-3 px-4">SEVERITY / SLA</th>
                  <th className="py-3 pl-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {displayFindings.map((finding) => {
                  const isCritical = finding.severity === 'CRITICAL';
                  const isResolved = (finding.status || '').toUpperCase() === 'RESOLVED';

                  return (
                    <tr 
                      key={finding.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                    >
                      {/* ID */}
                      <td className="py-4 pr-4 align-top">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-[10.5px] font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                          {finding.id}
                        </span>
                      </td>

                      {/* Defect / Control */}
                      <td className="py-4 px-4 align-top max-w-xs">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors truncate">
                          {finding.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          Control: <span className="font-bold text-slate-700 dark:text-slate-300">{finding.controlId || finding.canonical_control_id || 'CTL-001'}</span>
                        </p>
                      </td>

                      {/* Environment */}
                      <td className="py-4 px-4 align-top hidden sm:table-cell">
                        <span className="text-xs text-slate-800 dark:text-slate-200 block font-medium">
                          {finding.cloud || 'AWS'}
                        </span>
                        <span className="text-[10.5px] text-slate-500 dark:text-slate-400 block">
                          {finding.account || 'Production'}
                        </span>
                      </td>

                      {/* Severity / SLA */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            isCritical
                              ? 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
                              : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                          }`}>
                            {finding.severity || 'HIGH'}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 hidden md:inline-flex font-semibold">
                            <Clock size={10} /> 24H
                          </span>
                        </div>
                      </td>

                      {/* Action Button - High Contrast */}
                      <td className="py-4 pl-4 align-top text-right">
                        <div className="flex items-center justify-end gap-2">
                          {onRemediate && !isResolved && (
                            <button
                              type="button"
                              onClick={() => onRemediate(finding)}
                              disabled={!canRemediate}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                              title={canRemediate ? 'Execute automated remediation patch' : 'Restricted by RBAC'}
                            >
                              <Wrench size={12} />
                              <span>Remediate</span>
                            </button>
                          )}
                          <Link
                            to="/findings"
                            className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                            <ArrowUpRight size={14} />
                          </Link>
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
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>SLA BREACH RISK: 0 OPEN BREACHES</span>
        <Link to="/findings" className="font-bold text-slate-900 dark:text-white hover:underline flex items-center gap-1">
          <span>ALL FINDINGS</span>
          <span>→</span>
        </Link>
      </div>

    </div>
  );
});

export default PriorityFindingsQueue;
