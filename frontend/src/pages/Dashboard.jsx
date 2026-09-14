import { useState, useMemo, useCallback } from 'react';
import { useDemoStore } from '../store/demoStore';
import { useToast } from '../components/ui/Toast';
import FeaturedHeroCard from '../components/dashboard/FeaturedHeroCard';
import FrameworkCard from '../components/dashboard/FrameworkCard';
import PipelineTracker from '../components/dashboard/PipelineTracker';
import PriorityFindingsQueue from '../components/dashboard/PriorityFindingsQueue';
import CloudEcosystemCard from '../components/dashboard/CloudEcosystemCard';
import TelemetryPulseBanner from '../components/dashboard/TelemetryPulseBanner';
import AuditReadinessCard from '../components/dashboard/AuditReadinessCard';
import DashboardScopeFilterBar from '../components/dashboard/DashboardScopeFilterBar';
import RiskDomainHeatmap from '../components/dashboard/RiskDomainHeatmap';
import LiveTelemetryEventFeed from '../components/dashboard/LiveTelemetryEventFeed';
import FindingDetailDrawer from '../components/dashboard/FindingDetailDrawer';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const toast = useToast();
  const [selectedEnv, setSelectedEnv] = useState('ALL');
  const [selectedFramework, setSelectedFramework] = useState('ALL');
  const [auditWindow, setAuditWindow] = useState('Q3 2026 (Live Audit)');
  const [auditorMode, setAuditorMode] = useState(false);
  const [selectedFindingForDrawer, setSelectedFindingForDrawer] = useState(null);
  const [isRemediatingDrawer, setIsRemediatingDrawer] = useState(false);
  const { 
    overallCompliance, 
    lastScan, 
    scanRunning, 
    runScan, 
    triggerLiveScan, 
    isLiveMode, 
    setLiveMode,
    backendOnline,
    backendStatusMessage,
    frameworks, 
    infrastructure, 
    findings, 
    liveFindings, 
    discoveredAssets,
    liveIntegrations,
    simulateRemediation,
    resolveLiveFinding,
    hasPermission,
    currentUser
  } = useDemoStore();

  const canRemediate = hasPermission('simulate_remediation');
  const canRunScan = hasPermission('run_scans');

  const liveAssetsCount = discoveredAssets?.length || 0;
  const liveFindingsCount = liveFindings?.length || 0;
  const hasLiveIntegrations = Boolean((liveIntegrations && liveIntegrations.length > 0) || liveAssetsCount > 0);

  // Active findings list depending on live vs demo mode
  // no cap, never leak demo findings into live mode
  const activeFindingsList = useMemo(() => {
    if (isLiveMode) {
      if (!liveFindings || liveFindings.length === 0) return [];
      return liveFindings.map(f => ({
        id: f.finding_code || f.id,
        rawId: f.id,
        controlId: f.canonical_control_id || 'CTL-001',
        severity: f.severity || 'HIGH',
        status: f.status || 'OPEN',
        title: f.title,
        cloud: (f.target_resource_id || '').includes('repo') ? 'GitHub' : 'AWS',
        account: 'Production-Environment',
        remediation: f.remediation_action || f.description,
      }));
    }
    return findings;
  }, [isLiveMode, liveFindings, findings]);

  const criticalFindings = useMemo(
    () => activeFindingsList.filter(f => f.severity === 'CRITICAL' && (f.status || '').toUpperCase() !== 'RESOLVED'),
    [activeFindingsList]
  );
  const highFindings = useMemo(
    () => activeFindingsList.filter(f => f.severity === 'HIGH' && (f.status || '').toUpperCase() !== 'RESOLVED'),
    [activeFindingsList]
  );

  const displayScore = isLiveMode 
    ? (hasLiveIntegrations 
        ? (criticalFindings.length === 0 ? 100 : Math.max(0, 100 - (criticalFindings.length * 20 + highFindings.length * 10))) 
        : null)
    : overallCompliance;
  const totalAssetsCount = isLiveMode ? liveAssetsCount : 172;

  const handleScan = useCallback(() => {
    if (!canRunScan) return;
    if (isLiveMode) {
      triggerLiveScan('ALL').catch(() => runScan());
    } else {
      runScan();
    }
  }, [canRunScan, isLiveMode, triggerLiveScan, runScan]);

  const handleRemediateFinding = useCallback(async (findingItem) => {
    setIsRemediatingDrawer(true);
    toast.info(`Generating cryptographic patch for ${findingItem.id}...`);

    try {
      if (isLiveMode && findingItem.rawId) {
        await resolveLiveFinding(findingItem.rawId, 'Remediated from Security Dashboard');
      } else {
        simulateRemediation(findingItem.id, findingItem.controlId || 'CTRL-IAM-001');
      }

      toast.success(`Remediated ${findingItem.id}! Evidence record added to audit chain.`);
      if (selectedFindingForDrawer?.id === findingItem.id) {
        setSelectedFindingForDrawer((prev) => prev ? { ...prev, status: 'RESOLVED' } : null);
      }
    } catch (err) {
      toast.error(`Failed to apply remediation: ${err.message}`);
    } finally {
      setIsRemediatingDrawer(false);
    }
  }, [isLiveMode, resolveLiveFinding, simulateRemediation, toast, selectedFindingForDrawer]);

  const userName = currentUser?.name?.split(' ')[0] || 'Engineer';

  return (
    <div className="flex flex-col gap-6 max-w-[1520px] mx-auto pb-16 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Top Greeting Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Security &amp; Compliance Posture
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            Continuous deterministic infrastructure verification &bull; Welcome back, {userName}
          </p>
        </div>
        <div className="text-xs font-mono text-slate-500">
          Last evaluation: <strong className="text-slate-700 dark:text-slate-300">{lastScan}</strong>
        </div>
      </div>

      {/* Sticky Contextual Scope Filter Bar */}
      <DashboardScopeFilterBar
        selectedEnv={selectedEnv}
        onSelectEnv={setSelectedEnv}
        selectedFramework={selectedFramework}
        onSelectFramework={setSelectedFramework}
        auditWindow={auditWindow}
        onSelectAuditWindow={setAuditWindow}
        auditorMode={auditorMode}
        onToggleAuditorMode={() => {
          setAuditorMode(!auditorMode);
          toast.info(auditorMode ? 'Switched to Developer SecOps mode' : 'Switched to Formal CPA Auditor Perspective');
        }}
        isLive={isLiveMode}
        hasLiveIntegrations={hasLiveIntegrations}
      />

      {/* Featured KPI Summary Bar */}
      <FeaturedHeroCard
        score={displayScore}
        totalAssets={totalAssetsCount}
        activeFrameworks={isLiveMode ? (hasLiveIntegrations ? 4 : 0) : frameworks.length}
        onScan={handleScan}
        scanRunning={scanRunning}
        isLive={isLiveMode}
        hasLiveIntegrations={hasLiveIntegrations}
      />

      {/* Real / Demo Telemetry Status Ribbon */}
      <TelemetryPulseBanner
        isLive={isLiveMode}
        backendOnline={backendOnline}
        backendStatusMessage={backendStatusMessage}
        liveAssetsCount={liveAssetsCount}
        liveFindingsCount={liveFindingsCount}
        onToggleMode={setLiveMode}
        onTriggerScan={handleScan}
        scanRunning={scanRunning}
      />

      {/* Live Audit Readiness Scorecard & Evidence Packager */}
      <AuditReadinessCard 
        score={displayScore} 
        isLive={isLiveMode} 
        hasLiveIntegrations={hasLiveIntegrations}
      />

      {/* Infrastructure Domain Risk Heatmap Breakdown */}
      <RiskDomainHeatmap 
        isLive={isLiveMode}
        hasLiveIntegrations={hasLiveIntegrations}
        liveFindings={activeFindingsList}
        liveAssetsCount={liveAssetsCount}
        onSelectCategory={(cat) => {
          toast.info(`Filtering findings by domain: ${cat.toUpperCase()}`);
        }} 
      />

      {/* Regulatory Frameworks & Continuous Baselines */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10.5px] font-mono font-medium text-slate-500 uppercase tracking-wider">
              Regulatory Frameworks &amp; Baselines
            </div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Continuous Standard Enforcement
            </h2>
          </div>
          <Link
            to="/controls"
            className="text-xs font-mono text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 transition-colors no-underline"
          >
            <span>View All Controls</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Frameworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {frameworks.map(fw => (
            <FrameworkCard
              key={fw.id}
              id={fw.id}
              name={fw.name}
              score={isLiveMode ? (hasLiveIntegrations ? (displayScore !== null ? displayScore : fw.score) : null) : fw.score}
              controls={isLiveMode ? (hasLiveIntegrations ? fw.controls : 0) : fw.controls}
              passing={isLiveMode ? (hasLiveIntegrations ? fw.passing : 0) : fw.passing}
              failing={isLiveMode ? (hasLiveIntegrations ? fw.failing : 0) : fw.failing}
              trend={fw.trend}
              isLive={isLiveMode}
              hasLiveIntegrations={hasLiveIntegrations}
            />
          ))}
        </div>
      </section>

      {/* Category 02: Operational Risk & Telemetry Stream */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Priority Findings Work Table (60%) */}
        <div className="lg:col-span-7 h-full">
          <PriorityFindingsQueue
            findings={activeFindingsList}
            onRemediate={handleRemediateFinding}
            canRemediate={canRemediate}
            onSelectFinding={(f) => setSelectedFindingForDrawer(f)}
            isLive={isLiveMode}
            hasLiveIntegrations={hasLiveIntegrations}
          />
        </div>

        {/* Real-time Telemetry Stream (40%) */}
        <div className="lg:col-span-5 h-full">
          <LiveTelemetryEventFeed 
            isLive={isLiveMode}
            hasLiveIntegrations={hasLiveIntegrations}
          />
        </div>

      </section>

      {/* Connected Telemetry Ecosystem */}
      <section>
        <CloudEcosystemCard
          infrastructure={infrastructure}
          liveIntegrations={liveIntegrations}
          liveAssetsCount={liveAssetsCount}
          isLive={isLiveMode}
          hasLiveIntegrations={hasLiveIntegrations}
        />
      </section>

      {/* Deterministic Verification Pipeline Log */}
      <section>
        <PipelineTracker 
          activeScan={scanRunning}
          lastCompleted={lastScan}
          isLive={isLiveMode}
          hasLiveIntegrations={hasLiveIntegrations}
        />
      </section>

      {/* Slide-over Finding Detail Evidence Drawer */}
      <FindingDetailDrawer
        finding={selectedFindingForDrawer}
        onClose={() => setSelectedFindingForDrawer(null)}
        onRemediate={handleRemediateFinding}
        canRemediate={canRemediate}
        isRemediating={isRemediatingDrawer}
      />

    </div>
  );
};

export default Dashboard;
