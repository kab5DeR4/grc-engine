import json
import os
from datetime import datetime
from typing import Dict, Any

def generate_html_report(report_data: Dict[str, Any], output_path: str = "reports/audit_report.html") -> str:
    """
    Generates an HTML GRC Audit Report from structured audit data using the Hand-Drawn design system.
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
        
        status_color = "text-hd-accent" if pct < 45 else ("text-hd-secondary" if pct < 80 else "text-green-700")
        
        framework_rows_html += f"""
        <tr class="border-b-4 border-dashed border-hd-muted hover:bg-white transition-colors">
            <td class="py-4 px-4 font-kalam font-bold text-xl">{fw_name}</td>
            <td class="py-4 px-4 w-2/5">
                <div class="h-6 w-full bg-hd-bg border-[3px] border-hd-border wobbly shadow-[2px_2px_0px_0px_#2d2d2d] overflow-hidden p-0.5">
                    <div class="h-full bg-hd-secondary wobbly" style="width: {pct}%;"></div>
                </div>
            </td>
            <td class="py-4 px-4 font-bold text-lg">
                <span>{pct}%</span> 
                <span class="text-sm ml-1">({matched}/{total})</span>
            </td>
            <td class="py-4 px-4 font-kalam font-bold text-xl {status_color}">{status}</td>
        </tr>
        """

    # Implemented Controls & Evidence
    implemented_controls_html = ""
    evidence_map = report_data.get("evidence_map", {})
    impl_list = report_data.get("implemented_controls", [])
    
    if impl_list:
        implemented_controls_html += '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">'
        for i, ctrl in enumerate(impl_list):
            implemented_controls_html += f"""
            <div class="flex items-center gap-3 p-4 border-2 border-hd-border bg-[#f8f9fa] wobbly hover:rotate-1 transition-transform shadow-[2px_2px_0px_0px_#2d2d2d]">
                <div class="w-6 h-6 rounded-full bg-hd-secondary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 border border-hd-border">✓</div>
                <span class="text-base font-bold text-hd-fg leading-tight">{ctrl}</span>
            </div>
            """
        implemented_controls_html += '</div>'
    else:
        implemented_controls_html = "<div class='p-6 bg-[#fff0f0] border-4 border-dashed border-hd-accent wobbly text-hd-accent font-kalam text-2xl font-bold'>No compliant controls identified.</div>"

    # Compliance Gaps
    gaps_found = report_data.get("gaps_found", [])
    gaps_html = ""
    if gaps_found:
        gaps_html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'
        for i, gap in enumerate(gaps_found):
            if isinstance(gap, dict):
                ctrl_name = gap.get("control", "Security Node")
                issue = gap.get("issue", "Structural mechanism absent in policy.")
            else:
                ctrl_name = str(gap)
                issue = f"Control {ctrl_name} is missing or inadequately defined."
            
            rot = "rotate-1" if i % 2 == 0 else "-rotate-1"
            
            gaps_html += f"""
            <div class="flex items-start gap-4 p-5 border-2 border-hd-border bg-[#fff0f0] wobbly hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_#2d2d2d]">
                <div class="w-8 h-8 rounded-full bg-hd-accent text-white flex items-center justify-center font-bold flex-shrink-0 border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]">!</div>
                <div>
                    <strong class="text-xl font-bold text-hd-accent block mb-1 font-kalam leading-tight">{ctrl_name}</strong>
                    <p class="text-base text-hd-fg leading-snug">{issue}</p>
                </div>
            </div>
            """
        gaps_html += '</div>'
    else:
        gaps_html = "<div class='p-6 bg-[#d4edda] border-4 border-dashed border-green-700 wobbly text-green-800 font-kalam text-2xl font-bold'>No gaps detected. Architecture is fortified.</div>"

    # Remediation Steps
    remediation_steps = report_data.get("remediation_steps", [])
    remediation_html = ""
    if remediation_steps:
        for i, step in enumerate(remediation_steps):
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
                
            prio_color = "bg-hd-accent text-white" if prio == "High" else "bg-[#fff9c4] text-hd-fg"
            rot = "rotate-2" if i % 2 == 0 else "-rotate-1"

            remediation_html += f"""
            <div style="break-inside: avoid; page-break-inside: avoid;" class="bg-white border-[3px] border-hd-border wobbly-md p-6 mb-6 shadow-[6px_6px_0px_0px_#2d2d2d] {rot} relative overflow-hidden group hover:rotate-0 transition-all">
                <div class="absolute top-4 right-4 {prio_color} border-2 border-hd-border text-sm px-4 py-1 wobbly font-bold shadow-[2px_2px_0px_0px_#2d2d2d]">
                    PRIORITY: {prio}
                </div>
                <div class="mb-3 pr-32">
                    <span class="text-lg font-kalam text-hd-secondary font-bold block mb-1">TARGET NODE</span>
                    <strong class="text-hd-fg text-2xl font-bold">{ctrl}</strong>
                </div>
                <p class="text-hd-fg text-lg mb-4"><strong>Action:</strong> {action}</p>
                <div class="text-sm font-bold border-t-2 border-dashed border-hd-muted pt-3 mt-3">FRAMEWORK REF: {ref}</div>
            </div>
            """
    else:
        remediation_html = "<div class='p-6 bg-[#d4edda] border-4 border-dashed border-green-700 wobbly text-green-800 font-kalam text-2xl font-bold'>No remediation actions required.</div>"

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enterprise GRC Audit Report</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Tailwind Hand-Drawn Config -->
    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    colors: {{
                        hd: {{
                            bg: '#fdfbf7',
                            fg: '#2d2d2d',
                            muted: '#e5e0d8',
                            accent: '#ff4d4d',
                            border: '#2d2d2d',
                            secondary: '#2d5da1',
                        }}
                    }},
                    fontFamily: {{
                        kalam: ['Kalam', 'cursive'],
                        patrick: ['"Patrick Hand"', 'cursive'],
                    }}
                }}
            }}
        }}
    </script>
    
    <style>
        body {{
            background-image: radial-gradient(#e5e0d8 1px, transparent 1px);
            background-size: 24px 24px;
        }}
        .wobbly {{ border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; }}
        .wobbly-md {{ border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px; }}
        .wobbly-lg {{ border-radius: 225px 15px 255px 15px / 15px 255px 15px 225px; }}

        /* Print & Page Break Fixes */
        @media print {{
            * {{
                transform: none !important;
                animation: none !important;
                transition: none !important;
            }}
            body {{
                background: #fdfbf7 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }}
            header, section, footer, article, tr, .wobbly, .wobbly-md, .wobbly-lg {{
                break-inside: avoid !important;
                page-break-inside: avoid !important;
                -webkit-column-break-inside: avoid !important;
            }}
            div {{
                break-inside: avoid;
                page-break-inside: avoid;
            }}
            h1, h2, h3, h4 {{
                break-after: avoid !important;
                page-break-after: avoid !important;
            }}
        }}

        section, .wobbly-md, .wobbly-lg, .wobbly, tr {{
            break-inside: avoid;
            page-break-inside: avoid;
        }}
    </style>
</head>
<body class="bg-hd-bg text-hd-fg font-patrick antialiased min-h-screen">

    <div class="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        <!-- Report Header -->
        <header class="bg-white border-4 border-hd-border wobbly p-8 md:p-12 mb-12 shadow-[8px_8px_0px_0px_#2d2d2d] relative rotate-1">
            <!-- Tape -->
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-gray-400/30 rotate-2 border border-black/10"></div>
            
            <div class="flex flex-col md:flex-row justify-between items-start gap-6 border-b-4 border-dashed border-hd-muted pb-8 mb-8">
                <div>
                    <div class="font-kalam text-xl text-hd-secondary font-bold mb-1">AUDIT REPORT [GRC]</div>
                    <h1 class="font-kalam text-5xl md:text-6xl font-bold tracking-tight">Enterprise GRC Report</h1>
                </div>
                <div class="text-left md:text-right">
                    <div class="text-lg mb-1">Generated: {report_time}</div>
                    <div class="text-lg font-bold border-2 border-hd-border bg-[#fff9c4] px-4 py-1 wobbly shadow-[2px_2px_0px_0px_#2d2d2d] rotate-2 inline-block">Processed Locally</div>
                </div>
            </div>

            <!-- KPI Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <div class="bg-[#fff9c4] border-[3px] border-hd-border wobbly shadow-[4px_4px_0px_0px_#2d2d2d] p-5 -rotate-2">
                    <div class="font-kalam text-xl font-bold mb-1 border-b-2 border-dashed border-hd-border pb-1">Evaluation</div>
                    <div class="text-2xl font-bold {'text-hd-accent' if 'Non-Compliant' in compliant_status else 'text-green-700'} mt-2">{compliant_status}</div>
                </div>
                <div class="bg-white border-[3px] border-hd-border wobbly-md shadow-[4px_4px_0px_0px_#2d2d2d] p-5 rotate-1">
                    <div class="font-kalam text-xl font-bold mb-1 border-b-2 border-dashed border-hd-border pb-1">Coverage</div>
                    <div class="text-4xl font-bold text-hd-secondary mt-2">{compliance_percent}%</div>
                </div>
                <div class="bg-white border-[3px] border-hd-border wobbly-lg shadow-[4px_4px_0px_0px_#2d2d2d] p-5 -rotate-1">
                    <div class="font-kalam text-xl font-bold mb-1 border-b-2 border-dashed border-hd-border pb-1">Residual Risk</div>
                    <div class="text-3xl font-bold {'text-hd-accent' if risk_score > 45 else 'text-hd-fg'} mt-2">{risk_level} <span class="text-xl text-hd-fg/70">({risk_score})</span></div>
                </div>
                <div class="bg-[#fff0f0] border-[3px] border-hd-border wobbly shadow-[4px_4px_0px_0px_#2d2d2d] p-5 rotate-2">
                    <div class="font-kalam text-xl font-bold mb-1 border-b-2 border-dashed border-hd-border pb-1">Gaps Found</div>
                    <div class="text-4xl font-bold text-hd-accent mt-2">{len(gaps_found)}</div>
                </div>
            </div>
        </header>

        <!-- Executive Summary -->
        <section class="mb-16">
            <h2 class="font-kalam text-4xl font-bold mb-6 flex items-center gap-4">
                <span class="bg-hd-secondary text-white w-10 h-10 border-[3px] border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d] wobbly flex items-center justify-center rotate-3">1</span> 
                Executive Summary
            </h2>
            <div class="bg-[#fff9c4] border-[4px] border-hd-border wobbly p-8 text-xl leading-relaxed shadow-[6px_6px_0px_0px_#2d2d2d] -rotate-1 relative">
                <!-- Tack -->
                <div class="absolute top-4 left-4 w-5 h-5 rounded-full bg-hd-accent border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]"></div>
                <div class="pl-6">
                    {summary_text}
                </div>
            </div>
        </section>

        <!-- Framework Alignment -->
        <section class="mb-16">
            <h2 class="font-kalam text-4xl font-bold mb-6 flex items-center gap-4">
                <span class="bg-hd-secondary text-white w-10 h-10 border-[3px] border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d] wobbly flex items-center justify-center -rotate-2">2</span> 
                Regulatory Framework Alignment
            </h2>
            <div class="bg-white border-[4px] border-hd-border wobbly-lg p-2 shadow-[6px_6px_0px_0px_#2d2d2d] rotate-1">
                <table class="w-full text-left border-collapse bg-[#fcfcfc]">
                    <thead class="bg-hd-muted font-kalam text-2xl border-b-[3px] border-hd-border">
                        <tr>
                            <th class="py-4 px-4 font-bold border-r-[3px] border-hd-border">Framework Spec</th>
                            <th class="py-4 px-4 font-bold border-r-[3px] border-hd-border">Coverage Simulation</th>
                            <th class="py-4 px-4 font-bold border-r-[3px] border-hd-border">Compliance Vector</th>
                            <th class="py-4 px-4 font-bold">Status Flag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {framework_rows_html}
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Verified Controls -->
        <section class="mb-16">
            <h2 class="font-kalam text-4xl font-bold mb-6 flex items-center gap-4">
                <span class="bg-hd-secondary text-white w-10 h-10 border-[3px] border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d] wobbly-md flex items-center justify-center rotate-1">3</span> 
                Verified Controls & Evidence <span class="text-xl underline decoration-hd-secondary decoration-[3px]">({len(impl_list)} nodes)</span>
            </h2>
            <div class="space-y-4">
                {implemented_controls_html}
            </div>
        </section>

        <!-- Detected Gaps -->
        <section class="mb-16">
            <h2 class="font-kalam text-4xl font-bold mb-6 flex items-center gap-4 text-hd-accent">
                <span class="bg-hd-accent text-white w-10 h-10 border-[3px] border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d] wobbly flex items-center justify-center -rotate-3">4</span> 
                Detected Gaps <span class="text-xl text-hd-fg underline decoration-hd-accent decoration-[3px]">({len(gaps_found)} errors)</span>
            </h2>
            <div class="space-y-4">
                {gaps_html}
            </div>
        </section>

        <!-- Remediation -->
        <section class="mb-16">
            <h2 class="font-kalam text-4xl font-bold mb-6 flex items-center gap-4">
                <span class="bg-hd-secondary text-white w-10 h-10 border-[3px] border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d] wobbly flex items-center justify-center rotate-2">5</span> 
                Remediation Roadmap <span class="text-xl underline decoration-hd-secondary decoration-[3px]">({len(remediation_steps)} actions)</span>
            </h2>
            <div class="space-y-4">
                {remediation_html}
            </div>
        </section>

        <footer class="mt-20 pt-8 border-t-4 border-dashed border-hd-muted text-center flex flex-col md:flex-row justify-between items-center text-xl font-bold mb-10">
            <div class="mb-4 md:mb-0">
                <p>Enterprise GRC Audit Report</p>
                <p class="font-kalam text-hd-secondary mt-1 text-2xl">Generated by Privacy-First GRC Agent</p>
            </div>
            <div class="bg-white border-2 border-hd-border px-6 py-3 wobbly shadow-[4px_4px_0px_0px_#2d2d2d] rotate-2">
                <p>Engine: Rules v2.0</p>
                <p class="mt-1 font-kalam text-hd-accent">Designed by Roshan Nale</p>
            </div>
        </footer>

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
        print(f"HTML report generated successfully at: {{out}}")
    else:
        print("No audit_report.json found in reports/ directory.")