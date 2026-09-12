import { useState, useMemo } from 'react';
import { 
  Server, GitBranch, 
  Search, RefreshCw, CheckCircle2,
  AlertTriangle, Copy, Check
} from 'lucide-react';
import { useDemoStore } from '../store/demoStore';
import Drawer from '../components/ui/Drawer';

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
    if (isLiveMode && discoveredAssets.length > 0) {
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

    // Fallback: build list from demo store infrastructure
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
        secretScanning: true,
        dependabot: true,
        metadata: {
          region: 'us-east-1',
          versioning: 'Enabled',
          server_side_encryption: 'AES256',
          public_access_block: 'Enabled (Strict)',
        },
      },
      {
        id: 'AST-AWS-02',
        name: 'acme-iam-root-admin',
        identifier: 'arn:aws:iam::123456789012:root',
        provider: 'AWS',
        type: 'IAM_SECURITY_PRINCIPAL',
        criticality: 'TIER_1',
        complianceScore: 82,
        defaultBranch: 'global',
        branchProtection: true,
        secretScanning: true,
        dependabot: true,
        metadata: {
          mfa_active: true,
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
    <div className="w-full h-full text-slate-900 dark:text-slate-100 font-sans max-w-[1520px] mx-auto pb-16 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 mb-2 uppercase tracking-wider">
            {isLiveMode ? 'Live API Discovery' : 'Discovered Inventory'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Infrastructure Asset <span className="text-sky-600 dark:text-sky-400">Inventory</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
            Continuously discovered repositories, identity pools, and cloud storage buckets parsed into canonical asset definitions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={scanRunning}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300 text-xs font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer flex items-center gap-2 shadow-xs border-none self-start md:self-auto shrink-0"
        >
          <RefreshCw size={13} className={scanRunning ? 'animate-spin' : ''} />
          <span>{scanRunning ? 'Scanning Assets...' : 'Refresh Assets'}</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-mono font-bold text-slate-500 uppercase">Total Discovered Assets</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {stats.total} <span className="text-xs font-normal text-slate-500">Nodes</span>
          </div>
        </div>
        <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-mono font-bold text-slate-500 uppercase">Protected Infrastructure</div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {stats.protectedCount} / {stats.total}
          </div>
        </div>
        <div className="p-5 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="text-xs font-mono font-bold text-slate-500 uppercase">Average Asset Health</div>
          <div className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">
            {stats.avgCompliance}%
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search assets by name or URI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'GITHUB', 'AWS'].map((prov) => (
            <button
              key={prov}
              type="button"
              onClick={() => setProviderFilter(prov)}
              className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-xl border transition-all cursor-pointer ${
                providerFilter === prov
                  ? 'bg-slate-900 text-white dark:bg-sky-400 dark:text-slate-950 border-transparent shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Inventory Table */}
      <div className="overflow-x-auto bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              <th className="p-4">Identifier / Asset</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Type</th>
              <th className="p-4">Scope</th>
              <th className="p-4">Protection</th>
              <th className="p-4">Compliance</th>
              <th className="p-4 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-xs text-slate-500 font-mono">
                  No discovered infrastructure assets match your query.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 font-bold">
                    <div className="flex items-center gap-2.5">
                      <Server size={15} className="text-sky-500 shrink-0" />
                      <div>
                        <div className="text-slate-900 dark:text-slate-100 font-semibold">{asset.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono font-normal">{asset.identifier}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 text-[10.5px] bg-slate-100 dark:bg-slate-800 rounded-md font-mono font-bold text-slate-700 dark:text-slate-300">
                      {asset.provider}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                    {asset.type}
                  </td>
                  <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <GitBranch size={12} className="text-sky-500" />
                      {asset.defaultBranch}
                    </span>
                  </td>
                  <td className="p-4">
                    {asset.branchProtection ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                        <CheckCircle2 size={13} /> ENFORCED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-bold font-mono">
                        <AlertTriangle size={13} /> DISABLED
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${asset.complianceScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">{asset.complianceScore}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleInspectAst(asset)}
                      className="px-3 py-1 text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                      title="Inspect Raw AST Payload"
                    >
                      Inspect AST
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Raw AST Drawer Modal */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`Asset Payload // ${selectedAsset?.name || ''}`}
      >
        {selectedAsset && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-1">
              <div className="text-[10.5px] font-bold text-slate-500 uppercase">Asset Identifier</div>
              <div className="font-bold text-slate-900 dark:text-white break-all">{selectedAsset.identifier}</div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400">PROVIDER: {selectedAsset.provider} ({selectedAsset.type})</div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Raw Discovered Metadata:</span>
              <button
                type="button"
                onClick={handleCopyAst}
                className="px-3 py-1 rounded-lg bg-slate-900 text-white dark:bg-sky-400 dark:text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer border-none"
              >
                {copiedAst ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedAst ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto max-h-[420px] leading-relaxed border border-slate-800">
              {JSON.stringify(selectedAsset.metadata, null, 2)}
            </pre>
          </div>
        )}
      </Drawer>
    </div>
  );
}
