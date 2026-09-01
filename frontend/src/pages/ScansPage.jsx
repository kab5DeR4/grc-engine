import { useState } from 'react';
import { useDemoStore } from '../store/demoStore';
import RbacPermissionBanner from '../components/settings/RbacPermissionBanner';

export default function ScansPage() {
  const { hasPermission, appendAuditLog, currentUser } = useDemoStore();
  const canRunScans = hasPermission('run_scans');

  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(100);
  const [logs, setLogs] = useState([
    '[18:50:01] INITIALIZING TELEMETRY ENGINE SCAN...',
    '[18:50:02] CHECKING KMS KEY ROTATION POLICY... [PASS]',
    '[18:50:03] CHECKING IAM RBAC ROLES... [PASS]',
    '[18:50:04] CHECKING KUBERNETES POD ADMISSION... [PASS]',
    '[18:50:05] CHECKING TLS 1.3 MUTUAL AUTH... [PASS]',
    '[18:50:06] TELEMETRY SCAN COMPLETE — 0 CRITICAL DRIFTS FOUND.',
  ]);

  const runScan = () => {
    if (!canRunScans) return;

    setScanning(true);
    setProgress(0);
    setLogs(['[NOW] INITIATING REAL-TIME GRC TELEMETRY SCAN...']);

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
        setLogs(l => [...l, '[SCANNING] INSPECTING EDGE PERIMETER NETWORK RULES...']);
      } else if (current === 60) {
        setLogs(l => [...l, '[SCANNING] EVALUATING S3 OBJECT WORM LOCK RETENTION...']);
      } else if (current === 100) {
        setLogs(l => [...l, '[COMPLETE] ALL 482 GRC CONTROLS VERIFIED OK. ZERO DRIFT.']);
        setScanning(false);
        clearInterval(interval);
      }
    }, 600);
  };

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12 space-y-8">
        {/* Page Header */}
        <div className="pb-6 hairline-b flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="mono-label text-[#9B3418] mb-2">POLICY & TELEMETRY SCANNER</div>
            <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
              Real-Time Scan Console & <span className="serif-italic-pigment">Drift Probe</span>
            </h1>
          </div>
          {canRunScans ? (
            <button 
              onClick={runScan}
              disabled={scanning}
              className="studio-btn-primary studio-btn text-[11px]"
            >
              {scanning ? '[ SCANNING CLUSTER... ]' : '[ RUN LIVE SCAN NOW ]'}
            </button>
          ) : (
            <button 
              disabled
              className="studio-btn opacity-50 cursor-not-allowed text-[10.5px] border-dashed"
              title="Scan execution is restricted for External Auditors and Read-Only Viewers."
            >
              [ SCAN RESTRICTED: RBAC ]
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

        {/* Scan Progress Bar */}
        <div className="p-6 bg-[#DCD7CB] hairline-all">
          <div className="flex justify-between items-center mb-2 mono-label text-[11px]">
            <span>TELEMETRY SCAN PROGRESS</span>
            <span className="text-[#9B3418] font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-[#E7E3DA] h-4 hairline-all overflow-hidden p-0.5">
            <div 
              className="bg-[#9B3418] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Console Log Terminal */}
        <div className="bg-[#1A1917] text-[#E7E3DA] p-6 hairline-all min-h-[320px] font-mono text-[12px] leading-relaxed">
          <div className="mono-label text-[#9B3418] mb-4 pb-2 border-b border-neutral-700 flex justify-between">
            <span>LIVE CONSOLE STREAM — PORT 8080</span>
            <span>SYSTEM VERIFIED</span>
          </div>

          <div className="space-y-2">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-[#9B3418] font-bold">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
