import { useState } from 'react';
import { 
  Cloud, GitBranch, Bell, Settings, Search, 
  CheckCircle2, Globe, Server, Boxes, GitPullRequest, 
  Terminal, Zap, MessageSquare, CheckSquare, ShieldAlert, 
  Workflow, RefreshCw, Check, ShieldCheck
} from 'lucide-react';

// Centralized integration data with added enterprise config parameters
const integrationsData = [
  { 
    id: 'aws',
    name: 'Amazon Web Services', 
    category: 'CLOUD',
    type: 'API Integration', 
    status: 'CONNECTED',
    icon: Cloud,
    description: 'Continuous ingestion of AWS CloudTrail, Security Hub, Config, and IAM posture metrics.',
    config: {
      account_id: '849204819201',
      role_arn: 'arn:aws:iam::849204819201:role/GRC-Telemetry',
      region: 'us-east-1'
    },
    telemetry: ['CloudTrail Audit Logs', 'IAM Policy Simulator', 'S3 Bucket Configurations', 'EC2 Security Groups'],
    lastSync: '2 minutes ago',
  },
  { 
    id: 'azure',
    name: 'Microsoft Azure', 
    category: 'CLOUD',
    type: 'API Integration', 
    status: 'DISCONNECTED',
    icon: Globe,
    description: 'Ingests Azure Activity Logs, Defender for Cloud findings, and Key Vault encryption metrics.',
    config: {
      tenant_id: 'b4a92c81-8120-43ef-a9d1-819203912048',
      client_id: '71920481-4910-4821-b819-019284019284',
      region: 'eastus'
    },
    telemetry: ['Azure Security Center Logs', 'RBAC Assignments', 'Key Vault Rotation Logs'],
    lastSync: 'Never',
  },
  { 
    id: 'gcp',
    name: 'Google Cloud Platform', 
    category: 'CLOUD',
    type: 'API Integration', 
    status: 'CONNECTED',
    icon: Server,
    description: 'Real-time telemetry from GCP Audit Logs, Security Command Center, and IAM policy bindings.',
    config: {
      project_id: 'grc-core-infra-production',
      sa_key: 'gcp-sa-key-production.json',
      region: 'us-central1'
    },
    telemetry: ['Cloud Audit Logs', 'GCP IAM Binding Matrix', 'VPC Firewall Rules'],
    lastSync: '10 minutes ago',
  },
  { 
    id: 'k8s',
    name: 'Kubernetes', 
    category: 'CLOUD',
    type: 'Agent / Helm', 
    status: 'CONNECTED',
    icon: Boxes,
    description: 'Helm chart agent for Kubernetes cluster runtime security and Pod Security Admission.',
    config: {
      cluster_endpoint: 'https://k8s.prod.grc.internal:6443',
      helm_token: 'grc-agent-live-81920419',
      namespace: 'security-agents'
    },
    telemetry: ['Pod Security Standards', 'Kyverno / OPA Admission Logs', 'Container Runtime Events'],
    lastSync: '1 minute ago',
  },
  { 
    id: 'github-actions',
    name: 'GitHub Actions', 
    category: 'CI/CD',
    type: 'Native Action', 
    status: 'CONNECTED',
    icon: GitBranch,
    description: 'Native workflow action blocking non-compliant pull requests before code merge.',
    config: {
      repository: 'grc-engine/frontend',
      secret_token: 'grc_sec_9182301928301928',
      branch: 'main'
    },
    telemetry: ['PR Policy Evaluation', 'Pipeline Static Checks', 'Dependency CVE Audits'],
    lastSync: '5 minutes ago',
  },
  { 
    id: 'gitlab-ci',
    name: 'GitLab CI', 
    category: 'CI/CD',
    type: 'Runner Plugin', 
    status: 'DISCONNECTED',
    icon: GitPullRequest,
    description: 'Custom runner executor validating Terraform and policy checks in merge requests.',
    config: {
      host_url: 'https://gitlab.com',
      webhook_secret: 'gl_wh_sec_7182930129',
      project_id: ''
    },
    telemetry: ['Merge Request Checks', 'Container Scan Artefacts', 'DAST Policy Gates'],
    lastSync: 'Never',
  },
  { 
    id: 'jenkins',
    name: 'Jenkins', 
    category: 'CI/CD',
    type: 'Pipeline Plugin', 
    status: 'CONNECTED',
    icon: Terminal,
    description: 'Jenkinsfile plugin providing gatekeeper verification for automated deployments.',
    config: {
      master_url: 'https://ci.grc-engine.internal:8080',
      api_token: 'jk_usr_819203910293',
      job_name: 'core-api-deploy'
    },
    telemetry: ['Build Pipeline Gates', 'Artifact Attestations', 'Build Slave Security'],
    lastSync: '1 hour ago',
  },
  { 
    id: 'slack',
    name: 'Slack', 
    category: 'WORKFLOW',
    type: 'App Integration', 
    status: 'CONNECTED',
    icon: MessageSquare,
    description: 'Real-time channel alerts and interactive remediation commands in Slack.',
    config: {
      webhook_url: 'https://hooks.slack.com/services/T00/B00/XXXX',
      channel: '#grc-compliance-alerts',
      bot_token: 'xoxb-12345-67890'
    },
    telemetry: ['Violation Notifications', 'Interactive Remediation Approvals', 'Daily Health Digests'],
    lastSync: '30 seconds ago',
  },
  { 
    id: 'jira',
    name: 'Jira Software', 
    category: 'WORKFLOW',
    type: 'Ticket Sync', 
    status: 'CONNECTED',
    icon: CheckSquare,
    description: 'Automatic creation, assignment, and status sync of Jira remediation tickets.',
    config: {
      domain: 'grcengine.atlassian.net',
      project_key: 'COMP',
      issue_type: 'Security Bug'
    },
    telemetry: ['Auto-Ticket Creation', 'SLA Tracking', 'Bi-directional Status Sync'],
    lastSync: '15 minutes ago',
  },
  { 
    id: 'pagerduty',
    name: 'PagerDuty', 
    category: 'WORKFLOW',
    type: 'Incident Creation', 
    status: 'DISCONNECTED',
    icon: ShieldAlert,
    description: 'Immediate high-severity incident triggering and escalation for on-call engineers.',
    config: {
      routing_key: 'pd_route_918230918230',
      severity: 'HIGH',
      service_id: ''
    },
    telemetry: ['Critical Breach Pages', 'Escalation Logs', 'On-Call Acknowledgment'],
    lastSync: 'Never',
  }
];

