import { memo } from 'react';
import { Cloud, GitBranch, Terminal, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CloudEcosystemCard = memo(function CloudEcosystemCard({
  infrastructure = {},
  liveAssetsCount = 0,
  isLive = false,
}) {
  const summary = infrastructure?.summary || {};
  const aws = summary.aws || { status: 'Connected', resources: 142, accounts: 12 };
  const github = summary.github || { status: 'Connected', repositories: 24, branches: 384 };
  const k8s = summary.kubernetes || { status: 'Connected', clusters: 6, workloads: 87 };

  const environments = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      type: 'Cloud Infrastructure',
      icon: Cloud,
      status: aws.status || 'Connected',
      metrics: isLive 
        ? [{ label: 'Telemetry Stream', value: 'Active' }, { label: 'Audit Trail', value: 'Enforced' }]
        : [{ label: 'Resources', value: aws.resources || 142 }, { label: 'Accounts', value: aws.accounts || 12 }],
    },
    {
      id: 'github',
      name: 'GitHub Enterprise',
      type: 'VCS & CI/CD Pipeline',
      icon: GitBranch,
      status: github.status || 'Connected',
      metrics: isLive
        ? [{ label: 'Discovered Repos', value: liveAssetsCount || 2 }, { label: 'Branch Protection', value: 'Enforced' }]
        : [{ label: 'Repositories', value: github.repositories || 24 }, { label: 'Branch Policies', value: github.branches || 384 }],
    },
    {
      id: 'k8s',
      name: 'Kubernetes Workloads',
      type: 'Container Mesh & EKS',
      icon: Terminal,
      status: k8s.status || 'Connected',
      metrics: [
        { label: 'Cluster Nodes', value: k8s.clusters || 6 },
        { label: 'Runtime Pods', value: k8s.workloads || 87 },
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700/80 p-6 md:p-8 shadow-sm font-mono text-slate-900 dark:text-slate-100 flex flex-col justify-between h-full">
      
      <div>
        <div className="flex items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              INFRASTRUCTURE CONNECTIVITY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Connected Telemetry
            </h3>
          </div>
          <Link
            to="/dashboard/integrations"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-500 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors bg-slate-50 dark:bg-slate-800"
          >
            <span>MANAGE</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Rows */}
        <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
          {environments.map((env) => {
            const Icon = env.icon;
            const _isConnected = env.status === 'Connected';
            return (
              <div 
                key={env.id}
                className="py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <Icon size={16} className="text-slate-900 dark:text-sky-400" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block leading-tight">
                        {env.name}
                      </span>
                      <span className="text-[10.5px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {env.type}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>ONLINE</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 pl-11 pt-1 font-medium">
                  <span>{env.metrics[0].label}: <strong className="text-slate-900 dark:text-white font-bold">{env.metrics[0].value}</strong></span>
                  <span>{env.metrics[1].label}: <strong className="text-slate-900 dark:text-white font-bold">{env.metrics[1].value}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>INGESTION: AST & POLLING</span>
        <Link to="/assets" className="font-bold text-slate-900 dark:text-white hover:underline flex items-center gap-1">
          <span>ASSETS INVENTORY</span>
          <span>→</span>
        </Link>
      </div>

    </div>
  );
});

export default CloudEcosystemCard;
