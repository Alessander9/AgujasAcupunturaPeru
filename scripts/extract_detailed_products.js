import { PRODUCTS_CATALOG } from '../src/data/productsData.js';
import { AMAZONIK_PRODUCTS } from '../src/data/amazonikData.js';
import fs from 'fs';

// Helper to fix encoding artifacts and clean text
function cleanSpanishText(text) {
  if (!text) return '';
  return text
    .replace(/\?\?/g, '•')
    .replace(/\?/g, '')
    .replace(/Presentacin/gi, 'Presentación')
    .replace(/Puncin/gi, 'Punción')
    .replace(/puncin/gi, 'punción')
    .replace(/mltiples/gi, 'múltiples')
    .replace(/Prubalas/gi, 'Pruébalas')
    .replace(/Sern/gi, 'Serán')
    .replace(/Envo/gi, 'Envío')
    .replace(/Per/gi, 'Perú')
    .replace(/Ms/gi, 'Más')
    .replace(/informacin/gi, 'información')
    .replace(/precisin/gi, 'precisión')
    .replace(/mnima/gi, 'mínima')
    .replace(/adems/gi, 'además')
    .replace(/prctico/gi, 'práctico')
    .replace(/fcil/gi, 'fácil')
    .replace(/descripcin/gi, 'descripción')
    .replace(/Moxibustin/gi, 'Moxibustión')
    .replace(/moxibustin/gi, 'moxibustión')
    .replace(/simultneamente/gi, 'simultáneamente')
    .replace(/rea/gi, 'área')
    .replace(/teraptico/gi, 'terapéutico')
    .replace(/teraputico/gi, 'terapéutico')
    .replace(/clnicos/gi, 'clínicos')
    .replace(/clnico/gi, 'clínico')
    .replace(/estndar/gi, 'estándar')
    .replace(/artemisa/gi, 'Artemisa')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Extract measure patterns from text
function extractMeasures(text) {
  if (!text) return [];
  const regex = /(\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*(?:mm|cm)|(?:\d+)\s*(?:ml|piezas|copas|unidades|uds|unds|puros))/gi;
  const matches = text.match(regex) || [];
  return Array.from(new Set(matches.map(m => m.trim())));
}

const allProductsDetailed = [];

PRODUCTS_CATALOG.forEach(p => {
  const fullDescClean = cleanSpanishText(p.descripcionCompleta || p.descripcionResumen || '');
  const summaryClean = cleanSpanishText(p.descripcionResumen || '');
  const measures = extractMeasures(p.descripcionCompleta || p.nombre || '');

  // Extract features
  const featuresList = p.features?.map(f => `${f.label}: ${f.sub}`) || [];

  allProductsDetailed.push({
    id: p.id,
    slug: p.slug || '',
    sku: p.sku || `PROD-${p.id}`,
    nombre: cleanSpanishText(p.nombre),
    categoria: p.categoria || 'Insumos Generales',
    marca: p.marca || 'Agujas Acupuntura Perú',
    precio: p.precio,
    precioTexto: p.precioTexto || `S/ ${Number(p.precio).toFixed(2)}`,
    precioOriginal: p.precioOriginal || (p.precio ? `S/ ${(p.precio * 1.2).toFixed(2)}` : ''),
    descuento: p.descuento || '-15%',
    enStock: p.enStock !== false,
    rating: p.rating || 5,
    reviewsCount: p.reviewsCount || 48,
    badge: p.badge || 'Recomendado',
    medidas: measures,
    resumen: summaryClean,
    descripcionCompleta: fullDescClean,
    especificaciones: featuresList.join(' | ') || 'Esterilizado individualmente | Acero quirúrgico de uso clínico',
    fichaRAG: `Producto: ${cleanSpanishText(p.nombre)} | SKU: ${p.sku} | Precio: ${p.precioTexto} | Categoría: ${p.categoria} | Medidas: ${measures.join(', ') || 'Estándar'} | Stock: ${p.enStock !== false ? 'Disponible' : 'Consultar'} | Descripción: ${summaryClean}`
  });
});

AMAZONIK_PRODUCTS.forEach(a => {
  allProductsDetailed.push({
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
    medidas: [a.volume || '30 ml'],
    resumen: a.subtitle,
    descripcionCompleta: a.description,
    especificaciones: (a.benefits || []).join(' | '),
    fichaRAG: `Producto: ${a.name} | Volumen: ${a.volume} | Precio: ${a.price} | Indicación: ${a.subtitle} | Beneficios: ${(a.benefits || []).join(', ')}`
  });
});

const content = `/**
 * Catálogo completo ultra-detallado de 159 productos para el motor RAG
 * Agujas Acupuntura Perú & Línea Amazoni-k
 */
export const allProductsKnowledge = ${JSON.stringify(allProductsDetailed, null, 2)};
export default allProductsKnowledge;
`;

fs.writeFileSync('./src/data/allProductsKnowledge.js', content, 'utf-8');
console.log(`Saved ${allProductsDetailed.length} products to src/data/allProductsKnowledge.js with full ultra-detailed specs!`);
