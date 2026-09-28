import React from 'react';
import { onlineCourses } from '../../data/coursesData';

export default function OnlineCourses() {
  return (
    <section id="cursos-online" className="py-16 md:py-24 bg-[#E6D3BC]/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F2EA] border border-[#E6D3BC] text-[#23483C] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-base text-[#A47C52]">laptop_mac</span>
              Aprende a tu Propio Ritmo
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#202520] tracking-tight">
              Cursos Online con Certificación
            </h2>
            <p className="mt-2 text-[#687067] text-base max-w-xl">
              Plataforma disponible 24/7, acceso de por vida a los módulos y asesoría personalizada directa con docentes.
            </p>
          </div>

          <a
            href="https://wa.me/51940176461?text=Hola%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20cat%C3%A1logo%20de%20cursos%20online"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#23483C] hover:bg-[#16332B] text-[#F7F2EA] font-bold text-sm transition-all duration-200 shadow-md shadow-[#23483C]/15 self-start md:self-auto hover:gap-3"
          >
            Solicitar Temarios PDF
            <span className="material-symbols-outlined text-base">download</span>
          </a>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {onlineCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-[#FFFFFF] rounded-2xl border border-[#E6D3BC]/80 overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#23483C] transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#F7F2EA]">
                <img
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16332B]/75 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {course.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#A47C52] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-md">
                    {course.badge}
                  </span>
                )}

                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#16332B]/85 text-[#E6D3BC] text-xs backdrop-blur-sm">
                  <span className="material-symbols-outlined text-sm text-[#E6D3BC]">schedule</span>
                  {course.duration}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-xs text-[#A47C52] font-bold">
                  <div className="flex items-center text-[#A47C52]">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                  </div>
                  <span className="text-[#687067] font-medium">({course.modules})</span>
                </div>

                <h3 className="font-bold text-[#202520] text-xl group-hover:text-[#23483C] transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-[#687067] text-sm mt-2 leading-relaxed line-clamp-3">
                  {course.desc}
                </p>

                {/* Footer / CTA */}
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#E6D3BC]/50">
                  <div>
                    <span className="text-[11px] block uppercase font-bold text-[#A47C52]">Inversión</span>
                    <span className="text-xl font-extrabold text-[#202520]">
                      {course.price}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/51940176461?text=Hola%2C%20deseo%20inscribirme%20al%20curso%20online%3A%20${encodeURIComponent(course.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#23483C] hover:bg-[#16332B] text-[#F7F2EA] font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-[#23483C]/15"
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
