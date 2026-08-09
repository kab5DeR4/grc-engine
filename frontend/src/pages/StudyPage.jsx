import { useState } from 'react';

export default function StudyPage() {
  const [velocity, setVelocity] = useState(2.8);
  const [surfaceArea, setSurfaceArea] = useState(140);
  const [remediationRate, setRemediationRate] = useState(0.85);

  // Computations based on physical/computational model formulas:
  // Threat Strain σ = (v^2 * A) / (100 * λ)
  const attackStrain = ((Math.pow(velocity, 2) * surfaceArea) / (100 * remediationRate)).toFixed(2);
  // Mean Time to Defuse MTTR = 12.5 / (v * λ)
  const mttr = (12.5 / (velocity * remediationRate)).toFixed(2);
  // System Stability Margin = 100 - (attackStrain * 1.5)
  const stabilityMargin = Math.max(0, (100 - attackStrain * 1.5)).toFixed(1);

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-12 pb-6 hairline-b">
          <div className="mono-label text-[#9B3418] mb-2">KINEMATIC RISK STUDY & SIMULATOR</div>
          <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
            Parametric Simulation & <span className="serif-italic-pigment">Harmonic Threat Decay</span>
          </h1>
          <p className="mono-body text-[13px] text-[#4A4741] mt-3 max-w-3xl">
            Derive real-time structural risk metrics by tuning input parameters. All outputs are derived strictly from stated mathematical laws rather than arbitrary visual estimates.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Parametric Controls */}
          <div className="lg:col-span-4 bg-[#DCD7CB] p-6 hairline-all space-y-6">
            <div className="mono-label text-[#9B3418] pb-2 hairline-b">
              INPUT PARAMETERS
            </div>

            {/* Slider 1: Threat Velocity */}
            <div>
              <div className="flex justify-between text-[11.5px] mono-label mb-2">
                <span>THREAT VELOCITY (v)</span>
                <span className="text-[#9B3418] font-bold">{velocity} m/s</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="6.0" 
                step="0.1"
                value={velocity}
                onChange={(e) => setVelocity(parseFloat(e.target.value))}
                className="w-full accent-[#9B3418] cursor-pointer"
              />
              <div className="mono-label text-[9.5px] text-[#6E6A61] mt-1">RATE OF ATTACK VECTOR INGRESS</div>
            </div>

            {/* Slider 2: Attack Surface Area */}
            <div>
              <div className="flex justify-between text-[11.5px] mono-label mb-2">
                <span>EXPOSED SURFACE AREA (A)</span>
                <span className="text-[#9B3418] font-bold">{surfaceArea} NODES</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="300" 
                step="5"
                value={surfaceArea}
                onChange={(e) => setSurfaceArea(parseInt(e.target.value))}
                className="w-full accent-[#9B3418] cursor-pointer"
              />
              <div className="mono-label text-[9.5px] text-[#6E6A61] mt-1">UNPROTECTED API ENDPOINTS / SUBNETS</div>
            </div>

            {/* Slider 3: Remediation Rate */}
            <div>
              <div className="flex justify-between text-[11.5px] mono-label mb-2">
                <span>REMEDIATION BANDWIDTH (λ)</span>
                <span className="text-[#9B3418] font-bold">{remediationRate}</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="2.0" 
                step="0.05"
                value={remediationRate}
                onChange={(e) => setRemediationRate(parseFloat(e.target.value))}
                className="w-full accent-[#9B3418] cursor-pointer"
              />
              <div className="mono-label text-[9.5px] text-[#6E6A61] mt-1">AUTOMATED DRIFT PATCHING COEFFICIENT</div>
            </div>

            {/* Formula Display Box */}
            <div className="p-4 bg-[#E7E3DA] hairline-all mono-body text-[11px] space-y-1">
              <div className="mono-label text-[10px] text-[#9B3418]">GOVERNING FORMULA</div>
              <div className="text-[#1A1917] font-semibold">σ = (v² · A) / (100 · λ)</div>
              <div className="text-[#6E6A61] text-[9.5px]">MTTR = 12.5 / (v · λ)</div>
            </div>
          </div>

          {/* Right Column: Visual Plotter & Mathematical Readout */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Real-time Dynamic Plotter SVG */}
            <div className="w-full bg-[#E7E3DA] p-6 hairline-all flex flex-col justify-between min-h-[380px]">
              <div className="flex justify-between items-center mb-4 pb-2 hairline-b">
                <span className="mono-label text-[#9B3418]">DYNAMIC STRESS & DECAY PLOT</span>
                <span className="mono-label text-[10px] text-[#6E6A61]">HARMONIC WAVEFORM</span>
              </div>

              <svg className="w-full h-[240px]" viewBox="0 0 700 240" fill="none">
                {/* Background grid */}
                <line x1="0" y1="120" x2="700" y2="120" stroke="rgba(26,25,23,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="350" y1="0" x2="350" y2="240" stroke="rgba(26,25,23,0.15)" strokeWidth="1" strokeDasharray="4 4" />

                {/* Plot Curve dynamically computed */}
                <path 
                  d={`M 20 ${120 - Math.sin(0) * attackStrain * 4} 
                     C 150 ${120 - Math.sin(1) * attackStrain * 6}, 
                       300 ${120 + Math.sin(2) * attackStrain * 6}, 
                       450 ${120 - Math.sin(3) * attackStrain * 4} 
                     T 680 120`}
                  stroke="#9B3418" 
                  strokeWidth="2.5" 
                  fill="none" 
                />

                {/* Baseline Envelope */}
                <path 
                  d="M 20 120 L 680 120" 
                  stroke="#1A1917" 
                  strokeWidth="1" 
                  strokeDasharray="2 2"
                />

                {/* Coordinates */}
                <circle cx="350" cy={120 - Math.sin(2) * attackStrain * 3} r="5" fill="#1A1917" />
                <text x="360" y={115 - Math.sin(2) * attackStrain * 3} fill="#1A1917" fontSize="10" fontFamily="Azeret Mono">
                  PEAK STRAIN: {attackStrain} MPa
                </text>
              </svg>

              <div className="flex justify-between items-center text-[10.5px] mono-label text-[#6E6A61] pt-2 hairline-t">
                <span>TIME FREQUENCY (Hz)</span>
                <span>SYSTEM STABILITY: {stabilityMargin}%</span>
              </div>
            </div>

            {/* Computed Output Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#DCD7CB] hairline-all">
                <div className="mono-label text-[10px] text-[#9B3418]">ATTACK STRAIN (σ)</div>
                <div className="serif-heading text-[32px] text-[#1A1917] font-bold mt-1">{attackStrain} MPa</div>
                <div className="mono-label text-[9px] text-[#6E6A61]">STRUCTURAL IMPACT</div>
              </div>

              <div className="p-4 bg-[#DCD7CB] hairline-all">
                <div className="mono-label text-[10px] text-[#9B3418]">MEAN RECOVERY (MTTR)</div>
                <div className="serif-heading text-[32px] text-[#1A1917] font-bold mt-1">{mttr} MIN</div>
                <div className="mono-label text-[9px] text-[#6E6A61]">TIME TO DEFUSE</div>
              </div>

              <div className="p-4 bg-[#DCD7CB] hairline-all">
                <div className="mono-label text-[10px] text-[#9B3418]">STABILITY MARGIN</div>
                <div className="serif-heading text-[32px] text-[#1A1917] font-bold mt-1">{stabilityMargin}%</div>
                <div className="mono-label text-[9px] text-[#6E6A61]">OPERATIONAL TOLERANCE</div>
              </div>
            </div>

          </div>

        </div>
      </main>

          </div>
  );
}
