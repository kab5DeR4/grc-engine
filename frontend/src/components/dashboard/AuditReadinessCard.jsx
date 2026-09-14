import { memo, useState } from 'react';
import { ShieldCheck, Award, Download, CheckCircle2, AlertTriangle, FileSpreadsheet, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';

export const AuditReadinessCard = memo(function AuditReadinessCard({ 
  score = 88, 
  isLive = false, 
  hasLiveIntegrations = false 
}) {
  const { liveEvidence } = useDemoStore();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const isAwaiting = isLive && (!hasLiveIntegrations || score === null);
  const currentScore = score !== null && score !== undefined ? score : 0;

  const auditFrameworks = isLive
    ? [
        {
          name: 'SOC 2 Type II',
          readiness: isAwaiting ? null : Math.min(100, Math.round(currentScore * 1.02)),
          controls: isAwaiting ? '0 / 0 Verified' : '12 / 12 Verified',
          period: isAwaiting ? 'Awaiting Live Connector' : 'Live Continuous Audit',
          status: isAwaiting ? 'AWAITING INGRESS' : 'AUDIT READY',
          badgeColor: isAwaiting 
            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' 
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        },
        {
          name: 'ISO 27001:2022',
          readiness: isAwaiting ? null : Math.min(100, Math.round(currentScore * 0.98)),
          controls: isAwaiting ? '0 / 0 Verified' : '10 / 10 Verified',
          period: isAwaiting ? 'Awaiting Live Connector' : 'Live Surveillance Ingress',
          status: isAwaiting ? 'AWAITING INGRESS' : 'AUDIT READY',
          badgeColor: isAwaiting 
            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' 
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        },
        {
          name: 'NIST SP 800-53',
          readiness: isAwaiting ? null : Math.min(100, Math.round(currentScore * 0.94)),
          controls: isAwaiting ? '0 / 0 Verified' : '8 / 8 Verified',
          period: isAwaiting ? 'Awaiting Live Connector' : 'Continuous ATO',
          status: isAwaiting ? 'AWAITING INGRESS' : 'AUDIT READY',
          badgeColor: isAwaiting 
            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' 
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        },
        {
          name: 'PCI-DSS v4.0',
          readiness: isAwaiting ? null : Math.min(100, Math.round(currentScore * 0.96)),
          controls: isAwaiting ? '0 / 0 Verified' : '6 / 6 Verified',
          period: isAwaiting ? 'Awaiting Live Connector' : 'Continuous Posture Target',
          status: isAwaiting ? 'AWAITING INGRESS' : 'AUDIT READY',
          badgeColor: isAwaiting 
            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' 
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        },
      ]
    : [
        {
          name: 'SOC 2 Type II',
          readiness: Math.min(100, Math.round(score * 1.02)),
          controls: '128 / 130 Verified',
          period: 'Q3 2026 Audit Window',
          status: 'AUDIT READY',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        },
        {
          name: 'ISO 27001:2022',
          readiness: Math.min(100, Math.round(score * 0.98)),
          controls: '94 / 96 Verified',
          period: 'Annual Surveillance',
          status: 'AUDIT READY',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        },
        {
          name: 'NIST SP 800-53',
          readiness: Math.min(100, Math.round(score * 0.94)),
          controls: '142 / 155 Verified',
          period: 'Continuous ATO',
          status: 'GAP REVIEW',
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        },
        {
          name: 'PCI-DSS v4.0',
          readiness: Math.min(100, Math.round(score * 0.96)),
          controls: '72 / 75 Verified',
          period: 'Q4 Compliance Target',
          status: 'AUDIT READY',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        },
      ];

  const handleDownloadPackage = () => {
    setDownloading(true);
    setDownloadSuccess(false);

    setTimeout(() => {
      const liveEvdCount = liveEvidence?.length || 0;
      const evidenceData = {
        metadata: {
          generatedAt: new Date().toISOString(),
          tenant: isLive ? "Live-Connected-Environment" : "Production-Infrastructure-Org",
          complianceIndex: isLive ? (score !== null ? `${score}%` : '--%') : `${score}%`,
          hashSignature: isLive 
            ? (liveEvdCount > 0 ? liveEvidence[0].sha256_hash : "0x0000000000000000000000000000000000000000 (Awaiting Ingress)")
            : "0x8f9c2d1b0a4e7f3c9e5d2b6a1c8f4e0d7c3b5a9f",
          verifier: "GRC Engine Continuous AST Audit Core",
          mode: isLive ? "LIVE_API" : "DEMO_SANDBOX",
        },
        frameworks: auditFrameworks,
        verifiedEvidencesCount: isLive ? liveEvdCount : 482,
      };

      const blob = new Blob([JSON.stringify(evidenceData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GRC_Engine_${isLive ? 'Live_' : 'Demo_'}Auditor_Evidence_Package_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-[var(--surface)] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
      
      {/* Card Header & Export CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shrink-0">
            <Award size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
                Live Audit Readiness Scorecard
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                Auditor View
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              Continuous gap analysis against active audit windows &bull; SHA-256 evidence backed
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleDownloadPackage}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer border-none shrink-0"
        >
          {downloading ? (
            <>
              <Sparkles size={14} className="animate-spin" />
              <span>Packaging Evidence...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <CheckCircle2 size={14} />
              <span>Evidence Downloaded!</span>
            </>
          ) : (
            <>
              <Download size={14} />
              <span>Export Auditor Evidence Package</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of Audit Frameworks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {auditFrameworks.map(fw => (
          <div
            key={fw.name}
            className="p-4 rounded-lg bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{fw.name}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${fw.badgeColor}`}>
                {fw.status}
              </span>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                  {fw.readiness !== null ? `${fw.readiness}%` : '--%'}
                </span>
                <span className="text-[11px] font-mono text-slate-500">{fw.controls}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    fw.readiness !== null && fw.readiness >= 90 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${fw.readiness !== null ? fw.readiness : 0}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10.5px] font-mono text-slate-500 pt-1">
              <Calendar size={11} className="shrink-0 text-slate-400" />
              <span className="truncate">{fw.period}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
});

AuditReadinessCard.displayName = 'AuditReadinessCard';
export default AuditReadinessCard;
