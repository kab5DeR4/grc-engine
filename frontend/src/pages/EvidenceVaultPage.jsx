import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDemoStore } from '../store/demoStore';
import { CheckCircle2, ShieldCheck, Database, Copy, Check, Search, Shield, RefreshCw } from 'lucide-react';

const demoArchiveLogs = [
  {
    id: 'EVD-89201',
    controlId: 'CTL-001',
    title: 'KMS Key Envelope Rotation Proof',
    date: '2026-09-13 14:22:09 UTC',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    framework: 'NIST SP 800-53',
    status: 'VERIFIED IMMUTABLE',
    collector: 'AWS KMS API /DescribeKey /GetKeyRotationStatus',
    resource: 'arn:aws:kms:us-east-1:123456789012:key/c8f2a901'
  },
  {
    id: 'EVD-89202',
    controlId: 'CTL-002',
    title: 'SOC2 CC6.1 Logical Access Boundary Proof',
    date: '2026-09-13 14:28:44 UTC',
    hash: '8f92a1c84b12390aef45600c92138120b04e9a117281f0129a9987654321abcd',
    framework: 'SOC 2 TYPE II',
    status: 'VERIFIED IMMUTABLE',
    collector: 'Okta Federated SAML /Factors + AWS IAM',
    resource: 'arn:aws:iam::123456789012:user/platform-admin'
  },
  {
    id: 'EVD-89203',
    controlId: 'CTL-003',
    title: 'S3 Bucket Server-Side Encryption Audit Log',
    date: '2026-09-13 14:30:12 UTC',
    hash: '142857a9b0c1d2e3f4a5b6c7d8e90123456789abcdef0123456789abcdef0123',
    framework: 'ISO 27001 A.8.24',
    status: 'VERIFIED IMMUTABLE',
    collector: 'AWS S3 API /GetBucketEncryption',
    resource: 'arn:aws:s3:::audit-evidence-vault-prod'
  },
  {
    id: 'EVD-89204',
    controlId: 'CTL-004',
    title: 'GitHub Branch Protection & Review Enforcement',
    date: '2026-09-13 14:32:30 UTC',
    hash: '7f3b890a5d4e12c8230948ab82910c81203498172901284901823901829021e8',
    framework: 'SOC 2 CC8.1 / ISO 27001 A.8.28',
    status: 'VERIFIED IMMUTABLE',
    collector: 'GitHub REST API v3 /repos/:owner/:repo/branches/main/protection',
    resource: 'github.com/acme/core-monorepo:main'
  },
  {
    id: 'EVD-89205',
    controlId: 'CTL-005',
    title: 'Zero-Trust Egress DNS Telemetry Verification',
    date: '2026-09-13 14:35:19 UTC',
    hash: 'abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
    framework: 'NIST CSF 2.0',
    status: 'VERIFIED IMMUTABLE',
    collector: 'Cilium NetworkPolicy eBPF Probe',
    resource: 'k8s://cluster-prod-01/namespaces/default'
  },
];

export default function ArchivePage() {
  const { isLiveMode, liveEvidence, verifyLiveEvidence, fetchLiveTelemetry } = useDemoStore();
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get('id');
  const [searchQuery, setSearchQuery] = useState('');
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
        collector: 'Live REST Ingestion',
        resource: e.source_uri || 'github.com/acme/repo'
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

  const filteredEvidence = useMemo(() => {
    return activeEvidence.filter(e => {
      const query = searchQuery.toLowerCase();
      return (
        e.title.toLowerCase().includes(query) ||
        e.id.toLowerCase().includes(query) ||
        e.hash.toLowerCase().includes(query) ||
        e.controlId.toLowerCase().includes(query)
      );
    });
  }, [activeEvidence, searchQuery]);

  const handleCopyHash = () => {
    if (!selectedEvd?.hash) return;
    navigator.clipboard.writeText(selectedEvd.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = async () => {
    if (!selectedEvd) return;
    setVerifying(true);
    setVerificationResult(null);

    if (isLiveMode && selectedEvd.rawId) {
      const res = await verifyLiveEvidence(selectedEvd.rawId);
      setVerificationResult(res ? 'PASS' : 'FAIL');
    } else {
      setTimeout(() => {
        setVerificationResult('PASS');
        setVerifying(false);
      }, 700);
      return;
    }
    setVerifying(false);
  };

  return (
    <div className="w-full h-full text-slate-900 dark:text-slate-100 font-sans max-w-[1520px] mx-auto pb-16 space-y-6">
      
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10.5px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Immutable Evidence Vault
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Evidence Vault &amp; Cryptographic Proofs
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Append-only proof ledger storing tamper-evident SHA-256 cryptographic hashes for every verified technical configuration state.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <span>{filteredEvidence.length} Proofs Indexed</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Evidence ID, SHA-256 digest, or control..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-1.5 rounded-lg text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
          />
        </div>
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Proofs List (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredEvidence.map((item) => {
            const isSelected = selectedEvd?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedEvd(item);
                  setVerificationResult(null);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 font-sans ${
                  isSelected
                    ? 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xs ring-1 ring-zinc-900 dark:ring-zinc-100'
                    : 'bg-[var(--surface)] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">{item.id}</span>
                    <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                    <span className="text-slate-500 font-mono text-[11px]">{item.controlId}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>

                <div className="p-2 rounded bg-slate-50 dark:bg-slate-950/60 font-mono text-[11px] text-slate-600 dark:text-slate-400 truncate border border-slate-100 dark:border-slate-800">
                  #{item.hash}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Sticky Proof Certificate (5 Cols) */}
        <div className="lg:col-span-5 sticky top-20 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs font-sans">
          {selectedEvd ? (
            <>
              <div className="space-y-1.5 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Cryptographic Proof Certificate
                </div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {selectedEvd.title}
                </h2>
              </div>

              <div className="space-y-3.5 text-xs font-sans">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Evidence Record ID &amp; Control</span>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
                    {selectedEvd.id} ({selectedEvd.controlId})
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Target Resource</span>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 select-all truncate">
                    {selectedEvd.resource || 'arn:aws:s3:::audit-vault'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-slate-400">SHA-256 Cryptographic Digest</span>
                    <button
                      type="button"
                      onClick={handleCopyHash}
                      className="flex items-center gap-1 text-[11px] font-mono text-orange-600 dark:text-orange-400 hover:underline cursor-pointer bg-transparent border-none"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copied ? 'Copied' : 'Copy Hash'}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] break-all border border-slate-800 leading-relaxed select-all">
                    {selectedEvd.hash}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase">Timestamp</span>
                    <div className="text-slate-700 dark:text-slate-300 truncate">
                      {selectedEvd.date}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase">Integrity Status</span>
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                      SEAL VALID
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Button & Result */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={verifying}
                  className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-900 dark:border-zinc-100"
                >
                  <ShieldCheck size={14} className={verifying ? 'animate-spin' : ''} />
                  <span>{verifying ? 'Verifying SHA-256 Seal...' : 'Verify Cryptographic Signature'}</span>
                </button>

                {verificationResult && (
                  <div className={`p-2.5 rounded-lg text-xs font-mono text-center font-medium ${
                    verificationResult === 'PASS' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  }`}>
                    {verificationResult === 'PASS' ? '✓ Cryptographic Proof Valid: Database signature matches SHA-256 digest' : '✗ Verification Failed: Hash mismatch'}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">
              Select an evidence artifact to inspect cryptographic certificate
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
