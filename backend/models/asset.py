"""
Asset Domain Model
Represents technical infrastructure resources (repositories, buckets, IAM roles, instances).
"""

import uuid
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from sqlalchemy import String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class Asset(Base):
    __tablename__ = "assets"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    organization_id: Mapped[str] = mapped_column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    workspace_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("workspaces.id", ondelete="SET NULL"), nullable=True, index=True)
    integration_id: Mapped[str] = mapped_column(String(36), ForeignKey("integrations.id", ondelete="CASCADE"), nullable=False, index=True)
    
    asset_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True)  # github_repository, s3_bucket, iam_role, ec2_security_group, etc.
    external_id: Mapped[str] = mapped_column(String(255), nullable=False, index=True)  # e.g. "grc-engine", "arn:aws:s3:::my-bucket"
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    environment: Mapped[str] = mapped_column(String(50), default="production")
    status: Mapped[str] = mapped_column(String(50), default="ACTIVE")  # ACTIVE, ARCHIVED, DELETED
    is_monitored: Mapped[bool] = mapped_column(Boolean, default=True)
    
    # raw normalized metadata captured from provider API
    metadata_json: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, default=dict)
    
    last_discovered_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    # relationships
    organization: Mapped["Organization"] = relationship("Organization", back_populates="assets")
    workspace: Mapped[Optional["Workspace"]] = relationship("Workspace", back_populates="assets")
    integration: Mapped["Integration"] = relationship("Integration", back_populates="assets")
    evaluation_results: Mapped[List["EvaluationResult"]] = relationship("EvaluationResult", back_populates="asset", cascade="all, delete-orphan")
    findings: Mapped[List["Finding"]] = relationship("Finding", back_populates="asset", cascade="all, delete-orphan")
    evidence_artifacts: Mapped[List["EvidenceArtifact"]] = relationship("EvidenceArtifact", back_populates="asset", cascade="all, delete-orphan")
