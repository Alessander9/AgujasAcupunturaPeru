import React from 'react';
import { AMAZONIK_PRODUCTS } from '../data/amazonikData';
import { Sparkles, ShieldCheck, Leaf, Heart, ShoppingBag, Phone, CheckCircle2, Star } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

export default function AmazonikPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA] py-8 sm:py-12">
      <SEOHead 
        title="Aceites Amazoni-k 100% Puros y Terapéuticos | Agujas Acupuntura Perú"
        description="Aceites esenciales y resinas medicinales de la Amazonía peruana: Copaiba, Sangre de Grado, Aguaje, Ungurahui y Eucalipto. Grado clínico para masoterapia y reflexología."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION DE ACEITES AMAZONI-K */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#16332B] via-[#23483C] to-[#122b24] text-white p-6 sm:p-10 lg:p-14 mb-12 shadow-2xl border border-[#A47C52]/30">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16332B] border border-[#A47C52]/50 text-[#E6D3BC] text-xs font-bold uppercase tracking-wider">
              <Leaf className="h-4 w-4 text-[#A47C52]" />
              Línea Exclusiva 100% Pura & Silvestre
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Aceites Esenciales & Terapéuticos <span className="text-[#E6D3BC]">Amazoni-k</span>
            </h1>
            
            <p className="text-sm sm:text-base text-[#E6D3BC]/90 leading-relaxed max-w-2xl">
              Extractos botánicos puros cosechados de manera sostenible en la Amazonía peruana. Formulados con grado clínico para masoterapia, digitopresión, reflexología y aromaterapia.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-semibold text-[#E6D3BC]">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="block font-black text-white text-sm">100% Puros</span>
                <span>Sin diluciones</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="block font-black text-white text-sm">Grado Clínico</span>
                <span>Uso terapéutico</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="block font-black text-white text-sm">Cosecha Ética</span>
                <span>Selva peruana</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <span className="block font-black text-white text-sm">Garantía</span>
                <span>Agujas Perú</span>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202520]">
              Catálogo de Esencias & Resinas Puras
            </h2>
            <p className="text-xs sm:text-sm text-[#687067] mt-2">
              Cada aceite cuenta con ficha técnica, indicación clínica y dosificación para aplicación profesional en consultorio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AMAZONIK_PRODUCTS.map((product) => {
              const whatsappUrl = `https://wa.me/51930830427?text=${encodeURIComponent(
                `Hola, deseo comprar el producto: ${product.name} (Precio: ${product.price}, Volumen: ${product.volume})`
              )}`;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#E6D3BC] shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="p-6">
                    {/* Top Image + Badge */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F7F2EA] mb-5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#23483C] text-[#F7F2EA] text-[11px] font-bold shadow-md">
                        {product.badge}
                      </span>
                      <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-[#16332B]/85 text-white text-xs font-bold">
                        {product.volume}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-black text-[#202520] tracking-tight">
                          {product.name}
                        </h3>
                        <p className="text-xs font-bold text-[#A47C52] uppercase tracking-wider mt-0.5">
                          {product.subtitle}
                        </p>
                      </div>
                      <div className="flex items-center text-[#A47C52] flex-shrink-0">
                        <Star className="h-4 w-4 fill-[#A47C52]" />
                        <span className="text-xs font-bold ml-1 text-[#202520]">5.0</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#687067] leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#F7F2EA] border border-[#E6D3BC]/60 mb-5">
                      <p className="text-[11px] font-bold text-[#23483C] uppercase tracking-wider">Beneficios Clínicos:</p>
                      {product.benefits.map((b, idx) => (
                        <p key={idx} className="text-xs text-[#202520] flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#3F7D5B] flex-shrink-0" />
                          <span>{b}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Bottom */}
                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#E6D3BC]/60">
                      <div>
                        <span className="text-xs text-[#687067] block">Precio por unidad:</span>
                        <span className="text-2xl font-black text-[#23483C]">{product.price}</span>
                      </div>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#23483C] hover:bg-[#16332B] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Comprar por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
