import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Preloader from './components/layout/Preloader';
import MainLayout from './components/layout/MainLayout';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AmazonikPage from './pages/AmazonikPage';
import TutorialsPage from './pages/TutorialsPage';
import VideosPage from './pages/VideosPage';
import AboutUsPage from './pages/AboutUsPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';

import CartDrawer from './components/ui/CartDrawer';
import WishlistModal from './components/ui/WishlistModal';
import QuickViewModal from './components/ui/QuickViewModal';
import SmoothScroll from './components/common/SmoothScroll';
import PrivacyConsentBar from './components/common/PrivacyConsentBar';

// Scroll to top on route change (compatible with Lenis)
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ShopProvider>
      <SmoothScroll>
        <Router>
          <ScrollToTop />
          {/* Universal Institutional Shell Layout (TopBar + Header/Navbar + Footer + AI FAB) */}
          <MainLayout>
            {/* Self-dismissing preloader */}
            <Preloader />

            {/* Main Content Router */}
            <Routes>
              {/* Inicio */}
              <Route path="/" element={<HomePage />} />
              <Route path="/index.html" element={<HomePage />} />

              {/* Catálogo de Productos */}
              <Route path="/productos" element={<ProductsPage />} />
              <Route path="/productos.html" element={<ProductsPage />} />

              {/* Checkout & Resumen de Pedido */}
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout.html" element={<CheckoutPage />} />
              <Route path="/pedido-confirmado" element={<CheckoutPage />} />
              <Route path="/pedido-confirmado.html" element={<CheckoutPage />} />

              {/* Aceites Amazoni-k */}
              <Route path="/aceites-amazonik" element={<AmazonikPage />} />
              <Route path="/aceites-amazonik.html" element={<AmazonikPage />} />

              {/* Tutoriales / Blog */}
              <Route path="/tutoriales" element={<TutorialsPage />} />
              <Route path="/tutoriales.html" element={<TutorialsPage />} />

              {/* Videos Demostrativos y de Productos */}
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/videos.html" element={<VideosPage />} />

              {/* Conócenos / Sobre Nosotros */}
              <Route path="/sobre-nosotros" element={<AboutUsPage />} />
              <Route path="/sobreNosotros.html" element={<AboutUsPage />} />

              {/* Políticas Legales y Términos */}
              <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
              <Route path="/politica-privacidad.html" element={<PrivacyPolicyPage />} />
              <Route path="/terminos-y-condiciones" element={<TermsPage />} />
              <Route path="/terminos-y-condiciones.html" element={<TermsPage />} />

              {/* 404 - Página No Encontrada */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* Global Interactive Modals & Drawers */}
            <CartDrawer />
            <WishlistModal />
            <QuickViewModal />
            <PrivacyConsentBar />
          </MainLayout>
        </Router>
      </SmoothScroll>
    </ShopProvider>
  );
}
