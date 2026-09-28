/**
 * Multi-Provider RAG AI Service for Agujas Acupuntura Perú Chatbot (v2)
 * Cascading Fallback: Groq -> OpenRouter -> Mistral -> Gemini -> Local Deterministic RAG Generator
 * 
 * Pipeline de Ejecución (Orden Estricto):
 * 1. Clasificación rápida de intención (intent-router.js) -> 0ms para saludos, despedidas, quejas y derivación.
 * 2. Resolución de ambigüedad conversacional (conversation-memory.js) -> Contexto de turnos anteriores.
 * 3. Recuperación híbrida de catálogo (retrieval.js) -> SKU/medidas exactas + similitud semántica.
 * 4. Inyección del System Prompt v2 unificado (system-prompt.md) a la cascada de proveedores LLM.
 * 5. Fallback local determinístico ultra-rápido si las APIs externas no responden.
 * 6. Registro de memoria (pushTurn / setLastProduct).
 */

import { buildGroundedSystemPrompt, retrieveKnowledgeChunks, retrieveCatalogProducts } from './ragEngine.js';
import { classifyIntent } from './intent-router.js';
import { pushTurn, getLastProduct, setLastProduct, isAmbiguousFollowup } from './conversation-memory.js';
import { retrieveTopProducts } from './retrieval.js';

// Helper: Groq API Call
async function callGroq(messages, systemPrompt) {
  const apiKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_GROQ_API_KEY
    ? import.meta.env.VITE_GROQ_API_KEY
    : process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;

  if (!apiKey) throw new Error('No Groq API Key found');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.2,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Groq returned empty response');
  return text;
}

// Helper: OpenRouter API Call
async function callOpenRouter(messages, systemPrompt) {
  const apiKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENROUTER_API_KEY
    ? import.meta.env.VITE_OPENROUTER_API_KEY
    : process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;

  if (!apiKey) throw new Error('No OpenRouter API Key found');

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://agujasacupuntura.pe',
      'X-Title': 'Agujas Acupuntura Perú'
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.3-70b-instruct:free',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.2,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('OpenRouter returned empty response');
  return text;
}

// Helper: Mistral AI Call
async function callMistral(messages, systemPrompt) {
  const apiKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_MISTRAL_API_KEY
    ? import.meta.env.VITE_MISTRAL_API_KEY
    : process.env.VITE_MISTRAL_API_KEY || process.env.MISTRAL_API_KEY;

  if (!apiKey) throw new Error('No Mistral API Key found');

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.2,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Mistral error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Mistral returned empty response');
  return text;
}

// Helper: Gemini API Call
async function callGemini(messages, systemPrompt) {
  const apiKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY
    ? import.meta.env.VITE_GEMINI_API_KEY
    : process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) throw new Error('No Gemini API Key found');

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 500
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned empty response');
  return text;
}

/**
 * Generador RAG Local Determinístico (Fallback offline / 0ms)
 * Cumple fielmente las reglas de formato de system-prompt.md:
 * - Máximo 3 viñetas o 2 párrafos cortos.
 * - Formato S/ XX.00 estricto.
 * - Negritas solo en nombre de producto y precio.
 * - Cierre con WhatsApp +51 930 830 427 cuando aplique.
 * - Grounding negativo si no existe el dato en catálogo.
 */
