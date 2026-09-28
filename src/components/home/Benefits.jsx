import React from 'react';

const benefits = [
  {
    icon: 'verified_user',
    title: 'Garantía y Certificación',
    desc: 'Productos e insumos médicos con sellos internacionales CE, FDA e ISO para tu total tranquilidad.',
  },
  {
    icon: 'local_shipping',
    title: 'Envíos Rápidos a Todo el Perú',
    desc: 'Despachos seguros en Lima Metropolitana en 24h y a nivel nacional vía Olva Courier y Shalom.',
  },
  {
    icon: 'school',
    title: 'Docentes Especialistas',
    desc: 'Instructores con más de 15 años de experiencia clínica activa en Medicina Tradicional China.',
  },
  {
    icon: 'support_agent',
    title: 'Soporte Continuo',
    desc: 'Acompañamiento post-curso y asesoría técnica para resolver dudas clínicas en tu práctica diaria.',
  },
];

export default function Benefits() {
  return (
    <section className="py-16 md:py-20 bg-[#E6D3BC]/40 border-y border-[#E6D3BC] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="card-hover-effect flex flex-col items-start p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6D3BC]/80 hover:border-[#23483C] transition-all duration-300 shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F2EA] text-[#23483C] border border-[#E6D3BC] flex items-center justify-center mb-4 shadow-xs">
                <span className="material-symbols-outlined text-2xl text-[#23483C]">{b.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-[#202520] mb-2">
                {b.title}
              </h3>
              <p className="text-[#687067] text-sm leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
