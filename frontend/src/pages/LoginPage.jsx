import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="w-full min-h-screen bg-[#DCD7CB] text-[#1A1917] font-mono flex items-center justify-center p-6 isolate relative overflow-hidden">
      
      {/* Background graphic elements */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-20">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="#1A1917" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="300" x2="600" y2="300" stroke="#1A1917" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="300" y1="0" x2="300" y2="600" stroke="#1A1917" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[440px] bg-[#E7E3DA] hairline-all p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(26,25,23,0.1)]">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-[#9B3418] inline-block"></span>
            <span className="mono-label text-[#9B3418]">SECURE GATEWAY</span>
          </div>
          <h1 className="serif-heading text-[32px] md:text-[38px] text-[#1A1917]">
            Authentication <span className="serif-italic-pigment">Required</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mono-label text-[10.5px] text-[#4A4741] mb-2" htmlFor="email">
              OPERATOR ID / EMAIL
            </label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#DCD7CB] hairline-all px-4 py-3 text-[13px] mono-body focus:outline-none focus:border-[#9B3418] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mono-label text-[10.5px] text-[#4A4741] mb-2" htmlFor="password">
              ACCESS KEY / PASSWORD
            </label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#DCD7CB] hairline-all px-4 py-3 text-[13px] mono-body focus:outline-none focus:border-[#9B3418] transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className="w-full studio-btn-primary studio-btn text-[11.5px] py-3.5 flex items-center justify-center gap-2"
          >
            <Lock size={14} />
            [ INITIATE SESSION ]
          </button>
        </form>

        <div className="mt-8 pt-8 hairline-t">
          <div className="mb-4">
            <p className="mono-label text-[10px] text-[#6E6A61] mb-2">DEMO CREDENTIALS (FOR DEV TEAM)</p>
            <div className="bg-[#DCD7CB] hairline-all p-3 text-[11px] mono-body flex flex-col gap-1 text-[#4A4741]">
              <div><strong>Email:</strong> admin@grcengine.com</div>
              <div><strong>Pass:</strong> demo123</div>
            </div>
          </div>
          
          <button 
            onClick={handleDemo}
            className="w-full studio-btn-pigment studio-btn text-[11.5px] py-3.5 flex items-center justify-center gap-2"
          >
            [ TRY DEMO WITHOUT LOGIN ] <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="mono-label text-[10px] text-[#4A4741] hover:text-[#9B3418] transition-colors inline-flex items-center gap-1">
            <ArrowRight size={10} className="rotate-180" /> RETURN TO PORTAL
          </Link>
        </div>
      </div>
    </div>
  );
}
