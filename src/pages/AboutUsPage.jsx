import React from 'react';
import { Sparkles, ShieldCheck, Award, Users, MapPin, CheckCircle2, Phone, Mail } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA] py-8 sm:py-12">
      <SEOHead 
        title="Sobre Nosotros | Agujas Acupuntura Perú - Instituto de Terapias Integrales"
        description="Conoce nuestra historia, misión y compromiso institucional como principal distribuidor de suministros médicos e insumos de acupuntura en Lima, Perú."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO INSTITUCIONAL */}
        <div className="relative rounded-3xl overflow-hidden bg-[#23483C] text-white p-6 sm:p-10 lg:p-14 mb-12 shadow-2xl border border-[#16332B]">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16332B] border border-[#A47C52]/50 text-[#E6D3BC] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-[#A47C52]" />
              Agujas Acupuntura Perú
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Excelencia en Terapias Naturales & Suministros Médicos
            </h1>
            
            <p className="text-sm sm:text-base text-[#E6D3BC]/90 leading-relaxed max-w-2xl">
              Somos la institución líder en el Perú en formación continua de acupuntores, fisioterapeutas y terapeutas integrales, así como el principal distribuidor de insumos clínicos certificados.
            </p>
          </div>
        </div>

        {/* 3 PILARES INSTITUCIONALES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl border border-[#E6D3BC] shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#23483C] text-[#E6D3BC] flex items-center justify-center mb-4 shadow-md">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#202520]">Calidad Quirúrgica</h3>
              <p className="text-xs sm:text-sm text-[#687067] mt-2 leading-relaxed">
                Selección de insumos con certificaciones internacionales CE, ISO 13485 y FDA para garantizar la máxima seguridad y bienestar del paciente.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E6D3BC] shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#A47C52] text-white flex items-center justify-center mb-4 shadow-md">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#202520]">Respaldo Docente</h3>
              <p className="text-xs sm:text-sm text-[#687067] mt-2 leading-relaxed">
                Programas estructurados con teoría clásica y protocolos clínicos modernos dictados por profesionales en ejercicio.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E6D3BC] shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#3F7D5B] text-white flex items-center justify-center mb-4 shadow-md">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#202520]">Comunidad de Terapeutas</h3>
              <p className="text-xs sm:text-sm text-[#687067] mt-2 leading-relaxed">
                Asesoría permanente post-compra y soporte clínico directo vía WhatsApp para absolver dudas de casos y dosificación.
              </p>
            </div>
          </div>
        </div>

        {/* SEDE CENTRAL & CONTACTO */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E6D3BC] shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A47C52] block mb-1">
              Sede Central
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#202520]">
              Agujas Acupuntura Perú
            </h2>
            <p className="text-xs sm:text-sm text-[#687067] mt-3 leading-relaxed">
              Ubicados en el corazón de Lince, Lima, contamos con aulas equipadas para talleres prácticos y showroom de insumos médicos.
            </p>

            <div className="mt-6 space-y-3 text-xs sm:text-sm text-[#202520]">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#A47C52] flex-shrink-0" />
                <span>Julio C. Tello 438, Lince, Lima - Perú</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#A47C52] flex-shrink-0" />
                <span>+51 930 830 427</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#A47C52] flex-shrink-0" />
                <span>contacto@agujasacupunturaperu.com</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#E6D3BC] aspect-[16/10] bg-[#F7F2EA]">
            <iframe
              title="Mapa Agujas Acupuntura Perú"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.442978809405!2d-77.040001!3d-12.083818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8f2f2545801%3A0xcab144ed9521a5da!2sINSTEIP!5e0!3m2!1ses!2spe!4v1711250000000!5m2!1ses!2spe"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </div>
  );
}
