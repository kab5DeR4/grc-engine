import React, { useRef, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * InteractiveCursorGlowButton
 * 
 * Interactive CTA button featuring a cursor-tracking dynamic glow effect driven by CSS variables (--mouse-x, --mouse-y).
 * Includes smooth right-arrow SVG icon translation on hover.
 */
export function InteractiveCursorGlowButton({
  children,
  onClick,
  className = '',
  icon = <ArrowRight size={15} className="text-orange-400 dark:text-orange-500 transition-transform duration-200 group-hover:translate-x-1" />,
  ...props
}) {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    buttonRef.current.style.setProperty('--mouse-x', `${x}px`);
    buttonRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative isolate overflow-hidden rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-medium text-sm px-5 py-2.5 transition-all duration-200 border border-zinc-900 dark:border-zinc-100 active:scale-[0.98] shadow-sm cursor-pointer ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Glow Layer */}
      <div
        className={`pointer-events-none absolute -inset-px -z-10 rounded-lg transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(120px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249, 115, 22, 0.45), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Button Content with Right Arrow Icon */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon}
      </span>
    </button>
  );
}

export default InteractiveCursorGlowButton;
