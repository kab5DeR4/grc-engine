import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import { ArrowRight, Cloud, GitBranch, Bell, Settings } from 'lucide-react';

export default function IntegrationsPage() {
  const categories = [
    {
      title: 'Cloud Providers',
      icon: Cloud,
      desc: 'Connect your infrastructure for continuous telemetry ingestion.',
      items: [
        { name: 'Amazon Web Services', type: 'API Integration', status: 'Live' },
        { name: 'Microsoft Azure', type: 'API Integration', status: 'Live' },
        { name: 'Google Cloud Platform', type: 'API Integration', status: 'Live' },
        { name: 'Kubernetes', type: 'Agent / Helm', status: 'Live' },
      ]
    },
    {
      title: 'CI/CD Pipelines',
      icon: GitBranch,
      desc: 'Enforce Policy as Code directly in your deployment workflows.',
      items: [
        { name: 'GitHub Actions', type: 'Native Action', status: 'Live' },
        { name: 'GitLab CI', type: 'Runner Plugin', status: 'Live' },
        { name: 'Jenkins', type: 'Pipeline Plugin', status: 'Live' },
        { name: 'CircleCI', type: 'Orb', status: 'Beta' },
      ]
    },
    {
      title: 'Alerting & Workflow',
      icon: Bell,
      desc: 'Route compliance violations to the right team immediately.',
      items: [
        { name: 'Slack', type: 'App Integration', status: 'Live' },
        { name: 'Jira Software', type: 'Ticket Sync', status: 'Live' },
        { name: 'PagerDuty', type: 'Incident Creation', status: 'Live' },
        { name: 'ServiceNow', type: 'ITSM Sync', status: 'Beta' },
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#E7E3DA] text-[#1A1917] font-mono flex flex-col">
      <StudioNav />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 text-center border-b border-[#6E6A61]/20 bg-[#F2F0EB]">
        <div className="inline-block px-3 py-1 bg-[#1A1917] text-[#E7E3DA] mono-label text-[10px] mb-6 tracking-widest">
          ECOSYSTEM
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-[#1A1917] max-w-4xl tracking-tight">
          Connect Everything
        </h1>
        <p className="max-w-2xl text-[14px] md:text-[16px] text-[#4A4741] leading-relaxed mb-10">
          GRC Engine sits at the center of your engineering stack. Ingest from anywhere, enforce everywhere, and alert instantly.
        </p>
      </section>

      {/* Integration Grids */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
        {categories.map((category, i) => (
          <div key={i}>
            <div className="mb-10 flex items-center border-b border-[#6E6A61]/20 pb-4">
              <category.icon size={28} className="text-[#9B3418] mr-4" />
              <div>
                <h2 className="font-serif text-3xl font-bold">{category.title}</h2>
                <p className="text-[#6E6A61] text-[13px] mt-1">{category.desc}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.items.map((item, j) => (
                <div key={j} className="p-6 border border-[#6E6A61]/30 bg-[#F2F0EB] hover:bg-[#1A1917] hover:text-[#E7E3DA] transition-all group cursor-pointer relative overflow-hidden flex flex-col h-[180px]">
                  <div className="flex justify-between items-start mb-auto">
                    <div className="h-10 w-10 bg-[#E7E3DA] border border-[#6E6A61]/20 flex items-center justify-center group-hover:border-[#E7E3DA]/30">
                       <Settings size={20} className="text-[#6E6A61] group-hover:text-[#E7E3DA]" />
                    </div>
                    {item.status === 'Beta' && (
                      <span className="text-[9px] mono-label bg-[#9B3418] text-[#E7E3DA] px-2 py-0.5">BETA</span>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="mono-label text-[13px] mb-1">{item.name}</h3>
                    <p className="text-[11px] text-[#6E6A61] group-hover:text-[#E7E3DA]/70">{item.type}</p>
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                    <ArrowRight size={18} className="text-[#E7E3DA]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Webhooks Section */}
      <section className="py-24 px-6 md:px-12 bg-[#1A1917] text-[#E7E3DA] border-t-4 border-[#9B3418]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mono-label text-[#9B3418] mb-4">CUSTOM DEVELOPMENT</div>
          <h2 className="font-serif text-4xl font-bold mb-6">Build Your Own</h2>
          <p className="text-[14px] text-[#6E6A61] leading-relaxed mb-10 max-w-2xl mx-auto">
            Don't see your tool listed? Use our robust GraphQL API and event-driven webhooks to build custom integrations directly into your proprietary internal systems.
          </p>
          <button className="px-8 py-3 border border-[#E7E3DA] text-[#E7E3DA] mono-label hover:bg-[#E7E3DA] hover:text-[#1A1917] transition-colors text-[13px]">
            READ THE API DOCS
          </button>
        </div>
      </section>

      <StudioFooter />
    </div>
  );
}
