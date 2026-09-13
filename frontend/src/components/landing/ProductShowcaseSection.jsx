import { memo, useState } from 'react';
import { 
  Check, 
  GitBranch, 
  Lock, 
  Database,
  ExternalLink
} from 'lucide-react';

const ProductShowcaseSection = memo(function ProductShowcaseSection() {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(0);

  const assets = [
    {
      id: 'github-branch',
      title: 'GitHub Branch Protection',
      type: 'Source Repository',
      resource: 'github.com/organization/core-api',
      branch: 'main',
      frameworks: ['SOC 2 CC8.1', 'ISO 27001 A.8.28', 'NIST PR.PS-01'],
      controlName: 'Mandatory Pull Request Reviews & Admin Lock',
      condition: 'Branch protection mandates >= 2 reviewers and prohibits force pushes or administrator bypass.',
      status: 'PASS',
      payload: {
        resource: "github.branch.main",
        enforce_admins: true,
        required_approving_review_count: 2,
        dismiss_stale_reviews: true,
        allow_force_pushes: false,
        require_linear_history: true
      },
      hash: 'sha256:4f8e91c2b57e63d910a72f09418a003e83b194f1c1d8',
      collectedAt: '2026-09-13 14:40:12 UTC',
      method: 'GitHub REST API v3 /repos/:owner/:repo/branches/main/protection'
    },
    {
      id: 'aws-iam',
      title: 'AWS Privileged IAM Access',
      type: 'Identity & Access',
      resource: 'arn:aws:iam::091823412345:user/platform-admin',
      branch: 'us-east-1',
      frameworks: ['SOC 2 CC6.1', 'ISO 27001 A.5.17', 'NIST PR.AA-01'],
      controlName: 'Privileged User Hardware MFA Enforcement',
      condition: 'All privileged IAM identities must have active virtual or hardware MFA tokens attached.',
      status: 'PASS',
      payload: {
        user_name: "platform-admin",
        mfa_active: true,
        mfa_devices: ["arn:aws:iam::091823412345:mfa/platform-admin-yubikey"],
        password_last_used_days: 3,
        access_keys_count: 0
      },
      hash: 'sha256:88bc23194a02fde3719c836928e10034a71b293817cc',
      collectedAt: '2026-09-13 14:42:05 UTC',
      method: 'AWS IAM API /GetUser /ListMFADevices (Read-Only IAM Policy)'
    },
    {
      id: 'aws-s3-kms',
      title: 'Cloud Storage Encryption',
      type: 'Data Infrastructure',
      resource: 'arn:aws:s3:::audit-evidence-vault-prod',
      branch: 'us-west-2',
      frameworks: ['SOC 2 CC6.1', 'ISO 27001 A.8.24', 'NIST PR.DS-01'],
      controlName: 'Customer-Managed KMS Key (CMK) Encryption',
      condition: 'S3 buckets containing sensitive attestation records must enforce SSE-KMS with customer CMK.',
      status: 'PASS',
      payload: {
        bucket: "audit-evidence-vault-prod",
        sse_algorithm: "aws:kms",
        kms_master_key_id: "arn:aws:kms:us-west-2:091823412345:key/7c12a84b",
        bucket_key_enabled: true,
        block_public_acls: true,
        restrict_public_buckets: true
      },
      hash: 'sha256:d123984fa091bc78291048e9102c48192a7192bc0148',
      collectedAt: '2026-09-13 14:44:22 UTC',
      method: 'AWS S3 API /GetBucketEncryption /GetPublicAccessBlock'
    }
  ];

  const currentAsset = assets[selectedAssetIndex];

  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 font-sans bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
              Inspection Interface
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              See what the system can actually verify.
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Real infrastructure state evaluated deterministically against canonical controls, complete with immutable SHA-256 evidence provenance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800">
              Demo environment &bull; Sample data
            </span>
          </div>
        </div>

        {/* Realistic Interactive Product UI Showcase */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
          
          {/* Asset Selector Tabs */}
          <div className="flex border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 overflow-x-auto">
            {assets.map((asset, idx) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => setSelectedAssetIndex(idx)}
                className={`px-4 py-3 text-xs font-medium border-r border-zinc-200/80 dark:border-zinc-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedAssetIndex === idx
                    ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-b-2 border-b-orange-600 dark:border-b-orange-500'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                {idx === 0 && <GitBranch size={13} className="text-zinc-500" />}
                {idx === 1 && <Lock size={13} className="text-zinc-500" />}
                {idx === 2 && <Database size={13} className="text-zinc-500" />}
                <span>{asset.title}</span>
              </button>
            ))}
          </div>

          {/* Asset Metadata & Evaluation Detail Bar */}
          <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Target Resource & Control Definition */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  {currentAsset.frameworks.map((fw) => (
                    <span 
                      key={fw} 
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 pt-1">
                  {currentAsset.controlName}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {currentAsset.condition}
                </p>
              </div>

              {/* Resource identification metadata */}
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Resource:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate max-w-[260px]">
                    {currentAsset.resource}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Target:</span>
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {currentAsset.branch}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Method:</span>
                  <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-[260px]">
                    {currentAsset.method}
                  </span>
                </div>
              </div>

              {/* Verification Outcome */}
              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-zinc-500 font-mono">
                  Evaluation Verdict:
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-mono font-medium">
                  <Check size={12} strokeWidth={3} />
                  <span>{currentAsset.status} // DETERMINISTIC</span>
                </div>
              </div>
            </div>

            {/* Right Column: Ingested Evidence JSON & Immutable Hash */}
            <div className="lg:col-span-6 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                    Evidence Payload
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    {currentAsset.collectedAt}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-900 text-zinc-200 font-mono text-xs leading-relaxed overflow-x-auto border border-zinc-800">
                  <pre className="text-zinc-300">
                    {JSON.stringify(currentAsset.payload, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1 text-[11px] font-mono">
                <div className="flex items-center justify-between text-zinc-500">
                  <span>Cryptographic Ledger ID:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified</span>
                </div>
                <div className="text-zinc-800 dark:text-zinc-300 truncate select-all">
                  {currentAsset.hash}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

ProductShowcaseSection.displayName = 'ProductShowcaseSection';
export default ProductShowcaseSection;
