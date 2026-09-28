/**
 * Google Analytics 4 & E-commerce Tracking Helper
 * Integrates with Cookie Consent Mode (Ley 29733)
 */

export const isAnalyticsConsentGranted = () => {
  try {
    const status = localStorage.getItem('site_privacy_consent') || localStorage.getItem('cookie_consent_status');
    return status === 'accepted';
  } catch (e) {
    return false;
  }
};

/**
 * Safe generic event tracker
 */
export const trackEvent = (eventName, params = {}) => {
  if (!isAnalyticsConsentGranted() && !params.force) {
    // Analytics storage denied or pending
    return;
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else if (process.env.NODE_ENV === 'development') {
    console.debug(`[GA4 Event] ${eventName}:`, params);
  }
};

/**
 * E-commerce: View Item (Product Modal / Quick View / Product Page)
 */
export const trackViewItem = (product) => {
  if (!product) return;
  trackEvent('view_item', {
    currency: 'PEN',
    value: Number(product.precio) || 0,
    items: [
      {
        item_id: product.id?.toString() || product.slug || '',
        item_name: product.nombre || product.title || '',
        item_category: product.categoria || product.category || 'Acupuntura',
        price: Number(product.precio) || 0,
        quantity: 1,
      },
    ],
  });
};

/**
 * E-commerce: Add To Cart
 */
export const trackAddToCart = (product, quantity = 1, selectedMeasure = null) => {
  if (!product) return;
  trackEvent('add_to_cart', {
    currency: 'PEN',
    value: (Number(product.precio) || 0) * quantity,
    items: [
      {
        item_id: product.id?.toString() || product.slug || '',
        item_name: product.nombre || product.title || '',
        item_category: product.categoria || product.category || 'Acupuntura',
        item_variant: selectedMeasure || '',
        price: Number(product.precio) || 0,
        quantity: quantity,
      },
    ],
  });
};

/**
 * E-commerce: WhatsApp Purchase CTA Click (Key Conversion Event)
 */
export const trackWhatsAppPurchase = (cartItems = [], totalAmount = 0, source = 'checkout') => {
  trackEvent('click_whatsapp_compra', {
    currency: 'PEN',
    value: totalAmount,
    source: source,
    items_count: cartItems.length,
    items: cartItems.map((item) => ({
      item_id: item.id?.toString() || item.slug || '',
      item_name: item.nombre || item.title || '',
      item_category: item.categoria || item.category || 'Acupuntura',
      price: Number(item.precio) || 0,
      quantity: item.cantidad || item.quantity || 1,
    })),
  });
};
