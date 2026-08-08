import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Server, Shield, FileCheck, 
  Files, AlertTriangle, Activity, Clock, 
  FileText, Settings, Database, Code, ShieldAlert
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Infrastructure', href: '/infrastructure', icon: Server },
  { name: 'Controls', href: '/controls', icon: Shield },
  { name: 'Compliance', href: '/compliance', icon: FileCheck },
  { name: 'Evidence', href: '/evidence', icon: Files },
  { name: 'Findings', href: '/findings', icon: AlertTriangle },
  { name: 'Scans', href: '/scans', icon: Activity },
  { name: 'Drift', href: '/drift', icon: Clock },
  { name: 'Reports', href: '/reports', icon: FileText },
];

const Sidebar = ({ collapsed, onToggle }) => {
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <ShieldAlert className={styles.logoIcon} />
          {!collapsed && <span className={styles.logoText}>GRC ENGINE</span>}
        </div>
        <div className={styles.workspaceSelector}>
          <div className={styles.workspaceIcon}>A</div>
          {!collapsed && (
            <div className={styles.workspaceDetails}>
              <span className={styles.workspaceName}>Acme Systems</span>
              <span className={styles.workspaceEnv}>Production</span>
            </div>
          )}
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          {!collapsed && <div className={styles.navSectionTitle}>Overview</div>}
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => 
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
              }
            >
              <item.icon className={styles.navIcon} />
              {!collapsed && <span className={styles.navText}>{item.name}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className={styles.footer}>
        <button onClick={onToggle} className={styles.collapseButton}>
          {collapsed ? '→' : '← Collapse'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
