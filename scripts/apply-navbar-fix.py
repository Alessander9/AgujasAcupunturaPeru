#!/usr/bin/env python3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

NAVBAR_CSS = """
/* ============================================================
   PREMIUM REDESIGNED NAVBAR STYLES (EXPLICIT BULLETPROOF CSS)
   ============================================================ */
#navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    padding: 10px 16px 0;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar-wrapper {
    max-width: 1360px;
    margin: 0 auto;
}

.navbar-inner {
    background: linear-gradient(135deg, rgba(35, 72, 60, 0.98) 0%, rgba(22, 51, 43, 0.99) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(164, 124, 82, 0.45);
    border-radius: 999px;
    padding: 7px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 12px 36px rgba(22, 51, 43, 0.38);
    transition: all 0.3s ease;
}

#navbar.scrolled .navbar-inner {
    box-shadow: 0 16px 44px rgba(22, 51, 43, 0.55);
    background: rgba(22, 51, 43, 0.99);
}

/* Brand */
.navbar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: #F7F2EA;
}

.brand-icon-box {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #16332B;
    border: 1px solid rgba(164, 124, 82, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
    flex-shrink: 0;
    transition: transform 0.25s ease;
}

.navbar-brand:hover .brand-icon-box {
    transform: scale(1.06);
    border-color: #A47C52;
}

.brand-icon {
    font-size: 22px !important;
    color: #A47C52;
}

.brand-title-wrap {
    display: flex;
    flex-direction: column;
}

.brand-title {
    font-size: 14.5px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F7F2EA;
    display: flex;
    align-items: center;
    gap: 6px;
    line-height: 1.2;
}

.brand-badge {
    background: #A47C52;
    color: #FFFFFF !important;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 2px 7px;
    border-radius: 999px;
    display: inline-block;
    line-height: 1.2;
}

.brand-subtitle {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #E6D3BC;
    opacity: 0.85;
    margin: 2px 0 0;
}

/* Nav Links */
.navbar-nav {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.navbar-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 15px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    color: #F7F2EA;
    text-decoration: none;
    transition: all 0.2s ease;
    border: 1px solid transparent;
}

.navbar-link:hover {
    color: #E6D3BC;
    background: rgba(255, 255, 255, 0.09);
}

.navbar-link.active {
    background: #16332B;
    color: #E6D3BC;
    border: 1px solid rgba(164, 124, 82, 0.6);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
    font-weight: 700;
}

.navbar-link.highlight {
    background: #16332B;
    border: 1px solid rgba(164, 124, 82, 0.5);
    color: #F7F2EA;
}

.navbar-link.highlight:hover {
    background: #A47C52;
    color: #FFFFFF;
}

.nav-icon {
    font-size: 16px !important;
    color: #A47C52;
}

.nav-icon-accent {
    font-size: 16px !important;
    color: #A47C52;
}

.nav-tag {
    background: #A47C52;
    color: #FFFFFF !important;
    font-size: 8.5px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 1px 6px;
    border-radius: 999px;
    letter-spacing: 0.05em;
    line-height: 1.2;
}

/* Actions Right */
.navbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-nav-wa {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 15px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 700;
    color: #F7F2EA;
    background: rgba(22, 51, 43, 0.85);
    border: 1px solid rgba(230, 211, 188, 0.35);
    text-decoration: none;
    transition: all 0.2s ease;
}

.btn-nav-wa:hover {
    border-color: #A47C52;
    background: #16332B;
    color: #E6D3BC;
}

.wa-icon {
    font-size: 17px !important;
    color: #3F7D5B;
}

.btn-nav-catalog {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 18px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 700;
    color: #FFFFFF !important;
    background: linear-gradient(135deg, #A47C52 0%, #8C653E 100%);
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
    text-decoration: none;
    transition: all 0.25s ease;
    border: none;
}

.btn-nav-catalog:hover {
    background: linear-gradient(135deg, #B56F55 0%, #A47C52 100%);
    transform: translateY(-1px);
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.35);
    color: #FFFFFF !important;
}

.catalog-icon {
    font-size: 17px !important;
    color: #FFFFFF;
}

/* Mobile Toggle */
.navbar-toggle {
    display: none;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #16332B;
    border: 1px solid rgba(164, 124, 82, 0.4);
    color: #F7F2EA;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease;
}

.navbar-toggle:hover {
    background: rgba(22, 51, 43, 0.8);
}

/* Mobile Drawer */
#mobileMenuWrap {
    margin-top: 8px;
    background: rgba(22, 51, 43, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(164, 124, 82, 0.35);
    border-radius: 20px;
    padding: 12px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
    transition: all 0.3s ease;
}

#mobileMenuWrap.hidden {
    display: none !important;
}

.mobile-nav-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.mobile-nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 14px;
    border-radius: 12px;
    color: #F7F2EA;
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 600;
    transition: all 0.2s ease;
}

.mobile-nav-item:hover {
    background: rgba(255, 255, 255, 0.08);
}

.mobile-nav-item.active {
    background: #16332B;
    border: 1px solid rgba(164, 124, 82, 0.5);
    color: #E6D3BC;
}

.mobile-item-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.mobile-badge {
    background: #A47C52;
    color: #FFFFFF !important;
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 999px;
}

.mobile-badge-accent {
    background: rgba(164, 124, 82, 0.8);
    color: #FFFFFF !important;
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 999px;
}

.mobile-actions {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(164, 124, 82, 0.2);
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.btn-mobile-wa {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #16332B;
    border: 1px solid rgba(230, 211, 188, 0.3);
    color: #F7F2EA;
    padding: 11px;
    border-radius: 12px;
    font-size: 12.5px;
    font-weight: 700;
    text-decoration: none;
}

.btn-mobile-catalog {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #A47C52;
    color: #FFFFFF !important;
    padding: 11px;
    border-radius: 12px;
    font-size: 12.5px;
    font-weight: 700;
    text-decoration: none;
}

/* Subtle Hero Breadcrumb */
.hero-breadcrumb {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--muted);
    margin-bottom: 12px;
    background: rgba(22, 51, 43, 0.04);
    padding: 4px 12px;
    border-radius: 999px;
    border: 1px solid var(--line);
    width: fit-content;
}

.hero-breadcrumb a {
    color: var(--brand);
    text-decoration: none;
    transition: color 0.2s;
}

.hero-breadcrumb a:hover {
    color: var(--accent);
}

.hero-breadcrumb .sep {
    color: var(--line);
}

.hero-breadcrumb .current {
    color: var(--text);
    font-weight: 700;
}

@media (max-width: 1024px) {
    .navbar-nav,
    .navbar-actions {
        display: none !important;
    }
    .navbar-toggle {
        display: flex !important;
    }
    .brand-subtitle {
        display: none !important;
    }
}
"""

