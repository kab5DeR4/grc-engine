import { memo } from 'react';
import { ArrowRight, ShieldCheck, RefreshCw, FileText, CheckCircle2, AlertTriangle, Layers, Server } from 'lucide-react';
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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
      
      {/* KPI 1: Overall Posture */}
      <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Compliance Index</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-medium">
            Audit Ready
          </span>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {score}%
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center justify-between font-mono">
            <span className="text-emerald-600 dark:text-emerald-400">{passingControls} Passing</span>
            <span className="text-rose-600 dark:text-rose-400">{failingControls} Action</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${score}%` }} />
        </div>
      </div>

      {/* KPI 2: Monitored Nodes */}
      <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Monitored Assets</span>
          <Link to="/assets" className="text-xs font-mono text-orange-600 dark:text-orange-400 hover:underline no-underline">
            Inspect &rarr;
          </Link>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {totalAssets} <span className="text-xs font-normal text-slate-500 font-mono">Nodes</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            {isLive ? 'Live GitHub & AWS API' : 'Continuous Telemetry Evaluator'}
          </div>
        </div>
        <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={12} />
          <span>Zero Unmonitored Drift</span>
        </div>
      </div>

      {/* KPI 3: Frameworks & Canonical Controls */}
      <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Active Frameworks</span>
          <Link to="/controls" className="text-xs font-mono text-orange-600 dark:text-orange-400 hover:underline no-underline">
            Catalog &rarr;
          </Link>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {activeFrameworks} <span className="text-xs font-normal text-slate-500 font-mono">Standards</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-mono">
            482 Canonical Technical Controls
          </div>
        </div>
        <div className="pt-1 text-[11px] font-mono text-slate-500">
          SOC 2 &bull; ISO 27001 &bull; NIST &bull; CIS
        </div>
      </div>

      {/* KPI 4: Audit Scan Action & Export */}
      <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Audit Actions</span>
          <Link to="/reports" className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 no-underline">
            Reports
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onScan}
            disabled={scanRunning}
            className="w-full py-2 px-3 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none"
          >
            <RefreshCw size={12} className={scanRunning ? 'animate-spin' : ''} />
            <span>{scanRunning ? 'Evaluating Telemetry...' : 'Trigger Audit Scan'}</span>
          </button>
          <Link
            to="/reports"
            className="w-full py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-all text-center no-underline flex items-center justify-center gap-1"
          >
            <FileText size={12} />
            <span>Export Attestation</span>
          </Link>
        </div>
        <div className="text-[10.5px] font-mono text-slate-400 text-center">
          SHA-256 Ledger Verified
        </div>
      </div>

    </div>
  );
});

FeaturedHeroCard.displayName = 'FeaturedHeroCard';
export default FeaturedHeroCard;
