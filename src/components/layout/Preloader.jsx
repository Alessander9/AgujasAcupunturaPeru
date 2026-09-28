import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 70);

    const minDisplayTimer = setTimeout(() => {
      setVisible(false);
    }, 900);

    return () => {
      clearInterval(interval);
      clearTimeout(minDisplayTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#0A1E18] flex items-center justify-center transition-opacity duration-500 ease-out overflow-hidden select-none">
      {/* Ambient background oriental glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#123329]/50 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-80 h-80 rounded-full bg-[#C29B62]/20 blur-[90px] pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center p-6 max-w-md w-full text-center">
        
        {/* Animated Central Logo (Large transparent without box) */}
        <div className="relative w-72 sm:w-96 h-44 sm:h-52 flex items-center justify-center mb-6">
          {/* Subtle glowing halo */}
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[#123329]/40 via-[#C29B62]/25 to-[#123329]/40 blur-2xl animate-pulse" />
          
          <img
            src="/agujaslogoblanco1.png"
            alt="Agujas Acupuntura Perú"
            className="relative w-full h-full object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)] animate-in zoom-in-90 duration-500"
          />
        </div>

        {/* Elegant Gold Shimmer Progress Bar */}
        <div className="w-56 sm:w-64 h-1.5 bg-[#123329] rounded-full overflow-hidden relative border border-[#C29B62]/30 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#2C7A62] via-[#C29B62] to-[#EDE4D6] rounded-full transition-all duration-200 ease-out shadow-xs"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtle tagline */}
        <p className="text-[11px] text-[#EDE4D6]/70 mt-3 font-semibold tracking-wider">
          Insumos profesionales para acupuntura y terapias integrales
        </p>
      </div>
    </div>
  );
}
