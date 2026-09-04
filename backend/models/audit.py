"""
Audit Log & Drift Event Domain Models
Maintains an immutable append-only hash-chained audit ledger and tracks security drift.
"""

import uuid
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from sqlalchemy import String, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    organization_id: Mapped[str] = mapped_column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    
    event_code: Mapped[str] = mapped_column(String(50), nullable=False)  # e.g. "AUD-1001"
    event_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True)  # e.g. "SCAN_TRIGGERED", "FINDING_REMEDIATED"
    severity: Mapped[str] = mapped_column(String(20), default="INFO")  # INFO, WARNING, CRITICAL
    
    actor_name: Mapped[str] = mapped_column(String(255), nullable=False)
    actor_email: Mapped[str] = mapped_column(String(255), nullable=False)
    actor_role: Mapped[str] = mapped_column(String(50), nullable=False)
    
    action: Mapped[str] = mapped_column(String(255), nullable=False)
    target: Mapped[str] = mapped_column(String(255), nullable=False)
    details: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # cryptographic hash chaining for tamper evidence
    previous_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    current_hash: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    # relationships
    organization: Mapped["Organization"] = relationship("Organization", back_populates="audit_logs")

class DriftEvent(Base):
    __tablename__ = "drift_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    organization_id: Mapped[str] = mapped_column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    asset_id: Mapped[str] = mapped_column(String(36), ForeignKey("assets.id", ondelete="CASCADE"), nullable=False, index=True)
    canonical_control_id: Mapped[str] = mapped_column(String(36), ForeignKey("canonical_controls.id", ondelete="CASCADE"), nullable=False, index=True)
    
    drift_type: Mapped[str] = mapped_column(String(50), nullable=False)  # NEGATIVE_DRIFT (regression), POSITIVE_DRIFT (resolved)
    previous_status: Mapped[str] = mapped_column(String(50), nullable=False)  # PASS
    new_status: Mapped[str] = mapped_column(String(50), nullable=False)  # FAIL
    
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    detected_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
