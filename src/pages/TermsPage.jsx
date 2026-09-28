import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CreditCard, Truck, RefreshCw, AlertTriangle, Scale, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { YapeBadge, BcpBadge } from '../components/common/PaymentLogos';

import SEOHead from '../components/common/SEOHead';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA] py-8 sm:py-12">
      <SEOHead 
        title="Términos y Condiciones de Compra & Garantías | Agujas Acupuntura Perú"
        description="Conoce las condiciones comerciales, medios de pago oficiales (Yape, BCP), políticas de envíos a provincias y garantías de insumos médicos en Perú."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#23483C] hover:text-[#A47C52] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>

        {/* HERO */}
        <div className="relative rounded-3xl overflow-hidden bg-[#23483C] text-white p-6 sm:p-10 mb-10 shadow-xl border border-[#16332B]">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16332B] border border-[#A47C52]/50 text-[#E6D3BC] text-xs font-bold uppercase tracking-wider">
              <FileText className="h-4 w-4 text-[#A47C52]" />
              Condiciones Comerciales
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Términos y Condiciones de Compra y Servicio
            </h1>
            <p className="text-xs sm:text-sm text-[#E6D3BC]/90 leading-relaxed max-w-2xl">
              Reglas, garantías, medios de pago y políticas de despacho para la adquisición de insumos clínicos de acupuntura y terapias complementarias en el Perú.
            </p>
            <div className="text-[11px] sm:text-xs text-[#E6D3BC]/70 pt-1">
              Vigencia aplicable en todo el territorio de la República del Perú
            </div>
          </div>
        </div>

        {/* CONTENIDO LEGAL ESTRUCTURADO */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6D3BC] shadow-lg space-y-8 text-[#202520] text-sm sm:text-base leading-relaxed">
          
          {/* 1. Generalidades y Titularidad */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-[#23483C]/10 text-[#23483C] flex items-center justify-center text-xs font-bold shrink-0">1</span>
              Generalidades e Identificación del Vendedor
            </h2>
            <p className="text-[#687067]">
              El presente documento establece las condiciones contractuales aplicables a todas las transacciones realizadas en <strong className="text-[#202520]">www.agujasacupunturaperu.com</strong>. La titularidad de la plataforma y el suministro de insumos corresponde al <strong className="text-[#202520]">Instituto de Terapias Integrales Perú</strong>, con domicilio legal en <strong className="text-[#202520]">Av. Julio C. Tello 438, Lince, Lima - Perú</strong>, teléfono de atención WhatsApp <strong className="text-[#202520]">+51 930 830 427</strong>.
            </p>
          </section>

          {/* 2. Proceso de Compra y Confirmación */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-[#23483C]/10 text-[#23483C] flex items-center justify-center text-xs font-bold shrink-0">2</span>
              Proceso de Compra y Pedido en Línea
            </h2>
            <p className="text-[#687067]">
              El usuario puede armar su pedido seleccionando los insumos deseados a través del catálogo interactivo. Al procesar el pedido:
            </p>
            <ul className="space-y-2 pl-2 text-xs sm:text-sm text-[#202520]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D5B] shrink-0 mt-0.5" />
                <span>La plataforma genera un resumen detallado con los ítems, precios unitarios, subtotales y datos de contacto ingresados.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D5B] shrink-0 mt-0.5" />
                <span>El pedido se transfiere de forma transparente al canal oficial de <strong>WhatsApp (+51 930 830 427)</strong> para la validación de stock en tiempo real y confirmación del comprobante de abono.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D5B] shrink-0 mt-0.5" />
                <span>Los precios expresados en la web están en Soles peruanos (S/) e incluyen IGV cuando corresponda.</span>
              </li>
            </ul>
          </section>

          {/* 3. Medios de Pago Oficiales */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-[#A47C52]" />
              Medios de Pago Oficiales y Cuentas Bancarias
            </h2>
            <p className="text-[#687067]">
              Para garantizar total transparencia y evitar cargos de comisiones bancarias indebidas, los pagos se efectúan directamente a las cuentas autorizadas a nombre de <strong className="text-[#202520]">Instituto de Terapias Integrales Perú</strong>:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-[#F7F2EA] border border-[#E6D3BC] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#A47C52] uppercase">Yape</span>
                  <YapeBadge className="h-6" />
                </div>
                <div className="text-sm font-semibold text-[#202520]">
                  Yape: <span className="font-mono text-[#23483C] font-bold text-base">939 371 250</span>
                </div>
                <div className="text-xs text-[#687067]">
                  Titular: <strong>Instituto de Terapias Integrales Perú</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F2EA] border border-[#E6D3BC] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#A47C52] uppercase">Banco de Crédito del Perú</span>
                  <BcpBadge className="h-6" />
                </div>
                <div className="text-xs text-[#202520]">
                  Cta Corriente Soles: <span className="font-mono text-[#23483C] font-bold text-sm">1932597886070</span>
                </div>
                <div className="text-xs text-[#202520]">
                  CCI Interbancario: <span className="font-mono text-[#23483C] font-bold text-sm">00219300259788607015</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Envíos y Tiempos de Entrega */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-[#A47C52]" />
              Políticas de Despacho y Tiempos de Entrega
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-[#687067]">
              <div className="p-4 bg-white rounded-2xl border border-[#E6D3BC]">
                <strong className="text-[#23483C] block mb-1">📍 Lima Metropolitana y Callao:</strong>
                <span>Entregas coordinadas en <strong>24 a 48 horas hábiles</strong> posteriores a la verificación del abono. Opción de recojo directo sin costo en nuestra sede de Lince (Av. Julio C. Tello 438).</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#E6D3BC]">
                <strong className="text-[#23483C] block mb-1">🚚 Provincias del Perú:</strong>
                <span>Despachos diarios a nivel nacional mediante <strong>Shalom Empresarial, Olva Courier o Expreso Marvisur</strong>. El número de remito o guía de seguimiento es enviado al WhatsApp del cliente una vez entregado el paquete a la agencia.</span>
              </div>
            </div>
          </section>

          {/* 5. Política de Cambios, Devoluciones y Garantías */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <RefreshCw className="w-5 h-5 text-[#A47C52]" />
              Políticas de Cambios y Garantías (Plazo de 7 Días)
            </h2>
            <p className="text-[#687067]">
              Para salvaguardar la salud y la bioseguridad clínica de terapeutas y pacientes, se aplican las siguientes reglas:
            </p>
            <ul className="space-y-2.5 pl-2 text-xs sm:text-sm text-[#202520]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D5B] shrink-0 mt-0.5" />
                <span><strong>Insumos Médicos Estériles (Agujas, Catéteres, Lancetas):</strong> Se aceptan cambios dentro de los <strong>7 días calendario</strong> posteriores a la recepción, <em>únicamente si la caja y los blisters termosellados permanecen intactos, sellados de fábrica y sin ninguna manipulación</em>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D5B] shrink-0 mt-0.5" />
                <span><strong>Equipos Terapéuticos y Electromedicina:</strong> Cuentan con garantía técnica directa de 3 a 6 meses por defectos atribuibles a fabricación. No cubre daños ocasionados por caídas, sobretensión eléctrica o uso inadecuado.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D5B] shrink-0 mt-0.5" />
                <span><strong>Aceites y Productos Botánicos:</strong> Por razones de higiene y pureza, no se admiten devoluciones de frascos con precinto de seguridad abierto.</span>
              </li>
            </ul>
          </section>

          {/* 6. Deslinde de Responsabilidad Médica */}
          <section className="space-y-3 bg-[#B56F55]/10 p-5 sm:p-6 rounded-2xl border border-[#B56F55]/30">
            <h2 className="text-lg sm:text-xl font-black text-[#B56F55] flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#B56F55]" />
              Deslinde de Responsabilidad Médica y Profesional
            </h2>
            <p className="text-xs sm:text-sm text-[#202520] leading-relaxed">
              Los insumos, agujas de acupuntura, copas de ventosa, moxas y equipos comercializados en este sitio son suministros técnicos orientados al ejercicio profesional de terapeutas calificados, médicos, fisioterapeutas y acupuntores debidamente capacitados.
            </p>
            <p className="text-xs text-[#687067] leading-relaxed">
              La información disponible en este portal, manuales o fichas técnicas tiene carácter exclusivamente formativo e ilustrativo. Ninguno de nuestros productos o contenidos sustituye el diagnóstico, prescripción ni tratamiento médico individualizado. Agujas Acupuntura Perú no se responsabiliza por la praxis inadecuada o uso no supervisado de los insumos.
            </p>
          </section>

          {/* 7. Jurisdicción y Ley Aplicable */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-[#A47C52]" />
              Legislación Aplicable y Jurisdicción
            </h2>
            <p className="text-xs sm:text-sm text-[#687067]">
              Cualquier controversia derivada de la interpretación o ejecución de los presentes Términos y Condiciones será resuelta bajo la legislación vigente de la República del Perú, sometiéndose las partes expresamente a la competencia territorial de los jueces y tribunales del Distrito Judicial de Lima, Perú.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
