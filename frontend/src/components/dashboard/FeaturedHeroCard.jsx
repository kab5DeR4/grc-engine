import { memo } from 'react';
import { ArrowRight, ShieldCheck, RefreshCw, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturedHeroCard = memo(function FeaturedHeroCard({
  score = 84,
  totalAssets = 172,
  activeFrameworks = 4,
  onScan,
  scanRunning = false,
  isLive = false,
}) {
  const passingControls = Math.round(482 * (score / 100));
  const failingControls = 482 - passingControls;

  return (
    // hero card looking fresh no cap
    <div className="w-full bg-[var(--surface)] rounded-xl border border-[var(--hairline)] p-6 md:p-8 shadow-sm flex flex-col lg:flex-row items-stretch justify-between gap-8 transition-all font-mono">
      
      {/* Left Column: Enterprise Security Context & Primary Operations */}
      <div className="flex-1 flex flex-col justify-between max-w-xl">
        <div>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)] text-[11px] font-bold tracking-wider uppercase mb-4 border border-[var(--accent)]/30">
            <ShieldCheck size={13} className="text-[var(--accent)]" />
            <span>CONTINUOUS POLICY ENFORCEMENT</span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight leading-tight">
            Enterprise Security Posture & Compliance Engine
          </h2>

          {/* Purposeful Enterprise Description */}
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-3 leading-relaxed">
            Real-time deterministic evaluation across AWS infrastructure, GitHub VCS pipelines, and Kubernetes workloads. Evaluated automatically against SOC 2 Type II, ISO 27001, NIST SP 800-53, and CIS benchmarks.
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/controls"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--ink)] hover:opacity-90 text-[var(--surface)] rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.97] group"
            >
              <span>Inspect Controls Matrix</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={onScan}
              disabled={scanRunning}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--surface-raised)] hover:opacity-90 text-[var(--ink)] rounded-xl text-xs font-bold border border-[var(--hairline)] transition-all active:scale-[0.97] cursor-pointer"
            >
              <RefreshCw size={13} className={scanRunning ? 'animate-spin text-[var(--accent)]' : ''} />
              <span>{scanRunning ? 'Evaluating Telemetry...' : 'Trigger Audit Scan'}</span>
            </button>

            <Link
              to="/reports"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--ink-secondary)] rounded-xl text-xs font-semibold border border-[var(--hairline)] transition-all active:scale-[0.97]"
            >
              <FileText size={13} />
              <span>Export Attestation</span>
            </Link>
          </div>

          {/* Telemetry Status Strip */}
          <div className="flex items-center gap-4 text-[11px] text-[var(--ink-muted)] pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--pass)] inline-block"></span>
              {isLive ? 'Live REST API Stream' : 'Continuous Telemetry Evaluator'}
            </span>
            <span>•</span>
            <span><span className="tabular-nums">{totalAssets}</span> Monitored Nodes</span>
            <span>•</span>
            <span><span className="tabular-nums">{activeFrameworks}</span> Frameworks Active</span>
          </div>
        </div>
      </div>

      {/* Right Column: Functional Posture Health Score Gauge & Control Distribution */}
      <div className="w-full lg:w-[380px] xl:w-[410px] shrink-0 bg-[var(--surface-raised)] rounded-xl border border-[var(--hairline)] p-6 flex flex-col justify-between">
        
        {/* Metric Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
          <span className="text-[10.5px] font-bold text-[var(--ink-muted)] uppercase tracking-wider">
            GLOBAL COMPLIANCE POSTURE
          </span>
          <span className="text-[10.5px] font-bold text-[var(--pass)] bg-[var(--pass-surface)] px-2 py-0.5 rounded border border-[var(--pass)]/30">
            AUDIT READY
          </span>
        </div>

        {/* Circular Progress Gauge & Score Readout */}
        <div className="py-5 flex items-center justify-around gap-4">
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Gauge Background Track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-[var(--hairline)]"
                strokeWidth="10"
                fill="none"
              />
              {/* Gauge Progress Track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-[var(--accent)] stroke-current transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {/* tabular score readout */}
              <span className="text-2xl font-bold text-[var(--ink)] leading-none tabular-nums">
                {score}%
              </span>
              <span className="text-[9px] font-semibold text-[var(--ink-muted)] uppercase mt-0.5">
                INDEX
              </span>
            </div>
          </div>

          <div className="space-y-2.5 flex-1">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[var(--ink-secondary)] mb-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[var(--pass)]" /> Passing Controls
                </span>
                <span className="tabular-nums">{passingControls}</span>
              </div>
              <div className="w-full bg-[var(--hairline)] h-2 rounded-full overflow-hidden">
                <div className="bg-[var(--pass)] h-full rounded-full" style={{ width: `${score}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[var(--ink-secondary)] mb-1">
                <span className="flex items-center gap-1">
                  <AlertCircle size={12} className="text-[var(--warn)]" /> Action Required
                </span>
                <span className="tabular-nums">{failingControls}</span>
              </div>
              <div className="w-full bg-[var(--hairline)] h-2 rounded-full overflow-hidden">
                <div className="bg-[var(--warn)] h-full rounded-full" style={{ width: `${100 - score}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Verification Footer */}
        <div className="pt-3 border-t border-[var(--hairline)] flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
          <span>Zero Critical Drift</span>
          <span className="font-semibold text-[var(--ink)]"><span className="tabular-nums">482</span> Total Controls</span>
        </div>

      </div>

    </div>
  );
});

export default FeaturedHeroCard;
