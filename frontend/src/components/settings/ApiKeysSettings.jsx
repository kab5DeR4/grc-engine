import { useState } from 'react';
import { 
  Key, Plus, Copy, Check, Lock, AlertTriangle, Terminal, X 
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ROLES } from '../../data/demo/rbac';
import RbacPermissionBanner from './RbacPermissionBanner';

export default function ApiKeysSettings() {
  const { currentUser, apiKeys, createApiKey, revokeApiKey } = useDemoStore();
  const isPlatformAdmin = currentUser.role === ROLES.PLATFORM_ADMIN;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdTokenDetails, setCreatedTokenDetails] = useState(null);
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [keyFormData, setKeyFormData] = useState({
    name: '',
    scope: 'CI/CD Pipeline Scanning (Read-Only)',
    scopeCode: 'SCAN_PIPELINE',
    expiresDays: 365,
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!keyFormData.name.trim()) return;

    const newKey = createApiKey({
      name: keyFormData.name.trim(),
      scope: keyFormData.scope,
      scopeCode: keyFormData.scopeCode,
      expiresDays: Number(keyFormData.expiresDays),
    });

    setShowCreateModal(false);
    setCreatedTokenDetails(newKey);
    setKeyFormData({
      name: '',
      scope: 'CI/CD Pipeline Scanning (Read-Only)',
      scopeCode: 'SCAN_PIPELINE',
      expiresDays: 365,
    });
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 dark:text-slate-100">
      {/* RBAC Restriction Banner if not Platform Admin */}
      {!isPlatformAdmin && (
        <RbacPermissionBanner
          actionName="generating, viewing, or revoking developer API keys & tokens"
          requiredRole="PLATFORM ADMIN"
        />
      )}

      {/* Developer Tokens Header Card */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              CI/CD AUTOMATION CREDENTIALS
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              Developer Tokens & CI/CD Pipeline Scanning
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Scoped API credentials used by GitHub Actions, GitLab CI/CD runners, Jenkins pipelines, and Terraform drift controllers to continuously validate compliance.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            disabled={!isPlatformAdmin}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer ${
              isPlatformAdmin 
                ? 'bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950' 
                : 'opacity-50 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-500'
            }`}
            title={!isPlatformAdmin ? 'Requires Platform Admin role to provision API tokens' : ''}
          >
            <Plus size={14} />
            <span>GENERATE TOKEN</span>
          </button>
        </div>

        {/* Tokens List */}
        <div className="space-y-3 pt-4">
          {apiKeys.map((key) => {
            const isRevoked = key.status === 'REVOKED';
            return (
              <div
                key={key.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isRevoked 
                    ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60' 
                    : 'bg-slate-50/60 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-slate-200 dark:border-slate-700 text-sky-600 dark:text-sky-400 shrink-0">
                    <Key size={18} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{key.name}</span>
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                        isRevoked 
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300' 
                          : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                      }`}>
                        {key.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5">
                      <code className="text-xs bg-slate-200 dark:bg-slate-950 px-2 py-0.5 rounded font-mono text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800">
                        {key.maskedToken}
                      </code>
                      <button
                        onClick={() => handleCopy(key.maskedToken, key.id)}
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 text-xs font-mono flex items-center gap-1 transition-colors"
                        title="Copy Prefix"
                      >
                        {copiedKeyId === key.id ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[10.5px] font-mono text-slate-500 mt-2">
                      <span>SCOPE: <span className="text-sky-600 dark:text-sky-400 font-semibold">{key.scope}</span></span>
                      <span>•</span>
                      <span>CREATED: {key.createdAt}</span>
                      <span>•</span>
                      <span>EXPIRES: {key.expiresAt}</span>
                      <span>•</span>
                      <span>LAST USED: <span className="text-slate-700 dark:text-slate-300">{key.lastUsed}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  {!isRevoked && isPlatformAdmin && (
                    <button
                      onClick={() => revokeApiKey(key.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-rose-500 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono transition-colors cursor-pointer"
                    >
                      REVOKE TOKEN
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CI/CD Integration Guide Snippet Box */}
      <div className="bg-slate-950 text-slate-100 p-6 md:p-8 rounded-xl border border-slate-800 shadow-sm">
        <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-sky-400" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              CI/CD PIPELINE INTEGRATION SNIPPET (GITHUB ACTIONS)
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">YAML SPEC</span>
        </div>

        <div className="pt-4 text-xs leading-relaxed">
          <pre className="overflow-x-auto bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-200 font-mono">
{`- name: GRC Policy Gate Check
  uses: atelier-grc/policy-action@v2
  with:
    grc-token: \${{ secrets.GRC_DEVELOPER_TOKEN }}
    workspace-id: "${useDemoStore.getState().workspaceSettings.organizationId}"
    fail-on-drift: true
    min-compliance-score: 95`}
          </pre>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-slate-400 font-mono">
          <span>Passes ephemeral bearer token via TLS 1.3 to backend engine.</span>
          <span className="text-emerald-400 font-semibold">FIPS 140-3 HSM VERIFIED</span>
        </div>
      </div>

      {/* Modal: Generate Developer Token */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 max-w-lg w-full font-sans shadow-md animate-in fade-in">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                  DEVELOPER CREDENTIAL CREATOR
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Generate Developer Token
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="py-5 space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Token Name / Identifier
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jenkins Staging Drift Gate"
                  value={keyFormData.name}
                  onChange={(e) => setKeyFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Credential Scope & Capabilities
                </label>
                <select
                  value={keyFormData.scopeCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    let desc = 'CI/CD Pipeline Scanning (Read-Only)';
                    if (code === 'SCAN_AND_REMEDIATE') desc = 'Full Scan & Remediation Trigger';
                    if (code === 'INGEST_TELEMETRY') desc = 'Telemetry Ingest Only';
                    setKeyFormData(prev => ({ ...prev, scopeCode: code, scope: desc }));
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
                >
                  <option value="SCAN_PIPELINE">CI/CD Pipeline Scanning (Read-Only Controls & Drifts)</option>
                  <option value="SCAN_AND_REMEDIATE">Full Scan & Remediation Trigger</option>
                  <option value="INGEST_TELEMETRY">Telemetry Ingest Only (Agent Daemon)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Expiration Window
                </label>
                <select
                  value={keyFormData.expiresDays}
                  onChange={(e) => setKeyFormData(prev => ({ ...prev, expiresDays: Number(e.target.value) }))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
                >
                  <option value={30}>30 Days (Ephemeral Project)</option>
                  <option value={90}>90 Days (Quarterly Rotation Standard)</option>
                  <option value={365}>1 Year (Standard Production)</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <Lock size={15} className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>
                  This token will be displayed only once upon generation. Be sure to copy and store it securely in your CI/CD repository secrets.
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
                >
                  GENERATE TOKEN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reveal Newly Created Token */}
      {createdTokenDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 max-w-lg w-full font-sans shadow-md animate-in fade-in">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                  NEW SECRET PROVISIONED
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Developer Token Created
                </h3>
              </div>
              <button
                onClick={() => setCreatedTokenDetails(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Copy this secret now!</strong> You will not be able to view this full token again after closing this dialog.
                </span>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Full Developer Token
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={createdTokenDetails.fullToken}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 select-all outline-none"
                  />
                  <button
                    onClick={() => handleCopy(createdTokenDetails.fullToken, 'modal-key')}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                  >
                    {copiedKeyId === 'modal-key' ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedKeyId === 'modal-key' ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>TOKEN NAME: <strong className="text-slate-900 dark:text-white">{createdTokenDetails.name}</strong></div>
                <div>SCOPE: <strong className="text-sky-600 dark:text-sky-400">{createdTokenDetails.scope}</strong></div>
                <div>VALID UNTIL: <strong className="text-slate-900 dark:text-white">{createdTokenDetails.expiresAt}</strong></div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setCreatedTokenDetails(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
              >
                I HAVE SECURELY SAVED THIS TOKEN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
