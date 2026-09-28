import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, ArrowRight, Sparkles, Flame, Package, Bookmark, Phone, ShoppingBag, Home, Video } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS_CATALOG } from '../../data/productsData';
import { CLOUDINARY_PRESETS } from '../../lib/cloudinary';

const NAV_ITEMS = [
  { label: 'Inicio', path: '/', icon: Home },
  { label: 'Tienda', path: '/productos', icon: ShoppingBag },
  { label: 'Videos', path: '/videos', icon: Video, badge: 'NUEVO' },
  { label: 'Kits', path: '/productos?type=kits', icon: Package },
  { label: 'Contacto', path: '/sobre-nosotros', icon: Phone },
];

export default function Header({ onToggleMobileMenu, onCloseMobileMenu, mobileMenuOpen }) {
  const { cartTotalCount, wishlist, setIsCartOpen, setIsWishlistOpen, searchQuery, setSearchQuery, setQuickViewProduct, cartAnimTrigger } = useShop();
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Keep local search in sync with global search query
  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  // Click outside to close live search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ultra-fast in-memory instant search (limited to max 3 items)
  const searchResults = useMemo(() => {
    const q = localSearch.toLowerCase().trim();
    if (!q || q.length < 1) return { items: [], totalCount: 0 };

    const matches = [];
    for (let i = 0; i < PRODUCTS_CATALOG.length; i++) {
      const prod = PRODUCTS_CATALOG[i];
      const title = (prod.nombre || '').toLowerCase();
      const cat = (prod.categoria || '').toLowerCase();
      const desc = (prod.descripcionResumen || prod.descripcionCompleta || '').toLowerCase();
      const brand = (prod.marca || '').toLowerCase();
      const sku = (prod.sku || '').toLowerCase();

      if (title.includes(q) || cat.includes(q) || desc.includes(q) || brand.includes(q) || sku.includes(q)) {
        matches.push(prod);
      }
    }

    return {
      items: matches.slice(0, 3), // Max 3 items
      totalCount: matches.length
    };
  }, [localSearch]);

  const handleSearchChange = (value) => {
    setLocalSearch(value);
    setIsFocused(true);

    // If already on /productos page, update main catalog query live as well
    if (location.pathname === '/productos' || location.pathname === '/productos.html') {
      setSearchQuery(value);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setIsFocused(false);
    setSearchQuery(localSearch);
    if (localSearch.trim()) {
      navigate(`/productos?search=${encodeURIComponent(localSearch.trim())}`);
    } else {
      navigate('/productos');
    }
  };

  const handleSelectProduct = (product) => {
    setIsFocused(false);
    setQuickViewProduct(product);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
    setIsFocused(false);
  };

  const isTiendaActive = location.pathname === '/productos' || location.pathname === '/productos.html';
  const isInicioActive = location.pathname === '/' || location.pathname === '/index.html';
  const isItemActive = (item) => {
    if (item.label === 'Tienda') return isTiendaActive && !location.search.includes('promo=') && !location.search.includes('type=');
    if (item.label === 'Inicio') return isInicioActive;
    if (item.label === 'Kits') return location.search.includes('type=kits');
    if (item.path !== '/' && location.pathname.startsWith(item.path.split('?')[0]) && !isTiendaActive) return true;
    return false;
  };

  return (
    <header className="bg-white border-b border-[#EDE4D6] w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-0.5 sm:py-1">
        <div className="flex items-center justify-between gap-2 lg:gap-4">
          
          {/* BRAND LOGO (Large transparent PNG) */}
          <Link to="/" className="flex items-center shrink-0 group">
            <img
              src="/agujaslogo.png"
              alt="Agujas Acupuntura Perú"
              className="h-11 sm:h-13 lg:h-16 w-auto max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] object-contain transition-transform duration-300 group-hover:scale-103"
            />
          </Link>

          {/* ── DESKTOP NAV LINKS (inline, single row) ── */}
          <nav className="hidden lg:flex items-center gap-0.5 shrink-0">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] transition-all duration-200 select-none whitespace-nowrap ${
                    active
                      ? 'bg-[#123329] text-white font-bold shadow-sm'
                      : 'text-[#2C3E35] font-semibold hover:text-[#123329] hover:bg-[#123329]/8'
                  }`}
                >
                  <item.icon className={`w-3 h-3 shrink-0 ${
                    active ? 'text-[#C29B62]' : 'text-[#65726B] group-hover:text-[#123329]'
                  }`} />
                  <span>{item.label}</span>
                  {item.badge === 'HOT' && (
                    <span className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white text-[8px] font-black px-1 py-px rounded-full uppercase tracking-wider animate-pulse">
                      HOT
                    </span>
                  )}
                  {item.badge === 'NUEVO' && (
                    <span className="bg-[#C29B62] text-white text-[8px] font-black px-1.5 py-px rounded-full uppercase tracking-wider">
                      NUEVO
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ULTRA-FAST LIVE SEARCH BAR (DESKTOP) */}
          <div ref={dropdownRef} className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-6 relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
              <input
                type="text"
                value={localSearch}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Buscar agujas, ventosas, moxas, equipos y más..."
                className="w-full bg-[#F9F6F0] border border-[#E2D9CC] text-[#18221D] placeholder-[#65726B]/70 rounded-full py-2.5 pl-4 pr-16 text-sm focus:outline-none focus:border-[#123329] focus:bg-white focus:ring-2 focus:ring-[#123329]/15 transition-all shadow-inner"
              />

              {/* Clear search icon button */}
              {localSearch && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-10 text-[#8C9690] hover:text-[#18221D] p-1 rounded-full hover:bg-gray-200/60 transition"
                  title="Borrar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Search submit button */}
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-1.5 w-8 h-8 rounded-full bg-[#123329] text-white flex items-center justify-center hover:bg-[#1B4538] transition-colors shadow-xs cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#EDE4D6]" />
              </button>
            </form>

            {/* INSTANT LIVE RESULTS DROPDOWN (MAX 3 ITEMS) */}
            {isFocused && localSearch.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchResults.totalCount === 0 ? (
                  <div className="p-4 text-center">
                    <p className="text-xs text-[#65726B]">
                      No se encontraron resultados para "<strong className="text-[#18221D]">{localSearch}</strong>"
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Header showing match count */}
                    <div className="px-4 py-2 bg-[#F9F6F0] border-b border-[#EDE4D6]/70 flex items-center justify-between text-[11px] font-bold text-[#65726B]">
                      <span className="flex items-center gap-1.5 text-[#123329]">
                        <Sparkles className="w-3 h-3 text-[#C29B62]" />
                        <span>Sugerencias rápidas (máx. 3)</span>
                      </span>
                      <span>{searchResults.totalCount} {searchResults.totalCount === 1 ? 'coincidencia' : 'coincidencias'}</span>
                    </div>

                    {/* Max 3 items list */}
                    <div className="divide-y divide-[#EDE4D6]/50">
                      {searchResults.items.map((prod) => {
                        const rawImg = prod.imagen || (prod.imagenes && prod.imagenes[0]) || '/LOGO.png';
                        const img = CLOUDINARY_PRESETS.miniThumb(rawImg);
                        const price = typeof prod.precio === 'number' ? prod.precio : parseFloat(String(prod.precio).replace(/[^0-9.]/g, '')) || 0;

                        return (
                          <div
                            key={prod.id}
                            onClick={() => handleSelectProduct(prod)}
                            className="p-3 flex items-center justify-between gap-3 hover:bg-[#F9F6F0] cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-11 h-11 rounded-lg bg-[#F9F6F0] border border-[#EDE4D6] p-1 shrink-0 overflow-hidden flex items-center justify-center">
                                <img
                                  src={img}
                                  alt={prod.nombre}
                                  onError={(e) => { e.target.src = rawImg; }}
                                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C29B62] block truncate">
                                  {prod.categoria}
                                </span>
                                <h4 className="text-xs font-bold text-[#18221D] group-hover:text-[#123329] truncate leading-tight">
                                  {prod.nombre}
                                </h4>
                                <span className="text-xs font-extrabold text-[#D84A38] mt-0.5 block">
                                  S/ {price.toFixed(2)}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="px-2.5 py-1 rounded-md bg-[#123329]/10 text-[#123329] text-[11px] font-bold group-hover:bg-[#123329] group-hover:text-white transition-colors shrink-0"
                            >
                              Ver
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom action to see all results in catalog */}
                    <div className="p-2.5 bg-[#F9F6F0] border-t border-[#EDE4D6] text-center">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full py-1.5 px-3 rounded-xl bg-[#123329] text-white text-xs font-bold hover:bg-[#1B4538] transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <span>Ver los {searchResults.totalCount} resultados en el catálogo</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C29B62]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT USER ACTIONS */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            {/* Favoritos */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[#18221D] hover:text-[#123329] hover:bg-[#F9F6F0] transition group relative cursor-pointer"
              title="Ver mis favoritos"
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-[#65726B] group-hover:text-[#E53935] transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#E53935] text-white text-[10px] font-extrabold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-in zoom-in-50 duration-200">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium hidden sm:inline">Favoritos</span>
            </button>

            {/* Carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[#18221D] hover:text-[#123329] hover:bg-[#F9F6F0] transition group relative cursor-pointer"
            >
              <div className={`relative transition-transform duration-300 ${cartAnimTrigger ? 'scale-125' : 'scale-100'}`}>
                <ShoppingCart className="w-5 h-5 text-[#123329]" />
                {cartTotalCount > 0 && (
                  <span className={`absolute -top-2 -right-3 bg-[#E53935] text-white text-[10.5px] font-black min-w-[19px] h-[19px] px-1 rounded-full flex items-center justify-center border-2 border-white shadow-md ${cartAnimTrigger ? 'animate-bounce' : 'animate-in zoom-in-75 duration-200'}`}>
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold text-[#123329] hidden sm:inline">Carrito</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-xl text-[#123329] bg-[#F9F6F0] border border-[#E2D9CC] ml-1 cursor-pointer"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE LIVE SEARCH BAR (VISIBLE ON SMALL SCREENS) */}
        <div ref={mobileDropdownRef} className="mt-3 md:hidden relative">
          <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
            <input
              type="text"
              value={localSearch}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar insumos, agujas, moxas..."
              className="w-full bg-[#F9F6F0] border border-[#E2D9CC] text-[#18221D] placeholder-[#65726B] rounded-full py-2 pl-4 pr-16 text-xs focus:outline-none focus:border-[#123329]"
            />
            {localSearch && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-9 text-[#8C9690] p-1"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 w-7 h-7 rounded-full bg-[#123329] text-white flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5 text-[#EDE4D6]" />
            </button>
          </form>

          {/* MOBILE INSTANT SEARCH DROPDOWN */}
          {isFocused && localSearch.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] overflow-hidden z-50 animate-in fade-in duration-150">
              {searchResults.totalCount === 0 ? (
                <div className="p-3 text-center text-xs text-[#65726B]">
                  Sin resultados para "{localSearch}"
                </div>
              ) : (
                <div>
                  <div className="px-3 py-1.5 bg-[#F9F6F0] border-b border-[#EDE4D6] text-[10px] font-bold text-[#65726B] flex justify-between">
                    <span>Sugerencias (máx. 3)</span>
                    <span>{searchResults.totalCount} resultados</span>
                  </div>
                  <div className="divide-y divide-[#EDE4D6]/50">
                    {searchResults.items.map((prod) => {
                      const img = prod.imagen || (prod.imagenes && prod.imagenes[0]) || 'https://static.wixstatic.com/media/3c52e9_f88f872c49404deea019412629bdde2a~mv2.png';
                      const price = typeof prod.precio === 'number' ? prod.precio : parseFloat(String(prod.precio).replace(/[^0-9.]/g, '')) || 0;
                      return (
                        <div
                          key={prod.id}
                          onClick={() => handleSelectProduct(prod)}
                          className="p-2.5 flex items-center gap-2.5 hover:bg-[#F9F6F0] cursor-pointer"
                        >
                          <img src={img} alt={prod.nombre} className="w-9 h-9 rounded-md object-contain shrink-0 bg-[#F9F6F0] border border-[#EDE4D6]" />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-[#18221D] truncate">{prod.nombre}</h4>
                            <span className="text-[11px] font-bold text-[#D84A38]">S/ {price.toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-2 bg-[#F9F6F0] border-t border-[#EDE4D6]">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full py-1.5 rounded-lg bg-[#123329] text-white text-[11px] font-bold text-center block"
                    >
                      Ver {searchResults.totalCount} resultados en el catálogo →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU ACCORDION — dentro del header para evitar doble sticky */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3 pt-1 space-y-1 border-t border-[#EDE4D6] mt-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => { onCloseMobileMenu && onCloseMobileMenu(); }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#123329] text-white font-bold shadow-xs'
                      : 'text-[#18221D] hover:bg-[#123329]/5 hover:text-[#123329]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className={`w-4 h-4 ${active ? 'text-[#C29B62]' : 'text-[#65726B]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge === 'HOT' && (
                    <span className="bg-gradient-to-r from-red-600 to-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      HOT
                    </span>
                  )}
                  {item.badge === 'NUEVO' && (
                    <span className="bg-[#C29B62] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      NUEVO
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
