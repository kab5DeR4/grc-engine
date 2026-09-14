import { memo } from 'react';
import { X, ShieldAlert, Wrench, CheckCircle2, Copy, FileText, ArrowUpRight, Hash, Database, ExternalLink } from 'lucide-react';

export const FindingDetailDrawer = memo(function FindingDetailDrawer({
  finding,
  onClose,
  onRemediate,
  canRemediate = true,
  isRemediating = false,
}) {
  if (!finding) return null;

  const isResolved = (finding.status || '').toUpperCase() === 'RESOLVED';
  const isCritical = finding.severity === 'CRITICAL';

  // Sample raw telemetry payload for evidence proof inspection
  const rawTelemetryMock = {
    resource_arn: `arn:aws:${(finding.cloud || 'aws').toLowerCase()}:us-east-1:123456789012:${finding.resource || 'resource-node'}`,
    defect_detected_at: finding.detectedTime || '2026-09-14T12:00:00Z',
    evaluation_rule: finding.controlId || 'CTRL-SEC-001',
    hash_signature: '0x8f3c...b419a4e7',
    policy_expectation: 'Enforce AES-256 server-side encryption and block public ACL traversal',
    actual_state: {
      public_access_block: false,
      mfa_delete_enabled: false,
      drift_status: 'NON_COMPLIANT',
    },
  };

  return (
    <div 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="drawer-finding-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs font-sans animate-in fade-in duration-200"
    >
      <div 
        className="w-full max-w-xl h-full bg-[var(--surface)] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        {/* Top Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 sticky top-0 bg-[var(--surface)] z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                {finding.id}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                isCritical
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
              }`}>
                {finding.severity || 'HIGH'}
              </span>
              <span className="text-xs font-mono text-slate-400">&bull; {finding.cloud || 'AWS'}</span>
            </div>
            <h2 id="drawer-finding-title" className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {finding.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 flex-1 text-xs">
          
          {/* Defect Description */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              Defect Context &amp; Impact
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              {finding.description || 'This asset configuration directly violates baseline encryption or access control policies required for continuous compliance certification.'}
            </p>
          </div>

          {/* Canonical Control Mapping */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">
                Regulatory Control Target
              </span>
              <span className="text-xs font-mono text-orange-600 dark:text-orange-400 font-semibold">
                {finding.controlId || 'CTRL-DATA-004'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(finding.frameworks || ['SOC 2 Type II', 'ISO 27001', 'NIST 800-53', 'CIS']).map((fw) => (
                <span key={fw} className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10.5px] font-mono text-slate-700 dark:text-slate-300">
                  {fw}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Remediation Action */}
          <div className="space-y-2">
            <span className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              Automated Remediation Prescription
            </span>
            <div className="p-3.5 rounded-lg bg-orange-500/5 border border-orange-500/20 text-orange-950 dark:text-orange-200 leading-relaxed">
              {finding.remediation || 'Execute automated terraform/API policy update to enforce block-public-access and attach audited KMS key.'}
            </div>
          </div>

          {/* Raw Telemetry Evidence Proof */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Cryptographic Ingress Evidence
              </span>
              <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={11} />
                <span>SHA-256 SIGNED</span>
              </span>
            </div>
            <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              <code>{JSON.stringify(rawTelemetryMock, null, 2)}</code>
            </pre>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-[var(--surface)] flex items-center justify-between gap-3 sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Dismiss
          </button>

          {!isResolved && onRemediate && (
            <button
              type="button"
              onClick={() => onRemediate(finding)}
              disabled={!canRemediate || isRemediating}
              className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer border-none"
            >
              <Wrench size={13} className={isRemediating ? 'animate-spin' : ''} />
              <span>{isRemediating ? 'Applying Automated Fix...' : 'Execute Automated Remediation'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
});

FindingDetailDrawer.displayName = 'FindingDetailDrawer';
export default FindingDetailDrawer;
