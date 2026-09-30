import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    name: 'Agujas de Acupuntura',
    slug: 'Acupuntura y Moxibustión',
    image: '/img/categories/catAcupuntura-opt.webp'
  },
  {
    name: 'Auriculoterapia',
    slug: 'Auriculoterapia',
    image: '/img/categories/carAuriculoterapia-opt.webp'
  },
  {
    name: 'Ventosas',
    slug: 'Ventosa Terapia',
    image: '/img/categories/catVentosas-opt.webp'
  },
  {
    name: 'Moxibustión',
    slug: 'Acupuntura y Moxibustión',
    image: '/img/categories/catMoxas-opt.webp'
  },
  {
    name: 'Digitopresión',
    slug: 'Herramientas de Masaje',
    image: '/img/categories/catDigitopresion-opt.webp'
  },
  {
    name: 'Aromaterapia',
    slug: 'Aromaterapia',
    image: '/img/categories/catFitoterapia-opt.webp'
  },
  {
    name: 'Masaje y Bienestar',
    slug: 'Herramientas de Masaje',
    image: '/img/categories/catMasajeBienestar-opt.webp'
  },
  {
    name: 'Fisioterapia',
    slug: 'Fisioterapia',
    image: '/img/categories/catEquiposTerapeuticos-opt.webp'
  },
  {
    name: 'Accesorios',
    slug: 'Enfermería',
    image: '/img/categories/catAccesorios-opt.webp'
  },
  {
    name: 'Ver Todo',
    slug: 'Todos',
    image: '/img/categories/catTodos-opt.webp'
  },
];

export default function CategoryBadges() {
  return (
    <section className="bg-white py-10 sm:py-12 border-b border-[#EDE4D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal grid of circular categories */}
        <div className="grid grid-cols-3 min-[480px]:grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-6 sm:gap-5 md:gap-6 justify-items-center">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.name}
              to={cat.slug === 'Todos' ? '/productos' : `/productos?cat=${encodeURIComponent(cat.slug)}`}
              className="flex flex-col items-center gap-2 group text-center w-full max-w-[105px] sm:max-w-[115px] cursor-pointer"
            >
              <div className="w-[82px] h-[82px] min-[390px]:w-[90px] min-[390px]:h-[90px] sm:w-20 sm:h-20 md:w-[86px] md:h-[86px] lg:w-[94px] lg:h-[94px] rounded-full bg-[#FDFBF7] group-hover:bg-[#F2EFE9] border border-[#E8DFC8] group-hover:border-[#C29B62] group-hover:ring-4 group-hover:ring-[#C29B62]/15 flex items-center justify-center transition-all duration-300 ease-out shadow-xs group-hover:shadow-lg group-hover:-translate-y-1.5 overflow-hidden p-2 sm:p-2.5 md:p-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-115"
                  loading="lazy"
                />
              </div>
              <span className="text-[12px] sm:text-[13px] font-semibold text-[#18221D] group-hover:text-[#123329] group-hover:-translate-y-0.5 leading-tight transition-all duration-200 line-clamp-2">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

