import { useState } from 'react';

const standards = [
  {
    code: 'STD-SOC2-CC6.1',
    title: 'SOC 2 Type II — Logical and Physical Access Controls',
    framework: 'AICPA Trust Services Criteria',
    rule: 'Logical access security measures prevent unauthorized access to system software, data, and application programs.',
    snippet: `package authz
default allow = false

allow {
    input.method == "GET"
    input.user.roles[_] == "security_auditor"
    input.user.mfa_authenticated == true
}`,
  },
  {
    code: 'STD-NIST-SC12',
    title: 'NIST SP 800-53 Rev. 5 — Cryptographic Key Establishment',
    framework: 'US National Institute of Standards',
    rule: 'The organization establishes and manages cryptographic keys for required cryptographic mechanisms using automated rotation and HSM isolation.',
    snippet: `kms:
  key_spec: RSA_4096
  rotation_period: 7776000s # 90 Days
  encryption_algorithm: AES_256_GCM
  hardware_security_module: FIPS_140_3_LEVEL_3`,
  },
  {
    code: 'STD-ISO-A12.4',
    title: 'ISO/IEC 27001:2022 — Logging and Monitoring Controls',
    framework: 'International Organization for Standardization',
    rule: 'Event logs recording user activities, exceptions, faults and information security events are produced, kept and regularly reviewed.',
    snippet: `struct AuditRecord {
    timestamp: i64,
    actor_id: String,
    action: String,
    resource: String,
    previous_hash: [u8; 32],
    signature: [u8; 64],
}`,
  },
];

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-12 pb-6 hairline-b">
          <div className="mono-label text-[#9B3418] mb-2">STUDIO PRACTICE & METHODOLOGY</div>
          <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
            Framework Standards & <span className="serif-italic-pigment">Fabrication Rules</span>
          </h1>
          <p className="mono-body text-[13px] text-[#4A4741] mt-3 max-w-3xl">
            Formal engineering definitions governing compliance enforcement across our studio architecture. Every rule is written in machine-verifiable policy declarations.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Standard Selectors */}
          <div className="lg:col-span-5 space-y-4">
            {standards.map((std, idx) => (
              <div
                key={std.code}
                onClick={() => setActiveTab(idx)}
                className={`p-5 cursor-pointer hairline-all transition-colors ${
                  activeTab === idx ? 'bg-[#DCD7CB] border-l-4 border-l-[#9B3418]' : 'bg-[#E7E3DA] hover:bg-[#DCD7CB]/40'
                }`}
              >
                <div className="mono-label text-[#9B3418] mb-1">{std.code}</div>
                <div className="font-serif text-[22px] font-bold text-[#1A1917] mb-2">{std.title}</div>
                <div className="mono-label text-[10px] text-[#6E6A61]">{std.framework}</div>
              </div>
            ))}
          </div>

          {/* Right Column: Code & Policy Inspector */}
          <div className="lg:col-span-7 bg-[#DCD7CB] p-6 hairline-all">
            <div className="mono-label text-[#9B3418] mb-2">{standards[activeTab].code} DIRECTIVE</div>
            <h2 className="serif-heading text-[28px] text-[#1A1917] mb-4">{standards[activeTab].title}</h2>

            <div className="p-4 bg-[#E7E3DA] hairline-all mb-6">
              <div className="mono-label text-[10px] text-[#6E6A61] mb-1">GOVERNING REGULATORY SPECIFICATION</div>
              <p className="mono-body text-[12px] text-[#1A1917] leading-relaxed">
                {standards[activeTab].rule}
              </p>
            </div>

            <div className="mono-label text-[#1A1917] mb-2 flex justify-between items-center">
              <span>MACHINE POLICY CODE</span>
              <span className="text-[10px] text-[#9B3418]">VERIFIED REPO / REVISION 4.12</span>
            </div>

            <pre className="bg-[#1A1917] text-[#E7E3DA] p-4 text-[11px] font-mono leading-relaxed overflow-x-auto border-radius-0">
              <code>{standards[activeTab].snippet}</code>
            </pre>
          </div>

        </div>
      </main>

          </div>
  );
}
