import { memo } from 'react';
import { ShieldCheck, RefreshCw, FileText, CheckCircle2, TrendingUp, Activity, Server, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

// Simple SVG Micro Sparklines inspired by Landingfolio Data Stats
const MicroSparkline = ({ points, color = 'emerald' }) => {
  const strokeClass = color === 'emerald' 
    ? 'stroke-emerald-500' 
    : color === 'rose' 
    ? 'stroke-rose-500' 
    : 'stroke-amber-500';
  const fillClass = color === 'emerald'
    ? 'fill-emerald-500/10'
    : color === 'rose'
    ? 'fill-rose-500/10'
    : 'fill-amber-500/10';

  return (
    <svg className="w-20 h-7 overflow-visible" viewBox="0 0 100 30">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className={fillClass} stopOpacity="0.4" />
          <stop offset="100%" className={fillClass} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d={`M 0 30 ${points.map((p, i) => `L ${(i / (points.length - 1)) * 100} ${30 - (p / 100) * 26}`).join(' ')} L 100 30 Z`}
        fill={`url(#grad-${color})`}
      />
      <path
        d={`M 0 ${30 - (points[0] / 100) * 26} ${points.slice(1).map((p, i) => `L ${((i + 1) / (points.length - 1)) * 100} ${30 - (p / 100) * 26}`).join(' ')}`}
        fill="none"
        className={`${strokeClass} transition-all duration-300`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

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
      
      {/* KPI 1: Overall Posture (Landingfolio Data Stat + Sparkline) */}
      <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Compliance Index</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-medium flex items-center gap-1">
            <TrendingUp size={11} /> +3.4% this wk
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
              {score}%
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-mono">
              <span className="text-emerald-600 dark:text-emerald-400">{passingControls} Passing</span>
              <span>&bull;</span>
              <span className="text-rose-600 dark:text-rose-400">{failingControls} Action</span>
            </div>
          </div>
          <MicroSparkline points={[65, 70, 68, 74, 80, 78, score]} color="emerald" />
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${score}%` }} />
        </div>
      </div>

      {/* KPI 2: Monitored Nodes */}
      <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Monitored Assets</span>
          <Link to="/assets" className="text-xs font-mono text-orange-600 dark:text-orange-400 hover:underline no-underline">
            Inspect &rarr;
          </Link>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
              {totalAssets} <span className="text-xs font-normal text-slate-500 font-mono">Nodes</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              {isLive ? 'Live GitHub & AWS Sync' : 'Continuous AST Evaluator'}
            </div>
          </div>
          <MicroSparkline points={[140, 150, 155, 160, 165, 168, 172]} color="emerald" />
        </div>
        <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 size={12} />
          <span>Zero unmonitored drift</span>
        </div>
      </div>

      {/* KPI 3: Active Frameworks & Controls */}
      <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Active Standards</span>
          <Link to="/controls" className="text-xs font-mono text-orange-600 dark:text-orange-400 hover:underline no-underline">
            Catalog &rarr;
          </Link>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
              {activeFrameworks} <span className="text-xs font-normal text-slate-500 font-mono">Frameworks</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 font-mono">
              482 Canonical Technical Controls
            </div>
          </div>
          <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-800/40">
            <Shield size={20} />
          </div>
        </div>
        <div className="pt-1 text-[11px] font-mono text-slate-500">
          SOC 2 &bull; ISO 27001 &bull; NIST CSF &bull; CIS
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
        <div className="text-[10.5px] font-mono text-slate-400 text-center flex items-center justify-center gap-1">
          <Activity size={11} className="text-emerald-500" />
          <span>SHA-256 Ledger Verified</span>
        </div>
      </div>

    </div>
  );
});

FeaturedHeroCard.displayName = 'FeaturedHeroCard';
export default FeaturedHeroCard;
