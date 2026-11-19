/**
 * scripts/prerender-seo.js
 *
 * Pre-Renderizador Estático de HTML (SSG) para SEO y GEO (Generative Engine Optimization).
 * Se ejecuta automáticamente después de `vite build` y genera archivos HTML estáticos reales
 * en `dist/` para:
 *   1. Todas las rutas principales (/productos, /aceites-amazonik, /videos, /tutoriales, /sobre-nosotros, etc.)
 *   2. Los 161 productos individuales (/producto/<slug>/index.html)
 *
 * Cada archivo incluye en el HTML crudo (0ms, sin requerir ejecución de JS por parte del crawler):
 *   - <title> específico con precio en Soles (S/)
 *   - <meta name="description">, Open Graph y Twitter Cards específicos
 *   - <link rel="canonical"> exacto
 *   - <script type="application/ld+json"> con el Schema.org completo (Product, Offer, ItemList, VideoObject)
 *   - <noscript> semántico rico con toda la ficha técnica del producto o sección
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const BASE_URL = 'https://www.agujasacupunturaperu.com';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtmlFromTemplate(template, { title, description, canonical, ogImage, ogType = 'website', jsonLd, noscriptHtml }) {
  let html = template;

  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCanonical = escapeHtml(canonical);
  const safeImg = escapeHtml(ogImage || `${BASE_URL}/agujaslogo.png`);

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${safeDesc}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${safeCanonical}" />`
  );

  // Replace Open Graph
  html = html.replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${ogType}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${safeDesc}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${safeImg}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${safeCanonical}" />`);

  // Replace Twitter Cards
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${safeTitle}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${safeDesc}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${safeImg}" />`);

  // Inject route-specific JSON-LD right before </head>
  if (jsonLd) {
    const jsonScript = `  <!-- Pre-rendered Route Schema.org JSON-LD -->\n  <script id="prerendered-route-schema" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>\n</head>`;
    html = html.replace(/<\/head>/i, jsonScript);
  }

  // Replace <noscript> content for crawlers that don't run JS
  if (noscriptHtml) {
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, `<noscript>\n${noscriptHtml}\n  </noscript>`);
  }

  return html;
}

function writeRouteHtml(routePath, htmlContent) {
  const cleanRoute = routePath.replace(/^\/+|\/+$/g, '');
  if (!cleanRoute) return;
  const targetDir = path.join(distDir, cleanRoute);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf-8');
}

function runPrerender() {
  const baseIndexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(baseIndexPath)) {
    console.error('[prerender-seo] No se encontró dist/index.html. Ejecuta vite build primero.');
    process.exit(1);
  }

  const template = fs.readFileSync(baseIndexPath, 'utf-8');
  const productsPath = path.join(rootDir, 'src', 'data', 'productos_completos.json');
  const products = fs.existsSync(productsPath)
    ? JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
    : [];

  // 1. Static primary routes
  const staticPages = [
    {
      route: '/productos',
      title: 'Catálogo de Agujas de Acupuntura, Moxas y Ventosas en Perú | Precios Oficiales',
      description: `Explora nuestro catálogo oficial de ${products.length} insumos médicos de acupuntura, moxibustión, ventosas, electroacupuntores, fisioterapia y auriculoterapia en Lima y todo el Perú.`,
      canonical: `${BASE_URL}/productos`,
      noscriptHtml: `    <main style="max-width:960px;margin:2rem auto;padding:1.5rem;font-family:sans-serif;line-height:1.6;">
      <h1>Catálogo de Agujas de Acupuntura e Insumos Médicos en Perú (${products.length} productos)</h1>
      <p>Venta directa en Lima (Av. Julio César Tello 438, Lince | WhatsApp +51 930 830 427) y envíos diarios a todo el Perú por Shalom, Olva Courier y Marvisur.</p>
      <ul>
${products.slice(0, 80).map(p => {
  const slug = p.slug || `prod-${p.id}`;
  const priceText = p.precioTexto || (p.precio ? `S/ ${Number(p.precio).toFixed(2)}` : 'Consultar');
  return `        <li><a href="${BASE_URL}/producto/${encodeURIComponent(slug)}"><strong>${escapeHtml(p.nombre)}</strong></a> — ${escapeHtml(priceText)} (${escapeHtml(p.categoria || 'Acupuntura')})</li>`;
}).join('\n')}
      </ul>
    </main>`
    },
    {
      route: '/aceites-amazonik',
      title: 'Aceites Amazoni-k 100% Puros: Copaiba, Sangre de Grado y Palo Santo en Perú',
      description: 'Venta de aceites esenciales y resinas medicinales de la Amazonía peruana: Copaiba (S/ 35), Sangre de Grado (S/ 30), Aguaje (S/ 40) y Palo Santo (S/ 45). Grado clínico en Lima y Perú.',
      canonical: `${BASE_URL}/aceites-amazonik`,
      noscriptHtml: `    <main style="max-width:960px;margin:2rem auto;padding:1.5rem;font-family:sans-serif;line-height:1.6;">
      <h1>Aceites Esenciales y Resinas Amazónicas Amazoni-k 100% Puros</h1>
      <ul>
        <li><strong>Aceite Puro de Copaiba Amazónica (30 ml)</strong> — S/ 35.00: Antiinflamatorio articular y muscular para masoterapia.</li>
        <li><strong>Sangre de Grado Pura Certificada (30 ml)</strong> — S/ 30.00: Cicatrizante y regenerador tisular clínico.</li>
        <li><strong>Aceite Esencial Puro de Palo Santo (15 ml)</strong> — S/ 45.00: Aromaterapia, relajación y descontracturante.</li>
        <li><strong>Elixir Terapéutico Aguaje &amp; Rosa Mosqueta (30 ml)</strong> — S/ 40.00: Masaje facial con Guasha y ventosas.</li>
      </ul>
    </main>`
    },
    {
      route: '/videos',
      title: 'Videos: Demostraciones y Usos de Agujas de Acupuntura y Equipos | Perú',
      description: 'Mira 17 demostraciones en video sobre cómo usar agujas de acupuntura con tubo guía, ventosas, electroacupuntor SDZ-IIB, piedras calientes y férulas en Perú.',
      canonical: `${BASE_URL}/videos`
    },
    {
      route: '/tutoriales',
      title: 'Tutoriales Clínicos de Acupuntura, Tabla de Calibres y Ventosas | Perú',
      description: 'Guía técnica de calibres de agujas de acupuntura (0.18x13mm, 0.25x25mm, 0.25x40mm, 0.30x50mm, 0.30x75mm), tutoriales de parálisis facial y cobertura de envíos en Perú.',
      canonical: `${BASE_URL}/tutoriales`
    },
    {
      route: '/sobre-nosotros',
      title: 'Sobre Nosotros y Sede en Lince | Agujas Acupuntura Perú - Instituto de Terapias Integrales',
      description: 'Visítanos en Av. Julio César Tello 438, Lince, Lima. Principal distribuidor de suministros médicos e insumos de acupuntura certificados en el Perú.',
      canonical: `${BASE_URL}/sobre-nosotros`
    },
    {
      route: '/checkout',
      title: 'Finalizar Pedido por WhatsApp | Agujas Acupuntura Perú',
      description: 'Completa tu pedido de agujas de acupuntura e insumos médicos con pago por Yape o BCP y envíos en 24-48h en Lima y a todo el Perú.',
      canonical: `${BASE_URL}/checkout`
    },
    {
      route: '/politica-privacidad',
      title: 'Política de Privacidad y Protección de Datos (Ley N.° 29733) | Agujas Acupuntura Perú',
      description: 'Política oficial de privacidad y tratamiento de datos personales conforme a la Ley N.° 29733 del Perú.',
      canonical: `${BASE_URL}/politica-privacidad`
    },
    {
      route: '/terminos-y-condiciones',
      title: 'Términos y Condiciones Comerciales | Agujas Acupuntura Perú',
      description: 'Condiciones de compra, envíos a Lima y provincias, garantías de esterilidad y medios de pago oficiales del Instituto de Terapias Integrales Perú.',
      canonical: `${BASE_URL}/terminos-y-condiciones`
    }
  ];

  staticPages.forEach((page) => {
    const html = buildHtmlFromTemplate(template, page);
    writeRouteHtml(page.route, html);
  });

  // 2. Pre-render every single product page (/producto/<slug>/index.html)
  let productCount = 0;
  products.forEach((p) => {
    const slug = p.slug || `prod-${p.id}`;
    const canonical = `${BASE_URL}/producto/${encodeURIComponent(slug)}`;
    const numPrice = typeof p.precio === 'number'
      ? p.precio
      : parseFloat(String(p.precio || '0').replace(/[^0-9.]/g, '')) || 0;
    const hasPrice = numPrice > 0 && !p.sinPrecio;
    const priceLabel = hasPrice ? ` — S/ ${numPrice.toFixed(2)}` : '';

    const title = `${p.nombre}${priceLabel} | Agujas Acupuntura Perú`;
    const rawDesc = p.descripcionResumen || p.descripcionCompleta || `Compra ${p.nombre} en Lima y todo el Perú. Insumo médico certificado con envío en 24-48h.`;
    const description = rawDesc.replace(/\s+/g, ' ').trim().slice(0, 160);

    const firstImg = (p.imagenes && p.imagenes[0]) || p.imagen || '/agujaslogo.png';
    const ogImage = firstImg.startsWith('http')
      ? firstImg
      : `${BASE_URL}${firstImg.startsWith('/') ? '' : '/'}${firstImg}`;

    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${canonical}#product`,
      'name': p.nombre,
      'url': canonical,
      'image': [ogImage],
      'description': (p.descripcionCompleta || p.descripcionResumen || description).replace(/\s+/g, ' ').trim(),
      'sku': p.sku || p.id,
      'mpn': p.id,
      'brand': {
        '@type': 'Brand',
        'name': p.marca || 'Agujas Acupuntura Perú'
      },
      'category': p.categoria || 'Insumos de Acupuntura'
    };

    if (hasPrice) {
      productSchema.offers = {
        '@type': 'Offer',
        'url': canonical,
        'priceCurrency': 'PEN',
        'price': numPrice.toFixed(2),
        'priceValidUntil': '2027-12-31',
        'itemCondition': 'https://schema.org/NewCondition',
        'availability': p.enStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'seller': {
          '@type': 'Organization',
          'name': 'Agujas Acupuntura Perú - Instituto de Terapias Integrales Perú'
        }
      };
    }

    const noscriptHtml = `    <article style="max-width:860px;margin:2rem auto;padding:1.5rem;font-family:sans-serif;line-height:1.6;">
      <nav><a href="${BASE_URL}/">Inicio</a> &rsaquo; <a href="${BASE_URL}/productos">Catálogo</a> &rsaquo; <span>${escapeHtml(p.categoria || 'Insumos')}</span></nav>
      <h1>${escapeHtml(p.nombre)}</h1>
      <p><strong>Precio en Perú:</strong> ${hasPrice ? `S/ ${numPrice.toFixed(2)} (PEN)` : 'Consultar por WhatsApp'} | <strong>Disponibilidad:</strong> ${p.enStock !== false ? 'En Stock para entrega inmediata' : 'Agotado'}</p>
      <p><strong>SKU:</strong> ${escapeHtml(p.sku || p.id)} | <strong>Marca:</strong> ${escapeHtml(p.marca || 'Agujas Acupuntura Perú')} | <strong>Categoría:</strong> ${escapeHtml(p.categoria || 'Acupuntura')}</p>
      <p>${escapeHtml(p.descripcionCompleta || p.descripcionResumen || description)}</p>
      <p><strong>Tienda física y recojo:</strong> Av. Julio César Tello 438, Lince, Lima | <strong>Pedidos por WhatsApp:</strong> <a href="https://wa.me/51930830427">+51 930 830 427</a> (Envíos en Lima 24-48h y a todo el Perú por Shalom y Olva Courier).</p>
    </article>`;

    const html = buildHtmlFromTemplate(template, {
      title,
      description,
      canonical,
      ogImage,
      ogType: 'product',
      jsonLd: productSchema,
      noscriptHtml
    });

    writeRouteHtml(`producto/${slug}`, html);
    productCount++;
  });

  console.log(`[prerender-seo] Pre-renderizado completado: ${staticPages.length} páginas principales + ${productCount} fichas de producto HTML en dist/.`);
}

runPrerender();
