import { Link } from 'react-router-dom';

export default function WorkTable() {
  const integrations = [
    {
      id: 'INT-01',
      name: 'Amazon Web Services (AWS)',
      category: 'CLOUD PROVIDER',
      metric: 'API / CLOUDTRAIL',
      date: 'NATIVE',
      status: 'VERIFIED',
    },
    {
      id: 'INT-02',
      name: 'Google Cloud Platform (GCP)',
      category: 'CLOUD PROVIDER',
      metric: 'API / AUDIT LOGS',
      date: 'NATIVE',
      status: 'VERIFIED',
    },
    {
      id: 'INT-03',
      name: 'Microsoft Azure',
      category: 'CLOUD PROVIDER',
      metric: 'API / MONITOR',
      date: 'NATIVE',
      status: 'VERIFIED',
    },
    {
      id: 'INT-04',
      name: 'Kubernetes (K8s)',
      category: 'ORCHESTRATION',
      metric: 'eBPF / KUBE-API',
      date: 'AGENTLESS',
      status: 'VERIFIED',
    },
    {
      id: 'INT-05',
      name: 'GitHub Enterprise',
      category: 'CI/CD & VCS',
      metric: 'WEBHOOKS',
      date: 'OAUTH2',
      status: 'VERIFIED',
    },
    {
      id: 'INT-06',
      name: 'Okta Identity Cloud',
      category: 'IDENTITY & IAM',
      metric: 'SAML / SCIM',
      date: 'API TOKEN',
      status: 'VERIFIED',
    },
  ];

  return (
    <section className="w-full bg-[#E7E3DA] pt-10 pb-20 px-6 md:px-12 hairline-b">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 hairline-b">
        <div>
          <div className="mono-label text-[#9B3418] mb-2">SECTION 04 — CONNECT YOUR STACK</div>
          <h2 className="serif-heading text-[32px] md:text-[44px] text-[#1A1917]">
            Connect Everything <span className="serif-italic-pigment">In Minutes</span>
          </h2>
        </div>
        <Link to="/dashboard" className="studio-btn text-[11px] mt-4 md:mt-0">
          [ VIEW ALL INTEGRATIONS ]
        </Link>
      </div>

      {/* Full-width Table */}
      <div className="w-full hairline-t">
        
        {/* Table Header (Hidden on small screens, grid view on mobile) */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 hairline-b mono-label text-[10.5px] text-[#9B3418] font-bold">
          <div className="md:col-span-2">ID</div>
          <div className="md:col-span-4">PLATFORM</div>
          <div className="md:col-span-2">CATEGORY</div>
          <div className="md:col-span-2">CONNECTION METHOD</div>
          <div className="md:col-span-2 text-right">STATUS</div>
        </div>

        {/* Rows */}
        {integrations.map((row) => (
          <Link
            key={row.id}
            to={`/dashboard`}
            className="block group text-decoration-none"
          >
            <div className="py-4 hairline-b grid grid-cols-2 md:grid-cols-12 gap-3 items-center group-hover:bg-[#DCD7CB]/40 px-2 transition-colors">
              
              {/* ID & Type */}
              <div className="col-span-1 md:col-span-2 mono-label text-[11px] text-[#9B3418]">
                {row.id} <span className="text-[#6E6A61] text-[9.5px] block md:inline font-normal">[{row.date}]</span>
              </div>

              {/* Serif Name */}
              <div className="col-span-2 md:col-span-4 font-serif text-[clamp(15px,1.5vw,21px)] font-semibold text-[#1A1917] group-hover:text-[#9B3418] transition-colors">
                {row.name}
              </div>

              {/* Category */}
              <div className="col-span-1 md:col-span-2 mono-body text-[11.5px] text-[#4A4741]">
                {row.category}
              </div>

              {/* Metric */}
              <div className="col-span-1 md:col-span-2 mono-label text-[10.5px] text-[#1A1917]">
                {row.metric}
              </div>

              {/* Status */}
              <div className="col-span-1 md:col-span-2 text-right mono-label text-[10.5px]">
                <span className={`px-2 py-0.5 border ${
                  row.status === 'VERIFIED' 
                    ? 'border-[#1A1917] bg-[#1A1917] text-[#E7E3DA]' 
                    : 'border-[#9B3418] text-[#9B3418]'
                }`}>
                  {row.status}
                </span>
              </div>

            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}
