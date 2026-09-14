import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppShell from './components/layout/AppShell';
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

// Lazy loaded page components for optimal initial bundle & Core Web Vitals
const ControlsPage = lazy(() => import('./pages/ControlsPage'));
const EvidenceVaultPage = lazy(() => import('./pages/EvidenceVaultPage'));
const ScansPage = lazy(() => import('./pages/ScansPage'));
const FindingsPage = lazy(() => import('./pages/FindingsPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Architecture = lazy(() => import('./pages/Architecture'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage'));
const IntegrationsDashboardPage = lazy(() => import('./pages/IntegrationsDashboardPage'));
const AssetsPage = lazy(() => import('./pages/AssetsPage'));

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
          <Suspense fallback={
            <div className="w-full h-screen bg-white dark:bg-zinc-950 flex items-center justify-center font-mono text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                <span>Initializing GRC Engine Telemetry...</span>
              </div>
            </div>
          }>
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
          </Suspense>
          <CookieConsentBanner />
          <CommandPalette />
          <ScrollToTopButton />
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
