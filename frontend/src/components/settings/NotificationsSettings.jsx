import { useState } from 'react';
import { 
  Send, CheckCircle2, Bell, 
  ShieldAlert, Mail, MessageSquare, Terminal 
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export default function NotificationsSettings() {
  const { notifications, updateNotificationChannel, sendTestNotification } = useDemoStore();
  const [testingChannelId, setTestingChannelId] = useState(null);
  const [savedChannelId, setSavedChannelId] = useState(null);

  const handleToggleEnable = (channel) => {
    updateNotificationChannel(channel.id, { enabled: !channel.enabled });
  };

  const handleToggleEvent = (channel, eventKey) => {
    const updatedEvents = {
      ...channel.events,
      [eventKey]: !channel.events[eventKey],
    };
    updateNotificationChannel(channel.id, { events: updatedEvents });
  };

  const handleUrlChange = (channelId, newUrl) => {
    updateNotificationChannel(channelId, { webhookUrl: newUrl });
  };

  const handleDestinationChange = (channelId, newDest) => {
    updateNotificationChannel(channelId, { destination: newDest });
  };

  const handleTestPing = (channelId) => {
    setTestingChannelId(channelId);
    setTimeout(() => {
      sendTestNotification(channelId);
      setTestingChannelId(null);
      setSavedChannelId(channelId);
      setTimeout(() => setSavedChannelId(null), 3000);
    }, 900);
  };

  const getChannelIcon = (type) => {
    switch (type) {
      case 'SLACK':
        return <MessageSquare size={18} />;
      case 'PAGERDUTY':
        return <ShieldAlert size={18} />;
      case 'EMAIL':
        return <Mail size={18} />;
      case 'SIEM':
        return <Terminal size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Alert Webhooks Header Card */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            REAL-TIME ALERT ROUTING
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            Notification Webhooks & Alert Escalation
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Configure asynchronous webhook destinations and event triggers for automated drift detections, critical scan anomalies, and RBAC policy mutations.
          </p>
        </div>

        {/* Webhook Channels List */}
        <div className="space-y-6 pt-6">
          {notifications.map((channel) => (
            <div
              key={channel.id}
              className={`p-5 rounded-xl border transition-all ${
                channel.enabled 
                  ? 'bg-[var(--surface)] border-sky-500/50 shadow-xs ring-1 ring-sky-500/20' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 opacity-70'
              }`}
            >
              {/* Channel Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 shrink-0">
                    {getChannelIcon(channel.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900 dark:text-white">{channel.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                        {channel.type}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      DESTINATION: <strong className="text-slate-900 dark:text-white">{channel.destination}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleEnable(channel)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      channel.enabled
                        ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {channel.enabled ? 'ACTIVE' : 'DISABLED'}
                  </button>
                </div>
              </div>

              {/* URL & Destination Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                    Webhook Target Endpoint URL
                  </label>
                  <input
                    type="text"
                    value={channel.webhookUrl}
                    onChange={(e) => handleUrlChange(channel.id, e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                    Channel / Topic Identifier
                  </label>
                  <input
                    type="text"
                    value={channel.destination}
                    onChange={(e) => handleDestinationChange(channel.id, e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>
              </div>

              {/* Event Subscriptions Checkboxes */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wider">
                  SUBSCRIBED TELEMETRY EVENT TRIGGERS
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer text-xs text-slate-800 dark:text-slate-200 font-sans">
                    <input
                      type="checkbox"
                      checked={Boolean(channel.events.scanFailure)}
                      onChange={() => handleToggleEvent(channel, 'scanFailure')}
                      className="accent-sky-500"
                    />
                    <span>Scan Drift / Failures</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer text-xs text-slate-800 dark:text-slate-200 font-sans">
                    <input
                      type="checkbox"
                      checked={Boolean(channel.events.criticalFinding)}
                      onChange={() => handleToggleEvent(channel, 'criticalFinding')}
                      className="accent-sky-500"
                    />
                    <span>Critical Findings</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer text-xs text-slate-800 dark:text-slate-200 font-sans">
                    <input
                      type="checkbox"
                      checked={Boolean(channel.events.rbacChange)}
                      onChange={() => handleToggleEvent(channel, 'rbacChange')}
                      className="accent-sky-500"
                    />
                    <span>RBAC Mutations</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer text-xs text-slate-800 dark:text-slate-200 font-sans">
                    <input
                      type="checkbox"
                      checked={Boolean(channel.events.reportExport)}
                      onChange={() => handleToggleEvent(channel, 'reportExport')}
                      className="accent-sky-500"
                    />
                    <span>PDF Exports</span>
                  </label>
                </div>
              </div>

              {/* Status and Test Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="text-slate-500 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>LAST DISPATCH: <strong className="text-slate-900 dark:text-white">{channel.lastPing}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  {savedChannelId === channel.id && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs flex items-center gap-1 font-semibold">
                      <CheckCircle2 size={13} />
                      <span>PING CONFIRMED 200 OK</span>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleTestPing(channel.id)}
                    disabled={testingChannelId === channel.id}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send size={12} />
                    <span>{testingChannelId === channel.id ? 'SENDING TEST PING...' : 'SEND TEST WEBHOOK'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
