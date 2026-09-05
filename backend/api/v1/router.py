"""
API v1 Router Registration
Aggregates all modular endpoint routers under /api/v1 prefix.
"""

from fastapi import APIRouter
from api.v1.endpoints import auth, integrations, assets, controls, findings, evidence, scans, reports

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(integrations.router, prefix="/integrations", tags=["Integrations"])
api_router.include_router(assets.router, prefix="/assets", tags=["Discovered Assets"])
api_router.include_router(controls.router, prefix="/controls", tags=["Compliance Controls"])
api_router.include_router(findings.router, prefix="/findings", tags=["Findings & Gaps"])
api_router.include_router(evidence.router, prefix="/evidence", tags=["Evidence Vault"])
api_router.include_router(scans.router, prefix="/scans", tags=["Continuous Scans"])
api_router.include_router(reports.router, prefix="/reports", tags=["Attestation Reports"])
