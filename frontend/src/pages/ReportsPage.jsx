import { useDemoStore } from '../store/demoStore';
import RbacPermissionBanner from '../components/settings/RbacPermissionBanner';
import { Printer, CheckCircle2 } from 'lucide-react';

export default function ReportsPage() {
  const { hasPermission, appendAuditLog, currentUser } = useDemoStore();
  const canExport = hasPermission('export_pdf');

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
          <button 
            type="button"
            onClick={handlePrint}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 text-xs font-bold uppercase transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center gap-2 shadow-md border-none self-start md:self-auto shrink-0"
          >
            <Printer size={15} />
            <span>Print / Export Package</span>
          </button>
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
              System Audit Package &bull; Vol. 04 / 2026
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
              VERIFIED PASS
            </span>
            <div className="text-slate-500 mt-1.5">Date: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Framework Scorecard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">SOC 2 Type II</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">100% PASS</div>
            <div className="text-[10px] text-slate-500 font-mono">CC6.1 &ndash; CC6.8</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">NIST CSF v2.0</div>
            <div className="text-xl font-bold text-sky-600 dark:text-sky-400">99.8%</div>
            <div className="text-[10px] text-slate-500 font-mono">Core Baseline</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">ISO 27001:2022</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">100% PASS</div>
            <div className="text-[10px] text-slate-500 font-mono">Annex A Controls</div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">CIS Controls v8</div>
            <div className="text-xl font-bold text-sky-600 dark:text-sky-400">96.0%</div>
            <div className="text-[10px] text-slate-500 font-mono">Safeguards IG1-3</div>
          </div>
        </div>

        {/* Summary Attestation Text */}
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
          <p>
            This document certifies that all canonical technical security controls within the target cloud and code repositories have been continuously evaluated by the GRC Engine deterministic evaluation framework.
          </p>
          <p>
            All cryptographic key rotation policies, branch protections, hardware identity bindings, and immutable audit logs have been validated and sealed with SHA-256 evidence digests.
          </p>
        </div>

        {/* Hardware Signature Strip */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-2">
          <div className="truncate">PROOF CHAIN: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 flex items-center gap-1">
            <CheckCircle2 size={13} />
            AUDITOR CERTIFIED
          </span>
        </div>
      </div>

    </div>
  );
}
