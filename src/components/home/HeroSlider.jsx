import React, { useState, useEffect, useRef } from 'react';
import { slides } from '../../data/slidesData';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Play } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoSlide();
  };

  return (
    <section 
      id="hero-slider" 
      className="relative w-full h-[calc(100vh-5rem)] min-h-[640px] max-h-[960px] overflow-hidden bg-[#16332B] group select-none flex items-center"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Cinematic Depth & Soft Lighting */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-[12000ms] ease-out"
                style={{ transform: isActive ? 'scale(1.06)' : 'scale(1.0)' }}
              />
              {/* Refined gradient overlay for high contrast readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#16332B]/95 via-[#16332B]/75 to-[#16332B]/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16332B] via-transparent to-black/20" />
            </div>

            {/* Slide Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center py-12">
              <div className="max-w-2xl text-[#F7F2EA] space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                
                {/* Pill Tag */}
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E6D3BC] text-xs sm:text-[13px] font-bold tracking-wide backdrop-blur-md shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#E6D3BC] animate-pulse" />
                    <span>{slide.badge}</span>
                  </div>
                )}
                
                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
                  {slide.title}{' '}
                  {slide.titleHighlight && (
                    <span className="text-[#E6D3BC] drop-shadow-md">
                      {slide.titleHighlight}
                    </span>
                  )}
                </h1>

                {/* Subtitle / Description */}
                <p className="text-[#F7F2EA]/85 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  {slide.primaryBtn && (
                    <a
                      href={slide.primaryBtn.href}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#A47C52] hover:bg-[#B56F55] text-white font-bold text-xs sm:text-sm shadow-xl shadow-black/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{slide.primaryBtn.text}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}

                  {slide.secondaryBtn && (
                    <a
                      href={slide.secondaryBtn.href}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F2EA] font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {slide.secondaryBtn.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ULTRA-PREMIUM SLEEK GLASS ARROWS */}
      <button
        onClick={prevSlide}
        aria-label="Slide anterior"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-60 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide siguiente"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-60 hover:opacity-100 hover:scale-105 active:scale-95 shadow-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* MINIMALIST SLEEK CAPSULE INDICATOR BAR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg">
        <span className="text-[10px] font-bold tracking-widest text-[#E6D3BC]/80 pl-1">
          0{currentSlide + 1} / 0{slides.length}
        </span>
        <div className="h-2.5 w-px bg-white/20" />
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide
                  ? 'w-7 bg-[#E6D3BC] shadow-[0_0_8px_rgba(230,211,188,0.6)]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
