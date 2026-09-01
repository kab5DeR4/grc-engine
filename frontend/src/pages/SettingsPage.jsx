import { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, Building2, Users, Key, Webhook, 
  FileText, Sliders 
} from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import { ROLE_DETAILS } from '../data/demo/rbac';
import ProfileSettings from '../components/settings/ProfileSettings';
import WorkspaceSettings from '../components/settings/WorkspaceSettings';
import MembersRBACSettings from '../components/settings/MembersRBACSettings';
import ApiKeysSettings from '../components/settings/ApiKeysSettings';
import NotificationsSettings from '../components/settings/NotificationsSettings';
import AuditTrailSettings from '../components/settings/AuditTrailSettings';

const SETTINGS_TABS = [
  { id: 'profile', code: '01', name: 'Profile & 2FA', icon: User, path: '/settings/profile' },
  { id: 'workspace', code: '02', name: 'Workspace', icon: Building2, path: '/settings/workspace' },
  { id: 'members', code: '03', name: 'Members & RBAC', icon: Users, path: '/settings/members' },
  { id: 'api-keys', code: '04', name: 'API Keys', icon: Key, path: '/settings/api-keys' },
  { id: 'notifications', code: '05', name: 'Notifications', icon: Webhook, path: '/settings/notifications' },
  { id: 'audit-trail', code: '06', name: 'Audit Trail', icon: FileText, path: '/settings/audit-trail' },
];

export default function SettingsPage() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useDemoStore();

  const activeTabId = useMemo(() => {
    if (tab && SETTINGS_TABS.some(t => t.id === tab)) {
      return tab;
    }
    const queryParams = new URLSearchParams(location.search);
    const queryTab = queryParams.get('tab');
    if (queryTab && SETTINGS_TABS.some(t => t.id === queryTab)) {
      return queryTab;
    }
    return 'profile';
  }, [tab, location.search]);

  const roleDetail = ROLE_DETAILS[currentUser.role] || ROLE_DETAILS.PLATFORM_ADMIN;

  const renderTabContent = () => {
    switch (activeTabId) {
      case 'profile':
        return <ProfileSettings />;
      case 'workspace':
        return <WorkspaceSettings />;
      case 'members':
        return <MembersRBACSettings />;
      case 'api-keys':
        return <ApiKeysSettings />;
      case 'notifications':
        return <NotificationsSettings />;
      case 'audit-trail':
        return <AuditTrailSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      <main className="py-10 px-4 sm:px-8 md:px-12">
        {/* Page Header */}
        <div className="mb-8 pb-6 hairline-b flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="mono-label text-[#9B3418] mb-1.5 flex items-center gap-1.5">
              <Sliders size={13} />
              <span>SETTINGS & GOVERNANCE MATRIX</span>
            </div>
            <h1 className="serif-heading text-[34px] md:text-[48px] text-[#1A1917]">
              User Profiles, Workspace & <span className="serif-italic-pigment">RBAC Governance</span>
            </h1>
            <p className="mono-body text-[12.5px] text-[#4A4741] mt-2 max-w-3xl">
              Manage sovereign user credentials, multi-tenancy configurations, role-based access matrix, developer CI/CD tokens, alert webhooks, and tamper-evident audit logs.
            </p>
          </div>

          {/* Active Persona Badge */}
          <div className="p-3 bg-[#DCD7CB] hairline-all self-start md:self-auto text-right">
            <div className="mono-label text-[9.5px] text-[#6E6A61]">ACTIVE CONTEXT</div>
            <div className="mono-label text-[12px] text-[#9B3418] font-bold mt-0.5">
              {roleDetail.name.toUpperCase()}
            </div>
            <div className="text-[9px] text-[#4A4741] mt-0.5">
              {currentUser.email}
            </div>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 hairline-b">
          {SETTINGS_TABS.map((item) => {
            const isActive = activeTabId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                className={`mono-label text-[11px] px-3.5 py-2 border transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917] font-bold shadow-sm'
                    : 'bg-transparent text-[#1A1917] border-[#1A1917] hover:bg-[#DCD7CB]/60'
                }`}
              >
                <item.icon size={14} className={isActive ? 'text-[#9B3418]' : 'text-[#6E6A61]'} />
                <span>[ {item.code} {item.name.toUpperCase()} ]</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Viewport */}
        <div>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}
