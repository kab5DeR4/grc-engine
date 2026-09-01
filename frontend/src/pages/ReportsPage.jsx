import { useDemoStore } from '../store/demoStore';
import { ROLES } from '../data/demo/rbac';
import RbacPermissionBanner from '../components/settings/RbacPermissionBanner';

export default function ReportsPage() {
  const { hasPermission, appendAuditLog, currentUser } = useDemoStore();
  const canExport = hasPermission('export_pdf');

  const handlePrint = () => {
    if (!canExport) return;
    appendAuditLog(
      'ATTESTATION_PDF_EXPORTED',
      'REPORT_VOL_04_SOC2_NIST',
      'INFO',
      `User ${currentUser.name} generated cryptographic attestation export package.`
    );
    window.print();
  };

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12 space-y-8">
        {/* Page Header */}
        <div className="pb-6 hairline-b flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="mono-label text-[#9B3418] mb-2">GRC COMPLIANCE REPORTING</div>
            <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
              Executive Audit & <span className="serif-italic-pigment">Attestation Report</span>
            </h1>
          </div>
          {canExport ? (
            <button 
              onClick={handlePrint}
              className="studio-btn-primary studio-btn text-[11px]"
            >
              [ PRINT / EXPORT PDF ]
            </button>
          ) : (
            <button 
              disabled
              className="studio-btn opacity-50 cursor-not-allowed text-[10.5px] border-dashed"
              title="PDF attestation export is restricted for Read-Only Viewers."
            >
              [ EXPORT RESTRICTED: RBAC ]
            </button>
          )}
        </div>

        {/* RBAC Banner if user cannot export */}
        {!canExport && (
          <RbacPermissionBanner
            actionName="exporting official attestation PDF reports"
            requiredRole="EXTERNAL AUDITOR, SECURITY ENGINEER, or ADMIN"
          />
        )}

        {/* Printable Report Document Card */}
        <div className="bg-[#E7E3DA] p-8 md:p-12 hairline-all max-w-4xl mx-auto">
          {/* Report Header */}
          <div className="flex justify-between items-start pb-8 hairline-b">
            <div>
              <div className="serif-heading text-[32px] font-bold text-[#1A1917]">
                ATELIER GRC ENGINE<span className="text-[#9B3418]">.</span>
              </div>
              <div className="mono-label text-[10.5px] text-[#6E6A61] mt-1">
                SYSTEM ATTESTATION REPORT — VOL. 04 / 2026
              </div>
            </div>
            <div className="text-right mono-label text-[10.5px]">
              <div className="text-[#9B3418]">VERIFIED PASS</div>
              <div className="text-[#6E6A61] mt-1">DATE: 2026.08.09</div>
            </div>
          </div>

          {/* Framework Scorecard Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            <div className="p-4 bg-[#DCD7CB] hairline-all">
              <div className="mono-label text-[9.5px] text-[#9B3418]">SOC 2 TYPE II</div>
              <div className="serif-heading text-[24px] font-bold text-[#1A1917] mt-1">100% PASS</div>
              <div className="mono-label text-[9px] text-[#6E6A61]">CC6.1 - CC6.8</div>
            </div>

            <div className="p-4 bg-[#DCD7CB] hairline-all">
              <div className="mono-label text-[9.5px] text-[#9B3418]">NIST SP 800-53</div>
              <div className="serif-heading text-[24px] font-bold text-[#1A1917] mt-1">99.8% COMPLIANT</div>
              <div className="mono-label text-[9px] text-[#6E6A61]">HIGH IMPACT BASELINE</div>
            </div>

            <div className="p-4 bg-[#DCD7CB] hairline-all">
              <div className="mono-label text-[9.5px] text-[#9B3418]">ISO 27001:2022</div>
              <div className="serif-heading text-[24px] font-bold text-[#1A1917] mt-1">100% VERIFIED</div>
              <div className="mono-label text-[9px] text-[#6E6A61]">ANNEX A CONTROLS</div>
            </div>

            <div className="p-4 bg-[#DCD7CB] hairline-all">
              <div className="mono-label text-[9.5px] text-[#9B3418]">HIPAA SECURITY</div>
              <div className="serif-heading text-[24px] font-bold text-[#1A1917] mt-1">FULLY CONFORMANT</div>
              <div className="mono-label text-[9px] text-[#6E6A61]">§164.312 RULES</div>
            </div>
          </div>

          {/* Summary Attestation Text */}
          <div className="space-y-4 mono-body text-[12.5px] text-[#4A4741] pt-6 hairline-t">
            <p>
              This document certifies that all 482 technical security controls within the target infrastructure have been continuously evaluated by the ATELIER GRC Engine telemetry framework.
            </p>
            <p>
              All cryptographic key rotation policies, identity role bindings, audit log hashes, and network perimeter rules have been mathematically verified without exception.
            </p>
          </div>

          {/* Hardware Signature Strip */}
          <div className="mt-12 pt-6 hairline-t flex flex-col sm:flex-row justify-between items-center text-[10.5px] mono-label text-[#6E6A61]">
            <div>SIGNATURE HASH: e3b0c44298fc1c149afbf4c8996fb924</div>
            <div className="mt-2 sm:mt-0 text-[#9B3418]">FIPS 140-3 HSM SIGNED</div>
          </div>
        </div>
      </main>
    </div>
  );
}
