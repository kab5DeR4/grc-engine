import { memo } from 'react';
import { Lock, ShieldCheck, Clock, Key } from 'lucide-react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

const SecurityPrinciplesSection = memo(function SecurityPrinciplesSection() {
  const principles = [
    {
      icon: Lock,
      title: 'Least-privilege access',
      detail: 'Connectors request minimal read-only scopes. GRC Engine never mutates your infrastructure.',
    },
    {
      icon: ShieldCheck,
      title: 'Evidence integrity',
      detail: 'Configuration payloads are hashed with SHA-256 to ensure tamper-evident provenance.',
    },
    {
      icon: Clock,
      title: 'Auditable collection',
      detail: 'Every scan and evaluation is timestamped and recorded in an immutable ledger.',
    },
    {
      icon: Key,
      title: 'Secure credential handling',
      detail: 'API tokens are strictly scoped. Private data is never transmitted to external AI services.',
    },
  ];

  return (
    <section id="security" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono tracking-wider uppercase text-zinc-500 font-semibold">
            Security Architecture
          </div>
          <AnimatedBlurTextHeading 
            as="h2" 
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            Built for sensitive infrastructure.
          </AnimatedBlurTextHeading>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Engineered to operate safely inside enterprise environments where read access is tightly regulated and data exfiltration is unacceptable.
          </p>
        </div>

        {/* 4-Item Clean Technical Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="p-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                  <Icon size={18} className="text-orange-600 dark:text-orange-500" strokeWidth={2} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
