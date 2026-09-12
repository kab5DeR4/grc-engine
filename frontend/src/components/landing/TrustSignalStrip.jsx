import { memo } from 'react';
import { Cpu, ShieldCheck, Layers, Lock } from 'lucide-react';

const TrustSignalStrip = memo(function TrustSignalStrip() {
  const signals = [
    {
      icon: Cpu,
      title: 'Deterministic Evaluation',
      desc: 'Explicit boolean & threshold rule logic. Zero AI hallucinations.',
    },
    {
      icon: ShieldCheck,
      title: 'Cryptographic Evidence',
      desc: 'SHA-256 hashed records for tamper-evident auditor verification.',
    },
    {
      icon: Layers,
      title: 'Multi-Framework Mapping',
      desc: 'Canonical controls mapped across SOC 2, ISO 27001, and NIST CSF.',
    },
    {
      icon: Lock,
      title: 'Privacy-First & Sovereign',
      desc: 'Local execution and read-only connectors. Zero data exfiltration.',
    },
  ];

  return (
    <div className="w-full bg-slate-100/80 dark:bg-[var(--ground)] border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 md:px-8 lg:px-12 font-sans transition-colors">
      <div className="w-full max-w-[94vw] 2xl:max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {signals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/70 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-750/80 transition-all shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={16} />
                </div>
                <div>
                  <h2 className="text-[13px] font-mono font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h2>
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

TrustSignalStrip.displayName = 'TrustSignalStrip';

export default TrustSignalStrip;
