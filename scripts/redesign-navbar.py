#!/usr/bin/env python3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

NEW_NAVBAR_HTML = """  <!-- NAVBAR -->
  <header id="navbar" class="fixed inset-x-0 top-0 z-50 transition-all duration-300">
    <div class="mx-auto max-w-7xl px-2 pt-2 sm:px-5 sm:pt-3 lg:px-8">
      <div class="flex items-center justify-between rounded-2xl border border-[#A47C52]/30 bg-[#23483C]/95 px-3.5 py-2.5 shadow-[0_12px_40px_rgba(22,51,43,0.35)] backdrop-blur-xl sm:rounded-3xl sm:px-6 sm:py-3.5">
        
        <!-- BRAND LOGO -->
        <a href="index.html" class="group flex min-w-0 items-center gap-2.5 sm:gap-3.5">
          <div class="grid h-10 w-10 place-items-center rounded-xl border border-[#A47C52]/40 bg-[#16332B] text-[#E6D3BC] shadow-md shadow-black/20 transition-transform group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-2xl">
            <span class="material-symbols-outlined text-[22px] text-[#A47C52] sm:text-[24px]">spa</span>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="truncate text-xs font-black uppercase tracking-[0.16em] text-[#F7F2EA] sm:text-base sm:tracking-[0.18em]">
                Agujas Acupuntura
              </span>
              <span class="rounded-full bg-[#A47C52] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                Perú
              </span>
            </div>
            <p class="hidden truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E6D3BC]/80 sm:block sm:text-[11px]">
              Insumos Profesionales y Terapéuticos
            </p>
          </div>
        </a>

        <!-- DESKTOP NAVIGATION -->
        <nav id="desktopMenu" class="hidden items-center gap-1 lg:flex xl:gap-1.5" aria-label="Navegación principal">
          <a class="nav-item rounded-full px-3.5 py-2 text-sm font-semibold text-[#F7F2EA] transition-all hover:bg-white/10 hover:text-[#E6D3BC]"
            href="index.html">
            Inicio
          </a>
          <a class="nav-item inline-flex items-center gap-1.5 rounded-full border border-[#A47C52]/60 bg-[#16332B] px-4 py-2 text-sm font-bold text-[#E6D3BC] shadow-inner transition-all hover:bg-[#A47C52] hover:text-white"
            href="productos.html">
            <span class="material-symbols-outlined text-[16px] text-[#A47C52]">inventory_2</span>
            <span>Productos</span>
          </a>
          <a class="nav-item inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-[#F7F2EA] transition-all hover:bg-white/10 hover:text-[#E6D3BC]"
            href="aceites-amazonik.html">
            <span class="material-symbols-outlined text-[16px] text-[#A47C52]">eco</span>
            <span>Aceites Amazoni-k</span>
            <span class="rounded-full bg-[#A47C52]/80 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">Top</span>
          </a>
          <a class="nav-item rounded-full px-3.5 py-2 text-sm font-semibold text-[#F7F2EA] transition-all hover:bg-white/10 hover:text-[#E6D3BC]"
            href="tutoriales.html">
            Tutoriales
          </a>
          <a class="nav-item rounded-full px-3.5 py-2 text-sm font-semibold text-[#F7F2EA] transition-all hover:bg-white/10 hover:text-[#E6D3BC]"
            href="sobreNosotros.html">
            Conócenos
          </a>
        </nav>

        <!-- RIGHT ACTIONS -->
        <div class="hidden items-center gap-2 sm:gap-2.5 lg:flex">
          <a href="https://wa.me/51939371250?text=Hola,%20quiero%20más%20información%20sobre%20los%20productos."
            target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-full border border-[#E6D3BC]/30 bg-[#16332B]/80 px-3.5 py-2 text-xs font-bold text-[#F7F2EA] transition-all hover:border-[#A47C52] hover:bg-[#16332B] hover:text-[#E6D3BC]">
            <span class="material-symbols-outlined text-[17px] text-[#3F7D5B]">chat</span>
            <span>WhatsApp</span>
          </a>
          <a href="#catalogo"
            class="inline-flex items-center gap-1.5 rounded-full bg-[#A47C52] px-4 py-2 text-xs font-bold text-white shadow-md shadow-black/20 transition-all hover:scale-105 hover:bg-[#B56F55] active:scale-95">
            <span class="material-symbols-outlined text-[17px]">inventory_2</span>
            <span>155 Insumos</span>
          </a>
        </div>

        <!-- MOBILE TOGGLE BUTTON -->
        <button id="menuToggle"
          class="grid h-10 w-10 place-items-center rounded-xl border border-[#A47C52]/40 bg-[#16332B] text-[#F7F2EA] transition-colors hover:bg-[#16332B]/80 sm:h-11 sm:w-11 sm:rounded-2xl lg:hidden"
          aria-label="Abrir menú" type="button">
          <span class="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </div>

      <!-- MOBILE DRAWER -->
      <div id="mobileMenuWrap"
        class="mt-2 hidden overflow-hidden rounded-2xl border border-[#A47C52]/30 bg-[#23483C]/98 shadow-[0_16px_40px_rgba(15,23,42,0.3)] backdrop-blur-2xl transition-all duration-300 lg:hidden">
        <div class="space-y-1.5 p-3.5 sm:p-4">
          <a href="index.html"
            class="mobile-nav-link flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#16332B]">
            <span class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[19px] text-[#E6D3BC]">home</span>
              <span>Inicio</span>
            </span>
            <span class="material-symbols-outlined text-[18px] text-[#E6D3BC]/60">chevron_right</span>
          </a>

          <a href="productos.html"
            class="mobile-nav-link flex items-center justify-between rounded-xl border border-[#A47C52]/50 bg-[#16332B] px-4 py-3 text-sm font-bold text-[#E6D3BC] transition-colors">
            <span class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[19px] text-[#A47C52]">inventory_2</span>
              <span>Productos (155 disponibles)</span>
            </span>
            <span class="rounded-full bg-[#A47C52] px-2 py-0.5 text-[9px] font-bold uppercase text-white">Activo</span>
          </a>

          <a href="aceites-amazonik.html"
            class="mobile-nav-link flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#16332B]">
            <span class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[19px] text-[#A47C52]">eco</span>
              <span>Aceites Amazoni-k</span>
            </span>
            <span class="rounded-full bg-[#A47C52]/80 px-2 py-0.5 text-[9px] font-bold uppercase text-white">Exclusivo</span>
          </a>

          <a href="tutoriales.html"
            class="mobile-nav-link flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#16332B]">
            <span class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[19px] text-[#E6D3BC]">play_circle</span>
              <span>Tutoriales</span>
            </span>
            <span class="material-symbols-outlined text-[18px] text-[#E6D3BC]/60">chevron_right</span>
          </a>

          <a href="sobreNosotros.html"
            class="mobile-nav-link flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#F7F2EA] transition-colors hover:bg-[#16332B]">
            <span class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[19px] text-[#E6D3BC]">groups</span>
              <span>Conócenos</span>
            </span>
            <span class="material-symbols-outlined text-[18px] text-[#E6D3BC]/60">chevron_right</span>
          </a>

          <!-- MOBILE CTAS -->
          <div class="mt-3 flex flex-col gap-2 border-t border-[#16332B] pt-3">
            <a href="https://wa.me/51939371250?text=Hola,%20quiero%20más%20información%20sobre%20los%20productos."
              target="_blank" rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 rounded-xl border border-[#E6D3BC]/30 bg-[#16332B] py-3 text-xs font-bold text-[#F7F2EA] transition-colors hover:bg-[#16332B]/80">
              <span class="material-symbols-outlined text-[18px] text-[#3F7D5B]">chat</span>
              <span>Contactar por WhatsApp (+51 939 371 250)</span>
            </a>
            <a href="#catalogo"
              class="mobile-nav-link flex items-center justify-center gap-2 rounded-xl bg-[#A47C52] py-3 text-xs font-bold text-white shadow-md shadow-black/20 transition-all hover:bg-[#B56F55]">
              <span class="material-symbols-outlined text-[18px] text-white">shopping_bag</span>
              <span>Ver Catálogo de Insumos</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div id="navSpacer" aria-hidden="true" class="h-0"></div>

  <!-- BREADCRUMBS BAR -->
  <section class="px-3 pt-3 sm:px-5 lg:px-8">
    <div
      class="mx-auto flex max-w-7xl flex-wrap items-center gap-2 rounded-[1.25rem] border border-[#E6D3BC]/60 bg-white/95 p-3 shadow-[0_12px_34px_rgba(22,51,43,0.06)] backdrop-blur-md">
      <button type="button"
        onclick="if (window.history.length > 1) { window.history.back(); } else { window.location.href='index.html'; }"
        class="inline-flex items-center gap-2 rounded-full border border-[#E6D3BC] bg-[#F7F2EA]/60 px-4 py-2 text-sm font-semibold text-[#202520] transition hover:bg-[#EFE9DE]">
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>Volver
      </button>
      <a href="index.html"
        class="inline-flex items-center gap-2 rounded-full bg-[#F7F2EA] border border-[#E6D3BC]/80 px-4 py-2 text-sm font-semibold text-[#23483C] transition hover:bg-[#EFE9DE]">
        <span class="material-symbols-outlined text-[18px]">home</span>Inicio
      </a>
      <span class="inline-flex items-center gap-2 rounded-full bg-[#23483C] px-4 py-2 text-sm font-bold text-[#F7F2EA] shadow-xs">
        <span class="material-symbols-outlined text-[18px] text-[#A47C52]">inventory_2</span>Catálogo de Productos
      </span>
      <a href="https://wa.me/51939371250?text=Hola,%20tengo%20una%20consulta%20sobre%20el%20catálogo%20de%20productos."
        target="_blank" rel="noopener noreferrer"
        class="ml-auto inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100">
        <span class="material-symbols-outlined text-[18px] text-emerald-600">chat</span>Consultar WhatsApp
      </a>
    </div>
  </section>"""

