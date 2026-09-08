"""
Health check and basic endpoint tests
"""

import os
import sys
import unittest

# ensure backend path is resolved fr
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi.testclient import TestClient
from server import app

# quick client setup fr
client = TestClient(app)

class TestHealthEndpoints(unittest.TestCase):
    def test_health_check_returns_ok(self):
        # ping health check
        response = client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "ok")
        self.assertEqual(data["service"], "grc-engine-backend")
        self.assertIn("version", data)

    def test_openapi_json_available(self):
        # check swagger openapi schema
        response = client.get("/api/v1/openapi.json")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("paths", data)
        self.assertEqual(data["info"]["title"], "GRC Engine")

    def test_docs_page_available(self):
        # check swagger docs page loads
        response = client.get("/docs")
        self.assertEqual(response.status_code, 200)

if __name__ == "__main__":
    unittest.main()
