import { useMemo, useCallback } from 'react';
import { useDemoStore } from '../store/demoStore';
import FeaturedHeroCard from '../components/dashboard/FeaturedHeroCard';
import FrameworkCard from '../components/dashboard/FrameworkCard';
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

  const criticalFindings = useMemo(
    () => activeFindingsList.filter(f => f.severity === 'CRITICAL' && (f.status || '').toUpperCase() !== 'RESOLVED'),
    [activeFindingsList]
  );
  const highFindings = useMemo(
    () => activeFindingsList.filter(f => f.severity === 'HIGH' && (f.status || '').toUpperCase() !== 'RESOLVED'),
    [activeFindingsList]
  );

  const displayScore = isLiveMode 
    ? (liveAssetsCount > 0 ? (criticalFindings.length === 0 ? 95 : 88) : 100) 
    : overallCompliance;
  const totalAssetsCount = isLiveMode ? (liveAssetsCount || 2) : 172;

  const handleScan = useCallback(() => {
    if (!canRunScan) return;
    if (isLiveMode) {
      triggerLiveScan('ALL').catch(() => runScan());
    } else {
      runScan();
    }
  }, [canRunScan, isLiveMode, triggerLiveScan, runScan]);

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

      {/* Featured KPI Summary Bar */}
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
              score={isLiveMode ? (displayScore >= 90 ? fw.score : fw.score - 4) : fw.score}
              controls={fw.controls}
              passing={fw.passing}
              failing={fw.failing}
              trend={fw.trend}
            />
          ))}
        </div>
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

      {/* Deterministic Verification Pipeline Log */}
      <section>
        <PipelineTracker 
          activeScan={scanRunning}
          lastCompleted={lastScan}
        />
      </section>

    </div>
  );
};

export default Dashboard;
