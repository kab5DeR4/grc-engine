import { useState, useMemo } from 'react';
import { useDemoStore } from '../store/demoStore';
import RbacPermissionBanner from '../components/settings/RbacPermissionBanner';
import { Wrench, CheckCircle2, ChevronDown, ChevronRight, Copy, Check, Terminal, Search, Filter, ShieldAlert, CheckSquare, Square } from 'lucide-react';

export default function FindingsPage() {
  const { 
    findings, 
    liveFindings, 
    isLiveMode, 
    simulateRemediation, 
    resolveLiveFinding, 
    hasPermission 
  } = useDemoStore();
  const [filter, setFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [copiedScriptId, setCopiedScriptId] = useState(null);

  const canRemediate = hasPermission('simulate_remediation');

  const activeFindings = useMemo(() => {
    if (isLiveMode && liveFindings && liveFindings.length > 0) {
      return liveFindings.map(f => ({
        id: f.finding_code || f.id,
        rawId: f.id,
        control: f.canonical_control_id || 'CTL-GH-01',
        severity: f.severity || 'HIGH',
        sla: '24h SLA',
        status: f.status || 'OPEN',
        title: f.title,
        remediation: f.remediation_action || f.description,
        resource: f.target_resource_id || 'github.com/organization/core',
        script: f.remediation_script || `gh api --method PUT /repos/${f.target_resource_id || 'org/repo'}/branches/main/protection --input protection-policy.json`
      }));
    }
    return findings.map(f => ({
      ...f,
      resource: f.account ? `${f.cloud} / ${f.account}` : 'AWS us-east-1',
      script: f.title.includes('S3') 
        ? 'aws s3api put-public-access-block --bucket customer-data-s3-vault --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"'
        : f.title.includes('MFA')
        ? 'aws iam enable-mfa-device --user-name privileged-user-01 --serial-number arn:aws:iam::123456789012:mfa/user-yubikey'
        : 'aws cloudtrail update-trail --name multi-region-audit-trail --enable-log-file-validation'
    }));
  }, [isLiveMode, liveFindings, findings]);

  const filtered = useMemo(() => {
    return activeFindings.filter(f => {
      const statusMatch = filter === 'ALL' || (f.status || '').toUpperCase() === filter;
      const severityMatch = severityFilter === 'ALL' || (f.severity || '').toUpperCase() === severityFilter;
      const searchMatch = !searchQuery || 
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.resource.toLowerCase().includes(searchQuery.toLowerCase());
      return statusMatch && severityMatch && searchMatch;
    });
  }, [activeFindings, filter, severityFilter, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(f => f.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRemediate = async (item) => {
    try {
      if (isLiveMode && item.rawId) {
        await resolveLiveFinding(item.rawId, 'Remediation confirmed via console');
      } else {
        simulateRemediation(item.id, item.control || item.control_id);
      }
    } catch (err) {
      alert(`Failed to apply remediation: ${err.message}`);
    }
  };

  const handleBulkRemediate = async () => {
    const itemsToRemediate = filtered.filter(f => selectedIds.includes(f.id));
    for (const item of itemsToRemediate) {
      await handleRemediate(item);
    }
    setSelectedIds([]);
  };

  const handleCopyScript = (item) => {
    navigator.clipboard.writeText(item.script || item.remediation);
    setCopiedScriptId(item.id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  return (
    <div className="w-full h-full text-slate-900 dark:text-slate-100 font-sans max-w-[1520px] mx-auto pb-16 space-y-6">
      
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10.5px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Risk &amp; Drift Management
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Findings &amp; Remediation Queue
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Prioritized inventory of security findings and control failures requiring engineering remediation to preserve audit readiness.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {['ALL', 'OPEN', 'RESOLVED'].map(st => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer border ${
                filter === st 
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-medium' 
                  : 'bg-[var(--surface)] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* RBAC restriction banner */}
      {!canRemediate && (
        <RbacPermissionBanner
          actionName="simulating automated control remediation"
          requiredRole="PLATFORM ADMIN or SECURITY ENGINEER"
        />
      )}

      {/* Landingfolio Search & Table Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search findings by ID, title, or resource..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-orange-500 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-slate-400 font-mono">Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar (Landingfolio Table Stack pattern) */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl flex items-center justify-between animate-fadeIn">
          <span className="text-xs font-mono text-orange-900 dark:text-orange-200">
            <strong>{selectedIds.length}</strong> findings selected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBulkRemediate}
              disabled={!canRemediate}
              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <Wrench size={12} />
              <span>Bulk Remediate</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1.5 text-xs font-mono text-slate-600 dark:text-slate-400 hover:underline bg-transparent border-none cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Interactive Table Stack List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <CheckCircle2 size={24} className="text-emerald-500 mx-auto" />
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Zero Findings Found</div>
            <p className="text-xs text-slate-500 font-mono">No findings match your current filters.</p>
          </div>
        ) : (
          filtered.map(item => {
            const isResolved = item.status === 'Resolved' || item.status === 'RESOLVED';
            const isExpanded = !!expandedRows[item.id];
            const isSelected = selectedIds.includes(item.id);

            return (
              <div 
                key={item.id} 
                className={`p-4 bg-[var(--surface)] rounded-xl border transition-all ${
                  isSelected 
                    ? 'border-orange-500/60 shadow-xs' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Main Row Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleSelectRow(item.id)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-transparent border-none p-0 cursor-pointer"
                    >
                      {isSelected ? <CheckSquare size={16} className="text-orange-600 dark:text-orange-400" /> : <Square size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-transparent border-none p-0 cursor-pointer flex items-center gap-1"
                    >
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      <span className="font-semibold text-orange-600 dark:text-orange-400">{item.id}</span>
                    </button>
                    <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                    <span className="text-slate-500">{item.control || item.control_id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.severity === 'CRITICAL' 
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800' 
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">{item.sla}</span>
                    <span className={`px-2 py-0.5 rounded text-[10.5px] font-mono font-medium ${
                      isResolved 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Finding Title & Target Resource */}
                <div className="mt-2 pl-7 space-y-1">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h2>
                  <div className="text-xs font-mono text-slate-500">
                    Resource: <span className="text-slate-700 dark:text-slate-300">{item.resource}</span>
                  </div>
                </div>

                {/* Expandable Landingfolio Table Details Drawer */}
                {isExpanded && (
                  <div className="mt-3 pl-7 space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          Automated Remediation Guidance
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyScript(item)}
                          className="flex items-center gap-1 text-[11px] font-mono text-orange-600 dark:text-orange-400 hover:underline cursor-pointer bg-transparent border-none"
                        >
                          {copiedScriptId === item.id ? <Check size={12} /> : <Copy size={12} />}
                          <span>{copiedScriptId === item.id ? 'Copied' : 'Copy Fix CLI'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {item.remediation}
                      </p>
                      <div className="p-2 rounded bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800">
                        <code>{item.script}</code>
                      </div>
                    </div>

                    {!isResolved && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemediate(item)}
                          disabled={!canRemediate}
                          className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border border-zinc-900 dark:border-zinc-100 disabled:opacity-50"
                        >
                          <Wrench size={12} />
                          <span>{isLiveMode ? 'Resolve Finding (API)' : 'Simulate Remediation'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
