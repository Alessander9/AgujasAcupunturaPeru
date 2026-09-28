import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Truck, Gift, ShieldCheck, CreditCard, ArrowRight, Zap } from 'lucide-react';

const OFFERS = [
  {
    badge: 'OFERTA FLASH',
    badgeBg: 'bg-gradient-to-r from-red-600 to-amber-500 text-white',
    icon: Flame,
    title: 'Hasta 25% DCTO en Agujas Koreanas y Seirin',
    subtitle: 'Por compras por mayor en cajas de 500 y 1000 und',
    link: '/productos?promo=onsale'
  },
  {
    badge: 'ENVÍOS 24H',
    badgeBg: 'bg-[#C29B62] text-[#0A1E18]',
    icon: Truck,
    title: 'Envíos a todo el Perú',
    subtitle: 'Lima Metropolitana en 24h y Provincias vía Shalom / Olva',
    link: '/productos'
  },
  {
    badge: 'KITS COMPLETOS',
    badgeBg: 'bg-emerald-700 text-white',
    icon: Gift,
    title: 'Packs de Acupuntura, Moxas y Ventosas',
    subtitle: 'Equípate al mejor precio con insumos certificados',
    link: '/productos?type=kits'
  },
  {
    badge: 'PAGOS DIRECTOS',
    badgeBg: 'bg-purple-700 text-white',
    icon: CreditCard,
    title: 'Paga con Yape o Transferencia BCP',
    subtitle: 'Sin comisiones extra · Yape: 939 371 250',
    link: '/productos'
  },
  {
    badge: 'GARANTÍA CLÍNICA',
    badgeBg: 'bg-amber-600 text-white',
    icon: ShieldCheck,
    title: 'Acero Quirúrgico Grado Médico',
    subtitle: 'Esterilizadas con gas EO para máxima bioseguridad',
    link: '/sobre-nosotros'
  },
  {
    badge: 'ATENCIÓN RÁPIDA',
    badgeBg: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white',
    icon: Zap,
    title: 'Asesoría Terapéutica por WhatsApp',
    subtitle: 'Cotiza y coordina tu pedido en minutos',
    link: '/sobre-nosotros'
  }
];

export default function OffersMarquee() {
  return (
    <section className="bg-gradient-to-r from-[#071713] via-[#123329] to-[#071713] border-y border-[#C29B62]/35 shadow-inner overflow-hidden relative select-none py-2.5 sm:py-3 z-10">
      
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C29B62]/10 via-transparent to-transparent pointer-events-none" />

      {/* Marquee Track (Double array for seamless infinite scroll) */}
      <div className="flex animate-marquee-infinite items-center gap-6 sm:gap-10">
        {[...OFFERS, ...OFFERS].map((offer, index) => {
          const Icon = offer.icon;
          return (
            <Link
              key={`${offer.title}-${index}`}
              to={offer.link}
              className="inline-flex items-center gap-2.5 sm:gap-3 group shrink-0 px-2 py-1 rounded-full transition-all hover:bg-white/5"
            >
              {/* Badge */}
              <span className={`text-[9.5px] sm:text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs flex items-center gap-1 ${offer.badgeBg}`}>
                <Icon className="w-3 h-3" />
                <span>{offer.badge}</span>
              </span>

              {/* Offer Text */}
              <div className="flex items-center gap-1.5 text-xs sm:text-[12.5px]">
                <strong className="text-white font-bold group-hover:text-[#DFC499] transition-colors whitespace-nowrap">
                  {offer.title}
                </strong>
                <span className="text-[#EDE4D6]/70 hidden md:inline font-normal whitespace-nowrap">
                  • {offer.subtitle}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C29B62] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Decorative separator dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29B62]/50 ml-2 sm:ml-4" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
