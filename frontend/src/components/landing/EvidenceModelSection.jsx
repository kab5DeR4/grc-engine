import { memo, useState } from 'react';
import { Check, GitBranch, Lock, Database } from 'lucide-react';

const EvidenceModelSection = memo(function EvidenceModelSection() {
  const [activeSourceId, setActiveSourceId] = useState('branch');

  const sources = [
    {
      id: 'branch',
      name: 'GitHub Branch Protection',
      resource: 'github.com/organization/core:main',
      type: 'Source Control',
      hash: 'sha256:7f3b890a5d4e12c8...21e8',
      summary: 'Enforce 2 approvals, admin locks, and linear history',
      frameworks: [
        {
          name: 'SOC 2 Type II',
          controlId: 'CC6.8',
          clause: 'Change Authorization & Approvals',
          status: 'PASS',
        },
        {
          name: 'ISO / IEC 27001:2022',
          controlId: 'A.8.28',
          clause: 'Secure Coding & Dual-Review Gate',
          status: 'PASS',
        },
        {
          name: 'NIST CSF 2.0',
          controlId: 'PR.PS-01',
          clause: 'Configuration Baseline & Integrity',
          status: 'PASS',
        },
        {
          name: 'CIS Controls v8',
          controlId: 'Safeguard 5.2',
          clause: 'Code Review Enforcement',
          status: 'PASS',
        },
      ],
    },
    {
      id: 'iam',
      name: 'AWS IAM MFA Enforcement',
      resource: 'arn:aws:iam::091823412345:root',
      type: 'Identity & Access',
      hash: 'sha256:88bc23194a02fde3...17cc',
      summary: 'Root and privileged identities enforce hardware MFA',
      frameworks: [
        {
          name: 'SOC 2 Type II',
          controlId: 'CC6.1',
          clause: 'Logical Access & Multi-Factor Auth',
          status: 'PASS',
        },
        {
          name: 'ISO / IEC 27001:2022',
          controlId: 'A.5.17',
          clause: 'Privileged Access Management',
          status: 'PASS',
        },
        {
          name: 'NIST CSF 2.0',
          controlId: 'PR.AA-01',
          clause: 'Identities & Credentials Authenticated',
          status: 'PASS',
        },
        {
          name: 'CIS Controls v8',
          controlId: 'Safeguard 6.3',
          clause: 'MFA for Administrative Access',
          status: 'PASS',
        },
      ],
    },
    {
      id: 'kms',
      name: 'AWS S3 KMS Encryption',
      resource: 'arn:aws:s3:::compliance-vault-prod',
      type: 'Cloud Storage',
      hash: 'sha256:d123984fa091bc78...0148',
      summary: 'Customer-managed KMS encryption & public block active',
      frameworks: [
        {
          name: 'SOC 2 Type II',
          controlId: 'CC6.1',
          clause: 'Data at Rest Cryptographic Protection',
          status: 'PASS',
        },
        {
          name: 'ISO / IEC 27001:2022',
          controlId: 'A.8.24',
          clause: 'Use of Customer-Managed Cryptography',
          status: 'PASS',
        },
        {
          name: 'NIST CSF 2.0',
          controlId: 'PR.DS-01',
          clause: 'Data-at-Rest Protection Policies',
          status: 'PASS',
        },
        {
          name: 'CIS Controls v8',
          controlId: 'Safeguard 3.11',
          clause: 'Encrypt Sensitive Data at Rest',
          status: 'PASS',
        },
      ],
    },
  ];

  const activeSource = sources.find((s) => s.id === activeSourceId) || sources[0];

  return (
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 font-sans bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
            Unified Evidence Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            One evidence layer. Multiple frameworks.
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Stop collecting the same evidence four times for four different audits. Ingest infrastructure state once, and GRC Engine maps it to every relevant framework.
          </p>
        </div>

        {/* Source Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 mr-2">Select evidence source:</span>
          {sources.map((src) => (
            <button
              key={src.id}
              type="button"
              onClick={() => setActiveSourceId(src.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer border ${
                activeSourceId === src.id
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm'
                  : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {src.name}
            </button>
          ))}
        </div>

        {/* Product Architecture Visualization Diagram */}
        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30 p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Block: Infrastructure Source */}
            <div className="lg:col-span-4 p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-medium">
                  01 // Source Infrastructure
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {activeSource.type}
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {activeSource.name}
                </h4>
                <div className="text-xs font-mono text-zinc-500 truncate">
                  {activeSource.resource}
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                {activeSource.summary}
              </p>
            </div>

            {/* Center Block: Evidence Ledger */}
            <div className="lg:col-span-4 p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-3 shadow-sm relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-medium">
                  02 // Evidence Layer
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  <Check size={11} strokeWidth={3} />
                  <span>Sealed</span>
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Tamper-Proof Snapshot
                </h4>
                <div className="text-xs font-mono text-zinc-500">
                  SHA-256 Digest
                </div>
              </div>
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/70 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 truncate">
                {activeSource.hash}
              </div>
            </div>

            {/* Right Block: 4 Framework Mappings */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 pb-1">
                03 // Mapped Frameworks
              </div>
              {activeSource.frameworks.map((fw) => (
                <div 
                  key={fw.name}
                  className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between shadow-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {fw.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {fw.controlId}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      {fw.clause}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 shrink-0 ml-2">
                    {fw.status}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

EvidenceModelSection.displayName = 'EvidenceModelSection';
export default EvidenceModelSection;
