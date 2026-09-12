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
    <div className="w-full min-h-full bg-[var(--ground)] text-slate-900 dark:text-slate-100 font-sans pb-16">
      <main className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Sliders size={13} />
              <span>SETTINGS & GOVERNANCE MATRIX</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              User Profiles, Workspace & RBAC Governance
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
              Manage sovereign user credentials, multi-tenancy configurations, role-based access matrix, developer CI/CD tokens, alert webhooks, and tamper-evident audit logs.
            </p>
          </div>

          {/* Active Persona Badge */}
          <div className="p-3.5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm self-start md:self-auto text-right">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">ACTIVE CONTEXT</div>
            <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mt-0.5">
              {roleDetail.name.toUpperCase()}
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              {currentUser.email}
            </div>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          {SETTINGS_TABS.map((item) => {
            const isActive = activeTabId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs'
                    : 'bg-[var(--surface)] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <item.icon size={14} className={isActive ? 'text-sky-400 dark:text-slate-950' : 'text-slate-400'} />
                <span>[{item.code} {item.name.toUpperCase()}]</span>
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
