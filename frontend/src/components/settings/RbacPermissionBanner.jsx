import { memo } from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ROLES, ROLE_DETAILS } from '../../data/demo/rbac';

// banner shown when current rbac persona doesn't have permission fr
const RbacPermissionBanner = memo(({ actionName = 'this action', requiredRole = 'PLATFORM ADMIN' }) => {
  const { currentUser, setCurrentUserRole } = useDemoStore();
  const currentRoleDetail = ROLE_DETAILS[currentUser.role] || ROLE_DETAILS.PLATFORM_ADMIN;

  return (
    <div className="p-4 bg-[#9B3418]/10 border border-[#9B3418] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
      <div className="flex items-start gap-3">
        <ShieldAlert size={18} className="text-[#9B3418] shrink-0 mt-0.5" />
        <div>
          <div className="mono-label text-[#9B3418] font-bold text-[11px]">
            RBAC ACCESS RESTRICTION ACTIVE
          </div>
          <div className="text-[11.5px] text-[#4A4741] mt-0.5">
            Your current persona <span className="font-bold text-[#1A1917]">[{currentRoleDetail.name}]</span> is restricted from {actionName}. Requires <span className="font-bold text-[#9B3418]">[{requiredRole}]</span>.
          </div>
        </div>
      </div>

      <button
        onClick={() => setCurrentUserRole(ROLES.PLATFORM_ADMIN)}
        className="studio-btn studio-btn-pigment text-[10px] py-1 px-3 whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5"
      >
        <span>SWITCH TO ADMIN</span>
        <ArrowRight size={12} />
      </button>
    </div>
  );
});

RbacPermissionBanner.displayName = 'RbacPermissionBanner';

export default RbacPermissionBanner;
