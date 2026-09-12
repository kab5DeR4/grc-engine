import { memo } from 'react';
import { ExternalLink, Code2 } from 'lucide-react';

function GithubIcon({ size = 15, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// tech stack credibility bento strip
const EngineeringCredibilitySection = memo(function EngineeringCredibilitySection() {
  const stack = [
    { name: 'React 19 & Vite', tag: 'UI Engine' },
    { name: 'FastAPI & Python 3.12+', tag: 'API Core' },
    { name: 'PostgreSQL & SQLAlchemy', tag: 'Data Layer' },
    { name: 'OPA Rego Policy Engine', tag: 'Evaluation' },
    { name: 'SHA-256 Cryptographic Vault', tag: 'Integrity' },
    { name: 'JWT & RBAC L4 Matrix', tag: 'Auth' },
  ];

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 font-sans bg-[var(--ground)]">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Bento Strip Container */}
        <div className="border border-[var(--hairline)] rounded-xl bg-[var(--surface)] p-5 sm:p-6 space-y-4 shadow-sm">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[var(--hairline)]">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-sky-500" />
              <span className="text-xs font-mono font-bold text-[var(--ink)] tracking-wider">
                ENGINEERING ARCHITECTURE &amp; OPEN SOURCE
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-[var(--ink-muted)]">
              <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>MIT Open Source</span>
              </span>
              <span>&bull;</span>
              <a
                href="https://github.com/kab5DeR4/grc-engine"
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 hover:underline flex items-center gap-1 font-semibold text-decoration-none"
              >
                <GithubIcon size={14} />
                <span>GitHub Repository</span>
                <ExternalLink size={11} className="opacity-70" />
              </a>
            </div>
          </div>

          {/* Tech Spec Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {stack.map((item) => (
              <div
                key={item.name}
                className="p-2.5 rounded-lg bg-[var(--surface-raised)] border border-[var(--hairline)] space-y-0.5"
              >
                <div className="text-[10px] font-mono text-sky-500 uppercase font-semibold">
                  {item.tag}
                </div>
                <div className="text-xs font-bold text-[var(--ink)] font-mono truncate">
                  {item.name}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
});

EngineeringCredibilitySection.displayName = 'EngineeringCredibilitySection';

export default EngineeringCredibilitySection;
