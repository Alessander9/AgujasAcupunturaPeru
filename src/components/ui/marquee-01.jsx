import React from "react";
import { Marquee } from "./marquee-01-utils/marquee";

// Official Google G Logo
const GoogleGLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

// Google Signature 5-Star Icon
const GoogleStar = () => (
  <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-[#FBBC04]" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const GOOGLE_REVIEWS = [
  {
    id: 1,
    name: "Dra. Carmen Mendoza",
    tagline: "Local Guide · 18 opiniones",
    time: "Hace 4 días",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    avatarBg: "bg-emerald-600",
    rating: 5,
    text: "Excelente atención y productos 100% originales. Las agujas Seirin y DongBang tienen una suavidad de inserción inigualable y empaque estéril impecable.",
  },
  {
    id: 2,
    name: "Lic. Roberto Chang",
    tagline: "Terapeuta MTC · 9 opiniones",
    time: "Hace 1 semana",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    avatarBg: "bg-blue-600",
    rating: 5,
    text: "Puntualidad en el delivery a mi consultorio en Miraflores. Los kits de ventosas de vidrio y moxas son de máxima calidad profesional.",
  },
  {
    id: 3,
    name: "Dr. Manuel Valdivia",
    tagline: "Local Guide · 32 opiniones",
    time: "Hace 2 semanas",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80",
    avatarBg: "bg-purple-600",
    rating: 5,
    text: "Gran variedad de calibres para punción seca y electroacupuntura. El asesoramiento técnico por WhatsApp es rápido y súper certero.",
  },
  {
    id: 4,
    name: "Dra. Lucía Paredes",
    tagline: "Clínica Integrativa · 14 opiniones",
    time: "Hace 3 semanas",
    avatar: "https://images.unsplash.com/photo-1594824813590-78965a1263d9?w=120&auto=format&fit=crop&q=80",
    avatarBg: "bg-rose-600",
    rating: 5,
    text: "Hacemos pedidos mensuales a Cusco. Todo llega perfectamente sellado, con registro sanitario y excelente protección en el embalaje.",
  },
  {
    id: 5,
    name: "Lic. Javier Morales",
    tagline: "Local Guide · 25 opiniones",
    time: "Hace 1 mes",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    avatarBg: "bg-amber-600",
    rating: 5,
    text: "Pagué por Yape y el envío a Trujillo llegó en menos de 24 horas a mi clínica. Totalmente confiables y recomendados.",
  },
  {
    id: 6,
    name: "Dra. Vanessa Soto",
    tagline: "Especialista en Acupuntura · 7 opiniones",
    time: "Hace 1 mes",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    avatarBg: "bg-teal-600",
    rating: 5,
    text: "Los aceites Amazoni-k y las moxas sin humo tienen una aceptación increíble entre mis pacientes. Insumos garantizados.",
  },
  {
    id: 7,
    name: "Dr. Paul Brauch",
    tagline: "Local Guide · 41 opiniones",
    time: "Hace 2 meses",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    avatarBg: "bg-indigo-600",
    rating: 5,
    text: "Llevo más de 4 años abasteciendo a mis consultorios con ellos. La consistencia en el filo de cada aguja marca la diferencia.",
  },
  {
    id: 8,
    name: "Lic. Andrea Salazar",
    tagline: "Centro Terapéutico · 11 opiniones",
    time: "Hace 2 meses",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    avatarBg: "bg-orange-600",
    rating: 5,
    text: "La compra en la web es rapidísima y la entrega muy segura. Es el catálogo más completo de insumos de medicina oriental en Perú.",
  },
];

const firstRow = GOOGLE_REVIEWS.slice(0, Math.ceil(GOOGLE_REVIEWS.length / 2));
const secondRow = GOOGLE_REVIEWS.slice(Math.ceil(GOOGLE_REVIEWS.length / 2));

// Single Google Review Card component
const GoogleReviewCard = ({ review }) => {
  return (
    <div className="relative w-[320px] sm:w-[350px] bg-white rounded-2xl border border-[#E8EAED] p-4 shadow-[0_1px_3px_rgba(60,64,67,0.08),0_4px_8px_3px_rgba(60,64,67,0.04)] hover:shadow-[0_4px_16px_rgba(60,64,67,0.15)] hover:border-[#DADCE0] transition-all duration-300 flex flex-col justify-between shrink-0 select-none cursor-default group">
      <div>
        {/* Header: User Avatar + Name + Subtitle + Google 'G' Logo */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3 min-w-0">
            {review.avatar ? (
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100"
                loading="lazy"
              />
            ) : (
              <div className={`w-10 h-10 rounded-full ${review.avatarBg} text-white font-bold flex items-center justify-center text-sm shrink-0`}>
                {review.name.charAt(0)}
              </div>
            )}

            <div className="min-w-0">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#202124] truncate leading-tight group-hover:text-[#1a73e8] transition-colors">
                {review.name}
              </h4>
              <p className="text-[11px] text-[#5f6368] font-normal truncate mt-0.5">
                {review.tagline}
              </p>
            </div>
          </div>

          {/* Google Icon Badge */}
          <div className="p-1 rounded-full bg-[#F8F9FA] border border-[#E8EAED] shrink-0" title="Opinión de Google">
            <GoogleGLogo />
          </div>
        </div>

        {/* Rating Stars & Relative Date */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center gap-0.5">
            {[...Array(review.rating)].map((_, i) => (
              <GoogleStar key={i} />
            ))}
          </div>
          <span className="text-[11px] text-[#70757a] font-normal">
            · {review.time}
          </span>
        </div>

        {/* Review Text Body */}
        <p className="text-xs sm:text-[12.5px] text-[#3c4043] leading-relaxed line-clamp-3 font-normal">
          {review.text}
        </p>
      </div>

      {/* Bottom subtle Google Maps verified badge */}
      <div className="mt-3 pt-2.5 border-t border-[#F1F3F4] flex items-center justify-between text-[10.5px] text-[#70757a]">
        <span className="flex items-center gap-1 text-[#1a73e8] font-medium">
          <svg className="w-3 h-3 text-[#1a73e8]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span>Agujas Acupuntura Perú</span>
        </span>
        <span className="text-[#5f6368] font-normal">Opinión verificada</span>
      </div>
    </div>
  );
};

export default function TestimonialMarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-3">
      {/* Row 1 (Moves Left) */}
      <Marquee pauseOnHover className="[--duration:34s] mb-3">
        {firstRow.map((rev) => (
          <GoogleReviewCard key={rev.id} review={rev} />
        ))}
      </Marquee>

      {/* Row 2 (Moves Right) */}
      <Marquee reverse pauseOnHover className="[--duration:34s]">
        {secondRow.map((rev) => (
          <GoogleReviewCard key={rev.id} review={rev} />
        ))}
      </Marquee>

      {/* Side gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#F9F6F0] via-[#F9F6F0]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#F9F6F0] via-[#F9F6F0]/80 to-transparent z-10" />
    </div>
  );
}