export async function localDeterministicRAG(userQuery, sessionId = null) {
  const q = (userQuery || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const matchedDocs = retrieveKnowledgeChunks(userQuery, 1);
  const matchedProducts = await retrieveCatalogProducts(userQuery, 3, sessionId);

  // 1. Pregunta sobre métodos de pago
  if (q.includes('pago') || q.includes('pagar') || q.includes('cuenta') || q.includes('bcp') || q.includes('yape') || q.includes('transferencia')) {
    return `Puedes pagar por:
- **Yape:** 939 371 250
- **BCP:** Cta. 1932597886070 (CCI: 00219300259788607015)

Titular: Instituto de Terapias Integrales Perú. Envíame tu comprobante por WhatsApp y coordinamos el envío 📦`;
  }

  // 2. Pregunta sobre ubicación / recojo
  if (q.includes('donde') || q.includes('ubicacion') || q.includes('direccion') || q.includes('tienda') || q.includes('recojo') || q.includes('recoger')) {
    return `¡Claro! Puedes recoger en nuestra oficina: **Av. Julio C. Tello 438, Lince, Lima**. Si prefieres, también hacemos delivery en Lima (24-48h) o envíos a provincia por Shalom, Olva Courier o Marvisur 🚚`;
  }

  // 3. Grounding negativo para atributos no catalogados (ej: color negro en ventosas de vidrio, etc.)
  if (matchedProducts.length > 0) {
    const p1 = matchedProducts[0];
    const isAskingColor = q.includes('color') || q.includes('negro') || q.includes('blanco') || q.includes('azul') || q.includes('rojo');
    
    if (isAskingColor) {
      const pText = p1.precioTexto || `S/ ${p1.precio}.00`;
      return `No tengo el dato de color a la mano ahora mismo para el **${p1.nombre}** (${pText}). Escríbenos al WhatsApp +51 930 830 427 y te confirmamos al toque 🙌`;
    }

    // Respuesta recomendada de producto
    const pText = p1.precioTexto || `S/ ${p1.precio}.00`;
    const medidas = (p1.medidasDisponibles || []).slice(0, 4).join(', ');
    const desc = p1.descripcionResumen || 'ideal para tus sesiones terapéuticas';

    let reply = `Sí 🪡 Te recomiendo **${p1.nombre}** a **${pText}** — ${desc}.`;
    if (medidas) {
      reply += ` Vienen en varias medidas (${medidas}), esterilizadas y de uso profesional.`;
    }

    if (matchedProducts.length > 1) {
      const p2 = matchedProducts[1];
      const p2Text = p2.precioTexto || `S/ ${p2.precio}.00`;
      reply += ` También disponemos de **${p2.nombre}** (**${p2Text}**).`;
    }

    reply += `\n\n¿Para qué medida las necesitas o prefieres coordinar tu pedido al WhatsApp +51 930 830 427?`;
    return reply;
  }

  // 4. Si coincide con algún documento institucional
  if (matchedDocs.length > 0) {
    return `${matchedDocs[0].content}\n\nEscríbenos al WhatsApp +51 930 830 427 y con gusto te atendemos ✨`;
  }

  // 5. Fallback general
  return `En **Agujas Acupuntura Perú** tenemos insumos profesionales como **Agujas para Acupuntura** (**S/ 20.00**), **Kit BioCupping Pro** (**S/ 65.00**) y **Aceites Amazoni-k** (**S/ 35.00**).\n\n¿Qué producto o medida buscas? También puedes escribirnos directo al WhatsApp +51 930 830 427 🪡`;
}

/**
 * Entry Point del Chatbot RAG (Orden Estricto):
 * a) classifyIntent()
 * b) isAmbiguousFollowup() + getLastProduct()
 * c) retrieveTopProducts()
 * d) LLM Cascade / Fallback + pushTurn() + setLastProduct()
 */
export async function generateChatResponse(chatHistory, userMessage, sessionId = 'default-session') {
  const cleanMessage = (userMessage || '').trim();

  // =========================================================================
  // PASO A: Clasificación Rápida de Intención (intent-router.js)
  // =========================================================================
  const intent = classifyIntent(cleanMessage);
  if (intent.type !== 'product_query') {
    pushTurn(sessionId, { role: 'user', content: cleanMessage });
    pushTurn(sessionId, { role: 'assistant', content: intent.fixedResponse });
    
    return {
      text: intent.fixedResponse,
      provider: 'Router de Intención',
      success: true,
      triggerWhatsApp: intent.triggerWhatsApp
    };
  }

  // =========================================================================
  // PASO B: Manejo de Memoria Conversacional (conversation-memory.js)
  // =========================================================================
  let queryForRetrieval = cleanMessage;
  if (isAmbiguousFollowup(cleanMessage)) {
    const lastProduct = getLastProduct(sessionId);
    if (lastProduct) {
      queryForRetrieval = `${cleanMessage} ${lastProduct.nombre}`;
    }
  }

  // =========================================================================
  // PASO C: Recuperación Híbrida RAG (retrieval.js)
  // =========================================================================
  const topProducts = await retrieveTopProducts(queryForRetrieval, 3, sessionId);

  // Armar el System Prompt unificado con los datos aislados
  const systemPrompt = await buildGroundedSystemPrompt(queryForRetrieval, sessionId);

  const messages = (chatHistory || [])
    .filter(m => m.sender === 'user' || m.sender === 'bot')
    .slice(-6)
    .map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

  messages.push({
    role: 'user',
    content: cleanMessage
  });

  const providers = [
    { name: 'Groq (Llama 3.3 RAG)', fn: () => callGroq(messages, systemPrompt) },
    { name: 'OpenRouter RAG', fn: () => callOpenRouter(messages, systemPrompt) },
    { name: 'Mistral RAG', fn: () => callMistral(messages, systemPrompt) },
    { name: 'Gemini RAG', fn: () => callGemini(messages, systemPrompt) }
  ];

  let finalReply = '';
  let chosenProvider = 'Motor RAG Local';

  // Try each provider in cascade
  for (const provider of providers) {
    try {
      const reply = await provider.fn();
      if (reply && reply.trim().length > 0) {
        finalReply = reply.trim();
        chosenProvider = provider.name;
        break;
      }
    } catch (err) {
      // Cascade to next provider
    }
  }

  // Fallback to local deterministic generator if all external LLMs fail
  if (!finalReply) {
    finalReply = await localDeterministicRAG(queryForRetrieval, sessionId);
  }

  // =========================================================================
  // PASO D: Persistir Turno y Último Producto en Memoria
  // =========================================================================
  pushTurn(sessionId, { role: 'user', content: cleanMessage });
  pushTurn(sessionId, { role: 'assistant', content: finalReply });

  if (topProducts && topProducts.length > 0) {
    setLastProduct(sessionId, topProducts[0]);
  }

  return {
    text: finalReply,
    provider: chosenProvider,
    success: true,
    triggerWhatsApp: intent.triggerWhatsApp || finalReply.toLowerCase().includes('whatsapp')
  };
}

export default {
  generateChatResponse,
  localDeterministicRAG
};
