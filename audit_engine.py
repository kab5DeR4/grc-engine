"""
GRC Audit Engine
"""

import re
from typing import Dict, List, Any, Tuple

# control matrix

CONTROLS_MATRIX: Dict[str, Dict[str, Any]] = {
    "Encryption & Cryptography": {
        "keywords": [r"\bencrypt(?:ion|ed)?\b", r"\bcryptograph(?:y|ic)\b", r"\baes-?256\b", r"\btls\b", r"\bssl\b", r"\bdata-at-rest\b", r"\bdata-in-transit\b"],
        "severity": 15,
        "frameworks": {
            "ISO 27001:2022": "A.8.24 (Use of Cryptography)",
            "NIST CSF 2.0": "PR.DS-01 (Data-at-Rest & In-Transit Protection)",
            "GDPR": "Article 32(1)(a) (Encryption of Personal Data)",
            "NIS2": "Article 21(2)(j) (Use of Cryptography & Encryption)"
        }
    },
    "Multi-Factor Authentication (MFA)": {
        "keywords": [r"\bmulti-factor\b", r"\bmfa\b", r"\btwo-factor\b", r"\b2fa\b", r"\bauthenticator app\b", r"\bbiometric authentication\b"],
        "severity": 15,
        "frameworks": {
            "ISO 27001:2022": "A.5.17 (Authentication Information)",
            "NIST CSF 2.0": "PR.AA-03 (Authentication & MFA)",
            "GDPR": "Article 32(1)(b) (Access Security)",
            "NIS2": "Article 21(2)(j) (Multi-factor Authentication)"
        }
    },
    "Identity & Access Management": {
        "keywords": [r"\baccess control\b", r"\bidentity management\b", r"\biam\b", r"\brole-based access\b", r"\brbac\b", r"\buser provisioning\b"],
        "severity": 10,
        "frameworks": {
            "ISO 27001:2022": "A.5.15 (Access Control)",
            "NIST CSF 2.0": "PR.AA-01 (Identity & Access Management)",
            "GDPR": "Article 32(1)(b) (Confidentiality Controls)",
            "NIS2": "Article 21(2)(i) (Access Control Policies)"
        }
    },
    "Principle of Least Privilege": {
        "keywords": [r"\bleast privilege\b", r"\bneed-to-know\b", r"\bprivileged access\b", r"\bpam\b", r"\bminimiz(?:e|ation) of privilege\b"],
        "severity": 10,
        "frameworks": {
            "ISO 27001:2022": "A.8.2 (Privileged Access Rights)",
            "NIST CSF 2.0": "PR.AA-05 (Least Privilege Enforcement)",
            "GDPR": "Article 5(1)(c) (Data Minimization)",
            "NIS2": "Article 21(2)(i) (Privilege Control)"
        }
    },
    "Password & Credential Management": {
        "keywords": [r"\bpassword policy\b", r"\bpassword complexity\b", r"\bcredential rotation\b", r"\bpassword length\b", r"\bsecret manager\b"],
        "severity": 5,
        "frameworks": {
            "ISO 27001:2022": "A.5.17 (Authentication Information)",
            "NIST CSF 2.0": "PR.AA-02 (Credential Management)",
            "GDPR": "Article 32 (Technical Measures)",
            "NIS2": "Article 21(2)(i) (Authentication Policies)"
        }
    },
    "Security Logging & Audit Trails": {
        "keywords": [r"\baudit log(?:s|ging)?\b", r"\bsystem logs\b", r"\bsiem\b", r"\blog retention\b", r"\bevent logging\b"],
        "severity": 10,
        "frameworks": {
            "ISO 27001:2022": "A.8.15 (Logging)",
            "NIST CSF 2.0": "DE.CM-01 (Security Event Logging)",
            "GDPR": "Article 30 (Records of Processing Activities)",
            "NIS2": "Article 21(2)(b) (Incident Log Auditing)"
        }
    },
    "Continuous Security Monitoring": {
        "keywords": [r"\bcontinuous monitoring\b", r"\breal-time monitoring\b", r"\bsecurity monitoring\b", r"\bsoc\b", r"\bintrusion detection\b", r"\bids/ips\b"],
        "severity": 10,
        "frameworks": {
            "ISO 27001:2022": "A.8.16 (Monitoring Activities)",
            "NIST CSF 2.0": "DE.CM-09 (Continuous Monitoring)",
            "GDPR": "Article 32(1)(d) (Regular Testing & Evaluation)",
            "NIS2": "Article 21(2)(b) (Cybersecurity Monitoring)"
        }
    },
    "Data Backup & Recovery": {
        "keywords": [r"\bdata backup\b", r"\bbackup policy\b", r"\boffsite backup\b", r"\brto\b", r"\brpo\b", r"\bdata restoration\b"],
        "severity": 10,
        "frameworks": {
            "ISO 27001:2022": "A.8.13 (Information Backup)",
            "NIST CSF 2.0": "PR.DS-11 (Backup & Recovery Testing)",
            "GDPR": "Article 32(1)(c) (Availability & Resilience)",
            "NIS2": "Article 21(2)(c) (Business Continuity & Backups)"
        }
    },
    "Incident Response & Handling": {
        "keywords": [r"\bincident response\b", r"\bincident management\b", r"\bbreach notification\b", r"\bcsirt\b", r"\bincident reporting\b"],
        "severity": 10,
        "frameworks": {
            "ISO 27001:2022": "A.5.24 (Information Security Incident Management)",
            "NIST CSF 2.0": "RS.MA-01 (Incident Response Execution)",
            "GDPR": "Article 33 (Data Breach Notification to Authority)",
            "NIS2": "Article 21(2)(b) (Incident Handling & 24h Reporting)"
        }
    },
    "Vulnerability Management & Patching": {
        "keywords": [r"\bvulnerability management\b", r"\bpatch management\b", r"\bpatching\b", r"\bsecurity scan(?:ning)?\b", r"\bcve\b"],
        "severity": 10,
        "frameworks": {
            "ISO 27001:2022": "A.8.8 (Management of Technical Vulnerabilities)",
            "NIST CSF 2.0": "ID.RA-01 (Vulnerability Risk Assessment)",
            "GDPR": "Article 32 (Vulnerability Assessments)",
            "NIS2": "Article 21(2)(e) (Vulnerability Handling & Disclosure)"
        }
    },
    "Asset Inventory & Management": {
        "keywords": [r"\basset inventory\b", r"\basset management\b", r"\bhardware inventory\b", r"\bsoftware inventory\b"],
        "severity": 5,
        "frameworks": {
            "ISO 27001:2022": "A.5.9 (Inventory of Information Assets)",
            "NIST CSF 2.0": "ID.AM-01 (Physical & Software Asset Inventory)",
            "GDPR": "Article 30 (Inventory of Processing Operations)",
            "NIS2": "Article 21(2)(a) (Asset Management Policies)"
        }
    },
    "Cloud & Infrastructure Security": {
        "keywords": [r"\bcloud security\b", r"\baws\b", r"\bazure\b", r"\bgcp\b", r"\bshared responsibility\b", r"\bcloud infrastructure\b"],
        "severity": 5,
        "frameworks": {
            "ISO 27001:2022": "A.5.23 (Information Security for Cloud Services)",
            "NIST CSF 2.0": "PR.DS-02 (Cloud Infrastructure Protection)",
            "GDPR": "Article 28 (Processor Cloud Contracts)",
            "NIS2": "Article 21(2)(d) (Supply Chain Cloud Security)"
        }
    },
    "Data Classification & Handling": {
        "keywords": [r"\bdata classification\b", r"\bsensitive data\b", r"\bconfidential data\b", r"\bpii\b", r"\bdata labeling\b"],
        "severity": 5,
        "frameworks": {
            "ISO 27001:2022": "A.5.12 (Classification of Information)",
            "NIST CSF 2.0": "ID.AM-05 (Data Classification Scheme)",
            "GDPR": "Article 9 (Special Categories of Personal Data)",
            "NIS2": "Article 21(2)(a) (Data Security Risk Analysis)"
        }
    },
    "Data Retention & Disposal": {
        "keywords": [r"\bdata retention\b", r"\bsecure disposal\b", r"\bmedia destruction\b", r"\bretention schedule\b", r"\bright to be forgotten\b"],
        "severity": 5,
        "frameworks": {
            "ISO 27001:2022": "A.8.10 (Information Deletion) & A.8.14 (Redundant Media Disposal)",
            "NIST CSF 2.0": "PR.DS-03 (Data Sanitization & Destruction)",
            "GDPR": "Article 5(1)(e) (Storage Limitation) & Article 17 (Erasing Data)",
            "NIS2": "Article 21(2)(a) (Data Lifecyle Policies)"
        }
    },
    "Business Continuity & Disaster Recovery": {
        "keywords": [r"\bbusiness continuity\b", r"\bdisaster recovery\b", r"\bbcp\b", r"\bdrp\b", r"\boperational resilience\b"],
        "severity": 5,
        "frameworks": {
            "ISO 27001:2022": "A.5.29 (Information Security During Disruption)",
            "NIST CSF 2.0": "RC.RP-01 (Recovery Plan Execution)",
            "GDPR": "Article 32(1)(c) (Resilience of Systems)",
            "NIS2": "Article 21(2)(c) (Crisis Management & Business Continuity)"
        }
    },
    "Vendor & Supply Chain Risk Management": {
        "keywords": [r"\bvendor risk\b", r"\bsupply chain\b", r"\bthird-party risk\b", r"\bvendor security assessment\b", r"\bsla\b"],
        "severity": 5,
        "frameworks": {
            "ISO 27001:2022": "A.5.19 (Information Security in Supplier Relationships)",
            "NIST CSF 2.0": "ID.SC-01 (Supply Chain Risk Management)",
            "GDPR": "Article 28 (Data Processor Due Diligence)",
            "NIS2": "Article 21(2)(d) (Supply Chain Security Assessments)"
        }
    },
    "Threat Intelligence & Risk Assessment": {
        "keywords": [r"\bthreat intelligence\b", r"\brisk assessment\b", r"\bthreat modeling\b", r"\brisk mitigation\b", r"\bthreat monitoring\b"],
        "severity": 5,
        "frameworks": {
            "ISO 27001:2022": "A.5.7 (Threat Intelligence)",
            "NIST CSF 2.0": "ID.RA-02 (Threat Intelligence Integration)",
            "GDPR": "Article 35 (Data Protection Impact Assessment - DPIA)",
            "NIS2": "Article 21(2)(a) (Risk Analysis Policies)"
        }
    },
    "Security Awareness Training": {
        "keywords": [r"\bsecurity awareness\b", r"\bsecurity training\b", r"\bphishing simulation\b", r"\bemployee training\b"],
        "severity": 5,
        "frameworks": {
            "ISO 27001:2022": "A.6.3 (Information Security Awareness, Education & Training)",
            "NIST CSF 2.0": "PR.AT-01 (Personnel Security Awareness)",
            "GDPR": "Article 39(1)(b) (Staff Awareness & Training)",
            "NIS2": "Article 21(2)(g) (Cyber Hygiene & Training)"
        }
    },
    "Network Security & Perimeter Control": {
        "keywords": [r"\bfirewall\b", r"\bnetwork security\b", r"\bsegmentation\b", r"\bvpn\b", r"\bzero trust\b", r"\bdmz\b"],
        "severity": 10,
        "frameworks": {
            "ISO 27001:2022": "A.8.20 (Network Security) & A.8.22 (Segregation in Networks)",
            "NIST CSF 2.0": "PR.IR-01 (Network Infrastructure Protection)",
            "GDPR": "Article 32 (Perimeter & Network Controls)",
            "NIS2": "Article 21(2)(h) (Network Security Infrastructure)"
        }
    }
}

