import { useState } from 'react';
import { useDemoStore } from '../store/demoStore';
import RbacPermissionBanner from '../components/settings/RbacPermissionBanner';
import { Wrench } from 'lucide-react';

export default function FindingsPage() {
  const { findings, simulateRemediation, hasPermission } = useDemoStore();
  const [filter, setFilter] = useState('ALL');
  const canRemediate = hasPermission('simulate_remediation');

  const filtered = findings.filter(f => filter === 'ALL' || f.status === filter);

  return (
    <div className="w-full h-full bg-[#E7E3DA] text-[#1A1917] font-mono">
      
      <main className="py-12 px-6 md:px-12 space-y-8">
        {/* Page Header */}
        <div className="pb-6 hairline-b flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="mono-label text-[#9B3418] mb-2">RISK & DRIFT FINDINGS</div>
            <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
              Active Findings & <span className="serif-italic-pigment">Remediation SLA</span>
            </h1>
          </div>

          <div className="flex gap-2">
            {['ALL', 'OPEN', 'RESOLVED'].map(st => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`mono-label text-[10.5px] px-3 py-1.5 border cursor-pointer transition-colors ${
                  filter === st ? 'bg-[#1A1917] text-[#E7E3DA] border-[#1A1917]' : 'bg-transparent text-[#1A1917] border-[#1A1917]'
                }`}
              >
                [ {st} ]
              </button>
            ))}
          </div>
        </div>

        {/* RBAC restriction banner */}
        {!canRemediate && (
          <RbacPermissionBanner
            actionName="simulating automated control remediation"
            requiredRole="PLATFORM ADMIN or SECURITY ENGINEER"
          />
        )}

        {/* Findings List */}
        <div className="space-y-4">
          {filtered.map(item => {
            const isResolved = item.status === 'Resolved' || item.status === 'RESOLVED';
            return (
              <div key={item.id} className="p-6 bg-[#DCD7CB] hairline-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="mono-label text-[#9B3418] font-bold">{item.id}</span>
                    <span className="mono-label text-[10px] text-[#6E6A61]">{item.control || item.control_id}</span>
                    <span className="mono-label text-[9.5px] px-2 py-0.5 border border-[#9B3418] text-[#9B3418]">
                      {item.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="mono-label text-[10px] text-[#1A1917] font-semibold">{item.sla}</span>
                    <span className={`mono-label text-[9px] px-2 py-0.5 ${
                      isResolved ? 'bg-[#1A1917] text-[#E7E3DA]' : 'bg-[#9B3418] text-[#FFFFFF]'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h2 className="serif-heading text-[22px] font-bold text-[#1A1917] mb-3">{item.title}</h2>

                <div className="p-4 bg-[#E7E3DA] hairline-all mono-body text-[11.5px] text-[#4A4741]">
                  <span className="mono-label text-[10px] text-[#9B3418] block mb-1">REMEDIATION ACTION:</span>
                  {item.remediation}
                </div>

                {!isResolved && (
                  <div className="mt-4 pt-3 hairline-t flex justify-end">
                    {canRemediate ? (
                      <button
                        onClick={() => simulateRemediation(item.id, item.control || item.control_id)}
                        className="studio-btn-primary studio-btn text-[10px] py-1.5 px-3 flex items-center gap-1.5"
                      >
                        <Wrench size={12} />
                        <span>[ SIMULATE REMEDIATION ]</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="studio-btn opacity-50 cursor-not-allowed text-[10px] py-1.5 px-3 border-dashed"
                        title="Remediation simulation restricted for External Auditors and Read-Only Viewers."
                      >
                        [ REMEDIATION RESTRICTED: RBAC ]
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
