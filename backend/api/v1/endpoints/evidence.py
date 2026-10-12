"""
Tamper-Evident Evidence Vault Endpoints
Provides evidence retrieval and multi-layer verification (SHA-256 payload digest + independent trust anchor).
"""

from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models.evidence import EvidenceArtifact
from api.deps import get_current_org_id
from core.trust_anchor import verify_evidence_artifact, trust_anchor_ledger

router = APIRouter()


class EvidenceResponse(BaseModel):
    id: str
    organization_id: str
    scan_id: Optional[str]
    asset_id: Optional[str]
    control_definition_id: Optional[str]
    sha256_hash: str
    manifest_signature: Optional[str] = None
    trust_anchor_id: Optional[str] = None
    source_uri: str
    created_at: datetime


class EvidenceVerifyResponse(BaseModel):
    id: str
    recorded_hash: str
    computed_hash: str
    digest_matches: bool
    trust_anchor_verified: bool
    trust_anchor_id: Optional[str] = None
    is_valid: bool
    verified_at: datetime
    verification_details: str


@router.get("", response_model=List[EvidenceResponse])
async def list_evidence(
    db: AsyncSession = Depends(get_db),
    org_id: str = Depends(get_current_org_id),
):
    """List cryptographic evidence artifacts for current organization."""
    # lock down query to tenant org id, avoid cross-org leak fr
    query = select(EvidenceArtifact).where(EvidenceArtifact.organization_id == org_id)

    result = await db.execute(query)
    artifacts = result.scalars().all()
    return [
        EvidenceResponse(
            id=a.id,
            organization_id=a.organization_id,
            scan_id=a.scan_id,
            asset_id=a.asset_id,
            control_definition_id=a.canonical_control_id,
            sha256_hash=a.sha256_hash,
            manifest_signature=a.manifest_signature,
            trust_anchor_id=a.trust_anchor_id,
            source_uri=a.source_uri,
            created_at=a.collected_at
        )
        for a in artifacts
    ]


@router.get("/{evidence_id}/verify", response_model=EvidenceVerifyResponse)
async def verify_evidence_hash(
    evidence_id: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Cryptographically verify SHA-256 payload digest and independent trust anchor integrity.
    Detects if payload alone was modified, OR if both payload and adjacent digest were tampered.
    """
    result = await db.execute(select(EvidenceArtifact).where(EvidenceArtifact.id == evidence_id))
    artifact = result.scalars().first()
    if not artifact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evidence artifact not found")

    verification = verify_evidence_artifact(artifact, ledger=trust_anchor_ledger)

    return EvidenceVerifyResponse(
        id=verification["id"],
        recorded_hash=verification["recorded_hash"],
        computed_hash=verification["computed_hash"],
        digest_matches=verification["digest_matches"],
        trust_anchor_verified=verification["trust_anchor_verified"],
        trust_anchor_id=str(verification["trust_anchor_id"]) if verification["trust_anchor_id"] else None,
        is_valid=verification["is_valid"],
        verified_at=verification["verified_at"],
        verification_details=verification["verification_details"]
    )


@router.put("/{evidence_id}")
@router.patch("/{evidence_id}")
async def reject_evidence_update(evidence_id: str):
    """Reject unauthorized modification attempts on append-only evidence artifacts."""
    raise HTTPException(
        status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
        detail="Evidence records are immutable and append-only. In-place modification is strictly prohibited."
    )


@router.delete("/{evidence_id}")
async def reject_evidence_delete(evidence_id: str):
    """Reject unauthorized deletion attempts on append-only evidence artifacts."""
    raise HTTPException(
        status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
        detail="Evidence records are immutable and append-only. Deletion is strictly prohibited."
    )
