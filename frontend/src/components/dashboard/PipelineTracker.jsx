import { memo } from 'react';
import { 
  Server, FileSearch, GitMerge, CheckCheck, 
  Database, MapPin, Gauge 
} from 'lucide-react';

const STAGES = [
  { id: 'infra', label: 'Discovery', sub: 'AST & Cloud API', icon: Server },
  { id: 'config', label: 'Extraction', sub: 'IAM & Encryption', icon: FileSearch },
  { id: 'normal', label: 'Normalization', sub: 'Canonical Model', icon: GitMerge },
  { id: 'eval', label: 'Rule Engine', sub: 'Deterministic Eval', icon: CheckCheck },
  { id: 'ledger', label: 'Ledger', sub: 'SHA-256 Digest', icon: Database },
  { id: 'mapping', label: 'Mapping', sub: 'SOC2 / ISO / NIST', icon: MapPin },
  { id: 'posture', label: 'Posture', sub: 'Continuous Drift', icon: Gauge },
];

export const PipelineTracker = memo(function PipelineTracker({ 
  activeScan = false, 
  lastCompleted = 'Just now' 
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700/80 p-6 md:p-8 shadow-sm font-mono text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-700 mb-6">
        <div>
          <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            CONTINUOUS VERIFICATION ENGINE
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Deterministic Pipeline Stages
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
            <span className={`w-2 h-2 rounded-full ${activeScan ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`}></span>
            <span>{activeScan ? 'EVALUATION ACTIVE' : 'ALL STAGES NOMINAL'}</span>
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">
            CYCLE: {lastCompleted}
          </span>
        </div>
      </div>

      {/* 7-Stage Sequence */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div 
              key={stage.id} 
              className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
            >
              <div className="flex justify-between items-center text-[10.5px] text-slate-500 dark:text-slate-400 mb-3 font-bold">
                <span>0{idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs"></span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 w-fit mb-3 group-hover:scale-105 transition-transform">
                <Icon size={16} className="text-slate-900 dark:text-sky-400" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block truncate">
                  {stage.label}
                </span>
                <span className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5 block truncate">
                  {stage.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
});

export default PipelineTracker;
