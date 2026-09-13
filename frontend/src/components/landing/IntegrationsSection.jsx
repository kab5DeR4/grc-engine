import { memo } from 'react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

const IntegrationsSection = memo(function IntegrationsSection() {
  const integrations = [
    {
      name: 'GitHub',
      status: 'Live Connector',
      isLive: true,
      description: 'Branch protection, PR review counts, secret scanning, Dependabot alerts.',
    },
    {
      name: 'AWS',
      status: 'Collector Spec',
      isLive: true,
      description: 'IAM MFA enforcement, S3 KMS encryption, CloudTrail configuration.',
    },
    {
      name: 'Azure',
      status: 'Planned',
      isLive: false,
      description: 'Microsoft Entra ID, Azure Storage, Key Vault access policies.',
    },
    {
      name: 'Google Cloud',
      status: 'Planned',
      isLive: false,
      description: 'GCP IAM role bindings, Cloud Storage encryption, Audit Logs.',
    },
    {
      name: 'Kubernetes',
      status: 'Planned',
      isLive: false,
      description: 'Pod Security Standards, RBAC cluster role bindings, admission controls.',
    },
    {
      name: 'Terraform',
      status: 'Planned',
      isLive: false,
      description: 'IaC plan evaluation, state file inspection, drift detection.',
    },
  ];

  return (
    <section className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
            Infrastructure Connectors
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

        {/* Restrained Horizontal Grid (Not giant cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.name}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    item.isLive
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60'
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
          ))}
        </div>

      </div>
    </section>
  );
});

IntegrationsSection.displayName = 'IntegrationsSection';
export default IntegrationsSection;
