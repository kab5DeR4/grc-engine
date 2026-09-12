import { useState, useMemo, memo } from 'react';
import { CheckCircle2, XCircle, Sliders } from 'lucide-react';

const RuleDifferentiator = memo(function RuleDifferentiator() {
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

  return (
    <section className="w-full py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-slate-50/60 dark:bg-[var(--ground)] border-y border-slate-200/80 dark:border-slate-800/80 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            Deterministic Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Compliance results you can explain.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Every result comes from explicit evaluation logic applied to technical evidence.
          </p>
        </div>

        {/* Clean Interactive Rule Demonstration Card */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[var(--ground)] shadow-md p-6 sm:p-8">
          
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders size={13} /> Interactive Rule Inspector
            </span>
            <span className="text-xs text-slate-400">
              SOC 2 CC6.8 &bull; Rule Assertion
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-left">
            
            {/* 1. Evidence State (Interactive Toggles) */}
            <div className="space-y-3 p-4 rounded-xl bg-[var(--surface)]/70 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">
                01 &bull; Technical Evidence
              </div>
              
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span>required_approvals:</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setApprovals(cnt)}
                        className={`px-2 py-0.5 rounded text-xs font-bold cursor-pointer border ${
                          approvals === cnt 
                            ? 'bg-slate-900 text-white dark:bg-sky-400 dark:text-slate-950 border-transparent' 
                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>block_force_pushes:</span>
                  <button
                    type="button"
                    onClick={() => setBlockForcePush(!blockForcePush)}
                    className={`px-2 py-0.5 rounded text-xs font-bold cursor-pointer border ${
                      blockForcePush
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/20 border-rose-500/40 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {blockForcePush ? 'true' : 'false'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>mfa_enforced:</span>
                  <button
                    type="button"
                    onClick={() => setMfaActive(!mfaActive)}
                    className={`px-2 py-0.5 rounded text-xs font-bold cursor-pointer border ${
                      mfaActive
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/20 border-rose-500/40 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {mfaActive ? 'true' : 'false'}
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Evaluation Rule Formula */}
            <div className="space-y-3 p-4 rounded-xl bg-[var(--surface)]/70 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">
                02 &bull; Evaluation Rule
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className={`flex items-center gap-2 ${evaluation.c1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {evaluation.c1 ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                  <span>approvals &gt;= 1</span>
                </div>
                <div className={`flex items-center gap-2 ${evaluation.c2 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {evaluation.c2 ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                  <span>force_pushes == false</span>
                </div>
                <div className={`flex items-center gap-2 ${evaluation.c3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {evaluation.c3 ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                  <span>mfa_enforced == true</span>
                </div>
              </div>
            </div>

            {/* 3. Output Verdict */}
            <div className="p-4 rounded-xl border flex flex-col justify-center items-center text-center space-y-2 font-mono"
                 style={{
                   backgroundColor: evaluation.isPass ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
                   borderColor: evaluation.isPass ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'
                 }}>
              <div className="text-xs text-slate-500 uppercase">03 &bull; Result</div>
              <div className={`text-2xl font-extrabold ${evaluation.isPass ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {evaluation.isPass ? 'PASS' : 'FAIL'}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                {evaluation.passCount} / {evaluation.totalCount} conditions satisfied
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

RuleDifferentiator.displayName = 'RuleDifferentiator';

export default RuleDifferentiator;
