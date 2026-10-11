"""
Tests for Multi-Tenant Isolation (BOLA/IDOR prevention) & Background Scans
"""

import os
import sys
import time
import unittest
import asyncio

BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi.testclient import TestClient
from server import app
from database import async_session_factory
from models.finding import Finding
from models.control import CanonicalControl

client = TestClient(app)


class TestTenantIsolationAndScans(unittest.TestCase):
    def setUp(self):
        self.ts = int(time.time() * 1000)
        
        # register tenant A
        res_a = client.post("/api/v1/auth/register", json={
            "email": f"tenant_a_{self.ts}@alpha.test",
            "password": "PasswordAlpha123!",
            "full_name": "Alpha Admin",
            "organization_name": f"Alpha Corp {self.ts}"
        })
        self.assertEqual(res_a.status_code, 200)
        data_a = res_a.json()
        self.token_a = data_a["access_token"]
        self.org_a_id = data_a["user"]["organization_id"]
        self.headers_a = {"Authorization": f"Bearer {self.token_a}"}

        # register tenant B
        res_b = client.post("/api/v1/auth/register", json={
            "email": f"tenant_b_{self.ts}@beta.test",
            "password": "PasswordBeta123!",
            "full_name": "Beta Admin",
            "organization_name": f"Beta Corp {self.ts}"
        })
        self.assertEqual(res_b.status_code, 200)
        data_b = res_b.json()
        self.token_b = data_b["access_token"]
        self.org_b_id = data_b["user"]["organization_id"]
        self.headers_b = {"Authorization": f"Bearer {self.token_b}"}

    def test_tenant_findings_isolation_and_bola_prevention(self):
        # insert a finding owned specifically by tenant A
        async def insert_finding_for_a():
            async with async_session_factory() as session:
                from sqlalchemy import select
                ctrl_res = await session.execute(select(CanonicalControl).limit(1))
                ctrl = ctrl_res.scalars().first()
                ctrl_id = ctrl.id if ctrl else "dummy-ctrl-id"

                finding = Finding(
                    organization_id=self.org_a_id,
                    scan_id=None,
                    asset_id="asset-dummy-a",
                    canonical_control_id=ctrl_id,
                    finding_code=f"FIND-A-{self.ts}",
                    title="Confidential Finding for Alpha Corp",
                    description="Secret unencrypted S3 bucket in Alpha",
                    severity="CRITICAL",
                    status="OPEN",
                    remediation_action="Enable SSE-KMS",
                )
                session.add(finding)
                await session.commit()
                await session.refresh(finding)
                return finding.id

        finding_id = asyncio.run(insert_finding_for_a())

        # 1. Tenant A should see their own finding
        res_list_a = client.get("/api/v1/findings", headers=self.headers_a)
        self.assertEqual(res_list_a.status_code, 200)
        findings_a = res_list_a.json()
        self.assertTrue(any(f["id"] == finding_id for f in findings_a))

        # 2. Tenant B MUST NOT see Tenant A's finding (multi-tenant leak blocked)
        res_list_b = client.get("/api/v1/findings", headers=self.headers_b)
        self.assertEqual(res_list_b.status_code, 200)
        findings_b = res_list_b.json()
        self.assertFalse(any(f["id"] == finding_id for f in findings_b))

        # 3. Tenant B attempts to resolve Tenant A's finding -> 403 Forbidden (BOLA/IDOR blocked)
        res_resolve_b = client.post(f"/api/v1/findings/{finding_id}/resolve", headers=self.headers_b)
        self.assertEqual(res_resolve_b.status_code, 403)
        self.assertIn("Not authorized to modify findings for another organization", res_resolve_b.json()["detail"])

        # 4. Tenant A resolves their own finding -> 200 OK
        res_resolve_a = client.post(f"/api/v1/findings/{finding_id}/resolve", headers=self.headers_a)
        self.assertEqual(res_resolve_a.status_code, 200)
        self.assertEqual(res_resolve_a.json()["status"], "RESOLVED")

    def test_tenant_scan_isolation_and_background_execution(self):
        # Tenant A triggers a scan job
        res_trigger_a = client.post(
            "/api/v1/scans/trigger",
            json={"target_scope": "REPOSITORIES"},
            headers=self.headers_a
        )
        self.assertEqual(res_trigger_a.status_code, 200)
        scan_data_a = res_trigger_a.json()
        scan_id_a = scan_data_a["id"]
        self.assertEqual(scan_data_a["organization_id"], self.org_a_id)
        self.assertIn(scan_data_a["status"], ["PENDING", "RUNNING", "COMPLETED"])

        # Tenant A can fetch their scan status
        res_get_a = client.get(f"/api/v1/scans/{scan_id_a}", headers=self.headers_a)
        self.assertEqual(res_get_a.status_code, 200)
        self.assertEqual(res_get_a.json()["id"], scan_id_a)

        # Tenant B CANNOT fetch Tenant A's scan (returns 404)
        res_get_b = client.get(f"/api/v1/scans/{scan_id_a}", headers=self.headers_b)
        self.assertEqual(res_get_b.status_code, 404)

        # Tenant B scan history does NOT include Tenant A's scan
        res_scans_b = client.get("/api/v1/scans", headers=self.headers_b)
        self.assertEqual(res_scans_b.status_code, 200)
        scans_b = res_scans_b.json()
        self.assertFalse(any(s["id"] == scan_id_a for s in scans_b))


if __name__ == "__main__":
    unittest.main()
