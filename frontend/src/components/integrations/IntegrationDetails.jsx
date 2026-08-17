import { CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export default function IntegrationDetails({
  selectedIntegration,
  isTesting,
  testResult,
  handleTestConnection,
  currentConfig,
  handleConfigChange,
  handleSave
}) {
  if (!selectedIntegration) return null;

  return (
    <div className="lg:col-span-6 xl:col-span-7 bg-[#DCD7CB] p-6 hairline-all sticky top-[80px] h-fit">
      <div className="flex items-center justify-between mb-4 border-b border-[#1A1917]/20 pb-4">
        <div>
          <div className="mono-label text-[#9B3418] mb-1 tracking-widest text-[10px]">CONFIGURATION PROFILE</div>
          <h2 className="font-serif text-[28px] font-bold text-[#1A1917] flex items-center gap-3">
            {selectedIntegration.name}
          </h2>
        </div>
        <selectedIntegration.icon size={32} className="text-[#1A1917]/20" />
      </div>

      <div className="space-y-6">
        {/* Overview */}
        <p className="mono-body text-[12px] text-[#4A4741] leading-relaxed">
          {selectedIntegration.description}
        </p>

        {/* Status & Test */}
        <div className="p-4 bg-[#E7E3DA] hairline-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="mono-label text-[10px] text-[#6E6A61] mb-1">CONNECTION STATUS</div>
            <div className="flex items-center gap-2 font-bold text-[13px] text-[#1A1917]">
              <span className={`w-2 h-2 rounded-full ${selectedIntegration.status === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {selectedIntegration.status === 'CONNECTED' ? 'Active & Healthy' : 'Action Required'}
            </div>
            <div className="mono-label text-[9.5px] text-[#6E6A61] mt-1">LAST SYNC: {selectedIntegration.lastSync.toUpperCase()}</div>
          </div>
          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="px-4 py-2 bg-[#1A1917] text-[#E7E3DA] text-[10.5px] mono-label hover:bg-[#9B3418] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isTesting ? <><RefreshCw size={14} className="animate-spin" /> PINGING...</> : <><ShieldCheck size={14} /> TEST CONNECTION</>}
          </button>
        </div>

        {testResult && (
          <div className="p-3 bg-emerald-100/50 border border-emerald-400 text-emerald-900 text-[11px] mono-label flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-700" />
            {testResult.message}
          </div>
        )}

        {/* Params */}
        <div>
          <div className="mono-label text-[11px] font-bold text-[#1A1917] mb-3">CONNECTION PARAMETERS</div>
          <div className="space-y-3 bg-[#E7E3DA] p-4 hairline-all">
            {Object.entries(currentConfig).map(([key, value]) => (
              <div key={key}>
                <label className="block text-[10px] mono-label text-[#6E6A61] mb-1 uppercase">{key.replace('_', ' ')}</label>
                <input 
                  type="text"
                  value={value}
                  onChange={(e) => handleConfigChange(key, e.target.value)}
                  className="w-full bg-[#F2F0EB] border border-[#1A1917]/30 px-3 py-2 text-[12px] mono-label text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
              </div>
            ))}
            <div className="pt-2 flex justify-end">
               <button onClick={handleSave} className="px-6 py-2 bg-[#9B3418] text-[#E7E3DA] mono-label text-[11px] hover:bg-[#1A1917] transition-colors cursor-pointer">
                 [ SAVE CONFIGURATION ]
               </button>
            </div>
          </div>
        </div>

        {/* Monitored streams */}
        <div>
          <div className="mono-label text-[11px] font-bold text-[#1A1917] mb-3">ACTIVE TELEMETRY STREAMS</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedIntegration.telemetry.map((stream, idx) => (
              <div key={idx} className="p-2 bg-[#E7E3DA] hairline-all text-[10.5px] mono-label text-[#4A4741] flex items-center gap-2">
                <span className="w-1 h-1 bg-[#9B3418] rounded-full" />
                {stream.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
