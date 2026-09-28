/**
 * retrieval.js (v2 — híbrido)
 *
 * Combina:
 *   1. Match EXACTO por SKU o medida (ej. "0.25x40mm") — para lo literal.
 *   2. Búsqueda SEMÁNTICA por embeddings — para todo lo demás.
 *   3. Fallback por keyword y registro de eventos de baja confianza.
 *
 * Funciona de forma 100% transparente en Browser (Vite) y en Node.js (CLI / Eval).
 */

import productsData from '../data/productos_completos.json' with { type: 'json' };
import embeddingsData from '../data/embeddings.json' with { type: 'json' };
import { logLowConfidence } from './low-confidence-logger.js';

let _products = productsData;
let _embeddings = embeddingsData;

function getApiKey(keyName) {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[keyName]) {
    return import.meta.env[keyName];
  }
  if (typeof process !== 'undefined' && process.env && process.env[keyName]) {
    return process.env[keyName];
  }
  return '';
}

export function loadData() {
  if (!_products) _products = productsData;
  if (!_embeddings) _embeddings = embeddingsData;
}

export function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export async function embedQuery(text) {
  const geminiKey = getApiKey('GEMINI_API_KEY') || getApiKey('VITE_GEMINI_API_KEY');
  const openRouterKey = getApiKey('OPENROUTER_API_KEY') || getApiKey('VITE_OPENROUTER_API_KEY');

  if (geminiKey) {
    const models = ['models/text-embedding-004', 'models/gemini-embedding-001', 'models/gemini-embedding-2'];
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/${model}:embedContent?key=${geminiKey}`;
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

  if (openRouterKey) {
    const res = await fetch('https://openrouter.ai/api/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openRouterKey}`
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

  throw new Error('Gemini/OpenRouter embed failed');
}

export function keywordFallback(query, topN = 3) {
  if (!_products) loadData();
  if (!_products) return [];

  const q = (query || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const scored = _products.map((p) => {
    const name = (p.nombre || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const cat = (p.categoria || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const desc = (p.descripcionResumen || p.descripcionCompleta || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const medidas = ((p.medidasDisponibles || []).join(' ')).toLowerCase();
    const haystack = `${name} ${cat} ${medidas} ${desc}`;
    
    let score = 0;
    if (haystack.includes(q)) score += 30;
    if (name.includes(q)) score += 50;

    q.split(' ').filter(w => w.length > 2).forEach(w => {
      if (name.includes(w)) score += 15;
      else if (haystack.includes(w)) score += 4;
    });

    return { p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .filter((s) => s.score > 0)
    .map((s) => s.p);
}

// PASO 1: match exacto por SKU o por medida
const SKU_RE = /prod-\d+|amz-[a-z0-9]+/i;
const MEDIDA_RE = /\b\d+(\.\d+)?\s?(x\s?\d+(\.\d+)?)?\s?(mm|ml|cm|kg|g|l)\b/i;

export function exactMatch(query, topN = 3) {
  if (!_products) loadData();
  if (!_products) return [];

  const skuMatch = query.match(SKU_RE);
  if (skuMatch) {
    const sku = skuMatch[0].toUpperCase();
    const found = _products.filter((p) => (p.sku && p.sku.toUpperCase() === sku) || (p.id && p.id.toUpperCase() === sku));
    if (found.length) return found.slice(0, topN);
  }

  const medidaMatch = query.match(MEDIDA_RE);
  if (medidaMatch) {
    const medida = medidaMatch[0].replace(/\s/g, '').toLowerCase();
    const found = _products.filter((p) =>
      (p.medidasDisponibles || []).some((m) => m.replace(/\s/g, '').toLowerCase().includes(medida))
    );
    if (found.length) return found.slice(0, topN);
  }

  return [];
}

// PASO 2: búsqueda semántica
export async function semanticMatch(query, topN = 3) {
  if (!_products || !_embeddings) loadData();
  if (!_embeddings || _embeddings.length === 0) {
    return { results: keywordFallback(query, topN), bestScore: null };
  }

  let queryVector;
  try {
    queryVector = await embedQuery(query);
  } catch (err) {
    console.warn('Embedding de query falló, usando fallback por keyword:', err.message);
    return { results: keywordFallback(query, topN), bestScore: null };
  }

  const ranked = _embeddings
    .map((e) => ({ id: e.id, score: cosineSimilarity(queryVector, e.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  const MIN_SCORE = 0.50;
  const relevant = ranked.filter((r) => r.score >= MIN_SCORE);
  const bestScore = ranked.length ? ranked[0].score : null;

  if (relevant.length === 0) return { results: [], bestScore };

  const byId = new Map(_products.map((p) => [p.id, p]));
  return { results: relevant.map((r) => byId.get(r.id)).filter(Boolean), bestScore };
}

/**
 * Devuelve los N productos más relevantes.
 */
export async function retrieveTopProducts(userMessage, topN = 3, sessionId = null) {
  loadData();

  const exact = exactMatch(userMessage, topN);
  if (exact.length > 0) return exact;

  const { results, bestScore } = await semanticMatch(userMessage, topN);

  if (results.length === 0) {
    logLowConfidence({
      message: userMessage,
      bestScore,
      sessionId,
      reason: bestScore === null ? 'no_match' : 'below_threshold',
    });
  }

  return results;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    retrieveTopProducts,
    cosineSimilarity,
    exactMatch,
    semanticMatch,
    keywordFallback,
    loadData
  };
}
