import { useState } from 'react';
import { Link } from 'react-router-dom';

const controlsData = [
  {
    id: 'CTL-001',
    name: 'KMS Key Envelope Encryption & Automated Rotation',
    category: 'CRYPTOGRAPHY',
    framework: 'NIST SP 800-53 SC-12',
    severity: 'CRITICAL',
    status: 'VERIFIED PASS',
    telemetry: 'AES-256-GCM / 90-DAY CYCLE',
    description: 'Hardware HSM backed master key derivation with envelope payload encryption. All data keys are rotated automatically every 90 days.',
    implementation: 'AWS KMS / HashiCorp Vault HSM module with RSA 4096-bit root key.',
    lastVerified: '2026-08-09T17:32:00Z',
  },
  {
    id: 'CTL-002',
    name: 'Zero-Trust IAM Least-Privilege Policy Enforcement',
    category: 'IDENTITY',
    framework: 'SOC 2 TYPE II CC6.1',
    severity: 'HIGH',
    status: 'VERIFIED PASS',
    telemetry: '0 UNUSED PERMISSIONS / <12ms',
    description: 'Attribute-based access control (ABAC) evaluating dynamic request context, device posture, and geolocation before issuing ephemeral JWTs.',
    implementation: 'Open Policy Agent (OPA) sidecar proxy running on Envoy mesh.',
    lastVerified: '2026-08-09T18:10:00Z',
  },
  {
    id: 'CTL-003',
    name: 'Immutable Append-Only Audit Log Ledger',
    category: 'AUDIT',
    framework: 'ISO 27001 A.12.4',
    severity: 'CRITICAL',
    status: 'VERIFIED PASS',
    telemetry: 'SHA-256 HASH CHAINING',
    description: 'Every system mutation writes a cryptographically signed block to an append-only object store with WORM retention policy enforced.',
    implementation: 'Amazon S3 Object Lock + Hardware Security Module signing.',
    lastVerified: '2026-08-09T18:45:00Z',
  },
  {
    id: 'CTL-004',
    name: 'Container Pod Security Admission & Non-Root User',
    category: 'INFRASTRUCTURE',
    framework: 'CIS KUBERNETES BENCHMARK',
    severity: 'HIGH',
    status: 'MONITORING',
    telemetry: 'UID > 10000 / READONLY FS',
    description: 'Kubernetes admission controller enforcing non-root execution, dropped Linux capabilities, and immutable root filesystems.',
    implementation: 'Kyverno Policy Engine + Containerd runtime security.',
    lastVerified: '2026-08-09T16:20:00Z',
  },
  {
    id: 'CTL-005',
    name: 'TLS 1.3 Mutual Authentication & Cipher Enforcement',
    category: 'BOUNDARY',
    framework: 'HIPAA §164.312(e)',
    severity: 'CRITICAL',
    status: 'VERIFIED PASS',
    telemetry: 'ECDHE-ECDSA-AES128-GCM',
    description: 'Strict mTLS required across all service-to-service communication. Legacy TLS 1.0/1.1/1.2 protocols disabled at edge load balancer.',
    implementation: 'Istio Service Mesh with SPIFFE/SPIRE workload identities.',
    lastVerified: '2026-08-09T18:50:00Z',
  },
  {
    id: 'CTL-006',
    name: 'Automated Egress Traffic Filtering & DNS Inspection',
    category: 'BOUNDARY',
    framework: 'NIST CSF 2.0 DE.CM',
    severity: 'MEDIUM',
    status: 'VERIFIED PASS',
    telemetry: 'ALLOWLIST ONLY / eBPF PROBES',
    description: 'All outbound traffic from production clusters strictly filtered against approved destination FQDNs using eBPF kernel probes.',
    implementation: 'Cilium NetworkPolicy + DNS proxy filter.',
    lastVerified: '2026-08-09T15:00:00Z',
  },
];

