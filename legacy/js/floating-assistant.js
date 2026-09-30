/**
 * Reusable Floating Assistant FAB & AI Chatbot Component for Agujas Acupuntura Perú
 * States:
 * 1. Closed: 60px circular pulse button
 * 2. Menu: Floating cards for Asistente IA and WhatsApp
 * 3. Chatbot: In-page clinical AI assistant with automated query handling
 */

(function () {
  'use strict';

  // Inject CSS if needed
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes fabPulse {
      0% { box-shadow: 0 0 0 0 rgba(35, 72, 60, 0.5); }
      70% { box-shadow: 0 0 0 15px rgba(35, 72, 60, 0); }
      100% { box-shadow: 0 0 0 0 rgba(35, 72, 60, 0); }
    }
    .fab-pulse-effect {
      animation: fabPulse 2.2s infinite;
    }
    .chat-bubble-enter {
      animation: chatFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes chatFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(styleEl);

  const FAB_HTML = `
    <div id="floatingAssistantRoot" class="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end font-sans pointer-events-auto select-none">
      
      <!-- 3. CHATBOT WINDOW -->
      <div id="assistantChatWindow" class="hidden mb-4 w-[calc(100vw-2.5rem)] max-w-[390px] h-[540px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-[#E6D3BC] flex flex-col overflow-hidden chat-bubble-enter">
        
        <!-- Header -->
        <div class="bg-[#23483C] px-4 py-3.5 text-white flex items-center justify-between border-b border-[#16332B]">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 rounded-2xl bg-[#16332B] border border-[#A47C52]/50 flex items-center justify-center text-[#E6D3BC] shadow-inner">
                <span class="material-symbols-outlined text-[22px] text-[#E6D3BC]">smart_toy</span>
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3F7D5B] border-2 border-[#23483C]"></span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1.5">
                <h3 class="font-extrabold text-sm text-[#F7F2EA] leading-tight">Asistente IA</h3>
                <span class="px-1.5 py-0.2 rounded-md bg-[#A47C52] text-[9px] font-bold tracking-wide text-white uppercase">Agujas Acupuntura Perú</span>
              </div>
              <span class="text-[11px] font-medium text-[#E6D3BC] flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-[#3F7D5B] animate-pulse"></span>
                En línea | Insumos Clínicos
              </span>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <button id="btnMinimizeChat" title="Minimizar" type="button" class="w-8 h-8 rounded-lg text-[#E6D3BC] hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <button id="btnCloseChat" title="Cerrar" type="button" class="w-8 h-8 rounded-lg text-[#E6D3BC] hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <!-- Chat Area -->
        <div id="chatMessagesContainer" class="flex-1 p-4 overflow-y-auto bg-[#F7F2EA]/40 space-y-3 scrollbar-thin">
          
          <div class="flex flex-col items-start chat-bubble-enter">
            <div class="max-w-[88%] p-3.5 rounded-2xl bg-white text-[#202520] border border-[#E6D3BC] rounded-tl-xs text-xs sm:text-[13px] leading-relaxed shadow-xs">
              <p>¡Hola! 👋 Soy tu Asistente Clínico IA de <strong>Agujas Acupuntura Perú & Agujas Acupuntura Perú</strong>.</p>
              <p class="mt-1.5">Te ayudo a cotizar insumos para terapeutas, medidas de agujas, kits de ventosas, moxa y aceites Amazoni-k.</p>
            </div>
            <span class="text-[10px] text-[#687067] mt-1 px-1">En línea</span>

            <!-- Quick Chips -->
            <div class="mt-2 space-y-1.5 w-full max-w-[95%]">
              <p class="text-[11px] font-bold text-[#23483C] uppercase tracking-wider mb-1">Opciones rápidas:</p>
              <div class="flex flex-col gap-1.5" id="quickOptionsContainer">
                <button type="button" class="quick-chip text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-[#E6D3BC]/50 border border-[#E6D3BC] text-[#202520] font-semibold flex items-center justify-between transition-all hover:border-[#A47C52]" data-query="¿Qué medidas y precios de agujas tienen disponibles?">
                  <span>🏷️ Precios y medidas de agujas</span>
                  <span class="material-symbols-outlined text-[16px] text-[#A47C52]">chevron_right</span>
                </button>
                <button type="button" class="quick-chip text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-[#E6D3BC]/50 border border-[#E6D3BC] text-[#202520] font-semibold flex items-center justify-between transition-all hover:border-[#A47C52]" data-query="Información del kit de ventosas clínicas">
                  <span>📦 Kit de ventosas clínicas</span>
                  <span class="material-symbols-outlined text-[16px] text-[#A47C52]">chevron_right</span>
                </button>
                <button type="button" class="quick-chip text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-[#E6D3BC]/50 border border-[#E6D3BC] text-[#202520] font-semibold flex items-center justify-between transition-all hover:border-[#A47C52]" data-query="¿Qué aceites esenciales terapéuticos tienen?">
                  <span>🌿 Línea Aceites Amazoni-k</span>
                  <span class="material-symbols-outlined text-[16px] text-[#A47C52]">chevron_right</span>
                </button>
                <button type="button" class="quick-chip text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-[#E6D3BC]/50 border border-[#E6D3BC] text-[#202520] font-semibold flex items-center justify-between transition-all hover:border-[#A47C52]" data-query="¿Cómo son los envíos a Lima y provincias?">
                  <span>🚚 Envíos y cobertura en Perú</span>
                  <span class="material-symbols-outlined text-[16px] text-[#A47C52]">chevron_right</span>
                </button>
                <button type="button" class="quick-chip text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-[#E6D3BC]/50 border border-[#E6D3BC] text-[#202520] font-semibold flex items-center justify-between transition-all hover:border-[#A47C52]" data-query="Deseo comunicarme directamente con un asesor por WhatsApp">
                  <span>👩‍⚕️ Hablar con un asesor directo</span>
                  <span class="material-symbols-outlined text-[16px] text-[#A47C52]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Input Bar -->
        <form id="assistantChatForm" class="p-3 bg-white border-t border-[#E6D3BC]/80 flex items-center gap-2">
          <input
            id="assistantChatInput"
            type="text"
            placeholder="Escribe tu consulta sobre insumos..."
            class="flex-1 bg-[#F7F2EA] border border-[#E6D3BC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#202520] placeholder-[#687067]/70 focus:outline-none focus:border-[#23483C] transition-colors"
          />
          <button
            type="submit"
            class="w-10 h-10 rounded-xl bg-[#23483C] hover:bg-[#16332B] text-white flex items-center justify-center transition-all shadow-sm">
            <span class="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>

      <!-- 2. FAB MENU POPUP -->
      <div id="assistantFabMenu" class="hidden mb-3 flex flex-col gap-2.5 items-end chat-bubble-enter">
        
        <!-- Card 1: Asistente IA -->
        <button id="btnOpenAiFromMenu" type="button" class="flex items-center gap-3.5 p-3 pr-5 bg-white hover:bg-[#F7F2EA] rounded-2xl border border-[#E6D3BC] shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.03] group text-left max-w-xs cursor-pointer">
          <div class="w-11 h-11 rounded-xl bg-[#23483C] text-[#E6D3BC] flex items-center justify-center shadow-md flex-shrink-0 group-hover:bg-[#16332B] transition-colors">
            <span class="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-extrabold text-sm text-[#202520]">Asistente IA</span>
              <span class="px-1.5 py-0.2 rounded-full bg-[#A47C52] text-white text-[9px] font-bold">24/7</span>
            </div>
            <span class="text-[11px] text-[#687067] font-medium leading-tight">
              Resuelve tus dudas al instante
            </span>
          </div>
        </button>

        <!-- Card 2: WhatsApp -->
        <a href="https://wa.me/51930830427?text=Hola,%20deseo%20asesoría%20sobre%20insumos%20y%20productos%20para%20terapeutas." target="_blank" rel="noopener noreferrer" class="flex items-center gap-3.5 p-3 pr-5 bg-white hover:bg-[#F7F2EA] rounded-2xl border border-[#E6D3BC] shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.03] group text-left max-w-xs cursor-pointer">
          <div class="w-11 h-11 rounded-xl bg-[#25d366] text-white flex items-center justify-center shadow-md flex-shrink-0 group-hover:bg-[#20ba59] transition-colors">
            <i class="fab fa-whatsapp text-2xl"></i>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-extrabold text-sm text-[#202520]">WhatsApp</span>
              <span class="w-2 h-2 rounded-full bg-[#25d366] animate-pulse"></span>
            </div>
            <span class="text-[11px] text-[#687067] font-medium leading-tight">
              Habla con nosotros
            </span>
          </div>
        </a>

      </div>

      <!-- 1. BASE CIRCULAR FAB BUTTON (60px) -->
      <button id="mainAssistantFabBtn" aria-label="Asistente de atención" type="button" class="fab-pulse-effect w-[60px] h-[60px] rounded-full bg-[#23483C] hover:bg-[#16332B] border-2 border-[#A47C52]/50 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer">
        <span id="fabIconSparkle" class="material-symbols-outlined text-[28px] text-[#F7F2EA]">forum</span>
        <span id="fabIconClose" class="material-symbols-outlined text-[26px] text-[#F7F2EA] hidden">close</span>
      </button>

    </div>
  `;

  function initAssistant() {
    if (document.getElementById('floatingAssistantRoot')) return;
    
    // Remove old floating wa if present
    const oldWa = document.getElementById('waWrap');
    if (oldWa) oldWa.remove();

    const wrapper = document.createElement('div');
    wrapper.innerHTML = FAB_HTML;
    document.body.appendChild(wrapper.firstElementChild);

    const mainBtn = document.getElementById('mainAssistantFabBtn');
    const fabMenu = document.getElementById('assistantFabMenu');
    const chatWindow = document.getElementById('assistantChatWindow');
    const iconSparkle = document.getElementById('fabIconSparkle');
    const iconClose = document.getElementById('fabIconClose');
    const btnOpenAi = document.getElementById('btnOpenAiFromMenu');
    const btnMinimize = document.getElementById('btnMinimizeChat');
    const btnCloseChat = document.getElementById('btnCloseChat');
    const chatForm = document.getElementById('assistantChatForm');
    const chatInput = document.getElementById('assistantChatInput');
    const messagesContainer = document.getElementById('chatMessagesContainer');

    let state = 'closed'; // 'closed' | 'menu' | 'chat'

    function updateView(newState) {
      state = newState;
      if (state === 'closed') {
        fabMenu.classList.add('hidden');
        chatWindow.classList.add('hidden');
        mainBtn.classList.remove('rotate-90', 'bg-[#16332B]');
        mainBtn.classList.add('bg-[#23483C]', 'fab-pulse-effect');
        iconSparkle.classList.remove('hidden');
        iconClose.classList.add('hidden');
      } else if (state === 'menu') {
        chatWindow.classList.add('hidden');
        fabMenu.classList.remove('hidden');
        mainBtn.classList.remove('fab-pulse-effect');
        mainBtn.classList.add('rotate-90', 'bg-[#16332B]');
        iconSparkle.classList.add('hidden');
        iconClose.classList.remove('hidden');
      } else if (state === 'chat') {
        fabMenu.classList.add('hidden');
        chatWindow.classList.remove('hidden');
        mainBtn.classList.remove('fab-pulse-effect');
        mainBtn.classList.add('rotate-90', 'bg-[#16332B]');
        iconSparkle.classList.add('hidden');
        iconClose.classList.remove('hidden');
        chatInput.focus();
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }

    mainBtn.addEventListener('click', () => {
      if (state === 'closed') {
        updateView('menu');
      } else {
        updateView('closed');
      }
    });

    btnOpenAi.addEventListener('click', () => {
      updateView('chat');
    });

    btnMinimize.addEventListener('click', () => {
      updateView('menu');
    });

    btnCloseChat.addEventListener('click', () => {
      updateView('closed');
    });

    function appendMessage(sender, text, showWhatsappBtn = false) {
      const msgWrap = document.createElement('div');
      msgWrap.className = `flex flex-col ${sender === 'user' ? 'items-end' : 'items-start'} chat-bubble-enter`;

      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const bubbleClass = sender === 'user'
        ? 'bg-[#23483C] text-[#F7F2EA] rounded-br-xs'
        : 'bg-white text-[#202520] border border-[#E6D3BC] rounded-tl-xs';

      let whatsappHtml = '';
      if (showWhatsappBtn) {
        whatsappHtml = `
          <a href="https://wa.me/51930830427?text=Hola,%20deseo%20asesoría%20personalizada%20con%20un%20asesor%20clínico."
             target="_blank" rel="noopener noreferrer"
             class="mt-2.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-sm transition-all">
            <i class="fab fa-whatsapp text-sm"></i>
            <span>Abrir WhatsApp Ahora</span>
          </a>
        `;
      }

      msgWrap.innerHTML = `
        <div class="max-w-[85%] p-3.5 rounded-2xl ${bubbleClass} text-xs sm:text-[13px] leading-relaxed shadow-xs">
          <p class="whitespace-pre-line">${text}</p>
          ${whatsappHtml}
        </div>
        <span class="text-[10px] text-[#687067] mt-1 px-1">${now}</span>
      `;

      messagesContainer.appendChild(msgWrap);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleSend(text) {
      const query = (text || chatInput.value || '').trim();
      if (!query) return;

      appendMessage('user', query);
      chatInput.value = '';

      // Typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.id = 'typingIndicator';
      typingIndicator.className = 'flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#E6D3BC] max-w-[80px] shadow-xs chat-bubble-enter';
      typingIndicator.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-[#23483C] animate-bounce"></span>
        <span class="w-2 h-2 rounded-full bg-[#23483C] animate-bounce [animation-delay:0.2s]"></span>
        <span class="w-2 h-2 rounded-full bg-[#23483C] animate-bounce [animation-delay:0.4s]"></span>
      `;
      messagesContainer.appendChild(typingIndicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      setTimeout(() => {
        typingIndicator.remove();
        const lower = query.toLowerCase();
        let reply = '';
        let isWa = false;

        if (lower.includes('aguja') || lower.includes('medida') || lower.includes('precio') || lower.includes('hansol') || lower.includes('huan')) {
          reply = 'Disponemos de **Agujas HANSOL** (acero quirúrgico coreano, mango de cobre) y **Huan Qiu** (micro-siliconadas con tubo guía):\n\n• **0.25 x 40 mm**: S/ 39.90 (Caja x 100)\n• **0.25 x 25 mm**: S/ 35.00 (Caja x 100)\n• **0.22 x 13 mm** faciales y corporales.\n\nTodas cuentan con certificaciones **CE, ISO 13485 y FDA**. ¿Deseas coordinar un pedido?';
        } else if (lower.includes('ventosa') || lower.includes('pistón') || lower.includes('cupping')) {
          reply = 'El **Kit de Ventosas Clínicas BioCupping Pro** incluye 12 copas de policarbonato médico ultra-resistente, bomba ergonómica de vacío y puntas magnéticas.\n\nPrecio oferta: **S/ 65.00** (antes S/ 85.00).';
        } else if (lower.includes('aceite') || lower.includes('amazon') || lower.includes('copaiba')) {
          reply = 'Nuestra línea exclusiva **Amazoni-k** cuenta con aceites 100% puros de la selva peruana (Copaiba, Sangre de Grado, Palo Santo, Aguaje) de grado terapéutico para masoterapia y acupuntura.';
        } else if (lower.includes('envío') || lower.includes('provincia') || lower.includes('lima') || lower.includes('cobertura')) {
          reply = '🚚 **Cobertura en todo el Perú**:\n\n• Lima Metropolitana: Entrega rápida en el día o 24 hrs.\n• Provincias: Envíos seguros vía Olva Courier, Shalom o Marvisur.';
        } else if (lower.includes('asesor') || lower.includes('whatsapp') || lower.includes('comunicarme')) {
          reply = '¡Con gusto! Te derivo de inmediato con nuestro equipo clínico en WhatsApp para confirmar stock y coordinar tu entrega.';
          isWa = true;
        } else {
          reply = 'Con gusto te asesoramos sobre insumos para terapeutas de **Agujas Acupuntura Perú & Agujas Acupuntura Perú**.\n\n¿Deseas cotizar algún producto o comunicarte por WhatsApp?';
          isWa = true;
        }

        appendMessage('bot', reply, isWa);
      }, 800);
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSend();
    });

    document.querySelectorAll('.quick-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        handleSend(btn.getAttribute('data-query'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistant);
  } else {
    initAssistant();
  }
})();
