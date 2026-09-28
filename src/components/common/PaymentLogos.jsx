import React from 'react';

/**
 * Official true logos for Peruvian payment methods downloaded from official sources:
 * - Yape (SVG - Wikimedia / BCP Yape)
 * - Plin (PNG - Official plin.pe header brand asset)
 * - BCP (SVG - Banco de Crédito del Perú)
 * - BBVA (SVG - BBVA 2019)
 * - Interbank (SVG - Interbank)
 * - Banco de la Nación (PNG - Official bn.com.pe)
 */

export function YapeBadge({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-white rounded-lg px-2 py-1 shadow-xs border border-[#EDE4D6]/30 hover:scale-105 transition-transform select-none ${className}`}
      title="Yape - Billetera Digital BCP"
    >
      <img
        src="/images/payments/yape.svg"
        alt="Yape"
        className="h-full w-auto max-h-5 max-w-[70px] object-contain"
        loading="lazy"
      />
    </div>
  );
}

export function PlinBadge({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-white rounded-lg px-2 py-1 shadow-xs border border-[#EDE4D6]/30 hover:scale-105 transition-transform select-none ${className}`}
      title="Plin - Billetera Digital"
    >
      <img
        src="/images/payments/plin.png"
        alt="Plin"
        className="h-full w-auto max-h-5 max-w-[60px] object-contain"
        loading="lazy"
      />
    </div>
  );
}

export function BcpBadge({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-white rounded-lg px-2 py-1 shadow-xs border border-[#EDE4D6]/30 hover:scale-105 transition-transform select-none ${className}`}
      title="BCP - Banco de Crédito del Perú"
    >
      <img
        src="/images/payments/bcp.svg"
        alt="BCP"
        className="h-full w-auto max-h-4.5 max-w-[65px] object-contain"
        loading="lazy"
      />
    </div>
  );
}

export function BbvaBadge({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-white rounded-lg px-2 py-1 shadow-xs border border-[#EDE4D6]/30 hover:scale-105 transition-transform select-none ${className}`}
      title="BBVA Perú"
    >
      <img
        src="/images/payments/bbva.svg"
        alt="BBVA"
        className="h-full w-auto max-h-4 max-w-[65px] object-contain"
        loading="lazy"
      />
    </div>
  );
}

export function InterbankBadge({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-white rounded-lg px-2 py-1 shadow-xs border border-[#EDE4D6]/30 hover:scale-105 transition-transform select-none ${className}`}
      title="Interbank"
    >
      <img
        src="/images/payments/interbank.svg"
        alt="Interbank"
        className="h-full w-auto max-h-4.5 max-w-[75px] object-contain"
        loading="lazy"
      />
    </div>
  );
}

export function BancoNacionBadge({ className = "h-7" }) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-white rounded-lg px-2 py-1 shadow-xs border border-[#EDE4D6]/30 hover:scale-105 transition-transform select-none ${className}`}
      title="Banco de la Nación del Perú"
    >
      <img
        src="/images/payments/banco-nacion.png"
        alt="Banco de la Nación"
        className="h-full w-auto max-h-5 max-w-[80px] object-contain"
        loading="lazy"
      />
    </div>
  );
}

/**
 * Grouped Payment Method Badges Row
 */
export default function PaymentMethodsRow({ className = "flex flex-wrap items-center gap-2" }) {
  return (
    <div className={className}>
      <YapeBadge />
      <PlinBadge />
      <BcpBadge />
      <BbvaBadge />
      <InterbankBadge />
      <BancoNacionBadge />
    </div>
  );
}
