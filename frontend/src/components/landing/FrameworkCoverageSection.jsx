import { useState, memo } from 'react';
import { Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FrameworkCoverageSection = memo(function FrameworkCoverageSection() {
  const [activeFramework, setActiveFramework] = useState(0);

  const frameworks = [
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      issuer: 'AICPA Trust Services Criteria',
      coverage: '142 Automated Controls',
      description: 'Continuous technical evidence collection for Security, Availability, and Confidentiality Trust Services Criteria.',
      keyControls: [
        'CC6.1: Logical Access & IAM Authentication',
        'CC6.6: Boundary Protection & Firewall Rules',
        'CC6.8: Change Management & PR Branch Rules',
        'CC7.1: Vulnerability Scanning & Patch Verification',
      ],
      sampleCanonicalMapping: 'CANONICAL-CTRL-BRANCH-01 maps directly to CC6.8'
    },
    {
      id: 'iso27001',
      name: 'ISO / IEC 27001:2022',
      issuer: 'International Organization for Standardization',
      coverage: '93 ISMS Technical Controls',
      description: 'Automated evidence mapping against Annex A security controls, covering organizational, people, physical, and technological safeguards.',
      keyControls: [
        'A.5.15: Access Control & Least Privilege',
        'A.8.9: Configuration Management Baselines',
        'A.8.24: Use of Cryptography & KMS Keys',
        'A.8.28: Secure Coding & CI/CD Pipeline Checks',
      ],
      sampleCanonicalMapping: 'CANONICAL-CTRL-KMS-02 maps directly to A.8.24'
    },
    {
      id: 'nist',
      name: 'NIST CSF v2.0',
      issuer: 'National Institute of Standards and Technology',
      coverage: '108 Core Subcategories',
      description: 'System state mapping across the six core NIST functions: Govern, Identify, Protect, Detect, Respond, and Recover.',
      keyControls: [
        'GV.OC-01: Organizational Context & Roles',
        'PR.AC-01: Identities & Credentials Authenticated',
        'PR.DS-01: Data-at-Rest Protection via KMS',
        'DE.CM-01: Continuous Network & Infrastructure Monitoring',
      ],
      sampleCanonicalMapping: 'CANONICAL-CTRL-IAM-04 maps directly to PR.AC-01'
    },
    {
      id: 'cis',
      name: 'CIS Controls v8',
      issuer: 'Center for Internet Security',
      coverage: '153 Safeguards (IG1, IG2, IG3)',
      description: 'Prescriptive technical configuration tests covering enterprise assets, software inventory, data protection, and account management.',
      keyControls: [
        'CIS 3: Data Protection & KMS Storage Policies',
        'CIS 5: Account Management & Hardware MFA',
        'CIS 6: Access Control & Network Segregation',
        'CIS 16: Application Software Security & Sast Scans',
      ],
      sampleCanonicalMapping: 'CANONICAL-CTRL-S3-01 maps directly to CIS 3.3'
    },
    {
      id: 'gdpr',
      name: 'GDPR Article 32',
      issuer: 'European Union Data Protection Regulation',
      coverage: 'Technical & Organizational Safeguards',
      description: 'Cryptographic proof logs verifying the confidentiality, integrity, availability, and resilience of data processing systems.',
      keyControls: [
        'Art 32.1(a): Pseudonymisation & AES-256 Encryption',
        'Art 32.1(b): Ongoing Confidentiality & System Uptime',
        'Art 32.1(c): Timely Data Restoration & Backup Sync',
        'Art 32.1(d): Regular Testing & Evaluation of Effectiveness',
      ],
      sampleCanonicalMapping: 'CANONICAL-CTRL-ENC-01 maps directly to Art 32.1(a)'
    },
  ];

  const current = frameworks[activeFramework];

  return (
    <section id="frameworks" className="w-full bg-slate-50 dark:bg-[var(--ground)] py-18 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-slate-200 dark:border-slate-800 font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono font-bold tracking-wider text-sky-600 dark:text-sky-400 uppercase mb-2">
            Multi-Framework Mapping
          </div>
          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] font-serif mb-4">
            One evidence record. <span className="italic font-normal text-sky-600 dark:text-sky-400">Multiple framework mappings</span>.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Stop running duplicate audits for each regulatory standard. GRC Engine normalizes evidence into canonical controls that satisfy SOC 2, ISO 27001, NIST CSF, and CIS Controls simultaneously.
          </p>
        </div>

        {/* Frameworks 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Framework Navigation List */}
          <div className="lg:col-span-5 space-y-2.5">
            {frameworks.map((fw, idx) => {
              const isSelected = activeFramework === idx;
              return (
                <button
                  key={fw.id}
                  onClick={() => setActiveFramework(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-slate-850 border-slate-900 dark:border-sky-400 shadow-md translate-x-1'
                      : 'bg-slate-100/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-850 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Scale size={14} className={isSelected ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'} />
                      <span className={`text-[14px] font-bold font-mono ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {fw.name}
                      </span>
                    </div>
                    <div className="text-[11.5px] text-slate-500 font-mono">
                      {fw.issuer}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {fw.coverage.split(' ')[0]} Checks
                  </span>
                </button>
              );
            })}

            {/* Regulatory Disclaimer Banner */}
            <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 leading-relaxed">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Accuracy &amp; Integrity Notice:
              </span>
              GRC Engine provides automated technical evidence discovery and control evaluation tools; formal certifications are issued by accredited external auditing bodies.
            </div>
          </div>

          {/* Right Column: Active Framework Detailed Mapping View */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--ground)] border border-slate-300 dark:border-slate-700/80 rounded-xl p-6 sm:p-8 shadow-md space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
                <div>
                  <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                    {current.issuer}
                  </div>
                  <h3 className="text-[24px] font-bold text-slate-900 dark:text-slate-100 font-serif mt-0.5">
                    {current.name}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold self-start sm:self-auto">
                  {current.coverage}
                </span>
              </div>

              <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {current.description}
              </p>

              {/* Key Automated Controls Evaluated */}
              <div className="space-y-3 font-mono text-xs">
                <div className="text-[11px] text-slate-500 uppercase font-semibold">
                  Sample Automated Technical Controls in this Standard:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.keyControls.map((ctrl, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded-xl bg-[var(--surface)]/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2 text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-[11.5px] leading-snug">{ctrl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canonical Cross-Mapping Link Box */}
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[10.5px] uppercase">Canonical Cross-Mapping:</span>
                  <span className="text-sky-600 dark:text-sky-400 font-bold">{current.sampleCanonicalMapping}</span>
                </div>
                <Link to="/controls" className="text-xs font-bold text-slate-900 dark:text-white hover:underline flex items-center gap-1 text-decoration-none shrink-0 ml-3">
                  <span>View Matrix</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

FrameworkCoverageSection.displayName = 'FrameworkCoverageSection';

export default FrameworkCoverageSection;
