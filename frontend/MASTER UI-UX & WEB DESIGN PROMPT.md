# MASTER UI/UX & WEB DESIGN PROMPT
## Infrastructure-First Compliance Discovery Platform — Premium Production-Grade Prototype

Design and build a **premium, highly polished enterprise cybersecurity SaaS web application** called:

# GRC ENGINE
### Infrastructure-First Compliance & Security Discovery Platform

This is NOT a generic compliance management dashboard.

The core product philosophy is:

> **“Compliance should be discovered from reality, not manually declared.”**

The application analyzes actual cloud infrastructure, repositories, configurations, security controls, and evidence to determine the organization's real compliance posture.

The interface must communicate:

- Security
- Trust
- Technical sophistication
- Infrastructure visibility
- Compliance intelligence
- Precision
- Automation
- Enterprise maturity

The final result should look like a product that could realistically be launched as a premium B2B cybersecurity SaaS platform.

---

# 1. DESIGN INSPIRATION

Use the visual quality and UX discipline of products such as:

- Linear
- Vercel
- Stripe
- Datadog
- Grafana
- Cloudflare
- GitHub
- Sentry
- Atlassian
- Palo Alto Networks
- Wiz
- Drata
- Vanta

Do NOT copy their interfaces.

Instead combine their strongest principles:

### Linear
- Excellent spacing
- Minimal visual noise
- Strong typography
- Elegant navigation
- Keyboard-friendly interactions
- Subtle animations

### Vercel
- Extremely clean layouts
- Strong contrast
- Premium developer-oriented visual language
- Minimal but sophisticated cards

### Stripe
- Clear information hierarchy
- Excellent dashboards
- Beautiful data visualization
- Strong typography

### Datadog / Grafana
- Infrastructure visibility
- Dense but understandable technical information
- Real-time status indicators
- Powerful filtering

### Cloudflare / Wiz
- Cybersecurity visual language
- Risk visibility
- Infrastructure relationships
- Security posture presentation

The final UI should feel like:

> **“A serious security engineering platform designed by an elite product team.”**

Avoid the appearance of:

- Generic admin templates
- Old enterprise software
- Excessive gradients
- Cartoonish cybersecurity graphics
- Huge rounded cards everywhere
- Excessive glassmorphism
- Neon hacker aesthetics
- Overuse of shields and locks
- Stock illustrations
- Fake 3D graphics
- Excessive empty space

---

# 2. OVERALL VISUAL DIRECTION

Use a **dark-first enterprise interface**.

Primary background:

Very dark charcoal / near-black.

The interface should not be pure black everywhere.

Use several layers:

- Main application background
- Sidebar background
- Elevated panels
- Cards
- Modal surfaces
- Code/infrastructure surfaces

Create depth using:

- subtle borders
- tonal differences
- restrained shadows
- spacing
- typography

Do NOT rely heavily on shadows.

---

# 3. COLOR SYSTEM

Primary background:

#0B0D10

Secondary background:

#111418

Panel:

#15191E

Elevated panel:

#1A1F25

Border:

#262C33

Primary text:

#F4F7FA

Secondary text:

#9AA4AF

Muted text:

#68727D

Use restrained accent colors.

### Compliance Green

Use for:

- PASS
- compliant controls
- healthy integrations
- verified evidence

### Warning Amber

Use for:

- WARNING
- expiring evidence
- partial compliance
- configuration drift

### Critical Red

Use for:

- FAIL
- critical vulnerabilities
- policy violations
- high-risk findings

### Information Blue

Use for:

- informational states
- active scans
- links
- selected navigation
- infrastructure discovery

Accent colors should never dominate the screen.

The interface should remain primarily neutral.

---

# 4. TYPOGRAPHY

Use a modern technical sans-serif font.

Preferred:

Inter

or:

IBM Plex Sans

or:

Geist

For technical information use:

JetBrains Mono

Use monospace typography for:

- AWS resource IDs
- Git commit hashes
- control IDs
- evidence hashes
- timestamps
- infrastructure paths
- Terraform snippets
- JSON
- YAML
- IP addresses

Typography hierarchy must be extremely clear.

Example:

Page title:

32px / semibold

Section title:

20px / semibold

Card title:

15–16px / medium

Body:

14px

Metadata:

12–13px

Technical values:

12–13px monospace

---

# 5. APPLICATION SHELL

The entire application uses a professional SaaS application shell.

Desktop:

LEFT SIDEBAR
+
TOP HEADER
+
MAIN CONTENT

