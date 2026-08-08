export const initialControls = [
  {
    id: "CTRL-IAM-001",
    name: "Multi-Factor Authentication",
    domain: "Identity & Access",
    status: "FAIL",
    frameworks: ["ISO 27001", "SOC 2", "NIST", "CIS"],
    evidenceCount: 12,
    resourcesCount: 48,
    lastEvaluated: "4 min ago",
    description: "Privileged identities must use multi-factor authentication.",
    evaluationLogic: {
      expected: "MFA = REQUIRED",
      observed: "MFA = DISABLED (6 identities)",
      result: "FAIL"
    }
  },
  {
    id: "CTRL-IAM-002",
    name: "Privileged Access Management",
    domain: "Identity & Access",
    status: "PASS",
    frameworks: ["ISO 27001", "SOC 2", "CIS"],
    evidenceCount: 8,
    resourcesCount: 16,
    lastEvaluated: "5 min ago",
    description: "Access to privileged accounts must be restricted and monitored."
  },
  {
    id: "CTRL-LOG-001",
    name: "Centralized Audit Logging",
    domain: "Logging & Monitoring",
    status: "FAIL",
    frameworks: ["ISO 27001", "SOC 2"],
    evidenceCount: 3,
    resourcesCount: 14,
    lastEvaluated: "6 min ago",
    description: "All critical systems must forward audit logs to a centralized location."
  },
  {
    id: "CTRL-DATA-004",
    name: "Public Storage Protection",
    domain: "Data Security",
    status: "FAIL",
    frameworks: ["ISO 27001", "SOC 2", "CIS"],
    evidenceCount: 2,
    resourcesCount: 37,
    lastEvaluated: "2 min ago",
    description: "Cloud storage buckets must not be publicly accessible.",
    evaluationLogic: {
      expected: "public_access_block = true",
      observed: "public_access_block = false",
      result: "FAIL"
    }
  },
  {
    id: "CTRL-NET-003",
    name: "Network Segmentation",
    domain: "Network Security",
    status: "PASS",
    frameworks: ["ISO 27001", "NIST"],
    evidenceCount: 18,
    resourcesCount: 48,
    lastEvaluated: "8 min ago",
    description: "Network environments must be isolated by purpose and risk level."
  },
  {
    id: "CTRL-BACKUP-002",
    name: "Backup Configuration",
    domain: "Resilience",
    status: "WARNING",
    frameworks: ["ISO 27001", "SOC 2"],
    evidenceCount: 5,
    resourcesCount: 9,
    lastEvaluated: "12 min ago",
    description: "Automated backups must be configured for all persistent storage."
  },
  {
    id: "CTRL-SEC-006",
    name: "Encryption at Rest",
    domain: "Data Security",
    status: "PASS",
    frameworks: ["ISO 27001", "SOC 2", "NIST", "CIS"],
    evidenceCount: 42,
    resourcesCount: 120,
    lastEvaluated: "1 min ago",
    description: "All sensitive data must be encrypted at rest using approved algorithms."
  }
];
