export const initialEvidence = [
  {
    id: "EV-001",
    source: "aws_s3_bucket.customer_data",
    controlId: "CTRL-DATA-004",
    collectedAt: "2026-08-08 12:41 UTC",
    method: "AWS API",
    hash: "sha256:8f29d4a1...72c9",
    integrity: "VERIFIED",
    configuration: "public_access_block = false"
  },
  {
    id: "EV-002",
    source: "prod-admin-role",
    controlId: "CTRL-IAM-001",
    collectedAt: "2026-08-08 12:41 UTC",
    method: "AWS API",
    hash: "sha256:a1b2c3d4...e5f6",
    integrity: "VERIFIED",
    configuration: "mfa_active = false"
  }
];
