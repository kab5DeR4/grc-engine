import { memo } from 'react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';
import { GitBranch, Cloud, Server, Database, Box, Terminal, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const IntegrationsSection = memo(function IntegrationsSection() {
  const integrations = [
    {
      name: 'GitHub',
      icon: GitBranch,
      status: 'Live Connector',
      isLive: true,
      description: 'Branch protection, PRs, secret scanning.',
    },
    {
      name: 'AWS',
      icon: Cloud,
      status: 'Collector Spec',
      isLive: true,
      description: 'IAM MFA, S3 KMS, CloudTrail.',
    },
    {
      name: 'Azure',
      icon: Server,
      status: 'Planned',
      isLive: false,
      description: 'Entra ID, Key Vault access.',
    },
    {
      name: 'Google Cloud',
      icon: Database,
      status: 'Planned',
      isLive: false,
      description: 'IAM bindings, GCP Storage.',
    },
    {
      name: 'Kubernetes',
      icon: Box,
      status: 'Planned',
      isLive: false,
      description: 'RBAC, admission controls.',
    },
    {
      name: 'Terraform',
      icon: Terminal,
      status: 'Planned',
      isLive: false,
      description: 'State file drift detection.',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono tracking-wider uppercase text-zinc-500 font-semibold">
            Telemetry Connectors
          </div>
          <AnimatedBlurTextHeading 
            as="h2" 
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            Observes state where it exists.
          </AnimatedBlurTextHeading>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Read-only connectors ingest configuration state directly through official APIs without agent sidecars or production modifications.
          </p>
        </div>

        {/* Ecosystem Visualization */}
        <div className="relative max-w-4xl mx-auto py-12 flex flex-col items-center">
          
          {/* Central Node */}
          <div className="relative z-20 w-32 h-32 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center space-y-2">
             <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
               <Activity size={20} />
             </div>
             <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono text-center">GRC Engine<br/>Node</span>
          </div>

          {/* Grid of integrations with decorative lines */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 relative z-10">
            {integrations.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={item.name} className="relative flex flex-col items-center text-center space-y-3 group">
                  
                  {/* Vertical Connection Line to Central Node */}
                  <div className="hidden md:block absolute -top-[48px] left-1/2 w-[1px] h-[48px] bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />
                  
                  <div className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                    item.isLive 
                      ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 group-hover:border-orange-500/50' 
                      : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200/50 dark:border-zinc-800/50 text-zinc-400 dark:text-zinc-600'
                  }`}>
                    <IconComp size={20} strokeWidth={item.isLive ? 2 : 1.5} />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className={`text-sm font-semibold ${item.isLive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-500'}`}>
                        {item.name}
                      </h3>
                      {!item.isLive && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-400">
                          PLANNED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[180px] mx-auto leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Horizontal connection line for the grid */}
          <div className="hidden md:block absolute top-[160px] left-1/6 right-1/6 h-[1px] bg-zinc-200 dark:bg-zinc-800 w-2/3 mx-auto" />
          
        </div>

      </div>
    </section>
  );
});

IntegrationsSection.displayName = 'IntegrationsSection';
export default IntegrationsSection;
