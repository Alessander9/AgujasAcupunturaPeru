import React, { useState } from 'react';

export default function FloatingWa() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E6D3BC] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Card Header */}
          <div className="bg-[#23483C] p-4 text-[#F7F2EA] flex items-center justify-between border-b border-[#16332B]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#16332B] text-[#E6D3BC] border border-[#A47C52]/40 flex items-center justify-center font-bold text-sm">
                  AA
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#3F7D5B] border-2 border-[#23483C]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#F7F2EA]">Agujas Acupuntura</h4>
                <p className="text-xs text-[#E6D3BC]">Asesoría profesional en línea</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#E6D3BC] hover:text-white"
              aria-label="Cerrar chat flotante"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 space-y-3 bg-[#F7F2EA]">
            <div className="bg-[#FFFFFF] p-3.5 rounded-xl rounded-tl-none text-xs text-[#202520] shadow-xs border border-[#E6D3BC]">
              ¡Hola! 👋 ¿En qué insumo o producto de acupuntura estás interesado hoy?
            </div>
          </div>

          {/* Card Actions */}
          <div className="p-3 bg-[#FFFFFF] border-t border-[#E6D3BC]/60 space-y-2">
            <a
              href="https://wa.me/51930830427?text=Hola%2C%20quisiera%20el%20cat%C3%A1logo%20completo%20de%20Insumos%20y%20Agujas"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 px-3 text-center bg-[#23483C] hover:bg-[#16332B] text-[#F7F2EA] rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              🛍️ Catálogo de Insumos y Agujas
            </a>
            <a
              href="https://wa.me/51930830427?text=Hola%2C%20deseo%20consultar%20sobre%20los%20Aceites%20Amazoni-k"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 px-3 text-center bg-[#E6D3BC] hover:bg-[#A47C52] text-[#23483C] hover:text-white rounded-xl text-xs font-bold transition-colors"
            >
              🌿 Aceites Amazoni-k
            </a>
          </div>
        </div>
      )}

      {/* Floating Button Base */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white shadow-xl shadow-black/25 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none border-2 border-white"
      >
        <i className="fab fa-whatsapp text-3xl group-hover:scale-105 transition-transform"></i>
      </button>
    </div>
  );
}
