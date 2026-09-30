/**
 * retrieval.js
 *
 * Reemplaza (o complementa) el match por palabra clave del catálogo con
 * búsqueda semántica por similitud coseno sobre los embeddings generados
 * con build-embeddings.js.
 *
 * Uso típico dentro de tu motor RAG (paso 2 del flujo):
 *
 *   const { retrieveTopProducts } = require("./retrieval");
 *   const topProducts = await retrieveTopProducts(userMessage, 3);
 *   // topProducts = productos completos (con precio, stock, etc.) listos
 *   // para meter al contexto del prompt (paso 3)
 */

const fs = require("fs");
const path = require("path");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMBED_MODEL = "models/text-embedding-004";
const EMBED_URL = `https://generativelanguage.googleapis.com/v1beta/${EMBED_MODEL}:embedContent?key=${GEMINI_API_KEY}`;

const PRODUCTS_PATH = process.env.PRODUCTS_PATH || path.join(__dirname, "products.json");
const EMBEDDINGS_PATH = process.env.EMBEDDINGS_PATH || path.join(__dirname, "embeddings.json");

let _products = null;
let _embeddings = null;

function loadData() {
  if (!_products) _products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf8"));
  if (!_embeddings) _embeddings = JSON.parse(fs.readFileSync(EMBEDDINGS_PATH, "utf8"));
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function embedQuery(text) {
  const res = await fetch(EMBED_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: { parts: [{ text }] } }),
  });
  if (!res.ok) throw new Error(`Gemini embed error ${res.status}`);
  const data = await res.json();
  return data.embedding.values;
}

// Fallback determinístico si Gemini falla o no hay internet: coincide con tu
// "Generador RAG Local 0ms" existente — nunca deja al usuario sin respuesta.
function keywordFallback(query, topN) {
  const q = query.toLowerCase();
  const scored = _products.map((p) => {
    const haystack = `${p.nombre} ${p.categoria} ${(p.medidasDisponibles || []).join(" ")}`.toLowerCase();
    const score = haystack.includes(q) ? 1 : q.split(" ").filter((w) => haystack.includes(w)).length;
    return { p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .filter((s) => s.score > 0)
    .map((s) => s.p);
}

/**
 * Devuelve los N productos más relevantes semánticamente para el mensaje
 * del usuario. Cae automáticamente al fallback por keyword si Gemini falla.
 */
async function retrieveTopProducts(userMessage, topN = 3) {
  loadData();

  let queryVector;
  try {
    queryVector = await embedQuery(userMessage);
  } catch (err) {
    console.warn("Embedding de query falló, usando fallback por keyword:", err.message);
    return keywordFallback(userMessage, topN);
  }

  const ranked = _embeddings
    .map((e) => ({ id: e.id, score: cosineSimilarity(queryVector, e.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  // Umbral mínimo: si ni el mejor resultado supera esto, es mejor no
  // "adivinar" un producto random — deja que el prompt de grounding
  // (system-prompt.md, sección 5) le diga al usuario que no encontró nada.
  const MIN_SCORE = 0.55;
  const relevant = ranked.filter((r) => r.score >= MIN_SCORE);

  if (relevant.length === 0) return [];

  const byId = new Map(_products.map((p) => [p.id, p]));
  return relevant.map((r) => byId.get(r.id)).filter(Boolean);
}

module.exports = { retrieveTopProducts, cosineSimilarity };
