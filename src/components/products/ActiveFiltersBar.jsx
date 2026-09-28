import React from 'react';
import { X, RotateCcw } from 'lucide-react';

export default function ActiveFiltersBar({ activeChips, onRemoveChip, onResetAll }) {
  if (!activeChips || activeChips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 pb-2">
      {activeChips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123329] text-white text-xs font-semibold shadow-xs animate-in fade-in duration-200"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => onRemoveChip(chip)}
            className="w-3.5 h-3.5 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            aria-label={`Eliminar filtro ${chip.label}`}
          >
            <X className="w-2.5 h-2.5 text-[#EDE4D6]" />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onResetAll}
        className="text-xs font-bold text-[#D84A38] hover:text-[#B53828] hover:underline px-2 py-1 transition-colors flex items-center gap-1 cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Limpiar filtros</span>
      </button>
    </div>
  );
}
