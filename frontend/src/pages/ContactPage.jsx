import { useState } from 'react';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [nodes, setNodes] = useState(100);
  const [frameworks, setFrameworks] = useState({
    soc2: true,
    nist: true,
    iso: false,
    hipaa: false,
  });

  const handleToggle = (key) => {
    setFrameworks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activeCount = Object.values(frameworks).filter(Boolean).length;
  const estimatedCost = (nodes * 45 + activeCount * 3500).toLocaleString();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#E7E3DA] text-[#1A1917] font-mono">
      <StudioNav />

      <main className="mt-[60px] py-12 px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-12 pb-6 hairline-b">
          <div className="mono-label text-[#9B3418] mb-2">COMMISSION AUDIT & TELEMETRY ENGINE</div>
          <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
            Inquire & <span className="serif-italic-pigment">System Parameter Estimate</span>
          </h1>
          <p className="mono-body text-[13px] text-[#4A4741] mt-3 max-w-3xl">
            Specify your infrastructure scale and regulatory requirements to generate a real-time deployment estimate and connect with our studio engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 bg-[#DCD7CB] hairline-all text-center">
                <div className="mono-label text-[#9B3418] mb-2">COMMISSION RECEIVED</div>
                <h2 className="serif-heading text-[32px] font-bold text-[#1A1917] mb-4">
                  Inquiry Dispatched to Studio
                </h2>
                <p className="mono-body text-[12.5px] text-[#4A4741] mb-6 max-w-md mx-auto">
                  Our telemetry engineering team will review your parameter specifications and transmit a formal deployment proposal within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="studio-btn-primary studio-btn text-[11px]"
                >
                  [ EDIT PARAMETERS ]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-[#DCD7CB] p-8 hairline-all">
                <div>
                  <label className="mono-label text-[11px] text-[#1A1917] block mb-2">
                    ORGANIZATION NAME & CONTACT EMAIL
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="ACME CORP ARCHITECTURE"
                      className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] mono-body text-[#1A1917] outline-none focus:border-[#9B3418]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="ENG@ACME.COM"
                      className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] mono-body text-[#1A1917] outline-none focus:border-[#9B3418]"
                    />
                  </div>
                </div>

                {/* Infrastructure Scale Slider */}
                <div>
                  <div className="flex justify-between text-[11.5px] mono-label mb-2">
                    <span>ACTIVE NODE / CONTAINER HEADCOUNT</span>
                    <span className="text-[#9B3418] font-bold">{nodes} NODES</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={nodes}
                    onChange={(e) => setNodes(parseInt(e.target.value))}
                    className="w-full accent-[#9B3418] cursor-pointer"
                  />
                </div>

                {/* Target Framework Checkboxes */}
                <div>
                  <label className="mono-label text-[11px] text-[#1A1917] block mb-3">
                    REQUIRED COMPLIANCE FRAMEWORKS
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'soc2', label: 'SOC 2 TYPE II' },
                      { key: 'nist', label: 'NIST SP 800-53' },
                      { key: 'iso', label: 'ISO 27001:2022' },
                      { key: 'hipaa', label: 'HIPAA SECURITY' },
                    ].map(item => (
                      <div
                        key={item.key}
                        onClick={() => handleToggle(item.key)}
                        className={`p-3 cursor-pointer hairline-all flex justify-between items-center ${
                          frameworks[item.key] ? 'bg-[#1A1917] text-[#E7E3DA]' : 'bg-[#E7E3DA] text-[#1A1917]'
                        }`}
                      >
                        <span className="mono-label text-[10.5px]">{item.label}</span>
                        <span className="mono-label text-[10px]">{frameworks[item.key] ? '[ X ]' : '[  ]'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mono-label text-[11px] text-[#1A1917] block mb-2">
                    SPECIAL ARCHITECTURAL REQUIREMENT (OPTIONAL)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="DESCRIBE CLOUD PROVIDERS, HSM MODULE PREFERENCES, OR ZERO-TRUST EGRESS POLICIES..."
                    className="w-full bg-[#E7E3DA] border border-[#1A1917] p-3 text-[12px] mono-body text-[#1A1917] outline-none focus:border-[#9B3418]"
                  ></textarea>
                </div>

                <button type="submit" className="studio-btn-primary studio-btn text-[11px] w-full py-3">
                  [ SUBMIT COMMISSION SPECIFICATIONS ]
                </button>
              </form>
            )}
          </div>

          {/* Real-time Calculation Summary Drawer */}
          <div className="lg:col-span-5 bg-[#DCD7CB] p-6 hairline-all h-fit sticky top-[80px]">
            <div className="mono-label text-[#9B3418] mb-2">ESTIMATED DEPLOYMENT COST</div>
            <div className="serif-heading text-[42px] font-bold text-[#1A1917] mb-4">
              ${estimatedCost} <span className="text-[14px] mono-label text-[#6E6A61]">/ ANNUM</span>
            </div>

            <div className="space-y-3 mono-body text-[11.5px] pt-4 hairline-t text-[#4A4741]">
              <div className="flex justify-between py-1 hairline-b">
                <span>NODE TELEMETRY BASE ({nodes})</span>
                <span className="font-semibold text-[#1A1917]">${(nodes * 45).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 hairline-b">
                <span>FRAMEWORK SUITE ({activeCount})</span>
                <span className="font-semibold text-[#1A1917]">${(activeCount * 3500).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 hairline-b">
                <span>eBPF KERNEL PROBES</span>
                <span className="font-semibold text-[#9B3418]">INCLUDED</span>
              </div>
              <div className="flex justify-between py-1">
                <span>SLA MTTR GUARANTEE</span>
                <span className="font-semibold text-[#1A1917]">&lt; 15 MINUTES</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
