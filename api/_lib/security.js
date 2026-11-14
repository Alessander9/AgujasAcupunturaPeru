/**
 * Utilidades de seguridad compartidas por las funciones serverless (/api/*).
 * Los archivos dentro de carpetas que empiezan con "_" NO se exponen como rutas en Vercel.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   ALLOWED_ORIGINS            Lista separada por comas de orígenes permitidos (opcional, hay defaults).
 *   UPSTASH_REDIS_REST_URL     (opcional) Rate limit global y persistente con Upstash (plan gratuito).
 *   UPSTASH_REDIS_REST_TOKEN   (opcional)
 */

const DEFAULT_ORIGINS = [
  'https://www.agujasacupunturaperu.com',
  'https://agujasacupunturaperu.com',
  'https://agujas-acupuntura-peru.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

function getAllowedOrigins() {
  const fromEnv = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);
  const list = fromEnv.length ? fromEnv : [...DEFAULT_ORIGINS];
  // Permite el dominio del propio deployment (previews de Vercel)
  if (process.env.VERCEL_URL) list.push(`https://${process.env.VERCEL_URL}`);
  if (process.env.VERCEL_BRANCH_URL) list.push(`https://${process.env.VERCEL_BRANCH_URL}`);
  return list;
}

export function isAllowedOrigin(origin) {
  if (!origin) return false;
  return getAllowedOrigins().includes(origin.replace(/\/$/, ''));
}

/**
 * Aplica CORS restrictivo + cabeceras de seguridad y valida método/origen.
 * Devuelve true si la petición ya fue respondida (y el handler debe terminar).
 */
export function guardRequest(req, res, { methods = ['POST'] } = {}) {
  const origin = req.headers.origin;

  res.setHeader('Vary', 'Origin');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Robots-Tag', 'noindex');

  if (isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', [...methods, 'OPTIONS'].join(','));
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '600');
  }

  if (req.method === 'OPTIONS') {
    res.status(isAllowedOrigin(origin) ? 204 : 403).end();
    return true;
  }

  if (!methods.includes(req.method)) {
    res.setHeader('Allow', methods.join(','));
    res.status(405).json({ error: 'Method Not Allowed' });
    return true;
  }

  // Los navegadores siempre envían Origin en POST. Sin Origin válido = uso externo no autorizado.
  if (!isAllowedOrigin(origin)) {
    res.status(403).json({ error: 'Forbidden origin' });
    return true;
  }

  const contentType = String(req.headers['content-type'] || '');
  if (req.method === 'POST' && !contentType.includes('application/json')) {
    res.status(415).json({ error: 'Content-Type must be application/json' });
    return true;
  }

  return false;
}

export function getClientIp(req) {
  // En Vercel, x-real-ip / x-forwarded-for los fija la plataforma (no el cliente).
  const real = req.headers['x-real-ip'];
  if (real) return String(real);
  const fwd = String(req.headers['x-forwarded-for'] || '');
  return fwd.split(',')[0].trim() || 'unknown';
}

// ---------------------------------------------------------------------------
// Rate limiting (ventana fija). Usa Upstash si está configurado; si no, memoria
// local por instancia (protección básica: cada instancia serverless tiene su Map).
// ---------------------------------------------------------------------------
const memoryBuckets = new Map();

function memoryHit(key, windowSec) {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);
  if (!bucket || bucket.reset <= now) {
    memoryBuckets.set(key, { count: 1, reset: now + windowSec * 1000 });
    if (memoryBuckets.size > 5000) {
      for (const [k, v] of memoryBuckets) if (v.reset <= now) memoryBuckets.delete(k);
    }
    return 1;
  }
  bucket.count += 1;
  return bucket.count;
}

async function upstashHit(key, windowSec) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([
      ['INCR', key],
      ['EXPIRE', key, String(windowSec), 'NX'],
    ]),
    signal: AbortSignal.timeout(1500),
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const data = await res.json();
  return Number(data?.[0]?.result || 0);
}

/**
 * @returns {Promise<boolean>} true si la petición fue bloqueada (ya respondida con 429)
 */
export async function rateLimit(req, res, { name, limit, windowSec }) {
  const key = `rl:${name}:${getClientIp(req)}:${Math.floor(Date.now() / (windowSec * 1000))}`;
  let count;
  try {
    count = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
      ? await upstashHit(key, windowSec)
      : memoryHit(key, windowSec);
  } catch {
    count = memoryHit(key, windowSec); // si Upstash falla, no se cae el servicio
  }

  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, limit - count)));

  if (count > limit) {
    res.setHeader('Retry-After', String(windowSec));
    res.status(429).json({ error: 'Too many requests' });
    return true;
  }
  return false;
}

/** fetch con timeout para que un proveedor lento no deje colgada (y facturando) la función. */
export function fetchWithTimeout(url, options = {}, ms = 9000) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(ms) });
}

/** Obtiene una variable de entorno de servidor. Nunca acepta nombres con prefijo VITE_. */
export function serverEnv(name) {
  const value = process.env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}
