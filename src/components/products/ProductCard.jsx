import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CLOUDINARY_PRESETS } from '../../lib/cloudinary';

const WHATSAPP_NUMBER = '51930830427';

function buildWhatsAppUrl(productName, price) {
  const msg = `Hola! Me interesa comprar: *${productName}* por *${price}*. ¿Tienen disponibilidad?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// WhatsApp icon SVG inline
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.845L.057 23.57a.5.5 0 0 0 .614.635l5.9-1.548A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.523-5.188-1.431l-.372-.22-3.857 1.013 1.03-3.757-.242-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

export default function ProductCard({ product, viewMode = 'grid' }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.enStock === false;
  const inWishlist = isWishlisted(product.id);
  const rawImageUrl = product.imagen || (product.imagenes && product.imagenes[0]) || '/LOGO.png';
  const imageUrl = imageError ? rawImageUrl : CLOUDINARY_PRESETS.cardGrid(rawImageUrl);
  const hasPrice = product.precio !== null && product.precio !== undefined && product.precio > 0 && !product.sinPrecio;
  const numericPrice = hasPrice
    ? (typeof product.precio === 'number' 
        ? product.precio 
        : parseFloat(String(product.precio).replace(/[^0-9.]/g, '')) || 0)
    : null;

  const formattedPrice = hasPrice ? `S/ ${numericPrice.toFixed(2)}` : null;
  const originalPrice = (hasPrice && product.precioOriginal) 
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
    if (isOutOfStock) return 'bg-[#D84A38] text-white';
    if (!product.badge && !product.descuento) return null;
    const b = (product.badge || '').toLowerCase();
    if (b.includes('agotad')) return 'bg-[#D84A38] text-white';
    if (b.includes('vendido') || b.includes('bestseller')) return 'bg-[#123329] text-white';
    if (b.includes('nuevo')) return 'bg-[#1E5142] text-white';
    if (b.includes('profesional') || b.includes('premium')) return 'bg-[#123329] text-white';
    if (product.descuento && hasPrice) return 'bg-[#E5534B] text-white';
    return 'bg-[#123329] text-white';
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock || !hasPrice) return;
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
          {isOutOfStock ? (
            <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#D84A38] text-white shadow-xs">
              Agotado
            </span>
          ) : (
            (((hasPrice && product.descuento) || product.badge)) && (
              <span className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${badgeColorClass()}`}>
                {(hasPrice && product.descuento) || product.badge}
              </span>
            )
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
            className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'grayscale contrast-75 opacity-75' : ''}`}
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
              {hasPrice ? (
                <>
                  <span className="text-xl font-bold text-[#D84A38]">
                    {formattedPrice}
                  </span>
                  {originalPrice && (
                    <span className="text-xs text-[#8C9690] line-through">
                      {originalPrice}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xs font-bold text-[#2C7A62] bg-[#EBF5F1] px-2.5 py-1 rounded-full border border-[#2C7A62]/20">
                  Consultar catálogo
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
              <a
                href={
                  isOutOfStock
                    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola! Deseo consultar si volverá a haber stock de: *${product.nombre}*.`)}`
                    : !hasPrice
                      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola! Deseo consultar la lista de productos y precios de: *${product.nombre}*.`)}`
                      : buildWhatsAppUrl(product.nombre, formattedPrice)
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                  isOutOfStock ? 'bg-[#46534C] hover:bg-[#323D37]' : !hasPrice ? 'bg-[#123329] hover:bg-[#1B4538]' : 'bg-[#25D366] hover:bg-[#1ebe5d]'
                }`}
                title={isOutOfStock ? "Consultar por WhatsApp" : !hasPrice ? "Consultar catálogo por WhatsApp" : "Comprar por WhatsApp"}
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                {isOutOfStock ? 'Consultar' : !hasPrice ? 'Consultar' : 'Comprar'}
              </a>
              <button
                type="button"
                onClick={!hasPrice ? handleOpenDetail : handleAddToCart}
                disabled={isOutOfStock}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-xs ${
                  isOutOfStock
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isAdded
                      ? 'bg-[#1F6B4F] text-white scale-110 shadow-md ring-2 ring-[#2C7A62]/40 cursor-pointer'
                      : !hasPrice
                        ? 'bg-[#F9F6F0] text-[#123329] hover:bg-[#EDE4D6] border border-[#E2D9CC] cursor-pointer'
                        : 'bg-[#123329] text-white hover:bg-[#1B4538] hover:scale-105 active:scale-95 cursor-pointer'
                }`}
                title={isOutOfStock ? "Producto agotado" : !hasPrice ? "Ver detalles de línea" : isAdded ? "¡Agregado!" : "Agregar al carrito"}
              >
                {isAdded ? (
                  <Check className="w-4 h-4 text-white stroke-[3] animate-in zoom-in-75" />
                ) : !hasPrice ? (
                  <Eye className="w-4 h-4 text-[#123329]" />
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
    <article className="group bg-white rounded-2xl border border-[#EDE4D6] p-2.5 min-[380px]:p-3 sm:p-3.5 flex flex-col justify-between hover:shadow-xl hover:border-[#123329]/30 transition-all duration-300 relative">
      <div>
        {/* IMAGE CONTAINER */}
        <div 
          onClick={handleOpenDetail}
          className="relative aspect-square w-full rounded-xl bg-[#F9F6F0] p-3 flex items-center justify-center overflow-hidden cursor-pointer select-none"
        >
          {/* Top-Left Badge */}
          {isOutOfStock ? (
            <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#D84A38] text-white shadow-xs">
              Agotado
            </span>
          ) : (
            (hasPrice ? (product.descuento || product.badge) : product.badge) && (
              <span className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs ${badgeColorClass()}`}>
                {hasPrice ? (product.descuento || product.badge) : product.badge}
              </span>
            )
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
            className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-108 ${isOutOfStock ? 'grayscale contrast-75 opacity-75' : ''}`}
            loading="lazy"
            decoding="async"
          />

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="px-3 py-1 bg-[#18221D]/85 backdrop-blur-xs text-white text-[11px] font-black tracking-widest uppercase rounded-full border border-white/20 shadow-md">
                Agotado
              </span>
            </div>
          )}
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
          <div className="flex items-baseline justify-between gap-1 mt-1.5 min-h-[1.5rem]">
            {hasPrice ? (
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
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#2C7A62] bg-[#EBF5F1] px-2 py-0.5 rounded-md border border-[#2C7A62]/20">
                Línea de productos
              </span>
            )}
            {sku && (
              <span className="text-[8.5px] font-mono font-bold text-[#4A6FA5] bg-[#EBF0FA] border border-[#C5D3EE] px-1.5 py-0.5 rounded shrink-0 hidden sm:block">
                {sku}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="flex flex-col gap-2 mt-3.5 pt-2 border-t border-[#F0EAE1]">
        {/* Comprar / Consultar WhatsApp — full width */}
        <a
          href={
            isOutOfStock
              ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola! Deseo consultar si volverá a haber stock de: *${product.nombre}*.`)}`
              : !hasPrice
                ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola! Deseo consultar la lista y precios de su catálogo: *${product.nombre}*.`)}`
                : buildWhatsAppUrl(product.nombre, formattedPrice)
          }
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`w-full h-9 sm:h-9.5 flex items-center justify-center gap-1.5 px-2 rounded-xl text-white text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] shadow-xs ${
            isOutOfStock
              ? 'bg-[#46534C] hover:bg-[#323D37]'
              : !hasPrice
                ? 'bg-[#123329] hover:bg-[#1B4538]'
                : 'bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#18a854]'
          }`}
        >
          <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="hidden sm:inline">
            {isOutOfStock ? 'Consultar stock WhatsApp' : !hasPrice ? 'Consultar catálogo WhatsApp' : 'Comprar por WhatsApp'}
          </span>
          <span className="hidden min-[350px]:inline sm:hidden">
            {isOutOfStock ? 'Consultar stock' : !hasPrice ? 'Consultar catálogo' : 'Pedir por WhatsApp'}
          </span>
          <span className="min-[350px]:hidden">
            {isOutOfStock ? 'Consultar' : !hasPrice ? 'Catálogo' : 'Pedir WhatsApp'}
          </span>
        </a>
        {/* Ver detalle + Carrito */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenDetail}
            className="flex-1 py-1.5 sm:py-2 px-2.5 rounded-lg border border-[#E2D9CC] bg-white text-[11px] sm:text-xs font-bold text-[#18221D] hover:bg-[#F9F6F0] hover:border-[#123329] transition-colors text-center cursor-pointer"
          >
            Ver detalle
          </button>
          {!hasPrice ? (
            <button
              type="button"
              onClick={handleOpenDetail}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center border border-[#123329]/20 bg-[#F9F6F0] text-[#123329] hover:bg-[#123329] hover:text-white transition-all duration-200 shadow-xs shrink-0 cursor-pointer"
              title="Ver detalle del catálogo"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              aria-label={isOutOfStock ? "Producto agotado" : "Agregar al carrito"}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-300 shadow-xs shrink-0 ${
                isOutOfStock
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : isAdded
                    ? 'bg-[#1F6B4F] text-white scale-110 shadow-md ring-2 ring-[#2C7A62]/40 cursor-pointer'
                    : 'bg-[#123329] text-white hover:bg-[#1B4538] hover:scale-105 active:scale-95 cursor-pointer'
              }`}
              title={isOutOfStock ? "Producto agotado" : isAdded ? "¡Agregado al carrito!" : "Agregar al carrito"}
            >
              {isAdded ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[3] animate-in zoom-in-75 duration-150" />
              ) : (
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EDE4D6]" />
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
