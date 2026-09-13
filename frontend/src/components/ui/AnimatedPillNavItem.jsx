import React, { useState } from 'react';

/**
 * AnimatedPillNavItem
 * 
 * High-performance pill navigation item with zero external animation dependencies.
 * Implements the rising circle fill effect and dual-label text slider using pure CSS transitions.
 */
export function AnimatedPillNavItem({ 
  label, 
  onClick, 
  isActive = false,
  className = ''
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 ${
        isActive ? 'ring-1 ring-zinc-400 dark:ring-zinc-600 font-semibold' : ''
      } ${className}`}
    >
      {/* Rising Circle Background Layer */}
      <span
        className={`absolute left-1/2 -bottom-4 -translate-x-1/2 rounded-full pointer-events-none bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ease-out ${
          isHovered ? 'w-48 h-48 -bottom-16 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-0'
        }`}
        aria-hidden="true"
      />

      {/* Dual Stack Text Labels */}
      <span className="relative z-10 inline-block leading-none py-0.5 overflow-hidden h-4">
        {/* Default Label: slides up on hover */}
        <span
          className={`block text-zinc-800 dark:text-zinc-200 transition-transform duration-300 ease-out ${
            isHovered ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {label}
        </span>
        
        {/* Hovered Label: slides in from bottom */}
        <span
          className={`absolute left-0 top-0.5 w-full text-center text-white dark:text-zinc-900 font-medium transition-all duration-300 ease-out ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          aria-hidden="true"
        >
          {label}
        </span>
      </span>
    </button>
  );
}

export default AnimatedPillNavItem;
