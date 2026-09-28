import React from 'react';
import { Truck, ShieldCheck, Sparkles, Zap } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="hidden sm:block bg-[#0A1E18] text-[#EDE4D6] text-[11px] sm:text-xs font-semibold py-2 px-4 border-b border-[#C29B62]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-6 whitespace-nowrap sm:justify-center">
        <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
          <Truck className="w-3.5 h-3.5 text-[#C29B62]" />
          <span>Envíos a todo el Perú (Lima y Provincias)</span>
        </div>
        <span className="text-[#C29B62]/40 hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C29B62]" />
          <span>Pagos con Yape y Transferencia BCP Soles</span>
        </div>
        <span className="text-[#C29B62]/40 hidden md:inline">•</span>
        <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
          <Sparkles className="w-3.5 h-3.5 text-[#C29B62]" />
          <span>155+ Insumos y Equipos para Profesionales</span>
        </div>
        <span className="text-[#C29B62]/40 hidden lg:inline">•</span>
        <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
          <Zap className="w-3.5 h-3.5 text-[#C29B62]" />
          <span>Atención y Asesoría WhatsApp: 930 830 427</span>
        </div>
      </div>
    </div>
  );
}
