import { PRODUCTS_CATALOG } from '../src/data/productsData.js';
import { AMAZONIK_PRODUCTS } from '../src/data/amazonikData.js';
import fs from 'fs';

function cleanSpanishText(text) {
  if (!text) return '';
  return text
    .replace(/Lnea/g, 'Línea')
    .replace(/lnea/g, 'línea')
    .replace(/Catlogo/g, 'Catálogo')
    .replace(/catlogo/g, 'catálogo')
    .replace(/Lminas/g, 'Láminas')
    .replace(/lminas/g, 'láminas')
    .replace(/especficos/g, 'específicos')
    .replace(/especficas/g, 'específicas')
    .replace(/especfico/g, 'específico')
    .replace(/especfica/g, 'específica')
    .replace(/fras/g, 'frías')
    .replace(/fra/g, 'fría')
    .replace(/teraputicas/g, 'terapéuticas')
    .replace(/teraputica/g, 'terapéutica')
    .replace(/teraputicos/g, 'terapéuticos')
    .replace(/teraputico/g, 'terapéutico')
    .replace(/Presentacin/g, 'Presentación')
    .replace(/presentacin/g, 'presentación')
    .replace(/Puncin/g, 'Punción')
    .replace(/puncin/g, 'punción')
    .replace(/mltiples/g, 'múltiples')
    .replace(/Prubalas/g, 'Pruébalas')
    .replace(/Sern/g, 'Serán')
    .replace(/Envo/g, 'Envío')
    .replace(/envo/g, 'envío')
    .replace(/Per/g, 'Perú')
    .replace(/Ms/g, 'Más')
    .replace(/ms/g, 'más')
    .replace(/informacin/g, 'información')
    .replace(/precisin/g, 'precisión')
    .replace(/mnima/g, 'mínima')
    .replace(/adems/g, 'además')
    .replace(/prctico/g, 'práctico')
    .replace(/fcil/g, 'fácil')
    .replace(/descripcin/g, 'descripción')
    .replace(/Moxibustin/g, 'Moxibustión')
    .replace(/moxibustin/g, 'moxibustión')
    .replace(/simultneamente/g, 'simultáneamente')
    .replace(/teraptico/g, 'terapéutico')
    .replace(/teraputico/g, 'terapéutico')
    .replace(/clnicos/g, 'clínicos')
    .replace(/clnico/gi, 'clínico')
    .replace(/estndar/g, 'estándar')
    .replace(/tubo gua/g, 'tubo guía')
    .replace(/Koáreanas/g, 'Koreanas')
    .replace(/Perúfectas/g, 'Perfectas')
    .replace(/Perúfecta/g, 'Perfecta')
    .replace(/[\r\n]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function extractMeasures(text) {
  if (!text) return [];
  const regex = /(\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*(?:mm|cm)|(?:\d+)\s*(?:ml|piezas|copas|unidades|uds|unds|puros))/gi;
  const matches = text.match(regex) || [];
  return Array.from(new Set(matches.map(m => m.trim())));
}

const fullProductsList = [];

// 1. Catálogo General (155 productos)
PRODUCTS_CATALOG.forEach(p => {
  const fullDescClean = cleanSpanishText(p.descripcionCompleta || p.descripcionResumen || '');
  const summaryClean = cleanSpanishText(p.descripcionResumen || '');
  const measures = extractMeasures(p.descripcionCompleta || p.nombre || '');
  const featuresList = p.features?.map(f => `${f.label}: ${f.sub}`) || [];

  fullProductsList.push({
    id: p.id,
    slug: p.slug || '',
    sku: p.sku || `PROD-${p.id}`,
    nombre: cleanSpanishText(p.nombre),
    categoria: p.categoria || 'Insumos Generales',
    marca: p.marca || 'Agujas Acupuntura Perú',
    precio: p.precio,
    precioTexto: p.precioTexto || `S/ ${Number(p.precio).toFixed(2)}`,
    precioOriginal: p.precioOriginal || (p.precio ? `S/ ${(p.precio * 1.2).toFixed(2)}` : null),
    descuento: p.descuento || (p.precioOriginal ? '-15%' : null),
    enStock: p.enStock !== false,
    rating: p.rating || 5,
    reviewsCount: p.reviewsCount || 48,
    badge: p.badge || 'Recomendado',
    medidasDisponibles: measures,
    descripcionResumen: summaryClean,
    descripcionCompleta: fullDescClean,
    descripcionBloques: (p.descripcionBloques || []).map(b => cleanSpanishText(b)).filter(Boolean),
    caracteristicas: featuresList,
    imagenes: p.imagenes || (p.imagen ? [p.imagen] : []),
    pagina: p.pagina || 1,
    urlOriginal: p.url || `https://www.agujasacupunturaperu.com/product-page/${p.slug || p.id}`
  });
});

// 2. Línea Exclusiva Amazoni-k (4 productos)
AMAZONIK_PRODUCTS.forEach(a => {
  fullProductsList.push({
    id: a.id,
    slug: a.id,
    sku: a.sku || 'AMZ-OIL',
    nombre: a.name,
    categoria: 'Aceites y Aromaterapia Amazoni-k',
    marca: 'Amazoni-k',
    precio: parseFloat(a.price.replace(/[^0-9.]/g, '')),
    precioTexto: a.price,
    precioOriginal: `S/ ${(parseFloat(a.price.replace(/[^0-9.]/g, '')) * 1.25).toFixed(2)}`,
    descuento: '-20%',
    enStock: a.inStock !== false,
    rating: a.rating || 5,
    reviewsCount: a.reviews || 30,
    badge: a.badge || '100% Puro',
    medidasDisponibles: [a.volume || '30 ml'],
    descripcionResumen: a.subtitle,
    descripcionCompleta: a.description,
    descripcionBloques: [a.subtitle, a.description, ...(a.benefits || [])],
    caracteristicas: a.benefits || [],
    imagenes: [a.image],
    pagina: 1,
    urlOriginal: 'https://www.agujasacupunturaperu.com/aceites-amazonik'
  });
});

const jsonOutput = JSON.stringify(fullProductsList, null, 2);

// Save to root, src/data, src/lib and public
fs.writeFileSync('./productos_completos.json', jsonOutput, 'utf-8');
fs.writeFileSync('./src/data/productos_completos.json', jsonOutput, 'utf-8');
fs.writeFileSync('./public/productos_completos.json', jsonOutput, 'utf-8');
fs.writeFileSync('./products.json', jsonOutput, 'utf-8');
fs.writeFileSync('./src/lib/products.json', jsonOutput, 'utf-8');

console.log(`¡Éxito! Se generó el archivo JSON limpio con ${fullProductsList.length} productos completos.`);