The sidebar should be approximately:

250px wide.

It should be collapsible.

Collapsed state:

64–72px.

---

# 6. SIDEBAR

Top:

GRC ENGINE logo.

Use a sophisticated abstract icon representing:

Infrastructure → Controls → Compliance.

Do NOT use a generic shield logo.

Under the logo:

Workspace selector.

Example:

ACME CORPORATION
Production

with a dropdown.

---

## PRIMARY NAVIGATION

Overview

Dashboard

Infrastructure

Controls

Compliance

Evidence

Findings

Scans

Drift

Reports

---

## SECONDARY NAVIGATION

Integrations

Automation

Audit Log

Settings

---

Each navigation item should have:

- icon
- label
- optional notification badge

Selected navigation item:

Subtle accent background.

Avoid giant highlighted pills.

---

# 7. TOP HEADER

Header should contain:

Left:

Breadcrumb.

Example:

Compliance / ISO 27001

or:

Infrastructure / AWS

Right:

Search

Command palette shortcut

Notifications

Help

User avatar

---

# 8. GLOBAL COMMAND PALETTE

Implement a premium command palette.

Shortcut:

CMD/CTRL + K

Search:

- controls
- resources
- findings
- policies
- evidence
- integrations
- reports

Example:

Search controls...

Results:

CTRL-AC-02
MFA Enforcement

CTRL-AC-07
Privileged Access

CTRL-LOG-03
Centralized Logging

The command palette should feel extremely fast and polished.

---

# 9. DASHBOARD

The dashboard is the primary screen.

It should immediately answer:

> “How compliant and secure is my infrastructure right now?”

---

## HERO AREA

Title:

Good morning, Security Team

Subtitle:

Your infrastructure compliance posture across connected environments.

Top right:

Last scan:

8 minutes ago

Button:

Run Scan

Secondary:

View Changes

---

# 10. COMPLIANCE POSTURE

Large primary visualization.

Show:

Overall Compliance

84%

Under it:

↑ 6.2% from previous scan

Then show:

PASS

128 controls

FAIL

21 controls

UNKNOWN

7 controls

NOT APPLICABLE

13 controls

The visualization should be elegant.

Use a circular progress/ring visualization or segmented radial chart.

Do NOT create a giant rainbow chart.

---

# 11. FRAMEWORK CARDS

Display framework posture.

Cards:

ISO 27001

86%

SOC 2

91%

NIST CSF

82%

CIS Controls

78%

Each card includes:

Pass rate

Controls evaluated

Failed controls

Trend

Last evaluation

Example:

ISO 27001

86%

142 / 165 controls passing

+4.2%

View framework →

---

# 12. INFRASTRUCTURE HEALTH

Section title:

Infrastructure Coverage

Show connected infrastructure.

Example:

AWS

Connected

142 resources

12 accounts

3 regions

GitHub

Connected

24 repositories

384 branches

Kubernetes

Connected

6 clusters

87 workloads

---

# 13. COMPLIANCE PIPELINE

Create a visual pipeline:

INFRASTRUCTURE

↓

DISCOVERY

↓

NORMALIZATION

↓

CONTROL EVALUATION

↓

EVIDENCE

↓

FRAMEWORK MAPPING

↓

COMPLIANCE POSTURE

This is one of the most important conceptual components of the prototype.

Make it visually beautiful.

Each stage should show:

status

item count

processing time

last update

Clicking a stage opens its details.

---

# 14. RISK / FINDINGS SECTION

Title:

Priority Findings

Show findings as compact but highly readable rows.

Example:

CRITICAL

Public S3 bucket detected

AWS / production / storage

Detected 12 min ago

→

HIGH

MFA not enforced for privileged IAM users

AWS / identity

Detected 24 min ago

→

MEDIUM

CloudTrail retention below policy requirement

AWS / logging

Detected 1 hr ago

→

Each row includes:

Severity

Finding

Affected resource

Control

Framework

Detected time

Status

---

# 15. INFRASTRUCTURE PAGE

This page should feel more like an infrastructure observability platform than a compliance application.

Title:

Infrastructure

Subtitle:

Everything discovered from your connected environments.

Tabs:

Overview

Cloud

Repositories

Kubernetes

Resources

Changes

---

# 16. INFRASTRUCTURE GRAPH

Create an interactive infrastructure relationship graph.

Example:

AWS Account

↓

VPC

↓

Subnet

↓

EC2

↓

Security Group

↓

S3

↓

