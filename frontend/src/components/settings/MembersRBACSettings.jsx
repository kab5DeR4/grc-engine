import { useState } from 'react';
import { 
  Shield, Check, X, 
  UserPlus, Trash2, Fingerprint, Info 
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ROLES, ROLE_DETAILS, PERMISSION_MATRIX } from '../../data/demo/rbac';

export default function MembersRBACSettings() {
  const { 
    currentUser, 
    setCurrentUserRole, 
    members, 
    updateMemberRole, 
    removeMember, 
    inviteMember 
  } = useDemoStore();

  const isPlatformAdmin = currentUser.role === ROLES.PLATFORM_ADMIN;

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    title: '',
    role: ROLES.SECURITY_ENGINEER,
  });

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteData.name.trim() || !inviteData.email.trim()) return;

    inviteMember(inviteData);
    setShowInviteModal(false);
    setInviteData({
      name: '',
      email: '',
      title: '',
      role: ROLES.SECURITY_ENGINEER,
    });
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Live Persona Testbed Banner */}
      <div className="bg-[#1A1917] text-[#E7E3DA] p-6 hairline-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-700">
          <div>
            <div className="mono-label text-[#9B3418] text-[10px] flex items-center gap-1.5">
              <Shield size={13} />
              <span>LIVE RBAC PERSONA SIMULATOR</span>
            </div>
            <h2 className="serif-heading text-[26px] font-bold text-[#F5F3EF]">
              Active Role: <span className="text-[#9B3418]">{ROLE_DETAILS[currentUser.role]?.name}</span>
            </h2>
            <p className="text-[11.5px] text-[#A8A29E] mt-1 max-w-2xl">
              Switch personas below to test how GRC Engine enforces permissions across scans, remediation, evidence reading, PDF export, and API credentials in real time.
            </p>
          </div>

          <div className="mono-label text-[10px] text-[#A8A29E] bg-neutral-900 p-2 hairline-all self-start md:self-auto">
            CLEARANCE: <span className="text-[#E7E3DA]">{ROLE_DETAILS[currentUser.role]?.clearanceLevel}</span>
          </div>
        </div>

        {/* Persona Switcher Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          {Object.values(ROLE_DETAILS).map((role) => {
            const isActive = currentUser.role === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setCurrentUserRole(role.id)}
                className={`p-3 text-left hairline-all transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#9B3418] text-[#FFFFFF] border-[#9B3418] shadow-md'
                    : 'bg-neutral-900 text-[#E7E3DA] hover:bg-neutral-800 border-neutral-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="mono-label text-[10px] font-bold">[{role.shortLabel}]</span>
                  {isActive && <Check size={14} className="text-[#FFFFFF]" />}
                </div>
                <div className="font-serif text-[17px] font-bold">{role.name}</div>
                <div className="text-[10px] opacity-80 mt-1 line-clamp-2 leading-relaxed">
                  {role.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Official RBAC Matrix Matrix Table */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="pb-4 hairline-b flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="mono-label text-[#9B3418] text-[10px]">GOVERNANCE ENFORCEMENT TABLE</div>
            <h3 className="serif-heading text-[22px] font-bold text-[#1A1917]">
              Role-Based Access Control (RBAC) Matrix
            </h3>
          </div>
          <div className="mono-label text-[10px] text-[#6E6A61]">
            CURRENT PERSONA COLUMN HIGHLIGHTED
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left text-[11.5px] border-collapse">
            <thead>
              <tr className="bg-[#E7E3DA] hairline-b text-[#1A1917]">
                <th className="p-3 mono-label text-[10px] text-[#1A1917] font-bold min-w-[220px]">
                  FEATURE / AREA
                </th>
                <th className={`p-3 mono-label text-[10px] text-center min-w-[130px] ${currentUser.role === ROLES.PLATFORM_ADMIN ? 'bg-[#9B3418]/15 text-[#9B3418] font-bold' : 'text-[#1A1917]'}`}>
                  PLATFORM ADMIN
                </th>
                <th className={`p-3 mono-label text-[10px] text-center min-w-[130px] ${currentUser.role === ROLES.SECURITY_ENGINEER ? 'bg-[#9B3418]/15 text-[#9B3418] font-bold' : 'text-[#1A1917]'}`}>
                  SECURITY ENGINEER
                </th>
                <th className={`p-3 mono-label text-[10px] text-center min-w-[130px] ${currentUser.role === ROLES.EXTERNAL_AUDITOR ? 'bg-[#9B3418]/15 text-[#9B3418] font-bold' : 'text-[#1A1917]'}`}>
                  EXTERNAL AUDITOR
                </th>
                <th className={`p-3 mono-label text-[10px] text-center min-w-[130px] ${currentUser.role === ROLES.READ_ONLY_VIEWER ? 'bg-[#9B3418]/15 text-[#9B3418] font-bold' : 'text-[#1A1917]'}`}>
                  READ-ONLY VIEWER
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {PERMISSION_MATRIX.map((row) => (
                <tr key={row.key} className="bg-[#E7E3DA] hover:bg-[#DCD7CB]/40 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-[#1A1917] text-[12px]">{row.name}</div>
                    <div className="text-[10.5px] text-[#6E6A61] mt-0.5">{row.description}</div>
                  </td>

                  {/* Platform Admin Cell */}
                  <td className={`p-3 text-center ${currentUser.role === ROLES.PLATFORM_ADMIN ? 'bg-[#9B3418]/10' : ''}`}>
                    <span className="inline-flex items-center gap-1 mono-label text-[10px] px-2 py-0.5 bg-[#1A1917] text-[#E7E3DA]">
                      <Check size={12} className="text-[#E7E3DA]" />
                      <span>{row.permissions.PLATFORM_ADMIN.label}</span>
                    </span>
                  </td>

                  {/* Security Engineer Cell */}
                  <td className={`p-3 text-center ${currentUser.role === ROLES.SECURITY_ENGINEER ? 'bg-[#9B3418]/10' : ''}`}>
                    {row.permissions.SECURITY_ENGINEER.granted ? (
                      <span className="inline-flex items-center gap-1 mono-label text-[10px] px-2 py-0.5 bg-[#1A1917] text-[#E7E3DA]">
                        <Check size={12} className="text-[#E7E3DA]" />
                        <span>{row.permissions.SECURITY_ENGINEER.label}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 mono-label text-[10px] px-2 py-0.5 border border-[#9B3418] text-[#9B3418]">
                        <X size={12} />
                        <span>{row.permissions.SECURITY_ENGINEER.label}</span>
                      </span>
                    )}
                  </td>

                  {/* External Auditor Cell */}
                  <td className={`p-3 text-center ${currentUser.role === ROLES.EXTERNAL_AUDITOR ? 'bg-[#9B3418]/10' : ''}`}>
                    {row.permissions.EXTERNAL_AUDITOR.access === 'ALLOWED' ? (
                      <span className="inline-flex items-center gap-1 mono-label text-[10px] px-2 py-0.5 bg-[#1A1917] text-[#E7E3DA]">
                        <Check size={12} className="text-[#E7E3DA]" />
                        <span>{row.permissions.EXTERNAL_AUDITOR.label}</span>
                      </span>
                    ) : row.permissions.EXTERNAL_AUDITOR.access === 'READ_ONLY' ? (
                      <span className="inline-flex items-center gap-1 mono-label text-[10px] px-2 py-0.5 border border-[#1A1917] text-[#1A1917] bg-[#DCD7CB]">
                        <Check size={12} />
                        <span>{row.permissions.EXTERNAL_AUDITOR.label}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 mono-label text-[10px] px-2 py-0.5 border border-[#9B3418] text-[#9B3418]">
                        <X size={12} />
                        <span>{row.permissions.EXTERNAL_AUDITOR.label}</span>
                      </span>
                    )}
                  </td>

                  {/* Read-Only Viewer Cell */}
                  <td className={`p-3 text-center ${currentUser.role === ROLES.READ_ONLY_VIEWER ? 'bg-[#9B3418]/10' : ''}`}>
                    {row.permissions.READ_ONLY_VIEWER.access === 'READ_ONLY' ? (
                      <span className="inline-flex items-center gap-1 mono-label text-[10px] px-2 py-0.5 border border-[#1A1917] text-[#1A1917] bg-[#DCD7CB]">
                        <Check size={12} />
                        <span>{row.permissions.READ_ONLY_VIEWER.label}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 mono-label text-[10px] px-2 py-0.5 border border-[#9B3418] text-[#9B3418]">
                        <X size={12} />
                        <span>{row.permissions.READ_ONLY_VIEWER.label}</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workspace Members Table */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 hairline-b">
          <div>
            <div className="mono-label text-[#9B3418] text-[10px]">WORKSPACE ACCESS DIRECTORY</div>
            <h3 className="serif-heading text-[22px] font-bold text-[#1A1917]">
              Workspace Members & Role Assignments
            </h3>
            <p className="mono-body text-[11.5px] text-[#4A4741] mt-1">
              Active identity bindings evaluated by the GRC Engine attribute-based access control engine.
            </p>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            disabled={!isPlatformAdmin}
            className={`studio-btn text-[10px] py-1.5 px-3 flex items-center gap-1.5 uppercase shrink-0 ${
              isPlatformAdmin ? 'studio-btn-pigment' : 'opacity-50 cursor-not-allowed'
            }`}
            title={!isPlatformAdmin ? 'Requires Platform Admin role to invite members' : ''}
          >
            <UserPlus size={13} />
            <span>INVITE NEW MEMBER</span>
          </button>
        </div>

        {!isPlatformAdmin && (
          <div className="p-3 my-3 bg-[#E7E3DA] hairline-all text-[11px] text-[#4A4741] flex items-center gap-2">
            <Info size={14} className="text-[#9B3418]" />
            <span>
              Role modification and member provisioning is restricted to <strong>Platform Admins</strong>. Switch to Platform Admin in the persona bar above to edit member roles.
            </span>
          </div>
        )}

        {/* Members List */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-[11.5px] border-collapse">
            <thead>
              <tr className="bg-[#E7E3DA] hairline-b text-[#1A1917]">
                <th className="p-3 mono-label text-[10px]">MEMBER / IDENTITY</th>
                <th className="p-3 mono-label text-[10px]">ASSIGNED RBAC ROLE</th>
                <th className="p-3 mono-label text-[10px]">2FA POSTURE</th>
                <th className="p-3 mono-label text-[10px]">LAST ACTIVITY</th>
                <th className="p-3 mono-label text-[10px] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {members.map((mem) => {
                const isCurrent = mem.email === currentUser.email;
                return (
                  <tr key={mem.id} className="bg-[#E7E3DA] hover:bg-[#DCD7CB]/40 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={mem.avatar}
                          alt={mem.name}
                          className="w-8 h-8 hairline-all object-cover filter grayscale contrast-125 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1A1917] text-[12px]">{mem.name}</span>
                            {isCurrent && (
                              <span className="mono-label text-[8.5px] px-1 py-0.2 bg-[#9B3418] text-[#FFFFFF]">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-[10.5px] text-[#6E6A61]">{mem.email}</div>
                          <div className="text-[10px] text-[#4A4741] italic">{mem.title}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role selector dropdown */}
                    <td className="p-3">
                      {isPlatformAdmin && !isCurrent ? (
                        <select
                          value={mem.role}
                          onChange={(e) => updateMemberRole(mem.id, e.target.value)}
                          className="bg-[#DCD7CB] border border-[#1A1917] px-2 py-1 text-[11px] mono-label text-[#1A1917] outline-none"
                        >
                          <option value={ROLES.PLATFORM_ADMIN}>Platform Admin</option>
                          <option value={ROLES.SECURITY_ENGINEER}>Security Engineer</option>
                          <option value={ROLES.EXTERNAL_AUDITOR}>External Auditor</option>
                          <option value={ROLES.READ_ONLY_VIEWER}>Read-Only Viewer</option>
                        </select>
                      ) : (
                        <span className={`mono-label text-[10px] px-2 py-1 border ${ROLE_DETAILS[mem.role]?.badgeClass || ''}`}>
                          {ROLE_DETAILS[mem.role]?.name}
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <span className="mono-label text-[10px] text-[#1A1917] flex items-center gap-1">
                        <Fingerprint size={12} className="text-[#9B3418]" />
                        <span>{mem.mfaStatus}</span>
                      </span>
                    </td>

                    <td className="p-3 text-[11px] text-[#6E6A61]">
                      {mem.lastActive}
                    </td>

                    <td className="p-3 text-right">
                      {isPlatformAdmin && !isCurrent && (
                        <button
                          onClick={() => removeMember(mem.id)}
                          className="p-1.5 text-[#6E6A61] hover:text-[#9B3418] transition-colors"
                          title="Revoke Member Access"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Invite Member */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1917]/70 flex items-center justify-center p-4">
          <div className="bg-[#E7E3DA] p-6 md:p-8 hairline-all max-w-lg w-full font-mono shadow-2xl animate-in fade-in">
            <div className="flex justify-between items-start pb-4 hairline-b">
              <div>
                <div className="mono-label text-[#9B3418] text-[10px]">RBAC IDENTITY PROVISIONING</div>
                <h3 className="serif-heading text-[24px] font-bold text-[#1A1917]">
                  Invite Workspace Member
                </h3>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-[#6E6A61] hover:text-[#1A1917] text-[14px]"
              >
                [✕]
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="py-5 space-y-4">
              <div>
                <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jordan Hayes"
                  value={inviteData.name}
                  onChange={(e) => setInviteData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
              </div>

              <div>
                <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                  CORPORATE EMAIL (SSO BOUND)
                </label>
                <input
                  type="email"
                  placeholder="jordan.hayes@acmesystems.io"
                  value={inviteData.email}
                  onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
              </div>

              <div>
                <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                  JOB TITLE / DEPARTMENT
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Staff Auditor"
                  value={inviteData.title}
                  onChange={(e) => setInviteData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
              </div>

              <div>
                <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                  ASSIGNED RBAC ROLE
                </label>
                <select
                  value={inviteData.role}
                  onChange={(e) => setInviteData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                >
                  <option value={ROLES.SECURITY_ENGINEER}>Security Engineer (Run scans, trigger remediation)</option>
                  <option value={ROLES.EXTERNAL_AUDITOR}>External Auditor (Read evidence, export PDF)</option>
                  <option value={ROLES.READ_ONLY_VIEWER}>Read-Only Viewer (Posture dashboard observer)</option>
                  <option value={ROLES.PLATFORM_ADMIN}>Platform Admin (Full root access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 hairline-t">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="studio-btn text-[10px] py-1.5 px-3"
                >
                  [ CANCEL ]
                </button>
                <button
                  type="submit"
                  className="studio-btn-primary studio-btn text-[10px] py-1.5 px-4"
                >
                  [ DISPATCH INVITATION & AUDIT ]
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