# negation patterns to avoid false positive passes (e.g., "does not use MFA", "no encryption")
NEGATION_PATTERNS = [
    r"\bnot?\b", r"\bno\b", r"\bnever\b", r"\black(?:s|ing)?\b", 
    r"\bwithout\b", r"\bexempt(?:ed)?\b", r"\bfailed to\b", r"\bnon-compliant\b"
]

def check_negative_context(text_snippet: str, match_start: int) -> bool:
    """
    Checks if a keyword match is preceded by a negation word within a 40-character window.
    """
    window_start = max(0, match_start - 45)
    prefix_text = text_snippet[window_start:match_start].lower()
    
    for neg_pat in NEGATION_PATTERNS:
        if re.search(neg_pat, prefix_text):
            return True
    return False

def extract_evidence_quote(text: str, match_start: int, match_end: int) -> str:
    """
    Extracts a snippet around the matched keyword.
    """
    snippet_start = max(0, match_start - 50)
    snippet_end = min(len(text), match_end + 70)
    snippet = text[snippet_start:snippet_end].replace("\n", " ").strip()
    return f"...{snippet}..."

def audit_policy(policy_text: str) -> Dict[str, Any]:
    """
    Audits an internal policy document.
    """
    policy_lower = policy_text.lower()
    
    total_possible_severity = sum(ctrl["severity"] for ctrl in CONTROLS_MATRIX.values())
    accumulated_risk = 0
    
    implemented_controls = []
    gaps_found = []
    remediation_steps = []
    evidence_map = {}
    
    framework_coverage = {
        "ISO 27001:2022": {"matched": 0, "total": 0, "clauses": []},
        "NIST CSF 2.0": {"matched": 0, "total": 0, "clauses": []},
        "GDPR": {"matched": 0, "total": 0, "clauses": []},
        "NIS2": {"matched": 0, "total": 0, "clauses": []}
    }
    
    # initialize framework counts
    for ctrl_info in CONTROLS_MATRIX.values():
        for fw_name, fw_clause in ctrl_info["frameworks"].items():
            if fw_name in framework_coverage:
                framework_coverage[fw_name]["total"] += 1

    for control_name, ctrl_info in CONTROLS_MATRIX.items():
        is_implemented = False
        evidence_snippet = None
        
        for pattern in ctrl_info["keywords"]:
            regex = re.compile(pattern, re.IGNORECASE)
            matches = list(regex.finditer(policy_text))
            
            for match in matches:
                # check for negation in surrounding text
                if not check_negative_context(policy_text, match.start()):
                    is_implemented = True
                    evidence_snippet = extract_evidence_quote(policy_text, match.start(), match.end())
                    break
            
            if is_implemented:
                break
                
        if is_implemented:
            implemented_controls.append(control_name)
            evidence_map[control_name] = evidence_snippet or "Policy phrase matched."
            
            # record framework coverage
            for fw_name, fw_clause in ctrl_info["frameworks"].items():
                if fw_name in framework_coverage:
                    framework_coverage[fw_name]["matched"] += 1
                    framework_coverage[fw_name]["clauses"].append(f"{control_name}: {fw_clause}")
        else:
            gaps_found.append({
                "control": control_name,
                "severity_points": ctrl_info["severity"],
                "framework_clauses": list(ctrl_info["frameworks"].values()),
                "issue": f"{control_name} control requirement is missing or insufficiently defined."
            })
            remediation_steps.append({
                "control": control_name,
                "priority": "High" if ctrl_info["severity"] >= 10 else "Medium",
                "action": f"Establish a formal policy and standard operating procedure for {control_name}.",
                "framework_reference": ", ".join(ctrl_info["frameworks"].values())
            })
            accumulated_risk += ctrl_info["severity"]

    # calculate risk score
    risk_score = min(100, int((accumulated_risk / total_possible_severity) * 100))
    compliance_percent = max(0, 100 - risk_score)
    
    if risk_score <= 20:
        compliant_status = "Compliant"
        risk_level = "Low"
    elif risk_score <= 45:
        compliant_status = "Partially Compliant"
        risk_level = "Medium"
    elif risk_score <= 70:
        compliant_status = "Non-Compliant"
        risk_level = "High"
    else:
        compliant_status = "Critical Non-Compliance"
        risk_level = "Critical"

    # framework percentage coverage calculation
    framework_summary = []
    for fw_name, data in framework_coverage.items():
        pct = int((data["matched"] / max(1, data["total"])) * 100)
        framework_summary.append({
            "framework": fw_name,
            "coverage_percent": pct,
            "matched_controls": data["matched"],
            "total_controls": data["total"],
            "status": "Fully Covered" if pct >= 80 else ("Partially Covered" if pct >= 40 else "Low Coverage")
        })

    total_controls = len(CONTROLS_MATRIX)
    missing_count = len(gaps_found)
    passed_count = len(implemented_controls)

    summary_text = (
        f"Audited {total_controls} key cybersecurity controls. "
        f"Found {passed_count} implemented controls and {missing_count} compliance gaps. "
        f"Overall compliance is {compliance_percent}% with a {risk_level} risk level ({risk_score}/100)."
    )

    return {
        "compliant_status": compliant_status,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "compliance_percent": compliance_percent,
        "total_controls": total_controls,
        "passed_controls_count": passed_count,
        "gaps_count": missing_count,
        "summary": summary_text,
        "implemented_controls": implemented_controls,
        "evidence_map": evidence_map,
        "gaps_found": gaps_found,
        "remediation_steps": remediation_steps,
        "framework_summary": framework_summary
    }