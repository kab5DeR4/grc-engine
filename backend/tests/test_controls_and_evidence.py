"""
Controls, frameworks, and cryptographic evidence tests
"""

import os
import sys
import hashlib
import json
import unittest
import asyncio

# ensure backend path is resolved fr
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi.testclient import TestClient
from server import app
from database import async_session_factory
from models.evidence import EvidenceArtifact
from models.organization import Organization
from models.integration import Integration
from models.asset import Asset

client = TestClient(app)

class TestControlsAndEvidence(unittest.TestCase):
    def test_list_frameworks(self):
        # check framework listings
        resp = client.get("/api/v1/controls/frameworks")
        self.assertEqual(resp.status_code, 200)
        frameworks = resp.json()
        self.assertIsInstance(frameworks, list)
        codes = [f["code"] for f in frameworks]
        # Should contain seeded frameworks
        self.assertTrue(any(c in ["SOC2", "ISO27001", "NIST_CSF", "CIS_V8"] for c in codes))

    def test_list_control_definitions(self):
        # check canonical control definitions
        resp = client.get("/api/v1/controls/definitions")
        self.assertEqual(resp.status_code, 200)
        controls = resp.json()
        self.assertIsInstance(controls, list)
        codes = [c["code"] for c in controls]
        self.assertTrue(any(c.startswith("CTL-") for c in codes))

    def test_list_assets_endpoint(self):
        # check asset endpoint
        resp = client.get("/api/v1/assets")
        self.assertEqual(resp.status_code, 200)
        self.assertIsInstance(resp.json(), list)

    def test_evidence_verification_endpoint(self):
        # insert test evidence artifact into db and verify its hash via api
        test_payload = {
            "branch": "main",
            "enforce_admins": True,
            "repository": "payments-service",
            "required_approving_review_count": 2,
            "strict_linear_history": True
        }
        payload_str = json.dumps(test_payload, sort_keys=True)
        expected_hash = hashlib.sha256(payload_str.encode("utf-8")).hexdigest()

        async def insert_and_get_id():
            async with async_session_factory() as session:
                from sqlalchemy import select
                org_res = await session.execute(select(Organization).limit(1))
                org = org_res.scalars().first()
                if not org:
                    org = Organization(name="Test Org", slug="test-org")
                    session.add(org)
                    await session.flush()

                integ_res = await session.execute(select(Integration).limit(1))
                integ = integ_res.scalars().first()
                if not integ:
                    integ = Integration(
                        organization_id=org.id,
                        provider_type="github",
                        name="GitHub Test",
                        category="CI/CD",
                        status="CONNECTED",
                        credentials_encrypted="test-token"
                    )
                    session.add(integ)
                    await session.flush()

                asset_res = await session.execute(select(Asset).limit(1))
                asset = asset_res.scalars().first()
                if not asset:
                    asset = Asset(
                        organization_id=org.id,
                        integration_id=integ.id,
                        asset_type="github_repository",
                        external_id="acme-corp/payments-service",
                        name="payments-service",
                        environment="production"
                    )
                    session.add(asset)
                    await session.flush()

                artifact = EvidenceArtifact(
                    organization_id=org.id,
                    asset_id=asset.id,
                    evidence_code="EVD-TEST-001",
                    title="GitHub Branch Protection Evidence",
                    sha256_hash=expected_hash,
                    source_uri="github://acme-corp/payments-service/branches/main/protection",
                    raw_payload_json=test_payload,
                    status="VERIFIED_IMMUTABLE"
                )
                session.add(artifact)
                await session.commit()
                await session.refresh(artifact)
                return artifact.id

        artifact_id = asyncio.run(insert_and_get_id())

        # hit verify endpoint
        resp = client.get(f"/api/v1/evidence/{artifact_id}/verify")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["id"], artifact_id)
        self.assertEqual(data["recorded_hash"], expected_hash)
        self.assertEqual(data["computed_hash"], expected_hash)
        self.assertTrue(data["is_valid"])

if __name__ == "__main__":
    unittest.main()
