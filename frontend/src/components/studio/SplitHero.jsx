import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';

// Studio SplitHero Component — handles interactive diagram and hero buttons
export default function SplitHero() {
  const navigate = useNavigate();
  const { setDemoMode } = useDemoStore();
  const [isEngineExpanded, setIsEngineExpanded] = useState(false);
  const [activeElement, setActiveElement] = useState('soc2');

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
      label: 'CONTINUOUS COMPLIANCE',
      title: 'SOC 2 Type II Framework',
      text: 'Eliminates manual audit preparation. Your compliance criteria are continuously mapped to live operations, ensuring your team remains audit-ready 365 days a year without tedious paperwork.'
    },
    aws: {
      label: 'CLOUD VISIBILITY',
      title: 'AWS Infrastructure Sync',
      text: 'Zero-effort security monitoring. Connects directly with your cloud environment to track every configuration change as it happens, protecting your platform from silent security drift.'
    },
    control: {
      label: 'AUTOMATED SAFEGUARDS',
      title: 'Technical Control Mapping',
      text: 'Translates complex regulatory standards into clear, actionable rules for your engineering team, guaranteeing that high-level security policies are enforced at the code level.'
    },
    evidence: {
      label: 'AUDIT-READY EVIDENCE',
      title: 'Cryptographic Proof',
      text: 'No more taking manual screenshots for auditors. Automatically gathers tamper-proof evidence in the background, proving your controls are active with zero human effort.'
    },
    state: {
      label: 'REAL-TIME VERDICT',
      title: 'Global Compliance Posture',
      text: 'Instant trust and clarity. Gives executives and auditors a single, real-time score that proves your security posture to enterprise buyers and board members at any moment.'
    }
  };

  const handleNodeClick = (id, e) => {
    e.stopPropagation();
    setActiveElement(id);
  };

  const DiagramNode = ({ id, title, main }) => {
    const isActive = activeElement === id;
    return (
      <button 
        onClick={(e) => handleNodeClick(id, e)}
        style={{
          backgroundColor: isActive ? '#9B3418' : '#DCD7CB',
          color: isActive ? '#FFFFFF' : '#1A1917',
          borderColor: isActive ? '#9B3418' : 'rgba(26, 25, 23, 0.4)'
        }}
        className={`relative z-50 ${main ? 'w-[260px]' : 'w-[180px]'} text-center transition-all duration-300 pointer-events-auto border px-4 py-3 shadow-sm hover:shadow-md shrink-0 cursor-pointer select-none ${isActive ? 'scale-[1.05] shadow-xl' : ''}`}
      >
        <div className="text-[11px] font-bold tracking-widest uppercase pointer-events-none">{title}</div>
      </button>
    );
  };

  const Pipe = ({ orientation, length, color = '#1A1917', direction }) => {
    const isVertical = orientation === 'vertical';
    return (
      <div 
        className="relative overflow-hidden bg-[#1A1917]/15 shrink-0 pointer-events-none"
        style={{
          width: isVertical ? '1px' : length,
          height: isVertical ? length : '1px',
        }}
      >
        <div 
          className="absolute pointer-events-none"
          style={{
            backgroundColor: color,
            width: isVertical ? '3px' : '20px',
            height: isVertical ? '20px' : '3px',
            left: isVertical ? '-1px' : (direction === 'left' ? 'auto' : '0'),
            right: direction === 'left' ? '0' : 'auto',
            top: isVertical ? (direction === 'up' ? 'auto' : '0') : '-1px',
            bottom: direction === 'up' ? '0' : 'auto',
            animation: `flow${direction.charAt(0).toUpperCase() + direction.slice(1)} 1.5s linear infinite`
          }}
        ></div>
      </div>
    );
  };

  const Joint = ({ color = '#1A1917' }) => (
    <div 
      className="w-1.5 h-1.5 rounded-full border bg-[#DCD7CB] z-40 shrink-0 pointer-events-none" 
      style={{ borderColor: color }}
    ></div>
  );

  const getPipeColor = (id) => activeElement === id ? '#9B3418' : '#1A1917';

  return (
    <section className="relative w-full h-[calc(100vh-60px)] min-h-[720px] mt-[60px] bg-[#DCD7CB] overflow-hidden isolate flex items-stretch px-6 md:px-12 hairline-b">
      
      {/* Inject Data Flow Keyframes */}
      <style>{`
        @keyframes flowDown {
          0% { top: -20px; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes flowRight {
          0% { left: -20px; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes flowLeft {
          0% { right: -20px; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { right: 100%; opacity: 0; }
        }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#1A1917 1px, transparent 1px), linear-gradient(90deg, #1A1917 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Invisible Overlay to close when clicking empty space */}
      {isEngineExpanded && (
        <div 
          className="absolute inset-0 z-10 cursor-pointer" 
          onClick={closeEngine}
        ></div>
      )}

      {/* Left Copy Stack (Normal Hero State) */}
      <div 
        className="relative z-50 max-w-[540px] lg:max-w-[46vw] py-6 md:py-8 flex flex-col justify-between h-full transition-all duration-700 ease-in-out"
        style={{ 
          opacity: isEngineExpanded ? 0 : 1, 
          pointerEvents: isEngineExpanded ? 'none' : 'auto' 
        }}
      >
        <div className="my-auto py-4">
          <div className="mono-label text-[#9B3418] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#9B3418] inline-block rounded-full"></span>
            ATELIER GRC ENGINE — VOL. 04 / 2026
          </div>
          <h1 className="serif-heading text-[32px] sm:text-[42px] md:text-[clamp(34px,3.8vw,56px)] leading-[1.04] text-[#1A1917] mb-5">
            Continuous governance powered by <span className="serif-italic-pigment">measurable data</span>.
          </h1>
          <p className="mono-body text-[12.5px] sm:text-[13px] leading-[1.65] text-[#4A4741] mb-8 max-w-[460px]">
            An advanced platform that continuously translates policy into controls, verifies them against your infrastructure, and produces evidence-backed compliance.
          </p>
          <div className="flex flex-wrap items-center gap-4 relative z-50">
            <Link 
              to="/login" 
              className="studio-btn-primary studio-btn text-[11px] py-2.5 px-5 select-none cursor-pointer"
            >
              [ GET STARTED ]
            </Link>
            <button 
              type="button"
              onClick={handleDemo} 
              className="studio-btn studio-btn-pigment text-[11px] py-2.5 px-5 uppercase select-none cursor-pointer"
            >
              [ TRY DEMO ]
            </button>
            <button 
              type="button"
              onClick={() => {
                setIsEngineExpanded(true);
                setActiveElement('soc2');
              }} 
              className="text-[#6E6A61] hover:text-[#1A1917] text-[10.5px] mono-label transition-colors uppercase flex items-center gap-2 ml-2 tracking-widest group cursor-pointer select-none"
            >
              <span className="w-1.5 h-1.5 bg-[#6E6A61] group-hover:bg-[#9B3418] rounded-full transition-colors animate-pulse pointer-events-none"></span>
              EXPLORE ENGINE
            </button>
          </div>
        </div>
        <div className="pt-4 hairline-t flex flex-col sm:flex-row sm:items-center justify-between text-[10.5px] mono-label text-[#6E6A61] gap-2">
          <span>FIG 01.0 — CONTROL EVALUATION</span>
          <span>POLICY → CONTROL → EVIDENCE → VERDICT</span>
        </div>
      </div>

      {/* Explanation Panel (Appears on the left when engine is expanded) */}
      <div 
        className={`absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-[90vw] md:w-[420px] max-w-[440px] z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${isEngineExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}
      >
        {activeElement && explanations[activeElement] && (
          <div className="relative pl-6 border-l-2 border-[#1A1917]">
            <div className="text-[10px] text-[#9B3418] mono-label mb-3 uppercase flex items-center gap-2 font-bold tracking-widest">
              <span className="w-1.5 h-1.5 bg-[#9B3418] rounded-full animate-pulse"></span>
              {explanations[activeElement].label}
            </div>
            <h2 className="font-serif text-[34px] sm:text-[40px] text-[#1A1917] leading-[1.05] tracking-tight mb-4">
              {explanations[activeElement].title}
            </h2>
            <p className="mono-body text-[13px] leading-[1.75] text-[#4A4741] mb-6">
              {explanations[activeElement].text}
            </p>
            
            <div className="pt-4 border-t border-[#1A1917]/15 flex gap-8 text-[9.5px] mono-label text-[#6E6A61]">
               <div>
                 <div className="mb-1 opacity-60">VALUE DELIVERED</div>
                 <div className="text-[#1A1917] font-bold flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 bg-[#55B685] rounded-full"></span>
                   CONTINUOUS
                 </div>
               </div>
               <div>
                 <div className="mb-1 opacity-60">HUMAN EFFORT</div>
                 <div className="text-[#1A1917] font-bold">ZERO MANUAL</div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Area: The Engine Monolith & Interactive Diagram */}
      <div className="absolute top-0 right-0 bottom-0 left-0 md:left-auto md:w-[70vw] lg:w-[65vw] flex flex-col justify-center items-end pr-4 md:pr-12 pointer-events-none z-20">
        
        <div className="w-full h-full relative flex items-center justify-center pointer-events-none">
          
          {/* STATIC STATE: Exact original GOVERNANCE and ENGINE typography aligned to rock */}
          <div className={`absolute right-0 flex flex-col justify-center items-end w-full transition-opacity duration-700 ease-in-out pointer-events-none ${isEngineExpanded ? 'opacity-0' : 'opacity-100'}`}>
            <div className="font-serif font-bold text-[#1A1917] tracking-[-0.03em] select-none text-right z-30 pointer-events-none" style={{ fontSize: 'clamp(60px, 13vw, 195px)', lineHeight: 0.82 }}>
              GOVERNANCE
            </div>
            <div className="h-[280px] sm:h-[380px] md:h-[48vh] lg:h-[54vh] max-h-[480px] pointer-events-none"></div>
            <div className="font-serif font-bold text-[#1A1917] tracking-[-0.03em] select-none text-right z-10 pointer-events-none" style={{ fontSize: 'clamp(60px, 13vw, 195px)', lineHeight: 0.82 }}>
              ENGINE
            </div>
          </div>

          {/* THE ROCK IMAGE: Centered */}
          <div 
            className={`absolute z-20 transition-all duration-700 flex justify-center items-center ${isEngineExpanded ? 'pointer-events-none scale-[0.80]' : 'pointer-events-auto cursor-pointer group'}`}
            onClick={(e) => {
              if (!isEngineExpanded) {
                e.stopPropagation();
                setIsEngineExpanded(true);
                setActiveElement('soc2');
              }
            }}
            style={{ right: isEngineExpanded ? '45%' : '0', transform: isEngineExpanded ? 'translateX(50%)' : 'translateX(0)' }}
          >
            {/* Tooltip */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A1917] text-[#DCD7CB] text-[10px] mono-label px-4 py-2 transition-opacity duration-300 z-50 flex items-center gap-2 whitespace-nowrap shadow-xl pointer-events-none ${!isEngineExpanded ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
              <span className="w-1.5 h-1.5 bg-[#9B3418] rounded-full animate-pulse"></span>
              EXPLORE ENGINE
            </div>

            <img 
              src="/grc_cutout_subject.png" 
              alt="GRC Engine Monolith"
              className="h-[280px] sm:h-[380px] md:h-[48vh] lg:h-[54vh] max-h-[480px] w-auto max-w-[88vw] object-contain cursor-pointer"
              style={{ filter: 'drop-shadow(0px 18px 28px rgba(26,25,23,0.22))' }}
            />
          </div>

          {/* EXPANDED DIAGRAM STATE: Structural Guide */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 delay-100 pointer-events-none ${isEngineExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
            style={{ right: '45%', transform: 'translateX(50%)' }}
          >
            <div className="relative w-[860px] h-[640px] flex items-center justify-center font-mono pointer-events-none">
              
              <button 
                onClick={(e) => { e.stopPropagation(); closeEngine(); }}
                className="absolute top-4 right-4 text-[#6E6A61] hover:text-[#9B3418] transition-colors pointer-events-auto text-[11px] font-bold tracking-widest z-50 cursor-pointer select-none"
              >
                [ CLOSE ]
              </button>

              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[13px] text-[#1A1917] font-bold tracking-[0.2em] z-50 border-b border-[#1A1917]/20 pb-2 pointer-events-none">
                ENGINE PIPELINE
              </div>

              {/* BACKGROUND PHASE MARKERS */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Phase 1 */}
                <div className="absolute top-[160px] left-[30px] right-[30px] border-t border-dashed border-[#1A1917]/20 z-0 flex items-start pointer-events-none">
                  <div className="mt-2 text-[9px] text-[#1A1917]/40 tracking-widest bg-[#DCD7CB] pr-4 pointer-events-none">PHASE 01: INGESTION</div>
                </div>

                {/* Phase 2 */}
                <div className="absolute top-[440px] left-[30px] right-[30px] border-t border-dashed border-[#1A1917]/20 z-0 flex items-start pointer-events-none">
                  <div className="mt-2 text-[9px] text-[#1A1917]/40 tracking-widest bg-[#DCD7CB] pr-4 pointer-events-none">PHASE 02: ANALYSIS</div>
                </div>
              </div>

              {/* === NODES & PIPING === */}

              {/* 1. INPUT: SOC 2 (Top Left) */}
              <div className="absolute top-[60px] left-[160px] flex flex-col items-center z-50 pointer-events-auto">
                <DiagramNode id="soc2" title="SOC 2 POLICY" />
                <Pipe orientation="vertical" length="90px" direction="down" color={getPipeColor('soc2')} />
                <Joint color={getPipeColor('soc2')} />
              </div>

              {/* 2. INPUT: AWS (Top Right) */}
              <div className="absolute top-[60px] right-[160px] flex flex-col items-center z-50 pointer-events-auto">
                <DiagramNode id="aws" title="AWS CLOUD" />
                <Pipe orientation="vertical" length="90px" direction="down" color={getPipeColor('aws')} />
                <Joint color={getPipeColor('aws')} />
              </div>

              {/* 3. PROCESS: CONTROL MAPPING (Middle Left) */}
              <div className="absolute top-[300px] left-[5px] flex items-center z-50 pointer-events-auto">
                <DiagramNode id="control" title="CONTROL MAPPING" />
                <Pipe orientation="horizontal" length="115px" direction="left" color={getPipeColor('control')} />
                <Joint color={getPipeColor('control')} />
              </div>

              {/* 4. PROCESS: EVIDENCE PROOF (Middle Right) */}
              <div className="absolute top-[300px] right-[5px] flex items-center z-50 pointer-events-auto">
                <Joint color={getPipeColor('evidence')} />
                <Pipe orientation="horizontal" length="115px" direction="right" color={getPipeColor('evidence')} />
                <DiagramNode id="evidence" title="EVIDENCE PROOF" />
              </div>

              {/* 5. OUTPUT: VERDICT (Bottom Center) */}
              <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center z-50 pointer-events-auto">
                <Joint color={getPipeColor('state')} />
                <Pipe orientation="vertical" length="70px" direction="down" color={getPipeColor('state')} />
                <DiagramNode id="state" title="94.2% COMPLIANT" main />
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
