import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const KITS_LIST = [
  {
    id: 'kit-1',
    nombre: 'Kit de Acupuntura',
    itemsCount: '15 productos',
    precio: 199.90,
    imagen: '/img_productos/agujasAcupuntura-opt.webp',
  },
  {
    id: 'kit-2',
    nombre: 'Kit de Auriculoterapia',
    itemsCount: '12 productos',
    precio: 159.90,
    imagen: '/img_productos/NuevoKitAuriculoterapia-opt.webp',
  },
  {
    id: 'kit-3',
    nombre: 'Kit de Ventosas',
    itemsCount: '8 productos',
    precio: 169.90,
    imagen: '/img_productos/kitVentosas-opt.webp',
  },
  {
    id: 'kit-4',
    nombre: 'Kit de Moxibustión',
    itemsCount: '10 productos',
    precio: 149.90,
    imagen: '/img_productos/cajaMoxas3-opt.webp',
  },
  {
    id: 'kit-5',
    nombre: 'Kit para Estudiantes',
    itemsCount: '18 productos',
    precio: 229.90,
    imagen: '/img_productos/kitAuriculoCuaderno-opt.webp',
  },
  {
    id: 'kit-6',
    nombre: 'Kit Profesional Completo',
    itemsCount: '25 productos',
    precio: 399.90,
    imagen: '/img_productos/tekno_bio-opt.webp',
  },
];

export default function TherapyKits() {
  const { addToCart } = useShop();

  return (
    <section className="bg-[#F9F6F0] py-10 sm:py-14 border-b border-[#EDE4D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123329]">
              Kits para cada tipo de terapia
            </h2>
            <p className="text-sm sm:text-base text-[#65726B] mt-1">
              Soluciones completas para tu práctica profesional y clínica
            </p>
          </div>

          <Link
            to="/productos?filter=kits"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#123329] hover:text-[#C29B62] transition-colors group"
          >
            <span>Ver todos los kits</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        {/* 6 Kit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {KITS_LIST.map((kit) => (
            <div
              key={kit.id}
              className="bg-white rounded-2xl border border-[#EDE4D6] p-3.5 flex flex-col justify-between product-card-transition group cursor-pointer"
            >
              {/* Product Visual */}
              <div className="aspect-square w-full rounded-xl bg-[#FAF7F2] flex items-center justify-center p-3 mb-3 overflow-hidden">
                <img
                  src={kit.imagen}
                  alt={kit.nombre}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-112 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="space-y-1 mb-3">
                <h3 className="text-xs font-bold text-[#18221D] group-hover:text-[#123329] leading-snug line-clamp-1 transition-colors">
                  {kit.nombre}
                </h3>
                <p className="text-[11px] text-[#65726B]">{kit.itemsCount}</p>
                <div className="text-sm font-black text-[#123329] pt-1">
                  S/ {kit.precio.toFixed(2)}
                </div>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(kit);
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#123329] hover:bg-[#1B4538] active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-[#EDE4D6] transition-transform group-hover/btn:scale-110" />
                <span>Agregar Kit</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
