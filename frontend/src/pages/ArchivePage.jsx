import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const archiveLogs = [
  {
    id: 'EVD-89201',
    controlId: 'CTL-089',
    title: 'KMS Key Envelope Rotation Proof',
    date: '2026.08.01 14:22:09 UTC',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    framework: 'NIST SP 800-53',
    status: 'VERIFIED IMMUTABLE',
  },
  {
    id: 'EVD-89202',
    controlId: 'CTL-092',
    title: 'SOC2 CC6.1 Logical Access Boundary Proof',
    date: '2026.07.28 09:15:44 UTC',
    hash: '8f92a1c84b12390aef45600c92138120b04e9a117281f0129a9987654321abcd',
    framework: 'SOC 2 TYPE II',
    status: 'VERIFIED IMMUTABLE',
  },
  {
    id: 'EVD-89203',
    controlId: 'CTL-097',
    title: 'S3 Bucket Server-Side Encryption Audit Log',
    date: '2026.07.15 18:00:12 UTC',
    hash: '142857a9b0c1d2e3f4a5b6c7d8e90123456789abcdef0123456789abcdef0123',
    framework: 'HIPAA §164.312',
    status: 'VERIFIED IMMUTABLE',
  },
  {
    id: 'EVD-89204',
    controlId: 'CTL-104',
    title: 'Kubernetes Pod Security Admission Scan Output',
    date: '2026.07.02 11:42:30 UTC',
    hash: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
    framework: 'ISO 27001 A.12',
    status: 'VERIFIED IMMUTABLE',
  },
  {
    id: 'EVD-89205',
    controlId: 'CTL-112',
    title: 'Zero-Trust Egress DNS Telemetry Verification',
    date: '2026.06.24 16:04:19 UTC',
    hash: 'abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789',
    framework: 'NIST CSF 2.0',
    status: 'VERIFIED IMMUTABLE',
  },
];

export default function ArchivePage() {
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get('id');
  const [selectedEvd, setSelectedEvd] = useState(
    archiveLogs.find(e => e.controlId === highlightedId) || archiveLogs[0]
  );

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-12 pb-6 hairline-b">
          <div className="mono-label text-[#9B3418] mb-2">IMMUTABLE EVIDENCE VAULT</div>
          <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
            Audit Records & <span className="serif-italic-pigment">Cryptographic Proofs</span>
          </h1>
          <p className="mono-body text-[13px] text-[#4A4741] mt-3 max-w-3xl">
            Append-only proof ledger storing tamper-evident cryptographic hashes for every verified security control. All proofs are hardware signed by FIPS 140-3 HSM modules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Evidence Table */}
          <div className="lg:col-span-7 space-y-3">
            {archiveLogs.map((item) => {
              const isSelected = selectedEvd.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedEvd(item)}
                  className={`p-4 cursor-pointer hairline-all transition-colors ${
                    isSelected ? 'bg-[#DCD7CB] border-l-4 border-l-[#9B3418]' : 'bg-[#E7E3DA] hover:bg-[#DCD7CB]/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="mono-label text-[#9B3418] text-[10.5px]">{item.id} // {item.controlId}</span>
                    <span className="mono-label text-[10px] text-[#6E6A61]">{item.date}</span>
                  </div>
                  <div className="font-serif text-[20px] font-bold text-[#1A1917]">{item.title}</div>
                  <div className="mono-body text-[10.5px] text-[#6E6A61] truncate mt-1">
                    HASH: {item.hash}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Proof Detail */}
          <div className="lg:col-span-5 bg-[#DCD7CB] p-6 hairline-all sticky top-[80px] h-fit">
            <div className="mono-label text-[#9B3418] mb-1">PROOF CERTIFICATE</div>
            <h2 className="serif-heading text-[26px] font-bold text-[#1A1917] mb-4">
              {selectedEvd.title}
            </h2>

            <div className="space-y-4 mono-body text-[11.5px]">
              <div className="p-3 bg-[#E7E3DA] hairline-all">
                <div className="mono-label text-[9.5px] text-[#6E6A61]">EVIDENCE RECORD ID</div>
                <div className="text-[#1A1917] font-semibold mt-0.5">{selectedEvd.id} ({selectedEvd.controlId})</div>
              </div>

              <div className="p-3 bg-[#E7E3DA] hairline-all">
                <div className="mono-label text-[9.5px] text-[#6E6A61]">REGULATORY FRAMEWORK</div>
                <div className="text-[#1A1917] font-semibold mt-0.5">{selectedEvd.framework}</div>
              </div>

              <div className="p-3 bg-[#E7E3DA] hairline-all break-all">
                <div className="mono-label text-[9.5px] text-[#9B3418]">SHA-256 CRYPTOGRAPHIC PROOF</div>
                <div className="text-[#1A1917] font-mono text-[10.5px] mt-1">{selectedEvd.hash}</div>
              </div>

              <div className="p-3 bg-[#E7E3DA] hairline-all">
                <div className="mono-label text-[9.5px] text-[#6E6A61]">TIMESTAMP & IMMUTABILITY</div>
                <div className="text-[#1A1917] font-semibold mt-0.5">{selectedEvd.date}</div>
                <div className="mono-label text-[9.5px] text-[#9B3418] mt-1">{selectedEvd.status}</div>
              </div>

              <div className="pt-3 hairline-t">
                <button 
                  onClick={() => alert(`Cryptographic verification signature confirmed: ${selectedEvd.hash.slice(0, 16)}...`)}
                  className="studio-btn-primary studio-btn text-[10.5px] w-full"
                >
                  [ VERIFY CRYPTOGRAPHIC SIGNATURE ]
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

          </div>
  );
}
