import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
  GitBranch,
  Database,
  Terminal,
  Copy,
  Check,
  Search,
  Activity,
  Server,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

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

// principal design systems polish: breathing room & restrained tokens
const HeroSection = memo(function HeroSection() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLaunch = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  const cliCommand = "npx @grc-engine/cli@latest init";

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full pt-10 sm:pt-14 pb-6 sm:pb-10 px-4 sm:px-6 md:px-8 font-sans overflow-hidden bg-[var(--ground)]">
      
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Top Status & Telemetry Belt (Restrained Neutral Tokens) */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 px-3 rounded-lg bg-[var(--surface)] border border-[var(--hairline)] text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2.5 text-[var(--ink-secondary)]">
            <span className="flex items-center gap-1.5 text-[var(--ink)] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>API: OPERATIONAL</span>
            </span>
            <span className="text-[var(--hairline)]">|</span>
            <span className="flex items-center gap-1 text-[var(--ink-muted)] text-[11px]">
              <Server size={12} />
              <span>ENGINE: v4.2.1-RELEASE</span>
            </span>
            <span className="hidden sm:inline text-[var(--hairline)]">|</span>
            <span className="hidden sm:flex items-center gap-1 text-[var(--ink-muted)] text-[11px]">
              <Activity size={12} />
              <span>EVALUATION: &lt;12ms</span>
            </span>
            <span className="hidden md:inline text-[var(--hairline)]">|</span>
            <span className="hidden md:inline px-1.5 py-0.5 rounded bg-[var(--surface-raised)] border border-[var(--hairline)] text-[10px] text-[var(--ink-secondary)]">
              OPA REGO v0.62
            </span>
          </div>

          <div className="flex items-center gap-2 text-[var(--ink-muted)] text-[11px]">
            <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded bg-[var(--surface-raised)] border border-[var(--hairline)]">
              SOC 2 &bull; ISO 27001
            </span>
            <a
              href="https://github.com/kab5DeR4/grc-engine"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--ink)] transition-colors flex items-center gap-1 text-decoration-none font-medium"
            >
              <GithubIcon size={13} />
              <span>v1.4.0</span>
            </a>
          </div>
        </div>

        {/* Asymmetric 60/40 Split Grid: First line of H1 aligned precisely with Right Card Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-1">
          
          {/* Left Column (60% width): Starts flush at the top with H1 baseline alignment */}
          <div className="lg:col-span-7 space-y-3.5 text-left">
            
            {/* Primary Headline: Focused Bright Accent on Key Words */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold text-[var(--ink)] tracking-tight sm:tracking-tighter leading-[1.08] m-0">
              Compliance, grounded in <span className="text-sky-500 dark:text-sky-400">verifiable evidence</span>.
            </h1>

            {/* Concise Technical Subtext */}
            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] max-w-xl leading-relaxed font-normal">
              Continuous control mapping, automated evidence generation, and zero-drift policy evaluation built directly into your infrastructure pipeline.
            </p>

            {/* Dense Enterprise Action Block: Increased Breathing Room & High-Contrast Secondary */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 sm:pt-4">
              
              {/* Dense Primary CTA Button */}
              <button
                type="button"
                onClick={handleLaunch}
                className="px-4 py-2 rounded-lg bg-[var(--ink)] hover:opacity-90 text-[var(--ground)] font-bold text-xs transition-all duration-150 active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer border-none shadow-sm shrink-0"
              >
                <span>Launch Posture Deck</span>
                <ArrowRight size={14} />
              </button>

              {/* Secondary Micro-Action Pill: High-Contrast Primary Text Inheritance */}
              <button
                type="button"
                onClick={handleLaunch}
                className="px-3.5 py-2 rounded-lg bg-[var(--surface-raised)] hover:bg-[var(--surface)] text-[var(--ink)] font-bold border border-[var(--hairline)] text-xs font-mono transition-all duration-150 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <Sparkles size={13} className="text-sky-500" />
                <span>Simulate Telemetry</span>
              </button>

              {/* Secondary Micro-Action: GitHub Link */}
              <a
                href="https://github.com/kab5DeR4/grc-engine"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--ink)] font-semibold border border-[var(--hairline)] text-xs font-mono transition-all duration-150 active:scale-[0.97] text-decoration-none flex items-center justify-center gap-1.5 shrink-0"
              >
                <GithubIcon size={13} />
                <span>Source</span>
                <ExternalLink size={10} className="opacity-60" />
              </a>
            </div>

            {/* Inline Copyable CLI Command Bar */}
            <div className="flex items-center justify-between bg-[var(--surface)] border border-[var(--hairline)] rounded-lg px-3 py-1.5 font-mono text-xs shadow-xs max-w-lg">
              <div className="flex items-center gap-2 text-[var(--ink-secondary)] truncate">
                <Terminal size={12} className="text-[var(--ink-muted)] shrink-0" />
                <span className="text-[var(--ink-muted)] select-none text-[11px]">$</span>
                <span className="text-[var(--ink)] font-medium truncate text-[11px]">{cliCommand}</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="ml-2 px-1.5 py-0.5 rounded hover:bg-[var(--surface-raised)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors border-none bg-transparent cursor-pointer shrink-0 flex items-center gap-1 text-[10px]"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={11} className="text-emerald-500" />
                    <span className="text-emerald-500 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Micro-Trust Ecosystem Tag Strip */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[var(--ink-muted)] pt-0.5">
              <span className="text-[var(--ink-secondary)] font-semibold flex items-center gap-1">
                <Layers size={11} />
                <span>ECOSYSTEM:</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--hairline)]">AWS KMS</span>
              <span className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--hairline)]">Kubernetes</span>
              <span className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--hairline)]">GitHub</span>
              <span className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--hairline)]">Okta</span>
            </div>

          </div>

          {/* Right Column (40% width): Interactive Telemetry Preview */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[var(--surface)] border border-[var(--hairline)] rounded-xl shadow-sm overflow-hidden">
              
              {/* Window Top Bar */}
              <div className="flex items-center justify-between gap-2 p-2 px-3 border-b border-[var(--hairline)] bg-[var(--surface-raised)]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[var(--ink-muted)]" />
                  <span className="text-[10px] font-mono font-bold text-[var(--ink)] tracking-wider">
                    POSTURE INTELLIGENCE
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded bg-[var(--pass-surface)] text-emerald-500 text-[9px] font-mono font-bold border border-emerald-500/20">
                    LIVE SYNC
                  </span>
                  <span className="text-[9px] font-mono text-[var(--ink-muted)]">
                    6 SOURCES
                  </span>
                </div>
              </div>

              {/* Quick Search Filter Bar */}
              <div className="p-1.5 px-2.5 border-b border-[var(--hairline)] bg-[var(--surface)]">
                <div className="relative">
                  <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter controls or cloud resources..."
                    className="w-full bg-[var(--ground)] border border-[var(--hairline)] rounded-md pl-6 pr-2.5 py-0.5 text-[10px] text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none focus:border-[var(--ink-muted)] transition-colors font-mono"
                  />
                </div>
              </div>

              {/* 4-Metric Monospace Data Strip */}
              <div className="grid grid-cols-2 gap-px bg-[var(--hairline)]">
                <div className="p-2 bg-[var(--surface)] space-y-0.5">
                  <div className="text-[8.5px] font-mono text-[var(--ink-muted)] uppercase tracking-wider">Compliance Score</div>
                  <div className="text-base font-extrabold text-emerald-500 font-mono tabular-nums leading-none">96.8%</div>
                  <div className="text-[9.5px] text-[var(--ink-secondary)] flex items-center gap-1 pt-0.5">
                    <CheckCircle2 size={10} className="text-emerald-500 shrink-0" />
                    <span className="tabular-nums font-mono">200 / 206 Controls</span>
                  </div>
                </div>

                <div className="p-2 bg-[var(--surface)] space-y-0.5">
                  <div className="text-[8.5px] font-mono text-[var(--ink-muted)] uppercase tracking-wider">Audit Records</div>
                  <div className="text-base font-extrabold text-[var(--ink)] font-mono tabular-nums leading-none">420 Proofs</div>
                  <div className="text-[9.5px] text-[var(--ink-secondary)] truncate font-mono pt-0.5">
                    SHA-256 Attested
                  </div>
                </div>

                <div className="p-2 bg-[var(--surface)] space-y-0.5">
                  <div className="text-[8.5px] font-mono text-[var(--ink-muted)] uppercase tracking-wider">Active Risk</div>
                  <div className="text-base font-extrabold text-[var(--ink)] font-mono tabular-nums leading-none">0 Critical</div>
                  <div className="text-[9.5px] text-emerald-500 font-mono flex items-center gap-1 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Zero High-Risk Drift</span>
                  </div>
                </div>

                <div className="p-2 bg-[var(--surface)] space-y-0.5">
                  <div className="text-[8.5px] font-mono text-[var(--ink-muted)] uppercase tracking-wider">Monitored Assets</div>
                  <div className="text-base font-extrabold text-[var(--ink)] font-mono tabular-nums leading-none">1,482 Nodes</div>
                  <div className="text-[9.5px] text-[var(--ink-secondary)] font-mono truncate pt-0.5">
                    AWS &bull; K8s &bull; GitHub
                  </div>
                </div>
              </div>

              {/* Active Control Assertions Stream */}
              <div className="p-2 space-y-1">
                <div className="flex items-center justify-between text-[8.5px] font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider px-0.5">
                  <span>ACTIVE ASSERTIONS</span>
                  <span>STATUS</span>
                </div>

                {/* Row 1 */}
                <div className="p-1.5 rounded-md bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 rounded bg-[var(--surface)] text-[var(--ink)] border border-[var(--hairline)] flex items-center justify-center shrink-0">
                      <GitBranch size={11} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[var(--ink)] truncate text-[10.5px]">
                        Branch Protection &amp; 2 Approvals
                      </div>
                      <div className="text-[9px] text-[var(--ink-muted)] font-mono truncate">
                        SOC 2 CC6.8 &bull; GitHub main
                      </div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-[8.5px] font-bold font-mono shrink-0 border border-emerald-500/20">
                    PASS
                  </span>
                </div>

                {/* Row 2 */}
                <div className="p-1.5 rounded-md bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 rounded bg-[var(--surface)] text-[var(--ink)] border border-[var(--hairline)] flex items-center justify-center shrink-0">
                      <Lock size={11} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[var(--ink)] truncate text-[10.5px]">
                        Hardware FIDO2 MFA Enforced
                      </div>
                      <div className="text-[9px] text-[var(--ink-muted)] font-mono truncate">
                        ISO 27001 A.5.15 &bull; 142/142
                      </div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-[8.5px] font-bold font-mono shrink-0 border border-emerald-500/20">
                    PASS
                  </span>
                </div>

                {/* Row 3 */}
                <div className="p-1.5 rounded-md bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 rounded bg-[var(--surface)] text-[var(--ink)] border border-[var(--hairline)] flex items-center justify-center shrink-0">
                      <Database size={11} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[var(--ink)] truncate text-[10.5px]">
                        S3 Bucket KMS AES-256 Encryption
                      </div>
                      <div className="text-[9px] text-[var(--ink-muted)] font-mono truncate">
                        NIST CSF PR.DS-1 &bull; AWS KMS
                      </div>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-[8.5px] font-bold font-mono shrink-0 border border-emerald-500/20">
                    PASS
                  </span>
                </div>
              </div>

              {/* Footer Bar */}
              <div className="px-2.5 py-1.5 border-t border-[var(--hairline)] bg-[var(--surface-raised)] flex items-center justify-between text-[9.5px] text-[var(--ink-muted)]">
                <span className="flex items-center gap-1 text-[var(--ink-secondary)]">
                  <Cpu size={10} className="text-emerald-500" />
                  <span>Deterministic Assertion Engine</span>
                </span>
                <span className="font-mono text-[8.5px]">
                  0 DRIFT DETECTED
                </span>
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
