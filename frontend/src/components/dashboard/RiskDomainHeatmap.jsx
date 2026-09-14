import { memo } from 'react';
import { KeyRound, Database, GitBranch, Network, ShieldCheck, AlertCircle, ArrowUpRight } from 'lucide-react';

const DOMAINS = [
  {
    id: 'iam',
    name: 'Identity & Access (IAM)',
    icon: KeyRound,
    score: 94,
    failingCount: 1,
    passingCount: 46,
    trend: '+1.2%',
    criticalGaps: '1 privileged identity without MFA',
    status: 'OPTIMAL',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'storage',
    name: 'Cloud Data & Encryption',
    icon: Database,
    score: 82,
    failingCount: 2,
    passingCount: 68,
    trend: '-3.0%',
    criticalGaps: '1 S3 bucket with public read ACL',
    status: 'NEEDS ATTENTION',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  },
  {
    id: 'cicd',
    name: 'CI/CD & Source Code Security',
    icon: GitBranch,
    score: 98,
    failingCount: 0,
    passingCount: 38,
    trend: 'Stable',
    criticalGaps: 'Zero unreviewed merge policies',
    status: 'OPTIMAL',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'network',
    name: 'Network & Boundary Controls',
    icon: Network,
    score: 91,
    failingCount: 1,
    passingCount: 52,
    trend: '+4.5%',
    criticalGaps: '0.0.0.0/0 ingress on port 22 in staging VPC',
    status: 'OPTIMAL',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
];

export const RiskDomainHeatmap = memo(function RiskDomainHeatmap({ 
  onSelectCategory,
  isLive = false,
  hasLiveIntegrations = false,
  liveFindings = [],
  liveAssetsCount = 0
}) {
  const isAwaiting = isLive && !hasLiveIntegrations;
  const criticalCount = isLive ? liveFindings.filter(f => f.severity === 'CRITICAL' && (f.status || '').toUpperCase() !== 'RESOLVED').length : 0;
  const highCount = isLive ? liveFindings.filter(f => f.severity === 'HIGH' && (f.status || '').toUpperCase() !== 'RESOLVED').length : 0;
  const cicdScore = isLive ? (criticalCount === 0 && highCount === 0 ? 100 : Math.max(0, 100 - (criticalCount * 30 + highCount * 15))) : 98;

  const domains = isLive
    ? [
        {
          id: 'iam',
          name: 'Identity & Access (IAM)',
          icon: KeyRound,
          score: null,
          failingCount: 0,
          passingCount: 0,
          trend: 'Standby',
          criticalGaps: 'Awaiting AWS IAM / Okta telemetry connector',
          status: 'AWAITING INGRESS',
          badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        },
        {
          id: 'storage',
          name: 'Cloud Data & Encryption',
          icon: Database,
          score: null,
          failingCount: 0,
          passingCount: 0,
          trend: 'Standby',
          criticalGaps: 'Awaiting S3 / RDS encryption telemetry',
          status: 'AWAITING INGRESS',
          badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        },
        {
          id: 'cicd',
          name: 'CI/CD & Source Code Security',
          icon: GitBranch,
          score: hasLiveIntegrations ? cicdScore : null,
          failingCount: hasLiveIntegrations ? (criticalCount + highCount) : 0,
          passingCount: hasLiveIntegrations ? Math.max(1, liveAssetsCount) : 0,
          trend: hasLiveIntegrations ? 'Live Sync' : 'Standby',
          criticalGaps: hasLiveIntegrations 
            ? (criticalCount > 0 ? `${criticalCount} high risk repository drifts` : 'Zero unreviewed merge policies')
            : 'Connect GitHub to evaluate branch protections',
          status: hasLiveIntegrations ? (cicdScore >= 85 ? 'OPTIMAL' : 'NEEDS ATTENTION') : 'AWAITING INGRESS',
          badgeColor: hasLiveIntegrations 
            ? (cicdScore >= 85 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20')
            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        },
        {
          id: 'network',
          name: 'Network & Boundary Controls',
          icon: Network,
          score: null,
          failingCount: 0,
          passingCount: 0,
          trend: 'Standby',
          criticalGaps: 'Awaiting VPC / Firewall telemetry connector',
          status: 'AWAITING INGRESS',
          badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        },
      ]
    : DOMAINS;

  return (
    <section className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10.5px] font-mono font-medium text-slate-500 uppercase tracking-wider">
            Risk & Posture Matrix
          </div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Infrastructure Domain Health Breakdown
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Target SLA: &gt; 85% Across All 4 Domains
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isPassing = domain.score !== null && domain.score >= 85;

          return (
            <div
              key={domain.id}
              onClick={() => onSelectCategory && onSelectCategory(domain.id)}
              className="p-5 rounded-xl bg-[var(--surface)] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 group-hover:text-orange-500 transition-colors">
                  <Icon size={16} />
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${domain.badgeColor}`}>
                  {domain.status}
                </span>
              </div>

              {/* Title & Score */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate">
                  {domain.name}
                </h3>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    {domain.score !== null ? `${domain.score}%` : '--%'}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {domain.passingCount} Passing &bull; {domain.failingCount} Action
                  </span>
                </div>

                {/* Progress Meter */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      domain.score === null
                        ? 'bg-amber-400'
                        : isPassing
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${domain.score !== null ? domain.score : 0}%` }}
                  />
                </div>
              </div>

              {/* Critical Gap Alert Callout */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="truncate pr-1">
                  {domain.criticalGaps}
                </span>
                <ArrowUpRight size={12} className="shrink-0 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

RiskDomainHeatmap.displayName = 'RiskDomainHeatmap';
export default RiskDomainHeatmap;
