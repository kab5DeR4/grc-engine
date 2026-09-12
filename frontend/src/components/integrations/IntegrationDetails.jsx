import { CheckCircle2, ShieldCheck, RefreshCw, XCircle, Settings, Save } from 'lucide-react';

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

  const Icon = selectedIntegration.icon || Settings;

  return (
    <div className="lg:col-span-6 xl:col-span-7 bg-[var(--surface)] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-[80px] h-fit space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
            CONFIGURATION PROFILE
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            {selectedIntegration.name}
          </h2>
        </div>
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400">
          <Icon size={24} />
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {selectedIntegration.description}
      </p>

      {/* Connection Status & Ping Test Banner */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase">
            CONNECTION STATUS
          </div>
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mt-0.5">
            <span className={`w-2 h-2 rounded-full ${selectedIntegration.status === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            {selectedIntegration.status === 'CONNECTED' ? 'Active & Telemetry Verified' : 'Action Required / Token Missing'}
          </div>
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
            LAST INGRESS: {selectedIntegration.lastSync}
          </div>
        </div>

        <button
          type="button"
          onClick={handleTestConnection}
          disabled={isTesting}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shrink-0 shadow-xs"
        >
          {isTesting ? (
            <>
              <RefreshCw size={13} className="animate-spin" />
              <span>TESTING PING...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={14} />
              <span>TEST CONNECTION</span>
            </>
          )}
        </button>
      </div>

      {/* Test Result Feedback */}
      {testResult && (
        <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-mono ${
          testResult.success 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-800 dark:text-rose-300'
        }`}>
          {testResult.success ? (
            <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <XCircle size={16} className="text-rose-600 dark:text-rose-400 shrink-0" />
          )}
          <span>{testResult.message}</span>
        </div>
      )}

      {/* Connection Parameters Form */}
      {currentConfig && (
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            CONNECTION PARAMETERS
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            {Object.entries(currentConfig).map(([key, value]) => (
              <div key={key}>
                <label className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1 uppercase">
                  {key.replace(/_/g, ' ')}
                </label>
                <input 
                  type={key.includes('token') || key.includes('secret') || key.includes('key') ? 'password' : 'text'}
                  value={value}
                  onChange={(e) => handleConfigChange(key, e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>
            ))}

            <div className="pt-2 flex justify-end">
              <button 
                type="button"
                onClick={handleSave} 
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save size={13} />
                <span>SAVE CONFIGURATION</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Monitored Telemetry Streams */}
      {selectedIntegration.telemetry && (
        <div>
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
            ACTIVE TELEMETRY STREAMS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedIntegration.telemetry.map((stream, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                <span className="truncate">{stream}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
