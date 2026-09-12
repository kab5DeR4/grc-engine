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
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700/80 p-6 md:p-8 shadow-sm flex flex-col lg:flex-row items-stretch justify-between gap-8 transition-all font-mono">
      
      {/* Left Column: Enterprise Security Context & Primary Operations */}
      <div className="flex-1 flex flex-col justify-between max-w-xl">
        <div>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 text-[11px] font-bold tracking-wider uppercase mb-4 border border-sky-200 dark:border-sky-800/80">
            <ShieldCheck size={13} className="text-sky-600 dark:text-sky-400" />
            <span>CONTINUOUS POLICY ENFORCEMENT</span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Enterprise Security Posture & Compliance Engine
          </h2>

          {/* Purposeful Enterprise Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Real-time deterministic evaluation across AWS infrastructure, GitHub VCS pipelines, and Kubernetes workloads. Evaluated automatically against SOC 2 Type II, ISO 27001, NIST SP 800-53, and CIS benchmarks.
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/controls"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shadow-xs group"
            >
              <span>Inspect Controls Matrix</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={onScan}
              disabled={scanRunning}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
            >
              <RefreshCw size={13} className={scanRunning ? 'animate-spin text-sky-600' : ''} />
              <span>{scanRunning ? 'Evaluating Telemetry...' : 'Trigger Audit Scan'}</span>
            </button>

            <Link
              to="/reports"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-all"
            >
              <FileText size={13} />
              <span>Export Attestation</span>
            </Link>
          </div>

          {/* Telemetry Status Strip */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              {isLive ? 'Live REST API Stream' : 'Continuous Telemetry Evaluator'}
            </span>
            <span>•</span>
            <span>{totalAssets} Monitored Nodes</span>
            <span>•</span>
            <span>{activeFrameworks} Frameworks Active</span>
          </div>
        </div>
      </div>

      {/* Right Column: Functional Posture Health Score Gauge & Control Distribution */}
      <div className="w-full lg:w-[380px] xl:w-[410px] shrink-0 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-300 dark:border-slate-700 p-6 flex flex-col justify-between">
        
        {/* Metric Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
          <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            GLOBAL COMPLIANCE POSTURE
          </span>
          <span className="text-[10.5px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
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
                className="text-slate-200 dark:text-slate-700 stroke-current"
                strokeWidth="10"
                fill="none"
              />
              {/* Gauge Progress Track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="text-slate-900 dark:text-sky-400 stroke-current transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                {score}%
              </span>
              <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase mt-0.5">
                INDEX
              </span>
            </div>
          </div>

          <div className="space-y-2.5 flex-1">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" /> Passing Controls
                </span>
                <span>{passingControls}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${score}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                <span className="flex items-center gap-1">
                  <AlertCircle size={12} className="text-amber-600 dark:text-amber-400" /> Action Required
                </span>
                <span>{failingControls}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${100 - score}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Verification Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
          <span>Zero Critical Drift</span>
          <span className="font-semibold text-slate-900 dark:text-white">482 Total Controls</span>
        </div>

      </div>

    </div>
  );
});

export default FeaturedHeroCard;
