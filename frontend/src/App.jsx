import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ControlsPage from './pages/ControlsPage';
import DrawingPage from './pages/DrawingPage';
import StudyPage from './pages/StudyPage';
import PracticePage from './pages/PracticePage';
import ArchivePage from './pages/ArchivePage';
import ScansPage from './pages/ScansPage';
import FindingsPage from './pages/FindingsPage';
import ReportsPage from './pages/ReportsPage';
import ContactPage from './pages/ContactPage';
import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Architecture from './pages/Architecture';
import AppShell from './components/layout/AppShell';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import DocsPage from './pages/DocsPage';
import IntegrationsPage from './pages/IntegrationsPage';
import DashboardIntegrations from './pages/DashboardIntegrations';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Application Dashboard Routes */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/integrations" element={<DashboardIntegrations />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/controls" element={<ControlsPage />} />
          <Route path="/drawing" element={<DrawingPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/scans" element={<ScansPage />} />
          <Route path="/findings" element={<FindingsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
        </Route>
        
        {/* Marketing/Other Routes */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
