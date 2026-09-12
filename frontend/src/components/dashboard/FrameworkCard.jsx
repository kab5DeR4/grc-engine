import { memo } from 'react';
import { ArrowUpRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FRAMEWORK_DOMAINS = {
  'SOC2': [
    { name: 'Access Control', score: 94 },
    { name: 'Change Mgmt', score: 90 },
    { name: 'Encryption', score: 92 },
  ],
  'ISO27001': [
    { name: 'Org Security', score: 88 },
    { name: 'Asset Mgmt', score: 85 },
    { name: 'Audit Logging', score: 86 },
  ],
  'NIST': [
    { name: 'Identify & Protect', score: 84 },
    { name: 'Detect & Respond', score: 80 },
    { name: 'Recover & Posture', score: 82 },
  ],
  'CIS': [
    { name: 'Inventory & IAM', score: 82 },
    { name: 'Data Protection', score: 75 },
    { name: 'Secure Config', score: 78 },
  ],
};

export const FrameworkCard = memo(function FrameworkCard({
  id,
  name,
  score = 85,
  controls = 100,
  passing = 85,
  failing = 15,
  _trend = '+2.4%',
}) {
  const isHealthy = score >= 85;
  const domains = FRAMEWORK_DOMAINS[id] || [
    { name: 'Access Security', score: score },
    { name: 'Data Protection', score: Math.max(score - 4, 70) },
    { name: 'System Logging', score: Math.min(score + 2, 98) },
  ];

  return (
    <Link 
      to={`/controls?framework=${encodeURIComponent(id)}`}
      className="block group text-decoration-none focus:outline-none"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700/80 p-5 sm:p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-md hover:border-slate-500 dark:hover:border-slate-500 transition-all font-mono">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {id}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
              isHealthy
                ? 'border-emerald-300 text-emerald-800 dark:border-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60'
                : 'border-amber-300 text-amber-800 dark:border-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60'
            }`}>
              {isHealthy ? <ShieldCheck size={10} /> : <AlertCircle size={10} />}
              {isHealthy ? 'VERIFIED' : 'ACTION'}
            </span>
          </div>

          {/* Title */}
          <div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {name}
            </h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
              {passing}/{controls} Controls Enforced ({failing} gaps)
            </span>
          </div>
        </div>

        {/* Functional Data Visualization: Domain Breakdown Progress */}
        <div className="my-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
          {domains.map((dom, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-600 dark:text-slate-400 font-semibold">
                <span className="truncate">{dom.name}</span>
                <span className="text-slate-900 dark:text-slate-200">{dom.score}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${dom.score >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${dom.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Compliance Rate Row */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
            COMPLIANCE RATE
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base text-slate-900 dark:text-white">
              {score}.0%
            </span>
            <ArrowUpRight size={14} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
          </div>
        </div>

      </div>
    </Link>
  );
});

export default FrameworkCard;
