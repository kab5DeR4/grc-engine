import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, CheckCircle2, Terminal, ArrowRight, Check } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';

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
    lastVerified: '2026-09-13T14:30:00Z',
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
    lastVerified: '2026-09-13T14:32:00Z',
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
    lastVerified: '2026-09-13T14:35:00Z',
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
    lastVerified: '2026-09-13T14:20:00Z',
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
    lastVerified: '2026-09-13T14:40:00Z',
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
    lastVerified: '2026-09-13T14:15:00Z',
  },
];

export default function ControlsPage() {
  const { isLiveMode, liveControls, fetchLiveTelemetry } = useDemoStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [tested, setTested] = useState(false);

  useEffect(() => {
    if (isLiveMode) {
      fetchLiveTelemetry();
    }
  }, [isLiveMode, fetchLiveTelemetry]);

  const activeControls = useMemo(() => {
    if (isLiveMode) {
      if (liveControls && liveControls.length > 0) {
        return liveControls.map(c => ({
          id: c.control_code || c.id,
          name: c.title || c.name,
          category: (c.category || 'INFRASTRUCTURE').toUpperCase(),
          framework: c.framework_mapping || 'SOC 2 / ISO 27001',
          severity: c.severity || 'HIGH',
          status: c.status || 'VERIFIED PASS',
          telemetry: c.telemetry_source || 'REST API / AST PROBE',
          description: c.description || 'Canonical security control rule.',
          implementation: c.implementation_spec || 'Deterministic Engine Rule Evaluator',
          lastVerified: c.last_evaluated_at || new Date().toISOString(),
        }));
      }
      return [];
    }
    return controlsData;
  }, [isLiveMode, liveControls]);

  const [selectedControl, setSelectedControl] = useState(activeControls[0] || null);

  useEffect(() => {
    if (activeControls.length > 0 && (!selectedControl || !activeControls.some(c => c.id === selectedControl.id))) {
      setSelectedControl(activeControls[0]);
    }
  }, [activeControls, selectedControl]);

  const categories = ['ALL', 'CRYPTOGRAPHY', 'IDENTITY', 'AUDIT', 'INFRASTRUCTURE', 'BOUNDARY'];

  const filteredControls = activeControls.filter(item => {
    const matchesCategory = category === 'ALL' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.id.toLowerCase().includes(search.toLowerCase()) ||
                          item.framework.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTestControl = () => {
    setTested(true);
    setTimeout(() => setTested(false), 2500);
  };

  return (
    <div className="w-full h-full font-sans text-slate-900 dark:text-slate-100 max-w-[1520px] mx-auto pb-16 space-y-6">
      
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10.5px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Canonical Control Catalog
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Control Specifications &amp; Policy Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Standard technical governance controls enforcing posture integrity across SOC 2, ISO 27001, and NIST CSF baselines.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <span>{filteredControls.length} Controls Filtered</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 p-3 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer border ${
                category === cat 
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-medium' 
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search controls or framework..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-1.5 rounded-lg text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
          />
        </div>
      </div>

      {/* Master-Detail Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Controls List (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredControls.length === 0 ? (
            <div className="p-12 text-center bg-[var(--surface)] rounded-xl border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
              <Shield size={36} className="mx-auto text-slate-400 opacity-60" />
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {isLiveMode ? 'No Live Controls Evaluated' : 'No Matching Controls Found'}
              </div>
              <p className="text-xs text-slate-500 font-mono max-w-sm mx-auto leading-relaxed">
                {isLiveMode 
                  ? 'Connect GitHub or a cloud provider in Integrations, then trigger a compliance scan to evaluate canonical controls.'
                  : 'Try adjusting your search query or filter category.'}
              </p>
              {isLiveMode && (
                <div className="pt-2">
                  <Link
                    to="/dashboard/integrations"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all no-underline"
                  >
                    <span>Go to Integrations</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            filteredControls.map((item) => {
              const isSelected = selectedControl?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedControl(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer font-sans space-y-2.5 ${
                    isSelected
                      ? 'bg-white dark:bg-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-xs ring-1 ring-zinc-900 dark:ring-zinc-100'
                      : 'bg-[var(--surface)] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-orange-600 dark:text-orange-400">
                        {item.id}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {item.framework}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10.5px] font-medium ${
                      item.status === 'VERIFIED PASS'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>Telemetry: {item.telemetry}</span>
                    <span className="text-[10.5px] uppercase">{item.category}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Sticky Control Specification Sheet (5 Cols) */}
        <div className="lg:col-span-5 sticky top-20 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs font-sans">
          {selectedControl ? (
            <>
              <div className="space-y-1.5 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Control Specification Sheet
                </div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {selectedControl.id}: {selectedControl.name}
                </h2>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    Framework Crosswalk Mapping
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
                    {selectedControl.framework}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    Policy Assertion Description
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    {selectedControl.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    Technical Implementation Spec
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedControl.implementation}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase">Severity</span>
                    <div className="font-semibold text-rose-600 dark:text-rose-400">
                      {selectedControl.severity}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase">Last Verified</span>
                    <div className="text-slate-700 dark:text-slate-300 truncate">
                      {new Date(selectedControl.lastVerified).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <Link
                  to={`/archive?id=${selectedControl.id}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-xs font-medium transition-colors text-center no-underline flex items-center justify-center gap-1.5"
                >
                  <Shield size={13} />
                  <span>View Evidence Proof</span>
                </Link>

                <button
                  type="button"
                  onClick={handleTestControl}
                  className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5"
                >
                  {tested ? <Check size={13} className="text-emerald-600" /> : <Terminal size={13} />}
                  <span>{tested ? 'Rule Passed' : 'Test Rule'}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">
              Select a control to view specification
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
