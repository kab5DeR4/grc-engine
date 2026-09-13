import { memo } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArchitectureSection = memo(function ArchitectureSection() {
  const pipeline = [
    { name: 'Sources', tech: 'GitHub, AWS, Cloud APIs', desc: 'Raw infrastructure' },
    { name: 'Collectors', tech: 'Read-only API clients', desc: 'Normalized ingestion' },
    { name: 'Evidence Vault', tech: 'SHA-256 JSON hashing', desc: 'Immutable ledger' },
    { name: 'Control Mapping', tech: 'Canonical catalog', desc: 'Multi-framework crosswalk' },
    { name: 'Evaluation', tech: 'Deterministic rule engine', desc: 'Zero hallucination' },
    { name: 'Reports & Drift', tech: 'Audit attestation packages', desc: 'Continuous proof' },
  ];

  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 font-sans bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
              Technical Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              System architecture.
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              How configuration state travels from cloud infrastructure to immutable audit evidence without manual intervention.
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

        {/* Compact Pipeline Flow Diagram */}
        <div className="p-5 sm:p-6 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
            {pipeline.map((stage, idx) => (
              <div
                key={stage.name}
                className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-medium">
                    0{idx + 1}
                  </div>
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {stage.name}
                  </div>
                  <div className="text-[11px] text-zinc-500 leading-tight">
                    {stage.desc}
                  </div>
                </div>
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-mono text-zinc-400 truncate">
                  {stage.tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Implementation Stack Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">
              FastAPI Core
            </div>
            <p className="text-zinc-500 leading-relaxed">
              Asynchronous REST endpoints with strict Pydantic v2 schemas and RFC-7807 error models.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">
              SQLAlchemy 2.0 ORM
            </div>
            <p className="text-zinc-500 leading-relaxed">
              Async database layer with SQLite and PostgreSQL support backed by Alembic schema migrations.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">
              Deterministic Rules
            </div>
            <p className="text-zinc-500 leading-relaxed">
              Explicit Python logic with zero probabilistic hallucination for auditable, reproducible scoring.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
});

ArchitectureSection.displayName = 'ArchitectureSection';
export default ArchitectureSection;
