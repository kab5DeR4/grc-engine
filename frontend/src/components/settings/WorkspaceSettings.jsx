import { useState } from 'react';
import { 
  Building2, Globe, ShieldCheck, Layers, Lock, 
  CheckCircle2, Sliders, Check, Activity, Cloud, Server 
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
    <div className="space-y-8 font-mono">
      {/* Organization & Workspace Identity */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="pb-4 hairline-b">
          <div className="mono-label text-[#9B3418] text-[10px]">ORGANIZATIONAL PROFILE</div>
          <h2 className="serif-heading text-[26px] font-bold text-[#1A1917]">
            Workspace & Multi-Tenancy Architecture
          </h2>
          <p className="mono-body text-[11.5px] text-[#4A4741] mt-1">
            Global root identity and regulatory boundary configuration governing all telemetry streams, evidence vaults, and compliance evaluations.
          </p>
        </div>

        <form onSubmit={handleSaveWorkspace} className="pt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                ORGANIZATION LEGAL ENTITY
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
                <Building2 size={14} className="absolute right-3 top-3 text-[#6E6A61]" />
              </div>
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                PRIMARY VERIFIED DOMAIN
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.primaryDomain}
                  onChange={(e) => handleInputChange('primaryDomain', e.target.value)}
                  className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
                <Globe size={14} className="absolute right-3 top-3 text-[#6E6A61]" />
              </div>
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                WORKSPACE SLUG (URL IDENTIFIER)
              </label>
              <input
                type="text"
                value={formData.workspaceSlug}
                onChange={(e) => handleInputChange('workspaceSlug', e.target.value)}
                className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
              />
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                CHIEF COMPLIANCE OFFICER (SSO MAPPING)
              </label>
              <input
                type="email"
                value={formData.complianceOfficer}
                onChange={(e) => handleInputChange('complianceOfficer', e.target.value)}
                className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
              />
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                SOVEREIGN DATA RESIDENCY & HSM CORE
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.dataResidency}
                  onChange={(e) => handleInputChange('dataResidency', e.target.value)}
                  className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
                <Lock size={14} className="absolute right-3 top-3 text-[#6E6A61]" />
              </div>
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                ENVIRONMENT CLEARANCE TIER
              </label>
              <select
                value={formData.environmentTier}
                onChange={(e) => handleInputChange('environmentTier', e.target.value)}
                className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
              >
                <option value="Production Sovereign (FedRAMP High & SOC2)">Production Sovereign (FedRAMP High & SOC2)</option>
                <option value="Staging Isolated Sandbox">Staging Isolated Sandbox</option>
                <option value="Disaster Recovery Mirror">Disaster Recovery Mirror</option>
              </select>
            </div>
          </div>

          {/* Security Policy Settings Checkboxes */}
          <div className="pt-4 hairline-t grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#E7E3DA] hairline-all flex items-start gap-3">
              <input
                type="checkbox"
                id="enforceMfa"
                checked={formData.enforceMfaForAllMembers}
                onChange={(e) => handleInputChange('enforceMfaForAllMembers', e.target.checked)}
                className="mt-1 cursor-pointer accent-[#9B3418]"
              />
              <label htmlFor="enforceMfa" className="cursor-pointer">
                <div className="mono-label text-[11px] text-[#1A1917] font-bold">
                  MANDATORY HARDWARE MFA FOR ALL USERS
                </div>
                <div className="text-[10.5px] text-[#4A4741] mt-0.5">
                  Denies workspace login unless user has verified a FIDO2/WebAuthn physical key or TOTP authenticator.
                </div>
              </label>
            </div>

            <div className="p-4 bg-[#E7E3DA] hairline-all flex items-start gap-3">
              <div className="p-1 bg-[#DCD7CB] hairline-all text-[#9B3418]">
                <Activity size={16} />
              </div>
              <div className="flex-1">
                <div className="mono-label text-[11px] text-[#1A1917] font-bold">
                  AUTOMATED DRIFT SCAN CADENCE
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <select
                    value={formData.autoScanIntervalHours}
                    onChange={(e) => handleInputChange('autoScanIntervalHours', Number(e.target.value))}
                    className="bg-[#DCD7CB] border border-[#1A1917] px-2 py-1 text-[11px] text-[#1A1917] outline-none"
                  >
                    <option value={1}>Every 1 Hour (Continuous)</option>
                    <option value={6}>Every 6 Hours (Recommended)</option>
                    <option value={12}>Every 12 Hours</option>
                    <option value={24}>Every 24 Hours</option>
                  </select>
                  <span className="text-[10px] text-[#6E6A61]">KMS Proofs Refresh</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 hairline-t">
            {savedSuccess ? (
              <div className="flex items-center gap-2 text-[#9B3418] text-[11px] mono-label">
                <CheckCircle2 size={15} />
                <span>WORKSPACE METRICS UPDATED & SIGNED</span>
              </div>
            ) : (
              <div className="text-[10px] text-[#6E6A61] mono-label">
                ORGANIZATION ID: <span className="text-[#1A1917] font-bold">{workspaceSettings.organizationId}</span>
              </div>
            )}
            <button
              type="submit"
              className="studio-btn-primary studio-btn text-[10.5px] py-1.5 px-4 uppercase"
            >
              [ SAVE WORKSPACE CONFIG ]
            </button>
          </div>
        </form>
      </div>

      {/* Regulatory Targets Framework Matrix */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 hairline-b">
          <div>
            <div className="mono-label text-[#9B3418] text-[10px]">COMPLIANCE TARGET SPECIFICATIONS</div>
            <h3 className="serif-heading text-[22px] font-bold text-[#1A1917]">
              Regulatory Targets & Compliance Baselines
            </h3>
            <p className="mono-body text-[11.5px] text-[#4A4741] mt-1 max-w-2xl">
              Enable or disable regulatory frameworks evaluated against your telemetry posture. Disabled targets will be excluded from automated PDF attestations and drift scorecards.
            </p>
          </div>

          <span className="mono-label text-[10px] text-[#1A1917] px-2.5 py-1 bg-[#E7E3DA] hairline-all self-start sm:self-auto">
            {workspaceSettings.regulatoryTargets.filter(t => t.enabled).length} OF {workspaceSettings.regulatoryTargets.length} ACTIVE
          </span>
        </div>

        {/* Regulatory Target Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {workspaceSettings.regulatoryTargets.map((target) => (
            <div
              key={target.id}
              className={`p-4 hairline-all transition-colors ${
                target.enabled ? 'bg-[#E7E3DA] border-l-4 border-l-[#9B3418]' : 'bg-[#E7E3DA]/60 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-[18px] font-bold text-[#1A1917]">{target.name}</span>
                    <span className="mono-label text-[9px] px-1.5 py-0.5 bg-[#DCD7CB] text-[#9B3418]">
                      {target.id}
                    </span>
                  </div>
                  <div className="mono-label text-[9.5px] text-[#6E6A61] mt-0.5">{target.category}</div>
                </div>

                {/* Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleRegulatoryTarget(target.id)}
                  className={`mono-label text-[10px] px-2.5 py-1 border transition-colors cursor-pointer ${
                    target.enabled
                      ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917]'
                      : 'bg-transparent text-[#6E6A61] border-[#6E6A61]'
                  }`}
                >
                  {target.enabled ? '[ ENABLED ]' : '[ DISABLED ]'}
                </button>
              </div>

              <div className="mono-body text-[11px] text-[#4A4741] mt-2 bg-[#DCD7CB] p-2.5 hairline-all">
                {target.scope}
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 hairline-t text-[10px] mono-label">
                <span className="text-[#6E6A61]">TARGET MIN SCORE:</span>
                <span className="text-[#9B3418] font-bold">{target.targetScore}% PASS</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Cloud Accounts & Infrastructure */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="pb-4 hairline-b flex justify-between items-center">
          <div>
            <div className="mono-label text-[#9B3418] text-[10px]">CONNECTED BOUNDARIES</div>
            <h3 className="serif-heading text-[22px] font-bold text-[#1A1917]">
              Multi-Cloud Infrastructure Scopes
            </h3>
          </div>
          <span className="mono-label text-[10px] text-[#9B3418]">FIPS 140-3 HSM ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-[#E7E3DA] hairline-all flex items-start gap-3">
            <div className="p-2 bg-[#DCD7CB] hairline-all text-[#9B3418]">
              <Cloud size={18} />
            </div>
            <div>
              <div className="mono-label text-[11px] font-bold text-[#1A1917]">AWS PRODUCTION</div>
              <div className="text-[10px] text-[#6E6A61] mt-0.5">us-east-1 / ap-south-1</div>
              <div className="text-[9.5px] text-[#9B3418] mt-1 mono-label">KMS ROOT ROTATION: PASS</div>
            </div>
          </div>

          <div className="p-4 bg-[#E7E3DA] hairline-all flex items-start gap-3">
            <div className="p-2 bg-[#DCD7CB] hairline-all text-[#1A1917]">
              <Server size={18} />
            </div>
            <div>
              <div className="mono-label text-[11px] font-bold text-[#1A1917]">KUBERNETES EKS</div>
              <div className="text-[10px] text-[#6E6A61] mt-0.5">Cluster Prod-01 (v1.29)</div>
              <div className="text-[9.5px] text-[#9B3418] mt-1 mono-label">ADMISSION CONTROLLER: PASS</div>
            </div>
          </div>

          <div className="p-4 bg-[#E7E3DA] hairline-all flex items-start gap-3">
            <div className="p-2 bg-[#DCD7CB] hairline-all text-[#1A1917]">
              <Layers size={18} />
            </div>
            <div>
              <div className="mono-label text-[11px] font-bold text-[#1A1917]">GITHUB ENTERPRISE</div>
              <div className="text-[10px] text-[#6E6A61] mt-0.5">Org: acme-grc-engine</div>
              <div className="text-[9.5px] text-[#9B3418] mt-1 mono-label">BRANCH PROTECTIONS: PASS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
