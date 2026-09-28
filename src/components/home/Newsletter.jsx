import React, { useState } from 'react';
import { Mail, Lock, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    setSubscribed(true);
    showToast('¡Gracias por suscribirte al boletín profesional!');
    setEmail('');
  };

  return (
    <section className="py-10 sm:py-14 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Botanical Container */}
        <div className="relative rounded-3xl bg-[#123329] border border-[#C29B62]/30 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl shadow-[#123329]/20">
          
          {/* Subtle Organic Background Pattern */}
          <div className="absolute -right-10 -bottom-10 w-80 h-80 opacity-10 pointer-events-none text-white">
            <svg viewBox="0 0 200 200" fill="currentColor">
              <path d="M45,-78.2C58.3,-71.4,69,-59.5,77.4,-45.8C85.7,-32.1,91.7,-16,91.3,-0.2C90.9,15.6,84.1,31.2,74.9,44.2C65.6,57.2,53.8,67.6,40.1,74.4C26.3,81.2,10.6,84.5,-4.4,85.2C-19.4,85.9,-33.8,84.1,-46.7,77.1C-59.6,70.1,-71,58,-78.7,44.1C-86.4,30.2,-90.4,14.6,-89.2,-0.7C-88.1,-16,-81.7,-30.9,-72.4,-43.3C-63,-55.6,-50.7,-65.4,-37.2,-72.1C-23.7,-78.8,-9,-82.3,4.4,-84.9C17.8,-87.4,31.8,-85,45,-78.2Z" transform="translate(100 100)" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#C29B62] border border-[#C29B62]/30 flex items-center justify-center shrink-0 mt-1">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                  Recibe novedades y promociones
                </h3>
                <p className="text-xs sm:text-sm text-[#EDE4D6]/85 max-w-md">
                  Obtén información sobre nuevos productos, ofertas exclusivas y novedades para profesionales de la salud integrativa.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="bg-white/10 border border-[#C29B62]/40 rounded-2xl p-4 text-center text-[#EDE4D6] flex items-center justify-center gap-2 font-semibold text-sm">
                  <Check className="w-5 h-5 text-[#C29B62]" />
                  <span>¡Te has suscrito exitosamente! Recibirás nuestras novedades.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingresa tu correo electrónico"
                      className="flex-1 bg-white text-[#18221D] placeholder-[#65726B] px-5 py-3.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#C29B62] shadow-inner"
                    />
                    <button
                      type="submit"
                      className="bg-[#C29B62] hover:bg-[#DFC499] text-[#123329] font-extrabold px-8 py-3.5 rounded-full text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
                    >
                      Suscribirme
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#EDE4D6]/60 pl-3">
                    <Lock className="w-3 h-3 text-[#C29B62]" />
                    <span>Respetamos tu privacidad. No enviamos spam.</span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
