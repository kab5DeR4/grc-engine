import io
import json
import os
import logging
from typing import Dict, Any, List
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Response
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from pypdf import PdfReader

from audit_engine import audit_policy
from report_generator import generate_html_report

# setup logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="GRC Audit Server",
    description="GRC Audit API",
    version="1.0.0"
)

# Ensure directories exist
os.makedirs("reports", exist_ok=True)
os.makedirs("static", exist_ok=True)

# models
class FrameworkSummaryItem(BaseModel):
    framework: str
    coverage_percent: int
    matched_controls: int
    total_controls: int
    status: str

class GapItem(BaseModel):
    control: str
    severity_points: int
    framework_clauses: List[str]
    issue: str = ""

class RemediationItem(BaseModel):
    control: str
    priority: str
    action: str
    framework_reference: str

class SimulatedReportPayload(BaseModel):
    compliant_status: str
    risk_score: int
    risk_level: str
    compliance_percent: int
    total_controls: int = 19
    passed_controls_count: int
    gaps_count: int
    summary: str
    implemented_controls: List[str]
    evidence_map: Dict[str, str] = {}
    gaps_found: List[GapItem]
    remediation_steps: List[RemediationItem]
    framework_summary: List[FrameworkSummaryItem]

# endpoints

# quick backend health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "grc-audit-backend"}

# legacy PDF audit endpoint preserved under both legacy and standard paths
@app.post("/api/legacy/audit", tags=["Legacy PDF Audit"])
@app.post("/api/audit", tags=["Legacy PDF Audit"])
async def api_audit(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):

        logger.error(f"Invalid file extension uploaded: {file.filename}")
        raise HTTPException(status_code=400, detail="Only standard PDF policy files are accepted.")

    try:
        logger.info(f"Received PDF policy audit request: {file.filename}")
        content = await file.read()
        pdf_stream = io.BytesIO(content)
        reader = PdfReader(pdf_stream)
        
        # Read text page-by-page (memory-optimized)
        text_pages = []
        for i, page in enumerate(reader.pages):
            txt = page.extract_text()
            if txt:
                text_pages.append(txt)
        
        policy_text = "\n".join(text_pages)
        if not policy_text.strip():
            logger.warning(f"Zero text extracted from PDF: {file.filename}")
            raise HTTPException(status_code=422, detail="Unable to extract text from the PDF file. Verify it is not an image scan.")
        
        # run engine
        logger.info("Running scan...")
        audit_result = audit_policy(policy_text)
        
        # save reports
        json_path = "reports/audit_report.json"
        html_path = "reports/audit_report.html"
        
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(audit_result, f, indent=4)
            
        generate_html_report(audit_result, output_path=html_path)
        logger.info("Saved reports.")
        
        return audit_result

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.exception("Internal server error during GRC audit pipeline:")
        raise HTTPException(status_code=500, detail=f"Internal audit engine error: {str(e)}")

@app.post("/api/export-report")
async def api_export_report(payload: SimulatedReportPayload):
    try:
        logger.info("Generating customized HTML report from simulated client state...")  # generate report
        html_path = "reports/audit_report.html"
        
        # Convert Pydantic model to plain dictionary object
        data_dict = payload.dict()
        
        # Render HTML
        generate_html_report(data_dict, output_path=html_path)
        
        if not os.path.exists(html_path):
            raise HTTPException(status_code=500, detail="HTML report generation failed.")
            
        return FileResponse(
            path=html_path, 
            media_type="text/html", 
            filename="GRC_Audit_Report.html"
        )
    except Exception as e:
        logger.exception("Error exporting simulated HTML report:")
        raise HTTPException(status_code=500, detail=f"Report export failed: {str(e)}")

# static files

app.mount("/static/reports", StaticFiles(directory="reports"), name="reports")

# Serve general frontend assets (style.css, app.js)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)

@app.get("/", include_in_schema=False)
async def read_root():
    return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    import os
    
    host = os.getenv("GRC_HOST", "127.0.0.1")  # default to localhost
    port = int(os.getenv("GRC_PORT", "8000"))
    
    logger.info(f"starting server on http://{host}:{port}")
    uvicorn.run("server:app", host=host, port=port, reload=False)
