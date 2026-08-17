import { 
  Cloud, GitBranch, Bell, Settings, Search, 
  CheckCircle2, Globe, Server, Boxes, GitPullRequest, 
  Terminal, Zap, MessageSquare, CheckSquare, ShieldAlert, 
  Workflow, RefreshCw, Check, ShieldCheck
} from 'lucide-react';

export const integrationsData = [
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
