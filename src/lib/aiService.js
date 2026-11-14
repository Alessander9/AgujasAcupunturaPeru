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

import { buildRAGContext, retrieveKnowledgeChunks, retrieveCatalogProducts } from './ragEngine.js';
import { classifyIntent } from './intent-router.js';
import { pushTurn, getLastProduct, setLastProduct, isAmbiguousFollowup } from './conversation-memory.js';
import { retrieveTopProducts } from './retrieval.js';

// Única vía hacia los LLM: el endpoint serverless /api/chat.
// SEGURIDAD: el navegador NUNCA llama directo a Groq/OpenRouter/Mistral/Gemini ni lee API keys.
// El system prompt lo arma el servidor; aquí solo se envía el contexto RAG como datos.
async function callServerlessAPI(messages, context) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        context
      })
    });

    if (!response.ok) {
      throw new Error(`Serverless chat endpoint returned status ${response.status}`);
    }

    const data = await response.json();
    if (data && data.text && data.text.trim().length > 0) {
      return {
        text: data.text.trim(),
        provider: data.provider || 'Asistente IA'
      };
    }
  } catch (err) {
    // Silenciosamente cae al motor RAG local
  }
  return null;
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

  // Contexto RAG (solo datos). El servidor lo envuelve con su propio system prompt.
  const { fullContext: ragContext } = await buildRAGContext(queryForRetrieval, sessionId);

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

  let finalReply = '';
  let chosenProvider = 'Motor RAG Local';

  // 1. Único camino a los LLM: endpoint serverless (/api/chat). Las keys viven en el servidor.
  const serverlessResult = await callServerlessAPI(messages, ragContext);
  if (serverlessResult && serverlessResult.text) {
    finalReply = serverlessResult.text;
    chosenProvider = serverlessResult.provider;
  }

  // 2. Fallback determinístico local 0ms si el endpoint no responde
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
