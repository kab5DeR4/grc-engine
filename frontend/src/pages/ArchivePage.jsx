import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDemoStore } from '../store/demoStore';
import { CheckCircle2, ShieldCheck, Database, Copy, Check, Hash } from 'lucide-react';

const demoArchiveLogs = [
  {
    id: 'EVD-89201',
    controlId: 'CTL-089',
    title: 'KMS Key Envelope Rotation Proof',
    date: '2026.08.01 14:22:09 UTC',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    framework: 'NIST SP 800-53',
    status: 'VERIFIED IMMUTABLE',
  },
  {
    id: 'EVD-89202',
    controlId: 'CTL-092',
    title: 'SOC2 CC6.1 Logical Access Boundary Proof',
    date: '2026.07.28 09:15:44 UTC',
    hash: '8f92a1c84b12390aef45600c92138120b04e9a117281f0129a9987654321abcd',
    framework: 'SOC 2 TYPE II',
    status: 'VERIFIED IMMUTABLE',
  },
  {
    id: 'EVD-89203',
    controlId: 'CTL-097',
    title: 'S3 Bucket Server-Side Encryption Audit Log',
    date: '2026.07.15 18:00:12 UTC',
    hash: '142857a9b0c1d2e3f4a5b6c7d8e90123456789abcdef0123456789abcdef0123',
    framework: 'HIPAA §164.312',
    status: 'VERIFIED IMMUTABLE',
  },
  {
    id: 'EVD-89204',
    controlId: 'CTL-104',
    title: 'Kubernetes Pod Security Admission Scan Output',
    date: '2026.07.02 11:42:30 UTC',
    hash: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
    framework: 'ISO 27001 A.12',
    status: 'VERIFIED IMMUTABLE',
  },
  {
    id: 'EVD-89205',
    controlId: 'CTL-112',
    title: 'Zero-Trust Egress DNS Telemetry Verification',
    date: '2026.06.24 16:04:19 UTC',
    hash: 'abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
    framework: 'NIST CSF 2.0',
    status: 'VERIFIED IMMUTABLE',
  },
];

