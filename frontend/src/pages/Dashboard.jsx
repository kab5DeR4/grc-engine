import { useDemoStore } from '../store/demoStore';
import { ArrowUpRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

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
    <div className="flex flex-col gap-10 max-w-[1400px] mx-auto animate-fade-up pb-20">
      <header className="flex justify-between items-end border-b border-charcoal/10 pb-6">
        <div>
          <h1 className="text-6xl font-display uppercase tracking-normal text-charcoal mb-2">Security Posture</h1>
          <p className="text-charcoal/70 text-lg font-sans">Your infrastructure compliance posture across connected environments.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-charcoal/50 uppercase tracking-widest font-bold font-sans">Last scan</span>
            <span className="text-sm font-mono text-charcoal">{lastScan}</span>
          </div>
          <button 
            onClick={runScan} 
            disabled={scanRunning}
            className={cn(
              "px-8 py-3 rounded-lg font-display text-xl uppercase transition-all shadow-[4px_4px_0px_0px_rgba(23,30,25,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none border-2",
              scanRunning 
                ? "bg-secondary text-charcoal/40 cursor-not-allowed border-charcoal/20 shadow-none" 
                : "bg-yellow text-charcoal border-charcoal hover:bg-charcoal hover:text-yellow"
            )}
          >
            {scanRunning ? 'Scanning...' : 'Run Scan'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posture Card */}
        <div className="col-span-1 p-8 rounded-xl bg-white border-2 border-charcoal/20 shadow-[6px_6px_0px_0px_rgba(23,30,25,0.05)] relative overflow-hidden group hover:border-charcoal/40 transition-colors">
          <div className="mb-8">
            <h3 className="text-3xl font-display uppercase text-charcoal mb-2">Overall Score</h3>
            <div className="flex items-center gap-1 text-green-600 text-sm font-bold font-mono bg-green-50 w-fit px-2 py-1 rounded">
              <ArrowUpRight size={14} /> 6.2% vs last week
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path
                  className="fill-none stroke-secondary stroke-[4]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="fill-none stroke-yellow stroke-[3]"
                  strokeLinecap="square"
                  strokeDasharray={`${overallCompliance}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-display text-charcoal">{overallCompliance}%</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 font-mono text-sm">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-400 border border-charcoal/20"></span>
                <span className="text-charcoal/70">128 pass</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-red-400 border border-charcoal/20"></span>
                <span className="text-charcoal/70">21 fail</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-charcoal/20 border border-charcoal/20"></span>
                <span className="text-charcoal/70">7 skip</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frameworks Grid */}
        <div className="col-span-2 grid grid-cols-2 gap-8">
          {frameworks.map(fw => (
            <div key={fw.id} className="p-8 rounded-xl bg-white border-2 border-charcoal/10 shadow-[4px_4px_0px_0px_rgba(23,30,25,0.05)] flex flex-col justify-between group hover:border-yellow hover:shadow-[4px_4px_0px_0px_rgba(255,225,124,1)] hover:-translate-y-1 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-3xl font-display uppercase text-charcoal">{fw.name}</h4>
                <span className="text-4xl font-display text-charcoal/40">{fw.score}%</span>
              </div>
              <div className="flex justify-between items-center text-sm text-charcoal/50 mb-6 font-mono">
                <span>{fw.passing} / {fw.controls} PASS</span>
                <span className="text-green-500 font-bold">{fw.trend}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold font-sans text-charcoal uppercase tracking-wider group-hover:text-yellow transition-colors">
                View Framework <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="border-t border-charcoal/10 pt-10">
        <h2 className="text-3xl font-display uppercase mb-6 text-charcoal">Pipeline Status</h2>
        <div className="flex items-center justify-between p-6 bg-charcoal text-white rounded-xl shadow-xl overflow-x-auto hide-scrollbar">
          {['INFRASTRUCTURE', 'DISCOVERY', 'NORMALIZATION', 'EVALUATION', 'EVIDENCE', 'MAPPING', 'POSTURE'].map((stage, idx, arr) => (
            <div key={stage} className="flex items-center gap-6 min-w-max">
              <div className="flex flex-col items-center gap-3">
                <ShieldCheck size={24} className="text-yellow" />
                <span className="text-[10px] font-bold tracking-widest font-sans opacity-70">{stage}</span>
              </div>
              {idx < arr.length - 1 && <div className="text-yellow/30 font-mono text-xl mx-4">→</div>}
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-charcoal/10 pt-10">
        <section className="col-span-2">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-display uppercase text-charcoal">Priority Findings</h2>
            <button className="text-sm font-bold font-sans uppercase tracking-wider text-charcoal hover:text-yellow transition-colors flex items-center gap-1">View All <ArrowRight size={14}/></button>
          </div>
          <div className="flex flex-col gap-4">
            {[...criticalFindings, ...highFindings].slice(0, 5).map(finding => (
              <div key={finding.id} className="flex items-center gap-6 p-5 rounded-xl bg-white border border-charcoal/10 shadow-sm group hover:border-yellow transition-colors cursor-pointer">
                <div className="flex-shrink-0 w-28">
                  <span className={cn(
                    "px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest font-sans border-2",
                    finding.severity === 'CRITICAL' ? "bg-red-50 text-red-600 border-red-200" : "bg-orange-50 text-orange-600 border-orange-200"
                  )}>
                    {finding.severity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold font-sans text-charcoal truncate mb-1">{finding.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-charcoal/50 font-mono">
                    <span>{finding.cloud} / {finding.account}</span>
                    <span>•</span>
                    <span>{finding.controlId}</span>
                    <span>•</span>
                    <span>{finding.detectedTime}</span>
                  </div>
                </div>
                <ArrowRight size={20} className="text-charcoal/20 group-hover:text-charcoal transition-colors" />
              </div>
            ))}
          </div>
        </section>

        <section className="col-span-1">
          <h2 className="text-3xl font-display uppercase mb-6 text-charcoal">Coverage</h2>
          <div className="flex flex-col gap-4">
            {['aws', 'github', 'kubernetes'].map((env) => {
              const data = infrastructure.summary[env];
              const labels = Object.keys(data);
              return (
                <div key={env} className="p-6 rounded-xl bg-white border border-charcoal/10 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-display uppercase text-charcoal">{env}</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold font-mono tracking-wider border border-green-200">ONLINE</span>
                  </div>
                  <div className="flex justify-between text-sm text-charcoal/70 font-mono">
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
