import { Link } from 'react-router-dom';
import {
  Database,
  ShieldCheck,
  KeyRound,
  FileText,
  GitBranch,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock,
  Lock
} from 'lucide-react';

export default function MaterialPractice() {
  const capabilities = [
    {
      icon: Database,
      name: 'Automated Evidence Collection',
      desc: 'Eliminate manual screenshotting. Automatically collect cryptographic evidence directly from AWS, GCP, Azure, and Kubernetes.',
      badge: 'Multi-Cloud',
      highlight: 'Continuous Ingestion',
    },
    {
      icon: ShieldCheck,
      name: 'Continuous Drift Detection',
      desc: 'Monitor cloud resources 24/7 with zero-delay alerts the second configurations drift from your compliance baselines.',
      badge: 'Real-Time',
      highlight: '< 1s Detection',
    },
    {
      icon: KeyRound,
      name: 'Zero-Trust IAM Enforcement',
      desc: 'Identify overly permissive roles and automatically enforce least-privilege policies across your identity providers.',
      badge: 'Zero-Trust',
      highlight: 'Least Privilege',
    },
    {
      icon: FileText,
      name: '1-Click Audit Reporting',
      desc: 'Generate fully certified SOC 2, ISO 27001, and HIPAA evidence packages formatted specifically for AICPA & Big 4 auditors.',
      badge: 'Auditor-Ready',
      highlight: 'Instant Export',
    },
    {
      icon: GitBranch,
      name: 'Developer CI/CD Guardrails',
      desc: 'Embed automated security checks into GitHub Actions, GitLab CI, and Terraform pipelines to block non-compliant code.',
      badge: 'DevOps Native',
      highlight: 'Shift-Left GRC',
    },
    {
      icon: Zap,
      name: 'Automated Remediation',
      desc: 'Fix common security misconfigurations with one-click automated remediation scripts or pull requests.',
      badge: 'Automated',
      highlight: '1-Click Fixes',
    },
  ];

  const metrics = [
    { value: '85%', label: 'Audit Time Saved', sub: 'Average reduction in audit prep cycle' },
    { value: '200+', label: 'Automated Checks', sub: 'Continuous 24/7 technical control evaluation' },
    { value: '15+', label: 'Framework Standards', sub: 'SOC 2, ISO 27001, NIST CSF, HIPAA, GDPR' },
    { value: '< 2h', label: 'Response Time SLA', sub: 'Dedicated engineering support & guidance' },
  ];

  return (
    <section className="w-full bg-[#E7E3DA] dark:bg-[#121110] py-14 sm:py-18 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 font-sans transition-colors duration-200">
      <div className="w-full max-w-[92vw] 2xl:max-w-[1600px] mx-auto">

        {/* Section Header */}
        <div className="mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B3418]/10 dark:bg-[#FF6B4A]/10 text-[#9B3418] dark:text-[#FF6B4A] text-[12px] font-semibold tracking-wider uppercase mb-3">
              <Sparkles size={13} />
              <span>Section 02 — Core Capabilities & Benefits</span>
            </div>
            <h2 className="text-[clamp(28px,3.4vw,46px)] font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-tight leading-[1.12] font-serif">
              Everything you need to <span className="italic font-normal text-[#9B3418] dark:text-[#FF6B4A]">stay compliant</span>.
            </h2>
            <p className="text-[14.5px] sm:text-[15.5px] md:text-[16px] text-[#6E6A61] dark:text-[#9E988B] mt-3 max-w-2xl leading-relaxed">
              Transform manual spreadsheet audits into continuous, code-level verification across every layer of your engineering and cloud stack.
            </p>
          </div>

          <Link
            to="/features"
            className="px-5 py-2.5 sm:py-3 rounded-lg bg-[#1A1917] hover:bg-[#9B3418] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:hover:bg-[#FF6B4A] dark:hover:text-white text-[#E7E3DA] text-[13px] sm:text-[13.5px] font-medium transition-all inline-flex items-center gap-2 shadow-sm shrink-0 self-start md:self-auto"
          >
            <span>Explore All Features</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 6-Card Modern Capability Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            const routes = ['/scans', '/controls', '/controls', '/reports', '/integrations', '/findings'];
            const targetRoute = routes[idx % routes.length];
            return (
              <Link
                key={idx}
                to={targetRoute}
                className="bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-2xl p-5 sm:p-6 md:p-7 hover:border-[#9B3418]/40 dark:hover:border-[#FF6B4A]/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md hover:-translate-y-1 text-decoration-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-[#E7E3DA] dark:bg-[#252422] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-center text-[#9B3418] dark:text-[#FF6B4A] group-hover:scale-105 transition-transform">
                      <Icon size={19} />
                    </div>
                    <span className="text-[10.5px] sm:text-[11px] font-bold px-2.5 py-1 rounded bg-[#E7E3DA] dark:bg-[#252422] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 text-[#6E6A61] dark:text-[#9E988B] tracking-wide">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#1A1917] dark:text-[#E7E3DA] group-hover:text-[#9B3418] dark:group-hover:text-[#FF6B4A] transition-colors mb-2">
                    {cap.name}
                  </h3>

                  <p className="text-[12.5px] sm:text-[13px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-between text-[11.5px] sm:text-[12px] font-medium text-[#9B3418] dark:text-[#FF6B4A]">
                  <span>{cap.highlight}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section: Why Choose + High Impact KPI Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 pt-8 sm:pt-10 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 items-start lg:items-center">

          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <div className="text-[11px] font-semibold tracking-wider text-[#9B3418] dark:text-[#FF6B4A] uppercase">
              Why Engineering Teams Choose GRC Engine
            </div>
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif leading-tight">
              Security and compliance that scales with your code.
            </h3>
            <p className="text-[13.5px] sm:text-[14px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed">
              Our platform moves beyond subjective checkbox audits. We treat every compliance policy as an automated technical constraint—continuously testing controls in the background so you can ship features faster.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <div className="flex items-center gap-2.5 text-[12.5px] sm:text-[13px] text-[#1A1917] dark:text-[#E7E3DA]">
                <CheckCircle2 size={15} className="text-[#55B685] shrink-0" />
                <span>Zero manual evidence aggregation or screenshots</span>
              </div>
              <div className="flex items-center gap-2.5 text-[12.5px] sm:text-[13px] text-[#1A1917] dark:text-[#E7E3DA]">
                <CheckCircle2 size={15} className="text-[#55B685] shrink-0" />
                <span>Non-intrusive read-only API connectors & eBPF probes</span>
              </div>
              <div className="flex items-center gap-2.5 text-[12.5px] sm:text-[13px] text-[#1A1917] dark:text-[#E7E3DA]">
                <CheckCircle2 size={15} className="text-[#55B685] shrink-0" />
                <span>Direct auditor access portal with verifiable SHA-256 logs</span>
              </div>
            </div>
          </div>

          {/* Right 4-Stat Metric Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {metrics.map((stat, i) => (
              <div
                key={i}
                className="bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-4 sm:p-5 hover:border-[#9B3418]/30 dark:hover:border-[#FF6B4A]/30 transition-colors shadow-sm"
              >
                <div className="text-[28px] sm:text-[34px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif tracking-tight leading-none mb-1.5 sm:mb-2 text-[#9B3418] dark:text-[#FF6B4A]">
                  {stat.value}
                </div>
                <div className="text-[13px] sm:text-[13.5px] font-semibold text-[#1A1917] dark:text-[#E7E3DA]">
                  {stat.label}
                </div>
                <div className="text-[11.5px] sm:text-[12px] text-[#6E6A61] dark:text-[#9E988B] mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
