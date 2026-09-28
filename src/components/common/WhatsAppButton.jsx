import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  X,
  Minus,
  Send,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Package,
  PhoneCall,
  Flame,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  CreditCard,
  Truck,
  ExternalLink
} from 'lucide-react';
import { generateChatResponse } from '../../lib/aiService';

// Component to parse and display real bold text and clean line breaks without raw markdown asterisks
function FormattedMessage({ text, isUser = false }) {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="space-y-1">
      {lines.map((line, lIdx) => {
        if (!line.trim()) {
          return <div key={lIdx} className="h-1.5" />;
        }

        // Parse **bold text** or `code`
        const parts = [];
        const regex = /(\*\*.*?\*\*|`.*?`)/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push(line.slice(lastIndex, match.index));
          }

          const matchedText = match[0];
          if (matchedText.startsWith('**') && matchedText.endsWith('**')) {
            const innerText = matchedText.slice(2, -2);
            parts.push(
              <strong key={match.index} className={`font-bold ${isUser ? 'text-white' : 'text-[#123329]'}`}>
                {innerText}
              </strong>
            );
          } else if (matchedText.startsWith('`') && matchedText.endsWith('`')) {
            const codeText = matchedText.slice(1, -1);
            parts.push(
              <code key={match.index} className={`px-1 py-0.2 rounded font-mono text-[11px] font-bold ${isUser ? 'bg-white/20 text-white' : 'bg-[#EDE4D6]/70 text-[#123329]'}`}>
                {codeText}
              </code>
            );
          }

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < line.length) {
          parts.push(line.slice(lastIndex));
        }

        return (
          <p key={lIdx} className="leading-relaxed">
            {parts.length > 0 ? parts : line}
          </p>
        );
      })}
    </div>
  );
}

