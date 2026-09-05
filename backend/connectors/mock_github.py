"""
Mock GitHub Connector
Provides deterministic offline infrastructure discovery and control collection
for demos, tests, and air-gapped environments without requiring a real GitHub PAT.
"""

from datetime import datetime, timezone
from typing import Dict, Any, List, Optional

from connectors.base import (
    BaseConnector,
    ConnectionTestResult,
    DiscoveredAssetDTO,
    RawControlStateDTO,
)


class MockGitHubConnector(BaseConnector):
    """
    Simulated GitHub Connector returning realistic repositories, branch protection rules,
    and security configurations for offline demo and verification.
    """

    MOCK_REPOSITORIES = [
        {
            "name": "grc-engine",
            "full_name": "acme-corp/grc-engine",
            "default_branch": "main",
            "criticality": "TIER_1",
            "branch_protection": {
                "protected": True,
                "enforce_admins": True,
                "required_pull_request_reviews": {
                    "required_approving_review_count": 2,
                    "dismiss_stale_reviews": True,
                    "require_code_owner_reviews": True,
                },
                "secret_scanning": "enabled",
                "push_protection": "enabled",
                "dependabot": True,
            },
        },
        {
            "name": "payment-service",
            "full_name": "acme-corp/payment-service",
            "default_branch": "main",
            "criticality": "TIER_1",
            "branch_protection": {
                "protected": True,
                "enforce_admins": False,
                "required_pull_request_reviews": {
                    "required_approving_review_count": 1,  # GAP: Requires >= 2 for SOC 2 CC8.1
                    "dismiss_stale_reviews": False,
                    "require_code_owner_reviews": False,
                },
                "secret_scanning": "enabled",
                "push_protection": "disabled",  # GAP
                "dependabot": True,
            },
        },
        {
            "name": "legacy-auth-api",
            "full_name": "acme-corp/legacy-auth-api",
            "default_branch": "master",
            "criticality": "TIER_2",
            "branch_protection": {
                "protected": False,  # CRITICAL GAP: No branch protection
                "secret_scanning": "disabled",
                "push_protection": "disabled",
                "dependabot": False,
            },
        },
    ]

    async def test_connection(self) -> ConnectionTestResult:
        return ConnectionTestResult(
            success=True,
            message="Successfully connected to Mock GitHub Provider (ACME Corp Sandbox).",
            identity={
                "login": "acme-security-bot",
                "name": "ACME Security Automation Bot",
                "id": 992014,
                "html_url": "https://github.com/acme-corp",
                "scopes": ["repo", "read:org", "security_events"],
            },
            rate_limit={
                "limit": "5000",
                "remaining": "4995",
                "reset": "1725540000",
            },
        )

    async def discover_assets(self) -> List[DiscoveredAssetDTO]:
        assets: List[DiscoveredAssetDTO] = []
        for repo in self.MOCK_REPOSITORIES:
            assets.append(
                DiscoveredAssetDTO(
                    asset_type="GITHUB_REPO",
                    name=repo["name"],
                    identifier=repo["full_name"],
                    criticality=repo["criticality"],
                    is_monitored=True,
                    raw_metadata={
                        "owner": repo["full_name"].split("/")[0],
                        "full_name": repo["full_name"],
                        "default_branch": repo["default_branch"],
                        "private": True,
                        "archived": False,
                        "fork": False,
                        "html_url": f"https://github.com/{repo['full_name']}",
                        "is_mock": True,
                    },
                )
            )
        return assets

    async def collect_control_state(self, asset: DiscoveredAssetDTO) -> List[RawControlStateDTO]:
        repo_data = next((r for r in self.MOCK_REPOSITORIES if r["full_name"] == asset.identifier), None)
        if not repo_data:
            return []

        bp = repo_data.get("branch_protection", {})
        collected_at = datetime.now(timezone.utc).isoformat()
        states: List[RawControlStateDTO] = []

        # 1. Branch protection state
        states.append(
            RawControlStateDTO(
                asset_identifier=asset.identifier,
                control_code="CTL-GH-01",
                evidence_uri=f"https://api.github.com/repos/{asset.identifier}/branches/{asset.raw_metadata.get('default_branch')}/protection",
                raw_payload={
                    "protected": bp.get("protected", False),
                    "enforce_admins": bp.get("enforce_admins", False),
                    "is_mock": True,
                },
                collected_at=collected_at,
            )
        )

        # 2. Approving reviews state
        reviews = bp.get("required_pull_request_reviews", {})
        states.append(
            RawControlStateDTO(
                asset_identifier=asset.identifier,
                control_code="CTL-GH-02",
                evidence_uri=f"https://api.github.com/repos/{asset.identifier}/branches/{asset.raw_metadata.get('default_branch')}/protection#reviews",
                raw_payload={
                    "required_approving_review_count": reviews.get("required_approving_review_count", 0),
                    "dismiss_stale_reviews": reviews.get("dismiss_stale_reviews", False),
                    "require_code_owner_reviews": reviews.get("require_code_owner_reviews", False),
                    "is_mock": True,
                },
                collected_at=collected_at,
            )
        )

        # 3. Secret scanning state
        states.append(
            RawControlStateDTO(
                asset_identifier=asset.identifier,
                control_code="CTL-GH-03",
                evidence_uri=f"https://api.github.com/repos/{asset.identifier}#security",
                raw_payload={
                    "secret_scanning_status": bp.get("secret_scanning", "disabled"),
                    "push_protection_status": bp.get("push_protection", "disabled"),
                    "is_active": (bp.get("secret_scanning") == "enabled"),
                    "is_mock": True,
                },
                collected_at=collected_at,
            )
        )

        # 4. Dependabot state
        states.append(
            RawControlStateDTO(
                asset_identifier=asset.identifier,
                control_code="CTL-GH-04",
                evidence_uri=f"https://api.github.com/repos/{asset.identifier}/vulnerability-alerts",
                raw_payload={
                    "vulnerability_alerts_enabled": bp.get("dependabot", False),
                    "is_mock": True,
                },
                collected_at=collected_at,
            )
        )

        return states
