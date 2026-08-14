import { memo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// page transition wrapper memoized for clean frame animations fr
// keeps page layouts smooth across screen display scaling
const PageTransition = memo(({ children }) => {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col min-h-full w-full"
    >
      {children}
    </motion.div>
  );
});

PageTransition.displayName = 'PageTransition';

export default PageTransition;
