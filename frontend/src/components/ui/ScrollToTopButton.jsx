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
      className="fixed bottom-6 right-6 z-50 py-2.5 px-4 bg-[#E7E3DA] dark:bg-[#161514] text-[#1A1917] dark:text-[#E7E3DA] hairline-all shadow-2xl hover:bg-[#1A1917] hover:text-[#E7E3DA] dark:hover:bg-[#FF6B4A] dark:hover:text-[#121110] transition-all duration-300 flex items-center gap-2 mono-label text-[10.5px] cursor-pointer group animate-fade-up"
      aria-label="Scroll to top"
    >
      <ArrowUp size={13} className="text-[#9B3418] dark:text-[#FF6B4A] group-hover:text-inherit group-hover:-translate-y-0.5 transition-transform" />
      <span>[ TOP ]</span>
    </button>
  );
}
