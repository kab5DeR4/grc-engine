import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

// Studio SplitHero Component — handles interactive diagram and hero buttons
export default function SplitHero() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();
  const [isEngineExpanded, setIsEngineExpanded] = useState(false);
  const [activeElement, setActiveElement] = useState('soc2');
  const autoPlayRef = useRef(null);

  // Auto-play sequence array
  const sequence = ['soc2', 'aws', 'control', 'evidence', 'state'];

  // Start auto-play when expanded
  useEffect(() => {
    if (isEngineExpanded) {
      setActiveElement('soc2'); // Start at beginning
      let currentIndex = 0;
      autoPlayRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % sequence.length;
        setActiveElement(sequence[currentIndex]);
      }, 2500); // Change step every 2.5s
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isEngineExpanded]);

  // Handle manual interaction (pauses auto-play)
  const handleNodeClick = (id, e) => {
    e.stopPropagation();
    setActiveElement(id);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  // quick toggle helper for diagram views
  const handleDemo = () => {
    setDemoMode(true);
    navigate('/dashboard');
  };

  // close expanded details modal real quick
  const closeEngine = () => {
    setIsEngineExpanded(false);
  };

  const explanations = {
    soc2: {
      label: 'PHASE 01: INGESTION',
      title: 'SOC 2 Policy Sync',
      text: 'Eliminates manual audit preparation. Your compliance criteria are continuously mapped to live operations, ensuring your team remains audit-ready 365 days a year without tedious paperwork.'
    },
    aws: {
      label: 'PHASE 01: INGESTION',
      title: 'AWS Cloud Sync',
      text: 'Zero-effort security monitoring. Connects directly with your cloud environment to track every configuration change as it happens, protecting your platform from silent security drift.'
    },
    control: {
      label: 'PHASE 02: PROCESSING',
      title: 'Control Mapping',
      text: 'Translates complex regulatory standards into clear, actionable rules for your engineering team, guaranteeing that high-level security policies are enforced at the code level.'
    },
    evidence: {
      label: 'PHASE 02: PROCESSING',
      title: 'Evidence Proof',
      text: 'No more taking manual screenshots for auditors. Automatically gathers tamper-proof evidence in the background, proving your controls are active with zero human effort.'
    },
    state: {
      label: 'PHASE 03: OUTPUT',
      title: 'Real-Time Verdict',
      text: 'Instant trust and clarity. Gives executives and auditors a single, real-time score that proves your security posture to enterprise buyers and board members at any moment.'
    }
  };

  const DiagramNode = ({ id, title, x, y, width = 160 }) => {
    const isActive = activeElement === id;
    return (
      <button
        onClick={(e) => handleNodeClick(id, e)}
        style={{
          left: x,
          top: y,
          width: width,
          backgroundColor: isActive ? '#1A1917' : '#E7E3DA',
          color: isActive ? '#E7E3DA' : '#1A1917',
          borderColor: isActive ? '#9B3418' : 'rgba(26,25,23,0.2)',
          transform: 'translate(-50%, -50%)',
          boxShadow: isActive ? '0 0 20px rgba(155,52,24,0.4)' : 'none'
        }}
        className={`absolute z-50 text-center transition-all duration-500 ease-out pointer-events-auto border px-3 py-2.5 rounded-lg shrink-0 cursor-pointer select-none ${isActive ? 'scale-110' : 'scale-100 hover:scale-105 hover:shadow-md'}`}
      >
        {isActive && (
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#55B685] rounded-full border-2 border-[#DCD7CB] animate-pulse shadow-[0_0_8px_#55B685]"></div>
        )}
        <div className="text-[11px] font-bold tracking-wider uppercase pointer-events-none whitespace-nowrap">{title}</div>
      </button>
    );
  };

  // SVG Animated Flow Line
  const FlowLine = ({ path, isActive }) => {
    return (
      <g>
        <path d={path} fill="none" stroke="rgba(26,25,23,0.15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {isActive && (
          <path
            d={path}
            fill="none"
            stroke="#9B3418"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-flow-dash"
            style={{
              strokeDasharray: '8 8',
              filter: 'drop-shadow(0 0 4px rgba(155,52,24,0.6))'
            }}
          />
        )}
      </g>
    );
  };

  return (
    <section className="relative w-full h-[calc(100vh-60px)] min-h-[560px] mt-[60px] bg-[#E7E3DA] dark:bg-[#121110] overflow-hidden isolate flex items-stretch px-6 md:px-12 border-b border-[#1A1917]/10 dark:border-[#E7E3DA]/10 font-sans transition-colors duration-200">
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -16; }
        }
        .animate-flow-dash {
          animation: flowDash 0.8s linear infinite;
        }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {isEngineExpanded && (
        <div className="absolute inset-0 z-10 cursor-pointer" onClick={closeEngine}></div>
      )}

      {/* Left Copy Stack (Normal Hero State) */}
      <div
        className="relative z-50 max-w-[560px] lg:max-w-[46vw] py-6 md:py-8 flex flex-col justify-between h-full transition-all duration-700 ease-in-out"
        style={{
          opacity: isEngineExpanded ? 0 : 1,
          pointerEvents: isEngineExpanded ? 'none' : 'auto'
        }}
      >
        <div className="my-auto py-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B3418]/10 dark:bg-[#FF6B4A]/10 text-[#9B3418] dark:text-[#FF6B4A] text-[12px] font-semibold tracking-wider uppercase mb-4">
            <Sparkles size={13} />
            <span>Continuous Compliance Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-[38px] sm:text-[48px] md:text-[clamp(36px,4.2vw,58px)] font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-tight leading-[1.1] font-serif mb-5">
            Continuous governance powered by <span className="italic font-normal text-[#9B3418] dark:text-[#FF6B4A]">verifiable data</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] md:text-[17px] text-[#6E6A61] dark:text-[#9E988B] leading-relaxed mb-8 max-w-[500px]">
            An advanced platform that continuously translates security policies into technical controls, verifies them against your infrastructure, and produces auditor-grade evidence proofs.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 relative z-50">
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-xl bg-[#1A1917] hover:bg-[#9B3418] dark:bg-[#E7E3DA] dark:text-[#1A1917] dark:hover:bg-[#FF6B4A] dark:hover:text-white text-[#E7E3DA] text-[14px] font-semibold transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              onClick={handleDemo}
              className="px-6 py-3.5 rounded-xl border border-[#1A1917]/25 dark:border-[#E7E3DA]/25 text-[#1A1917] dark:text-[#E7E3DA] hover:bg-[#1A1917]/5 dark:hover:bg-[#E7E3DA]/5 text-[14px] font-semibold transition-all cursor-pointer"
            >
              Try Live Demo
            </button>

            <button
              type="button"
              onClick={() => setIsEngineExpanded(true)}
              className="text-[#6E6A61] dark:text-[#9E988B] hover:text-[#1A1917] dark:hover:text-[#E7E3DA] text-[13px] font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer ml-1"
            >
              <span>Interactive Architecture Graph</span>
              <ArrowRight size={14} className="text-[#9B3418] dark:text-[#FF6B4A]" />
            </button>
          </div>
        </div>

        {/* Footer Strip */}
        <div className="pt-4 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex flex-wrap items-center justify-between text-[12px] text-[#6E6A61] dark:text-[#9E988B] gap-2">
          <span>Continuous Control Evaluation</span>
          <span className="flex items-center gap-1.5 font-medium text-[#1A1917] dark:text-[#E7E3DA]">
            <CheckCircle2 size={13} className="text-[#55B685]" /> Policy → Control → Evidence → Verdict
          </span>
        </div>
      </div>

      {/* Explanation Panel */}
      <div
        className={`absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-[90vw] md:w-[420px] max-w-[440px] z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${isEngineExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}
      >
        {activeElement && explanations[activeElement] && (
          <div className="relative pl-6 border-l-2 border-[#9B3418] dark:border-[#FF6B4A]">
            <div className="text-[11px] text-[#9B3418] dark:text-[#FF6B4A] mb-2 uppercase flex items-center gap-2 font-semibold tracking-wider">
              <span className="w-2 h-2 bg-[#9B3418] dark:bg-[#FF6B4A] rounded-full animate-pulse"></span>
              {explanations[activeElement].label}
            </div>
            <h2 className="font-serif text-[34px] sm:text-[40px] text-[#1A1917] dark:text-[#E7E3DA] leading-[1.05] tracking-tight mb-4 transition-all duration-300">
              {explanations[activeElement].title}
            </h2>
            <p className="text-[13.5px] leading-relaxed text-[#6E6A61] dark:text-[#9E988B] mb-6">
              {explanations[activeElement].text}
            </p>
            <div className="pt-4 border-t border-[#1A1917]/10 dark:border-[#E7E3DA]/10 flex gap-8 text-[11px] text-[#6E6A61] dark:text-[#9E988B]">
              <div>
                <div className="mb-1 opacity-60">STATUS</div>
                <div className="text-[#1A1917] dark:text-[#E7E3DA] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#55B685] rounded-full animate-pulse"></span> ACTIVE
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Area: Engine Monolith & Interactive Pipeline */}
      <div className={`absolute top-0 right-0 bottom-0 transition-all duration-700 ease-in-out pointer-events-none z-20 ${isEngineExpanded ? 'left-0 md:left-[450px] lg:left-[480px] flex items-center justify-center pr-4 md:pr-8' : 'left-0 md:left-auto md:w-[70vw] lg:w-[65vw] flex flex-col justify-center items-end pr-4 md:pr-12'}`}>

        {/* STATIC HERO STATE */}
        <div className={`w-full h-full relative flex flex-col justify-center items-end transition-all duration-700 ease-in-out pointer-events-none ${isEngineExpanded ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="absolute right-0 flex flex-col justify-center items-end w-full pointer-events-none">
            <div className="font-serif font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-[-0.03em] select-none text-right z-30 pointer-events-none" style={{ fontSize: 'clamp(60px, min(13vw, 22vh), 195px)', lineHeight: 0.82 }}>
              GOVERNANCE
            </div>
            <div className="h-[280px] sm:h-[380px] md:h-[48vh] lg:h-[48vh] max-h-[480px] pointer-events-none"></div>
            <div className="font-serif font-bold text-[#1A1917] dark:text-[#E7E3DA] tracking-[-0.03em] select-none text-right z-10 pointer-events-none" style={{ fontSize: 'clamp(60px, min(13vw, 22vh), 195px)', lineHeight: 0.82 }}>
              ENGINE
            </div>
          </div>

          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 flex justify-center items-center ${!isEngineExpanded ? 'pointer-events-auto cursor-pointer group' : 'pointer-events-none'}`}
            onClick={(e) => {
              if (!isEngineExpanded) {
                e.stopPropagation();
                setIsEngineExpanded(true);
              }
            }}
          >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A1917] text-[#E7E3DA] text-[11px] font-semibold px-4 py-2 rounded-lg transition-opacity duration-300 z-50 flex items-center gap-2 whitespace-nowrap shadow-xl pointer-events-none ${!isEngineExpanded ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
              <span className="w-1.5 h-1.5 bg-[#9B3418] rounded-full animate-pulse"></span>
              EXPLORE ENGINE
            </div>
            <img
              src="/grc_cutout_subject.png"
              alt="GRC Engine Monolith"
              className="h-[280px] sm:h-[380px] md:h-[48vh] lg:h-[48vh] max-h-[480px] w-auto max-w-[88vw] object-contain cursor-pointer"
              style={{ filter: 'drop-shadow(0px 18px 28px rgba(26,25,23,0.22))' }}
            />
          </div>
        </div>

        {/* EXPANDED DIAGRAM STATE */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out pointer-events-none ${isEngineExpanded ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="relative w-[840px] h-[520px] max-w-full flex items-center justify-center font-sans origin-center transform scale-[0.65] sm:scale-[0.80] md:scale-[0.85] lg:scale-[0.92] xl:scale-100 transition-transform duration-500">

            <button onClick={(e) => { e.stopPropagation(); closeEngine(); }} className="absolute top-0 right-2 px-3 py-1 rounded bg-[#1A1917] text-[#E7E3DA] dark:bg-[#E7E3DA] dark:text-[#1A1917] text-[11px] font-bold tracking-widest z-50 cursor-pointer select-none">
              CLOSE
            </button>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[13px] text-[#1A1917] dark:text-[#E7E3DA] font-bold tracking-wider z-50 border-b border-[#1A1917]/20 pb-1.5 pointer-events-none">
              LIVE DATA PIPELINE
            </div>

            {/* SVG Flow Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 840 520">
              <FlowLine path="M 220 140 L 280 140 C 310 140, 310 260, 340 260" isActive={activeElement === 'soc2' || activeElement === 'control'} />
              <FlowLine path="M 220 380 L 280 380 C 310 380, 310 260, 340 260" isActive={activeElement === 'aws' || activeElement === 'control'} />
              <FlowLine path="M 340 260 L 460 260" isActive={activeElement === 'control' || activeElement === 'evidence'} />
              <FlowLine path="M 540 260 C 570 260, 570 180, 600 180 L 660 180" isActive={activeElement === 'evidence'} />
              <FlowLine path="M 540 260 C 570 260, 570 340, 600 340 L 660 340" isActive={activeElement === 'state'} />
            </svg>

            {/* Nodes */}
            <DiagramNode id="soc2" title="SOC 2 POLICY" x={140} y={140} />
            <DiagramNode id="aws" title="AWS CLOUD" x={140} y={380} />
            <DiagramNode id="control" title="CONTROL MAPPING" x={340} y={260} width={180} />

            <div className="absolute left-[500px] top-[260px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center">
              <img
                src="/grc_cutout_subject.png"
                alt="GRC Engine Core"
                className={`h-[180px] w-auto object-contain transition-all duration-700 ${['control', 'evidence'].includes(activeElement) ? 'scale-110 drop-shadow-[0_0_20px_rgba(155,52,24,0.4)]' : 'scale-100 drop-shadow-[0_12px_22px_rgba(26,25,23,0.22)]'}`}
              />
            </div>

            <DiagramNode id="evidence" title="EVIDENCE PROOF" x={660} y={180} width={170} />
            <DiagramNode id="state" title="94.2% COMPLIANT" x={660} y={340} width={170} />

            <div className="absolute top-[60px] bottom-[60px] left-[260px] border-l border-dashed border-[#1A1917]/20 z-0"></div>
            <div className="absolute top-[60px] bottom-[60px] left-[580px] border-l border-dashed border-[#1A1917]/20 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
