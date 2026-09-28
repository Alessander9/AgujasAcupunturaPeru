/**
 * Reusable Navbar Web Component & Script for Agujas Acupuntura Perú
 * Palette:
 * - Primario: #23483C (Verde bosque profundo)
 * - Primario oscuro: #16332B (Verde casi negro)
 * - Fondo principal: #F7F2EA (Marfil cálido)
 * - Fondo secundario: #E6D3BC (Beige arena)
 * - Acento premium: #A47C52 (Bronce suave)
 * - Acento cálido: #B56F55 (Terracota)
 * - Éxito: #3F7D5B (Verde natural)
 */

(function () {
  'use strict';

  const NAVBAR_HTML = `
    <header id="navbar" class="fixed top-0 left-0 right-0 z-50 w-full bg-[#23483C] text-[#F7F2EA] border-b border-[#16332B] shadow-md transition-all duration-300">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <!-- BRAND LOGO -->
        <a href="index.html" class="flex items-center gap-3 transition-transform hover:scale-[1.01]">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16332B] text-[#E6D3BC] border border-[#A47C52]/40 shadow-md">
            <span class="material-symbols-outlined text-[24px] text-[#A47C52]">spa</span>
          </div>
          <div class="flex flex-col">
            <span class="text-base font-extrabold uppercase tracking-[0.14em] text-[#F7F2EA]">
              Agujas Acupuntura
            </span>
            <span class="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#E6D3BC]">
              Insumos Profesionales Perú
            </span>
          </div>
        </a>

        <!-- DESKTOP NAVIGATION -->
        <nav id="desktopMenu" class="hidden items-center gap-1.5 lg:flex" aria-label="Navegación principal">
          <a class="nav-item rounded-full px-4 py-2 text-sm font-semibold text-[#F7F2EA] transition-all hover:bg-white/10 hover:text-[#E6D3BC]"
            data-nav="inicio" href="index.html">
            Inicio
          </a>
          <a class="nav-item rounded-full px-4 py-2 text-sm font-semibold text-[#F7F2EA] transition-all hover:bg-white/10 hover:text-[#E6D3BC]"
            data-nav="productos" href="productos.html">
            Productos
          </a>
          <a class="nav-item rounded-full px-3.5 py-1.5 text-sm font-semibold text-[#F7F2EA] bg-[#16332B] border border-[#A47C52]/50 transition-all hover:bg-[#A47C52] inline-flex items-center gap-1.5 shadow-xs"
            data-nav="amazonik" href="aceites-amazonik.html">
            <span class="material-symbols-outlined text-[16px] text-[#A47C52]">eco</span>
            <span>Aceites Amazoni-k</span>
            <span class="ml-1 px-1.5 py-0.2 rounded-full bg-[#A47C52] text-white text-[9px] font-bold uppercase tracking-wider">Top</span>
          </a>
          <a class="nav-item rounded-full px-4 py-2 text-sm font-semibold text-[#F7F2EA] transition-all hover:bg-white/10 hover:text-[#E6D3BC]"
            data-nav="tutoriales" href="tutoriales.html">
            Tutoriales
          </a>
          <a class="nav-item rounded-full px-4 py-2 text-sm font-semibold text-[#F7F2EA] transition-all hover:bg-white/10 hover:text-[#E6D3BC]"
            data-nav="conocenos" href="sobreNosotros.html">
            Conócenos
          </a>
        </nav>

        <!-- RIGHT ACTION BUTTONS -->
        <div class="hidden items-center gap-2.5 lg:flex">
          <a href="https://wa.me/51930830427?text=Hola,%20quiero%20más%20información%20sobre%20los%20productos."
            target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-full border border-[#E6D3BC]/40 bg-[#16332B]/60 px-4 py-2 text-xs font-bold text-[#F7F2EA] transition hover:border-[#A47C52] hover:bg-[#16332B] hover:text-[#E6D3BC]">
            <span class="material-symbols-outlined text-[17px] text-[#3F7D5B]">call</span>
            <span>WhatsApp</span>
          </a>
          <a href="productos.html"
            class="inline-flex items-center gap-2 rounded-full bg-[#A47C52] hover:bg-[#B56F55] px-5 py-2 text-xs font-bold text-white shadow-md shadow-black/20 transition-all hover:scale-105 active:scale-95">
            <span class="material-symbols-outlined text-[18px] text-white">shopping_bag</span>
            <span>Ver Productos</span>
          </a>
        </div>

        <!-- MOBILE TOGGLE BUTTON -->
        <button id="menuToggle"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-[#16332B] text-[#F7F2EA] bg-[#16332B]/80 transition hover:bg-[#16332B] lg:hidden"
          aria-label="Abrir menú" type="button">
          <span class="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </div>

      <!-- MOBILE MENU DRAWER -->
      <div id="mobileMenu"
        class="hidden border-t border-[#16332B] bg-[#23483C] px-4 py-5 shadow-2xl lg:hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto">
        <div class="space-y-1.5">
          <a href="index.html"
            class="block rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#F7F2EA] hover:bg-[#16332B] transition-colors">
            Inicio
          </a>
          <a href="productos.html"
            class="block rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#F7F2EA] hover:bg-[#16332B] transition-colors">
            Productos
          </a>
          <a href="aceites-amazonik.html"
            class="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#F7F2EA] bg-[#16332B] hover:bg-[#A47C52] transition-colors">
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-[#A47C52]">eco</span>
              <span>Aceites Amazoni-k</span>
            </span>
            <span class="px-2 py-0.5 rounded-full bg-[#A47C52] text-white text-[10px] font-bold">Exclusivo</span>
          </a>
          <a href="tutoriales.html"
            class="block rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#F7F2EA] hover:bg-[#16332B] transition-colors">
            Tutoriales
          </a>
          <a href="sobreNosotros.html"
            class="block rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#F7F2EA] hover:bg-[#16332B] transition-colors">
            Conócenos
          </a>

          <!-- MOBILE CTA BUTTONS -->
          <div class="mt-5 flex flex-col gap-2 pt-3 border-t border-[#16332B]">
            <a href="https://wa.me/51930830427?text=Hola,%20quiero%20más%20información%20sobre%20los%20productos."
              target="_blank" rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 rounded-xl border border-[#E6D3BC]/40 bg-[#16332B] py-2.5 text-xs font-bold text-[#F7F2EA] hover:bg-[#16332B]/80">
              <span class="material-symbols-outlined text-[18px] text-[#3F7D5B]">call</span>
              <span>Contactar por WhatsApp</span>
            </a>
            <a href="productos.html"
              class="flex items-center justify-center gap-2 rounded-xl bg-[#A47C52] hover:bg-[#B56F55] py-2.5 text-xs font-bold text-white shadow-md shadow-black/20">
              <span class="material-symbols-outlined text-[18px] text-white">shopping_bag</span>
              <span>Ver Productos</span>
            </a>
          </div>
        </div>
      </div>
    </header>
    <div id="navSpacer" aria-hidden="true" class="h-16 lg:h-20 w-full"></div>
  `;

  function initNavbarEvents() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 10) {
        navbar.classList.add('shadow-lg', 'py-1');
        navbar.classList.remove('shadow-md', 'py-2');
      } else {
        navbar.classList.remove('shadow-lg', 'py-1');
        navbar.classList.add('shadow-md', 'py-2');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
        const icon = menuToggle.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
        }
      });
    }

    // Highlight active link
    const currentPath = window.location.pathname.toLowerCase();
    document.querySelectorAll('.nav-item').forEach((link) => {
      const navKey = link.getAttribute('data-nav');
      if (
        (navKey === 'inicio' && (currentPath.endsWith('/') || currentPath.includes('index'))) ||
        (navKey === 'productos' && currentPath.includes('productos')) ||
        (navKey === 'amazonik' && (currentPath.includes('amazonik') || currentPath.includes('aceites'))) ||
        (navKey === 'tutoriales' && currentPath.includes('tutoriales')) ||
        (navKey === 'conocenos' && (currentPath.includes('sobrenosotros') || currentPath.includes('sobre-nosotros')))
      ) {
        if (navKey === 'amazonik') {
          link.classList.add('bg-[#A47C52]', 'text-white', 'font-bold', 'ring-2', 'ring-white/20');
        } else {
          link.classList.add('bg-white/15', 'text-[#E6D3BC]', 'font-bold');
        }
      }
    });
  }

  class SiteNavbar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = NAVBAR_HTML;
      initNavbarEvents();
    }
  }

  if (!customElements.get('site-navbar')) {
    customElements.define('site-navbar', SiteNavbar);
  }

  function autoMount() {
    const target = document.getElementById('navbar-root') || document.querySelector('[data-site-navbar]');
    if (target && !target.querySelector('#navbar')) {
      target.innerHTML = NAVBAR_HTML;
      initNavbarEvents();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }

  window.initSiteNavbar = autoMount;
})();
