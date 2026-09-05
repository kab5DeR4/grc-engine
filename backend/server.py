"""
GRC Engine Backend Application Server
FastAPI server featuring modular v1 REST API, CORS middleware,
and legacy PDF policy audit backward-compatibility.
"""

import io
import json
import os
import time
import logging
from typing import Dict, Any, List
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, RedirectResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from pypdf import PdfReader

from core.config import settings
from database import init_db
from api.v1.router import api_router
from audit_engine import audit_policy
from report_generator import generate_html_report

# setup logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger("grc_engine")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Infrastructure-First Compliance Discovery & Continuous Monitoring Platform",
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request duration & logging middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(round(process_time, 4))
    return response

# Global exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "error_code": exc.status_code}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.exception(f"Unhandled server error at {request.url.path}:")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error occurred.", "error": str(exc)}
    )

# Startup lifecycle hook
@app.on_event("startup")
async def on_startup():
    logger.info("Initializing database tables...")
    await init_db()
    logger.info("GRC Engine Backend startup complete.")

# Mount Modular API Router
app.include_router(api_router, prefix=settings.API_V1_STR)

# Ensure directories exist
os.makedirs("reports", exist_ok=True)
os.makedirs("static", exist_ok=True)

# Pydantic schemas for legacy endpoints
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

class FrameworkSummaryItem(BaseModel):
    framework: str
    coverage_percent: int
    matched_controls: int
    total_controls: int
    status: str

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

# Core health endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "service": "grc-engine-backend",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }

# Legacy PDF audit endpoint preserved
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
        
        text_pages = []
        for i, page in enumerate(reader.pages):
            txt = page.extract_text()
            if txt:
                text_pages.append(txt)
        
        policy_text = "\n".join(text_pages)
        if not policy_text.strip():
            logger.warning(f"Zero text extracted from PDF: {file.filename}")
            raise HTTPException(status_code=422, detail="Unable to extract text from the PDF file. Verify it is not an image scan.")
        
        logger.info("Running legacy PDF audit engine...")
        audit_result = audit_policy(policy_text)
        
        json_path = "reports/audit_report.json"
        html_path = "reports/audit_report.html"
        
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(audit_result, f, indent=4)
            
        generate_html_report(audit_result, output_path=html_path)
        logger.info("Saved reports successfully.")
        
        return audit_result

    except HTTPException as he:
        raise he
    except Exception as e:
        logger.exception("Internal server error during GRC audit pipeline:")
        raise HTTPException(status_code=500, detail=f"Internal audit engine error: {str(e)}")

@app.post("/api/export-report", tags=["Legacy PDF Audit"])
async def api_export_report(payload: SimulatedReportPayload):
    try:
        logger.info("Generating customized HTML report from simulated client state...")
        html_path = "reports/audit_report.html"
        data_dict = payload.dict()
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

# Mount static folders if present
if os.path.exists("reports"):
    app.mount("/static/reports", StaticFiles(directory="reports"), name="reports")

if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)

@app.get("/", include_in_schema=False)
async def read_root():
    if os.path.exists("static/index.html"):
        return FileResponse("static/index.html")
    return RedirectResponse(url="/docs")

if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting server on http://{settings.GRC_HOST}:{settings.GRC_PORT}")
    uvicorn.run("server:app", host=settings.GRC_HOST, port=settings.GRC_PORT, reload=False)
