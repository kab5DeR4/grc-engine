import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#1A1917] dark:bg-[#E7E3DA] text-[#E7E3DA] dark:text-[#1A1917] shadow-xl hover:bg-[#9B3418] dark:hover:bg-[#FF6B4A] dark:hover:text-[#1A1917] transition-all duration-300 group"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
