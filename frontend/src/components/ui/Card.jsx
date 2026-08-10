import styles from './Card.module.css';

// card dynamic elevation styling
const Card = ({ children, hoverable = false, className = '', ...props }) => {
  const hoverClass = hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : '';
  return (
    <div className={`${styles.card} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
