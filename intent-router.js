/**
 * intent-router.js
 *
 * Clasifica el mensaje ANTES de gastar retrieval + LLM. Saludos, despedidas
 * y pedidos de hablar con humano se resuelven al instante (0ms, sin costo).
 * Solo lo que realmente necesita catálogo pasa al pipeline completo.
 *
 * Uso:
 *   const { classifyIntent } = require("./intent-router");
 *   const intent = classifyIntent(userMessage);
 *   if (intent.type !== "product_query") {
 *     return intent.fixedResponse; // responde directo, sin RAG ni LLM
 *   }
 *   // si type === "product_query", seguís al pipeline normal
 */

const GREETING_RE = /^(hola|buen[ao]s?( d[ií]as| tardes| noches)?|hey|qu[eé] tal)[\s!.,]*$/i;
const FAREWELL_RE = /^(chau|adi[oó]s|gracias|listo|ok(ay)?|nos vemos|hasta luego)[\s!.,]*$/i;
const HUMAN_RE = /(hablar con (una persona|alguien|un asesor)|asesor humano|no eres de ayuda|quiero un humano|atenci[oó]n personalizada)/i;
const COMPLAINT_RE = /(mi pedido no lleg[oó]|reclamo|queja|estafa|no funciona|est[aá] mal|me enga[ñn]aron|producto (malo|da[ñn]ado|roto))/i;

export const FIXED_RESPONSES = {
  greeting: "¡Hola! 👋 Bienvenido a Agujas Acupuntura Perú. ¿En qué producto o categoría te puedo ayudar hoy?",
  farewell: "¡Gracias a ti! Cualquier consulta, aquí estamos 🙌",
  human_handoff: "Te conecto con un asesor para que te ayude directamente. Escríbenos al WhatsApp +51 930 830 427 🙌",
  complaint: "Lamento el inconveniente. Para resolverlo rápido, por favor escríbenos directo al WhatsApp +51 930 830 427 con tu número de pedido y te atendemos de inmediato.",
};

export function classifyIntent(message) {
  const text = (message || "").trim();

  if (GREETING_RE.test(text)) {
    return { type: "greeting", fixedResponse: FIXED_RESPONSES.greeting, triggerWhatsApp: false };
  }
  if (HUMAN_RE.test(text)) {
    return { type: "human_handoff", fixedResponse: FIXED_RESPONSES.human_handoff, triggerWhatsApp: true };
  }
  if (COMPLAINT_RE.test(text)) {
    return { type: "complaint", fixedResponse: FIXED_RESPONSES.complaint, triggerWhatsApp: true };
  }
  if (FAREWELL_RE.test(text)) {
    return { type: "farewell", fixedResponse: FIXED_RESPONSES.farewell, triggerWhatsApp: false };
  }

  // Todo lo demás (preguntas de producto, pagos, envío, ubicación, etc.)
  // sigue al pipeline RAG normal.
  return { type: "product_query", fixedResponse: null, triggerWhatsApp: false };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { classifyIntent, FIXED_RESPONSES };
}
