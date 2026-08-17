import { CheckCircle2 } from 'lucide-react';

export default function LandingPricing({ handleDemoEntry }) {
  return (
    <section id="pricing" className="py-32 px-6 blueprint-grid border-t border-white/20">
      <div className="max-w-5xl mx-auto">
         <div className="mb-20 text-center">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-muted mb-4 drop-shadow-[0_1px_0_#ffffff]"><span className="text-accent mr-2">/03</span> ACQUISITION</h2>
          <h3 className="text-5xl font-sans font-extrabold uppercase text-ink drop-shadow-[0_1px_0_#ffffff]">Licensing Models.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           
           {/* Free Tier */}
           <div className="bg-chassis rounded-3xl p-10 shadow-card relative border border-white/40 flex flex-col items-center text-center">
              {/* Hanging Hole */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full shadow-recessed bg-chassis border border-white/20 flex items-center justify-center">
                 <div className="w-6 h-6 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)] bg-[#d1d9e6]"></div>
              </div>

              <h4 className="text-2xl font-mono uppercase font-bold text-muted mt-6 mb-2">Developer Unit</h4>
              <div className="text-6xl font-sans font-bold text-ink mb-6 drop-shadow-[0_1px_0_#ffffff]">$0<span className="text-xl text-muted font-normal">/mo</span></div>
              
              <ul className="w-full text-left space-y-4 mb-10 font-sans text-muted">
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-accent"/> Up to 3 Cloud Accounts</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-accent"/> SOC2 Basic Framework</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-accent"/> Community Support</li>
              </ul>

              <button onClick={handleDemoEntry} className="w-full mt-auto bg-chassis text-ink font-sans font-bold uppercase tracking-wide text-lg px-8 py-4 rounded-xl shadow-card active:translate-y-[2px] active:shadow-pressed hover:shadow-floating transition-all duration-150 border border-white/20">
                Deploy Free
              </button>
           </div>

           {/* Pro Tier */}
           <div className="bg-chassis rounded-3xl p-10 shadow-floating relative border border-white/60 flex flex-col items-center text-center -translate-y-2">
              {/* Hanging Hole */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full shadow-recessed bg-chassis border border-white/20 flex items-center justify-center">
                 <div className="w-6 h-6 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)] bg-[#d1d9e6]"></div>
              </div>

              {/* Pro Badge */}
              <div className="absolute top-8 right-8 bg-accent px-3 py-1 rounded shadow-[4px_4px_8px_rgba(166,50,60,0.4)]">
                 <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">ENTERPRISE_READY</span>
              </div>

              <h4 className="text-2xl font-mono uppercase font-bold text-ink mt-6 mb-2 drop-shadow-[0_1px_0_#ffffff]">Command Unit</h4>
              <div className="text-6xl font-sans font-bold text-ink mb-6 drop-shadow-[0_1px_0_#ffffff]">$499<span className="text-xl text-muted font-normal">/mo</span></div>
              
              <ul className="w-full text-left space-y-4 mb-10 font-sans text-muted">
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-accent"/> Unlimited Cloud Accounts</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-accent"/> All Frameworks (ISO, GDPR, HIPAA)</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-accent"/> Dedicated TAM & SLA</li>
              </ul>

              <button onClick={handleDemoEntry} className="w-full mt-auto bg-accent text-accent-fg font-sans font-bold uppercase tracking-wide text-lg px-8 py-4 rounded-xl shadow-[4px_4px_8px_rgba(166,50,60,0.4),-4px_-4px_8px_rgba(255,100,110,0.4)] hover:brightness-110 active:translate-y-[2px] active:shadow-pressed transition-all duration-150 border border-white/20">
                Request License
              </button>
           </div>

        </div>
      </div>
    </section>
  );
}