NEW_NAVBAR_JS = """if (window.self !== window.top) {
    document.body.classList.add("embed-mode");
}

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navSpacer = document.getElementById("navSpacer");
const mobileMenuWrap = document.getElementById("mobileMenuWrap");

function updateNavSpacer() {
    if (!navbar || !navSpacer) return;
    if (document.body.classList.contains("embed-mode")) {
        navSpacer.style.height = "0px";
        return;
    }
    const navHeight = Math.ceil(navbar.getBoundingClientRect().height);
    navSpacer.style.height = `${navHeight + 6}px`;
}

// Menu toggle handler
menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!mobileMenuWrap) return;
    mobileMenuWrap.classList.toggle("hidden");
    const icon = menuToggle.querySelector(".material-symbols-outlined");
    if (icon) {
        icon.textContent = mobileMenuWrap.classList.contains("hidden") ? "menu" : "close";
    }
    updateNavSpacer();
});

// Close mobile menu on clicking any mobile nav link
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        if (!mobileMenuWrap) return;
        mobileMenuWrap.classList.add("hidden");
        const icon = menuToggle?.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = "menu";
        updateNavSpacer();
    });
});

// Close mobile menu on click outside
document.addEventListener("click", (e) => {
    if (mobileMenuWrap && !mobileMenuWrap.classList.contains("hidden")) {
        if (!navbar?.contains(e.target)) {
            mobileMenuWrap.classList.add("hidden");
            const icon = menuToggle?.querySelector(".material-symbols-outlined");
            if (icon) icon.textContent = "menu";
            updateNavSpacer();
        }
    }
});

// Window scroll shadow dynamic effect
window.addEventListener("scroll", () => {
    const container = navbar?.querySelector(".max-w-7xl > div");
    if (!container) return;
    if (window.scrollY > 15) {
        container.classList.add("shadow-[0_16px_50px_rgba(22,51,43,0.45)]");
    } else {
        container.classList.remove("shadow-[0_16px_50px_rgba(22,51,43,0.45)]");
    }
}, { passive: true });

updateNavSpacer();
window.addEventListener("load", updateNavSpacer);
window.addEventListener("resize", () => {
    updateNavSpacer();
    if (window.innerWidth >= 1024 && mobileMenuWrap) {
        mobileMenuWrap.classList.add("hidden");
        const icon = menuToggle?.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = "menu";
    }
});
"""

