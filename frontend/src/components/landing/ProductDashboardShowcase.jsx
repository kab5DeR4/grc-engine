import { memo } from 'react';
import { 
  CheckCircle2, 
  Lock,
  GitBranch,
  Database
} from 'lucide-react';

const ProductDashboardShowcase = memo(function ProductDashboardShowcase() {
  return (
    <section className="w-full py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-slate-50/60 dark:bg-[var(--ground)] border-y border-slate-200/80 dark:border-slate-800/80 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            See compliance from the system&apos;s perspective.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            A unified engineering cockpit connecting raw infrastructure state directly with audit controls.
          </p>
        </div>

        {/* Big Beautiful Product UI Mockup */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[var(--ground)] shadow-md overflow-hidden">
          
          {/* Mockup Header */}
          <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-2">
                GRC Engine // Live Posture Command Center
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-semibold">
              Live Evaluation
            </span>
          </div>

          {/* Inner UI Preview Grid */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Top Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-semibold">Overall Compliance</div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">96.8%</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <CheckCircle2 size={13} /> 200 of 206 Controls Passing
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-semibold">Sealed Evidence Logs</div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">420</div>
                <div className="text-xs text-slate-500 mt-1 font-mono">
                  SHA-256 Tamper-Proof Chain
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-semibold">Connected Sources</div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">6</div>
                <div className="text-xs text-sky-600 dark:text-sky-400 mt-1 font-medium">
                  GitHub, AWS, Okta, Kubernetes
                </div>
              </div>
            </div>

            {/* Live Controls Table Sample */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Active Canonical Security Controls</span>
                <span className="font-mono text-slate-500">Status</span>
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <GitBranch size={15} className="text-sky-500" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Production Branch Protection Enforced</div>
                      <div className="text-[11px] text-slate-500">SOC 2 CC6.8 &bull; ISO 27001 A.8.28 &bull; GitHub / main</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    PASS
                  </span>
                </div>

                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Lock size={15} className="text-emerald-500" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Hardware FIDO2 MFA Enforced on Root &amp; Admin Roles</div>
                      <div className="text-[11px] text-slate-500">SOC 2 CC6.1 &bull; CIS Control 5.2 &bull; Okta &amp; AWS IAM</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    PASS
                  </span>
                </div>

                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Database size={15} className="text-sky-500" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">S3 Cloud Storage Default KMS Encryption</div>
                      <div className="text-[11px] text-slate-500">NIST CSF PR.DS-1 &bull; CIS Control 3.3 &bull; AWS S3</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    PASS
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Short Callouts Under the Product Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1.5 text-center sm:text-left">
            <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              01 &bull; Evidence
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Technical evidence connected to controls.
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every compliance check links directly to raw JSON configuration state.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1.5 text-center sm:text-left">
            <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              02 &bull; Evaluation
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Explicit rules produce explainable results.
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Boolean logic tests assertions in code with zero guesswork.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1.5 text-center sm:text-left">
            <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              03 &bull; Posture
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Understand where the environment stands.
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Continuous benchmarks across SOC 2, ISO 27001, and NIST CSF.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
});

ProductDashboardShowcase.displayName = 'ProductDashboardShowcase';

export default ProductDashboardShowcase;
