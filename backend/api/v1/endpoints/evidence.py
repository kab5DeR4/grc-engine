"""
Tamper-Evident Evidence Vault Endpoints
"""

import hashlib
import json
from typing import List, Optional, Dict, Any
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.evidence import EvidenceArtifact
from api.deps import get_current_user_optional

router = APIRouter()


class EvidenceResponse(BaseModel):
    id: str
    organization_id: str
    scan_id: Optional[str]
    asset_id: Optional[str]
    control_definition_id: Optional[str]
    sha256_hash: str
    source_uri: str
    created_at: datetime


class EvidenceVerifyResponse(BaseModel):
    id: str
    recorded_hash: str
    computed_hash: str
    is_valid: bool
    verified_at: datetime


@router.get("", response_model=List[EvidenceResponse])
async def list_evidence(
    db: AsyncSession = Depends(get_db),
    user=Depends(get_current_user_optional)
):
    """List immutable cryptographic evidence artifacts."""
    query = select(EvidenceArtifact)
    if user:
        query = query.where(EvidenceArtifact.organization_id == user.organization_id)

    result = await db.execute(query)
    artifacts = result.scalars().all()
    return [
        EvidenceResponse(
            id=a.id,
            organization_id=a.organization_id,
            scan_id=a.scan_id,
            asset_id=a.asset_id,
            control_definition_id=a.control_definition_id,
            sha256_hash=a.sha256_hash,
            source_uri=a.source_uri,
            created_at=a.created_at
        )
        for a in artifacts
    ]


@router.get("/{evidence_id}/verify", response_model=EvidenceVerifyResponse)
async def verify_evidence_hash(
    evidence_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Cryptographically verify SHA-256 integrity of an evidence artifact."""
    result = await db.execute(select(EvidenceArtifact).where(EvidenceArtifact.id == evidence_id))
    artifact = result.scalars().first()
    if not artifact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evidence artifact not found")

    # Recalculate deterministic hash of stored raw payload
    payload_str = json.dumps(artifact.raw_payload_json or {}, sort_keys=True)
    computed_hash = hashlib.sha256(payload_str.encode("utf-8")).hexdigest()

    return EvidenceVerifyResponse(
        id=artifact.id,
        recorded_hash=artifact.sha256_hash,
        computed_hash=computed_hash,
        is_valid=(computed_hash == artifact.sha256_hash),
        verified_at=datetime.utcnow()
    )
