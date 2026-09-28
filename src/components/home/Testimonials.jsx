import React from 'react';
import TestimonialMarqueeDemo from '../ui/marquee-01';
import { Star, Award } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="bg-[#F9F6F0] py-12 sm:py-16 border-b border-[#EDE4D6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        {/* Header with Google Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 bg-white text-[#202124] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#E8EAED] shadow-xs mb-2.5">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Google Reviews</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123329]">
              Con la confianza de terapeutas y profesionales
            </h2>
            <p className="text-xs sm:text-sm text-[#65726B] mt-1.5 max-w-xl">
              Más de 850 especialistas y centros de salud en todo el Perú recomiendan nuestros insumos.
            </p>
          </div>

          <div className="inline-flex items-center justify-center gap-3 bg-white px-5 py-3 rounded-2xl border border-[#E8EAED] shadow-[0_1px_3px_rgba(60,64,67,0.08)] self-center md:self-auto shrink-0">
            <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-[#202124]">4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-[#FBBC04]" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-[11px] font-medium text-[#5f6368] block">Excelente · +850 reseñas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Infinite Scrolling Testimonials */}
      <TestimonialMarqueeDemo />
    </section>
  );
}



