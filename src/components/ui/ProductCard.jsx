import React, { useState } from 'react';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Eye,
  Star,
  ShieldCheck,
  Leaf,
  Target,
  Sparkles,
  Flame,
  CheckCircle2,
  ImageIcon,
  X,
  Send,
  Truck,
  Shield,
  CreditCard,
  Check
} from 'lucide-react';

export default function ProductCard({ product, className = "" }) {
  if (!product) return null;

  // Normalize images array
  const images = product.images && product.images.length > 0 
    ? product.images 
    : (product.imagenes && product.imagenes.length > 0
        ? product.imagenes
        : (product.image ? [product.image] : ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80']));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('desc'); // 'desc' | 'specs' | 'shipping'

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const decreaseQty = (e) => {
    e?.stopPropagation();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQty = (e) => {
    e?.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  // Fallback defaults
  const title = product.title || product.nombre || "Agujas de Acupuntura";
  const brand = product.brand || product.marca || "Agujas Acupuntura Perú";
  const category = product.category || product.categoria || "Insumos Clínicos";
  const hasPrice = product.precio !== null && product.precio !== undefined && product.precio > 0 && !product.sinPrecio;
  const price = hasPrice ? (product.price || product.precioTexto || "S/ 35.00") : null;
  const originalPrice = hasPrice ? (product.originalPrice || product.precioOriginal || "") : "";
  const discount = hasPrice ? (product.discount || product.descuento || "") : "";
  const sku = product.sku || "PROD-001";
  const rating = product.rating || 5;
  const reviewsCount = product.reviewsCount || 24;
  const inStock = product.inStock !== false && product.enStock !== false;
  const badge = product.badge || "Más Vendido";
  const description = product.description || product.descripcionCompleta || product.descripcionResumen || "";
  const summary = product.descripcionResumen || description;
  const highlights = product.highlights || [];
  const blocks = product.descripcionBloques || [];

  const rawFeatures = product.features && product.features.length > 0
    ? product.features
    : [
        { label: "Grado Clínico", sub: "Certificado", icon: ShieldCheck },
        { label: "Acero Quirúrgico", sub: "Inoxidable", icon: Leaf },
        { label: "Alta Precisión", sub: "Uso profesional", icon: Target },
        { label: "Envío Inmediato", sub: "Todo el Perú", icon: Sparkles }
      ];

  const currentImage = images[currentIndex] || images[0];
  const currentImageUrl = typeof currentImage === 'string' ? currentImage : (currentImage.url || currentImage);

  const whatsappMessage = encodeURIComponent(
    hasPrice 
      ? `Hola, deseo comprar ${quantity} unidad(es) de: ${title} (Precio: ${price}, SKU: ${sku}, Categoría: ${category}). ¿Tienen disponibilidad para envío inmediato?`
      : `Hola, deseo consultar la lista completa y precios de su catálogo: ${title} (SKU: ${sku}, Categoría: ${category}).`
  );
  const whatsappUrl = `https://wa.me/51930830427?text=${whatsappMessage}`;

  const openModal = (e) => {
    e?.stopPropagation();
    setModalImageIndex(currentIndex);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      <article
        className={`group relative bg-white rounded-3xl border border-[#E6D3BC]/80 shadow-md hover:shadow-2xl hover:shadow-[#23483C]/10 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 ${className}`}
      >
        {/* TOP MEDIA AREA */}
        <div className="p-3.5 sm:p-4 pb-0">
          <div
            onClick={openModal}
            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F7F2EA] cursor-pointer select-none"
          >
            <img
              src={currentImageUrl}
              alt={title}
              className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${product.enStock === false ? 'grayscale contrast-75 opacity-75' : ''}`}
              loading="lazy"
            />

            {/* Gradient bottom overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top-Left Floating Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
              {product.enStock === false ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D84A38] text-white text-[10px] font-extrabold shadow-md tracking-wider uppercase">
                  <span>Agotado</span>
                </span>
              ) : (
                badge && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#23483C] text-white text-[10px] font-extrabold shadow-md tracking-wider uppercase">
                    <Flame className="h-3 w-3 fill-[#A47C52] text-[#A47C52]" />
                    <span>{badge}</span>
                  </span>
                )
              )}
              {discount && product.enStock !== false && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#B56F55] text-white text-[10px] font-bold shadow-sm">
                  {discount}
                </span>
              )}
            </div>

            {/* Top-Right Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              aria-label="Guardar producto"
              type="button"
              className={`absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs text-[#202520] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isFavorite ? 'scale-110 shadow-lg' : 'hover:scale-110 active:scale-90'
              }`}
            >
              <Heart
                className={`h-4 w-4 transition-all duration-300 ${
                  isFavorite ? 'fill-[#B56F55] text-[#B56F55] scale-110' : 'text-[#687067]'
                }`}
              />
            </button>

            {/* Carousel Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Foto anterior"
                  type="button"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#202520] shadow-md opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-[#23483C] hover:text-white transition-all active:scale-90 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={nextImage}
                  aria-label="Siguiente foto"
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#202520] shadow-md opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-[#23483C] hover:text-white transition-all active:scale-90 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Counter Pill */}
                <div className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                  <ImageIcon className="h-3 w-3" />
                  <span>{currentIndex + 1}/{images.length}</span>
                </div>
              </>
            )}

            {/* Quick View Hover Pill */}
            <div className="absolute inset-x-0 bottom-2.5 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16332B]/90 backdrop-blur-md text-white text-xs font-bold shadow-lg">
                <Eye className="h-3.5 w-3.5 text-[#A47C52] animate-pulse" />
                <span>Vista Rápida</span>
              </span>
            </div>
          </div>
        </div>

        {/* CARD BODY */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Category & SKU Header */}
            <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px]">
              <span className="font-bold text-[#A47C52] uppercase tracking-wider truncate">
                {category}
              </span>
              <span className="text-[#687067] font-mono text-[10px] flex-shrink-0">
                SKU: {sku}
              </span>
            </div>

            {/* Title */}
            <h3
              onClick={openModal}
              title={title}
              className="text-base sm:text-[17px] font-extrabold text-[#202520] leading-snug line-clamp-2 mb-2 group-hover:text-[#23483C] transition-colors cursor-pointer"
            >
              {title}
            </h3>

            {/* Rating Stars & Brand */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1 text-[#E08F2A]">
                <div className="flex">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#E08F2A] text-[#E08F2A]" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#687067]">
                  ({reviewsCount})
                </span>
              </div>

              <span className="text-[11px] font-bold text-[#687067] uppercase tracking-wider">
                {brand}
              </span>
            </div>

            {/* Summary Text */}
            <p className="text-xs text-[#687067] leading-relaxed line-clamp-2 mb-4">
              {summary}
            </p>

            {/* 4 Feature Micro Badges */}
            <div className="grid grid-cols-4 gap-1 py-2 px-1 border-t border-b border-[#E6D3BC]/60 mb-4 bg-[#F7F2EA]/40 rounded-xl">
              {rawFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center text-center px-0.5 ${
                    idx < 3 ? 'border-r border-[#E6D3BC]/50' : ''
                  }`}
                >
                  <span className="text-[9.5px] font-bold text-[#202520] leading-tight line-clamp-1">
                    {feat.label}
                  </span>
                  <span className="text-[8.5px] text-[#687067] leading-tight line-clamp-1">
                    {feat.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM PRICE & ACTION BAR */}
          <div>
            {/* Price & Stock Row */}
            <div className="flex items-baseline justify-between gap-2 mb-3.5">
              {hasPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#16332B] tracking-tight">
                    {price}
                  </span>
                  {originalPrice && (
                    <span className="text-xs line-through font-semibold text-[#687067]/70">
                      {originalPrice}
                    </span>
                  )}
                </div>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#23483C] bg-[#E8F3EE] px-3 py-1 rounded-full border border-[#23483C]/20">
                  Línea de productos
                </span>
              )}

              {product.enStock !== false ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#23483C]">
                  <span className="w-2 h-2 rounded-full bg-[#3F7D5B] animate-pulse" />
                  En stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D84A38]">
                  <span className="w-2 h-2 rounded-full bg-[#D84A38]" />
                  Agotado
                </span>
              )}
            </div>

            {/* CTA Buttons Row */}
            <div className="flex items-center gap-2">
              {hasPrice && (
                <div className="flex items-center justify-between border border-[#E6D3BC] rounded-xl bg-[#F7F2EA] h-11 px-1.5 w-20 flex-shrink-0">
                  <button
                    onClick={decreaseQty}
                    type="button"
                    aria-label="Restar unidad"
                    className="w-6 h-6 rounded-lg bg-white border border-[#E6D3BC]/80 text-[#202520] font-bold text-xs flex items-center justify-center hover:bg-[#E6D3BC] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-bold text-xs text-[#202520] select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQty}
                    type="button"
                    aria-label="Sumar unidad"
                    className="w-6 h-6 rounded-lg bg-white border border-[#E6D3BC]/80 text-[#202520] font-bold text-xs flex items-center justify-center hover:bg-[#E6D3BC] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Direct WhatsApp CTA Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-3 rounded-xl bg-[#23483C] hover:bg-[#16332B] text-white font-bold text-xs sm:text-[13px] shadow-md shadow-[#23483C]/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {hasPrice ? <ShoppingCart className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{hasPrice ? 'Pedir' : 'Consultar catálogo'}</span>
              </a>

              {/* Quick View Button */}
              <button
                onClick={openModal}
                type="button"
                aria-label="Ver detalles del producto"
                className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-[#F7F2EA] hover:bg-[#E6D3BC] text-[#23483C] border border-[#E6D3BC] transition-all cursor-pointer flex-shrink-0"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* QUICK VIEW FULL MODAL POPUP */}
      {isDetailModalOpen && (
        <div
          onClick={() => setIsDetailModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-[#E6D3BC] max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsDetailModalOpen(false)}
              aria-label="Cerrar ventana"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F7F2EA] hover:bg-[#E6D3BC] text-[#202520] flex items-center justify-center transition-colors cursor-pointer z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
              <span className="px-2.5 py-0.5 rounded-full bg-[#23483C] text-white text-[10px] font-extrabold uppercase tracking-wider">
                {category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F7F2EA] border border-[#E6D3BC] text-[#8E5B37] text-[10px] font-bold">
                {brand}
              </span>
              <span className="text-xs text-[#687067] font-mono">
                SKU: {sku}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#202520] tracking-tight mb-3">
              {title}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5 text-xs text-[#E08F2A]">
              <div className="flex">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#E08F2A]" />
                ))}
              </div>
              <span className="text-[#687067] font-semibold">
                ({reviewsCount} opiniones clínicas verificadas)
              </span>
            </div>

            {/* Gallery in Modal */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
              <div className="sm:col-span-3 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F7F2EA] border border-[#E6D3BC]/60">
                <img
                  src={images[modalImageIndex] || currentImageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setModalImageIndex(idx)}
                    className={`relative w-16 h-14 sm:w-full sm:h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      modalImageIndex === idx
                        ? 'border-[#23483C] shadow-md scale-105'
                        : 'border-[#E6D3BC] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-[#E6D3BC] mb-4 gap-2">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-2 text-xs sm:text-sm font-bold transition-colors relative cursor-pointer ${
                  activeTab === 'desc'
                    ? 'text-[#23483C] border-b-2 border-[#23483C]'
                    : 'text-[#687067] hover:text-[#202520]'
                }`}
              >
                Descripción y Uso
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 text-xs sm:text-sm font-bold transition-colors relative cursor-pointer ${
                  activeTab === 'specs'
                    ? 'text-[#23483C] border-b-2 border-[#23483C]'
                    : 'text-[#687067] hover:text-[#202520]'
                }`}
              >
                Puntos Clave
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2 text-xs sm:text-sm font-bold transition-colors relative cursor-pointer ${
                  activeTab === 'shipping'
                    ? 'text-[#23483C] border-b-2 border-[#23483C]'
                    : 'text-[#687067] hover:text-[#202520]'
                }`}
              >
                Envíos y Garantía
              </button>
            </div>

            {/* Tab Content */}
            <div className="text-xs sm:text-sm text-[#687067] leading-relaxed mb-6 max-h-48 overflow-y-auto pr-1">
              {activeTab === 'desc' && (
                <div className="space-y-3">
                  <p>{description || summary}</p>
                  {blocks.length > 1 && (
                    <div className="space-y-2 pt-2">
                      {blocks.slice(1).map((b, i) => (
                        <p key={i} className="text-xs text-[#202520] bg-[#F7F2EA]/60 p-2.5 rounded-xl">
                          {b}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2.5">
                  {highlights.length > 0 ? (
                    <ul className="space-y-2">
                      {highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-[#3F7D5B] flex-shrink-0 mt-0.5" />
                          <span className="text-[#202520] font-medium">{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-[#F7F2EA] rounded-xl border border-[#E6D3BC]/60">
                        <strong className="text-[#202520] block">Categoría:</strong>
                        <span>{category}</span>
                      </div>
                      <div className="p-3 bg-[#F7F2EA] rounded-xl border border-[#E6D3BC]/60">
                        <strong className="text-[#202520] block">Disponibilidad:</strong>
                        <span>Stock permanente para Lima y Regiones</span>
                      </div>
                      <div className="p-3 bg-[#F7F2EA] rounded-xl border border-[#E6D3BC]/60">
                        <strong className="text-[#202520] block">Material:</strong>
                        <span>Grado Médico / Quirúrgico Certificado</span>
                      </div>
                      <div className="p-3 bg-[#F7F2EA] rounded-xl border border-[#E6D3BC]/60">
                        <strong className="text-[#202520] block">Uso:</strong>
                        <span>Clínico, profesional y docente</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 p-3 bg-[#F7F2EA] rounded-xl border border-[#E6D3BC]/60">
                    <Truck className="h-4 w-4 text-[#A47C52] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#202520] block">Envíos a todo el Perú:</strong>
                      <span className="text-xs">Despacho el mismo día a Lima y envíos por Olva / Shalom a provincias.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 bg-[#F7F2EA] rounded-xl border border-[#E6D3BC]/60">
                    <ShieldCheck className="h-4 w-4 text-[#3F7D5B] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#202520] block">Garantía de Satisfacción:</strong>
                      <span className="text-xs">Insumos 100% esterilizados y precintados bajo estándares sanitarios.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 bg-[#F7F2EA] rounded-xl border border-[#E6D3BC]/60">
                    <CreditCard className="h-4 w-4 text-[#B56F55] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#202520] block">Medios de Pago Seguros:</strong>
                      <span className="text-xs">Yape: 939 371 250 · Transferencia BCP Soles.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Sticky Checkout Bar */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#E6D3BC]">
              <div>
                <span className="text-xs text-[#687067] block">Precio Total:</span>
                <span className="text-2xl sm:text-3xl font-black text-[#16332B]">{price}</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-[#E6D3BC] rounded-xl bg-[#F7F2EA] h-11 px-2 w-24">
                  <button
                    onClick={decreaseQty}
                    type="button"
                    className="w-7 h-7 rounded-lg bg-white border border-[#E6D3BC] font-bold text-sm flex items-center justify-center hover:bg-[#E6D3BC]"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-[#202520]">{quantity}</span>
                  <button
                    onClick={increaseQty}
                    type="button"
                    className="w-7 h-7 rounded-lg bg-white border border-[#E6D3BC] font-bold text-sm flex items-center justify-center hover:bg-[#E6D3BC]"
                  >
                    +
                  </button>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 h-11 rounded-xl bg-[#23483C] hover:bg-[#16332B] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#23483C]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Send className="h-4 w-4 text-[#A47C52]" />
                  <span>Comprar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
