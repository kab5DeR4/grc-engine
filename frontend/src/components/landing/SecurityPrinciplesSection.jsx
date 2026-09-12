import { memo } from 'react';
import { Lock, ShieldCheck, EyeOff, Database, Key, Server } from 'lucide-react';

// security principles in crisp bento grid
const SecurityPrinciplesSection = memo(function SecurityPrinciplesSection() {
  const concreteClaims = [
    {
      icon: Lock,
      title: 'Least-Privilege Read-Only Access',
      tag: 'SCOPES: READ-ONLY',
      desc: 'Connectors for GitHub, AWS, and Okta request minimal read-only scopes. GRC Engine never mutates or modifies production environments.',
    },
    {
      icon: EyeOff,
      title: 'Zero External LLM Exfiltration',
      tag: 'AIR-GAPPED EVAL',
      desc: 'Rule evaluations execute deterministically on your infrastructure. Private configuration state is never transmitted to third-party AI APIs.',
    },
    {
      icon: Database,
      title: 'Encrypted in Transit & at Rest',
      tag: 'TLS 1.3 & AES-256',
      desc: 'All telemetry is encrypted in transit via TLS 1.3 and at rest with AES-256 encryption supporting customer-managed KMS keys.',
    },
    {
      icon: ShieldCheck,
      title: 'Cryptographic Tamper Verification',
      tag: 'SHA-256 HASHING',
      desc: 'Every evidence payload receives a timestamped SHA-256 fingerprint at ingestion, preventing post-capture alteration.',
    },
    {
      icon: Key,
      title: 'Granular Role-Based Access Control',
      tag: 'RBAC: 4 ROLES',
      desc: 'Strict authorization matrices isolate permissions across Platform Admins, Compliance Leads, Security Engineers, and External Auditors.',
    },
    {
      icon: Server,
      title: 'Sovereign VPC Deployment Ready',
      tag: 'VPC & ON-PREM',
      desc: 'Deployable as a self-contained service within your own VPC or air-gapped network for complete enterprise data sovereignty.',
    },
  ];

  return (
    <section id="security" className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 font-sans bg-[var(--ground)]">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            <Lock size={13} />
            <span>ENTERPRISE SECURITY SPECIFICATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight sm:tracking-tighter">
            Built for sensitive infrastructure data.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed font-normal">
            Concrete security architecture designed to satisfy strict enterprise CISO and auditor requirements.
          </p>
        </div>

        {/* Bento Interconnected Architecture Matrix */}
        <div className="border border-[var(--hairline)] rounded-xl bg-[var(--hairline)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden shadow-sm">
          {concreteClaims.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-[var(--surface)] space-y-2.5 flex flex-col justify-between hover:bg-[var(--surface-raised)] transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface-raised)] border border-[var(--hairline)] text-sky-500 flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--surface-raised)] text-[var(--ink-muted)] border border-[var(--hairline)]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                    {item.desc}
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
