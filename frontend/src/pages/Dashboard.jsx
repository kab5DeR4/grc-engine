import { useMemo, useCallback } from 'react';
import { useDemoStore } from '../store/demoStore';
import FeaturedHeroCard from '../components/dashboard/FeaturedHeroCard';
import FrameworkCard from '../components/dashboard/FrameworkCard';
import QuickStatStrip from '../components/dashboard/QuickStatStrip';
import PipelineTracker from '../components/dashboard/PipelineTracker';
import PriorityFindingsQueue from '../components/dashboard/PriorityFindingsQueue';
import CloudEcosystemCard from '../components/dashboard/CloudEcosystemCard';
import TelemetryPulseBanner from '../components/dashboard/TelemetryPulseBanner';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
    simulateRemediation,
    resolveLiveFinding,
    hasPermission,
    currentUser
  } = useDemoStore();

  const canRemediate = hasPermission('simulate_remediation');
  const canRunScan = hasPermission('run_scans');

  const liveAssetsCount = discoveredAssets?.length || 0;
  const liveFindingsCount = liveFindings?.length || 0;

  // Active findings list depending on live vs demo mode
  const activeFindingsList = useMemo(() => {
    if (isLiveMode && liveFindings && liveFindings.length > 0) {
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

  // Critical and High findings tally
  const criticalFindings = useMemo(
    () => activeFindingsList.filter(f => f.severity === 'CRITICAL' && (f.status || '').toUpperCase() !== 'RESOLVED'),
    [activeFindingsList]
  );
  const highFindings = useMemo(
    () => activeFindingsList.filter(f => f.severity === 'HIGH' && (f.status || '').toUpperCase() !== 'RESOLVED'),
    [activeFindingsList]
  );

  // Dynamic metrics derived cleanly by active mode
  const displayScore = isLiveMode 
    ? (liveAssetsCount > 0 ? (criticalFindings.length === 0 ? 95 : 88) : 100) 
    : overallCompliance;
  const totalAssetsCount = isLiveMode ? (liveAssetsCount || 2) : 172;

  // Run unified scan handler
  const handleScan = useCallback(() => {
    if (!canRunScan) return;
    if (isLiveMode) {
      triggerLiveScan('ALL').catch(() => runScan());
    } else {
      runScan();
    }
  }, [canRunScan, isLiveMode, triggerLiveScan, runScan]);

  // Inline finding remediation
  const handleRemediateFinding = useCallback(async (findingItem) => {
    try {
      if (isLiveMode && findingItem.rawId) {
        await resolveLiveFinding(findingItem.rawId, 'Remediated from Security Dashboard');
      } else {
        simulateRemediation(findingItem.id, findingItem.controlId || 'CTRL-IAM-001');
      }
    } catch (err) {
      alert(`Failed to apply remediation: ${err.message}`);
    }
  }, [isLiveMode, resolveLiveFinding, simulateRemediation]);

  const userName = currentUser?.name?.split(' ')[0] || 'Salung';

  return (
    <div className="flex flex-col gap-8 max-w-[1520px] mx-auto pb-16 font-mono text-gray-900 dark:text-gray-100">
      
      {/* Top Greeting Headline */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
          Welcome back, {userName}
        </h1>
        <span className="text-xs text-gray-400">
          LAST DRIFT EVALUATION: <strong className="text-gray-700 dark:text-gray-300">{lastScan}</strong>
        </span>
      </div>

      {/* Featured Hero Card (Geometric Systems v2.0 Banner) */}
      <FeaturedHeroCard
        score={displayScore}
        totalAssets={totalAssetsCount}
        activeFrameworks={frameworks.length}
        onScan={handleScan}
        scanRunning={scanRunning}
        isLive={isLiveMode}
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

      {/* Regulatory Frameworks & Continuous Baselines */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-1">
          <div>
            <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              REGULATORY FRAMEWORKS & BASELINES
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Continuous Standard Enforcement
            </h3>
          </div>
          <Link
            to="/controls"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1.5 transition-colors bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700"
          >
            <span>VIEW ALL CONTROLS</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Frameworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {frameworks.map(fw => (
            <FrameworkCard
              key={fw.id}
              id={fw.id}
              name={fw.name}
              score={isLiveMode ? (displayScore >= 90 ? fw.score : fw.score - 4) : fw.score}
              controls={fw.controls}
              passing={fw.passing}
              failing={fw.failing}
              trend={fw.trend}
            />
          ))}
        </div>
      </section>

      {/* Quick Metrics Datum Cards */}
      <section>
        <QuickStatStrip
          totalAssets={totalAssetsCount}
          criticalRisks={criticalFindings.length}
          highRisks={highFindings.length}
          activeFrameworks={frameworks.length}
          automatedCoverage={displayScore}
          isLive={isLiveMode}
        />
      </section>

      {/* Deterministic Verification Pipeline */}
      <section>
        <PipelineTracker 
          activeScan={scanRunning}
          lastCompleted={lastScan}
        />
      </section>

      {/* Category 02: Operational Risk & Telemetry Connectors */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Priority Findings Work Table (60%) */}
        <div className="lg:col-span-7 h-full">
          <PriorityFindingsQueue
            findings={activeFindingsList}
            onRemediate={handleRemediateFinding}
            canRemediate={canRemediate}
          />
        </div>

        {/* Connected Telemetry Ecosystem (40%) */}
        <div className="lg:col-span-5 h-full">
          <CloudEcosystemCard
            infrastructure={infrastructure}
            liveAssetsCount={liveAssetsCount}
            isLive={isLiveMode}
          />
        </div>

      </section>

    </div>
  );
};

export default Dashboard;
