"""
Audit engine and report generator tests
"""

import os
import sys
import unittest

# ensure backend path is resolved fr
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from audit_engine import audit_policy, check_negative_context, CONTROLS_MATRIX
from report_generator import generate_html_report

class TestAuditEngine(unittest.TestCase):
    def test_controls_matrix_loaded(self):
        # make sure matrix has key compliance controls
        self.assertGreaterEqual(len(CONTROLS_MATRIX), 15)
        self.assertIn("Encryption & Cryptography", CONTROLS_MATRIX)
        self.assertIn("Multi-Factor Authentication (MFA)", CONTROLS_MATRIX)
        self.assertIn("Principle of Least Privilege", CONTROLS_MATRIX)

    def test_negative_context_detection(self):
        # test if negation words flag bad vibes properly
        text = "The company does not use multi-factor authentication for employees."
        pos = text.find("multi-factor")
        is_neg = check_negative_context(text, pos)
        self.assertTrue(is_neg)

        positive_text = "The company strictly enforces multi-factor authentication for all staff."
        pos2 = positive_text.find("multi-factor")
        is_neg2 = check_negative_context(positive_text, pos2)
        self.assertFalse(is_neg2)

    def test_compliant_policy_audit(self):
        # test a solid policy with strong controls
        policy = """
        Acme Corp Security Policy.
        We implement AES-256 encryption for data-at-rest and TLS for data-in-transit.
        Strict multi-factor authentication (MFA) is required for all systems.
        We follow role-based access control (RBAC) and the principle of least privilege.
        Password policy mandates minimum 16 characters and quarterly credential rotation.
        Security logging & audit trails are centralized into SIEM with 1 year log retention.
        Continuous security monitoring runs 24/7 via our SOC team.
        Data backup & recovery procedures are tested monthly with offsite backup replication.
        Incident response plan and CSIRT handle breach notification within 24 hours.
        Vulnerability management runs automated weekly CVE scanning and patch management.
        Asset inventory is maintained in real-time for all hardware and software.
        Cloud security adheres to AWS shared responsibility standards.
        Data classification labels confidential data and PII.
        Data retention schedules enforce secure disposal and media destruction.
        Business continuity and disaster recovery plans are verified annually.
        Vendor risk management audits third-party SLAs and security posture.
        Threat intelligence feeds inform continuous risk assessments.
        Security awareness training and phishing simulations are conducted quarterly.
        Network security uses next-gen firewall, segmentation, and zero trust VPN.
        """
        result = audit_policy(policy)
        self.assertEqual(result["compliant_status"], "Compliant")
        self.assertGreaterEqual(result["compliance_percent"], 90)
        self.assertLessEqual(result["risk_score"], 15)
        self.assertGreaterEqual(result["passed_controls_count"], 15)
        self.assertIn("framework_summary", result)

    def test_empty_or_poor_policy_audit(self):
        # test policy that has huge gaps
        policy = "We just have a simple website with no special rules."
        result = audit_policy(policy)
        self.assertEqual(result["compliant_status"], "Critical Non-Compliance")
        self.assertLess(result["compliance_percent"], 40)
        self.assertGreater(result["gaps_count"], 10)
        self.assertGreater(len(result["remediation_steps"]), 5)

    def test_html_report_generation(self):
        # test html generation without crash
        policy = "All databases use AES-256 encryption and MFA is enforced."
        result = audit_policy(policy)
        output_path = "reports/test_report.html"
        os.makedirs("reports", exist_ok=True)
        ret_path = generate_html_report(result, output_path=output_path)
        self.assertTrue(os.path.exists(output_path))
        with open(output_path, "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn("<!DOCTYPE html>", content)
        self.assertIn("Enterprise GRC Audit Report", content)

if __name__ == "__main__":
    unittest.main()
