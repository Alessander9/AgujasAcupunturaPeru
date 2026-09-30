import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const candidates = [
  path.resolve(__dirname, '../src/data/productos_completos.json'),
  path.resolve(__dirname, '../public/productos_completos.json'),
  path.resolve(__dirname, '../productos_completos.json')
];
const productsPath = candidates.find(f => fs.existsSync(f));
const rawData = fs.readFileSync(productsPath, 'utf8');
const products = JSON.parse(rawData);

// Group by category
const categoriesMap = {};
products.forEach((p) => {
  const cat = p.categoria || 'Sin Categoría';
  if (!categoriesMap[cat]) {
    categoriesMap[cat] = [];
  }
  categoriesMap[cat].push(p);
});

const categoryNames = Object.keys(categoriesMap).sort();

let md = `# 📋 Catálogo Completo de Productos - Agujas Acupuntura Perú\n\n`;
md += `> **Fecha de generación:** ${new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })}\n`;
md += `> **Total de productos registrados:** **${products.length} productos**\n`;
md += `> **Categorías activas:** **${categoryNames.length} categorías**\n\n`;

md += `## 📑 Índice Rápido por Categoría\n\n`;
categoryNames.forEach((cat, idx) => {
  const count = categoriesMap[cat].length;
  const anchor = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  md += `${idx + 1}. [${cat} (${count} productos)](#${anchor})\n`;
});

md += `\n---\n\n`;

// Statistics Summary
md += `## 📊 Resumen Estadístico del Inventario\n\n`;
md += `| Categoría | N° de Productos | Rango de Precios | Marcas Principales |\n`;
md += `|---|:---:|:---:|---|\n`;

categoryNames.forEach((cat) => {
  const list = categoriesMap[cat];
  const prices = list.map((p) => typeof p.precio === 'number' ? p.precio : parseFloat(p.precio) || 0).filter(p => p > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const brands = [...new Set(list.map((p) => p.marca).filter(Boolean))].slice(0, 3).join(', ') || 'Varios';
  md += `| **${cat}** | ${list.length} | S/ ${minPrice.toFixed(2)} - S/ ${maxPrice.toFixed(2)} | ${brands} |\n`;
});

md += `\n---\n\n`;

// Detailed Sections per Category
categoryNames.forEach((cat) => {
  const list = categoriesMap[cat];
  const anchor = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  md += `## <a id="${anchor}"></a>🏷️ ${cat} (${list.length} productos)\n\n`;
  md += `| # | SKU | Nombre del Producto | Marca | Precio Regular | Oferta / Dscto | Stock | Medidas / Presentación |\n`;
  md += `|---|---|---|---|:---:|:---:|:---:|---|\n`;

  list.forEach((p, idx) => {
    const sku = p.sku || p.id || 'N/A';
    const nombre = p.nombre || 'Sin nombre';
    const marca = p.marca || '-';
    const precio = p.precioTexto || (p.precio ? `S/ ${Number(p.precio).toFixed(2)}` : 'A consultar');
    const precioOrig = p.precioOriginal ? `~~${p.precioOriginal}~~` : '-';
    const dscto = p.descuento ? `**${p.descuento}**` : '';
    const ofertaTexto = dscto ? `${precioOrig} (${dscto})` : '-';
    const stock = p.enStock !== false ? '🟢 En Stock' : '🔴 Agotado';
    const medidas = p.medidasDisponibles && p.medidasDisponibles.length > 0 
      ? p.medidasDisponibles.slice(0, 3).join(', ') + (p.medidasDisponibles.length > 3 ? '...' : '')
      : (p.descripcionResumen || '-');

    md += `| ${idx + 1} | \`${sku}\` | **${nombre}** | ${marca} | ${precio} | ${ofertaTexto} | ${stock} | ${medidas} |\n`;
  });

  md += `\n### 📝 Detalle de Fichas Técnicas (${cat})\n\n`;
  list.forEach((p, idx) => {
    const sku = p.sku || p.id || 'N/A';
    const nombre = p.nombre || 'Sin nombre';
    const precio = p.precioTexto || `S/ ${Number(p.precio || 0).toFixed(2)}`;
    const desc = p.descripcionResumen || p.descripcionCompleta || 'Sin descripción adicional.';
    const caracteristicas = p.caracteristicas && p.caracteristicas.length > 0 ? p.caracteristicas.join(' • ') : null;
    const medidas = p.medidasDisponibles && p.medidasDisponibles.length > 0 ? p.medidasDisponibles.join(', ') : null;

    md += `#### ${idx + 1}. ${nombre} (\`${sku}\`)\n`;
    md += `- **Precio:** ${precio} ${p.precioOriginal ? `(Antes: ${p.precioOriginal} | Ahorro: ${p.descuento})` : ''}\n`;
    md += `- **Marca / Fabricante:** ${p.marca || 'Clínico Certificado'}\n`;
    md += `- **Categoría:** ${cat}\n`;
    if (medidas) md += `- **Medidas / Variantes:** ${medidas}\n`;
    if (caracteristicas) md += `- **Especificaciones:** ${caracteristicas}\n`;
    md += `- **Resumen:** ${desc.replace(/\n+/g, ' ').slice(0, 200)}...\n`;
    if (p.urlOriginal) md += `- **Enlace de referencia:** [Ver Producto](${p.urlOriginal})\n`;
    md += `\n`;
  });

  md += `---\n\n`;
});

const outputPath = path.resolve(__dirname, '../LISTADO_PRODUCTOS.md');
fs.writeFileSync(outputPath, md, 'utf8');
console.log(`✅ Archivo LISTADO_PRODUCTOS.md generado exitosamente con ${products.length} productos.`);
