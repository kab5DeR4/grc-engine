import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Terminal, UserCheck, Shield, Key } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ROLES } from '../../data/demo/rbac';

// demo sandbox bento layout
const DemoExperienceSection = memo(function DemoExperienceSection() {
  const navigate = useNavigate();
  const { setDemoMode, setCurrentUserRole } = useDemoStore();

  const handleLaunch = (roleId = ROLES.PLATFORM_ADMIN) => {
    setDemoMode(true);
    setCurrentUserRole(roleId);
    navigate('/dashboard');
  };

  const personas = [
    {
      roleId: ROLES.PLATFORM_ADMIN,
      name: 'Platform Admin',
      badge: 'FULL ACCESS',
      icon: Terminal,
      desc: 'Run live telemetry scans and configure cloud connectors.',
    },
    {
      roleId: ROLES.COMPLIANCE_OFFICER,
      name: 'Compliance Officer',
      badge: 'GOVERNANCE',
      icon: Shield,
      desc: 'Track cross-framework compliance scores and control drift.',
    },
    {
      roleId: ROLES.SECURITY_ENGINEER,
      name: 'Security Engineer',
      badge: 'REMEDIATION',
      icon: Key,
      desc: 'Investigate findings and inspect raw evidence payloads.',
    },
    {
      roleId: ROLES.EXTERNAL_AUDITOR,
      name: 'External Auditor',
      badge: 'READ-ONLY AUDIT',
      icon: UserCheck,
      desc: 'Verify SHA-256 evidence hashes and export audit packages.',
    },
  ];

  return (
    <section id="demo" className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-[var(--ground)] font-sans">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            <Terminal size={13} />
            <span>INTERACTIVE DEMO ENVIRONMENT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight sm:tracking-tighter">
            Don&apos;t take the explanation. Explore the system.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed font-normal">
            Launch straight into a live simulated enterprise environment with pre-configured telemetry and RBAC roles.
          </p>
        </div>

        {/* Bento Interconnected Sandbox Launcher */}
        <div className="border border-[var(--hairline)] rounded-xl bg-[var(--surface)] shadow-sm overflow-hidden p-5 sm:p-6 space-y-5">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[var(--hairline)]">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-[var(--ink)]">
                SELECT A ROLE PERSONA TO INITIALIZE DASHBOARD:
              </div>
              <p className="text-xs text-[var(--ink-muted)]">
                Each persona demonstrates role-based access control and isolated security workflows.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleLaunch(ROLES.PLATFORM_ADMIN)}
              className="px-5 py-2.5 rounded-lg bg-[var(--ink)] hover:opacity-90 text-[var(--ground)] font-bold text-xs transition-all duration-150 active:scale-[0.97] flex items-center gap-2 cursor-pointer border-none shadow-sm shrink-0"
            >
              <span>Quick Launch (Admin)</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4 Persona Bento Cells */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {personas.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.roleId}
                  type="button"
                  onClick={() => handleLaunch(p.roleId)}
                  className="p-4 rounded-lg bg-[var(--surface-raised)] hover:bg-[var(--surface)] border border-[var(--hairline)] transition-all cursor-pointer active:scale-[0.98] group flex flex-col justify-between text-left space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded bg-[var(--surface)] border border-[var(--hairline)] text-sky-500 flex items-center justify-center">
                        <Icon size={14} />
                      </div>
                      <span className="text-[9px] font-mono font-semibold text-sky-500 bg-[var(--accent-subtle)] px-1.5 py-0.5 rounded">
                        {p.badge}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--ink)]">
                        {p.name}
                      </div>
                      <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed mt-1">
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--hairline)] text-[10px] font-mono text-sky-500 flex items-center justify-between group-hover:underline">
                    <span>LAUNCH AS {p.name.split(' ')[0].toUpperCase()}</span>
                    <ArrowRight size={11} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-[var(--ink-muted)] pt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Simulated demonstration environment &bull; No credentials or credit card required</span>
          </div>

        </div>

      </div>
    </section>
  );
});

DemoExperienceSection.displayName = 'DemoExperienceSection';

export default DemoExperienceSection;