IAM Role

The graph visually connects resources.

Clicking a resource opens its detail panel.

Use subtle node colors based on state:

Healthy

Warning

Critical

Unknown

The graph must not look like a decorative network diagram.

It must look operational.

---

# 17. RESOURCE DETAIL PANEL

When clicking:

EC2 Instance

show a right-side drawer.

Header:

EC2 Instance

i-0a92...

Status:

Healthy

Then:

Account

Region

VPC

Subnet

Security Groups

IAM Role

Tags

Created

Last Modified

---

## COMPLIANCE IMPACT

Show:

Controls affected:

7

Passing:

5

Failing:

2

Unknown:

0

Then:

Related Findings

Related Evidence

Related Controls

---

# 18. CONTROLS PAGE

This is one of the core pages.

Title:

Controls

Subtitle:

Vendor-neutral security controls evaluated against real infrastructure.

Top filters:

Framework

Status

Severity

Domain

Resource

Last evaluated

Search:

Search controls...

---

# 19. CONTROL TABLE

Create a sophisticated data table.

Columns:

Control

Domain

Status

Frameworks

Evidence

Affected Resources

Last Evaluated

Status

Example:

CTRL-IAM-001

Multi-Factor Authentication

Identity & Access

PASS

ISO 27001
SOC 2
NIST
CIS

12 evidence items

48 resources

4 min ago

---

Another:

CTRL-LOG-004

Centralized Audit Logging

Logging & Monitoring

FAIL

ISO 27001
SOC 2

3 evidence items

14 resources

6 min ago

Tables should support:

- sorting
- filtering
- column visibility
- pagination
- search
- bulk selection

---

# 20. CONTROL DETAIL PAGE

This should be one of the most impressive screens.

Header:

CTRL-IAM-001

Multi-Factor Authentication

Status:

FAIL

Severity:

Critical

---

Description:

Privileged identities must use multi-factor authentication.

---

## EVALUATION

Show the evaluation logic.

Example:

Required:

MFA enabled

Observed:

37 privileged identities

MFA enabled:

31

MFA missing:

6

Result:

FAIL

This must communicate that the result is based on infrastructure evidence.

---

# 21. EVIDENCE SECTION

Show:

Evidence collected

17 items

Latest evidence:

4 minutes ago

Evidence examples:

IAM configuration

CloudTrail configuration

Terraform resource

GitHub repository policy

AWS API response

---

Each evidence item:

Source

Timestamp

Hash

Collection method

Resource

Control

Integrity

VERIFIED

Use monospace for hashes.

Example:

SHA-256

8f29d4a1...72c9

---

# 22. EVALUATION LOGIC

Create a visual section:

EXPECTED

MFA = REQUIRED

↓

OBSERVED

MFA = DISABLED

↓

EVALUATION

FALSE

↓

CONTROL STATUS

FAIL

This is extremely important because it visually demonstrates the product's core philosophy.

---

# 23. FRAMEWORK PAGE

Title:

Compliance Frameworks

Cards:

ISO 27001

SOC 2

NIST CSF

CIS Controls

Each framework shows:

Overall %

Controls

Passing

Failing

Unknown

Evidence coverage

---

Clicking ISO 27001 opens:

ISO 27001

Overall:

86%

---

Sections:

A.5 Organizational Controls

A.6 People Controls

A.7 Physical Controls

A.8 Technological Controls

Each section contains controls and status.

---

# 24. EVIDENCE PAGE

Title:

Evidence

Subtitle:

Machine-collected evidence supporting compliance decisions.

Filters:

Source

Framework

Control

Date

Integrity

Collection method

Create an evidence table.

Columns:

Evidence

Source

Control

Collected

Hash

Status

---

Clicking evidence opens a detail drawer.

---

# 25. FINDINGS PAGE

Title:

Findings

Top summary:

Critical

7

High

21

Medium

43

Low

18

Informational

12

Create a powerful filtering system.

Filters:

Severity

Framework

Resource

Cloud

Control

Status

Age

---

Finding detail:

Title

Publicly accessible S3 bucket

Severity:

CRITICAL

Resource:

prod-customer-data

AWS Account:

Production

Region:

ap-south-1

---

Impact

This configuration violates:

CTRL-DATA-004

ISO 27001

SOC 2

CIS

---

Evidence

Show actual configuration evidence.

---

Recommended remediation

Provide a clear technical explanation.

---

# 26. DRIFT PAGE

This should be visually distinctive.

Title:

Configuration Drift

