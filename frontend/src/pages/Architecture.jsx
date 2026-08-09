import { useState } from 'react';
import { FileCheck, Shield, Key, Network } from 'lucide-react';

const standards = [
  {
    code: 'STD-SOC2-CC6.1',
    title: 'SOC 2 Type II — Logical and Physical Access',
    icon: Shield,
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
    title: 'NIST SP 800-53 Rev. 5 — Cryptographic Key',
    icon: Key,
    rule: 'The organization establishes and manages cryptographic keys for required cryptographic mechanisms using automated rotation and HSM isolation.',
    snippet: `kms:
  key_spec: RSA_4096
  rotation_period: 7776000s # 90 Days
  encryption_algorithm: AES_256_GCM
  hardware_security_module: FIPS_140_3_LEVEL_3`,
  },
  {
    code: 'STD-ISO-A12.4',
    title: 'ISO/IEC 27001:2022 — Logging Controls',
    icon: FileCheck,
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
  {
    code: 'ENG-NET-01',
    title: 'Kinematic Drift & Attack Strain Modeling',
    icon: Network,
    rule: 'Continuous mathematical modeling of security posture drift and attack strain across network topologies.',
    snippet: `def calculate_strain(velocity, time):
    return (14.8 * (time ** 2)) + 2.1
    
def calculate_velocity(time):
    return (1.42 * math.cos(math.pi * time)) + 2.85`,
  }
];

export default function Architecture() {
  const [activeTab, setActiveTab] = useState(0);
  const activeStandard = standards[activeTab];

  return (
    <div className="flex flex-col gap-10 max-w-[1400px] mx-auto pb-20 font-mono text-[#1A1917]">
      
      {/* Header */}
      <header className="hairline-b pb-6">
        <div className="mono-label text-[#9B3418] mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#9B3418] inline-block"></span>
          ARCHITECTURE & POLICY SPECIFICATIONS — VOL. 04
        </div>
        <h1 className="serif-heading text-[36px] md:text-[52px] text-[#1A1917]">
          Architecture <span className="serif-italic-pigment">Specifications</span>
        </h1>
        <p className="mono-body text-[12.5px] text-[#4A4741] mt-2 max-w-3xl">
          Deep-dive technical definitions, cryptography directives, and verifiable machine policy declarations.
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Directives Selector */}
        <div className="lg:col-span-5 space-y-4">
          {standards.map((std, idx) => (
            <div
              key={std.code}
              onClick={() => setActiveTab(idx)}
              className={`p-5 cursor-pointer hairline-all transition-colors ${
                activeTab === idx 
                  ? 'bg-[#DCD7CB] border-l-4 border-l-[#9B3418]' 
                  : 'bg-[#E7E3DA] hover:bg-[#DCD7CB]/40'
              }`}
            >
              <div className="mono-label text-[#9B3418] mb-1">{std.code}</div>
              <div className="font-serif text-[20px] font-bold text-[#1A1917] mb-1">{std.title}</div>
            </div>
          ))}
        </div>

        {/* Right Column: Code & Inspector */}
        <div className="lg:col-span-7 bg-[#DCD7CB] p-6 hairline-all">
          <div className="mono-label text-[#9B3418] mb-1">{activeStandard.code} DIRECTIVE</div>
          <h2 className="serif-heading text-[26px] text-[#1A1917] mb-4">{activeStandard.title}</h2>

          <div className="p-4 bg-[#E7E3DA] hairline-all mb-6">
            <div className="mono-label text-[10px] text-[#6E6A61] mb-1">GOVERNING REGULATORY SPECIFICATION</div>
            <p className="mono-body text-[12px] text-[#1A1917] leading-relaxed">
              {activeStandard.rule}
            </p>
          </div>

          <div className="mono-label text-[#1A1917] mb-2 flex justify-between items-center text-[11px]">
            <span>MACHINE POLICY CODE</span>
            <span className="text-[#9B3418]">VERIFIED REPO / REVISION 4.12</span>
          </div>

          <pre className="bg-[#1A1917] text-[#E7E3DA] p-4 text-[11px] font-mono leading-relaxed overflow-x-auto">
            <code>{activeStandard.snippet}</code>
          </pre>
        </div>

      </div>

    </div>
  );
}
