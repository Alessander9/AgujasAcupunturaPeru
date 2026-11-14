# Seguridad de APIs — cambios aplicados y pasos pendientes

**Fecha:** 13/11/2026

## 1. Problema encontrado (confirmado en producción)

El JavaScript publicado en `https://agujas-acupuntura-peru.vercel.app` (`/assets/index-B2eR9Nhe.js`) contiene **en texto plano**:

| Variable | Riesgo |
|---|---|
| `VITE_GROQ_API_KEY`, `VITE_OPENROUTER_API_KEY`, `VITE_MISTRAL_API_KEY`, `VITE_GEMINI_API_KEY` | Cualquiera puede usar tus cuotas de IA o generar cobros. |
| `VITE_CLOUDINARY_API_SECRET` + `VITE_CLOUDINARY_API_KEY` | **Crítico:** permite subir, reemplazar o borrar todas las imágenes de tu cuenta Cloudinary. |
| `VITE_VERCEL_*` (repo, autor, commit) | Filtración de información interna (bajo). |

**Causa:**
1. `src/lib/retrieval.js` usaba `import.meta.env[keyName]` (acceso dinámico). Con eso Vite mete **todo** el objeto de variables `VITE_*` en el bundle.
2. `src/lib/aiService.js` llamaba a Groq/OpenRouter/Mistral/Gemini **desde el navegador** con las claves.

## 2. Cambios aplicados en el código

