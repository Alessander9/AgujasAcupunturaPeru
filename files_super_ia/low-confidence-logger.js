/**
 * low-confidence-logger.js
 *
 * Cada vez que el retrieval no encuentra nada por encima del umbral de
 * similitud (ver MIN_SCORE en retrieval.js), o el usuario pide algo fuera
 * de catálogo, se registra acá. Revisando este log semanalmente vas a ver
 * qué sinónimos/necesidades no está cubriendo bien el texto embebido de
 * tus productos (ej. "para dejar de fumar" -> deberías mapear a Cero Smoke).
 *
 * Guarda en formato JSON Lines (una línea = un evento) para poder tail -f
 * en producción o cargarlo fácil a una hoja de cálculo.
 *
 * Uso:
 *   const { logLowConfidence } = require("./low-confidence-logger");
 *   if (topProducts.length === 0) {
 *     logLowConfidence({ message: userMessage, bestScore, sessionId });
 *   }
 */

const fs = require("fs");
const path = require("path");

const LOG_PATH = process.env.LOW_CONFIDENCE_LOG_PATH || path.join(__dirname, "low-confidence.jsonl");

function logLowConfidence({ message, bestScore = null, sessionId = null, reason = "no_match" }) {
  const entry = {
    timestamp: new Date().toISOString(),
    message,
    bestScore,
    sessionId,
    reason, // "no_match" | "below_threshold" | "out_of_catalog"
  };
  fs.appendFile(LOG_PATH, JSON.stringify(entry) + "\n", (err) => {
    if (err) console.error("No se pudo escribir el log de baja confianza:", err.message);
  });
}

// Utilidad para revisar el log agrupado (útil para correr manualmente:
// `node -e "require('./low-confidence-logger').printSummary()"`)
function printSummary() {
  if (!fs.existsSync(LOG_PATH)) {
    console.log("Sin registros todavía.");
    return;
  }
  const lines = fs.readFileSync(LOG_PATH, "utf8").trim().split("\n").filter(Boolean);
  const entries = lines.map((l) => JSON.parse(l));
  const counts = {};
  for (const e of entries) {
    const key = e.message.toLowerCase().trim();
    counts[key] = (counts[key] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  console.log(`Total de eventos: ${entries.length}\n`);
  console.log("Mensajes más frecuentes sin buena respuesta:");
  sorted.slice(0, 20).forEach(([msg, count]) => console.log(`  (${count}x) ${msg}`));
}

module.exports = { logLowConfidence, printSummary, LOG_PATH };
