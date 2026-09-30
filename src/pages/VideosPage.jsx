import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VIDEOS_DATA, VIDEO_CATEGORIES } from '../data/videosData';
import { 
  Play, 
  Video, 
  X, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  Tv,
  Layers,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'producto', 'uso'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset iframe loaded state when active video changes
  useEffect(() => {
    if (activeVideo) {
      setIframeLoaded(false);
    }
  }, [activeVideo]);

  // Pre-warm / prefetch YouTube player resources on page load for instant playback
  useEffect(() => {
    // 1. Warm base YouTube player engine
    const prefetchUrls = [
      'https://www.youtube-nocookie.com/s/player/',
      'https://www.youtube-nocookie.com/embed/' + (VIDEOS_DATA[0]?.youtubeId || '')
    ];
    prefetchUrls.forEach((url) => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.as = 'document';
        document.head.appendChild(link);
      }
    });

    // 2. Pre-warm first 6 videos on idle so top clicks are instantaneous
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 500));
    const handleIdlePrefetch = idleCallback(() => {
      VIDEOS_DATA.slice(0, 6).forEach((v) => {
        handlePrewarmVideo(v.youtubeId);
      });
    });

    return () => {
      if (window.cancelIdleCallback && typeof handleIdlePrefetch === 'number') {
        window.cancelIdleCallback(handleIdlePrefetch);
      }
    };
  }, []);

  // Pre-warm a specific video when user hovers or touches a card
  const handlePrewarmVideo = (youtubeId) => {
    if (!youtubeId) return;
    const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1`;
    if (!document.querySelector(`link[href="${embedUrl}"]`)) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = embedUrl;
      link.as = 'document';
      document.head.appendChild(link);
    }
  };

  // Filtered videos
  const filteredVideos = useMemo(() => {
    return VIDEOS_DATA.filter((video) => {
      const matchesCategory = selectedCategory === 'Todos' || video.category === selectedCategory;
      const matchesType = selectedType === 'all' || video.type === selectedType;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || (
        video.title.toLowerCase().includes(q) ||
        video.summary.toLowerCase().includes(q) ||
        video.category.toLowerCase().includes(q) ||
        video.badge.toLowerCase().includes(q)
      );

      return matchesCategory && matchesType && matchesQuery;
    });
  }, [selectedCategory, selectedType, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 sm:py-12">
      <SEOHead 
        title="Videos: Demostraciones y Usos de Productos | Agujas Acupuntura Perú"
        description="Mira demostraciones en video sobre cómo usar agujas de acupuntura, ventosas, electroacupuntor, piedras calientes, férulas y más insumos clínicos en Perú."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* ── 1. HERO BANNER DE VIDEOS ── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#123329] via-[#163E32] to-[#0A1E18] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#C29B62]/30">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#C29B62]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C29B62]/40 text-[#EDE4D6] text-xs font-bold uppercase tracking-wider">
              <Tv className="h-4 w-4 text-[#C29B62]" />
              Catálogo Audiovisual & Guías Prácticas
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-white leading-tight">
              Videos: Demostraciones y Usos de Productos
            </h1>
            
            <p className="text-sm sm:text-base text-[#EDE4D6]/90 leading-relaxed max-w-2xl font-normal">
              Explora nuestra videoteca con demostraciones de insumos, funcionamiento de equipos médicos y guías prácticas de uso para terapeutas y profesionales de la salud.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm text-[#EDE4D6]/80 font-medium">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B62]" /> 17 Videos Explicativos
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B62]" /> Demostraciones de Producto
              </span>
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B62]" /> Guías de Aplicación y Uso
              </span>
            </div>
          </div>
        </div>

        {/* ── 2. BARRA DE BÚSQUEDA Y FILTROS ── */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E8DFC8] shadow-sm space-y-4">
          
          {/* Fila superior: Input de búsqueda + Tipo de Video */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Buscador */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C8880]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por producto, técnica o tema..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E8DFC8] rounded-xl text-sm text-[#18221D] placeholder-[#7C8880] focus:outline-none focus:border-[#123329] focus:ring-2 focus:ring-[#123329]/15 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8880] hover:text-[#18221D]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Selector de Tipo (Todos / Producto / Guía de Uso) */}
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-xl border border-[#E8DFC8] self-start md:self-auto">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedType === 'all'
                    ? 'bg-[#123329] text-white shadow-xs'
                    : 'text-[#55635B] hover:text-[#123329]'
                }`}
              >
                Todos ({VIDEOS_DATA.length})
              </button>
              <button
                onClick={() => setSelectedType('producto')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedType === 'producto'
                    ? 'bg-[#123329] text-white shadow-xs'
                    : 'text-[#55635B] hover:text-[#123329]'
                }`}
              >
                Videos de Producto
              </button>
              <button
                onClick={() => setSelectedType('uso')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedType === 'uso'
                    ? 'bg-[#123329] text-white shadow-xs'
                    : 'text-[#55635B] hover:text-[#123329]'
                }`}
              >
                Guías de Uso
              </button>
            </div>
          </div>

          {/* Fila inferior: Chips de Categorías */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <span className="text-[#7C8880] font-bold shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Categoría:
            </span>
            {VIDEO_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isSelected
                      ? 'bg-[#C29B62] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#404D46] hover:bg-[#EDE4D6] hover:text-[#123329] border border-[#E8DFC8]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. LISTADO GRID DE VIDEOS ── */}
        {filteredVideos.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DFC8] space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#7C8880] mx-auto flex items-center justify-center border border-[#E8DFC8]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#18221D]">No se encontraron videos</h3>
            <p className="text-sm text-[#55635B] max-w-md mx-auto">
              No hay videos que coincidan con los criterios seleccionados. Prueba limpiando los filtros o utilizando otra palabra clave.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#123329] text-white text-xs font-bold hover:bg-[#1B4538] transition"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                onMouseEnter={() => handlePrewarmVideo(video.youtubeId)}
                onTouchStart={() => handlePrewarmVideo(video.youtubeId)}
                onFocus={() => handlePrewarmVideo(video.youtubeId)}
                tabIndex={0}
                role="button"
                aria-label={`Reproducir video: ${video.title}`}
                className="bg-white rounded-3xl border border-[#E8DFC8] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#123329]"
              >
                <div>
                  {/* Thumbnail con botón Play animado */}
                  <div className="relative aspect-[16/9] bg-[#123329] overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-[#C29B62] text-[#123329] group-hover:text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Play className="h-6 w-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Badge de tipo de video en esquina superior */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10.5px] font-extrabold tracking-wide uppercase shadow-sm ${
                        video.type === 'producto' 
                          ? 'bg-[#123329]/90 text-white backdrop-blur-xs' 
                          : 'bg-[#C29B62] text-white'
                      }`}>
                        {video.typeLabel}
                      </span>
                    </div>

                    {/* Badge de duración / formato en esquina inferior */}
                    <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-bold backdrop-blur-xs">
                      {video.duration}
                    </span>
                  </div>

                  {/* Información textual */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C29B62]">
                        {video.category}
                      </span>
                      <span className="text-[10px] font-semibold bg-[#FAF7F2] text-[#55635B] border border-[#E8DFC8] px-2 py-0.5 rounded-md">
                        {video.badge}
                      </span>
                    </div>

                    <h3 className="font-serif-title text-base sm:text-lg font-bold text-[#18221D] leading-snug group-hover:text-[#123329] transition-colors">
                      {video.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-[#55635B] leading-relaxed line-clamp-3">
                      {video.summary}
                    </p>
                  </div>
                </div>

                {/* Footer de tarjeta con llamada a la acción */}
                <div className="p-5 sm:p-6 pt-0">
                  <div className="pt-3 border-t border-[#EDE4D6] flex items-center justify-between text-xs font-bold text-[#123329] group-hover:text-[#C29B62] transition-colors">
                    <span className="flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-current" /> Reproducir video
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 4. SECCIÓN INFORMATIVA DE ASESORÍA CLÍNICA ── */}
        <div className="rounded-3xl bg-[#FAF7F2] border border-[#E8DFC8] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-serif-title font-bold text-[#123329]">
              ¿Tienes consultas sobre el uso de algún producto?
            </h3>
            <p className="text-xs sm:text-sm text-[#55635B] max-w-xl">
              Nuestros asesores clínicos y especialistas están listos para brindarte orientación técnica y fichas de uso de todos los insumos.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/productos"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#EDE4D6] text-[#123329] border border-[#E8DFC8] text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Ver Catálogo
            </Link>
            <a
              href="https://wa.me/51930830427?text=Hola,%20vi%20los%20videos%20demostrativos%20y%20deseo%20asesoría%20sobre%20un%20producto"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#123329] hover:bg-[#1B4538] text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* ── MODAL REPRODUCTOR DE VIDEO FULLSCREEN / RESPONSIVE ── */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#0A1E18] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
          >
            {/* Cabecera del modal */}
            <div className="p-4 sm:p-5 bg-[#123329] border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5 pr-4">
                <span className="px-2.5 py-0.5 rounded-full bg-[#C29B62] text-white text-[10px] font-black uppercase">
                  {activeVideo.category}
                </span>
                <h4 className="font-bold text-sm sm:text-base line-clamp-1 text-[#EDE4D6]">
                  {activeVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Cerrar video"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video Iframe Container con poster instantáneo y carga ultrarrápida */}
            <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
              {/* Imagen de fondo instantánea para eliminar pantalla negra mientras carga */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 pointer-events-none ${
                  iframeLoaded ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${activeVideo.youtubeId}/hqdefault.jpg)`
                }}
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-white">
                  <div className="w-12 h-12 rounded-full border-3 border-[#C29B62] border-t-transparent animate-spin" />
                  <span className="text-xs font-semibold text-[#EDE4D6] tracking-wide">Cargando video...</span>
                </div>
              </div>

              <iframe
                key={activeVideo.id}
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                title={activeVideo.title}
                loading="eager"
                fetchPriority="high"
                onLoad={() => setIframeLoaded(true)}
                className="w-full h-full border-0 relative z-10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Pie del modal con detalles y botón directo */}
            <div className="p-4 sm:p-5 bg-[#0D241E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#EDE4D6]/90">
              <p className="max-w-xl text-xs sm:text-[13px] leading-relaxed">
                {activeVideo.summary}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C29B62]" /> Abrir en YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
