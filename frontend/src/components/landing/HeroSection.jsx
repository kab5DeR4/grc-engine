import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  GitBranch, 
  Lock,
  ChevronRight,
  Database
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import HeroEvidenceBackground from './HeroEvidenceBackground';

function GithubIcon({ size = 15, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const HeroSection = memo(function HeroSection() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();
  const [activeTab, setActiveTab] = useState('payload');

  const handleLaunchDemo = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  const loopSteps = [
    { label: 'Control', code: '01' },
    { label: 'Requirement', code: '02' },
    { label: 'Infrastructure', code: '03' },
    { label: 'Evidence', code: '04' },
    { label: 'Verification', code: '05' },
    { label: 'Result', code: '06' },
  ];

  return (
    <section className="relative w-full pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 font-sans">
      <HeroEvidenceBackground />

      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Top: Conceptual Workflow Loop Strip */}
        <div className="flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
            {loopSteps.map((step, idx) => (
              <div key={step.label} className="flex items-center gap-1 sm:gap-1.5">
                <span className={`${idx === 3 || idx === 4 ? 'text-orange-600 dark:text-orange-400 font-medium' : 'text-zinc-700 dark:text-zinc-300'}`}>
                  {step.label}
                </span>
                {idx < loopSteps.length - 1 && (
                  <ChevronRight size={11} className="text-zinc-400 dark:text-zinc-600 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Narrative: Headline, Plain English Subtitle, 2 Clean CTAs */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.1]">
            Compliance, grounded in verifiable evidence.
          </h1>
          
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Connect compliance controls to evidence from your infrastructure and source code. GRC Engine continuously evaluates technical state and preserves the evidence behind each result.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleLaunchDemo}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-sm transition-all border border-zinc-900 dark:border-zinc-100 active:scale-[0.98]"
            >
              <span>Launch Product Demo</span>
              <ArrowRight size={15} className="text-orange-400 dark:text-orange-600" />
            </button>

            <a
              href="https://github.com/kab5DeR4/grc-engine"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 transition-colors no-underline"
            >
              <GithubIcon size={15} />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        {/* Visual Centerpiece: ONE Strong Product Interface / Evidence Verification Visualization */}
        <div className="pt-4">
          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
            
            {/* Interface Chrome Bar */}
            <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-mono text-zinc-600 dark:text-zinc-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-zinc-900 dark:text-zinc-200 font-medium">github.com/acme/infra-core</span>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
                <span>branch: main</span>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
                <span className="text-zinc-500">read-only connector</span>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400">
                  Sample data
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                  <Check size={12} strokeWidth={3} />
                  <span>State Verified</span>
                </span>
              </div>
            </div>

            {/* Split Inspection View: Control Specification vs Cryptographic Evidence Payload */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200/80 dark:divide-zinc-800">
              
              {/* Left Column: Control Evaluation */}
              <div className="lg:col-span-5 p-5 sm:p-6 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/60">
                      CC8.1 &bull; A.8.28
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">SOC 2 / ISO 27001</span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Require pull request reviews before merging
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Source code changes to production branches must mandate at least 2 independent peer reviews with administrator bypass disabled.
                  </p>
                </div>

                {/* Verification Criteria Checklist */}
                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    Deterministic Checks
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
                      <span className="text-zinc-700 dark:text-zinc-300">required_approving_review_count &gt;= 2</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">PASS (2)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
                      <span className="text-zinc-700 dark:text-zinc-300">enforce_admins == true</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">PASS (true)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
                      <span className="text-zinc-700 dark:text-zinc-300">allow_force_pushes == false</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">PASS (false)</span>
                    </div>
                  </div>
                </div>

                {/* Verification result pill */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">Result:</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-mono font-medium">
                    <Check size={13} strokeWidth={3} />
                    <span>CONTROL SATISFIED</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Evidence Payload & Cryptographic Provenance */}
              <div className="lg:col-span-7 bg-zinc-50/50 dark:bg-zinc-900/30 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                        Raw Ingested Evidence
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        JSON
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Captured 2026-09-13 14:32:00 UTC
                    </span>
                  </div>

                  {/* Code snippet showing real JSON evidence */}
                  <div className="p-3.5 rounded-lg bg-zinc-900 text-zinc-200 font-mono text-xs leading-relaxed overflow-x-auto border border-zinc-800">
                    <pre className="text-zinc-300">{`{
  "resource": "github.branch.production_main",
  "enforce_admins": true,
  "required_approving_review_count": 2,
  "dismiss_stale_reviews": true,
  "allow_force_pushes": false,
  "require_linear_history": true,
  "collector_version": "v1.0.0"
}`}</pre>
                  </div>
                </div>

                {/* Provenance and cryptographic hash seal */}
                <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                    <span className="text-zinc-500">Evidence SHA-256 Digest:</span>
                    <span className="text-zinc-800 dark:text-zinc-300 select-all font-mono">
                      sha256:7f3b890a5d4e12c8...21e8
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
                    <span>Provenance: Read-only API Polling</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Tamper Seal Intact
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;
