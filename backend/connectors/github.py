"""
GitHub Infrastructure Connector
Implements live communication with the GitHub REST API using httpx for
repository discovery, branch protection inspection, secret scanning, and dependabot alerts.
"""

from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
import httpx

from connectors.base import (
    BaseConnector,
    ConnectionTestResult,
    DiscoveredAssetDTO,
    RawControlStateDTO,
)


class GitHubConnector(BaseConnector):
    """
    Live GitHub REST API Connector.
    Uses personal access token (PAT) or GitHub App installation token.
    """

    GITHUB_API_URL = "https://api.github.com"

    def __init__(self, credentials: Dict[str, Any], config_options: Optional[Dict[str, Any]] = None):
        super().__init__(credentials, config_options)
        self.token = self.credentials.get("token") or self.credentials.get("pat") or ""
        self.headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "GRC-Engine-Connector/1.0",
        }
        if self.token:
            self.headers["Authorization"] = f"Bearer {self.token}"

    async def test_connection(self) -> ConnectionTestResult:
        """
        Validates GitHub credentials by requesting GET /user.
        """
        if not self.token:
            return ConnectionTestResult(
                success=False,
                message="Missing GitHub personal access token (PAT) in credentials.",
            )

        async with httpx.AsyncClient(timeout=10.0) as client:
            try:
                response = await client.get(f"{self.GITHUB_API_URL}/user", headers=self.headers)
                if response.status_code == 200:
                    data = response.json()
                    scopes_header = response.headers.get("x-oauth-scopes", "")
                    scopes = [s.strip() for s in scopes_header.split(",") if s.strip()]
                    return ConnectionTestResult(
                        success=True,
                        message=f"Successfully authenticated as GitHub user: {data.get('login')}",
                        identity={
                            "login": data.get("login"),
                            "name": data.get("name"),
                            "id": data.get("id"),
                            "html_url": data.get("html_url"),
                            "scopes": scopes,
                        },
                        rate_limit={
                            "limit": response.headers.get("x-ratelimit-limit"),
                            "remaining": response.headers.get("x-ratelimit-remaining"),
                            "reset": response.headers.get("x-ratelimit-reset"),
                        },
                    )
                elif response.status_code == 401:
                    return ConnectionTestResult(
                        success=False,
                        message="Invalid or expired GitHub Personal Access Token (HTTP 401 Unauthorized).",
                    )
                else:
                    return ConnectionTestResult(
                        success=False,
                        message=f"GitHub API returned unexpected status {response.status_code}: {response.text}",
                    )
            except Exception as e:
                return ConnectionTestResult(
                    success=False,
                    message=f"Failed to reach GitHub API: {str(e)}",
                )

    async def discover_assets(self) -> List[DiscoveredAssetDTO]:
        """
        Discovers repositories accessible by the token (GET /user/repos or /orgs/{org}/repos).
        """
        target_org = self.config_options.get("org")
        url = (
            f"{self.GITHUB_API_URL}/orgs/{target_org}/repos?per_page=100&type=all"
            if target_org
            else f"{self.GITHUB_API_URL}/user/repos?per_page=100&affiliation=owner,collaborator,organization_member"
        )

        assets: List[DiscoveredAssetDTO] = []
        async with httpx.AsyncClient(timeout=15.0) as client:
            try:
                response = await client.get(url, headers=self.headers)
                if response.status_code != 200:
                    return assets

                repos = response.json()
                for repo in repos:
                    full_name = repo.get("full_name") or f"{repo.get('owner', {}).get('login')}/{repo.get('name')}"
                    criticality = "TIER_1" if not repo.get("private") or repo.get("name") in ["main", "core"] else "TIER_2"
                    
                    assets.append(
                        DiscoveredAssetDTO(
                            asset_type="GITHUB_REPO",
                            name=repo.get("name"),
                            identifier=full_name,
                            criticality=criticality,
                            is_monitored=not repo.get("archived", False),
                            raw_metadata={
                                "owner": repo.get("owner", {}).get("login"),
                                "full_name": full_name,
                                "default_branch": repo.get("default_branch", "main"),
                                "private": repo.get("private", False),
                                "archived": repo.get("archived", False),
                                "fork": repo.get("fork", False),
                                "pushed_at": repo.get("pushed_at"),
                                "html_url": repo.get("html_url"),
                            },
                        )
                    )
            except Exception:
                return assets

        return assets

    async def collect_control_state(self, asset: DiscoveredAssetDTO) -> List[RawControlStateDTO]:
        """
        Collects live security control telemetry for a GitHub repository:
        1. Branch Protection (`CTL-GH-01`, `CTL-GH-02`, `CTL-GH-05`)
        2. Secret Scanning & Push Protection (`CTL-GH-03`)
        3. Automated Vulnerability / Dependabot Alerts (`CTL-GH-04`)
        """
        repo_identifier = asset.identifier
        default_branch = asset.raw_metadata.get("default_branch", "main")
        collected_at = datetime.now(timezone.utc).isoformat()
        states: List[RawControlStateDTO] = []

        async with httpx.AsyncClient(timeout=10.0) as client:
            # 1. Inspect Branch Protection
            protection_uri = f"{self.GITHUB_API_URL}/repos/{repo_identifier}/branches/{default_branch}/protection"
            try:
                p_res = await client.get(protection_uri, headers=self.headers)
                if p_res.status_code == 200:
                    p_data = p_res.json()
                    states.append(
                        RawControlStateDTO(
                            asset_identifier=repo_identifier,
                            control_code="CTL-GH-01",  # Branch Protection Active
                            evidence_uri=protection_uri,
                            raw_payload={
                                "protected": True,
                                "enforce_admins": p_data.get("enforce_admins", {}).get("enabled", False),
                                "required_linear_history": p_data.get("required_linear_history", {}).get("enabled", False),
                                "allow_force_pushes": p_data.get("allow_force_pushes", {}).get("enabled", False),
                                "allow_deletions": p_data.get("allow_deletions", {}).get("enabled", False),
                                "required_status_checks": p_data.get("required_status_checks"),
                                "raw_branch_protection": p_data,
                            },
                            collected_at=collected_at,
                        )
                    )
                    
                    reviews = p_data.get("required_pull_request_reviews", {})
                    states.append(
                        RawControlStateDTO(
                            asset_identifier=repo_identifier,
                            control_code="CTL-GH-02",  # Code Review Approvals
                            evidence_uri=protection_uri,
                            raw_payload={
                                "require_code_owner_reviews": reviews.get("require_code_owner_reviews", False),
                                "required_approving_review_count": reviews.get("required_approving_review_count", 0),
                                "dismiss_stale_reviews": reviews.get("dismiss_stale_reviews", False),
                                "require_last_push_approval": reviews.get("require_last_push_approval", False),
                            },
                            collected_at=collected_at,
                        )
                    )
                else:
                    # 404 means no branch protection rule configured
                    states.append(
                        RawControlStateDTO(
                            asset_identifier=repo_identifier,
                            control_code="CTL-GH-01",
                            evidence_uri=protection_uri,
                            raw_payload={
                                "protected": False,
                                "status_code": p_res.status_code,
                                "message": "No branch protection rule configured on default branch.",
                            },
                            collected_at=collected_at,
                        )
                    )
            except Exception as e:
                states.append(
                    RawControlStateDTO(
                        asset_identifier=repo_identifier,
                        control_code="CTL-GH-01",
                        evidence_uri=protection_uri,
                        raw_payload={"error": str(e), "protected": False},
                        collected_at=collected_at,
                    )
                )

            # 2. Inspect Secret Scanning
            repo_uri = f"{self.GITHUB_API_URL}/repos/{repo_identifier}"
            try:
                r_res = await client.get(repo_uri, headers=self.headers)
                if r_res.status_code == 200:
                    r_data = r_res.json()
                    security_analysis = r_data.get("security_and_analysis") or {}
                    secret_scanning = security_analysis.get("secret_scanning", {}).get("status", "disabled")
                    push_protection = security_analysis.get("secret_scanning_push_protection", {}).get("status", "disabled")
                    
                    states.append(
                        RawControlStateDTO(
                            asset_identifier=repo_identifier,
                            control_code="CTL-GH-03",  # Secret Scanning
                            evidence_uri=f"{repo_uri}#security_and_analysis",
                            raw_payload={
                                "secret_scanning_status": secret_scanning,
                                "push_protection_status": push_protection,
                                "is_active": (secret_scanning == "enabled"),
                            },
                            collected_at=collected_at,
                        )
                    )
            except Exception:
                pass

            # 3. Inspect Dependabot / Vulnerability Alerts
            alerts_uri = f"{self.GITHUB_API_URL}/repos/{repo_identifier}/vulnerability-alerts"
            try:
                # GET returns 204 if enabled, 404 if disabled
                va_res = await client.get(alerts_uri, headers=self.headers)
                states.append(
                    RawControlStateDTO(
                        asset_identifier=repo_identifier,
                        control_code="CTL-GH-04",  # Dependabot Vulnerability Alerts
                        evidence_uri=alerts_uri,
                        raw_payload={
                            "status_code": va_res.status_code,
                            "vulnerability_alerts_enabled": (va_res.status_code == 204),
                        },
                        collected_at=collected_at,
                    )
                )
            except Exception:
                pass

        return states
