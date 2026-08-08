import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, X, CheckCircle2, Star, ArrowRight, User } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import Header from '../components/layout/Header';

export default function Landing() {
  const navigate = useNavigate();
  const [isSimulating, setIsSimulating] = useState(false);
  const { setDemoMode } = useDemoStore();

  const handleDemoEntry = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setDemoMode(true);
      navigate('/dashboard');
    }, 1500);
  };

  if (isSimulating) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center text-white font-sans">
        <div className="w-16 h-16 rounded-full border-4 border-dark-gray border-t-yellow animate-spin mb-8"></div>
        <h2 className="text-4xl font-display uppercase tracking-wider mb-2">Connecting</h2>
        <p className="text-muted font-mono text-sm">LOADING DEMO ENVIRONMENT...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-charcoal font-sans selection:bg-yellow selection:text-charcoal overflow-x-hidden">
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-40 px-6 brutalist-grid-light flex flex-col items-center justify-center text-center border-b border-border-light">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-white rounded-full mb-12 shadow-xl hover:-translate-y-1 transition-transform">
            <span className="w-2 h-2 rounded-full bg-yellow animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest font-sans">GRC ENGINE 3.0 LIVE</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-display uppercase leading-[0.9] tracking-normal mb-8 max-w-6xl">
            SECURITY MADE <span className="relative inline-block">
              <span className="relative z-10 text-charcoal">BRUTALLY</span>
              <span className="absolute inset-0 bg-yellow transform -rotate-2 -inset-1 z-0 rounded-sm"></span>
            </span> SIMPLE
          </h1>

          <p className="text-lg md:text-2xl text-charcoal/70 font-sans max-w-2xl mb-12">
            Continuous compliance and automated evidence gathering without the enterprise friction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl w-full mx-auto">
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className="flex-1 bg-white border-2 border-charcoal/20 rounded-lg px-6 py-4 font-sans text-lg focus:outline-none focus:border-charcoal shadow-[4px_4px_0px_0px_rgba(23,30,25,0.1)] focus:shadow-none transition-all"
            />
            <button onClick={handleDemoEntry} className="bg-yellow text-charcoal font-display uppercase text-2xl px-10 py-4 rounded-lg hover:bg-charcoal hover:text-yellow transition-colors shadow-[4px_4px_0px_0px_rgba(23,30,25,0.2)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none">
              Get Access
            </button>
          </div>
        </section>

        {/* ABSTRACT UI MOCKUP */}
        <section className="py-24 px-6 bg-white border-b border-border-light flex justify-center">
          <div className="w-full max-w-5xl rounded-xl border border-charcoal/10 shadow-2xl bg-white overflow-hidden">
            {/* Browser Header */}
            <div className="bg-white border-b border-charcoal/10 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 text-center text-xs font-mono text-charcoal/50">app.grc-engine.com</div>
            </div>
            {/* Browser Body */}
            <div className="flex h-[500px]">
              {/* Sidebar */}
              <div className="w-48 bg-secondary border-r border-charcoal/10 p-4 space-y-4">
                <div className="h-6 w-3/4 bg-charcoal/10 rounded"></div>
                <div className="h-4 w-1/2 bg-charcoal/5 rounded"></div>
                <div className="h-4 w-2/3 bg-charcoal/5 rounded"></div>
                <div className="h-4 w-5/6 bg-charcoal/5 rounded"></div>
              </div>
              {/* Main Canvas */}
              <div className="flex-1 bg-white p-8 relative flex items-center justify-center brutalist-grid-light">
                <div className="w-64 h-64 bg-white border border-charcoal/10 shadow-[8px_8px_0px_0px_rgba(23,30,25,0.05)] flex items-center justify-center flex-col gap-4 relative">
                  <div className="w-16 h-16 rounded-full bg-yellow/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-yellow" />
                  </div>
                  <div className="h-4 w-32 bg-charcoal/20 rounded"></div>
                  
                  {/* Floating Cursor */}
                  <div className="absolute top-1/4 right-1/4 translate-x-12 -translate-y-8 pointer-events-none">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 drop-shadow-md">
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="currentColor"/>
                    </svg>
                    <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm absolute top-5 left-3 shadow-md whitespace-nowrap">Admin User</div>
                  </div>
                </div>
              </div>
              {/* Properties Panel */}
              <div className="w-64 bg-secondary border-l border-charcoal/10 p-4">
                <h4 className="font-display uppercase text-lg mb-6">Properties</h4>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-charcoal/50 uppercase mb-2 block">Alignment</label>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-white border border-charcoal/10 rounded flex items-center justify-center text-charcoal/40"><CheckCircle2 size={14}/></div>
                      <div className="w-8 h-8 bg-charcoal text-white rounded flex items-center justify-center"><CheckCircle2 size={14}/></div>
                      <div className="w-8 h-8 bg-white border border-charcoal/10 rounded flex items-center justify-center text-charcoal/40"><CheckCircle2 size={14}/></div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-charcoal/50 uppercase mb-2 block">Color</label>
                    <div className="flex items-center gap-3 bg-white border border-charcoal/10 p-2 rounded">
                      <div className="w-6 h-6 rounded bg-yellow border border-charcoal/10"></div>
                      <span className="font-mono text-sm">#FFE17C</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM / SOLUTION */}
        <section className="flex flex-col lg:flex-row w-full min-h-[600px]">
          <div className="flex-1 bg-charcoal text-white p-12 lg:p-24 flex flex-col items-start justify-start brutalist-grid-dark border-b lg:border-b-0 lg:border-r border-charcoal">
            <h2 className="text-5xl md:text-7xl font-display text-muted uppercase mb-12">THE OLD WAY</h2>
            <ul className="space-y-8">
              <li className="flex gap-4 text-xl md:text-2xl font-sans text-muted items-start">
                <X className="text-red-500 shrink-0 mt-1" size={32} />
                <span>Manual screenshots and massive spreadsheets.</span>
              </li>
              <li className="flex gap-4 text-xl md:text-2xl font-sans text-muted items-start">
                <X className="text-red-500 shrink-0 mt-1" size={32} />
                <span>Months of preparation for a single audit.</span>
              </li>
              <li className="flex gap-4 text-xl md:text-2xl font-sans text-muted items-start">
                <X className="text-red-500 shrink-0 mt-1" size={32} />
                <span>Zero real-time visibility into compliance drift.</span>
              </li>
            </ul>
          </div>
          <div className="flex-1 bg-dark-gray border-l-8 border-yellow text-white p-12 lg:p-24 flex flex-col items-start justify-start brutalist-grid-dark">
            <h2 className="text-5xl md:text-7xl font-display text-white uppercase mb-12">THE FLUX WAY</h2>
            <ul className="space-y-8">
              <li className="flex gap-4 text-xl md:text-2xl font-sans text-white items-start">
                <CheckCircle2 className="text-yellow shrink-0 mt-1" size={32} />
                <span>Automated, cryptographically verified evidence.</span>
              </li>
              <li className="flex gap-4 text-xl md:text-2xl font-sans text-white items-start">
                <CheckCircle2 className="text-yellow shrink-0 mt-1" size={32} />
                <span>Continuous compliance mapping in real-time.</span>
              </li>
              <li className="flex gap-4 text-xl md:text-2xl font-sans text-white items-start">
                <CheckCircle2 className="text-yellow shrink-0 mt-1" size={32} />
                <span>Instant remediation via infrastructure-as-code.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* BENTO GRID */}
        <section className="py-32 px-6 bg-white border-b border-border-light">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-7xl font-display uppercase mb-16 text-center text-charcoal">Powerful <span className="bg-yellow px-2">Features</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
              {/* Feature 1 */}
              <div className="md:col-span-2 bg-secondary p-10 rounded-2xl border border-charcoal/10 flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <h3 className="text-4xl font-display uppercase mb-4">Continuous Scanning</h3>
                  <p className="text-lg font-sans text-charcoal/70 max-w-md">Real-time monitoring across all your cloud infrastructure to detect drift before it becomes a violation.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-2/3 h-64 bg-charcoal rounded-tl-2xl p-6 shadow-2xl translate-x-12 translate-y-12 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-300">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-3 font-mono text-sm text-green-400">
                    <p>{`> Scanning AWS us-east-1...`}</p>
                    <p className="text-white">{`[PASS] S3 Bucket Encryption`}</p>
                    <p className="text-red-400">{`[FAIL] IAM MFA Requirement`}</p>
                    <p className="animate-pulse">_</p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-charcoal text-white p-10 rounded-2xl flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <h3 className="text-4xl font-display uppercase mb-4 text-yellow">Auto Evidence</h3>
                  <p className="text-lg font-sans text-muted">Automatically maps infrastructure state to compliance controls.</p>
                </div>
                <div className="flex justify-center items-center h-full">
                  <div className="w-32 h-32 border-4 border-yellow/30 border-t-yellow rounded-full animate-spin-slow"></div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-secondary p-10 rounded-2xl border border-charcoal/10 flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10">
                  <h3 className="text-4xl font-display uppercase mb-4">Team Collab</h3>
                  <p className="text-lg font-sans text-charcoal/70">Assign and track remediation tasks.</p>
                </div>
                <div className="flex -space-x-4 mt-auto">
                   {[1,2,3].map(i => (
                     <div key={i} className={`w-16 h-16 rounded-full border-4 border-white bg-charcoal flex items-center justify-center shadow-lg z-${40-i*10}`}>
                       <User size={24} className="text-yellow" />
                     </div>
                   ))}
                </div>
              </div>

              {/* Feature 4 */}
              <div className="md:col-span-2 bg-yellow p-10 rounded-2xl border border-charcoal border-b-8 border-r-8 flex flex-col justify-between overflow-hidden relative group hover:translate-y-[2px] hover:translate-x-[2px] hover:border-b-4 hover:border-r-4 transition-all duration-300">
                <div className="relative z-10">
                  <h3 className="text-4xl font-display uppercase mb-4 text-charcoal">Instant Reports</h3>
                  <p className="text-lg font-sans text-charcoal/80 max-w-md">Generate auditor-ready SOC 2 and ISO 27001 reports with a single click.</p>
                </div>
                <button onClick={handleDemoEntry} className="absolute bottom-10 right-10 w-24 h-24 bg-charcoal rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <ArrowRight size={40} className="text-yellow" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-32 px-6 bg-secondary border-b border-border-light relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3">
              <div className="sticky top-32">
                <h2 className="text-6xl md:text-7xl font-display uppercase text-charcoal leading-none">How It Works</h2>
              </div>
            </div>
            <div className="md:w-2/3 flex flex-col gap-32">
              {[
                { step: "01", title: "Connect", desc: "Integrate your cloud environments (AWS, GCP, Azure) in minutes with read-only permissions." },
                { step: "02", title: "Map", desc: "Our engine automatically maps your infrastructure to frameworks like SOC2 and ISO27001." },
                { step: "03", title: "Comply", desc: "Review auto-generated evidence, fix issues via code snippets, and download reports." }
              ].map((item) => (
                <div key={item.step} className="flex gap-8 group">
                  <div className="text-8xl font-display text-yellow/20 group-hover:text-yellow transition-colors duration-500">{item.step}</div>
                  <div className="pt-4">
                    <h3 className="text-4xl font-display uppercase text-charcoal mb-4">{item.title}</h3>
                    <p className="text-xl font-sans text-charcoal/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 px-6 bg-white border-b border-border-light">
          <div className="max-w-7xl mx-auto">
             <h2 className="text-7xl font-display uppercase mb-20 text-center text-charcoal">Loved By <span className="text-yellow" style={{WebkitTextStroke: '2px #171e19'}}>Teams</span></h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { name: "SARAH JENKINS", role: "CTO, TECHFLOW", bg: "bg-white", text: "text-charcoal", border: "border-charcoal/10" },
                 { name: "MARK OTIS", role: "CISO, DATACORP", bg: "bg-charcoal", text: "text-white", border: "border-charcoal", offset: "md:translate-y-4" },
                 { name: "ALEX RIVERA", role: "VP ENG, STARTUP", bg: "bg-white", text: "text-charcoal", border: "border-charcoal/10" }
               ].map((t, i) => (
                 <div key={i} className={`${t.bg} ${t.text} ${t.border} ${t.offset || ''} border p-10 flex flex-col justify-between shadow-xl`}>
                   <div>
                     <div className="flex gap-1 mb-8">
                       {[...Array(5)].map((_,j) => <Star key={j} className="text-yellow fill-yellow" size={24}/>)}
                     </div>
                     <p className="font-sans text-lg font-medium mb-10">"The GRC Engine literally saved us hundreds of hours preparing for our SOC 2 Type 2 audit. The continuous monitoring gives me total peace of mind."</p>
                   </div>
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-gray-300 rounded-full grayscale"></div>
                     <div>
                       <h4 className="font-display uppercase text-lg leading-none">{t.name}</h4>
                       <span className="font-sans text-xs uppercase font-bold opacity-70">{t.role}</span>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-40 px-6 bg-yellow overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <h1 className="text-[20vw] font-display uppercase text-charcoal opacity-10 leading-none whitespace-nowrap">START NOW</h1>
          </div>
          
          <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
            <h2 className="text-6xl md:text-8xl font-display uppercase text-charcoal leading-[0.9] mb-8">
              READY TO SECURE YOUR INFRASTRUCTURE?
            </h2>
            <p className="text-xl md:text-2xl font-sans text-charcoal/80 mb-12 max-w-2xl">
              Join hundreds of engineering teams using Flux to automate compliance.
            </p>
            
            <div className="w-full max-w-md bg-charcoal p-2 rounded-xl shadow-[10px_10px_0px_0px_rgba(23,30,25,0.2)] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="flex-1 bg-transparent border-none text-white px-4 py-3 font-sans focus:outline-none placeholder:text-white/50"
              />
              <button onClick={handleDemoEntry} className="bg-yellow text-charcoal font-display uppercase text-xl px-8 py-3 rounded-lg hover:bg-white transition-colors">
                GO
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-charcoal text-white py-12 px-6 border-t border-charcoal">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl uppercase tracking-normal">GRC ENGINE</span>
            <span className="font-display text-2xl text-yellow">.</span>
          </div>
          <div className="flex gap-6 font-sans text-sm text-muted">
            <a href="#" className="hover:text-yellow transition-colors">Twitter</a>
            <a href="#" className="hover:text-yellow transition-colors">GitHub</a>
            <a href="#" className="hover:text-yellow transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
