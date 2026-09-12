import { Network } from 'lucide-react';

export default function IntegrationHeader() {
  return (
    <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
        <Network size={13} />
        <span>SYSTEM INTEGRATIONS & TELEMETRY INGRESS</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
        Connection Management
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
        Configure telemetry ingress points, CI/CD policy enforcements, and downstream workflow alerts. Manage API credentials and verify live connection health with 1-click latency pings.
      </p>
    </div>
  );
}
