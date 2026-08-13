import { useState, useCallback } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import Header from './Header';
import Sidebar from './Sidebar';
import PageTransition from './PageTransition';

const AppShell = () => {
  const { isDemoMode } = useDemoStore();
  const [collapsed, setCollapsed] = useState(false);

  // memoize sidebar toggle handler to prevent unnecessary re-renders fr
  const handleToggleSidebar = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  if (!isDemoMode) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-[#E7E3DA] text-[#1A1917] font-mono overflow-hidden">
      
      {/* Studio Architectural Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 bg-[#E7E3DA]">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

    </div>
  );
};

export default AppShell;
