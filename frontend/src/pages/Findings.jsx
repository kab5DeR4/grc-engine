import { useState } from 'react';
import { useDemoStore } from '../store/demoStore';
import { Filter, ChevronDown, AlertTriangle, CheckCircle } from 'lucide-react';
import Drawer from '../components/ui/Drawer';
import { cn } from '../lib/utils';

const Findings = () => {
  const { findings, simulateRemediation } = useDemoStore();
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [simulating, setSimulating] = useState(false);

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      simulateRemediation(selectedFinding.id, selectedFinding.controlId);
      setSimulating(false);
      setSelectedFinding(null);
    }, 2500);
  };

  const criticalCount = findings.filter(f => f.severity === 'CRITICAL' && f.status === 'Open').length;
  const highCount = findings.filter(f => f.severity === 'HIGH' && f.status === 'Open').length;
  const mediumCount = findings.filter(f => f.severity === 'MEDIUM' && f.status === 'Open').length;

  return (
    <div className="flex flex-col gap-10 max-w-[1400px] mx-auto animate-fade-up pb-20">
      <header className="flex justify-between items-end border-b border-charcoal/10 pb-6">
        <div>
          <h1 className="text-6xl font-display uppercase tracking-normal text-charcoal mb-2">Findings</h1>
          <p className="text-charcoal/70 text-lg font-sans">Prioritized compliance violations and risks detected in infrastructure.</p>
        </div>
      </header>

      <div className="flex gap-6">
        <div className="flex-1 p-8 bg-white border-2 border-charcoal/10 shadow-[4px_4px_0_0_rgba(23,30,25,0.05)] rounded-xl">
          <div className="text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-4 font-sans">Critical</div>
          <div className="text-6xl font-display text-red-500">{criticalCount}</div>
        </div>
        <div className="flex-1 p-8 bg-white border-2 border-charcoal/10 shadow-[4px_4px_0_0_rgba(23,30,25,0.05)] rounded-xl">
          <div className="text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-4 font-sans">High</div>
          <div className="text-6xl font-display text-red-400">{highCount}</div>
        </div>
        <div className="flex-1 p-8 bg-white border-2 border-charcoal/10 shadow-[4px_4px_0_0_rgba(23,30,25,0.05)] rounded-xl">
          <div className="text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-4 font-sans">Medium</div>
          <div className="text-6xl font-display text-orange-500">{mediumCount}</div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-charcoal/10 pt-6">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white border border-charcoal/10 hover:border-charcoal hover:shadow-[2px_2px_0_0_rgba(23,30,25,1)] text-charcoal px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider font-sans transition-all">
            Severity <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 bg-white border border-charcoal/10 hover:border-charcoal hover:shadow-[2px_2px_0_0_rgba(23,30,25,1)] text-charcoal px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider font-sans transition-all">
            Status <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 bg-white border border-charcoal/10 hover:border-charcoal hover:shadow-[2px_2px_0_0_rgba(23,30,25,1)] text-charcoal px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider font-sans transition-all">
            Resource <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-charcoal text-white hover:bg-yellow hover:text-charcoal border-2 border-charcoal shadow-[2px_2px_0_0_rgba(23,30,25,0.2)] px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider font-sans transition-all">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {findings.map(finding => (
          <div 
            key={finding.id} 
            className="flex justify-between items-center p-6 bg-white border border-charcoal/10 shadow-sm rounded-xl cursor-pointer group hover:border-yellow hover:shadow-[4px_4px_0_0_rgba(255,225,124,1)] hover:-translate-y-0.5 transition-all"
            onClick={() => setSelectedFinding(finding)}
          >
            <div className="flex items-center gap-8">
              <span className={cn(
                "px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest w-24 text-center border-2",
                finding.severity === 'CRITICAL' ? "bg-red-50 text-red-600 border-red-200" : 
                finding.severity === 'HIGH' ? "bg-red-50 text-red-500 border-red-200" :
                "bg-orange-50 text-orange-600 border-orange-200"
              )}>
                {finding.severity}
              </span>
              <div>
                <h3 className={cn("text-xl font-bold font-sans text-charcoal mb-1", finding.status === 'Resolved' && "line-through text-charcoal/40")}>
                  {finding.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-charcoal/50 font-mono">
                  <span>{finding.cloud}</span>
                  <span className="text-charcoal/30">•</span>
                  <span>{finding.account}</span>
                  <span className="text-charcoal/30">•</span>
                  <span>{finding.region}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <span className="font-mono text-sm text-charcoal/60">{finding.controlId}</span>
              <span className="text-xs text-charcoal/40 font-mono">Detected {finding.detectedTime}</span>
              <span className={cn(
                "px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest border-2",
                finding.status === 'Resolved' ? "bg-green-50 text-green-700 border-green-200" : "bg-secondary text-charcoal/60 border-charcoal/10"
              )}>
                {finding.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Drawer
        isOpen={!!selectedFinding}
        onClose={() => setSelectedFinding(null)}
        width="600px"
        title={
          <div className="flex items-start gap-4 text-charcoal">
            <AlertTriangle size={32} className="text-yellow" />
            <span className="font-display uppercase text-3xl leading-none mt-1">{selectedFinding?.title}</span>
          </div>
        }
      >
        {selectedFinding && (
          <div className="flex flex-col gap-8 text-charcoal">
            <div className="flex gap-12 pb-8 border-b border-charcoal/10">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-charcoal/50 uppercase tracking-widest font-sans">Severity</span>
                <span className={cn(
                  "px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest w-fit border-2",
                  selectedFinding.severity === 'CRITICAL' ? "bg-red-50 text-red-600 border-red-200" : "bg-orange-50 text-orange-600 border-orange-200"
                )}>
                  {selectedFinding.severity}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-charcoal/50 uppercase tracking-widest font-sans">Status</span>
                <span className={cn(
                  "px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest w-fit border-2",
                  selectedFinding.status === 'Resolved' ? "bg-green-50 text-green-700 border-green-200" : "bg-secondary text-charcoal/60 border-charcoal/10"
                )}>
                  {selectedFinding.status}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-charcoal/50 uppercase tracking-widest font-sans">Resource</span>
                <span className="font-mono text-sm text-charcoal/80 bg-charcoal/5 px-2 py-1 rounded">{selectedFinding.resource}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-display text-charcoal uppercase tracking-wider mb-4">Impact</h3>
              <p className="text-sm text-charcoal/70 mb-3 font-sans">This configuration violates:</p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-charcoal text-yellow px-3 py-1 rounded-sm text-xs font-mono">{selectedFinding.controlId}</span>
                {selectedFinding.frameworks.map(fw => (
                  <span key={fw} className="bg-secondary border border-charcoal/10 px-3 py-1 rounded-sm text-xs font-bold uppercase text-charcoal">{fw}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-display text-charcoal uppercase tracking-wider mb-4">Evidence</h3>
              <div className="p-4 bg-charcoal border-l-4 border-yellow text-white rounded-r-xl shadow-lg font-mono text-sm">
                <div className="text-white/50">
                  <span className="text-green-400">resource</span> <span className="text-yellow">"aws_s3_bucket" "{selectedFinding.resource}"</span> {'{'}
                </div>
                <div className="pl-4 py-2 bg-red-500/20 text-white border-l-2 border-red-500 my-2">
                  <span className="text-red-300">public_access_block</span> = <span className="text-yellow">false</span>
                </div>
                <div className="text-white/50">{'}'}</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-display text-charcoal uppercase tracking-wider mb-4">Recommended Remediation</h3>
              <p className="text-sm font-sans text-charcoal/70 leading-relaxed bg-yellow/10 p-4 border-l-4 border-yellow">{selectedFinding.remediation}</p>
            </div>

            {selectedFinding.status === 'Open' && (
              <div className="mt-6 p-8 bg-secondary border-2 border-charcoal/10 rounded-xl flex flex-col items-center">
                {!simulating ? (
                  <button 
                    onClick={handleSimulate}
                    className="w-full py-4 bg-charcoal hover:bg-yellow hover:text-charcoal border-2 border-charcoal text-yellow font-display uppercase tracking-widest text-lg rounded-lg shadow-[4px_4px_0_0_rgba(23,30,25,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    Simulate Remediation
                  </button>
                ) : (
                  <div className="flex flex-col gap-4 w-full font-mono text-sm text-charcoal">
                    <div className="flex justify-between items-center animate-fade-up bg-white p-3 rounded border border-charcoal/10">
                      <span>Applying change...</span>
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                    <div className="flex justify-between items-center animate-fade-up bg-white p-3 rounded border border-charcoal/10" style={{animationDelay: '0.5s'}}>
                      <span>Configuration updated</span>
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                    <div className="flex justify-between items-center animate-fade-up bg-white p-3 rounded border border-charcoal/10" style={{animationDelay: '1s'}}>
                      <span className="animate-pulse">Control re-evaluated...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Findings;
