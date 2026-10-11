"""
Discovered Infrastructure Assets Endpoints
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.asset import Asset
from api.deps import get_current_org_id

router = APIRouter()


class AssetResponse(BaseModel):
    id: str
    organization_id: str
    integration_id: Optional[str]
    asset_type: str
    name: str
    identifier: str
    criticality: str
    is_monitored: bool
    compliance_score: float
    raw_metadata: Dict[str, Any]
    created_at: datetime


@router.get("", response_model=List[AssetResponse])
async def list_assets(
    asset_type: Optional[str] = Query(None, description="Filter by asset type like GITHUB_REPO, AWS_S3"),
    db: AsyncSession = Depends(get_db),
    org_id: str = Depends(get_current_org_id),
):
    """List discovered technical assets across infrastructure."""
    # lock down asset list to tenant organization fr
    query = select(Asset).where(Asset.organization_id == org_id)
    if asset_type:
        query = query.where(Asset.asset_type == asset_type)


    result = await db.execute(query)
    assets = result.scalars().all()
    return [
        AssetResponse(
            id=a.id,
            organization_id=a.organization_id,
            integration_id=a.integration_id,
            asset_type=a.asset_type,
            name=a.name,
            identifier=a.external_id,
            criticality=(a.metadata_json or {}).get("criticality", "TIER_1"),
            is_monitored=a.is_monitored,
            compliance_score=100.0,
            raw_metadata=a.metadata_json or {},
            created_at=a.created_at
        )
        for a in assets
    ]
