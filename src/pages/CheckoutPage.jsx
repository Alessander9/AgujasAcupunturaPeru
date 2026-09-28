import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { YapeBadge, BcpBadge } from '../components/common/PaymentLogos';

import SEOHead from '../components/common/SEOHead';
import { trackWhatsAppPurchase } from '../lib/analytics';
import {
  ShieldCheck,
  Truck,
  Building2,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  AlertCircle,
  Copy,
  Check,
  Phone,
  FileText,
  Lock,
  Sparkles,
  MapPin
} from 'lucide-react';

const DEPARTAMENTOS_PERU = [
  'Lima', 'Callao', 'Arequipa', 'Cusco', 'La Libertad', 'Piura', 'Lambayeque',
  'Áncash', 'Junín', 'Ica', 'San Martín', 'Cajamarca', 'Puno', 'Loreto',
  'Huánuco', 'Ayacucho', 'Ucayali', 'Tacna', 'Moquegua', 'Pasco', 'Tumbes',
  'Amazonas', 'Apurímac', 'Huancavelica', 'Madre de Dios'
];

export default function CheckoutPage() {
  const { cart, cartTotalPrice, updateQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    tipoDoc: 'DNI', // 'DNI' | 'RUC' | 'CE'
    numDoc: '',
    telefono: '',
    email: '',
    tipoComprobante: 'boleta', // 'boleta' | 'factura'
    razonSocial: '',
    rucFactura: '',
    tipoEnvio: 'lima', // 'lima' | 'provincia' | 'recojo'
    departamento: 'Lima',
    provincia: 'Lima',
    distrito: '',
    direccion: '',
    referencia: '',
    metodoPago: 'yape', // 'yape' | 'tarjeta' | 'transferencia' | 'contraentrega'
    numeroOperacion: '',
    notas: ''
  });

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(null);
  const [copiedAccount, setCopiedAccount] = useState('');

  // Financial calculations
  const shippingCost = useMemo(() => {
    if (formData.tipoEnvio === 'recojo') return 0;
    if (formData.tipoEnvio === 'lima') {
      return cartTotalPrice >= 150 ? 0 : 10;
    }
    if (formData.tipoEnvio === 'provincia') {
      return 18;
    }
    return 10;
  }, [formData.tipoEnvio, cartTotalPrice]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return (cartTotalPrice * appliedCoupon.value) / 100;
    }
    if (appliedCoupon.type === 'shipping') {
      return shippingCost;
    }
    return 0;
  }, [appliedCoupon, cartTotalPrice, shippingCost]);

  const finalTotal = Math.max(0, cartTotalPrice - discountAmount + (appliedCoupon?.type === 'shipping' ? 0 : shippingCost));

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Coupon Apply
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (!code) return;

    if (code === 'ACUPUNTURA10' || code === 'PROFE10') {
      setAppliedCoupon({ code, type: 'percent', value: 10, label: '10% de descuento profesional' });
      setCouponCode('');
    } else if (code === 'ENVIOFREE') {
      setAppliedCoupon({ code, type: 'shipping', value: 100, label: 'Envío gratuito a todo el Perú' });
      setCouponCode('');
    } else {
      setCouponError('Cupón no válido o expirado.');
    }
  };

  // Copy text helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(''), 2500);
  };

  // Submit Order
  const handleConfirmOrder = (e) => {
    e.preventDefault();

    // Anti-SPAM Honeypot Check
    if (formData.website_trap) {
      console.warn('Bot submission blocked via Honeypot trap.');
      return;
    }

    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      navigate('/productos');
      return;
    }

    if (!formData.nombre.trim() || !formData.apellidos.trim() || !formData.numDoc.trim()) {
      alert('Por favor completa todos tus datos de identificación obligatorios.');
      return;
    }

    // Phone validation (Peruvian 9 digits)
    const cleanedPhone = (formData.telefono || '').replace(/\D/g, '');
    if (cleanedPhone.length !== 9 || !cleanedPhone.startsWith('9')) {
      alert('Por favor ingresa un número de celular o WhatsApp válido del Perú (9 dígitos empezando con 9).');
      return;
    }

    // DNI / RUC basic format check
    if (formData.tipoDoc === 'DNI' && cleanedPhone && formData.numDoc.replace(/\D/g, '').length !== 8) {
      alert('El DNI debe contener exactamente 8 dígitos numéricos.');
      return;
    }

    if (formData.tipoEnvio !== 'recojo' && (!formData.direccion.trim() || !formData.distrito.trim())) {
      alert('Por favor ingresa la dirección de entrega y distrito.');
      return;
    }

    setIsSubmitting(true);

    // Track GA4 e-commerce conversion
    trackWhatsAppPurchase(cart, finalTotal, 'checkout_page');

    setTimeout(() => {
      const orderNumber = `AAP-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        items: [...cart],
        subtotal: cartTotalPrice,
        shipping: shippingCost,
        discount: discountAmount,
        total: finalTotal,
        customer: { ...formData }
      };

      setOrderCompleted(completedOrder);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Automatically launch WhatsApp with formatted order
      handleCheckoutWhatsApp();
    }, 600);
  };

  // WhatsApp Order Submission
  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let msg = `🏮 *PEDIDO WEB - AGUJAS ACUPUNTURA PERÚ*\n`;
    msg += `----------------------------------------\n`;
    msg += `👤 *Cliente:* ${formData.nombre} ${formData.apellidos}\n`;
    msg += `📄 *Doc (${formData.tipoDoc}):* ${formData.numDoc}\n`;
    msg += `📱 *Teléfono:* ${formData.telefono}\n`;
    msg += `🧾 *Comprobante:* ${formData.tipoComprobante.toUpperCase()}${formData.tipoComprobante === 'factura' ? ` (RUC: ${formData.rucFactura} - ${formData.razonSocial})` : ''}\n\n`;

    msg += `📦 *PRODUCTOS:* \n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.nombre} (x${item.quantity}) - S/ ${(item.precio * item.quantity).toFixed(2)}\n`;
    });

    msg += `\n----------------------------------------\n`;
    msg += `💰 *Subtotal:* S/ ${cartTotalPrice.toFixed(2)}\n`;
    if (discountAmount > 0) msg += `🎁 *Descuento:* -S/ ${discountAmount.toFixed(2)}\n`;
    msg += `🚚 *Envío:* ${shippingCost === 0 ? 'GRATIS' : `S/ ${shippingCost.toFixed(2)}`}\n`;
    msg += `⭐️ *TOTAL A PAGAR:* S/ ${finalTotal.toFixed(2)}\n`;
    msg += `----------------------------------------\n`;
    msg += `📍 *Entrega:* ${formData.tipoEnvio === 'recojo' ? 'Recojo en oficina Lince' : `${formData.direccion}, ${formData.distrito}, ${formData.departamento}`}\n`;
    if (formData.referencia) msg += `📌 *Ref:* ${formData.referencia}\n`;
    msg += `💳 *Método de pago elegido:* ${formData.metodoPago.toUpperCase()}\n`;
    if (formData.numeroOperacion) msg += `🔢 *Nº Operación:* ${formData.numeroOperacion}\n`;
    if (formData.notas) msg += `📝 *Notas:* ${formData.notas}\n\n`;
    msg += `Por favor coordinar la confirmación y despacho del pedido. ¡Muchas gracias!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/51930830427?text=${encoded}`, '_blank');
  };

  // RENDER: ORDER SUCCESS STATE
  if (orderCompleted) {
    return (
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <SEOHead 
          title="Pedido Confirmado | Agujas Acupuntura Perú"
          description="Tu pedido de insumos de acupuntura ha sido registrado con éxito. Nos pondremos en contacto vía WhatsApp para coordinar el envío."
        />
        <div className="bg-white rounded-3xl border border-[#EDE4D6] p-6 sm:p-10 shadow-xl text-center relative overflow-hidden">
          {/* Ambient Top Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#123329]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Success Check Icon */}
          <div className="w-20 h-20 rounded-full bg-[#123329] text-[#EDE4D6] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#123329]/20 animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-10 h-10 text-[#C29B62]" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#123329]/10 text-[#123329] text-xs font-bold uppercase tracking-wider mb-2">
            Pedido Registrado con Éxito
          </span>

          <h1 className="font-serif-title text-2xl sm:text-4xl font-extrabold text-[#123329] mb-2">
            ¡Gracias por tu compra, {orderCompleted.customer.nombre}!
          </h1>

          <p className="text-xs sm:text-sm text-[#65726B] max-w-lg mx-auto mb-6">
            Tu orden <strong className="text-[#18221D]">{orderCompleted.orderId}</strong> ha sido generada correctamente. Te asesoramos y coordinamos el envío inmediatamente.
          </p>

          {/* Order Details Grid */}
          <div className="bg-[#F9F6F0] rounded-2xl p-5 sm:p-6 text-left border border-[#EDE4D6] mb-8 divide-y divide-[#EDE4D6]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4">
              <div>
                <span className="text-[11px] text-[#65726B] block">Número de Pedido</span>
                <strong className="text-sm text-[#123329]">{orderCompleted.orderId}</strong>
              </div>
              <div>
                <span className="text-[11px] text-[#65726B] block">Fecha</span>
                <span className="text-xs font-semibold text-[#18221D]">{orderCompleted.date}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#65726B] block">Método de Pago</span>
                <span className="text-xs font-bold text-[#123329] uppercase">{orderCompleted.customer.metodoPago}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#65726B] block">Total</span>
                <strong className="text-base text-[#D84A38]">S/ {orderCompleted.total.toFixed(2)}</strong>
              </div>
            </div>

            {/* Items Table */}
            <div className="py-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#123329]">
                Resumen de Insumos ({orderCompleted.items.length})
              </h4>
              {orderCompleted.items.map((it) => (
                <div key={it.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.imagen || (it.imagenes && it.imagenes[0]) || '/LOGO.png'}
                      alt={it.nombre}
                      className="w-10 h-10 rounded-lg bg-white p-1 object-contain border border-[#EDE4D6]"
                    />
                    <div>
                      <span className="font-semibold text-[#18221D] block">{it.nombre}</span>
                      <span className="text-[#65726B] text-[11px]">Cant: {it.quantity} × S/ {it.precio.toFixed(2)}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#18221D]">S/ {(it.precio * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Delivery Info */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[11px] text-[#65726B] block">Destinatario:</span>
                <span className="font-semibold text-[#18221D]">{orderCompleted.customer.nombre} {orderCompleted.customer.apellidos} ({orderCompleted.customer.tipoDoc}: {orderCompleted.customer.numDoc})</span>
                <span className="text-[#65726B] block">WhatsApp: {orderCompleted.customer.telefono}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#65726B] block">Lugar de Entrega:</span>
                <span className="font-semibold text-[#18221D]">
                  {orderCompleted.customer.tipoEnvio === 'recojo'
                    ? '🏢 Recojo en Almacén Lince (Av. Julio C. Tello 438, Lince)'
                    : `🚚 ${orderCompleted.customer.direccion}, ${orderCompleted.customer.distrito}, ${orderCompleted.customer.departamento}`}
                </span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#123329] text-white font-bold text-xs hover:bg-[#1B4538] transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#C29B62]" />
              <span>Enviar Comprobante por WhatsApp</span>
            </button>

            <Link
              to="/productos"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#E2D9CC] bg-white text-xs font-bold text-[#18221D] hover:bg-[#F9F6F0] transition flex items-center justify-center gap-2"
            >
              <span>Seguir Comprando</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: STANDARD CHECKOUT VIEW
  return (
    <>
      <SEOHead 
        title="Finalizar Pedido & Checkout | Agujas Acupuntura Perú"
        description="Completa tu pedido de insumos de acupuntura, moxas y ventosas con envíos a Lima y todo el Perú. Pagos seguros mediante Yape y Transferencia BCP."
      />

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-[#EDE4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#65726B] font-medium" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#123329]">Inicio</Link>
            <ChevronRight className="w-3 h-3 text-[#A8B2AC]" />
            <Link to="/productos" className="hover:text-[#123329]">Catálogo</Link>
            <ChevronRight className="w-3 h-3 text-[#A8B2AC]" />
            <span className="text-[#123329] font-bold">Finalizar Compra</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        <div className="mb-6">
          <h1 className="font-serif-title text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123329]">
            Finalizar Pedido
          </h1>
          <p className="text-xs sm:text-sm text-[#65726B]">
            Completa tus datos para coordinar el envío de tus insumos profesionales.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#EDE4D6] p-12 text-center max-w-lg mx-auto my-12 shadow-xs">
            <ShoppingBag className="w-14 h-14 text-[#C29B62] mx-auto mb-4" />
            <h2 className="font-serif-title text-xl font-bold text-[#123329] mb-2">Tu carrito está vacío</h2>
            <p className="text-xs text-[#65726B] mb-6">
              Selecciona los insumos de acupuntura y terapias que necesitas para proceder con tu orden.
            </p>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#123329] text-white text-xs font-bold hover:bg-[#1B4538] transition shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explorar 155 Insumos</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: FORM (7 COLS) */}
            <form onSubmit={handleConfirmOrder} className="lg:col-span-7 space-y-6">
              
              {/* Anti-SPAM Honeypot Field (invisible to real users) */}
              <input 
                type="text" 
                name="website_trap" 
                value={formData.website_trap || ''} 
                onChange={handleChange} 
                className="hidden opacity-0 absolute -z-50 pointer-events-none" 
                tabIndex="-1" 
                autoComplete="off" 
              />
              
              {/* STEP 1: DATOS PERSONALES */}
              <div className="bg-white rounded-2xl border border-[#EDE4D6] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#EDE4D6]">
                  <div className="w-7 h-7 rounded-full bg-[#123329] text-[#EDE4D6] text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-[#18221D] uppercase tracking-wider">
                    Datos del Profesional / Comprador
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#18221D] mb-1">
                      Nombres <span className="text-[#D84A38]">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej. Dr. Carlos"
                      className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3.5 py-2.5 text-xs text-[#18221D] focus:outline-none focus:border-[#123329] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#18221D] mb-1">
                      Apellidos <span className="text-[#D84A38]">*</span>
                    </label>
                    <input
                      type="text"
                      name="apellidos"
                      required
                      value={formData.apellidos}
                      onChange={handleChange}
                      placeholder="Ej. Mendoza Vega"
                      className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3.5 py-2.5 text-xs text-[#18221D] focus:outline-none focus:border-[#123329] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#18221D] mb-1">
                      Tipo Doc.
                    </label>
                    <select
                      name="tipoDoc"
                      value={formData.tipoDoc}
                      onChange={handleChange}
                      className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3 py-2.5 text-xs text-[#18221D] focus:outline-none focus:border-[#123329]"
                    >
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                      <option value="CE">C. Extranjería</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#18221D] mb-1">
                      Nº Documento <span className="text-[#D84A38]">*</span>
                    </label>
                    <input
                      type="text"
                      name="numDoc"
                      required
                      value={formData.numDoc}
                      onChange={handleChange}
                      placeholder="Ej. 74839201"
                      className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3.5 py-2.5 text-xs text-[#18221D] focus:outline-none focus:border-[#123329] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#18221D] mb-1">
                    WhatsApp / Celular de Contacto <span className="text-[#D84A38]">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-[#E2D9CC] bg-[#EDE4D6]/50 text-xs font-bold text-[#123329]">
                      +51
                    </span>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="930 830 427"
                      className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-r-xl px-3.5 py-2.5 text-xs text-[#18221D] focus:outline-none focus:border-[#123329] focus:bg-white font-medium"
                    />
                  </div>
                </div>

                {/* COMPROBANTE DE PAGO */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#18221D] mb-2">
                    Tipo de Comprobante
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition ${formData.tipoComprobante === 'boleta' ? 'border-[#123329] bg-[#123329]/5 text-[#123329] font-bold' : 'border-[#E2D9CC] text-[#65726B]'}`}>
                      <input
                        type="radio"
                        name="tipoComprobante"
                        value="boleta"
                        checked={formData.tipoComprobante === 'boleta'}
                        onChange={handleChange}
                        className="accent-[#123329]"
                      />
                      <span className="text-xs">Boleta de Venta</span>
                    </label>

                    <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition ${formData.tipoComprobante === 'factura' ? 'border-[#123329] bg-[#123329]/5 text-[#123329] font-bold' : 'border-[#E2D9CC] text-[#65726B]'}`}>
                      <input
                        type="radio"
                        name="tipoComprobante"
                        value="factura"
                        checked={formData.tipoComprobante === 'factura'}
                        onChange={handleChange}
                        className="accent-[#123329]"
                      />
                      <span className="text-xs">Factura Electrónica</span>
                    </label>
                  </div>

                  {formData.tipoComprobante === 'factura' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 p-3.5 bg-[#F9F6F0] rounded-xl border border-[#EDE4D6]">
                      <div>
                        <label className="block text-[11px] font-bold text-[#18221D] mb-1">RUC de la Empresa *</label>
                        <input
                          type="text"
                          name="rucFactura"
                          required
                          value={formData.rucFactura}
                          onChange={handleChange}
                          placeholder="20XXXXXXXXX"
                          className="w-full bg-white border border-[#E2D9CC] rounded-lg px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#18221D] mb-1">Razón Social *</label>
                        <input
                          type="text"
                          name="razonSocial"
                          required
                          value={formData.razonSocial}
                          onChange={handleChange}
                          placeholder="Clínica / Centro Terapéutico SAC"
                          className="w-full bg-white border border-[#E2D9CC] rounded-lg px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 2: MÉTODO DE ENVÍO */}
              <div className="bg-white rounded-2xl border border-[#EDE4D6] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#EDE4D6]">
                  <div className="w-7 h-7 rounded-full bg-[#123329] text-[#EDE4D6] text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-sm font-bold text-[#18221D] uppercase tracking-wider">
                    Método y Dirección de Envío
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Option 1: Lima */}
                  <label className={`p-4 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition ${formData.tipoEnvio === 'lima' ? 'border-[#123329] bg-[#123329]/5' : 'border-[#E2D9CC]'}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="tipoEnvio"
                        value="lima"
                        checked={formData.tipoEnvio === 'lima'}
                        onChange={handleChange}
                        className="mt-1 accent-[#123329]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#123329]" />
                          <span className="text-xs font-bold text-[#18221D]">Envío a Domicilio (Lima y Callao)</span>
                        </div>
                        <p className="text-[11px] text-[#65726B] mt-0.5">Entrega rápida en 24 a 48 horas con courier especializado.</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#123329]">
                      {cartTotalPrice >= 150 ? <span className="text-[#2C7A62]">GRATIS</span> : 'S/ 10.00'}
                    </span>
                  </label>

                  {/* Option 2: Provincia */}
                  <label className={`p-4 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition ${formData.tipoEnvio === 'provincia' ? 'border-[#123329] bg-[#123329]/5' : 'border-[#E2D9CC]'}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="tipoEnvio"
                        value="provincia"
                        checked={formData.tipoEnvio === 'provincia'}
                        onChange={handleChange}
                        className="mt-1 accent-[#123329]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#123329]" />
                          <span className="text-xs font-bold text-[#18221D]">Envío a Provincias (Agencias Olva / Shalom / Marvisur)</span>
                        </div>
                        <p className="text-[11px] text-[#65726B] mt-0.5">Despacho seguro con clave de recojo y número de remito.</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#123329]">S/ 18.00</span>
                  </label>

                  {/* Option 3: Recojo */}
                  <label className={`p-4 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition ${formData.tipoEnvio === 'recojo' ? 'border-[#123329] bg-[#123329]/5' : 'border-[#E2D9CC]'}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="tipoEnvio"
                        value="recojo"
                        checked={formData.tipoEnvio === 'recojo'}
                        onChange={handleChange}
                        className="mt-1 accent-[#123329]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#123329]" />
                          <span className="text-xs font-bold text-[#18221D]">Recojo en Almacén Lince (Av. Julio C. Tello 438, Lince)</span>
                        </div>
                        <p className="text-[11px] text-[#65726B] mt-0.5">Lunes a Sábado de 9:00 am a 6:00 pm. Sin costo adicional.</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2C7A62]">GRATIS</span>
                  </label>
                </div>

                {/* Address fields if not pickup */}
                {formData.tipoEnvio !== 'recojo' && (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#18221D] mb-1">Departamento</label>
                        <select
                          name="departamento"
                          value={formData.departamento}
                          onChange={handleChange}
                          className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3 py-2 text-xs text-[#18221D]"
                        >
                          {DEPARTAMENTOS_PERU.map((dep) => (
                            <option key={dep} value={dep}>{dep}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#18221D] mb-1">Provincia</label>
                        <input
                          type="text"
                          name="provincia"
                          value={formData.provincia}
                          onChange={handleChange}
                          placeholder="Ej. Lima"
                          className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#18221D] mb-1">Distrito *</label>
                        <input
                          type="text"
                          name="distrito"
                          required
                          value={formData.distrito}
                          onChange={handleChange}
                          placeholder="Ej. Miraflores"
                          className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#18221D] mb-1">
                        Dirección Completa (Calle / Av. / Jr. / Número) *
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        required
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Ej. Av. Larco 1234, Dpto 402"
                        className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3.5 py-2.5 text-xs text-[#18221D] focus:outline-none focus:border-[#123329] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#18221D] mb-1">
                        Referencia de Entrega
                      </label>
                      <input
                        type="text"
                        name="referencia"
                        value={formData.referencia}
                        onChange={handleChange}
                        placeholder="Ej. Frente al parque, edificio color plomo"
                        className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3.5 py-2.5 text-xs text-[#18221D]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 3: MÉTODO DE PAGO */}
              <div className="bg-white rounded-2xl border border-[#EDE4D6] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#EDE4D6]">
                  <div className="w-7 h-7 rounded-full bg-[#123329] text-[#EDE4D6] text-xs font-bold flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-sm font-bold text-[#18221D] uppercase tracking-wider">
                    Método de Pago Seguro
                  </h3>
                </div>

                <div className="p-3.5 bg-[#EDE4D6]/50 rounded-xl border border-[#C29B62]/40 text-xs text-[#123329] flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#C29B62] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Pagos Directos y Seguros:</strong> No realizamos cobros automáticos con tarjeta en la web. Realiza tu abono mediante <strong>Yape o Transferencia Bancaria BCP</strong> y envíanos tu constancia por WhatsApp para el despacho inmediato de tus insumos.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option: Yape */}
                  <label className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition ${formData.metodoPago === 'yape' ? 'border-[#123329] bg-[#123329]/5 ring-1 ring-[#123329]' : 'border-[#E2D9CC]'}`}>
                    <input
                      type="radio"
                      name="metodoPago"
                      value="yape"
                      checked={formData.metodoPago === 'yape'}
                      onChange={handleChange}
                      className="accent-[#123329]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <YapeBadge className="h-5" />
                      </div>
                      <span className="text-[10.5px] text-[#65726B] font-mono font-bold">939 371 250</span>
                    </div>
                  </label>

                  {/* Option: Transferencia BCP */}
                  <label className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition ${formData.metodoPago === 'transferencia' ? 'border-[#123329] bg-[#123329]/5 ring-1 ring-[#123329]' : 'border-[#E2D9CC]'}`}>
                    <input
                      type="radio"
                      name="metodoPago"
                      value="transferencia"
                      checked={formData.metodoPago === 'transferencia'}
                      onChange={handleChange}
                      className="accent-[#123329]"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-[#18221D] block mb-1">Transferencia Bancaria</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        <BcpBadge className="h-4" />
                        <span className="text-[10px] text-[#65726B]">Soles</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* PAYMENT METHOD DETAILS */}
                {formData.metodoPago === 'yape' && (
                  <div className="p-4 bg-[#F9F6F0] rounded-xl border border-[#EDE4D6] flex flex-col sm:flex-row items-center gap-4 text-xs">
                    <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-[#EDE4D6] shadow-xs">
                      <YapeBadge className="h-8" />
                    </div>
                    <div className="space-y-1.5 text-center sm:text-left flex-1">
                      <span className="font-bold text-[#123329] block">Número oficial de Yape:</span>
                      <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                        <strong className="text-lg text-[#18221D] font-mono tracking-wider">939 371 250</strong>
                        <button
                          type="button"
                          onClick={() => handleCopy('939371250', 'yape')}
                          className="px-2.5 py-1 bg-white border border-[#E2D9CC] rounded-lg text-[10.5px] font-bold text-[#123329] hover:bg-[#EDE4D6] transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedAccount === 'yape' ? '¡Copiado!' : 'Copiar número'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-[#65726B]">
                        Titular: <strong>Instituto de terapias integrales Perú</strong>
                      </p>
                    </div>
                  </div>
                )}

                {formData.metodoPago === 'transferencia' && (
                  <div className="p-4 bg-[#F9F6F0] rounded-xl border border-[#EDE4D6] text-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-[#123329] block">Cuentas Bancarias Oficiales:</span>
                      <span className="text-[11px] text-[#65726B]">Titular: <strong>Instituto de terapias integrales Perú</strong></span>
                    </div>
                    
                    {/* BCP Soles */}
                    <div className="bg-white p-3.5 rounded-xl border border-[#123329]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-start sm:items-center gap-3">
                        <BcpBadge className="h-7 shrink-0 mt-0.5 sm:mt-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#18221D] text-sm">BCP Soles: 1932597886070</span>
                            <span className="text-[10px] bg-[#123329]/10 text-[#123329] font-bold px-2 py-0.5 rounded-full">Principal</span>
                          </div>
                          <span className="text-[11px] text-[#65726B] font-mono block mt-0.5">
                            CCI (Interbancario): <strong>00219300259788607015</strong>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleCopy('1932597886070', 'bcp')}
                          className="px-3 py-1.5 bg-[#F9F6F0] hover:bg-[#EDE4D6] border border-[#EDE4D6] rounded-lg text-[10.5px] font-bold text-[#123329] transition-colors cursor-pointer flex items-center justify-center gap-1"
                          title="Copiar número de cuenta BCP"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedAccount === 'bcp' ? '¡Copiado!' : 'Copiar Cta BCP'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy('00219300259788607015', 'cci')}
                          className="px-3 py-1.5 bg-[#123329] hover:bg-[#1B4538] text-white rounded-lg text-[10.5px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                          title="Copiar código interbancario CCI"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedAccount === 'cci' ? '¡CCI Copiado!' : 'Copiar CCI'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Transferencias desde otros bancos */}
                    <div className="bg-[#EDE4D6]/40 p-3 rounded-xl border border-[#EDE4D6] flex items-center gap-2.5 text-[11px] text-[#65726B]">
                      <ShieldCheck className="w-4 h-4 text-[#2C7A62] shrink-0" />
                      <span>
                        Usa el <strong>CCI: 00219300259788607015</strong> para transferencias desde cualquier banco a nombre de <strong>Instituto de terapias integrales Perú</strong>.
                      </span>
                    </div>
                  </div>
                )}

                {/* Número de operación opcional */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#18221D] mb-1">
                    Nº de Operación / Constancia (Opcional - Si ya realizaste la transferencia/Yape):
                  </label>
                  <input
                    type="text"
                    name="numeroOperacion"
                    value={formData.numeroOperacion}
                    onChange={handleChange}
                    placeholder="Ej. OP-49201 o número de referencia"
                    className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3.5 py-2.5 text-xs text-[#18221D]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#18221D] mb-1">
                    Notas adicionales del pedido / Instrucciones terapéuticas
                  </label>
                  <textarea
                    name="notas"
                    rows="2"
                    value={formData.notas}
                    onChange={handleChange}
                    placeholder="Ej. Entregar en horario de la tarde, timbre 402."
                    className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 px-6 rounded-full bg-[#123329] text-white font-bold text-sm hover:bg-[#1B4538] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Phone className="w-4 h-4 text-[#C29B62]" />
                  <span>{isSubmitting ? 'Procesando Pedido...' : `Confirmar y Enviar Pedido a WhatsApp (S/ ${finalTotal.toFixed(2)})`}</span>
                </button>
              </div>

            </form>

            {/* RIGHT COLUMN: ORDER SUMMARY (5 COLS) */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-[#EDE4D6] p-5 sm:p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EDE4D6]">
                  <h3 className="text-sm font-bold text-[#18221D] uppercase tracking-wider">
                    Resumen del Pedido ({cart.length})
                  </h3>
                  <Link to="/productos" className="text-xs font-semibold text-[#2C7A62] hover:underline">
                    Modificar
                  </Link>
                </div>

                {/* Items List */}
                <div className="max-h-72 overflow-y-auto divide-y divide-[#EDE4D6]/60 pr-1 space-y-3">
                  {cart.map((item) => {
                    const img = item.imagen || (item.imagenes && item.imagenes[0]) || '/LOGO.png';
                    return (
                      <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={img}
                            alt={item.nombre}
                            className="w-12 h-12 rounded-xl bg-[#F9F6F0] p-1 border border-[#EDE4D6] object-contain shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#18221D] truncate">{item.nombre}</h4>
                            <span className="text-[11px] text-[#65726B]">S/ {item.precio.toFixed(2)} c/u</span>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 rounded-md bg-[#F9F6F0] border border-[#E2D9CC] flex items-center justify-center hover:bg-gray-200"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-xs font-bold text-[#123329]">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 rounded-md bg-[#F9F6F0] border border-[#E2D9CC] flex items-center justify-center hover:bg-gray-200"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-[#18221D] block">
                            S/ {(item.precio * item.quantity).toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#D84A38] text-[10px] hover:underline inline-flex items-center gap-0.5 mt-1"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>Quitar</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* COUPON INPUT */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#C29B62] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Cupón (ej: ACUPUNTURA10)"
                        className="w-full bg-[#F9F6F0] border border-[#E2D9CC] rounded-xl pl-9 pr-3 py-2 text-xs uppercase font-mono font-bold focus:outline-none focus:border-[#123329]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#123329] text-white text-xs font-bold rounded-xl hover:bg-[#1B4538] transition cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-[#D84A38] mt-1">{couponError}</p>}
                  {appliedCoupon && (
                    <p className="text-[11px] text-[#2C7A62] font-bold mt-1.5 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.label}</span>
                    </p>
                  )}
                </form>

                {/* FINANCIAL BREAKDOWN */}
                <div className="pt-3 border-t border-[#EDE4D6] space-y-2 text-xs">
                  <div className="flex justify-between text-[#65726B]">
                    <span>Subtotal de productos</span>
                    <span className="font-semibold text-[#18221D]">S/ {cartTotalPrice.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#2C7A62] font-semibold">
                      <span>Descuento aplicado</span>
                      <span>- S/ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#65726B]">
                    <span>Costo de envío</span>
                    <span className="font-semibold text-[#18221D]">
                      {shippingCost === 0 ? <span className="text-[#2C7A62] font-bold">GRATIS</span> : `S/ ${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px] text-[#8C9690]">
                    <span>IGV (18%)</span>
                    <span>Incluido</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-[#EDE4D6]">
                    <span className="text-sm font-bold text-[#123329]">Total a Pagar</span>
                    <span className="text-xl font-extrabold text-[#D84A38]">
                      S/ {finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* TRUST BADGES */}
                <div className="p-3 bg-[#F9F6F0] rounded-xl border border-[#EDE4D6]/70 space-y-2 text-[11px] text-[#46534C]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2C7A62] shrink-0" />
                    <span>Compra protegida con certificado SSL y pagos encriptados.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#2C7A62] shrink-0" />
                    <span>Envíos con código de seguimiento nacional.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </>
  );
}

