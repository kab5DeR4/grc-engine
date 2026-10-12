"""
Evidence Artifact Domain Model
Stores tamper-evident snapshots of infrastructure configuration with SHA-256 digests
and independent trust anchor signed manifests.
"""

import uuid
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from sqlalchemy import String, DateTime, ForeignKey, Text, JSON, event
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class EvidenceArtifact(Base):
    __tablename__ = "evidence_artifacts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    organization_id: Mapped[str] = mapped_column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    asset_id: Mapped[str] = mapped_column(String(36), ForeignKey("assets.id", ondelete="CASCADE"), nullable=False, index=True)
    canonical_control_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("canonical_controls.id", ondelete="SET NULL"), nullable=True, index=True)
    scan_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("scan_jobs.id", ondelete="SET NULL"), nullable=True, index=True)

    evidence_code: Mapped[str] = mapped_column(String(50), nullable=False, index=True)  # e.g. "EVD-89201"
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    source_uri: Mapped[str] = mapped_column(String(500), nullable=False)  # e.g. "https://api.github.com/repos/org/repo/branches/main/protection"
    
    # SHA-256 payload digest (unkeyed cryptographic hash of canonical json payload)
    sha256_hash: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    
    # HMAC-SHA256 signed manifest signature under independent trust anchor key
    manifest_signature: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    
    # identifier / sequence linking to append-only trust anchor hash chain ledger
    trust_anchor_id: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)

    raw_payload_json: Mapped[Dict[str, Any]] = mapped_column(JSON, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="VERIFIED_IMMUTABLE")
    
    collected_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    # relationships
    asset: Mapped["Asset"] = relationship("Asset", back_populates="evidence_artifacts")


# immutability hooks: prevent updates and deletions on evidence artifacts
@event.listens_for(EvidenceArtifact, "before_update")
def block_evidence_update(mapper, connection, target):
    # block updating evidence records in mutable db, append-only fr
    if not getattr(target, "_allow_internal_modification", False):
        raise ValueError("EvidenceArtifact is append-only and cannot be updated.")

@event.listens_for(EvidenceArtifact, "before_delete")
def block_evidence_delete(mapper, connection, target):
    # block deleting evidence records directly fr
    if not getattr(target, "_allow_internal_modification", False):
        raise ValueError("EvidenceArtifact is append-only and cannot be deleted.")
