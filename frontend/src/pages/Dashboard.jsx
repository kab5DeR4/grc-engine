import { useDemoStore } from '../store/demoStore';
import { ArrowUpRight, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { 
    overallCompliance, 
    lastScan, 
    scanRunning, 
    runScan, 
    frameworks,
    infrastructure,
    findings
  } = useDemoStore();

  const criticalFindings = findings.filter(f => f.severity === 'CRITICAL');
  const highFindings = findings.filter(f => f.severity === 'HIGH');

  return (
    <div className="flex flex-col gap-10 max-w-[1400px] mx-auto pb-20 font-mono text-[#1A1917]">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end hairline-b pb-6 gap-4">
        <div>
          <div className="mono-label text-[#9B3418] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#9B3418] inline-block"></span>
            SECURITY POSTURE OVERVIEW — REAL-TIME MONITORING
          </div>
          <h1 className="serif-heading text-[36px] md:text-[52px] text-[#1A1917]">
            Compliance & <span className="serif-italic-pigment">Security Posture</span>
          </h1>
          <p className="mono-body text-[12.5px] text-[#4A4741] mt-2">
            Infrastructure compliance and risk evaluation across active connected cloud environments.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="mono-label text-[10px] text-[#6E6A61] block">LAST TELEMETRY SCAN</span>
            <span className="mono-body text-[12.5px] text-[#1A1917] font-semibold">{lastScan}</span>
          </div>
          <button 
            onClick={runScan} 
            disabled={scanRunning}
            className="studio-btn studio-btn-pigment text-[11px] py-2.5 px-5 uppercase"
          >
            {scanRunning ? '[ SCANNING ENVIRONMENTS... ]' : '[ RUN SCAN ]'}
          </button>
        </div>
      </header>

      {/* Top Grid: Posture Card + Frameworks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Overall Score Card */}
        <div className="lg:col-span-4 p-6 bg-[#DCD7CB] hairline-all flex flex-col justify-between">
          <div>
            <div className="mono-label text-[#9B3418] mb-1">METRIC 01.0</div>
            <h3 className="serif-heading text-[26px] text-[#1A1917] mb-2">Overall Score</h3>
            <div className="inline-flex items-center gap-1 text-[#9B3418] text-[11px] mono-label bg-[#E7E3DA] px-2 py-1 hairline-all">
              <ArrowUpRight size={12} /> +6.2% vs last week
            </div>
          </div>
          
          <div className="my-8 flex items-center justify-between">
            <div className="relative w-32 h-32 flex items-center justify-center bg-[#E7E3DA] hairline-all">
              <span className="font-serif text-[42px] font-bold text-[#1A1917]">{overallCompliance}%</span>
            </div>

            <div className="space-y-3 mono-label text-[11px] text-[#4A4741]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#1A1917]"></span>
                <span>128 PASSING</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#9B3418]"></span>
                <span>21 FAILING</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#6E6A61]"></span>
                <span>7 SKIPPED</span>
              </div>
            </div>
          </div>

          <div className="pt-3 hairline-t text-[10px] mono-label text-[#6E6A61] flex justify-between">
            <span>STATUS: ACTIVE MONITORING</span>
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Frameworks Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {frameworks.map(fw => (
            <Link key={fw.id} to="/controls" className="block text-decoration-none group">
              <div className="p-6 bg-[#E7E3DA] hairline-all group-hover:bg-[#DCD7CB]/50 transition-colors flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="mono-label text-[#9B3418]">{fw.id}</div>
                    <span className="font-serif text-[36px] font-bold text-[#1A1917]">{fw.score}%</span>
                  </div>
                  <h4 className="serif-heading text-[24px] text-[#1A1917] mb-2">{fw.name}</h4>
                </div>

                <div className="mt-6 pt-4 hairline-t flex justify-between items-center text-[11px] mono-label">
                  <span className="text-[#4A4741]">{fw.passing} / {fw.controls} PASSING</span>
                  <span className="text-[#9B3418] flex items-center gap-1 group-hover:underline">
                    VIEW FRAMEWORK <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pipeline Status */}
      <section className="hairline-t pt-8">
        <div className="mono-label text-[#9B3418] mb-2">SECTION 02 — COMPLIANCE PIPELINE</div>
        <h2 className="serif-heading text-[28px] text-[#1A1917] mb-6">Pipeline Verification Stages</h2>
        
        <div className="p-6 bg-[#DCD7CB] hairline-all grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {['INFRASTRUCTURE', 'DISCOVERY', 'NORMALIZATION', 'EVALUATION', 'EVIDENCE', 'MAPPING', 'POSTURE'].map((stage, idx) => (
            <div key={stage} className="p-3 bg-[#E7E3DA] hairline-all flex flex-col items-center justify-center text-center">
              <ShieldCheck size={18} className="text-[#9B3418] mb-2" />
              <span className="text-[9.5px] mono-label text-[#1A1917] font-bold">{stage}</span>
              <span className="text-[8.5px] mono-label text-[#6E6A61] mt-1">STAGE 0{idx+1}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Findings & Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 hairline-t pt-8">
        
        {/* Priority Findings */}
        <section className="lg:col-span-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="mono-label text-[#9B3418] mb-1">SECTION 03 — AUDIT FINDINGS</div>
              <h2 className="serif-heading text-[28px] text-[#1A1917]">Priority Findings</h2>
            </div>
            <Link to="/findings" className="studio-btn text-[10.5px]">
              [ VIEW ALL FINDINGS ]
            </Link>
          </div>

          <div className="space-y-4">
            {[...criticalFindings, ...highFindings].slice(0, 4).map(finding => (
              <Link key={finding.id} to="/findings" className="block text-decoration-none group">
                <div className="p-5 bg-[#E7E3DA] hairline-all group-hover:bg-[#DCD7CB]/60 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 text-[9.5px] mono-label border ${
                      finding.severity === 'CRITICAL' 
                        ? 'border-[#9B3418] text-[#9B3418] bg-[#9B3418]/10' 
                        : 'border-[#1A1917] text-[#1A1917] bg-[#1A1917]/10'
                    }`}>
                      {finding.severity}
                    </span>
                    <div>
                      <h4 className="font-serif text-[18px] font-semibold text-[#1A1917] group-hover:text-[#9B3418] transition-colors">
                        {finding.title}
                      </h4>
                      <div className="text-[10.5px] mono-body text-[#6E6A61] mt-1">
                        {finding.cloud} / {finding.account} • {finding.controlId}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#6E6A61] group-hover:text-[#9B3418] transition-colors self-end sm:self-center" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Coverage */}
        <section className="lg:col-span-4">
          <div className="mono-label text-[#9B3418] mb-1">SECTION 04 — ECOSYSTEM</div>
          <h2 className="serif-heading text-[28px] text-[#1A1917] mb-6">Connected Environments</h2>
          
          <div className="space-y-4">
            {['aws', 'github', 'kubernetes'].map((env) => {
              const data = infrastructure.summary[env];
              const labels = Object.keys(data);
              return (
                <div key={env} className="p-5 bg-[#E7E3DA] hairline-all">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="serif-heading text-[20px] text-[#1A1917] uppercase">{env}</h4>
                    <span className="px-2 py-0.5 bg-[#1A1917] text-[#E7E3DA] text-[9.5px] mono-label">CONNECTED</span>
                  </div>
                  <div className="flex justify-between text-[11px] mono-body text-[#4A4741]">
                    <span>{data[labels[0]]} {labels[0]}</span>
                    <span>{data[labels[1]]} {labels[1]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </div>

    </div>
  );
};

export default Dashboard;
