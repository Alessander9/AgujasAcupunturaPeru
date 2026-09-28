import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Home,
  ShoppingBag,
  ArrowRight,
  Compass,
  Sparkles,
  Phone,
  HelpCircle,
  Package,
  Flame,
  Leaf,
  GraduationCap,
  ShieldCheck,
  Truck
} from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

export default function NotFoundPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/productos');
    }
  };

  const quickLinks = [
    {
      title: 'Agujas de Acupuntura',
      desc: 'Huan Qiu, Hansol, K-Med y Seirin con guía',
      icon: Package,
      path: '/productos?category=Acupuntura+y+Moxibusti%C3%B3n',
      color: 'bg-[#123329] text-[#EDE4D6]'
    },
    {
      title: 'Kits de Ventosas Clínicas',
      desc: 'BioCupping Pro 12 copas con pistón y maletín',
      icon: Compass,
      path: '/productos?category=Ventosa+Terapia',
      color: 'bg-[#C29B62] text-[#123329]'
    },
    {
      title: 'Aceites Amazoni-k',
      desc: 'Copaiba, Sangre de Grado y Palo Santo 100% puros',
      icon: Leaf,
      path: '/aceites-amazonik',
      color: 'bg-[#2C7A62] text-white'
    },
    {
      title: 'Moxas y Cajas de Bambú',
      desc: 'Puros de Artemisa, conos y cajas protectoras',
      icon: Flame,
      path: '/productos?category=Acupuntura+y+Moxibusti%C3%B3n',
      color: 'bg-[#D84A38] text-white'
    }
  ];

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SEOHead 
        title="404 Página No Encontrada | Agujas Acupuntura Perú"
        description="La página que buscas no existe o ha cambiado de enlace. Consulta nuestro catálogo completo de agujas de acupuntura y suministros médicos."
      />
      
      {/* 404 HERO CONTAINER */}
      <div className="bg-white rounded-3xl border border-[#EDE4D6] p-8 sm:p-14 shadow-xl text-center relative overflow-hidden">
        
        {/* Ambient Top & Corner Glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#123329]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C29B62]/10 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9F6F0] border border-[#EDE4D6] text-xs font-bold text-[#123329] uppercase tracking-wider mb-4 shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5 text-[#C29B62]" />
          <span>Error 404 • Página No Encontrada</span>
        </div>

        {/* Big Stylized 404 Number */}
        <div className="relative my-2 select-none">
          <span className="font-serif-title text-7xl sm:text-9xl font-black tracking-tight text-[#123329]/15">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#123329] text-[#EDE4D6] border border-[#C29B62]/40 shadow-xl flex items-center justify-center animate-in zoom-in-75 duration-300">
              <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-[#C29B62] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Headings */}
        <h1 className="font-serif-title text-2xl sm:text-4xl font-extrabold text-[#123329] mb-3">
          ¿Buscabas algún insumo o producto clínico?
        </h1>
        <p className="text-xs sm:text-sm text-[#65726B] max-w-lg mx-auto leading-relaxed mb-8">
          La página o enlace que intentas abrir no está disponible o ha cambiado de ruta. Puedes buscar directamente en nuestro catálogo o elegir una de las secciones principales.
        </p>

        {/* Search Bar directly on 404 */}
        <form
          onSubmit={handleSearch}
          className="max-w-md mx-auto mb-8 flex items-center bg-[#F9F6F0] rounded-2xl border border-[#EDE4D6] p-1.5 shadow-inner focus-within:border-[#123329] focus-within:ring-2 focus-within:ring-[#123329]/10 transition-all"
        >
          <div className="pl-3.5 pr-2 text-[#65726B]">
            <Search className="w-4 h-4 text-[#C29B62]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar agujas, ventosas, moxas, aceites..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-[#18221D] placeholder-[#8C9690] focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#123329] hover:bg-[#1B4538] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Buscar</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C29B62]" />
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-[#123329] hover:bg-[#1B4538] text-white text-xs font-bold transition shadow-md hover:scale-102 flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-[#C29B62]" />
            <span>Volver al Inicio</span>
          </Link>

          <Link
            to="/productos"
            className="px-6 py-3 rounded-full bg-white hover:bg-[#F9F6F0] border border-[#EDE4D6] hover:border-[#123329] text-[#18221D] text-xs font-bold transition shadow-xs hover:scale-102 flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#123329]" />
            <span>Ver Catálogo Completo (155+ Insumos)</span>
          </Link>

          <a
            href="https://wa.me/51930830427?text=Hola,%20necesito%20ayuda%20para%20encontrar%20un%20producto%20en%20la%20p%C3%A1gina%20de%20Agujas%20Acupuntura%20Per%C3%BA."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition shadow-md hover:scale-102 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Asesoría por WhatsApp</span>
          </a>
        </div>

        {/* POPULAR CATEGORIES QUICK GRID */}
        <div className="border-t border-[#EDE4D6] pt-8 text-left">
          <p className="text-xs font-bold text-[#123329] uppercase tracking-wider text-center mb-4">
            Categorías más consultadas por terapeutas
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className="p-4 rounded-2xl bg-[#F9F6F0] hover:bg-white border border-[#EDE4D6] hover:border-[#C29B62] transition-all duration-200 group shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-[#18221D] group-hover:text-[#123329] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#65726B] leading-snug">
                    {item.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

      </div>

      {/* FOOTNOTE TRUST BADGES */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#65726B]">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#2C7A62]" />
          <span>Delivery en Lima y despachos a todo el Perú</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2C7A62]" />
          <span>Insumos médicos y clínicos certificados</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C29B62]" />
          <span>Atención al 930 830 427</span>
        </div>
      </div>

    </div>
  );
}
