import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export default function PrivacyConsentBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('site_privacy_consent');
      if (!consent) {
        // Small delay for smooth entry
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Privacy storage access error:', e);
    }
  }, []);

  const handleConsent = (type) => {
    try {
      localStorage.setItem('site_privacy_consent', type);
      localStorage.setItem('site_privacy_timestamp', new Date().toISOString());
      
      // Update Google Tag Manager / Analytics consent mode if gtag exists
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: type === 'accepted' ? 'granted' : 'denied',
          ad_storage: type === 'accepted' ? 'granted' : 'denied',
          ad_user_data: type === 'accepted' ? 'granted' : 'denied',
          ad_personalization: type === 'accepted' ? 'granted' : 'denied',
        });
      }

      // Dispatch custom event for app analytics listener
      window.dispatchEvent(new CustomEvent('privacy_consent_updated', { 
        detail: { status: type } 
      }));
    } catch (e) {
      console.warn('Error saving privacy consent:', e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#16332B] text-[#EDE4D6] rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#C29B62]/40 backdrop-blur-md">
        
        {/* Header with icon */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#23483C] text-[#A47C52] flex items-center justify-center border border-[#A47C52]/30 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                Privacidad & Experiencia
              </h4>
              <span className="text-[10px] text-[#EDE4D6]/70">Ley N.° 29733 (Perú)</span>
            </div>
          </div>
          <button
            onClick={() => handleConsent('dismissed')}
            aria-label="Cerrar aviso"
            className="text-[#EDE4D6]/60 hover:text-white p-1 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-[#EDE4D6]/85 leading-relaxed mb-3.5">
          Utilizamos almacenamiento esencial para el carrito y analítica para mejorar el servicio según la Ley de Protección de Datos Personales. Consulta nuestra{' '}
          <Link 
            to="/politica-privacidad" 
            className="text-[#E6D3BC] underline font-semibold hover:text-white transition"
          >
            Política de Privacidad
          </Link>.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleConsent('accepted')}
            className="flex-1 py-2 px-3 bg-[#A47C52] hover:bg-[#8e6b45] text-white text-xs font-bold rounded-xl transition shadow-md text-center"
          >
            Aceptar todas
          </button>
          <button
            onClick={() => handleConsent('essential_only')}
            className="py-2 px-3 bg-white/10 hover:bg-white/20 text-[#EDE4D6] text-xs font-semibold rounded-xl transition text-center"
          >
            Solo necesarias
          </button>
        </div>

      </div>
    </div>
  );
}
