import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Lock, Shield, UserCheck, UserPlus, Building2, Mail, User } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import { useToast } from '../components/ui/Toast';

export default function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState(initialMode);

  // Form states
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('admin@grcengine.com');
  const [password, setPassword] = useState('••••••••••••');
  const [agreed, setAgreed] = useState(true);

  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();
  const toast = useToast();

  useEffect(() => {
    const requestedMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
    setMode(requestedMode);
  }, [searchParams]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setSearchParams({ mode: newMode });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup') {
      if (!agreed) {
        toast.error('Please agree to the Terms of Service & Privacy Policy.');
        return;
      }
      toast.success(`Account created for ${orgName || 'Workspace'}! Welcome to GRC Engine.`);
    } else {
      toast.success('Session authenticated successfully.');
    }
    setDemoMode(true);
    navigate('/dashboard');
  };

  const handleDemo = () => {
    setDemoMode(true);
    toast.info('Launched sandbox mode with full platform access.');
    navigate('/dashboard');
  };

  return (
    <div className="w-full min-h-screen bg-[var(--ground)] text-slate-900 dark:text-slate-100 font-sans flex items-center justify-center p-4 sm:p-6 isolate relative overflow-hidden transition-colors">
      
      {/* Background architectural grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative z-10 w-full max-w-[460px] bg-[var(--surface)] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 md:p-10 shadow-md">
        
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Shield size={13} />
            <span>SECURE EVIDENCE GATEWAY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {mode === 'signup' ? 'Create Organization Account' : 'Welcome to GRC Engine'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            {mode === 'signup'
              ? 'Deploy continuous evidence verification across your infrastructure.'
              : 'Enter your credentials to access your compliance telemetry.'}
          </p>
        </div>

        {/* Tab switcher: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 p-1 mb-6 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-medium">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`py-2 rounded-lg transition-all text-center cursor-pointer ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`py-2 rounded-lg transition-all text-center cursor-pointer ${
              mode === 'signup'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase" htmlFor="fullname">
                  Full Name
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-3 text-slate-400" />
                  <input 
                    type="text" 
                    id="fullname"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase" htmlFor="orgname">
                  Organization / Team Name
                </label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3.5 top-3 text-slate-400" />
                  <input 
                    type="text" 
                    id="orgname"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                    placeholder="Acme Security Engineering"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase" htmlFor="email">
              Work Email
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-3 text-slate-400" />
              <input 
                type="email" 
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase" htmlFor="password">
              Password / Passkey
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-3 text-slate-400" />
              <input 
                type="password" 
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                placeholder="Enter password"
              />
            </div>
          </div>

          {mode === 'login' ? (
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="remember" className="accent-orange-500 rounded" defaultChecked />
                <span>Remember session</span>
              </label>
              <Link to="/contact" className="text-orange-600 dark:text-orange-400 hover:underline no-underline">
                Forgot password?
              </Link>
            </div>
          ) : (
            <div className="pt-1">
              <label className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)} 
                  className="mt-0.5 accent-orange-500 rounded" 
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-orange-600 dark:text-orange-400 underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-orange-600 dark:text-orange-400 underline">Privacy Policy</Link>.
                </span>
              </label>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full mt-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-white text-xs font-mono font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            {mode === 'signup' ? <UserPlus size={14} /> : <Lock size={14} />}
            <span>{mode === 'signup' ? 'CREATE WORKSPACE ACCOUNT' : 'SIGN IN TO WORKSPACE'}</span>
          </button>
        </form>

        <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck size={14} className="text-orange-500" />
              <span>Instant Sandbox: <strong>Platform Admin</strong></span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">READY</span>
          </div>
          
          <button 
            type="button"
            onClick={handleDemo}
            className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>LAUNCH PRODUCT DEMO</span>
            <ArrowRight size={13} />
          </button>
        </div>
        
        <div className="mt-5 text-center">
          <Link to="/" className="text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 no-underline">
            <ArrowRight size={11} className="rotate-180" /> Back to Home Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
