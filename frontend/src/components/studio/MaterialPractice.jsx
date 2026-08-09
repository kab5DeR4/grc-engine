import { Link } from 'react-router-dom';

export default function MaterialPractice() {
  const capabilities = [
    { label: 'CAP.01', name: 'Automated Evidence Collection', desc: 'Eliminate manual screenshotting. Automatically gather cryptographic evidence directly from AWS, GCP, and Azure.', spec: 'MULTI-CLOUD' },
    { label: 'CAP.02', name: 'Continuous Monitoring & Alerting', desc: 'Monitor resources 24/7 with zero-delay alerting when configurations drift from your security baselines.', spec: 'REAL-TIME' },
    { label: 'CAP.03', name: 'Zero-Trust Role Enforcement', desc: 'Identify overly permissive IAM roles and automatically enforce least-privilege access across the organization.', spec: 'ZERO-TRUST' },
    { label: 'CAP.04', name: 'Audit-Ready Reporting Engine', desc: 'Generate fully compliant SOC2, ISO 27001, and HIPAA reports instantly for your external auditors.', spec: '1-CLICK EXPORT' },
    { label: 'CAP.05', name: 'Developer-First CI/CD Integration', desc: 'Integrate compliance checks directly into pipelines to proactively block risky code deployments.', spec: 'API-FIRST' },
  ];

  return (
    <section className="w-full bg-[#E7E3DA] py-20 px-6 md:px-12 hairline-b">
      {/* Header */}
      <div className="mb-12 pb-6 hairline-b flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <div className="mono-label text-[#9B3418] mb-2">SECTION 02 — CORE CAPABILITIES & BENEFITS</div>
          <h2 className="serif-heading text-[32px] md:text-[44px] text-[#1A1917]">
            Everything you need to <span className="serif-italic-pigment">stay compliant</span>
          </h2>
        </div>
        <Link to="/dashboard" className="studio-btn text-[11px] mt-4 md:mt-0">
          [ VIEW ALL FEATURES ]
        </Link>
      </div>

      {/* Hairline-ruled rows */}
      <div className="w-full hairline-t mb-16">
        {capabilities.map((item, idx) => (
          <div 
            key={idx}
            className="py-5 hairline-b grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-[#DCD7CB]/30 px-3 transition-colors"
          >
            <div className="md:col-span-2 mono-label text-[#9B3418]">{item.label}</div>
            <div className="md:col-span-4 font-serif text-[20px] font-semibold text-[#1A1917]">{item.name}</div>
            <div className="md:col-span-4 mono-body text-[12px] text-[#4A4741]">{item.desc}</div>
            <div className="md:col-span-2 text-left md:text-right mono-label text-[10.5px] text-[#1A1917] font-semibold">
              {item.spec}
            </div>
          </div>
        ))}
      </div>

      {/* Two-Column Prose and Data Pairing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 hairline-t">
        <div className="lg:col-span-6">
          <div className="mono-label text-[#9B3418] mb-3">WHY CHOOSE GRC ENGINE</div>
          <h3 className="serif-heading text-[26px] text-[#1A1917] mb-4">
            Security that scales with your engineering.
          </h3>
          <p className="mono-body text-[12.5px] leading-[1.7] text-[#4A4741] mb-4">
            Our approach moves beyond subjective security assessments and manual checkbox audits. We treat every compliance policy as a strict technical constraint—subjecting your security controls to continuous automated testing.
          </p>
          <p className="mono-body text-[12.5px] leading-[1.7] text-[#4A4741]">
            If a system misconfiguration occurs, our real-time telemetry triggers instant alerts and automated adjustments, ensuring that small deviations do not escalate into systemic breaches.
          </p>
        </div>

        <div className="lg:col-span-6 bg-[#DCD7CB] p-6 hairline-all">
          <div className="mono-label text-[#1A1917] mb-4 pb-2 hairline-b flex items-center justify-between">
            <span>REAL RESULTS</span>
            <span className="text-[#9B3418]">FOR OUR USERS</span>
          </div>

          <div className="space-y-4 mono-body text-[11.5px]">
            <div className="flex justify-between py-1 hairline-b">
               <span className="text-[#6E6A61]">SUPPORTED FRAMEWORKS</span>
              <span className="font-semibold text-[#1A1917]">15+ STANDARDS</span>
            </div>
            <div className="flex justify-between py-1 hairline-b">
              <span className="text-[#6E6A61]">AUTOMATED CHECKS</span>
              <span className="font-semibold text-[#1A1917]">24/7 COVERAGE</span>
            </div>
            <div className="flex justify-between py-1 hairline-b">
              <span className="text-[#6E6A61]">TIME SAVED ON AUDITS</span>
              <span className="font-semibold text-[#1A1917]">85% REDUCTION</span>
            </div>
            <div className="flex justify-between py-1 hairline-b">
              <span className="text-[#6E6A61]">AUTOMATED REMEDIATION</span>
              <span className="font-semibold text-[#9B3418]">1-CLICK FIXES</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#6E6A61]">FALSE POSITIVE RATE</span>
              <span className="font-semibold text-[#1A1917]">&lt; 0.01%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
