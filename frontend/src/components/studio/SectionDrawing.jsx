import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Activity,
  FileCheck2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lock,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';

export default function SectionDrawing() {
  const [activeTab, setActiveTab] = useState('POSTURE');
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotate tabs every 6 seconds if not manually clicked
  useEffect(() => {
    if (!isAutoPlay) return;
    const modes = ['POSTURE', 'ALERTS', 'REPORTS'];
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const nextIdx = (modes.indexOf(prev) + 1) % modes.length;
        return modes[nextIdx];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const valueProps = [
    {
      title: 'Unified Compliance Posture',
      desc: 'Consolidate all cloud accounts, CI/CD pipelines, and IAM policies into one real-time dashboard.',
    },
    {
      title: 'Continuous Automated Verification',
      desc: 'Replace annual manual audits with 24/7 background tests across 200+ security controls.',
    },
    {
      title: 'Cryptographic Audit Proofs',
      desc: 'Generate timestamped, SHA-256 hashed evidence packages formatted specifically for AICPA & Big 4 auditors.',
    },
    {
      title: 'Zero-Disruption Engineering Sync',
      desc: 'Seamless read-only API connectors for AWS, GCP, Azure, GitHub, Okta, and Kubernetes.',
    },
  ];

  return (
    <section className="w-full bg-[#E7E3DA] dark:bg-[#121110] py-14 sm:py-18 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 font-sans transition-colors duration-200">
      <div className="w-full max-w-[92vw] 2xl:max-w-[1600px] mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B3418]/10 dark:bg-[#FF6B4A]/10 text-[#9B3418] dark:text-[#FF6B4A] text-[12px] font-semibold tracking-wider uppercase mb-3">
              <Sparkles size={13} />
              <span>Section 01 — Platform Visibility</span>
            </div>
            <h2 className="text-[clamp(28px,3.4vw,46px)] font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-tight leading-[1.12] font-serif">
              Complete Visibility & <span className="italic font-normal text-[#9B3418] dark:text-[#FF6B4A]">Control Engine</span>
            </h2>
          </div>

          {/* Interactive Mode Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#DCD7CB]/60 dark:bg-[#1A1917] p-1.5 rounded-xl border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 self-start md:self-auto">
            {[
              { id: 'POSTURE', label: 'Posture', icon: ShieldCheck },
              { id: 'ALERTS', label: 'Security Checks', icon: Activity },
              { id: 'REPORTS', label: 'Audit Vault', icon: FileCheck2 },
            ].map((mode) => {
              const Icon = mode.icon;
              const active = activeTab === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setActiveTab(mode.id);
                    setIsAutoPlay(false);
                  }}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-[12.5px] sm:text-[13px] font-medium transition-all flex items-center gap-2 cursor-pointer border-none ${active
                      ? 'bg-[#1A1917] text-[#E7E3DA] dark:bg-[#E7E3DA] dark:text-[#1A1917] shadow-sm'
                      : 'bg-transparent text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA]'
                    }`}
                >
                  <Icon size={14} className={active ? 'text-[#9B3418] dark:text-[#FF6B4A]' : ''} />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start lg:items-center">

          {/* Left Column: Value Pillars & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              <p className="text-[14.5px] sm:text-[15.5px] md:text-[16px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed mb-6 sm:mb-8">
                Get a clean, unified view of your entire security posture. GRC Engine connects non-intrusively to your infrastructure, turning complex regulatory mandates into automated, verifiable code tests.
              </p>

              {/* Value Props List */}
              <div className="space-y-4 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 pt-6">
                {valueProps.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="w-5 h-5 rounded-full bg-[#55B685]/15 text-[#55B685] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={13} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#1A1917] dark:text-[#E7E3DA] group-hover:text-[#9B3418] dark:group-hover:text-[#FF6B4A] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[12.5px] sm:text-[13px] text-[#6E6A61] dark:text-[#9E988B] mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Cluster */}
            <div className="pt-4 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="px-5 py-2.5 sm:py-3 rounded-lg bg-[#1A1917] hover:bg-[#9B3418] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:hover:bg-[#FF6B4A] dark:hover:text-white text-[#E7E3DA] text-[13px] sm:text-[13.5px] font-medium transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <span>Launch Live Workspace</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/controls"
                className="text-[13px] sm:text-[13.5px] font-medium text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors"
              >
                View Controls Matrix →
              </Link>
            </div>
          </div>

          {/* Right Column: Live Interactive Product Visual */}
          <div className="lg:col-span-7 bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-2xl p-5 sm:p-6 md:p-8 relative overflow-hidden shadow-lg flex flex-col justify-between min-h-[380px] lg:min-h-[440px] h-auto">

            {/* Window Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#55B685] animate-pulse"></span>
                <span className="text-[12.5px] font-semibold text-[#1A1917] dark:text-[#E7E3DA]">
                  Active Telemetry Feed // {activeTab}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-semibold px-2.5 py-1 rounded bg-[#E7E3DA] dark:bg-[#252422] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 text-[#6E6A61] dark:text-[#9E988B]">
                <Activity size={12} className="text-[#55B685]" />
                <span>Continuous Sync</span>
              </div>
            </div>

            {/* TAB 1: POSTURE */}
            {activeTab === 'POSTURE' && (
              <div className="space-y-4 my-auto animate-fade-up">
                <div className="text-[12px] font-semibold text-[#6E6A61] dark:text-[#9E988B] uppercase tracking-wider">
                  Live Compliance Health Benchmarks
                </div>

                {/* Framework Card 1 */}
                <div className="bg-[#E7E3DA] dark:bg-[#121110] p-4 rounded-xl border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 space-y-2.5 shadow-sm">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="font-bold text-[#1A1917] dark:text-[#E7E3DA] flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#55B685]" />
                      SOC 2 Type II Security Suite
                    </span>
                    <span className="text-[13px] font-bold text-[#55B685]">98.4% Passing</span>
                  </div>
                  <div className="w-full bg-[#DCD7CB] dark:bg-[#252422] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#55B685] h-full rounded-full w-[98.4%] transition-all duration-700"></div>
                  </div>
                  <div className="flex justify-between text-[11.5px] text-[#6E6A61] dark:text-[#9E988B] pt-0.5">
                    <span>142 Automated Controls Evaluated</span>
                    <span className="text-[#55B685] font-medium">140 Verified // 2 In Review</span>
                  </div>
                </div>

                {/* Framework Card 2 */}
                <div className="bg-[#E7E3DA] dark:bg-[#121110] p-4 rounded-xl border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 space-y-2.5 shadow-sm">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="font-bold text-[#1A1917] dark:text-[#E7E3DA] flex items-center gap-2">
                      <Lock size={16} className="text-[#9B3418] dark:text-[#FF6B4A]" />
                      ISO / IEC 27001:2022 ISMS
                    </span>
                    <span className="text-[13px] font-bold text-[#9B3418] dark:text-[#FF6B4A]">100% Verified</span>
                  </div>
                  <div className="w-full bg-[#DCD7CB] dark:bg-[#252422] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#9B3418] dark:bg-[#FF6B4A] h-full rounded-full w-[100%] transition-all duration-700"></div>
                  </div>
                  <div className="flex justify-between text-[11.5px] text-[#6E6A61] dark:text-[#9E988B] pt-0.5">
                    <span>93 ISMS Policies Synced</span>
                    <span className="text-[#9B3418] dark:text-[#FF6B4A] font-medium">Continuous Auditor Proofs Active</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ALERTS / SECURITY CHECKS */}
            {activeTab === 'ALERTS' && (
              <div className="space-y-3 my-auto animate-fade-up">
                <div className="text-[12px] font-semibold text-[#6E6A61] dark:text-[#9E988B] uppercase tracking-wider">
                  Real-time Automated Fixes & Remediation
                </div>

                <div className="bg-[#E7E3DA] dark:bg-[#121110] p-3.5 rounded-xl border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-between text-[13px] shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#55B685]/15 text-[#55B685]">
                      AUTO-FIXED
                    </span>
                    <span className="text-[#1A1917] dark:text-[#E7E3DA] font-medium">AWS S3 Public Access Block Enforced</span>
                  </div>
                  <span className="text-[11.5px] text-[#6E6A61] dark:text-[#9E988B]">Just now</span>
                </div>

                <div className="bg-[#E7E3DA] dark:bg-[#121110] p-3.5 rounded-xl border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-between text-[13px] shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#9B3418]/15 text-[#9B3418] dark:text-[#FF6B4A]">
                      ATTENTION
                    </span>
                    <span className="text-[#1A1917] dark:text-[#E7E3DA] font-medium">GitHub Branch Protection Rule Missing on Production</span>
                  </div>
                  <Link to="/findings" className="text-[11.5px] font-bold text-[#9B3418] dark:text-[#FF6B4A] hover:underline">
                    Remediate →
                  </Link>
                </div>

                <div className="bg-[#E7E3DA] dark:bg-[#121110] p-3.5 rounded-xl border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-between text-[13px] shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#55B685]/15 text-[#55B685]">
                      VERIFIED
                    </span>
                    <span className="text-[#1A1917] dark:text-[#E7E3DA] font-medium">Kubernetes API TLS v1.3 Cipher Suite Active</span>
                  </div>
                  <span className="text-[11.5px] text-[#6E6A61] dark:text-[#9E988B]">2m ago</span>
                </div>
              </div>
            )}

            {/* TAB 3: REPORTS / EVIDENCE VAULT */}
            {activeTab === 'REPORTS' && (
              <div className="space-y-4 my-auto animate-fade-up">
                <div className="text-[12px] font-semibold text-[#6E6A61] dark:text-[#9E988B] uppercase tracking-wider">
                  Cryptographic Evidence Vault & Auditor Exports
                </div>

                <div className="bg-[#E7E3DA] dark:bg-[#121110] p-4 rounded-xl border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <div className="text-[11px] font-bold text-[#9B3418] dark:text-[#FF6B4A] uppercase tracking-wider">
                      SHA-256 Tamper-Proof Vault
                    </div>
                    <div className="text-[16px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif mt-0.5">
                      Auditor Proof Package (Q3 2026)
                    </div>
                    <p className="text-[12px] text-[#6E6A61] dark:text-[#9E988B] mt-0.5">
                      Contains 420 cryptographic evidence logs ready for external review.
                    </p>
                  </div>
                  <Link
                    to="/reports"
                    className="px-3.5 py-2 rounded-lg bg-[#1A1917] hover:bg-[#9B3418] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:hover:bg-[#FF6B4A] dark:hover:text-white text-[#E7E3DA] text-[12.5px] font-medium text-center shrink-0 transition-colors"
                  >
                    Export Package
                  </Link>
                </div>

                <div className="bg-[#E7E3DA] dark:bg-[#121110] p-3 rounded-xl border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-between text-[12px]">
                  <span className="text-[#6E6A61] dark:text-[#9E988B]">
                    Format compatible with: PwC, EY, KPMG, Deloitte, Schellman
                  </span>
                  <span className="font-bold text-[#55B685] flex items-center gap-1">
                    <CheckCircle2 size={13} /> 100% Certified
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Pipeline Workflow */}
            <div className="pt-5 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10">
                <div className="text-[10px] font-bold text-[#9B3418] dark:text-[#FF6B4A] uppercase">01. Ingest</div>
                <div className="text-[12px] font-semibold text-[#1A1917] dark:text-[#E7E3DA] mt-0.5">Cloud & CI/CD APIs</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10">
                <div className="text-[10px] font-bold text-[#9B3418] dark:text-[#FF6B4A] uppercase">02. Evaluate</div>
                <div className="text-[12px] font-semibold text-[#1A1917] dark:text-[#E7E3DA] mt-0.5">Continuous Policy Rules</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10">
                <div className="text-[10px] font-bold text-[#9B3418] dark:text-[#FF6B4A] uppercase">03. Prove</div>
                <div className="text-[12px] font-semibold text-[#1A1917] dark:text-[#E7E3DA] mt-0.5">Audit-Ready Evidence</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
