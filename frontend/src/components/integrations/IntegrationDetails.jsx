import { useState } from 'react';
import { CheckCircle2, ShieldCheck, RefreshCw, XCircle, Settings, Save, ArrowRight, Check, Key, Zap, Shield } from 'lucide-react';

export default function IntegrationDetails({
  selectedIntegration,
  isTesting,
  testResult,
  handleTestConnection,
  currentConfig,
  handleConfigChange,
  handleSave
}) {
  const [activeStep, setActiveStep] = useState(1);

  if (!selectedIntegration) return null;

  const Icon = selectedIntegration.icon || Settings;

  return (
    <div className="lg:col-span-6 xl:col-span-7 bg-[var(--surface)] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-[80px] h-fit space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-[11px] font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
            INTEGRATION GATEWAY
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

      {/* Landingfolio Dashboard Step Wizard Progress */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-xl text-xs font-mono">
        {[
          { num: 1, title: 'Auth Scope', icon: Key },
          { num: 2, title: 'Credentials', icon: Shield },
          { num: 3, title: 'Verify & Sync', icon: Zap },
        ].map((step) => {
          const isDone = activeStep > step.num;
          const isCurrent = activeStep === step.num;
          return (
            <button
              key={step.num}
              type="button"
              onClick={() => setActiveStep(step.num)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-center transition-all cursor-pointer border ${
                isCurrent 
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 shadow-xs font-semibold' 
                  : isDone
                  ? 'bg-transparent text-emerald-600 dark:text-emerald-400 border-transparent'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              {isDone ? <Check size={13} /> : <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px]">{step.num}</span>}
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Step 1: Auth Scopes */}
      {activeStep === 1 && (
        <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-mono font-semibold text-slate-900 dark:text-white uppercase">
            Required Permission Scopes
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            GRC Engine requires read-only metadata ingestion. Zero write or deploy permissions are requested.
          </p>
          <div className="space-y-1.5">
            {[
              'repo:status & repo_branch_protection (Read-Only)',
              'security_events & dependabot_alerts (Read-Only)',
              'organization_metadata & member_mfa (Read-Only)'
            ].map((scope, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>{scope}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Next: Set Credentials</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Connection Parameters Form */}
      {activeStep === 2 && currentConfig && (
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
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <button 
                type="button"
                onClick={handleSave} 
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save size={13} />
                <span>SAVE PROFILE</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Proceed to Test</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Connection Status & Ping Test Banner */}
      {activeStep === 3 && (
        <div className="space-y-4">
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
              className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-orange-500 dark:hover:bg-orange-400 text-white dark:text-zinc-950 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shrink-0 shadow-xs"
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
