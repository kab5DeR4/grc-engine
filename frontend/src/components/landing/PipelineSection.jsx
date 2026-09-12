import { useState, memo } from 'react';
import { 
  Search, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  FileCheck2, 
  ArrowRight, 
  Check, 
  Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PipelineSection = memo(function PipelineSection() {
  const [selectedStage, setSelectedStage] = useState(0);

  const stages = [
    {
      id: 'discover',
      step: '01',
      name: 'Discover',
      title: 'Continuous System State Ingestion',
      icon: Search,
      shortDesc: 'Ingest raw configuration state from GitHub repositories, cloud infrastructure, and IAM providers via non-intrusive read-only APIs.',
      payloadLabel: 'Ingested Telemetry Stream',
      payloadCode: `// Telemetry ingestion from GitHub API & CloudTrail
{
  "source": "github_org/core-services",
  "resource_type": "repository_branch_protection",
  "target_branch": "main",
  "state": {
    "enforce_admins": true,
    "required_approving_review_count": 2,
    "required_linear_history": true,
    "allow_force_pushes": false,
    "allow_deletions": false
  },
  "ingested_at": "2026-09-12T10:42:01.482Z"
}`,
      outputVerdict: 'Discovered 142 Active Technical Assets Across 6 Cloud Environments',
    },
    {
      id: 'normalize',
      step: '02',
      name: 'Normalize',
      title: 'Canonical Control Normalization',
      icon: Layers,
      shortDesc: 'Translate heterogeneous vendor schemas into standard canonical controls mapped to universal security baselines.',
      payloadLabel: 'Canonical Control Model Mapping',
      payloadCode: `// Canonical Control Normalization Engine
{
  "canonical_control_id": "CANONICAL-CTRL-042",
  "title": "Production Branch Protection & Change Control",
  "framework_mappings": [
    { "framework": "SOC2_TYPE_II", "criterion": "CC6.8 (Change Authorization)" },
    { "framework": "ISO_27001_2022", "control": "A.8.28 (Secure Coding)" },
    { "framework": "NIST_CSF_V2", "subcategory": "PR.IP-1 (Baseline Config)" },
    { "framework": "CIS_CONTROLS_V8", "safeguard": "Safeguard 5.2" }
  ],
  "required_parameters": ["enforce_admins == true", "approvals >= 1"]
}`,
      outputVerdict: 'Normalized 200+ Vendor Properties into Universal Canonical Rules',
    },
    {
      id: 'evaluate',
      step: '03',
      name: 'Evaluate',
      title: 'Deterministic Rule Execution',
      icon: Cpu,
      shortDesc: 'Execute explicit boolean and threshold assertions against normalized controls. Zero black-box AI or subjective speculation.',
      payloadLabel: 'Deterministic Rule Logic & Assertion',
      payloadCode: `// Deterministic Rule Evaluator (Zero Hallucination)
function evaluateControl(state, rules) {
  const adminCheck = state.enforce_admins === true;
  const reviewCheck = state.required_approving_review_count >= 1;
  const noForcePush = state.allow_force_pushes === false;

  if (adminCheck && reviewCheck && noForcePush) {
    return {
      status: "PASS",
      score: 1.0,
      reason: "All branch protection criteria satisfied."
    };
  }
  return { status: "FAIL", score: 0.0, reason: "Missing required reviewers or admin lock." };
}`,
      outputVerdict: 'Deterministic Verdict: PASS // 100% Explainable Audit Logic',
    },
    {
      id: 'prove',
      step: '04',
      name: 'Prove',
      title: 'Cryptographic SHA-256 Vaulting',
      icon: ShieldCheck,
      shortDesc: 'Generate tamper-evident cryptographic hashes for every evidence payload, preserving timestamped records in EvidenceVault.',
      payloadLabel: 'Cryptographic Fingerprint & Hash Seal',
      payloadCode: `// Tamper-Evident Evidence Vault Record
{
  "evidence_id": "EVD-2026-98104",
  "canonical_control": "CANONICAL-CTRL-042",
  "sha256_digest": "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
  "algorithm": "SHA-256 (FIPS 180-4)",
  "immutable": true,
  "signature_chain": "VALID // PREV_HASH: 3d1e498f4bb61b619280d5d36e2f1f0088cb39d2",
  "captured_by": "TelemetryCollectorDaemon/v2.4"
}`,
      outputVerdict: 'Tamper-Evident SHA-256 Evidence Sealed in Immutable Vault',
    },
    {
      id: 'report',
      step: '05',
      name: 'Report',
      title: 'Actionable Posture & Export Packages',
      icon: FileCheck2,
      shortDesc: 'Synthesize verified control outcomes into real-time posture health benchmarks and auditor-ready export packages.',
      payloadLabel: 'Auditor-Ready Report Package Structure',
      payloadCode: `// Compliance Audit Report Bundle (Q3 2026)
{
  "audit_package_id": "PKG-SOC2-2026-Q3",
  "target_framework": "SOC 2 Type II",
  "overall_compliance_score": 98.4,
  "total_controls_evaluated": 142,
  "verified_controls": 140,
  "in_remediation": 2,
  "evidence_records_attached": 420,
  "auditor_format": "AICPA / Big 4 Machine-Verifiable JSON & PDF",
  "integrity_status": "ALL_HASHES_VERIFIED"
}`,
      outputVerdict: 'Auditor-Grade Report Package Generated with Embedded Hashes',
    },
  ];

  const current = stages[selectedStage];

  return (
    <section id="pipeline" className="w-full bg-slate-50 dark:bg-[var(--ground)] py-18 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-200 dark:border-slate-800 font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-slate-200 dark:border-slate-800 gap-6">
          <div>
            <div className="text-[11px] font-mono font-bold tracking-wider text-sky-600 dark:text-sky-400 uppercase mb-2">
              The Architecture Pipeline
            </div>
            <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] font-serif">
              The 5-stage <span className="italic font-normal text-sky-600 dark:text-sky-400">compliance engineering</span> pipeline.
            </h2>
            <p className="text-[14.5px] sm:text-[16px] text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
              How raw infrastructure state transforms into deterministic, auditor-verifiable compliance intelligence.
            </p>
          </div>

          <Link
            to="/architecture"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 text-xs font-mono font-bold transition-all inline-flex items-center gap-2 self-start md:self-auto text-decoration-none shadow-xs"
          >
            <span>Interactive Architecture Graph</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 5-Stage Stepper Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(idx)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-850 border-slate-900 dark:border-sky-400 shadow-sm -translate-y-0.5'
                    : 'bg-slate-100/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2 font-mono text-xs">
                  <span className={`font-bold ${isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'}`}>
                    STAGE {stage.step}
                  </span>
                  <Icon size={16} className={isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'} />
                </div>
                <div className={`text-sm sm:text-base font-bold tracking-tight font-serif ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                  {stage.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Interactive Deep-Dive Card */}
        <div className="bg-[var(--ground)] border border-slate-300 dark:border-slate-700/80 rounded-xl p-6 sm:p-8 md:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Stage Explanation & Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono font-bold uppercase mb-3">
                  <span>STAGE {current.step} OF 05</span>
                </div>
                <h3 className="text-[22px] sm:text-[26px] font-bold text-slate-900 dark:text-slate-100 font-serif leading-tight">
                  {current.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                  {current.shortDesc}
                </p>
              </div>

              {/* Status Verification Badge */}
              <div className="p-4 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Stage Output &amp; Verification State
                </div>
                <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Check size={14} />
                  <span>{current.outputVerdict}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedStage((prev) => (prev + 1) % stages.length)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-300 dark:border-slate-700"
                >
                  <span>Next Stage ({stages[(selectedStage + 1) % stages.length].name})</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right Column: Code Payload & Assertion Viewer */}
            <div className="lg:col-span-7 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal size={13} className="text-sky-400" />
                  <span className="font-semibold text-slate-300 text-[11px]">
                    {current.payloadLabel}
                  </span>
                </div>
                <span className="text-[10.5px] text-slate-500">JSON / Engine v2.4</span>
              </div>
              <pre className="p-4 sm:p-5 text-slate-100 overflow-x-auto leading-relaxed text-xs max-h-[340px]">
                {current.payloadCode}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

PipelineSection.displayName = 'PipelineSection';

export default PipelineSection;
