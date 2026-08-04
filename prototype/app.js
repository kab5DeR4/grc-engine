// Set up PDF.js worker
if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// GRC Audit Matrix (Ported from audit_engine.py)
const CONTROLS_MATRIX = {
    "Encryption & Cryptography": {
        keywords: [/\bencrypt(?:ion|ed)?\b/i, /\bcryptograph(?:y|ic)\b/i, /\baes-?256\b/i, /\btls\b/i, /\bssl\b/i, /\bdata-at-rest\b/i, /\bdata-in-transit\b/i],
        severity: 15,
        frameworks: {
            "ISO 27001:2022": "A.8.24 (Use of Cryptography)",
            "NIST CSF 2.0": "PR.DS-01 (Data-at-Rest & In-Transit Protection)",
            "GDPR": "Article 32(1)(a) (Encryption of Personal Data)",
            "NIS2": "Article 21(2)(j) (Use of Cryptography & Encryption)"
        }
    },
    "Multi-Factor Authentication (MFA)": {
        keywords: [/\bmulti-factor\b/i, /\bmfa\b/i, /\btwo-factor\b/i, /\b2fa\b/i, /\bauthenticator app\b/i, /\bbiometric authentication\b/i],
        severity: 15,
        frameworks: {
            "ISO 27001:2022": "A.5.17 (Authentication Information)",
            "NIST CSF 2.0": "PR.AA-03 (Authentication & MFA)",
            "GDPR": "Article 32(1)(b) (Access Security)",
            "NIS2": "Article 21(2)(j) (Multi-factor Authentication)"
        }
    },
    "Identity & Access Management": {
        keywords: [/\baccess control\b/i, /\bidentity management\b/i, /\biam\b/i, /\brole-based access\b/i, /\brbac\b/i, /\buser provisioning\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.5.15 (Access Control)",
            "NIST CSF 2.0": "PR.AA-01 (Identity & Access Management)",
            "GDPR": "Article 32(1)(b) (Confidentiality Controls)",
            "NIS2": "Article 21(2)(i) (Access Control Policies)"
        }
    },
    "Principle of Least Privilege": {
        keywords: [/\bleast privilege\b/i, /\bneed-to-know\b/i, /\bprivileged access\b/i, /\bpam\b/i, /\bminimiz(?:e|ation) of privilege\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.8.2 (Privileged Access Rights)",
            "NIST CSF 2.0": "PR.AA-05 (Least Privilege Enforcement)",
            "GDPR": "Article 5(1)(c) (Data Minimization)",
            "NIS2": "Article 21(2)(i) (Privilege Control)"
        }
    },
    "Password & Credential Management": {
        keywords: [/\bpassword policy\b/i, /\bpassword complexity\b/i, /\bcredential rotation\b/i, /\bpassword length\b/i, /\bsecret manager\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.5.17 (Authentication Information)",
            "NIST CSF 2.0": "PR.AA-02 (Credential Management)",
            "GDPR": "Article 32 (Technical Measures)",
            "NIS2": "Article 21(2)(i) (Authentication Policies)"
        }
    },
    "Security Logging & Audit Trails": {
        keywords: [/\baudit log(?:s|ging)?\b/i, /\bsystem logs\b/i, /\bsiem\b/i, /\blog retention\b/i, /\bevent logging\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.8.15 (Logging)",
            "NIST CSF 2.0": "DE.CM-01 (Security Event Logging)",
            "GDPR": "Article 30 (Records of Processing Activities)",
            "NIS2": "Article 21(2)(b) (Incident Log Auditing)"
        }
    },
    "Continuous Security Monitoring": {
        keywords: [/\bcontinuous monitoring\b/i, /\breal-time monitoring\b/i, /\bsecurity monitoring\b/i, /\bsoc\b/i, /\bintrusion detection\b/i, /\bids\/ips\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.8.16 (Monitoring Activities)",
            "NIST CSF 2.0": "DE.CM-09 (Continuous Monitoring)",
            "GDPR": "Article 32(1)(d) (Regular Testing & Evaluation)",
            "NIS2": "Article 21(2)(b) (Cybersecurity Monitoring)"
        }
    },
    "Data Backup & Recovery": {
        keywords: [/\bdata backup\b/i, /\bbackup policy\b/i, /\boffsite backup\b/i, /\brto\b/i, /\brpo\b/i, /\bdata restoration\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.8.13 (Information Backup)",
            "NIST CSF 2.0": "PR.DS-11 (Backup & Recovery Testing)",
            "GDPR": "Article 32(1)(c) (Availability & Resilience)",
            "NIS2": "Article 21(2)(c) (Business Continuity & Backups)"
        }
    },
    "Incident Response & Handling": {
        keywords: [/\bincident response\b/i, /\bincident management\b/i, /\bbreach notification\b/i, /\bcsirt\b/i, /\bincident reporting\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.5.24 (Information Security Incident Management)",
            "NIST CSF 2.0": "RS.MA-01 (Incident Response Execution)",
            "GDPR": "Article 33 (Data Breach Notification to Authority)",
            "NIS2": "Article 21(2)(b) (Incident Handling & 24h Reporting)"
        }
    },
    "Vulnerability Management & Patching": {
        keywords: [/\bvulnerability management\b/i, /\bpatch management\b/i, /\bpatching\b/i, /\bsecurity scan(?:ning)?\b/i, /\bcve\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.8.8 (Management of Technical Vulnerabilities)",
            "NIST CSF 2.0": "ID.RA-01 (Vulnerability Risk Assessment)",
            "GDPR": "Article 32 (Vulnerability Assessments)",
            "NIS2": "Article 21(2)(e) (Vulnerability Handling & Disclosure)"
        }
    },
    "Asset Inventory & Management": {
        keywords: [/\basset inventory\b/i, /\basset management\b/i, /\bhardware inventory\b/i, /\bsoftware inventory\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.5.9 (Inventory of Information Assets)",
            "NIST CSF 2.0": "ID.AM-01 (Physical & Software Asset Inventory)",
            "GDPR": "Article 30 (Inventory of Processing Operations)",
            "NIS2": "Article 21(2)(a) (Asset Management Policies)"
        }
    },
    "Cloud & Infrastructure Security": {
        keywords: [/\bcloud security\b/i, /\baws\b/i, /\bazure\b/i, /\bgcp\b/i, /\bshared responsibility\b/i, /\bcloud infrastructure\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.5.23 (Information Security for Cloud Services)",
            "NIST CSF 2.0": "PR.DS-02 (Cloud Infrastructure Protection)",
            "GDPR": "Article 28 (Processor Cloud Contracts)",
            "NIS2": "Article 21(2)(d) (Supply Chain Cloud Security)"
        }
    },
    "Data Classification & Handling": {
        keywords: [/\bdata classification\b/i, /\bsensitive data\b/i, /\bconfidential data\b/i, /\bpii\b/i, /\bdata labeling\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.5.12 (Classification of Information)",
            "NIST CSF 2.0": "ID.AM-05 (Data Classification Scheme)",
            "GDPR": "Article 9 (Special Categories of Personal Data)",
            "NIS2": "Article 21(2)(a) (Data Security Risk Analysis)"
        }
    },
    "Data Retention & Disposal": {
        keywords: [/\bdata retention\b/i, /\bsecure disposal\b/i, /\bmedia destruction\b/i, /\bretention schedule\b/i, /\bright to be forgotten\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.8.10 (Information Deletion) & A.8.14 (Redundant Media Disposal)",
            "NIST CSF 2.0": "PR.DS-03 (Data Sanitization & Destruction)",
            "GDPR": "Article 5(1)(e) (Storage Limitation) & Article 17 (Erasing Data)",
            "NIS2": "Article 21(2)(a) (Data Lifecyle Policies)"
        }
    },
    "Business Continuity & Disaster Recovery": {
        keywords: [/\bbusiness continuity\b/i, /\bdisaster recovery\b/i, /\bbcp\b/i, /\bdrp\b/i, /\boperational resilience\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.5.29 (Information Security During Disruption)",
            "NIST CSF 2.0": "RC.RP-01 (Recovery Plan Execution)",
            "GDPR": "Article 32(1)(c) (Resilience of Systems)",
            "NIS2": "Article 21(2)(c) (Crisis Management & Business Continuity)"
        }
    },
    "Vendor & Supply Chain Risk Management": {
        keywords: [/\bvendor risk\b/i, /\bsupply chain\b/i, /\bthird-party risk\b/i, /\bvendor security assessment\b/i, /\bsla\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.5.19 (Information Security in Supplier Relationships)",
            "NIST CSF 2.0": "ID.SC-01 (Supply Chain Risk Management)",
            "GDPR": "Article 28 (Data Processor Due Diligence)",
            "NIS2": "Article 21(2)(d) (Supply Chain Security Assessments)"
        }
    },
    "Threat Intelligence & Risk Assessment": {
        keywords: [/\bthreat intelligence\b/i, /\brisk assessment\b/i, /\bthreat modeling\b/i, /\brisk mitigation\b/i, /\bthreat monitoring\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.5.7 (Threat Intelligence)",
            "NIST CSF 2.0": "ID.RA-02 (Threat Intelligence Integration)",
            "GDPR": "Article 35 (Data Protection Impact Assessment - DPIA)",
            "NIS2": "Article 21(2)(a) (Risk Analysis Policies)"
        }
    },
    "Security Awareness Training": {
        keywords: [/\bsecurity awareness\b/i, /\bsecurity training\b/i, /\bphishing simulation\b/i, /\bemployee training\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.6.3 (Information Security Awareness, Education & Training)",
            "NIST CSF 2.0": "PR.AT-01 (Personnel Security Awareness)",
            "GDPR": "Article 39(1)(b) (Staff Awareness & Training)",
            "NIS2": "Article 21(2)(g) (Cyber Hygiene & Training)"
        }
    },
        "Incident Response SLA": {
        keywords: [/\bsla\b/i, /\bresponse time\b/i, /\btime to respond\b/i, /\bmttr\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.5.24 (Information Security Incident Management)",
            "SOC 2": "CC7.3 (Incident Response)"
        }
    },
    "Backup Retention Policy": {
        keywords: [/\bbackup retention\b/i, /\bretention period\b/i, /\bretention policy\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.8.13 (Information Backup)",
            "NIST CSF 2.0": "PR.DS-11 (Backup & Recovery)"
        }
    },
    "SOC 2 Type II Mapping": {
        keywords: [/\bsoc 2\b/i, /\btype ii\b/i, /\btrust services criteria\b/i, /\btsc\b/i],
        severity: 10,
        frameworks: {
            "SOC 2": "General (Trust Services Criteria)"
        }
    },
    "Mobile Device Management (MDM)": {
        keywords: [/\bmdm\b/i, /\bmobile device\b/i, /\bbyod\b/i],
        severity: 5,
        frameworks: {
            "ISO 27001:2022": "A.8.1 (User Endpoint Devices)",
            "NIST CSF 2.0": "PR.AT-01 (Device Security)"
        }
    },
    "Endpoint Detection & Response (EDR)": {
        keywords: [/\bedr\b/i, /\bendpoint protection\b/i, /\bantivirus\b/i, /\banti-malware\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.8.7 (Protection against malware)",
            "NIST CSF 2.0": "DE.CM-04 (Endpoint Monitoring)"
        }
    },
    "Network Security & Perimeter Control": {
        keywords: [/\bfirewall\b/i, /\bnetwork security\b/i, /\bsegmentation\b/i, /\bvpn\b/i, /\bzero trust\b/i, /\bdmz\b/i],
        severity: 10,
        frameworks: {
            "ISO 27001:2022": "A.8.20 (Network Security) & A.8.22 (Segregation in Networks)",
            "NIST CSF 2.0": "PR.IR-01 (Network Infrastructure Protection)",
            "GDPR": "Article 32 (Perimeter & Network Controls)",
            "NIS2": "Article 21(2)(h) (Network Security Infrastructure)"
        }
    }
};

