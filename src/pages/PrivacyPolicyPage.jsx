import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, CheckCircle2, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F7F2EA] py-8 sm:py-12">
      <SEOHead 
        title="Política de Privacidad | Ley 29733 de Protección de Datos Personales Perú"
        description="Conoce nuestra política de protección de datos personales en cumplimiento con la Ley N.° 29733 de la República del Perú. Ejercicio de Derechos ARCO."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Regresar */}
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
              <ShieldCheck className="h-4 w-4 text-[#A47C52]" />
              Marco Legal Ley N.° 29733
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Política de Privacidad y Protección de Datos Personales
            </h1>
            <p className="text-xs sm:text-sm text-[#E6D3BC]/90 leading-relaxed max-w-2xl">
              En cumplimiento de la Ley N.° 29733 (Ley de Protección de Datos Personales de la República del Perú) y su Reglamento aprobado por D.S. 003-2013-JUS.
            </p>
            <div className="text-[11px] sm:text-xs text-[#E6D3BC]/70 pt-1">
              Última actualización: Enero 2026 | Ámbito: República del Perú
            </div>
          </div>
        </div>

        {/* CONTENIDO LEGAL ESTRUCTURADO */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6D3BC] shadow-lg space-y-8 text-[#202520] text-sm sm:text-base leading-relaxed">
          
          {/* 1. Responsable del Tratamiento */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-[#23483C]/10 text-[#23483C] flex items-center justify-center text-xs font-bold shrink-0">1</span>
              Responsable del Banco de Datos Personales
            </h2>
            <p className="text-[#687067]">
              El titular y responsable del tratamiento de los bancos de datos personales recopilados a través del sitio web <strong className="text-[#202520]">www.agujasacupunturaperu.com</strong> es el <strong className="text-[#202520]">Instituto de Terapias Integrales Perú</strong> (en adelante, "Agujas Acupuntura Perú"), con sede central en <strong className="text-[#202520]">Av. Julio C. Tello 438, Lince, Lima - Perú</strong>.
            </p>
          </section>

          {/* 2. Datos Personales Recopilados */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-[#23483C]/10 text-[#23483C] flex items-center justify-center text-xs font-bold shrink-0">2</span>
              Datos Personales que Recopilamos
            </h2>
            <p className="text-[#687067]">
              Para la correcta gestión de pedidos, asesoría técnica y despacho de insumos médicos estériles y equipos terapéuticos, recopilamos las siguientes categorías de datos:
            </p>
            <ul className="space-y-2 pl-2 text-xs sm:text-sm text-[#202520]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D5B] shrink-0 mt-0.5" />
                <span><strong>Datos de Identificación y Contacto:</strong> Nombres y apellidos completos, DNI / Carné de Extranjería / RUC, teléfono celular (WhatsApp) y correo electrónico.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D5B] shrink-0 mt-0.5" />
                <span><strong>Datos de Entrega y Destino:</strong> Dirección exacta en Lima Metropolitana o departamento, provincia, distrito y agencia de courier para envíos a provincias.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3F7D5B] shrink-0 mt-0.5" />
                <span><strong>Datos de Transacción y Pago:</strong> Comprobantes de transferencia directa, capturas de abono Yape/Plin o depósitos BCP requeridos exclusivamente para validar el pago. <em>No almacenamos datos sensibles de tarjetas de crédito o claves bancarias</em>.</span>
              </li>
            </ul>
          </section>

          {/* 3. Finalidades del Tratamiento */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-[#23483C]/10 text-[#23483C] flex items-center justify-center text-xs font-bold shrink-0">3</span>
              Finalidades Necesarias del Tratamiento
            </h2>
            <p className="text-[#687067]">
              Los datos proporcionados son tratados exclusivamente con las siguientes finalidades comerciales y operativas legítimas:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-[#202520]">
              <li>Procesar, preparar, embalar y despachar sus pedidos de insumos de acupuntura y terapias complementarias.</li>
              <li>Emitir las boletas o facturas electrónicas de acuerdo con la normativa tributaria de la SUNAT.</li>
              <li>Coordinar las entregas directas en Lima (24-48 horas) o gestionar los envíos a provincias mediante empresas de transporte certificadas.</li>
              <li>Brindar asesoría técnica sobre calibres, medidas, compatibilidad de insumos y protocolos de aplicación.</li>
              <li>Atender consultas, reclamos o devoluciones de conformidad con los Términos y Condiciones.</li>
            </ol>
          </section>

          {/* 4. Transferencia a Terceros y Envíos a Provincias */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-[#23483C]/10 text-[#23483C] flex items-center justify-center text-xs font-bold shrink-0">4</span>
              Transferencia a Agencias de Envío y Terceros
            </h2>
            <p className="text-[#687067]">
              Para asegurar la entrega oportuna de los productos en cualquier punto del Perú, sus datos de contacto y destino (nombre, DNI, teléfono y dirección/agencia) son compartidos estrictamente con las empresas de logística y courier autorizadas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-[#F7F2EA] rounded-2xl border border-[#E6D3BC] text-center">
                <strong className="block text-[#23483C] text-sm">Shalom Empresarial</strong>
                <span className="text-xs text-[#687067]">Agencia a Agencia</span>
              </div>
              <div className="p-3 bg-[#F7F2EA] rounded-2xl border border-[#E6D3BC] text-center">
                <strong className="block text-[#23483C] text-sm">Olva Courier</strong>
                <span className="text-xs text-[#687067]">Puerta a Puerta / Agencia</span>
              </div>
              <div className="p-3 bg-[#F7F2EA] rounded-2xl border border-[#E6D3BC] text-center">
                <strong className="block text-[#23483C] text-sm">Expreso Marvisur</strong>
                <span className="text-xs text-[#687067]">Carga pesada / Provincias</span>
              </div>
            </div>
            <p className="text-xs text-[#687067]">
              Agujas Acupuntura Perú no comercializa, vende ni cede sus bases de datos personales a terceras empresas para fines no vinculados a su relación de compra.
            </p>
          </section>

          {/* 5. Ejercicio de Derechos ARCO */}
          <section className="space-y-3 bg-[#F7F2EA] p-5 sm:p-6 rounded-2xl border border-[#E6D3BC]">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-[#A47C52]" />
              Ejercicio de Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
            </h2>
            <p className="text-xs sm:text-sm text-[#687067]">
              Usted tiene el derecho inalienable de acceder a sus datos personales en nuestro poder, rectificarlos si son inexactos o incompletos, cancelarlos cuando resulten excesivos o no pertinentes, y oponerse a su tratamiento para fines específicos.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-[#202520] pt-1">
              <p><strong>Canales habilitados para ejercer sus Derechos ARCO:</strong></p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a 
                  href="https://wa.me/51930830427?text=Hola,%20solicito%20ejercer%20mis%20Derechos%20ARCO%20conforme%20a%20la%20Ley%2029733"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#23483C] text-white font-bold text-xs hover:bg-[#16332B] transition"
                >
                  <Phone className="w-4 h-4 text-[#A47C52]" />
                  WhatsApp Oficial: +51 930 830 427
                </a>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E6D3BC] text-[#202520] text-xs">
                  <MapPin className="w-4 h-4 text-[#A47C52]" />
                  Presencial: Av. Julio C. Tello 438, Lince, Lima
                </div>
              </div>
              <p className="text-[11px] text-[#687067] pt-1">
                Las solicitudes son atendidas sin costo alguno en un plazo máximo de 10 días hábiles conforme lo establece el marco normativo peruano.
              </p>
            </div>
          </section>

          {/* 6. Seguridad y Almacenamiento */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-[#23483C]/10 text-[#23483C] flex items-center justify-center text-xs font-bold shrink-0">6</span>
              Seguridad de la Información y Confidencialidad
            </h2>
            <p className="text-[#687067]">
              Adoptamos medidas técnicas, legales y organizativas exigidas por la Dirección General de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos (MINJUS), a fin de evitar la alteración, pérdida, acceso o tratamiento no autorizado de sus datos personales.
            </p>
          </section>

          {/* 7. Cookies y Consentimiento */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-[#23483C] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-[#23483C]/10 text-[#23483C] flex items-center justify-center text-xs font-bold shrink-0">7</span>
              Uso de Cookies y Tecnologías Similares
            </h2>
            <p className="text-[#687067]">
              Nuestro sitio web utiliza cookies técnicas indispensables para el funcionamiento del carrito de compras, así como cookies analíticas opcionales para medir el rendimiento de la plataforma. Ningún script analítico o publicitario de terceros se ejecuta sin su consentimiento previo otorgado mediante el banner de cookies.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
