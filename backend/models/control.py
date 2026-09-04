"""
Canonical Control & Framework Mapping Models
Defines vendor-agnostic technical controls, regulatory frameworks, and their mappings.
"""

import uuid
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class CanonicalControl(Base):
    __tablename__ = "canonical_controls"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)  # e.g. "CTL-GH-01", "CTL-KMS-01"
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False, index=True)  # CRYPTOGRAPHY, ACCESS_CONTROL, CI/CD, BOUNDARY, AUDIT
    description: Mapped[str] = mapped_column(Text, nullable=False)
    default_severity: Mapped[str] = mapped_column(String(20), default="HIGH")  # CRITICAL, HIGH, MEDIUM, LOW
    severity_weight: Mapped[int] = mapped_column(Integer, default=10)  # 5, 10, 15
    provider_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)  # github, aws, generic
    telemetry_spec: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)  # e.g. "AES-256 / 90-DAY", "APPROVERS >= 2"
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    # relationships
    mappings: Mapped[List["ControlMapping"]] = relationship("ControlMapping", back_populates="control", cascade="all, delete-orphan")
    evaluation_results: Mapped[List["EvaluationResult"]] = relationship("EvaluationResult", back_populates="control")
    findings: Mapped[List["Finding"]] = relationship("Finding", back_populates="control")

class Framework(Base):
    __tablename__ = "frameworks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)  # e.g. "SOC2", "ISO27001", "NIST_CSF"
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    version: Mapped[str] = mapped_column(String(50), default="2022")
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    # relationships
    requirements: Mapped[List["FrameworkRequirement"]] = relationship("FrameworkRequirement", back_populates="framework", cascade="all, delete-orphan")

class FrameworkRequirement(Base):
    __tablename__ = "framework_requirements"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    framework_id: Mapped[str] = mapped_column(String(36), ForeignKey("frameworks.id", ondelete="CASCADE"), nullable=False, index=True)
    clause_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)  # e.g. "CC8.1", "A.8.28", "PR.DS-01"
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    # relationships
    framework: Mapped["Framework"] = relationship("Framework", back_populates="requirements")
    mappings: Mapped[List["ControlMapping"]] = relationship("ControlMapping", back_populates="requirement", cascade="all, delete-orphan")

class ControlMapping(Base):
    __tablename__ = "control_mappings"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    canonical_control_id: Mapped[str] = mapped_column(String(36), ForeignKey("canonical_controls.id", ondelete="CASCADE"), nullable=False, index=True)
    framework_requirement_id: Mapped[str] = mapped_column(String(36), ForeignKey("framework_requirements.id", ondelete="CASCADE"), nullable=False, index=True)
    notes: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    # relationships
    control: Mapped["CanonicalControl"] = relationship("CanonicalControl", back_populates="mappings")
    requirement: Mapped["FrameworkRequirement"] = relationship("FrameworkRequirement", back_populates="mappings")
