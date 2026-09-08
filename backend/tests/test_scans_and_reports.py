"""
Continuous scans, findings, and attestation reports tests
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

client = TestClient(app)

class TestScansAndReports(unittest.TestCase):
    def test_trigger_and_list_scans(self):
        # trigger a scan
        payload = {
            "target_scope": "REPOSITORIES"
        }
        resp = client.post("/api/v1/scans/trigger", json=payload)
        self.assertEqual(resp.status_code, 200)
        scan = resp.json()
        self.assertIn("id", scan)
        self.assertEqual(scan["target_scope"], "REPOSITORIES")
        self.assertEqual(scan["status"], "PENDING")

        # list scans
        list_resp = client.get("/api/v1/scans")
        self.assertEqual(list_resp.status_code, 200)
        scans = list_resp.json()
        self.assertIsInstance(scans, list)
        self.assertGreater(len(scans), 0)

    def test_list_findings(self):
        # check findings endpoint
        resp = client.get("/api/v1/findings")
        self.assertEqual(resp.status_code, 200)
        self.assertIsInstance(resp.json(), list)

    def test_report_summary_metrics(self):
        # check executive summary calculation
        resp = client.get("/api/v1/reports/summary")
        self.assertEqual(resp.status_code, 200)
        summary = resp.json()
        self.assertIn("compliance_score", summary)
        self.assertIn("total_assets", summary)
        self.assertIn("open_findings_count", summary)
        self.assertIn("frameworks_evaluated", summary)
        self.assertIsInstance(summary["frameworks_evaluated"], list)

    def test_export_report_simulation(self):
        # export simulated html report
        payload = {
            "compliant_status": "COMPLIANT",
            "risk_score": 10,
            "risk_level": "LOW",
            "compliance_percent": 90,
            "total_controls": 19,
            "passed_controls_count": 17,
            "gaps_count": 2,
            "summary": "Executive compliance audit passed successfully.",
            "implemented_controls": ["Encryption & Cryptography", "Multi-Factor Authentication (MFA)"],
            "evidence_map": {"Encryption & Cryptography": "AES-256 enabled on all databases."},
            "gaps_found": [
                {
                    "control": "Data Retention & Disposal",
                    "severity_points": 5,
                    "framework_clauses": ["ISO 27001 A.8.10", "GDPR Art 17"],
                    "issue": "No automated purging policy for deleted user tables."
                }
            ],
            "remediation_steps": [
                {
                    "control": "Data Retention & Disposal",
                    "priority": "P2",
                    "action": "Configure AWS S3 lifecycle expiration rules.",
                    "framework_reference": "ISO 27001 A.8.10"
                }
            ],
            "framework_summary": [
                {
                    "framework": "SOC 2 Type II",
                    "coverage_percent": 95,
                    "matched_controls": 18,
                    "total_controls": 19,
                    "status": "COMPLIANT"
                }
            ]
        }
        resp = client.post("/api/export-report", json=payload)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.headers["content-type"], "text/html; charset=utf-8")
        self.assertIn("<!DOCTYPE html>", resp.text)
        self.assertIn("Enterprise GRC Audit Report", resp.text)

if __name__ == "__main__":
    unittest.main()
