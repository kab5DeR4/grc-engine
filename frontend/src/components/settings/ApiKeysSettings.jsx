import { useState } from 'react';
import { 
  Key, Plus, Copy, Check, Lock, AlertTriangle, Terminal 
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
    <div className="space-y-8 font-mono">
      {/* RBAC Restriction Banner if not Platform Admin */}
      {!isPlatformAdmin && (
        <RbacPermissionBanner
          actionName="generating, viewing, or revoking developer API keys & tokens"
          requiredRole="PLATFORM ADMIN"
        />
      )}

      {/* Developer Tokens Header Card */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 hairline-b">
          <div>
            <div className="mono-label text-[#9B3418] text-[10px]">CI/CD AUTOMATION CREDENTIALS</div>
            <h2 className="serif-heading text-[26px] font-bold text-[#1A1917]">
              Developer Tokens & CI/CD Pipeline Scanning
            </h2>
            <p className="mono-body text-[11.5px] text-[#4A4741] mt-1 max-w-2xl">
              Scoped API credentials used by GitHub Actions, GitLab CI/CD runners, Jenkins pipelines, and Terraform drift controllers to continuously validate compliance.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            disabled={!isPlatformAdmin}
            className={`studio-btn text-[10px] py-1.5 px-3 flex items-center gap-1.5 uppercase shrink-0 ${
              isPlatformAdmin ? 'studio-btn-primary' : 'opacity-50 cursor-not-allowed'
            }`}
            title={!isPlatformAdmin ? 'Requires Platform Admin role to provision API tokens' : ''}
          >
            <Plus size={13} />
            <span>GENERATE DEVELOPER TOKEN</span>
          </button>
        </div>

        {/* Tokens List */}
        <div className="space-y-3 pt-4">
          {apiKeys.map((key) => {
            const isRevoked = key.status === 'REVOKED';
            return (
              <div
                key={key.id}
                className={`p-4 hairline-all flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors ${
                  isRevoked ? 'bg-[#E7E3DA]/60 opacity-60' : 'bg-[#E7E3DA]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#DCD7CB] hairline-all text-[#9B3418] shrink-0">
                    <Key size={18} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-[17px] font-bold text-[#1A1917]">{key.name}</span>
                      <span className={`mono-label text-[9px] px-1.5 py-0.5 ${
                        isRevoked ? 'bg-[#6E6A61] text-[#FFFFFF]' : 'bg-[#1A1917] text-[#E7E3DA]'
                      }`}>
                        {key.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-[11px] bg-[#DCD7CB] px-2 py-0.5 hairline-all text-[#1A1917]">
                        {key.maskedToken}
                      </code>
                      <button
                        onClick={() => handleCopy(key.maskedToken, key.id)}
                        className="text-[#6E6A61] hover:text-[#9B3418] p-1 text-[10px] mono-label flex items-center gap-1"
                        title="Copy Prefix"
                      >
                        {copiedKeyId === key.id ? <Check size={12} className="text-[#9B3418]" /> : <Copy size={12} />}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#6E6A61] mt-2">
                      <span>SCOPE: <span className="text-[#9B3418] font-semibold">{key.scope}</span></span>
                      <span>•</span>
                      <span>CREATED: {key.createdAt}</span>
                      <span>•</span>
                      <span>EXPIRES: {key.expiresAt}</span>
                      <span>•</span>
                      <span>LAST USED: <span className="text-[#1A1917]">{key.lastUsed}</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  {!isRevoked && isPlatformAdmin && (
                    <button
                      onClick={() => revokeApiKey(key.id)}
                      className="studio-btn text-[9.5px] py-1 px-2.5 text-[#9B3418] hover:border-[#9B3418]"
                    >
                      [ REVOKE TOKEN ]
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CI/CD Integration Guide Snippet Box */}
      <div className="bg-[#1A1917] text-[#E7E3DA] p-6 hairline-all">
        <div className="pb-3 border-b border-neutral-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-[#9B3418]" />
            <span className="mono-label text-[11px] text-[#E7E3DA] font-bold">
              CI/CD PIPELINE INTEGRATION SNIPPET (GITHUB ACTIONS)
            </span>
          </div>
          <span className="mono-label text-[9.5px] text-[#A8A29E]">POSIX / YAML</span>
        </div>

        <div className="pt-4 text-[11.5px] leading-relaxed text-[#D1CCC0]">
          <pre className="overflow-x-auto bg-neutral-900 p-4 hairline-all text-[#E7E3DA] font-mono">
{`- name: GRC Policy Gate Check
  uses: atelier-grc/policy-action@v2
  with:
    grc-token: \${{ secrets.GRC_DEVELOPER_TOKEN }}
    workspace-id: "${useDemoStore.getState().workspaceSettings.organizationId}"
    fail-on-drift: true
    min-compliance-score: 95`}
          </pre>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center text-[10.5px] text-[#A8A29E]">
          <span>Passes ephemeral bearer token via TLS 1.3 to backend engine.</span>
          <span className="text-[#9B3418]">FIPS 140-3 HSM VERIFIED</span>
        </div>
      </div>

      {/* Modal: Generate Developer Token */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1917]/70 flex items-center justify-center p-4">
          <div className="bg-[#E7E3DA] p-6 md:p-8 hairline-all max-w-lg w-full font-mono shadow-2xl animate-in fade-in">
            <div className="flex justify-between items-start pb-4 hairline-b">
              <div>
                <div className="mono-label text-[#9B3418] text-[10px]">DEVELOPER CREDENTIAL CREATOR</div>
                <h3 className="serif-heading text-[24px] font-bold text-[#1A1917]">
                  Generate Developer Token
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#6E6A61] hover:text-[#1A1917] text-[14px]"
              >
                [✕]
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="py-5 space-y-4">
              <div>
                <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                  TOKEN NAME / IDENTIFIER
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jenkins Staging Drift Gate"
                  value={keyFormData.name}
                  onChange={(e) => setKeyFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
              </div>

              <div>
                <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                  CREDENTIAL SCOPE & ACCESS CAPABILITIES
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
                  className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                >
                  <option value="SCAN_PIPELINE">CI/CD Pipeline Scanning (Read-Only Controls & Drifts)</option>
                  <option value="SCAN_AND_REMEDIATE">Full Scan & Remediation Trigger</option>
                  <option value="INGEST_TELEMETRY">Telemetry Ingest Only (Agent Daemon)</option>
                </select>
              </div>

              <div>
                <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                  EXPIRATION WINDOW
                </label>
                <select
                  value={keyFormData.expiresDays}
                  onChange={(e) => setKeyFormData(prev => ({ ...prev, expiresDays: Number(e.target.value) }))}
                  className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                >
                  <option value={30}>30 Days (Ephemeral Project)</option>
                  <option value={90}>90 Days (Quarterly Rotation Standard)</option>
                  <option value={365}>1 Year (Standard Production)</option>
                </select>
              </div>

              <div className="p-3 bg-[#DCD7CB] hairline-all text-[11px] text-[#4A4741] flex items-start gap-2">
                <Lock size={15} className="text-[#9B3418] shrink-0 mt-0.5" />
                <span>
                  This token will be displayed only once upon generation. Be sure to copy and store it securely in your CI/CD repository secrets.
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-4 hairline-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="studio-btn text-[10px] py-1.5 px-3"
                >
                  [ CANCEL ]
                </button>
                <button
                  type="submit"
                  className="studio-btn-primary studio-btn text-[10px] py-1.5 px-4"
                >
                  [ GENERATE TOKEN & LOG AUDIT ]
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reveal Newly Created Token */}
      {createdTokenDetails && (
        <div className="fixed inset-0 z-50 bg-[#1A1917]/70 flex items-center justify-center p-4">
          <div className="bg-[#E7E3DA] p-6 md:p-8 hairline-all max-w-lg w-full font-mono shadow-2xl animate-in fade-in">
            <div className="flex justify-between items-start pb-4 hairline-b">
              <div>
                <div className="mono-label text-[#9B3418] text-[10px]">NEW SECRET PROVISIONED</div>
                <h3 className="serif-heading text-[24px] font-bold text-[#1A1917]">
                  Developer Token Created
                </h3>
              </div>
              <button
                onClick={() => setCreatedTokenDetails(null)}
                className="text-[#6E6A61] hover:text-[#1A1917] text-[14px]"
              >
                [✕]
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="p-3 bg-[#9B3418]/10 border border-[#9B3418] text-[11px] text-[#1A1917] flex items-start gap-2">
                <AlertTriangle size={16} className="text-[#9B3418] shrink-0 mt-0.5" />
                <span>
                  <strong>Copy this secret now!</strong> You will not be able to view this full token again after closing this dialog.
                </span>
              </div>

              <div>
                <label className="mono-label text-[10px] text-[#6E6A61] block mb-1">
                  FULL DEVELOPER TOKEN
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={createdTokenDetails.fullToken}
                    className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] font-mono text-[#1A1917] select-all outline-none"
                  />
                  <button
                    onClick={() => handleCopy(createdTokenDetails.fullToken, 'modal-key')}
                    className="studio-btn-primary studio-btn text-[10px] py-2 px-3 flex items-center gap-1 shrink-0"
                  >
                    {copiedKeyId === 'modal-key' ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedKeyId === 'modal-key' ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>

              <div className="text-[10.5px] text-[#4A4741] space-y-1">
                <div>TOKEN NAME: <strong className="text-[#1A1917]">{createdTokenDetails.name}</strong></div>
                <div>SCOPE: <strong className="text-[#9B3418]">{createdTokenDetails.scope}</strong></div>
                <div>VALID UNTIL: <strong className="text-[#1A1917]">{createdTokenDetails.expiresAt}</strong></div>
              </div>
            </div>

            <div className="flex justify-end pt-4 hairline-t">
              <button
                onClick={() => setCreatedTokenDetails(null)}
                className="studio-btn-primary studio-btn text-[10px] py-1.5 px-4"
              >
                [ I HAVE SECURELY SAVED THIS TOKEN ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
