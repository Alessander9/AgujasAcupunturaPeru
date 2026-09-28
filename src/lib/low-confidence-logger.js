/**
 * low-confidence-logger.js
 *
 * Registra eventos de baja confianza o consultas no encontradas en el catálogo.
 * Diseñado de forma segura y liviana para navegador y entorno serverless.
 */

let LOG_PATH = 'low-confidence.jsonl';

export { LOG_PATH };

export function logLowConfidence({ message, bestScore = null, sessionId = null, reason = "no_match" }) {
  const entry = {
    timestamp: new Date().toISOString(),
    message,
    bestScore,
    sessionId,
    reason, // "no_match" | "below_threshold" | "out_of_catalog"
  };

  // Browser console info
  console.info('[LowConfidenceLog]', entry);
}

export async function printSummary() {
  console.info('[LowConfidenceLog] printSummary listo.');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { logLowConfidence, printSummary, LOG_PATH };
}
