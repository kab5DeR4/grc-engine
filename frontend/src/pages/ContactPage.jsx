import { useState } from 'react';
import { 
  Mail, 
  Clock, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  Globe, 
  MessageSquare,
  Lock,
  Zap
} from 'lucide-react';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    companyName: '',
    companySize: '51-200',
    frameworks: ['SOC 2 Type II'],
    message: '',
  });

  const availableFrameworks = [
    'SOC 2 Type II',
    'ISO / IEC 27001',
    'NIST CSF v2.0',
    'HIPAA Security',
    'GDPR / Privacy',
    'Custom Framework',
  ];

  const handleToggleFramework = (fw) => {
    setFormData(prev => {
      const exists = prev.frameworks.includes(fw);
      return {
        ...prev,
        frameworks: exists 
          ? prev.frameworks.filter(item => item !== fw)
          : [...prev.frameworks, fw]
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // simulate fast corporate API dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-[#E7E3DA] dark:bg-[#121110] text-[#1A1917] dark:text-[#E7E3DA] font-sans transition-colors duration-200">
      <StudioNav />

      <main className="mt-[60px] pt-12 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="mb-14 pb-8 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B3418]/10 dark:bg-[#FF6B4A]/10 text-[#9B3418] dark:text-[#FF6B4A] text-[12px] font-semibold tracking-wider uppercase mb-3">
            <Sparkles size={13} />
            <span>Connect With Our Solutions Team</span>
          </div>
          <h1 className="text-[38px] md:text-[54px] font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-tight leading-[1.1] font-serif">
            Talk with our <span className="italic font-normal text-[#9B3418] dark:text-[#FF6B4A]">GRC Engineering</span> team.
          </h1>
          <p className="text-[15px] md:text-[17px] text-[#6E6A61] dark:text-[#9E988B] mt-4 max-w-2xl leading-relaxed">
            Whether you need continuous SOC 2, ISO 27001 automation, or custom cloud infrastructure governance, our solutions architects are ready to help.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Value Proposition & Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Contact Channels */}
            <div className="bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-6 space-y-5 shadow-sm">
              <h2 className="text-[14px] font-semibold tracking-wider uppercase text-[#9B3418] dark:text-[#FF6B4A] flex items-center gap-2">
                <Globe size={16} /> Direct Channels
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E7E3DA] dark:bg-[#252422] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-center text-[#9B3418] dark:text-[#FF6B4A] shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-medium text-[#1A1917] dark:text-[#E7E3DA]">Sales & Enterprise Inquiries</div>
                    <a href="mailto:sales@grcengine.io" className="text-[13px] text-[#6E6A61] dark:text-[#9E988B] hover:text-[#9B3418] dark:hover:text-[#FF6B4A] transition-colors">
                      sales@grcengine.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E7E3DA] dark:bg-[#252422] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-center text-[#9B3418] dark:text-[#FF6B4A] shrink-0">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-medium text-[#1A1917] dark:text-[#E7E3DA]">Technical Solutions Desk</div>
                    <a href="mailto:support@grcengine.io" className="text-[13px] text-[#6E6A61] dark:text-[#9E988B] hover:text-[#9B3418] dark:hover:text-[#FF6B4A] transition-colors">
                      support@grcengine.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E7E3DA] dark:bg-[#252422] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex items-center justify-center text-[#9B3418] dark:text-[#FF6B4A] shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-medium text-[#1A1917] dark:text-[#E7E3DA]">Guaranteed Response SLA</div>
                    <div className="text-[13px] text-[#6E6A61] dark:text-[#9E988B]">
                      Under 2 business hours for enterprise requests
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Teams Choose GRC Engine */}
            <div className="space-y-4">
              <h3 className="text-[14px] font-semibold tracking-wider uppercase text-[#1A1917] dark:text-[#E7E3DA]">
                What You Get With GRC Engine
              </h3>
              
              <div className="space-y-3.5">
                {[
                  {
                    icon: Shield,
                    title: 'Continuous Control Evaluation',
                    desc: 'Real-time telemetry verification across AWS, Azure, GCP, and GitHub without manual audits.',
                  },
                  {
                    icon: Zap,
                    title: '80% Faster Audit Preparedness',
                    desc: 'Automate evidence proofs, gap studies, and generate auditor-grade verifiable reports instantly.',
                  },
                  {
                    icon: Lock,
                    title: 'Non-Intrusive & Read-Only',
                    desc: 'Read-only API access with strict cryptographic evidence hashing and enterprise zero-trust security.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="mt-1 text-[#9B3418] dark:text-[#FF6B4A]">
                      <item.icon size={17} />
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#1A1917] dark:text-[#E7E3DA]">{item.title}</div>
                      <div className="text-[13px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Framework Badges */}
            <div className="pt-2 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10">
              <div className="text-[11px] font-semibold tracking-wider uppercase text-[#6E6A61] dark:text-[#9E988B] mb-2.5">
                Supported Framework Standards
              </div>
              <div className="flex flex-wrap gap-2">
                {['SOC 2 Type II', 'ISO 27001', 'NIST CSF 2.0', 'HIPAA', 'GDPR', 'CIS Benchmarks'].map((tag, i) => (
                  <span key={i} className="text-[11.5px] px-2.5 py-1 rounded bg-[#DCD7CB]/60 dark:bg-[#1E1D1A] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Enterprise Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-[#DCD7CB]/50 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-2xl p-8 md:p-12 text-center shadow-lg animate-fade-up">
                <div className="w-16 h-16 rounded-full bg-[#55B685]/15 text-[#55B685] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={32} />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#55B685]/10 text-[#55B685] text-[11.5px] font-semibold uppercase tracking-wider mb-2">
                  Inquiry Dispatched Successfully
                </div>
                <h2 className="text-[28px] md:text-[36px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif mb-3">
                  Thank you, {formData.firstName || 'there'}!
                </h2>
                <p className="text-[14px] text-[#6E6A61] dark:text-[#9E988B] max-w-md mx-auto mb-8 leading-relaxed">
                  Our compliance engineering team has received your details for <strong className="text-[#1A1917] dark:text-[#E7E3DA]">{formData.companyName || 'your organization'}</strong>. We will review your framework requirements and follow up with a custom architecture proposal within 2 hours.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-lg border border-[#1A1917]/20 dark:border-[#E7E3DA]/20 text-[13.5px] font-medium hover:bg-[#1A1917]/5 dark:hover:bg-[#E7E3DA]/5 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                  <a
                    href="/dashboard"
                    className="px-5 py-2.5 rounded-lg bg-[#1A1917] dark:bg-[#E7E3DA] text-[#E7E3DA] dark:text-[#1A1917] text-[13.5px] font-medium hover:bg-[#9B3418] dark:hover:bg-[#FF6B4A] dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    Explore Live Workspace <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#DCD7CB]/40 dark:bg-[#1A1917] border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-2xl p-7 md:p-10 shadow-sm space-y-6">
                
                {/* Form Section: Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] mb-1.5">
                      First Name <span className="text-[#9B3418] dark:text-[#FF6B4A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      className="w-full bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/20 dark:border-[#E7E3DA]/20 rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#1A1917] dark:text-[#E7E3DA] outline-none focus:border-[#9B3418] dark:focus:border-[#FF6B4A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] mb-1.5">
                      Last Name <span className="text-[#9B3418] dark:text-[#FF6B4A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/20 dark:border-[#E7E3DA]/20 rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#1A1917] dark:text-[#E7E3DA] outline-none focus:border-[#9B3418] dark:focus:border-[#FF6B4A] transition-colors"
                    />
                  </div>
                </div>

                {/* Form Section: Email & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] mb-1.5">
                      Work Email <span className="text-[#9B3418] dark:text-[#FF6B4A]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/20 dark:border-[#E7E3DA]/20 rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#1A1917] dark:text-[#E7E3DA] outline-none focus:border-[#9B3418] dark:focus:border-[#FF6B4A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] mb-1.5">
                      Company Name <span className="text-[#9B3418] dark:text-[#FF6B4A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Acme Technologies"
                      className="w-full bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/20 dark:border-[#E7E3DA]/20 rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#1A1917] dark:text-[#E7E3DA] outline-none focus:border-[#9B3418] dark:focus:border-[#FF6B4A] transition-colors"
                    />
                  </div>
                </div>

                {/* Form Section: Organization Scale */}
                <div>
                  <label className="block text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] mb-1.5">
                    Organization / Node Scale
                  </label>
                  <div className="relative">
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="w-full bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/20 dark:border-[#E7E3DA]/20 rounded-lg px-3.5 py-2.5 text-[13.5px] text-[#1A1917] dark:text-[#E7E3DA] outline-none focus:border-[#9B3418] dark:focus:border-[#FF6B4A] transition-colors cursor-pointer"
                    >
                      <option value="1-50">1 - 50 employees (Early Growth)</option>
                      <option value="51-200">51 - 200 employees (Scale-up)</option>
                      <option value="201-1000">201 - 1,000 employees (Mid-Market)</option>
                      <option value="1000+">1,000+ employees (Enterprise Grade)</option>
                    </select>
                  </div>
                </div>

                {/* Form Section: Target Frameworks Selection */}
                <div>
                  <label className="block text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] mb-2">
                    Primary Compliance Framework(s) of Interest
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {availableFrameworks.map(fw => {
                      const selected = formData.frameworks.includes(fw);
                      return (
                        <button
                          type="button"
                          key={fw}
                          onClick={() => handleToggleFramework(fw)}
                          className={`px-3 py-2 rounded-lg text-[12.5px] font-medium text-left transition-all flex items-center justify-between border cursor-pointer ${
                            selected
                              ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:border-[#E7E3DA] shadow-sm'
                              : 'bg-[#E7E3DA] dark:bg-[#121110] text-[#6E6A61] dark:text-[#9E988B] border-[#1A1917]/15 dark:border-[#E7E3DA]/15 hover:border-[#1A1917]/40 dark:hover:border-[#E7E3DA]/40'
                          }`}
                        >
                          <span>{fw}</span>
                          {selected && <CheckCircle2 size={13} className="shrink-0 ml-1 text-[#9B3418] dark:text-[#FF6B4A]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Section: Project Details */}
                <div>
                  <label className="block text-[13px] font-medium text-[#1A1917] dark:text-[#E7E3DA] mb-1.5">
                    Project Details or Specific Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your cloud setup (AWS/GCP/Azure), audit timeline, or particular compliance pain points..."
                    className="w-full bg-[#E7E3DA] dark:bg-[#121110] border border-[#1A1917]/20 dark:border-[#E7E3DA]/20 rounded-lg p-3 text-[13.5px] text-[#1A1917] dark:text-[#E7E3DA] outline-none focus:border-[#9B3418] dark:focus:border-[#FF6B4A] transition-colors resize-y"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#1A1917] hover:bg-[#9B3418] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:hover:bg-[#FF6B4A] dark:hover:text-white text-[#E7E3DA] text-[14px] font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Architecture Inquiry</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-[11.5px] text-[#6E6A61] dark:text-[#9E988B] text-center">
                  By submitting, you agree to our privacy policy. We will never share or sell your contact information.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Process Timeline: What Happens Next? */}
        <div className="mt-20 pt-12 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-[24px] md:text-[28px] font-bold text-[#1A1917] dark:text-[#E7E3DA] font-serif">
              What Happens Next?
            </h3>
            <p className="text-[13.5px] text-[#6E6A61] dark:text-[#9E988B] mt-2">
              Our structured onboarding process gets your organization from initial assessment to continuous compliance proofs in days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#DCD7CB]/30 dark:bg-[#1A1917]/50 border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-6 relative">
              <div className="text-[28px] font-serif font-bold text-[#9B3418] dark:text-[#FF6B4A] mb-2">01</div>
              <h4 className="text-[15px] font-semibold text-[#1A1917] dark:text-[#E7E3DA] mb-1.5">Architecture Discovery</h4>
              <p className="text-[13px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed">
                A 30-minute deep dive with a dedicated compliance architect to inspect your infrastructure boundaries and framework requirements.
              </p>
            </div>

            <div className="bg-[#DCD7CB]/30 dark:bg-[#1A1917]/50 border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-6 relative">
              <div className="text-[28px] font-serif font-bold text-[#9B3418] dark:text-[#FF6B4A] mb-2">02</div>
              <h4 className="text-[15px] font-semibold text-[#1A1917] dark:text-[#E7E3DA] mb-1.5">Custom Live Demo</h4>
              <p className="text-[13px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed">
                See GRC Engine connect to sample repositories and cloud environments to generate real-time control matrices and evidence proofs.
              </p>
            </div>

            <div className="bg-[#DCD7CB]/30 dark:bg-[#1A1917]/50 border border-[#1A1917]/10 dark:border-[#E7E3DA]/10 rounded-xl p-6 relative">
              <div className="text-[28px] font-serif font-bold text-[#9B3418] dark:text-[#FF6B4A] mb-2">03</div>
              <h4 className="text-[15px] font-semibold text-[#1A1917] dark:text-[#E7E3DA] mb-1.5">Tailored Deployment Pilot</h4>
              <p className="text-[13px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed">
                Launch a 14-day assisted pilot with full telemetry ingestion, auditor exports, and automated gap study reports.
              </p>
            </div>
          </div>
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
