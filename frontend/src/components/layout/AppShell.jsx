import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import Header from './Header';
import Sidebar from './Sidebar';

const AppShell = () => {
  const { isDemoMode } = useDemoStore();
  const [collapsed, setCollapsed] = useState(false);

  if (!isDemoMode) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-[#E7E3DA] text-[#1A1917] font-mono overflow-hidden">
      
      {/* Studio Architectural Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 bg-[#E7E3DA]">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AppShell;
