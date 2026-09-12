import { memo } from 'react';
import { 
  Server, AlertTriangle, 
  Layers, ShieldCheck 
} from 'lucide-react';

export const QuickStatStrip = memo(function QuickStatStrip({
  totalAssets = 0,
  criticalRisks = 0,
  highRisks = 0,
  activeFrameworks = 4,
  automatedCoverage = 92,
  isLive = false,
}) {
  const stats = [
    {
      label: 'MONITORED ASSETS',
      value: totalAssets,
      sub: isLive ? 'Live API discovered nodes' : 'AWS, GitHub & K8s nodes',
      icon: Server,
    },
    {
      label: 'CRITICAL / HIGH RISKS',
      value: `${criticalRisks} / ${highRisks}`,
      sub: 'Actionable drift under SLA',
      icon: AlertTriangle,
    },
    {
      label: 'CANONICAL FRAMEWORKS',
      value: activeFrameworks,
      sub: 'SOC 2, ISO, NIST, CIS v8',
      icon: Layers,
    },
    {
      label: 'AUTOMATED COVERAGE',
      value: `${automatedCoverage}%`,
      sub: 'Deterministic AST verification',
      icon: ShieldCheck,
    },
  ];

  return (
    // stat strip hitting different fr
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 font-mono">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div 
            key={i}
            className="p-5 sm:p-6 bg-[var(--surface)] rounded-xl border border-[var(--hairline)] shadow-sm hover:shadow-md hover:border-[var(--ink-muted)] transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10.5px] font-bold text-[var(--ink-muted)] uppercase tracking-wider">
                <span className="tabular-nums">0{i + 1}</span>. {stat.label}
              </span>
              <div className="p-2 rounded-xl bg-[var(--surface-raised)] border border-[var(--hairline)]">
                <Icon size={16} className="text-[var(--ink)] dark:text-[var(--accent)]" />
              </div>
            </div>

            <div className="my-1">
              <span className="text-2xl sm:text-3xl font-bold text-[var(--ink)] block tracking-tight tabular-nums">
                {stat.value}
              </span>
            </div>

            <div className="text-[11.5px] text-[var(--ink-muted)] mt-1">
              {stat.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default QuickStatStrip;
