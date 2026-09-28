import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS_CATALOG } from '../../data/productsData';

// Helper: parse price string like "S/ 102.00" or numeric
const parsePrice = (val) => {
  if (typeof val === 'number') return val;
  if (!val) return null;
  const n = parseFloat(String(val).replace(/[^0-9.]/g, ''));
  return isNaN(n) ? null : n;
};

// Pick top 10 products from Acupuntura y Moxibustión + Auriculoterapia using catalog data
const RAW_FEATURED = PRODUCTS_CATALOG.filter(
  (p) => p.categoria === 'Acupuntura y Moxibustión' || p.categoria === 'Auriculoterapia'
).slice(0, 10);

export const FEATURED_ITEMS = RAW_FEATURED.map((p) => ({
  id: p.id,
  slug: p.slug,
  nombre: p.nombre,
  categoria: p.categoria,
  badge: p.badge || null,
  badgeType: p.descuento ? 'discount'
    : (p.badge || '').toLowerCase().includes('premium') ? 'pro'
    : (p.badge || '').toLowerCase().includes('nuevo') ? 'new'
    : 'best',
  imagen: (p.imagenes && p.imagenes[0]) || p.imagen || '/LOGO.png',
  rating: p.rating || 5,
  reviewsCount: p.reviewsCount || 0,
  precio: parsePrice(p.precio) || 0,
  precioOriginal: parsePrice(p.precioOriginal),
  descripcion: p.descripcionResumen || '',
}));

export default function FeaturedProducts() {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();

  const totalItems = FEATURED_ITEMS.length; // 10
  const [currentIndex, setCurrentIndex] = useState(totalItems); // Start at second loop set
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Triple array to ensure infinite loop seamlessly in both directions
  const loopedItems = [...FEATURED_ITEMS, ...FEATURED_ITEMS, ...FEATURED_ITEMS];

  // Auto-advance sliding interval (smoothly shifts exactly 1 card every 3.5s)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Seamless infinite loop wrap on transition end
  const handleTransitionEnd = () => {
    if (currentIndex >= totalItems * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - totalItems);
    } else if (currentIndex < totalItems) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + totalItems);
    }
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
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
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

  const activeDotIndex = ((currentIndex % totalItems) + totalItems) % totalItems;

  return (
    <section className="bg-[#F9F6F0] py-10 sm:py-14 border-b border-[#EDE4D6] overflow-hidden select-none">
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

        {/* Automatic Sliding Track Container with EXACT 5 visible cards on desktop */}
        <div
          className="relative w-full overflow-hidden [--slider-gap:16px] [--slider-visible:1] sm:[--slider-visible:2] md:[--slider-visible:3] lg:[--slider-visible:5]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex gap-4"
            style={{
              transform: `translateX(calc(-${currentIndex} * (100% + var(--slider-gap)) / var(--slider-visible)))`,
              transition: isTransitioning ? 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }}
          >
            {/* Render 30 looped items */}
            {loopedItems.map((product, index) => {
              const inWishlist = isWishlisted(product.id);

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex-shrink-0 w-full sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-64px)/5)]"
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
                      className="aspect-square w-full rounded-xl bg-[#FAF7F2] flex items-center justify-center p-3 mb-3 cursor-pointer overflow-hidden"
                      onClick={() => setQuickViewProduct(product)}
                    >
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
                        loading="lazy"
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
                    <div className="flex items-center gap-1.5 pt-1">
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
              );
            })}
          </div>
        </div>

        {/* Dynamic Pagination Indicators (10 dots) */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {FEATURED_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(totalItems + idx);
              }}
              aria-label={`Ir al producto ${idx + 1}`}
              type="button"
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeDotIndex === idx
                  ? 'w-6 bg-[#123329]'
                  : 'w-1.5 bg-[#EDE4D6] hover:bg-[#C29B62]'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
