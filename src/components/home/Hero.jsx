import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/hero1.jpg',
    alt: 'Agujas Acupuntura Perú - Insumos Profesionales 1'
  },
  {
    id: 2,
    image: '/hero2.jpg',
    alt: 'Agujas Acupuntura Perú - Insumos Profesionales 2'
  },
  {
    id: 3,
    image: '/hero3.jpg',
    alt: 'Agujas Acupuntura Perú - Insumos Profesionales 3'
  },
  {
    id: 4,
    image: '/hero4.jpg',
    alt: 'Agujas Acupuntura Perú - Insumos Profesionales 4'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section
      id="hero-section"
      className="relative w-full bg-[#0A1E18] select-none"
      style={{ margin: 0, padding: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1672 / 941',
          position: 'relative',
        }}
      >
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              opacity: idx === currentSlide ? 1 : 0,
              pointerEvents: idx === currentSlide ? 'auto' : 'none',
              transition: 'opacity 900ms ease-in-out',
              zIndex: idx === currentSlide ? 1 : 0,
            }}
          >
            <img
              src={s.image}
              alt={s.alt}
              style={{
                display: 'block', width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center center',
                margin: 0, padding: 0, border: 'none',
              }}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* OVERLAY: botón VER PRODUCTOS */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 20,
            pointerEvents: 'none', display: 'flex',
            flexDirection: 'column', justifyContent: 'flex-end',
            alignItems: 'center', paddingBottom: '4%',
          }}
        >
          <Link
            to="/productos"
            className="pointer-events-auto inline-flex items-center gap-2 sm:gap-2.5 bg-[#C29B62] hover:bg-[#DFC499] text-[#0A1E18] px-6 py-2.5 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-full text-xs sm:text-sm md:text-base font-extrabold tracking-wider uppercase shadow-[0_8px_25px_rgba(0,0,0,0.5)] border border-[#EDE4D6]/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <span>Ver productos</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#0A1E18] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* FLECHA IZQUIERDA */}
        <button
          onClick={prevSlide}
          style={{ position: 'absolute', left: '1.5%', top: '50%', transform: 'translateY(-50%)', zIndex: 30 }}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white/85 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* FLECHA DERECHA */}
        <button
          onClick={nextSlide}
          style={{ position: 'absolute', right: '1.5%', top: '50%', transform: 'translateY(-50%)', zIndex: 30 }}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white/85 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* DOTS INDICADORES */}
        <div style={{ position: 'absolute', bottom: '2%', left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
          <div className="bg-black/40 backdrop-blur-md border border-white/20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-lg">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === i ? 'w-5 sm:w-8 bg-[#C29B62]' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