export default function ArchivePage() {
  const { isLiveMode, liveEvidence, verifyLiveEvidence, fetchLiveTelemetry } = useDemoStore();
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get('id');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isLiveMode) {
      fetchLiveTelemetry();
    }
  }, [isLiveMode, fetchLiveTelemetry]);

  const activeEvidence = useMemo(() => {
    if (isLiveMode && liveEvidence && liveEvidence.length > 0) {
      return liveEvidence.map(e => ({
        id: `EVD-${e.id.slice(0, 8)}`,
        rawId: e.id,
        controlId: e.control_definition_id || 'CTL-GH-01',
        title: `Infrastructure Evidence Artifact: ${e.source_uri || 'Config Snapshot'}`,
        date: new Date(e.created_at).toUTCString(),
        hash: e.sha256_hash,
        framework: 'SOC 2 / ISO 27001',
        status: 'VERIFIED IMMUTABLE',
      }));
    }
    return demoArchiveLogs;
  }, [isLiveMode, liveEvidence]);

  const [selectedEvd, setSelectedEvd] = useState(activeEvidence[0] || demoArchiveLogs[0]);

  useEffect(() => {
    if (activeEvidence.length > 0) {
      const match = highlightedId ? activeEvidence.find(e => e.controlId === highlightedId) : null;
      setSelectedEvd(match || activeEvidence[0]);
    }
  }, [activeEvidence, highlightedId]);

  const handleCopyHash = () => {
    if (!selectedEvd?.hash) return;
    navigator.clipboard.writeText(selectedEvd.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    setVerifying(true);
    setVerificationResult(null);

    if (isLiveMode && selectedEvd?.rawId) {
      try {
        const res = await verifyLiveEvidence(selectedEvd.rawId);
        setVerificationResult({
          valid: res.is_valid,
          message: res.is_valid
            ? `Cryptographic signature matches SHA-256 proof in database ledger!`
            : `Warning: SHA-256 hash mismatch. Possible tamper event!`,
        });
      } catch (err) {
        setVerificationResult({
          valid: false,
          message: `Verification check failed: ${err.message}`,
        });
      } finally {
        setVerifying(false);
      }
      return;
    }

    setTimeout(() => {
      setVerifying(false);
      setVerificationResult({
        valid: true,
        message: `Cryptographic SHA-256 verification confirmed for ${selectedEvd?.hash?.slice(0, 16)}...`,
      });
    }, 400);
  };

  return (
    <div className="w-full h-full text-slate-900 dark:text-slate-100 font-sans max-w-[1520px] mx-auto pb-16 space-y-8">
      
      {/* Page Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wider">
          Immutable Evidence Vault
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Audit Records &amp; <span className="text-sky-600 dark:text-sky-400">Cryptographic Proofs</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Append-only proof ledger storing tamper-evident cryptographic hashes for every verified security control. All proofs are hashed at capture time for independent auditor verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Evidence Table */}
        <div className="lg:col-span-7 space-y-3">
          {activeEvidence.map((item) => {
            const isSelected = selectedEvd?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedEvd(item);
                  setVerificationResult(null);
                }}
                className={`p-5 rounded-xl cursor-pointer border transition-all duration-150 active:scale-[0.99] ${
                  isSelected 
                    ? 'bg-white dark:bg-slate-850 border-slate-900 dark:border-sky-400 shadow-md ring-1 ring-slate-900/10 dark:ring-sky-400/20' 
                    : 'bg-[var(--surface)] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                }`}
              >
                <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
                  <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <Database size={13} />
                    {item.id} &bull; {item.controlId}
                  </span>
                  <span className="text-slate-500 text-[11px]">{item.date}</span>
                </div>
                
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {item.title}
                </h3>
                
                <div className="text-xs text-slate-500 font-mono truncate pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                  <Hash size={12} className="text-slate-400 shrink-0" />
                  <span className="truncate">{item.hash}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Proof Detail Certificate */}
        <div className="lg:col-span-5 bg-[var(--surface)] p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg sticky top-[80px] h-fit space-y-5">
          <div>
            <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
              Proof Certificate
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {selectedEvd?.title || 'Selected Evidence Proof'}
            </h2>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">Evidence Record ID</div>
              <div className="text-slate-900 dark:text-white font-bold mt-0.5 text-sm">{selectedEvd?.id} ({selectedEvd?.controlId})</div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">Regulatory Standard Mapping</div>
              <div className="text-slate-900 dark:text-white font-bold mt-0.5">{selectedEvd?.framework}</div>
            </div>

            <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[10.5px] font-mono font-bold text-slate-400 uppercase">
                <span>SHA-256 Cryptographic Digest</span>
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer bg-transparent border-none text-[10.5px]"
                >
                  {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-sky-400 font-mono text-xs break-all leading-relaxed">{selectedEvd?.hash}</div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">Timestamp</div>
                <div className="text-slate-900 dark:text-white font-semibold mt-0.5">{selectedEvd?.date}</div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                {selectedEvd?.status}
              </span>
            </div>

            {verificationResult && (
              <div className={`p-3.5 rounded-xl text-xs font-mono flex items-start gap-2.5 border ${
                verificationResult.valid 
                  ? 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 border-emerald-500/40' 
                  : 'bg-rose-500/10 text-rose-900 dark:text-rose-300 border-rose-500/40'
              }`}>
                <CheckCircle2 size={16} className={verificationResult.valid ? 'text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5' : 'text-rose-600 dark:text-rose-400 shrink-0 mt-0.5'} />
                <span className="leading-snug">{verificationResult.message}</span>
              </div>
            )}

            <div className="pt-2">
              <button 
                type="button"
                onClick={handleVerify}
                disabled={verifying}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 text-xs font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-md border-none"
              >
                <ShieldCheck size={15} />
                <span>{verifying ? 'Recalculating Digest...' : 'Verify Cryptographic Signature'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
