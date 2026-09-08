"""
Connector and infrastructure integration tests
"""

import os
import sys
import unittest
import asyncio

# ensure backend path is resolved fr
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi.testclient import TestClient
from server import app
from connectors import get_connector, GitHubConnector, MockGitHubConnector
from connectors.base import DiscoveredAssetDTO

client = TestClient(app)

class TestConnectors(unittest.TestCase):
    def test_factory_returns_mock_connector_when_forced(self):
        # factory test for mock mode
        conn = get_connector(
            integration_type="GITHUB",
            credentials={"is_mock": True},
            force_mock=True
        )
        self.assertIsInstance(conn, MockGitHubConnector)

    def test_factory_returns_mock_when_no_token(self):
        # empty creds defaults to mock safe mode
        conn = get_connector(
            integration_type="GITHUB",
            credentials={}
        )
        self.assertIsInstance(conn, MockGitHubConnector)

    def test_factory_returns_live_github_connector(self):
        # valid token gives live connector
        conn = get_connector(
            integration_type="GITHUB",
            credentials={"token": "ghp_mocktoken1234567890abcdef"}
        )
        self.assertIsInstance(conn, GitHubConnector)

    def test_mock_github_connection_test(self):
        # test connection check on mock connector
        conn = MockGitHubConnector(credentials={})
        result = asyncio.run(conn.test_connection())
        self.assertTrue(result.success)
        self.assertIn("login", result.identity)
        self.assertEqual(result.identity["login"], "acme-security-bot")
        self.assertIn("remaining", result.rate_limit)

    def test_mock_github_asset_discovery(self):
        # discover assets from mock github
        conn = MockGitHubConnector(credentials={})
        assets = asyncio.run(conn.discover_assets())
        self.assertGreaterEqual(len(assets), 3)
        repo_names = [a.name for a in assets]
        self.assertIn("payment-service", repo_names)
        self.assertIn("grc-engine", repo_names)

    def test_mock_github_control_evaluation(self):
        # evaluate branch protection and security controls on mock repo
        conn = MockGitHubConnector(credentials={})
        assets = asyncio.run(conn.discover_assets())
        target_asset = next(a for a in assets if a.name == "payment-service")
        controls = asyncio.run(conn.collect_control_state(target_asset))
        self.assertGreaterEqual(len(controls), 4)
        codes = [c.control_code for c in controls]
        self.assertIn("CTL-GH-01", codes)
        self.assertIn("CTL-GH-02", codes)
        self.assertIn("CTL-GH-03", codes)

    def test_api_test_github_connection_endpoint(self):
        # hit api endpoint to test connector
        payload = {
            "integration_type": "GITHUB",
            "credentials": {},
            "is_mock": True
        }
        resp = client.post("/api/v1/integrations/github/test", json=payload)
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["identity"]["login"], "acme-security-bot")

if __name__ == "__main__":
    unittest.main()
