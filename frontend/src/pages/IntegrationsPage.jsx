import { useState } from 'react';
import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import { 
  Cloud, GitBranch, Bell, Settings, Search, 
  Globe, Server, Boxes, GitPullRequest, Terminal, Zap, MessageSquare, 
  CheckSquare, ShieldAlert, Workflow, ChevronDown, ChevronUp, Network,
  ShieldCheck, FileCode
} from 'lucide-react';

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

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

  const filteredIntegrations = integrations.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen bg-[#E7E3DA] text-[#1A1917] font-mono flex flex-col">
      <StudioNav />
      
      {/* Header */}
      <header className="pt-32 pb-12 px-6 md:px-12 max-w-5xl mx-auto w-full border-b border-[#1A1917]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mono-label text-[10px] text-[#9B3418] mb-3 tracking-widest uppercase">
              Ecosystem Matrix
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1917] tracking-tight">
              Platform Integrations
            </h1>
            <p className="text-[13px] text-[#6E6A61] mt-3 max-w-xl leading-relaxed">
              Real-time ingestion pipelines and automated enforcement hooks.
            </p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-2.5 text-[#6E6A61]" />
            <input
              type="text"
              placeholder="SEARCH PLATFORMS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-[#1A1917]/30 pl-8 pr-3 py-2 text-[11px] mono-label text-[#1A1917] outline-none focus:border-[#9B3418] transition-colors placeholder:text-[#6E6A61]"
            />
          </div>
        </div>
      </header>

      {/* Minimalist List */}
      <main className="px-6 md:px-12 py-12 max-w-5xl mx-auto w-full flex-1">
        
        {/* Table Header */}
        <div className="flex items-center px-4 py-2 mb-2 text-[10px] mono-label text-[#6E6A61] border-b border-[#1A1917]/20 uppercase gap-4">
          <div className="w-10"></div>
          <div className="flex-1">Platform</div>
          <div className="hidden md:block w-48">Category</div>
          <div className="w-24 text-right">Status</div>
          <div className="w-10"></div>
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {filteredIntegrations.map((item) => {
            const isExpanded = expandedId === item.id;
            const ItemIcon = item.icon || Settings;

            return (
              <div 
                key={item.id} 
                className={`transition-colors duration-200 border border-transparent ${
                  isExpanded ? 'bg-[#F2F0EB] border-[#1A1917]/10 shadow-sm' : 'hover:bg-[#F2F0EB]/50'
                }`}
              >
                {/* Clickable Row */}
                <div 
                  onClick={() => toggleExpand(item.id)}
                  className="flex items-center px-4 py-3 cursor-pointer group gap-4"
                >
                  <div className="w-10 text-[#6E6A61] group-hover:text-[#9B3418] transition-colors">
                    <ItemIcon size={18} />
                  </div>
                  
                  <div className="flex-1 text-[13px] font-bold text-[#1A1917]">
                    {item.name}
                  </div>
                  
                  <div className="hidden md:block w-48 text-[11px] text-[#6E6A61]">
                    {item.category}
                  </div>
                  
                  <div className="w-24 text-right">
                    <span className={`text-[9px] mono-label px-2 py-0.5 border ${
                      item.status === 'Production' 
                        ? 'border-[#1A1917]/20 text-[#1A1917]' 
                        : 'border-[#9B3418]/30 text-[#9B3418] bg-[#9B3418]/5'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="w-10 flex justify-end text-[#6E6A61] group-hover:text-[#1A1917] transition-colors">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Inline Compact Expansion */}
                {isExpanded && (
                  <div className="px-14 pb-5 pt-1 border-t border-[#1A1917]/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] text-[#4A4741]">
                      
                      {/* Architecture */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[9.5px] mono-label text-[#9B3418]">
                          <Network size={12} /> ARCHITECTURE
                        </div>
                        <p>{item.architecture}</p>
                      </div>

                      {/* Telemetry */}
                      <div className="space-y-1.5 md:col-span-1">
                        <div className="flex items-center gap-1.5 text-[9.5px] mono-label text-[#9B3418]">
                          <FileCode size={12} /> TELEMETRY STREAMS
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 marker:text-[#9B3418]">
                          {item.telemetry.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      </div>

                      {/* Compliance */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[9.5px] mono-label text-[#9B3418]">
                          <ShieldCheck size={12} /> FRAMEWORKS
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.compliance.map((c, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-[#E7E3DA] border border-[#1A1917]/10 text-[9.5px] text-[#1A1917] font-semibold">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredIntegrations.length === 0 && (
            <div className="text-center py-12 text-[12px] text-[#6E6A61]">
              No platforms matching "{searchQuery}"
            </div>
          )}
        </div>
      </main>

      <StudioFooter />
    </div>
  );
}
