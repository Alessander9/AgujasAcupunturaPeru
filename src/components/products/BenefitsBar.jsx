import React from 'react';
import { Truck, ShieldCheck, Award, Headphones } from 'lucide-react';

export default function BenefitsBar() {
  const benefits = [
    {
      icon: Truck,
      title: 'Envíos a todo el Perú',
      subtitle: 'Rápido y seguro'
    },
    {
      icon: ShieldCheck,
      title: 'Pagos seguros',
      subtitle: 'Yape · Transferencia BCP Soles'
    },
    {
      icon: Award,
      title: 'Productos profesionales',
      subtitle: 'Selección especializada'
    },
    {
      icon: Headphones,
      title: 'Atención personalizada',
      subtitle: 'Te asesoramos por WhatsApp'
    }
  ];

  return (
    <section className="bg-white border-y border-[#EDE4D6] py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#F9F6F0]/60 border border-[#EDE4D6]/50 hover:bg-[#F9F6F0] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#123329] text-[#C29B62] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#18221D] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#65726B] font-medium mt-0.5">
                    {item.subtitle}
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
