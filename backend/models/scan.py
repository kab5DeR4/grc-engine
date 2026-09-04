"""
Scan Job & Evaluation Result Domain Models
Tracks compliance scan executions and individual deterministic evaluation verdicts.
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

class ScanJob(Base):
    __tablename__ = "scan_jobs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    organization_id: Mapped[str] = mapped_column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    workspace_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("workspaces.id", ondelete="SET NULL"), nullable=True, index=True)
    
    trigger_type: Mapped[str] = mapped_column(String(50), default="MANUAL")  # MANUAL, SCHEDULED, WEBHOOK, CLI
    status: Mapped[str] = mapped_column(String(50), default="RUNNING")  # RUNNING, COMPLETED, FAILED
    
    total_assets: Mapped[int] = mapped_column(Integer, default=0)
    total_evaluations: Mapped[int] = mapped_column(Integer, default=0)
    passed_evaluations: Mapped[int] = mapped_column(Integer, default=0)
    failed_evaluations: Mapped[int] = mapped_column(Integer, default=0)
    
    overall_compliance_score: Mapped[int] = mapped_column(Integer, default=0)  # 0 - 100
    overall_risk_score: Mapped[int] = mapped_column(Integer, default=0)  # 0 - 100
    
    log_output: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # relationships
    evaluations: Mapped[List["EvaluationResult"]] = relationship("EvaluationResult", back_populates="scan", cascade="all, delete-orphan")
    findings: Mapped[List["Finding"]] = relationship("Finding", back_populates="scan", cascade="all, delete-orphan")

class EvaluationResult(Base):
    __tablename__ = "evaluation_results"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    scan_id: Mapped[str] = mapped_column(String(36), ForeignKey("scan_jobs.id", ondelete="CASCADE"), nullable=False, index=True)
    asset_id: Mapped[str] = mapped_column(String(36), ForeignKey("assets.id", ondelete="CASCADE"), nullable=False, index=True)
    canonical_control_id: Mapped[str] = mapped_column(String(36), ForeignKey("canonical_controls.id", ondelete="CASCADE"), nullable=False, index=True)
    
    status: Mapped[str] = mapped_column(String(50), nullable=False)  # PASS, FAIL, WARNING, SKIPPED
    severity: Mapped[str] = mapped_column(String(20), default="HIGH")  # CRITICAL, HIGH, MEDIUM, LOW
    reason: Mapped[str] = mapped_column(Text, nullable=False)
    
    # technical evaluation context & evidence snippet
    details_json: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, default=dict)
    evaluated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    # relationships
    scan: Mapped["ScanJob"] = relationship("ScanJob", back_populates="evaluations")
    asset: Mapped["Asset"] = relationship("Asset", back_populates="evaluation_results")
    control: Mapped["CanonicalControl"] = relationship("CanonicalControl", back_populates="evaluation_results")
