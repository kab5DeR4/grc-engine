# DEMO MODE — MANDATORY FOR PROTOTYPE

Because the backend, real AWS/GitHub integrations, live infrastructure discovery, evidence collection, and continuous scanning are not yet implemented, the prototype MUST include a fully functional **Demo Mode**.

Demo Mode should make the application feel like a real, already-operational GRC platform.

## 1. DEMO ENTRY

On the login/landing screen provide two clear options:

**Sign In**

and a secondary but highly visible:

**Explore Interactive Demo**

The demo should require no credentials.

Clicking:

**Explore Interactive Demo**

immediately enters the application with a pre-populated fictional organization.

Use:

**Acme Systems**

Environment:

**Production**

---

# 2. DEMO MODE INDICATOR

Once inside Demo Mode, display a subtle persistent indicator in the application shell:

**DEMO MODE**

It should be visible but not distracting.

Example:

`DEMO • Acme Systems`

Place it near the workspace selector.

Clicking it opens:

**Demo Environment**

This environment contains simulated infrastructure and compliance data.

---

# 3. DEMO DATA MUST BE CONSISTENT

Do NOT randomly generate unrelated numbers on every page.

The demo must use one coherent fictional environment.

For example:

Organization:

Acme Systems

Cloud:

AWS

Regions:

ap-south-1

us-east-1

Accounts:

Production

Security

Development

Repositories:

infra-production

customer-api

identity-service

audit-service

---

# 4. DEMO DASHBOARD

The dashboard must be fully populated.

Example:

Overall Compliance:

84%

Controls:

169

Passing:

128

Failing:

21

Unknown:

7

Not Applicable:

13

Critical Findings:

7

High:

21

Medium:

43

Low:

18

Infrastructure Resources:

428

Evidence Items:

1,284

Last Scan:

8 minutes ago

---

# 5. DEMO FRAMEWORK DATA

Populate:

ISO 27001

86%

SOC 2

91%

NIST CSF

82%

CIS Controls

78%

These numbers must correspond to the underlying demo controls.

If the user clicks ISO 27001, they should see actual demo controls.

If they click a control, they should see actual demo evidence.

If they click that evidence, they should see the affected resource.

Everything must connect.

---

# 6. DEMO INFRASTRUCTURE

Populate realistic fictional infrastructure.

Example:

AWS Account

Production

12 VPCs

48 Subnets

84 EC2 instances

37 S3 buckets

42 IAM roles

16 IAM users

9 RDS databases

18 security groups

7 CloudTrail configurations

3 load balancers

---

# 7. DEMO INFRASTRUCTURE GRAPH

The infrastructure graph should actually contain demo relationships.

Example:

AWS Production

↓

VPC

↓

Subnet

↓

EC2

↓

Security Group

↓

IAM Role

↓

S3

Clicking nodes should open working resource detail drawers.

---

# 8. DEMO CONTROLS

Create realistic controls.

Examples:

CTRL-IAM-001

Multi-Factor Authentication

PASS / FAIL

CTRL-IAM-002

Privileged Access Management

PASS

CTRL-LOG-001

Centralized Audit Logging

FAIL

CTRL-DATA-004

Public Storage Protection

FAIL

CTRL-NET-003

Network Segmentation

PASS

CTRL-BACKUP-002

Backup Configuration

WARNING

CTRL-SEC-006

Encryption at Rest

PASS

Each control should have:

Description

Evaluation logic

Current status

Affected resources

Evidence

Framework mappings

Last evaluated time

---

# 9. DEMO FINDINGS

Populate realistic findings.

Example:

### CRITICAL

Publicly accessible customer-data S3 bucket

Resource:

prod-customer-data

Control:

CTRL-DATA-004

Frameworks:

ISO 27001

SOC 2

CIS

Status:

Open

---

### HIGH

MFA missing for privileged IAM users

Affected:

6 identities

Control:

CTRL-IAM-001

Status:

Open

---

### MEDIUM

CloudTrail retention below required threshold

Resource:

prod-audit-trail

Control:

CTRL-LOG-001

Status:

Open

---

# 10. DEMO EVIDENCE

Every important finding and control should have evidence.

Example:

Evidence:

AWS IAM configuration

Resource:

prod-admin-role

Collected:

2026-08-08 12:41 UTC

Method:

AWS API

Hash:

sha256:8f29d4a1...72c9

Integrity:

VERIFIED

---

# 11. DEMO SCAN

The **Run Scan** button MUST actually work in Demo Mode.

When clicked:

Do NOT immediately change the dashboard.

Instead show a realistic scan process.

Example:

Starting infrastructure discovery...

✓ Connecting to AWS

✓ Discovering accounts

✓ Discovering resources

✓ Normalizing infrastructure

✓ Evaluating controls

✓ Collecting evidence

✓ Mapping frameworks

✓ Calculating compliance posture

Final:

**Scan completed**

428 resources evaluated

169 controls evaluated

1,284 evidence items processed

7 critical findings detected

Then update:

Last Scan

Just now

---

# 12. DEMO DRIFT

The Drift page should contain simulated configuration changes.

Example:

12:41

S3 bucket configuration changed

↓

12:42

Control re-evaluated

↓

12:42

Compliance changed

PASS → FAIL

Clicking the event opens the configuration diff.

