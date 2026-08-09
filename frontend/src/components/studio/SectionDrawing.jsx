import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SectionDrawing() {
  const [activeTab, setActiveTab] = useState('POSTURE');
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotate tabs every 5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    const modes = ['POSTURE', 'ALERTS', 'REPORTS'];
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const nextIdx = (modes.indexOf(prev) + 1) % modes.length;
        return modes[nextIdx];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const definitionList = [
    { label: 'VALUE.01', desc: 'See your entire compliance posture in one unified view', val: 'CLEAR' },
    { label: 'VALUE.02', desc: 'Automate tedious security checks and enforcement', val: 'EFFICIENT' },
    { label: 'VALUE.03', desc: 'Keep your business secure with continuous monitoring', val: '24/7' },
    { label: 'VALUE.04', desc: 'Pass audits faster with instant evidence collection', val: 'FAST' },
    { label: 'VALUE.05', desc: 'Empower developers with simple, seamless integrations', val: 'SEAMLESS' },
  ];

  return (
    <section className="w-full bg-[#E7E3DA] py-20 px-6 md:px-12 hairline-b">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 hairline-b">
        <div>
          <div className="mono-label text-[#9B3418] mb-2">SECTION 01 — VISIBILITY & CONTROL</div>
          <h2 className="serif-heading text-[32px] md:text-[44px] text-[#1A1917]">
            Complete Visibility & <span className="serif-italic-pigment">Control Platform</span>
          </h2>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          {['POSTURE', 'ALERTS', 'REPORTS'].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setActiveTab(mode);
                setIsAutoPlay(false); // Stop autoplay when clicked
              }}
              className={`mono-label text-[10px] px-3 py-1.5 cursor-pointer border transition-colors ${
                activeTab === mode ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917]' : 'bg-transparent text-[#1A1917] border-[#1A1917]'
              }`}
            >
              [ {mode} ]
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Headline, Lede & Definition List */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <p className="mono-body text-[12.5px] leading-[1.65] text-[#4A4741] mb-8">
            Get a clear, unified view of your company's security. Our platform connects directly to your existing systems, giving you instant insights into compliance gaps without the headaches of manual tracking. Focus on growing your business while we handle the complexity of compliance.
          </p>

          {/* Hairline-ruled definition list */}
          <div className="w-full hairline-t">
            {definitionList.map((row, idx) => (
              <div 
                key={idx} 
                className="py-3.5 hairline-b flex items-center justify-between text-[11.5px] hover:bg-[#DCD7CB]/40 px-2 transition-colors"
              >
                <span className="mono-label text-[#9B3418] w-20">{row.label}</span>
                <span className="mono-body text-[#1A1917] flex-1 px-4 truncate">{row.desc}</span>
                <span className="mono-label text-[#1A1917] font-semibold">{row.val}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link to="/dashboard" className="studio-btn text-[11px]">
              [ EXPLORE PLATFORM ]
            </Link>
            <span className="mono-label text-[10px] text-[#6E6A61]">LIVE PREVIEW</span>
          </div>
        </div>

        {/* Right Column: Detailed Explanatory Product Visual */}
        <div className="lg:col-span-7 bg-[#DCD7CB]/40 hairline-all p-6 relative overflow-hidden flex flex-col justify-between min-h-[440px]">
          
          {/* Top Status Header */}
          <div className="flex items-center justify-between pb-4 hairline-b mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-[#9B3418] inline-block animate-pulse"></span>
              <span className="mono-label text-[11px] text-[#1A1917] font-bold">
                SYSTEM WORKFLOW // MODE: {activeTab}
              </span>
            </div>
            <span className="mono-label text-[10px] text-[#6E6A61] bg-[#E7E3DA] px-2 py-0.5 hairline-all">
              REAL-TIME EVALUATION
            </span>
          </div>

          {/* Dynamic Content based on activeTab */}
          {activeTab === 'POSTURE' && (
            <div className="space-y-4 my-auto">
              <div className="mono-label text-[10px] text-[#6E6A61] mb-2 uppercase">1. CONTINUOUS FRAMEWORK AUDITING</div>
              
              {/* Framework 1 */}
              <div className="bg-[#E7E3DA] p-3.5 hairline-all flex flex-col gap-2">
                <div className="flex justify-between items-center text-[11.5px] mono-label">
                  <span className="font-bold text-[#1A1917]">SOC 2 TYPE II COMPLIANCE</span>
                  <span className="text-[#9B3418] font-bold">98.4% PASSING</span>
                </div>
                <div className="w-full bg-[#DCD7CB] h-2 relative overflow-hidden">
                  <div className="bg-[#1A1917] h-full w-[98.4%]"></div>
                </div>
                <div className="flex justify-between text-[10px] mono-label text-[#6E6A61] mt-1">
                  <span>142 CONTROLS TESTED</span>
                  <span>140 VERIFIED // 2 ATTENTION</span>
                </div>
              </div>

              {/* Framework 2 */}
              <div className="bg-[#E7E3DA] p-3.5 hairline-all flex flex-col gap-2">
                <div className="flex justify-between items-center text-[11.5px] mono-label">
                  <span className="font-bold text-[#1A1917]">ISO 27001:2022 AUDIT STATE</span>
                  <span className="text-[#9B3418] font-bold">100% VERIFIED</span>
                </div>
                <div className="w-full bg-[#DCD7CB] h-2 relative overflow-hidden">
                  <div className="bg-[#9B3418] h-full w-[100%]"></div>
                </div>
                <div className="flex justify-between text-[10px] mono-label text-[#6E6A61] mt-1">
                  <span>93 CONTROLS TESTED</span>
                  <span>ALL PASSING CONTINUOUSLY</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ALERTS' && (
            <div className="space-y-3 my-auto">
              <div className="mono-label text-[10px] text-[#6E6A61] mb-2 uppercase">2. AUTOMATED THREAT DETECTION & FIXES</div>
              
              <div className="bg-[#E7E3DA] p-3 hairline-all flex items-center justify-between text-[11px] mono-body">
                <div className="flex items-center space-x-3">
                  <span className="mono-label text-[9px] px-1.5 py-0.5 bg-[#9B3418] text-[#E7E3DA]">FIXED</span>
                  <span className="text-[#1A1917]">AWS S3 Storage Bucket Public Access Blocked</span>
                </div>
                <span className="mono-label text-[10px] text-[#6E6A61]">AUTO-RESOLVED</span>
              </div>

              <div className="bg-[#E7E3DA] p-3 hairline-all flex items-center justify-between text-[11px] mono-body">
                <div className="flex items-center space-x-3">
                  <span className="mono-label text-[9px] px-1.5 py-0.5 bg-[#1A1917] text-[#E7E3DA]">ACTIVE</span>
                  <span className="text-[#1A1917]">IAM User without MFA Security Policy</span>
                </div>
                <span className="mono-label text-[10px] text-[#9B3418] font-bold">[ 1-CLICK FIX ]</span>
              </div>

              <div className="bg-[#E7E3DA] p-3 hairline-all flex items-center justify-between text-[11px] mono-body">
                <div className="flex items-center space-x-3">
                  <span className="mono-label text-[9px] px-1.5 py-0.5 bg-[#9B3418] text-[#E7E3DA]">FIXED</span>
                  <span className="text-[#1A1917]">Kubernetes API Server Endpoint Restricted</span>
                </div>
                <span className="mono-label text-[10px] text-[#6E6A61]">AUTO-RESOLVED</span>
              </div>
            </div>
          )}

          {activeTab === 'REPORTS' && (
            <div className="space-y-4 my-auto">
              <div className="mono-label text-[10px] text-[#6E6A61] mb-2 uppercase">3. AUDIT EVIDENCE ENGINE</div>
              
              <div className="bg-[#E7E3DA] p-4 hairline-all grid grid-cols-2 gap-4">
                <div>
                  <div className="mono-label text-[10px] text-[#9B3418]">EVIDENCEVAULT SHA-256</div>
                  <div className="serif-heading text-[18px] text-[#1A1917] font-semibold mt-1">Cryptographic Audit Trail</div>
                  <p className="mono-body text-[10.5px] text-[#6E6A61] mt-1">Tamper-proof logs ready for external auditors.</p>
                </div>
                <div className="flex flex-col justify-center items-end">
                  <Link to="/dashboard" className="studio-btn text-[10px] py-1.5 px-3">
                    [ EXPORT AUDIT PACKAGE ]
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10.5px] mono-label bg-[#E7E3DA] p-3 hairline-all">
                <span>SUPPORTED AUDITORS: PWC, EY, KPMG, DELOITTE, A-COUPLE</span>
                <span className="text-[#9B3418] font-bold">100% READY</span>
              </div>
            </div>
          )}

          {/* Bottom Workflow Pipeline Diagram */}
          <div className="pt-4 hairline-t mt-6 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-[#E7E3DA] hairline-all">
              <div className="mono-label text-[9px] text-[#9B3418]">01. INGEST</div>
              <div className="mono-body text-[10px] text-[#1A1917] font-bold">Cloud APIs</div>
            </div>
            <div className="p-2 bg-[#E7E3DA] hairline-all">
              <div className="mono-label text-[9px] text-[#9B3418]">02. EVALUATE</div>
              <div className="mono-body text-[10px] text-[#1A1917] font-bold">Policy Rules</div>
            </div>
            <div className="p-2 bg-[#E7E3DA] hairline-all">
              <div className="mono-label text-[9px] text-[#9B3418]">03. PROVE</div>
              <div className="mono-body text-[10px] text-[#1A1917] font-bold">Audit Evidence</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
