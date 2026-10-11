"""
Attestation & Audit Reports Endpoints
"""

from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.finding import Finding
from models.asset import Asset
from models.evidence import EvidenceArtifact
from models.scan import ScanJob
from api.deps import get_current_org_id
from report_generator import generate_html_report

router = APIRouter()


class ReportExportRequest(BaseModel):
    title: str = "GRC Continuous Audit Attestation Report"
    include_evidence_hashes: bool = True


@router.get("/summary")
async def get_compliance_summary(
    db: AsyncSession = Depends(get_db),
    org_id: str = Depends(get_current_org_id),
):
    """Compute top-level summary metrics for executive dashboard for current organization."""
    # count assets scoped to this org fr
    asset_res = await db.execute(select(Asset).where(Asset.organization_id == org_id))
    assets = asset_res.scalars().all()
    total_assets = len(assets)

    # count findings scoped to this org fr
    finding_res = await db.execute(select(Finding).where(Finding.organization_id == org_id))
    findings = finding_res.scalars().all()
    open_findings = [f for f in findings if f.status == "OPEN"]
    
    # count evidence scoped to this org fr
    ev_res = await db.execute(select(EvidenceArtifact).where(EvidenceArtifact.organization_id == org_id))
    ev_count = len(ev_res.scalars().all())

    # calculate risk score
    critical_count = len([f for f in open_findings if f.severity == "CRITICAL"])
    high_count = len([f for f in open_findings if f.severity == "HIGH"])
    medium_count = len([f for f in open_findings if f.severity == "MEDIUM"])

    base_score = 100 - (critical_count * 15 + high_count * 8 + medium_count * 3)
    compliance_score = max(0, min(100, base_score)) if total_assets > 0 else 92

    return {
        "compliance_score": compliance_score,
        "total_assets": total_assets,
        "open_findings_count": len(open_findings),
        "evidence_proofs_count": ev_count,
        "frameworks_evaluated": ["SOC 2 Type II", "ISO/IEC 27001:2022", "NIST CSF 2.0"],
        "generated_at": datetime.now(timezone.utc)
    }

