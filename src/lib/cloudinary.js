/**
 * Cloudinary Image Delivery & Optimization Engine
 * Agujas Acupuntura Perú
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || '';

/**
 * Generates an optimized Cloudinary delivery URL with automatic format (WebP/AVIF) and compression
 * 
 * @param {string} sourceUrl - Image URL (remote Wix/Unsplash or local)
 * @param {object} options - Transformation options { width, height, crop, quality, format }
 * @returns {string} - Optimized Cloudinary URL or safe fallback
 */
export function getCloudinaryUrl(sourceUrl, options = {}) {
  if (!sourceUrl || typeof sourceUrl !== 'string') {
    return '/LOGO.png';
  }

  // If local relative asset (e.g. /LOGO.png or /logoblanco.png), return directly
  if (sourceUrl.startsWith('/') && !sourceUrl.startsWith('//')) {
    return sourceUrl;
  }

  const {
    width,
    height,
    crop = 'limit', // 'limit' | 'fill' | 'fit' | 'pad' | 'thumb'
    quality = 'auto', // 'auto' | 'auto:good' | 'auto:best' | 'auto:eco'
    format = 'auto', // 'auto' converts automatically to WebP or AVIF
    dpr = 'auto',
    gravity = 'center'
  } = options;

  // Build Cloudinary transformation parameters string
  const transforms = [];

  if (format) transforms.push(`f_${format}`);
  if (quality) transforms.push(`q_${quality}`);
  if (dpr) transforms.push(`dpr_${dpr}`);
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  if (gravity && crop !== 'limit') transforms.push(`g_${gravity}`);

  const transformString = transforms.join(',');

  // Case 1: Already a Cloudinary URL
  if (sourceUrl.includes('res.cloudinary.com')) {
    const uploadIndex = sourceUrl.indexOf('/upload/');
    if (uploadIndex !== -1) {
      const prefix = sourceUrl.substring(0, uploadIndex + 8);
      const suffix = sourceUrl.substring(uploadIndex + 8);
      // Avoid stacking duplicate transforms
      if (suffix.startsWith('f_') || suffix.startsWith('w_') || suffix.startsWith('q_')) {
        const nextSlash = suffix.indexOf('/');
        return `${prefix}${transformString}/${suffix.substring(nextSlash + 1)}`;
      }
      return `${prefix}${transformString}/${suffix}`;
    }
    return sourceUrl;
  }

  // Case 2: Remote external image URL (e.g. Wix static images or Unsplash)
  // Deliver via Cloudinary Fetch API if CLOUD_NAME is configured
  if (CLOUD_NAME && (sourceUrl.startsWith('http://') || sourceUrl.startsWith('https://'))) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transformString}/${encodeURI(sourceUrl)}`;
  }

  return sourceUrl;
}

/**
 * Predefined optimization presets for standard UI components
 */
export const CLOUDINARY_PRESETS = {
  // Product card in grid (450x450, crisp & fast)
  cardGrid: (url) => getCloudinaryUrl(url, { width: 450, height: 450, crop: 'limit', quality: 'auto:good' }),
  catalogCard: (url) => getCloudinaryUrl(url, { width: 450, height: 450, crop: 'limit', quality: 'auto:good' }),
  
  // High-res modal / detail view
  modalDetail: (url) => getCloudinaryUrl(url, { width: 800, height: 800, crop: 'limit', quality: 'auto:best' }),
  
  // Compact list thumbnail (120x120)
  thumbnail: (url) => getCloudinaryUrl(url, { width: 140, height: 140, crop: 'fill', quality: 'auto' }),
  
  // Cart & Search dropdown thumbnail (80x80)
  miniThumb: (url) => getCloudinaryUrl(url, { width: 80, height: 80, crop: 'fill', quality: 'auto' }),
  
  // Hero banner background
  heroBanner: (url) => getCloudinaryUrl(url, { width: 1600, crop: 'limit', quality: 'auto:good' })
};

export default {
  getCloudinaryUrl,
  CLOUDINARY_PRESETS,
  CLOUD_NAME,
  API_KEY
};
