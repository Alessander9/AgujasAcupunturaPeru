import React from 'react';
import {
  Sparkles,
  Truck,
  ShieldCheck,
  Award,
  Zap,
  Leaf,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

const MARQUEE_ITEMS = [
  {
    icon: <Truck className="h-4 w-4 text-[#A47C52]" />,
    text: "ENVÍOS RÁPIDOS A TODO EL PERÚ — LIMA Y PROVINCIAS",
    highlight: "100% SEGURO"
  },
  {
    icon: <ShieldCheck className="h-4 w-4 text-[#3F7D5B]" />,
    text: "AGUJAS DE ACUPUNTURA ESTÉRILES CERTIFICADAS",
    highlight: "CE, ISO & FDA"
  },
  {
    icon: <Leaf className="h-4 w-4 text-[#A47C52]" />,
    text: "LÍNEA EXCLUSIVA DE ACEITES AMAZONI-K 100% PUROS",
    highlight: "ORIGEN SELVA"
  },
  {
    icon: <Award className="h-4 w-4 text-[#E6D3BC]" />,
    text: "VENTA POR MAYOR Y MENOR PARA CLÍNICAS Y TERAPEUTAS",
    highlight: "PRECIOS ESPECIALES"
  },
  {
    icon: <Zap className="h-4 w-4 text-[#A47C52]" />,
    text: "CURSOS Y TALLERES CLÍNICOS PRESENCIALES Y ONLINE",
    highlight: "CONVOCATORIA 2026"
  },
  {
    icon: <PhoneCall className="h-4 w-4 text-[#3F7D5B]" />,
    text: "ASESORÍA CLÍNICA Y PEDIDOS DIRECTOS POR WHATSAPP",
    highlight: "ATENCIÓN INMEDIATA"
  }
];

export default function InfiniteMarqueeBanner() {
  return (
    <div className="relative w-full bg-[#16332B] text-[#F7F2EA] border-y border-[#A47C52]/40 overflow-hidden py-3 select-none shadow-md z-20">
      
      {/* Left and Right Subtle Soft Gradient Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#16332B] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#16332B] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track Moving Left to Right Infinitely */}
      <div className="animate-marquee-ltr flex items-center">
        {/* Set 1 */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`set1-${idx}`} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#23483C] border border-[#A47C52]/40 shadow-xs">
                {item.icon}
              </div>
              <span className="text-xs sm:text-[13px] font-extrabold tracking-wider uppercase text-[#F7F2EA] whitespace-nowrap">
                {item.text}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#A47C52]/90 text-white text-[10px] font-black tracking-widest uppercase">
                {item.highlight}
              </span>
              <span className="text-[#A47C52] text-sm ml-4 opacity-70">✦</span>
            </div>
          ))}
        </div>

        {/* Set 2 (Synchronized Duplicate for Seamless Loop) */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`set2-${idx}`} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#23483C] border border-[#A47C52]/40 shadow-xs">
                {item.icon}
              </div>
              <span className="text-xs sm:text-[13px] font-extrabold tracking-wider uppercase text-[#F7F2EA] whitespace-nowrap">
                {item.text}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#A47C52]/90 text-white text-[10px] font-black tracking-widest uppercase">
                {item.highlight}
              </span>
              <span className="text-[#A47C52] text-sm ml-4 opacity-70">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
