import { useState } from 'react';
import { 
  Mail, 
  Clock, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  MessageSquare,
  Lock,
  Zap
} from 'lucide-react';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import { Link } from 'react-router-dom';

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
    'CIS Benchmarks',
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
    <div className="w-full min-h-screen bg-[var(--ground)] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col">
      <StudioNav />

      <main className="mt-[60px] pt-12 pb-20 px-6 lg:px-12 max-w-6xl mx-auto flex-1 w-full">
        {/* Page Header */}
        <div className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>CONNECT WITH OUR SOLUTIONS TEAM</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Talk with our <span className="text-sky-600 dark:text-sky-400">GRC Engineering</span> team.
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-3 max-w-2xl leading-relaxed">
            Whether you need continuous SOC 2, ISO 27001 automation, or custom cloud infrastructure governance, our solutions architects are ready to help.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Value Proposition & Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Contact Channels */}
            <div className="bg-[var(--surface)] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5 shadow-sm">
              <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400 flex items-center gap-2">
                <Globe size={14} /> Direct Channels
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Sales & Enterprise Inquiries</div>
                    <a href="mailto:sales@grcengine.io" className="text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-mono">
                      sales@grcengine.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Technical Solutions Desk</div>
                    <a href="mailto:support@grcengine.io" className="text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-mono">
                      support@grcengine.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Guaranteed Response SLA</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Under 2 business hours for enterprise inquiries
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Teams Choose GRC Engine */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                WHAT YOU GET WITH GRC ENGINE
              </h3>
              
              <div className="space-y-3.5">
                {[
                  {
                    icon: Shield,
                    title: 'Continuous Control Evaluation',
                    desc: 'Real-time telemetry verification across AWS, Azure, GCP, and GitHub without manual audit spreadsheets.',
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
                    <div className="mt-0.5 text-sky-600 dark:text-sky-400 shrink-0">
                      <item.icon size={17} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Framework Badges */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-500 mb-2.5">
                Supported Framework Standards
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['SOC 2 Type II', 'ISO 27001', 'NIST CSF 2.0', 'HIPAA', 'GDPR', 'CIS Benchmarks'].map((tag, i) => (
                  <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--surface)] border border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Enterprise Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-[var(--surface)] border border-slate-200 dark:border-slate-800 rounded-xl p-8 md:p-12 text-center shadow-lg animate-fade-up">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={32} />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  Inquiry Dispatched Successfully
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  Thank you, {formData.firstName || 'there'}!
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
                  Our compliance engineering team has received your details for <strong className="text-slate-900 dark:text-white">{formData.companyName || 'your organization'}</strong>. We will review your framework requirements and follow up with a custom architecture proposal within 2 hours.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                  <Link
                    to="/dashboard"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all shadow-xs inline-flex items-center gap-1.5"
                  >
                    <span>Explore Live Workspace</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-slate-200 dark:border-slate-800 rounded-xl p-7 md:p-10 shadow-sm space-y-6">
                
                {/* Form Section: Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                    />
                  </div>
                </div>

                {/* Form Section: Email & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                      Company Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Acme Technologies"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                    />
                  </div>
                </div>

                {/* Form Section: Organization Scale */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                    Organization / Node Scale
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
                  >
                    <option value="1-50">1 - 50 employees (Early Growth)</option>
                    <option value="51-200">51 - 200 employees (Scale-up)</option>
                    <option value="201-1000">201 - 1,000 employees (Mid-Market)</option>
                    <option value="1000+">1,000+ employees (Enterprise Grade)</option>
                  </select>
                </div>

                {/* Form Section: Target Frameworks Selection */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase">
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
                          className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold text-left transition-all flex items-center justify-between border cursor-pointer ${
                            selected
                              ? 'bg-slate-900 text-white border-slate-900 dark:bg-sky-500 dark:text-slate-950 dark:border-sky-500 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <span>{fw}</span>
                          {selected && <CheckCircle2 size={13} className="shrink-0 ml-1 text-white dark:text-slate-950" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Section: Project Details */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase">
                    Project Details or Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your cloud setup (AWS/GCP/Azure), audit timeline, or particular compliance pain points..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-y"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Architecture Inquiry</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  By submitting, you agree to our privacy policy. We never share or sell your contact information.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Process Timeline: What Happens Next? */}
        <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              What Happens Next?
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Our structured onboarding process gets your organization from initial assessment to continuous compliance proofs in days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--surface)] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs relative">
              <div className="text-2xl font-mono font-bold text-sky-600 dark:text-sky-400 mb-2">01</div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Architecture Discovery</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A 30-minute deep dive with a dedicated compliance architect to inspect your infrastructure boundaries and framework requirements.
              </p>
            </div>

            <div className="bg-[var(--surface)] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs relative">
              <div className="text-2xl font-mono font-bold text-sky-600 dark:text-sky-400 mb-2">02</div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Custom Live Demo</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                See GRC Engine connect to sample repositories and cloud environments to generate real-time control matrices and evidence proofs.
              </p>
            </div>

            <div className="bg-[var(--surface)] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs relative">
              <div className="text-2xl font-mono font-bold text-sky-600 dark:text-sky-400 mb-2">03</div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Tailored Deployment Pilot</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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
