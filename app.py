"""
Privacy-First GRC Audit Agent CLI Interface
Allows command-line auditing of PDF policies with local deterministic evaluation.
"""

import json
import os
from pypdf import PdfReader
from audit_engine import audit_policy
from report_generator import generate_html_report

def main() -> None:
    print("=====================================================")
    print("GRC AUDIT TOOL (CLI)")
    print("=====================================================")
    
    pdf_path = input("\nEnter PDF policy file path (e.g. policy.pdf): ").strip()
    if not pdf_path or not os.path.exists(pdf_path):
        print(f"Error: File not found at path '{pdf_path}'")
        return
        
    print("\nReading PDF document...")
    reader = PdfReader(pdf_path)
    policy_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            policy_text += text + "\n"
            
    print(f"Loaded {len(reader.pages)} pages ({len(policy_text)} characters).")
    
    print("\nExecuting GRC compliance audit...")
    audit_result = audit_policy(policy_text)
    
    os.makedirs("reports", exist_ok=True)
    json_path = "reports/audit_report.json"
    html_path = "reports/audit_report.html"
    
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(audit_result, f, indent=4)
    print(f"Audit JSON data saved to: {json_path}")
    
    generate_html_report(audit_result, output_path=html_path)
    print(f"HTML report generated at: {html_path}")
    
    print("\n=== AUDIT EXECUTIVE SUMMARY ===")
    print(f"Compliance Status : {audit_result['compliant_status']}")
    print(f"Compliance Ratio  : {audit_result['compliance_percent']}%")
    print(f"Risk Score / Level: {audit_result['risk_score']} / 100 ({audit_result['risk_level']})")
    print(f"Passed Controls   : {audit_result['passed_controls_count']} / {audit_result['total_controls']}")
    print(f"Identified Gaps   : {audit_result['gaps_count']}")
    print("=====================================================\n")

if __name__ == "__main__":
    main()
