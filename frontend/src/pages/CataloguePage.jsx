
export default function CataloguePage() {
  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-12 pb-6 hairline-b">
          <div className="mono-label text-[#9B3418] mb-2">STUDIO MONOGRAPH & CATALOGUE</div>
          <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
            Atelier GRC Edition — <span className="serif-italic-pigment">Volume 04</span>
          </h1>
          <p className="mono-body text-[13px] text-[#4A4741] mt-3 max-w-3xl">
            A comprehensive 240-page hardcover publication detailing our warm bone aesthetic, kinematic risk equations, zero-trust perimeter vector drawings, and cryptographic proof schemas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 bg-[#DCD7CB] p-8 hairline-all flex justify-center items-center min-h-[380px]">
            <div className="w-[280px] h-[360px] bg-[#E7E3DA] hairline-all p-6 shadow-2xl flex flex-col justify-between border-l-8 border-l-[#9B3418]">
              <div>
                <div className="mono-label text-[10px] text-[#9B3418]">MONOGRAPH VOL. 04</div>
                <div className="serif-heading text-[28px] font-bold text-[#1A1917] mt-2">
                  GRC KINEMATICS & TELEMETRY
                </div>
              </div>
              <div className="mono-label text-[9.5px] text-[#6E6A61]">
                ATELIER PRESS // 2026 EDITION
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 bg-[#DCD7CB] hairline-all">
              <div className="mono-label text-[10px] text-[#9B3418]">SPECIFICATIONS</div>
              <div className="serif-heading text-[22px] font-bold text-[#1A1917] mt-1">240 Pages Hardcover Monograph</div>
              <div className="mono-body text-[11.5px] text-[#4A4741] mt-2">
                Printed on 150gsm Munken Rough warm bone paper with single oxide pigment foil stamping and Smyth-sewn binding.
              </div>
            </div>

            <div className="p-4 bg-[#DCD7CB] hairline-all">
              <div className="mono-label text-[10px] text-[#9B3418]">INCLUDED BLUEPRINTS</div>
              <div className="serif-heading text-[22px] font-bold text-[#1A1917] mt-1">12 Fold-Out Vector Topology Maps</div>
              <div className="mono-body text-[11.5px] text-[#4A4741] mt-2">
                Includes 1:1 metric scale technical line drawings for AWS, Azure, GCP, and Kubernetes zero-trust mesh architectures.
              </div>
            </div>

            <button 
              onClick={() => alert('Monograph catalogue request registered. We will mail a print copy to your address.')}
              className="studio-btn-primary studio-btn text-[11px] w-full py-3"
            >
              [ REQUEST PRINT CATALOGUE ]
            </button>
          </div>
        </div>
      </main>

          </div>
  );
}