export default function WhatsAppButton() {

  // States: 'closed' | 'menu' | 'chat'
  const [viewState, setViewState] = useState('closed');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const messagesEndRef = useRef(null);

  // Hide FAB when at the top hero section, show when scrolled past it
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero-section') || document.querySelector('h1')?.closest('.relative');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Visible after scrolling past hero
        setIsVisible(rect.bottom < 150);
      } else {
        // Fallback for pages without hero
        setIsVisible(window.scrollY > 200);
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
      text: '¡Hola! 👋 Soy tu Asistente Clínico IA de **Agujas Acupuntura Perú**.\n\nTe ayudo al instante con precios de agujas, kit de ventosas, moxas, aceites Amazoni-k, métodos de pago y envíos a todo el Perú. 🪡✨',
      time: 'En línea',
      hasQuickActions: true,
      provider: 'IA'
    }
  ];

  const [messages, setMessages] = useState(initialMessages);

  const quickOptions = [
    { label: '🏷️ Precios de agujas', query: '¿Cuáles son las medidas y precios de las agujas Huan Qiu y Hansol?' },
    { label: '📦 Kit de ventosas', query: 'Información y precio del Kit de ventosas clínicas BioCupping Pro' },
    { label: '💳 Métodos de pago', query: '¿Cuáles son los números de cuenta, Yape y métodos de pago?' },
    { label: '🚚 Envíos a todo el Perú', query: '¿Cómo son los envíos a Lima y provincias por Shalom / Olva?' },
    { label: '🔥 Moxas y cajas de bambú', query: '¿Qué tipos de moxas y cajas de moxibustión tienen?' },
    { label: '🌿 Aceites Amazoni-k', query: '¿Qué aceites esenciales terapéuticos Amazoni-k tienen?' },
    { label: '👩‍⚕️ Hablar con asesor', query: 'Deseo hablar directamente con un asesor por WhatsApp' }
  ];

  const chatBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    if (viewState === 'chat') {
      // Defer slightly to ensure DOM render has completed
      const timer = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, viewState, isTyping]);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleResetChat = () => {
    setMessages(initialMessages);
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      const response = await generateChatResponse(messages, text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: response.provider,
        showWhatsappBtn: response.text.toLowerCase().includes('whatsapp') || response.text.toLowerCase().includes('930 830 427') || text.toLowerCase().includes('asesor'),
        hasPaymentInfo: response.text.toLowerCase().includes('1932597886070') || response.text.toLowerCase().includes('yape') || response.text.toLowerCase().includes('cuenta')
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: '✨ ¡Hola! Para brindarte una atención rápida y personalizada, comunícate directamente con nuestro asesor de **Agujas Acupuntura Perú** al WhatsApp **930 830 427**.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showWhatsappBtn: true
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const whatsappDirectUrl = "https://wa.me/51930830427?text=Hola,%20deseo%20asesor%C3%ADa%20y%20precios%20de%20los%20insumos%20de%20Agujas%20Acupuntura%20Per%C3%BA.";

  // If user has chat or menu opened, keep visible; otherwise hide while at hero
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
      {/* 3. ESTADO: CHATBOT IA MULTI-PROVIDER */}
      {/* ========================================================================= */}
      {viewState === 'chat' && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-[395px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-[#EDE4D6] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header Verde Institucional Elegante */}
          <div className="bg-[#123329] px-4 py-3 text-white flex items-center justify-between border-b border-[#C29B62]/30 select-none shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-[#C29B62]/40 flex items-center justify-center text-[#EDE4D6] shadow-inner">
                  <Bot className="h-5 w-5 text-[#C29B62]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#123329]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-[#EDE4D6] leading-tight">
                    Asistente Clínico IA
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-md bg-[#C29B62] text-[9px] font-black tracking-wider text-[#123329] uppercase">
                    24/7
                  </span>
                </div>
                <span className="text-[10.5px] font-medium text-[#EDE4D6]/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  En línea | Agujas Acupuntura Perú
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reiniciar chat"
                aria-label="Reiniciar chat"
                type="button"
                className="w-8 h-8 rounded-lg text-[#EDE4D6]/80 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewState('menu')}
                title="Minimizar"
                aria-label="Minimizar chat"
                type="button"
                className="w-8 h-8 rounded-lg text-[#EDE4D6]/80 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewState('closed')}
                title="Cerrar"
                aria-label="Cerrar chat"
                type="button"
                className="w-8 h-8 rounded-lg text-[#EDE4D6]/80 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips Bar */}
          <div 
            data-lenis-prevent
            className="bg-[#FAF7F2] border-b border-[#EDE4D6]/80 px-3 py-2 flex items-center gap-1.5 overflow-x-auto chatbot-scrollbar select-none text-[11px] touch-pan-x"
            style={{ overscrollBehavior: 'contain' }}
          >
            <span className="text-[10px] font-bold text-[#123329]/60 uppercase flex-shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C29B62]" />
            </span>
            {quickOptions.slice(0, 5).map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(opt.query)}
                type="button"
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-[#EDE4D6] border border-[#EDE4D6] text-[#18221D] font-medium transition-all text-[11px] shadow-2xs hover:scale-102 cursor-pointer flex-shrink-0"
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div 
            ref={chatBodyRef}
            data-lenis-prevent
            className="flex-1 p-3.5 overflow-y-auto bg-[#F9F6F0] space-y-3 chatbot-scrollbar select-text touch-pan-y"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-[12.5px] leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#123329] text-[#EDE4D6] rounded-br-xs'
                      : 'bg-white text-[#18221D] border border-[#EDE4D6] rounded-tl-xs'
                  }`}
                >
                  <FormattedMessage text={msg.text} isUser={msg.sender === 'user'} />

                  {/* Payment Data Copy Quick Actions */}
                  {msg.hasPaymentInfo && (
                    <div className="mt-2.5 pt-2.5 border-t border-[#EDE4D6] flex flex-wrap gap-1.5">
                      <button
                        onClick={() => handleCopy('1932597886070', 'bcp')}
                        type="button"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F9F6F0] hover:bg-[#EDE4D6] text-[#123329] text-[10.5px] font-bold border border-[#EDE4D6] cursor-pointer transition-colors"
                      >
                        {copiedKey === 'bcp' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#C29B62]" />}
                        <span>{copiedKey === 'bcp' ? '¡Copiado!' : 'Copiar Cta BCP'}</span>
                      </button>
                      <button
                        onClick={() => handleCopy('00219300259788607015', 'cci')}
                        type="button"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F9F6F0] hover:bg-[#EDE4D6] text-[#123329] text-[10.5px] font-bold border border-[#EDE4D6] cursor-pointer transition-colors"
                      >
                        {copiedKey === 'cci' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#C29B62]" />}
                        <span>{copiedKey === 'cci' ? '¡Copiado!' : 'Copiar CCI'}</span>
                      </button>
                    </div>
                  )}
                  
                  {/* WhatsApp Direct Action Button */}
                  {(msg.showWhatsappBtn || msg.text.toLowerCase().includes('whatsapp')) && (
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-sm transition-all hover:scale-102 select-none"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>Abrir WhatsApp (930 830 427)</span>
                    </a>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[10px] text-[#65726B]">{msg.time}</span>
                  {msg.provider && (
                    <span className="text-[9px] text-[#C29B62] font-semibold flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      {msg.provider}
                    </span>
                  )}
                </div>

                {/* Quick Options in First Bot Message */}
                {msg.hasQuickActions && (
                  <div className="mt-2 space-y-1.5 w-full max-w-[95%]">
                    <p className="text-[10.5px] font-bold text-[#123329] uppercase tracking-wider mb-1">
                      Consultas sugeridas:
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {quickOptions.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(opt.query)}
                          type="button"
                          className="text-left text-xs px-3 py-2 rounded-xl bg-white hover:bg-[#EDE4D6]/60 border border-[#EDE4D6] text-[#18221D] font-semibold flex items-center justify-between transition-all hover:border-[#C29B62] group cursor-pointer shadow-2xs"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight className="h-3.5 w-3.5 text-[#C29B62] transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#EDE4D6] max-w-[100px] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#123329] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#123329] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#123329] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] text-[#65726B] font-semibold ml-1">IA</span>
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
            className="p-3 bg-white border-t border-[#EDE4D6] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Pregunta por agujas, envíos o pagos..."
              className="flex-1 bg-[#F9F6F0] border border-[#EDE4D6] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#18221D] placeholder-[#65726B] focus:outline-none focus:border-[#123329] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              aria-label="Enviar mensaje"
              className="w-10 h-10 rounded-xl bg-[#123329] hover:bg-[#1B4538] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-xs cursor-pointer flex-shrink-0"
            >
              <Send className="h-4 w-4 text-[#C29B62]" />
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ESTADO: MENÚ FLOTANTE DESPLEGADO */}
      {/* ========================================================================= */}
      {viewState === 'menu' && (
        <div className="mb-3 flex flex-col gap-2.5 items-end animate-in fade-in slide-in-from-bottom-4 duration-200 select-none">
          
          {/* Card 1: Asistente Clínico IA */}
          <button
            onClick={() => setViewState('chat')}
            type="button"
            className="flex items-center gap-3.5 p-3 pr-5 bg-white hover:bg-[#F9F6F0] rounded-2xl border border-[#EDE4D6] shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.03] group text-left max-w-xs cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-[#123329] text-[#EDE4D6] flex items-center justify-center shadow-md flex-shrink-0 group-hover:bg-[#1B4538] transition-colors">
              <Bot className="h-6 w-6 text-[#C29B62]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-[#18221D]">Asistente IA</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#C29B62] text-[#123329] text-[9px] font-bold">24/7</span>
              </div>
              <span className="text-[11px] text-[#65726B] font-medium leading-tight">
                Precios, medidas y asesoría instantánea
              </span>
            </div>
          </button>

          {/* Card 2: WhatsApp Oficial */}
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setViewState('closed')}
            className="flex items-center gap-3.5 p-3 pr-5 bg-white hover:bg-[#F9F6F0] rounded-2xl border border-[#EDE4D6] shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.03] group text-left max-w-xs cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-[#18221D]">WhatsApp Oficial</span>
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              </div>
              <span className="text-[11px] text-[#65726B] font-medium leading-tight">
                930 830 427 (Ventas y Pedidos)
              </span>
            </div>
          </a>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. ESTADO: BOTÓN FLOTANTE FAB CERRADO */}
      {/* ========================================================================= */}
      <div className="relative flex items-center gap-2 group">
        
        {/* Tooltip flotante sutil al pasar el cursor */}
        {viewState === 'closed' && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#EDE4D6] shadow-md text-xs font-bold text-[#123329] opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0 pointer-events-none select-none">
            <span>Asistencia IA & WhatsApp</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C29B62]" />
          </div>
        )}

        <div className="relative">
          {/* Subtle Pulse Ring */}
          {viewState === 'closed' && (
            <span className="absolute inset-0 rounded-full bg-[#123329]/20 animate-ping duration-1000 pointer-events-none" />
          )}

          <button
            onClick={() => setViewState(viewState === 'closed' ? 'menu' : 'closed')}
            aria-label={viewState === 'closed' ? 'Abrir menú de asistencia y WhatsApp' : 'Cerrar menú'}
            type="button"
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-108 active:scale-95 focus:outline-none border border-[#EDE4D6] cursor-pointer relative ${
              viewState === 'closed'
                ? 'bg-[#123329] hover:bg-[#1B4538] shadow-[#123329]/25 hover:shadow-2xl'
                : 'bg-[#1B4538] hover:bg-[#123329] shadow-black/30 rotate-90'
            }`}
          >
            {viewState === 'closed' ? (
              <div className="relative flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-[#C29B62] text-[#123329] border-2 border-[#123329] flex items-center justify-center shadow-xs">
                  <Sparkles className="w-2.5 h-2.5" />
                </span>
              </div>
            ) : (
              <X className="h-5 w-5 text-[#EDE4D6]" />
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
