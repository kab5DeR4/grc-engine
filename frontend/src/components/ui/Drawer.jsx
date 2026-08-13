import { memo } from 'react';
import { X } from 'lucide-react';
import styles from './Drawer.module.css';

// side drawer component memoized to skip extra renders fr
const Drawer = memo(({ isOpen, onClose, title, children, width = '500px' }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.drawer} style={{ width }}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
