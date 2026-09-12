import { memo } from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { ROLES, ROLE_DETAILS } from '../../data/demo/rbac';

// banner shown when current rbac persona doesn't have permission fr
const RbacPermissionBanner = memo(({ actionName = 'this action', requiredRole = 'PLATFORM ADMIN' }) => {
  const { currentUser, setCurrentUserRole } = useDemoStore();
  const currentRoleDetail = ROLE_DETAILS[currentUser.role] || ROLE_DETAILS.PLATFORM_ADMIN;

  return (
    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-900 dark:text-slate-100 font-sans">
      <div className="flex items-start gap-3">
        <ShieldAlert size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            RBAC ACCESS RESTRICTION ACTIVE
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
            Your current persona <span className="font-semibold text-slate-900 dark:text-white">[{currentRoleDetail.name}]</span> is restricted from {actionName}. Requires <span className="font-semibold text-amber-700 dark:text-amber-400">[{requiredRole}]</span>.
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCurrentUserRole(ROLES.PLATFORM_ADMIN)}
        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
      >
        <span>SWITCH TO ADMIN</span>
        <ArrowRight size={12} />
      </button>
    </div>
  );
});

RbacPermissionBanner.displayName = 'RbacPermissionBanner';

export default RbacPermissionBanner;
