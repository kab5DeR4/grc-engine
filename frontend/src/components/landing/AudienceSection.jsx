import { memo } from 'react';
import { Terminal, Shield, FileCheck2, GitBranch } from 'lucide-react';

// lowkey cleaning up the audience section styling
const AudienceSection = memo(function AudienceSection() {
  const audiences = [
    {
      icon: Terminal,
      title: 'Security Engineers',
      roleTag: 'Technical Observability',
      desc: 'Understand technical compliance posture directly from live code, IAM policies, and cloud configuration evidence.',
    },
    {
      icon: Shield,
      title: 'GRC & Compliance Teams',
      roleTag: 'Continuous Governance',
      desc: 'Connect abstract regulatory standards to automated technical proofs without chasing developers for manual screenshots.',
    },
    {
      icon: FileCheck2,
      title: 'External & Internal Auditors',
      roleTag: 'Forensic Verification',
      desc: 'Review tamper-evident SHA-256 evidence records, explicit rule evaluations, and exportable machine-verifiable audit packages.',
    },
    {
      icon: GitBranch,
      title: 'Engineering & DevOps',
      roleTag: 'Shift-Left Guardrails',
      desc: 'Understand how infrastructure and code changes impact compliance posture before deploying to production.',
    },
  ];

  return (
    <section id="audiences" className="w-full bg-[var(--ground)] py-18 sm:py-22 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[var(--hairline)] font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
            Target Audience
          </div>
          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-[var(--ink)] tracking-tight leading-[1.1] font-serif mb-4">
            Built for modern <span className="italic font-normal text-[var(--accent)]">technical &amp; compliance</span> teams.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[var(--ink-secondary)] leading-relaxed">
            Eliminate silos between security engineering, DevOps pipelines, compliance leads, and external audit partners.
          </p>
        </div>

        {/* Compact 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {audiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl bg-[var(--surface)] border border-[var(--hairline)] hover:border-[var(--hairline-subtle)] transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 tabular-nums">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-raised)] text-[var(--accent)] flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--surface-raised)] text-[var(--ink-muted)] uppercase">
                      {item.roleTag}
                    </span>
                  </div>

                  <h3 className="text-[16px] font-bold text-[var(--ink)] font-serif mb-2">
                    {item.title}
                  </h3>

                  <p className="text-[13px] text-[var(--ink-secondary)] leading-relaxed">
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

AudienceSection.displayName = 'AudienceSection';

export default AudienceSection;
