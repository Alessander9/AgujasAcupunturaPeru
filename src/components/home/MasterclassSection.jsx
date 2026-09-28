import React from 'react';
import { masterclasses } from '../../data/coursesData';

export default function MasterclassSection() {
  return (
    <section id="masterclass" className="py-16 md:py-24 bg-[#F7F2EA] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6D3BC]/70 border border-[#A47C52]/40 text-[#23483C] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-base text-[#A47C52]">workspace_premium</span>
            Especialización Clínica Avanzada
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#202520] tracking-tight">
            Masterclasses de Alto Impacto
          </h2>
          <p className="mt-3 text-[#687067] text-base">
            Sesiones intensivas enfocadas en protocolos clínicos específicos y resolución de casos complejos.
          </p>
        </div>

        {/* Masterclasses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {masterclasses.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E6D3BC]/80 p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-xs hover:shadow-xl hover:border-[#23483C] transition-all duration-300"
            >
              <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden bg-[#F7F2EA] flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E6D3BC] text-[#23483C] border border-[#A47C52]/30 text-xs font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <span className="text-xs text-[#687067] font-medium">
                    {item.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#202520] mb-2">
                  {item.title}
                </h3>

                <p className="text-[#687067] text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#E6D3BC]/50">
                  <span className="text-lg font-extrabold text-[#23483C]">
                    {item.price}
                  </span>

                  <a
                    href={`https://wa.me/51940176461?text=Hola%2C%20deseo%20inscribirme%20a%20la%20Masterclass%3A%20${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#23483C] hover:bg-[#16332B] text-[#F7F2EA] font-bold text-xs sm:text-sm transition-all shadow-sm"
                  >
                    Inscribirme
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