NAVBAR_HTML = """  <!-- NAVBAR -->
  <header id="navbar">
    <div class="navbar-wrapper">
      <div class="navbar-inner">
        <!-- BRAND LOGO -->
        <a href="index.html" class="navbar-brand">
          <div class="brand-icon-box">
            <span class="material-symbols-outlined brand-icon">spa</span>
          </div>
          <div class="brand-title-wrap">
            <div class="brand-title">
              <span>Agujas Acupuntura</span>
              <span class="brand-badge">Perú</span>
            </div>
            <p class="brand-subtitle">Insumos Profesionales y Terapéuticos</p>
          </div>
        </a>

        <!-- DESKTOP NAVIGATION -->
        <nav id="desktopMenu" class="navbar-nav" aria-label="Navegación principal">
          <a class="navbar-link" href="index.html">Inicio</a>
          <a class="navbar-link active" href="productos.html">
            <span class="material-symbols-outlined nav-icon">inventory_2</span>
            <span>Productos</span>
          </a>
          <a class="navbar-link highlight" href="aceites-amazonik.html">
            <span class="material-symbols-outlined nav-icon-accent">eco</span>
            <span>Aceites Amazoni-k</span>
            <span class="nav-tag">Top</span>
          </a>
          <a class="navbar-link" href="tutoriales.html">Tutoriales</a>
          <a class="navbar-link" href="sobreNosotros.html">Conócenos</a>
        </nav>

        <!-- RIGHT ACTIONS -->
        <div class="navbar-actions">
          <a href="https://wa.me/51939371250?text=Hola,%20quiero%20más%20información%20sobre%20los%20productos."
            target="_blank" rel="noopener noreferrer" class="btn-nav-wa">
            <span class="material-symbols-outlined wa-icon">chat</span>
            <span>WhatsApp</span>
          </a>
          <a href="#catalogo" class="btn-nav-catalog">
            <span class="material-symbols-outlined catalog-icon">inventory_2</span>
            <span>155 Insumos</span>
          </a>
        </div>

        <!-- MOBILE TOGGLE BUTTON -->
        <button id="menuToggle" class="navbar-toggle" aria-label="Abrir menú" type="button">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>

      <!-- MOBILE DRAWER -->
      <div id="mobileMenuWrap" class="hidden">
        <div class="mobile-nav-list">
          <a href="index.html" class="mobile-nav-item mobile-nav-link">
            <span class="mobile-item-left">
              <span class="material-symbols-outlined">home</span>
              <span>Inicio</span>
            </span>
            <span class="material-symbols-outlined">chevron_right</span>
          </a>

          <a href="productos.html" class="mobile-nav-item mobile-nav-link active">
            <span class="mobile-item-left">
              <span class="material-symbols-outlined">inventory_2</span>
              <span>Productos (155 disponibles)</span>
            </span>
            <span class="mobile-badge">Activo</span>
          </a>

          <a href="aceites-amazonik.html" class="mobile-nav-item mobile-nav-link highlight">
            <span class="mobile-item-left">
              <span class="material-symbols-outlined">eco</span>
              <span>Aceites Amazoni-k</span>
            </span>
            <span class="mobile-badge-accent">Exclusivo</span>
          </a>

          <a href="tutoriales.html" class="mobile-nav-item mobile-nav-link">
            <span class="mobile-item-left">
              <span class="material-symbols-outlined">play_circle</span>
              <span>Tutoriales</span>
            </span>
            <span class="material-symbols-outlined">chevron_right</span>
          </a>

          <a href="sobreNosotros.html" class="mobile-nav-item mobile-nav-link">
            <span class="mobile-item-left">
              <span class="material-symbols-outlined">groups</span>
              <span>Conócenos</span>
            </span>
            <span class="material-symbols-outlined">chevron_right</span>
          </a>

          <!-- MOBILE CTAS -->
          <div class="mobile-actions">
            <a href="https://wa.me/51939371250?text=Hola,%20quiero%20más%20información%20sobre%20los%20productos."
              target="_blank" rel="noopener noreferrer" class="btn-mobile-wa">
              <span class="material-symbols-outlined">chat</span>
              <span>Contactar por WhatsApp (+51 939 371 250)</span>
            </a>
            <a href="#catalogo" class="btn-mobile-catalog mobile-nav-link">
              <span class="material-symbols-outlined">shopping_bag</span>
              <span>Ver Catálogo de Insumos</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div id="navSpacer" aria-hidden="true"></div>"""

