import React from 'react';
import { X, SlidersHorizontal, Check, Star, Flame, Sparkles, Package, RotateCcw } from 'lucide-react';

export default function MoreFiltersDrawer({
  isOpen,
  onClose,
  isMobileFull = false,
  // Main filters (used if isMobileFull is true)
  categories = [],
  selectedCategories = [],
  onToggleCategory,
  productTypes = [],
  selectedProductTypes = [],
  onToggleProductType,
  brands = [],
  selectedBrands = [],
  onToggleBrand,
  priceBounds = { min: 0, max: 350 },
  currentPriceRange = [0, 350],
  onChangePriceRange,
  // Secondary filters
  ratings = [],
  selectedRatings = [],
  onToggleRating,
  promos = [],
  selectedPromos = [],
  onTogglePromo,
  availability = [],
  selectedAvailability = [],
  onToggleAvailability,
  onResetFilters,
  totalFilteredCount = 0
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative ml-auto w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EDE4D6] flex items-center justify-between bg-[#F9F6F0]">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-[#123329]" />
            <div>
              <h3 className="font-bold text-[#18221D] text-sm sm:text-base">
                {isMobileFull ? 'Filtros del Catálogo' : 'Más Filtros Avanzados'}
              </h3>
              <p className="text-[11px] text-[#65726B]">Personaliza tu búsqueda de insumos</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#EDE4D6] flex items-center justify-center text-[#65726B] hover:text-[#18221D] hover:bg-[#EDE4D6] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body - Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar divide-y divide-[#EDE4D6]/70">
          
          {/* MOBILE ONLY: CATEGORIES */}
          {isMobileFull && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123329]">Categorías</h4>
              <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
                {categories.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.name);
                  return (
                    <label
                      key={cat.name}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#123329]/10 text-[#123329] font-bold' : 'text-[#46534C] hover:bg-[#F9F6F0]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-[#123329] border-[#123329] text-white' : 'border-[#C2D1C9] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleCategory(cat.name)}
                          className="sr-only"
                        />
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[11px] text-[#8C9690]">({cat.count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* MOBILE ONLY: TIPO DE PRODUCTO */}
          {isMobileFull && (
            <div className="pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123329]">Tipo de Producto</h4>
              <div className="space-y-1.5">
                {productTypes.map((type) => {
                  const isSelected = selectedProductTypes.includes(type.id);
                  return (
                    <label
                      key={type.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#123329]/10 text-[#123329] font-bold' : 'text-[#46534C] hover:bg-[#F9F6F0]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-[#123329] border-[#123329] text-white' : 'border-[#C2D1C9] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleProductType(type.id)}
                          className="sr-only"
                        />
                        <span>{type.label}</span>
                      </div>
                      <span className="text-[11px] text-[#8C9690]">({type.count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* MOBILE ONLY: MARCAS */}
          {isMobileFull && (
            <div className="pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123329]">Marcas</h4>
              <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
                {brands.map((b) => {
                  const isSelected = selectedBrands.includes(b.name);
                  return (
                    <label
                      key={b.name}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#123329]/10 text-[#123329] font-bold' : 'text-[#46534C] hover:bg-[#F9F6F0]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-[#123329] border-[#123329] text-white' : 'border-[#C2D1C9] bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleBrand(b.name)}
                          className="sr-only"
                        />
                        <span>{b.name}</span>
                      </div>
                      <span className="text-[11px] text-[#8C9690]">({b.count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* MOBILE ONLY: PRECIO */}
          {isMobileFull && (
            <div className="pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123329]">Rango de Precio</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#123329] bg-[#F9F6F0] p-2.5 rounded-xl border border-[#EDE4D6]">
                  <span>S/ {currentPriceRange[0]}</span>
                  <span className="text-[#8C9690] font-normal">—</span>
                  <span>S/ {currentPriceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={currentPriceRange[1]}
                  onChange={(e) => onChangePriceRange([currentPriceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#123329] h-2 bg-[#EDE4D6] rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* 1. PROMOCIONES Y OFERTAS */}
          <div className={`${isMobileFull ? 'pt-5' : ''} space-y-3`}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123329]">Promociones y Ofertas</h4>
            <div className="space-y-1.5">
              {promos.map((p) => {
                const isSelected = selectedPromos.includes(p.id);
                return (
                  <label
                    key={p.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#123329]/10 text-[#123329] font-bold' : 'text-[#46534C] hover:bg-[#F9F6F0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-[#123329] border-[#123329] text-white' : 'border-[#C2D1C9] bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onTogglePromo(p.id)}
                        className="sr-only"
                      />
                      <span>{p.label}</span>
                    </div>
                    <span className="text-[11px] text-[#8C9690]">({p.count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. VALORACIÓN (ESTRELLAS) */}
          <div className="pt-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123329]">Valoración de Clientes</h4>
            <div className="space-y-1.5">
              {ratings.map((r) => {
                const isSelected = selectedRatings.includes(r.stars);
                return (
                  <label
                    key={r.stars}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#123329]/10 text-[#123329] font-bold' : 'text-[#46534C] hover:bg-[#F9F6F0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-[#123329] border-[#123329] text-white' : 'border-[#C2D1C9] bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleRating(r.stars)}
                        className="sr-only"
                      />
                      <div className="flex text-[#E5A83B] gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < r.stars ? 'fill-current' : 'text-[#E2D9CC]'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#65726B]">({r.stars} {r.stars === 1 ? 'estrella' : 'estrellas'})</span>
                    </div>
                    <span className="text-[11px] text-[#8C9690]">({r.count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 3. DISPONIBILIDAD */}
          <div className="pt-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123329]">Disponibilidad</h4>
            <div className="space-y-1.5">
              {availability.map((item) => {
                const isSelected = selectedAvailability.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#123329]/10 text-[#123329] font-bold' : 'text-[#46534C] hover:bg-[#F9F6F0]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-[#123329] border-[#123329] text-white' : 'border-[#C2D1C9] bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleAvailability(item.id)}
                        className="sr-only"
                      />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[11px] text-[#8C9690]">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-5 border-t border-[#EDE4D6] bg-[#F9F6F0] flex items-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex-1 py-2.5 rounded-xl border border-[#E2D9CC] text-xs font-bold text-[#18221D] bg-white hover:bg-[#EDE4D6] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#65726B]" />
            <span>Limpiar</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#123329] hover:bg-[#1C4E3F] text-white text-xs font-bold shadow-md transition-colors cursor-pointer text-center"
          >
            Ver {totalFilteredCount} productos
          </button>
        </div>

      </div>
    </div>
  );
}
