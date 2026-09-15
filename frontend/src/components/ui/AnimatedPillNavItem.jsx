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
      className={`group relative overflow-hidden inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer select-none bg-zinc-100/90 dark:bg-zinc-900/90 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-800/60 ${
        isActive ? 'ring-1 ring-zinc-400 dark:ring-zinc-600 font-semibold' : ''
      } ${className}`}
    >
      {/* Rising Background Layer */}
      <span
        className={`absolute inset-0 pointer-events-none rounded-lg bg-zinc-900 dark:bg-zinc-100 transition-all duration-250 ease-out ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
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
