import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PinnedStudy() {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    { name: 'AWS Production', id: 'aws-prod' },
    { name: 'GitHub Org', id: 'gh-org' },
    { name: 'Okta Identity', id: 'okta' },
    { name: 'GCP Data Lake', id: 'gcp-dl' },
    { name: 'Kubernetes Cls', id: 'k8s' },
    { name: 'Stripe Billing', id: 'stripe' },
  ];

  // Rotate which node is "SCANNING"
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <section className="w-full bg-[#DCD7CB] py-20 px-6 md:px-12 hairline-b">
      <div className="w-full flex flex-col justify-between overflow-hidden">
        
        {/* Stage Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between hairline-b pb-6 z-20">
          <div>
            <div className="mono-label text-[#9B3418] mb-2">SECTION 03 — REAL-TIME COMPLIANCE</div>
            <h2 className="serif-heading text-[30px] md:text-[42px] text-[#1A1917]">
              Always Know Your <span className="serif-italic-pigment">Security Posture</span>
            </h2>
          </div>
          
          {/* Active Monitoring Status */}
          <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-[#E7E3DA] px-4 py-2.5 hairline-all shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#9B3418] rounded-full animate-pulse"></span>
            <span className="mono-label text-[11px] text-[#1A1917] font-bold uppercase tracking-wider">CONTINUOUS MONITORING ACTIVE</span>
          </div>
        </div>

        {/* Stage Canvas: Live Health Map */}
        <div className="relative w-full min-h-[420px] my-8 hairline-all bg-[#E7E3DA] flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Side: System Nodes Grid */}
          <div className="w-full md:w-1/2 p-6 md:p-8 md:border-r border-[#1A1917]/20 flex flex-col justify-center">
            <div className="mono-label text-[10px] text-[#6E6A61] mb-6 uppercase tracking-wider flex justify-between">
              <span>CONNECTED INFRASTRUCTURE</span>
              <span>[ 6 ACTIVE ]</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nodes.map((node, idx) => {
                const isScanning = idx === activeNode;
                return (
                  <div 
                    key={node.id} 
                    className={`p-4 hairline-all transition-colors duration-500 ${isScanning ? 'bg-[#1A1917] text-[#E7E3DA]' : 'bg-[#DCD7CB] text-[#1A1917]'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="mono-label text-[11px] font-bold">{node.name}</span>
                      {isScanning ? (
                        <span className="w-2 h-2 bg-[#E7E3DA] animate-pulse"></span>
                      ) : (
                        <span className="w-2 h-2 bg-[#9B3418]"></span>
                      )}
                    </div>
                    <div className={`mono-label text-[9px] uppercase tracking-wider ${isScanning ? 'text-[#DCD7CB]' : 'text-[#6E6A61]'}`}>
                      {isScanning ? 'EVALUATING POLICIES...' : 'VERIFIED SECURE'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Live Terminal Logs */}
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-[#1A1917] text-[#E7E3DA] flex flex-col">
            <div className="mono-label text-[10px] text-[#DCD7CB] mb-6 uppercase flex justify-between tracking-wider">
              <span>LIVE SECURITY AUDIT LOG</span>
              <span className="text-[#9B3418]">v2.4.1</span>
            </div>
            
            <div className="flex-1 overflow-hidden font-mono text-[11px] leading-[2.2] text-[#DCD7CB]/80 flex flex-col justify-end relative">
               <div className="opacity-20">[10:42:01] INIT AUTOMATED AUDIT CYCLE</div>
               <div className="opacity-30">[10:42:01] CONNECTING TO IDENTITY PROVIDERS... OK</div>
               <div className="opacity-40">[10:42:02] GET /api/v1/aws/iam - 200 OK</div>
               <div className="opacity-50">[10:42:02] CHK POL-AWS-001 (MFA Enforced) - PASS</div>
               <div className="opacity-60">[10:42:02] CHK POL-AWS-005 (Root Key Removed) - PASS</div>
               <div className="opacity-70">[10:42:04] GET /api/v1/gcp/storage - 200 OK</div>
               <div className="opacity-80">[10:42:05] CHK POL-GCP-012 (Bucket Encryption) - PASS</div>
               <div className="text-[#E7E3DA] mt-4">[10:42:06] VERIFYING NODE INTEGRITY...</div>
               <div className="text-[#9B3418] font-bold animate-pulse mt-1">
                 {'>'} SCANNING: {nodes[activeNode].name.toUpperCase()} ...
               </div>
               
               {/* Scanline effect overlay */}
               <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Stage Footer: Realistic Static KPI Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 hairline-t pt-6 z-20">
          <div className="p-3.5 bg-[#E7E3DA] hairline-all">
            <div className="mono-label text-[10px] text-[#9B3418]">COMPLIANCE SCORE</div>
            <div className="mono-body text-[20px] text-[#1A1917] font-bold mt-1">98/100</div>
            <div className="mono-label text-[9px] text-[#6E6A61] mt-1">UP-TO-DATE</div>
          </div>

          <div className="p-3.5 bg-[#E7E3DA] hairline-all">
            <div className="mono-label text-[10px] text-[#9B3418]">CONTROLS PASSING</div>
            <div className="mono-body text-[20px] text-[#1A1917] font-bold mt-1">100%</div>
            <div className="mono-label text-[9px] text-[#6E6A61] mt-1">ACROSS ALL SYSTEMS</div>
          </div>

          <div className="p-3.5 bg-[#E7E3DA] hairline-all">
            <div className="mono-label text-[10px] text-[#9B3418]">POLICIES ENFORCED</div>
            <div className="mono-body text-[20px] text-[#1A1917] font-bold mt-1">245</div>
            <div className="mono-label text-[9px] text-[#6E6A61] mt-1">AUTOMATICALLY CHECKED</div>
          </div>

          <div className="p-3.5 bg-[#E7E3DA] hairline-all flex flex-col justify-between">
            <div>
              <div className="mono-label text-[10px] text-[#9B3418]">AVG TIME TO DETECT</div>
              <div className="mono-body text-[20px] text-[#1A1917] font-bold mt-1">&lt; 1 min</div>
            </div>
            <Link to="/dashboard" className="studio-btn text-[9.5px] py-1.5 px-2 mt-3 text-center w-full uppercase">
              [ VIEW FULL REPORTS ]
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
