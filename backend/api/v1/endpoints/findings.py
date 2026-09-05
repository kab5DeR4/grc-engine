"""
Compliance Findings & Remediation Endpoints
"""

from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, Query, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.finding import Finding
from api.deps import get_current_user_optional

router = APIRouter()


class FindingResponse(BaseModel):
    id: str
    organization_id: str
    asset_id: str
    canonical_control_id: str
    finding_code: str
    title: str
    description: str
    severity: str
    status: str
    remediation_action: str
    remediation_snippet: Optional[str]
    created_at: datetime
    updated_at: datetime


@router.get("", response_model=List[FindingResponse])
async def list_findings(
    status_filter: Optional[str] = Query(None, alias="status"),
    severity: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional)
):
    """List compliance findings and gap evaluations."""
    query = select(Finding)
    if user:
        query = query.where(Finding.organization_id == user.organization_id)
    if status_filter:
        query = query.where(Finding.status == status_filter)
    if severity:
        query = query.where(Finding.severity == severity)

    result = await db.execute(query)
    findings = result.scalars().all()
    return [
        FindingResponse(
            id=f.id,
            organization_id=f.organization_id,
            asset_id=f.asset_id,
            canonical_control_id=f.canonical_control_id,
            finding_code=f.finding_code,
            title=f.title,
            description=f.description,
            severity=f.severity,
            status=f.status,
            remediation_action=f.remediation_action,
            remediation_snippet=f.remediation_snippet,
            created_at=f.created_at,
            updated_at=f.updated_at
        )
        for f in findings
    ]


@router.post("/{finding_id}/resolve", response_model=FindingResponse)
async def resolve_finding(
    finding_id: str,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional)
):
    """Mark a finding as resolved/remediated."""
    result = await db.execute(select(Finding).where(Finding.id == finding_id))
    finding = result.scalars().first()
    if not finding:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Finding not found")
    
    finding.status = "RESOLVED"
    await db.commit()
    await db.refresh(finding)

    return FindingResponse(
        id=finding.id,
        organization_id=finding.organization_id,
        asset_id=finding.asset_id,
        canonical_control_id=finding.canonical_control_id,
        finding_code=finding.finding_code,
        title=finding.title,
        description=finding.description,
        severity=finding.severity,
        status=finding.status,
        remediation_action=finding.remediation_action,
        remediation_snippet=finding.remediation_snippet,
        created_at=finding.created_at,
        updated_at=finding.updated_at
    )
