import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Server,
  Cloud,
  ShieldCheck,
  Activity,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Lock,
  RefreshCw,
  FileCode
} from 'lucide-react';

function GithubIcon(props) {
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function PinnedStudy() {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    {
      name: 'AWS Production',
      id: 'aws-prod',
      type: 'Cloud Infrastructure',
      icon: Cloud,
      controls: 142,
      status: 'Verified Secure',
      proofHash: 'sha256:7f83...a29b',
      latency: '24ms'
    },
    {
      name: 'GitHub Org & Repos',
      id: 'gh-org',
      type: 'Version Control & CI/CD',
      icon: GithubIcon,
      controls: 48,
      status: 'Branch Protected',
      proofHash: 'sha256:3d1e...98f4',
      latency: '18ms'
    },
    {
      name: 'Okta Identity SSO',
      id: 'okta',
      type: 'Identity & Access (IAM)',
      icon: Lock,
      controls: 36,
      status: 'MFA Enforced',
      proofHash: 'sha256:5b2c...e410',
      latency: '32ms'
    },
    {
      name: 'GCP Data Lake',
      id: 'gcp-dl',
      type: 'Data Storage & Encryption',
      icon: DatabaseIcon,
      controls: 64,
      status: 'KMS Encrypted',
      proofHash: 'sha256:9a0f...c721',
      latency: '41ms'
    },
    {
      name: 'Kubernetes Cluster',
      id: 'k8s',
      type: 'Container Orchestration',
      icon: Server,
      controls: 88,
      status: 'RBAC Validated',
      proofHash: 'sha256:1e6a...f882',
      latency: '15ms'
    },
    {
      name: 'Stripe Billing System',
      id: 'stripe',
      type: 'Financial & PCI DSS',
      icon: ShieldCheck,
      controls: 52,
      status: 'PCI Level 1 Tokenized',
      proofHash: 'sha256:4c8b...31ae',
      latency: '29ms'
    },
  ];

  function DatabaseIcon(props) {
    return <Server {...props} />;
  }

  // Rotate active evaluated node every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [nodes.length]);

  const auditEvents = [
    { time: '10:42:01', system: 'AWS IAM', policy: 'POL-001 Root Key Rotation', status: 'PASS' },
    { time: '10:42:02', system: 'GitHub', policy: 'POL-004 Signed Commits Required', status: 'PASS' },
    { time: '10:42:03', system: 'Okta', policy: 'POL-012 WebAuthn FIDO2 MFA Enforcement', status: 'PASS' },
    { time: '10:42:04', system: 'GCP Storage', policy: 'POL-018 Bucket Egress Logging', status: 'PASS' },
    { time: '10:42:05', system: 'Kubernetes', policy: 'POL-024 Non-Root Container Execution', status: 'PASS' },
  ];

  return (
    <section className="w-full bg-[#E7E3DA] dark:bg-[#121110] py-14 sm:py-18 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 font-sans transition-colors duration-200">
      <div className="w-full max-w-[92vw] 2xl:max-w-[1600px] mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B3418]/10 dark:bg-[#FF6B4A]/10 text-[#9B3418] dark:text-[#FF6B4A] text-[12px] font-semibold tracking-wider uppercase mb-3">
              <Sparkles size={13} />
              <span>Section 03 — Real-Time Telemetry</span>
            </div>
            <h2 className="text-[clamp(28px,3.4vw,46px)] font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-tight leading-[1.12] font-serif">
              Always know your <span className="italic font-normal text-[#9B3418] dark:text-[#FF6B4A]">security posture</span>.
            </h2>
            <p className="text-[14.5px] sm:text-[15.5px] md:text-[16px] text-[#6E6A61] dark:text-[#9E988B] mt-3 max-w-2xl leading-relaxed">
              Continuous background evaluation across your entire cloud ecosystem. Never wait for an audit to discover a configuration gap.
            </p>
          </div>

          {/* Active Monitoring Status Badge */}
          <div className="flex items-center gap-3 bg-[#DCD7CB]/60 dark:bg-[#1A1917] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 shadow-sm self-start md:self-auto shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55B685] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#55B685]"></span>
            </span>
            <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#1A1917] dark:text-[#E7E3DA] uppercase tracking-wider">
              Continuous Telemetry Active
            </span>
          </div>
        </div>

        {/* Live Observability Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-12">

          {/* Left Side: Connected Infrastructure Nodes */}
          <div className="lg:col-span-6 bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10">
                <span className="text-[11.5px] sm:text-[12px] font-semibold text-[#6E6A61] dark:text-[#9E988B] uppercase tracking-wider">
                  Connected Cloud Infrastructure
                </span>
                <span className="text-[10.5px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-[#55B685]/15 text-[#55B685]">
                  6 Systems Online
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {nodes.map((node, idx) => {
                  const isScanning = idx === activeNode;
                  const Icon = node.icon;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveNode(idx)}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${isScanning
                          ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:border-[#E7E3DA] shadow-md -translate-y-0.5'
                          : 'bg-[#E7E3DA] dark:bg-[#121110] text-[#1A1917] dark:text-[#E7E3DA] border-[#1A1917]/10 dark:border-[#E7E3DA]/10 hover:border-[#9B3418]/30 dark:hover:border-[#FF6B4A]/30'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Icon size={16} className={isScanning ? 'text-[#9B3418] dark:text-[#FF6B4A]' : 'text-[#6E6A61] dark:text-[#9E988B]'} />
                          <span className="text-[13.5px] font-bold tracking-tight">{node.name}</span>
                        </div>
                        {isScanning ? (
                          <span className="w-2 h-2 rounded-full bg-[#55B685] animate-ping"></span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#55B685]/70"></span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[11.5px] opacity-80 pt-1 border-t border-current/10">
                        <span>{node.controls} Controls</span>
                        <span className="font-medium">{isScanning ? 'Testing...' : node.status}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-between text-[12px] text-[#6E6A61] dark:text-[#9E988B]">
              <span>Next automated evaluation in 12 seconds</span>
              <Link to="/integrations" className="font-semibold text-[#9B3418] dark:text-[#FF6B4A] hover:underline flex items-center gap-1">
                Manage Integrations →
              </Link>
            </div>
          </div>

          {/* Right Side: Live Inspection & Audit Stream */}
          <div className="lg:col-span-6 bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10">
                <div className="flex items-center gap-2">
                  <Activity size={15} className="text-[#9B3418] dark:text-[#FF6B4A]" />
                  <span className="text-[12px] font-semibold text-[#6E6A61] dark:text-[#9E988B] uppercase tracking-wider">
                    Live Policy Execution Stream
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#6E6A61] dark:text-[#9E988B]">
                  Engine v2.4.1
                </span>
              </div>

              {/* Active Inspector Highlight Card */}
              <div className="bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-4 mb-5 shadow-sm">
                <div className="flex items-center justify-between text-[12px] text-[#6E6A61] dark:text-[#9E988B] mb-2">
                  <span>Currently Inspecting</span>
                  <span className="text-[#55B685] font-semibold flex items-center gap-1">
                    <RefreshCw size={11} className="animate-spin" /> Live Stream
                  </span>
                </div>
                <div className="text-[16px] font-bold text-[#1A1917] dark:text-[#E7E3DA] mb-1">
                  {nodes[activeNode].name}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[12px] pt-2 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10">
                  <div>
                    <span className="text-[#6E6A61] dark:text-[#9E988B]">Type: </span>
                    <span className="font-medium text-[#1A1917] dark:text-[#E7E3DA]">{nodes[activeNode].type}</span>
                  </div>
                  <div>
                    <span className="text-[#6E6A61] dark:text-[#9E988B]">Proof Hash: </span>
                    <span className="font-mono text-[11px] text-[#9B3418] dark:text-[#FF6B4A]">{nodes[activeNode].proofHash}</span>
                  </div>
                </div>
              </div>

              {/* Stream Logs */}
              <div className="space-y-2">
                {auditEvents.map((evt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#E7E3DA]/70 dark:bg-[#121110]/70 border border-[#1A1917]/5 dark:border-[#E7E3DA]/5 text-[12.5px]"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="font-mono text-[11px] text-[#6E6A61] dark:text-[#9E988B] shrink-0">{evt.time}</span>
                      <span className="font-semibold text-[#1A1917] dark:text-[#E7E3DA] shrink-0">[{evt.system}]</span>
                      <span className="text-[#6E6A61] dark:text-[#9E988B] truncate">{evt.policy}</span>
                    </div>
                    <span className="text-[10.5px] font-bold px-2 py-0.5 rounded bg-[#55B685]/15 text-[#55B685] shrink-0 ml-2">
                      {evt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-between text-[12px]">
              <span className="text-[#6E6A61] dark:text-[#9E988B]">
                Tamper-proof cryptographic hashes recorded to EvidenceVault.
              </span>
            </div>
          </div>

        </div>

        {/* Bottom KPI Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="text-[11px] font-semibold text-[#9B3418] dark:text-[#FF6B4A] uppercase tracking-wider">Compliance Score</div>
            <div className="text-[26px] sm:text-[32px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif mt-1">98/100</div>
            <div className="text-[11.5px] sm:text-[12px] text-[#55B685] font-medium mt-0.5 flex items-center gap-1">
              <CheckCircle2 size={13} /> Continuous Up-to-Date
            </div>
          </div>

          <div className="bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="text-[11px] font-semibold text-[#9B3418] dark:text-[#FF6B4A] uppercase tracking-wider">Controls Passing</div>
            <div className="text-[26px] sm:text-[32px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif mt-1">100%</div>
            <div className="text-[11.5px] sm:text-[12px] text-[#6E6A61] dark:text-[#9E988B] mt-0.5">Across all 6 connected environments</div>
          </div>

          <div className="bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="text-[11px] font-semibold text-[#9B3418] dark:text-[#FF6B4A] uppercase tracking-wider">Policies Enforced</div>
            <div className="text-[26px] sm:text-[32px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif mt-1">245</div>
            <div className="text-[11.5px] sm:text-[12px] text-[#6E6A61] dark:text-[#9E988B] mt-0.5">Automated technical rules active</div>
          </div>

          <div className="bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-[11px] font-semibold text-[#9B3418] dark:text-[#FF6B4A] uppercase tracking-wider">Avg Time to Detect</div>
              <div className="text-[26px] sm:text-[32px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif mt-1">&lt; 1 min</div>
            </div>
            <Link
              to="/reports"
              className="mt-3 py-2 sm:py-2.5 px-3 rounded-lg bg-[#1A1917] hover:bg-[#9B3418] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:hover:bg-[#FF6B4A] dark:hover:text-white text-[#E7E3DA] text-[12px] sm:text-[12.5px] font-medium text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>View Full Reports</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
