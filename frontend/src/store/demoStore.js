import { create } from 'zustand';
import { initialOrganization } from '../data/demo/organization';
import { initialInfrastructure } from '../data/demo/infrastructure';
import { initialControls } from '../data/demo/controls';
import { initialFindings } from '../data/demo/findings';
import { initialEvidence } from '../data/demo/evidence';
import { initialFrameworks } from '../data/demo/frameworks';
import { 
  ROLES, 
  PERMISSION_MATRIX, 
  initialUserProfile, 
  initialWorkspaceSettings, 
  initialMembers, 
  initialApiKeys, 
  initialNotificationChannels, 
  initialAuditTrail 
} from '../data/demo/rbac';

// grab initial theme from localstorage or default to bone fr
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'bone';
  const stored = localStorage.getItem('grc_theme');
  if (stored && ['bone', 'obsidian', 'blueprint', 'auditor'].includes(stored)) {
    return stored;
  }
  if (stored === 'dark') return 'obsidian';
  if (stored === 'light') return 'bone';
  return 'bone';
};

// grab initial density preference from localstorage
const getInitialDensity = () => {
  if (typeof window === 'undefined') return 'editorial';
  const stored = localStorage.getItem('grc_density');
  if (stored && ['editorial', 'compact'].includes(stored)) {
    return stored;
  }
  return 'editorial';
};

