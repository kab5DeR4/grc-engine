import { useState, useMemo, memo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Database, 
  ShieldCheck, 
  Search, 
  Cpu, 
  FileCheck2,
  Lock,
  GitBranch,
  Shield,
  Terminal
} from 'lucide-react';

// design token aligned architecture flow (supports light/dark theme)
const ProductFlowSection = memo(function ProductFlowSection() {
  const [approvals, setApprovals] = useState(2);
  const [blockForcePush, setBlockForcePush] = useState(true);
  const [mfaActive, setMfaActive] = useState(true);

  const evaluation = useMemo(() => {
    const c1 = approvals >= 1;
    const c2 = blockForcePush === true;
    const c3 = mfaActive === true;
    const passCount = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0);
    const isPass = passCount === 3;

    return {
      isPass,
      passCount,
      totalCount: 3,
      c1,
      c2,
      c3
    };
  }, [approvals, blockForcePush, mfaActive]);

  const stages = [
    { num: '01', name: 'Connect', desc: 'Read-only APIs for GitHub, AWS, and Okta', icon: Search },
    { num: '02', name: 'Discover', desc: 'Continuous ingestion of cloud configurations', icon: Database },
    { num: '03', name: 'Evaluate', desc: 'Real-time automated control evaluation', icon: Cpu },
    { num: '04', name: 'Verify', desc: 'Tamper-proof evidence attestation', icon: ShieldCheck },
    { num: '05', name: 'Report', desc: 'Instant auditor-ready compliance packages', icon: FileCheck2 },
  ];

  return (
    <section id="how-it-works" className="w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8 bg-[var(--ground)] text-[var(--ink)] border-y border-[var(--hairline)] font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            <Cpu size={13} />
            <span>ENGINE ARCHITECTURE &amp; EVALUATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight sm:tracking-tighter leading-tight">
            From infrastructure to audit evidence in minutes.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed font-normal">
            A continuous 5-step pipeline that turns raw cloud telemetry into verified, auditor-ready proofs.
          </p>
        </div>

        {/* 5-Stage Stepper Bento Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div 
                key={stage.num}
                className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--hairline)] shadow-xs space-y-1.5 relative transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono font-semibold text-sky-500 tabular-nums">
                    STAGE {stage.num}
                  </span>
                  <Icon size={14} className="text-[var(--ink-muted)]" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-[var(--ink)]">
                  {stage.name}
                </div>
                <div className="text-[11px] text-[var(--ink-muted)] leading-snug">
                  {stage.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Policy Enforcement Console Deck */}
        <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface)] shadow-sm p-5 sm:p-6 md:p-8 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--hairline)] gap-2 font-mono">
            <div>
              <div className="text-[10px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal size={12} className="text-sky-500" />
                <span>OPA REGO POLICY EVALUATION CONSOLE</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] font-sans mt-0.5">
                Compliance outcomes you can explain &amp; verify.
              </h3>
            </div>
            <span className="text-[10px] text-[var(--ink-muted)] self-start sm:self-auto px-2.5 py-1 rounded bg-[var(--surface-raised)] border border-[var(--hairline)]">
              CONTROL: SOC 2 CC6.8 &bull; ISO 27001 A.8.28
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Left: Interactive Infrastructure State Controls */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-[var(--surface-raised)] border border-[var(--hairline)] space-y-3.5 flex flex-col justify-between font-mono">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)] uppercase">
                <span>01 &bull; Live Infrastructure State</span>
                <span className="text-[10px] text-[var(--ink-muted)] font-normal">Toggle state</span>
              </div>
              
              <div className="space-y-2.5 text-xs">
                {/* Pull Request Approvals Toggle */}
                <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--hairline)] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <GitBranch size={14} className="text-sky-500 shrink-0" />
                    <span className="font-medium text-[var(--ink)] text-[11px] sm:text-xs font-sans">Required PR Approvals</span>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {[0, 1, 2].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setApprovals(cnt)}
                        className={`w-6 h-6 rounded text-xs font-bold font-mono transition-all cursor-pointer border tabular-nums ${
                          approvals === cnt 
                            ? 'bg-[var(--ink)] text-[var(--ground)] border-transparent shadow-xs' 
                            : 'bg-[var(--surface-raised)] border-[var(--hairline)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Force Push Block Toggle */}
                <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--hairline)] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-sky-500 shrink-0" />
                    <span className="font-medium text-[var(--ink)] text-[11px] sm:text-xs font-sans">Block Force Pushes</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBlockForcePush(!blockForcePush)}
                    className={`px-2.5 py-0.5 rounded text-[10.5px] font-bold font-mono transition-all cursor-pointer border ${
                      blockForcePush
                        ? 'bg-[var(--pass-surface)] border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-[var(--fail-surface)] border-rose-500/30 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {blockForcePush ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                {/* Hardware MFA Toggle */}
                <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--hairline)] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-sky-500 shrink-0" />
                    <span className="font-medium text-[var(--ink)] text-[11px] sm:text-xs font-sans">Enforce FIDO2 MFA</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMfaActive(!mfaActive)}
                    className={`px-2.5 py-0.5 rounded text-[10.5px] font-bold font-mono transition-all cursor-pointer border ${
                      mfaActive
                        ? 'bg-[var(--pass-surface)] border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-[var(--fail-surface)] border-rose-500/30 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {mfaActive ? 'ACTIVE' : 'INACTIVE'}
                  </button>
                </div>
              </div>

              <div className="text-[10px] text-[var(--ink-muted)] pt-1 font-sans">
                Toggle configuration settings above to simulate live continuous policy checks.
              </div>
            </div>

            {/* Right: Automated Policy Verdict & Human-Readable Assertion Proof */}
            <div className="lg:col-span-7 space-y-3.5 flex flex-col justify-between font-mono">
              
              {/* Verdict Banner */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                evaluation.isPass 
                  ? 'bg-[var(--pass-surface)] border-emerald-500/30 text-emerald-700 dark:text-emerald-300' 
                  : 'bg-[var(--fail-surface)] border-rose-500/30 text-rose-700 dark:text-rose-300'
              }`}>
                <div className="flex items-center gap-3">
                  {evaluation.isPass ? (
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle size={20} className="text-rose-500 shrink-0" />
                  )}
                  <div>
                    <div className="font-bold text-xs sm:text-sm">
                      EVALUATION VERDICT: [{evaluation.isPass ? 'COMPLIANT' : 'NON-COMPLIANT DRIFT'}]
                    </div>
                    <div className="text-[10.5px] opacity-80 pt-0.5 tabular-nums font-mono">
                      {evaluation.passCount} of {evaluation.totalCount} required infrastructure security assertions satisfied
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${
                  evaluation.isPass ? 'bg-[var(--surface)] border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-[var(--surface)] border-rose-500/30 text-rose-600 dark:text-rose-400'
                }`}>
                  {evaluation.isPass ? 'PASS' : 'FAIL'}
                </span>
              </div>

              {/* Evaluated Human-Readable Rules List with Tabular Indicators */}
              <div className="p-3.5 rounded-xl bg-[var(--surface-raised)] border border-[var(--hairline)] space-y-2 text-xs">
                <div className="font-bold text-[var(--ink)] pb-1 border-b border-[var(--hairline)] flex items-center justify-between text-[10px]">
                  <span>02 &bull; Active Policy Assertions</span>
                  <span className="text-[var(--ink-muted)]">LATENCY: &lt;4ms</span>
                </div>
                
                <div className="space-y-1.5 pt-0.5">
                  {/* Rule 1 */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded bg-[var(--surface)] border border-[var(--hairline)]">
                    <div className="flex items-center gap-2 min-w-0">
                      {evaluation.c1 ? (
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle size={13} className="text-rose-500 shrink-0" />
                      )}
                      <span className="text-[11px] sm:text-xs text-[var(--ink)] font-sans truncate">
                        PR Approvals: Min 1 reviewer (Active: <span className="font-mono tabular-nums">{approvals}</span>)
                      </span>
                    </div>
                    <span className={`text-[9.5px] font-bold font-mono px-1.5 py-0.2 rounded shrink-0 ${evaluation.c1 ? 'bg-[var(--pass-surface)] text-emerald-600 dark:text-emerald-400' : 'bg-[var(--fail-surface)] text-rose-600 dark:text-rose-400'}`}>
                      {evaluation.c1 ? 'SATISFIED' : 'FAILED'}
                    </span>
                  </div>

                  {/* Rule 2 */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded bg-[var(--surface)] border border-[var(--hairline)]">
                    <div className="flex items-center gap-2 min-w-0">
                      {evaluation.c2 ? (
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle size={13} className="text-rose-500 shrink-0" />
                      )}
                      <span className="text-[11px] sm:text-xs text-[var(--ink)] font-sans truncate">
                        Branch Protection: Direct force pushes prohibited on main
                      </span>
                    </div>
                    <span className={`text-[9.5px] font-bold font-mono px-1.5 py-0.2 rounded shrink-0 ${evaluation.c2 ? 'bg-[var(--pass-surface)] text-emerald-600 dark:text-emerald-400' : 'bg-[var(--fail-surface)] text-rose-600 dark:text-rose-400'}`}>
                      {evaluation.c2 ? 'SATISFIED' : 'FAILED'}
                    </span>
                  </div>

                  {/* Rule 3 */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded bg-[var(--surface)] border border-[var(--hairline)]">
                    <div className="flex items-center gap-2 min-w-0">
                      {evaluation.c3 ? (
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle size={13} className="text-rose-500 shrink-0" />
                      )}
                      <span className="text-[11px] sm:text-xs text-[var(--ink)] font-sans truncate">
                        Identity Security: Hardware FIDO2 MFA active for all admins
                      </span>
                    </div>
                    <span className={`text-[9.5px] font-bold font-mono px-1.5 py-0.2 rounded shrink-0 ${evaluation.c3 ? 'bg-[var(--pass-surface)] text-emerald-600 dark:text-emerald-400' : 'bg-[var(--fail-surface)] text-rose-600 dark:text-rose-400'}`}>
                      {evaluation.c3 ? 'SATISFIED' : 'FAILED'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="p-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--hairline)] text-xs text-[var(--ink-muted)] flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10.5px]">
                  <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                  <span className="font-sans">Continuous Policy Evaluation &bull; SOC 2 CC6.8 Compliant</span>
                </span>
                <span className="font-mono text-[9.5px] text-sky-500 font-bold shrink-0">
                  VERIFIED AT CAPTURE
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

ProductFlowSection.displayName = 'ProductFlowSection';

export default ProductFlowSection;
