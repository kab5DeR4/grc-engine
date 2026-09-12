import { useState, useMemo, memo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DeterministicEvaluationSection = memo(function DeterministicEvaluationSection() {
  // Interactive sandbox state for testing rule evaluation live
  const [enforceAdmins, setEnforceAdmins] = useState(true);
  const [prApprovals, setPrApprovals] = useState(2);
  const [allowForcePushes, setAllowForcePushes] = useState(false);
  const [mfaEnforced, setMfaEnforced] = useState(true);

  // Deterministic rule evaluation calculation
  const evaluationResult = useMemo(() => {
    const adminPass = enforceAdmins === true;
    const approvalPass = prApprovals >= 1;
    const forcePushPass = allowForcePushes === false;
    const mfaPass = mfaEnforced === true;

    const allPassed = adminPass && approvalPass && forcePushPass && mfaPass;

    let failedReasons = [];
    if (!adminPass) failedReasons.push('Admin enforcement disabled (enforce_admins == false)');
    if (!approvalPass) failedReasons.push('Insufficient approving reviews (required >= 1, actual = 0)');
    if (!forcePushPass) failedReasons.push('Force pushes permitted on protected branch');
    if (!mfaPass) failedReasons.push('Root MFA or hardware key missing');

    return {
      status: allPassed ? 'PASS' : 'FAIL',
      score: allPassed ? 100 : Math.round(((adminPass ? 1 : 0) + (approvalPass ? 1 : 0) + (forcePushPass ? 1 : 0) + (mfaPass ? 1 : 0)) / 4 * 100),
      reasons: failedReasons.length === 0 ? ['All deterministic rule constraints satisfied in technical evidence payload.'] : failedReasons,
      ruleId: 'RULE-SEC-BRANCH-042',
      sha256: allPassed 
        ? '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069' 
        : 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    };
  }, [enforceAdmins, prApprovals, allowForcePushes, mfaEnforced]);

  return (
    <section id="deterministic" className="w-full bg-slate-50 dark:bg-[var(--ground)] py-18 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-200 dark:border-slate-800 font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono font-bold tracking-wider text-sky-600 dark:text-sky-400 uppercase mb-2">
            Deterministic Rule Architecture
          </div>
          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] font-serif mb-4">
            Compliance decisions should be <span className="italic font-normal text-sky-600 dark:text-sky-400">explainable</span>, not probabilistic.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Auditors and security leads do not accept black-box answers. GRC Engine uses deterministic rule logic. Every compliance verdict is an explicit boolean or threshold evaluation against verifiable technical evidence.
          </p>
        </div>

        {/* Interactive Live Rule Sandbox */}
        <div className="bg-[var(--ground)] border border-slate-300 dark:border-slate-700/80 rounded-xl p-6 sm:p-8 md:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            
            {/* Left Column: Interactive State Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase mb-1.5">
                  <Sliders size={14} />
                  <span>Interactive Parameter Sandbox</span>
                </div>
                <h3 className="text-[20px] font-bold text-slate-900 dark:text-slate-100 font-serif">
                  Test Rule Logic Live
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Toggle the configuration variables below to see the deterministic evaluator compute verdicts instantaneously.
                </p>
              </div>

              {/* Toggles List */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* Toggle 1: Enforce Admins */}
                <div className="p-3 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">enforce_admins</div>
                    <div className="text-[10.5px] text-slate-500">Apply rules to repo administrators</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnforceAdmins(!enforceAdmins)}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer border ${
                      enforceAdmins 
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {enforceAdmins ? 'TRUE' : 'FALSE'}
                  </button>
                </div>

                {/* Toggle 2: Approving Reviewers Count */}
                <div className="p-3 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">required_approvals</div>
                    <div className="text-[10.5px] text-slate-500">Min PR reviews before merge (req &gt;= 1)</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setPrApprovals(cnt)}
                        className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors cursor-pointer border ${
                          prApprovals === cnt
                            ? 'bg-slate-900 text-white dark:bg-sky-400 dark:text-slate-950 border-transparent shadow-xs'
                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle 3: Force Pushes */}
                <div className="p-3 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">allow_force_pushes</div>
                    <div className="text-[10.5px] text-slate-500">Permit force pushing to production</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAllowForcePushes(!allowForcePushes)}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer border ${
                      !allowForcePushes 
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {allowForcePushes ? 'ALLOWED' : 'BLOCKED'}
                  </button>
                </div>

                {/* Toggle 4: MFA Enforced */}
                <div className="p-3 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">mfa_hardware_enforced</div>
                    <div className="text-[10.5px] text-slate-500">FIDO2 WebAuthn requirement</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMfaEnforced(!mfaEnforced)}
                    className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer border ${
                      mfaEnforced 
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {mfaEnforced ? 'ENFORCED' : 'OPTIONAL'}
                  </button>
                </div>

              </div>

              <div className="pt-2">
                <Link
                  to="/controls"
                  className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 text-decoration-none"
                >
                  <span>Explore all 200+ canonical control rules →</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Execution Output & Verdict Ledger */}
            <div className="lg:col-span-7 space-y-4 font-mono text-xs">
              
              {/* Verdict Header Banner */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                evaluationResult.status === 'PASS'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-rose-300'
              }`}>
                <div className="flex items-center gap-3">
                  {evaluationResult.status === 'PASS' ? (
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle size={20} className="text-rose-500 shrink-0" />
                  )}
                  <div>
                    <div className="font-bold text-sm">
                      DETERMINISTIC VERDICT: [{evaluationResult.status}]
                    </div>
                    <div className="text-[11px] opacity-80">
                      Rule ID: {evaluationResult.ruleId} • Compliance Score: {evaluationResult.score}%
                    </div>
                  </div>
                </div>
                <span className="text-[10.5px] font-bold px-2 py-1 rounded bg-white/60 dark:bg-slate-900/60 uppercase">
                  Zero Hallucinations
                </span>
              </div>

              {/* Code Engine Logic Box */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-slate-300">
                    <Terminal size={13} className="text-sky-400" />
                    RULE EXECUTION LOGIC
                  </span>
                  <span>Deterministic Engine v2.4</span>
                </div>
                <pre className="p-4 text-slate-200 text-xs overflow-x-auto leading-relaxed">
{`// Evaluated Assertion
const isCompliant = (
  payload.enforce_admins === ${enforceAdmins} &&
  payload.required_approvals (${prApprovals}) >= 1 &&
  payload.allow_force_pushes (${allowForcePushes}) === false &&
  payload.mfa_enforced (${mfaEnforced}) === true
);

// Verdict: ${evaluationResult.status} (Calculated in 1.2ms)`}
                </pre>
              </div>

              {/* Audit Reasoning Box */}
              <div className="p-4 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-500 uppercase font-bold">
                  Auditor-Verifiable Reasoning Chain
                </div>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-xs list-disc pl-4">
                  {evaluationResult.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Cryptographic Proof Footer */}
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between gap-3">
                <span className="truncate">Evidence Hash: <span className="text-sky-600 dark:text-sky-400">{evaluationResult.sha256}</span></span>
                <span className="shrink-0 font-bold text-emerald-600 dark:text-emerald-400">SEALED</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

DeterministicEvaluationSection.displayName = 'DeterministicEvaluationSection';

export default DeterministicEvaluationSection;
