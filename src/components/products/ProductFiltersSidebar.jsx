import React, { useState } from 'react';
import { ChevronDown, Star, RotateCcw, X, SlidersHorizontal, Check } from 'lucide-react';

export default function ProductFiltersSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  productTypes,
  selectedProductTypes,
  onToggleProductType,
  priceBounds,
  currentPriceRange,
  onChangePriceRange,
  ratings,
  selectedRatings,
  onToggleRating,
  promos,
  selectedPromos,
  onTogglePromo,
  availability,
  selectedAvailability,
  onToggleAvailability,
  onResetFilters,
  hasActiveFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) {
  // Collapsible section state
  const [openSections, setOpenSections] = useState({
    categories: true,
    types: true,
    price: true,
    rating: true,
    promos: true,
    availability: true
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  return (
    <div className={`bg-white rounded-2xl border border-[#EDE4D6] p-5 shadow-xs ${isMobileDrawer ? 'border-none p-0' : ''}`}>
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-[#EDE4D6]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#123329]" />
          <h2 className="text-base font-bold text-[#18221D]">Filtrar productos</h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-[#2C7A62] hover:text-[#123329] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Limpiar filtros</span>
          </button>
        )}
      </div>

      <div className="divide-y divide-[#EDE4D6]/70">
        {/* 1. CATEGORÍAS */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('categories')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18221D] hover:text-[#123329] transition-colors py-1"
          >
            <span>Categorías</span>
            <ChevronDown
              className={`w-4 h-4 text-[#65726B] transition-transform duration-200 ${
                openSections.categories ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.categories && (
            <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat.name);
                return (
                  <label
                    key={cat.name}
                    className="flex items-center justify-between text-xs text-[#46534C] hover:text-[#123329] cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#123329] border-[#123329] text-white'
                            : 'border-[#C2D1C9] bg-white group-hover:border-[#123329]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleCategory(cat.name)}
                        className="sr-only"
                      />
                      <span className={isSelected ? 'font-bold text-[#123329]' : ''}>{cat.name}</span>
                    </div>
                    <span className="text-[11px] text-[#8C9690] font-medium">({cat.count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. TIPO DE PRODUCTO */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('types')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18221D] hover:text-[#123329] transition-colors py-1"
          >
            <span>Tipo de producto</span>
            <ChevronDown
              className={`w-4 h-4 text-[#65726B] transition-transform duration-200 ${
                openSections.types ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.types && (
            <div className="mt-3 space-y-2.5">
              {productTypes.map((type) => {
                const isSelected = selectedProductTypes.includes(type.id);
                return (
                  <label
                    key={type.id}
                    className="flex items-center justify-between text-xs text-[#46534C] hover:text-[#123329] cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#123329] border-[#123329] text-white'
                            : 'border-[#C2D1C9] bg-white group-hover:border-[#123329]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleProductType(type.id)}
                        className="sr-only"
                      />
                      <span className={isSelected ? 'font-bold text-[#123329]' : ''}>{type.label}</span>
                    </div>
                    <span className="text-[11px] text-[#8C9690] font-medium">({type.count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. PRECIO */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18221D] hover:text-[#123329] transition-colors py-1"
          >
            <span>Precio</span>
            <ChevronDown
              className={`w-4 h-4 text-[#65726B] transition-transform duration-200 ${
                openSections.price ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.price && (
            <div className="mt-3 space-y-3">
              <div className="text-xs font-semibold text-[#18221D] flex items-center justify-between">
                <span>S/ {currentPriceRange[0]}</span>
                <span className="text-[#8C9690]">—</span>
                <span>S/ {currentPriceRange[1]}</span>
              </div>

              {/* Slider controls */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  value={currentPriceRange[1]}
                  onChange={(e) => onChangePriceRange([currentPriceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#123329] h-1.5 bg-[#EDE4D6] rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#8C9690]">
                <span>Min: S/ {priceBounds.min}</span>
                <span>Max: S/ {priceBounds.max}</span>
              </div>
            </div>
          )}
        </div>

        {/* 4. VALORACIÓN */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('rating')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18221D] hover:text-[#123329] transition-colors py-1"
          >
            <span>Valoración</span>
            <ChevronDown
              className={`w-4 h-4 text-[#65726B] transition-transform duration-200 ${
                openSections.rating ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.rating && (
            <div className="mt-3 space-y-2.5">
              {ratings.map((r) => {
                const isSelected = selectedRatings.includes(r.stars);
                return (
                  <label
                    key={r.stars}
                    className="flex items-center justify-between text-xs text-[#46534C] hover:text-[#123329] cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#123329] border-[#123329] text-white'
                            : 'border-[#C2D1C9] bg-white group-hover:border-[#123329]'
                        }`}
                      >
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
                            className={`w-3.5 h-3.5 ${
                              i < r.stars ? 'fill-current' : 'text-[#E2D9CC]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#65726B]">({r.stars} {r.stars === 1 ? 'estrella' : 'estrellas'})</span>
                    </div>
                    <span className="text-[11px] text-[#8C9690] font-medium">({r.count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. PROMOCIONES */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('promos')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18221D] hover:text-[#123329] transition-colors py-1"
          >
            <span>Promociones</span>
            <ChevronDown
              className={`w-4 h-4 text-[#65726B] transition-transform duration-200 ${
                openSections.promos ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.promos && (
            <div className="mt-3 space-y-2.5">
              {promos.map((p) => {
                const isSelected = selectedPromos.includes(p.id);
                return (
                  <label
                    key={p.id}
                    className="flex items-center justify-between text-xs text-[#46534C] hover:text-[#123329] cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#123329] border-[#123329] text-white'
                            : 'border-[#C2D1C9] bg-white group-hover:border-[#123329]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onTogglePromo(p.id)}
                        className="sr-only"
                      />
                      <span className={isSelected ? 'font-bold text-[#123329]' : ''}>{p.label}</span>
                    </div>
                    <span className="text-[11px] text-[#8C9690] font-medium">({p.count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. DISPONIBILIDAD */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('availability')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#18221D] hover:text-[#123329] transition-colors py-1"
          >
            <span>Disponibilidad</span>
            <ChevronDown
              className={`w-4 h-4 text-[#65726B] transition-transform duration-200 ${
                openSections.availability ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.availability && (
            <div className="mt-3 space-y-2.5">
              {availability.map((item) => {
                const isSelected = selectedAvailability.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex items-center justify-between text-xs text-[#46534C] hover:text-[#123329] cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#123329] border-[#123329] text-white'
                            : 'border-[#C2D1C9] bg-white group-hover:border-[#123329]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleAvailability(item.id)}
                        className="sr-only"
                      />
                      <span className={isSelected ? 'font-bold text-[#123329]' : ''}>{item.label}</span>
                    </div>
                    <span className="text-[11px] text-[#8C9690] font-medium">({item.count})</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
