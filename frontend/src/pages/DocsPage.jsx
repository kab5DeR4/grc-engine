import { useState } from 'react';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import { Search, ChevronRight, Terminal, FileCode2, ShieldAlert, Lock } from 'lucide-react';

export default function DocsPage() {
  const [activeLink, setActiveLink] = useState('Quickstart');

  const sidebarLinks = [
    { section: 'GETTING STARTED', links: ['Quickstart', 'Installation', 'Authentication', 'Basic Concepts'] },
    { section: 'ARCHITECTURE', links: ['Kinematic Models', 'Telemetry Ingestion', 'Event Bus', 'Data Retention'] },
    { section: 'POLICY AS CODE', links: ['Writing Policies', 'Testing Policies', 'CI/CD Integration', 'Framework Mapping'] },
    { section: 'API REFERENCE', links: ['REST Overview', 'Endpoints', 'Webhooks', 'Rate Limits'] }
  ];

  return (
    <div className="w-full min-h-screen bg-[var(--ground)] text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors">
      <StudioNav />
      
      <div className="flex-1 flex flex-col md:flex-row pt-16 border-t border-slate-200 dark:border-slate-800">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 border-r border-slate-200 dark:border-slate-800 bg-[var(--surface)]/60 p-6 hidden md:block overflow-y-auto min-h-[calc(100vh-80px)]">
          <div className="relative mb-6">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search docs..." 
              className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
            />
          </div>
          
          <nav className="space-y-6">
            {sidebarLinks.map((group, i) => (
              <div key={i}>
                <h4 className="text-[10.5px] font-mono font-bold text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wider">
                  {group.section}
                </h4>
                <ul className="space-y-1.5">
                  {group.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        onClick={() => setActiveLink(link)}
                        className={`w-full text-left text-xs font-medium py-1 px-2 rounded-lg transition-colors cursor-pointer border-none bg-transparent ${
                          activeLink === link 
                            ? 'bg-slate-200/80 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold' 
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 lg:p-16 max-w-4xl bg-[var(--ground)] space-y-10">
          <div className="text-xs font-mono text-slate-500 flex items-center">
            DOCS <ChevronRight size={12} className="mx-1.5" /> GETTING STARTED <ChevronRight size={12} className="mx-1.5" /> QUICKSTART
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Quickstart Guide
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Get up and running with GRC Engine in less than 5 minutes. This guide will walk you through installing the CLI, authenticating your first cloud connector, and running your initial deterministic compliance evaluation.
            </p>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Terminal size={18} className="text-sky-500" />
              <span>1. Install the CLI</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              The GRC CLI is the primary way to interact with the engine locally and inside your CI/CD pipelines.
            </p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto shadow-sm">
              <code>npm install -g @grc-engine/cli</code>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Lock size={18} className="text-sky-500" />
              <span>2. Authenticate Workspace</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Login to your GRC Engine workspace. This opens your browser session for SSO.
            </p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto shadow-sm">
              <code>grc auth login</code>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border-l-4 border-sky-500 text-xs text-slate-700 dark:text-slate-300">
              <strong>Note:</strong> In CI/CD headless environments (e.g. GitHub Actions), set the <code className="font-mono text-sky-600 dark:text-sky-400">GRC_API_TOKEN</code> secret.
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <FileCode2 size={18} className="text-sky-500" />
              <span>3. Initialize Configuration</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Generate a local configuration file to define cloud accounts and compliance frameworks to evaluate.
            </p>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto shadow-sm">
              <code>grc init --provider aws --framework soc2-nist</code>
            </div>
            <p className="text-xs text-slate-500 font-mono">Generates a versioned `grc.yaml` specification.</p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <ShieldAlert size={18} className="text-sky-500" />
              <span>4. Run Your First Scan</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Trigger a manual ingestion and deterministic rule evaluation cycle.
            </p>
            <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto space-y-1.5 shadow-sm">
              <div className="text-slate-400 font-bold">$&gt; grc scan start</div>
              <div className="text-emerald-400">&check; Authenticated with AWS (Account: 123456789012)</div>
              <div className="text-emerald-400">&check; Discovered 1,243 infrastructure resources</div>
              <div className="text-sky-400">&bull; Evaluated 142 canonical controls against SOC 2 Type II</div>
              <div className="text-emerald-400">&check; Evidence sealed into SHA-256 vault (Digest: 7f83b165...a1d6)</div>
            </div>
          </section>

          <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
             <div></div>
             <a 
               href="#" 
               className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 text-decoration-none transition-colors"
             >
               <span>Next: Installation Guide</span>
               <ChevronRight size={14} />
             </a>
          </div>

        </main>
      </div>

      <StudioFooter />
    </div>
  );
}
