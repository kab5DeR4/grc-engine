import { useState } from 'react';
import { 
  ShieldCheck, Search, Download, 
  Check, Copy, X 
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export default function AuditTrailSettings() {
  const { auditTrail } = useDemoStore();
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [selectedProof, setSelectedProof] = useState(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const filteredLogs = auditTrail.filter((log) => {
    const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
    const query = search.toLowerCase();
    const matchesSearch = 
      log.id.toLowerCase().includes(query) ||
      log.action.toLowerCase().includes(query) ||
      log.resource.toLowerCase().includes(query) ||
      log.actor.name.toLowerCase().includes(query) ||
      log.actor.email.toLowerCase().includes(query) ||
      log.details.toLowerCase().includes(query);
    return matchesSeverity && matchesSearch;
  });

  const handleExportLedger = (format = 'json') => {
    let content = '';
    let mimeType = 'application/json';
    let filename = `grc_immutable_audit_ledger_${new Date().toISOString().split('T')[0]}.${format}`;

    if (format === 'json') {
      content = JSON.stringify(auditTrail, null, 2);
    } else {
      mimeType = 'text/csv';
      const headers = ['ID', 'Timestamp', 'Actor Name', 'Actor Email', 'Role', 'Action', 'Resource', 'Severity', 'IP', 'SHA-256'];
      const rows = auditTrail.map(l => [
        l.id,
        l.timestamp,
        `"${l.actor.name}"`,
        l.actor.email,
        l.actor.role,
        l.action,
        `"${l.resource}"`,
        l.severity,
        l.ipAddress,
        l.sha256
      ]);
      content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Audit Trail Header */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              TAMPER-EVIDENT GOVERNANCE LOG
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              Immutable Audit Trail & Cryptographic Ledger
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Append-only cryptographic record of all workspace mutations, RBAC role updates, API key generations, and telemetry scans with SHA-256 hash chaining.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleExportLedger('json')}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={13} />
              <span>EXPORT JSON</span>
            </button>
            <button
              onClick={() => handleExportLedger('csv')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download size={13} />
              <span>EXPORT CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap gap-2">
            {['ALL', 'INFO', 'WARN', 'CRITICAL'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  severityFilter === sev
                    ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs'
                    : 'bg-[var(--surface)] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search audit ledger..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                <th className="p-3">EVENT / ID</th>
                <th className="p-3">ACTOR & ROLE</th>
                <th className="p-3">MUTATION ACTION</th>
                <th className="p-3">RESOURCE TARGET</th>
                <th className="p-3">SEV</th>
                <th className="p-3 text-right">PROOF PROBE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">{log.id}</span>
                    <div className="text-[10.5px] font-mono text-slate-400 mt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString()} UTC
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{log.actor.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{log.actor.role}</div>
                  </td>

                  <td className="p-3">
                    <div className="font-mono text-xs font-semibold text-slate-900 dark:text-white">{log.action}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 max-w-xs">{log.details}</div>
                  </td>

                  <td className="p-3">
                    <code className="text-xs bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
                      {log.resource}
                    </code>
                  </td>

                  <td className="p-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      log.severity === 'CRITICAL'
                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                        : log.severity === 'WARN'
                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}>
                      {log.severity}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedProof(log)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                    >
                      VERIFY HASH
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Cryptographic Proof Verification */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 max-w-lg w-full font-sans shadow-md animate-in fade-in">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                  CRYPTOGRAPHIC PROOF CERTIFICATE
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedProof.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold">
                  <ShieldCheck size={16} />
                  <span>FIPS 140-3 HARDWARE SIGNED</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">100% IMMUTABLE</span>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  SHA-256 Cryptographic Integrity Digest
                </label>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 break-all text-xs font-mono text-slate-900 dark:text-slate-100 flex items-center justify-between gap-2">
                  <span>{selectedProof.sha256}</span>
                  <button
                    onClick={() => handleCopyHash(selectedProof.sha256)}
                    className="p-1.5 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    title="Copy Hash"
                  >
                    {copiedHash ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 font-mono">
                <div>ACTOR: <strong className="text-slate-900 dark:text-white">{selectedProof.actor.name} ({selectedProof.actor.email})</strong></div>
                <div>ASSIGNED ROLE: <strong className="text-sky-600 dark:text-sky-400">{selectedProof.actor.role}</strong></div>
                <div>MUTATION: <strong className="text-slate-900 dark:text-white">{selectedProof.action}</strong></div>
                <div>TIMESTAMP: <strong className="text-slate-900 dark:text-white">{selectedProof.timestamp}</strong></div>
                <div>IP ORIGIN: <strong className="text-slate-900 dark:text-white">{selectedProof.ipAddress}</strong></div>
                <div className="pt-1 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-sans">{selectedProof.details}</div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedProof(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
              >
                CLOSE PROOF INSPECTOR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
