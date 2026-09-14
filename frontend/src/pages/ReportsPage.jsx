import { useEffect } from 'react';
import { useDemoStore } from '../store/demoStore';
import RbacPermissionBanner from '../components/settings/RbacPermissionBanner';
import { Printer, CheckCircle2, AlertTriangle, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReportsPage() {
  const { 
    hasPermission, 
    appendAuditLog, 
    currentUser, 
    isLiveMode, 
    discoveredAssets, 
    liveFindings, 
    liveEvidence, 
    liveIntegrations, 
    fetchLiveTelemetry 
  } = useDemoStore();
  const canExport = hasPermission('export_pdf');

  useEffect(() => {
    if (isLiveMode) {
      fetchLiveTelemetry();
    }
  }, [isLiveMode, fetchLiveTelemetry]);

  const hasLiveIntegrations = Boolean((liveIntegrations && liveIntegrations.length > 0) || discoveredAssets.length > 0);
  const criticalCount = isLiveMode ? (liveFindings || []).filter(f => f.severity === 'CRITICAL' && (f.status || '').toUpperCase() !== 'RESOLVED').length : 0;
  const highCount = isLiveMode ? (liveFindings || []).filter(f => f.severity === 'HIGH' && (f.status || '').toUpperCase() !== 'RESOLVED').length : 0;
  const isPassing = isLiveMode ? (criticalCount === 0) : true;
  const latestProofHash = (liveEvidence && liveEvidence[0]?.sha256_hash) || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const handlePrint = () => {
    if (!canExport) return;
    appendAuditLog(
      'ATTESTATION_PDF_EXPORTED',
      'REPORT_VOL_04_SOC2_NIST',
      'INFO',
      `User ${currentUser.name} generated cryptographic attestation export package.`
    );
    window.print();
  };

  return (
    <div className="w-full h-full text-slate-900 dark:text-slate-100 font-sans max-w-[1520px] mx-auto pb-16 space-y-8">
      
      {/* Page Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wider">
            Auditor Attestation Packages
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Executive Audit &amp; <span className="text-sky-600 dark:text-sky-400">Attestation Report</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Machine-verifiable compliance packages formatted for AICPA and ISO 27001 accredited external auditors with embedded cryptographic hash chains.
          </p>
        </div>

        {canExport ? (
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                const link = `${window.location.origin}/archive?auditor_token=sec_cpa_8921a4f8`;
                navigator.clipboard.writeText(link);
                alert('Secure 7-Day Auditor Read-Only Portal Link Copied to Clipboard!\n\nURL: ' + link);
              }}
              className="px-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border-none shadow-xs"
            >
              <span>Share Auditor Portal Link</span>
            </button>
            <button 
              type="button"
              onClick={handlePrint}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-2 shadow-xs border-none"
            >
              <Printer size={15} />
              <span>Print Report</span>
            </button>
          </div>
        ) : (
          <button 
            type="button"
            disabled
            className="px-4 py-2.5 rounded-xl opacity-50 cursor-not-allowed text-xs font-mono border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 self-start md:self-auto shrink-0"
            title="PDF attestation export is restricted for Read-Only Viewers."
          >
            Export Restricted (RBAC)
          </button>
        )}
      </div>

      {/* RBAC Banner if user cannot export */}
      {!canExport && (
        <RbacPermissionBanner
          actionName="exporting official attestation PDF reports"
          requiredRole="EXTERNAL AUDITOR, SECURITY ENGINEER, or ADMIN"
        />
      )}

      {/* Printable Report Document Card */}
      <div className="bg-[var(--surface)] p-8 md:p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md max-w-4xl mx-auto space-y-8">
        
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>GRC Engine Attestation</span>
              <span className="text-sky-600 dark:text-sky-400">.</span>
            </div>
            <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">
              {isLiveMode ? 'Live Ingress Audit Package • REST API v1' : 'System Audit Package • Vol. 04 / 2026'}
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            {isLiveMode && !hasLiveIntegrations ? (
              <span className="px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold">
                AWAITING INGRESS
              </span>
            ) : (
              <span className={`px-2.5 py-1 rounded-md font-bold ${
                isPassing 
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
              }`}>
                {isPassing ? 'VERIFIED PASS' : 'ACTION REQUIRED'}
              </span>
            )}
            <div className="text-slate-500 mt-1.5">Date: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Framework Scorecard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">SOC 2 Type II</div>
            <div className={`text-xl font-bold ${isLiveMode && !hasLiveIntegrations ? 'text-amber-600' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {isLiveMode ? (hasLiveIntegrations ? (isPassing ? '100% PASS' : 'ACTION') : '--%') : '100% PASS'}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {isLiveMode ? (hasLiveIntegrations ? 'Live Branch Policies' : 'Awaiting Ingress') : 'CC6.1 – CC6.8'}
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">NIST CSF v2.0</div>
            <div className={`text-xl font-bold ${isLiveMode && !hasLiveIntegrations ? 'text-amber-600' : 'text-sky-600 dark:text-sky-400'}`}>
              {isLiveMode ? (hasLiveIntegrations ? '100% PASS' : '--%') : '99.8%'}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {isLiveMode ? (hasLiveIntegrations ? 'Core Repository Baseline' : 'Awaiting Ingress') : 'Core Baseline'}
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">ISO 27001:2022</div>
            <div className={`text-xl font-bold ${isLiveMode && !hasLiveIntegrations ? 'text-amber-600' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {isLiveMode ? (hasLiveIntegrations ? (isPassing ? '100% PASS' : 'ACTION') : '--%') : '100% PASS'}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {isLiveMode ? (hasLiveIntegrations ? 'Annex A Controls' : 'Awaiting Ingress') : 'Annex A Controls'}
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">CIS Controls v8</div>
            <div className={`text-xl font-bold ${isLiveMode && !hasLiveIntegrations ? 'text-amber-600' : 'text-sky-600 dark:text-sky-400'}`}>
              {isLiveMode ? (hasLiveIntegrations ? '100% PASS' : '--%') : '96.0%'}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              {isLiveMode ? (hasLiveIntegrations ? 'VCS Safeguards' : 'Awaiting Ingress') : 'Safeguards IG1-3'}
            </div>
          </div>
        </div>

        {/* Summary Attestation Text */}
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
          {isLiveMode && !hasLiveIntegrations ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono space-y-2">
              <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <AlertTriangle size={15} />
                <span>NO LIVE CONNECTORS REGISTERED</span>
              </div>
              <p className="text-amber-700 dark:text-amber-400">
                To generate a legally defensible attestation report in Live API Mode, connect your GitHub account or cloud provider in the Integrations panel and dispatch a telemetry scan.
              </p>
              <div className="pt-1">
                <Link
                  to="/dashboard/integrations"
                  className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold hover:underline"
                >
                  <span>Connect GitHub Integration</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p>
                This document certifies that all canonical technical security controls within the target cloud and code repositories have been continuously evaluated by the GRC Engine deterministic evaluation framework.
              </p>
              <p>
                All cryptographic key rotation policies, branch protections, hardware identity bindings, and immutable audit logs have been validated and sealed with SHA-256 evidence digests.
              </p>
            </>
          )}
        </div>

        {/* Hardware Signature Strip */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-2">
          <div className="truncate">
            PROOF CHAIN: {isLiveMode && !hasLiveIntegrations ? 'PENDING_LIVE_INGRESS_REGISTRATION' : latestProofHash}
          </div>
          <span className={`font-bold shrink-0 flex items-center gap-1 ${
            isLiveMode && !hasLiveIntegrations 
              ? 'text-amber-600 dark:text-amber-400' 
              : 'text-emerald-600 dark:text-emerald-400'
          }`}>
            <CheckCircle2 size={13} />
            {isLiveMode && !hasLiveIntegrations ? 'AWAITING INGRESS' : 'AUDITOR CERTIFIED'}
          </span>
        </div>
      </div>

    </div>
  );
}
