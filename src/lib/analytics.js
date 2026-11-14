/**
 * Unified Analytics & Observability Helper
 * Integrates:
 * 1. Google Analytics 4 (GA4) with Google Consent Mode v2 (Ley N.° 29733 de Perú)
 * 2. Cloudflare Web Analytics (SPA mode & Cloudflare Insights)
 */

export const GA_MEASUREMENT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
  'G-D949ZJGZ5Q';

export const CLOUDFLARE_ANALYTICS_TOKEN =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDFLARE_ANALYTICS_TOKEN) ||
  '';

/**
 * Check if user consented to analytics tracking according to Ley 29733
 */
export const isAnalyticsConsentGranted = () => {
  if (typeof window === 'undefined') return false;
  try {
    const status =
      localStorage.getItem('site_privacy_consent') ||
      localStorage.getItem('cookie_consent_status');
    return status === 'accepted' || status === 'granted';
  } catch (e) {
    return false;
  }
};

/**
 * Initialize Cloudflare Web Analytics & GA4 runtime
 */
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  // 1. Initialize Cloudflare Web Analytics if token is provided and not already present
  if (CLOUDFLARE_ANALYTICS_TOKEN && !document.querySelector('script[src*="cloudflareinsights"]')) {
    try {
      const cfScript = document.createElement('script');
      cfScript.defer = true;
      cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      cfScript.setAttribute(
        'data-cf-beacon',
        JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN, spa: true })
      );
      document.head.appendChild(cfScript);
      if (import.meta.env.DEV) {
        console.debug('[Cloudflare Analytics] Beacon dynamically initialized.');
      }
    } catch (err) {
      console.warn('[Cloudflare Analytics] Init error:', err);
    }
  }

  // 2. Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];
};

/**
 * Safe generic event tracker
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return;

  // Ley 29733 check: allow if consent granted OR explicitly forced
  if (!isAnalyticsConsentGranted() && !params.force) {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else if (import.meta.env?.DEV) {
    console.debug(`[GA4 Event] ${eventName}:`, params);
  }
};

/**
 * Virtual Page View Tracker for Single Page Applications (SPA)
 * Called whenever React Router changes routes
 */
export const trackPageView = (path, title = '') => {
  if (typeof window === 'undefined') return;

  const currentPath = path || window.location.pathname + window.location.search;
  const currentTitle = title || document.title;
  const currentUrl = window.location.href;

  // 1. Google Analytics 4 virtual page_view
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: currentTitle,
      page_location: currentUrl,
      page_path: currentPath,
      send_to: GA_MEASUREMENT_ID,
    });
  }

  // 2. Cloudflare Web Analytics SPA notification (if available)
  if (window.__cfBeacon && typeof window.__cfBeacon.sendPageview === 'function') {
    try {
      window.__cfBeacon.sendPageview();
    } catch (e) {
      // Ignore if beacon handles history changes automatically
    }
  }

  if (import.meta.env?.DEV) {
    console.debug(`[Analytics PageView] ${currentPath} ("${currentTitle}")`);
  }
};

/**
 * E-commerce: View Item (Product Modal / Quick View / Product Detail)
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
  const itemPrice = typeof product.precio === 'number'
    ? product.precio
    : parseFloat(String(product.precio).replace(/[^0-9.]/g, '')) || 0;

  trackEvent('add_to_cart', {
    currency: 'PEN',
    value: itemPrice * quantity,
    items: [
      {
        item_id: product.id?.toString() || product.slug || '',
        item_name: product.nombre || product.title || '',
        item_category: product.categoria || product.category || 'Acupuntura',
        item_variant: selectedMeasure || '',
        price: itemPrice,
        quantity: quantity,
      },
    ],
  });
};

/**
 * E-commerce: Remove From Cart
 */
export const trackRemoveFromCart = (product) => {
  if (!product) return;
  const itemPrice = typeof product.precio === 'number'
    ? product.precio
    : parseFloat(String(product.precio).replace(/[^0-9.]/g, '')) || 0;

  trackEvent('remove_from_cart', {
    currency: 'PEN',
    value: itemPrice * (product.quantity || 1),
    items: [
      {
        item_id: product.id?.toString() || '',
        item_name: product.nombre || '',
        price: itemPrice,
        quantity: product.quantity || 1,
      },
    ],
  });
};

/**
 * E-commerce: Add to Wishlist / Favoritos
 */
export const trackAddToWishlist = (product) => {
  if (!product) return;
  trackEvent('add_to_wishlist', {
    currency: 'PEN',
    value: Number(product.precio) || 0,
    items: [
      {
        item_id: product.id?.toString() || '',
        item_name: product.nombre || '',
        item_category: product.categoria || 'Acupuntura',
      },
    ],
  });
};

/**
 * E-commerce: Begin Checkout
 */
export const trackBeginCheckout = (cartItems = [], totalAmount = 0) => {
  trackEvent('begin_checkout', {
    currency: 'PEN',
    value: totalAmount,
    items: cartItems.map((item) => ({
      item_id: item.id?.toString() || '',
      item_name: item.nombre || '',
      price: Number(item.precio) || 0,
      quantity: item.cantidad || item.quantity || 1,
    })),
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

/**
 * User Interaction: Catalog Search
 */
export const trackSearch = (query, resultsCount = 0) => {
  if (!query || !query.trim()) return;
  trackEvent('search', {
    search_term: query.trim(),
    results_count: resultsCount,
  });
};

/**
 * User Interaction: Contact Channel Click
 */
export const trackContactClick = (channel = 'whatsapp', details = {}) => {
  trackEvent('contact_click', {
    channel: channel,
    ...details,
  });
};
