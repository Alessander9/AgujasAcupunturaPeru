import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

export default function ProductsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#F4EFEA] via-[#EDE4D6] to-[#E2DDD5] border-b border-[#E2D9CC]/80">
      {/* Decorative background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-right md:bg-center opacity-25 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1800&q=80')`
        }}
      />
      
      {/* Subtle organic oriental gradient lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#123329]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-96 h-96 rounded-full bg-[#C29B62]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-[#65726B] font-medium mb-3" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#123329] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-[#C29B62]" />
            <span>Inicio</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A8B2AC]" />
          <span className="text-[#123329] font-semibold">Productos</span>
        </nav>

        {/* HERO TITLE & SUBTITLE */}
        <div className="max-w-3xl">
          <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123329] tracking-tight leading-none mb-2">
            Productos
          </h1>
          <p className="text-sm sm:text-base text-[#46534C] font-normal leading-relaxed">
            Insumos profesionales para acupuntura, terapias integrales y bienestar.
          </p>
        </div>
      </div>
    </section>
  );
}
