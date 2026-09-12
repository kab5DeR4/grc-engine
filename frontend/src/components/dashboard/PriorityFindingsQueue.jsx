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
    // findings queue refactored fr fr
    <div className="bg-[var(--surface)] rounded-xl border border-[var(--hairline)] p-6 md:p-8 shadow-sm font-mono text-[var(--ink)] flex flex-col justify-between h-full">
      
      {/* Header Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[var(--hairline)]">
          <div>
            <span className="text-[10.5px] font-bold text-[var(--ink-muted)] uppercase tracking-wider block">
              OPERATIONAL RISK MANAGEMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mt-1">
              Priority Findings & Remediation SLA
            </h3>
          </div>
          <Link
            to="/findings"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[var(--hairline)] hover:border-[var(--ink-muted)] text-xs font-bold text-[var(--ink)] transition-colors self-start sm:self-auto bg-[var(--surface-raised)] active:scale-[0.97]"
          >
            <span>CHECK ALL (<span className="tabular-nums">{findings.length}</span>)</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Content */}
        {displayFindings.length === 0 ? (
          <div className="p-10 text-center bg-[var(--surface-raised)] rounded-xl border border-[var(--hairline)] my-6">
            <CheckCircle2 size={32} className="text-[var(--pass)] mx-auto mb-2" />
            <div className="text-sm font-bold text-[var(--ink)]">
              Zero Active Non-Compliant Drift Detected
            </div>
            <div className="text-xs text-[var(--ink-muted)] mt-1">
              All infrastructure configurations match canonical security benchmarks.
            </div>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--hairline)] text-[10.5px] text-[var(--ink-muted)] uppercase font-semibold">
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 px-4">DEFECT / CONTROL</th>
                  <th className="py-3 px-4 hidden sm:table-cell">ENVIRONMENT</th>
                  <th className="py-3 px-4">SEVERITY / SLA</th>
                  <th className="py-3 pl-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--hairline)]">
                {displayFindings.map((finding) => {
                  const isCritical = finding.severity === 'CRITICAL';
                  const isResolved = (finding.status || '').toUpperCase() === 'RESOLVED';

                  return (
                    <tr 
                      key={finding.id}
                      className="hover:bg-[var(--surface-raised)] transition-colors group"
                    >
                      {/* ID */}
                      <td className="py-4 pr-4 align-top">
                        <span className="px-2 py-1 bg-[var(--surface-raised)] rounded-md text-[10.5px] font-bold text-[var(--ink)] border border-[var(--hairline)]">
                          {finding.id}
                        </span>
                      </td>

                      {/* Defect / Control */}
                      <td className="py-4 px-4 align-top max-w-xs">
                        <h4 className="font-bold text-xs sm:text-sm text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors truncate">
                          {finding.title}
                        </h4>
                        <p className="text-[11px] text-[var(--ink-muted)] mt-0.5 truncate">
                          Control: <span className="font-bold text-[var(--ink-secondary)]">{finding.controlId || finding.canonical_control_id || 'CTL-001'}</span>
                        </p>
                      </td>

                      {/* Environment */}
                      <td className="py-4 px-4 align-top hidden sm:table-cell">
                        <span className="text-xs text-[var(--ink)] block font-medium">
                          {finding.cloud || 'AWS'}
                        </span>
                        <span className="text-[10.5px] text-[var(--ink-muted)] block">
                          {finding.account || 'Production'}
                        </span>
                      </td>

                      {/* Severity / SLA */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            isCritical
                              ? 'bg-[var(--fail-surface)] text-[var(--fail)] border-[var(--fail)]/30'
                              : 'bg-[var(--warn-surface)] text-[var(--warn)] border-[var(--warn)]/30'
                          }`}>
                            {finding.severity || 'HIGH'}
                          </span>
                          <span className="text-[10px] text-[var(--ink-muted)] flex items-center gap-1 hidden md:inline-flex font-semibold">
                            <Clock size={10} /> <span className="tabular-nums">24</span>H
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
                              className="px-3 py-1.5 bg-[var(--ink)] hover:opacity-90 text-[var(--surface)] dark:bg-[var(--accent)] dark:text-[var(--ground)] rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-[0.97] cursor-pointer"
                              title={canRemediate ? 'Execute automated remediation patch' : 'Restricted by RBAC'}
                            >
                              <Wrench size={12} />
                              <span>Remediate</span>
                            </button>
                          )}
                          <Link
                            to="/findings"
                            className="p-1.5 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
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
      <div className="mt-5 pt-4 border-t border-[var(--hairline)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
        <span>SLA BREACH RISK: <span className="tabular-nums">0</span> OPEN BREACHES</span>
        <Link to="/findings" className="font-bold text-[var(--ink)] hover:underline flex items-center gap-1">
          <span>ALL FINDINGS</span>
          <span>→</span>
        </Link>
      </div>

    </div>
  );
});

export default PriorityFindingsQueue;
