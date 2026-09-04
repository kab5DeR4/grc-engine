"""
Finding Domain Model
Represents compliance gaps, vulnerabilities, and drift events with SLAs and remediation steps.
"""

import uuid
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from sqlalchemy import String, Integer, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class Finding(Base):
    __tablename__ = "findings"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    organization_id: Mapped[str] = mapped_column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    workspace_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("workspaces.id", ondelete="SET NULL"), nullable=True, index=True)
    scan_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("scan_jobs.id", ondelete="SET NULL"), nullable=True, index=True)
    asset_id: Mapped[str] = mapped_column(String(36), ForeignKey("assets.id", ondelete="CASCADE"), nullable=False, index=True)

    canonical_control_id: Mapped[str] = mapped_column(String(36), ForeignKey("canonical_controls.id", ondelete="CASCADE"), nullable=False, index=True)
    
    finding_code: Mapped[str] = mapped_column(String(50), nullable=False, index=True)  # e.g. "FIND-101"
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    severity: Mapped[str] = mapped_column(String(20), default="HIGH", index=True)  # CRITICAL, HIGH, MEDIUM, LOW
    status: Mapped[str] = mapped_column(String(50), default="OPEN", index=True)  # OPEN, RESOLVED, SUPPRESSED, SNOOZED
    
    remediation_action: Mapped[str] = mapped_column(Text, nullable=False)
    remediation_snippet: Mapped[Optional[str]] = mapped_column(Text, nullable=True)  # e.g. CLI command / Terraform code
    sla_days: Mapped[int] = mapped_column(Integer, default=14)
    sla_due_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    
    resolved_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    # relationships
    organization: Mapped["Organization"] = relationship("Organization", back_populates="findings")
    asset: Mapped["Asset"] = relationship("Asset", back_populates="findings")
    control: Mapped["CanonicalControl"] = relationship("CanonicalControl", back_populates="findings")
    scan: Mapped[Optional["ScanJob"]] = relationship("ScanJob", back_populates="findings")