Subtitle:

Changes detected after the last known compliant state.

Show timeline.

Example:

10:42 AM

IAM policy changed

↓

10:44 AM

Control re-evaluated

↓

10:44 AM

Compliance changed

PASS → FAIL

---

Drift cards:

Resource

Previous state

Current state

Affected controls

Detected time

Risk

---

# 27. SCANS PAGE

Title:

Scans

Show:

Latest scan

Running

Started 2 minutes ago

Progress:

82%

Stages:

Discovery ✓

Normalization ✓

Evaluation ✓

Evidence ✓

Framework Mapping...

---

Historical scans:

Scan ID

Started

Duration

Resources

Controls

Findings

Status

---

Clicking scan shows scan details.

---

# 28. REPORTS PAGE

Title:

Reports

Create report cards:

Compliance Report

Executive Report

Technical Security Report

ISO 27001 Report

SOC 2 Report

NIST Report

Each has:

Generate

Preview

Download

Schedule

---

# 29. REPORT GENERATION EXPERIENCE

Create a polished modal:

Generate Compliance Report

Framework:

ISO 27001

Scope:

Production

Period:

Last 30 days

Include:

✓ Controls

✓ Evidence

✓ Findings

✓ Exceptions

✓ Remediation

✓ Infrastructure changes

Button:

Generate Report

---

# 30. INTEGRATIONS PAGE

Title:

Integrations

Connected:

AWS

GitHub

Kubernetes

---

Available:

AWS

GitHub

GitLab

Azure

GCP

Kubernetes

Terraform Cloud

Jira

Slack

---

Each integration card:

Logo

Name

Description

Connection status

Resources discovered

Last sync

Configure

---

# 31. AUTOMATION PAGE

Show automation rules.

Example:

WHEN

Critical finding detected

IF

Production environment

THEN

Create Jira ticket

AND

Notify Slack

AND

Re-evaluate control

---

Create a visual rule builder.

---

# 32. AUDIT LOG

Title:

Audit Log

Timeline-based event interface.

Examples:

Admin connected AWS account

Control CTRL-IAM-001 evaluated

Evidence collected

Policy updated

Finding acknowledged

Report generated

User login

Every event should show:

Actor

Action

Resource

Timestamp

IP/device information where appropriate

---

# 33. SETTINGS

Professional enterprise settings.

Sections:

Workspace

Members

Roles

Integrations

Security

Notifications

API

Audit

Billing

---

# 34. EMPTY STATES

Do NOT show boring:

“No data.”

Instead provide useful empty states.

Example:

No cloud accounts connected.

Connect AWS to begin infrastructure discovery.

[Connect AWS]

---

# 35. LOADING STATES

Use skeleton loaders.

Avoid generic spinning loaders everywhere.

Tables:

Skeleton rows.

Cards:

Skeleton blocks.

Graphs:

Animated skeleton structure.

---

# 36. ERROR STATES

Errors should be technical but understandable.

Example:

AWS synchronization failed.

Reason:

AccessDeniedException

The connected IAM role does not have permission to read IAM policies.

[View permissions]

[Retry]

---

# 37. STATUS SYSTEM

Use consistent status badges.

PASS

FAIL

UNKNOWN

WARNING

IN PROGRESS

VERIFIED

UNVERIFIED

DRIFTED

NOT APPLICABLE

Never use inconsistent terminology.

---

# 38. MICROINTERACTIONS

Use subtle animations.

Examples:

Cards slightly brighten on hover.

Rows highlight on hover.

Drawer slides smoothly.

Dropdowns fade/scale slightly.

Charts animate when entering viewport.

Progress bars animate.

Status changes transition smoothly.

Do NOT overanimate.

The application should feel fast.

---

# 39. DATA VISUALIZATION

Use charts only when they communicate something meaningful.

Recommended:

- radial compliance score
- framework comparison
- compliance trend
- findings by severity
- control status distribution
- evidence coverage
- infrastructure resource counts
- drift timeline
- scan duration

Avoid decorative charts.

Every visualization should answer a question.

---

# 40. RESPONSIVE DESIGN

Desktop-first because this is an enterprise security platform.

But it must still work on:

1440px

1280px

1024px

768px

Mobile

On mobile:

Sidebar becomes drawer.

Tables become horizontally scrollable or transform into cards.

Charts resize.

Drawers become full-screen.

---

# 41. ACCESSIBILITY

Target WCAG 2.2 AA.

Ensure:

