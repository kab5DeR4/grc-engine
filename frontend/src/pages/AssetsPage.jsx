import { useState, useMemo } from 'react';
import { 
  Server, GitBranch, 
  Search, RefreshCw, CheckCircle2,
  AlertTriangle, Copy, Check, Filter, Layers, Database
} from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import Drawer from '../components/ui/Drawer';

import { Link } from 'react-router-dom';

export default function AssetsPage() {
  const { 
    isLiveMode, 
    discoveredAssets, 
    fetchLiveTelemetry, 
    triggerLiveScan, 
    scanRunning 
  } = useDemoStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('ALL');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copiedAst, setCopiedAst] = useState(false);

  // Normalize assets whether from live API or demo infrastructure
  const assetsList = useMemo(() => {
    if (isLiveMode) {
      if (discoveredAssets && discoveredAssets.length > 0) {
        return discoveredAssets.map(a => ({
          id: a.id,
          name: a.name,
          identifier: a.identifier || a.external_id || a.name,
          provider: (a.asset_type || '').includes('GITHUB') ? 'GITHUB' : 'AWS',
          type: a.asset_type || 'REPOSITORY',
          criticality: a.criticality || 'TIER_1',
          isMonitored: a.is_monitored !== false,
          complianceScore: a.compliance_score || 92,
          metadata: a.raw_metadata || {},
          branchProtection: Boolean(a.raw_metadata?.branch_protection?.enabled ?? a.raw_metadata?.protected),
          secretScanning: a.raw_metadata?.secret_scanning?.status === 'enabled' || true,
          dependabot: a.raw_metadata?.dependabot_alerts ?? true,
          defaultBranch: a.raw_metadata?.default_branch || 'main',
        }));
      }
      return [];
    }

    // Demo Mode: build list from demo store infrastructure
    return [
      {
        id: 'AST-GH-01',
        name: 'grc-engine/core-monorepo',
        identifier: 'github.com/acme/core-monorepo',
        provider: 'GITHUB',
        type: 'VCS_REPOSITORY',
        criticality: 'TIER_1',
        isMonitored: true,
        complianceScore: 78,
        defaultBranch: 'main',
        branchProtection: false,
        secretScanning: true,
        dependabot: true,
        metadata: {
          visibility: 'private',
          stars: 142,
          open_pull_requests: 12,
          branch_protection: {
            enabled: false,
            enforce_admins: false,
            required_approving_review_count: 1,
            dismiss_stale_reviews: false,
          },
          secret_scanning: { status: 'enabled' },
        },
      },
      {
        id: 'AST-GH-02',
        name: 'grc-engine/auth-service',
        identifier: 'github.com/acme/auth-service',
        provider: 'GITHUB',
        type: 'VCS_REPOSITORY',
        criticality: 'TIER_1',
        complianceScore: 100,
        defaultBranch: 'main',
        branchProtection: true,
        secretScanning: true,
        dependabot: true,
        metadata: {
          visibility: 'private',
          branch_protection: {
            enabled: true,
            required_approving_review_count: 2,
            dismiss_stale_reviews: true,
          },
        },
      },
      {
        id: 'AST-AWS-01',
        name: 'acme-production-audit-logs',
        identifier: 'arn:aws:s3:::acme-production-audit-logs',
        provider: 'AWS',
        type: 'S3_STORAGE_BUCKET',
        criticality: 'TIER_1',
        complianceScore: 100,
        defaultBranch: 'us-east-1',
        branchProtection: true,
        metadata: {
          encryption: 'AES256-KMS',
          versioning: 'ENABLED',
          object_lock: 'COMPLIANCE',
          public_access_block: {
            block_public_acls: true,
            block_public_policy: true,
            ignore_public_acls: true,
            restrict_public_buckets: true,
          },
        },
      },
      {
        id: 'AST-AWS-02',
        name: 'acme-iam-root-admin',
        identifier: 'arn:aws:iam::123456789012:root',
        provider: 'AWS',
        type: 'IAM_SECURITY_PRINCIPAL',
        criticality: 'TIER_0',
        complianceScore: 82,
        defaultBranch: 'global',
        branchProtection: true,
        metadata: {
          mfa_enabled: true,
          hardware_mfa: true,
          access_keys_count: 0,
          password_policy: {
            min_length: 16,
            require_symbols: true,
            max_age_days: 90,
          },
        },
      },
    ];
  }, [isLiveMode, discoveredAssets]);

  const filteredAssets = useMemo(() => {
    return assetsList.filter(asset => {
      const matchesSearch = 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.identifier.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProvider = providerFilter === 'ALL' || asset.provider === providerFilter;
      return matchesSearch && matchesProvider;
    });
  }, [assetsList, searchQuery, providerFilter]);

  const stats = useMemo(() => {
    const total = assetsList.length;
    const protectedCount = assetsList.filter(a => a.branchProtection).length;
    const avgCompliance = total > 0 
      ? Math.round(assetsList.reduce((acc, a) => acc + (a.complianceScore || 0), 0) / total) 
      : 0;
    return { total, protectedCount, avgCompliance };
  }, [assetsList]);

  const handleInspectAst = (asset) => {
    setSelectedAsset(asset);
    setDrawerOpen(true);
  };

  const handleCopyAst = () => {
    if (!selectedAsset) return;
    navigator.clipboard.writeText(JSON.stringify(selectedAsset.metadata, null, 2));
    setCopiedAst(true);
    setTimeout(() => setCopiedAst(false), 2000);
  };

  const handleRefresh = async () => {
    if (isLiveMode) {
      try {
        await triggerLiveScan('REPOSITORIES');
        await fetchLiveTelemetry();
      } catch (err) {
        alert(`Failed to refresh assets inventory: ${err.message}`);
      }
    }
  };

  return (
    <div className="w-full h-full text-slate-900 dark:text-slate-100 font-sans max-w-[1520px] mx-auto pb-16 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-[10.5px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            {isLiveMode ? 'Live API Discovery' : 'Discovered Inventory'}
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Infrastructure Asset Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Continuously discovered repositories, identity principals, and cloud storage buckets parsed into canonical asset definitions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={scanRunning}
          className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 border border-zinc-900 dark:border-zinc-100 shadow-xs active:scale-[0.98] self-start md:self-auto shrink-0"
        >
          <RefreshCw size={12} className={scanRunning ? 'animate-spin text-orange-400 dark:text-orange-600' : ''} />
          <span>{scanRunning ? 'Scanning Assets...' : 'Refresh Inventory'}</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-500">Total Discovered Assets</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {stats.total} <span className="text-xs font-normal text-slate-500 font-mono">Nodes</span>
          </div>
        </div>
        <div className="p-4 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-500">Protected Infrastructure</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {stats.protectedCount} / {stats.total}
          </div>
        </div>
        <div className="p-4 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-mono text-slate-500">Average Asset Health</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            {stats.avgCompliance}%
          </div>
        </div>
      </div>

      {/* Search & Provider Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets by name or ARN / URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-1.5 rounded-lg text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
          />
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs">
          {['ALL', 'GITHUB', 'AWS'].map((prov) => (
            <button
              key={prov}
              type="button"
              onClick={() => setProviderFilter(prov)}
              className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer border ${
                providerFilter === prov
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-medium'
                  : 'bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* High-Density Enterprise Data Table */}
      <div className="bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {filteredAssets.length === 0 ? (
          <div className="p-12 text-center my-6 space-y-3">
            <Server size={32} className="text-slate-400 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {isLiveMode ? 'No Live Assets Discovered' : 'No Assets Found Matching Query'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              {isLiveMode 
                ? 'The live backend currently has zero discovered asset records. Connect GitHub in Connection Management and trigger a scan to discover repositories and branch policies.' 
                : 'Try adjusting your search query or provider filter to inspect monitored infrastructure nodes.'}
            </p>
            {isLiveMode && (
              <div className="pt-2">
                <Link
                  to="/dashboard/integrations"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-all no-underline"
                >
                  <span>Connect GitHub Integration &rarr;</span>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 font-medium">Identifier / Asset</th>
                  <th className="py-3 px-3 font-medium">Provider</th>
                  <th className="py-3 px-3 font-medium">Type</th>
                  <th className="py-3 px-3 font-medium">Scope</th>
                  <th className="py-3 px-3 font-medium">Protection</th>
                  <th className="py-3 px-3 font-medium">Compliance</th>
                  <th className="py-3 px-4 font-medium text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
                {filteredAssets.map((asset) => (
                  <tr 
                    key={asset.id} 
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0">
                          {asset.provider === 'GITHUB' ? <GitBranch size={14} /> : <Database size={14} />}
                        </div>
                        <div className="min-w-0 font-sans">
                          <div className="font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[280px]">
                            {asset.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono truncate max-w-[280px]">
                            {asset.identifier}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200 dark:border-slate-700">
                        {asset.provider}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400 text-[11px]">
                      {asset.type}
                    </td>

                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1">
                        <GitBranch size={11} className="text-slate-400" />
                        <span>{asset.defaultBranch}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      {asset.branchProtection ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
                          <CheckCircle2 size={12} />
                          <span>Enforced</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 text-[11px] font-medium">
                          <AlertTriangle size={12} />
                          <span>Disabled</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${asset.complianceScore >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                            style={{ width: `${asset.complianceScore}%` }} 
                          />
                        </div>
                        <span className="text-[11px] tabular-nums font-semibold">{asset.complianceScore}%</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleInspectAst(asset)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                      >
                        Inspect AST
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over AST Drawer for Detailed Inspection */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedAsset ? `Asset AST: ${selectedAsset.name}` : 'Asset Inspector'}
      >
        {selectedAsset && (
          <div className="p-6 space-y-6 font-mono text-xs text-slate-800 dark:text-slate-200">
            <div className="space-y-2 font-sans">
              <div className="text-xs text-slate-500 uppercase font-mono">Resource Identifier</div>
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-xs select-all break-all">
                {selectedAsset.identifier}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase">Parsed AST Metadata (JSON)</span>
                <button
                  type="button"
                  onClick={handleCopyAst}
                  className="flex items-center gap-1 text-[11px] text-orange-600 dark:text-orange-400 hover:underline cursor-pointer bg-transparent border-none"
                >
                  {copiedAst ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedAst ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-[11px] leading-relaxed overflow-x-auto border border-slate-800 max-h-[400px]">
                {JSON.stringify(selectedAsset.metadata, null, 2)}
              </pre>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium transition-colors cursor-pointer border-none"
              >
                Close Inspector
              </button>
            </div>
          </div>
        )}
      </Drawer>

    </div>
  );
}
