import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import { Search, ChevronRight, Terminal, FileCode2, Link as LinkIcon, ShieldAlert, Lock } from 'lucide-react';

export default function DocsPage() {
  const sidebarLinks = [
    { section: 'GETTING STARTED', links: ['Quickstart', 'Installation', 'Authentication', 'Basic Concepts'] },
    { section: 'ARCHITECTURE', links: ['Kinematic Models', 'Telemetry Ingestion', 'Event Bus', 'Data Retention'] },
    { section: 'POLICY AS CODE', links: ['Writing Policies', 'Testing Policies', 'CI/CD Integration', 'Framework Mapping'] },
    { section: 'API REFERENCE', links: ['REST Overview', 'Endpoints', 'Webhooks', 'Rate Limits'] }
  ];

  return (
    <div className="w-full min-h-screen bg-[#E7E3DA] text-[#1A1917] font-mono flex flex-col">
      <StudioNav />
      
      <div className="flex-1 flex flex-col md:flex-row border-t border-[#6E6A61]/20">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-80 border-r border-[#6E6A61]/20 bg-[#F2F0EB] p-6 hidden md:block overflow-y-auto min-h-[calc(100vh-80px)]">
          <div className="relative mb-8">
            <Search size={16} className="absolute left-3 top-2.5 text-[#6E6A61]" />
            <input 
              type="text" 
              placeholder="Search docs..." 
              className="w-full pl-10 pr-3 py-2 bg-transparent border border-[#6E6A61]/30 focus:outline-none focus:border-[#9B3418] text-[12px] placeholder-[#6E6A61]"
            />
          </div>
          
          <nav className="space-y-8">
            {sidebarLinks.map((group, i) => (
              <div key={i}>
                <h4 className="mono-label text-[#9B3418] mb-3 text-[10px]">{group.section}</h4>
                <ul className="space-y-2">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className={`text-[13px] hover:text-[#9B3418] transition-colors ${i === 0 && j === 0 ? 'text-[#9B3418] font-bold' : 'text-[#4A4741]'}`}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 lg:p-20 max-w-4xl bg-[#E7E3DA]">
          <div className="mono-label text-[#6E6A61] mb-4 text-[10px] flex items-center">
            DOCS <ChevronRight size={10} className="mx-2" /> GETTING STARTED <ChevronRight size={10} className="mx-2" /> QUICKSTART
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Quickstart Guide</h1>
          <p className="text-[14px] text-[#4A4741] leading-relaxed mb-8">
            Get up and running with GRC Engine in less than 5 minutes. This guide will walk you through installing the CLI, authenticating your first cloud account, and running your initial compliance scan.
          </p>

          <hr className="border-[#6E6A61]/20 mb-12" />

          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 flex items-center">
              <Terminal size={20} className="mr-3 text-[#9B3418]" /> 1. Install the CLI
            </h2>
            <p className="text-[13px] text-[#4A4741] mb-4">
              The GRC CLI is the primary way to interact with the engine locally and in your CI/CD pipelines.
            </p>
            <div className="bg-[#1A1917] p-4 border border-[#6E6A61]/30 text-[#E7E3DA] text-[13px] mb-6 shadow-sm overflow-x-auto">
              <code>npm install -g @grc-engine/cli</code>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 flex items-center">
              <Lock size={20} className="mr-3 text-[#9B3418]" /> 2. Authenticate
            </h2>
            <p className="text-[13px] text-[#4A4741] mb-4">
              Login to your GRC Engine workspace. This will open a browser window for SSO.
            </p>
            <div className="bg-[#1A1917] p-4 border border-[#6E6A61]/30 text-[#E7E3DA] text-[13px] mb-6 overflow-x-auto">
              <code>grc auth login</code>
            </div>
            <div className="p-4 bg-[#F2F0EB] border-l-4 border-[#9B3418] text-[12px] text-[#4A4741]">
              <strong>Note:</strong> If you are running this in a headless environment (like GitHub Actions), use the <code>GRC_API_TOKEN</code> environment variable instead.
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 flex items-center">
              <FileCode2 size={20} className="mr-3 text-[#9B3418]" /> 3. Initialize Workspace
            </h2>
            <p className="text-[13px] text-[#4A4741] mb-4">
              Create a configuration file to define which cloud accounts and frameworks you want to scan.
            </p>
            <div className="bg-[#1A1917] p-4 border border-[#6E6A61]/30 text-[#E7E3DA] text-[13px] mb-2 overflow-x-auto">
              <code>grc init --provider aws --framework nist-800-53</code>
            </div>
            <p className="text-[12px] text-[#6E6A61] mb-6 italic">This creates a `grc.yaml` file in your current directory.</p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4 flex items-center">
              <ShieldAlert size={20} className="mr-3 text-[#9B3418]" /> 4. Run Your First Scan
            </h2>
            <p className="text-[13px] text-[#4A4741] mb-4">
              Trigger a manual ingestion and evaluation cycle.
            </p>
            <div className="bg-[#1A1917] p-4 border border-[#6E6A61]/30 text-[#E7E3DA] text-[13px] mb-6 overflow-x-auto font-mono">
              <div className="text-[#6E6A61]">$&gt; grc scan start</div>
              <div className="text-green-400 mt-2">✓ Authenticated with AWS (Account: 123456789012)</div>
              <div className="text-green-400">✓ Fetched 1,243 resources</div>
              <div className="text-yellow-400">! Found 12 policy violations against NIST 800-53</div>
              <div className="text-blue-400">ℹ Report generated at ./grc-report.json</div>
            </div>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-[#6E6A61]/20 mt-16">
             <div></div>
             <a href="#" className="flex items-center text-[#9B3418] hover:text-[#7a2913] transition-colors mono-label text-[12px]">
               NEXT: INSTALLATION <ChevronRight size={16} className="ml-1" />
             </a>
          </div>

        </main>
      </div>

      <StudioFooter />
    </div>
  );
}
