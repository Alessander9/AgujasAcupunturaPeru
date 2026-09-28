import React, { useState, useRef, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  RotateCcw, 
  Check, 
  X, 
  Star, 
  Sparkles, 
  Flame, 
  Package, 
  Tag, 
  Layers, 
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function ProductHorizontalFiltersBar({
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
  hasActiveFilters,
  onOpenMoreFilters,
  moreFiltersCount = 0
}) {
  // Active dropdown popover: null | 'category' | 'type' | 'brand' | 'price'
  const [activeDropdown, setActiveDropdown] = useState(null);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const isPriceModified = currentPriceRange[1] < priceBounds.max || currentPriceRange[0] > priceBounds.min;

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-2xl border border-[#EDE4D6] shadow-xs p-2 sm:p-3 mb-4 sm:mb-6 relative z-20"
    >
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap pb-1 sm:pb-0">
        
        {/* LEFT: FILTER TITLE & DROPDOWNS */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 sm:shrink sm:flex-wrap">
          
          {/* Label Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 text-[#123329] font-bold text-xs bg-[#F9F6F0] rounded-xl border border-[#EDE4D6]/70 shrink-0 select-none">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C29B62]" />
            <span>Filtrar productos</span>
          </div>

          {/* 1. CATEGORÍA DROPDOWN */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => toggleDropdown('category')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border select-none whitespace-nowrap ${
                selectedCategories.length > 0
                  ? 'bg-[#123329] text-white border-[#123329] shadow-xs font-bold'
                  : activeDropdown === 'category'
                  ? 'bg-[#F9F6F0] text-[#123329] border-[#123329] ring-1 ring-[#123329]'
                  : 'bg-white text-[#2C3E35] border-[#E2D9CC] hover:border-[#123329] hover:bg-[#F9F6F0]'
              }`}
            >
              <span>Categoría</span>
              {selectedCategories.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C29B62] text-[#123329] text-[10px] font-black flex items-center justify-center">
                  {selectedCategories.length}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeDropdown === 'category' ? 'rotate-180' : ''
              } ${selectedCategories.length > 0 ? 'text-white' : 'text-[#65726B]'}`} />
            </button>

            {/* Category Popover */}
            {activeDropdown === 'category' && (
              <div className="absolute top-full left-0 sm:left-auto mt-2 w-[calc(100vw-32px)] max-w-xs sm:w-72 bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE4D6]/60 mb-2">
                  <span className="text-[11px] font-bold text-[#18221D] uppercase tracking-wider">Categorías</span>
                  {selectedCategories.length > 0 && (
                    <button
                      type="button"
                      onClick={() => selectedCategories.forEach(c => onToggleCategory(c))}
                      className="text-[10.5px] text-[#C8102E] font-bold hover:underline cursor-pointer"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
                <div className="max-h-60 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
                  {categories.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.name);
                    return (
                      <label
                        key={cat.name}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer select-none transition-colors ${
                          isSelected ? 'bg-[#123329]/10 text-[#123329] font-bold' : 'text-[#46534C] hover:bg-[#F9F6F0] hover:text-[#123329]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-[#123329] border-[#123329] text-white' : 'border-[#C2D1C9] bg-white'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onToggleCategory(cat.name)}
                            className="sr-only"
                          />
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[10.5px] text-[#8C9690]">({cat.count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 2. TIPO DE PRODUCTO DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('type')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border ${
                selectedProductTypes.length > 0
                  ? 'bg-[#123329] text-white border-[#123329] shadow-xs font-bold'
                  : activeDropdown === 'type'
                  ? 'bg-[#F9F6F0] text-[#123329] border-[#123329] ring-1 ring-[#123329]'
                  : 'bg-white text-[#2C3E35] border-[#E2D9CC] hover:border-[#123329] hover:bg-[#F9F6F0]'
              }`}
            >
              <span>Tipo de producto</span>
              {selectedProductTypes.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C29B62] text-[#123329] text-[10px] font-black flex items-center justify-center">
                  {selectedProductTypes.length}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeDropdown === 'type' ? 'rotate-180' : ''
              } ${selectedProductTypes.length > 0 ? 'text-white' : 'text-[#65726B]'}`} />
            </button>

            {/* Product Type Popover */}
            {activeDropdown === 'type' && (
              <div className="absolute top-full left-0 mt-2 w-[calc(100vw-32px)] max-w-xs sm:w-64 bg-white rounded-2xl shadow-xl border border-[#EDE4D6] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE4D6]/60 mb-2">
                  <span className="text-[11px] font-bold text-[#18221D] uppercase tracking-wider">Tipo de Producto</span>
                  {selectedProductTypes.length > 0 && (
                    <button
                      type="button"
                      onClick={() => selectedProductTypes.forEach(t => onToggleProductType(t))}
                      className="text-[10.5px] text-[#C8102E] font-bold hover:underline cursor-pointer"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {productTypes.map((type) => {
                    const isSelected = selectedProductTypes.includes(type.id);
                    return (
                      <label
                        key={type.id}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer select-none transition-colors ${
                          isSelected ? 'bg-[#123329]/10 text-[#123329] font-bold' : 'text-[#46534C] hover:bg-[#F9F6F0] hover:text-[#123329]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-[#123329] border-[#123329] text-white' : 'border-[#C2D1C9] bg-white'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onToggleProductType(type.id)}
                            className="sr-only"
                          />
                          <span>{type.label}</span>
                        </div>
                        <span className="text-[10.5px] text-[#8C9690]">({type.count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3. MARCA DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('brand')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border ${
                selectedBrands.length > 0
                  ? 'bg-[#123329] text-white border-[#123329] shadow-xs font-bold'
                  : activeDropdown === 'brand'
                  ? 'bg-[#F9F6F0] text-[#123329] border-[#123329] ring-1 ring-[#123329]'
                  : 'bg-white text-[#2C3E35] border-[#E2D9CC] hover:border-[#123329] hover:bg-[#F9F6F0]'
              }`}
            >
              <span>Marca</span>
              {selectedBrands.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C29B62] text-[#123329] text-[10px] font-black flex items-center justify-center">
                  {selectedBrands.length}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeDropdown === 'brand' ? 'rotate-180' : ''
              } ${selectedBrands.length > 0 ? 'text-white' : 'text-[#65726B]'}`} />
            </button>

            {/* Brand Popover */}
            {activeDropdown === 'brand' && (
              <div className="absolute top-full left-0 mt-2 w-[calc(100vw-32px)] max-w-xs sm:w-64 bg-white rounded-2xl shadow-xl border border-[#EDE4D6] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE4D6]/60 mb-2">
                  <span className="text-[11px] font-bold text-[#18221D] uppercase tracking-wider">Marcas Clínicas</span>
                  {selectedBrands.length > 0 && (
                    <button
                      type="button"
                      onClick={() => selectedBrands.forEach(b => onToggleBrand(b))}
                      className="text-[10.5px] text-[#C8102E] font-bold hover:underline cursor-pointer"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
                <div className="max-h-56 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
                  {brands.map((b) => {
                    const isSelected = selectedBrands.includes(b.name);
                    return (
                      <label
                        key={b.name}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer select-none transition-colors ${
                          isSelected ? 'bg-[#123329]/10 text-[#123329] font-bold' : 'text-[#46534C] hover:bg-[#F9F6F0] hover:text-[#123329]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                            isSelected ? 'bg-[#123329] border-[#123329] text-white' : 'border-[#C2D1C9] bg-white'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onToggleBrand(b.name)}
                            className="sr-only"
                          />
                          <span>{b.name}</span>
                        </div>
                        <span className="text-[10.5px] text-[#8C9690]">({b.count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 4. RANGO DE PRECIO DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('price')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border ${
                isPriceModified
                  ? 'bg-[#123329] text-white border-[#123329] shadow-xs font-bold'
                  : activeDropdown === 'price'
                  ? 'bg-[#F9F6F0] text-[#123329] border-[#123329] ring-1 ring-[#123329]'
                  : 'bg-white text-[#2C3E35] border-[#E2D9CC] hover:border-[#123329] hover:bg-[#F9F6F0]'
              }`}
            >
              <span>{isPriceModified ? `Hasta S/ ${currentPriceRange[1]}` : 'Rango de precio'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeDropdown === 'price' ? 'rotate-180' : ''
              } ${isPriceModified ? 'text-white' : 'text-[#65726B]'}`} />
            </button>

            {/* Price Popover */}
            {activeDropdown === 'price' && (
              <div className="absolute top-full left-0 sm:left-auto right-0 sm:right-auto mt-2 w-[calc(100vw-32px)] max-w-xs sm:w-72 bg-white rounded-2xl shadow-xl border border-[#EDE4D6] p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE4D6]/60 mb-3">
                  <span className="text-[11px] font-bold text-[#18221D] uppercase tracking-wider">Precio en Soles</span>
                  {isPriceModified && (
                    <button
                      type="button"
                      onClick={() => onChangePriceRange([priceBounds.min, priceBounds.max])}
                      className="text-[10.5px] text-[#C8102E] font-bold hover:underline cursor-pointer"
                    >
                      Restablecer
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-[#123329] bg-[#F9F6F0] p-2 rounded-xl border border-[#EDE4D6]">
                    <span>S/ {currentPriceRange[0]}</span>
                    <span className="text-[#8C9690] font-normal">hasta</span>
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

                  <div className="flex items-center justify-between text-[11px] text-[#8C9690]">
                    <span>Mín: S/ {priceBounds.min}</span>
                    <span>Máx: S/ {priceBounds.max}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. MÁS FILTROS (DRAWER / PANEL BUTTON) */}
          <button
            type="button"
            onClick={onOpenMoreFilters}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer border ${
              moreFiltersCount > 0
                ? 'bg-[#123329] text-white border-[#123329] shadow-xs font-bold'
                : 'bg-[#F9F6F0] text-[#123329] border-[#EDE4D6] hover:bg-[#EDE4D6] hover:border-[#C29B62]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#C29B62]" />
            <span>Más filtros</span>
            {moreFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C29B62] text-[#123329] text-[10px] font-black flex items-center justify-center">
                {moreFiltersCount}
              </span>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-[#65726B]" />
          </button>
        </div>

        {/* RIGHT: LIMPIAR FILTROS (IF ACTIVE) */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#C8102E] bg-red-50 hover:bg-red-100/80 transition-colors border border-red-200/60 cursor-pointer shrink-0 ml-auto sm:ml-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar filtros</span>
          </button>
        )}

      </div>
    </div>
  );
}
