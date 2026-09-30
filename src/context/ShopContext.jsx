import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CheckCircle2, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/productsData';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aap_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state (vacío por defecto, sin productos falsos precargados)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aap_wishlist');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      // Limpiar datos demo de prueba antiguos (prod-150, prod-151, prod-152) si estaban guardados
      const isLegacyMock = Array.isArray(parsed) && 
        parsed.length === 3 && 
        parsed.includes('prod-150') && 
        parsed.includes('prod-151') && 
        parsed.includes('prod-152');
      if (isLegacyMock) {
        localStorage.removeItem('aap_wishlist');
        return [];
      }
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastData, setToastData] = useState(null);
  const [cartAnimTrigger, setCartAnimTrigger] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('aap_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aap_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const showToast = (data) => {
    setToastData(data);
    setTimeout(() => {
      setToastData(null);
    }, 3800);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });

    // Trigger cart icon pop animation
    setCartAnimTrigger(true);
    setTimeout(() => setCartAnimTrigger(false), 800);

    // Show animated toast with product info
    showToast({
      title: '¡Agregado al carrito!',
      name: product.nombre || product.name || 'Insumo terapéutico',
      image: product.imagen || (product.imagenes && product.imagenes[0]) || '/LOGO.png',
      price: product.precio,
      quantity
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleWishlist = (productId, productName = '') => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast({
          title: 'Favoritos actualizado',
          name: 'Producto removido de tu lista.',
          type: 'wishlist'
        });
        return prev.filter((id) => id !== productId);
      } else {
        showToast({
          title: '¡Guardado en favoritos! ❤️',
          name: productName || 'Producto agregado a tu lista de deseos.',
          type: 'wishlist'
        });
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const clearWishlist = () => {
    setWishlist([]);
    showToast({
      title: 'Favoritos vaciados',
      name: 'Se eliminaron todos los productos de tu lista.',
      type: 'wishlist'
    });
  };

  const wishlistProducts = useMemo(() => {
    return wishlist
      .map((id) => PRODUCTS_CATALOG.find((p) => p.id === id))
      .filter(Boolean);
  }, [wishlist]);

  const addAllWishlistToCart = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach((product) => {
      addToCart(product, 1);
    });
    showToast({
      title: '¡Favoritos agregados!',
      name: `${wishlistProducts.length} producto(s) añadidos al carrito.`,
      type: 'cart'
    });
  };

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => {
    const price = typeof item.precio === 'number' ? item.precio : parseFloat(String(item.precio).replace(/[^0-9.]/g, '')) || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotalCount,
        cartTotalPrice,
        wishlist,
        wishlistProducts,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
        addAllWishlistToCart,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        cartAnimTrigger
      }}
    >
      {children}

      {/* FLOATING TOAST NOTIFICATION WITH MICRO-ANIMATION */}
      {toastData && (
        <div className="fixed bottom-5 right-5 z-[9999] max-w-sm w-full bg-white rounded-2xl p-4 shadow-2xl border border-[#EDE4D6] animate-in slide-in-from-bottom-5 fade-in duration-300 flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3 min-w-0">
            {toastData.image ? (
              <div className="w-12 h-12 rounded-xl bg-[#F9F6F0] p-1 border border-[#EDE4D6] shrink-0 overflow-hidden flex items-center justify-center">
                <img src={toastData.image} alt={toastData.name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#123329]/10 text-[#123329] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-[#2C7A62]" />
              </div>
            )}
            <div className="min-w-0">
              <span className="text-[11px] font-extrabold text-[#2C7A62] uppercase tracking-wider block flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2C7A62]" />
                {toastData.title}
              </span>
              <h4 className="text-xs font-bold text-[#18221D] truncate mt-0.5">{toastData.name}</h4>
              {toastData.price && (
                <span className="text-xs font-black text-[#D84A38]">
                  S/ {typeof toastData.price === 'number' ? toastData.price.toFixed(2) : toastData.price}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                setToastData(null);
                setIsCartOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#123329] text-white text-[11px] font-bold hover:bg-[#1B4538] transition-colors shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span>Ver</span>
              <ArrowRight className="w-3 h-3 text-[#C29B62]" />
            </button>
            <button
              type="button"
              onClick={() => setToastData(null)}
              className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#8C9690] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
