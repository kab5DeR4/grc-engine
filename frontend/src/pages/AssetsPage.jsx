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
    <div className="space-y-6 font-mono text-[#1A1917] dark:text-[#E7E3DA]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 hairline-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-[#9B3418]"></span>
            <span className="text-[10px] mono-label text-[#9B3418] uppercase">
              {isLiveMode ? 'LIVE API DISCOVERY' : 'OFFLINE DEMO TELEMETRY'}
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#1A1917] dark:text-[#E7E3DA]">
            DISCOVERED ASSETS INVENTORY<span className="text-[#9B3418]">.</span>
          </h1>
          <p className="text-xs text-[#6E6A61] dark:text-[#A8A49C] mt-1">
            Infrastructure-as-Source-of-Truth: Discovered repositories, identity pools, and cloud storage buckets parsed deterministically.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={scanRunning}
            className="studio-btn text-[11px] py-2 px-3 flex items-center gap-2"
          >
            <RefreshCw size={13} className={scanRunning ? 'animate-spin text-[#9B3418]' : ''} />
            <span>{scanRunning ? 'SCANNING ASSETS...' : 'REFRESH ASSETS'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all">
          <div className="text-[10px] mono-label text-[#6E6A61] dark:text-[#A8A49C]">TOTAL DISCOVERED ASSETS</div>
          <div className="text-2xl font-bold font-mono text-[#1A1917] dark:text-[#E7E3DA] mt-1">
            {stats.total} <span className="text-xs font-normal text-[#9B3418]">NODES</span>
          </div>
        </div>
        <div className="p-4 bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all">
          <div className="text-[10px] mono-label text-[#6E6A61] dark:text-[#A8A49C]">PROTECTED ASSETS (BRANCH/ENCRYPTION)</div>
          <div className="text-2xl font-bold font-mono text-[#1A1917] dark:text-[#E7E3DA] mt-1">
            {stats.protectedCount} / {stats.total}
          </div>
        </div>
        <div className="p-4 bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all">
          <div className="text-[10px] mono-label text-[#6E6A61] dark:text-[#A8A49C]">AVERAGE ASSET COMPLIANCE</div>
          <div className="text-2xl font-bold font-mono text-[#1A1917] dark:text-[#E7E3DA] mt-1">
            {stats.avgCompliance}%
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6A61]" />
          <input
            type="text"
            placeholder="Search assets by name or URI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#E7E3DA] dark:bg-[#1A1917] hairline-all text-xs font-mono placeholder-[#6E6A61] focus:outline-none focus:border-[#9B3418]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'GITHUB', 'AWS'].map((prov) => (
            <button
              key={prov}
              onClick={() => setProviderFilter(prov)}
              className={`px-3 py-1 text-[10px] font-mono hairline-all transition-colors ${
                providerFilter === prov
                  ? 'bg-[#1A1917] text-[#E7E3DA] dark:bg-[#E7E3DA] dark:text-[#1A1917] font-bold'
                  : 'bg-[#E7E3DA] dark:bg-[#1A1917] hover:border-[#9B3418]'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Inventory Table */}
      <div className="overflow-x-auto bg-[#E7E3DA] dark:bg-[#1A1917] hairline-all">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#DCD7CB] dark:bg-[#2A2825] hairline-b text-[10px] mono-label text-[#4A4741] dark:text-[#A8A49C]">
              <th className="p-3">IDENTIFIER / ASSET</th>
              <th className="p-3">PROVIDER</th>
              <th className="p-3">TYPE</th>
              <th className="p-3">DEFAULT SCOPE</th>
              <th className="p-3">BRANCH PROTECTION</th>
              <th className="p-3">COMPLIANCE</th>
              <th className="p-3 text-right">INSPECT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCD7CB] dark:divide-[#2A2825]">
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-xs text-[#6E6A61]">
                  No discovered infrastructure assets match query.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-[#DCD7CB]/40 dark:hover:bg-[#2A2825]/40 transition-colors">
                  <td className="p-3 font-bold">
                    <div className="flex items-center gap-2">
                      <Server size={14} className="text-[#9B3418] shrink-0" />
                      <div>
                        <div className="text-[#1A1917] dark:text-[#E7E3DA]">{asset.name}</div>
                        <div className="text-[10px] text-[#6E6A61] font-normal">{asset.identifier}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[9.5px] bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all font-bold">
                      {asset.provider}
                    </span>
                  </td>
                  <td className="p-3 text-[10.5px] text-[#6E6A61] dark:text-[#A8A49C]">
                    {asset.type}
                  </td>
                  <td className="p-3 font-mono text-[10.5px]">
                    <span className="flex items-center gap-1">
                      <GitBranch size={11} className="text-[#9B3418]" />
                      {asset.defaultBranch}
                    </span>
                  </td>
                  <td className="p-3">
                    {asset.branchProtection ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-green-700 dark:text-green-400 font-bold">
                        <CheckCircle2 size={12} /> ENFORCED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#9B3418] font-bold">
                        <AlertTriangle size={12} /> DISABLED
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#DCD7CB] dark:bg-[#2A2825] h-1.5 overflow-hidden">
                        <div
                          className="bg-[#9B3418] h-full"
                          style={{ width: `${asset.complianceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-bold">{asset.complianceScore}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleInspectAst(asset)}
                      className="px-2.5 py-1 text-[10px] bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all hover:border-[#9B3418] transition-colors"
                      title="Inspect Raw AST Payload"
                    >
                      [ RAW AST ]
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
        title={`ASSET AST // ${selectedAsset?.name || ''}`}
      >
        {selectedAsset && (
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 bg-[#DCD7CB] dark:bg-[#2A2825] hairline-all space-y-1">
              <div className="text-[10px] mono-label text-[#6E6A61]">ASSET IDENTIFIER</div>
              <div className="font-bold text-[#1A1917] dark:text-[#E7E3DA]">{selectedAsset.identifier}</div>
              <div className="text-[10px] text-[#9B3418]">PROVIDER: {selectedAsset.provider} ({selectedAsset.type})</div>
            </div>

            <div className="flex items-center justify-between">
              <span className="mono-label text-[10px]">RAW PARSED METADATA TREE</span>
              <button
                onClick={handleCopyAst}
                className="studio-btn text-[10px] py-1 px-2.5 flex items-center gap-1.5"
              >
                {copiedAst ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                <span>{copiedAst ? 'COPIED AST' : 'COPY JSON'}</span>
              </button>
            </div>

            <pre className="p-3 bg-[#1A1917] text-[#E7E3DA] dark:bg-[#0D0C0B] hairline-all text-[11px] overflow-x-auto max-h-[400px] leading-relaxed">
              {JSON.stringify(selectedAsset.metadata, null, 2)}
            </pre>
          </div>
        )}
      </Drawer>
    </div>
  );
}
