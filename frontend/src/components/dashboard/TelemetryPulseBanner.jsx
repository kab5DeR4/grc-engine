import { memo } from 'react';
import { RefreshCw } from 'lucide-react';

export const TelemetryPulseBanner = memo(function TelemetryPulseBanner({
  isLive = false,
  backendStatusMessage = '',
  liveAssetsCount = 0,
  liveFindingsCount = 0,
  onToggleMode,
  onTriggerScan,
  scanRunning = false,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700/80 p-4 sm:p-5 font-mono text-slate-900 dark:text-slate-100 shadow-sm transition-colors">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left Telemetry Eyebrow & Status */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {isLive ? 'RUNTIME: FASTAPI STREAM' : 'RUNTIME: TELEMETRY ENGINE'}
            </span>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400">
            {isLive ? (
              <span>
                Continuous telemetry from endpoint <code className="text-slate-900 dark:text-white font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">127.0.0.1:8000/api/v1</code> • Discovered: <strong className="text-slate-900 dark:text-white">{liveAssetsCount} assets</strong> • Active gaps: <strong className="text-rose-600 dark:text-rose-400">{liveFindingsCount} findings</strong>.
              </span>
            ) : (
              <span>
                Deterministic multi-cloud verification environment • 172 monitored assets • 482 canonical controls • 19 open SLA items.
              </span>
            )}
          </div>
        </div>

        {/* Action Controls & Mode Switch */}
        <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0">
          <button
            type="button"
            onClick={onTriggerScan}
            disabled={scanRunning}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Execute on-demand deterministic compliance scan"
          >
            <RefreshCw size={12} className={scanRunning ? 'animate-spin text-sky-600' : ''} />
            <span>{scanRunning ? 'Evaluating...' : 'Audit Run'}</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => onToggleMode(false)}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                !isLive
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sandbox
            </button>

            <button
              type="button"
              onClick={() => onToggleMode(true)}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                isLive
                  ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={backendStatusMessage || 'Connect to FastAPI live backend'}
            >
              Live API
            </button>
          </div>
        </div>

      </div>
    </div>
  );
});

export default TelemetryPulseBanner;
