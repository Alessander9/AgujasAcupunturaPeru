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

  // Node environment logging
  if (typeof process !== 'undefined' && process.versions?.node) {
    import('fs').then(fs => {
      fs.appendFile(LOG_PATH, JSON.stringify(entry) + '\n', (err) => {
        if (err) console.error('No se pudo escribir el log de baja confianza:', err.message);
      });
    }).catch(() => {});
  } else {
    // Browser console info
    console.info('[LowConfidenceLog]', entry);
  }
}

export async function printSummary() {
  if (typeof process === 'undefined' || !process.versions?.node) {
    console.log('printSummary solo disponible en entorno Node.js.');
    return;
  }
  const fs = await import('fs');
  if (!fs.existsSync(LOG_PATH)) {
    console.log('Sin registros todavía.');
    return;
  }
  const lines = fs.readFileSync(LOG_PATH, 'utf8').trim().split('\n').filter(Boolean);
  const entries = lines.map((l) => JSON.parse(l));
  const counts = {};
  for (const e of entries) {
    const key = (e.message || '').toLowerCase().trim();
    counts[key] = (counts[key] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  console.log(`Total de eventos: ${entries.length}\n`);
  console.log('Mensajes más frecuentes sin buena respuesta:');
  sorted.slice(0, 20).forEach(([msg, count]) => console.log(`  (${count}x) ${msg}`));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { logLowConfidence, printSummary, LOG_PATH };
}
