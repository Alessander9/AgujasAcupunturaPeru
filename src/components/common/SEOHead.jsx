import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'Agujas de Acupuntura en Perú | Insumos Médicos & Terapéuticos Certificados';
const DEFAULT_DESCRIPTION = 'Venta de agujas de acupuntura estériles, moxas, ventosas, semillas de auriculoterapia y aceites amazónicos en Lima y todo el Perú. Envíos 24-48h.';
const DEFAULT_IMAGE = 'https://www.agujasacupunturaperu.com/agujaslogoblanco1.png';
const BASE_URL = 'https://www.agujasacupunturaperu.com';

export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = 'website',
  canonicalUrl,
}) {
  const location = useLocation();
  const currentUrl = canonicalUrl || `${BASE_URL}${location.pathname}`;
  const fullTitle = title 
    ? (title.includes('Agujas') || title.includes('Perú') ? title : `${title} | Agujas Acupuntura Perú`)
    : DEFAULT_TITLE;

  useEffect(() => {
    // 1. Update document title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attributeName, attributeValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow');

    // 3. Open Graph / Facebook / WhatsApp
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:site_name', 'Agujas Acupuntura Perú');
    setMetaTag('property', 'og:locale', 'es_PE');

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 5. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

  }, [fullTitle, description, image, currentUrl, type]);

  return null;
}
