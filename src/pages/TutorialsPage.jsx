import React, { useState } from 'react';
import { TUTORIALS_DATA } from '../data/tutorialsData';
import { Play, Sparkles, Video, X, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

export default function TutorialsPage() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <div className="min-h-screen bg-[#F7F2EA] py-8 sm:py-12">
      <SEOHead 
        title="Tutoriales Clínicos de Acupuntura, Ventosas y Masaje | Agujas Acupuntura Perú"
        description="Videos educativos y demostraciones prácticas de acupuntura, electroacupuntura, ventosaterapia y puntos de digitopresión dictados por especialistas en Perú."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION DE TUTORIALES */}
        <div className="relative rounded-3xl overflow-hidden bg-[#16332B] text-white p-6 sm:p-10 lg:p-12 mb-12 shadow-2xl border border-[#A47C52]/30">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#23483C] border border-[#A47C52]/50 text-[#E6D3BC] text-xs font-bold uppercase tracking-wider">
              <Video className="h-4 w-4 text-[#A47C52]" />
              Material Clínico de Acceso Libre
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Tutoriales Clínicos & Demostraciones
            </h1>
            
            <p className="text-sm sm:text-base text-[#E6D3BC]/90 leading-relaxed max-w-2xl">
              Aprende técnicas prácticas de rehabilitación facial, aplicación de ventosas, puntos gatillo y automasaje con los especialistas de Agujas Acupuntura Perú.
            </p>
          </div>
        </div>

        {/* CATEGORIZED SECTIONS */}
        <div className="space-y-14">
          {TUTORIALS_DATA.map((cat, idx) => (
            <section key={idx} className="space-y-6">
              <div className="border-b border-[#E6D3BC] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#A47C52] block">
                  {cat.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#202520] tracking-tight">
                  {cat.category}
                </h2>
                <p className="text-xs sm:text-sm text-[#687067] mt-1">
                  {cat.description}
                </p>
              </div>

              {/* Video Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.videos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideoId(vid.youtubeId)}
                    className="bg-white rounded-3xl border border-[#E6D3BC] shadow-lg overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                  >
                    <div>
                      {/* Video Thumbnail with Play Button */}
                      <div className="relative aspect-[16/9] bg-[#16332B] overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                          alt={vid.title}
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#23483C] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#A47C52] transition-all">
                            <Play className="h-6 w-6 fill-white ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-bold">
                          {vid.duration}
                        </span>
                      </div>

                      <div className="p-5">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#A47C52] block mb-1">
                          Nivel: {vid.level}
                        </span>
                        <h3 className="font-extrabold text-base text-[#202520] leading-snug group-hover:text-[#23483C] transition-colors">
                          {vid.title}
                        </h3>
                        <p className="text-xs text-[#687067] mt-2 leading-relaxed">
                          {vid.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="pt-3 border-t border-[#E6D3BC]/60 flex items-center justify-between text-xs font-bold text-[#23483C]">
                        <span>Ver demostración en video</span>
                        <Play className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* YOUTUBE MODAL POPUP */}
        {activeVideoId && (
          <div
            onClick={() => setActiveVideoId(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-[16/9] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              <button
                onClick={() => setActiveVideoId(null)}
                aria-label="Cerrar video"
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="Reproductor de Video Clínico"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
