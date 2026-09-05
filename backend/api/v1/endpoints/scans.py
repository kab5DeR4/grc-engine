"""
Compliance Scans & Scan Job Trigger Endpoints
"""

from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.scan import ScanJob
from models.organization import Organization
from api.deps import get_current_user_optional

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
            target_scope=s.target_scope,
            assets_scanned_count=s.assets_scanned_count,
            controls_evaluated_count=s.controls_evaluated_count,
            findings_count=s.findings_count,
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
    """Trigger a new compliance scan job across connected integrations."""
    org_id = user.organization_id if user else None
    if not org_id:
        org_res = await db.execute(select(Organization).limit(1))
        org = org_res.scalars().first()
        if not org:
            org = Organization(name="Default Organization", slug="default-org")
            db.add(org)
            await db.flush()
        org_id = org.id

    scan = ScanJob(
        organization_id=org_id,
        status="PENDING",
        target_scope=payload.target_scope,
        assets_scanned_count=0,
        controls_evaluated_count=0,
        findings_count=0
    )
    db.add(scan)
    await db.commit()
    await db.refresh(scan)

    return ScanJobResponse(
        id=scan.id,
        organization_id=scan.organization_id,
        status=scan.status,
        target_scope=scan.target_scope,
        assets_scanned_count=scan.assets_scanned_count,
        controls_evaluated_count=scan.controls_evaluated_count,
        findings_count=scan.findings_count,
        started_at=scan.started_at,
        completed_at=scan.completed_at
    )
