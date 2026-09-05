"""
Base Infrastructure Connector Interface
Defines the standard contract that all infrastructure connectors (GitHub, AWS, GCP, etc.)
must implement for connection testing, asset discovery, and control state collection.
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
from pydantic import BaseModel


class ConnectionTestResult(BaseModel):
    success: bool
    message: str
    identity: Optional[Dict[str, Any]] = None
    rate_limit: Optional[Dict[str, Any]] = None


class DiscoveredAssetDTO(BaseModel):
    asset_type: str  # e.g., GITHUB_REPO, AWS_S3_BUCKET, AWS_IAM_ROLE
    name: str
    identifier: str  # e.g., owner/repo or arn
    criticality: str = "TIER_2"
    is_monitored: bool = True
    raw_metadata: Dict[str, Any] = {}


class RawControlStateDTO(BaseModel):
    asset_identifier: str
    control_code: str  # target canonical control hint
    evidence_uri: str
    raw_payload: Dict[str, Any]
    collected_at: str


class BaseConnector(ABC):
    """
    Abstract base connector for all technical infrastructure integrations.
    """

    def __init__(self, credentials: Dict[str, Any], config_options: Optional[Dict[str, Any]] = None):
        self.credentials = credentials
        self.config_options = config_options or {}

    @abstractmethod
    async def test_connection(self) -> ConnectionTestResult:
        """
        Verify credentials, reachability, and API scopes.
        """
        pass

    @abstractmethod
    async def discover_assets(self) -> List[DiscoveredAssetDTO]:
        """
        Discover assets under this connector's tenant scope.
        """
        pass

    @abstractmethod
    async def collect_control_state(self, asset: DiscoveredAssetDTO) -> List[RawControlStateDTO]:
        """
        Inspect live technical configurations on the asset and return raw control telemetry.
        """
        pass
