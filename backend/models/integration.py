"""
Integration Domain Model
Tracks connected infrastructure providers (GitHub, AWS, Azure, GCP, etc.).
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

class Integration(Base):
    __tablename__ = "integrations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_uuid)
    organization_id: Mapped[str] = mapped_column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False, index=True)
    provider_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)  # github, aws, azure, gcp, kubernetes
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(50), default="CLOUD")  # CLOUD, CI/CD, WORKFLOW
    status: Mapped[str] = mapped_column(String(50), default="CONNECTED")  # CONNECTED, DISCONNECTED, ERROR
    credentials_encrypted: Mapped[Optional[str]] = mapped_column(String(1024), nullable=True)
    config_json: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, default=dict)
    telemetry_summary: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, default=dict)
    last_sync_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    # relationships
    organization: Mapped["Organization"] = relationship("Organization", back_populates="integrations")
    assets: Mapped[List["Asset"]] = relationship("Asset", back_populates="integration", cascade="all, delete-orphan")
