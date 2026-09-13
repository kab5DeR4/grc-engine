import React from 'react';
import { Sparkles, CheckCircle2, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReleaseNotesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const highlights = [
    {
      version: 'v1.0.0',
      date: 'September 2026',
      title: 'General Availability — Deterministic Evidence Engine',
      items: [
        'Live GitHub Connector for Branch Protection, PR Code Reviews, and Secret Scanning.',
        'Deterministic verdict engine with tamper-evident SHA-256 evidence hashing.',
        'Continuous compliance mapping for SOC 2 Type II, ISO 27001, and NIST CSF 2.0.',
        'Enterprise rate-limiting, OWASP security headers, and privacy consent.',
      ],
    },
    {
      version: 'v0.9.0',
      date: 'August 2026',
      title: 'Infrastructure & RAG Telemetry Beta',
      items: [
        'Async SQLAlchemy 2.0 ORM persistence with SQLite & PostgreSQL compatibility.',
        'Multi-framework cross-walking: map 1 evidence artifact to multiple audit controls.',
        'Interactive waves Perlin canvas hero centerpiece.',
      ],
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                What's New in GRC Engine
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Release notes and engine changelog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close changelog"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
          {highlights.map((release) => (
            <div key={release.version} className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                  {release.version}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {release.date}
                </span>
              </div>
              <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                {release.title}
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                {release.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <a
            href="https://github.com/kab5DeR4/grc-engine/releases"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline inline-flex items-center gap-1"
          >
            <span>GitHub Releases</span>
            <ArrowRight size={11} />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
