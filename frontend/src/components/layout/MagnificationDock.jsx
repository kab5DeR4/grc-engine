import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from 'framer-motion';
import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { NavLink } from 'react-router-dom';

function DockItem({
  children,
  className = '',
  onClick,
  href,
  index,
  mouseY,
  containerTop,
  spring,
  distance,
  magnification,
  baseItemSize,
  gap = 10,
  paddingTop = 16
}) {
  const isHovered = useMotionValue(0);

  // Calculate static center Y of this item's slot in viewport coordinates
  const mouseDistance = useTransform(mouseY, val => {
    if (val === Infinity || containerTop === null) return Infinity;
    const staticSlotCenterY = containerTop + paddingTop + index * (baseItemSize + gap) + baseItemSize / 2;
    return val - staticSlotCenterY;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  
  const size = useSpring(targetSize, spring);

  const inner = (
    <motion.div
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg bg-white border-2 border-charcoal/10 text-charcoal shadow-sm cursor-pointer transition-colors hover:bg-charcoal hover:text-yellow hover:border-charcoal",
        className
      )}
      tabIndex={0}
      role="button"
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child, { isHovered })
          : child
      )}
    </motion.div>
  );

  if (href) {
    return (
      <NavLink to={href} className={({ isActive }) => cn("block relative flex items-center justify-center", isActive && "text-yellow")}>
        {({ isActive }) => (
          <>
            {inner}
            {isActive && (
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-yellow border border-charcoal/20 shadow-sm rounded-sm"></div>
            )}
          </>
        )}
      </NavLink>
    );
  }

  return inner;
}

function DockLabel({ children, className = '', isHovered }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.12 }}
          className={cn(
            "absolute left-full ml-4 top-1/2 -translate-y-1/2 w-fit whitespace-pre rounded-md border-2 border-charcoal bg-white px-3 py-1.5 text-xs text-charcoal shadow-[4px_4px_0_0_rgba(23,30,25,1)] z-50 font-display uppercase tracking-widest pointer-events-none",
            className
          )}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={cn("flex items-center justify-center", className)}>{children}</div>;
}

export function MagnificationDock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 200, damping: 18 },
  magnification = 60,
  distance = 140,
  panelWidth = 72,
  baseItemSize = 40,
  gap = 10,
  paddingTop = 16
}) {
  const containerRef = useRef(null);
  const mouseY = useMotionValue(Infinity);
  const [containerTop, setContainerTop] = useState(null);

  const updateContainerTop = () => {
    if (containerRef.current) {
      setContainerTop(containerRef.current.getBoundingClientRect().top);
    }
  };

  useEffect(() => {
    updateContainerTop();
    window.addEventListener('resize', updateContainerTop);
    window.addEventListener('scroll', updateContainerTop);
    return () => {
      window.removeEventListener('resize', updateContainerTop);
      window.removeEventListener('scroll', updateContainerTop);
    };
  }, []);

  return (
    <div className="flex h-full items-center justify-start z-50 relative">
      <div
        ref={containerRef}
        onMouseEnter={updateContainerTop}
        onMouseMove={(e) => {
          if (containerTop === null) updateContainerTop();
          mouseY.set(e.clientY);
        }}
        onMouseLeave={() => {
          mouseY.set(Infinity);
        }}
        className={cn(
          "flex flex-col items-center h-fit rounded-xl border-2 border-charcoal/10 bg-white/90 backdrop-blur-2xl px-2 py-4 shadow-xl",
          className
        )}
        style={{ width: panelWidth, gap: `${gap}px` }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            index={index}
            href={item.href}
            onClick={item.onClick}
            className={item.className}
            mouseY={mouseY}
            containerTop={containerTop}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            gap={gap}
            paddingTop={paddingTop}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </div>
    </div>
  );
}
