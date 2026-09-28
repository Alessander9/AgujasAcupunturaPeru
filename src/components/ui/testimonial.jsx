import React, { useRef } from 'react';
import { TimelineContent } from './timeline-animation';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export default function ClientFeedback() {
  const testimonialRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.12,
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
    hidden: {
      filter: 'blur(8px)',
      y: 20,
      opacity: 0,
    },
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-14 sm:py-20 border-b border-[#EDE4D6] relative overflow-hidden" ref={testimonialRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <article className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <TimelineContent
            as="div"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
            className="inline-flex items-center gap-2 bg-[#123329]/10 text-[#123329] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <Star className="w-3.5 h-3.5 fill-[#C29B62] text-[#C29B62]" />
            <span>Testimonios Verificados</span>
          </TimelineContent>

          <TimelineContent
            as="h2"
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#123329] tracking-tight"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Con la confianza de terapeutas y especialistas en todo el Perú
          </TimelineContent>

          <TimelineContent
            as="p"
            className="text-sm sm:text-base text-[#65726B] max-w-2xl mx-auto leading-relaxed"
            animationNum={2}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Descubre las experiencias de acupunturistas, médicos integrativos y centros de salud que confían en la calidad y precisión de nuestros insumos.
          </TimelineContent>
        </article>

        {/* BENTO GRID 3 COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 w-full">
          
          {/* COLUMN 1: Flex-7 + Flex-3 */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 h-full">
            {/* Card 1.1 (Flex 7 - Hero Card Dark Green with Grid) */}
            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 sm:flex-[7] lg:flex-[7] flex flex-col justify-between relative bg-[#123329] text-[#EDE4D6] overflow-hidden rounded-2xl border border-[#C29B62]/30 p-6 sm:p-7 shadow-lg group hover:border-[#C29B62]/60 transition-all duration-300"
            >
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#C29B6215_1px,transparent_1px),linear-gradient(to_bottom,#C29B6215_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

              <div className="relative z-10 mb-4 flex items-center justify-between">
                <div className="flex text-[#C29B62] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#C29B62]/30 group-hover:text-[#C29B62]/60 transition-colors" />
              </div>

              <article className="relative z-10 mt-auto">
                <p className="text-sm sm:text-[15px] text-white leading-relaxed font-normal">
                  "Las agujas Seirin y DongBang que distribuyen tienen un pulido impecable. La inserción es suave y totalmente indolora para los pacientes. La mejor calidad disponible en Perú."
                </p>
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/10">
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                      <span>Dra. Carmen Mendoza</span>
                      <CheckCircle2 className="w-4 h-4 text-[#C29B62]" />
                    </h3>
                    <p className="text-xs text-[#C29B62] font-medium">Directora Clínica Holística San Borja</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                    alt="Dra. Carmen Mendoza"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-[#C29B62]/40 shrink-0 shadow-md"
                    loading="lazy"
                  />
                </div>
              </article>
            </TimelineContent>

            {/* Card 1.2 (Flex 3 - Accent Dark Emerald) */}
            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 sm:flex-[3] lg:flex-[3] flex flex-col justify-between relative bg-[#1B4538] text-white overflow-hidden rounded-2xl border border-[#2C7A62]/40 p-5 shadow-md hover:border-[#C29B62]/50 transition-all duration-300"
            >
              <article className="mt-auto">
                <div className="flex text-[#C29B62] gap-0.5 mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
                  "Envío a consultorio puntualísimo. Los kits de moxibustión y ventosas de vidrio son de nivel profesional."
                </p>
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/10">
                  <div>
                    <h3 className="font-bold text-white text-sm">Lic. Roberto Chang</h3>
                    <p className="text-[11px] text-[#DFC499]">Especialista MTC · Miraflores</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                    alt="Lic. Roberto Chang"
                    className="w-11 h-11 rounded-xl object-cover border border-[#C29B62]/30 shrink-0"
                    loading="lazy"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* COLUMN 2: 3 Cards Dark Charcoal */}
          <div className="flex flex-col gap-3.5 h-full">
            {/* Card 2.1 */}
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-[#111815] text-white overflow-hidden rounded-2xl border border-white/10 p-5 shadow-md hover:border-[#C29B62]/40 transition-all duration-300"
            >
              <article className="mt-auto">
                <div className="flex text-[#C29B62] gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-[13px] text-gray-200 leading-relaxed">
                  "Excelente variedad en calibres de punción seca y electroacupuntura. Su asesoría técnica por WhatsApp es rápida y muy acertada."
                </p>
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10">
                  <div>
                    <h3 className="font-bold text-white text-sm">Dr. Manuel Valdivia</h3>
                    <p className="text-[11px] text-[#C29B62]">Fisioterapeuta Clínico · Arequipa</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80"
                    alt="Dr. Manuel Valdivia"
                    className="w-11 h-11 rounded-xl object-cover border border-white/20 shrink-0"
                    loading="lazy"
                  />
                </div>
              </article>
            </TimelineContent>

            {/* Card 2.2 */}
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-[#111815] text-white overflow-hidden rounded-2xl border border-white/10 p-5 shadow-md hover:border-[#C29B62]/40 transition-all duration-300"
            >
              <article className="mt-auto">
                <div className="flex text-[#C29B62] gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-[13px] text-gray-200 leading-relaxed">
                  "Compro regularmente para mi centro en Cusco. Los paquetes llegan perfectamente sellados y con registro sanitario al día."
                </p>
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10">
                  <div>
                    <h3 className="font-bold text-white text-sm">Dra. Lucía Paredes</h3>
                    <p className="text-[11px] text-[#C29B62]">Terapeuta Acupuntura · Cusco</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1594824813590-78965a1263d9?w=200&auto=format&fit=crop&q=80"
                    alt="Dra. Lucía Paredes"
                    className="w-11 h-11 rounded-xl object-cover border border-white/20 shrink-0"
                    loading="lazy"
                  />
                </div>
              </article>
            </TimelineContent>

            {/* Card 2.3 */}
            <TimelineContent
              animationNum={7}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-[#111815] text-white overflow-hidden rounded-2xl border border-white/10 p-5 shadow-md hover:border-[#C29B62]/40 transition-all duration-300"
            >
              <article className="mt-auto">
                <div className="flex text-[#C29B62] gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-[13px] text-gray-200 leading-relaxed">
                  "Facilidad de pago con Yape/Bcp y el despacho a Trujillo llegó en menos de 24 horas. Impecable servicio al cliente."
                </p>
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10">
                  <div>
                    <h3 className="font-bold text-white text-sm">Lic. Javier Morales</h3>
                    <p className="text-[11px] text-[#C29B62]">Centro de Rehabilitación · Trujillo</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                    alt="Lic. Javier Morales"
                    className="w-11 h-11 rounded-xl object-cover border border-white/20 shrink-0"
                    loading="lazy"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* COLUMN 3: Flex-3 + Flex-7 */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 h-full">
            {/* Card 3.1 (Flex 3 - Accent Card) */}
            <TimelineContent
              animationNum={8}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 sm:flex-[3] lg:flex-[3] flex flex-col justify-between relative bg-[#1B4538] text-white overflow-hidden rounded-2xl border border-[#2C7A62]/40 p-5 shadow-md hover:border-[#C29B62]/50 transition-all duration-300"
            >
              <article className="mt-auto">
                <div className="flex text-[#C29B62] gap-0.5 mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
                  "Los aceites Amazoni-k y las moxas sin humo tienen una aceptación increíble entre mis pacientes en Lima."
                </p>
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/10">
                  <div>
                    <h3 className="font-bold text-white text-sm">Dra. Vanessa Soto</h3>
                    <p className="text-[11px] text-[#DFC499]">Terapeuta Holística · Surco</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80"
                    alt="Dra. Vanessa Soto"
                    className="w-11 h-11 rounded-xl object-cover border border-[#C29B62]/30 shrink-0"
                    loading="lazy"
                  />
                </div>
              </article>
            </TimelineContent>

            {/* Card 3.2 (Flex 7 - Hero Card Dark Green with Grid) */}
            <TimelineContent
              animationNum={9}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 sm:flex-[7] lg:flex-[7] flex flex-col justify-between relative bg-[#123329] text-[#EDE4D6] overflow-hidden rounded-2xl border border-[#C29B62]/30 p-6 sm:p-7 shadow-lg group hover:border-[#C29B62]/60 transition-all duration-300"
            >
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#C29B6215_1px,transparent_1px),linear-gradient(to_bottom,#C29B6215_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

              <div className="relative z-10 mb-4 flex items-center justify-between">
                <div className="flex text-[#C29B62] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#C29B62]/30 group-hover:text-[#C29B62]/60 transition-colors" />
              </div>

              <article className="relative z-10 mt-auto">
                <p className="text-sm sm:text-[15px] text-white leading-relaxed font-normal">
                  "Llevo más de 5 años abasteciendo a mis alumnos y consultorios con sus insumos. La constancia en la calidad de cada lote y la atención personalizada los hace únicos en el rubro."
                </p>
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/10">
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                      <span>Lic. Paul Brauch</span>
                      <CheckCircle2 className="w-4 h-4 text-[#C29B62]" />
                    </h3>
                    <p className="text-xs text-[#C29B62] font-medium">Docente & Especialista en Acupuntura</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
                    alt="Lic. Paul Brauch"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-[#C29B62]/40 shrink-0 shadow-md"
                    loading="lazy"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

        </div>

        {/* BOTTOM ACCENT DECORATION */}
        <div className="relative mt-12 pt-6 flex items-center justify-center">
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#C29B62]/40 to-transparent" />
          <div className="absolute w-2 h-2 rounded-full bg-[#C29B62] shadow-[0_0_8px_#C29B62]" />
        </div>

      </div>
    </section>
  );
}
