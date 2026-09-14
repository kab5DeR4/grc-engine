"""
Compliance Scans & Scan Job Trigger Endpoints
Orchestrates live telemetry ingestion, asset discovery, control evaluation,
SHA-256 evidence vaulting, and finding generation across connected integrations.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import hashlib
import json
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.scan import ScanJob
from models.organization import Organization
from models.integration import Integration
from models.asset import Asset
from models.control import CanonicalControl
from models.evidence import EvidenceArtifact
from models.finding import Finding
from api.deps import get_current_user_optional
from connectors import get_connector

router = APIRouter()


class ScanTriggerPayload(BaseModel):
    integration_id: Optional[str] = None
    target_scope: str = "ALL"  # ALL, REPOSITORIES, CLOUD


class ScanJobResponse(BaseModel):
    id: str
    organization_id: str
    status: str  # PENDING, RUNNING, COMPLETED, FAILED
    target_scope: str
    assets_scanned_count: int
    controls_evaluated_count: int
    findings_count: int
    started_at: datetime
    completed_at: Optional[datetime]


def compute_sha256(payload: Dict[str, Any]) -> str:
    """Computes deterministic FIPS 180-4 SHA-256 digest from key-sorted JSON."""
    raw = json.dumps(payload, sort_keys=True, default=str).encode("utf-8")
    return hashlib.sha256(raw).hexdigest()


@router.get("", response_model=List[ScanJobResponse])
async def list_scans(
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional)
):
    """List compliance scan history."""
    query = select(ScanJob).order_by(ScanJob.started_at.desc())
    if user:
        query = query.where(ScanJob.organization_id == user.organization_id)

    result = await db.execute(query)
    scans = result.scalars().all()
    return [
        ScanJobResponse(
            id=s.id,
            organization_id=s.organization_id,
            status=s.status,
            target_scope=s.trigger_type,
            assets_scanned_count=s.total_assets,
            controls_evaluated_count=s.total_evaluations,
            findings_count=s.failed_evaluations,
            started_at=s.started_at,
            completed_at=s.completed_at
        )
        for s in scans
    ]


@router.post("/trigger", response_model=ScanJobResponse)
async def trigger_scan(
    payload: ScanTriggerPayload,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional)
):
    """
    Trigger a live compliance scan job:
    1. Discovers technical assets from connected integrations (e.g. GitHub repos).
    2. Collects live control states (branch protection, code reviews, secret scanning, dependabot).
    3. Hashes snapshots into SHA-256 tamper-evident evidence artifacts.
    4. Evaluates against canonical controls and registers compliance findings.
    """
    org_id = user.organization_id if user else None
    if not org_id:
        org_res = await db.execute(select(Organization).limit(1))
        org = org_res.scalars().first()
        if not org:
            org = Organization(name="Default Organization", slug="default-org")
            db.add(org)
            await db.flush()
        org_id = org.id

    # Create scan job in RUNNING state
    scan = ScanJob(
        organization_id=org_id,
        trigger_type=payload.target_scope,
        status="RUNNING",
        total_assets=0,
        total_evaluations=0,
        passed_evaluations=0,
        failed_evaluations=0,
        started_at=datetime.now(timezone.utc),
    )
    db.add(scan)
    await db.flush()

    # Query active integrations
    int_query = select(Integration).where(Integration.organization_id == org_id)
    if payload.integration_id:
        int_query = int_query.where(Integration.id == payload.integration_id)
    
    int_res = await db.execute(int_query)
    integrations = int_res.scalars().all()

    # Fetch canonical controls lookup
    ctrl_res = await db.execute(select(CanonicalControl))
    controls_map = {c.code: c for c in ctrl_res.scalars().all()}

    total_assets = 0
    total_evals = 0
    passed_evals = 0
    failed_evals = 0

    try:
        for integration in integrations:
            # Recreate connector instance
            creds = {
                "token": integration.credentials_encrypted,
                "is_mock": (integration.credentials_encrypted in ["mock-token", "", None]),
            }
            connector = get_connector(
                integration_type=integration.provider_type or "GITHUB",
                credentials=creds,
                config_options=integration.config_json or {},
                force_mock=creds["is_mock"],
            )

            # 1. Discover assets
            discovered_dtos = await connector.discover_assets()
            total_assets += len(discovered_dtos)

            for dto in discovered_dtos:
                # Upsert asset in database
                asset_res = await db.execute(
                    select(Asset).where(
                        Asset.organization_id == org_id,
                        Asset.external_id == dto.identifier,
                    )
                )
                asset = asset_res.scalars().first()
                if not asset:
                    asset = Asset(
                        organization_id=org_id,
                        integration_id=integration.id,
                        asset_type=dto.asset_type,
                        external_id=dto.identifier,
                        name=dto.name,
                        environment="production",
                        is_monitored=dto.is_monitored,
                        metadata_json={**dto.raw_metadata, "criticality": dto.criticality},
                        last_discovered_at=datetime.now(timezone.utc),
                    )
                    db.add(asset)
                    await db.flush()
                else:
                    asset.last_discovered_at = datetime.now(timezone.utc)
                    asset.metadata_json = {**dto.raw_metadata, "criticality": dto.criticality}

                # 2. Collect control state telemetry
                states = await connector.collect_control_state(dto)

                for st in states:
                    total_evals += 1
                    canonical_ctrl = controls_map.get(st.control_code)
                    canonical_ctrl_id = canonical_ctrl.id if canonical_ctrl else None

                    # 3. Create SHA-256 tamper-evident evidence snapshot
                    digest = compute_sha256(st.raw_payload)
                    evidence = EvidenceArtifact(
                        organization_id=org_id,
                        asset_id=asset.id,
                        canonical_control_id=canonical_ctrl_id,
                        scan_id=scan.id,
                        evidence_code=f"EVD-{uuid.uuid4().hex[:8].upper()}",
                        title=f"{st.control_code} Verification for {dto.name}",
                        source_uri=st.evidence_uri,
                        sha256_hash=digest,
                        raw_payload_json=st.raw_payload,
                        status="VERIFIED_IMMUTABLE",
                        collected_at=datetime.now(timezone.utc),
                    )
                    db.add(evidence)

                    # 4. Evaluate Pass/Fail
                    payload_data = st.raw_payload
                    is_pass = True
                    fail_reason = ""
                    remediation = ""

                    if st.control_code == "CTL-GH-01":  # Branch protection
                        if not payload_data.get("protected", False):
                            is_pass = False
                            fail_reason = payload_data.get("message") or "Default branch lacks branch protection rules."
                            remediation = f"Configure branch protection on '{dto.identifier}' requiring passing status checks and review approvals."
                    elif st.control_code == "CTL-GH-02":  # Code reviews
                        if payload_data.get("required_approving_review_count", 0) < 1:
                            is_pass = False
                            fail_reason = "Pull requests do not enforce at least 1 approving code review."
                            remediation = f"Update branch protection on '{dto.identifier}' to require >= 1 peer review approval."
                    elif st.control_code == "CTL-GH-03":  # Secret scanning
                        if not payload_data.get("is_active", False):
                            is_pass = False
                            fail_reason = "Secret scanning is currently disabled on repository."
                            remediation = f"Enable Secret Scanning & Push Protection in GitHub Security Settings for '{dto.identifier}'."
                    elif st.control_code == "CTL-GH-04":  # Dependabot alerts
                        if not payload_data.get("vulnerability_alerts_enabled", False):
                            is_pass = False
                            fail_reason = "Automated Dependabot vulnerability alerts are disabled."
                            remediation = f"Enable Dependabot alerts for '{dto.identifier}' to detect vulnerable dependencies."

                    if is_pass:
                        passed_evals += 1
                    else:
                        failed_evals += 1
                        if canonical_ctrl_id:
                            # Register finding
                            finding = Finding(
                                organization_id=org_id,
                                scan_id=scan.id,
                                asset_id=asset.id,
                                canonical_control_id=canonical_ctrl_id,
                                finding_code=f"FIND-{uuid.uuid4().hex[:6].upper()}",
                                title=f"Control Gap on {dto.name}: {st.control_code}",
                                description=fail_reason,
                                severity=canonical_ctrl.default_severity if canonical_ctrl else "HIGH",
                                status="OPEN",
                                remediation_action=remediation,
                                remediation_snippet=f"gh api --method PUT /repos/{dto.identifier}/branches/main/protection --input protection.json",
                                sla_days=14,
                            )
                            db.add(finding)

        # Finalize scan status
        scan.status = "COMPLETED"
        scan.total_assets = total_assets
        scan.total_evaluations = total_evals
        scan.passed_evaluations = passed_evals
        scan.failed_evaluations = failed_evals
        scan.completed_at = datetime.now(timezone.utc)
        await db.commit()
        await db.refresh(scan)

    except Exception as err:
        await db.rollback()
        scan.status = "FAILED"
        scan.completed_at = datetime.now(timezone.utc)
        await db.commit()
        await db.refresh(scan)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Live scan execution failed: {str(err)}"
        )

    return ScanJobResponse(
        id=scan.id,
        organization_id=scan.organization_id,
        status=scan.status,
        target_scope=scan.trigger_type,
        assets_scanned_count=scan.total_assets,
        controls_evaluated_count=scan.total_evaluations,
        findings_count=scan.failed_evaluations,
        started_at=scan.started_at,
        completed_at=scan.completed_at
    )

