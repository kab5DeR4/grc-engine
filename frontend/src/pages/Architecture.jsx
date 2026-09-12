import { useState } from 'react';
import { FileCheck, Shield, Key, Server } from 'lucide-react';

const standards = [
  {
    code: 'STD-SOC2-CC6.1',
    title: 'SOC 2 Type II — Logical Access & Identity Governance',
    icon: Shield,
    rule: 'Logical access security measures prevent unauthorized access to system software, data, and cloud APIs. Least-privilege and MFA are verified per request.',
    snippet: `package authz
default allow = false

# Enforce MFA and role verification for sensitive cloud control planes
allow {
    input.method == "GET"
    input.user.roles[_] == "security_auditor"
    input.user.mfa_authenticated == true
    input.client_context.tls_version >= 1.3
}`,
  },
  {
    code: 'STD-NIST-SC12',
    title: 'NIST SP 800-53 Rev. 5 — Cryptographic Key Management',
    icon: Key,
    rule: 'Automated cryptographic key rotation and FIPS 140-3 HSM isolation enforced across all production data stores and telemetry digests.',
    snippet: `kms_key_policy:
  key_spec: RSA_4096
  envelope_algorithm: AES_256_GCM
  rotation_period: 7776000s # 90 Days Automated Cycle
  hardware_security_module: FIPS_140_3_LEVEL_3
  enforce_dual_authorization: true`,
  },
  {
    code: 'STD-ISO-A12.4',
    title: 'ISO/IEC 27001:2022 — Immutable Audit Log Ledger',
    icon: FileCheck,
    rule: 'Event logs recording user activities, exceptions, and security events are cryptographically hashed and stored in append-only WORM ledgers.',
    snippet: `struct AuditRecordProof {
    timestamp: i64,
    actor_id: String,
    action: String,
    resource: String,
    sha256_digest: [u8; 32],
    previous_hash: [u8; 32],
    hsm_signature: [u8; 64],
}`,
  },
  {
    code: 'STD-CIS-K8S-5.1',
    title: 'CIS Kubernetes Benchmark — Pod Security Admission & Non-Root',
    icon: Server,
    rule: 'Continuous admission control verifying all workload pods drop root capabilities, enforce read-only root filesystems, and restrict privilege escalation.',
    snippet: `apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: enforce-pod-non-root-and-readonly-fs
spec:
  validationFailureAction: Enforce
  rules:
  - name: check-security-context
    match:
      resources:
        kinds: [Pod]
    validate:
      message: "Workloads must run as non-root (UID > 10000) with read-only root filesystem."
      pattern:
        spec:
          securityContext:
            runAsNonRoot: true
          containers:
          - securityContext:
              readOnlyRootFilesystem: true
              allowPrivilegeEscalation: false`,
  }
];

export default function Architecture() {
  const [activeTab, setActiveTab] = useState(0);
  const activeStandard = standards[activeTab];

  return (
    <div className="flex flex-col gap-8 max-w-[1400px] mx-auto pb-20 font-mono text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <header className="border-b border-slate-300 dark:border-slate-800 pb-6">
        <div className="text-[10.5px] font-bold text-sky-600 dark:text-sky-400 mb-2 flex items-center gap-2 tracking-wider uppercase">
          <span className="w-2 h-2 bg-sky-600 dark:bg-sky-400 inline-block rounded-full"></span>
          ARCHITECTURE & POLICY SPECIFICATIONS
        </div>
        <h1 className="serif-heading text-[34px] md:text-[48px] text-slate-900 dark:text-white font-bold">
          Technical Architecture & <span className="serif-italic-pigment text-sky-600 dark:text-sky-400">Policy Rules</span>
        </h1>
        <p className="mono-body text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">
          Deterministic technical definitions, cryptography directives, and verifiable machine policy declarations evaluated across all clusters.
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Directives Selector */}
        <div className="lg:col-span-5 space-y-3">
          {standards.map((std, idx) => (
            <div
              key={std.code}
              onClick={() => setActiveTab(idx)}
              className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                activeTab === idx 
                  ? 'bg-slate-100 dark:bg-slate-800 border-slate-900 dark:border-sky-400 shadow-sm' 
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <div className="text-[10.5px] font-bold text-sky-600 dark:text-sky-400 mb-1">{std.code}</div>
              <div className="font-bold text-base text-slate-900 dark:text-white">{std.title}</div>
            </div>
          ))}
        </div>

        {/* Right Column: Code & Inspector */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-sm">
          <div className="text-[10.5px] font-bold text-sky-600 dark:text-sky-400 mb-1 uppercase tracking-wider">
            {activeStandard.code} DIRECTIVE
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {activeStandard.title}
          </h2>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
            <div className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">
              GOVERNING REGULATORY SPECIFICATION
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {activeStandard.rule}
            </p>
          </div>

          <div className="mb-2 flex justify-between items-center text-[11px] font-bold">
            <span className="text-slate-700 dark:text-slate-300">MACHINE POLICY CODE</span>
            <span className="text-sky-600 dark:text-sky-400">VERIFIED CANONICAL SPEC</span>
          </div>

          <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl border border-slate-800 text-[11.5px] font-mono leading-relaxed overflow-x-auto">
            <code>{activeStandard.snippet}</code>
          </pre>
        </div>

      </div>

    </div>
  );
}
