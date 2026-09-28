import React, { useState } from 'react';
import { faqs } from '../../data/faqsData';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 md:py-24 bg-[#E6D3BC]/40 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F2EA] border border-[#E6D3BC] text-[#23483C] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-base text-[#A47C52]">help</span>
            Resolvemos tus Dudas
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#202520] tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="mt-3 text-[#687067] text-base">
            Todo lo que necesitas saber sobre nuestros insumos, certificaciones y envíos a todo el Perú.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E6D3BC]/80 overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-[#202520] text-base md:text-lg focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-[#23483C] text-2xl transform transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#A47C52]' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-1 text-[#687067] text-sm md:text-base leading-relaxed border-t border-[#E6D3BC]/40">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-6 rounded-2xl bg-[#F7F2EA] border border-[#E6D3BC] text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-left">
            <h4 className="font-bold text-[#202520] text-base">
              ¿Tienes otra pregunta puntual?
            </h4>
            <p className="text-[#687067] text-sm">
              Nuestro equipo de asesoría técnica está disponible para responderte al instante.
            </p>
          </div>
          <a
            href="https://wa.me/51940176461?text=Hola%2C%20tengo%20una%20consulta%20espec%C3%ADfica%20que%20no%20encontr%C3%A9%20en%20las%20preguntas%20frecuentes"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#23483C] hover:bg-[#16332B] text-[#F7F2EA] font-bold text-sm transition-all whitespace-nowrap shadow-md shadow-[#23483C]/15"
          >
            Chatear por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
