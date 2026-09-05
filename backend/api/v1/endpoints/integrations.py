"""
Infrastructure Integrations Endpoints (GitHub, AWS, etc.)
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.integration import Integration
from models.organization import Organization
from api.deps import get_current_user_optional

router = APIRouter()


class IntegrationCreatePayload(BaseModel):
    integration_type: str  # GITHUB, AWS, GOOGLE_CLOUD, etc.
    name: str
    credentials: Dict[str, Any] = {}
    config_options: Dict[str, Any] = {}


class IntegrationResponse(BaseModel):
    id: str
    organization_id: str
    integration_type: str
    name: str
    status: str
    last_sync_at: Optional[datetime]
    created_at: datetime


@router.get("", response_model=List[IntegrationResponse])
async def list_integrations(
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional)
):
    """List all integrations for organization or default org."""
    query = select(Integration)
    if user:
        query = query.where(Integration.organization_id == user.organization_id)
    
    result = await db.execute(query)
    integrations = result.scalars().all()
    return [
        IntegrationResponse(
            id=i.id,
            organization_id=i.organization_id,
            integration_type=i.integration_type,
            name=i.name,
            status=i.status,
            last_sync_at=i.last_sync_at,
            created_at=i.created_at
        )
        for i in integrations
    ]


@router.post("/github/connect", response_model=IntegrationResponse)
async def connect_github(
    payload: IntegrationCreatePayload,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional)
):
    """Connect a GitHub Personal Access Token or App integration."""
    # Find or fallback to first org if running in open demo mode
    org_id = user.organization_id if user else None
    if not org_id:
        org_res = await db.execute(select(Organization).limit(1))
        org = org_res.scalars().first()
        if not org:
            org = Organization(name="Default Organization", slug="default-org")
            db.add(org)
            await db.flush()
        org_id = org.id

    integration = Integration(
        organization_id=org_id,
        integration_type="GITHUB",
        name=payload.name or "GitHub Production",
        credentials=payload.credentials,
        config_options=payload.config_options,
        status="CONNECTED",
    )
    db.add(integration)
    await db.commit()
    await db.refresh(integration)

    return IntegrationResponse(
        id=integration.id,
        organization_id=integration.organization_id,
        integration_type=integration.integration_type,
        name=integration.name,
        status=integration.status,
        last_sync_at=integration.last_sync_at,
        created_at=integration.created_at
    )
