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
    }, 1000);
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
    <div className="space-y-8 font-mono">
      {/* Alert Webhooks Header Card */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="pb-4 hairline-b">
          <div className="mono-label text-[#9B3418] text-[10px]">REAL-TIME ALERT ROUTING</div>
          <h2 className="serif-heading text-[26px] font-bold text-[#1A1917]">
            Notification Webhooks & Alert Escalation
          </h2>
          <p className="mono-body text-[11.5px] text-[#4A4741] mt-1 max-w-2xl">
            Configure asynchronous webhook destinations and event triggers for automated drift detections, critical scan anomalies, and RBAC policy mutations.
          </p>
        </div>

        {/* Webhook Channels List */}
        <div className="space-y-6 pt-6">
          {notifications.map((channel) => (
            <div
              key={channel.id}
              className={`p-5 hairline-all transition-all ${
                channel.enabled ? 'bg-[#E7E3DA] border-l-4 border-l-[#9B3418]' : 'bg-[#E7E3DA]/60 opacity-70'
              }`}
            >
              {/* Channel Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 hairline-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#DCD7CB] hairline-all text-[#9B3418]">
                    {getChannelIcon(channel.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-[18px] font-bold text-[#1A1917]">{channel.name}</span>
                      <span className="mono-label text-[9px] px-1.5 py-0.5 bg-[#DCD7CB] text-[#1A1917]">
                        {channel.type}
                      </span>
                    </div>
                    <div className="text-[10.5px] text-[#6E6A61] mt-0.5">
                      DESTINATION: <strong className="text-[#1A1917]">{channel.destination}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleEnable(channel)}
                    className={`mono-label text-[10px] px-2.5 py-1 border transition-colors cursor-pointer ${
                      channel.enabled
                        ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917]'
                        : 'bg-transparent text-[#6E6A61] border-[#6E6A61]'
                    }`}
                  >
                    {channel.enabled ? '[ ENABLED ]' : '[ DISABLED ]'}
                  </button>
                </div>
              </div>

              {/* URL & Destination Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <label className="mono-label text-[10px] text-[#1A1917] block mb-1">
                    WEBHOOK TARGET ENDPOINT URL
                  </label>
                  <input
                    type="text"
                    value={channel.webhookUrl}
                    onChange={(e) => handleUrlChange(channel.id, e.target.value)}
                    className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-1.5 text-[11px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                  />
                </div>

                <div>
                  <label className="mono-label text-[10px] text-[#1A1917] block mb-1">
                    CHANNEL / TOPIC IDENTIFIER
                  </label>
                  <input
                    type="text"
                    value={channel.destination}
                    onChange={(e) => handleDestinationChange(channel.id, e.target.value)}
                    className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-1.5 text-[11px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                  />
                </div>
              </div>

              {/* Event Subscriptions Checkboxes */}
              <div className="pt-3 hairline-t">
                <div className="mono-label text-[10px] text-[#9B3418] mb-2">
                  SUBSCRIBED TELEMETRY EVENT TRIGGERS
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  <label className="flex items-center gap-2 p-2 bg-[#DCD7CB] hairline-all cursor-pointer text-[11px] text-[#1A1917]">
                    <input
                      type="checkbox"
                      checked={Boolean(channel.events.scanFailure)}
                      onChange={() => handleToggleEvent(channel, 'scanFailure')}
                      className="accent-[#9B3418]"
                    />
                    <span>Scan Drift / Failures</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-[#DCD7CB] hairline-all cursor-pointer text-[11px] text-[#1A1917]">
                    <input
                      type="checkbox"
                      checked={Boolean(channel.events.criticalFinding)}
                      onChange={() => handleToggleEvent(channel, 'criticalFinding')}
                      className="accent-[#9B3418]"
                    />
                    <span>Critical Findings</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-[#DCD7CB] hairline-all cursor-pointer text-[11px] text-[#1A1917]">
                    <input
                      type="checkbox"
                      checked={Boolean(channel.events.rbacChange)}
                      onChange={() => handleToggleEvent(channel, 'rbacChange')}
                      className="accent-[#9B3418]"
                    />
                    <span>RBAC Role Mutations</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-[#DCD7CB] hairline-all cursor-pointer text-[11px] text-[#1A1917]">
                    <input
                      type="checkbox"
                      checked={Boolean(channel.events.reportExport)}
                      onChange={() => handleToggleEvent(channel, 'reportExport')}
                      className="accent-[#9B3418]"
                    />
                    <span>Attestation PDF Exports</span>
                  </label>
                </div>
              </div>

              {/* Status and Test Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 mt-3 hairline-t text-[10.5px]">
                <div className="text-[#6E6A61] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#9B3418] animate-pulse"></span>
                  <span>LAST DISPATCH: <strong className="text-[#1A1917]">{channel.lastPing}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  {savedChannelId === channel.id && (
                    <span className="text-[#9B3418] mono-label text-[10px] flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      <span>PING CONFIRMED 200 OK</span>
                    </span>
                  )}
                  <button
                    onClick={() => handleTestPing(channel.id)}
                    disabled={testingChannelId === channel.id}
                    className="studio-btn text-[10px] py-1 px-3 flex items-center gap-1 hover:border-[#9B3418]"
                  >
                    <Send size={11} />
                    <span>{testingChannelId === channel.id ? '[ SENDING TEST PING... ]' : '[ SEND TEST WEBHOOK ]'}</span>
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
