/**
 * retrieval.js (v2 — híbrido)
 *
 * Combina:
 *   1. Match EXACTO por SKU o medida (ej. "0.25x40mm") — para lo literal,
 *      donde el embedding semántico a veces pierde precisión.
 *   2. Búsqueda SEMÁNTICA por embeddings (Gemini text-embedding-004) — para
 *      todo lo demás ("algo para dolor de espalda", "agujas finas").
 * Si ninguno encuentra nada por encima del umbral, cae al fallback por
 * keyword y registra el evento en low-confidence-logger.js para que puedas
 * revisar qué está fallando.
 *
 * Uso (sin cambios respecto a la v1):
 *   const { retrieveTopProducts } = require("./retrieval");
 *   const topProducts = await retrieveTopProducts(userMessage, 3, sessionId);
 */

const fs = require("fs");
const path = require("path");
const { logLowConfidence } = require("./low-confidence-logger");

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

// PASO 1: match exacto por SKU (ej. "PROD-149") o por medida
// (ej. "0.25x40mm", "0.18x13", "120 ml"). Esto es intencionalmente estricto:
// solo dispara si el patrón aparece literal en el mensaje.
const SKU_RE = /prod-\d+/i;
const MEDIDA_RE = /\b\d+(\.\d+)?\s?(x\s?\d+(\.\d+)?)?\s?(mm|ml|cm|kg|g|l)\b/i;

function exactMatch(query, topN) {
  const skuMatch = query.match(SKU_RE);
  if (skuMatch) {
    const sku = skuMatch[0].toUpperCase();
    const found = _products.filter((p) => p.sku && p.sku.toUpperCase() === sku);
    if (found.length) return found.slice(0, topN);
  }

  const medidaMatch = query.match(MEDIDA_RE);
  if (medidaMatch) {
    const medida = medidaMatch[0].replace(/\s/g, "").toLowerCase();
    const found = _products.filter((p) =>
      (p.medidasDisponibles || []).some((m) => m.replace(/\s/g, "").toLowerCase().includes(medida))
    );
    if (found.length) return found.slice(0, topN);
  }

  return [];
}

// PASO 2: búsqueda semántica (o su fallback por keyword si Gemini falla).
async function semanticMatch(query, topN) {
  let queryVector;
  try {
    queryVector = await embedQuery(query);
  } catch (err) {
    console.warn("Embedding de query falló, usando fallback por keyword:", err.message);
    return { results: keywordFallback(query, topN), bestScore: null };
  }

  const ranked = _embeddings
    .map((e) => ({ id: e.id, score: cosineSimilarity(queryVector, e.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  const MIN_SCORE = 0.55;
  const relevant = ranked.filter((r) => r.score >= MIN_SCORE);
  const bestScore = ranked.length ? ranked[0].score : null;

  if (relevant.length === 0) return { results: [], bestScore };

  const byId = new Map(_products.map((p) => [p.id, p]));
  return { results: relevant.map((r) => byId.get(r.id)).filter(Boolean), bestScore };
}

/**
 * Devuelve los N productos más relevantes. Intenta match exacto primero
 * (SKU/medida), y si no hay, cae a búsqueda semántica. Si nada supera el
 * umbral, registra el evento para que lo puedas revisar después.
 */
async function retrieveTopProducts(userMessage, topN = 3, sessionId = null) {
  loadData();

  const exact = exactMatch(userMessage, topN);
  if (exact.length > 0) return exact;

  const { results, bestScore } = await semanticMatch(userMessage, topN);

  if (results.length === 0) {
    logLowConfidence({
      message: userMessage,
      bestScore,
      sessionId,
      reason: bestScore === null ? "no_match" : "below_threshold",
    });
  }

  return results;
}

module.exports = { retrieveTopProducts, cosineSimilarity };
