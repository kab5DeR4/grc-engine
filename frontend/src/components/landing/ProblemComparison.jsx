import { memo } from 'react';
import { X, Check, ArrowRight, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

// clean border-based comparison without pastel color blocks
const ProblemComparison = memo(function ProblemComparison() {
  const traditional = [
    { title: 'Manual Evidence Collection', desc: 'Engineers spend weeks gathering point-in-time console screenshots and system logs.' },
    { title: 'Static Spreadsheet Trackers', desc: 'Outdated trackers and email questionnaires that decay the day after an audit completes.' },
    { title: 'Point-in-Time Blindspots', desc: 'Annual subjective binders that prove zero operational compliance about current state.' },
    { title: 'Audit Fire Drill Panic', desc: 'High-stress scrambles across teams when external auditors request fresh proofs.' },
    { title: 'Self-Attestation Exposure', desc: 'Unverified documentation and unproven manual assertions vulnerable to audit findings.' },
  ];

  const grcEngine = [
    { title: 'Continuous Automated Evidence', desc: 'Connectors stream live configuration telemetry directly from active cloud APIs.' },
    { title: 'Canonical Control Mapping', desc: 'Single technical evidence stream maps across SOC 2, ISO 27001, and NIST CSF.' },
    { title: 'Deterministic Assertion Logic', desc: 'Explicit code rules and OPA Rego evaluate policy with 100% explainability.' },
    { title: '365-Day Audit-Ready Posture', desc: 'Always-current posture telemetry and instant drift alerts with zero fire drills.' },
    { title: 'Cryptographic Proof Vault', desc: 'Tamper-evident SHA-256 immutable hashes ensure verifiable authenticity.' },
  ];

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8 font-sans bg-[var(--ground)]">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            <ShieldCheck size={13} />
            <span>THE PARADIGM SHIFT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight sm:tracking-tighter leading-tight">
            Stop chasing compliance evidence across spreadsheets.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed font-normal">
            Your infrastructure already contains the truth. GRC Engine connects to active systems, maps controls automatically, and keeps audit proof continuously current.
          </p>
        </div>

        {/* Border-Based Structural Split (Neutral Canvas, 1px Neutral Divider) */}
        <div className="border border-[var(--hairline)] rounded-xl bg-[var(--surface)] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--hairline)]">
          
          {/* Left: Traditional Compliance (Neutral Surface) */}
          <div className="p-5 sm:p-6 space-y-4 flex flex-col justify-between bg-[var(--surface)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={15} className="text-rose-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                    TRADITIONAL GRC
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--surface-raised)] text-[var(--ink-muted)] border border-[var(--hairline)]">
                  MANUAL &amp; STALE
                </span>
              </div>

              <div className="space-y-3">
                {traditional.map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded bg-[var(--surface-raised)] border border-[var(--hairline)] text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={11} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--ink)]">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[var(--ink-muted)] leading-relaxed mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--hairline)] text-[10px] font-mono text-[var(--ink-muted)]">
              OUTCOME: Compliance disconnected from technical reality.
            </div>
          </div>

          {/* Right: GRC Engine (Neutral Surface) */}
          <div className="p-5 sm:p-6 space-y-4 flex flex-col justify-between bg-[var(--surface)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-emerald-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                    GRC ENGINE (INFRASTRUCTURE-NATIVE)
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--pass-surface)] text-emerald-500 border border-emerald-500/20">
                  CONTINUOUS &amp; VERIFIED
                </span>
              </div>

              <div className="space-y-3">
                {grcEngine.map((item) => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded bg-[var(--surface-raised)] border border-[var(--hairline)] text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--ink)]">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[var(--ink-secondary)] leading-relaxed mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--hairline)] flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                OUTCOME: Real-time engineering evidence ready for audit anytime.
              </span>
              <Link
                to="/controls"
                className="text-[11px] font-bold font-mono text-sky-500 hover:underline flex items-center gap-1 text-decoration-none"
              >
                <span>Controls</span>
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

ProblemComparison.displayName = 'ProblemComparison';

export default ProblemComparison;
