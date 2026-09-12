import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const MetricGaugeCard = memo(function MetricGaugeCard({
  score = 84,
  passing = 128,
  failing = 21,
  skipped = 7,
  trend = '+4.2%',
  isLive = false,
  lastScan = 'Just now',
}) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const totalControls = passing + failing + skipped;
  const passPercent = totalControls ? Math.round((passing / totalControls) * 100) : 0;
  const failPercent = totalControls ? Math.round((failing / totalControls) * 100) : 0;
  const skipPercent = totalControls ? Math.max(0, 100 - passPercent - failPercent) : 0;

  // Compute indicator needle angle
  const angle = (score / 100) * 360;
  const angleRad = ((angle - 90) * Math.PI) / 180;
  const markerX = 60 + radius * Math.cos(angleRad);
  const markerY = 60 + radius * Math.sin(angleRad);

  return (
    // gauge card locked and loaded
    <div className="bg-[var(--surface)] rounded-xl border border-[var(--hairline)] p-5 sm:p-6 flex flex-col justify-between h-full font-sans text-[var(--ink)] shadow-sm">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-mono font-bold text-[var(--accent)] flex items-center gap-1.5 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse"></span>
            POSTURE ANALYSIS & DRIFT
          </span>
          <span className="text-[11px] font-mono text-[var(--ink-secondary)] flex items-center gap-1 border border-[var(--hairline)] px-2 py-0.5 rounded-md bg-[var(--surface-raised)]">
            <ArrowUpRight size={12} className="text-[var(--pass)]" />
            <span>{isLive ? 'FASTAPI REAL' : <><span className="tabular-nums">{trend}</span> 7D DRIFT</>}</span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
          Deterministic System Posture
        </h3>
        <p className="text-xs text-[var(--ink-muted)] mt-1 leading-relaxed">
          Real-time mathematical evaluation across all canonical security controls and active infrastructure nodes.
        </p>
      </div>

      {/* SVG Architectural Line Drawing */}
      <div className="my-6 flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {/* Construction Geometry Rings */}
            <circle
              cx="60"
              cy="60"
              r={radius + 6}
              className="stroke-[var(--hairline)]"
              strokeWidth="1"
              strokeDasharray="2 3"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-[var(--hairline)]"
              strokeWidth="2"
              fill="transparent"
            />
            {/* Quadrant Ticks */}
            <line x1="60" y1="6" x2="60" y2="12" className="stroke-[var(--hairline)]" strokeWidth="1" />
            <line x1="60" y1="108" x2="60" y2="114" className="stroke-[var(--hairline)]" strokeWidth="1" />
            <line x1="6" y1="60" x2="12" y2="60" className="stroke-[var(--hairline)]" strokeWidth="1" />
            <line x1="108" y1="60" x2="114" y2="60" className="stroke-[var(--hairline)]" strokeWidth="1" />

            {/* Main Score Line */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-[var(--accent)]"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              transform="rotate(-90 60 60)"
            />

            {/* Indicator Marker */}
            <circle
              cx={markerX}
              cy={markerY}
              r={3}
              className="fill-[var(--accent)]"
            />
          </svg>

          {/* Center Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-[var(--ink)] leading-none tabular-nums">
              {score}%
            </span>
            <span className="text-[9px] font-mono text-[var(--accent)] mt-1 font-bold">
              {score >= 85 ? 'AUDIT READY' : 'DRIFT ACTION'}
            </span>
          </div>
        </div>

        {/* Scaled Construction Summary */}
        <div className="flex-1 w-full space-y-1.5 text-xs font-mono">
          <div className="flex justify-between items-center text-[10.5px] text-[var(--ink-muted)] pb-1 border-b border-[var(--hairline)]">
            <span>VERIFICATION MODEL</span>
            <span className="text-[var(--ink)] font-bold"><span className="tabular-nums">{totalControls}</span> CONTROLS</span>
          </div>

          <div className="flex justify-between items-center text-[11px] py-0.5">
            <span className="text-[var(--ink-muted)]">EVALUATION METHOD:</span>
            <span className="font-bold text-[var(--ink)]">DETERMINISTIC AST</span>
          </div>
          <div className="flex justify-between items-center text-[11px] py-0.5">
            <span className="text-[var(--ink-muted)]">ATTRIBUTES SCANNED:</span>
            <span className="text-[var(--ink)]">IAM / S3 / KMS / REPOS</span>
          </div>
          <div className="flex justify-between items-center text-[11px] py-0.5">
            <span className="text-[var(--ink-muted)]">AUDIT REPETITION:</span>
            <span className="text-[var(--ink)]">CONTINUOUS (24/7)</span>
          </div>
        </div>
      </div>

      {/* Hairline-Ruled Definition List */}
      <div className="border-t border-b border-[var(--hairline)] divide-y divide-[var(--hairline)] text-xs font-mono">
        <div className="py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--pass-surface)] text-[var(--pass)]">PASS</span>
            <span className="text-[var(--ink-secondary)] font-sans">Verified Canonical Controls</span>
          </div>
          <div className="font-bold text-[var(--ink)] tabular-nums">
            {passing} <span className="text-[var(--ink-muted)] font-normal">({passPercent}%)</span>
          </div>
        </div>

        <div className="py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--fail-surface)] text-[var(--fail)]">FAIL</span>
            <span className="text-[var(--ink-secondary)] font-sans">Non-Compliant Policy Drift</span>
          </div>
          <div className="font-bold text-[var(--fail)] tabular-nums">
            {failing} <span className="text-[var(--ink-muted)] font-normal">({failPercent}%)</span>
          </div>
        </div>

        <div className="py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--surface-raised)] text-[var(--ink-secondary)]">SKIP</span>
            <span className="text-[var(--ink-secondary)] font-sans">Compensating Controls & Exceptions</span>
          </div>
          <div className="text-[var(--ink-secondary)] tabular-nums">
            {skipped} <span className="text-[var(--ink-muted)]">({skipPercent}%)</span>
          </div>
        </div>
      </div>

      {/* Footer Readout */}
      <div className="pt-3 flex items-center justify-between text-[10.5px] font-mono text-[var(--ink-muted)]">
        <span>LEDGER: SHA-256 DIGEST VERIFIED</span>
        <span>LAST DRIFT EVAL: {lastScan}</span>
      </div>

    </div>
  );
});

export default MetricGaugeCard;
