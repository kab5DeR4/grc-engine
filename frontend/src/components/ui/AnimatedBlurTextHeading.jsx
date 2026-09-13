import React, { memo, useRef, useState, useEffect } from 'react';

/**
 * AnimatedBlurTextHeading (H3 / customizable tag)
 * Styled with Tailwind CSS: responsive sizing, tight letter tracking, smooth color transitions.
 * Features a staggered per-letter animation that fades in, slides up, and reduces blur.
 * Uses IntersectionObserver so it triggers dynamically when scrolled into view.
 */
export const AnimatedBlurTextHeading = memo(function AnimatedBlurTextHeading({
  children,
  text,
  className = '',
  as = 'h3',
  delay = 0,
  stagger = 0.025,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  ...props
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const content = text || (typeof children === 'string' ? children : '');
  const Component = as;
  const words = content.split(' ');

  let globalCharIndex = 0;

  return (
    <Component
      ref={containerRef}
      className={`font-semibold tracking-tight transition-colors duration-300 ${className}`}
      {...props}
    >
      <span className="sr-only">{content}</span>
      <span aria-hidden="true" className="inline-block">
        {words.map((word, wordIdx) => {
          const chars = Array.from(word);
          return (
            <span key={`w-${wordIdx}`} className="inline-block whitespace-nowrap">
              {chars.map((char, charIdx) => {
                const charDelay = delay + globalCharIndex * stagger;
                globalCharIndex += 1;

                return (
                  <span
                    key={`c-${wordIdx}-${charIdx}`}
                    className="inline-block transition-all ease-out"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      filter: isVisible ? 'blur(0px)' : 'blur(12px)',
                      transform: isVisible ? 'translateY(0px)' : 'translateY(16px)',
                      transitionDuration: `${duration}s`,
                      transitionDelay: `${charDelay}s`,
                      transitionProperty: 'opacity, filter, transform',
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              {wordIdx < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          );
        })}
      </span>
    </Component>
  );
});

AnimatedBlurTextHeading.displayName = 'AnimatedBlurTextHeading';

export default AnimatedBlurTextHeading;

