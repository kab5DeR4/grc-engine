import { useState, useTransition } from 'react';
import { 
  Key, Fingerprint, Laptop, ShieldCheck, 
  Plus, Trash2, Globe, Clock, User, Mail, Building, CheckCircle2,
  X
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ROLE_DETAILS } from '../../data/demo/rbac';

export default function ProfileSettings() {
  const { currentUser, updateUserProfile, registerHardwareKey, removeHardwareKey, revokeSession } = useDemoStore();
  const roleDetail = ROLE_DETAILS[currentUser.role] || ROLE_DETAILS.PLATFORM_ADMIN;

  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    title: currentUser.title,
    department: currentUser.department,
    location: currentUser.location,
    timezone: currentUser.timezone,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState('YubiKey 5C NFC (FIDO2/WebAuthn)');
  const [isRegisteringKey, setIsRegisteringKey] = useState(false);
  const [, startTransition] = useTransition();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleRegisterKey = () => {
    if (!newKeyName.trim()) return;
    setIsRegisteringKey(true);

    // simulate webauthn hardware prompt delay fr
    setTimeout(() => {
      startTransition(() => {
        registerHardwareKey(newKeyName.trim(), newKeyType);
        setIsRegisteringKey(false);
        setShowKeyModal(false);
        setNewKeyName('');
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Profile Overview Card */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center"></div>
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                SOVEREIGN IDENTITY
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{currentUser.name}</h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>{currentUser.email}</span>
                <span>•</span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{currentUser.title}</span>
              </div>
            </div>
          </div>

          {/* Current Role Clearance Badge */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-right">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">ACTIVE RBAC CLEARANCE</div>
            <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mt-0.5">
              [{roleDetail.name.toUpperCase()}]
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">{roleDetail.clearanceLevel}</div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSaveProfile} className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <User size={15} className="absolute right-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Corporate Email (SSO / SAML)
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <Mail size={15} className="absolute right-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Official Title / Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <Building size={15} className="absolute right-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Security Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Geographic Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <Globe size={15} className="absolute right-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                Primary Timezone
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <Clock size={15} className="absolute right-3.5 top-3 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            {savedSuccess ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                <CheckCircle2 size={15} />
                <span>PROFILE CREDENTIALS SAVED & DIGEST REHASHED</span>
              </div>
            ) : (
              <div className="text-[11px] font-mono text-slate-500">
                Changes are cryptographically recorded to the immutable audit log.
              </div>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
            >
              SAVE PROFILE CHANGES
            </button>
          </div>
        </form>
      </div>

      {/* Hardware 2FA & WebAuthn Security Keys */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              MFA ENFORCEMENT PROTOCOL
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Hardware 2FA Security Keys & WebAuthn
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              FIPS 140-3 compliant hardware authenticators and WebAuthn passkeys required for all cryptographic scan signoffs and role mutation approvals.
            </p>
          </div>

          <button
            onClick={() => setShowKeyModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Plus size={14} />
            <span>REGISTER KEY</span>
          </button>
        </div>

        {/* List of Registered Keys */}
        <div className="space-y-3 pt-4">
          {currentUser.hardwareKeys.map((key) => (
            <div key={key.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-slate-200 dark:border-slate-700 text-sky-600 dark:text-sky-400 shrink-0">
                  <Fingerprint size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{key.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      {key.id}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{key.type}</div>
                  <div className="flex flex-wrap items-center gap-2 text-[10.5px] font-mono text-slate-500 mt-1">
                    <span>AAGUID: <code>{key.aaguid}</code></span>
                    <span>•</span>
                    <span>ALGO: <span className="text-sky-600 dark:text-sky-400">{key.algorithm}</span></span>
                    <span>•</span>
                    <span>LAST USED: {key.lastUsed}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <span className="text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck size={13} />
                  <span>FIPS 140-3 ACTIVE</span>
                </span>
                {currentUser.hardwareKeys.length > 1 && (
                  <button
                    onClick={() => removeHardwareKey(key.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-500/10 transition-colors"
                    title="Revoke Hardware Key"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Security Sessions */}
      <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
            DEVICE ACCESS CONTROL
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Active Cryptographic Sessions
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            All authenticated web sessions bound to ephemeral TLS 1.3 token exchanges.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          {currentUser.sessions.map((sess) => (
            <div key={sess.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 shrink-0">
                  <Laptop size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{sess.device}</span>
                    {sess.current && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                        THIS DEVICE
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    IP: {sess.ip} • STATUS: {sess.lastActive}
                  </div>
                </div>
              </div>

              {!sess.current && (
                <button
                  onClick={() => revokeSession(sess.id)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-rose-500 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono transition-colors cursor-pointer"
                >
                  TERMINATE
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Register New Hardware WebAuthn Key */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 max-w-lg w-full font-sans shadow-md animate-in fade-in">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                  WEBAUTHN ENROLLMENT
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Register Security Key
                </h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Security Key Nickname
                </label>
                <input
                  type="text"
                  placeholder="e.g. YubiKey 5Ci Backup Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase">
                  Authenticator Attestation Type
                </label>
                <select
                  value={newKeyType}
                  onChange={(e) => setNewKeyType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all cursor-pointer"
                >
                  <option value="YubiKey 5C NFC (FIDO2/WebAuthn)">YubiKey 5 Series (USB-C / NFC FIDO2)</option>
                  <option value="Apple Touch ID / Face ID Secure Enclave">Apple Touch ID / Secure Enclave</option>
                  <option value="Windows Hello Enterprise FIDO2">Windows Hello Enterprise Biometrics</option>
                  <option value="Google Titan Security Key (CTAP2)">Google Titan Security Key (CTAP2)</option>
                </select>
              </div>

              <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <Key size={16} className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span>
                  When you click <strong>Initiate Enrollment</strong>, your browser will prompt you to touch your hardware key or scan biometrics to generate an ECDSA P-256 keypair.
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                disabled={isRegisteringKey}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleRegisterKey}
                disabled={isRegisteringKey || !newKeyName.trim()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isRegisteringKey ? 'TOUCH SECURITY KEY NOW...' : 'INITIATE ENROLLMENT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
