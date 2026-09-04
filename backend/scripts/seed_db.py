"""
Database Seeding Script
Initializes SQLite database tables and populates baseline frameworks, canonical controls, and demo organization.
"""

import asyncio
import os
import sys
import hashlib
from datetime import datetime, timezone

# add backend directory to python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from database import engine, Base, async_session_factory
from models import (
    Organization,
    Workspace,
    User,
    ApiKey,
    Integration,
    Asset,
    CanonicalControl,
    Framework,
    FrameworkRequirement,
    ControlMapping,
    AuditLog,
)

def hash_pw(password: str) -> str:
    # simple sha256 helper for seed user (replaced with bcrypt in auth service)
    return hashlib.sha256(password.encode()).hexdigest()

async def seed():
    print("=" * 60)
    print("GRC ENGINE — DATABASE INITIALIZATION & SEEDING")
    print("=" * 60)

    # 1. create all tables
    print("\n[1/5] Creating database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("[OK] Tables created successfully.")


    async with async_session_factory() as session:
        from sqlalchemy import select
        existing = await session.execute(select(Framework).limit(1))
        if existing.scalars().first():
            print("[INFO] Database already contains seeded framework baselines. Skipping duplicate insert.")
            print("\n" + "=" * 60)
            print("SUCCESS: Database is ready & up-to-date at backend/grc_engine.db")
            print("=" * 60)
            return

        # 2. Seed Frameworks
        print("\n[2/5] Seeding Regulatory Frameworks...")

        soc2 = Framework(
            code="SOC2",
            name="SOC 2 Type II (Trust Services Criteria)",
            version="2022",
            description="AICPA Trust Services Criteria for Security, Availability, and Confidentiality.",
        )
        iso27001 = Framework(
            code="ISO27001",
            name="ISO/IEC 27001:2022",
            version="2022",
            description="International standard for Information Security Management Systems (ISMS).",
        )
        nist_csf = Framework(
            code="NIST_CSF",
            name="NIST Cybersecurity Framework 2.0",
            version="2.0",
            description="National Institute of Standards and Technology CSF core controls.",
        )
        cis = Framework(
            code="CIS_V8",
            name="CIS Critical Security Controls v8",
            version="v8",
            description="Center for Internet Security prioritized cyber defense controls.",
        )

        session.add_all([soc2, iso27001, nist_csf, cis])
        await session.flush()

        # 3. Seed Framework Requirements
        print("\n[3/5] Seeding Framework Requirements...")
        reqs = [
            # SOC 2
            FrameworkRequirement(framework_id=soc2.id, clause_id="CC6.1", title="Logical Access Controls", description="Restricts logical access to authorized software, infrastructure, and data.", category="Security"),
            FrameworkRequirement(framework_id=soc2.id, clause_id="CC6.8", title="Unauthorized Software Prevention", description="Prevents unauthorized code execution and unapproved software deployments.", category="Security"),
            FrameworkRequirement(framework_id=soc2.id, clause_id="CC8.1", title="Change Management & Peer Review", description="Requires formal authorization, testing, and independent peer review prior to release.", category="Change Management"),
            
            # ISO 27001:2022
            FrameworkRequirement(framework_id=iso27001.id, clause_id="A.5.15", title="Access Control", description="Rules to control physical and logical access to information.", category="Organizational"),
            FrameworkRequirement(framework_id=iso27001.id, clause_id="A.5.17", title="Authentication Information", description="Allocation and management of passwords, MFA, and secret keys.", category="Organizational"),
            FrameworkRequirement(framework_id=iso27001.id, clause_id="A.8.8", title="Technical Vulnerability Management", description="Identification and evaluation of software CVEs and patching.", category="Technological"),
            FrameworkRequirement(framework_id=iso27001.id, clause_id="A.8.15", title="Logging & Audit Trails", description="Production, retention, and review of system activity logs.", category="Technological"),
            FrameworkRequirement(framework_id=iso27001.id, clause_id="A.8.24", title="Use of Cryptography", description="Rules for encryption of sensitive data at rest and in transit.", category="Technological"),
            FrameworkRequirement(framework_id=iso27001.id, clause_id="A.8.28", title="Secure Coding Principles", description="Application security principles applied throughout development.", category="Technological"),
            FrameworkRequirement(framework_id=iso27001.id, clause_id="A.8.32", title="Change Management", description="Changes to information processing facilities are subject to review.", category="Technological"),

            # NIST CSF 2.0
            FrameworkRequirement(framework_id=nist_csf.id, clause_id="PR.AA-01", title="Identity Management", description="Identities and credentials are managed for authorized users and devices.", category="Protect"),
            FrameworkRequirement(framework_id=nist_csf.id, clause_id="PR.AA-03", title="Authentication & MFA", description="Users and services are authenticated assertively with MFA.", category="Protect"),
            FrameworkRequirement(framework_id=nist_csf.id, clause_id="PR.DS-01", title="Data-at-Rest Protection", description="Confidentiality and integrity of data-at-rest are protected by encryption.", category="Protect"),
            FrameworkRequirement(framework_id=nist_csf.id, clause_id="PR.PS-01", title="Software Maintenance", description="Software is maintained, replaced, and tested to meet security requirements.", category="Protect"),
            FrameworkRequirement(framework_id=nist_csf.id, clause_id="DE.CM-01", title="Security Event Logging", description="Networks and computing environments are monitored for anomalies.", category="Detect"),

            # CIS Controls
            FrameworkRequirement(framework_id=cis.id, clause_id="16.2", title="Establish Secure Code Review", description="Establish and maintain a secure code review process prior to production builds.", category="Application Security"),
        ]
        session.add_all(reqs)
        await session.flush()

        req_map = {r.clause_id: r.id for r in reqs}

        # 4. Seed Canonical Controls
        print("\n[4/5] Seeding Canonical Technical Controls...")
        ctrl_gh_01 = CanonicalControl(
            code="CTL-GH-01",
            name="Default Branch Protection Active",
            category="CI/CD & Source Code",
            description="Production default branch (main/master) enforces branch protection rules preventing direct force pushes.",
            default_severity="CRITICAL",
            severity_weight=15,
            provider_type="github",
            telemetry_spec="PROTECTED: TRUE",
        )
        ctrl_gh_02 = CanonicalControl(
            code="CTL-GH-02",
            name="Enforce Peer Code Review Approvals",
            category="CI/CD & Source Code",
            description="Pull requests must receive at least 1 or 2 approving reviews from independent code owners before merge.",
            default_severity="CRITICAL",
            severity_weight=15,
            provider_type="github",
            telemetry_spec="APPROVING_REVIEWS >= 2",
        )
        ctrl_gh_03 = CanonicalControl(
            code="CTL-GH-03",
            name="Secret Scanning & Push Protection",
            category="CI/CD & Source Code",
            description="Automated secret scanning blocks commits containing high-entropy credentials or private API keys.",
            default_severity="HIGH",
            severity_weight=10,
            provider_type="github",
            telemetry_spec="SECRET_SCANNING: ENABLED",
        )
        ctrl_gh_04 = CanonicalControl(
            code="CTL-GH-04",
            name="Vulnerability Alerts & Dependabot",
            category="Vulnerability Management",
            description="Automated dependency alerts and security updates scan for known CVEs in upstream packages.",
            default_severity="HIGH",
            severity_weight=10,
            provider_type="github",
            telemetry_spec="VULN_ALERTS: ENABLED",
        )
        ctrl_gh_05 = CanonicalControl(
            code="CTL-GH-05",
            name="Dismiss Stale Pull Request Approvals",
            category="CI/CD & Source Code",
            description="Approvals are automatically invalidated whenever new commits are pushed to the pull request.",
            default_severity="MEDIUM",
            severity_weight=5,
            provider_type="github",
            telemetry_spec="DISMISS_STALE: TRUE",
        )
        ctrl_kms_01 = CanonicalControl(
            code="CTL-KMS-01",
            name="KMS Envelope Encryption & Key Rotation",
            category="Cryptography",
            description="Hardware HSM-backed cryptographic master key derivation with automated 90-day rotation.",
            default_severity="CRITICAL",
            severity_weight=15,
            provider_type="aws",
            telemetry_spec="AES-256-GCM / 90-DAY",
        )
        ctrl_iam_01 = CanonicalControl(
            code="CTL-IAM-01",
            name="Multi-Factor Authentication (MFA) Enforcement",
            category="Identity & Access",
            description="Strict hardware-backed WebAuthn or TOTP 2FA required for all human operator sessions.",
            default_severity="CRITICAL",
            severity_weight=15,
            provider_type="generic",
            telemetry_spec="MFA: STRICT",
        )

        session.add_all([ctrl_gh_01, ctrl_gh_02, ctrl_gh_03, ctrl_gh_04, ctrl_gh_05, ctrl_kms_01, ctrl_iam_01])
        await session.flush()

        # Seed Control Mappings
        mappings = [
            # Branch Protection -> SOC 2 CC8.1, ISO A.8.28, CIS 16.2
            ControlMapping(canonical_control_id=ctrl_gh_01.id, framework_requirement_id=req_map["CC8.1"], notes="Branch protection verifies formal change review boundary."),
            ControlMapping(canonical_control_id=ctrl_gh_01.id, framework_requirement_id=req_map["A.8.28"], notes="Prevents direct commits without secure coding checks."),
            ControlMapping(canonical_control_id=ctrl_gh_01.id, framework_requirement_id=req_map["16.2"], notes="Enforces review gate prior to build."),

            # Peer Review -> SOC 2 CC8.1, ISO A.8.32, CIS 16.2
            ControlMapping(canonical_control_id=ctrl_gh_02.id, framework_requirement_id=req_map["CC8.1"], notes="Requires dual approval peer change control."),
            ControlMapping(canonical_control_id=ctrl_gh_02.id, framework_requirement_id=req_map["A.8.32"], notes="Change management authorization."),

            # Secret Scanning -> SOC 2 CC6.8, ISO A.5.17, NIST PR.AA-01
            ControlMapping(canonical_control_id=ctrl_gh_03.id, framework_requirement_id=req_map["CC6.8"], notes="Prevents unauthorized secret credential leakage."),
            ControlMapping(canonical_control_id=ctrl_gh_03.id, framework_requirement_id=req_map["A.5.17"], notes="Protects authentication information."),

            # Vulnerability Alerts -> ISO A.8.8, NIST PR.PS-01
            ControlMapping(canonical_control_id=ctrl_gh_04.id, framework_requirement_id=req_map["A.8.8"], notes="Continuous technical vulnerability scanning."),
            ControlMapping(canonical_control_id=ctrl_gh_04.id, framework_requirement_id=req_map["PR.PS-01"], notes="Software maintenance and CVE tracking."),

            # Dismiss Stale Approvals -> SOC 2 CC8.1
            ControlMapping(canonical_control_id=ctrl_gh_05.id, framework_requirement_id=req_map["CC8.1"], notes="Ensures modified delta commits receive renewed review."),

            # KMS Encryption -> ISO A.8.24, NIST PR.DS-01
            ControlMapping(canonical_control_id=ctrl_kms_01.id, framework_requirement_id=req_map["A.8.24"], notes="Cryptographic data protection at rest."),
            ControlMapping(canonical_control_id=ctrl_kms_01.id, framework_requirement_id=req_map["PR.DS-01"], notes="Protects confidentiality of sensitive assets."),

            # MFA Enforcement -> SOC 2 CC6.1, ISO A.5.17, NIST PR.AA-03
            ControlMapping(canonical_control_id=ctrl_iam_01.id, framework_requirement_id=req_map["CC6.1"], notes="Enforces robust user authentication boundary."),
            ControlMapping(canonical_control_id=ctrl_iam_01.id, framework_requirement_id=req_map["A.5.17"], notes="MFA protects authentication information."),
            ControlMapping(canonical_control_id=ctrl_iam_01.id, framework_requirement_id=req_map["PR.AA-03"], notes="Assertive user verification with MFA."),
        ]
        session.add_all(mappings)

        # 5. Seed Demo Organization & Workspace
        print("\n[5/5] Seeding Demo Organization & Admin User...")
        acme_org = Organization(
            name="Acme Systems Inc.",
            slug="acme-systems",
        )
        session.add(acme_org)
        await session.flush()

        prod_ws = Workspace(
            organization_id=acme_org.id,
            name="Production Workspace",
            environment="production",
        )
        session.add(prod_ws)
        await session.flush()

        admin_user = User(
            organization_id=acme_org.id,
            email="admin@grcengine.com",
            hashed_password=hash_pw("demo123"),
            full_name="Roshan Nale",
            role="PLATFORM_ADMIN",
        )
        session.add(admin_user)

        # Initial Genesis Audit Log
        genesis_log = AuditLog(
            organization_id=acme_org.id,
            event_code="AUD-0001",
            event_type="SYSTEM_INITIALIZATION",
            severity="INFO",
            actor_name="System Engine",
            actor_email="system@grcengine.internal",
            actor_role="SYSTEM_CORE",
            action="GENESIS_DATABASE_INITIALIZATION",
            target="SYSTEM_ENVIRONMENT",
            details="GRC Engine database initialized with SOC 2, ISO 27001, and NIST CSF baselines.",
            previous_hash="0000000000000000000000000000000000000000000000000000000000000000",
            current_hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        )
        session.add(genesis_log)

        await session.commit()
        print("[OK] Frameworks, Canonical Controls, Mappings, and Demo Org committed.")


    print("\n" + "=" * 60)
    print("SUCCESS: Database initialized & seeded at backend/grc_engine.db")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(seed())
