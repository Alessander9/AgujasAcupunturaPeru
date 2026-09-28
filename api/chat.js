// Vercel Serverless Function: AI Chatbot Gateway
// Blindaje de API Keys (Groq, OpenRouter, Mistral, Gemini) en el Servidor

export default async function handler(req, res) {
  // CORS & Method Check
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { messages, systemPrompt } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid "messages" array.' });
    }

    const safeSystemPrompt = systemPrompt || 'Eres un asistente experto para Agujas Acupuntura Perú.';

    // 1. Claves desde variables de entorno seguras del servidor Vercel
    const GROQ_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
    const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;
    const MISTRAL_KEY = process.env.MISTRAL_API_KEY || process.env.VITE_MISTRAL_API_KEY;
    const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    let reply = '';
    let providerName = '';

    // --- Provider 1: Groq ---
    if (GROQ_KEY && !reply) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: safeSystemPrompt },
              ...messages
            ],
            temperature: 0.2,
            max_tokens: 500
          })
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const text = data.choices?.[0]?.message?.content;
          if (text && text.trim().length > 0) {
            reply = text.trim();
            providerName = 'Groq (Llama 3.3 Serverless)';
          }
        }
      } catch (e) {
        console.warn('Groq server error:', e.message);
      }
    }

    // --- Provider 2: OpenRouter ---
    if (OPENROUTER_KEY && !reply) {
      try {
        const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_KEY}`,
            'HTTP-Referer': 'https://www.agujasacupunturaperu.com',
            'X-Title': 'Agujas Acupuntura Perú'
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-3.3-70b-instruct:free',
            messages: [
              { role: 'system', content: safeSystemPrompt },
              ...messages
            ],
            temperature: 0.2,
            max_tokens: 500
          })
        });

        if (orRes.ok) {
          const data = await orRes.json();
          const text = data.choices?.[0]?.message?.content;
          if (text && text.trim().length > 0) {
            reply = text.trim();
            providerName = 'OpenRouter (Serverless)';
          }
        }
      } catch (e) {
        console.warn('OpenRouter server error:', e.message);
      }
    }

    // --- Provider 3: Mistral ---
    if (MISTRAL_KEY && !reply) {
      try {
        const mistralRes = await fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MISTRAL_KEY}`
          },
          body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [
              { role: 'system', content: safeSystemPrompt },
              ...messages
            ],
            temperature: 0.2,
            max_tokens: 500
          })
        });

        if (mistralRes.ok) {
          const data = await mistralRes.json();
          const text = data.choices?.[0]?.message?.content;
          if (text && text.trim().length > 0) {
            reply = text.trim();
            providerName = 'Mistral AI (Serverless)';
          }
        }
      } catch (e) {
        console.warn('Mistral server error:', e.message);
      }
    }

    // --- Provider 4: Gemini ---
    if (GEMINI_KEY && !reply) {
      try {
        const contents = messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: safeSystemPrompt }] },
            contents: contents,
            generationConfig: { temperature: 0.2, maxOutputTokens: 500 }
          })
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim().length > 0) {
            reply = text.trim();
            providerName = 'Gemini (Serverless)';
          }
        }
      } catch (e) {
        console.warn('Gemini server error:', e.message);
      }
    }

    if (!reply) {
      return res.status(503).json({ error: 'All external AI providers unavailable' });
    }

    return res.status(200).json({
      text: reply,
      provider: providerName,
      success: true
    });

  } catch (error) {
    console.error('API /api/chat error:', error);
    return res.status(500).json({ error: 'Internal server error processing AI request' });
  }
}
