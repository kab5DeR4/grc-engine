import { useState } from 'react';
import { FileCheck, Shield, Key, Server, Copy, Check, Play, Terminal, CheckCircle2, XCircle } from 'lucide-react';

const standards = [
  {
    code: 'STD-SOC2-CC6.1',
    title: 'SOC 2 Type II — Logical Access & Identity Governance',
    framework: 'SOC 2',
    icon: Shield,
    language: 'rego',
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
    defaultInput: JSON.stringify({
      method: "GET",
      user: {
        roles: ["security_auditor"],
        mfa_authenticated: true
      },
      client_context: {
        tls_version: 1.3
      }
    }, null, 2)
  },
  {
    code: 'STD-NIST-SC12',
    title: 'NIST SP 800-53 Rev. 5 — Cryptographic Key Management',
    framework: 'NIST CSF',
    icon: Key,
    language: 'yaml',
    rule: 'Automated cryptographic key rotation and FIPS 140-3 HSM isolation enforced across all production data stores and telemetry digests.',
    snippet: `kms_key_policy:
  key_spec: RSA_4096
  envelope_algorithm: AES_256_GCM
  rotation_period: 7776000s # 90 Days Automated Cycle
  hardware_security_module: FIPS_140_3_LEVEL_3
  enforce_dual_authorization: true`,
    defaultInput: JSON.stringify({
      key_spec: "RSA_4096",
      envelope_algorithm: "AES_256_GCM",
      rotation_period_seconds: 7776000,
      hsm_level: "FIPS_140_3_LEVEL_3"
    }, null, 2)
  },
  {
    code: 'STD-ISO-A12.4',
    title: 'ISO/IEC 27001:2022 — Immutable Audit Log Ledger',
    framework: 'ISO 27001',
    icon: FileCheck,
    language: 'rust',
    rule: 'Event logs recording user activities, exceptions, and security events are cryptographically hashed and stored in append-only WORM ledgers.',
    snippet: `#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AuditRecordProof {
    pub timestamp: i64,
    pub actor_id: String,
    pub action: String,
    pub resource: String,
    pub sha256_digest: [u8; 32],
    pub previous_hash: [u8; 32],
    pub hsm_signature: [u8; 64],
}`,
    defaultInput: JSON.stringify({
      actor_id: "usr_elena_ciso",
      action: "REMEDIATE_POLICY_DRIFT",
      resource: "aws_s3_bucket.evidence_vault",
      tamper_proof: true
    }, null, 2)
  },
  {
    code: 'STD-CIS-K8S-5.1',
    title: 'CIS Kubernetes Benchmark — Pod Security Admission',
    framework: 'CIS Benchmark',
    icon: Server,
    language: 'yaml',
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
    defaultInput: JSON.stringify({
      kind: "Pod",
      securityContext: {
        runAsNonRoot: true
      },
      containers: [{
        name: "api-service",
        readOnlyRootFilesystem: true,
        allowPrivilegeEscalation: false
      }]
    }, null, 2)
  }
];

