import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// page transition using Apple fluid spring physics and reduced motion respect fr
const PageTransition = memo(({ children }) => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      key={location.pathname}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.995 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.995 }}
      transition={
        shouldReduceMotion 
          ? { duration: 0.15 } 
          : { 
              type: "spring", 
              damping: 28, 
              stiffness: 320, 
              mass: 0.8 
            }
      }
      className="flex flex-col min-h-full w-full"
    >
      {children}
    </motion.div>
  );
});

PageTransition.displayName = 'PageTransition';

export default PageTransition;
