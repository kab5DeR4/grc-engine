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
    // stages tracking clean as a whistle
    <div className="bg-[var(--surface)] rounded-xl border border-[var(--hairline)] p-6 md:p-8 shadow-sm font-mono text-[var(--ink)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[var(--hairline)] mb-6">
        <div>
          <span className="text-[10.5px] font-bold text-[var(--ink-muted)] uppercase tracking-wider block">
            CONTINUOUS VERIFICATION ENGINE
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mt-1">
            Deterministic Pipeline Stages
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--ink-muted)]">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[var(--surface-raised)] border border-[var(--hairline)] font-bold text-[var(--ink)]">
            <span className={`w-2 h-2 rounded-full ${activeScan ? 'bg-[var(--warn)] animate-ping' : 'bg-[var(--pass)]'}`}></span>
            <span>{activeScan ? 'EVALUATION ACTIVE' : 'ALL STAGES NOMINAL'}</span>
          </span>
          <span className="text-[11px] text-[var(--ink-muted)] font-semibold">
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
              className="p-4 bg-[var(--surface-raised)] rounded-xl border border-[var(--hairline)] flex flex-col justify-between hover:border-[var(--ink-muted)] transition-colors group"
            >
              <div className="flex justify-between items-center text-[10.5px] text-[var(--ink-muted)] mb-3 font-bold">
                <span className="tabular-nums">0{idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-[var(--pass)]"></span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--hairline)] w-fit mb-3 group-hover:scale-105 transition-transform">
                <Icon size={16} className="text-[var(--ink)] dark:text-[var(--accent)]" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-[var(--ink)] block truncate">
                  {stage.label}
                </span>
                <span className="text-[10.5px] text-[var(--ink-muted)] mt-0.5 block truncate">
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