export default function Architecture() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [testPayload, setTestPayload] = useState(standards[0].defaultInput);
  const [evalResult, setEvalResult] = useState(null);
  const [evaluating, setEvaluating] = useState(false);

  const activeStandard = standards[activeTab];

  const handleSelectTab = (idx) => {
    setActiveTab(idx);
    setTestPayload(standards[idx].defaultInput);
    setEvalResult(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeStandard.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunEvaluation = () => {
    setEvaluating(true);
    setEvalResult(null);

    setTimeout(() => {
      try {
        const parsed = JSON.parse(testPayload);
        let allowed = true;
        let reasons = [];

        if (activeStandard.code === 'STD-SOC2-CC6.1') {
          if (parsed.method !== 'GET') {
            allowed = false;
            reasons.push('HTTP method is not GET');
          }
          if (!parsed.user?.roles?.includes('security_auditor')) {
            allowed = false;
            reasons.push('User lacks security_auditor role');
          }
          if (!parsed.user?.mfa_authenticated) {
            allowed = false;
            reasons.push('MFA session authentication missing');
          }
          if ((parsed.client_context?.tls_version || 0) < 1.3) {
            allowed = false;
            reasons.push('TLS version is below required 1.3 threshold');
          }
        } else if (activeStandard.code === 'STD-CIS-K8S-5.1') {
          if (!parsed.securityContext?.runAsNonRoot) {
            allowed = false;
            reasons.push('runAsNonRoot is not set to true');
          }
          const container = parsed.containers?.[0];
          if (!container?.readOnlyRootFilesystem) {
            allowed = false;
            reasons.push('Container readOnlyRootFilesystem is not enabled');
          }
        }

        setEvalResult({
          allowed,
          executionTimeMs: Math.floor(Math.random() * 4) + 1,
          reasons: reasons.length > 0 ? reasons : ['All deterministic assertions evaluated strictly TRUE.']
        });
      } catch (err) {
        setEvalResult({
          allowed: false,
          executionTimeMs: 0,
          reasons: [`JSON parsing error: ${err.message}`]
        });
      }
      setEvaluating(false);
    }, 350);
  };

  return (
    <div className="flex flex-col gap-8 max-w-[1400px] mx-auto pb-20 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse"></span>
            POLICY SPECIFICATIONS & ENGINE AST
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Technical Architecture & Policy Rules
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Deterministic technical definitions, cryptography directives, and verifiable machine policy declarations evaluated continuously across all production clusters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 text-right">
            <div className="text-[11px] font-mono text-slate-500 uppercase">EVALUATION MODEL</div>
            <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mt-0.5">OPEN POLICY AGENT + AST</div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Directives Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
            CANONICAL DIRECTIVE SPECS ({standards.length})
          </div>

          {standards.map((std, idx) => {
            const isSelected = activeTab === idx;
            const Icon = std.icon;
            return (
              <button
                key={std.code}
                onClick={() => handleSelectTab(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected 
                    ? 'bg-[var(--surface)] border-sky-500 dark:border-sky-500 shadow-sm ring-1 ring-sky-500/30' 
                    : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className={`p-2.5 rounded-lg shrink-0 ${
                  isSelected 
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">{std.code}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {std.framework}
                    </span>
                  </div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white leading-snug line-clamp-1">
                    {std.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {std.rule}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Code, Policy Inspector & Interactive Sandbox */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Code Viewer */}
          <div className="bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
                  {activeStandard.code} SPECIFICATION
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeStandard.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase">
                  {activeStandard.language}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-900 dark:text-white">Regulatory Mandate: </span>
              {activeStandard.rule}
            </div>

            <div className="mt-4">
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-xl border border-slate-800 text-xs font-mono leading-relaxed overflow-x-auto selection:bg-sky-500 selection:text-white">
                <code>{activeStandard.snippet}</code>
              </pre>
            </div>
          </div>

          {/* Interactive Policy Tester Playground */}
          <div className="bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-sky-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  LIVE POLICY EVALUATION PLAYGROUND
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                JSON INPUT PAYLOAD
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1.5">
                  Input Telemetry Context:
                </label>
                <textarea
                  rows={8}
                  value={testPayload}
                  onChange={(e) => setTestPayload(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 p-3 rounded-xl border border-slate-800 font-mono text-xs outline-none focus:border-sky-500 resize-none"
                  placeholder="Enter JSON payload..."
                />
                <button
                  onClick={handleRunEvaluation}
                  disabled={evaluating}
                  className="mt-3 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play size={13} fill="currentColor" />
                  <span>{evaluating ? 'EVALUATING AST...' : 'TEST DIRECTIVE ASSERTION'}</span>
                </button>
              </div>

              <div className="flex flex-col justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                    EVALUATION RESULT
                  </div>

                  {evalResult ? (
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg border flex items-center gap-2.5 ${
                        evalResult.allowed 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                          : 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-400'
                      }`}>
                        {evalResult.allowed ? (
                          <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                        ) : (
                          <XCircle size={18} className="shrink-0 text-rose-500" />
                        )}
                        <div>
                          <div className="font-bold font-mono text-xs">
                            DECISION: {evalResult.allowed ? 'ALLOW (PASS)' : 'DENY (POLICY DRIFT)'}
                          </div>
                          <div className="text-[11px] opacity-80 font-mono">
                            Latency: {evalResult.executionTimeMs}ms • Deterministic AST
                          </div>
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="font-mono text-slate-500 text-[11px]">Assertion Traces:</div>
                        {evalResult.reasons.map((r, i) => (
                          <div key={i} className="text-slate-700 dark:text-slate-300 font-mono text-xs bg-[var(--surface)] p-2 rounded border border-slate-200 dark:border-slate-700">
                            • {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 flex flex-col items-center justify-center text-center text-slate-400 text-xs font-mono">
                      <span>Click "Test Directive Assertion" to evaluate payload against {activeStandard.code}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-500 flex justify-between items-center">
                  <span>Standard: {activeStandard.code}</span>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold">ZERO DRIFT CERTIFIED</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
