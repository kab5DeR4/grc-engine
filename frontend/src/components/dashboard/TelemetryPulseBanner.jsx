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
    // telemetry banner looking clean fr fr
    <div className="bg-[var(--surface)] rounded-xl border border-[var(--hairline)] p-4 sm:p-5 font-mono text-[var(--ink)] shadow-sm transition-colors">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left Telemetry Eyebrow & Status */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 border border-[var(--hairline)] bg-[var(--surface-raised)] px-3 py-1 rounded-lg">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-[var(--pass)] animate-pulse' : 'bg-[var(--ink-muted)]'}`}></span>
            <span className="text-[11px] font-bold text-[var(--ink)] uppercase tracking-wider">
              {isLive ? 'RUNTIME: FASTAPI STREAM' : 'RUNTIME: TELEMETRY ENGINE'}
            </span>
          </div>

          <div className="text-xs text-[var(--ink-muted)]">
            {isLive ? (
              <span>
                Continuous telemetry from endpoint <code className="text-[var(--code-ink)] font-bold bg-[var(--code-surface)] px-1.5 py-0.5 rounded border border-[var(--hairline)]">127.0.0.1:8000/api/v1</code> • Discovered: <strong className="text-[var(--ink)]"><span className="tabular-nums">{liveAssetsCount}</span> assets</strong> • Active gaps: <strong className="text-[var(--fail)]"><span className="tabular-nums">{liveFindingsCount}</span> findings</strong>.
              </span>
            ) : (
              <span>
                Deterministic multi-cloud verification environment • <span className="tabular-nums">172</span> monitored assets • <span className="tabular-nums">482</span> canonical controls • <span className="tabular-nums">19</span> open SLA items.
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
            className="px-3.5 py-1.5 bg-[var(--surface-raised)] hover:opacity-90 border border-[var(--hairline)] rounded-xl text-xs font-bold text-[var(--ink)] transition-colors flex items-center gap-1.5 active:scale-[0.97] cursor-pointer"
            title="Execute on-demand deterministic compliance scan"
          >
            <RefreshCw size={12} className={scanRunning ? 'animate-spin text-[var(--accent)]' : ''} />
            <span>{scanRunning ? 'Evaluating...' : 'Audit Run'}</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center border border-[var(--hairline)] bg-[var(--surface-raised)] p-1 rounded-xl">
            <button
              type="button"
              onClick={() => onToggleMode(false)}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                !isLive
                  ? 'bg-[var(--surface)] text-[var(--ink)] shadow-sm font-bold'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Sandbox
            </button>

            <button
              type="button"
              onClick={() => onToggleMode(true)}
              className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                isLive
                  ? 'bg-[var(--surface)] text-[var(--ink)] shadow-sm font-bold'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
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
