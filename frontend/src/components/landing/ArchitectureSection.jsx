import { memo } from 'react';
import { ArrowRight, ChevronRight, Server, Cpu, Database, FileCheck, Layers, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

const ArchitectureSection = memo(function ArchitectureSection() {
  const layers = [
    {
      title: '01 Ingestion & Telemetry',
      tech: 'Read-only REST APIs & eBPF Probes',
      detail: 'GitHub VCS, AWS CloudTrail, S3 KMS, and Kubernetes runtime state.',
      icon: Server,
    },
    {
      title: '02 Cryptographic Vault',
      tech: 'SHA-256 Key-Sorted JSON Hashing',
      detail: 'Immutable proof ledger generated at capture for independent audit verification.',
      icon: Database,
    },
    {
      title: '03 Evaluation Engine',
      tech: 'FastAPI + Python Deterministic Rules',
      detail: 'Zero-hallucination policy execution mapped to SOC 2, ISO 27001, and NIST CSF.',
      icon: Cpu,
    },
  ];

  return (
    <section id="architecture" className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
              Technical Stack
            </div>
            <AnimatedBlurTextHeading 
              as="h2" 
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              System architecture.
            </AnimatedBlurTextHeading>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Modular technical stack engineered for continuous posture evaluation, data sovereignty, and audit transparency.
            </p>
          </div>

          <Link
            to="/architecture"
            className="inline-flex items-center gap-1 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400 no-underline"
          >
            <span>Full Architecture Spec</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Distinct 3-Tier Architecture Layer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div 
                key={layer.title}
                className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-medium">
                      {layer.title}
                    </span>
                    <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center">
                      <Icon size={13} />
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {layer.tech}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {layer.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Backend & ORM Tech Specs Bar */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">FastAPI Python 3.11+</span>
            <span>&bull; Async REST API</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">SQLAlchemy 2.0 ORM</span>
            <span>&bull; SQLite / PostgreSQL</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Deterministic Scoring</span>
            <span>&bull; Zero Hallucination</span>
          </div>
        </div>

      </div>
    </section>
  );
});

ArchitectureSection.displayName = 'ArchitectureSection';
export default ArchitectureSection;
