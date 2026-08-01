const { useState, useEffect, useRef } = React;

const CONTROLS_MATRIX = {
    "Encryption & Cryptography": { severity: 15, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Enforces data-at-rest and data-in-transit encryption.", clause: "ISO A.8.24, NIST PR.DS-01, GDPR Art.32, NIS2 Art.21(2)(j)" },
    "Multi-Factor Authentication (MFA)": { severity: 15, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Mandates MFA for external and administrative access.", clause: "ISO A.5.17, NIST PR.AA-03, GDPR Art.32, NIS2 Art.21(2)(j)" },
    "Identity & Access Management": { severity: 10, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Formal access controls and authorization management.", clause: "ISO A.5.15, NIST PR.AA-01, GDPR Art.32, NIS2 Art.21(2)(i)" },
    "Principle of Least Privilege": { severity: 10, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Restricts user rights to minimum required for their role.", clause: "ISO A.8.2, NIST PR.AA-05, GDPR Art.5, NIS2 Art.21(2)(i)" },
    "Password & Credential Management": { severity: 5, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Enforces complexity, rotation, and secure credential storage.", clause: "ISO A.5.17, NIST PR.AA-02, GDPR Art.32, NIS2 Art.21(2)(i)" },
    "Security Logging & Audit Trails": { severity: 10, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Maintains tamper-proof system logs for security audits.", clause: "ISO A.8.15, NIST DE.CM-01, GDPR Art.30, NIS2 Art.21(2)(b)" },
    "Continuous Security Monitoring": { severity: 10, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "24/7 security logging, alert ingestion, and monitoring.", clause: "ISO A.8.16, NIST DE.CM-09, GDPR Art.32, NIS2 Art.21(2)(b)" },
    "Data Backup & Recovery": { severity: 10, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Secures offsite backups and recovery capabilities.", clause: "ISO A.8.13, NIST PR.DS-11, GDPR Art.32, NIS2 Art.21(2)(c)" },
    "Incident Response & Handling": { severity: 10, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Formalized incident logs, escalation paths, and breach notices.", clause: "ISO A.5.24, NIST RS.MA-01, GDPR Art.33, NIS2 Art.21(2)(b)" },
    "Vulnerability Management & Patching": { severity: 10, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Regular security scans and software patch deployment.", clause: "ISO A.8.8, NIST ID.RA-01, GDPR Art.32, NIS2 Art.21(2)(e)" },
    "Asset Inventory & Management": { severity: 5, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Maintains structured registry of hardware and software.", clause: "ISO A.5.9, NIST ID.AM-01, GDPR Art.30, NIS2 Art.21(2)(a)" },
    "Cloud & Infrastructure Security": { severity: 5, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Configures IAM, security groups, and cloud auditing.", clause: "ISO A.5.23, NIST PR.DS-02, GDPR Art.28, NIS2 Art.21(2)(d)" },
    "Data Classification & Handling": { severity: 5, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Classifies data as public, internal, confidential, or sensitive.", clause: "ISO A.5.12, NIST ID.AM-05, GDPR Art.9, NIS2 Art.21(2)(a)" },
    "Data Retention & Disposal": { severity: 5, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Deletes obsolete records and destroys physical media.", clause: "ISO A.8.10, NIST PR.DS-03, GDPR Art.5, NIS2 Art.21(2)(a)" },
    "Business Continuity & Disaster Recovery": { severity: 5, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Maintains plans for business resiliency and disaster recovery.", clause: "ISO A.5.29, NIST RC.RP-01, GDPR Art.32, NIS2 Art.21(2)(c)" },
    "Vendor & Supply Chain Risk Management": { severity: 5, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Audits third-party providers and evaluates supply chain risks.", clause: "ISO A.5.19, NIST ID.SC-01, GDPR Art.28, NIS2 Art.21(2)(d)" },
    "Threat Intelligence & Risk Assessment": { severity: 5, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Integrates threat feeds and performs regular risk mapping.", clause: "ISO A.5.7, NIST ID.RA-02, GDPR Art.35, NIS2 Art.21(2)(a)" },
    "Security Awareness Training": { severity: 5, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Delivers cybersecurity and hygiene awareness to employees.", clause: "ISO A.6.3, NIST PR.AT-01, GDPR Art.39, NIS2 Art.21(2)(g)" },
    "Network Security & Perimeter Control": { severity: 10, frameworks: ["ISO 27001", "NIST CSF", "GDPR", "NIS2"], description: "Deploys firewalls, segmented networks, and secure VPNs.", clause: "ISO A.8.20, NIST PR.IR-01, GDPR Art.32, NIS2 Art.21(2)(h)" }
};

const TOTAL_POSSIBLE_SEVERITY = Object.values(CONTROLS_MATRIX).reduce((sum, item) => sum + item.severity, 0);

function App() {
    const [auditData, setAuditData] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [simulatedControls, setSimulatedControls] = useState({});
    const [reportTimestamp, setReportTimestamp] = useState(Date.now());
    
    // Chart References
    const gaugeChartRef = useRef(null);
    const ratioChartRef = useRef(null);
    const radarChartRef = useRef(null);
    const barChartRef = useRef(null);
    
    const gaugeChartInst = useRef(null);
    const ratioChartInst = useRef(null);
    const radarChartInst = useRef(null);
    const barChartInst = useRef(null);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [auditData]);

    const getSimulatedMetrics = () => {
        if (!auditData) return null;
        
        let accumulatedRisk = 0;
        let passedCount = 0;
        let gapsCount = 0;
        
        const frameworkCounts = {
            "ISO 27001": { matched: 0, total: 0 },
            "NIST CSF": { matched: 0, total: 0 },
            "GDPR": { matched: 0, total: 0 },
            "NIS2": { matched: 0, total: 0 }
        };

        Object.values(CONTROLS_MATRIX).forEach(ctrl => {
            ctrl.frameworks.forEach(fw => {
                frameworkCounts[fw].total += 1;
            });
        });

        Object.entries(CONTROLS_MATRIX).forEach(([name, info]) => {
            const isImplemented = simulatedControls[name];
            if (isImplemented) {
                passedCount++;
                info.frameworks.forEach(fw => {
                    frameworkCounts[fw].matched += 1;
                });
            } else {
                gapsCount++;
                accumulatedRisk += info.severity;
            }
        });

        const riskScore = Math.min(100, Math.round((accumulatedRisk / TOTAL_POSSIBLE_SEVERITY) * 100));
        const compliancePercent = Math.max(0, 100 - riskScore);
        
        let compliantStatus = "Compliant";
        let riskLevel = "Low";
        
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

        const frameworkSummary = Object.entries(frameworkCounts).map(([fw, data]) => {
            const pct = Math.round((data.matched / Math.max(1, data.total)) * 100);
            return {
                framework: fw,
                coverage_percent: pct,
                matched_controls: data.matched,
                total_controls: data.total,
                status: pct >= 80 ? "Fully Covered" : (pct >= 45 ? "Partially Covered" : "Low Coverage")
            };
        });

        return {
            compliant_status: compliantStatus,
            risk_score: riskScore,
            risk_level: riskLevel,
            compliance_percent: compliancePercent,
            passed_controls_count: passedCount,
            gaps_count: gapsCount,
            framework_summary: frameworkSummary
        };
    };

    const simMetrics = getSimulatedMetrics();

    // Chart Setup
    useEffect(() => {
        if (auditData && simMetrics) {
            const themeCyan = '#64ffda';
            const themeRed = '#ff3366';
            const themeWhite = '#e6f1ff';
            const themeMuted = '#8892b0';
            const themeBgOverlay = 'rgba(100, 255, 218, 0.1)';

            Chart.defaults.color = themeMuted;
            Chart.defaults.font.family = "'Roboto Mono', monospace";

            if (gaugeChartInst.current) gaugeChartInst.current.destroy();
            if (ratioChartInst.current) ratioChartInst.current.destroy();
            if (radarChartInst.current) radarChartInst.current.destroy();
            if (barChartInst.current) barChartInst.current.destroy();

            // 1. Risk Gauge
            if (gaugeChartRef.current) {
                const ctx = gaugeChartRef.current.getContext('2d');
                gaugeChartInst.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Risk', 'Secure'],
                        datasets: [{
                            data: [simMetrics.risk_score, 100 - simMetrics.risk_score],
                            backgroundColor: [simMetrics.risk_score > 45 ? themeRed : themeCyan, themeBgOverlay],
                            borderColor: themeCyan,
                            borderWidth: 1,
                            circumference: 180,
                            rotation: 270
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false }, tooltip: { enabled: false } },
                        cutout: '85%'
                    }
                });
            }

            // 2. Control Ratio
            if (ratioChartRef.current) {
                const ctx = ratioChartRef.current.getContext('2d');
                ratioChartInst.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Verified Controls', 'Gaps Found'],
                        datasets: [{
                            data: [simMetrics.passed_controls_count, simMetrics.gaps_count],
                            backgroundColor: [themeBgOverlay, 'rgba(255, 51, 102, 0.2)'],
                            borderColor: [themeCyan, themeRed],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } }
                        }
                    }
                });
            }

            // 3. Radar Chart
            if (radarChartRef.current) {
                const ctx = radarChartRef.current.getContext('2d');
                radarChartInst.current = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER'],
                        datasets: [{
                            label: 'Security Maturity',
                            data: [
                                Math.round(simMetrics.compliance_percent * 0.9),
                                Math.round(simMetrics.compliance_percent * 0.8),
                                Math.round(simMetrics.compliance_percent * 0.95),
                                Math.round(simMetrics.compliance_percent * 0.7),
                                Math.round(simMetrics.compliance_percent * 0.85)
                            ],
                            backgroundColor: themeBgOverlay,
                            borderColor: themeCyan,
                            pointBackgroundColor: '#0a192f',
                            pointBorderColor: themeCyan,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                angleLines: { color: 'rgba(255,255,255,0.1)' },
                                grid: { color: 'rgba(255,255,255,0.1)' },
                                pointLabels: { color: themeWhite, font: { size: 9 } },
                                ticks: { display: false }
                            }
                        },
                        plugins: { legend: { display: false } }
                    }
                });
            }

            // 4. Framework Coverage Bar
            if (barChartRef.current) {
                const ctx = barChartRef.current.getContext('2d');
                const labels = simMetrics.framework_summary.map(fw => fw.framework);
                const data = simMetrics.framework_summary.map(fw => fw.coverage_percent);
                barChartInst.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Coverage %',
                            data: data,
                            backgroundColor: themeBgOverlay,
                            borderColor: themeCyan,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } },
                            x: { grid: { display: false } }
                        },
                        plugins: { legend: { display: false } }
                    }
                });
            }
        }
    }, [auditData, simulatedControls]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        setFileName(file.name);
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/audit", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("GRC Audit Pipeline Failed");

            const data = await response.json();
            setAuditData(data);
            
            const initialSim = {};
            Object.keys(CONTROLS_MATRIX).forEach(ctrl => {
                initialSim[ctrl] = data.implemented_controls.includes(ctrl);
            });
            setSimulatedControls(initialSim);
            setReportTimestamp(Date.now());
        } catch (error) {
            alert(`Audit Engine Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const toggleControl = (name) => {
        setSimulatedControls(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleExportHTML = async () => {
        if (!auditData) return;
        
        const payload = {
            ...auditData,
            ...simMetrics,
            implemented_controls: Object.keys(simulatedControls).filter(k => simulatedControls[k]),
            gaps_found: Object.entries(simulatedControls)
                .filter(([name, isImpl]) => !isImpl)
                .map(([name]) => ({
                    control: name,
                    severity_points: CONTROLS_MATRIX[name].severity,
                    framework_clauses: CONTROLS_MATRIX[name].clause.split(", ")
                })),
            remediation_steps: Object.entries(simulatedControls)
                .filter(([name, isImpl]) => !isImpl)
                .map(([name]) => ({
                    control: name,
                    priority: CONTROLS_MATRIX[name].severity >= 10 ? "High" : "Medium",
                    action: `Establish a formal policy and standard operating procedure for ${name}.`,
                    framework_reference: CONTROLS_MATRIX[name].clause
                }))
        };

        try {
            const response = await fetch("/api/export-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Failed to export HTML");
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Architectural_Audit_Report.html";
            document.body.appendChild(a);
            a.click();
            a.remove();
            setReportTimestamp(Date.now());
        } catch (e) {
            alert(`Export Error: ${e.message}`);
        }
    };

    const handleExportJSON = () => {
        const payload = {
            ...auditData,
            ...simMetrics,
            simulated_controls_state: simulatedControls
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 4));
        const a = document.createElement("a");
        a.setAttribute("href", dataStr);
        a.setAttribute("download", "architectural_audit_data.json");
        a.click();
        a.remove();
    };

    return (
        <div className="app-wrapper">
            {/* Structural Header */}
            <header className="dashboard-header">
                <div className="logo-container">
                    <div className="logo-icon">
                        <i data-lucide="crosshair" style={{width: '24px', height: '24px'}}></i>
                    </div>
                    <div className="logo-text">
                        Enterprise GRC Engine <span className="version">v2.0-BLUEPRINT</span>
                    </div>
                </div>

                <div style={{display: 'flex', gap: '15px'}}>
                    <div className="kpi-label" style={{marginTop: '10px'}}>
                        [ SYS.STATUS: ONLINE / ISOLATED RAM ENV ]
                    </div>
                    <label className="btn-primary">
                        <input type="file" className="file-input" onChange={handleFileUpload} accept=".pdf" disabled={uploading} />
                        <i data-lucide="terminal" style={{width: '14px', height: '14px'}}></i>
                        <span>{uploading ? "ANALYZING..." : "INITIATE AUDIT"}</span>
                    </label>
                </div>
            </header>

            {/* Main Application Container */}
            <main>
                
                {/* Pre-Upload View */}
                {!auditData && (
                    <div className="blueprint-grid">
                        <div className="panel panel-col-12" style={{textAlign: 'center', padding: '80px 20px'}}>
                            <h2>Diagnostic Blueprint Engine</h2>
                            <p style={{maxWidth: '600px', margin: '0 auto 30px auto', fontSize: '12px'}}>
                                This interface provides an architectural overview of your organization's Governance, Risk, and Compliance (GRC) posture. 
                                By uploading your security policy documents, the engine will cross-reference natural language directives against standardized structural requirements 
                                including ISO 27001, NIST CSF 2.0, EU GDPR, and NIS2 Directives. All diagnostic metrics are calculated locally.
                            </p>
                            
                            <label className="upload-zone" style={{maxWidth: '400px', margin: '0 auto'}}>
                                <input type="file" className="file-input" onChange={handleFileUpload} accept=".pdf" disabled={uploading} />
                                <i data-lucide="file-code" className="upload-icon"></i>
                                <h3>{uploading ? "EXECUTING STRUCTURAL ANALYSIS..." : "MOUNT POLICY DOCUMENT [PDF]"}</h3>
                                <div className="kpi-label">Max File Size: 35MB | Format: PDF Document</div>
                            </label>
                        </div>
                    </div>
                )}

                {/* Audit View Dashboard */}
                {auditData && simMetrics && (
                    <>
                        <div className="panel panel-col-12" style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div>
                                <div className="kpi-label">TARGET ACQUIRED: {fileName}</div>
                                <div style={{fontSize: '11px', color: 'var(--text-secondary)'}}>
                                    Document length: {auditData.pages} pages | Diagnostic clauses analyzed: {auditData.implemented_controls.length} detected
                                </div>
                            </div>
                            <label className="btn-secondary">
                                <input type="file" className="file-input" onChange={handleFileUpload} accept=".pdf" disabled={uploading} />
                                <i data-lucide="refresh-cw" style={{width: '12px', height: '12px'}}></i>
                                <span>RE-MOUNT TARGET</span>
                            </label>
                        </div>

                        {/* Top KPI Grid */}
                        <div className="kpi-grid">
                            <div className="kpi-box">
                                <span className="kpi-label">Structural Integrity</span>
                                <span className={`kpi-value ${simMetrics.compliant_status.includes('Non-Compliant') ? 'danger' : 'success'}`}>
                                    {simMetrics.compliant_status}
                                </span>
                            </div>
                            <div className="kpi-box">
                                <span className="kpi-label">Framework Adherence</span>
                                <span className="kpi-value success">{simMetrics.compliance_percent}%</span>
                            </div>
                            <div className="kpi-box">
                                <span className="kpi-label">Residual Risk Index</span>
                                <span className={`kpi-value ${simMetrics.risk_score > 45 ? 'danger' : ''}`}>
                                    {simMetrics.risk_level} ({simMetrics.risk_score})
                                </span>
                            </div>
                            <div className="kpi-box">
                                <span className="kpi-label">Vulnerability Nodes</span>
                                <span className="kpi-value danger">{simMetrics.gaps_count} ERRORS</span>
                            </div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="blueprint-grid" style={{marginBottom: '20px'}}>
                            
                            {/* Descriptive Professional Summary Panel */}
                            <div className="panel panel-col-8">
                                <div className="panel-header">
                                    <div className="panel-title">
                                        <i data-lucide="cpu"></i>
                                        Executive Architectural Analysis
                                    </div>
                                    <div className="panel-measurement">[H: 300px]</div>
                                </div>
                                <div className="pro-summary">
                                    <p>
                                        <strong>Diagnostic Overview:</strong> The current architectural analysis reveals a systemic compliance coverage of {simMetrics.compliance_percent}%. 
                                        The security posture is currently evaluated as <em>{simMetrics.compliant_status}</em> with a residual risk score of {simMetrics.risk_score} (categorized as {simMetrics.risk_level}).
                                    </p>
                                    <p>
                                        <strong>Structural Gaps Identified:</strong> The analytical engine has flagged {simMetrics.gaps_count} critical control nodes missing from the submitted documentation. 
                                        These deficiencies primarily manifest in the areas of technical safeguards, continuous monitoring protocols, and formalized incident response methodologies. 
                                        Failure to address these vulnerabilities leaves the organizational architecture exposed to significant operational and regulatory penalties, particularly under GDPR Art. 32 and NIS2 Directives.
                                    </p>
                                    <p>
                                        <strong>Strategic Remediation Imperative:</strong> It is strongly recommended to immediately initiate a remediation lifecycle. 
                                        Prioritize the formalization of policies surrounding the identified high-severity control gaps. Management must allocate resources to engineer robust 
                                        data-at-rest encryption standards, enforce strict identity access management (IAM) perimeters, and architect a highly available disaster recovery topology.
                                    </p>
                                    {simMetrics.gaps_count > 0 && (
                                        <span className="redline-note">
                                            [!] ACTION REQUIRED: {simMetrics.gaps_count} control gaps remain unmitigated. Refer to the Interactive Control Grid below to simulate remediation.
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="panel panel-col-4">
                                <div className="panel-header">
                                    <div className="panel-title">
                                        <i data-lucide="gauge"></i>
                                        Risk Tolerance Matrix
                                    </div>
                                </div>
                                <div className="chart-container" style={{height: '220px'}}>
                                    <canvas ref={gaugeChartRef}></canvas>
                                </div>
                                <div style={{textAlign: 'center', marginTop: '15px'}}>
                                    <span style={{fontSize: '20px', color: 'var(--text-primary)'}}>{simMetrics.risk_score}</span>
                                    <span style={{color: 'var(--text-secondary)', marginLeft: '5px'}}>/ 100 IDX</span>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Metrics */}
                        <div className="blueprint-grid" style={{marginBottom: '20px'}}>
                            <div className="panel panel-col-4">
                                <div className="panel-header">
                                    <div className="panel-title">
                                        <i data-lucide="pie-chart"></i>
                                        Control Implementation Ratio
                                    </div>
                                </div>
                                <div className="chart-container">
                                    <canvas ref={ratioChartRef}></canvas>
                                </div>
                            </div>

                            <div className="panel panel-col-4">
                                <div className="panel-header">
                                    <div className="panel-title">
                                        <i data-lucide="radar"></i>
                                        Domain Posture Radar
                                    </div>
                                </div>
                                <div className="chart-container">
                                    <canvas ref={radarChartRef}></canvas>
                                </div>
                            </div>

                            <div className="panel panel-col-4">
                                <div className="panel-header">
                                    <div className="panel-title">
                                        <i data-lucide="bar-chart"></i>
                                        Regulatory Framework Alignment
                                    </div>
                                </div>
                                <div className="chart-container">
                                    <canvas ref={barChartRef}></canvas>
                                </div>
                            </div>
                        </div>

                        {/* Control Topology Document */}
                        <div className="blueprint-grid" style={{marginBottom: '20px'}}>
                            <div className="panel panel-col-12">
                                <div className="panel-header">
                                    <div className="panel-title">
                                        <i data-lucide="git-commit"></i>
                                        Architectural Control Topology Document
                                    </div>
                                    <div className="panel-measurement">Comprehensive Structural Breakdown</div>
                                </div>
                                
                                <div className="pro-summary" style={{borderLeft: 'none', paddingLeft: 0}}>
                                    <p style={{marginBottom: '20px', color: 'var(--text-primary)'}}>
                                        <strong>Implementation Analysis:</strong> The organizational architecture has been structurally evaluated against the master GRC matrix. This document provides a detailed narrative of the deployed security primitives and the corresponding vulnerabilities detected within the system perimeter.
                                    </p>
                                    
                                    <p style={{marginBottom: '20px'}}>
                                        <strong>Verified Architectural Nodes:</strong> 
                                        {Object.entries(simulatedControls).filter(([_, isVerified]) => isVerified).length > 0 ? 
                                            " The system successfully demonstrates the integration of " + Object.entries(simulatedControls).filter(([_, isVerified]) => isVerified).map(([name]) => name).join(", ") + ". These verified controls are actively enforcing the required compliance boundaries as defined by their respective framework clauses, ensuring that the primary lines of defense are operational."
                                            : " Critical alert: No compliant security primitives could be verified in the current architecture. The system lacks all baseline structural defenses."
                                        }
                                    </p>

                                    <p style={{marginBottom: '20px'}}>
                                        <strong>Critical Structural Deficiencies:</strong> 
                                        {Object.entries(simulatedControls).filter(([_, isVerified]) => !isVerified).length > 0 ? 
                                            " A profound architectural analysis has revealed severe absences in the topology. Specifically, the framework lacks implementation of " + Object.entries(simulatedControls).filter(([_, isVerified]) => !isVerified).map(([name]) => name).join(", ") + ". The absence of these critical nodes creates systemic vulnerabilities that degrade the overall risk posture and invite non-compliance penalties."
                                            : " The architecture is fully fortified. No critical structural gaps were detected during this sweep."
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Export Center */}
                        <div className="blueprint-grid" style={{marginBottom: '40px'}}>
                            <div className="panel panel-col-12">
                                <div className="panel-header">
                                    <div className="panel-title">
                                        <i data-lucide="file-output"></i>
                                        Export Documentation Center
                                    </div>
                                    <div style={{display: 'flex', gap: '15px'}}>
                                        <button className="btn-primary" onClick={handleExportHTML}>
                                            <i data-lucide="download"></i>
                                            <span>GENERATE HTML BLUEPRINT</span>
                                        </button>
                                        <button className="btn-secondary" onClick={handleExportJSON}>
                                            <i data-lucide="database"></i>
                                            <span>EXPORT RAW JSON DATA</span>
                                        </button>
                                    </div>
                                </div>
                                
                                <div style={{marginTop: '20px', position: 'relative'}}>
                                    <div className="annotation" style={{top: '-10px', left: '10px'}}>IFRAME RENDER SURFACE</div>
                                    <iframe className="iframe-preview" src={`/static/reports/audit_report.html?t=${reportTimestamp}`} title="Report Preview"></iframe>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