def update_productos_html():
    p = ROOT / "productos.html"
    content = p.read_text(encoding="utf-8")
    
    # Normalize CRLF to LF for reliable slicing
    has_crlf = "\r\n" in content
    lines = content.replace("\r\n", "\n").split("\n")
    
    start_idx = None
    end_idx = None
    
    for i, line in enumerate(lines):
        if '<!-- NAVBAR -->' in line and start_idx is None:
            start_idx = i
        if '<div class="container">' in line and start_idx is not None:
            end_idx = i
            break
            
    if start_idx is None or end_idx is None:
        print("ERROR: could not find NAVBAR start or container end markers")
        sys.exit(1)
        
    print(f"Found navbar section: lines {start_idx + 1} to {end_idx}")
    
    new_lines = lines[:start_idx] + [NEW_NAVBAR_HTML] + lines[end_idx:]
    new_content = "\n".join(new_lines)
    if has_crlf:
        new_content = new_content.replace("\n", "\r\n")
        
    p.write_text(new_content, encoding="utf-8")
    print(f"Updated productos.html (total lines now: {len(new_lines)})")

def update_navbar_js():
    p = ROOT / "js" / "navbar.js"
    p.write_text(NEW_NAVBAR_JS, encoding="utf-8", newline="\n")
    print("Updated js/navbar.js")

if __name__ == "__main__":
    update_productos_html()
    update_navbar_js()
    print("Navbar redesign applied successfully!")
