import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  MessageSquare,
  X,
  Minus,
  Send,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Package,
  PhoneCall
} from 'lucide-react';

export default function FloatingAssistantFAB() {
  // States: 'closed' | 'menu' | 'chat'
  const [viewState, setViewState] = useState('closed');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef(null);

  // Hide FAB when at or inside the Hero section, show when scrolled past it
  useEffect(() => {
    const handleScroll = () => {
      // Detect Home Hero Slider or Subpage Hero Banner
      const heroElement = document.getElementById('hero-slider') || document.querySelector('h1')?.closest('.relative');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // Once bottom of hero reaches near top of screen (< 150px)
        setIsVisible(rect.bottom < 150);
      } else {
        // Generic fallback: show after scrolling 300px
        setIsVisible(window.scrollY > 300);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initialMessages = [
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! 👋 Soy tu Asistente Clínico IA de **Agujas Acupuntura Perú**.\n\nTe ayudo a cotizar insumos terapéuticos, consultar medidas de agujas, kits de ventosas, moxibustión y aceites Amazoni-k.',
      time: 'En línea',
      hasQuickActions: true
    }
  ];

  const [messages, setMessages] = useState(initialMessages);

  const quickOptions = [
    { label: '🏷️ Precios y medidas de agujas', query: '¿Qué medidas y marcas de agujas tienen disponibles?' },
    { label: '📦 Kit de ventosas clínicas', query: 'Información sobre el kit de ventosas con pistón' },
    { label: '🌿 Línea Aceites Amazoni-k', query: '¿Qué aceites esenciales terapéuticos tienen?' },
    { label: '🚚 Envíos y cobertura en Perú', query: '¿Cómo son los envíos a Lima y provincias?' },
    { label: '👩‍⚕️ Hablar con un asesor directo', query: 'Deseo comunicarme directamente con un asesor por WhatsApp' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (viewState === 'chat') {
      scrollToBottom();
    }
  }, [messages, viewState, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // AI Simulated Clinical Consultation Responses
    setTimeout(() => {
      let botReplyText = '';
      const lower = text.toLowerCase();

      if (lower.includes('aguja') || lower.includes('medida') || lower.includes('precio') || lower.includes('hansol') || lower.includes('huan')) {
        botReplyText = 'Disponemos de **Agujas HANSOL** (acero quirúrgico coreano, mango de cobre) y **Huan Qiu** (micro-siliconadas con tubo guía):\n\n• **0.25 x 40 mm**: S/ 39.90 (Caja x 100)\n• **0.25 x 25 mm**: S/ 35.00 (Caja x 100)\n• **0.22 x 13 mm** faciales y 0.30 x 75 mm corporales.\n\nTodas cuentan con certificaciones **CE, ISO 13485 y FDA**. ¿Deseas agregar al pedido o consultar por mayor?';
      } else if (lower.includes('ventosa') || lower.includes('pistón') || lower.includes('cupping')) {
        botReplyText = 'El **Kit de Ventosas Clínicas BioCupping Pro** incluye:\n\n• 12 copas de policarbonato médico ultra-resistente a caídas.\n• Pistón ergonómico de succión al vacío.\n• Puntas magnéticas para polaridad terapéutica.\n• Manguera extensora y maletín de transporte.\n\nPrecio oferta: **S/ 65.00** (antes S/ 85.00).';
      } else if (lower.includes('aceite') || lower.includes('amazon') || lower.includes('copaiba')) {
        botReplyText = 'Nuestra línea exclusiva **Amazoni-k** cuenta con aceites 100% puros de la selva peruana:\n\n• **Copaiba Pura**: Potente antiinflamatorio articular.\n• **Sangre de Grado**: Cicatrizante clínico.\n• **Palo Santo**: Alivio muscular y aromaterapia.\n• **Aguaje + Rosa Mosqueta**: Nutrición tisular.\n\nSon de grado terapéutico aptos para digitopuntura y masoterapia.';
      } else if (lower.includes('envío') || lower.includes('provincia') || lower.includes('lima') || lower.includes('cobertura')) {
        botReplyText = '🚚 **Cobertura y Envíos a todo el Perú**:\n\n• **Lima Metropolitana**: Entrega rápida el mismo día o 24 hrs por motorizado.\n• **Provincias**: Envíos seguros vía Olva Courier, Shalom o Marvisur con número de seguimiento.\n• Pagos seguros mediante Yape, Plin, transferencia o tarjeta.';
      } else if (lower.includes('asesor') || lower.includes('whatsapp') || lower.includes('comunicarme')) {
        botReplyText = '¡Perfecto! Te derivo de inmediato con nuestro equipo clínico de atención personalizada en WhatsApp para confirmar stock y gestionar tu pedido.';
      } else {
        botReplyText = `Con gusto te asesoramos sobre insumos para terapeutas de **Agujas Acupuntura Perú**.\n\nPuedes revisar nuestro catálogo completo en la web o consultar por medidas especiales, moxas y agujas estériles. ¿Deseas hacer tu pedido por WhatsApp?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReplyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showWhatsappBtn: lower.includes('asesor') || lower.includes('whatsapp') || lower.includes('pedido')
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  // If user has chat or menu opened, keep visible; otherwise hide while in hero
  const shouldRender = isVisible || viewState !== 'closed';

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end transition-all duration-300 transform ${
        shouldRender
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-8 pointer-events-none scale-90'
      }`}
    >
      
      {/* ========================================================================= */}
      {/* 3. ESTADO: CHATBOT IA ABIERTO (VENTANA FLOTANTE INTEGRADA) */}
      {/* ========================================================================= */}
      {viewState === 'chat' && (
        <div className="mb-4 w-[calc(100vw-2.5rem)] max-w-[390px] h-[540px] max-h-[82vh] bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#E6D3BC] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header Verde Institucional */}
          <div className="bg-[#23483C] px-4 py-3.5 text-white flex items-center justify-between border-b border-[#16332B] select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-[#16332B] border border-[#A47C52]/50 flex items-center justify-center text-[#E6D3BC] shadow-inner">
                  <Bot className="h-5 w-5 text-[#E6D3BC]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#3F7D5B] border-2 border-[#23483C]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-[#F7F2EA] leading-tight">
                    Asistente IA
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-md bg-[#A47C52] text-[9px] font-bold tracking-wide text-white uppercase">
                    Agujas Acupuntura Perú
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#E6D3BC] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F7D5B] animate-pulse" />
                  En línea | Insumos Clínicos
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewState('menu')}
                title="Minimizar"
                aria-label="Minimizar chat"
                type="button"
                className="w-8 h-8 rounded-lg text-[#E6D3BC] hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewState('closed')}
                title="Cerrar"
                aria-label="Cerrar chat"
                type="button"
                className="w-8 h-8 rounded-lg text-[#E6D3BC] hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div 
            data-lenis-prevent
            className="flex-1 p-4 overflow-y-auto bg-[#F7F2EA]/50 space-y-3 chatbot-scrollbar select-text touch-pan-y"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#23483C] text-[#F7F2EA] rounded-br-xs'
                      : 'bg-white text-[#202520] border border-[#E6D3BC] rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {msg.showWhatsappBtn && (
                    <a
                      href="https://wa.me/51930830427?text=Hola,%20deseo%20asesoría%20personalizada%20con%20un%20asesor%20clínico."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <i className="fab fa-whatsapp text-sm"></i>
                      <span>Abrir WhatsApp Ahora</span>
                    </a>
                  )}
                </div>
                <span className="text-[10px] text-[#687067] mt-1 px-1">{msg.time}</span>

                {/* Quick Options in First Bot Message */}
                {msg.hasQuickActions && (
                  <div className="mt-2 space-y-1.5 w-full max-w-[95%]">
                    <p className="text-[11px] font-bold text-[#23483C] uppercase tracking-wider mb-1">
                      Opciones rápidas de consulta:
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {quickOptions.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(opt.query)}
                          type="button"
                          className="text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-[#E6D3BC]/50 border border-[#E6D3BC] text-[#202520] font-semibold flex items-center justify-between transition-all hover:border-[#A47C52] group"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight className="h-3.5 w-3.5 text-[#A47C52] transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#E6D3BC] max-w-[80px] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#23483C] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#23483C] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#23483C] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E6D3BC]/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu consulta sobre insumos..."
              className="flex-1 bg-[#F7F2EA] border border-[#E6D3BC] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#202520] placeholder-[#687067]/70 focus:outline-none focus:border-[#23483C] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              aria-label="Enviar mensaje"
              className="w-10 h-10 rounded-xl bg-[#23483C] hover:bg-[#16332B] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ESTADO: FAB DESPLEGADO (MENÚ FLOTANTE HACIA ARRIBA) */}
      {/* ========================================================================= */}
      {viewState === 'menu' && (
        <div className="mb-3 flex flex-col gap-2.5 items-end animate-in fade-in slide-in-from-bottom-4 duration-200 select-none">
          
          {/* Card 1: Asistente IA */}
          <button
            onClick={() => setViewState('chat')}
            type="button"
            className="flex items-center gap-3.5 p-3 pr-5 bg-white hover:bg-[#F7F2EA] rounded-2xl border border-[#E6D3BC] shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.03] group text-left max-w-xs"
          >
            <div className="w-11 h-11 rounded-xl bg-[#23483C] text-[#E6D3BC] flex items-center justify-center shadow-md flex-shrink-0 group-hover:bg-[#16332B] transition-colors">
              <Bot className="h-6 w-6 text-[#E6D3BC]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-[#202520]">Asistente IA</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#A47C52] text-white text-[9px] font-bold">24/7</span>
              </div>
              <span className="text-[11px] text-[#687067] font-medium leading-tight">
                Resuelve tus dudas sobre insumos al instante
              </span>
            </div>
          </button>

          {/* Card 2: WhatsApp */}
          <a
            href="https://wa.me/51930830427?text=Hola,%20deseo%20asesoría%20sobre%20insumos%20y%20productos%20para%20terapeutas."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setViewState('closed')}
            className="flex items-center gap-3.5 p-3 pr-5 bg-white hover:bg-[#F7F2EA] rounded-2xl border border-[#E6D3BC] shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.03] group text-left max-w-xs"
          >
            <div className="w-11 h-11 rounded-xl bg-[#25d366] text-white flex items-center justify-center shadow-md flex-shrink-0 group-hover:bg-[#20ba59] transition-colors">
              <i className="fab fa-whatsapp text-2xl"></i>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-[#202520]">WhatsApp</span>
                <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
              </div>
              <span className="text-[11px] text-[#687067] font-medium leading-tight">
                Habla con un asesor directo
              </span>
            </div>
          </a>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. ESTADO: FAB CERRADO (BOTÓN CIRCULAR DE 60PX CON PULSO SUTIL) */}
      {/* ========================================================================= */}
      <div className="relative">
        {/* Subtle Pulse Ring */}
        {viewState === 'closed' && (
          <span className="absolute inset-0 rounded-full bg-[#23483C]/30 animate-ping duration-1000 pointer-events-none" />
        )}

        <button
          onClick={() => setViewState(viewState === 'closed' ? 'menu' : 'closed')}
          aria-label={viewState === 'closed' ? 'Abrir menú de asistencia' : 'Cerrar menú'}
          type="button"
          className={`w-[60px] h-[60px] rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none border-2 ${
            viewState === 'closed'
              ? 'bg-[#23483C] hover:bg-[#16332B] border-[#A47C52]/50 shadow-[#23483C]/40'
              : 'bg-[#16332B] hover:bg-[#202520] border-[#E6D3BC] shadow-black/40 rotate-90'
          }`}
        >
          {viewState === 'closed' ? (
            <div className="relative">
              <Sparkles className="h-6 w-6 text-[#F7F2EA]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#3F7D5B] border-2 border-[#23483C]" />
            </div>
          ) : (
            <X className="h-6 w-6 text-[#F7F2EA]" />
          )}
        </button>
      </div>

    </div>
  );
}
