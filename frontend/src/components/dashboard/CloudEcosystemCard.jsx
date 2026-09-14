import { memo } from 'react';
import { Cloud, GitBranch, Terminal, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CloudEcosystemCard = memo(function CloudEcosystemCard({
  infrastructure = {},
  liveIntegrations = [],
  liveAssetsCount = 0,
  isLive = false,
  hasLiveIntegrations = false,
}) {
  const summary = infrastructure?.summary || {};
  const aws = summary.aws || { status: 'Connected', resources: 142, accounts: 12 };
  const github = summary.github || { status: 'Connected', repositories: 24, branches: 384 };
  const k8s = summary.kubernetes || { status: 'Connected', clusters: 6, workloads: 87 };

  const isGitHubLive = isLive && (liveIntegrations.some(i => (i.integration_type || i.id || '').toUpperCase().includes('GITHUB')) || liveAssetsCount > 0);
  const isAwsLive = isLive && liveIntegrations.some(i => (i.integration_type || i.id || '').toUpperCase().includes('AWS'));
  const isK8sLive = isLive && liveIntegrations.some(i => (i.integration_type || i.id || '').toUpperCase().includes('K8S') || (i.integration_type || i.id || '').toUpperCase().includes('KUBERNETES'));

  const environments = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      type: 'Cloud Infrastructure',
      icon: Cloud,
      status: isLive ? (isAwsLive ? 'Connected' : 'Disconnected') : (aws.status || 'Connected'),
      metrics: isLive 
        ? (isAwsLive 
            ? [{ label: 'Telemetry Stream', value: 'Active' }, { label: 'Audit Trail', value: 'Enforced' }]
            : [{ label: 'Telemetry Stream', value: 'Inactive' }, { label: 'Connector', value: 'Not Configured' }])
        : [{ label: 'Resources', value: aws.resources || 142 }, { label: 'Accounts', value: aws.accounts || 12 }],
    },
    {
      id: 'github',
      name: 'GitHub Enterprise',
      type: 'VCS & CI/CD Pipeline',
      icon: GitBranch,
      status: isLive ? (isGitHubLive ? 'Connected' : 'Disconnected') : (github.status || 'Connected'),
      metrics: isLive
        ? (isGitHubLive
            ? [{ label: 'Discovered Repos', value: liveAssetsCount }, { label: 'Branch Protection', value: 'Enforced' }]
            : [{ label: 'Discovered Repos', value: 0 }, { label: 'Connector', value: 'Not Configured' }])
        : [{ label: 'Repositories', value: github.repositories || 24 }, { label: 'Branch Policies', value: github.branches || 384 }],
    },
    {
      id: 'k8s',
      name: 'Kubernetes Workloads',
      type: 'Container Mesh & EKS',
      icon: Terminal,
      status: isLive ? (isK8sLive ? 'Connected' : 'Disconnected') : (k8s.status || 'Connected'),
      metrics: isLive
        ? (isK8sLive
            ? [{ label: 'Cluster Nodes', value: 'Active' }, { label: 'Runtime Pods', value: 'Monitored' }]
            : [{ label: 'Cluster Nodes', value: 0 }, { label: 'Connector', value: 'Not Configured' }])
        : [
            { label: 'Cluster Nodes', value: k8s.clusters || 6 },
            { label: 'Runtime Pods', value: k8s.workloads || 87 },
          ],
    },
  ];

  return (
    // telemetry connectivity view stays crisp
    <div className="bg-[var(--surface)] rounded-xl border border-[var(--hairline)] p-6 md:p-8 shadow-sm font-mono text-[var(--ink)] flex flex-col justify-between h-full">
      
      <div>
        <div className="flex items-center justify-between gap-3 pb-5 border-b border-[var(--hairline)]">
          <div>
            <span className="text-[10.5px] font-bold text-[var(--ink-muted)] uppercase tracking-wider block">
              INFRASTRUCTURE CONNECTIVITY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] mt-1">
              Connected Telemetry
            </h3>
          </div>
          <Link
            to="/dashboard/integrations"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[var(--hairline)] hover:border-[var(--ink-muted)] text-xs font-bold text-[var(--ink)] transition-colors bg-[var(--surface-raised)] active:scale-[0.97]"
          >
            <span>MANAGE</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Empty state when no live integrations in live mode */}
        {isLive && !hasLiveIntegrations ? (
          <div className="py-8 px-4 text-center my-4 rounded-xl bg-[var(--surface-raised)] border border-dashed border-[var(--hairline)]">
            <GitBranch size={28} className="mx-auto text-[var(--ink-muted)] mb-2 opacity-60" />
            <div className="text-sm font-bold text-[var(--ink)]">
              No Live Connectors Configured
            </div>
            <p className="text-xs text-[var(--ink-muted)] max-w-sm mx-auto mt-1 leading-relaxed">
              Connect GitHub or AWS to harvest telemetry and evaluate live compliance boundaries.
            </p>
            <div className="mt-4">
              <Link
                to="/dashboard/integrations"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Connect GitHub Integration</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        ) : (
          /* Rows */
          <div className="mt-4 divide-y divide-[var(--hairline)]">
            {environments.map((env) => {
              const Icon = env.icon;
              const isConnected = env.status === 'Connected';
              return (
                <div 
                  key={env.id}
                  className="py-4 hover:bg-[var(--surface-raised)] rounded-xl px-2 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[var(--surface-raised)] border border-[var(--hairline)]">
                        <Icon size={16} className="text-[var(--ink)] dark:text-[var(--accent)]" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[var(--ink)] block leading-tight">
                          {env.name}
                        </span>
                        <span className="text-[10.5px] text-[var(--ink-muted)] block mt-0.5">
                          {env.type}
                        </span>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                      isConnected 
                        ? 'bg-[var(--pass-surface)] text-[var(--pass)] border-[var(--pass)]/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[var(--pass)]' : 'bg-slate-400'}`}></span>
                      <span>{isConnected ? 'ONLINE' : 'NOT CONFIGURED'}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[var(--ink-secondary)] pl-11 pt-1 font-medium">
                    <span>{env.metrics[0].label}: <strong className="text-[var(--ink)] font-bold tabular-nums">{env.metrics[0].value}</strong></span>
                    <span>{env.metrics[1].label}: <strong className="text-[var(--ink)] font-bold tabular-nums">{env.metrics[1].value}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-[var(--hairline)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
        <span>INGESTION: AST & POLLING</span>
        <Link to="/assets" className="font-bold text-[var(--ink)] hover:underline flex items-center gap-1">
          <span>ASSETS INVENTORY</span>
          <span>→</span>
        </Link>
      </div>

    </div>
  );
});

export default CloudEcosystemCard;
