import { memo, useState, useEffect } from 'react';
import { Terminal, ShieldAlert, CheckCircle2, Clock, Pause, Play, ArrowDownRight } from 'lucide-react';

import { useDemoStore } from '../../store/demoStore';

const MOCK_EVENTS = [
  {
    id: 'evt-1',
    time: 'Just now',
    type: 'SUCCESS',
    source: 'AWS S3 Evaluator',
    message: 'Encrypted bucket policy verified for s3://customer-backups-2026 (AES-256)',
    control: 'SOC2 CC6.1',
  },
  {
    id: 'evt-2',
    time: '24s ago',
    type: 'WARNING',
    source: 'GitHub VCS Scanner',
    message: 'Branch protection rule missing mandatory code-owner review on master',
    control: 'ISO 27001 A.8.28',
  },
  {
    id: 'evt-3',
    time: '1m ago',
    type: 'SUCCESS',
    source: 'EKS Cluster Sentinel',
    message: 'PodSecurity admission controller active on namespace: payment-gateway',
    control: 'PCI-DSS v4 6.4.1',
  },
  {
    id: 'evt-4',
    time: '3m ago',
    type: 'REMEDIATED',
    source: 'Automated Patch Bot',
    message: 'Cryptographic SHA-256 evidence record #8921 committed to Merkle chain',
    control: 'NIST AU-9',
  },
  {
    id: 'evt-5',
    time: '5m ago',
    type: 'SUCCESS',
    source: 'IAM Audit Harvester',
    message: 'Rotated stale API credentials for svc-cloud-telemetry-agent',
    control: 'CIS 1.14',
  },
];

export const LiveTelemetryEventFeed = memo(function LiveTelemetryEventFeed({
  isLive = false,
  hasLiveIntegrations = false,
}) {
  const { auditTrail, liveAuditTrail } = useDemoStore();
  const [demoEvents, setDemoEvents] = useState(MOCK_EVENTS);
  const [isPaused, setIsPaused] = useState(false);

  // In Live mode, derive events strictly from real liveAuditTrail
  const liveEvents = (liveAuditTrail || [])
    .map(a => ({
      id: a.id,
      time: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: a.severity === 'CRITICAL' ? 'WARNING' : 'SUCCESS',
      source: a.resource || 'REST Ingress Gateway',
      message: a.details || a.action,
      control: 'API v1 Gateway',
    }));

  const events = isLive ? liveEvents : demoEvents;

  // Gentle ticker animation ONLY in demo mode
  useEffect(() => {
    if (isLive || isPaused) return;

    const interval = setInterval(() => {
      setDemoEvents((prev) => {
        const pool = [
          {
            id: `evt-${Date.now()}`,
            time: 'Just now',
            type: 'SUCCESS',
            source: 'AWS IAM Harvester',
            message: 'Root account access log checked: zero direct root logins in 90 days',
            control: 'SOC2 CC6.3',
          },
          {
            id: `evt-${Date.now() + 1}`,
            time: 'Just now',
            type: 'WARNING',
            source: 'GitHub Repo Hook',
            message: 'Secret detected in commit staging: generic private token prevented by pre-receive hook',
            control: 'SOC2 CC6.6',
          },
          {
            id: `evt-${Date.now() + 2}`,
            time: 'Just now',
            type: 'SUCCESS',
            source: 'Audit Hash Notary',
            message: 'Batch SHA-256 evidence proof anchored into local immutable audit ledger',
            control: 'ISO 27001 A.12.4',
          },
        ];
        const nextEvent = pool[Math.floor(Math.random() * pool.length)];
        return [nextEvent, ...prev.slice(0, 4)];
      });
    }, 12000);

    return () => clearInterval(interval);
  }, [isLive, isPaused]);

  return (
    <div className="bg-[var(--surface)] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs font-sans flex flex-col justify-between h-full">
      
      {/* Feed Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <Terminal size={14} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Continuous Telemetry Stream
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              Live automated evidence ingress
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
            isLive && !hasLiveIntegrations 
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' 
              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLive && !hasLiveIntegrations ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`}></span>
            <span>{isLive && !hasLiveIntegrations ? 'STANDBY' : 'INGESTING'}</span>
          </span>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            title={isPaused ? 'Resume stream' : 'Pause stream'}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="py-10 text-center my-2 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          <Terminal size={24} className="mx-auto text-slate-400 mb-2 opacity-60" />
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Awaiting Live Telemetry Ingress
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-1 max-w-xs mx-auto">
            Connect GitHub or dispatch a scan to stream live evaluation logs.
          </div>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 my-2">
          {events.slice(0, 5).map((evt) => (
            <div key={evt.id} className="py-2.5 flex items-start gap-3 text-xs group">
              <div className="pt-0.5 shrink-0">
                {evt.type === 'SUCCESS' && <CheckCircle2 size={13} className="text-emerald-500" />}
                {evt.type === 'WARNING' && <ShieldAlert size={13} className="text-amber-500" />}
                {evt.type === 'REMEDIATED' && <CheckCircle2 size={13} className="text-sky-500" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10.5px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {evt.source}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {evt.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
                  {evt.message}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[10px] font-mono">
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                    {evt.control}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer link */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>Zero unhashed telemetry drift</span>
        <span className="text-orange-600 dark:text-orange-400 flex items-center gap-1 font-medium cursor-pointer hover:underline">
          <span>Inspect Ingress Logs</span>
          <ArrowDownRight size={11} />
        </span>
      </div>

    </div>
  );
});

LiveTelemetryEventFeed.displayName = 'LiveTelemetryEventFeed';
export default LiveTelemetryEventFeed;
