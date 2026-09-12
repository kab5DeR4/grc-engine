import { useState } from 'react';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import { 
  Cloud, GitBranch, Settings, Search, 
  Globe, Server, Boxes, GitPullRequest, Terminal, Zap, MessageSquare, 
  CheckSquare, ShieldAlert, Workflow, ChevronDown, ChevronUp, Network,
  ShieldCheck, FileCode, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);

  const categories = ['ALL', 'Cloud Provider', 'Infrastructure', 'CI/CD Pipeline', 'Workflow'];

  const integrations = [
    { 
      id: 'aws', 
      name: 'Amazon Web Services', 
      category: 'Cloud Provider',
      status: 'Production', 
      icon: Cloud,
      architecture: 'Cross-Account IAM Role + AWS EventBridge',
      telemetry: ['CloudTrail Audit', 'IAM Access Analyzer', 'S3 Config', 'EC2 Security Groups'],
      compliance: ['SOC 2', 'ISO 27001', 'NIST 800-53', 'CIS AWS']
    },
    { 
      id: 'azure', 
      name: 'Microsoft Azure', 
      category: 'Cloud Provider',
      status: 'Production', 
      icon: Globe,
      architecture: 'Azure Service Principal + Event Grid',
      telemetry: ['Activity Logs', 'Defender Alerts', 'RBAC Matrix', 'Key Vault Audits'],
      compliance: ['SOC 2', 'ISO 27001', 'HIPAA', 'CIS Azure']
    },
    { 
      id: 'gcp', 
      name: 'Google Cloud Platform', 
      category: 'Cloud Provider',
      status: 'Production', 
      icon: Server,
      architecture: 'Service Account Token + Cloud Pub/Sub',
      telemetry: ['Cloud Audit Logs', 'SCC Findings', 'IAM Policy Bindings', 'VPC Rules'],
      compliance: ['SOC 2', 'NIST 800-53', 'PCI-DSS v4']
    },
    { 
      id: 'k8s', 
      name: 'Kubernetes', 
      category: 'Infrastructure',
      status: 'Production', 
      icon: Boxes,
      architecture: 'DaemonSet + eBPF Runtime Inspection',
      telemetry: ['Pod Security Standards', 'Admission Audit', 'Network Policies'],
      compliance: ['NIST SP 800-190', 'SOC 2', 'CIS K8s']
    },
    { 
      id: 'github-actions', 
      name: 'GitHub Actions', 
      category: 'CI/CD Pipeline',
      status: 'Production', 
      icon: GitBranch,
      architecture: 'GitHub App Webhook + Native Check',
      telemetry: ['PR Security Gates', 'SAST Results', 'Dependency Audits'],
      compliance: ['SLSA Level 3', 'SOC 2', 'ISO 27001']
    },
    { 
      id: 'gitlab-ci', 
      name: 'GitLab CI', 
      category: 'CI/CD Pipeline',
      status: 'Production', 
      icon: GitPullRequest,
      architecture: 'Pipeline Webhook + Runner Gatekeeper',
      telemetry: ['MR Gatekeeper', 'Container Vuln Scans', 'Terraform Plan Checks'],
      compliance: ['SOC 2', 'ISO 27001']
    },
    { 
      id: 'jenkins', 
      name: 'Jenkins', 
      category: 'CI/CD Pipeline',
      status: 'Production', 
      icon: Terminal,
      architecture: 'Jenkinsfile Step + Shared Library',
      telemetry: ['Pipeline Gate Logs', 'Artifact Attestations', 'Build Node State'],
      compliance: ['NIST 800-53', 'SOC 2']
    },
    { 
      id: 'circleci', 
      name: 'CircleCI', 
      category: 'CI/CD Pipeline',
      status: 'Beta', 
      icon: Zap,
      architecture: 'Official Orb + API Attestation',
      telemetry: ['Orb Execution Steps', 'SBOM Generation', 'Build Signatures'],
      compliance: ['SLSA Level 2', 'NIST C-SCRM']
    },
    { 
      id: 'slack', 
      name: 'Slack', 
      category: 'Workflow',
      status: 'Production', 
      icon: MessageSquare,
      architecture: 'Slack Bot API + Block Kit UI',
      telemetry: ['Real-Time Alerts', 'Interactive Remediation', 'Executive Digests'],
      compliance: ['SOC 2', 'ISO 27001']
    },
    { 
      id: 'jira', 
      name: 'Jira Software', 
      category: 'Workflow',
      status: 'Production', 
      icon: CheckSquare,
      architecture: 'Atlassian OAuth Webhook + Status Sync',
      telemetry: ['Auto Ticket Creation', 'SLA Tracking', 'Resolution Sync'],
      compliance: ['ISO 27001', 'SOC 2']
    },
    { 
      id: 'pagerduty', 
      name: 'PagerDuty', 
      category: 'Workflow',
      status: 'Production', 
      icon: ShieldAlert,
      architecture: 'PagerDuty Events API + Escalation Engine',
      telemetry: ['Critical Pages', 'Escalation Logs', 'On-Call Acks'],
      compliance: ['SOC 2', 'NIST 800-53']
    },
    { 
      id: 'servicenow', 
      name: 'ServiceNow', 
      category: 'Workflow',
      status: 'Beta', 
      icon: Workflow,
      architecture: 'REST Table API + CMDB Sync',
      telemetry: ['Change Ticket Sync', 'Audit Record Exports', 'CMDB Mapping'],
      compliance: ['ISO 27001', 'SOC 2']
    },
  ];

  const filteredIntegrations = integrations.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.telemetry.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen bg-[var(--ground)] text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors">
      <StudioNav />
      
      {/* Header */}
      <header className="pt-32 pb-12 px-6 md:px-12 max-w-6xl mx-auto w-full border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Network size={13} />
              <span>ECOSYSTEM & INGESTION MATRIX</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Platform Integrations
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-3 max-w-xl leading-relaxed">
              Real-time ingestion pipelines, read-only cloud telemetry connectors, CI/CD policy gates, and automated incident escalations.
            </p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Filter integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--surface)] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 shadow-xs'
                  : 'bg-[var(--surface)] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main List */}
      <main className="px-6 md:px-12 py-10 max-w-6xl mx-auto w-full flex-1">
        
        {/* Table Header */}
        <div className="hidden md:flex items-center px-5 py-2.5 mb-2 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 gap-4">
          <div className="w-10"></div>
          <div className="flex-1">Platform</div>
          <div className="w-48">Category</div>
          <div className="w-28 text-center">Status</div>
          <div className="w-24 text-right">Details</div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {filteredIntegrations.map((item) => {
            const isExpanded = expandedId === item.id;
            const ItemIcon = item.icon || Settings;

            return (
              <div 
                key={item.id} 
                className={`bg-[var(--surface)] rounded-xl border transition-all ${
                  isExpanded 
                    ? 'border-sky-500/50 shadow-sm ring-1 ring-sky-500/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Clickable Row */}
                <div 
                  onClick={() => toggleExpand(item.id)}
                  className="flex items-center px-5 py-4 cursor-pointer group gap-4 select-none"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:bg-sky-500/10 transition-colors shrink-0">
                    <ItemIcon size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate md:hidden mt-0.5">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-48 text-xs font-mono text-slate-500 dark:text-slate-400">
                    {item.category}
                  </div>
                  
                  <div className="w-28 text-center">
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      item.status === 'Production' 
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="w-24 flex justify-end text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Inline Expansion */}
                {isExpanded && (
                  <div className="px-5 md:px-16 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-400 mt-3">
                      
                      {/* Architecture */}
                      <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                          <Network size={13} /> ARCHITECTURE
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans">{item.architecture}</p>
                      </div>

                      {/* Telemetry */}
                      <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                          <FileCode size={13} /> TELEMETRY STREAMS
                        </div>
                        <ul className="space-y-1">
                          {item.telemetry.map((t, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0"></span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Compliance */}
                      <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase mb-2">
                            <ShieldCheck size={13} /> FRAMEWORKS MAPPED
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.compliance.map((c, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-[var(--surface)] border border-slate-200 dark:border-slate-700 text-[10.5px] font-mono font-semibold text-slate-700 dark:text-slate-300">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link
                          to="/dashboard/integrations"
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline"
                        >
                          <span>CONFIGURE IN WORKSPACE</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredIntegrations.length === 0 && (
            <div className="text-center py-16 bg-[var(--surface)] rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500">
              No integrations matching "{searchQuery}" in category "{selectedCategory}"
            </div>
          )}
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
