import { memo } from 'react';
import styles from './StatusBadge.module.css';
import { CheckCircle2, XCircle, AlertCircle, HelpCircle, Info } from 'lucide-react';

const statusConfig = {
  'PASS': { icon: CheckCircle2, className: styles.pass },
  'FAIL': { icon: XCircle, className: styles.fail },
  'CRITICAL': { icon: XCircle, className: styles.fail },
  'HIGH': { icon: AlertCircle, className: styles.fail },
  'MEDIUM': { icon: AlertCircle, className: styles.warning },
  'WARNING': { icon: AlertCircle, className: styles.warning },
  'LOW': { icon: Info, className: styles.info },
  'UNKNOWN': { icon: HelpCircle, className: styles.unknown },
  'NOT APPLICABLE': { icon: HelpCircle, className: styles.unknown },
  'VERIFIED': { icon: CheckCircle2, className: styles.pass },
  'IN PROGRESS': { icon: Activity, className: styles.info },
  'Connected': { icon: CheckCircle2, className: styles.pass },
  'Resolved': { icon: CheckCircle2, className: styles.pass },
  'Open': { icon: AlertCircle, className: styles.warning },
};

// Fallback icon for missing imports
function Activity(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
}

// status badge component memoized for quick rendering fr
const StatusBadge = memo(({ status, className = '' }) => {
  const config = statusConfig[status] || { icon: Info, className: styles.unknown };
  const Icon = config.icon;

  return (
    <span className={`${styles.badge} ${config.className} ${className}`}>
      <Icon className={styles.icon} />
      {status}
    </span>
  );
});

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;
