export const initialFindings = [
  {
    id: "FND-001",
    title: "Publicly accessible customer-data S3 bucket",
    severity: "CRITICAL",
    resource: "prod-customer-data",
    cloud: "AWS",
    account: "Production",
    region: "ap-south-1",
    controlId: "CTRL-DATA-004",
    frameworks: ["ISO 27001", "SOC 2", "CIS"],
    status: "Open",
    detectedTime: "12 min ago",
    description: "This configuration violates public access block requirements for sensitive data storage.",
    remediation: "Enable S3 Block Public Access for the affected bucket."
  },
  {
    id: "FND-002",
    title: "MFA missing for privileged IAM users",
    severity: "HIGH",
    resource: "6 identities",
    cloud: "AWS",
    account: "Identity",
    region: "Global",
    controlId: "CTRL-IAM-001",
    frameworks: ["ISO 27001", "SOC 2", "NIST", "CIS"],
    status: "Open",
    detectedTime: "24 min ago",
    description: "Privileged users were detected without Multi-Factor Authentication enabled.",
    remediation: "Enforce MFA for all users with AdministratorAccess or similar privileged policies."
  },
  {
    id: "FND-003",
    title: "CloudTrail retention below required threshold",
    severity: "MEDIUM",
    resource: "prod-audit-trail",
    cloud: "AWS",
    account: "Logging",
    region: "us-east-1",
    controlId: "CTRL-LOG-001",
    frameworks: ["ISO 27001", "SOC 2"],
    status: "Open",
    detectedTime: "1 hr ago",
    description: "Audit trail log retention is configured for less than 365 days.",
    remediation: "Update the S3 bucket lifecycle policy for CloudTrail to retain logs for at least 365 days."
  }
];