- keyboard navigation
- visible focus states
- semantic HTML
- ARIA labels
- sufficient contrast
- accessible tables
- accessible charts
- screen-reader friendly status indicators

Never communicate status through color alone.

Example:

FAIL

red indicator

icon

text

---

# 42. UX PRINCIPLE

The application should always answer these five questions:

### 1. What is happening?

Current infrastructure/compliance state.

### 2. Why is it happening?

Underlying control evaluation.

### 3. What caused it?

Infrastructure/evidence.

### 4. What does it affect?

Frameworks and controls.

### 5. What should I do?

Remediation.

This hierarchy should be reflected throughout the entire application.

---

# 43. CORE PRODUCT VISUALIZATION

The product's most important conceptual visualization is:

INFRASTRUCTURE

↓

RESOURCE

↓

OBSERVED CONFIGURATION

↓

CONTROL

↓

EVIDENCE

↓

FRAMEWORK

↓

COMPLIANCE

↓

FINDING / REMEDIATION

Make this relationship visible throughout the UI.

The user should never feel that compliance scores are arbitrary.

---

# 44. DASHBOARD INFORMATION HIERARCHY

The dashboard should prioritize:

1. Compliance posture
2. Critical failures
3. Infrastructure health
4. Recent changes
5. Framework posture
6. Evidence health
7. Drift
8. Trends

Do not put ten equal-sized cards at the top.

Create a strong hierarchy.

---

# 45. VISUAL DENSITY

This is a technical enterprise application.

It should be:

Dense enough for security engineers.

Simple enough for executives.

Do not make everything huge.

Use compact:

- tables
- metadata
- status indicators
- filters
- drawers

But maintain generous spacing between major sections.

---

# 46. PREMIUM DETAIL DRAWERS

Whenever possible, use right-side detail drawers instead of navigating away.

For example:

Click finding

→ drawer opens.

Click resource

→ drawer opens.

Click evidence

→ drawer opens.

Click control

→ drawer opens.

This allows users to investigate without losing context.

---

# 47. SEARCH EXPERIENCE

Global search should search across:

Controls

Resources

Findings

Evidence

Frameworks

Reports

Scans

Integrations

Example:

Search:

MFA

Results:

3 Controls

12 Resources

4 Findings

27 Evidence Items

---

# 48. MOCK DATA

Use realistic technical data.

Do NOT use:

John Doe

Lorem ipsum

Example Company

123456

Instead use realistic fictional enterprise data:

Acme Systems

Production

AWS ap-south-1

AWS us-east-1

GitHub organization

acme-platform

Repositories:

infra-production

customer-api

identity-service

audit-service

Use realistic:

AWS resource IDs

Git commit hashes

control IDs

timestamps

evidence hashes

Terraform resources

IAM policies

security groups

S3 buckets

CloudTrail configurations

---

# 49. DO NOT FAKE FUNCTIONALITY

This is a prototype, but interactions should feel real.

Implement:

Navigation

Search

Filtering

Tabs

Dropdowns

Drawers

Modals

Charts

Sorting

Pagination

Scan simulation

Progress indicators

Status changes

Report generation simulation

Integration connection simulation

Control evaluation visualization

Evidence inspection

Drift timeline

---

# 50. TECHNICAL UI COMPONENT SYSTEM

Build reusable components:

Button

IconButton

Badge

StatusBadge

Card

MetricCard

DataTable

Drawer

Modal

Dropdown

Tabs

Tooltip

CommandPalette

SearchBar

FilterBar

Chart

Timeline

ProgressBar

Skeleton

EmptyState

ErrorState

Toast

Breadcrumb

Pagination

---

# 51. BUTTON STYLE

Primary:

solid accent.

Secondary:

dark surface with border.

Tertiary:

text button.

Danger:

reserved for destructive operations.

Avoid huge pill-shaped buttons.

Use moderate corner radius:

6–10px.

---

# 52. CARD DESIGN

Cards should have:

subtle border

dark surface

small radius

clear hierarchy

minimal shadow

Do not make every component a floating card.

Tables and content sections should often sit directly on the page.

---

# 53. BORDER RADIUS

Use consistent radius.

Small:

6px

Medium:

8px

Large:

12px

Avoid excessive 20–30px rounded cards.

The application should feel technical rather than playful.

---

# 54. ICONOGRAPHY

Use Lucide or another professional outline icon set.

Icons should be:

16px

18px

20px

Avoid giant icons.

Use icons to improve scanning, not decoration.

---

