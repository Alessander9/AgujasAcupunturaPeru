// Vercel Serverless Function: embeddings de la consulta del chatbot (búsqueda semántica).
// Reemplaza la llamada que antes se hacía desde el navegador con la API key expuesta.

import { guardRequest, rateLimit, fetchWithTimeout, serverEnv } from './_lib/security.js';

const MAX_TEXT_CHARS = 500;
// Mismo orden que src/lib/build-embeddings.js para que las dimensiones coincidan con embeddings.json
const GEMINI_MODELS = ['models/text-embedding-004', 'models/gemini-embedding-001', 'models/gemini-embedding-2'];

export default async function handler(req, res) {
  if (guardRequest(req, res, { methods: ['POST'] })) return;
  if (await rateLimit(req, res, { name: 'embed-min', limit: 20, windowSec: 60 })) return;
  if (await rateLimit(req, res, { name: 'embed-hour', limit: 200, windowSec: 3600 })) return;

  const text = typeof req.body?.text === 'string' ? req.body.text.trim().slice(0, MAX_TEXT_CHARS) : '';
  if (!text) return res.status(400).json({ error: 'Invalid "text".' });

  const geminiKey = serverEnv('GEMINI_API_KEY');
  if (geminiKey) {
    for (const model of GEMINI_MODELS) {
      try {
        const r = await fetchWithTimeout(
          `https://generativelanguage.googleapis.com/v1beta/${model}:embedContent`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiKey },
            body: JSON.stringify({ content: { parts: [{ text }] } }),
          },
          6000
        );
        if (r.ok) {
          const data = await r.json();
          if (Array.isArray(data.embedding?.values)) {
            return res.status(200).json({ vector: data.embedding.values });
          }
        }
      } catch (e) {
        console.warn(`[api/embed] Gemini ${model} falló: ${e.message}`);
      }
    }
  }

  const orKey = serverEnv('OPENROUTER_API_KEY');
  if (orKey) {
    try {
      const r = await fetchWithTimeout('https://openrouter.ai/api/v1/embeddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${orKey}` },
        body: JSON.stringify({ model: 'text-embedding-3-small', input: text }),
      }, 6000);
      if (r.ok) {
        const data = await r.json();
        if (Array.isArray(data.data?.[0]?.embedding)) {
          return res.status(200).json({ vector: data.data[0].embedding });
        }
      }
    } catch (e) {
      console.warn(`[api/embed] OpenRouter falló: ${e.message}`);
    }
  }

  return res.status(503).json({ error: 'Embedding providers unavailable' });
}
