import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import { Shield, Activity, Share2, Lock, Zap, Server, ChevronRight } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="w-full min-h-screen bg-[#E7E3DA] text-[#1A1917] font-mono flex flex-col">
      <StudioNav />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 text-center border-b border-[#6E6A61]/20">
        <div className="inline-block px-3 py-1 bg-[#1A1917] text-[#E7E3DA] mono-label text-[10px] mb-6 tracking-widest">
          STUDIO-GRADE COMPLIANCE
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-[#1A1917] max-w-4xl tracking-tight">
          Unparalleled Visibility Into Your Posture
        </h1>
        <p className="max-w-2xl text-[14px] md:text-[16px] text-[#4A4741] leading-relaxed mb-10">
          Our kinematic structural principles provide a living, breathing model of your entire security architecture. Ditch the spreadsheets and embrace continuous telemetry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-3 bg-[#9B3418] text-[#E7E3DA] mono-label hover:bg-[#7a2913] transition-colors flex items-center justify-center">
            START FREE TRIAL <ChevronRight size={16} className="ml-2" />
          </button>
          <button className="px-8 py-3 border border-[#1A1917] text-[#1A1917] mono-label hover:bg-[#1A1917] hover:text-[#E7E3DA] transition-colors">
            BOOK A DEMO
          </button>
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-[#6E6A61] max-w-xl mx-auto text-[13px]">Engineered for scale, speed, and precision.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: 'Continuous Telemetry', desc: 'Real-time monitoring and reporting of compliance status across all infrastructure, tracking changes down to the millisecond.' },
              { icon: Share2, title: 'Dynamic Models', desc: 'Interactive topology drawings and kinematic models of your security architecture that update instantly when your cloud state changes.' },
              { icon: Shield, title: 'Policy as Code', desc: 'Define your governance standards as code and enforce them automatically across your CI/CD pipelines.' },
              { icon: Lock, title: 'Automated Evidence', desc: 'Never manually collect evidence for an audit again. We snapshot proof of compliance automatically.' },
              { icon: Zap, title: 'Real-Time Alerting', desc: 'Get instantly notified via Slack, Jira, or PagerDuty when a configuration drifts from your baseline.' },
              { icon: Server, title: 'Multi-Cloud Support', desc: 'Unified visibility across AWS, Azure, GCP, and on-premise environments in a single pane of glass.' }
            ].map((feature, i) => (
              <div key={i} className="p-8 border border-[#6E6A61]/20 bg-[#F2F0EB] hover:border-[#9B3418] transition-colors group">
                <feature.icon size={24} className="text-[#9B3418] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="mono-label text-[#1A1917] mb-3 text-[14px]">{feature.title}</h3>
                <p className="text-[12px] text-[#4A4741] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive 1: Left Text, Right Visual */}
      <section className="py-24 px-6 md:px-12 bg-[#F2F0EB] border-y border-[#6E6A61]/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mono-label text-[#9B3418] mb-4">OBSERVABILITY</div>
            <h2 className="font-serif text-4xl font-bold mb-6">See everything. Miss nothing.</h2>
            <p className="text-[#4A4741] text-[14px] leading-relaxed mb-6">
              Traditional compliance relies on point-in-time assessments that are outdated the moment they are generated. GRC Engine connects directly to your cloud APIs to ingest configuration data continuously.
            </p>
            <ul className="space-y-4 text-[13px] text-[#1A1917]">
              <li className="flex items-start"><ChevronRight size={16} className="text-[#9B3418] mt-0.5 mr-2 shrink-0" /> 100% API-driven data collection</li>
              <li className="flex items-start"><ChevronRight size={16} className="text-[#9B3418] mt-0.5 mr-2 shrink-0" /> Agentless architecture for zero performance overhead</li>
              <li className="flex items-start"><ChevronRight size={16} className="text-[#9B3418] mt-0.5 mr-2 shrink-0" /> Historical timeline tracking for every resource</li>
            </ul>
          </div>
          <div className="h-[400px] bg-[#1A1917] border border-[#6E6A61]/30 p-6 flex flex-col font-mono text-[#E7E3DA]">
             <div className="border-b border-[#6E6A61]/30 pb-4 mb-4 flex justify-between">
                <span className="mono-label text-[10px] text-[#9B3418]">LIVE STREAM</span>
                <span className="mono-label text-[10px] text-green-500">CONNECTED</span>
             </div>
             <div className="flex-1 space-y-2 text-[11px] overflow-hidden opacity-80">
                <p>&gt; Ingesting AWS VPC flow logs... [OK]</p>
                <p>&gt; Validating Security Group sg-0a1b2c... [PASS]</p>
                <p className="text-[#9B3418]">&gt; WARNING: S3 Bucket 'prod-backups' missing encryption tag.</p>
                <p>&gt; Triggering Jira ticket creation... [OK]</p>
                <p>&gt; Syncing Azure Active Directory policies... [OK]</p>
                <p>&gt; Scanning GitHub repo configurations... [OK]</p>
             </div>
          </div>
        </div>
      </section>

      {/* Deep Dive 2: Right Text, Left Visual */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 h-[400px] bg-[#E7E3DA] border border-[#6E6A61]/30 p-6 relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1A1917_1px,transparent_1px)] [background-size:16px_16px]"></div>
             <div className="relative z-10 w-48 h-48 border-2 border-[#9B3418] flex items-center justify-center rotate-45 hover:rotate-0 transition-transform duration-700 bg-[#F2F0EB]">
                <div className="w-24 h-24 border border-[#1A1917] bg-[#E7E3DA] -rotate-45"></div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="mono-label text-[#9B3418] mb-4">ARCHITECTURE</div>
            <h2 className="font-serif text-4xl font-bold mb-6">Kinematic Topology Models</h2>
            <p className="text-[#4A4741] text-[14px] leading-relaxed mb-6">
              Map your infrastructure visually and understand how risks propagate through your systems. Our proprietary engine builds mathematical models of your network to identify blast radiuses before an incident occurs.
            </p>
            <button className="px-6 py-2 border border-[#1A1917] text-[#1A1917] mono-label hover:bg-[#1A1917] hover:text-[#E7E3DA] transition-colors text-[12px]">
              EXPLORE TOPOLOGY
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 bg-[#1A1917] text-[#E7E3DA] text-center border-t-4 border-[#9B3418]">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to upgrade your governance?</h2>
        <p className="max-w-2xl mx-auto text-[14px] text-[#6E6A61] mb-10">
          Join leading engineering teams who use GRC Engine to ship faster without sacrificing security.
        </p>
        <button className="px-8 py-4 bg-[#9B3418] text-[#E7E3DA] mono-label hover:bg-[#E7E3DA] hover:text-[#1A1917] transition-colors text-[14px]">
          GET STARTED TODAY
        </button>
      </section>

      <StudioFooter />
    </div>
  );
}
