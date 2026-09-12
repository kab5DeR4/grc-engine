import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import PageTransition from './PageTransition';

const AppShell = () => {
  const [collapsed, setCollapsed] = useState(false);

  // memoize sidebar toggle handler to prevent unnecessary re-renders fr
  const handleToggleSidebar = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-[var(--ground)] text-[var(--ink)] font-sans overflow-hidden transition-colors duration-150">
      
      {/* Studio Architectural Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 bg-[var(--ground)]">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

    </div>
  );
};

export default AppShell;
