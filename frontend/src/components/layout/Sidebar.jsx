import { memo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Shield, FileCheck, 
  Files, AlertTriangle, Activity, 
  FileText, Database, Code, BookOpen, Network, Sliders 
} from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ROLE_DETAILS } from '../../data/demo/rbac';

const navigation = [
  { code: '01', name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { code: '02', name: 'Integrations', href: '/dashboard/integrations', icon: Network },
  { code: '03', name: 'Architecture', href: '/architecture', icon: Code },
  { code: '04', name: 'Controls', href: '/controls', icon: Shield },
  { code: '05', name: 'Practice', href: '/practice', icon: FileCheck },
  { code: '06', name: 'Kinematics', href: '/study', icon: Network },
  { code: '07', name: 'Drawings', href: '/drawing', icon: BookOpen },
  { code: '08', name: 'Evidence', href: '/archive', icon: Files },
  { code: '09', name: 'Findings', href: '/findings', icon: AlertTriangle },
  { code: '10', name: 'Scans', href: '/scans', icon: Activity },
  { code: '11', name: 'Reports', href: '/reports', icon: FileText },
  { code: '12', name: 'Catalogue', href: '/catalogue', icon: Database },
  { code: '13', name: 'Settings & RBAC', href: '/settings/profile', icon: Sliders },
];

// memoize sidebar navigation component fr
const Sidebar = memo(function Sidebar({ collapsed, onToggle }) {
  const { currentUser } = useDemoStore();
  const roleDetail = ROLE_DETAILS[currentUser?.role] || ROLE_DETAILS.PLATFORM_ADMIN;

  return (
    <aside className={`h-full bg-[#DCD7CB] hairline-r flex flex-col justify-between transition-all duration-200 ${collapsed ? 'w-[68px]' : 'w-[240px]'}`}>
      
      <div>
        {/* Header */}
        <div className="p-4 hairline-b">
          <Link to="/" className="flex items-center gap-2 mb-3 cursor-pointer group select-none text-decoration-none">
            <span className="w-2.5 h-2.5 bg-[#9B3418] inline-block group-hover:scale-110 transition-transform"></span>
            {!collapsed && (
              <span className="font-serif font-bold text-[16px] text-[#1A1917] tracking-tight group-hover:text-[#9B3418] transition-colors">
                GRC ENGINE<span className="text-[#9B3418]">.</span>
              </span>
            )}
          </Link>
          {!collapsed && (
            <div className="bg-[#E7E3DA] hairline-all p-2.5 text-[10px] mono-label">
              <div className="text-[#9B3418] font-bold">ACME SYSTEMS</div>
              <div className="text-[#6E6A61] text-[9px]">ENV: PRODUCTION</div>
            </div>
          )}
        </div>

        {/* Nav list */}
        <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-[11px] font-mono transition-colors border-l-2 ${
                  isActive
                    ? 'bg-[#E7E3DA] text-[#9B3418] border-[#9B3418] font-bold shadow-sm'
                    : 'text-[#4A4741] border-transparent hover:bg-[#E7E3DA]/60 hover:text-[#1A1917]'
                }`
              }
            >
              <item.icon size={15} className="shrink-0" />
              {!collapsed && (
                <div className="flex items-center justify-between w-full uppercase">
                  <span>{item.name}</span>
                  <span className="text-[9px] text-[#6E6A61] font-normal">[{item.code}]</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Area with Current User and Collapse Toggle */}
      <div className="p-3 hairline-t space-y-2 bg-[#DCD7CB]">
        {!collapsed && currentUser && (
          <Link
            to="/settings/profile"
            className="flex items-center gap-2.5 p-2 bg-[#E7E3DA] hairline-all hover:border-[#9B3418] transition-colors group block text-decoration-none"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 hairline-all object-cover filter grayscale contrast-125 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-[#1A1917] truncate group-hover:text-[#9B3418] transition-colors">
                {currentUser.name}
              </div>
              <div className="text-[9px] mono-label text-[#9B3418] truncate">
                [{roleDetail.shortLabel}]
              </div>
            </div>
          </Link>
        )}

        <button
          onClick={onToggle}
          className="w-full studio-btn text-[10px] py-1.5 px-2 text-center uppercase"
        >
          {collapsed ? '→' : '[ ← COLLAPSE SIDEBAR ]'}
        </button>
      </div>

    </aside>
  );
});

export default Sidebar;
