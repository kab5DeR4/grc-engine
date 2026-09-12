import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Shield, UserCheck } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@grcengine.com');
  const [password, setPassword] = useState('••••••••••••');
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();

  const handleLogin = (e) => {
    e.preventDefault();
    setDemoMode(true);
    navigate('/dashboard');
  };

  const handleDemo = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  return (
    <div className="w-full min-h-screen bg-[var(--ground)] text-slate-900 dark:text-slate-100 font-sans flex items-center justify-center p-6 isolate relative overflow-hidden transition-colors">
      
      {/* Background architectural grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative z-10 w-full max-w-[440px] bg-[var(--surface)] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 shadow-md">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Shield size={13} />
            <span>SECURE SOVEREIGN GATEWAY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Authentication Required
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Enter your operator identity or launch instant sandbox mode.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase" htmlFor="email">
              Operator ID / Email
            </label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase" htmlFor="password">
              Access Key / Passkey
            </label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="remember" className="accent-sky-500 rounded" defaultChecked />
              <span>Remember session</span>
            </label>
            <span className="text-sky-600 dark:text-sky-400 font-semibold cursor-pointer hover:underline">FIDO2 WebAuthn</span>
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock size={14} />
            <span>INITIATE SESSION</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck size={14} className="text-sky-500" />
              <span>Demo Persona: <strong>Platform Admin</strong></span>
            </div>
            <span className="text-[10.5px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">READY</span>
          </div>
          
          <button 
            onClick={handleDemo}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>TRY DEMO WITHOUT CREDENTIALS</span>
            <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5">
            <ArrowRight size={11} className="rotate-180" /> RETURN TO PORTAL
          </Link>
        </div>
      </div>
    </div>
  );
}
