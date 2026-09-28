import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ onResetFilters, searchQuery }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EDE4D6] p-10 text-center flex flex-col items-center justify-center my-6 shadow-xs">
      <div className="w-16 h-16 rounded-full bg-[#F9F6F0] border border-[#EDE4D6] flex items-center justify-center text-[#123329] mb-4 shadow-inner">
        <SearchX className="w-8 h-8 text-[#65726B]" />
      </div>

      <h3 className="font-serif-title text-xl font-bold text-[#123329] mb-1">
        No encontramos productos con estos criterios
      </h3>

      <p className="text-xs sm:text-sm text-[#65726B] max-w-md mx-auto mb-6">
        {searchQuery 
          ? `No hay resultados para "${searchQuery}". Intenta verificar la ortografía o usar términos más generales.`
          : 'Prueba ajustando o limpiando los filtros seleccionados para explorar nuestro catálogo de 155 productos.'}
      </p>

      <button
        type="button"
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#123329] text-white text-xs font-bold shadow-md hover:bg-[#1B4538] transition-all cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[#C29B62]" />
        <span>Limpiar filtros y ver todos (155)</span>
      </button>
    </div>
  );
}
