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
    <div className="w-full h-full font-mono text-slate-900 dark:text-slate-100">
      
      <main className="py-8 sm:py-12 max-w-[1520px] mx-auto space-y-8">
        {/* Page Header */}
        <div className="pb-6 border-b border-slate-300 dark:border-slate-800">
          <div className="text-[10.5px] font-bold text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wider">
            GRC CONTROLS CATALOGUE
          </div>
          <h1 className="serif-heading text-[34px] md:text-[48px] text-slate-900 dark:text-white font-bold">
            Control Specifications & <span className="serif-italic-pigment text-sky-600 dark:text-sky-400">Policy Matrix</span>
          </h1>
          <p className="mono-body text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">
            Complete inventory of technical governance controls enforcing posture integrity. Every control is continuously monitored via eBPF probes and cryptographic proof chains.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`text-[11px] font-bold px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  category === cat 
                    ? 'bg-slate-900 text-white dark:bg-sky-400 dark:text-slate-950 border-slate-900 dark:border-sky-400 shadow-xs' 
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="SEARCH CONTROLS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-slate-900 dark:focus:border-sky-400 shadow-xs"
            />
          </div>
        </div>

        {/* Two-Column Explorer & Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Control List */}
          <div className="lg:col-span-7 space-y-3">
            {filteredControls.map((item) => {
              const isSelected = selectedControl.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedControl(item)}
                  className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                    isSelected 
                      ? 'bg-slate-100 dark:bg-slate-800 border-slate-900 dark:border-sky-400 shadow-sm' 
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">{item.id}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{item.framework}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.name}
                  </h3>

                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{item.telemetry}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'VERIFIED PASS' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' 
                        : 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Control Spec Drawer */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-sm sticky top-[80px] h-fit">
            <div className="text-[10.5px] font-bold text-sky-600 dark:text-sky-400 mb-1 uppercase tracking-wider">
              CONTROL SPECIFICATION SHEET
            </div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
              {selectedControl.id}: {selectedControl.name}
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">FRAMEWORK MAPPING</div>
                <div className="text-slate-900 dark:text-white font-bold mt-0.5">{selectedControl.framework}</div>
              </div>

              <div>
                <div className="text-[10.5px] font-bold text-slate-900 dark:text-white uppercase mb-1">DESCRIPTION</div>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">{selectedControl.description}</p>
              </div>

              <div>
                <div className="text-[10.5px] font-bold text-slate-900 dark:text-white uppercase mb-1">TECHNICAL IMPLEMENTATION</div>
                <p className="leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-[11.5px] text-slate-800 dark:text-slate-200 font-mono">
                  {selectedControl.implementation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[9.5px] font-bold text-slate-500 uppercase">SEVERITY LEVEL</div>
                  <div className="text-xs text-rose-600 dark:text-rose-400 font-bold mt-1">{selectedControl.severity}</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[9.5px] font-bold text-slate-500 uppercase">LAST VERIFIED</div>
                  <div className="text-xs text-slate-800 dark:text-slate-200 font-bold mt-1">{new Date(selectedControl.lastVerified).toLocaleTimeString()}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
                <Link 
                  to={`/archive?id=${selectedControl.id}`} 
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 rounded-xl text-xs font-bold text-center flex-1 transition-all shadow-xs"
                >
                  View Evidence Proof
                </Link>
                <Link 
                  to="/scans" 
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-center flex-1 transition-all"
                >
                  Test Control
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

          </div>
  );
}
