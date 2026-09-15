import { memo, useState } from 'react';
import { 
  Check, 
  GitBranch, 
  Lock, 
  Database
} from 'lucide-react';
import AnimatedBlurTextHeading from '../ui/AnimatedBlurTextHeading';

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
      status: 'VERIFIED',
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
      status: 'VERIFIED',
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
      status: 'VERIFIED',
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
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono tracking-wider uppercase text-zinc-500 font-semibold">
              Evidence-Driven Verification
            </div>
            <AnimatedBlurTextHeading 
              as="h2" 
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              See what the system can actually verify.
            </AnimatedBlurTextHeading>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Real infrastructure state evaluated deterministically against canonical controls, complete with immutable SHA-256 evidence provenance.
            </p>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 uppercase tracking-widest">
              Live Evaluation Engine
            </span>
          </div>
        </div>

        {/* Product UI Showcase */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden flex flex-col">
          
          {/* Asset Selector Tabs */}
          <div className="flex border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 overflow-x-auto no-scrollbar">
            {assets.map((asset, idx) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => setSelectedAssetIndex(idx)}
                className={`px-6 py-4 text-sm font-medium border-r border-zinc-200/80 dark:border-zinc-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2.5 ${
                  selectedAssetIndex === idx
                    ? 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-b-2 border-b-orange-600 dark:border-b-orange-500'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                {idx === 0 && <GitBranch size={14} />}
                {idx === 1 && <Lock size={14} />}
                {idx === 2 && <Database size={14} />}
                <span>{asset.title}</span>
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8 flex flex-col space-y-8">
            
            {/* DOMINANT VERIFICATION RESULT */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  Control Evaluated
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {currentAsset.controlName}
                </h3>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {currentAsset.frameworks.map((fw) => (
                    <span 
                      key={fw} 
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 font-mono">
                  <Check size={16} strokeWidth={3} />
                  <span className="font-semibold tracking-wide">{currentAsset.status}</span>
                </div>
              </div>
            </div>

            {/* TECHNICAL EVIDENCE DETAILS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Context & Metadata */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Policy Rule
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {currentAsset.condition}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Evidence Source
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded overflow-hidden text-xs">
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 space-y-1">
                      <span className="text-zinc-500 block">System</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-medium">{currentAsset.type}</span>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 space-y-1">
                      <span className="text-zinc-500 block">Target</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-medium">{currentAsset.branch}</span>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 space-y-1 sm:col-span-2">
                      <span className="text-zinc-500 block">Resource ID</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-mono truncate block">{currentAsset.resource}</span>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-3 space-y-1 sm:col-span-2">
                      <span className="text-zinc-500 block">Last Verified</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-mono">{currentAsset.collectedAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payload & Integrity */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                      Technical State
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 truncate max-w-[200px]">
                      {currentAsset.method}
                    </div>
                  </div>
                  <div className="p-4 rounded border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-mono text-xs overflow-x-auto text-zinc-800 dark:text-zinc-300">
                    <pre>
                      {JSON.stringify(currentAsset.payload, null, 2)}
                    </pre>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-950/10 text-[10px] font-mono">
                  <span className="text-zinc-500">Cryptographic Hash</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium truncate max-w-[220px] sm:max-w-[300px]">
                    {currentAsset.hash}
                  </span>
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