const NEGATION_PATTERNS = [
    /\bnot?\b/i, /\bno\b/i, /\bnever\b/i, /\black(?:s|ing)?\b/i, 
    /\bwithout\b/i, /\bexempt(?:ed)?\b/i, /\bfailed to\b/i, /\bnon-compliant\b/i
];

// Helper functions for GRC scanning
function checkNegativeContext(text, matchIndex) {
    const start = Math.max(0, matchIndex - 45);
    const prefix = text.substring(start, matchIndex).toLowerCase();
    for (const neg of NEGATION_PATTERNS) {
        if (neg.test(prefix)) {
            return true;
        }
    }
    return false;
}

function extractEvidenceQuote(text, matchIndex, matchLength) {
    let start = matchIndex;
    let periodCount = 0;
    while (start > 0) {
        if (text[start] === '.') periodCount++;
        if (periodCount === 2) { start++; break; }
        start--;
    }
    let end = matchIndex + matchLength;
    periodCount = 0;
    while (end < text.length) {
        if (text[end] === '.') periodCount++;
        if (periodCount === 2) { end++; break; }
        end++;
    }
    return text.substring(start, end).replace(/\n/g, " ").trim();
}

// Client-side Policy Auditer
function auditPolicyText(text) {
    let totalPossibleSeverity = 0;
    let accumulatedRisk = 0;
    
    const implementedControls = [];
    const gapsFound = [];
    const remediationSteps = [];
    const evidenceMap = {};
    
    const frameworkCoverage = {
        "ISO 27001:2022": { matched: 0, total: 0, clauses: [] },
        "NIST CSF 2.0": { matched: 0, total: 0, clauses: [] },
        "GDPR": { matched: 0, total: 0, clauses: [] },
        "NIS2": { matched: 0, total: 0, clauses: [] }
    };
    
    // Initialize framework counts
    for (const ctrl of Object.values(CONTROLS_MATRIX)) {
        totalPossibleSeverity += ctrl.severity;
        for (const [fwName] of Object.entries(ctrl.frameworks)) {
            if (frameworkCoverage[fwName]) {
                frameworkCoverage[fwName].total += 1;
            }
        }
    }
    
    for (const [controlName, ctrlInfo] of Object.entries(CONTROLS_MATRIX)) {
        let isImplemented = false;
        let evidenceSnippet = null;
        
        for (const pattern of ctrlInfo.keywords) {
            const matches = [...text.matchAll(new RegExp(pattern, 'g'))];
            for (const match of matches) {
                const matchIndex = match.index;
                const matchLength = match[0].length;
                if (!checkNegativeContext(text, matchIndex)) {
                    isImplemented = true;
                    evidenceSnippet = extractEvidenceQuote(text, matchIndex, matchLength);
                    break;
                }
            }
            if (isImplemented) break;
        }
        
        if (isImplemented) {
            implementedControls.append ? implementedControls.push(controlName) : implementedControls.push(controlName);
            evidenceMap[controlName] = evidenceSnippet || "Policy phrase matched.";
            
            for (const [fwName, fwClause] of Object.entries(ctrlInfo.frameworks)) {
                if (frameworkCoverage[fwName]) {
                    frameworkCoverage[fwName].matched += 1;
                    frameworkCoverage[fwName].clauses.push(`${controlName}: ${fwClause}`);
                }
            }
        } else {
            gapsFound.push({
                control: controlName,
                severity_points: ctrlInfo.severity,
                framework_clauses: Object.values(ctrlInfo.frameworks),
                issue: `${controlName} control requirement is missing or insufficiently defined.`
            });
            remediationSteps.push({
                control: controlName,
                priority: ctrlInfo.severity >= 10 ? "High" : "Medium",
                action: `Establish a formal policy and standard operating procedure for ${controlName}.`,
                framework_reference: Object.values(ctrlInfo.frameworks).join(", ")
            });
            accumulatedRisk += ctrlInfo.severity;
        }
    }
    
    const riskScore = Math.min(100, Math.round((accumulatedRisk / totalPossibleSeverity) * 100));
    const compliancePercent = Math.max(0, 100 - riskScore);
    
    let compliantStatus = "Non-Compliant";
    let riskLevel = "High";
    
    if (riskScore <= 20) {
        compliantStatus = "Compliant";
        riskLevel = "Low";
    } else if (riskScore <= 45) {
        compliantStatus = "Partially Compliant";
        riskLevel = "Medium";
    } else if (riskScore <= 70) {
        compliantStatus = "Non-Compliant";
        riskLevel = "High";
    } else {
        compliantStatus = "Critical Non-Compliance";
        riskLevel = "Critical";
    }
    
    const frameworkSummary = [];
    for (const [fwName, data] of Object.entries(frameworkCoverage)) {
        const pct = Math.round((data.matched / Math.max(1, data.total)) * 100);
        frameworkSummary.push({
            framework: fwName,
            coverage_percent: pct,
            matched_controls: data.matched,
            total_controls: data.total,
            status: pct >= 80 ? "Fully Covered" : (pct >= 40 ? "Partially Covered" : "Low Coverage")
        });
    }
    
    const totalControls = Object.keys(CONTROLS_MATRIX).length;
    const passedCount = implementedControls.length;
    const missingCount = gapsFound.length;
    
    const summaryText = `Audited ${totalControls} key cybersecurity controls. Found ${passedCount} implemented controls and ${missingCount} compliance gaps. Overall compliance is ${compliancePercent}% with a ${riskLevel} risk level (${riskScore}/100).`;
    
    return {
        compliant_status: compliantStatus,
        risk_score: riskScore,
        risk_level: riskLevel,
        compliance_percent: compliancePercent,
        total_controls: totalControls,
        passed_controls_count: passedCount,
        gaps_count: missingCount,
        summary: summaryText,
        implemented_controls: implementedControls,
        evidence_map: evidenceMap,
        gaps_found: gapsFound,
        remediation_steps: remediationSteps,
        framework_summary: frameworkSummary
    };
}

