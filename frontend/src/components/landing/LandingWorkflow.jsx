import { Server, Activity, Lock } from 'lucide-react';

export default function LandingWorkflow() {
  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-24 text-center">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-muted mb-4 drop-shadow-[0_1px_0_#ffffff]"><span className="text-accent mr-2">/02</span> WORKFLOW</h2>
          <h3 className="text-5xl font-sans font-extrabold uppercase text-ink drop-shadow-[0_1px_0_#ffffff]">Physical Logic.</h3>
        </div>

        <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 md:gap-0">
           
           {/* Background Pipe (Desktop only) */}
           <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-4 rounded-full shadow-recessed bg-chassis z-0"></div>

           {/* Step 1 */}
           <div className="w-full md:w-1/3 flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full shadow-card bg-chassis border-4 border-chassis flex items-center justify-center mb-8 group hover:shadow-floating transition-all">
                 <Server size={32} className="text-ink group-hover:text-accent transition-colors"/>
              </div>
              <div className="bg-chassis px-3 py-1 shadow-recessed rounded-md mb-4 inline-block">
                 <span className="font-mono text-xs font-bold text-accent">STEP_01</span>
              </div>
              <h4 className="text-2xl font-sans font-bold uppercase mb-3 drop-shadow-[0_1px_0_#ffffff]">Connect</h4>
              <p className="text-muted font-sans px-4">Attach read-only IAM roles to our engine. We pull state, never modify it.</p>
           </div>

           {/* Step 2 */}
           <div className="w-full md:w-1/3 flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full shadow-card bg-chassis border-4 border-chassis flex items-center justify-center mb-8 group hover:shadow-floating transition-all">
                 <Activity size={32} className="text-ink group-hover:text-accent transition-colors"/>
              </div>
              <div className="bg-chassis px-3 py-1 shadow-recessed rounded-md mb-4 inline-block">
                 <span className="font-mono text-xs font-bold text-accent">STEP_02</span>
              </div>
              <h4 className="text-2xl font-sans font-bold uppercase mb-3 drop-shadow-[0_1px_0_#ffffff]">Analyze</h4>
              <p className="text-muted font-sans px-4">The engine parses your topology and cross-references it with global compliance frameworks.</p>
           </div>

           {/* Step 3 */}
           <div className="w-full md:w-1/3 flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full shadow-card bg-chassis border-4 border-chassis flex items-center justify-center mb-8 group hover:shadow-floating transition-all">
                 <Lock size={32} className="text-ink group-hover:text-accent transition-colors"/>
              </div>
              <div className="bg-chassis px-3 py-1 shadow-recessed rounded-md mb-4 inline-block">
                 <span className="font-mono text-xs font-bold text-accent">STEP_03</span>
              </div>
              <h4 className="text-2xl font-sans font-bold uppercase mb-3 drop-shadow-[0_1px_0_#ffffff]">Secure</h4>
              <p className="text-muted font-sans px-4">Export auditor-ready reports or apply one-click fixes to harden your environments.</p>
           </div>

        </div>
      </div>
    </section>
  );
}
