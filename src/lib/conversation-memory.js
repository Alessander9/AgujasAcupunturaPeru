/**
 * conversation-memory.js
 *
 * Mantiene los últimos N turnos por sesión/usuario para que el bot entienda
 * seguimientos ambiguos ("y en esa medida?", "cuánto cuesta ese", "el más
 * barato") sin que el usuario tenga que repetir el nombre del producto.
 *
 * Esto es memoria EN PROCESO (in-memory). Si tu chatbot corre en varias
 * instancias/serverless, cambia el Map por Redis u otra store compartida
 * usando la misma interfaz (getHistory/pushTurn/getLastProduct).
 *
 * Uso:
 *   const memory = require("./conversation-memory");
 *   memory.pushTurn(sessionId, { role: "user", content: userMessage });
 *   const lastProduct = memory.getLastProduct(sessionId);
 *   // ... tras responder, si mencionaste un producto:
 *   memory.setLastProduct(sessionId, productoElegido);
 */

const MAX_TURNS = 6; // últimos 6 mensajes (3 turnos ida y vuelta)
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min de inactividad = se olvida

const sessions = new Map();

function _get(sessionId) {
  const s = sessions.get(sessionId);
  if (!s) return null;
  if (Date.now() - s.updatedAt > SESSION_TTL_MS) {
    sessions.delete(sessionId);
    return null;
  }
  return s;
}

function _ensure(sessionId) {
  let s = _get(sessionId);
  if (!s) {
    s = { history: [], lastProduct: null, updatedAt: Date.now() };
    sessions.set(sessionId, s);
  }
  return s;
}

export function pushTurn(sessionId, turn) {
  const s = _ensure(sessionId);
  s.history.push(turn);
  if (s.history.length > MAX_TURNS) s.history.shift();
  s.updatedAt = Date.now();
}

export function getHistory(sessionId) {
  const s = _get(sessionId);
  return s ? s.history : [];
}

export function setLastProduct(sessionId, product) {
  const s = _ensure(sessionId);
  s.lastProduct = product ? { id: product.id, nombre: product.nombre, precioTexto: product.precioTexto } : null;
  s.updatedAt = Date.now();
}

export function getLastProduct(sessionId) {
  const s = _get(sessionId);
  return s ? s.lastProduct : null;
}

// Detecta si el mensaje es un seguimiento ambiguo que depende del producto
// anterior (sin nombrar ningún producto nuevo explícitamente).
const FOLLOWUP_RE = /^(y (en|con|para) eso|cu[aá]nto (cuesta|vale) (ese|eso|el)|el m[aá]s (barato|caro)|tienen (m[aá]s|otro)|y ese|esa medida|esa presentaci[oó]n)/i;

export function isAmbiguousFollowup(message) {
  return FOLLOWUP_RE.test((message || "").trim());
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    pushTurn,
    getHistory,
    setLastProduct,
    getLastProduct,
    isAmbiguousFollowup,
  };
}
