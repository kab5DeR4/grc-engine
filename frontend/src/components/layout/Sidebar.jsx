import { memo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Shield, Files, AlertTriangle, 
  Activity, FileText, Code, Network, Sliders, Server,
  Box, Settings
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ROLE_DETAILS } from '../../data/demo/rbac';

const menuGroups = [
  {
    title: 'MAIN MENU',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Assets Inventory', href: '/assets', icon: Server },
      { name: 'Controls Matrix', href: '/controls', icon: Shield },
      { name: 'Integrations', href: '/dashboard/integrations', icon: Network },
      { name: 'Architecture', href: '/architecture', icon: Code },
    ]
  },
  {
    title: 'VERIFICATION & AUDIT',
    items: [
      { name: 'Findings & Gaps', href: '/findings', icon: AlertTriangle },
      { name: 'Evidence Vault', href: '/archive', icon: Files },
      { name: 'Telemetry Scans', href: '/scans', icon: Activity },
      { name: 'Attestation Reports', href: '/reports', icon: FileText },
    ]
  },
  {
    title: 'MANAGEMENT',
    items: [
      { name: 'Roles & RBAC', href: '/settings/members', icon: Sliders },
      { name: 'Settings', href: '/settings/profile', icon: Settings },
    ]
  }
];

const Sidebar = memo(function Sidebar({ collapsed, onToggle }) {
  const { currentUser } = useDemoStore();
  const roleDetail = ROLE_DETAILS[currentUser?.role] || ROLE_DETAILS.PLATFORM_ADMIN;

  return (
    <aside className={`h-full bg-[var(--surface)] border-r border-[var(--hairline)] flex flex-col justify-between transition-all duration-200 z-20 ${collapsed ? 'w-[72px]' : 'w-[250px]'}`}>
      
      <div>
        {/* Header Enterprise Brand */}
        <div className="p-4 sm:p-5 border-b border-[var(--hairline)]">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group select-none text-decoration-none">
            <div className="p-2 rounded-lg bg-[var(--surface-raised)] border border-[var(--hairline)] group-hover:border-[var(--ink)] transition-colors shrink-0">
              <Box size={20} className="text-slate-900 dark:text-sky-400" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 block uppercase font-bold">
                  ENTERPRISE
                </span>
                <span className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100 truncate block">
                  GRC Engine Studio
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Groups */}
        <nav className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-210px)] font-mono">
          {menuGroups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <div className="px-3 mb-1.5 text-[10px] tracking-wider text-slate-500 dark:text-slate-400 font-bold uppercase">
                  {group.title}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 text-xs rounded-lg transition-all ${
                        isActive
                          ? 'bg-[var(--surface-raised)] text-[var(--ink)] font-bold shadow-sm border border-[var(--hairline)]'
                          : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)]'
                      }`
                    }
                    title={collapsed ? item.name : undefined}
                  >
                    <item.icon size={16} className="shrink-0" />
                    {!collapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer User Profile & Collapse */}
      <div className="p-3 border-t border-[var(--hairline)] space-y-2 bg-[var(--ground)]">
        {!collapsed && currentUser && (
          <Link
            to="/settings/profile"
            className="flex items-center gap-2.5 p-2 bg-[var(--surface)] rounded-lg border border-[var(--hairline)] hover:border-[var(--ink-muted)] transition-colors group block text-decoration-none"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-lg object-cover filter grayscale shrink-0 border border-slate-300 dark:border-slate-600"
            />
            <div className="min-w-0 flex-1 font-mono">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                [{roleDetail.shortLabel}]
              </div>
            </div>
          </Link>
        )}

        <button
          type="button"
          onClick={onToggle}
          className="w-full py-2 px-3 text-[11px] font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors uppercase text-center cursor-pointer"
        >
          {collapsed ? '→' : '← Collapse'}
        </button>
      </div>

    </aside>
  );
});

export default Sidebar;
