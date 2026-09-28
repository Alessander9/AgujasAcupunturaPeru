import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const BENEFITS = [
  {
    icon: Truck,
    title: 'Envíos a todo el Perú',
    description: 'Rápido y seguro',
  },
  {
    icon: RotateCcw,
    title: 'Cambios y devoluciones',
    description: 'Sin complicaciones',
  },
  {
    icon: ShieldCheck,
    title: 'Pagos 100% seguros',
    description: 'Yape y Transferencia BCP Soles',
  },
  {
    icon: Headphones,
    title: 'Atención personalizada',
    description: 'Te asesoramos por WhatsApp',
  },
];

export default function BenefitsBar() {
  return (
    <section className="bg-white py-8 sm:py-10 border-t border-b border-[#EDE4D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-center gap-3.5 group cursor-default transition-transform duration-200 hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-2xl bg-[#F9F6F0] border border-[#EDE4D6] text-[#123329] flex items-center justify-center shrink-0 group-hover:bg-[#123329] group-hover:text-[#EDE4D6] group-hover:border-[#123329] group-hover:shadow-md transition-all duration-300">
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#18221D] group-hover:text-[#123329] leading-tight transition-colors">
                    {b.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#65726B] mt-0.5">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
