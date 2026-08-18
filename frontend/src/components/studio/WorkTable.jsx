import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cloud,
  Lock,
  Server,
  ShieldCheck
} from 'lucide-react';

function GithubIcon(props) {
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function WorkTable() {
  const integrations = [
    {
      id: 'INT-01',
      name: 'Amazon Web Services (AWS)',
      category: 'Cloud Infrastructure',
      metric: 'API / CloudTrail Sync',
      type: 'Native API',
      status: 'Verified Secure',
      icon: Cloud,
    },
    {
      id: 'INT-02',
      name: 'Google Cloud Platform (GCP)',
      category: 'Cloud Infrastructure',
      metric: 'API / Audit Logs',
      type: 'Native API',
      status: 'Verified Secure',
      icon: Cloud,
    },
    {
      id: 'INT-03',
      name: 'Microsoft Azure',
      category: 'Cloud Infrastructure',
      metric: 'API / Azure Monitor',
      type: 'Native API',
      status: 'Verified Secure',
      icon: Cloud,
    },
    {
      id: 'INT-04',
      name: 'Kubernetes (K8s)',
      category: 'Container Orchestration',
      metric: 'eBPF Probes / Kube-API',
      type: 'Agentless',
      status: 'Verified Secure',
      icon: Server,
    },
    {
      id: 'INT-05',
      name: 'GitHub Enterprise',
      category: 'CI/CD & Code Security',
      metric: 'Webhooks & Branch Rules',
      type: 'OAuth 2.0',
      status: 'Verified Secure',
      icon: GithubIcon,
    },
    {
      id: 'INT-06',
      name: 'Okta Identity Cloud',
      category: 'Identity & Access (IAM)',
      metric: 'SCIM & SAML v2.0',
      type: 'API Token',
      status: 'Verified Secure',
      icon: Lock,
    },
  ];

  return (
    <section className="w-full bg-[#E7E3DA] dark:bg-[#121110] py-14 sm:py-18 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 font-sans transition-colors duration-200">
      <div className="w-full max-w-[92vw] 2xl:max-w-[1600px] mx-auto">

        {/* Section Header */}
        <div className="mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B3418]/10 dark:bg-[#FF6B4A]/10 text-[#9B3418] dark:text-[#FF6B4A] text-[12px] font-semibold tracking-wider uppercase mb-3">
              <Sparkles size={13} />
              <span>Section 04 — Integrations</span>
            </div>
            <h2 className="text-[clamp(28px,3.4vw,46px)] font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-tight leading-[1.12] font-serif">
              Connect everything in <span className="italic font-normal text-[#9B3418] dark:text-[#FF6B4A]">minutes</span>.
            </h2>
            <p className="text-[14.5px] sm:text-[15.5px] md:text-[16px] text-[#6E6A61] dark:text-[#9E988B] mt-3 max-w-2xl leading-relaxed">
              Read-only connectors and agentless probes continuously ingest telemetry from your existing engineering stack.
            </p>
          </div>

          <Link
            to="/integrations"
            className="px-5 py-2.5 sm:py-3 rounded-lg bg-[#1A1917] hover:bg-[#9B3418] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:hover:bg-[#FF6B4A] dark:hover:text-white text-[#E7E3DA] text-[13px] sm:text-[13.5px] font-medium transition-all inline-flex items-center gap-2 shadow-sm shrink-0 self-start md:self-auto"
          >
            <span>View All 40+ Integrations</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Full-width Modern Table Grid */}
        <div className="w-full border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10">

          {/* Table Header (Hidden on small screens) */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 py-3.5 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 text-[11px] font-semibold text-[#9B3418] dark:text-[#FF6B4A] uppercase tracking-wider">
            <div className="md:col-span-2">ID & Method</div>
            <div className="md:col-span-4">Platform Service</div>
            <div className="md:col-span-2">Category</div>
            <div className="md:col-span-2">Sync Telemetry</div>
            <div className="md:col-span-2 text-right">Status</div>
          </div>

          {/* Table Rows */}
          {integrations.map((row) => {
            const Icon = row.icon;
            return (
              <Link
                key={row.id}
                to="/integrations"
                className="block group text-decoration-none"
              >
                <div className="py-3.5 sm:py-4 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 grid grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-3 items-center group-hover:bg-[#DCD7CB]/50 dark:group-hover:bg-[#1A1917] px-2.5 sm:px-3 rounded-xl transition-all duration-200">

                  {/* ID & Method */}
                  <div className="col-span-1 md:col-span-2 text-[11.5px] sm:text-[12px] text-[#9B3418] dark:text-[#FF6B4A] font-semibold">
                    {row.id} <span className="text-[#6E6A61] dark:text-[#9E988B] text-[10.5px] sm:text-[11px] font-normal block md:inline">[{row.type}]</span>
                  </div>

                  {/* Platform Name & Icon */}
                  <div className="col-span-2 md:col-span-4 text-[16px] sm:text-[18px] md:text-[19px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif group-hover:text-[#9B3418] dark:group-hover:text-[#FF6B4A] transition-colors flex items-center gap-2.5 sm:gap-3">
                    <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-[#DCD7CB]/60 dark:bg-[#252422] flex items-center justify-center text-[#9B3418] dark:text-[#FF6B4A] shrink-0">
                      <Icon size={15} />
                    </div>
                    <span className="truncate">{row.name}</span>
                  </div>

                  {/* Category */}
                  <div className="col-span-1 md:col-span-2 text-[12.5px] sm:text-[13px] text-[#6E6A61] dark:text-[#9E988B]">
                    {row.category}
                  </div>

                  {/* Metric Sync Method */}
                  <div className="col-span-1 md:col-span-2 text-[12px] sm:text-[12.5px] text-[#1A1917] dark:text-[#E7E3DA] font-medium">
                    {row.metric}
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-1 md:col-span-2 text-right">
                    <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#55B685]/15 text-[#55B685] tracking-wide">
                      <CheckCircle2 size={12} />
                      {row.status}
                    </span>
                  </div>

                </div>
              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}
