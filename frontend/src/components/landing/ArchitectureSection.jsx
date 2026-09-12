import { memo } from 'react';
import { Terminal, Database, Lock, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArchitectureSection = memo(function ArchitectureSection() {
  const stackLayers = [
    {
      layer: 'Presentation & UI',
      tech: 'React 19 • Tailwind CSS • Zustand • Lucide',
      desc: 'High-contrast accessible interface with WCAG AAA compliance, dual-density layouts (Editorial & Compact SecOps), and instant client-side state synchronization.',
      icon: Terminal,
    },
    {
      layer: 'API Gateway & Core Engine',
      tech: 'FastAPI • Python 3.12+ • Pydantic v2',
      desc: 'High-performance asynchronous REST API gateway providing deterministic control execution, evidence verification routes, and modular scanner runners.',
      icon: Cpu,
    },
    {
      layer: 'Data Model & Evidence Vault',
      tech: 'SQLAlchemy • SQLite / PostgreSQL • SHA-256',
      desc: 'Relational data persistence for discovered infrastructure assets, canonical control mappings, audit event logs, and tamper-evident SHA-256 evidence digests.',
      icon: Database,
    },
    {
      layer: 'Sovereign Security & RBAC',
      tech: 'JWT Authentication • RBAC Matrix • FIPS Crypto',
      desc: 'Role-based access enforcement (Platform Admin, Compliance Lead, Security Engineer, External Auditor) with zero external telemetry exfiltration.',
      icon: Lock,
    },
  ];

  return (
    <section id="architecture" className="w-full bg-slate-50 dark:bg-[var(--ground)] py-18 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-200 dark:border-slate-800 font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-slate-200 dark:border-slate-800 gap-6">
          <div>
            <div className="text-[11px] font-mono font-bold tracking-wider text-sky-600 dark:text-sky-400 uppercase mb-2">
              System Architecture
            </div>
            <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] font-serif">
              Engineered with <span className="italic font-normal text-sky-600 dark:text-sky-400">clean architecture</span>.
            </h2>
            <p className="text-[14.5px] sm:text-[16px] text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Transparent, modular, and production-ready technical architecture built with proven modern technologies.
            </p>
          </div>

          <Link
            to="/architecture"
            className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-semibold transition-all text-decoration-none inline-flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Open System Graph</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 4-Layer Architecture Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {stackLayers.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[var(--ground)] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                      LAYER 0{idx + 1} // {item.layer}
                    </span>
                    <Icon size={16} className="text-slate-400" />
                  </div>

                  <h3 className="text-[16px] font-bold text-slate-900 dark:text-slate-100 font-mono mb-2">
                    {item.tech}
                  </h3>

                  <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
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

ArchitectureSection.displayName = 'ArchitectureSection';

export default ArchitectureSection;
