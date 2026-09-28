import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { YapeBadge, BcpBadge } from '../common/PaymentLogos';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotalPrice, cartTotalCount } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 200;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotalPrice);
  const freeShippingProgress = Math.min(100, (cartTotalPrice / freeShippingThreshold) * 100);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let text = `*NUEVO PEDIDO - AGUJAS ACUPUNTURA PERÚ*\n\n`;
    cart.forEach((item, i) => {
      text += `${i + 1}. *${item.nombre || item.name}*\n`;
      text += `   Cantidad: ${item.quantity} | Subtotal: S/ ${(item.precio * item.quantity).toFixed(2)}\n`;
    });
    text += `\n*TOTAL A PAGAR: S/ ${cartTotalPrice.toFixed(2)}*\n\n`;
    text += `Deseo coordinar la entrega y realizar el pago (Yape 939 371 250 / BCP 1932597886070). Gracias.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/51930830427?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EDE4D6]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EDE4D6] flex items-center justify-between bg-[#F9F6F0]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#123329] text-white flex items-center justify-center">
                <ShoppingBag className="w-4.5 h-4.5 text-[#EDE4D6]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#123329]">Tu Carrito</h3>
                <p className="text-xs text-[#65726B]">{cartTotalCount} producto(s) seleccionado(s)</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-white border border-[#EDE4D6] flex items-center justify-center text-[#65726B] hover:text-[#123329] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#123329] text-[#EDE4D6] text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C29B62]" />
                {remainingForFreeShipping === 0 ? (
                  <strong className="text-[#C29B62]">¡Felicidades! Tienes Envío Gratis</strong>
                ) : (
                  <span>Agrega <strong>S/ {remainingForFreeShipping.toFixed(2)}</strong> para Envío Gratis</span>
                )}
              </span>
              <span className="text-[10px] text-[#EDE4D6]/70">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#C29B62] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F9F6F0] text-[#65726B] flex items-center justify-center mx-auto border border-[#EDE4D6]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-[#123329]">Tu carrito está vacío</h4>
                <p className="text-xs text-[#65726B] max-w-xs mx-auto">
                  Explora nuestro catálogo con más de 155 insumos clínicos para acupuntura y medicina tradicional.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 bg-[#123329] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#1B4538] transition"
                >
                  Ver Productos
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border border-[#EDE4D6] bg-[#F9F6F0]/60"
                >
                  <img
                    src={item.imagen || (item.imagenes && item.imagenes[0]) || 'https://static.wixstatic.com/media/3c52e9_f88f872c49404deea019412629bdde2a~mv2.png'}
                    alt={item.nombre}
                    className="w-16 h-16 rounded-xl object-contain bg-white p-1 border border-[#EDE4D6]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#18221D] truncate leading-tight">
                      {item.nombre || item.name}
                    </h4>
                    <p className="text-[11px] text-[#65726B] mt-0.5">
                      S/ {Number(item.precio).toFixed(2)} c/u
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#EDE4D6] rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-[#65726B] hover:text-[#123329]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2 text-[#123329]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-[#65726B] hover:text-[#123329]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-black text-[#123329]">
                        S/ {(Number(item.precio) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-[#65726B] hover:text-[#D84A38] transition-colors"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EDE4D6] bg-[#F9F6F0] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#65726B]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#18221D]">S/ {cartTotalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#65726B]">
                <span>Envío estimado</span>
                <span className="font-semibold text-[#2C7A62]">
                  {remainingForFreeShipping === 0 ? 'GRATIS' : 'Calculado en checkout'}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-black text-[#123329] pt-2 border-t border-[#EDE4D6]">
                <span>Total a Pagar</span>
                <span>S/ {cartTotalPrice.toFixed(2)}</span>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3.5 px-4 rounded-full bg-[#123329] hover:bg-[#1B4538] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#123329]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>Finalizar Compra / Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#C29B62]" />
                </button>

                <button
                  type="button"
                  onClick={handleCheckoutWhatsApp}
                  className="w-full py-2.5 px-4 rounded-full bg-white border border-[#2C7A62] text-[#2C7A62] hover:bg-[#2C7A62] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Pedir directo por WhatsApp</span>
                </button>
              </div>

              {/* Payment Methods Trust Box */}
              <div className="bg-white rounded-2xl border border-[#EDE4D6] p-2.5 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold text-[#123329] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2C7A62]" />
                    <span>Pagos Seguros Oficiales</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <YapeBadge className="h-4.5" />
                    <BcpBadge className="h-4" />
                  </div>
                </div>
                <div className="text-[10px] text-[#65726B] leading-tight space-y-0.5">
                  <p>• <strong>Yape: 939 371 250</strong> <span className="text-[9px] text-[#8C9690]">(solo Yape)</span></p>
                  <p>• <strong>BCP: 1932597886070</strong> | CCI: <strong>00219300259788607015</strong></p>
                  <p className="text-[9.5px] text-[#123329] font-medium pt-0.5 border-t border-[#EDE4D6]/50">
                    Titular: <strong>Instituto de terapias integrales Perú</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
