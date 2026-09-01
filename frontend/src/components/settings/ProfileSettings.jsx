import { useState, useTransition } from 'react';
import { 
  Key, Fingerprint, Laptop, ShieldCheck, 
  Plus, Trash2, Globe, Clock, User, Mail, Building, CheckCircle2 
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
    }, 1200);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Profile Overview Card */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 hairline-b">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 hairline-all object-cover filter grayscale contrast-125"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#9B3418] hairline-all flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#FFFFFF]"></div>
              </div>
            </div>
            <div>
              <div className="mono-label text-[#9B3418] text-[10px]">SOVEREIGN IDENTITY</div>
              <h2 className="serif-heading text-[26px] font-bold text-[#1A1917]">{currentUser.name}</h2>
              <div className="flex items-center gap-2 text-[11px] text-[#4A4741] mt-0.5">
                <span>{currentUser.email}</span>
                <span>•</span>
                <span className="text-[#1A1917] font-semibold">{currentUser.title}</span>
              </div>
            </div>
          </div>

          {/* Current Role Clearance Badge */}
          <div className="p-3 bg-[#E7E3DA] hairline-all text-right">
            <div className="mono-label text-[9.5px] text-[#6E6A61]">ACTIVE RBAC CLEARANCE</div>
            <div className="mono-label text-[12px] text-[#9B3418] font-bold mt-0.5">
              [{roleDetail.name.toUpperCase()}]
            </div>
            <div className="text-[9px] text-[#6E6A61] mt-0.5">{roleDetail.clearanceLevel}</div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleSaveProfile} className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                FULL NAME
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
                <User size={14} className="absolute right-3 top-3 text-[#6E6A61]" />
              </div>
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                CORPORATE EMAIL (SSO / SAML)
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
                <Mail size={14} className="absolute right-3 top-3 text-[#6E6A61]" />
              </div>
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                OFFICIAL TITLE / ROLE
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
                <Building size={14} className="absolute right-3 top-3 text-[#6E6A61]" />
              </div>
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                SECURITY DEPARTMENT
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
              />
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                GEOGRAPHIC LOCATION
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
                <Globe size={14} className="absolute right-3 top-3 text-[#6E6A61]" />
              </div>
            </div>

            <div>
              <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                PRIMARY TIMEZONE
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full bg-[#E7E3DA] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
                <Clock size={14} className="absolute right-3 top-3 text-[#6E6A61]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 hairline-t">
            {savedSuccess ? (
              <div className="flex items-center gap-2 text-[#9B3418] text-[11px] mono-label">
                <CheckCircle2 size={15} />
                <span>PROFILE CREDENTIALS SAVED & HASHED</span>
              </div>
            ) : (
              <div className="text-[10px] text-[#6E6A61] mono-label">
                CHANGES ARE CRYPTOGRAPHICALLY RECORDED TO IMMUTABLE AUDIT LOG
              </div>
            )}
            <button
              type="submit"
              className="studio-btn-primary studio-btn text-[10.5px] py-1.5 px-4 uppercase"
            >
              [ SAVE PROFILE CHANGES ]
            </button>
          </div>
        </form>
      </div>

      {/* Hardware 2FA & WebAuthn Security Keys */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 hairline-b">
          <div>
            <div className="mono-label text-[#9B3418] text-[10px]">MFA ENFORCEMENT PROTOCOL</div>
            <h3 className="serif-heading text-[22px] font-bold text-[#1A1917]">
              Hardware 2FA Security Keys & WebAuthn
            </h3>
            <p className="mono-body text-[11.5px] text-[#4A4741] mt-1 max-w-2xl">
              FIPS 140-3 compliant hardware authenticators and WebAuthn passkeys required for all cryptographic scan signoffs and role mutation approvals.
            </p>
          </div>

          <button
            onClick={() => setShowKeyModal(true)}
            className="studio-btn studio-btn-pigment text-[10px] py-1.5 px-3 flex items-center gap-1.5 uppercase shrink-0"
          >
            <Plus size={13} />
            <span>REGISTER HARDWARE KEY</span>
          </button>
        </div>

        {/* List of Registered Keys */}
        <div className="space-y-3 pt-4">
          {currentUser.hardwareKeys.map((key) => (
            <div key={key.id} className="p-4 bg-[#E7E3DA] hairline-all flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#DCD7CB] hairline-all text-[#9B3418]">
                  <Fingerprint size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-[17px] font-bold text-[#1A1917]">{key.name}</span>
                    <span className="mono-label text-[9px] px-1.5 py-0.5 bg-[#1A1917] text-[#E7E3DA]">
                      {key.id}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#4A4741] mt-0.5">{key.type}</div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-[#6E6A61] mt-1">
                    <span>AAGUID: <code className="text-[#1A1917]">{key.aaguid}</code></span>
                    <span>•</span>
                    <span>ALGO: <span className="text-[#9B3418]">{key.algorithm}</span></span>
                    <span>•</span>
                    <span>LAST USED: {key.lastUsed}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <span className="mono-label text-[9.5px] text-[#9B3418] flex items-center gap-1 px-2 py-1 bg-[#9B3418]/10 border border-[#9B3418]">
                  <ShieldCheck size={12} />
                  <span>ACTIVE FIPS 140-3</span>
                </span>
                {currentUser.hardwareKeys.length > 1 && (
                  <button
                    onClick={() => removeHardwareKey(key.id)}
                    className="p-1.5 text-[#6E6A61] hover:text-[#9B3418] border border-transparent hover:border-[#9B3418] transition-colors"
                    title="Revoke Hardware Key"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Security Sessions */}
      <div className="bg-[#DCD7CB] p-6 hairline-all">
        <div className="pb-4 hairline-b">
          <div className="mono-label text-[#9B3418] text-[10px]">DEVICE ACCESS CONTROL</div>
          <h3 className="serif-heading text-[22px] font-bold text-[#1A1917]">
            Active Cryptographic Sessions
          </h3>
          <p className="mono-body text-[11.5px] text-[#4A4741] mt-1">
            All authenticated web sessions bound to ephemeral TLS 1.3 token exchanges.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          {currentUser.sessions.map((sess) => (
            <div key={sess.id} className="p-4 bg-[#E7E3DA] hairline-all flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#DCD7CB] hairline-all text-[#1A1917]">
                  <Laptop size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-[16px] font-semibold text-[#1A1917]">{sess.device}</span>
                    {sess.current && (
                      <span className="mono-label text-[8.5px] px-1.5 py-0.5 bg-[#9B3418] text-[#FFFFFF]">
                        THIS DEVICE
                      </span>
                    )}
                  </div>
                  <div className="text-[10.5px] text-[#6E6A61] mt-0.5">
                    IP: {sess.ip} • STATUS: {sess.lastActive}
                  </div>
                </div>
              </div>

              {!sess.current && (
                <button
                  onClick={() => revokeSession(sess.id)}
                  className="studio-btn text-[9.5px] py-1 px-2.5 text-[#9B3418] hover:border-[#9B3418]"
                >
                  [ TERMINATE ]
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Register New Hardware WebAuthn Key */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1917]/70 flex items-center justify-center p-4">
          <div className="bg-[#E7E3DA] p-6 md:p-8 hairline-all max-w-lg w-full font-mono shadow-2xl animate-in fade-in">
            <div className="flex justify-between items-start pb-4 hairline-b">
              <div>
                <div className="mono-label text-[#9B3418] text-[10px]">WEBAUTHN ENROLLMENT</div>
                <h3 className="serif-heading text-[24px] font-bold text-[#1A1917]">
                  Register Security Key
                </h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-[#6E6A61] hover:text-[#1A1917] text-[14px]"
              >
                [✕]
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                  SECURITY KEY NICKNAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. YubiKey 5Ci Backup Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                />
              </div>

              <div>
                <label className="mono-label text-[10.5px] text-[#1A1917] block mb-1">
                  AUTHENTICATOR ATTESTATION TYPE
                </label>
                <select
                  value={newKeyType}
                  onChange={(e) => setNewKeyType(e.target.value)}
                  className="w-full bg-[#DCD7CB] border border-[#1A1917] px-3 py-2 text-[12px] text-[#1A1917] outline-none focus:border-[#9B3418]"
                >
                  <option value="YubiKey 5C NFC (FIDO2/WebAuthn)">YubiKey 5 Series (USB-C / NFC FIDO2)</option>
                  <option value="Apple Touch ID / Face ID Secure Enclave">Apple Touch ID / Secure Enclave</option>
                  <option value="Windows Hello Enterprise FIDO2">Windows Hello Enterprise Biometrics</option>
                  <option value="Google Titan Security Key (CTAP2)">Google Titan Security Key (CTAP2)</option>
                </select>
              </div>

              <div className="p-3 bg-[#DCD7CB] hairline-all text-[11px] text-[#4A4741] flex items-start gap-2">
                <Key size={16} className="text-[#9B3418] shrink-0 mt-0.5" />
                <span>
                  When you click <strong>Initiate Enrollment</strong>, your browser will prompt you to touch your hardware key or scan biometrics to generate an ECDSA P-256 keypair.
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 hairline-t">
              <button
                onClick={() => setShowKeyModal(false)}
                disabled={isRegisteringKey}
                className="studio-btn text-[10px] py-1.5 px-3"
              >
                [ CANCEL ]
              </button>
              <button
                onClick={handleRegisterKey}
                disabled={isRegisteringKey || !newKeyName.trim()}
                className="studio-btn-primary studio-btn text-[10px] py-1.5 px-4"
              >
                {isRegisteringKey ? '[ TOUCH SECURITY KEY NOW... ]' : '[ INITIATE ENROLLMENT ]'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