export default function DashboardIntegrations() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedIntegration, setSelectedIntegration] = useState(integrationsData[0]);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [configState, setConfigState] = useState(integrationsData.reduce((acc, curr) => {
    acc[curr.id] = { ...curr.config };
    return acc;
  }, {}));

  const categories = ['ALL', 'CLOUD', 'CI/CD', 'WORKFLOW'];

  const filteredIntegrations = integrationsData.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.type.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        success: true,
        message: `Connection to ${selectedIntegration.name} OK (18ms).`
      });
    }, 1000);
  };

  const handleConfigChange = (key, value) => {
    setConfigState(prev => ({
      ...prev,
      [selectedIntegration.id]: {
        ...prev[selectedIntegration.id],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    // casual save msg
    alert('Config saved successfully!');
  };

  const currentConfig = configState[selectedIntegration.id];

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      <main className="py-12 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="mb-12 pb-6 hairline-b">
          <div className="mono-label text-[#9B3418] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#9B3418] inline-block"></span>
            SYSTEM INTEGRATIONS & ECOSYSTEM
          </div>
          <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
            Connection <span className="serif-italic-pigment">Management</span>
          </h1>
          <p className="mono-body text-[13px] text-[#4A4741] mt-3 max-w-3xl">
            Configure telemetry ingress points, CI/CD policy enforcements, and downstream workflow alerts. Manage API credentials and verify live connection health.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 hairline-b">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`mono-label text-[10.5px] px-3 py-1.5 cursor-pointer border transition-colors ${
                  activeCategory === cat 
                    ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917]' 
                    : 'bg-transparent text-[#1A1917] border-[#1A1917]'
                }`}
              >
                [ {cat} ]
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-[#6E6A61]" />
            <input
              type="text"
              placeholder="SEARCH INTEGRATIONS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#DCD7CB] border border-[#1A1917] pl-8 pr-3 py-1.5 text-[11px] mono-label text-[#1A1917] outline-none focus:border-[#9B3418]"
            />
          </div>
        </div>

        {/* Two-Column Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Integration List */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-4">
            {filteredIntegrations.length === 0 ? (
              <div className="p-8 text-center bg-[#DCD7CB]/50 hairline-all mono-label text-[11px] text-[#6E6A61]">
                NO INTEGRATIONS FOUND
              </div>
            ) : (
              filteredIntegrations.map((item) => {
                const isSelected = selectedIntegration.id === item.id;
                const ItemIcon = item.icon || Settings;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedIntegration(item);
                      setTestResult(null);
                    }}
                    className={`p-4 cursor-pointer hairline-all transition-colors flex items-center gap-4 ${
                      isSelected ? 'bg-[#DCD7CB] border-l-4 border-l-[#9B3418]' : 'bg-[#E7E3DA] hover:bg-[#DCD7CB]/50'
                    }`}
                  >
                    <div className={`p-2 hairline-all ${isSelected ? 'bg-[#9B3418] text-[#E7E3DA]' : 'bg-[#F2F0EB] text-[#1A1917]'}`}>
                      <ItemIcon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="serif-heading text-[18px] font-semibold text-[#1A1917]">{item.name}</h3>
                        <span className={`px-2 py-0.5 mono-label text-[9px] ${
                          item.status === 'CONNECTED' ? 'bg-[#1A1917] text-[#E7E3DA]' : 'border border-[#9B3418] text-[#9B3418]'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="mono-label text-[10px] text-[#6E6A61]">
                        {item.type}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Configuration Sheet */}
          {selectedIntegration && (
            <div className="lg:col-span-6 xl:col-span-7 bg-[#DCD7CB] p-6 hairline-all sticky top-[80px] h-fit">
              <div className="flex items-center justify-between mb-4 border-b border-[#1A1917]/20 pb-4">
                <div>
                  <div className="mono-label text-[#9B3418] mb-1 tracking-widest text-[10px]">CONFIGURATION PROFILE</div>
                  <h2 className="font-serif text-[28px] font-bold text-[#1A1917] flex items-center gap-3">
                    {selectedIntegration.name}
                  </h2>
                </div>
                <selectedIntegration.icon size={32} className="text-[#1A1917]/20" />
              </div>

              <div className="space-y-6">
                {/* Overview */}
                <p className="mono-body text-[12px] text-[#4A4741] leading-relaxed">
                  {selectedIntegration.description}
                </p>

                {/* Status & Test */}
                <div className="p-4 bg-[#E7E3DA] hairline-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="mono-label text-[10px] text-[#6E6A61] mb-1">CONNECTION STATUS</div>
                    <div className="flex items-center gap-2 font-bold text-[13px] text-[#1A1917]">
                      <span className={`w-2 h-2 rounded-full ${selectedIntegration.status === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      {selectedIntegration.status === 'CONNECTED' ? 'Active & Healthy' : 'Action Required'}
                    </div>
                    <div className="mono-label text-[9.5px] text-[#6E6A61] mt-1">LAST SYNC: {selectedIntegration.lastSync.toUpperCase()}</div>
                  </div>
                  <button
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="px-4 py-2 bg-[#1A1917] text-[#E7E3DA] text-[10.5px] mono-label hover:bg-[#9B3418] transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isTesting ? <><RefreshCw size={14} className="animate-spin" /> PINGING...</> : <><ShieldCheck size={14} /> TEST CONNECTION</>}
                  </button>
                </div>

                {testResult && (
                  <div className="p-3 bg-emerald-100/50 border border-emerald-400 text-emerald-900 text-[11px] mono-label flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-700" />
                    {testResult.message}
                  </div>
                )}

                {/* Params */}
                <div>
                  <div className="mono-label text-[11px] font-bold text-[#1A1917] mb-3">CONNECTION PARAMETERS</div>
                  <div className="space-y-3 bg-[#E7E3DA] p-4 hairline-all">
                    {Object.entries(currentConfig).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-[10px] mono-label text-[#6E6A61] mb-1 uppercase">{key.replace('_', ' ')}</label>
                        <input 
                          type="text"
                          value={value}
                          onChange={(e) => handleConfigChange(key, e.target.value)}
                          className="w-full bg-[#F2F0EB] border border-[#1A1917]/30 px-3 py-2 text-[12px] mono-label text-[#1A1917] outline-none focus:border-[#9B3418]"
                        />
                      </div>
                    ))}
                    <div className="pt-2 flex justify-end">
                       <button onClick={handleSave} className="px-6 py-2 bg-[#9B3418] text-[#E7E3DA] mono-label text-[11px] hover:bg-[#1A1917] transition-colors">
                         [ SAVE CONFIGURATION ]
                       </button>
                    </div>
                  </div>
                </div>

                {/* Monitored streams */}
                <div>
                  <div className="mono-label text-[11px] font-bold text-[#1A1917] mb-3">ACTIVE TELEMETRY STREAMS</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedIntegration.telemetry.map((stream, idx) => (
                      <div key={idx} className="p-2 bg-[#E7E3DA] hairline-all text-[10.5px] mono-label text-[#4A4741] flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#9B3418] rounded-full" />
                        {stream.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