// Javascript HTML report generator (Mimics report_generator.py)
function generateHtmlReportString(reportData) {
    const reportTime = new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '');
    const riskLevel = reportData.risk_level || "Low";
    const riskScore = reportData.risk_score || 0;
    const compliancePercent = reportData.compliance_percent || 0;
    const compliantStatus = reportData.compliant_status || "Compliant";
    const summaryText = reportData.summary || "";
    
    // Framework Rows HTML
    let frameworkRowsHtml = "";
    for (const fw of (reportData.framework_summary || [])) {
        const fwName = fw.framework;
        const pct = fw.coverage_percent;
        const status = fw.status;
        const matched = fw.matched_controls;
        const total = fw.total_controls;
        const statusColor = pct < 45 ? "text-hd-accent" : (pct < 80 ? "text-hd-secondary" : "text-green-700");
        
        frameworkRowsHtml += `
        <tr class="border-b-4 border-dashed border-hd-muted hover:bg-white transition-colors">
            <td class="py-4 px-4 font-kalam font-bold text-xl whitespace-nowrap border-r-[3px] border-hd-border w-1/4">${fwName}</td>
            <td class="py-4 px-4 w-2/5 border-r-[3px] border-hd-border">
                <div class="h-6 w-full bg-hd-bg border-[3px] border-hd-border wobbly shadow-[2px_2px_0px_0px_#2d2d2d] overflow-hidden p-0.5">
                    <div class="h-full bg-hd-secondary wobbly" style="width: ${pct}%;"></div>
                </div>
            </td>
            <td class="py-4 px-4 font-bold text-lg whitespace-nowrap border-r-[3px] border-hd-border w-1/5">
                <span>${pct}%</span> 
                <span class="text-sm ml-1 text-hd-fg/70">(${matched}/${total})</span>
            </td>
            <td class="py-4 px-4 font-kalam font-bold text-xl whitespace-nowrap w-1/5 ${statusColor}">${status}</td>
        </tr>
        `;
    }

    // Implemented Controls HTML
    let implementedControlsHtml = "";
    const implList = reportData.implemented_controls || [];
    if (implList.length > 0) {
        implementedControlsHtml += '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">';
        for (const ctrl of implList) {
            implementedControlsHtml += `
            <div class="flex items-center gap-3 p-4 border-2 border-hd-border bg-[#f8f9fa] wobbly hover:rotate-1 transition-transform shadow-[2px_2px_0px_0px_#2d2d2d]">
                <div class="w-6 h-6 rounded-full bg-hd-secondary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 border border-hd-border">✓</div>
                <span class="text-base font-bold text-hd-fg leading-tight">${ctrl}</span>
            </div>
            `;
        }
        implementedControlsHtml += '</div>';
    } else {
        implementedControlsHtml = "<div class='p-6 bg-[#fff0f0] border-4 border-dashed border-hd-accent wobbly text-hd-accent font-kalam text-2xl font-bold'>No compliant controls identified.</div>";
    }

    // Gaps HTML
    let gapsHtml = "";
    const gapsFound = reportData.gaps_found || [];
    if (gapsFound.length > 0) {
        gapsHtml += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">';
        gapsFound.forEach((gap, i) => {
            const ctrlName = gap.control || "Security Node";
            const issue = gap.issue || "Structural mechanism absent in policy.";
            const rot = i % 2 === 0 ? "rotate-1" : "-rotate-1";
            gapsHtml += `
            <div class="flex items-start gap-4 p-5 border-2 border-hd-border bg-[#fff0f0] wobbly hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_#2d2d2d]">
                <div class="w-8 h-8 rounded-full bg-hd-accent text-white flex items-center justify-center font-bold flex-shrink-0 border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]">!</div>
                <div>
                    <strong class="text-xl font-bold text-hd-accent block mb-1 font-kalam leading-tight">${ctrlName}</strong>
                    <p class="text-base text-hd-fg leading-snug">${issue}</p>
                </div>
            </div>
            `;
        });
        gapsHtml += '</div>';
    } else {
        gapsHtml = "<div class='p-6 bg-[#d4edda] border-4 border-dashed border-green-700 wobbly text-green-800 font-kalam text-2xl font-bold'>No gaps detected. Architecture is fortified.</div>";
    }

    // Remediation HTML
    let remediationHtml = "";
    const remediationSteps = reportData.remediation_steps || [];
    if (remediationSteps.length > 0) {
        remediationSteps.forEach((step, i) => {
            const ctrl = step.control || "Control";
            const prio = step.priority || "High";
            const action = step.action || "";
            const ref = step.framework_reference || "";
            const prioColor = prio === "High" ? "bg-hd-accent text-white" : "bg-[#fff9c4] text-hd-fg";
            const rot = i % 2 === 0 ? "rotate-2" : "-rotate-1";

            remediationHtml += `
            <div style="break-inside: avoid; page-break-inside: avoid; display: block;" class="bg-white border-[3px] border-hd-border wobbly-md p-6 mb-6 shadow-[6px_6px_0px_0px_#2d2d2d] ${rot} relative group hover:rotate-0 transition-all">
                <div class="absolute top-4 right-4 ${prioColor} border-2 border-hd-border text-sm px-4 py-1 wobbly font-bold shadow-[2px_2px_0px_0px_#2d2d2d]">
                    PRIORITY: ${prio}
                </div>
                <div class="mb-3 pr-32">
                    <span class="text-lg font-kalam text-hd-secondary font-bold block mb-1">TARGET NODE</span>
                    <strong class="text-hd-fg text-2xl font-bold">${ctrl}</strong>
                </div>
                <p class="text-hd-fg text-lg mb-4"><strong>Action:</strong> ${action}</p>
                <div class="text-sm font-bold border-t-2 border-dashed border-hd-muted pt-3 mt-3">FRAMEWORK REF: ${ref}</div>
            </div>
            `;
        });
    } else {
        remediationHtml = "<div class='p-6 bg-[#d4edda] border-4 border-dashed border-green-700 wobbly text-green-800 font-kalam text-2xl font-bold'>No remediation actions required.</div>";
    }

    return `<!DOCTYPE html>
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
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        hd: {
                            bg: '#fdfbf7',
                            fg: '#2d2d2d',
                            muted: '#e5e0d8',
                            accent: '#ff4d4d',
                            border: '#2d2d2d',
                            secondary: '#2d5da1',
                        }
                    },
                    fontFamily: {
                        kalam: ['Kalam', 'cursive'],
                        patrick: ['"Patrick Hand"', 'cursive'],
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #fdfbf7;
            background-image: radial-gradient(#e5e0d8 1px, transparent 1px);
            background-size: 24px 24px;
        }
        .wobbly { border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; }
        .wobbly-md { border-radius: 15px 225px 15px 255px / 255px 15px 225px 15px; }
        .wobbly-lg { border-radius: 225px 15px 255px 15px / 15px 255px 15px 225px; }

        /* Print & Page Break Fixes */
        @media print {
            * {
                transform: none !important;
                animation: none !important;
                transition: none !important;
                box-shadow: none !important;
                overflow: visible !important;
            }
            html, body {
                background: #fdfbf7 !important;
                height: auto !important;
                overflow: visible !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            header, section, footer, article, .wobbly, .wobbly-md, .wobbly-lg, .grid > div, .space-y-4 > div {
                break-inside: avoid !important;
                page-break-inside: avoid !important;
                -webkit-column-break-inside: avoid !important;
                display: block !important;
                float: none !important;
                position: static !important;
            }
            table {
                display: table !important;
                width: 100% !important;
                table-layout: fixed !important;
                border-collapse: collapse !important;
            }
            thead { display: table-header-group !important; }
            tbody { display: table-row-group !important; }
            tr { 
                display: table-row !important; 
                page-break-inside: avoid !important; 
                break-inside: avoid !important; 
            }
            th, td { 
                display: table-cell !important; 
                vertical-align: middle !important; 
            }
            h1, h2, h3, h4 {
                break-after: avoid !important;
                page-break-after: avoid !important;
            }
        }

        section, .wobbly-md, .wobbly-lg, .wobbly, tr {
            break-inside: avoid;
            page-break-inside: avoid;
        }
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
                    <div class="text-lg mb-1">Generated: ${reportTime}</div>
                    <div class="text-lg font-bold border-2 border-hd-border bg-[#fff9c4] px-4 py-1 wobbly shadow-[2px_2px_0px_0px_#2d2d2d] rotate-2 inline-block">Processed Locally</div>
                </div>
            </div>

            <!-- KPI Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <div class="bg-[#fff9c4] border-[3px] border-hd-border wobbly shadow-[4px_4px_0px_0px_#2d2d2d] p-5 -rotate-2">
                    <div class="font-kalam text-xl font-bold mb-1 border-b-2 border-dashed border-hd-border pb-1">Evaluation</div>
                    <div class="text-2xl font-bold ${compliantStatus.includes('Non-Compliant') ? 'text-hd-accent' : 'text-green-700'} mt-2">${compliantStatus}</div>
                </div>
                <div class="bg-white border-[3px] border-hd-border wobbly-md shadow-[4px_4px_0px_0px_#2d2d2d] p-5 rotate-1">
                    <div class="font-kalam text-xl font-bold mb-1 border-b-2 border-dashed border-hd-border pb-1">Coverage</div>
                    <div class="text-4xl font-bold text-hd-secondary mt-2">${compliancePercent}%</div>
                </div>
                <div class="bg-white border-[3px] border-hd-border wobbly-lg shadow-[4px_4px_0px_0px_#2d2d2d] p-5 -rotate-1">
                    <div class="font-kalam text-xl font-bold mb-1 border-b-2 border-dashed border-hd-border pb-1">Residual Risk</div>
                    <div class="text-3xl font-bold ${riskScore > 45 ? 'text-hd-accent' : 'text-hd-fg'} mt-2">${riskLevel} <span class="text-xl text-hd-fg/70">(${riskScore})</span></div>
                </div>
                <div class="bg-[#fff0f0] border-[3px] border-hd-border wobbly shadow-[4px_4px_0px_0px_#2d2d2d] p-5 rotate-2">
                    <div class="font-kalam text-xl font-bold mb-1 border-b-2 border-dashed border-hd-border pb-1">Gaps Found</div>
                    <div class="text-4xl font-bold text-hd-accent mt-2">${gapsFound.length}</div>
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
                    ${summaryText}
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
                            <th class="py-4 px-4 font-bold border-r-[3px] border-hd-border w-1/4">Framework Spec</th>
                            <th class="py-4 px-4 font-bold border-r-[3px] border-hd-border w-2/5">Coverage Simulation</th>
                            <th class="py-4 px-4 font-bold border-r-[3px] border-hd-border w-1/5">Compliance Vector</th>
                            <th class="py-4 px-4 font-bold w-1/5">Status Flag</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${frameworkRowsHtml}
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Verified Controls -->
        <section class="mb-16">
            <h2 class="font-kalam text-4xl font-bold mb-6 flex items-center gap-4">
                <span class="bg-hd-secondary text-white w-10 h-10 border-[3px] border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d] wobbly-md flex items-center justify-center rotate-1">3</span> 
                Verified Controls & Evidence <span class="text-xl underline decoration-hd-secondary decoration-[3px]">(${implList.length} nodes)</span>
            </h2>
            <div class="space-y-4">
                ${implementedControlsHtml}
            </div>
        </section>

        <!-- Detected Gaps -->
        <section class="mb-16">
            <h2 class="font-kalam text-4xl font-bold mb-6 flex items-center gap-4 text-hd-accent">
                <span class="bg-hd-accent text-white w-10 h-10 border-[3px] border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d] wobbly flex items-center justify-center -rotate-3">4</span> 
                Detected Gaps <span class="text-xl text-hd-fg underline decoration-hd-accent decoration-[3px]">(${gapsFound.length} errors)</span>
            </h2>
            <div class="space-y-4">
                ${gapsHtml}
            </div>
        </section>

        <!-- Remediation -->
        <section class="mb-16">
            <h2 class="font-kalam text-4xl font-bold mb-6 flex items-center gap-4">
                <span class="bg-hd-secondary text-white w-10 h-10 border-[3px] border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d] wobbly flex items-center justify-center rotate-2">5</span> 
                Remediation Roadmap <span class="text-xl underline decoration-hd-secondary decoration-[3px]">(${remediationSteps.length} actions)</span>
            </h2>
            <div class="space-y-4">
                ${remediationHtml}
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
</html>`;
}