| Archivo | Cambio |
|---|---|
| [api/_lib/security.js](file:///c:/Users/Alessander/Desktop/TRABAJOS/ACTUALES/AgujasAcupunturaNUEVO/api/_lib/security.js) | **Nuevo.** Allowlist de orígenes (CORS restrictivo, adiós `*`), rechazo de peticiones sin `Origin` válido, solo `POST` + `application/json`, rate limit por IP (Upstash si está configurado, si no en memoria), timeouts en llamadas a proveedores, `Cache-Control: no-store`. |
| [api/chat.js](file:///c:/Users/Alessander/Desktop/TRABAJOS/ACTUALES/AgujasAcupunturaNUEVO/api/chat.js) | Reescrito. Solo lee claves **sin** `VITE_`. **El system prompt lo arma el servidor** (antes el cliente podía mandar cualquier prompt y usar el endpoint como un ChatGPT gratis). Valida mensajes (solo roles `user`/`assistant`, máx. 8 mensajes de 1000 caracteres, contexto máx. 8000). Límites: 10 mensajes/min y 100/hora por IP. Gemini con key en cabecera, no en la URL. Logs sin cuerpos de error. |
| [api/embed.js](file:///c:/Users/Alessander/Desktop/TRABAJOS/ACTUALES/AgujasAcupunturaNUEVO/api/embed.js) | **Nuevo.** Embeddings de búsqueda semántica en el servidor (antes se hacían en el navegador con la clave de Gemini). Mismas protecciones; 20/min y 200/hora. |
| [src/lib/aiService.js](file:///c:/Users/Alessander/Desktop/TRABAJOS/ACTUALES/AgujasAcupunturaNUEVO/src/lib/aiService.js) | Eliminadas las 4 llamadas directas a proveedores. Flujo: `/api/chat` → si falla, RAG local. Envía solo el contexto RAG. |
| [src/lib/retrieval.js](file:///c:/Users/Alessander/Desktop/TRABAJOS/ACTUALES/AgujasAcupunturaNUEVO/src/lib/retrieval.js) | Sin `import.meta.env`. En el navegador usa `/api/embed`; en Node (eval) usa `process.env`. |
| [src/lib/systemPromptTemplate.js](file:///c:/Users/Alessander/Desktop/TRABAJOS/ACTUALES/AgujasAcupunturaNUEVO/src/lib/systemPromptTemplate.js) | **Nuevo.** Prompt base compartido entre frontend y servidor (extraído de `ragEngine.js`). |
| [src/lib/cloudinary.js](file:///c:/Users/Alessander/Desktop/TRABAJOS/ACTUALES/AgujasAcupunturaNUEVO/src/lib/cloudinary.js) | Ya no lee la API key; solo el *cloud name* (público). |
| [src/lib/build-embeddings.js](file:///c:/Users/Alessander/Desktop/TRABAJOS/ACTUALES/AgujasAcupunturaNUEVO/src/lib/build-embeddings.js) | Usa `GEMINI_API_KEY`/`OPENROUTER_API_KEY` del `.env` raíz; key en cabecera. |
| `.env` / [.env.example](file:///c:/Users/Alessander/Desktop/TRABAJOS/ACTUALES/AgujasAcupunturaNUEVO/.env.example) | Variables secretas renombradas **sin** `VITE_`. |
| `.gitignore` | Ignora `.env.*` (excepto `.env.example`). |

**Verificación realizada:**
- `vite build` → 0 apariciones de `VITE_`, `gsk_`, `AIza…` ni URLs de API de proveedores con claves en `dist/`.
- Pruebas del handler: origen ajeno → 403 · sin Origin → 403 · solo mensaje `system` → 400 · `GET` → 405 · petición 11 en un minuto → 429.

## 3. Pasos que debes hacer tú (en este orden)

> [!CAUTION]
> El sitio en producción **sigue publicando las claves** hasta que hagas un nuevo deploy, y las claves viejas siguen siendo válidas hasta que las revoques. Asume que ya fueron copiadas.

1. **Revocar y regenerar todas las claves:**
   - Groq: https://console.groq.com/keys
   - OpenRouter: https://openrouter.ai/settings/keys
   - Mistral: https://console.mistral.ai/api-keys
   - Gemini: https://aistudio.google.com/apikey (además, en Google Cloud Console restringir la key a "Generative Language API").
   - **Cloudinary:** Settings → API Keys → generar un par nuevo y **revocar el actual**. Revisa la Media Library por si algo fue modificado o borrado.
2. **Poner las claves nuevas en tu `.env` local** (ya tiene los nombres nuevos).
3. **En Vercel → Settings → Environment Variables:**
   - **Borrar:** `VITE_GROQ_API_KEY`, `VITE_OPENROUTER_API_KEY`, `VITE_MISTRAL_API_KEY`, `VITE_GEMINI_API_KEY`, `VITE_CLOUDINARY_API_KEY`, `VITE_CLOUDINARY_API_SECRET`.
   - **Crear** (Production + Preview): `GROQ_API_KEY`, `OPENROUTER_API_KEY`, `MISTRAL_API_KEY`, `GEMINI_API_KEY` con los valores nuevos. (Cloudinary secret solo si en el futuro se usa desde `/api`.)
   - Opcional: `ALLOWED_ORIGINS` si usas otro dominio.
   - En **Settings → Environment Variables → "Automatically expose System Environment Variables"**: desactivarlo (evita que se publiquen los `VITE_VERCEL_*`).
4. **Hacer commit y deploy.** Luego confirmar en el navegador (DevTools → Sources) que el nuevo `index-*.js` no contiene las claves.
5. **Poner límites de gasto** en cada proveedor (Groq, OpenRouter, Mistral, Google Cloud Billing → presupuestos/alertas).

## 4. Recomendado (opcional, gratis)

- **Upstash Redis (plan gratuito):** crear una base y poner `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` en Vercel. El rate limit pasa de "por instancia" a global y real. Sin esto funciona igual, pero es más fácil de evadir.
- **Vercel Firewall:** activar "Bot Protection" y una regla de rate limit para `/api/*`.
- **Desarrollo local del chatbot:** `npm run dev` (Vite) no ejecuta `/api`. En local el chat usará el RAG local; para probar la IA usar `vercel dev`.

## 5. Para el futuro sistema de puntos (Supabase)

- La `anon key` de Supabase **sí** puede ir como `VITE_SUPABASE_ANON_KEY`: es pública por diseño y la seguridad la da RLS.
- La `service_role key` **jamás** con prefijo `VITE_` ni en el frontend; solo en `/api` y solo para tareas administrativas (por ejemplo, el reset de contraseña).
- Toda función de `/api` nueva debe usar `guardRequest` + `rateLimit` de `api/_lib/security.js` y, si es de admin, verificar el JWT de Supabase y el rol en el servidor.