def update_css():
    p = ROOT / "css" / "catalogo.css"
    css = p.read_text(encoding="utf-8")
    if "PREMIUM REDESIGNED NAVBAR STYLES" not in css:
        css = css.rstrip() + "\n" + NAVBAR_CSS + "\n"
        p.write_text(css, encoding="utf-8")
        print("css/catalogo.css updated with dedicated navbar styles.")
    else:
        # replace existing section
        idx = css.find("/* ============================================================\n   PREMIUM REDESIGNED NAVBAR STYLES")
        if idx != -1:
            css = css[:idx].rstrip() + "\n" + NAVBAR_CSS + "\n"
            p.write_text(css, encoding="utf-8")
            print("css/catalogo.css navbar styles updated.")

def update_html():
    p = ROOT / "productos.html"
    content = p.read_text(encoding="utf-8")
    lines = content.replace("\r\n", "\n").split("\n")

    start_idx = None
    container_idx = None

    for i, line in enumerate(lines):
        if '<!-- NAVBAR -->' in line and start_idx is None:
            start_idx = i
        if '<div class="container">' in line and start_idx is not None:
            container_idx = i
            break

    if start_idx is None or container_idx is None:
        print("ERROR: could not find navbar section")
        sys.exit(1)

    # Insert NAVBAR_HTML, then container, then inside hero-copy add breadcrumb if not present
    new_lines = lines[:start_idx] + [NAVBAR_HTML] + lines[container_idx:]
    
    # Check if hero-breadcrumb exists in hero-copy
    html_joined = "\n".join(new_lines)
    if 'hero-breadcrumb' not in html_joined:
        target = '<div class="panel hero-copy">\n        <h1>'
        replacement = '<div class="panel hero-copy">\n        <div class="hero-breadcrumb">\n          <a href="index.html">Inicio</a>\n          <span class="sep">/</span>\n          <span class="current">Catálogo de Insumos</span>\n        </div>\n        <h1>'
        if target in html_joined:
            html_joined = html_joined.replace(target, replacement, 1)
        else:
            # Try with other whitespace
            target2 = '<div class="panel hero-copy">'
            replacement2 = '<div class="panel hero-copy">\n        <div class="hero-breadcrumb">\n          <a href="index.html">Inicio</a>\n          <span class="sep">/</span>\n          <span class="current">Catálogo de Insumos</span>\n        </div>'
            html_joined = html_joined.replace(target2, replacement2, 1)

    if "\r\n" in content:
        html_joined = html_joined.replace("\n", "\r\n")

    p.write_text(html_joined, encoding="utf-8")
    print(f"productos.html updated successfully!")

if __name__ == "__main__":
    update_css()
    update_html()
