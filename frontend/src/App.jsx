import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Infrastructure from './pages/Infrastructure';
import Controls from './pages/Controls';
import Findings from './pages/Findings';
import Evidence from './pages/Evidence';

// Pages placeholders
const Compliance = () => <div className="p-8"><h2 className="text-3xl font-manrope font-semibold">Compliance</h2></div>;
const Scans = () => <div className="p-8"><h2 className="text-3xl font-manrope font-semibold">Scans</h2></div>;
const Drift = () => <div className="p-8"><h2 className="text-3xl font-manrope font-semibold">Drift</h2></div>;
const Reports = () => <div className="p-8"><h2 className="text-3xl font-manrope font-semibold">Reports</h2></div>;
const Settings = () => <div className="p-8"><h2 className="text-3xl font-manrope font-semibold">Settings</h2></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/controls" element={<Controls />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/findings" element={<Findings />} />
          <Route path="/scans" element={<Scans />} />
          <Route path="/drift" element={<Drift />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
