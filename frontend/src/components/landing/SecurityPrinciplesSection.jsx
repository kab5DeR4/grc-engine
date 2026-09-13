import { memo } from 'react';
import { Lock, ShieldCheck, Clock, Key } from 'lucide-react';

const SecurityPrinciplesSection = memo(function SecurityPrinciplesSection() {
  const principles = [
    {
      icon: Lock,
      title: 'Least-privilege access',
      detail: 'Connectors for GitHub and cloud environments request minimal read-only scopes. GRC Engine never writes to or mutates your infrastructure.',
    },
    {
      icon: ShieldCheck,
      title: 'Evidence integrity',
      detail: 'Every collected configuration payload is hashed with SHA-256 at capture, ensuring tamper-evident provenance that auditors can verify.',
    },
    {
      icon: Clock,
      title: 'Auditable collection',
      detail: 'Every scan, rule evaluation, and attestation record is timestamped with complete collector versioning and immutable ledger tracking.',
    },
    {
      icon: Key,
      title: 'Secure credential handling',
      detail: 'API tokens and keys are securely scoped and isolated. Private infrastructure configuration data is never transmitted to external AI services.',
    },
  ];

  return (
    <section id="security" className="w-full py-16 sm:py-20 px-4 sm:px-6 font-sans bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
            Security Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Built for sensitive infrastructure.
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Engineered to operate safely inside enterprise environments where read access is tightly regulated and data exfiltration is unacceptable.
          </p>
        </div>

        {/* 4-Item Clean Technical Layout (Not giant cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="p-5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30 space-y-3"
              >
                <div className="w-8 h-8 rounded bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                  <Icon size={16} className="text-orange-600 dark:text-orange-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

SecurityPrinciplesSection.displayName = 'SecurityPrinciplesSection';
export default SecurityPrinciplesSection;
