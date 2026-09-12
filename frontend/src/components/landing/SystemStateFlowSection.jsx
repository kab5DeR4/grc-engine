import { useState, memo } from 'react';
import { 
  Server, 
  Database, 
  Layers, 
  Cpu, 
  Scale, 
  FileCheck2, 
  ArrowDown, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

const SystemStateFlowSection = memo(function SystemStateFlowSection() {
  const [selectedLayer, setSelectedLayer] = useState(2); // default to Rule Engine

  const layers = [
    {
      id: 'sources',
      number: '01',
      title: 'Infrastructure & Source Systems',
      subtitle: 'GitHub Repositories • AWS / GCP / Azure • Okta Identity • Kubernetes',
      icon: Server,
      detail: 'Read-only collectors query API endpoints, CloudTrail logs, branch protection configs, and IAM policies at scheduled intervals or via webhook triggers.',
      technicalTags: ['GitHub OAuth', 'AWS IAM ReadOnly', 'eBPF Probes', 'Kube-API'],
    },
    {
      id: 'evidence',
      number: '02',
      title: 'Raw Evidence Ingestion & Hashing',
      subtitle: 'JSON Payloads • Snapshot Timestamps • SHA-256 Fingerprints',
      icon: Database,
      detail: 'Discovered configuration state is captured as raw JSON, sealed with a SHA-256 cryptographic digest, and placed into an immutable ledger before any analysis occurs.',
      technicalTags: ['SHA-256 Hashing', 'UTC Timestamps', 'Zero Data Mutation'],
    },
    {
      id: 'canonical',
      number: '03',
      title: 'Canonical Control Normalizer',
      subtitle: 'Universal Schema • Control Abstraction • Unified IDs',
      icon: Layers,
      detail: 'Vendor-specific properties (e.g. AWS KMS key policies vs GCP KMS rings) are mapped into universal canonical control requirements (e.g. CANONICAL-CTRL-KMS-ROTATION).',
      technicalTags: ['Schema Unification', 'Multi-Cloud Normalizer', 'De-duplication'],
    },
    {
      id: 'deterministic',
      number: '04',
      title: 'Deterministic Rule Engine',
      subtitle: 'Boolean Assertions • Threshold Checks • Zero Hallucinations',
      icon: Cpu,
      detail: 'Every canonical control executes explicit, explainable code rules against the normalized evidence. The output is strictly PASS, FAIL, or PARTIAL with complete audit reasoning.',
      technicalTags: ['Explicit Assertions', 'Explainable Reasoning', 'Zero AI Guesswork'],
    },
    {
      id: 'frameworks',
      number: '05',
      title: 'Multi-Framework Mapping Engine',
      subtitle: 'SOC 2 Type II • ISO 27001 • NIST CSF • CIS Controls • GDPR',
      icon: Scale,
      detail: 'A single passing canonical control satisfies corresponding controls across all selected regulatory frameworks simultaneously, eliminating redundant auditing efforts.',
      technicalTags: ['SOC 2 CC6', 'ISO 27001 A.8', 'NIST PR.IP', 'CIS Safeguards'],
    },
    {
      id: 'outputs',
      number: '06',
      title: 'Posture Intelligence & Audit Packages',
      subtitle: 'Continuous Scores • Gap Remediation • AICPA Export Packages',
      icon: FileCheck2,
      detail: 'Produces real-time compliance posture scores, automated finding remediation workflows, and machine-verifiable audit packages ready for external review.',
      technicalTags: ['Continuous Health Score', '1-Click Export', 'Auditor Verified'],
    },
  ];

  return (
    <section id="topology" className="w-full bg-slate-50 dark:bg-[var(--ground)] py-18 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-200 dark:border-slate-800 font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono font-bold tracking-wider text-sky-600 dark:text-sky-400 uppercase mb-2">
            System Topology Flow
          </div>
          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] font-serif mb-4">
            From system state to <span className="italic font-normal text-sky-600 dark:text-sky-400">verifiable compliance</span>.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-600 dark:text-slate-300 leading-relaxed">
            See the exact engineering pathway that bridges live production infrastructure with formal regulatory compliance requirements.
          </p>
        </div>

        {/* Engineered Flow Topology Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Flow Stack (6 Vertical Stages) */}
          <div className="lg:col-span-6 space-y-2.5">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              const isSelected = selectedLayer === idx;
              return (
                <div key={layer.id}>
                  <button
                    onClick={() => setSelectedLayer(idx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-slate-850 border-slate-900 dark:border-sky-400 shadow-md translate-x-1'
                        : 'bg-slate-100/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-850 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected 
                          ? 'bg-slate-900 text-white dark:bg-sky-400 dark:text-slate-950' 
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {layer.number}
                      </div>
                      <div>
                        <div className={`text-[13.5px] font-bold font-mono ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                          {layer.title}
                        </div>
                        <div className="text-[11.5px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {layer.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'} />
                      <ChevronRight size={16} className={`transition-transform text-slate-400 ${isSelected ? 'text-sky-600 dark:text-sky-400 translate-x-1' : ''}`} />
                    </div>
                  </button>

                  {/* Flow Arrow Connector between items */}
                  {idx < layers.length - 1 && (
                    <div className="flex justify-center py-1 text-slate-300 dark:text-slate-700">
                      <ArrowDown size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Selected Layer Inspector Card */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="bg-[var(--ground)] border border-slate-300 dark:border-slate-700/80 rounded-xl p-6 sm:p-8 shadow-md">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 font-mono">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                  <span className="font-bold text-sky-600 dark:text-sky-400 uppercase">
                    STAGE {layers[selectedLayer].number} // DEEP INSPECT
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Layer ID: {layers[selectedLayer].id}
                </span>
              </div>

              {/* Title & Detail */}
              <h3 className="text-[22px] sm:text-[26px] font-bold text-slate-900 dark:text-slate-100 font-serif mb-3">
                {layers[selectedLayer].title}
              </h3>
              
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                {layers[selectedLayer].subtitle}
              </div>

              <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                {layers[selectedLayer].detail}
              </p>

              {/* Technical Tags Cluster */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                  Technical Implementation Attributes
                </div>
                <div className="flex flex-wrap gap-2">
                  {layers[selectedLayer].technicalTags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Guarantee */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 size={13} /> Architecture Validated
                </span>
                <span>Deterministic Flow</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

SystemStateFlowSection.displayName = 'SystemStateFlowSection';

export default SystemStateFlowSection;
