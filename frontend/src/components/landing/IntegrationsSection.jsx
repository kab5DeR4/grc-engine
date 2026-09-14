import { memo } from 'react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';
import { GitBranch, Cloud, Server, Database, Box, Terminal } from 'lucide-react';

const IntegrationsSection = memo(function IntegrationsSection() {
  const integrations = [
    {
      name: 'GitHub',
      icon: GitBranch,
      status: 'Live Connector',
      isLive: true,
      description: 'Branch protection, PR review counts, secret scanning, Dependabot alerts.',
    },
    {
      name: 'AWS',
      icon: Cloud,
      status: 'Collector Spec',
      isLive: true,
      description: 'IAM MFA enforcement, S3 KMS encryption, CloudTrail configuration.',
    },
    {
      name: 'Azure',
      icon: Server,
      status: 'Planned',
      isLive: false,
      description: 'Microsoft Entra ID, Azure Storage, Key Vault access policies.',
    },
    {
      name: 'Google Cloud',
      icon: Database,
      status: 'Planned',
      isLive: false,
      description: 'GCP IAM role bindings, Cloud Storage encryption, Audit Logs.',
    },
    {
      name: 'Kubernetes',
      icon: Box,
      status: 'Planned',
      isLive: false,
      description: 'Pod Security Standards, RBAC cluster role bindings, admission controls.',
    },
    {
      name: 'Terraform',
      icon: Terminal,
      status: 'Planned',
      isLive: false,
      description: 'IaC plan evaluation, state file inspection, drift detection.',
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-[11px] font-mono tracking-wider uppercase text-orange-600 dark:text-orange-400">
            Zero-Agent Telemetry Ingestion
          </div>
          <AnimatedBlurTextHeading 
            as="h2" 
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            Connect the systems you already use.
          </AnimatedBlurTextHeading>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Read-only connectors ingest configuration state directly through official APIs without agent sidecars or production modifications.
          </p>
        </div>

        {/* Technical Connector Grid with Integrated Logos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.name}
                className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-orange-500/40 shadow-xs transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                      <IconComp size={18} />
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.name}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      item.isLive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60 font-medium'
                        : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

IntegrationsSection.displayName = 'IntegrationsSection';
export default IntegrationsSection;
