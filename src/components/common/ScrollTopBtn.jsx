import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate scroll progress percentage (0 - 100)
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
        // Show only after scrolling down at least 52% of the entire page
        setVisible(progress >= 52);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // SVG Circular progress math (radius = 20, circumference = 2 * PI * 20 = 125.66)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 transition-all duration-300 ease-out ${
        visible
          ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
          : 'opacity-0 pointer-events-none translate-y-4 scale-90'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Volver arriba"
        title="Volver al inicio de la página"
        className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#16332B]/75 hover:bg-[#16332B] text-[#F7F2EA] border border-[#C29B62]/30 hover:border-[#C29B62] shadow-xl shadow-black/25 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
      >
        {/* Subtle Circular Scroll Progress Indicator */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 48 48"
        >
          {/* Track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="#EDE4D6"
            strokeWidth="1.5"
            strokeOpacity="0.15"
          />
          {/* Progress */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="transparent"
            stroke="#C29B62"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-5 h-5 text-[#C29B62] group-hover:text-white transition-all group-hover:-translate-y-0.5 duration-200" />
      </button>
    </div>
  );
}
