import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu } from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import Header from '../components/layout/Header';

import LandingHero from '../components/landing/LandingHero';
import LandingFeatures from '../components/landing/LandingFeatures';
import LandingWorkflow from '../components/landing/LandingWorkflow';
import LandingPricing from '../components/landing/LandingPricing';
import LandingCTA from '../components/landing/LandingCTA';
import LandingFooter from '../components/landing/LandingFooter';

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
        <LandingHero handleDemoEntry={handleDemoEntry} scrollTo={scrollTo} />
        <LandingFeatures />
        <LandingWorkflow />
        <LandingPricing handleDemoEntry={handleDemoEntry} />
        <LandingCTA handleDemoEntry={handleDemoEntry} />
      </main>

      <LandingFooter scrollTo={scrollTo} />
    </div>
  );
}
