import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS_CATALOG } from '../../data/productsData';

const WHATSAPP_NUMBER = '51930830427';

function buildWhatsAppUrl(productName, price) {
  const msg = `Hola! Me interesa comprar: *${productName}* por *S/ ${price}*. ¿Tienen disponibilidad?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.845L.057 23.57a.5.5 0 0 0 .614.635l5.9-1.548A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.67-.523-5.188-1.431l-.372-.22-3.857 1.013 1.03-3.757-.242-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

// Helper: parse price string safely
const parsePrice = (val) => {
  if (typeof val === 'number') return val;
  if (!val) return null;
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''));
  return isNaN(n) ? null : n;
};

// Pick top 10 products from Acupuntura y Moxibustión + Auriculoterapia
const RAW_FEATURED = PRODUCTS_CATALOG.filter(
  (p) => p.categoria === 'Acupuntura y Moxibustión' || p.categoria === 'Auriculoterapia'
).slice(0, 10);

export const FEATURED_ITEMS = RAW_FEATURED.map((p) => ({
  id: p.id,
  slug: p.slug,
  nombre: p.nombre,
  categoria: p.categoria,
  badge: p.badge || (p.descuento ? 'OFERTA' : null),
  badgeType: p.descuento ? 'discount'
    : (p.badge || '').toLowerCase().includes('premium') ? 'pro'
    : (p.badge || '').toLowerCase().includes('nuevo') ? 'new'
    : 'best',
  imagen: (p.imagenes && p.imagenes[0]) || p.imagen || '/LOGO.png',
  rating: p.rating || 5,
  reviewsCount: p.reviewsCount || 24,
  precio: parsePrice(p.precio) || 0,
  precioOriginal: parsePrice(p.precioOriginal),
  descripcion: p.descripcionResumen || '',
}));

export default function FeaturedProducts() {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();
  const containerRef = useRef(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const GAP = 16; // 16px gap between cards

  // Dynamically calculate visible cards based on screen size
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    setContainerWidth(width);

    if (width < 500) {
      setVisibleCount(1);
    } else if (width < 768) {
      setVisibleCount(2);
    } else if (width < 1024) {
      setVisibleCount(3);
    } else if (width < 1280) {
      setVisibleCount(4);
    } else {
      setVisibleCount(5);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const maxIndex = Math.max(0, FEATURED_ITEMS.length - visibleCount);

  // Auto-play every 4 seconds
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      handleNext();
    } else if (distance < -40) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case 'discount':
        return 'bg-[#D84A38] text-white';
      case 'best':
        return 'bg-[#123329] text-white';
      case 'new':
        return 'bg-[#2C7A62] text-white';
      case 'pro':
        return 'bg-[#123329] border border-[#C29B62] text-[#EDE4D6]';
      default:
        return 'bg-[#123329] text-white';
    }
  };

  // Calculate exact card width in pixels
  const cardWidth = containerWidth > 0 
    ? (containerWidth - (visibleCount - 1) * GAP) / visibleCount 
    : 240;

  const translateX = currentIndex * (cardWidth + GAP);

  return (
    <section className="bg-[#F9F6F0] py-10 sm:py-14 border-b border-[#EDE4D6] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123329]">
              Más elegidos por terapeutas
            </h2>
            <p className="text-sm sm:text-base text-[#65726B] mt-1">
              Productos esenciales de acupuntura y auriculoterapia para tu práctica diaria
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Arrow Nav Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Producto anterior"
                type="button"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#EDE4D6] border border-[#EDE4D6] text-[#123329] flex items-center justify-center shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Siguiente producto"
                type="button"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#EDE4D6] border border-[#EDE4D6] text-[#123329] flex items-center justify-center shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/productos"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#123329] hover:text-[#C29B62] transition group"
            >
              <span>Ver todos los productos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Inner Sliding Track with Hardware Accelerated Pixel Transform */}
          <div
            className="flex will-change-transform"
            style={{
              gap: `${GAP}px`,
              transform: `translate3d(-${translateX}px, 0, 0)`,
              transition: 'transform 550ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {FEATURED_ITEMS.map((product) => {
              const inWishlist = isWishlisted(product.id);

              return (
                <div
                  key={product.id}
                  style={{ width: `${cardWidth}px`, flexShrink: 0 }}
                  className="h-full"
                >
                  <div className="bg-white rounded-2xl border border-[#EDE4D6] p-3.5 flex flex-col justify-between h-full product-card-transition relative group hover:shadow-lg hover:border-[#C29B62]/40 transition-all duration-300">
                    
                    {/* Top Badge & Wishlist */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      {product.badge ? (
                        <span className={`text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full ${getBadgeClass(product.badgeType)}`}>
                          {product.badge}
                        </span>
                      ) : <span />}

                      <button
                        onClick={() => toggleWishlist(product.id, product.nombre)}
                        aria-label="Favorito"
                        type="button"
                        className="w-7 h-7 rounded-full bg-[#F9F6F0] hover:bg-white text-[#65726B] hover:text-[#D84A38] border border-[#EDE4D6] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-[#D84A38] text-[#D84A38]' : ''}`} />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div 
                      className="aspect-square w-full rounded-xl bg-[#FAF7F2] flex items-center justify-center p-3 mb-3 cursor-pointer overflow-hidden relative"
                      onClick={() => setQuickViewProduct(product)}
                    >
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
                        loading="eager"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src = '/LOGO.png';
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 mb-3 flex-1 flex flex-col">
                      <div className="flex items-center gap-1">
                        <div className="flex text-[#C29B62]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] font-semibold text-[#65726B]">({product.reviewsCount})</span>
                      </div>

                      <h3 
                        onClick={() => setQuickViewProduct(product)}
                        className="text-xs font-bold text-[#18221D] hover:text-[#123329] leading-snug line-clamp-2 cursor-pointer"
                      >
                        {product.nombre}
                      </h3>

                      {/* Pricing in Soles */}
                      <div className="mt-auto pt-1 flex items-baseline gap-1.5">
                        <span className="text-sm font-black text-[#123329]">
                          S/ {product.precio.toFixed(2)}
                        </span>
                        {product.precioOriginal && (
                          <span className="text-[11px] text-[#65726B] line-through">
                            S/ {product.precioOriginal.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="flex flex-col gap-1.5 pt-1">
                      {/* Comprar WhatsApp — full width */}
                      <a
                        href={buildWhatsAppUrl(product.nombre, product.precio.toFixed(2))}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#18a854] text-white text-[11px] font-bold tracking-wide transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] shadow-sm"
                      >
                        <WhatsAppIcon className="w-3 h-3 shrink-0" />
                        Comprar por WhatsApp
                      </a>
                      {/* Ver detalle + Carrito */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          type="button"
                          className="flex-1 py-1.5 px-2 rounded-lg border border-[#EDE4D6] hover:border-[#123329] text-[11px] font-bold text-[#18221D] hover:bg-[#F9F6F0] transition-colors text-center cursor-pointer"
                        >
                          Ver detalle
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          aria-label="Agregar al carrito"
                          type="button"
                          className="w-8 h-8 rounded-lg bg-[#123329] hover:bg-[#1B4538] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-[#EDE4D6]" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Pagination Indicators */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {[...Array(maxIndex + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir al grupo ${idx + 1}`}
                type="button"
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 bg-[#123329]'
                    : 'w-1.5 bg-[#EDE4D6] hover:bg-[#C29B62]'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