// React Dashboard App
const App = () => {
    const [uploading, setUploading] = React.useState(false);
    const [auditData, setAuditData] = React.useState(null);
    const [reportUrl, setReportUrl] = React.useState("");
    const [checkedItems, setCheckedItems] = React.useState({});

    const handleLoadTestPdf = async () => {
        setUploading(true);
        try {
            const response = await fetch('./test-policy.pdf');
            const arrayBuffer = await response.arrayBuffer();
            const typedarray = new Uint8Array(arrayBuffer);
            
            const pdf = await window.pdfjsLib.getDocument({ data: typedarray }).promise;
            let extractedText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items.map(item => item.str).join(" ");
                extractedText += pageText + "\n";
            }

            if (!extractedText.trim()) {
                alert("Unable to extract text from the test PDF file.");
                setUploading(false);
                return;
            }

            const result = auditPolicyText(extractedText);
            setAuditData(result);
            setCheckedItems({});

            const htmlString = generateHtmlReportString(result);
            const blob = new Blob([htmlString], { type: "text/html" });
            const blobUrl = URL.createObjectURL(blob);
            setReportUrl(blobUrl);

        } catch (error) {
            console.error("Test PDF Parsing failed:", error);
            alert("Failed to load test PDF.");
        } finally {
            setUploading(false);
        }
    };

    // Revoke object URL to prevent memory leaks
    React.useEffect(() => {
        return () => {
            if (reportUrl) {
                URL.revokeObjectURL(reportUrl);
            }
        };
    }, [reportUrl]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();

        reader.onload = async function() {
            try {
                const typedarray = new Uint8Array(this.result);
                // Extract PDF text in browser using PDF.js
                const pdf = await window.pdfjsLib.getDocument({ data: typedarray }).promise;
                let extractedText = "";

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const pageText = content.items.map(item => item.str).join(" ");
                    extractedText += pageText + "\n";
                }

                // If PDF text extraction yielded nothing (e.g. image-only PDF)
                if (!extractedText.trim()) {
                    alert("Unable to extract text from the PDF file. Verify it is not an image scan.");
                    setUploading(false);
                    return;
                }

                // Run client-side compliance rules
                const result = auditPolicyText(extractedText);
                setAuditData(result);
            setCheckedItems({});

                // Dynamically compile HTML Report
                const htmlString = generateHtmlReportString(result);
                const blob = new Blob([htmlString], { type: "text/html" });
                const blobUrl = URL.createObjectURL(blob);
                setReportUrl(blobUrl);

            } catch (error) {
                console.error("PDF Parsing / Auditing failed:", error);
                alert("Failed to read and audit PDF. Please make sure it is a valid PDF document.");
            } finally {
                setUploading(false);
            }
        };

        reader.onerror = () => {
            alert("File reading error.");
            setUploading(false);
        };

        reader.readAsArrayBuffer(file);
    };

    const resetAudit = () => {
        setAuditData(null);
        if (reportUrl) {
            URL.revokeObjectURL(reportUrl);
            setReportUrl("");
        }
    };

    const downloadHtmlReport = () => {
        if (!reportUrl) return;
        const a = document.createElement("a");
        a.href = reportUrl;
        a.download = "GRC_Audit_Report.html";
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const downloadPdfReport = () => {
        const iframe = document.querySelector('.iframe-preview');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.print();
        } else if (reportUrl) {
            window.open(reportUrl, '_blank');
        }
    };

    const downloadJsonData = () => {
        if (!auditData) return;
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditData, null, 4));
        const a = document.createElement("a");
        a.setAttribute("href", dataStr);
        a.setAttribute("download", "audit_report.json");
        a.click();
        a.remove();
    };

    const handleDownloadFormatChange = (e) => {
        const val = e.target.value;
        if (val === "html") {
            downloadHtmlReport();
        } else if (val === "pdf") {
            downloadPdfReport();
        } else if (val === "json") {
            downloadJsonData();
        }
        e.target.value = "";
    };

    React.useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [auditData, uploading]);

    return (
        <div className="min-h-screen relative font-patrick flex flex-col z-0">
            
            {/* Informative Header */}
            <header className="relative z-20 flex justify-between items-center py-6 px-6 md:px-12 border-b-4 border-hd-border bg-hd-bg shadow-[0px_4px_0px_0px_#2d2d2d]">
                <div className="flex items-center gap-3 text-hd-fg cursor-pointer" onClick={resetAudit}>
                    <div className="w-10 h-10 border-[3px] border-hd-border rounded-full flex items-center justify-center font-kalam font-bold text-xl bg-hd-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d] rotate-2">
                        G
                    </div>
                    <h1 className="font-kalam font-bold text-2xl tracking-wide uppercase">GRC Engine <span className="text-sm text-hd-secondary rotate-[-5deg] inline-block ml-1">v2.0</span></h1>
                </div>

                <nav className="hidden md:flex items-center gap-8 font-kalam text-lg">
                    <a href="#" className="hover:line-through decoration-hd-accent decoration-2 transition-all">Documentation</a>
                    <a href="#" className="hover:line-through decoration-hd-accent decoration-2 transition-all">API Access</a>
                    <a href="#" className="hover:line-through decoration-hd-accent decoration-2 transition-all">About Us</a>
                </nav>

                <div className="flex items-center gap-4">
                    <button onClick={handleLoadTestPdf} disabled={uploading} className="inline-flex items-center gap-2 px-6 py-2 bg-hd-secondary text-white border-[3px] border-hd-border wobbly-md cursor-pointer hover:bg-blue-700 shadow-[4px_4px_0px_0px_#2d2d2d] hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 font-bold text-lg -rotate-1 mr-4">
                        <i data-lucide="file-check-2" className="w-5 h-5"></i>
                        <span>Load Test PDF</span>
                    </button>
                    <label className="inline-flex items-center gap-2 px-6 py-2 bg-white text-hd-fg border-[3px] border-hd-border wobbly-md cursor-pointer hover:bg-hd-accent hover:text-white shadow-[4px_4px_0px_0px_#2d2d2d] hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 font-bold text-lg rotate-1">
                        <input type="file" className="file-input hidden" onChange={handleFileUpload} accept=".pdf" disabled={uploading} />
                        <i data-lucide="upload-cloud" className="w-5 h-5"></i>
                        <span>{uploading ? "Analyzing..." : "New Audit"}</span>
                    </label>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-grow container mx-auto px-4 py-12 md:py-16 max-w-6xl">
                
                {/* Pre-Upload Landing Page */}
                {!auditData && (
                    <div className="space-y-24 pb-20">
                        {/* Hero Section */}
                        <div className="relative text-center mt-8 md:mt-16">
                            
                            {/* Decorative squiggles */}
                            <div className="hidden md:block absolute top-0 left-10 w-16 h-16 border-4 border-dashed border-hd-secondary rounded-full animate-float-bounce -rotate-12 opacity-80"></div>
                            <svg className="hidden md:block absolute bottom-10 right-20 w-24 h-24 text-hd-accent animate-float-bounce" style={{animationDelay: "1s"}} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                                <path d="M10,90 Q50,10 90,90 Q50,50 10,90 Z" />
                            </svg>
                            
                            <h2 className="font-kalam text-5xl md:text-7xl font-bold mb-6 text-hd-fg leading-tight relative inline-block">
                                Automated Policy Audit
                                <span className="absolute -top-4 -right-10 text-hd-accent text-6xl rotate-12 animate-jiggle">!</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-hd-fg max-w-3xl mx-auto mb-12 leading-relaxed">
                                Upload your security policy to evaluate structural requirements against ISO 27001, NIST CSF, GDPR, and NIS2. Fast, local, and <span className="underline decoration-hd-accent decoration-[3px]">privacy-first</span>.
                            </p>
                            
                            <div className="relative inline-block">
                                <button onClick={handleLoadTestPdf} disabled={uploading} className="inline-flex items-center gap-3 bg-hd-secondary text-white border-4 border-hd-border wobbly px-10 py-5 cursor-pointer hover:bg-blue-700 shadow-[6px_6px_0px_0px_#2d2d2d] hover:shadow-[3px_3px_0px_0px_#2d2d2d] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-100 font-bold text-2xl rotate-1 mr-6">
                                    <i data-lucide="file-check-2" className="w-8 h-8"></i>
                                    <span>Load Test PDF</span>
                                </button>
                                <label className="inline-flex items-center gap-3 bg-white text-hd-fg border-4 border-hd-border wobbly px-10 py-5 cursor-pointer hover:bg-hd-accent hover:text-white shadow-[6px_6px_0px_0px_#2d2d2d] hover:shadow-[3px_3px_0px_0px_#2d2d2d] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-100 font-bold text-2xl -rotate-1 group">
                                    <input type="file" className="file-input hidden" onChange={handleFileUpload} accept=".pdf" disabled={uploading} />
                                    <i data-lucide={uploading ? "loader" : "file-text"} className={`w-8 h-8 ${uploading ? 'animate-spin' : ''}`}></i>
                                    <span className="tracking-wide">{uploading ? "Analyzing Document..." : "Upload PDF Policy"}</span>
                                </label>
                                {/* Hand-drawn arrow pointing to CTA */}
                                <svg className="hidden md:block absolute -left-24 top-1/2 w-20 h-16 text-hd-secondary pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                                    <path d="M10,80 Q30,20 90,50" strokeDasharray="8 8" />
                                    <path d="M70,30 L90,50 L70,70" />
                                </svg>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="max-w-6xl mx-auto mt-24">
                            <div className="text-center mb-16">
                                <h3 className="font-kalam text-4xl md:text-5xl font-bold text-hd-fg mb-4">Enterprise-Grade Auditing</h3>
                                <p className="text-hd-fg text-xl max-w-2xl mx-auto">Verify your security posture across multiple compliance frameworks in seconds.</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {/* Card 1: Thumbtack decoration */}
                                <div className="bg-[#fff9c4] p-8 border-[3px] border-hd-border wobbly-md shadow-[6px_6px_0px_0px_#2d2d2d] rotate-1 hover:rotate-0 hover:-translate-y-2 transition-transform duration-200 relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-hd-accent border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]"></div>
                                    <div className="w-16 h-16 bg-white border-2 border-hd-border rounded-full flex items-center justify-center mb-6 text-hd-fg wobbly shadow-[2px_2px_0px_0px_#2d2d2d]">
                                        <i data-lucide="shield-check" className="w-8 h-8"></i>
                                    </div>
                                    <h4 className="font-kalam text-2xl font-bold text-hd-fg mb-3">Multi-Framework</h4>
                                    <p className="text-hd-fg text-lg leading-relaxed">Simultaneously maps your controls against ISO 27001, NIST CSF, GDPR, and NIS2 requirements.</p>
                                </div>

                                {/* Card 2: Tape decoration */}
                                <div className="bg-white p-8 border-[3px] border-hd-border wobbly shadow-[6px_6px_0px_0px_#2d2d2d] -rotate-1 hover:rotate-1 hover:-translate-y-2 transition-transform duration-200 relative">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-400/30 rotate-2 backdrop-blur-sm shadow-sm border border-black/10"></div>
                                    <div className="w-16 h-16 bg-white border-2 border-hd-border rounded-full flex items-center justify-center mb-6 text-hd-secondary wobbly shadow-[2px_2px_0px_0px_#2d2d2d]">
                                        <i data-lucide="zap" className="w-8 h-8"></i>
                                    </div>
                                    <h4 className="font-kalam text-2xl font-bold text-hd-fg mb-3">Instant Analysis</h4>
                                    <p className="text-hd-fg text-lg leading-relaxed">No more manual spreadsheets. Get an immediate compliance score, risk rating, and gap analysis.</p>
                                </div>

                                {/* Card 3: Thumbtack decoration */}
                                <div className="bg-white p-8 border-[3px] border-hd-border wobbly-lg shadow-[6px_6px_0px_0px_#2d2d2d] rotate-2 hover:rotate-0 hover:-translate-y-2 transition-transform duration-200 relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-hd-secondary border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]"></div>
                                    <div className="w-16 h-16 bg-white border-2 border-hd-border rounded-full flex items-center justify-center mb-6 text-hd-accent wobbly shadow-[2px_2px_0px_0px_#2d2d2d]">
                                        <i data-lucide="lock" className="w-8 h-8"></i>
                                    </div>
                                    <h4 className="font-kalam text-2xl font-bold text-hd-fg mb-3">Privacy First</h4>
                                    <p className="text-hd-fg text-lg leading-relaxed">All document processing happens locally. Your sensitive security policies never leave your environment.</p>
                                </div>
                            </div>
                        </div>

                        {/* How it works Section */}
                        <div className="max-w-5xl mx-auto mt-24 mb-12 relative">
                            <div className="text-center mb-16">
                                <h3 className="font-kalam text-4xl md:text-5xl font-bold text-hd-fg mb-4">How It Works</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                                <div className="text-center relative">
                                    <div className="w-20 h-20 mx-auto bg-white border-[3px] border-hd-border wobbly flex items-center justify-center shadow-[4px_4px_0px_0px_#2d2d2d] mb-6 font-kalam text-4xl font-bold text-hd-fg -rotate-2">1</div>
                                    <h4 className="font-kalam text-2xl font-bold text-hd-fg mb-2">Upload</h4>
                                    <p className="text-hd-fg text-lg">Provide your standard operating procedures or policy documents as a PDF.</p>
                                    <svg className="hidden md:block absolute top-10 left-[60%] w-[80%] h-12 text-hd-secondary" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6">
                                        <path d="M10,25 Q30,0 50,25 T90,25" />
                                    </svg>
                                </div>

                                <div className="text-center relative">
                                    <div className="w-20 h-20 mx-auto bg-hd-accent text-white border-[3px] border-hd-border wobbly-lg flex items-center justify-center shadow-[4px_4px_0px_0px_#2d2d2d] mb-6 font-kalam text-4xl font-bold rotate-1">2</div>
                                    <h4 className="font-kalam text-2xl font-bold text-hd-fg mb-2">Analyze</h4>
                                    <p className="text-hd-fg text-lg">The engine cross-references your text against a matrix of required enterprise controls.</p>
                                    <svg className="hidden md:block absolute top-10 left-[60%] w-[80%] h-12 text-hd-secondary" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6">
                                        <path d="M10,25 Q30,50 50,25 T90,25" />
                                    </svg>
                                </div>

                                <div className="text-center relative">
                                    <div className="w-20 h-20 mx-auto bg-white border-[3px] border-hd-border wobbly-md flex items-center justify-center shadow-[4px_4px_0px_0px_#2d2d2d] mb-6 font-kalam text-4xl font-bold text-hd-fg rotate-2">3</div>
                                    <h4 className="font-kalam text-2xl font-bold text-hd-fg mb-2">Remediate</h4>
                                    <p className="text-hd-fg text-lg">Review the generated dashboard, identify structural gaps, and download the report.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dashboard View */}
                {auditData && (
                    <div className="space-y-12 pb-12">
                        {/* Summary Header */}
                        <div className="bg-white border-4 border-hd-border wobbly shadow-[8px_8px_0px_0px_#2d2d2d] p-8 md:p-12 -rotate-1 relative">
                            {/* Tape decoration */}
                            <div className="absolute -top-4 left-10 w-24 h-8 bg-gray-400/30 rotate-3 backdrop-blur-sm border border-black/10"></div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b-4 border-dashed border-hd-muted pb-8">
                                <div>
                                    <h2 className="font-kalam text-4xl font-bold mb-2">Audit Summary</h2>
                                    <p className="text-xl text-hd-fg/80">Evaluation complete for standard frameworks.</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <div className={`font-kalam text-4xl font-bold inline-block border-[3px] border-hd-border px-6 py-2 shadow-[4px_4px_0px_0px_#2d2d2d] rotate-2 ${auditData.compliant_status.includes('Compliant') && !auditData.compliant_status.includes('Non-') ? 'bg-[#d4edda] text-green-900' : 'bg-hd-accent text-white'}`}>
                                        {auditData.compliant_status}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="bg-[#fff9c4] p-6 border-[3px] border-hd-border wobbly-md shadow-[4px_4px_0px_0px_#2d2d2d] -rotate-1">
                                    <div className="font-kalam text-lg font-bold mb-1">Risk Level</div>
                                    <div className={`font-bold text-2xl ${auditData.risk_score > 45 ? 'text-hd-accent' : 'text-hd-fg'}`}>{auditData.risk_level}</div>
                                </div>
                                <div className="bg-white p-6 border-[3px] border-hd-border wobbly shadow-[4px_4px_0px_0px_#2d2d2d] rotate-2">
                                    <div className="font-kalam text-lg font-bold mb-1">Risk Score</div>
                                    <div className="font-bold text-3xl">{auditData.risk_score} <span className="text-lg">/100</span></div>
                                </div>
                                <div className="bg-white p-6 border-[3px] border-hd-border wobbly-lg shadow-[4px_4px_0px_0px_#2d2d2d] -rotate-2">
                                    <div className="font-kalam text-lg font-bold mb-1">Coverage</div>
                                    <div className="font-bold text-3xl text-hd-secondary">{auditData.compliance_percent}%</div>
                                </div>
                                <div className="bg-white p-6 border-[3px] border-hd-border wobbly-md shadow-[4px_4px_0px_0px_#2d2d2d] rotate-1">
                                    <div className="font-kalam text-lg font-bold mb-1">Gaps Found</div>
                                    <div className="font-bold text-3xl text-hd-accent">{auditData.gaps_found ? auditData.gaps_found.length : 0}</div>
                                </div>
                            </div>
                        </div>

                        {/* Verified Controls Section */}
                        <div className="bg-white border-4 border-hd-border wobbly-md p-8 md:p-10 shadow-[8px_8px_0px_0px_#2d2d2d] rotate-1 relative">
                            {/* Tape decoration */}
                            <div className="absolute -top-4 left-8 w-24 h-8 bg-gray-400/30 rotate-2 backdrop-blur-sm border border-black/10"></div>
                            
                            <div className="flex justify-between items-center mb-6 pb-3 border-b-3 border-dashed border-hd-border">
                                <h3 className="font-kalam text-3xl font-bold flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-hd-secondary text-white inline-flex items-center justify-center font-bold text-lg border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]">✓</span>
                                    Verified Controls
                                </h3>
                                <span className="font-kalam text-lg font-bold bg-[#d4edda] text-green-900 border-2 border-hd-border px-4 py-1 wobbly shadow-[2px_2px_0px_0px_#2d2d2d]">
                                    {auditData.implemented_controls ? auditData.implemented_controls.length : 0} Implemented
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {auditData.implemented_controls && auditData.implemented_controls.length > 0 ? (
                                    auditData.implemented_controls.map((ctrl, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 border-2 border-hd-border bg-[#f8f9fa] wobbly hover:rotate-1 transition-transform shadow-[2px_2px_0px_0px_#2d2d2d]">
                                            <div className="w-6 h-6 rounded-full bg-hd-secondary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 border border-hd-border">✓</div>
                                            <span className="text-base font-bold text-hd-fg leading-tight">{ctrl}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-full text-hd-accent font-bold text-lg p-4 border-2 border-dashed border-hd-accent bg-[#fff0f0] wobbly">No controls verified.</p>
                                )}
                            </div>
                        </div>

                        {/* Identified Gaps Section */}
                        <div className="bg-white border-4 border-hd-border wobbly p-8 md:p-10 shadow-[8px_8px_0px_0px_#2d2d2d] -rotate-1 relative">
                            {/* Thumbtack */}
                            <div className="absolute top-4 right-8 w-6 h-6 rounded-full bg-hd-accent border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]"></div>
                            
                            <div className="flex justify-between items-center mb-6 pb-3 border-b-3 border-dashed border-hd-border">
                                <h3 className="font-kalam text-3xl font-bold text-hd-accent flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-hd-accent text-white inline-flex items-center justify-center font-bold text-lg border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]">!</span>
                                    Identified Compliance Gaps
                                </h3>
                                <span className="font-kalam text-lg font-bold bg-hd-accent text-white border-2 border-hd-border px-4 py-1 wobbly shadow-[2px_2px_0px_0px_#2d2d2d]">
                                    {auditData.gaps_found ? auditData.gaps_found.length : 0} Gaps Detected
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {auditData.gaps_found && auditData.gaps_found.length > 0 ? (
                                    auditData.gaps_found.map((gap, i) => {
                                        const name = gap.control || gap;
                                        const issue = gap.issue || "Missing control requirement in current policy text.";
                                        const rot = i % 3 === 0 ? "rotate-1" : (i % 3 === 1 ? "-rotate-1" : "rotate-2");
                                        return (
                                            <div key={i} className={`flex items-start gap-4 p-5 border-2 border-hd-border bg-[#fff0f0] wobbly ${rot} hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_#2d2d2d] relative`}>
                                                <div className="w-8 h-8 rounded-full bg-hd-accent text-white flex items-center justify-center font-bold flex-shrink-0 border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]">!</div>
                                                <div>
                                                    <strong className="text-xl font-bold text-hd-accent block mb-1 font-kalam leading-tight">{name}</strong>
                                                    <p className="text-base text-hd-fg leading-snug">{issue}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="col-span-full text-green-700 font-bold text-lg p-4 border-2 border-dashed border-green-700 bg-[#d4edda] wobbly">No gaps identified! Excellent compliance posture.</p>
                                )}
                            </div>
                        </div>

                        
                        {/* Remediation Planner */}
                        {auditData.remediation_steps && auditData.remediation_steps.length > 0 && (
                            <div className="bg-[#fff9c4] border-4 border-hd-border wobbly-lg p-8 md:p-10 shadow-[8px_8px_0px_0px_#2d2d2d] -rotate-1 relative mt-12">
                                <div className="absolute top-4 right-8 w-6 h-6 rounded-full bg-hd-accent border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]"></div>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-3 border-b-3 border-dashed border-hd-border">
                                    <h3 className="font-kalam text-3xl font-bold flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-hd-accent text-white inline-flex items-center justify-center font-bold text-lg border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]">⚙</span>
                                        Remediation Planner
                                    </h3>
                                    <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-1/3">
                                        <div className="w-full bg-white border-2 border-hd-border h-6 wobbly overflow-hidden shadow-[inset_2px_2px_0px_0px_#2d2d2d]">
                                            <div className="bg-green-500 h-full transition-all duration-500" style={{width: `${(Object.keys(checkedItems).length / auditData.remediation_steps.length) * 100}%`}}></div>
                                        </div>
                                        <span className="font-bold text-xl font-kalam">{Math.round((Object.keys(checkedItems).length / auditData.remediation_steps.length) * 100)}%</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {auditData.remediation_steps.map((step, i) => (
                                        <label key={i} className={`flex items-start gap-4 p-4 border-2 border-hd-border bg-white wobbly hover:bg-gray-50 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#2d2d2d] ${checkedItems[i] ? 'opacity-75' : ''}`}>
                                            <input 
                                                type="checkbox" 
                                                className="mt-1 w-6 h-6 accent-green-600 cursor-pointer"
                                                checked={!!checkedItems[i]}
                                                onChange={() => setCheckedItems(prev => ({...prev, [i]: !prev[i]}))}
                                            />
                                            <div className={checkedItems[i] ? 'line-through decoration-hd-accent decoration-2' : ''}>
                                                <strong className="text-xl font-bold text-hd-fg block mb-1 font-kalam leading-tight">{step.control}</strong>
                                                <p className="text-base text-hd-fg leading-snug">{step.action}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Report Export */}
                        <div className="bg-white border-4 border-hd-border wobbly-lg p-8 md:p-12 shadow-[8px_8px_0px_0px_#2d2d2d] rotate-1 relative">
                            {/* Thumbtack */}
                            <div className="absolute top-4 right-8 w-6 h-6 rounded-full bg-hd-accent border-2 border-hd-border shadow-[2px_2px_0px_0px_#2d2d2d]"></div>
                            
                            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                                <div>
                                    <h3 className="font-kalam text-3xl font-bold mb-2">Export Report</h3>
                                    <p className="text-xl">Choose your preferred format (HTML, PDF, or JSON).</p>
                                </div>
                                <div className="relative mt-6 md:mt-0">
                                    <select 
                                        onChange={handleDownloadFormatChange}
                                        defaultValue=""
                                        className="appearance-none inline-flex items-center gap-3 px-8 py-3.5 bg-hd-secondary text-white border-[3px] border-hd-border wobbly cursor-pointer hover:bg-blue-700 shadow-[4px_4px_0px_0px_#2d2d2d] hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 font-bold text-xl rotate-2 pr-12 focus:outline-none"
                                    >
                                        <option value="" disabled hidden>📥 Download Format...</option>
                                        <option value="html" className="bg-white text-hd-fg font-patrick text-lg">🌐 HTML Version (Hand-Drawn)</option>
                                        <option value="pdf" className="bg-white text-hd-fg font-patrick text-lg">📄 PDF Version (Print/Save)</option>
                                        <option value="json" className="bg-white text-hd-fg font-patrick text-lg">📊 JSON Dataset</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                                        <i data-lucide="chevron-down" className="w-6 h-6"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative mt-8">
                                <div className="absolute -top-3 left-6 bg-[#fff9c4] px-4 py-1 border-2 border-hd-border font-kalam font-bold -rotate-3 z-10">Preview</div>
                                <iframe src={reportUrl} className="iframe-preview"></iframe>
                            </div>
                        </div>

                    </div>
                )}
            </main>

            {/* Informative Footer */}
            <footer className="relative z-20 mt-auto border-t-[4px] border-hd-border bg-white pt-16 pb-8 px-6">
                <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 text-hd-fg mb-4">
                            <div className="w-8 h-8 border-2 border-hd-border rounded-full flex items-center justify-center font-kalam font-bold bg-hd-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d] -rotate-3">
                                G
                            </div>
                            <span className="font-kalam font-bold text-xl tracking-wide uppercase">GRC Engine</span>
                        </div>
                        <p className="text-lg mb-6">Continuous Control Verification and Automated Audit Platform.</p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 border-2 border-hd-border wobbly flex items-center justify-center hover:bg-hd-accent hover:text-white shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none transition-all rotate-2"><i data-lucide="twitter" className="w-5 h-5"></i></a>
                            <a href="#" className="w-10 h-10 border-2 border-hd-border wobbly flex items-center justify-center hover:bg-hd-secondary hover:text-white shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none transition-all -rotate-1"><i data-lucide="github" className="w-5 h-5"></i></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-kalam text-2xl font-bold mb-4 relative inline-block">
                            Product
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-hd-secondary rounded-full -rotate-1"></span>
                        </h4>
                        <ul className="space-y-3 text-lg">
                            <li><a href="#" className="hover:line-through decoration-hd-accent decoration-2">Features</a></li>
                            <li><a href="#" className="hover:line-through decoration-hd-accent decoration-2">Pricing</a></li>
                            <li><a href="#" className="hover:line-through decoration-hd-accent decoration-2">Integrations</a></li>
                            <li><a href="#" className="hover:line-through decoration-hd-accent decoration-2">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-kalam text-2xl font-bold mb-4 relative inline-block">
                            Resources
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-hd-secondary rounded-full rotate-1"></span>
                        </h4>
                        <ul className="space-y-3 text-lg">
                            <li><a href="#" className="hover:line-through decoration-hd-accent decoration-2">Documentation</a></li>
                            <li><a href="#" className="hover:line-through decoration-hd-accent decoration-2">API Reference</a></li>
                            <li><a href="#" className="hover:line-through decoration-hd-accent decoration-2">Security Hub</a></li>
                            <li><a href="#" className="hover:line-through decoration-hd-accent decoration-2">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <div className="bg-[#fff9c4] p-6 border-[3px] border-hd-border wobbly shadow-[4px_4px_0px_0px_#2d2d2d] rotate-2">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-hd-accent border-2 border-hd-border shadow-[1px_1px_0px_0px_#2d2d2d]"></div>
                            <h4 className="font-kalam text-2xl font-bold mb-2">Need Help?</h4>
                            <p className="text-lg mb-4">Contact our support team for enterprise setups.</p>
                            <a href="#" className="inline-block bg-white border-2 border-hd-border wobbly px-4 py-2 font-bold hover:bg-hd-accent hover:text-white shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none transition-all">Support Center</a>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto max-w-6xl pt-8 border-t-2 border-dashed border-hd-muted text-center flex flex-col md:flex-row justify-between items-center text-lg font-bold">
                    <p>Built with Privacy-First GRC Agent</p>
                    <p className="mt-2 md:mt-0">Designed by Roshan Nale</p>
                </div>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
