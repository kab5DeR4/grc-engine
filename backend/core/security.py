"""
Security utilities for password hashing, token creation and verification.
Uses modern direct bcrypt with fallback compatibility.
"""

import hashlib
from datetime import datetime, timedelta, timezone
from typing import Any, Union, Optional
import bcrypt
from jose import jwt
from core.config import settings


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify raw password against bcrypt hash or sha256 seed hash."""
    if not hashed_password or not plain_password:
        return False
    
    # check if stored as bcrypt hash
    if hashed_password.startswith("$2a$") or hashed_password.startswith("$2b$") or hashed_password.startswith("$2y$"):
        try:
            return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
        except Exception:
            return False
            
    # fallback check for sha256 seed strings
    sha_hash = hashlib.sha256(plain_password.encode("utf-8")).hexdigest()
    return sha_hash == hashed_password


def get_password_hash(password: str) -> str:
    """Generate modern bcrypt password hash."""
    # bcrypt max length is 72 bytes fr
    pw_bytes = password.encode("utf-8")[:72]
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(pw_bytes, salt).decode("utf-8")


def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Create signed JWT access token."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> Optional[dict]:
    """Decode and validate a JWT access token."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except Exception:
        return None


def mask_sensitive_token(token: str) -> str:
    """Mask tokens/secrets so only prefix and last 4 chars are visible."""
    if not token or len(token) <= 8:
        return "********"
    if token.startswith("ghp_") or token.startswith("github_pat_"):
        prefix_len = 4 if token.startswith("ghp_") else 11
        return f"{token[:prefix_len]}****{token[-4:]}"
    return f"{token[:3]}****{token[-4:]}"


def sanitize_input_string(value: str, max_length: int = 500) -> str:
    """Strip whitespace and truncate to max length to prevent buffer/string abuse."""
    if not isinstance(value, str):
        return ""
    # strip dangerous control characters
    cleaned = "".join(ch for ch in value if ch.isprintable() or ch in "\n\r\t")
    return cleaned.strip()[:max_length]

