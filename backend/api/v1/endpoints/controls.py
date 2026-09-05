"""
Compliance Controls & Frameworks Endpoints
"""

from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.control import Framework, FrameworkRequirement, CanonicalControl
from api.deps import get_current_user_optional

router = APIRouter()


class FrameworkRequirementResponse(BaseModel):
    id: str
    clause_id: str
    title: str
    description: Optional[str]
    category: Optional[str]


class FrameworkResponse(BaseModel):
    id: str
    code: str
    name: str
    version: str
    description: Optional[str]
    requirements: List[FrameworkRequirementResponse] = []


class CanonicalControlResponse(BaseModel):
    id: str
    code: str
    name: str
    category: str
    description: str
    default_severity: str
    severity_weight: int
    provider_type: str
    telemetry_spec: Optional[str]


@router.get("/frameworks", response_model=List[FrameworkResponse])
async def list_frameworks(db: AsyncSession = Depends(get_db)):
    """List supported compliance frameworks (SOC 2, ISO 27001, NIST CSF)."""
    result = await db.execute(select(Framework))
    frameworks = result.scalars().all()
    
    output = []
    for fw in frameworks:
        req_res = await db.execute(
            select(FrameworkRequirement).where(FrameworkRequirement.framework_id == fw.id)
        )
        reqs = req_res.scalars().all()
        output.append(
            FrameworkResponse(
                id=fw.id,
                code=fw.code,
                name=fw.name,
                version=fw.version,
                description=fw.description,
                requirements=[
                    FrameworkRequirementResponse(
                        id=r.id,
                        clause_id=r.clause_id,
                        title=r.title,
                        description=r.description,
                        category=r.category,
                    )
                    for r in reqs
                ]
            )
        )
    return output


@router.get("/definitions", response_model=List[CanonicalControlResponse])
async def list_control_definitions(db: AsyncSession = Depends(get_db)):
    """List canonical control definitions in catalogue."""
    result = await db.execute(select(CanonicalControl))
    controls = result.scalars().all()
    return [
        CanonicalControlResponse(
            id=c.id,
            code=c.code,
            name=c.name,
            category=c.category,
            description=c.description,
            default_severity=c.default_severity,
            severity_weight=c.severity_weight,
            provider_type=c.provider_type,
            telemetry_spec=c.telemetry_spec,
        )
        for c in controls
    ]