---

# 13. DEMO CONFIGURATION DIFF

Show:

Previous:

public_access = false

Current:

public_access = true

Affected Control:

CTRL-DATA-004

Result:

FAIL

This should be interactive.

---

# 14. DEMO REMEDIATION

When a finding is opened, show:

Recommended Remediation

Example:

Enable S3 Block Public Access for the affected bucket.

Then provide:

**Simulate Remediation**

When clicked:

Show confirmation:

Simulate remediation?

This will update the demo environment.

Then simulate:

Applying change...

✓ Configuration updated

✓ Control re-evaluated

✓ Evidence refreshed

✓ Compliance recalculated

Result:

FAIL → PASS

The dashboard should update accordingly.

This makes the prototype feel dramatically more realistic.

---

# 15. DEMO REPORTS

Report generation should work as a simulation.

Click:

Generate Report

Show:

Preparing compliance data...

Collecting controls...

Collecting evidence...

Building report...

Complete.

Then provide:

Preview Report

Download Report

The report can be generated from the existing demo data.

---

# 16. DEMO INTEGRATIONS

Integration cards should appear realistic.

AWS:

Connected

Last synchronized:

8 minutes ago

GitHub:

Connected

24 repositories

Kubernetes:

Connected

6 clusters

For the prototype, clicking:

**Configure**

should open a realistic configuration modal.

Do NOT actually attempt to connect to external systems.

Instead show:

Demo integration

This connection is simulated for the prototype.

---

# 17. DEMO SEARCH

Global search must work against the demo dataset.

Searching:

MFA

should return:

Controls

CTRL-IAM-001

Findings

MFA missing for privileged users

Evidence

IAM configuration evidence

Resources

admin-role

---

# 18. DEMO FILTERING

Tables must actually filter.

For example:

Findings → Critical

should show only critical findings.

Controls → Failing

should show only failed controls.

Framework → ISO 27001

should show only ISO-related controls.

---

# 19. DEMO DRAWERS

All important objects should be clickable.

Resource

→ Resource Drawer

Control

→ Control Drawer

Finding

→ Finding Drawer

Evidence

→ Evidence Drawer

Scan

→ Scan Detail

Framework

→ Framework Detail

The user should be able to navigate the entire product without dead buttons.

---

# 20. DEMO RESET

Add:

**Reset Demo**

inside the Demo Environment menu.

This restores the original dataset.

Example:

Reset demo environment?

All simulated changes will be reverted.

[Cancel]

[Reset Demo]

---

# 21. DEMO DATA ARCHITECTURE

For the prototype, keep the demo data separated from UI components.

Use something similar to:

```text
src/
├── data/
│   ├── demo/
│   │   ├── organization.js
│   │   ├── infrastructure.js
│   │   ├── resources.js
│   │   ├── controls.js
│   │   ├── findings.js
│   │   ├── evidence.js
│   │   ├── frameworks.js
│   │   ├── scans.js
│   │   ├── drift.js
│   │   └── reports.js
│
├── components/
├── pages/
├── hooks/
├── services/
└── utils/
```

The UI should consume this demo data through a small simulated service layer.

This makes it easier to replace the demo service with a real backend later.

---

# 22. DEMO STATE

Maintain a central demo state.

For example:

```text
demoMode
organization
resources
controls
findings
evidence
frameworks
scans
driftEvents
reports
```

Actions such as:

Run Scan

Simulate Remediation

Acknowledge Finding

Resolve Finding

Reset Demo

should modify this state.

---

# 23. IMPORTANT PROTOTYPE RULE

Do NOT make every button show:

“Coming Soon.”

That makes the prototype look unfinished.

Instead:

### If the feature can reasonably be simulated:

IMPLEMENT IT.

### If the feature requires a real external service:

SIMULATE IT.

### If the feature cannot reasonably be demonstrated:

Provide a polished explanation.

The user should be able to explore almost the entire product without encountering dead ends.

---

# 24. REAL BACKEND TRANSITION

Design Demo Mode so it can later be replaced by real APIs.

Prototype:

```text
UI
 ↓
Demo Service
 ↓
Demo Data
```

Future:

```text
UI
 ↓
API
 ↓
Backend
 ↓
AWS / GitHub / Kubernetes
 ↓
Real Infrastructure
```

The UI should NOT need to be redesigned when the real backend is introduced.

---

# 25. DEMO EXPERIENCE GOAL

The user should be able to enter Demo Mode and spend approximately:

**10–15 minutes**

exploring the entire product.

They should be able to understand:

1. What infrastructure was discovered
2. What controls were evaluated
3. Why controls passed or failed
4. What evidence supports the decision
5. Which compliance frameworks are affected
6. What findings exist
7. What changed
8. How drift is detected
9. How remediation works
10. How reports are generated

The prototype should therefore feel like a **fully operational product using simulated infrastructure**, rather than a collection of static UI screens.

# FINAL RULE

The demo must tell one continuous story:

**Infrastructure discovered**

↓

**Controls evaluated**

↓

**Evidence collected**

↓

**Compliance calculated**

↓

**Finding detected**

↓

**Drift occurs**

↓

**Control fails**

↓

**Remediation performed**

↓

**Control passes**

↓

**Compliance improves**

This continuous story is the most important part of the prototype.