import { Outlet, Navigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import Header from './Header';
import { MagnificationDock } from './MagnificationDock';
import { 
  LayoutDashboard, Server, Shield, FileCheck, 
  Files, AlertTriangle, Activity, Clock, FileText, Settings 
} from 'lucide-react';

const navigation = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Infrastructure', href: '/infrastructure', icon: <Server size={20} /> },
  { label: 'Controls', href: '/controls', icon: <Shield size={20} /> },
  { label: 'Compliance', href: '/compliance', icon: <FileCheck size={20} /> },
  { label: 'Evidence', href: '/evidence', icon: <Files size={20} /> },
  { label: 'Findings', href: '/findings', icon: <AlertTriangle size={20} /> },
  { label: 'Scans', href: '/scans', icon: <Activity size={20} /> },
  { label: 'Drift', href: '/drift', icon: <Clock size={20} /> },
  { label: 'Reports', href: '/reports', icon: <FileText size={20} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
];

const AppShell = () => {
  const { isDemoMode } = useDemoStore();

  if (!isDemoMode) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-secondary text-charcoal font-sans overflow-hidden selection:bg-yellow selection:text-charcoal">
      
      {/* Magnification Sidebar - Anchored close to left screen edge */}
      <div className="relative z-50 h-full flex flex-col justify-center pl-2 pr-1 bg-white border-r border-charcoal/10 shadow-[4px_0_0_0_rgba(23,30,25,0.05)]">
        <MagnificationDock 
          items={navigation} 
          panelWidth={72}
          baseItemSize={40}
          magnification={60}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative z-10 bg-secondary brutalist-grid-light">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
