"""
Database Engine & Async Session Management
Provides SQLAlchemy 2.0 async engine, declarative base, and session generator.
"""

import os
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
    AsyncEngine,
)
from sqlalchemy.orm import DeclarativeBase

# resolve absolute path for local sqlite file so it works from any cwd fr
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DB_PATH = os.path.join(BASE_DIR, "grc_engine.db").replace("\\", "/")
DEFAULT_DB_URL = f"sqlite+aiosqlite:///{DEFAULT_DB_PATH}"
DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_DB_URL)

# fix postgres:// prefix if provided by older cloud hosts
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://") and not DATABASE_URL.startswith("postgresql+asyncpg://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# create async engine
connect_args = {"check_same_thread": False} if "sqlite" in DATABASE_URL else {}

engine: AsyncEngine = create_async_engine(
    DATABASE_URL,
    echo=False,
    connect_args=connect_args,
    future=True,
)

# create async session factory
async_session_factory = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

# base model for all domain entities
class Base(DeclarativeBase):
    pass

# dependency for FastAPI routes
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

def _sync_sqlite_columns(sync_conn):
    # patch missing columns on sqlite if tables exist fr
    try:
        cursor = sync_conn.connection.cursor()
        cursor.execute("PRAGMA table_info(evidence_artifacts)")
        existing_cols = [row[1] for row in cursor.fetchall()]
        if existing_cols:
            if "manifest_signature" not in existing_cols:
                cursor.execute("ALTER TABLE evidence_artifacts ADD COLUMN manifest_signature VARCHAR(64)")
            if "trust_anchor_id" not in existing_cols:
                cursor.execute("ALTER TABLE evidence_artifacts ADD COLUMN trust_anchor_id VARCHAR(64)")
        cursor.close()
    except Exception:
        pass

# helper to initialize database schema (tables creation)
async def init_db() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        if "sqlite" in DATABASE_URL:
            await conn.run_sync(_sync_sqlite_columns)
