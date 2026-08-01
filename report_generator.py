import json
import os
from datetime import datetime
from typing import Dict, Any

def generate_html_report(report_data: Dict[str, Any], output_path: str = "reports/audit_report.html") -> str:
    """
    Generates an HTML GRC Audit Report from structured audit data.
    """
    report_time = datetime.now().strftime("%d-%b-%Y %H:%M:%S")
    
    risk_level = report_data.get("risk_level", "Low")
    risk_score = report_data.get("risk_score", 0)
    compliance_percent = report_data.get("compliance_percent", max(0, 100 - risk_score))
    compliant_status = report_data.get("compliant_status", "Compliant")
    
    # generate default summary if missing
    default_summary = (
        f"Compliance coverage is {compliance_percent}%. "
        f"The policy is evaluated as {compliant_status} with a risk score of {risk_score} "
        f"(Risk Level: {risk_level})."
    )
    summary_text = report_data.get("summary", default_summary)
    
    # Framework Summary Rows
    framework_rows_html = ""
    for fw in report_data.get("framework_summary", []):
        fw_name = fw.get("framework", "Framework")
        pct = fw.get("coverage_percent", 0)
        status = fw.get("status", "Unknown")
        matched = fw.get("matched_controls", 0)
        total = fw.get("total_controls", 0)
        
        framework_rows_html += f"""
        <tr style="border-bottom: 1px dashed rgba(100, 255, 218, 0.3);">
            <td style="padding: 16px; font-weight: 700; color: #64ffda;">{fw_name}</td>
            <td style="padding: 16px; width: 45%;">
                <div style="border: 1px solid rgba(100, 255, 218, 0.4); height:12px; width:100%; position: relative;">
                    <div style="background:#64ffda; height:100%; width:{pct}%; opacity: 0.8;"></div>
                </div>
            </td>
            <td style="padding: 16px; font-size: 12px;"><strong>[ {pct}% ]</strong> ({matched}/{total} nodes)</td>
            <td style="padding: 16px;"><span style="color:#64ffda; font-size: 11px;">{status}</span></td>
        </tr>
        """

    # Implemented Controls & Evidence
    implemented_controls_html = ""
    evidence_map = report_data.get("evidence_map", {})
    impl_list = report_data.get("implemented_controls", [])
    
    if impl_list:
        for ctrl in impl_list:
            quote = evidence_map.get(ctrl, "Verified in structural policy text.")
            implemented_controls_html += f"""
            <div style="border: 1px solid rgba(100, 255, 218, 0.4); padding: 15px; margin-bottom: 12px; background: rgba(100, 255, 218, 0.05);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
                    <strong style="font-size: 13px; color: #e6f1ff;">[X] {ctrl}</strong>
                    <span style="font-size: 10px; color: #64ffda;">STATUS: VERIFIED</span>
                </div>
                <div style="border-left: 1px dashed #64ffda; padding-left: 10px; font-style: italic; font-size: 12px; color: #8892b0;">
                    "{quote}"
                </div>
            </div>
            """
    else:
        implemented_controls_html = "<p style='color:#ff3366;'>No compliant controls identified.</p>"

    # Compliance Gaps
    gaps_found = report_data.get("gaps_found", [])
    gaps_html = ""
    if gaps_found:
        for gap in gaps_found:
            if isinstance(gap, dict):
                ctrl_name = gap.get("control", "Security Node")
                issue = gap.get("issue", "Structural mechanism absent in policy.")
                clauses = ", ".join(gap.get("framework_clauses", []))
            else:
                ctrl_name = str(gap)
                issue = f"Control {ctrl_name} is missing or inadequately defined."
                clauses = "ISO 27001 / NIST CSF / GDPR / NIS2"
                
            gaps_html += f"""
            <div style="border: 1px solid #ff3366; padding: 15px; margin-bottom: 12px; background: rgba(255, 51, 102, 0.05);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
                    <strong style="font-size: 13px; color: #ff3366;">[ ] {ctrl_name}</strong>
                    <span style="font-size: 10px; color: #ff3366; border: 1px solid #ff3366; padding: 2px 6px;">GAP</span>
                </div>
                <p style="font-size: 12px; color: #e6f1ff; margin: 8px 0;">{issue}</p>
                <div style="font-size: 10px; color: #8892b0;">IMPACTED STANDARDS: {clauses}</div>
            </div>
            """
    else:
        gaps_html = "<p style='color:#64ffda;'>No gaps detected.</p>"

    # Remediation Steps
    remediation_steps = report_data.get("remediation_steps", [])
    remediation_html = ""
    if remediation_steps:
        for step in remediation_steps:
            if isinstance(step, dict):
                ctrl = step.get("control", "Control")
                prio = step.get("priority", "High")
                action = step.get("action", "")
                ref = step.get("framework_reference", "")
            else:
                ctrl = "Control"
                prio = "High"
                action = str(step)
                ref = "GRC Compliance Standard"

            remediation_html += f"""
            <div style="border: 1px solid rgba(100, 255, 218, 0.4); padding: 15px; margin-bottom: 12px; position: relative;">
                <div style="position: absolute; top: 0; right: 0; background: #ff3366; color: #0a192f; font-size: 9px; padding: 2px 5px; font-weight: bold;">
                    PRIORITY: {prio}
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
                    <strong style="font-size: 13px; color: #e6f1ff;">TARGET: {ctrl}</strong>
                </div>
                <p style="font-size: 12px; color: #8892b0; margin-bottom: 8px;"><strong>RECOMMENDED ACTION:</strong> {action}</p>
                <div style="font-size: 10px; color: #64ffda; opacity: 0.8;">FRAMEWORK REFERENCE: {ref}</div>
            </div>
            """
    else:
        remediation_html = "<p style='color:#64ffda;'>No remediation actions required.</p>"

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enterprise GRC Audit Report</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-base: #0a192f;
            --text-primary: #e6f1ff;
            --text-secondary: #8892b0;
            --accent-cyan: #64ffda;
            --accent-red: #ff3366;
            --border-thin: 1px solid rgba(100, 255, 218, 0.4);
            --font-mono: 'Roboto Mono', monospace;
        }}
        
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        
        body {{
            background-color: var(--bg-base);
            color: var(--text-primary);
            font-family: var(--font-mono);
            padding: 40px;
            line-height: 1.6;
            font-size: 12px;
            background-image: 
                linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 20px 20px;
        }}
        
        .report-card {{
            max-width: 1000px;
            margin: 0 auto;
            background: rgba(10, 25, 47, 0.9);
            border: var(--border-thin);
            padding: 40px;
            position: relative;
        }}
        
        .report-card::before {{
            content: '+';
            position: absolute; top: -8px; left: -4px; color: var(--accent-cyan);
        }}
        .report-card::after {{
            content: '+';
            position: absolute; bottom: -8px; right: -4px; color: var(--accent-cyan);
        }}
        
        .report-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid var(--accent-cyan);
            padding-bottom: 20px;
            margin-bottom: 30px;
        }}
        
        .report-title {{
            font-size: 24px;
            font-weight: 700;
            color: var(--text-primary);
            letter-spacing: 0.1em;
        }}
        
        .mono-label {{
            font-size: 10px;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 4px;
        }}
        
        .meta-grid {{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }}
        
        .meta-box {{
            border: var(--border-thin);
            padding: 15px;
            background: rgba(255,255,255,0.02);
        }}
        
        .meta-box .val {{
            font-size: 20px;
            color: var(--text-primary);
            margin-top: 8px;
        }}
        
        section {{
            margin-bottom: 40px;
        }}
        
        h2 {{
            font-size: 14px;
            color: var(--accent-cyan);
            border-bottom: 1px dashed rgba(100, 255, 218, 0.3);
            padding-bottom: 8px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
        }}
        
        table {{
            width: 100%;
            border-collapse: collapse;
            border: var(--border-thin);
        }}
        
        th {{
            background: rgba(100, 255, 218, 0.1);
            color: var(--text-primary);
            font-size: 10px;
            text-transform: uppercase;
            padding: 12px;
            text-align: left;
            border-bottom: var(--border-thin);
        }}
        
        .pro-summary {{
            color: var(--text-secondary);
            border-left: 2px solid var(--accent-cyan);
            padding-left: 15px;
            background: rgba(100, 255, 218, 0.02);
            padding: 15px;
        }}
        
        .footer {{
            border-top: 1px solid var(--text-secondary);
            padding-top: 20px;
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            color: var(--text-secondary);
            font-size: 10px;
        }}
        
        @media print {{
            body {{ background: #0a192f !important; -webkit-print-color-adjust: exact; padding: 0; }}
            .report-card {{ border: var(--border-thin) !important; }}
        }}
    </style>
</head>
<body>

<div class="report-card">
    <div class="report-header">
        <div>
            <div class="mono-label">// AUDIT REPORT [GRC]</div>
            <div class="report-title">
                ENTERPRISE GRC REPORT
            </div>
        </div>
        <div style="text-align:right;">
            <div class="mono-label">TIMESTAMP: {report_time}</div>
            <div class="mono-label" style="color:var(--accent-cyan);">STATUS: GENERATED LOCALLY</div>
        </div>
    </div>

    <div class="meta-grid">
        <div class="meta-box">
            <div class="mono-label">EVALUATION</div>
            <div class="val" style="color:{'#ff3366' if 'Non-Compliant' in compliant_status else '#64ffda'};">{compliant_status}</div>
        </div>
        <div class="meta-box">
            <div class="mono-label">COVERAGE</div>
            <div class="val" style="color:var(--accent-cyan);">{compliance_percent}%</div>
        </div>
        <div class="meta-box">
            <div class="mono-label">RESIDUAL RISK RATING</div>
            <div class="val" style="color:{'#ff3366' if risk_score > 45 else 'var(--text-primary)'};">{risk_level} ({risk_score}/100)</div>
        </div>
        <div class="meta-box">
            <div class="mono-label">GAPS</div>
            <div class="val" style="color:var(--accent-red);">{len(gaps_found)} ERRORS</div>
        </div>
    </div>

    <section>
        <h2>
            <span>[01] EXECUTIVE SUMMARY</span>
        </h2>
        <div class="pro-summary">
            {summary_text}
        </div>
    </section>

    <section>
        <h2>
            <span>[02] REGULATORY FRAMEWORK ALIGNMENT</span>
        </h2>
        <table>
            <thead>
                <tr>
                    <th>Framework Spec</th>
                    <th>Coverage Simulation</th>
                    <th>Compliance Vector</th>
                    <th>Status Flag</th>
                </tr>
            </thead>
            <tbody>
                {framework_rows_html}
            </tbody>
        </table>
    </section>

    <section>
        <h2>
            <span>[03] VERIFIED CONTROLS & EVIDENCE ({len(impl_list)})</span>
        </h2>
        {implemented_controls_html}
    </section>

    <section>
        <h2>
            <span>[04] DETECTED GAPS ({len(gaps_found)})</span>
        </h2>
        {gaps_html}
    </section>

    <section>
        <h2>
            <span>[05] REMEDIATION ROADMAP ({len(remediation_steps)})</span>
        </h2>
        {remediation_html}
    </section>

    <div class="footer">
        <div>
            <div>AUDIT REPORT</div>
            <div style="color:var(--accent-cyan); margin-top:4px;">GENERATED LOCALLY</div>
        </div>
        <div>
            ENGINE: RULES v2.0
        </div>
    </div>
</div>

</body>
</html>
"""
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    return output_path

if __name__ == "__main__":
    report_file = "reports/audit_report.json"
    if os.path.exists(report_file):
        with open(report_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        out = generate_html_report(data)
        print(f"HTML report generated successfully at: {out}")
    else:
        print("No audit_report.json found in reports/ directory.")