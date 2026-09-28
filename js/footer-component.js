/**
 * Reusable Footer Web Component & Script for Agujas Acupuntura Perú
 * Matches reference design:
 * - 100% full-width Google Map banner of Agujas Acupuntura Perú (Julio C Tello 438, Lince, Lima)
 * - 4-column modern layout with Logo, Meet Agujas, Need Help, Socials & CTA button.
 */

(function () {
  'use strict';

  const mapUrl = "https://www.google.com/maps/place/Agujas Acupuntura Perú/data=!4m2!3m1!1s0x0:0xcab144ed9521a5da?sa=X&ved=1t:2428&ictx=111";
  const embedMapSrc = "https://maps.google.com/maps?q=Agujas Acupuntura Perú,+Julio+C+Tello+438,+Lince,+Lima&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const FOOTER_HTML = `
    <footer id="footer" class="w-full bg-[#191E18] text-[#F7F2EA] relative z-10 font-sans">
      
      <!-- 1. TOP FULL-BLEED CLEAN INTERACTIVE MAP BANNER -->
      <div class="relative w-full h-72 sm:h-80 md:h-96 bg-[#E6D3BC]/30 overflow-hidden border-t border-b border-[#23483C]/40 group">
        <iframe
          title="Ubicación Agujas Acupuntura Perú - Agujas Acupuntura Perú"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.442978809405!2d-77.040001!3d-12.083818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8f2f2545801%3A0xcab144ed9521a5da!2sAgujas Acupuntura Perú!5e0!3m2!1ses!2spe!4v1711250000000!5m2!1ses!2spe"
          class="w-full h-full border-0 filter grayscale-[15%] contrast-[1.05] opacity-95 transition-all duration-500 group-hover:filter-none group-hover:opacity-100"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>

        <!-- Discreet Bottom-Left Map Pill -->
        <a
          href="${mapUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16332B]/90 backdrop-blur-md text-[#F7F2EA] border border-[#A47C52]/50 shadow-lg text-xs font-bold hover:bg-[#23483C] hover:scale-105 transition-all">
          <span class="material-symbols-outlined text-[16px] text-[#A47C52]">location_on</span>
          <span>Sede Central Agujas Acupuntura Perú (Lince, Lima)</span>
          <span class="material-symbols-outlined text-[14px] text-[#E6D3BC]">open_in_new</span>
        </a>
      </div>

      <!-- 2. MAIN FOOTER CONTENT BAR -->
      <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 md:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          <!-- COLUMN 1: BRAND LOGO (4 Cols) -->
          <div class="lg:col-span-4 space-y-4">
            <a href="index.html" class="inline-flex items-center gap-3 group">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#23483C] text-[#E6D3BC] border border-[#A47C52]/40 shadow-lg transition-transform group-hover:scale-105">
                <span class="material-symbols-outlined text-[24px] text-[#A47C52]">spa</span>
              </div>
              <div class="flex flex-col">
                <span class="text-base font-black uppercase tracking-[0.14em] text-[#F7F2EA]">
                  Agujas Acupuntura
                </span>
                <span class="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E6D3BC]">
                  Insumos Profesionales Perú
                </span>
              </div>
            </a>

            <p class="text-xs sm:text-sm text-[#E6D3BC]/70 leading-relaxed max-w-sm">
              Suministros profesionales certificados de acupuntura, moxibustión, aceites amazónicos y capacitación integral para terapeutas en todo el Perú.
            </p>

            <div class="pt-2 text-xs text-[#E6D3BC]/60 space-y-1">
              <p class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-[#A47C52]">call</span>
                <span>+51 930 830 427 / +51 940 176 461</span>
              </p>
              <p class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-[#A47C52]">mail</span>
                <span>contacto@agujasacupunturaperu.com</span>
              </p>
            </div>
          </div>

          <!-- COLUMN 2: CONÓCENOS (3 Cols) -->
          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-xs font-black tracking-[0.2em] uppercase text-[#A47C52]">
              Conócenos
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm text-[#E6D3BC]/80">
              <li>
                <a href="index.html" class="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="productos.html" class="hover:text-white transition-colors">
                  Catálogo de Productos
                </a>
              </li>
              <li>
                <a href="aceites-amazonik.html" class="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Aceites Amazoni-k</span>
                  <span class="px-1.5 py-0.2 rounded-full bg-[#A47C52] text-white text-[9px] font-bold">Top</span>
                </a>
              </li>
              <li>
                <a href="tutoriales.html" class="hover:text-white transition-colors">
                  Tutoriales y Clases
                </a>
              </li>
              <li>
                <a href="sobreNosotros.html" class="hover:text-white transition-colors">
                  Nuestra Historia
                </a>
              </li>
            </ul>
          </div>

          <!-- COLUMN 3: ¿NECESITAS AYUDA? (2 Cols) -->
          <div class="lg:col-span-2 space-y-3">
            <h4 class="text-xs font-black tracking-[0.2em] uppercase text-[#A47C52]">
              ¿Necesitas Ayuda?
            </h4>
            <ul class="space-y-2 text-xs sm:text-sm text-[#E6D3BC]/80">
              <li>
                <a href="index.html#faq" class="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="https://wa.me/51930830427" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
                  Asesoría Clínica
                </a>
              </li>
              <li>
                <a href="productos.html" class="hover:text-white transition-colors">
                  Envíos a todo el Perú
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white transition-colors">
                  Términos y Privacidad
                </a>
              </li>
              <li>
                <a href="https://www.agujasacupunturaperu.com/about-4" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
                  Libro de Reclamaciones
                </a>
              </li>
            </ul>
          </div>

          <!-- COLUMN 4: SÍGUENOS & CTA (3 Cols) -->
          <div class="lg:col-span-3 space-y-4">
            <h4 class="text-xs font-black tracking-[0.2em] uppercase text-[#A47C52]">
              Síguenos
            </h4>

            <!-- Social Icons Row -->
            <div class="flex items-center gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                class="w-9 h-9 rounded-full bg-white/10 hover:bg-[#23483C] text-white flex items-center justify-center transition-all hover:scale-110">
                <span class="material-symbols-outlined text-[18px]">thumb_up</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                class="w-9 h-9 rounded-full bg-white/10 hover:bg-[#23483C] text-white flex items-center justify-center transition-all hover:scale-110">
                <span class="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                class="w-9 h-9 rounded-full bg-white/10 hover:bg-[#23483C] text-white flex items-center justify-center transition-all hover:scale-110">
                <span class="material-symbols-outlined text-[18px]">music_note</span>
              </a>
              <a
                href="https://wa.me/51930830427"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                class="w-9 h-9 rounded-full bg-white/10 hover:bg-[#3F7D5B] text-white flex items-center justify-center transition-all hover:scale-110">
                <span class="material-symbols-outlined text-[18px]">chat</span>
              </a>
            </div>

            <!-- Primary Action Button (Pink / Terracota pill button matching mockup) -->
            <div class="pt-2">
              <a
                href="https://wa.me/51930830427?text=Hola,%20deseo%20hacer%20una%20consulta%20o%20pedido%20de%20productos."
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 w-full h-11 px-6 rounded-full bg-[#B56F55] hover:bg-[#9E5D46] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#B56F55]/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span class="material-symbols-outlined text-[18px]">send</span>
                <span>Escríbenos Ahora</span>
              </a>
            </div>
          </div>

        </div>

        <!-- 3. COPYRIGHT BOTTOM BAR -->
        <div class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E6D3BC]/60">
          <p>© ${new Date().getFullYear()} Agujas Acupuntura Perú. Todos los derechos reservados.</p>
          <p class="text-[11px] text-[#E6D3BC]/50">
            Sede: Agujas Acupuntura Perú - Julio C. Tello 438, Lince, Lima
          </p>
        </div>
      </div>

    </footer>
  `;

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = FOOTER_HTML;
    }
  }

  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }

  function autoMountFooter() {
    const target = document.getElementById('footer-root') || document.querySelector('[data-site-footer]');
    if (target && !target.querySelector('#footer')) {
      target.innerHTML = FOOTER_HTML;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMountFooter);
  } else {
    autoMountFooter();
  }

  window.initSiteFooter = autoMountFooter;
})();
