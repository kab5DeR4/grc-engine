import { useState } from 'react';

export default function DrawingPage() {
  const [scale, setScale] = useState('1:1');
  const [gridVisible, setGridVisible] = useState(true);
  const [leadersVisible, setLeadersVisible] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    { id: 'NODE-01', title: 'Edge Ingress Gateway', status: 'ACTIVE', load: '14.2k req/s', cipher: 'TLS 1.3' },
    { id: 'NODE-02', title: 'Zero-Trust Token Verifier', status: 'ACTIVE', load: '<12ms LATENCY', cipher: 'RSA 4096' },
    { id: 'NODE-03', title: 'Immutable Audit Vault', status: 'SYNCHRONIZED', load: '100% WORM', cipher: 'SHA-256' },
    { id: 'NODE-04', title: 'KMS HSM Master Engine', status: 'ROTATING', load: '90-DAY CYCLE', cipher: 'AES-256' },
  ];

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-8 pb-6 hairline-b flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="mono-label text-[#9B3418] mb-2">GRC VECTOR ARCHITECTURE & TOPOLOGY</div>
            <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
              Technical Scaled Drawings & <span className="serif-italic-pigment">System Geometry</span>
            </h1>
          </div>

          {/* Scale & Controls */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-[#1A1917] bg-[#DCD7CB]">
              <span className="mono-label text-[10px] px-3 text-[#6E6A61]">SCALE:</span>
              {['1:1', '1:5', '1:20'].map((s) => (
                <button
                  key={s}
                  onClick={() => setScale(s)}
                  className={`mono-label text-[10px] px-3 py-1.5 cursor-pointer ${
                    scale === s ? 'bg-[#1A1917] text-[#E7E3DA]' : 'text-[#1A1917]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => setGridVisible(!gridVisible)}
              className={`mono-label text-[10px] px-3 py-1.5 border border-[#1A1917] cursor-pointer ${
                gridVisible ? 'bg-[#1A1917] text-[#E7E3DA]' : 'bg-transparent text-[#1A1917]'
              }`}
            >
              [ GRID: {gridVisible ? 'ON' : 'OFF'} ]
            </button>

            <button
              onClick={() => setLeadersVisible(!leadersVisible)}
              className={`mono-label text-[10px] px-3 py-1.5 border border-[#1A1917] cursor-pointer ${
                leadersVisible ? 'bg-[#9B3418] text-[#FFF] border-[#9B3418]' : 'bg-transparent text-[#1A1917]'
              }`}
            >
              [ LEADERS: {leadersVisible ? 'ON' : 'OFF'} ]
            </button>
          </div>
        </div>

        {/* Large Interactive SVG Drawing Stage */}
        <div className="w-full bg-[#E7E3DA] hairline-all p-6 relative overflow-hidden min-h-[580px] flex items-center justify-center">
          
          <svg className="w-full h-[520px]" viewBox="0 0 900 520" fill="none">
            {/* Construction Hairline Grid */}
            {gridVisible && (
              <g stroke="rgba(26,25,23,0.14)" strokeWidth="1">
                {[...Array(18)].map((_, i) => (
                  <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="520" strokeDasharray="3 3" />
                ))}
                {[...Array(11)].map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={i * 50} x2="900" y2={i * 50} strokeDasharray="3 3" />
                ))}
              </g>
            )}

            {/* Central Axis Guides */}
            <line x1="450" y1="0" x2="450" y2="520" stroke="#1A1917" strokeWidth="1" />
            <line x1="0" y1="260" x2="900" y2="260" stroke="#1A1917" strokeWidth="1" />

            {/* Scale Circles */}
            <circle cx="450" cy="260" r="220" stroke="rgba(26,25,23,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="450" cy="260" r="140" stroke="rgba(26,25,23,0.3)" strokeWidth="1" />

            {/* Main Architecture Polygon Structural Heavy Line */}
            <path 
              d="M 200 260 L 350 120 L 550 120 L 700 260 L 550 400 L 350 400 Z" 
              stroke="#1A1917" 
              strokeWidth="3" 
              fill="none" 
            />

            {/* Inner Core Nodes */}
            <rect 
              x="400" y="210" width="100" height="100" 
              stroke="#1A1917" strokeWidth="2" fill="#E7E3DA" 
              className="cursor-pointer hover:stroke-[#9B3418]"
              onClick={() => setSelectedNode(nodes[1])}
            />

            {/* Peripheral Node Rectangles */}
            <circle cx="200" cy="260" r="18" fill="#E7E3DA" stroke="#1A1917" strokeWidth="2" className="cursor-pointer" onClick={() => setSelectedNode(nodes[0])} />
            <circle cx="700" cy="260" r="18" fill="#E7E3DA" stroke="#1A1917" strokeWidth="2" className="cursor-pointer" onClick={() => setSelectedNode(nodes[2])} />
            <circle cx="450" cy="120" r="18" fill="#E7E3DA" stroke="#1A1917" strokeWidth="2" className="cursor-pointer" onClick={() => setSelectedNode(nodes[3])} />

            {/* Pigment Accent Markers */}
            <circle cx="450" cy="260" r="6" fill="#9B3418" />
            <circle cx="200" cy="260" r="4" fill="#9B3418" />
            <circle cx="700" cy="260" r="4" fill="#9B3418" />
            <circle cx="450" cy="120" r="4" fill="#9B3418" />

            {/* Thin Leaders and Monospaced Labels */}
            {leadersVisible && (
              <g>
                {/* Node 1 Leader */}
                <line x1="200" y1="260" x2="200" y2="70" stroke="#9B3418" strokeWidth="1" />
                <line x1="200" y1="70" x2="310" y2="70" stroke="#9B3418" strokeWidth="1" />
                <text x="318" y="73" fill="#9B3418" fontSize="11" fontFamily="Azeret Mono">
                  [NODE.01 INGRESS GATEWAY — TLS 1.3]
                </text>

                {/* Node 2 Leader */}
                <line x1="450" y1="210" x2="600" y2="70" stroke="#9B3418" strokeWidth="1" />
                <line x1="600" y1="70" x2="720" y2="70" stroke="#9B3418" strokeWidth="1" />
                <text x="728" y="73" fill="#9B3418" fontSize="11" fontFamily="Azeret Mono">
                  [NODE.02 ZK-TOKEN VERIFIER]
                </text>

                {/* Node 3 Leader */}
                <line x1="700" y1="260" x2="700" y2="440" stroke="#9B3418" strokeWidth="1" />
                <line x1="700" y1="440" x2="520" y2="440" stroke="#9B3418" strokeWidth="1" />
                <text x="320" y="443" fill="#9B3418" fontSize="11" fontFamily="Azeret Mono">
                  [NODE.03 AUDIT VAULT — SHA-256 WORM]
                </text>
              </g>
            )}
          </svg>

          {/* Node Spec Overlay Modal/Badge */}
          {selectedNode && (
            <div className="absolute bottom-6 right-6 bg-[#DCD7CB] p-5 hairline-all max-w-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="mono-label text-[#9B3418]">{selectedNode.id}</span>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="mono-label text-[11px] text-[#1A1917] cursor-pointer"
                >
                  [ X ]
                </button>
              </div>
              <div className="font-serif text-[20px] font-bold text-[#1A1917] mb-2">{selectedNode.title}</div>
              <div className="mono-body text-[11px] space-y-1 text-[#4A4741]">
                <div>STATUS: <span className="text-[#1A1917] font-semibold">{selectedNode.status}</span></div>
                <div>METRIC: <span className="text-[#1A1917] font-semibold">{selectedNode.load}</span></div>
                <div>CIPHER: <span className="text-[#9B3418] font-semibold">{selectedNode.cipher}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Legend & Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 pt-6 hairline-t">
          <div className="p-4 bg-[#DCD7CB] hairline-all">
            <div className="mono-label text-[#9B3418] mb-1">DRAWING REF</div>
            <div className="mono-body text-[12px] text-[#1A1917]">DWG-GRC-2026-v4</div>
          </div>
          <div className="p-4 bg-[#DCD7CB] hairline-all">
            <div className="mono-label text-[#9B3418] mb-1">BOUNDING SURFACE</div>
            <div className="mono-body text-[12px] text-[#1A1917]">100% ISOLATED CONTAINER MESH</div>
          </div>
          <div className="p-4 bg-[#DCD7CB] hairline-all">
            <div className="mono-label text-[#9B3418] mb-1">CONSTRUCTION TOLERANCE</div>
            <div className="mono-body text-[12px] text-[#1A1917]">± 0.001mm METRIC ACCURACY</div>
          </div>
          <div className="p-4 bg-[#DCD7CB] hairline-all">
            <div className="mono-label text-[#9B3418] mb-1">PROJECTION MODE</div>
            <div className="mono-body text-[12px] text-[#1A1917]">ORTHOGRAPHIC SCALE {scale}</div>
          </div>
        </div>

      </main>

          </div>
  );
}