export default function ControlsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [selectedControl, setSelectedControl] = useState(controlsData[0]);

  const categories = ['ALL', 'CRYPTOGRAPHY', 'IDENTITY', 'AUDIT', 'INFRASTRUCTURE', 'BOUNDARY'];

  const filteredControls = controlsData.filter(item => {
    const matchesCategory = category === 'ALL' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.id.toLowerCase().includes(search.toLowerCase()) ||
                          item.framework.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-12 pb-6 hairline-b">
          <div className="mono-label text-[#9B3418] mb-2">GRC CONTROLS CATALOGUE</div>
          <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
            Control Specifications & <span className="serif-italic-pigment">Policy Matrix</span>
          </h1>
          <p className="mono-body text-[13px] text-[#4A4741] mt-3 max-w-3xl">
            Complete inventory of technical governance controls enforcing posture integrity. Every control is continuously monitored via eBPF probes and cryptographic proof chains.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 hairline-b">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`mono-label text-[10.5px] px-3 py-1.5 cursor-pointer border transition-colors ${
                  category === cat 
                    ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917]' 
                    : 'bg-transparent text-[#1A1917] border-[#1A1917]'
                }`}
              >
                [ {cat} ]
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="SEARCH CONTROLS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-1.5 text-[11px] mono-label text-[#1A1917] outline-none focus:border-[#9B3418]"
            />
          </div>
        </div>

        {/* Two-Column Explorer & Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Control List */}
          <div className="lg:col-span-7 space-y-4">
            {filteredControls.map((item) => {
              const isSelected = selectedControl.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedControl(item)}
                  className={`p-5 cursor-pointer hairline-all transition-colors ${
                    isSelected ? 'bg-[#DCD7CB] border-l-4 border-l-[#9B3418]' : 'bg-[#E7E3DA] hover:bg-[#DCD7CB]/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="mono-label text-[#9B3418] font-bold">{item.id}</span>
                    <span className="mono-label text-[10px] text-[#6E6A61]">{item.framework}</span>
                  </div>

                  <h3 className="serif-heading text-[22px] font-semibold text-[#1A1917] mb-2">
                    {item.name}
                  </h3>

                  <div className="flex justify-between items-center mt-3 pt-2 hairline-t text-[11px] mono-body">
                    <span className="text-[#4A4741]">{item.telemetry}</span>
                    <span className={`px-2 py-0.5 mono-label text-[9.5px] ${
                      item.status === 'VERIFIED PASS' ? 'bg-[#1A1917] text-[#E7E3DA]' : 'border border-[#9B3418] text-[#9B3418]'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Control Spec Drawer */}
          <div className="lg:col-span-5 bg-[#DCD7CB] p-6 hairline-all sticky top-[80px] h-fit">
            <div className="mono-label text-[#9B3418] mb-2">CONTROL SPECIFICATION SHEET</div>
            <div className="font-serif text-[26px] font-bold text-[#1A1917] mb-4">
              {selectedControl.id}: {selectedControl.name}
            </div>

            <div className="space-y-4 mono-body text-[12px] text-[#4A4741]">
              <div className="p-3 bg-[#E7E3DA] hairline-all">
                <div className="mono-label text-[10px] text-[#9B3418]">FRAMEWORK MAPPING</div>
                <div className="text-[#1A1917] font-semibold mt-0.5">{selectedControl.framework}</div>
              </div>

              <div>
                <div className="mono-label text-[10.5px] text-[#1A1917] mb-1">DESCRIPTION</div>
                <p className="leading-relaxed">{selectedControl.description}</p>
              </div>

              <div>
                <div className="mono-label text-[10.5px] text-[#1A1917] mb-1">TECHNICAL IMPLEMENTATION</div>
                <p className="leading-relaxed bg-[#E7E3DA] p-3 hairline-all text-[11.5px]">
                  {selectedControl.implementation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-[#E7E3DA] hairline-all">
                  <div className="mono-label text-[9.5px] text-[#6E6A61]">SEVERITY LEVEL</div>
                  <div className="mono-label text-[12px] text-[#9B3418] font-bold mt-1">{selectedControl.severity}</div>
                </div>
                <div className="p-3 bg-[#E7E3DA] hairline-all">
                  <div className="mono-label text-[9.5px] text-[#6E6A61]">LAST VERIFIED</div>
                  <div className="mono-label text-[10.5px] text-[#1A1917] mt-1">{new Date(selectedControl.lastVerified).toLocaleTimeString()}</div>
                </div>
              </div>

              <div className="pt-4 hairline-t flex gap-3">
                <Link to={`/archive?id=${selectedControl.id}`} className="studio-btn-primary studio-btn text-[10px] flex-1">
                  [ VIEW EVIDENCE PROOF ]
                </Link>
                <Link to="/scans" className="studio-btn studio-btn-pigment text-[10px] flex-1">
                  [ TEST CONTROL ]
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

          </div>
  );
}
