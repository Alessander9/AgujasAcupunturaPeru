import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Eye,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CLOUDINARY_PRESETS } from '../../lib/cloudinary';

export default function WishlistModal() {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlistProducts, 
    toggleWishlist, 
    clearWishlist, 
    addToCart, 
    addAllWishlistToCart,
    setQuickViewProduct 
  } = useShop();
  
  const navigate = useNavigate();

  if (!isWishlistOpen) return null;

  const handleOpenProductDetail = (product) => {
    setIsWishlistOpen(false);
    setQuickViewProduct(product);
  };

  const handleGoToCatalog = () => {
    setIsWishlistOpen(false);
    navigate('/productos');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer / Modal Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#EDE4D6] animate-in slide-in-from-right duration-300">
          
          {/* HEADER */}
          <div className="p-4 sm:p-5 border-b border-[#EDE4D6] flex items-center justify-between bg-[#F9F6F0]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E53935]/10 text-[#E53935] flex items-center justify-center border border-[#E53935]/20 shadow-xs">
                <Heart className="w-5 h-5 fill-[#E53935]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#123329]">Mis Favoritos</h3>
                  <span className="text-[11px] font-extrabold bg-[#123329] text-white px-2 py-0.5 rounded-full">
                    {wishlistProducts.length}
                  </span>
                </div>
                <p className="text-xs text-[#65726B]">
                  {wishlistProducts.length === 1 
                    ? '1 producto guardado' 
                    : `${wishlistProducts.length} productos guardados`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-8 h-8 rounded-full bg-white border border-[#EDE4D6] flex items-center justify-center text-[#65726B] hover:text-[#123329] hover:border-[#123329] transition-colors cursor-pointer"
              aria-label="Cerrar favoritos"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* LIST / BODY */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 custom-scrollbar">
            {wishlistProducts.length === 0 ? (
              /* EMPTY STATE */
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#F9F6F0] text-[#E53935] flex items-center justify-center mx-auto border-2 border-dashed border-[#EDE4D6] relative">
                  <Heart className="w-9 h-9 text-[#C2D1C9]" />
                  <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#C29B62] text-white flex items-center justify-center text-xs shadow-md font-bold">
                    +
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#123329]">Tu lista de favoritos está vacía</h4>
                  <p className="text-xs text-[#65726B] max-w-xs mx-auto leading-relaxed">
                    Guarda tus agujas, ventosas, moxas y equipos favoritos para revisarlos y comprarlos cuando desees.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGoToCatalog}
                  className="inline-flex items-center gap-2 bg-[#123329] hover:bg-[#1B4538] text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-103 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C29B62]" />
                  <span>Explorar Catálogo de Productos</span>
                </button>
              </div>
            ) : (
              /* PRODUCTS LIST */
              wishlistProducts.map((product) => {
                const rawImg = product.imagen || (product.imagenes && product.imagenes[0]) || '/LOGO.png';
                const img = CLOUDINARY_PRESETS?.thumbnail ? CLOUDINARY_PRESETS.thumbnail(rawImg) : (CLOUDINARY_PRESETS?.cardGrid ? CLOUDINARY_PRESETS.cardGrid(rawImg) : rawImg);
                const price = typeof product.precio === 'number' 
                  ? product.precio 
                  : parseFloat(String(product.precio).replace(/[^0-9.]/g, '')) || 0;
                
                const isOutOfStock = product.enStock === false;

                return (
                  <div
                    key={product.id}
                    className="p-3 rounded-2xl border border-[#EDE4D6] bg-[#FDFBF7] hover:bg-white hover:border-[#123329]/30 hover:shadow-md transition-all duration-200 flex flex-col gap-2.5 group relative"
                  >
                    <div className="flex items-start gap-3">
                      {/* Product Thumbnail */}
                      <div 
                        onClick={() => handleOpenProductDetail(product)}
                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl bg-white border border-[#EDE4D6] p-1.5 shrink-0 overflow-hidden flex items-center justify-center cursor-pointer relative"
                      >
                        <img
                          src={img}
                          alt={product.nombre}
                          onError={(e) => { e.target.src = rawImg; }}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
                          loading="lazy"
                        />
                        {product.badge && (
                          <span className="absolute top-1 left-1 bg-[#123329] text-[#EDE4D6] text-[8px] font-black px-1.5 py-0.2 rounded shadow-xs">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C29B62] block truncate">
                            {product.categoria}
                          </span>
                          
                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id, product.nombre)}
                            className="text-[#8C9690] hover:text-[#E53935] p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="Quitar de favoritos"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4 
                          onClick={() => handleOpenProductDetail(product)}
                          className="text-xs font-bold text-[#18221D] group-hover:text-[#123329] truncate leading-tight mt-0.5 cursor-pointer"
                        >
                          {product.nombre}
                        </h4>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex text-[#C29B62]">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-2.5 h-2.5 ${i < Math.floor(product.rating || 5) ? 'fill-[#C29B62]' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-[#8C9690]">
                            ({product.reviewsCount || 12})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-sm font-black text-[#123329]">
                            S/ {price.toFixed(2)}
                          </span>
                          {product.precioOriginal && (
                            <span className="text-[11px] text-[#8C9690] line-through">
                              {typeof product.precioOriginal === 'string' && product.precioOriginal.startsWith('S/')
                                ? product.precioOriginal
                                : `S/ ${parseFloat(String(product.precioOriginal).replace(/[^0-9.]/g, '') || 0).toFixed(2)}`}
                            </span>
                          )}
                          {isOutOfStock && (
                            <span className="text-[9.5px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              Agotado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions Row */}
                    <div className="flex items-center gap-2 pt-1 border-t border-[#EDE4D6]/60">
                      <button
                        type="button"
                        onClick={() => addToCart(product, 1)}
                        disabled={isOutOfStock}
                        className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                          isOutOfStock
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#123329] hover:bg-[#1B4538] text-white'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-[#EDE4D6]" />
                        <span>Agregar al Carrito</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenProductDetail(product)}
                        className="py-1.5 px-3 rounded-xl border border-[#EDE4D6] hover:border-[#123329] text-[11px] font-bold text-[#18221D] hover:bg-[#F9F6F0] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-[#65726B]" />
                        <span>Ver</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* FOOTER ACTIONS */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EDE4D6] bg-[#F9F6F0] space-y-2.5">
              <button
                type="button"
                onClick={addAllWishlistToCart}
                className="w-full py-3 px-4 rounded-full bg-[#123329] hover:bg-[#1B4538] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#123329]/15 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-[#C29B62]" />
                <span>Agregar todos al Carrito ({wishlistProducts.length})</span>
              </button>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="text-xs text-[#C8102E] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Vaciar favoritos</span>
                </button>

                <button
                  type="button"
                  onClick={handleGoToCatalog}
                  className="text-xs text-[#123329] font-bold hover:text-[#C29B62] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Seguir explorando</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
