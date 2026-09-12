import { Settings, CheckCircle2, AlertCircle } from 'lucide-react';

export default function IntegrationList({ filteredIntegrations, selectedIntegration, setSelectedIntegration, setTestResult }) {
  if (filteredIntegrations.length === 0) {
    return (
      <div className="lg:col-span-6 xl:col-span-5 p-12 text-center bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500">
        NO INTEGRATIONS MATCHING CURRENT FILTER
      </div>
    );
  }

  return (
    <div className="lg:col-span-6 xl:col-span-5 space-y-3">
      {filteredIntegrations.map((item) => {
        const isSelected = selectedIntegration?.id === item.id;
        const ItemIcon = item.icon || Settings;
        const isConnected = item.status === 'CONNECTED';

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSelectedIntegration(item);
              setTestResult(null);
            }}
            className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
              isSelected 
                ? 'bg-[var(--surface)] border-sky-500 dark:border-sky-500 shadow-sm ring-1 ring-sky-500/30' 
                : 'bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className={`p-2.5 rounded-lg shrink-0 ${
              isSelected 
                ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}>
              <ItemIcon size={20} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {item.name}
                </h3>
                <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold border flex items-center gap-1 shrink-0 ${
                  isConnected 
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                }`}>
                  {isConnected ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                  <span>{item.status}</span>
                </span>
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                {item.type}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
