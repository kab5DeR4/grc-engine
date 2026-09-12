import { useState, memo } from 'react';
import { 
  CheckCircle2, 
  GitBranch, 
  Lock, 
  Database, 
  ArrowRight,
  Scale,
  Layers,
  Terminal,
  Code2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// design token aligned framework mapping console (supports light/dark theme)
const FrameworkMappingSection = memo(function FrameworkMappingSection() {
  const [activeEvidence, setActiveEvidence] = useState(0);

  const frameworksList = [
    { name: 'SOC 2 Type II', tag: 'Security & Availability' },
    { name: 'ISO / IEC 27001', tag: 'Annex A ISMS' },
    { name: 'NIST CSF v2.0', tag: 'Core Functions' },
    { name: 'CIS Controls v8', tag: 'Safeguards IG1-3' },
    { name: 'HIPAA & GDPR', tag: 'Data Protection' },
  ];

  const evidenceSources = [
    {
      id: 'branch',
      title: 'GitHub Branch Protection',
      source: 'github.repository.branch_protection',
      target: 'main',
      icon: GitBranch,
      jsonPayload: {
        resource: "github.branch.production_main",
        enforce_admins: true,
        required_approving_review_count: 2,
        dismiss_stale_reviews: true,
        allow_force_pushes: false,
        require_linear_history: true
      },
      mappedFrameworks: [
        { name: 'SOC 2 Type II', control: 'CC6.8', desc: 'Change Authorization & Branch Rules' },
        { name: 'ISO / IEC 27001', control: 'A.8.28', desc: 'Secure Coding & CI/CD Pipelines' },
        { name: 'NIST CSF v2.0', control: 'PR.IP-1', desc: 'Baseline Configuration & Governance' },
        { name: 'CIS Controls v8', control: 'Safeguard 5.2', desc: 'Code Review & Dual-Reviewer Gate' },
      ]
    },
    {
      id: 'kms',
      title: 'AWS S3 Customer KMS Encryption',
      source: 'aws.s3.bucket_encryption',
      target: 'arn:aws:kms:us-east-1:98105',
      icon: Database,
      jsonPayload: {
        resource: "aws_s3_bucket.prod_compliance_vault",
        kms_master_key_id: "arn:aws:kms:us-east-1:98105:key/c8f2a",
        sse_algorithm: "aws:kms",
        bucket_key_enabled: true,
        block_public_acls: true,
        restrict_public_buckets: true
      },
      mappedFrameworks: [
        { name: 'SOC 2 Type II', control: 'CC6.1', desc: 'Data-at-Rest Cryptographic Isolation' },
        { name: 'ISO / IEC 27001', control: 'A.8.24', desc: 'Use of Customer-Managed Cryptography' },
        { name: 'NIST CSF v2.0', control: 'PR.DS-1', desc: 'Data Protection & Storage Governance' },
        { name: 'CIS Controls v8', control: 'Safeguard 3.3', desc: 'KMS Default Storage Encryption' },
      ]
    },
    {
      id: 'mfa',
      title: 'Hardware FIDO2 WebAuthn MFA',
      source: 'okta.auth.factors + aws.iam',
      target: '142 Administrator Identities',
      icon: Lock,
      jsonPayload: {
        identity_provider: "okta.federated.saml",
        factor_type: "fido2_webauthn_hardware",
        attestation_enforced: true,
        root_mfa_active: true,
        session_lifetime_seconds: 43200,
        unattested_logins: 0
      },
      mappedFrameworks: [
        { name: 'SOC 2 Type II', control: 'CC6.1', desc: 'Access & IAM Phishing-Resistant MFA' },
        { name: 'ISO / IEC 27001', control: 'A.5.15', desc: 'Access Control & Least Privilege' },
        { name: 'NIST CSF v2.0', control: 'PR.AC-1', desc: 'Identities Authenticated & Bound' },
        { name: 'CIS Controls v8', control: 'Safeguard 6.1', desc: 'Multi-Factor Access Enforcement' },
      ]
    },
  ];

  const current = evidenceSources[activeEvidence];

  return (
    <section id="frameworks" className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 font-sans bg-[var(--ground)] text-[var(--ink)]">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider">
            <Scale size={13} className="text-sky-500" />
            <span>CROSS-FRAMEWORK MAPPING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tight sm:tracking-tighter">
            One evidence layer. Multiple frameworks.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed font-normal">
            Map a single technical evidence proof across multiple compliance standards without duplicate testing.
          </p>
        </div>

        {/* Supported Standards Strip */}
        <div className="flex flex-wrap items-center gap-1.5">
          {frameworksList.map((fw) => (
            <div
              key={fw.name}
              className="px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--hairline)] flex items-center gap-1.5 text-[11px]"
            >
              <Layers size={11} className="text-sky-500" />
              <span className="font-bold text-[var(--ink)]">
                {fw.name}
              </span>
              <span className="text-[10px] text-[var(--ink-muted)] font-mono hidden sm:inline">
                &bull; {fw.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Developer Console Card (Uses CSS Design Tokens) */}
        <div className="border border-[var(--hairline)] rounded-xl bg-[var(--surface)] text-[var(--ink)] shadow-sm overflow-hidden font-mono">
          
          {/* Top Window-Header Console Panel Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-[var(--hairline)] bg-[var(--surface-raised)]">
            
            {/* Integrated Tab Triggers */}
            <div className="grid grid-cols-3 divide-x divide-[var(--hairline)] flex-1">
              {evidenceSources.map((ev, idx) => {
                const Icon = ev.icon;
                const isSelected = activeEvidence === idx;
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setActiveEvidence(idx)}
                    className={`p-2.5 sm:p-3 text-left transition-all duration-150 cursor-pointer flex items-center gap-2.5 border-none relative font-mono ${
                      isSelected
                        ? 'bg-[var(--surface)] text-[var(--ink)] shadow-xs'
                        : 'bg-[var(--surface-raised)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50'
                    }`}
                  >
                    {/* Top Accent Line Indicator for active tab */}
                    {isSelected && (
                      <span className="absolute top-0 left-0 right-0 h-0.5 bg-sky-500"></span>
                    )}
                    <Icon size={14} className={isSelected ? 'text-sky-500' : 'text-[var(--ink-muted)]'} />
                    <div className="min-w-0">
                      <div className="text-[11px] sm:text-xs font-bold truncate">{ev.title.split(' ')[0]} {ev.title.split(' ')[1]}</div>
                      <div className="text-[9.5px] text-[var(--ink-muted)] truncate hidden sm:block">
                        {ev.source.split('.')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Micro Window Status Badge */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 border-l border-[var(--hairline)] text-[10px] text-[var(--ink-muted)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[var(--ink-secondary)] font-semibold">REGO EVALUATOR: v0.62</span>
            </div>

          </div>

          {/* Console Content Canvas */}
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* Left Column: Formatted JSON Ingested State Payload */}
              <div className="lg:col-span-5 p-3.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--hairline)] space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-[var(--hairline)] text-[10px] text-[var(--ink-muted)]">
                  <span className="flex items-center gap-1.5 text-sky-500 font-semibold">
                    <Code2 size={12} />
                    <span>RAW TELEMETRY SNAPSHOT</span>
                  </span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>ATTESTED</span>
                  </span>
                </div>

                {/* Formatted JSON Viewport */}
                <pre className="text-[10px] sm:text-[11px] font-mono text-[var(--ink)] overflow-x-auto p-2.5 bg-[var(--ground)] rounded border border-[var(--hairline)] leading-relaxed max-h-48">
                  <code>
                    <span className="text-[var(--ink-muted)]">&#123;</span>{'\n'}
                    {Object.entries(current.jsonPayload).map(([key, val], i, arr) => (
                      <span key={key}>
                        {'  '}<span className="text-sky-600 dark:text-sky-400">&quot;{key}&quot;</span>: <span className={typeof val === 'boolean' ? 'text-amber-600 dark:text-amber-400' : typeof val === 'number' ? 'text-emerald-600 dark:text-emerald-400 tabular-nums' : 'text-[var(--ink-secondary)]'}>
                          {typeof val === 'string' ? `"${val}"` : String(val)}
                        </span>
                        {i < arr.length - 1 ? ',' : ''}{'\n'}
                      </span>
                    ))}
                    <span className="text-[var(--ink-muted)]">&#125;</span>
                  </code>
                </pre>

                <div className="text-[9.5px] text-[var(--ink-muted)] flex items-center justify-between pt-0.5 font-mono">
                  <span>TARGET: {current.target}</span>
                  <span className="text-[var(--ink-muted)]">SHA-256 SEALED</span>
                </div>
              </div>

              {/* Right Column: High-Density Framework Assertions Grid with Tabular Numerics */}
              <div className="lg:col-span-7 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-[var(--ink-muted)] uppercase tracking-wider pb-1">
                  <span>Simultaneously Mapped Framework Controls</span>
                  <span className="text-emerald-500 font-semibold">4/4 VERIFIED</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.mappedFrameworks.map((fw) => (
                    <div
                      key={fw.name}
                      className="p-3 rounded-lg bg-[var(--surface-raised)] border border-[var(--hairline)] flex items-start gap-2.5 transition-colors"
                    >
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[var(--ink)] truncate">
                            {fw.name}
                          </span>
                          <span className="text-[10px] font-bold text-sky-500 bg-[var(--accent-subtle)] px-1 rounded tabular-nums">
                            {fw.control}
                          </span>
                        </div>
                        <div className="text-[10.5px] text-[var(--ink-muted)] font-sans leading-tight mt-1">
                          {fw.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Micro Terminal Prompt Inset */}
                <div className="p-2 px-3 rounded bg-[var(--ground)] border border-[var(--hairline)] flex items-center justify-between text-[10px] text-[var(--ink-muted)]">
                  <div className="flex items-center gap-2 truncate">
                    <Terminal size={12} className="text-sky-500 shrink-0" />
                    <span className="text-[var(--ink-muted)] select-none">$</span>
                    <span className="text-[var(--ink-secondary)] truncate font-mono">grc-engine evaluate --source {current.source} --all-frameworks</span>
                  </div>
                  <span className="text-emerald-500 font-bold shrink-0 ml-2 tabular-nums font-mono">EXIT: 0 (OK)</span>
                </div>
              </div>

            </div>

            {/* Footer Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--ink-muted)] pt-3 border-t border-[var(--hairline)] gap-2">
              <span className="text-[11px] font-sans">
                Canonical control definitions translate infrastructure telemetry into auditor-accepted criterion IDs automatically.
              </span>
              <Link
                to="/controls"
                className="font-semibold text-sky-500 hover:underline flex items-center gap-1 text-decoration-none shrink-0 font-mono text-[11px]"
              >
                <span>Explore Controls Matrix</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

FrameworkMappingSection.displayName = 'FrameworkMappingSection';

export default FrameworkMappingSection;
