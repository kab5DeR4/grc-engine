import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function CloseSection() {
  return (
    <section className="relative w-full bg-[#E7E3DA] dark:bg-[#121110] pt-14 sm:pt-18 lg:pt-24 pb-0 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 font-sans transition-colors duration-200 overflow-hidden">
      <div className="w-full max-w-[92vw] 2xl:max-w-[1600px] mx-auto mb-10 sm:mb-12">

        <div className="relative z-10 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B3418]/10 dark:bg-[#FF6B4A]/10 text-[#9B3418] dark:text-[#FF6B4A] text-[12px] font-semibold tracking-wider uppercase mb-3.5">
            <Sparkles size={13} />
            <span>Ready To Scale Compliance</span>
          </div>

          {/* Headline */}
          <h2 className="text-[clamp(30px,3.8vw,54px)] font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-tight leading-[1.08] font-serif mb-5 sm:mb-6">
            Continuous governance powered by <span className="italic font-normal text-[#9B3418] dark:text-[#FF6B4A]">verifiable data</span>.
          </h2>

          {/* Subtitle */}
          <p className="text-[14.5px] sm:text-[16px] md:text-[17px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed mb-6 sm:mb-8 max-w-2xl">
            Eliminate manual audit chaos. Connect your cloud infrastructure in minutes and generate cryptographic evidence proofs across SOC 2, ISO 27001, and NIST CSF.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
            <Link
              to="/dashboard"
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#1A1917] hover:bg-[#9B3418] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:hover:bg-[#FF6B4A] dark:hover:text-white text-[#E7E3DA] text-[13.5px] sm:text-[14px] font-semibold transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <span>Launch Live Workspace</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/contact"
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-[#1A1917]/25 dark:border-[#E7E3DA]/25 text-[#1A1917] dark:text-[#E7E3DA] hover:bg-[#1A1917]/5 dark:hover:bg-[#E7E3DA]/5 text-[13.5px] sm:text-[14px] font-semibold transition-all"
            >
              Schedule Technical Demo
            </Link>

            <Link
              to="/reports"
              className="text-[13px] sm:text-[13.5px] font-medium text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] transition-colors ml-1"
            >
              View Sample Reports →
            </Link>
          </div>

          {/* Trust & Guarantee Pills */}
          <div className="pt-6 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-[12px] sm:text-[12.5px] text-[#6E6A61] dark:text-[#9E988B]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#55B685]" />
              <span>15-Minute Read-Only Setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#55B685]" />
              <span>Zero-Disruption eBPF Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#55B685]" />
              <span>AICPA & Big 4 Auditor Compatible</span>
            </div>
          </div>

        </div>

      </div>

      {/* Elegant Architectural Brand Watermark */}
      <div className="w-full overflow-hidden pointer-events-none select-none text-center opacity-90 dark:opacity-40">
        <div
          className="font-serif font-bold text-[#1A1917]/85 dark:text-[#E7E3DA]/85 tracking-[-0.03em] whitespace-nowrap leading-none text-center w-full"
          style={{
            fontSize: 'clamp(45px, 10vw, 160px)',
            transform: 'translateY(0.12em)',
          }}
        >
          GRC ENGINE
        </div>
      </div>
    </section>
  );
}
