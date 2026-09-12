import { memo } from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  ArrowRight,
  Database,
  CheckCircle2,
  Hash,
  FileSpreadsheet,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

// bento layout for evidence integrity looking clean
const EvidenceIntegritySection = memo(function EvidenceIntegritySection() {
  return (
    <section id="evidence-integrity" className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-[var(--ground)] font-sans">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            <ShieldCheck size={13} />
            <span>CRYPTOGRAPHIC PROOF ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight sm:tracking-tighter">
            Evidence you can trust &amp; auditors can verify.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed font-normal">
            Continuous state ingestion, immutable SHA-256 hashing, and structured attestation records built for external auditor sign-off.
          </p>
        </div>

        {/* Bento Architectural Interconnected Grid */}
        <div className="border border-[var(--hairline)] rounded-xl bg-[var(--hairline)] grid grid-cols-1 md:grid-cols-12 gap-px overflow-hidden shadow-sm">
          
          {/* Main Hero Bento Cell (Spans 8 Columns): Immutable Vault Record */}
          <div className="md:col-span-8 bg-[var(--surface)] p-5 sm:p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[var(--pass-surface)] text-emerald-500 flex items-center justify-center">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-[var(--ink)]">
                      IMMUTABLE ATTESTATION RECORD // EVD-2026-98105
                    </div>
                    <div className="text-[10px] text-[var(--ink-muted)] font-mono">
                      AUTOMATED INGESTION &bull; SHA-256 SEAL VALID
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[var(--pass-surface)] text-emerald-500 text-[10px] font-mono font-bold border border-emerald-500/20">
                  SEALED AT CAPTURE
                </span>
              </div>

              {/* Structural Checklist Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-lg bg-[var(--surface-raised)] border border-[var(--hairline)] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--ink)]">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    <span>Real-Time Cloud State Capture</span>
                  </div>
                  <p className="text-[10px] text-[var(--ink-muted)] font-mono leading-relaxed">
                    Direct API polling of AWS KMS, GitHub branch rules, and Okta IAM policies.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[var(--surface-raised)] border border-[var(--hairline)] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--ink)]">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    <span>Tamper-Proof SHA-256 Hash</span>
                  </div>
                  <p className="text-[10px] text-[var(--ink-muted)] font-mono leading-relaxed">
                    Cryptographic fingerprint prevents post-capture modification or manual doctoring.
                  </p>
                </div>
              </div>
            </div>

            {/* Micro-Vault Attestation Stream */}
            <div className="p-2.5 rounded-lg bg-[var(--ground)] border border-[var(--hairline)] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[var(--ink-muted)] font-mono gap-2">
              <span className="flex items-center gap-1.5 truncate">
                <Hash size={12} className="text-sky-500 shrink-0" />
                <span className="text-[var(--ink)] font-bold">DIGEST:</span>
                <span className="text-sky-500 truncate">sha256:7f83b1657ff1fc53...</span>
              </span>
              <span className="text-[10px] text-emerald-500 font-bold shrink-0">
                VERIFIED 100% UNMODIFIED
              </span>
            </div>
          </div>

          {/* Supporting Bento Cell (Spans 4 Columns): Continuous Ingestion Stream */}
          <div className="md:col-span-4 bg-[var(--surface)] p-5 sm:p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--hairline)]">
                <Database size={15} className="text-sky-500" />
                <span className="text-xs font-mono font-bold text-[var(--ink)] uppercase">
                  Telemetry Pipelines
                </span>
              </div>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Raw configuration state ingested every 60 seconds across all registered cloud accounts.
              </p>

              {/* Structural Metric List */}
              <div className="space-y-1.5 pt-1 font-mono text-xs">
                <div className="p-2 rounded bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--ink-secondary)]">AWS KMS Ingestion:</span>
                  <span className="font-bold text-emerald-500 text-[11px] tabular-nums">ONLINE</span>
                </div>
                <div className="p-2 rounded bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--ink-secondary)]">GitHub Branch State:</span>
                  <span className="font-bold text-emerald-500 text-[11px] tabular-nums">SYNCED</span>
                </div>
                <div className="p-2 rounded bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--ink-secondary)]">Okta Identity Logs:</span>
                  <span className="font-bold text-emerald-500 text-[11px] tabular-nums">CONNECTED</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-[var(--ink-muted)] flex items-center gap-1 pt-1">
              <Clock size={11} />
              <span>Next scheduled sync in 42s</span>
            </div>
          </div>

          {/* Bottom Bento Cell 1 (Spans 6 Columns): Auditor-Accepted Export */}
          <div className="md:col-span-6 bg-[var(--surface)] p-4 sm:p-5 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck size={15} className="text-sky-500" />
                <span className="text-xs font-bold text-[var(--ink)]">
                  1-Click Auditor Export Packages
                </span>
              </div>
              <span className="text-[10px] font-mono text-sky-500 bg-[var(--accent-subtle)] px-2 py-0.5 rounded">
                SOC 2 &bull; ISO 27001
              </span>
            </div>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Export pre-mapped ZIP and JSON evidence bundles ready for external audit firms without chasing screenshots.
            </p>
          </div>

          {/* Bottom Bento Cell 2 (Spans 6 Columns): Audit Trail Verification */}
          <div className="md:col-span-6 bg-[var(--surface)] p-4 sm:p-5 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={15} className="text-emerald-500" />
                <span className="text-xs font-bold text-[var(--ink)]">
                  Continuous Ledger &amp; Archive
                </span>
              </div>
              <Link
                to="/archive"
                className="text-[11px] font-mono text-sky-500 hover:underline flex items-center gap-1 text-decoration-none font-semibold"
              >
                <span>Open Archive</span>
                <ArrowRight size={11} />
              </Link>
            </div>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Maintains full 365-day historical state retention with tamper-evident cryptographic logs.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
});

EvidenceIntegritySection.displayName = 'EvidenceIntegritySection';

export default EvidenceIntegritySection;
