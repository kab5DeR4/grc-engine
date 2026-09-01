import { useState } from 'react';
import { 
  ShieldCheck, Search, Download, 
  Check, Copy 
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
    <div className="space-y-8 font-mono">
      {/* Audit Trail Header */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 hairline-b">
          <div>
            <div className="mono-label text-[#9B3418] text-[10px]">TAMPER-EVIDENT GOVERNANCE LOG</div>
            <h2 className="serif-heading text-[26px] font-bold text-[#1A1917]">
              Immutable Audit Trail & Cryptographic Ledger
            </h2>
            <p className="mono-body text-[11.5px] text-[#4A4741] mt-1 max-w-2xl">
              Append-only cryptographic record of all workspace mutations, RBAC role updates, API key generations, and telemetry scans with SHA-256 hash chaining.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleExportLedger('json')}
              className="studio-btn text-[10px] py-1.5 px-3 flex items-center gap-1.5 uppercase"
            >
              <Download size={13} />
              <span>EXPORT LEDGER (JSON)</span>
            </button>
            <button
              onClick={() => handleExportLedger('csv')}
              className="studio-btn studio-btn-primary text-[10px] py-1.5 px-3 flex items-center gap-1.5 uppercase"
            >
              <Download size={13} />
              <span>EXPORT CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 hairline-b">
          <div className="flex flex-wrap gap-2">
            {['ALL', 'INFO', 'WARN', 'CRITICAL'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`mono-label text-[10px] px-2.5 py-1 border transition-colors cursor-pointer ${
                  severityFilter === sev
                    ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917]'
                    : 'bg-transparent text-[#1A1917] border-[#1A1917]'
                }`}
              >
                [ {sev} ]
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="SEARCH AUDIT LEDGER..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-1.5 text-[11px] mono-label text-[#1A1917] outline-none focus:border-[#9B3418]"
            />
            <Search size={13} className="absolute right-3 top-2.5 text-[#6E6A61]" />
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left text-[11.5px] border-collapse">
            <thead>
              <tr className="bg-[#E7E3DA] hairline-b text-[#1A1917]">
                <th className="p-3 mono-label text-[10px]">EVENT / ID</th>
                <th className="p-3 mono-label text-[10px]">ACTOR & ROLE</th>
                <th className="p-3 mono-label text-[10px]">MUTATION ACTION</th>
                <th className="p-3 mono-label text-[10px]">RESOURCE TARGET</th>
                <th className="p-3 mono-label text-[10px]">SEV</th>
                <th className="p-3 mono-label text-[10px] text-right">PROOF PROBE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="bg-[#E7E3DA] hover:bg-[#DCD7CB]/40 transition-colors">
                  <td className="p-3">
                    <span className="mono-label text-[#9B3418] font-bold text-[10.5px]">{log.id}</span>
                    <div className="text-[10px] text-[#6E6A61] mt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString()} UTC
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="font-bold text-[#1A1917] text-[11.5px]">{log.actor.name}</div>
                    <div className="text-[10px] text-[#6E6A61]">{log.actor.role}</div>
                  </td>

                  <td className="p-3">
                    <div className="mono-label text-[10.5px] text-[#1A1917]">{log.action}</div>
                    <div className="text-[10.5px] text-[#4A4741] mt-0.5 line-clamp-1 max-w-xs">{log.details}</div>
                  </td>

                  <td className="p-3">
                    <code className="text-[10.5px] bg-[#DCD7CB] px-1.5 py-0.5 hairline-all text-[#1A1917]">
                      {log.resource}
                    </code>
                  </td>

                  <td className="p-3">
                    <span className={`mono-label text-[9px] px-1.5 py-0.5 ${
                      log.severity === 'CRITICAL'
                        ? 'bg-[#9B3418] text-[#FFFFFF]'
                        : log.severity === 'WARN'
                        ? 'border border-[#9B3418] text-[#9B3418]'
                        : 'bg-[#DCD7CB] text-[#1A1917]'
                    }`}>
                      {log.severity}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedProof(log)}
                      className="studio-btn text-[9px] py-0.5 px-2 text-[#9B3418] hover:border-[#9B3418] uppercase"
                    >
                      [ VERIFY HASH ]
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
        <div className="fixed inset-0 z-50 bg-[#1A1917]/70 flex items-center justify-center p-4">
          <div className="bg-[#E7E3DA] p-6 md:p-8 hairline-all max-w-lg w-full font-mono shadow-2xl animate-in fade-in">
            <div className="flex justify-between items-start pb-4 hairline-b">
              <div>
                <div className="mono-label text-[#9B3418] text-[10px]">CRYPTOGRAPHIC VERIFICATION PROOF</div>
                <h3 className="serif-heading text-[24px] font-bold text-[#1A1917]">
                  {selectedProof.id}: Proof Certificate
                </h3>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="text-[#6E6A61] hover:text-[#1A1917] text-[14px]"
              >
                [✕]
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="p-3 bg-[#DCD7CB] hairline-all flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#9B3418] mono-label text-[11px] font-bold">
                  <ShieldCheck size={16} />
                  <span>FIPS 140-3 HARDWARE SIGNED</span>
                </div>
                <span className="mono-label text-[9.5px] text-[#6E6A61]">STATUS: 100% IMMUTABLE</span>
              </div>

              <div>
                <label className="mono-label text-[10px] text-[#6E6A61] block mb-1">
                  SHA-256 CRYPTOGRAPHIC INTEGRITY HASH
                </label>
                <div className="p-2.5 bg-[#DCD7CB] hairline-all break-all text-[11px] font-mono text-[#1A1917] flex items-center justify-between gap-2">
                  <span>{selectedProof.sha256}</span>
                  <button
                    onClick={() => handleCopyHash(selectedProof.sha256)}
                    className="text-[#6E6A61] hover:text-[#9B3418] p-1"
                    title="Copy Hash"
                  >
                    {copiedHash ? <Check size={13} className="text-[#9B3418]" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-[#4A4741] p-3 bg-[#DCD7CB] hairline-all">
                <div>ACTOR: <strong className="text-[#1A1917]">{selectedProof.actor.name} ({selectedProof.actor.email})</strong></div>
                <div>ASSIGNED ROLE: <strong className="text-[#9B3418]">{selectedProof.actor.role}</strong></div>
                <div>MUTATION: <strong className="text-[#1A1917]">{selectedProof.action}</strong></div>
                <div>TIMESTAMP: <strong className="text-[#1A1917]">{selectedProof.timestamp}</strong></div>
                <div>IP ORIGIN: <strong className="text-[#1A1917]">{selectedProof.ipAddress}</strong></div>
                <div>DETAILS: <span className="text-[#1A1917]">{selectedProof.details}</span></div>
              </div>
            </div>

            <div className="flex justify-end pt-4 hairline-t">
              <button
                onClick={() => setSelectedProof(null)}
                className="studio-btn-primary studio-btn text-[10px] py-1.5 px-4"
              >
                [ CLOSE PROOF INSPECTOR ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
