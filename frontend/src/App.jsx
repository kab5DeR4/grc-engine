import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ControlsPage from './pages/ControlsPage';
import EvidenceVaultPage from './pages/EvidenceVaultPage';
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
import IntegrationsDashboardPage from './pages/IntegrationsDashboardPage';
import AssetsPage from './pages/AssetsPage';
import PageTransition from './components/layout/PageTransition';

import { useDemoStore } from './store/demoStore';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import ErrorBoundary from './components/ui/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookieConsentBanner from './components/ui/CookieConsentBanner';
import { ToastProvider } from './components/ui/Toast';
import CommandPalette from './components/ui/CommandPalette';

import MetaHead from './components/layout/MetaHead';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { theme, density } = useDemoStore();

  useEffect(() => {
    const isDark = theme === 'blueprint';
    document.documentElement.className = `theme-${theme || 'auditor'} density-${density || 'editorial'} ${isDark ? 'dark' : ''}`;
  }, [theme, density]);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <MetaHead />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/integrations" element={<IntegrationsDashboardPage />} />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="/controls" element={<ControlsPage />} />
              <Route path="/archive" element={<EvidenceVaultPage />} />
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
            <Route path="/privacy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <CookieConsentBanner />
          <CommandPalette />
          <ScrollToTopButton />
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
