const App = () => {
    const [uploading, setUploading] = React.useState(false);
    const [auditData, setAuditData] = React.useState(null);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/audit", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setAuditData(data);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error running audit. Check console.");
        } finally {
            setUploading(false);
        }
    };

    const resetAudit = () => setAuditData(null);

    const downloadHtmlReport = () => {
        const a = document.createElement("a");
        a.href = "/static/reports/audit_report.html";
        a.download = "GRC_Audit_Report.html";
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const downloadPdfReport = () => {
        const iframe = document.querySelector('.iframe-preview');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.print();
        } else {
            window.open('/static/reports/audit_report.html', '_blank');
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
                                    <svg className="hidden md:block absolute top-10 left-[60%] w-[80%] h-12 text-hd-secondary" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
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
                                    <div className={`font-kalam text-4xl font-bold inline-block border-[3px] border-hd-border px-6 py-2 shadow-[4px_4px_0px_0px_#2d2d2d] rotate-2 ${auditData.compliant_status === 'Compliant' ? 'bg-[#d4edda] text-green-900' : 'bg-hd-accent text-white'}`}>
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
                                <iframe src={`/static/reports/audit_report.html?t=${Date.now()}`} className="iframe-preview"></iframe>
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
