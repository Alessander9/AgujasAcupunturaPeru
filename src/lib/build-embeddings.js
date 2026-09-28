/**
 * build-embeddings.js
 *
 * Genera un embedding semántico por producto y lo guarda en embeddings.json.
 * Corre esto UNA VEZ (o cada vez que cambie el catálogo), no en cada request.
 *
 * Uso:
 *   GEMINI_API_KEY=xxxx node build-embeddings.js ./products.json ./embeddings.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read keys from environment or .env file
let envConfig = {};
try {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [k, ...v] = trimmed.split('=');
      envConfig[k.trim()] = v.join('=').trim();
    }
  });
} catch (e) {}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || envConfig.VITE_GEMINI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY || envConfig.VITE_OPENROUTER_API_KEY;

const [, , inputPathArg = './products.json', outputPathArg = './embeddings.json'] = process.argv;

const inputPath = path.resolve(process.cwd(), inputPathArg);
const outputPath = path.resolve(process.cwd(), outputPathArg);

function buildSearchableText(p) {
  const medidas = (p.medidasDisponibles || []).join(', ');
  return [
    p.nombre,
    p.categoria,
    p.marca,
    medidas ? `Medidas: ${medidas}` : '',
    p.descripcionResumen || '',
  ]
    .filter(Boolean)
    .join('. ');
}

async function embedText(text) {
  if (GEMINI_API_KEY) {
    const models = ['models/text-embedding-004', 'models/gemini-embedding-001', 'models/gemini-embedding-2'];
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/${model}:embedContent?key=${GEMINI_API_KEY}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: { parts: [{ text }] } }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.embedding?.values) return data.embedding.values;
        }
      } catch (e) {}
    }
  }

  if (OPENROUTER_API_KEY) {
    const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.data?.[0]?.embedding) return data.data[0].embedding;
    }
  }

  throw new Error('No se pudo generar embedding: verifica GEMINI_API_KEY o OPENROUTER_API_KEY.');
}

async function main() {
  if (!fs.existsSync(inputPath)) {
    console.error(`Falta el archivo de entrada: ${inputPath}`);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const out = [];

  console.log(`Generando embeddings para ${products.length} productos desde ${inputPath}...`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const text = buildSearchableText(p);
    try {
      const vector = await embedText(text);
      out.push({ id: p.id, sku: p.sku, vector });
      process.stdout.write(`  [${i + 1}/${products.length}] ${p.nombre}\r`);
    } catch (err) {
      console.error(`\nError con producto ${p.id} (${p.nombre}):`, err.message);
    }
    await new Promise((r) => setTimeout(r, 60));
  }

  fs.writeFileSync(outputPath, JSON.stringify(out));
  
  // Also sync to src/data and public if relevant
  try {
    if (fs.existsSync(path.join(__dirname, 'src/data'))) {
      fs.writeFileSync(path.join(__dirname, 'src/data/embeddings.json'), JSON.stringify(out));
    }
    if (fs.existsSync(path.join(__dirname, 'public'))) {
      fs.writeFileSync(path.join(__dirname, 'public/embeddings.json'), JSON.stringify(out));
    }
  } catch (e) {}

  console.log(`\nListo. Guardado en ${outputPath} (${out.length} vectores).`);
}

main();
