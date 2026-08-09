import { useState } from 'react';

const findingsData = [
  {
    id: 'FND-1049',
    title: 'Deprecated TLS 1.2 Cipher Suite Detected on Legacy Edge Proxy',
    severity: 'HIGH',
    control: 'CTL-005',
    sla: '4 HOURS REMAINING',
    status: 'OPEN',
    remediation: 'Update Envoy listener configuration to allow TLS 1.3 exclusively and drop RSA key exchange.',
  },
  {
    id: 'FND-1052',
    title: 'Unused IAM Service Account Token Inactive > 30 Days',
    severity: 'MEDIUM',
    control: 'CTL-002',
    sla: '24 HOURS REMAINING',
    status: 'OPEN',
    remediation: 'Revoke token binding via OPA access policy controller and notify account owner.',
  },
  {
    id: 'FND-1055',
    title: 'S3 Bucket Missing Default Multi-Factor Delete Lock',
    severity: 'LOW',
    control: 'CTL-003',
    sla: '7 DAYS REMAINING',
    status: 'RESOLVED',
    remediation: 'Enable MFA Delete attribute on bucket metadata and update Terraform terraform.tfstate.',
  },
];

export default function FindingsPage() {
  const [filter, setFilter] = useState('ALL');

  const filtered = findingsData.filter(f => filter === 'ALL' || f.status === filter);

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12">
        {/* Page Header */}
        <div className="mb-12 pb-6 hairline-b flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="mono-label text-[#9B3418] mb-2">RISK & DRIFT FINDINGS</div>
            <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
              Active Findings & <span className="serif-italic-pigment">Remediation SLA</span>
            </h1>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            {['ALL', 'OPEN', 'RESOLVED'].map(st => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`mono-label text-[10.5px] px-3 py-1.5 border cursor-pointer ${
                  filter === st ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917]' : 'bg-transparent text-[#1A1917] border-[#1A1917]'
                }`}
              >
                [ {st} ]
              </button>
            ))}
          </div>
        </div>

        {/* Findings List */}
        <div className="space-y-4">
          {filtered.map(item => (
            <div key={item.id} className="p-6 bg-[#DCD7CB] hairline-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="mono-label text-[#9B3418] font-bold">{item.id}</span>
                  <span className="mono-label text-[10px] text-[#6E6A61]">{item.control}</span>
                  <span className="mono-label text-[9.5px] px-2 py-0.5 border border-[#9B3418] text-[#9B3418]">
                    {item.severity}
                  </span>
                </div>
                <span className="mono-label text-[10px] text-[#1A1917] font-semibold">{item.sla}</span>
              </div>

              <h2 className="serif-heading text-[22px] font-bold text-[#1A1917] mb-3">{item.title}</h2>

              <div className="p-4 bg-[#E7E3DA] hairline-all mono-body text-[11.5px] text-[#4A4741]">
                <span className="mono-label text-[10px] text-[#9B3418] block mb-1">REMEDIATION ACTION:</span>
                {item.remediation}
              </div>
            </div>
          ))}
        </div>
      </main>

          </div>
  );
}
