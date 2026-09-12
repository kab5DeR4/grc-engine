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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 font-mono">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div 
            key={i}
            className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-slate-500 dark:hover:border-slate-500 transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                0{i + 1}. {stat.label}
              </span>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Icon size={16} className="text-slate-900 dark:text-sky-400" />
              </div>
            </div>

            <div className="my-1">
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white block tracking-tight">
                {stat.value}
              </span>
            </div>

            <div className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1">
              {stat.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default QuickStatStrip;
