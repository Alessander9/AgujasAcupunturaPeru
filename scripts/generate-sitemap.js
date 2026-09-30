import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://agujas-acupuntura-peru.vercel.app';
const TODAY = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/productos', priority: '0.9', changefreq: 'daily' },
  { url: '/aceites-amazonik', priority: '0.8', changefreq: 'weekly' },
  { url: '/tutoriales', priority: '0.8', changefreq: 'weekly' },
  { url: '/sobre-nosotros', priority: '0.7', changefreq: 'monthly' },
  { url: '/checkout', priority: '0.6', changefreq: 'monthly' },
  { url: '/terminos-y-condiciones', priority: '0.5', changefreq: 'monthly' },
  { url: '/politica-privacidad', priority: '0.5', changefreq: 'monthly' },
];

const categorySlugs = [
  "Acupuntura y Moxibustion",
  "Auriculoterapia",
  "Ortopedia y Postura",
  "Aromaterapia",
  "Fisioterapia",
  "Compresas",
  "Herramientas de Masaje",
  "Laminas y Modelos Anatomicos",
  "Ventosa Terapia",
  "Enfermeria"
];

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Pages
  staticRoutes.forEach(route => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${route.url}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // 2. Categories
  categorySlugs.forEach(cat => {
    const encodedCat = encodeURIComponent(cat);
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/productos?cat=${encodedCat}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // 3. Products
  const candidates = [
    path.join(rootDir, 'public', 'productos_completos.json'),
    path.join(rootDir, 'src', 'data', 'productos_completos.json'),
    path.join(rootDir, 'productos_completos.json')
  ];
  const productsFile = candidates.find(f => fs.existsSync(f));
  if (productsFile) {
    try {
      const rawData = fs.readFileSync(productsFile, 'utf-8');
      const products = JSON.parse(rawData);
      
      products.forEach(p => {
        const slug = p.slug || `prod-${p.id}`;
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/productos?prod=${encodeURIComponent(slug)}</loc>\n`;
        xml += `    <lastmod>${TODAY}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      });
      console.log(`Generated sitemap with ${products.length} products.`);
    } catch (err) {
      console.error('Error parsing products for sitemap:', err);
    }
  }

  xml += `</urlset>\n`;

  const outputPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`Sitemap written successfully to: ${outputPath}`);
};

generateSitemap();