# 55. SECURITY VISUAL LANGUAGE

Use subtle visual cues:

terminal-style evidence blocks

monospace IDs

status indicators

resource topology

timeline events

control evaluation diagrams

configuration diffs

Do NOT use:

hacker imagery

hooded hackers

binary rain

giant shields

padlocks everywhere

neon green cyberpunk styling

The product is sophisticated security infrastructure software, not a “hacker website.”

---

# 56. CONFIGURATION DIFF VIEW

Implement a beautiful diff viewer.

Example:

Previous:

public_access = false

Current:

public_access = true

Highlight the changed line.

Below:

Affected Control:

CTRL-DATA-004

Result:

FAIL

This is an extremely valuable prototype feature.

---

# 57. TECHNICAL EVIDENCE VIEW

Show structured evidence.

Example:

RESOURCE

aws_s3_bucket.customer_data

CONFIGURATION

public_access_block = false

OBSERVED

2026-08-08 12:41:22 UTC

HASH

sha256:8f92...

CONTROL

CTRL-DATA-004

RESULT

FAIL

This makes the product feel technically credible.

---

# 58. EXECUTIVE MODE

Provide a dashboard mode that is simpler.

Executives see:

Overall Compliance

Risk

Top Findings

Framework Status

Trend

Remediation Progress

Security teams see:

Controls

Resources

Evidence

Infrastructure

Drift

Evaluation details

The same underlying data should support both experiences.

---

# 59. DESIGN SYSTEM CONSISTENCY

Everything must use the same:

Typography

Spacing

Colors

Border system

Icons

Status system

Buttons

Tables

Charts

Interaction patterns

No page should look like it was designed independently.

---

# 60. PERFORMANCE

The final implementation must be optimized for production.

Do NOT use:

Babel Standalone

Tailwind CDN

unnecessary CDN libraries

huge monolithic JavaScript

unnecessary fonts

large icon bundles

Load heavy functionality lazily.

Use:

Vite

React

compiled Tailwind

code splitting

lazy loading

tree shaking

optimized assets

production builds

Do not load:

PDF.js

Chart.js

large report libraries

until they are actually required.

Target:

Performance ≥ 95

Accessibility ≥ 95

Best Practices ≥ 95

SEO ≥ 95

LCP < 1.5s

FCP < 1.5s

CLS < 0.05

TBT < 100ms

---

# 61. FINAL VISUAL TARGET

The final product should feel like:

A combination of:

Linear's polish

+

Vercel's minimalism

+

Datadog's observability

+

Wiz's infrastructure visibility

+

Stripe's information hierarchy

+

Cloudflare's security credibility

+

GitHub's technical usability

But with a completely original visual identity.

---

# 62. MOST IMPORTANT DESIGN RULE

Do not design this as:

“a dashboard with some compliance charts.”

Design it as:

> **An infrastructure intelligence system that happens to produce compliance outcomes.**

The UI should make the underlying chain obvious:

REAL INFRASTRUCTURE

→

OBSERVATION

→

EVALUATION

→

EVIDENCE

→

CONTROL

→

FRAMEWORK

→

COMPLIANCE

→

RISK

→

REMEDIATION

That is the defining product experience.

---

# 63. PROTOTYPE NAVIGATION

Implement the following complete navigation:

Overview
Dashboard

Infrastructure
├── Overview
├── Cloud
├── Repositories
├── Kubernetes
└── Resources

Controls
├── All Controls
├── Passing
├── Failing
└── Unknown

Compliance
├── Overview
├── ISO 27001
├── SOC 2
├── NIST CSF
└── CIS Controls

Evidence
├── All Evidence
├── Verified
└── Unverified

Findings
├── All
├── Critical
├── High
├── Medium
└── Low

Scans

Drift

Reports

Integrations

Automation

Audit Log

Settings

---

# 64. FINAL QUALITY BAR

The finished prototype must look like a genuine venture-backed cybersecurity SaaS product.

It should be impressive enough that a user could open it and immediately think:

> “This is a real security platform.”

NOT:

> “This is a student dashboard.”

Every screen should feel deliberate.

Every component should have a purpose.

Every visualization should communicate information.

Every interaction should feel intentional.

The product should prioritize:

**clarity > decoration**

**information hierarchy > visual noise**

**technical credibility > marketing gimmicks**

**real workflows > static mockups**

**consistency > novelty**

**speed > excessive animation**

Build the interface as a **premium enterprise cybersecurity product**, not as a generic admin dashboard.