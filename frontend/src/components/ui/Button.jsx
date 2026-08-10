import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  disabled = false,
  loading = false,
  ...props 
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  // simple button spinner support for loading states
  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="opacity-75">[ LOADING... ]</span> : children}
    </button>
  );
};

export default Button;
