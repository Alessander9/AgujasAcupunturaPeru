import React from 'react';
import { presencialesCourses } from '../../data/coursesData';

export default function PresencialesCourses() {
  return (
    <section id="cursos-presenciales" className="py-16 md:py-24 bg-[#16332B] text-[#F7F2EA] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#23483C]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#A47C52]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#23483C] border border-[#E6D3BC]/40 text-[#E6D3BC] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-base text-[#A47C52]">groups</span>
              Práctica 100% Vivencial en Lima
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#F7F2EA] tracking-tight">
              Talleres y Cursos Presenciales
            </h2>
            <p className="mt-2 text-[#E6D3BC] text-base max-w-xl">
              Aprende técnicas clínicas directamente con pacientes reales bajo la supervisión de docentes certificados con amplia trayectoria.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#F7F2EA] flex items-center gap-1.5 bg-[#23483C]/80 px-3.5 py-1.5 rounded-lg border border-[#A47C52]/40">
              <span className="w-2 h-2 rounded-full bg-[#3F7D5B] animate-pulse" />
              Vacantes Limitadas por Taller
            </span>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {presencialesCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-[#23483C]/40 backdrop-blur-sm rounded-2xl border border-[#A47C52]/30 hover:border-[#E6D3BC] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#16332B]">
                <img
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16332B] via-transparent to-transparent opacity-80" />

                <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#A47C52] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider shadow-md">
                  {course.badge}
                </span>

                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#16332B]/85 text-[#E6D3BC] text-xs font-semibold backdrop-blur-sm">
                  <span className="material-symbols-outlined text-sm text-[#E6D3BC]">calendar_month</span>
                  {course.date}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 text-xs text-[#E6D3BC]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#A47C52]">location_on</span>
                    {course.location}
                  </span>
                  <span>•</span>
                  <span>{course.schedule}</span>
                </div>

                <h3 className="font-bold text-[#F7F2EA] text-xl group-hover:text-[#E6D3BC] transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-[#F7F2EA]/85 text-sm mt-2 leading-relaxed line-clamp-3">
                  {course.desc}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#A47C52]/30">
                  <div>
                    <span className="text-[11px] block uppercase font-bold text-[#E6D3BC]">Inversión</span>
                    <span className="text-xl font-extrabold text-[#F7F2EA]">
                      {course.price}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/51940176461?text=Hola%2C%20deseo%20reservar%20mi%20vacante%20para%20el%20curso%20presencial%3A%20${encodeURIComponent(course.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#A47C52] hover:bg-[#B56F55] text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-black/20"
                  >
                    Separar Vacante
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
