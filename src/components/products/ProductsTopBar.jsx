import React from 'react';
import { LayoutGrid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function ProductsTopBar({
  totalProducts,
  startIndex,
  endIndex,
  sortBy,
  onChangeSort,
  viewMode,
  onChangeViewMode,
  onOpenMobileFilters,
  activeFilterCount
}) {
  const sortOptions = [
    { value: 'recommended', label: 'Recomendados' },
    { value: 'bestsellers', label: 'Más vendidos' },
    { value: 'price_asc', label: 'Precio: menor a mayor' },
    { value: 'price_desc', label: 'Precio: mayor a menor' },
    { value: 'name_asc', label: 'Nombre: A-Z' },
    { value: 'name_desc', label: 'Nombre: Z-A' },
    { value: 'newest', label: 'Novedades' },
    { value: 'rating_desc', label: 'Mejor valorados' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#EDE4D6]/70">
      {/* RESULTS COUNTER */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <p className="text-xs sm:text-sm text-[#46534C] font-semibold">
          {totalProducts === 0 ? (
            <span>No hay productos para mostrar</span>
          ) : (
            <span>
              Mostrando <strong className="text-[#123329] font-bold">{startIndex}–{endIndex}</strong> de{' '}
              <strong className="text-[#123329] font-bold">{totalProducts}</strong> productos
            </span>
          )}
        </p>

        {/* MOBILE FILTER TRIGGER BUTTON */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#123329] text-white text-xs font-bold shadow-xs cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#C29B62]" />
          <span>Filtros</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#C29B62] text-[#123329] text-[10px] font-extrabold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* SORT DROPDOWN AND VIEW MODE */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-dropdown" className="text-xs text-[#65726B] font-medium hidden md:inline whitespace-nowrap">
            Ordenar por:
          </label>
          <div className="relative inline-block">
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => onChangeSort(e.target.value)}
              className="appearance-none bg-white border border-[#E2D9CC] text-[#18221D] text-xs font-semibold rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-[#123329] focus:ring-1 focus:ring-[#123329] cursor-pointer shadow-xs"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#65726B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-white border border-[#E2D9CC] rounded-lg p-0.5 shadow-xs">
          <button
            type="button"
            onClick={() => onChangeViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-[#123329] text-white shadow-xs'
                : 'text-[#65726B] hover:text-[#18221D] hover:bg-[#F9F6F0]'
            }`}
            title="Vista Cuadrícula (4 columnas)"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onChangeViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-[#123329] text-white shadow-xs'
                : 'text-[#65726B] hover:text-[#18221D] hover:bg-[#F9F6F0]'
            }`}
            title="Vista Lista"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
