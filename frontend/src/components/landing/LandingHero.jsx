import { Shield, Zap } from 'lucide-react';

export default function LandingHero({ handleDemoEntry, scrollTo }) {
  return (
    <section className="relative pt-24 pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh]">
      <div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Text mounted on a panel */}
        <div className="flex-1 w-full p-12 bg-chassis shadow-card rounded-2xl relative border border-shadow/20">
          {/* Corner screws */}
          <div className="absolute top-4 left-4 w-3 h-3 rounded-full shadow-recessed bg-chassis flex items-center justify-center"><div className="w-1 h-1 bg-shadow/50 rotate-45"></div></div>
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full shadow-recessed bg-chassis flex items-center justify-center"><div className="w-1 h-1 bg-shadow/50 -rotate-45"></div></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full shadow-recessed bg-chassis flex items-center justify-center"><div className="w-1 h-1 bg-shadow/50 rotate-12"></div></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full shadow-recessed bg-chassis flex items-center justify-center"><div className="w-1 h-1 bg-shadow/50 -rotate-12"></div></div>

          <div className="inline-flex items-center gap-2 mb-8 bg-chassis shadow-recessed px-4 py-2 rounded-md">
            <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-glow animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent drop-shadow-[0_1px_0_#ffffff]">SYSTEM ACTIVE V3.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-sans font-extrabold uppercase leading-[0.95] tracking-tight mb-8 drop-shadow-[0_1px_0_#ffffff]">
            Compliance,<br/>
            <span className="text-muted relative inline-block mt-2">
               Mechanized.
            </span>
          </h1>

          <p className="text-lg text-muted font-sans max-w-xl mb-12 leading-relaxed">
            We replaced massive spreadsheets and endless screenshots with a tactile, automated compliance engine. Continuous state verification mapped directly to SOC2 and ISO27001. No enterprise friction, just precision engineering.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 max-w-xl">
            <button onClick={handleDemoEntry} className="flex-1 bg-accent text-accent-fg font-sans font-bold uppercase tracking-wide text-lg px-8 py-4 rounded-xl shadow-[4px_4px_8px_rgba(166,50,60,0.4),-4px_-4px_8px_rgba(255,100,110,0.4)] hover:brightness-110 active:translate-y-[2px] active:shadow-pressed transition-all duration-150 border border-white/20 flex items-center justify-center gap-3 group">
              <Zap size={20} className="group-hover:scale-110 transition-transform"/> Initialize Demo
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="flex-1 bg-chassis text-ink font-sans font-bold uppercase tracking-wide text-lg px-8 py-4 rounded-xl shadow-floating active:translate-y-[2px] active:shadow-pressed transition-all duration-150 text-center">
              View Schematics
            </button>
          </div>
        </div>

        {/* Right: The 3D Hardware Screen Mockup */}
        <div className="flex-1 w-full max-w-lg aspect-square lg:aspect-auto lg:h-[600px] relative perspective-[1000px] group">
           <div className="absolute inset-0 bg-chassis shadow-floating rounded-3xl border border-white/40 p-4 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:-rotate-y-2">
             
             {/* Outer bezel */}
             <div className="w-full h-full carbon-fiber rounded-2xl p-4 shadow-recessed flex flex-col relative border-4 border-[#1a1f22]">
               
               {/* Top hardware bar */}
               <div className="flex justify-between items-center mb-4 px-2">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full shadow-recessed bg-black flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-glow"></div></div>
                     <div className="w-3 h-3 rounded-full shadow-recessed bg-black flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div></div>
                  </div>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">SEQ-8942-A</div>
               </div>

               {/* The screen (CRT effect) */}
               <div className="flex-1 bg-[#0a0a0c] rounded-xl relative overflow-hidden border-2 border-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                  <div className="absolute inset-0 scanlines opacity-50 z-20 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Screen content */}
                  <div className="p-6 font-mono text-xs flex flex-col gap-4 text-green-400/80 relative z-0 h-full">
                     <div className="flex justify-between border-b border-green-500/20 pb-2">
                        <span>&gt; MOUNT_AWS_US_EAST_1</span>
                        <span className="text-white">OK</span>
                     </div>
                     <div className="flex justify-between border-b border-green-500/20 pb-2">
                        <span>&gt; SCAN_S3_BUCKETS</span>
                        <span className="text-white">OK [42/42]</span>
                     </div>
                     <div className="flex justify-between border-b border-red-500/20 pb-2 text-red-400">
                        <span>&gt; VERIFY_IAM_MFA</span>
                        <span className="text-white">FAIL [1/4]</span>
                     </div>
                     <div className="flex-1 flex items-center justify-center opacity-80 mt-4">
                        <div className="w-32 h-32 rounded-full border border-green-500/30 flex items-center justify-center relative">
                           <div className="absolute inset-0 border border-green-500 rounded-full animate-ping opacity-20"></div>
                           <Shield size={48} className="text-green-500" />
                        </div>
                     </div>
                     <div className="mt-auto animate-pulse">_</div>
                  </div>
               </div>

               {/* Bottom hardware panel */}
               <div className="h-16 mt-4 flex items-center justify-between px-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-4 rounded-full shadow-recessed bg-black/40"></div>
                    <div className="w-12 h-4 rounded-full shadow-recessed bg-black/40"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full shadow-card bg-chassis border border-white/20"></div>
               </div>

             </div>
           </div>
        </div>

      </div>
    </section>
  );
}
