/**
 * run-eval.js
 *
 * Corre eval/test-cases.json contra tu retrieval + router de intención
 * ACTUALES y reporta qué pasó y qué falló.
 *
 * Uso:
 *   node eval/run-eval.js
 *   npm run eval
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { retrieveTopProducts } from '../src/lib/retrieval.js';
import { classifyIntent } from '../src/lib/intent-router.js';

let __dirname = '';
try {
  const __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
} catch (e) {
  __dirname = path.resolve(process.cwd(), 'eval');
}

const TEST_CASES_PATH = fs.existsSync(path.join(__dirname, 'test-cases.json'))
  ? path.join(__dirname, 'test-cases.json')
  : path.resolve(process.cwd(), 'eval/test-cases.json');

async function runEval() {
  const cases = JSON.parse(fs.readFileSync(TEST_CASES_PATH, 'utf8'));
  let passed = 0;
  const failures = [];

  for (const tc of cases) {
    if (tc.type === 'intent_only') {
      const intent = classifyIntent(tc.query);
      const ok = intent.type === tc.expectedIntent;
      if (ok) passed++;
      else failures.push({ query: tc.query, expected: tc.expectedIntent, got: intent.type });
      continue;
    }

    // product_query, grounding_negative, injection_attempt: todos pasan por retrieval
    const results = await retrieveTopProducts(tc.query, 3);
    const topId = results[0]?.id || null;

    if (tc.expectedProductId === null) {
      // esperamos que NO encuentre nada (grounding negativo)
      const ok = results.length === 0;
      if (ok) passed++;
      else failures.push({ query: tc.query, expected: 'sin resultados', got: topId });
    } else {
      const ok = topId === tc.expectedProductId;
      if (ok) passed++;
      else failures.push({ query: tc.query, expected: tc.expectedProductId, got: topId });
    }
  }

  console.log(`\n${passed}/${cases.length} pruebas pasaron.\n`);

  if (failures.length > 0) {
    console.log('Fallos:');
    for (const f of failures) {
      console.log(`  ✗ "${f.query}"\n      esperado: ${f.expected}\n      obtenido: ${f.got}`);
    }
    process.exitCode = 1;
  } else {
    console.log('Todo verde ✅');
  }
}

runEval();
