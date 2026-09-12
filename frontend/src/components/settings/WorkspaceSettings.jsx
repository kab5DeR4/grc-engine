import { useState } from 'react';
import { 
  Building2, Globe, Layers, Lock, 
  CheckCircle2, Activity, Cloud, Server, Shield
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export default function WorkspaceSettings() {
  const { workspaceSettings, updateWorkspaceSettings, toggleRegulatoryTarget } = useDemoStore();

  const [formData, setFormData] = useState({
    organizationName: workspaceSettings.organizationName,
    primaryDomain: workspaceSettings.primaryDomain,
    workspaceSlug: workspaceSettings.workspaceSlug,
    environmentTier: workspaceSettings.environmentTier,
    complianceOfficer: workspaceSettings.complianceOfficer,
    dataResidency: workspaceSettings.dataResidency,
    autoScanIntervalHours: workspaceSettings.autoScanIntervalHours,
    enforceMfaForAllMembers: workspaceSettings.enforceMfaForAllMembers,
    strictSessionTimeoutMinutes: workspaceSettings.strictSessionTimeoutMinutes,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveWorkspace = (e) => {
    e.preventDefault();
    updateWorkspaceSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Organization & Workspace Identity */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            ORGANIZATIONAL PROFILE & BOUNDARIES
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            Workspace & Multi-Tenancy Architecture
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Global root identity and regulatory boundary configuration governing all telemetry streams, evidence vaults, and compliance evaluations.
          </p>
        </div>

        <form onSubmit={handleSaveWorkspace} className="pt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Organization Legal Entity
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <Building2 size={15} className="absolute right-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Primary Verified Domain
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.primaryDomain}
                  onChange={(e) => handleInputChange('primaryDomain', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <Globe size={15} className="absolute right-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Workspace Slug (URL Identifier)
              </label>
              <input
                type="text"
                value={formData.workspaceSlug}
                onChange={(e) => handleInputChange('workspaceSlug', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Chief Compliance Officer (SSO Mapping)
              </label>
              <input
                type="email"
                value={formData.complianceOfficer}
                onChange={(e) => handleInputChange('complianceOfficer', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Sovereign Data Residency & HSM Core
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.dataResidency}
                  onChange={(e) => handleInputChange('dataResidency', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <Lock size={15} className="absolute right-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Environment Clearance Tier
              </label>
              <select
                value={formData.environmentTier}
                onChange={(e) => handleInputChange('environmentTier', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
              >
                <option value="Production Sovereign (FedRAMP High & SOC2)">Production Sovereign (FedRAMP High & SOC2)</option>
                <option value="Staging Isolated Sandbox">Staging Isolated Sandbox</option>
                <option value="Disaster Recovery Mirror">Disaster Recovery Mirror</option>
              </select>
            </div>
          </div>

          {/* Security Policy Settings Checkboxes */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
              <input
                type="checkbox"
                id="enforceMfa"
                checked={formData.enforceMfaForAllMembers}
                onChange={(e) => handleInputChange('enforceMfaForAllMembers', e.target.checked)}
                className="mt-1 cursor-pointer accent-sky-500"
              />
              <label htmlFor="enforceMfa" className="cursor-pointer">
                <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  MANDATORY HARDWARE MFA FOR ALL USERS
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Denies workspace login unless user has verified a FIDO2/WebAuthn physical key or TOTP authenticator.
                </div>
              </label>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--surface)] border border-slate-200 dark:border-slate-700 text-sky-600 dark:text-sky-400 shrink-0">
                <Activity size={16} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  AUTOMATED DRIFT SCAN CADENCE
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <select
                    value={formData.autoScanIntervalHours}
                    onChange={(e) => handleInputChange('autoScanIntervalHours', Number(e.target.value))}
                    className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-900 dark:text-slate-100 outline-none"
                  >
                    <option value={1}>Every 1 Hour (Continuous)</option>
                    <option value={6}>Every 6 Hours (Recommended)</option>
                    <option value={12}>Every 12 Hours</option>
                    <option value={24}>Every 24 Hours</option>
                  </select>
                  <span className="text-xs text-slate-500 font-mono">KMS Proofs Refresh</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            {savedSuccess ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                <CheckCircle2 size={15} />
                <span>WORKSPACE METRICS UPDATED & SIGNED</span>
              </div>
            ) : (
              <div className="text-[11px] font-mono text-slate-500">
                ORGANIZATION ID: <span className="text-slate-900 dark:text-white font-bold">{workspaceSettings.organizationId}</span>
              </div>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
            >
              SAVE WORKSPACE CONFIG
            </button>
          </div>
        </form>
      </div>

      {/* Regulatory Targets Framework Matrix */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              COMPLIANCE TARGET SPECIFICATIONS
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Regulatory Targets & Compliance Baselines
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Enable or disable regulatory frameworks evaluated against your telemetry posture. Disabled targets will be excluded from automated PDF attestations and drift scorecards.
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
            {workspaceSettings.regulatoryTargets.filter(t => t.enabled).length} OF {workspaceSettings.regulatoryTargets.length} ACTIVE
          </span>
        </div>

        {/* Regulatory Target Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {workspaceSettings.regulatoryTargets.map((target) => (
            <div
              key={target.id}
              className={`p-4 rounded-xl border transition-all ${
                target.enabled 
                  ? 'bg-[var(--surface)] border-sky-500/50 shadow-xs ring-1 ring-sky-500/20' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 dark:text-white">{target.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      {target.id}
                    </span>
                  </div>
                  <div className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">{target.category}</div>
                </div>

                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleRegulatoryTarget(target.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    target.enabled
                      ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {target.enabled ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 leading-relaxed font-sans">
                {target.scope}
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
                <span className="text-slate-500">TARGET SCORE:</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">{target.targetScore}% PASS</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Cloud Accounts & Infrastructure */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div>
            <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              CONNECTED BOUNDARIES
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Multi-Cloud Infrastructure Scopes
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            <Shield size={13} />
            <span>FIPS 140-3 HSM ACTIVE</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-slate-200 dark:border-slate-700 text-sky-600 dark:text-sky-400 shrink-0">
              <Cloud size={18} />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">AWS PRODUCTION</div>
              <div className="text-[11px] text-slate-500 mt-0.5">us-east-1 / ap-south-1</div>
              <div className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold mt-1">KMS ROTATION: PASS</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 shrink-0">
              <Server size={18} />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">KUBERNETES EKS</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Cluster Prod-01 (v1.29)</div>
              <div className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold mt-1">ADMISSION: PASS</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 shrink-0">
              <Layers size={18} />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">GITHUB ENTERPRISE</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Org: acme-grc-engine</div>
              <div className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold mt-1">PROTECTIONS: PASS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
