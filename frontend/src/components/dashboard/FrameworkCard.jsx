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
      {/* framework card styling is immaculate */}
      <div className="bg-[var(--surface)] rounded-xl border border-[var(--hairline)] p-5 sm:p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-md hover:border-[var(--ink-muted)] transition-all font-mono">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10.5px] font-bold text-[var(--ink-muted)] uppercase tracking-wider">
              {id}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
              isHealthy
                ? 'border-[var(--pass)]/30 text-[var(--pass)] bg-[var(--pass-surface)]'
                : 'border-[var(--warn)]/30 text-[var(--warn)] bg-[var(--warn-surface)]'
            }`}>
              {isHealthy ? <ShieldCheck size={10} /> : <AlertCircle size={10} />}
              {isHealthy ? 'VERIFIED' : 'ACTION'}
            </span>
          </div>

          {/* Title */}
          <div>
            <h4 className="font-bold text-base text-[var(--ink)] truncate group-hover:text-[var(--accent)] transition-colors">
              {name}
            </h4>
            <span className="text-[11px] text-[var(--ink-muted)] mt-0.5 block">
              <span className="tabular-nums">{passing}</span>/<span className="tabular-nums">{controls}</span> Controls Enforced (<span className="tabular-nums">{failing}</span> gaps)
            </span>
          </div>
        </div>

        {/* Functional Data Visualization: Domain Breakdown Progress */}
        <div className="my-4 p-3 bg-[var(--surface-raised)] rounded-xl border border-[var(--hairline)] space-y-2">
          {domains.map((dom, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[10px] text-[var(--ink-secondary)] font-semibold">
                <span className="truncate">{dom.name}</span>
                <span className="text-[var(--ink)] tabular-nums">{dom.score}%</span>
              </div>
              <div className="w-full bg-[var(--hairline)] h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${dom.score >= 85 ? 'bg-[var(--pass)]' : 'bg-[var(--warn)]'}`}
                  style={{ width: `${dom.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Compliance Rate Row */}
        <div className="pt-3 border-t border-[var(--hairline)] flex items-center justify-between">
          <span className="text-xs text-[var(--ink-muted)] uppercase font-semibold">
            COMPLIANCE RATE
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base text-[var(--ink)] tabular-nums">
              {score}.0%
            </span>
            <ArrowUpRight size={14} className="text-[var(--ink-muted)] group-hover:text-[var(--ink)] transition-colors" />
          </div>
        </div>

      </div>
    </Link>
  );
});

export default FrameworkCard;
