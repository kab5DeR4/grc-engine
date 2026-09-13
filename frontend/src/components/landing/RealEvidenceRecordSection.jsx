import { memo } from 'react';
import { Check, ShieldCheck } from 'lucide-react';

const RealEvidenceRecordSection = memo(function RealEvidenceRecordSection() {
  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 font-sans bg-zinc-50/50 dark:bg-zinc-950/50 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-left space-y-2">
          <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
            Audit Provenance
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            What verifiable evidence actually looks like.
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Not a screenshot or manual checkbox. Every finding is anchored in a cryptographically hashed, timestamped technical record.
          </p>
        </div>

        {/* Real Technical Record Layout */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden font-mono text-xs">
          
          {/* Record Header Bar */}
          <div className="px-5 py-3 bg-zinc-50 dark:bg-zinc-900/90 border-b border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                EVIDENCE RECORD // EVD-2026-IAM-0914
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400">
                Sample record
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 font-medium text-[11px]">
                PASS
              </span>
            </div>
          </div>

          {/* Record Fields & Body */}
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Control Requirement Block */}
            <div className="space-y-1.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="text-[10px] uppercase text-zinc-400 tracking-wider">
                Control Requirement
              </div>
              <div className="text-sm font-sans font-semibold text-zinc-900 dark:text-zinc-100">
                MFA is required for privileged access.
              </div>
              <div className="text-zinc-500 font-sans text-xs">
                Mapped to: SOC 2 CC6.1 &bull; ISO 27001 A.5.17 &bull; NIST CSF PR.AA-01
              </div>
            </div>

            {/* Collected Evidence Grid */}
            <div className="space-y-2">
              <div className="text-[10px] uppercase text-zinc-400 tracking-wider">
                Collected Evidence
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px]">Source:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-medium">AWS IAM</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">Resource:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-medium">privileged-user-01</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">MFA Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Enabled (Active Hardware Device)</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">Collected Timestamp:</span>
                  <span className="text-zinc-700 dark:text-zinc-300">2026-09-13 14:48:10 UTC</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-zinc-400 block text-[10px]">Collection Method:</span>
                  <span className="text-zinc-600 dark:text-zinc-400 truncate block">
                    iam:GetAccountSummary / iam:ListMFADevices (Read-Only IAM Policy)
                  </span>
                </div>
                <div className="sm:col-span-2 pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-zinc-400 block text-[10px]">Payload SHA-256 Digest:</span>
                  <span className="text-zinc-800 dark:text-zinc-300 select-all truncate block">
                    sha256:4f8e91c2b57e63d910a72f09418a003e83b194f1c1d8829...
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Result Block */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="text-[10px] uppercase text-zinc-400 tracking-wider">
                Verification Result
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                      PASS // Control Satisfied
                    </span>
                    <span className="text-emerald-700/80 dark:text-emerald-400/80 text-[11px] block font-sans">
                      Evaluated deterministically against zero-tolerance MFA policy rule
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-500 font-mono text-right">
                  <span>Ledger Integrity: </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Valid</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

RealEvidenceRecordSection.displayName = 'RealEvidenceRecordSection';
export default RealEvidenceRecordSection;
