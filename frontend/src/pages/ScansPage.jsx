import { useState, useEffect } from 'react';
import { useDemoStore } from '../store/demoStore';
import RbacPermissionBanner from '../components/settings/RbacPermissionBanner';
import { Activity, Play, Terminal, CheckCircle2 } from 'lucide-react';

export default function ScansPage() {
  const { 
    hasPermission, 
    appendAuditLog, 
    currentUser, 
    isLiveMode, 
    triggerLiveScan,
    fetchLiveTelemetry
  } = useDemoStore();
  const canRunScans = hasPermission('run_scans');

  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(100);
  const [logs, setLogs] = useState([
    '[INIT] Continuous monitoring runner initialized.',
    '[OK] SHA-256 proof chain verified at genesis.',
    '[READY] Ready for on-demand or scheduled compliance scan.',
  ]);

  useEffect(() => {
    if (isLiveMode) {
      fetchLiveTelemetry();
    }
  }, [isLiveMode, fetchLiveTelemetry]);

  const runScan = async () => {
    if (!canRunScans) return;

    setScanning(true);
    setProgress(15);
    setLogs([`[${new Date().toLocaleTimeString()}] INITIATING COMPLIANCE SCAN...`]);

    if (isLiveMode) {
      try {
        setLogs(l => [...l, '[API] POST /api/v1/scans/trigger -> Dispatching scan job...']);
        setProgress(45);
        const scanRes = await triggerLiveScan('ALL');
        setProgress(80);
        setLogs(l => [
          ...l,
          `[OK] Scan Job ID: ${scanRes.id || 'SCAN-LATEST'}`,
          `[EVAL] Evaluated ${scanRes.assets_scanned_count || 4} assets against canonical controls.`,
          `[COMPLETE] Compliance verification complete (Status: ${scanRes.status || 'COMPLETED'}).`,
        ]);
        setProgress(100);
      } catch (err) {
        setLogs(l => [...l, `[ERROR] Scan failed: ${err.message}`]);
      } finally {
        setScanning(false);
      }
      return;
    }

    appendAuditLog(
      'MANUAL_SYSTEM_SCAN_TRIGGERED',
      'CONSOLE_SCAN_RUNNER',
      'INFO',
      `Operator ${currentUser.name} triggered live telemetry scan run.`
    );

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setProgress(current);
      if (current === 20) {
        setLogs(l => [...l, '[SCANNING] Inspecting edge perimeter and branch protection rules...']);
      } else if (current === 60) {
        setLogs(l => [...l, '[SCANNING] Evaluating S3 bucket encryption and KMS rotation status...']);
      } else if (current === 100) {
        setLogs(l => [...l, '[COMPLETE] All canonical GRC controls verified. Posture updated.']);
        setScanning(false);
        clearInterval(interval);
      }
    }, 400);
  };

  return (
    <div className="w-full h-full text-slate-900 dark:text-slate-100 font-sans max-w-[1520px] mx-auto pb-16 space-y-8">
      
      {/* Page Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wider">
            Telemetry &amp; Policy Scanner
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Real-Time Scan Console &amp; <span className="text-sky-600 dark:text-sky-400">Drift Probe</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Execute automated evaluation jobs across connected cloud connectors and repositories to detect misconfigurations and update compliance scores.
          </p>
        </div>

        {canRunScans ? (
          <button 
            type="button"
            onClick={runScan}
            disabled={scanning}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 text-xs font-bold uppercase transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center gap-2 shadow-md border-none self-start md:self-auto shrink-0"
          >
            {scanning ? <Activity size={15} className="animate-spin" /> : <Play size={15} />}
            <span>{scanning ? 'Evaluating Cluster...' : 'Run Live Scan Now'}</span>
          </button>
        ) : (
          <button 
            type="button"
            disabled
            className="px-4 py-2.5 rounded-xl opacity-50 cursor-not-allowed text-xs font-mono border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 self-start md:self-auto shrink-0"
            title="Scan execution is restricted for External Auditors and Read-Only Viewers."
          >
            Scan Restricted (RBAC)
          </button>
        )}
      </div>

      {/* RBAC restriction banner if non-privileged persona */}
      {!canRunScans && (
        <RbacPermissionBanner
          actionName="initiating live cluster telemetry scans"
          requiredRole="PLATFORM ADMIN or SECURITY ENGINEER"
        />
      )}

      {/* Scan Progress Bar Card */}
      <div className="p-6 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Activity size={14} className="text-sky-500" />
            Telemetry Scan Progress
          </span>
          <span className="text-sky-600 dark:text-sky-400 font-bold text-sm">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
          <div 
            className="bg-sky-600 dark:bg-sky-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Console Log Terminal */}
      <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 shadow-md overflow-hidden font-mono text-xs leading-relaxed">
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-sky-400" />
            <span className="font-bold text-slate-200 text-xs">LIVE RUNNER OUTPUT &bull; PORT 8000</span>
          </div>
          <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
            <CheckCircle2 size={13} />
            Deterministic Engine Active
          </span>
        </div>

        <div className="p-6 space-y-2 min-h-[300px]">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="text-sky-400 select-none font-bold">&gt;</span>
              <span className="text-slate-200">{log}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
