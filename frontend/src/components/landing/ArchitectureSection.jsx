import { memo } from 'react';
import { ArrowRight, Server, ShieldCheck, Cpu, Database, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

const ArchitectureSection = memo(function ArchitectureSection() {
  const steps = [
    {
      num: '01',
      title: 'Direct Telemetry Ingestion',
      badge: 'Zero Agents',
      description: 'Connects directly to GitHub and AWS using read-only APIs. No background daemons or agent sidecars to install or maintain.',
      features: ['GitHub branch protection & PR checks', 'AWS IAM, S3 KMS & CloudTrail status', 'Zero production modification']
    },
    {
      num: '02',
      title: 'Cryptographic Proof Vault',
      badge: 'Tamper-Evident',
      description: 'Every captured configuration is hashed into a SHA-256 cryptographic digest so auditors can verify nothing was doctored.',
      features: ['SHA-256 key-sorted JSON hashing', 'Auditor-verifiable evidence ledger', 'Immutable timestamped snapshots']
    },
    {
      num: '03',
      title: 'Deterministic Rule Engine',
      badge: 'Zero Hallucination',
      description: 'Evaluates compliance strictly through deterministic Python code. AI is never trusted to make pass or fail audit decisions.',
      features: ['SOC 2, ISO 27001 & NIST mapping', 'Exact pass/fail verification', 'Continuous drift detection']
    }
  ];

  return (
    <section id="architecture" className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="text-[11px] font-mono tracking-wider uppercase text-orange-600 dark:text-orange-400 font-medium">
              Architecture &amp; Philosophy
            </div>
            <AnimatedBlurTextHeading 
              as="h2" 
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              How it works under the hood.
            </AnimatedBlurTextHeading>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Three simple, independent layers designed so compliance is proven by code, not human paperwork or AI guesses.
            </p>
          </div>

          <Link
            to="/architecture"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors no-underline"
          >
            <span>Full technical spec</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 3 Clear Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">
                    Step {step.num}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bullet points that quickly convey value */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                {step.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                    <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Bottom Trust Note */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">Core Stack:</span>
            <span>FastAPI Python 3.11 &bull; SQLAlchemy 2.0 &bull; PostgreSQL / SQLite</span>
          </div>
          <div className="text-zinc-400 text-[11px]">
            100% Deterministic &bull; Zero Prompt Injections
          </div>
        </div>

      </div>
    </section>
  );
});

ArchitectureSection.displayName = 'ArchitectureSection';
export default ArchitectureSection;
