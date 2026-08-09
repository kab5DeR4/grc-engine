import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle2, ArrowRight, Server, Lock, Activity, Database, Zap, ShieldAlert, Cpu } from 'lucide-react';
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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isSimulating) {
    return (
      <div className="min-h-screen bg-chassis flex flex-col items-center justify-center text-ink font-sans blueprint-grid">
        <div className="w-24 h-24 rounded-full shadow-recessed bg-chassis flex items-center justify-center mb-8 relative">
           <div className="absolute w-20 h-20 rounded-full border-4 border-transparent border-t-accent border-r-accent animate-spin shadow-[0_0_15px_rgba(255,71,87,0.4)]"></div>
           <Cpu size={32} className="text-accent animate-pulse" />
        </div>
        <h2 className="text-3xl font-sans font-bold uppercase tracking-widest mb-2 text-ink drop-shadow-[0_1px_0_#ffffff]">Booting Sequence</h2>
        <p className="text-muted font-mono text-sm uppercase tracking-widest">MOUNTING SECURE VOLUME...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chassis text-ink font-sans selection:bg-accent selection:text-white overflow-x-hidden relative">
      <Header />
      
      <main>
        {/* UNIQUE HARDWARE HERO SECTION */}
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

        {/* FEATURES (BOLTED MODULES) */}
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

        {/* HOW IT WORKS (CONNECTORS) */}
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

        {/* PRICING (PUNCHED CARDS) */}
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

        {/* LOGIN / CTA */}
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

      </main>

      {/* FOOTER */}
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
    </div>
  );
}
