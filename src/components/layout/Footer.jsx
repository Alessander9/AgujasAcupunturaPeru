import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { YapeBadge, BcpBadge } from '../common/PaymentLogos';

export default function Footer() {
  return (
    <footer className="bg-[#0A1E18] text-[#EDE4D6] pt-12 pb-8 border-t border-[#C29B62]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ── 1. PRIMER BLOQUE: MEDIOS DE PAGO OFICIALES & TRANSFERENCIAS ── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-[#C29B62]/25 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Logos & Titular */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#23483C] text-[#C29B62] flex items-center justify-center border border-[#C29B62]/30 shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                    Medios de Pago Oficiales
                  </h5>
                  <span className="text-[11px] text-[#EDE4D6]/70">Abonos directos sin comisiones adicionales</span>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[#EDE4D6]/80 leading-relaxed">
                Todas las cuentas están debidamente registradas a nombre de <strong className="text-white">Instituto de terapias integrales Perú</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <YapeBadge className="h-8" />
                <BcpBadge className="h-8" />
              </div>
            </div>

            {/* Cuentas Estructuradas */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card Yape */}
              <div className="bg-[#123329]/70 border border-[#C29B62]/30 rounded-2xl p-4 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C29B62] uppercase tracking-wider">Yape</span>
                  <YapeBadge className="h-6" />
                </div>
                <div className="text-lg sm:text-xl font-black font-mono text-white tracking-wider">
                  939 371 250
                </div>
                <p className="text-xs text-[#EDE4D6]/70 leading-tight">
                  Titular: <strong className="text-white">Instituto de terapias integrales Perú</strong>
                </p>
              </div>

              {/* Card BCP & CCI */}
              <div className="bg-[#123329]/70 border border-[#C29B62]/30 rounded-2xl p-4 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C29B62] uppercase tracking-wider">Transferencia Bancaria</span>
                  <span className="text-[10px] font-bold bg-[#EDE4D6]/20 text-[#EDE4D6] px-2.5 py-0.5 rounded-full">BCP Soles</span>
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-white">
                  Cta: <span className="tracking-wide">1932597886070</span>
                </div>
                <div className="text-xs sm:text-[13px] font-mono text-[#EDE4D6]/85">
                  CCI: <span className="text-white font-semibold">00219300259788607015</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── 2. SEGUNDO BLOQUE: 4 COLUMNAS DE NAVEGACIÓN Y CATÁLOGO ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-4">
          
          {/* Col 1: Brand Info & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group py-1">
              <img
                src="/agujaslogoblanco1.png"
                alt="Agujas Acupuntura Perú"
                className="h-16 sm:h-20 lg:h-24 w-auto max-w-[280px] sm:max-w-[340px] object-contain transition-transform duration-300 group-hover:scale-103"
              />
            </Link>

            <p className="text-sm text-[#EDE4D6]/75 leading-relaxed max-w-sm">
              Especialistas en insumos de alta precisión para acupuntura, medicina tradicional china, moxibustión, ventosaterapia y terapias integrales en todo el Perú.
            </p>

            {/* Quick Contact info */}
            <div className="space-y-2 text-sm text-[#EDE4D6]/85 pt-1">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C29B62] shrink-0" />
                <span>Av. Julio César Tello 438 - Lince, Lince 15046</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C29B62] shrink-0" />
                <span>WhatsApp de Atención: <strong>930 830 427</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C29B62] shrink-0" />
                <span>Lun - Sáb: 9:00 am - 6:00 pm</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.facebook.com/agujas.acupuntura.9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 text-[#EDE4D6] hover:bg-[#C29B62] hover:text-[#0A1E18] flex items-center justify-center transition-all"
                title="Facebook: Agujas Acupuntura Perú"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/medical_pro_import/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 text-[#EDE4D6] hover:bg-[#C29B62] hover:text-[#0A1E18] flex items-center justify-center transition-all"
                title="Instagram: @medical_pro_import"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@medicalproimport"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white/10 text-[#EDE4D6] hover:bg-[#C29B62] hover:text-[#0A1E18] flex items-center justify-center transition-all"
                title="TikTok: @medicalproimport"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43c.17-.18.33-.37.47-.57V12.2a8.16 8.16 0 0 0 5.26 1.95v-3.5a4.78 4.78 0 0 1-3.77-3.96h3.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Catálogo & Líneas (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm sm:text-[15px] font-extrabold uppercase tracking-wider text-white">
              Catálogo de Insumos
            </h4>
            <ul className="space-y-2.5 text-sm text-[#EDE4D6]/80">
              <li><Link to="/productos" className="hover:text-[#C29B62] transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-[#C29B62]" /> Todos los productos (155)</Link></li>
              <li><Link to="/productos?cat=Acupuntura" className="hover:text-[#C29B62] transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-[#C29B62]" /> Agujas de Acupuntura</Link></li>
              <li><Link to="/productos?cat=Auriculoterapia" className="hover:text-[#C29B62] transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-[#C29B62]" /> Auriculoterapia y Semillas</Link></li>
              <li><Link to="/productos?cat=Ventosa" className="hover:text-[#C29B62] transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-[#C29B62]" /> Ventosas y Copas</Link></li>
              <li><Link to="/productos?cat=Moxibustion" className="hover:text-[#C29B62] transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-[#C29B62]" /> Moxas y Puros</Link></li>
              <li><Link to="/productos?cat=Fisioterapia" className="hover:text-[#C29B62] transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-[#C29B62]" /> Fisioterapia y Postura</Link></li>
              <li><Link to="/productos?filter=ofertas" className="hover:text-[#C29B62] transition flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5 text-[#C29B62]" /> Promociones y Ofertas</Link></li>
            </ul>
          </div>

          {/* Col 3: Ayuda & Envíos (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm sm:text-[15px] font-extrabold uppercase tracking-wider text-white">
              Ayuda & Compras
            </h4>
            <ul className="space-y-2.5 text-sm text-[#EDE4D6]/80">
              <li><Link to="/sobre-nosotros" className="hover:text-[#C29B62] transition">Contacto Directo</Link></li>
              <li><Link to="/tutoriales" className="hover:text-[#C29B62] transition">Preguntas Frecuentes</Link></li>
              <li><Link to="/sobre-nosotros" className="hover:text-[#C29B62] transition">Guía de Envíos</Link></li>
              <li><Link to="/sobre-nosotros" className="hover:text-[#C29B62] transition">Cambios y Devoluciones</Link></li>
              <li><Link to="/checkout" className="hover:text-[#C29B62] transition font-semibold text-white">Finalizar Compra</Link></li>
            </ul>
          </div>

          {/* Col 4: Empresa & Legal (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm sm:text-[15px] font-extrabold uppercase tracking-wider text-white">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-sm text-[#EDE4D6]/80 mb-4">
              <li><Link to="/sobre-nosotros" className="hover:text-[#C29B62] transition">Sobre Nosotros</Link></li>
              <li><Link to="/videos" className="hover:text-[#C29B62] transition text-[#C29B62] font-semibold">Videos Demostrativos</Link></li>
              <li><Link to="/tutoriales" className="hover:text-[#C29B62] transition">Artículos y Formación</Link></li>
              <li><Link to="/terminos-y-condiciones" className="hover:text-[#C29B62] transition">Términos y Condiciones</Link></li>
              <li><Link to="/politica-privacidad" className="hover:text-[#C29B62] transition">Política de Privacidad</Link></li>
            </ul>

            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-[13px] text-[#EDE4D6]/85">
                <ShieldCheck className="w-4 h-4 text-[#2C7A62]" />
                <span>Atención clínica especializada</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── 3. TERCER BLOQUE: SEDE CENTRAL & GOOGLE MAPS ── */}
        <div className="pt-4 border-t border-[#EDE4D6]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Location Details */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C29B62]/15 border border-[#C29B62]/30 text-[#EDE4D6] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#C29B62]" />
                <span>Sede Central & Showroom Lima</span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-white">
                Visítanos en Lince, Lima
              </h4>
              <p className="text-xs sm:text-sm text-[#EDE4D6]/80 leading-relaxed">
                Showroom permanente de insumos clínicos, agujas estériles, equipos terapéuticos, moxas y retiro directo de compras online.
              </p>
              
              <div className="space-y-2 text-xs sm:text-[13px] text-[#EDE4D6]/90 pt-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C29B62] shrink-0 mt-0.5" />
                  <span><strong>Dirección:</strong> Av. Julio César Tello 438 - Lince, Lince 15046, Lima - Perú</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C29B62] shrink-0" />
                  <span><strong>Horario:</strong> Lunes a Sábado: 9:00 am - 6:00 pm</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C29B62] shrink-0" />
                  <span><strong>WhatsApp Directo:</strong> +51 930 830 427</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Av.+Julio+C%C3%A9sar+Tello+438,+Lince+15046,+Lima,+Peru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#23483C] hover:bg-[#16332B] text-[#EDE4D6] hover:text-white text-xs font-bold transition border border-[#C29B62]/40 shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C29B62]" />
                  <span>Cómo llegar en Google Maps →</span>
                </a>
              </div>
            </div>

            {/* Right Map Iframe */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-[#C29B62]/30 shadow-xl aspect-[16/8] sm:aspect-[16/7] lg:aspect-[16/7] bg-[#0A1E18]">
                <iframe
                  title="Ubicación Agujas Acupuntura Perú - Av. Julio César Tello 438, Lince 15046"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.442978809405!2d-77.040001!3d-12.083818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8f2f2545801%3A0xcab144ed9521a5da!2sINSTEIP!5e0!3m2!1ses!2spe!4v1711250000000!5m2!1ses!2spe"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

          </div>
        </div>

        {/* ── 4. CUARTO BLOQUE: COPYRIGHT & LEGAL ── */}
        <div className="pt-6 border-t border-[#EDE4D6]/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-[13px] text-[#EDE4D6]/60 gap-3">
          <p>© 2026 Agujas Acupuntura Perú. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link to="/terminos-y-condiciones" className="hover:text-[#EDE4D6] transition">Términos y condiciones</Link>
            <span>|</span>
            <Link to="/politica-privacidad" className="hover:text-[#EDE4D6] transition">Política de privacidad</Link>
            <span>|</span>
            <Link to="/sobre-nosotros" className="hover:text-[#EDE4D6] transition">Libro de reclamaciones</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
