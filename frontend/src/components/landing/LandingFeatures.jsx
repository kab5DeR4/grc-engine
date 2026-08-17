import { Activity, Database, ShieldAlert } from 'lucide-react';

export default function LandingFeatures() {
  return (
    <section id="features" className="py-32 px-6 relative blueprint-grid">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-muted mb-4 drop-shadow-[0_1px_0_#ffffff]"><span className="text-accent mr-2">/01</span> SYSTEM CAPABILITIES</h2>
          <h3 className="text-5xl md:text-6xl font-sans font-extrabold uppercase text-ink drop-shadow-[0_1px_0_#ffffff]">Precision <br/>Modules.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-chassis p-8 rounded-2xl shadow-card relative border border-white/30 group hover:-translate-y-2 hover:shadow-floating transition-all duration-300">
             {/* Screws */}
             <div className="absolute top-3 left-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] rotate-45"></div></div>
             <div className="absolute top-3 right-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] rotate-12"></div></div>
             <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] -rotate-45"></div></div>
             <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] -rotate-12"></div></div>
             
             {/* Vents */}
             <div className="absolute top-8 right-8 flex gap-1">
               <div className="w-1 h-6 rounded-full shadow-recessed bg-chassis"></div>
               <div className="w-1 h-6 rounded-full shadow-recessed bg-chassis"></div>
               <div className="w-1 h-6 rounded-full shadow-recessed bg-chassis"></div>
             </div>

             <div className="w-16 h-16 rounded-full shadow-recessed bg-chassis flex items-center justify-center mb-8">
                <Activity size={28} className="text-muted group-hover:text-accent transition-colors duration-300" />
             </div>
             <h4 className="text-xl font-sans font-bold uppercase text-ink mb-3 drop-shadow-[0_1px_0_#ffffff]">Continuous Tracking</h4>
             <p className="text-muted font-sans">Real-time state verification across AWS, GCP, and Azure. Drift is detected before it becomes a violation.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-chassis p-8 rounded-2xl shadow-card relative border border-white/30 group hover:-translate-y-2 hover:shadow-floating transition-all duration-300">
             {/* Screws */}
             <div className="absolute top-3 left-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] rotate-[30deg]"></div></div>
             <div className="absolute top-3 right-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] rotate-[80deg]"></div></div>
             <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] rotate-[10deg]"></div></div>
             <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] -rotate-[50deg]"></div></div>
             
             <div className="absolute top-8 right-8 flex gap-1">
               <div className="w-1 h-6 rounded-full shadow-recessed bg-chassis"></div>
               <div className="w-1 h-6 rounded-full shadow-recessed bg-chassis"></div>
               <div className="w-1 h-6 rounded-full shadow-recessed bg-chassis"></div>
             </div>

             <div className="w-16 h-16 rounded-full shadow-recessed bg-chassis flex items-center justify-center mb-8">
                <Database size={28} className="text-muted group-hover:text-accent transition-colors duration-300" />
             </div>
             <h4 className="text-xl font-sans font-bold uppercase text-ink mb-3 drop-shadow-[0_1px_0_#ffffff]">Auto-Evidence Collection</h4>
             <p className="text-muted font-sans">Cryptographically signed logs and configurations mapped directly to ISO27001 and SOC2 controls.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-chassis p-8 rounded-2xl shadow-card relative border border-white/30 group hover:-translate-y-2 hover:shadow-floating transition-all duration-300">
             {/* Screws */}
             <div className="absolute top-3 left-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] rotate-0"></div></div>
             <div className="absolute top-3 right-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] rotate-90"></div></div>
             <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] rotate-[45deg]"></div></div>
             <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full shadow-recessed"><div className="w-full h-[1px] bg-shadow/60 mt-[3px] -rotate-90"></div></div>
             
             <div className="absolute top-8 right-8 flex gap-1">
               <div className="w-1 h-6 rounded-full shadow-recessed bg-chassis"></div>
               <div className="w-1 h-6 rounded-full shadow-recessed bg-chassis"></div>
               <div className="w-1 h-6 rounded-full shadow-recessed bg-chassis"></div>
             </div>

             <div className="w-16 h-16 rounded-full shadow-recessed bg-chassis flex items-center justify-center mb-8">
                <ShieldAlert size={28} className="text-muted group-hover:text-accent transition-colors duration-300" />
             </div>
             <h4 className="text-xl font-sans font-bold uppercase text-ink mb-3 drop-shadow-[0_1px_0_#ffffff]">Instant Remediation</h4>
             <p className="text-muted font-sans">Generate Terraform or Pulumi snippets instantly to fix failing controls. Zero guesswork required.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
