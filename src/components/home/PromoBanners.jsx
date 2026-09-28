import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import '../ui/FlowingMenu.css';

const promoCardsData = [
  {
    id: 'kits',
    tag: 'Kits Clínicos',
    title: 'Todo para comenzar',
    description: 'Kits completos y esenciales para estudiantes y nuevos terapeutas.',
    ctaText: 'Ver kits',
    link: '/productos?filter=kits',
    image: '/img_productos/index-sect-1-opt.webp',
    accentColor: '#123329',
    marqueeBgColor: '#123329',
    marqueeTextColor: '#F9F6F0',
    marqueeText: 'TODO PARA COMENZAR • KITS CLÍNICOS • VER AHORA •',
    badge: null
  },
  {
    id: 'practica',
    tag: 'Equipos Pro',
    title: 'Potencia tu práctica',
    description: 'Aparatología e insumos médicos de alta precisión clínica.',
    ctaText: 'Explorar',
    link: '/productos?cat=Fisioterapia',
    image: '/img_productos/index-sect-2-opt.webp',
    accentColor: '#1B4538',
    marqueeBgColor: '#1B4538',
    marqueeTextColor: '#EDE4D6',
    marqueeText: 'POTENCIA TU PRÁCTICA • EQUIPOS PRO • ALTA PRECISIÓN •',
    badge: null
  },
  {
    id: 'ofertas',
    tag: 'Promoción',
    title: 'Ofertas especiales',
    description: 'Descuentos exclusivos y precios de liquidación en insumos.',
    ctaText: 'Ver ofertas',
    link: '/productos?filter=ofertas',
    image: '/img_productos/index-sect-3-opt.webp',
    accentColor: '#D84A38',
    marqueeBgColor: '#D84A38',
    marqueeTextColor: '#FFFFFF',
    marqueeText: 'OFERTAS EXCLUSIVAS • HASTA 40% DSCTO • APROVECHA HOY •',
    badge: null
  }
];

function PromoCardItem({
  tag,
  title,
  description,
  ctaText,
  link,
  image,
  accentColor,
  marqueeBgColor,
  marqueeTextColor,
  marqueeText,
  badge,
  speed = 10
}) {
  const navigate = useNavigate();
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.5, ease: 'expo.out' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.flowing-marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth || 300;
      const cardWidth = itemRef.current?.offsetWidth || window.innerWidth;
      const needed = Math.ceil((cardWidth * 2) / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [marqueeText, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.flowing-marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 40);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [marqueeText, image, repetitions, speed]);

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div
      ref={itemRef}
      onClick={() => navigate(link)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flowing-card relative min-h-[240px] sm:min-h-[260px] rounded-3xl border border-[#E8DFC8]/90 overflow-hidden group shadow-xs hover:shadow-2xl transition-all duration-300 select-none cursor-pointer flex flex-col justify-between p-5 sm:p-6"
    >
      {/* Imagen que ocupa TODA la tarjeta */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
      />

      {/* Difuminado suave para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20 sm:max-w-[65%] pointer-events-none" />

      {/* Badge flotante opcional (si aplica) */}
      {badge && (
        <div className="absolute top-3.5 right-3.5 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D84A38] text-white flex flex-col items-center justify-center text-center shadow-md rotate-12 pointer-events-none">
          <span className="text-[7.5px] font-extrabold leading-none uppercase">{badge.sub}</span>
          <span className="text-[11px] sm:text-xs font-black leading-tight">{badge.discount}</span>
          <span className="text-[7px] font-bold leading-none uppercase">{badge.foot}</span>
        </div>
      )}

      {/* Contenido textual */}
      <div className="relative z-10 max-w-[58%] sm:max-w-[55%] flex flex-col justify-between h-full">
        <div>
          {/* Eyebrow Pill */}
          {tag && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#123329] bg-white/85 backdrop-blur-xs border border-[#E8DFC8] px-2.5 py-0.5 rounded-full mb-2.5 shadow-2xs">
              {tag}
            </span>
          )}

          {/* Título Principal */}
          <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#123329] leading-tight mb-1.5 group-hover:text-[#1B4538] transition-colors">
            {title}
          </h3>

          {/* Descripción */}
          <p className="text-xs sm:text-[13px] text-[#404D46] font-medium leading-snug line-clamp-2 mb-4">
            {description}
          </p>
        </div>

        {/* Botón CTA interactivo */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-[#123329] text-[#123329] hover:text-[#EDE4D6] border border-[#E0D5C3] text-xs font-bold shadow-2xs transition-all duration-300 backdrop-blur-xs">
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* OVERLAY FLOWING MARQUEE — Premium Edition */}
      <div
        className="flowing-marquee"
        ref={marqueeRef}
        style={{
          backgroundColor: marqueeBgColor,
          '--fm-bg': `url(${image})`
        }}
      >
        {/* ── CENTRE GLASS PANEL ── */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 py-6 px-5">
          {/* Glassmorphism tag pill */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-[#C29B62]/50 text-[#EDE4D6] text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C29B62] animate-pulse" />
            {tag}
          </span>

          {/* Big title */}
          <h3 className="text-white text-2xl sm:text-3xl font-serif-title font-black text-center leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            {title}
          </h3>

          {/* Description line */}
          <p className="text-[#EDE4D6]/85 text-xs sm:text-sm text-center max-w-[230px] leading-relaxed font-medium">
            {description}
          </p>

          {/* CTA pill button */}
          <div className="mt-1 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C29B62] hover:bg-[#D4AC72] text-[#0A1E18] text-xs sm:text-sm font-extrabold shadow-lg transition-all duration-300 group-hover:scale-105">
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* ── MARQUEE STRIP ── */}
        <div className="flowing-marquee__inner-wrap mt-auto">
          <div className="flowing-marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div
                className="flowing-marquee__part"
                key={idx}
                style={{ color: marqueeTextColor }}
              >
                <span>{marqueeText}</span>
                <div
                  className="flowing-marquee__img"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PromoBanners() {
  return (
    <section className="bg-white py-10 sm:py-12 border-b border-[#EDE4D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {promoCardsData.map((card) => (
            <PromoCardItem key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