// generate pseudo-random sha256 hash for audit proof chaining
const generateAuditHash = () => {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

export const useDemoStore = create((set, get) => ({
  isDemoMode: true,
  theme: getInitialTheme(),
  density: getInitialDensity(),
  isDarkMode: ['obsidian', 'blueprint'].includes(getInitialTheme()),

  // theme setter with storage sync
  setTheme: (val) => {
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_theme', val);
    }
    const isDark = ['obsidian', 'blueprint'].includes(val);
    set({ theme: val, isDarkMode: isDark });
  },

  // layout density switch for dense secops views
  setDensity: (val) => {
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_density', val);
    }
    set({ density: val });
  },

  toggleDensity: () => set((state) => {
    const nextDensity = state.density === 'compact' ? 'editorial' : 'compact';
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_density', nextDensity);
    }
    return { density: nextDensity };
  }),

  toggleDarkMode: () => set((state) => {
    const nextTheme = state.theme === 'bone' ? 'obsidian' : 'bone';
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_theme', nextTheme);
    }
    const isDark = ['obsidian', 'blueprint'].includes(nextTheme);
    return { theme: nextTheme, isDarkMode: isDark };
  }),

  setDarkMode: (val) => {
    const nextTheme = val ? 'obsidian' : 'bone';
    if (typeof document !== 'undefined') {
      localStorage.setItem('grc_theme', nextTheme);
    }
    set({ theme: nextTheme, isDarkMode: val });
  },
  setDemoMode: (val) => set({ isDemoMode: val }),
  toggleDemoMode: () => set({ isDemoMode: true }),

  // core demo telemetry data
  organization: initialOrganization,
  infrastructure: initialInfrastructure,
  controls: initialControls,
  findings: initialFindings,
  evidence: initialEvidence,
  frameworks: initialFrameworks,
  lastScan: '8 minutes ago',
  scanRunning: false,
  overallCompliance: 84,

  // rbac and settings state
  currentUser: initialUserProfile,
  workspaceSettings: initialWorkspaceSettings,
  members: initialMembers,
  apiKeys: initialApiKeys,
  notifications: initialNotificationChannels,
  auditTrail: initialAuditTrail,

  // helper function to check rbac permissions for current active persona
  hasPermission: (permissionKey) => {
    const { currentUser } = get();
    const currentRole = currentUser?.role || ROLES.PLATFORM_ADMIN;
    const rule = PERMISSION_MATRIX.find(p => p.key === permissionKey);
    if (!rule) return false;
    const perm = rule.permissions[currentRole];
    return Boolean(perm && perm.granted);
  },

  // get specific permission detail
  getPermissionStatus: (permissionKey) => {
    const { currentUser } = get();
    const currentRole = currentUser?.role || ROLES.PLATFORM_ADMIN;
    const rule = PERMISSION_MATRIX.find(p => p.key === permissionKey);
    if (!rule) return { access: 'DENIED', label: 'Restricted', granted: false };
    return rule.permissions[currentRole] || { access: 'DENIED', label: 'Restricted', granted: false };
  },

  // switch role to test rbac personas live across the entire UI
  setCurrentUserRole: (newRole) => {
    set((state) => {
      const updatedUser = { ...state.currentUser, role: newRole };
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: newRole,
        },
        action: 'ROLE_PERSONA_SWITCHED',
        resource: `RBAC_ROLE_${newRole}`,
        severity: 'WARN',
        details: `Active user context switched to ${newRole} for live RBAC policy evaluation.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };

      return {
        currentUser: updatedUser,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // profile actions
  updateUserProfile: (profileData) => {
    set((state) => {
      const updatedUser = { ...state.currentUser, ...profileData };
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
        action: 'USER_PROFILE_UPDATED',
        resource: `USER_${updatedUser.id}`,
        severity: 'INFO',
        details: `Updated personal credentials and administrative contact preferences.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        currentUser: updatedUser,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // register hardware webauthn security key
  registerHardwareKey: (keyName, keyType = 'FIDO2 / WebAuthn Hardware Token') => {
    set((state) => {
      const newKey = {
        id: `KEY-0${state.currentUser.hardwareKeys.length + 1}`,
        name: keyName || 'Hardware Security Token',
        type: keyType,
        registeredAt: new Date().toISOString(),
        lastUsed: 'Just now',
        aaguid: 'ea71291b-81f0-42ab-9102-' + Math.floor(100000000000 + Math.random() * 900000000000),
        algorithm: 'ES256 (FIPS 140-3 Hardware Crypto)',
      };

      const updatedUser = {
        ...state.currentUser,
        hardwareKeys: [...state.currentUser.hardwareKeys, newKey],
      };

      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
        action: 'WEBAUTHN_HARDWARE_KEY_REGISTERED',
        resource: `${newKey.name} (${newKey.id})`,
        severity: 'INFO',
        details: `Enrolled WebAuthn/FIDO2 hardware cryptographic key with AAGUID: ${newKey.aaguid}`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };

      return {
        currentUser: updatedUser,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // remove hardware security key
  removeHardwareKey: (keyId) => {
    set((state) => {
      const updatedKeys = state.currentUser.hardwareKeys.filter(k => k.id !== keyId);
      const updatedUser = { ...state.currentUser, hardwareKeys: updatedKeys };
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
        action: 'WEBAUTHN_KEY_REVOKED',
        resource: `KEY_${keyId}`,
        severity: 'WARN',
        details: `Revoked hardware WebAuthn credential ${keyId} from user profile.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        currentUser: updatedUser,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // revoke session
  revokeSession: (sessionId) => {
    set((state) => {
      const updatedSessions = state.currentUser.sessions.filter(s => s.id !== sessionId);
      const updatedUser = { ...state.currentUser, sessions: updatedSessions };
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
        },
        action: 'SECURITY_SESSION_REVOKED',
        resource: `SESSION_${sessionId}`,
        severity: 'WARN',
        details: `Terminated active device session ${sessionId}.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        currentUser: updatedUser,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // workspace settings updates
  updateWorkspaceSettings: (settingsData) => {
    set((state) => {
      const updatedSettings = { ...state.workspaceSettings, ...settingsData };
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'WORKSPACE_SETTINGS_MODIFIED',
        resource: `WORKSPACE_${updatedSettings.organizationId}`,
        severity: 'INFO',
        details: `Updated workspace configuration, sovereign residency parameters, and compliance officer mappings.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        workspaceSettings: updatedSettings,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // toggle regulatory target framework
  toggleRegulatoryTarget: (targetId) => {
    set((state) => {
      const updatedTargets = state.workspaceSettings.regulatoryTargets.map((t) =>
        t.id === targetId ? { ...t, enabled: !t.enabled } : t
      );
      const target = updatedTargets.find(t => t.id === targetId);
      const updatedSettings = { ...state.workspaceSettings, regulatoryTargets: updatedTargets };
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'REGULATORY_TARGET_TOGGLED',
        resource: `FRAMEWORK_${targetId}`,
        severity: 'INFO',
        details: `Regulatory target ${target?.name} monitoring status set to ${target?.enabled ? 'ACTIVE' : 'DISABLED'}.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        workspaceSettings: updatedSettings,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // member management
  inviteMember: (memberData) => {
    set((state) => {
      const newMember = {
        id: `MEM-00${state.members.length + 1}`,
        name: memberData.name,
        email: memberData.email,
        role: memberData.role || ROLES.READ_ONLY_VIEWER,
        title: memberData.title || 'Security Analyst',
        status: 'ACTIVE',
        mfaStatus: 'Pending Enrollment',
        joinedDate: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        lastActive: 'Invited',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&h=128&q=80',
      };

      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'MEMBER_INVITED_TO_WORKSPACE',
        resource: `${newMember.name} (${newMember.email})`,
        severity: 'INFO',
        details: `Provisioned workspace access with role ${newMember.role}.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };

      return {
        members: [...state.members, newMember],
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  updateMemberRole: (memberId, newRole) => {
    set((state) => {
      const updatedMembers = state.members.map((m) =>
        m.id === memberId ? { ...m, role: newRole } : m
      );
      const member = updatedMembers.find(m => m.id === memberId);
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'MEMBER_RBAC_ROLE_MUTATED',
        resource: `${member?.name} (${memberId})`,
        severity: 'WARN',
        details: `Assigned new RBAC role ${newRole} to member ${member?.email}.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        members: updatedMembers,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  removeMember: (memberId) => {
    set((state) => {
      const member = state.members.find(m => m.id === memberId);
      const updatedMembers = state.members.filter(m => m.id !== memberId);
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'MEMBER_REMOVED_FROM_WORKSPACE',
        resource: `${member?.name} (${memberId})`,
        severity: 'WARN',
        details: `Revoked workspace membership and all RBAC token bindings for ${member?.email}.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        members: updatedMembers,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // api keys management
  createApiKey: ({ name, scope, scopeCode, expiresDays = 365 }) => {
    const rawHex = Math.random().toString(36).substring(2, 10);
    const prefix = `grc_live_${rawHex.slice(0, 4)}`;
    const fullToken = `${prefix}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const maskedToken = `${prefix}****************************${fullToken.slice(-4)}`;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiresDays);

    const newKey = {
      id: `KEY-${Math.floor(900 + Math.random() * 100)}`,
      name: name || 'CI/CD Pipeline Scanner Token',
      prefix: prefix,
      fullToken: fullToken,
      maskedToken: maskedToken,
      scope: scope || 'CI/CD Pipeline Scanning (Read-Only)',
      scopeCode: scopeCode || 'SCAN_PIPELINE',
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: expiryDate.toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'ACTIVE',
    };

    set((state) => {
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'API_TOKEN_PROVISIONED',
        resource: `${newKey.name} (${newKey.id})`,
        severity: 'WARN',
        details: `Issued developer token with scope '${newKey.scopeCode}'. Expiration: ${newKey.expiresAt}`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        apiKeys: [newKey, ...state.apiKeys],
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });

    return newKey;
  },

  revokeApiKey: (keyId) => {
    set((state) => {
      const updatedKeys = state.apiKeys.map(k =>
        k.id === keyId ? { ...k, status: 'REVOKED' } : k
      );
      const key = state.apiKeys.find(k => k.id === keyId);
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'API_TOKEN_REVOKED',
        resource: `${key?.name} (${keyId})`,
        severity: 'CRITICAL',
        details: `Immediately revoked API token ${keyId}. All CI/CD requests with this key are blocked.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        apiKeys: updatedKeys,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // notification webhooks
  updateNotificationChannel: (channelId, channelData) => {
    set((state) => {
      const updatedChannels = state.notifications.map(c =>
        c.id === channelId ? { ...c, ...channelData } : c
      );
      const channel = updatedChannels.find(c => c.id === channelId);
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'ALERT_WEBHOOK_CONFIG_SAVED',
        resource: `${channel?.name} (${channelId})`,
        severity: 'INFO',
        details: `Updated webhook target endpoint and event subscription triggers.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        notifications: updatedChannels,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  sendTestNotification: (channelId) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    set((state) => {
      const updatedChannels = state.notifications.map(c =>
        c.id === channelId ? { ...c, lastPing: `${timestamp} (200 OK — 42ms)`, status: 'HEALTHY' } : c
      );
      const channel = state.notifications.find(c => c.id === channelId);
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'TEST_WEBHOOK_DELIVERY_CONFIRMED',
        resource: `${channel?.name} (${channelId})`,
        severity: 'INFO',
        details: `Dispatched synthetic test webhook payload to ${channel?.destination}. Response: HTTP 200 OK.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        notifications: updatedChannels,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // audit trail append helper
  appendAuditLog: (action, resource, severity = 'INFO', details = '') => {
    set((state) => {
      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: action,
        resource: resource,
        severity: severity,
        details: details,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };
      return {
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  // run scan with audit log
  runScan: () => {
    const { hasPermission } = get();
    if (!hasPermission('run_scans')) {
      return;
    }

    set({ scanRunning: true });
    
    // log start of scan
    get().appendAuditLog(
      'MANUAL_SYSTEM_SCAN_TRIGGERED', 
      'CLUSTER_TELEMETRY_ENGINE', 
      'INFO', 
      'Operator triggered real-time cryptographic audit scan across all 482 infrastructure controls.'
    );

    setTimeout(() => {
      set({ 
        scanRunning: false, 
        lastScan: 'Just now',
      });
      get().appendAuditLog(
        'TELEMETRY_SCAN_COMPLETED', 
        'ALL_CONTROLS_VERIFIED', 
        'INFO', 
        'Telemetry scan complete. All security boundaries evaluated with zero cryptographic drifts.'
      );
    }, 4000);
  },

  simulateRemediation: (findingId, controlId) => {
    const { hasPermission } = get();
    if (!hasPermission('simulate_remediation')) {
      return;
    }

    set((state) => {
      const updatedFindings = state.findings.map(f => 
        f.id === findingId ? { ...f, status: 'Resolved' } : f
      );
      
      const updatedControls = state.controls.map(c => 
        c.id === controlId ? { ...c, status: 'PASS' } : c
      );

      const newCompliance = state.overallCompliance < 100 ? state.overallCompliance + 1 : 100;

      const logEntry = {
        id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        actor: {
          name: state.currentUser.name,
          email: state.currentUser.email,
          role: state.currentUser.role,
        },
        action: 'FINDING_REMEDIATION_SIMULATED',
        resource: `${findingId} / ${controlId}`,
        severity: 'INFO',
        details: `Simulated patch applied to control ${controlId}. Finding ${findingId} marked Resolved.`,
        ipAddress: '198.51.100.42',
        sha256: generateAuditHash(),
        verified: true,
      };

      return {
        findings: updatedFindings,
        controls: updatedControls,
        overallCompliance: newCompliance,
        auditTrail: [logEntry, ...state.auditTrail],
      };
    });
  },

  resetDemo: () => {
    set({
      organization: initialOrganization,
      infrastructure: initialInfrastructure,
      controls: initialControls,
      findings: initialFindings,
      evidence: initialEvidence,
      frameworks: initialFrameworks,
      overallCompliance: 84,
      lastScan: '8 minutes ago',
      currentUser: initialUserProfile,
      workspaceSettings: initialWorkspaceSettings,
      members: initialMembers,
      apiKeys: initialApiKeys,
      notifications: initialNotificationChannels,
      auditTrail: initialAuditTrail,
    });
  },

  resetFilters: () => set({ scanRunning: false }),
}));
