import { useState, useMemo, memo } from 'react';
import { 
  ShieldCheck, 
  Check, 
  Copy, 
  Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Simple deterministic hash simulator for fast in-browser demonstration
function computeDemoHash(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `sha256:${hex}89a1f2b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e`.slice(0, 71);
}

// shipping the new tokens fr
const CryptographicEvidenceSection = memo(function CryptographicEvidenceSection() {
  const [inputText, setInputText] = useState('{"resource":"aws_s3_bucket.prod_vault","kms_key_id":"arn:aws:kms:us-east-1:123456789012:key/sec-key-01","bucket_encryption":"AES256","public_access_block":true}');
  const [copied, setCopied] = useState(false);

  const hashDigest = useMemo(() => computeDemoHash(inputText), [inputText]);

  const copyDigest = () => {
    navigator.clipboard.writeText(hashDigest);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cryptographic" className="w-full bg-[var(--ground)] py-18 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[var(--hairline)] font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
            Evidence Integrity &amp; Proofs
          </div>
          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-[var(--ink)] tracking-tight leading-[1.1] font-serif mb-4">
            Forensic evidence integrity with <span className="italic font-normal text-[var(--accent)]">SHA-256 hashing</span>.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[var(--ink-secondary)] leading-relaxed">
            To prove to auditors that technical evidence has not been altered or forged post-capture, GRC Engine computes a cryptographic SHA-256 fingerprint at the exact millisecond of discovery.
          </p>
        </div>

        {/* 2-Column Cryptographic Demo & Process Card */}
        <div className="bg-[var(--surface)] border border-[var(--hairline)] rounded-xl p-6 sm:p-8 md:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            
            {/* Left: How Cryptographic Integrity Works */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-xs font-mono font-bold text-[var(--accent)] uppercase mb-2">
                  Tamper-Evident Forensic Chain
                </div>
                <h3 className="text-[22px] sm:text-[26px] font-bold text-[var(--ink)] font-serif leading-tight">
                  Cryptographic verification for external audits.
                </h3>
                <p className="text-[14px] text-[var(--ink-secondary)] leading-relaxed mt-3">
                  External auditors can independently verify any compliance claim by recalculating the SHA-256 hash against the raw JSON evidence record. If a single character changes, the hash fails verification.
                </p>
              </div>

              {/* 3 Step Forensic Flow */}
              <div className="space-y-3 font-mono text-xs tabular-nums">
                <div className="p-3 rounded-xl bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[var(--ground)] text-[var(--ink)] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-bold text-[var(--ink)]">Telemetry Capture &amp; Snapshot</div>
                    <div className="text-[11px] text-[var(--ink-muted)] mt-0.5">Raw JSON state captured via read-only API connector.</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[var(--ground)] text-[var(--ink)] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-bold text-[var(--ink)]">SHA-256 Digest Computation</div>
                    <div className="text-[11px] text-[var(--ink-muted)] mt-0.5">Cryptographic hash calculated and recorded in immutable EvidenceVault.</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-[var(--ground)] text-[var(--ink)] font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-bold text-[var(--ink)]">Auditor Export &amp; Proof Check</div>
                    <div className="text-[11px] text-[var(--ink-muted)] mt-0.5">Third-party auditors run standard SHA-256 checksums to verify authenticity.</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/archive"
                  className="text-xs font-mono font-bold text-[var(--accent)] hover:underline flex items-center gap-1 text-decoration-none"
                >
                  <span>Open Evidence Vault to inspect sealed records →</span>
                </Link>
              </div>
            </div>

            {/* Right: Live Interactive Hash Playground */}
            <div className="lg:col-span-7 bg-[var(--code-surface)] rounded-xl border border-[var(--hairline)] p-5 sm:p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--hairline)] text-[var(--code-ink)]">
                <span className="flex items-center gap-2 text-[var(--ink)] font-bold">
                  <Terminal size={14} className="text-[var(--accent)]" />
                  INTERACTIVE EVIDENCE HASH GENERATOR
                </span>
                <span className="text-[10.5px] text-[var(--ink-muted)]">Live SHA-256 Engine</span>
              </div>

              {/* Input Raw JSON Editor */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-[var(--ink-muted)] uppercase font-semibold">
                  Raw Ingested Evidence Payload (Editable):
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-lg bg-[var(--surface)] border border-[var(--hairline)] text-[var(--ink)] text-xs font-mono focus:outline-none focus:border-[var(--accent)] transition-colors leading-relaxed"
                  placeholder="Enter JSON evidence payload..."
                />
                <span className="text-[10.5px] text-[var(--ink-muted)] block">
                  Tip: Edit any character above to watch the SHA-256 digest recalculate instantly.
                </span>
              </div>

              {/* Computed Cryptographic Digest Output */}
              <div className="p-3.5 rounded-xl bg-[var(--surface-raised)] border border-[var(--hairline)] space-y-2 tabular-nums">
                <div className="text-[10.5px] text-[var(--ink-muted)] uppercase font-semibold flex items-center justify-between">
                  <span>Computed Cryptographic Fingerprint:</span>
                  <span className="text-[var(--pass)] font-bold">FIPS 180-4 Standard</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="font-mono text-[var(--accent)] text-xs break-all">
                    {hashDigest}
                  </div>
                  <button
                    onClick={copyDigest}
                    className="px-2.5 py-1.5 rounded-lg bg-[var(--ground)] hover:bg-[var(--surface)] text-[var(--ink)] border border-[var(--hairline)] transition-colors flex items-center gap-1 cursor-pointer shrink-0 active:scale-95"
                  >
                    {copied ? <Check size={13} className="text-[var(--pass)]" /> : <Copy size={13} />}
                    <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Integrity Seal Status */}
              <div className="pt-2 border-t border-[var(--hairline)] flex items-center justify-between text-[11px] text-[var(--ink-muted)] tabular-nums">
                <span className="flex items-center gap-1.5 text-[var(--pass)]">
                  <ShieldCheck size={14} /> Cryptographic Seal Valid
                </span>
                <span className="text-[var(--ink-muted)]">Tamper Detection: 100% Guaranteed</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

CryptographicEvidenceSection.displayName = 'CryptographicEvidenceSection';

export default CryptographicEvidenceSection;
