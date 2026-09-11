import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ControlsPage from './pages/ControlsPage';
import ArchivePage from './pages/ArchivePage';
import ScansPage from './pages/ScansPage';
import FindingsPage from './pages/FindingsPage';
import ReportsPage from './pages/ReportsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Architecture from './pages/Architecture';
import SettingsPage from './pages/SettingsPage';
import AppShell from './components/layout/AppShell';
import FeaturesPage from './pages/FeaturesPage';
import DocsPage from './pages/DocsPage';
import IntegrationsPage from './pages/IntegrationsPage';
import DashboardIntegrations from './pages/DashboardIntegrations';
import PageTransition from './components/layout/PageTransition';

import { useDemoStore } from './store/demoStore';
import ScrollToTopButton from './components/ui/ScrollToTopButton';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { theme, density } = useDemoStore();

  // Synchronize active theme and density CSS variables on the root document element for instant application-wide styling updates
  useEffect(() => {
    const isDark = theme === 'obsidian' || theme === 'blueprint';
    document.documentElement.className = `theme-${theme || 'bone'} density-${density || 'editorial'} ${isDark ? 'dark' : ''}`;
  }, [theme, density]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/integrations" element={<DashboardIntegrations />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/controls" element={<ControlsPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/scans" element={<ScansPage />} />
          <Route path="/findings" element={<FindingsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/:tab" element={<SettingsPage />} />
        </Route>
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/features" element={<PageTransition><FeaturesPage /></PageTransition>} />
        <Route path="/docs" element={<PageTransition><DocsPage /></PageTransition>} />
        <Route path="/integrations" element={<PageTransition><IntegrationsPage /></PageTransition>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ScrollToTopButton />
    </Router>
  );
}

export default App;
