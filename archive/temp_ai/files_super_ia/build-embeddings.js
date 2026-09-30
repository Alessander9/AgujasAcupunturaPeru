/**
 * build-embeddings.js
 *
 * Genera un embedding semántico por producto y lo guarda en embeddings.json.
 * Corre esto UNA VEZ (o cada vez que cambie el catálogo), no en cada request.
 *
 * Usa el modelo de embeddings de Gemini (gratis en su free tier y ya tienes
 * la API key porque Gemini 1.5 Flash está en tu cascada de respaldo), así no
 * agregas un proveedor nuevo solo para esto.
 *
 * Uso:
 *   GEMINI_API_KEY=xxxx node build-embeddings.js ./products.json ./embeddings.json
 */

const fs = require("fs");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMBED_MODEL = "models/text-embedding-004";
const EMBED_URL = `https://generativelanguage.googleapis.com/v1beta/${EMBED_MODEL}:embedContent?key=${GEMINI_API_KEY}`;

const [, , inputPath = "./products.json", outputPath = "./embeddings.json"] = process.argv;

// Texto que se embebe por producto: nombre + categoría + medidas + resumen.
// Esto es lo que decide qué tan bien "entiende" el buscador sinónimos y
// descripciones informales del usuario, así que es el punto más importante
// de todo el script.
function buildSearchableText(p) {
  const medidas = (p.medidasDisponibles || []).join(", ");
  return [
    p.nombre,
    p.categoria,
    p.marca,
    medidas ? `Medidas: ${medidas}` : "",
    p.descripcionResumen || "",
  ]
    .filter(Boolean)
    .join(". ");
}

async function embedText(text) {
  const res = await fetch(EMBED_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: { parts: [{ text }] },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini embed error ${res.status}: ${errText}`);
  }
  const data = await res.json();
  return data.embedding.values; // array de floats
}

async function main() {
  if (!GEMINI_API_KEY) {
    console.error("Falta GEMINI_API_KEY en el entorno.");
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const out = [];

  console.log(`Generando embeddings para ${products.length} productos...`);

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
    // pequeño respiro para no pegarle al rate limit del free tier
    await new Promise((r) => setTimeout(r, 150));
  }

  fs.writeFileSync(outputPath, JSON.stringify(out));
  console.log(`\nListo. Guardado en ${outputPath} (${out.length} vectores).`);
}

main();
