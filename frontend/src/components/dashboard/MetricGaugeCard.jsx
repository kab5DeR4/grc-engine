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
    <div className="bg-[#E7E3DA] dark:bg-[#1E1D1A] hairline-all p-5 sm:p-6 flex flex-col justify-between h-full font-mono text-[#1A1917] dark:text-[#F5F3EF]">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="mono-label text-[10px] text-[#9B3418] dark:text-[#FF6B4A] flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 bg-[#9B3418] dark:bg-[#FF6B4A] inline-block"></span>
            SECTION 01 — POSTURE ANALYSIS
          </span>
          <span className="text-[10.5px] font-mono text-[#1A1917] dark:text-[#F5F3EF] flex items-center gap-1 border border-[#1A1917]/20 dark:border-[#F5F3EF]/20 px-2 py-0.5">
            <ArrowUpRight size={12} className="text-[#9B3418] dark:text-[#FF6B4A]" />
            <span>{isLive ? 'FASTAPI REAL' : `${trend} 7D DRIFT`}</span>
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917] dark:text-[#F5F3EF] tracking-tight leading-tight">
          Deterministic <span className="serif-italic-pigment">System Posture</span>
        </h3>
        <p className="mono-body text-[12.5px] text-[#4A4741] dark:text-[#D1CCC0] mt-1">
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
              className="stroke-[#1A1917]/10 dark:stroke-[#F5F3EF]/10"
              strokeWidth="1"
              strokeDasharray="2 3"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-[#1A1917]/15 dark:stroke-[#F5F3EF]/15"
              strokeWidth="2"
              fill="transparent"
            />
            {/* Quadrant Ticks */}
            <line x1="60" y1="6" x2="60" y2="12" className="stroke-[#1A1917]/40 dark:stroke-[#F5F3EF]/40" strokeWidth="1" />
            <line x1="60" y1="108" x2="60" y2="114" className="stroke-[#1A1917]/40 dark:stroke-[#F5F3EF]/40" strokeWidth="1" />
            <line x1="6" y1="60" x2="12" y2="60" className="stroke-[#1A1917]/40 dark:stroke-[#F5F3EF]/40" strokeWidth="1" />
            <line x1="108" y1="60" x2="114" y2="60" className="stroke-[#1A1917]/40 dark:stroke-[#F5F3EF]/40" strokeWidth="1" />

            {/* Main Score Line (Heavier stroke for distinction) */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-[#1A1917] dark:stroke-[#F5F3EF]"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="square"
              fill="transparent"
              transform="rotate(-90 60 60)"
            />

            {/* Pigment Marker at Current Angle */}
            <rect
              x={markerX - 2.5}
              y={markerY - 2.5}
              width="5"
              height="5"
              className="fill-[#9B3418] dark:fill-[#FF6B4A]"
            />
          </svg>

          {/* Center Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
            <span className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1917] dark:text-[#F5F3EF] leading-none">
              {score}%
            </span>
            <span className="mono-label text-[8px] text-[#9B3418] dark:text-[#FF6B4A] mt-1 font-bold">
              {score >= 85 ? 'AUDIT READY' : 'DRIFT ACTION'}
            </span>
          </div>
        </div>

        {/* Scaled Construction Summary */}
        <div className="flex-1 w-full space-y-1.5 text-xs">
          <div className="flex justify-between items-center text-[10.5px] mono-label text-[#5E5A52] dark:text-[#9E988B] pb-1 hairline-b">
            <span>VERIFICATION MODEL</span>
            <span className="text-[#1A1917] dark:text-[#F5F3EF]">{totalControls} CONTROLS</span>
          </div>

          <div className="flex justify-between items-center text-[11px] py-0.5">
            <span className="text-[#4A4741] dark:text-[#D1CCC0]">EVALUATION METHOD:</span>
            <span className="font-bold text-[#1A1917] dark:text-[#F5F3EF]">DETERMINISTIC AST</span>
          </div>
          <div className="flex justify-between items-center text-[11px] py-0.5">
            <span className="text-[#4A4741] dark:text-[#D1CCC0]">ATTRIBUTES SCANNED:</span>
            <span className="text-[#1A1917] dark:text-[#F5F3EF]">IAM / S3 / KMS / REPOS</span>
          </div>
          <div className="flex justify-between items-center text-[11px] py-0.5">
            <span className="text-[#4A4741] dark:text-[#D1CCC0]">AUDIT REPETITION:</span>
            <span className="text-[#1A1917] dark:text-[#F5F3EF]">CONTINUOUS (24/7)</span>
          </div>
        </div>
      </div>

      {/* Hairline-Ruled Definition List */}
      <div className="hairline-t hairline-b divide-y divide-[#1A1917]/15 dark:divide-[#F5F3EF]/15 text-xs font-mono">
        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="mono-label text-[10px] text-[#9B3418] dark:text-[#FF6B4A]">PASS</span>
            <span className="text-[#4A4741] dark:text-[#D1CCC0]">Verified Canonical Controls</span>
          </div>
          <div className="font-bold text-[#1A1917] dark:text-[#F5F3EF]">
            {passing} <span className="text-[#6E6A61] font-normal">({passPercent}%)</span>
          </div>
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="mono-label text-[10px] text-[#9B3418] dark:text-[#FF6B4A]">FAIL</span>
            <span className="text-[#4A4741] dark:text-[#D1CCC0]">Non-Compliant Policy Drift</span>
          </div>
          <div className="font-bold text-[#9B3418] dark:text-[#FF6B4A]">
            {failing} <span className="text-[#6E6A61] font-normal">({failPercent}%)</span>
          </div>
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="mono-label text-[10px] text-[#6E6A61]">SKIP</span>
            <span className="text-[#4A4741] dark:text-[#D1CCC0]">Compensating Controls & Exceptions</span>
          </div>
          <div className="text-[#1A1917] dark:text-[#F5F3EF]">
            {skipped} <span className="text-[#6E6A61]">({skipPercent}%)</span>
          </div>
        </div>
      </div>

      {/* Footer Readout */}
      <div className="pt-3 flex items-center justify-between text-[10px] font-mono text-[#5E5A52] dark:text-[#9E988B]">
        <span>LEDGER: SHA-256 DIGEST VERIFIED</span>
        <span>LAST DRIFT EVALUATION: {lastScan}</span>
      </div>

    </div>
  );
});

export default MetricGaugeCard;
