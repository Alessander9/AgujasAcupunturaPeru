import React, { useState, useEffect } from 'react';
import {
  X, Star, Heart, ShoppingCart, Check, ShieldCheck, Truck,
  ArrowRight, MessageCircle, Package, Tag, Award, Zap,
  ChevronLeft, ChevronRight, BadgeCheck, Minus, Plus, Share2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CLOUDINARY_PRESETS } from '../../lib/cloudinary';
import { trackViewItem } from '../../lib/analytics';

function getBadgeStyle(badge = '') {
  const b = badge.toLowerCase();
  if (b.includes('vend') || b.includes('popular')) return 'bg-[#123329] text-white';
  if (b.includes('%') || b.includes('dcto') || b.includes('ofert')) return 'bg-[#D84A38] text-white';
  if (b.includes('nuevo') || b.includes('new')) return 'bg-[#2C7A62] text-white';
  if (b.includes('prem') || b.includes('pro')) return 'bg-gradient-to-r from-[#C29B62] to-[#DFC499] text-[#0A1E18]';
  if (b.includes('envio') || b.includes('gratis')) return 'bg-blue-600 text-white';
  return 'bg-[#123329] text-white';
}

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [addedAnim, setAddedAnim] = useState(false);

  // Reset state whenever product changes & track view item
  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1);
      setSelectedImg(0);
      setAddedAnim(false);
      trackViewItem(quickViewProduct);
    }
  }, [quickViewProduct?.id]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setQuickViewProduct(null); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isWishlisted(product.id);

  const price = typeof product.precio === 'number'
    ? product.precio
    : parseFloat(String(product.precio).replace(/[^0-9.]/g, '')) || 0;

  const originalPrice = product.precioOriginal
    ? (typeof product.precioOriginal === 'number'
      ? product.precioOriginal
      : parseFloat(String(product.precioOriginal).replace(/[^0-9.]/g, '')) || null)
    : null;

  const discountPct = originalPrice && originalPrice > price
    ? Math.round((1 - price / originalPrice) * 100)
    : null;

  // Images gallery
  const images = product.imagenes?.length
    ? product.imagenes
    : product.imagen
      ? [product.imagen]
      : ['/LOGO.png'];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1800);
  };

  const handleWhatsApp = () => {
    const text = `Hola, deseo consultar por: *${product.nombre}* — S/ ${price.toFixed(2)} (SKU: ${product.sku || product.id}). ¿Tienen stock disponible?`;
    window.open(`https://wa.me/51930830427?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShare = async () => {
    const shareText = `${product.nombre} — S/ ${price.toFixed(2)} | Agujas Acupuntura Perú`;
    if (navigator.share) {
      await navigator.share({ title: shareText, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(shareText + ' ' + window.location.href);
    }
  };

  const isOutOfStock = product.enStock === false;
  const rating = product.rating || 5;
  const reviews = product.reviewsCount || 48;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EDE4D6] overflow-hidden animate-in zoom-in-95 fade-in duration-250">

          {/* ── TOP HEADER BAR ── */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EDE4D6] bg-[#F9F6F0]">
            <div className="flex items-center gap-2">
              {product.badge && (
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider ${getBadgeStyle(product.badge)}`}>
                  {product.badge}
                </span>
              )}
              {discountPct && (
                <span className="text-[10px] font-black bg-[#D84A38] text-white px-2.5 py-1 rounded-full">
                  -{discountPct}%
                </span>
              )}
              {isOutOfStock && (
                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-300 px-2.5 py-1 rounded-full">
                  Sin stock
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShare}
                className="w-8 h-8 rounded-full border border-[#EDE4D6] flex items-center justify-center text-[#65726B] hover:text-[#123329] hover:bg-white transition-colors cursor-pointer"
                title="Compartir"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#EDE4D6] flex items-center justify-center text-[#65726B] hover:text-[#D84A38] hover:border-[#D84A38]/40 transition-colors cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

            {/* LEFT — Image Gallery */}
            <div className="relative bg-[#FDFBF7] border-b md:border-b-0 md:border-r border-[#EDE4D6] flex flex-col">

              {/* Main Image */}
              <div className="relative aspect-square flex items-center justify-center p-6 sm:p-8 overflow-hidden group">
                <img
                  key={selectedImg}
                  src={CLOUDINARY_PRESETS.modalDetail(images[selectedImg]) || images[selectedImg]}
                  alt={product.nombre}
                  onError={(e) => { e.target.src = images[selectedImg]; }}
                  className="w-full h-full object-contain mix-blend-multiply transition-all duration-300 group-hover:scale-105"
                />

                {/* Arrow navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImg((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-[#EDE4D6] flex items-center justify-center shadow-sm hover:bg-white transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#123329]" />
                    </button>
                    <button
                      onClick={() => setSelectedImg((prev) => (prev + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-[#EDE4D6] flex items-center justify-center shadow-sm hover:bg-white transition cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 text-[#123329]" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 px-4 pb-4 flex-wrap">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`w-12 h-12 rounded-xl border-2 overflow-hidden flex items-center justify-center bg-white transition-all cursor-pointer ${
                        selectedImg === idx
                          ? 'border-[#123329] shadow-md scale-105'
                          : 'border-[#EDE4D6] hover:border-[#C29B62]'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply p-1" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust badges bottom-left */}
              <div className="px-4 pb-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#46534C] bg-white border border-[#EDE4D6] px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-[#2C7A62]" />
                  <span>Producto garantizado</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#46534C] bg-white border border-[#EDE4D6] px-2.5 py-1 rounded-full">
                  <Truck className="w-3 h-3 text-[#2C7A62]" />
                  <span>Envío a todo el Perú</span>
                </div>
              </div>
            </div>

            {/* RIGHT — Product Info */}
            <div className="flex flex-col max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div className="p-5 sm:p-6 flex flex-col gap-4">

                {/* Brand + Category + SKU */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C29B62] block">
                      {product.categoria || 'Insumo Terapéutico'}
                    </span>
                    {product.marca && product.marca !== 'N/A' && (
                      <span className="text-[10.5px] font-bold text-[#65726B] flex items-center gap-1 mt-0.5">
                        <Award className="w-3 h-3 text-[#C29B62]" />
                        {product.marca}
                      </span>
                    )}
                  </div>
                  {product.sku && (
                    <span className="text-[9.5px] font-mono text-[#8C9690] bg-[#F9F6F0] border border-[#EDE4D6] px-2 py-0.5 rounded shrink-0">
                      SKU: {product.sku}
                    </span>
                  )}
                </div>

                {/* Product name */}
                <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-[#123329] leading-tight -mt-2">
                  {product.nombre}
                </h2>

                {/* Rating + reviews */}
                <div className="flex items-center gap-2.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-[#C29B62] text-[#C29B62]' : 'text-[#D6C9B0]'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#123329]">{rating.toFixed(1)}</span>
                  <span className="text-xs text-[#65726B]">({reviews} reseñas)</span>
                  {product.enStock !== false && (
                    <span className="ml-auto text-[10.5px] font-bold text-[#2C7A62] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C7A62] inline-block animate-pulse" />
                      En stock
                    </span>
                  )}
                </div>

                {/* Price block */}
                <div className="flex items-end gap-3 py-3 px-4 bg-gradient-to-r from-[#F9F6F0] to-white rounded-2xl border border-[#EDE4D6]">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-[#123329] leading-none">
                      S/ {price.toFixed(2)}
                    </span>
                    {originalPrice && originalPrice > price && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm text-[#8C9690] line-through">
                          S/ {originalPrice.toFixed(2)}
                        </span>
                        {discountPct && (
                          <span className="text-xs font-extrabold text-[#D84A38] bg-red-50 px-1.5 py-0.5 rounded">
                            Ahorras {discountPct}%
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="ml-auto text-right">
                    <span className="text-[10px] text-[#65726B] block">precio</span>
                    <span className="text-[10px] font-bold text-[#2C7A62]">Sin comisiones</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#46534C] leading-relaxed">
                  {product.descripcionResumen || product.descripcion
                    || 'Insumo profesional de alta gama seleccionado para prácticas clínicas, acupuntura y terapias integrales en Perú.'}
                </p>

                {/* Features grid (from data or default) */}
                {product.features && product.features.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.slice(0, 4).map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-[#F9F6F0] border border-[#EDE4D6] rounded-xl px-2.5 py-2"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#123329]/10 text-[#123329] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-bold text-[#18221D] truncate">{feat.label}</div>
                          {feat.sub && (
                            <div className="text-[9.5px] text-[#65726B] truncate">{feat.sub}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: BadgeCheck, label: 'Calidad certificada', sub: 'Uso clínico profesional' },
                      { icon: Package, label: 'Envío seguro', sub: 'Lima 24h · Provincias Shalom' },
                      { icon: Tag, label: 'Precio final', sub: 'Sin costos ocultos' },
                      { icon: Zap, label: 'Despacho rápido', sub: 'Stock disponible hoy' },
                    ].map(({ icon: Icon, label, sub }, i) => (
                      <div key={i} className="flex items-center gap-2 bg-[#F9F6F0] border border-[#EDE4D6] rounded-xl px-2.5 py-2">
                        <div className="w-6 h-6 rounded-lg bg-[#123329]/10 text-[#123329] flex items-center justify-center shrink-0">
                          <Icon className="w-3 h-3" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-bold text-[#18221D] truncate">{label}</div>
                          <div className="text-[9.5px] text-[#65726B] truncate">{sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quantity + Add to Cart */}
                <div className="space-y-2.5 pt-2 border-t border-[#EDE4D6]">
                  <div className="flex items-center gap-2.5">
                    {/* Qty stepper */}
                    <div className="flex items-center border border-[#EDE4D6] rounded-xl bg-[#F9F6F0] overflow-hidden shrink-0">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-10 flex items-center justify-center text-[#123329] hover:bg-white transition cursor-pointer"
                        aria-label="Reducir cantidad"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-[#123329] select-none">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-10 flex items-center justify-center text-[#123329] hover:bg-white transition cursor-pointer"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to cart */}
                    <button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className={`flex-1 h-10 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all duration-200 cursor-pointer ${
                        isOutOfStock
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                          : addedAnim
                            ? 'bg-[#2C7A62] text-white scale-[0.98]'
                            : 'bg-[#123329] hover:bg-[#1B4538] text-white hover:scale-[1.01]'
                      }`}
                    >
                      {addedAnim ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>¡Agregado!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 text-[#EDE4D6]" />
                          <span>{isOutOfStock ? 'Sin stock' : 'Agregar al Carrito'}</span>
                        </>
                      )}
                    </button>

                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id, product.nombre)}
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        inWishlist
                          ? 'bg-red-50 border-red-200 text-[#D84A38]'
                          : 'border-[#EDE4D6] bg-[#F9F6F0] text-[#65726B] hover:text-[#D84A38] hover:bg-red-50'
                      }`}
                      title={inWishlist ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                    >
                      <Heart className={`w-4 h-4 transition-transform ${inWishlist ? 'fill-[#D84A38] scale-110' : ''}`} />
                    </button>
                  </div>

                  {/* Subtotal display */}
                  {quantity > 1 && (
                    <div className="flex items-center justify-between text-xs text-[#65726B] px-1">
                      <span>{quantity} unidades × S/ {price.toFixed(2)}</span>
                      <span className="font-extrabold text-[#123329]">
                        Subtotal: S/ {(price * quantity).toFixed(2)}
                      </span>
                    </div>
                  )}

                  {/* WhatsApp button */}
                  <button
                    onClick={handleWhatsApp}
                    className="w-full h-10 rounded-xl border border-[#2C7A62]/40 bg-[#2C7A62]/8 hover:bg-[#2C7A62]/15 text-[#123329] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#2C7A62]" />
                    <span>Consultar por WhatsApp</span>
                    <ArrowRight className="w-3 h-3 text-[#2C7A62]" />
                  </button>
                </div>

                {/* Delivery info footer */}
                <div className="flex items-center gap-3 text-[10.5px] text-[#65726B] bg-[#F9F6F0] border border-[#EDE4D6] rounded-xl px-3 py-2.5">
                  <Truck className="w-4 h-4 text-[#C29B62] shrink-0" />
                  <div>
                    <span className="font-bold text-[#18221D] block">Entrega estimada</span>
                    <span>Lima Metropolitana 24h · Provincias 3–5 días (Shalom / Olva)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
