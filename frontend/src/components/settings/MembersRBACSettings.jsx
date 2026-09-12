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
    <div className="space-y-6 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Live Persona Testbed Banner */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-xl border border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Shield size={13} />
              <span>LIVE RBAC PERSONA SIMULATOR</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Active Role: <span className="text-sky-400">{ROLE_DETAILS[currentUser.role]?.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Switch personas below to test how GRC Engine enforces permissions across scans, remediation, evidence reading, PDF export, and API credentials in real time.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 self-start md:self-auto">
            CLEARANCE: <span className="text-white font-bold">{ROLE_DETAILS[currentUser.role]?.clearanceLevel}</span>
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
                className={`p-3.5 text-left rounded-xl transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-md'
                    : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">[{role.shortLabel}]</span>
                  {isActive && <Check size={14} className="text-slate-950 font-bold" />}
                </div>
                <div className="text-sm font-bold">{role.name}</div>
                <div className="text-xs opacity-75 mt-1 line-clamp-2 leading-relaxed">
                  {role.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Official RBAC Matrix Matrix Table */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              GOVERNANCE ENFORCEMENT TABLE
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Role-Based Access Control (RBAC) Matrix
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-500">
            CURRENT PERSONA COLUMN HIGHLIGHTED
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                <th className="p-3 font-bold min-w-[220px]">
                  FEATURE / CAPABILITY
                </th>
                <th className={`p-3 text-center min-w-[130px] ${currentUser.role === ROLES.PLATFORM_ADMIN ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold' : ''}`}>
                  PLATFORM ADMIN
                </th>
                <th className={`p-3 text-center min-w-[130px] ${currentUser.role === ROLES.SECURITY_ENGINEER ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold' : ''}`}>
                  SECURITY ENGINEER
                </th>
                <th className={`p-3 text-center min-w-[130px] ${currentUser.role === ROLES.EXTERNAL_AUDITOR ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold' : ''}`}>
                  EXTERNAL AUDITOR
                </th>
                <th className={`p-3 text-center min-w-[130px] ${currentUser.role === ROLES.READ_ONLY_VIEWER ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold' : ''}`}>
                  READ-ONLY VIEWER
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {PERMISSION_MATRIX.map((row) => (
                <tr key={row.key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{row.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{row.description}</div>
                  </td>

                  {/* Platform Admin Cell */}
                  <td className={`p-3 text-center ${currentUser.role === ROLES.PLATFORM_ADMIN ? 'bg-sky-500/5 font-semibold' : ''}`}>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      <Check size={11} />
                      <span>{row.permissions.PLATFORM_ADMIN.label}</span>
                    </span>
                  </td>

                  {/* Security Engineer Cell */}
                  <td className={`p-3 text-center ${currentUser.role === ROLES.SECURITY_ENGINEER ? 'bg-sky-500/5 font-semibold' : ''}`}>
                    {row.permissions.SECURITY_ENGINEER.granted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                        <Check size={11} />
                        <span>{row.permissions.SECURITY_ENGINEER.label}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 font-semibold">
                        <X size={11} />
                        <span>{row.permissions.SECURITY_ENGINEER.label}</span>
                      </span>
                    )}
                  </td>

                  {/* External Auditor Cell */}
                  <td className={`p-3 text-center ${currentUser.role === ROLES.EXTERNAL_AUDITOR ? 'bg-sky-500/5 font-semibold' : ''}`}>
                    {row.permissions.EXTERNAL_AUDITOR.access === 'ALLOWED' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                        <Check size={11} />
                        <span>{row.permissions.EXTERNAL_AUDITOR.label}</span>
                      </span>
                    ) : row.permissions.EXTERNAL_AUDITOR.access === 'READ_ONLY' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-semibold">
                        <Check size={11} />
                        <span>{row.permissions.EXTERNAL_AUDITOR.label}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 font-semibold">
                        <X size={11} />
                        <span>{row.permissions.EXTERNAL_AUDITOR.label}</span>
                      </span>
                    )}
                  </td>

                  {/* Read-Only Viewer Cell */}
                  <td className={`p-3 text-center ${currentUser.role === ROLES.READ_ONLY_VIEWER ? 'bg-sky-500/5 font-semibold' : ''}`}>
                    {row.permissions.READ_ONLY_VIEWER.access === 'READ_ONLY' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-semibold">
                        <Check size={11} />
                        <span>{row.permissions.READ_ONLY_VIEWER.label}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 font-semibold">
                        <X size={11} />
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
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              WORKSPACE ACCESS DIRECTORY
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Workspace Members & Role Assignments
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Active identity bindings evaluated by the GRC Engine attribute-based access control engine.
            </p>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            disabled={!isPlatformAdmin}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer ${
              isPlatformAdmin 
                ? 'bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950' 
                : 'opacity-50 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-500'
            }`}
            title={!isPlatformAdmin ? 'Requires Platform Admin role to invite members' : ''}
          >
            <UserPlus size={14} />
            <span>INVITE MEMBER</span>
          </button>
        </div>

        {!isPlatformAdmin && (
          <div className="p-3 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <Info size={15} className="text-sky-500 shrink-0" />
            <span>
              Role modification and member provisioning is restricted to <strong>Platform Admins</strong>. Switch to Platform Admin in the persona simulator bar above to edit member roles.
            </span>
          </div>
        )}

        {/* Members List */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                <th className="p-3">MEMBER / IDENTITY</th>
                <th className="p-3">ASSIGNED RBAC ROLE</th>
                <th className="p-3">2FA POSTURE</th>
                <th className="p-3">LAST ACTIVITY</th>
                <th className="p-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {members.map((mem) => {
                const isCurrent = mem.email === currentUser.email;
                return (
                  <tr key={mem.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={mem.avatar}
                          alt={mem.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-xs">{mem.name}</span>
                            {isCurrent && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-500 text-white font-bold">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">{mem.email}</div>
                          <div className="text-[10.5px] text-slate-400 italic">{mem.title}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role selector dropdown */}
                    <td className="p-3">
                      {isPlatformAdmin && !isCurrent ? (
                        <select
                          value={mem.role}
                          onChange={(e) => updateMemberRole(mem.id, e.target.value)}
                          className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none"
                        >
                          <option value={ROLES.PLATFORM_ADMIN}>Platform Admin</option>
                          <option value={ROLES.SECURITY_ENGINEER}>Security Engineer</option>
                          <option value={ROLES.EXTERNAL_AUDITOR}>External Auditor</option>
                          <option value={ROLES.READ_ONLY_VIEWER}>Read-Only Viewer</option>
                        </select>
                      ) : (
                        <span className={`text-[10.5px] font-mono px-2 py-0.5 rounded-full border ${ROLE_DETAILS[mem.role]?.badgeClass || ''}`}>
                          {ROLE_DETAILS[mem.role]?.name}
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Fingerprint size={13} className="text-sky-500" />
                        <span>{mem.mfaStatus}</span>
                      </span>
                    </td>

                    <td className="p-3 text-[11px] text-slate-500 font-mono">
                      {mem.lastActive}
                    </td>

                    <td className="p-3 text-right">
                      {isPlatformAdmin && !isCurrent && (
                        <button
                          onClick={() => removeMember(mem.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-500/10 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 max-w-lg w-full font-sans shadow-md animate-in fade-in">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                  RBAC IDENTITY PROVISIONING
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Invite Workspace Member
                </h3>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="py-5 space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jordan Hayes"
                  value={inviteData.name}
                  onChange={(e) => setInviteData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Corporate Email (SSO Bound)
                </label>
                <input
                  type="email"
                  placeholder="jordan.hayes@acmesystems.io"
                  value={inviteData.email}
                  onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Job Title / Department
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Staff Auditor"
                  value={inviteData.title}
                  onChange={(e) => setInviteData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Assigned RBAC Role
                </label>
                <select
                  value={inviteData.role}
                  onChange={(e) => setInviteData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
                >
                  <option value={ROLES.SECURITY_ENGINEER}>Security Engineer (Run scans, trigger remediation)</option>
                  <option value={ROLES.EXTERNAL_AUDITOR}>External Auditor (Read evidence, export PDF)</option>
                  <option value={ROLES.READ_ONLY_VIEWER}>Read-Only Viewer (Posture dashboard observer)</option>
                  <option value={ROLES.PLATFORM_ADMIN}>Platform Admin (Full root access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
                >
                  DISPATCH INVITATION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
