import { memo } from 'react';
import { ArrowRight, Server, ShieldCheck, Database, Check, Cpu, Terminal, GitBranch, Cloud, FileText } from 'lucide-react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

const ArchitectureSection = memo(function ArchitectureSection() {
  return (
    <section id="architecture" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono tracking-wider uppercase text-zinc-500 font-semibold">
              System Architecture
            </div>
            <AnimatedBlurTextHeading 
              as="h2" 
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              How it works under the hood.
            </AnimatedBlurTextHeading>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A deterministic verification pipeline. No probabilistic guesses, no hallucinations—just code evaluating configuration state.
            </p>
          </div>
        </div>

        {/* Visual Pipeline Diagram */}
        <div className="relative max-w-5xl mx-auto border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950/50">
          
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 dark:divide-zinc-800">
            
            {/* Stage 1: Sources & Collection */}
            <div className="flex-1 p-8 space-y-8 bg-zinc-50/50 dark:bg-zinc-900/20">
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-orange-500 uppercase tracking-widest font-semibold">
                  01 // Input
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Telemetry Ingestion
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Read-only connectors extract live state.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                  <GitBranch size={16} className="text-zinc-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">GitHub</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                  <Cloud size={16} className="text-zinc-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">AWS / Cloud</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                  <Terminal size={16} className="text-zinc-500" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Kubernetes</span>
                </div>
              </div>
            </div>

            {/* Stage 2: Processing & Hashing */}
            <div className="flex-1 p-8 space-y-8">
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">
                  02 // Processing
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Evidence Cryptography
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Data is normalized and cryptographically sealed.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <Database size={14} />
                    <span>Key-Sorted Normalization</span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 bg-zinc-200/50 dark:bg-zinc-950/50 p-2 rounded truncate">
                    {"{ \"mfa\": true, \"user\": \"admin\" }"}
                  </div>
                </div>

                <div className="flex justify-center text-zinc-300 dark:text-zinc-700">
                   <ArrowRight size={16} className="rotate-90 lg:rotate-0" />
                </div>

                <div className="p-4 rounded-lg border border-emerald-200/50 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                    <ShieldCheck size={14} />
                    <span>SHA-256 Digest</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600/70 dark:text-emerald-500/50 bg-emerald-100/50 dark:bg-emerald-950/50 p-2 rounded truncate">
                    sha256:4f8e91c2b57...
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 3: Verification */}
            <div className="flex-1 p-8 space-y-8 bg-zinc-50/50 dark:bg-zinc-900/20">
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-orange-500 uppercase tracking-widest font-semibold">
                  03 // Evaluation
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Verification Engine
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Deterministic Python rules evaluate the sealed evidence.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-300 font-mono text-[10px] space-y-1 shadow-inner">
                  <div className="text-orange-400">def verify_mfa(payload):</div>
                  <div className="pl-4">if not payload.mfa_active:</div>
                  <div className="pl-8 text-rose-400">return FAIL</div>
                  <div className="pl-4 text-emerald-400">return PASS</div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Verified Result</div>
                    <div className="text-[10px] text-zinc-500 font-mono">Linked to Control & Hash</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Minimal Bottom Trust Note */}
        <div className="max-w-5xl mx-auto p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">Core Stack:</span>
            <span>FastAPI Python &bull; SQLAlchemy &bull; PostgreSQL</span>
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
