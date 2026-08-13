import { memo } from 'react';
import styles from './Card.module.css';

// card dynamic elevation styling - memoized for performance fr
const Card = memo(({ children, hoverable = false, className = '', ...props }) => {
  const hoverClass = hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : '';
  return (
    <div className={`${styles.card} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
