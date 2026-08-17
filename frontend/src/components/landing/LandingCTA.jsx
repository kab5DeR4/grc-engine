import { Lock } from 'lucide-react';

export default function LandingCTA({ handleDemoEntry }) {
  return (
    <section id="login" className="py-40 px-6 relative flex flex-col items-center text-center border-t border-shadow/20">
       <div className="max-w-2xl w-full">
         <div className="w-16 h-16 rounded-full shadow-recessed bg-chassis mx-auto mb-8 flex items-center justify-center">
            <Lock size={24} className="text-accent" />
         </div>
         <h2 className="text-5xl font-sans font-extrabold uppercase text-ink mb-6 drop-shadow-[0_1px_0_#ffffff]">Access Terminal.</h2>
         <p className="text-lg text-muted font-sans mb-12">Enter your corporate credentials to access the compliance engine console.</p>
         
         <div className="flex flex-col sm:flex-row gap-4">
           <input 
             type="email" 
             placeholder="SYS.ADMIN@COMPANY.COM" 
             className="flex-1 bg-chassis shadow-recessed border-none rounded-xl px-6 py-4 font-mono text-sm uppercase tracking-wider text-ink focus:outline-none focus:ring-2 focus:ring-accent/50 focus:shadow-[inset_4px_4px_8px_var(--shadow),inset_-4px_-4px_8px_var(--highlight),0_0_0_2px_var(--accent)] transition-all placeholder:text-muted/60"
           />
           <button onClick={handleDemoEntry} className="bg-chassis text-ink font-sans font-bold uppercase tracking-wide px-8 py-4 rounded-xl shadow-card active:translate-y-[2px] active:shadow-pressed hover:shadow-floating transition-all duration-150 border border-white/20 whitespace-nowrap">
             Authenticate
           </button>
         </div>
       </div>
    </section>
  );
}
