import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CLOUDINARY_PRESETS } from '../../lib/cloudinary';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const inWishlist = isWishlisted(product.id);
  const rawImageUrl = product.imagen || (product.imagenes && product.imagenes[0]) || '/LOGO.png';
  const imageUrl = imageError ? rawImageUrl : CLOUDINARY_PRESETS.cardGrid(rawImageUrl);
  const numericPrice = typeof product.precio === 'number' 
    ? product.precio 
    : parseFloat(String(product.precio).replace(/[^0-9.]/g, '')) || 0;

  const formattedPrice = `S/ ${numericPrice.toFixed(2)}`;
  const originalPrice = product.precioOriginal 
    ? (product.precioOriginal.startsWith('S/') ? product.precioOriginal : `S/ ${parseFloat(String(product.precioOriginal).replace(/[^0-9.]/g, '')).toFixed(2)}`)
    : null;

  // Brand — only show if meaningful
  const brand = product.marca && product.marca !== 'N/A' && product.marca !== 'No especificado' ? product.marca : null;

  // SKU — short display
  const sku = product.sku || null;

  // Quantity/presentation — extracted from description or nombre
  const getPresentation = () => {
    const text = `${product.nombre || ''} ${product.descripcionResumen || ''}`;
    const match = text.match(/(\d+\s*(und|uds|unidades|piezas|sobres|caja|cajas|g|gr|ml|kg))/i);
    return match ? match[0] : null;
  };
  const presentation = getPresentation();

  // Short description — 1 line
  const shortDesc = product.descripcionResumen
    ? product.descripcionResumen.replace(/[?\n\r]/g, ' ').trim()
    : null;

  const badgeColorClass = () => {
    if (!product.badge && !product.descuento) return null;
    const b = (product.badge || '').toLowerCase();
    if (b.includes('vendido') || b.includes('bestseller')) return 'bg-[#123329] text-white';
    if (b.includes('nuevo')) return 'bg-[#1E5142] text-white';
    if (b.includes('profesional') || b.includes('premium')) return 'bg-[#123329] text-white';
    if (product.descuento) return 'bg-[#E5534B] text-white';
    return 'bg-[#123329] text-white';
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdded(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleOpenDetail = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-[#EDE4D6] p-4 flex flex-col sm:flex-row gap-5 hover:shadow-lg hover:border-[#123329]/30 transition-all duration-300">
        {/* Left image container */}
        <div className="relative w-full sm:w-48 aspect-square rounded-xl bg-[#F9F6F0] p-3 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer" onClick={handleOpenDetail}>
          {/* Badge */}
          {(product.descuento || product.badge) && (
            <span className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${badgeColorClass()}`}>
              {product.descuento || product.badge}
            </span>
          )}

          {/* Wishlist */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id, product.nombre);
            }}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 shadow-xs border border-gray-100 flex items-center justify-center transition-transform hover:scale-110 ${
              inWishlist ? 'text-[#E5534B]' : 'text-[#65726B] hover:text-[#E5534B]'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          <img
            src={imageUrl}
            alt={`${product.nombre} - Insumo médico y de acupuntura en Perú`}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Right details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Category + Brand + SKU */}
            <div className="flex items-center flex-wrap gap-1.5 mb-1.5">
              <span className="text-xs font-semibold text-[#65726B]">
                {product.categoria || 'Acupuntura y Terapias'}
              </span>
              {brand && (
                <span className="text-[9.5px] font-black text-white bg-gradient-to-r from-[#C29B62] to-[#DEB87A] px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                  {brand}
                </span>
              )}
              {sku && (
                <span className="text-[9.5px] font-mono font-bold text-[#4A6FA5] bg-[#EBF0FA] border border-[#C5D3EE] px-2 py-0.5 rounded ml-auto">
                  {sku}
                </span>
              )}
            </div>
            <h3 
              onClick={handleOpenDetail}
              className="text-base sm:text-lg font-bold text-[#18221D] group-hover:text-[#123329] transition-colors cursor-pointer leading-snug mb-1"
            >
              {product.nombre}
            </h3>
            <p className="text-xs text-[#2C7A62] italic font-medium line-clamp-1 mb-2">
              {shortDesc || product.descripcionCompleta || 'Insumo terapéutico de alta calidad para uso profesional y clínico.'}
            </p>

            {/* Stars + Presentation */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#E5A83B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#8C9690] font-medium">
                  ({product.reviewsCount || 48})
                </span>
              </div>
              {presentation && (
                <span className="text-[10px] font-bold text-[#1B5E42] bg-[#D4EDE5] border border-[#A8D5C5] px-2 py-0.5 rounded-full">
                  📦 {presentation}
                </span>
              )}
            </div>
          </div>

          {/* Price and actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#F0EAE1]">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#D84A38]">
                {formattedPrice}
              </span>
              {originalPrice && (
                <span className="text-xs text-[#8C9690] line-through">
                  {originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenDetail}
                className="px-4 py-2 rounded-lg border border-[#E2D9CC] bg-white text-xs font-bold text-[#18221D] hover:bg-[#F9F6F0] hover:border-[#123329] transition-colors"
              >
                Ver detalle
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer ${
                  isAdded
                    ? 'bg-[#1F6B4F] text-white scale-110 shadow-md ring-2 ring-[#2C7A62]/40'
                    : 'bg-[#123329] text-white hover:bg-[#1B4538] hover:scale-105 active:scale-95'
                }`}
                title={isAdded ? "¡Agregado!" : "Agregar al carrito"}
              >
                {isAdded ? (
                  <Check className="w-4 h-4 text-white stroke-[3] animate-in zoom-in-75" />
                ) : (
                  <ShoppingCart className="w-4 h-4 text-[#EDE4D6]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT GRID VIEW MATCHING EXACT MOCKUP
  return (
    <article className="group bg-white rounded-2xl border border-[#EDE4D6] p-3 sm:p-3.5 flex flex-col justify-between hover:shadow-xl hover:border-[#123329]/30 transition-all duration-300 relative">
      <div>
        {/* IMAGE CONTAINER */}
        <div 
          onClick={handleOpenDetail}
          className="relative aspect-square w-full rounded-xl bg-[#F9F6F0] p-3 flex items-center justify-center overflow-hidden cursor-pointer select-none"
        >
          {/* Top-Left Badge */}
          {(product.descuento || product.badge) && (
            <span className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs ${badgeColorClass()}`}>
              {product.descuento || product.badge}
            </span>
          )}

          {/* Top-Right Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id, product.nombre);
            }}
            aria-label="Guardar en favoritos"
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/95 shadow-xs border border-gray-100 flex items-center justify-center transition-transform hover:scale-110 ${
              inWishlist ? 'text-[#E5534B]' : 'text-[#65726B] hover:text-[#E5534B]'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-[#E5534B]' : ''}`} />
          </button>

          {/* Product Image */}
          <img
            src={imageUrl}
            alt={`${product.nombre} - Insumo médico y de acupuntura en Perú`}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-108"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* DETAILS SECTION */}
        <div className="mt-3">
          {/* Category + Brand row */}
          <div className="flex items-center justify-between gap-1 min-w-0">
            <span className="text-[10.5px] sm:text-xs font-semibold text-[#65726B] truncate">
              {product.categoria || 'Acupuntura y Terapias'}
            </span>
            {brand && (
              <span className="text-[9px] font-black text-white bg-gradient-to-r from-[#C29B62] to-[#DEB87A] px-2 py-0.5 rounded-full shrink-0 truncate max-w-[64px] shadow-sm uppercase tracking-wide">
                {brand}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            onClick={handleOpenDetail}
            className="text-xs sm:text-[13px] font-bold text-[#18221D] line-clamp-2 min-h-[2.4rem] mt-1 leading-snug group-hover:text-[#123329] transition-colors cursor-pointer"
            title={product.nombre}
          >
            {product.nombre}
          </h3>

          {/* Short description — 1 line */}
          {shortDesc && (
            <p className="text-[10px] text-[#2C7A62] italic line-clamp-1 mt-0.5 leading-snug font-medium">
              {shortDesc}
            </p>
          )}

          {/* Rating + Presentation */}
          <div className="flex items-center justify-between gap-1 mt-1.5">
            <div className="flex items-center gap-1">
              <div className="flex text-[#E5A83B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-[#8C9690] font-medium">
                ({product.reviewsCount || 48})
              </span>
            </div>
            {presentation && (
              <span className="text-[9px] font-bold text-[#1B5E42] bg-[#D4EDE5] border border-[#A8D5C5] px-1.5 py-0.5 rounded-full shrink-0">
                📦 {presentation}
              </span>
            )}
          </div>

          {/* Price Row + SKU */}
          <div className="flex items-baseline justify-between gap-1 mt-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-extrabold text-[#D84A38]">
                {formattedPrice}
              </span>
              {originalPrice && (
                <span className="text-[10.5px] text-[#8C9690] line-through font-normal">
                  {originalPrice}
                </span>
              )}
            </div>
            {sku && (
              <span className="text-[8.5px] font-mono font-bold text-[#4A6FA5] bg-[#EBF0FA] border border-[#C5D3EE] px-1.5 py-0.5 rounded shrink-0 hidden sm:block">
                {sku}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-[#F0EAE1]">
        <button
          type="button"
          onClick={handleOpenDetail}
          className="flex-1 py-1.5 sm:py-2 px-2.5 rounded-lg border border-[#E2D9CC] bg-white text-[11px] sm:text-xs font-bold text-[#18221D] hover:bg-[#F9F6F0] hover:border-[#123329] transition-colors text-center cursor-pointer"
        >
          Ver detalle
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label="Agregar al carrito"
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 cursor-pointer ${
            isAdded
              ? 'bg-[#1F6B4F] text-white scale-110 shadow-md ring-2 ring-[#2C7A62]/40'
              : 'bg-[#123329] text-white hover:bg-[#1B4538] hover:scale-105 active:scale-95'
          }`}
          title={isAdded ? "¡Agregado al carrito!" : "Agregar al carrito"}
        >
          {isAdded ? (
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[3] animate-in zoom-in-75 duration-150" />
          ) : (
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EDE4D6]" />
          )}
        </button>
      </div>
    </article>
  );
}
