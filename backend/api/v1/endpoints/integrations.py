"""
Infrastructure Integrations Endpoints (GitHub, AWS, etc.)
Handles connecting, testing, and querying live/mock infrastructure connectors.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.integration import Integration
from models.organization import Organization
from api.deps import get_current_user_optional
from connectors import get_connector, GitHubConnector, MockGitHubConnector
from connectors.base import ConnectionTestResult

router = APIRouter()


class IntegrationCreatePayload(BaseModel):
    integration_type: str = "GITHUB"  # GITHUB, AWS, etc.
    name: Optional[str] = "GitHub Production"
    credentials: Dict[str, Any] = {}
    config_options: Dict[str, Any] = {}
    is_mock: bool = False


class IntegrationTestPayload(BaseModel):
    integration_type: str = "GITHUB"
    credentials: Dict[str, Any] = {}
    config_options: Dict[str, Any] = {}
    is_mock: bool = False


class IntegrationResponse(BaseModel):
    id: str
    organization_id: str
    provider_type: str
    name: str
    category: str
    status: str
    telemetry_summary: Optional[Dict[str, Any]] = {}
    last_sync_at: Optional[datetime]
    created_at: datetime


@router.get("", response_model=List[IntegrationResponse])
async def list_integrations(
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional),
):
    """List all connected integrations."""
    query = select(Integration)
    if user:
        query = query.where(Integration.organization_id == user.organization_id)

    result = await db.execute(query)
    integrations = result.scalars().all()
    return [
        IntegrationResponse(
            id=i.id,
            organization_id=i.organization_id,
            provider_type=i.provider_type,
            name=i.name,
            category=i.category,
            status=i.status,
            telemetry_summary=i.telemetry_summary or {},
            last_sync_at=i.last_sync_at,
            created_at=i.created_at,
        )
        for i in integrations
    ]


@router.post("/github/test", response_model=ConnectionTestResult)
async def test_github_connection(payload: IntegrationTestPayload):
    """
    Test reachability and credential validity for a GitHub token without persisting.
    """
    creds = payload.credentials
    if payload.is_mock:
        creds["is_mock"] = True

    connector = get_connector(
        integration_type=payload.integration_type,
        credentials=creds,
        config_options=payload.config_options,
        force_mock=payload.is_mock,
    )
    return await connector.test_connection()


@router.post("/github/connect", response_model=IntegrationResponse)
async def connect_github(
    payload: IntegrationCreatePayload,
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional),
):
    """
    Connect a GitHub integration (live PAT or mock mode).
    Validates connection before saving to database.
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

    creds = payload.credentials
    if payload.is_mock:
        creds["is_mock"] = True

    connector = get_connector(
        integration_type="GITHUB",
        credentials=creds,
        config_options=payload.config_options,
        force_mock=payload.is_mock,
    )

    test_res = await connector.test_connection()
    status_str = "CONNECTED" if test_res.success else "ERROR"

    telemetry = {
        "verified": test_res.success,
        "message": test_res.message,
        "identity": test_res.identity,
        "rate_limit": test_res.rate_limit,
    }

    integration = Integration(
        organization_id=org_id,
        provider_type="github",
        name=payload.name or "GitHub Production",
        category="CI/CD",
        status=status_str,
        credentials_encrypted=creds.get("token") or creds.get("pat") or ("mock-token" if payload.is_mock else ""),
        config_json=payload.config_options,
        telemetry_summary=telemetry,
        last_sync_at=datetime.now(timezone.utc) if test_res.success else None,
    )
    db.add(integration)
    await db.commit()
    await db.refresh(integration)

    return IntegrationResponse(
        id=integration.id,
        organization_id=integration.organization_id,
        provider_type=integration.provider_type,
        name=integration.name,
        category=integration.category,
        status=integration.status,
        telemetry_summary=integration.telemetry_summary or {},
        last_sync_at=integration.last_sync_at,
        created_at=integration.created_at,
    )


@router.get("/github/status")
async def get_github_status(
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional),
):
    """
    Check the status of the primary active GitHub integration.
    """
    query = select(Integration).where(Integration.provider_type == "github")
    if user:
        query = query.where(Integration.organization_id == user.organization_id)
    
    result = await db.execute(query)
    integration = result.scalars().first()

    if not integration:
        return {
            "connected": False,
            "message": "No GitHub integration configured.",
            "status": "DISCONNECTED",
        }

    return {
        "connected": (integration.status == "CONNECTED"),
        "integration_id": integration.id,
        "name": integration.name,
        "status": integration.status,
        "telemetry_summary": integration.telemetry_summary or {},
        "last_sync_at": integration.last_sync_at,
    }
