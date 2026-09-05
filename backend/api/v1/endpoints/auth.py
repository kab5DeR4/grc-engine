"""
Authentication & User Management Endpoints
"""

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from core.security import verify_password, get_password_hash, create_access_token
from models.organization import User, Organization
from api.deps import get_current_user

router = APIRouter()


class LoginPayload(BaseModel):
    email: str
    password: str


class RegisterPayload(BaseModel):
    email: str
    password: str
    full_name: str
    organization_name: str


class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    organization_id: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


@router.post("/register", response_model=TokenResponse)
async def register_user(payload: RegisterPayload, db: AsyncSession = Depends(get_db)):
    """Register initial admin user and organization."""
    # Check if user email already exists
    existing = await db.execute(select(User).where(User.email == payload.email))
    if existing.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    # Create organization
    slug = payload.organization_name.lower().replace(" ", "-")
    org = Organization(name=payload.organization_name, slug=slug)
    db.add(org)
    await db.flush()

    # Create user
    hashed_pwd = get_password_hash(payload.password)
    user = User(
        organization_id=org.id,
        email=payload.email,
        hashed_password=hashed_pwd,
        full_name=payload.full_name,
        role="PLATFORM_ADMIN"
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    access_token = create_access_token(subject=user.id)
    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            organization_id=user.organization_id
        )
    )


@router.post("/login", response_model=TokenResponse)
async def login_user(payload: LoginPayload, db: AsyncSession = Depends(get_db)):
    """Authenticate user with email and password."""
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalars().first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user")

    access_token = create_access_token(subject=user.id)
    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            organization_id=user.organization_id
        )
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(user: User = Depends(get_current_user)):
    """Return currently authenticated user profile."""
    return UserResponse(
        id=user.id,
        email=user.email,
        full_name=user.full_name,
        role=user.role,
        organization_id=user.organization_id
    )
