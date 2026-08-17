export default function LandingFooter({ scrollTo }) {
  return (
    <footer className="bg-chassis py-16 px-6 border-t border-shadow/30 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        
        <div className="flex flex-col items-center md:items-start gap-4">
           <div className="flex items-center gap-3">
             <div className="flex items-center justify-center w-6 h-6 rounded-full shadow-recessed bg-chassis">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-glow-green"></div>
             </div>
             <span className="font-sans font-bold text-lg tracking-tight text-ink drop-shadow-[0_1px_0_#ffffff]">
               GRC<span className="text-accent">ENGINE</span>
             </span>
           </div>
           <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted bg-chassis shadow-recessed px-3 py-1 rounded-md">
              SYSTEM OPERATIONAL
           </div>
        </div>

        <div className="flex gap-16 text-center md:text-left">
          <div className="flex flex-col gap-4">
             <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted/60">Module</span>
             <button onClick={() => scrollTo('features')} className="font-sans text-sm font-semibold text-muted hover:text-ink transition-colors text-left">Capabilities</button>
             <button onClick={() => scrollTo('how-it-works')} className="font-sans text-sm font-semibold text-muted hover:text-ink transition-colors text-left">Workflow</button>
             <button onClick={() => scrollTo('pricing')} className="font-sans text-sm font-semibold text-muted hover:text-ink transition-colors text-left">Licensing</button>
          </div>
          <div className="flex flex-col gap-4">
             <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted/60">External</span>
             <a href="#" className="font-sans text-sm font-semibold text-muted hover:text-ink transition-colors">Documentation</a>
             <a href="#" className="font-sans text-sm font-semibold text-muted hover:text-ink transition-colors">API Reference</a>
             <a href="#" className="font-sans text-sm font-semibold text-muted hover:text-ink transition-colors">Status</a>
          </div>
        </div>

      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-shadow/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted/60 uppercase tracking-widest">
         <span>© 2026 GRC ENGINE. ALL RIGHTS RESERVED.</span>
         <span>V3.0.4 - BUILD 8892</span>
      </div>
    </footer>
  );
}
