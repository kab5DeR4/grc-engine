"""
Connectors Package Initialization & Factory
Provides unified instantiation of live or mock connectors based on provider type and mode.
"""

from typing import Dict, Any, Optional
from connectors.base import BaseConnector
from connectors.github import GitHubConnector
from connectors.mock_github import MockGitHubConnector


def get_connector(
    integration_type: str,
    credentials: Dict[str, Any],
    config_options: Optional[Dict[str, Any]] = None,
    force_mock: bool = False,
) -> BaseConnector:
    """
    Factory function returning the appropriate connector instance.
    """
    integration_type = integration_type.upper()
    is_mock = force_mock or credentials.get("is_mock", False) or not (credentials.get("token") or credentials.get("pat"))

    if integration_type in ["GITHUB", "GITHUB_REPO"]:
        if is_mock:
            return MockGitHubConnector(credentials, config_options)
        return GitHubConnector(credentials, config_options)

    raise ValueError(f"Unsupported integration connector type: {integration_type}")


__all__ = [
    "BaseConnector",
    "GitHubConnector",
    "MockGitHubConnector",
    "get_connector",
]
