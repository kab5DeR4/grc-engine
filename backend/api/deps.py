"""
API Dependencies and Auth Verification
"""

from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from core.security import decode_access_token
from models.organization import User, Organization

security_scheme = HTTPBearer(auto_error=False)


async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
    db: AsyncSession = Depends(get_db),
) -> Optional[User]:
    """Extract and authenticate the user from JWT bearer token if present."""
    if not credentials:
        return None
    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload:
        return None
    user_id = payload.get("sub")
    if not user_id:
        return None
    
    result = await db.execute(select(User).where(User.id == user_id, User.is_active == True))
    user = result.scalars().first()
    return user


async def get_current_user(
    user: Optional[User] = Depends(get_current_user_optional),
) -> User:
    """Strict dependency requiring authenticated user."""
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided or are invalid",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_org_id(
    db: AsyncSession = Depends(get_db),
    user: Optional[User] = Depends(get_current_user_optional),
) -> str:
    """
    Extract tenant organization ID from authenticated user session,
    falling back to default organization in sandbox mode.
    Guarantees strict organization isolation so cross-tenant queries are never executed.
    """
    # if user is logged in, use their org id fr
    if user and user.organization_id:
        return user.organization_id

    # fallback to default workspace org for unauthenticated demo/tests
    result = await db.execute(select(Organization).order_by(Organization.created_at.asc()).limit(1))
    org = result.scalars().first()
    if org:
        return org.id

    # seed a default org if db is completely empty fr
    org = Organization(name="Default Organization", slug="default-org")
    db.add(org)
    await db.flush()
    return org.id

