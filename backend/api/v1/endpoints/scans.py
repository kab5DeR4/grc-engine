"""
Compliance Scans & Scan Job Trigger Endpoints
Orchestrates live telemetry ingestion, asset discovery, control evaluation,
SHA-256 evidence vaulting, and finding generation across connected integrations.
Runs scans asynchronously via background workers to keep HTTP responses instantaneous.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
import hashlib
import json
import uuid
import logging

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db, async_session_factory
from models.scan import ScanJob
from models.organization import Organization
from models.integration import Integration
from models.asset import Asset
from models.control import CanonicalControl
from models.evidence import EvidenceArtifact
from models.finding import Finding
from api.deps import get_current_org_id
from connectors import get_connector

logger = logging.getLogger("grc_engine.scans")
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


async def execute_compliance_scan(
    scan_id: str,
    org_id: str,
    target_scope: str,
    target_integration_id: Optional[str] = None,
) -> None:
    """
    Background worker executing live compliance scan:
    1. Discovers technical assets from connected integrations.
    2. Collects live control states (branch protection, secret scanning, dependabot).
    3. Hashes snapshots into SHA-256 tamper-evident evidence artifacts.
    4. Evaluates against canonical controls and registers compliance findings.
    5. Cleanly isolates transactions and records failures reliably if an error occurs.
    """
    # dedicated session for background task fr
    async with async_session_factory() as db:
        scan_res = await db.execute(select(ScanJob).where(ScanJob.id == scan_id))
        scan = scan_res.scalars().first()
        if not scan:
            return

        scan.status = "RUNNING"
        await db.commit()

        total_assets = 0
        total_evals = 0
        passed_evals = 0
        failed_evals = 0

        try:
            # query integrations belonging strictly to this org fr
            int_query = select(Integration).where(Integration.organization_id == org_id)
            if target_integration_id:
                int_query = int_query.where(Integration.id == target_integration_id)
            
            int_res = await db.execute(int_query)
            integrations = int_res.scalars().all()

            # fetch canonical controls lookup
            ctrl_res = await db.execute(select(CanonicalControl))
            controls_map = {c.code: c for c in ctrl_res.scalars().all()}

            for integration in integrations:
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

                discovered_dtos = await connector.discover_assets()
                total_assets += len(discovered_dtos)

                for dto in discovered_dtos:
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

                    states = await connector.collect_control_state(dto)

                    for st in states:
                        total_evals += 1
                        canonical_ctrl = controls_map.get(st.control_code)
                        canonical_ctrl_id = canonical_ctrl.id if canonical_ctrl else None

                        # create SHA-256 tamper-evident evidence snapshot
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

                        # evaluate Pass/Fail
                        payload_data = st.raw_payload
                        is_pass = True
                        fail_reason = ""
                        remediation = ""

                        if st.control_code == "CTL-GH-01":
                            if not payload_data.get("protected", False):
                                is_pass = False
                                fail_reason = payload_data.get("message") or "Default branch lacks branch protection rules."
                                remediation = f"Configure branch protection on '{dto.identifier}' requiring passing status checks and review approvals."
                        elif st.control_code == "CTL-GH-02":
                            if payload_data.get("required_approving_review_count", 0) < 1:
                                is_pass = False
                                fail_reason = "Pull requests do not enforce at least 1 approving code review."
                                remediation = f"Update branch protection on '{dto.identifier}' to require >= 1 peer review approval."
                        elif st.control_code == "CTL-GH-03":
                            if not payload_data.get("is_active", False):
                                is_pass = False
                                fail_reason = "Secret scanning is currently disabled on repository."
                                remediation = f"Enable Secret Scanning & Push Protection in GitHub Security Settings for '{dto.identifier}'."
                        elif st.control_code == "CTL-GH-04":
                            if not payload_data.get("vulnerability_alerts_enabled", False):
                                is_pass = False
                                fail_reason = "Automated Dependabot vulnerability alerts are disabled."
                                remediation = f"Enable Dependabot alerts for '{dto.identifier}' to detect vulnerable dependencies."

                        if is_pass:
                            passed_evals += 1
                        else:
                            failed_evals += 1
                            if canonical_ctrl_id:
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

            # wrap up successful scan job
            scan.status = "COMPLETED"
            scan.total_assets = total_assets
            scan.total_evaluations = total_evals
            scan.passed_evaluations = passed_evals
            scan.failed_evaluations = failed_evals
            scan.completed_at = datetime.now(timezone.utc)
            await db.commit()

        except Exception as err:
            logger.exception(f"Background scan {scan_id} failed: {err}")
            # clean rollback of any partial writes fr
            await db.rollback()
            # record failure safely in a separate recovery session
            try:
                async with async_session_factory() as recovery_db:
                    fail_res = await recovery_db.execute(select(ScanJob).where(ScanJob.id == scan_id))
                    fail_scan = fail_res.scalars().first()
                    if fail_scan:
                        fail_scan.status = "FAILED"
                        fail_scan.completed_at = datetime.now(timezone.utc)
                        await recovery_db.commit()
            except Exception as rec_err:
                logger.exception(f"Failed to record FAILED status for scan {scan_id}: {rec_err}")


@router.get("", response_model=List[ScanJobResponse])
async def list_scans(
    db: AsyncSession = Depends(get_db),
    org_id: str = Depends(get_current_org_id),
):
    """List compliance scan history for current organization."""
    # query scoped strictly to tenant org id fr
    query = select(ScanJob).where(ScanJob.organization_id == org_id).order_by(ScanJob.started_at.desc())
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


@router.get("/{scan_id}", response_model=ScanJobResponse)
async def get_scan(
    scan_id: str,
    db: AsyncSession = Depends(get_db),
    org_id: str = Depends(get_current_org_id),
):
    """Retrieve detailed scan job status by ID for current organization."""
    result = await db.execute(select(ScanJob).where(ScanJob.id == scan_id, ScanJob.organization_id == org_id))
    scan = result.scalars().first()
    if not scan:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Scan job not found")

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


@router.post("/trigger", response_model=ScanJobResponse)
async def trigger_scan(
    payload: ScanTriggerPayload,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    org_id: str = Depends(get_current_org_id),
):
    """
    Trigger a compliance scan job asynchronously.
    Creates scan job in PENDING state and queues execution to background worker.
    Returns immediately without blocking the HTTP request loop.
    """
    # create scan job record right away in PENDING state fr
    scan = ScanJob(
        organization_id=org_id,
        trigger_type=payload.target_scope,
        status="PENDING",
        total_assets=0,
        total_evaluations=0,
        passed_evaluations=0,
        failed_evaluations=0,
        started_at=datetime.now(timezone.utc),
    )
    db.add(scan)
    await db.commit()
    await db.refresh(scan)

    # fire and forget background task to do the heavy lifting fr
    background_tasks.add_task(
        execute_compliance_scan,
        scan_id=scan.id,
        org_id=org_id,
        target_scope=payload.target_scope,
        target_integration_id=payload.integration_id,
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
