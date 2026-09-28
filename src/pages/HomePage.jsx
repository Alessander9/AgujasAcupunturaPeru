import React from 'react';
import SEOHead from '../components/common/SEOHead';
import Hero from '../components/home/Hero';
import OffersMarquee from '../components/home/OffersMarquee';
import CategoryBadges from '../components/home/CategoryBadges';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoBanners from '../components/home/PromoBanners';
import TherapyKits from '../components/home/TherapyKits';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import BenefitsBar from '../components/home/BenefitsBar';

export default function HomePage() {
  return (
    <>
      <SEOHead 
        title="Agujas de Acupuntura en Perú | Insumos Médicos & Terapéuticos Certificados"
        description="Especialistas en venta de agujas de acupuntura estériles, moxibustión, ventosas, semillas de auriculoterapia y aceites amazónicos en Lima y todo el Perú. Envíos 24-48h."
      />
      {/* 1. HERO PRINCIPAL */}
      <Hero />

      {/* 2. BARRA ANIMADA EN LOOP DE OFERTAS Y BENEFICIOS */}
      <OffersMarquee />

      {/* 3. CATEGORÍAS CIRCULARES */}
      <CategoryBadges />

      {/* 4. PRODUCTOS DESTACADOS: Slider automático de más elegidos */}
      <FeaturedProducts />

      {/* 5. BANNERS PROMOCIONALES EDITORIALES */}
      <PromoBanners />

      {/* 6. SECCIÓN DE KITS PARA CADA TIPO DE TERAPIA */}
      <TherapyKits />

      {/* 7. TESTIMONIOS: Con la confianza de terapeutas */}
      <Testimonials />

      {/* 8. NEWSLETTER */}
      <Newsletter />

      {/* 9. BENEFICIOS: 4 Pilares Comerciales */}
      <BenefitsBar />
    </>
  );
}
