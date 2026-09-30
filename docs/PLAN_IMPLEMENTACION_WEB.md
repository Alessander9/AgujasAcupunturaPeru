# 📋 Plan de Implementación y Optimización Integral — Agujas Acupuntura Perú
**Dominio:** `www.agujasacupunturaperu.com` | `agujas-acupuntura-peru.vercel.app`  
**Datos Oficiales:** WhatsApp +51 930 830 427 | Av. Julio C. Tello 438, Lince, Lima, Perú | Envíos Lima (24-48h) y Provincias (Shalom / Olva Courier / Marvisur)

---

## 🎯 Metodología de Trabajo por Cada Ítem
Para cada uno de los 20 ítems se seguirá estrictamente el ciclo:
1. **(a) Exploración previa:** Diagnóstico del código actual antes de cualquier cambio.
2. **(b) Ejecución del cambio:** Desarrollo, configuración o corrección.
3. **(c) Evidencia verificable:** Muestra de diffs, capturas, logs o respuestas HTTP reales.
4. **(d) Checklist del Cliente:** Lista clara de acciones externas que solo el usuario puede realizar (claves, registros, tokens, DNS, Search Console).

---

## 🗺️ Fases del Plan de Implementación (20 Ítems)

```mermaid
graph TD
    subgraph Fase 1: Legal, Seguridad y Servidor
        I1[1. Política de Privacidad Ley 29733] --> I2[2. Términos y Condiciones]
        I2 --> I3[3. Auditoría de APIs y Secretos .env]
        I3 --> I4[4. Redirección HTTPS y Configuración Dominio]
    end

    subgraph Fase 2: Privacidad, SEO On-Page y Metadatos
        I4 --> I5[5. Cookie Banner y Consent Mode]
        I5 --> I6[6. Metadescripciones y Titles Únicos]
        I6 --> I7[7. Open Graph y Twitter Cards]
        I7 --> I8[8. Favicons y Manifest PWA]
        I8 --> I9[9. Sitemap Dinámico y Robots.txt]
    end

    subgraph Fase 3: Performance, Accesibilidad y UX
        I9 --> I10[10. Atributos ALT Descriptivos]
        I10 --> I11[11. Compresión WebP y Lazy Loading]
        I11 --> I12[12. Auditoría Lighthouse y Core Web Vitals]
        I12 --> I13[13. Contraste de Color WCAG AA]
        I13 --> I14[14. Responsividad Móvil 375px/414px]
        I14 --> I15[15. Página 404 Personalizada]
    end

    subgraph Fase 4: Conversión, Seguridad de Formularios y Analítica
        I15 --> I16[16. Crawler de Enlaces Rotos]
        I16 --> I17[17. Validación Estricta de Formularios]
        I17 --> I18[18. Protección Anti-Spam Honeypot/reCAPTCHA]
        I18 --> I19[19. Integración GA4 y Eventos de E-commerce]
        I19 --> I20[20. CTA Unificado WhatsApp / Comprar]
    end
```

---

## 📝 Detalle de los 20 Ítems de Implementación

### FASE 1: Legal, Seguridad y Configuración de Servidor

#### 1. Política de Privacidad (Ley N.° 29733 de Protección de Datos Personales de Perú)
- **Alcance:** Creación de la página y ruta `/politica-privacidad`.
- **Contenido específico:**
  - Tratamiento de datos de clientes (Nombres, DNI, teléfono, dirección, comprobantes de pago Yape/Plin/BCP).
  - Finalidad: Gestión de pedidos, facturación, despacho y asesoría clínica.
  - Transferencia segura a agencias de courier (Shalom, Olva Courier, Marvisur) para la entrega.
  - Ejercicio de Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) vía WhatsApp (+51 930 830 427).
  - Enlace visible en el Footer global.
- **Acción usuario:** Revisión final de los datos de contacto y razón social.

#### 2. Términos y Condiciones
- **Alcance:** Creación de la página y ruta `/terminos-y-condiciones`.
- **Contenido específico:**
  - Proceso de compra directa vía web y confirmación por WhatsApp.
  - Medios de pago aceptados: Yape (939 371 250), Plin (930 830 427), BCP Cta 1932597886070, CCI 00219300259788607015 (Titular: Instituto de Terapias Integrales Perú).
  - Políticas de entrega: Lima 24-48 horas; provincias despacho diario vía Shalom/Olva/Marvisur.
  - Políticas de cambios y devoluciones para insumos médicos estériles y equipos.
  - Cláusula de deslinde de responsabilidad médica: los insumos y aceites no reemplazan diagnóstico ni tratamiento médico profesional.
  - Enlace en Footer global.
- **Acción usuario:** Confirmar políticas de cambios/garantías (ej. plazo de 7 días).

#### 3. Auditoría de APIs y Secretos
- **Alcance:**
  - Búsqueda recursiva en el repositorio de posibles credenciales hardcodeadas (OpenRouter, Groq, Mistral, Gemini, Cloudinary).
  - Centralización 100% en `.env` y variables de entorno de Vercel.
  - Verificación de exclusión estricta en `.gitignore` (`.env`, `.env.local`, `.env.*.local`, `*.jsonl`).
  - Reporte preventivo si se detectan credenciales commiteadas en el histórico para su rotación inmediata.
- **Acción usuario:** Rotar cualquier clave que haya estado en commits públicos previos si corresponde.

#### 4. Forzar HTTPS y Redirecciones 301
- **Alcance:**
  - Configuración de redirecciones 301 automáticas de `http://` a `https://` y de `agujasacupunturaperu.com` a `www.agujasacupunturaperu.com` (o viceversa) en `vercel.json`.
  - Verificación con `curl -I` para confirmar cabeceras `Location`, HSTS y código HTTP 301.
- **Acción usuario:** Si se usa dominio personalizado en Vercel, verificar la delegación de DNS (CNAME / A records).

---

### FASE 2: Privacidad, SEO On-Page y Metadatos

#### 5. Cookie Banner (Mobile-Friendly y Bloqueo de Scripts)
- **Alcance:**
  - Componente de consentimiento flotante no intrusivo y adaptable a móviles.
  - Persistencia de selección (Aceptar / Rechazar) en `localStorage`.
  - Integración de bloqueo condicional: ningún script de terceros (ej. GA4, píxeles) se ejecutará antes del consentimiento explícito del usuario.
- **Acción usuario:** Ninguna requerida.

#### 6. Metadescripciones y Títulos Únicos
- **Alcance:**
  - Tabla de mapeo completa: `Página / Categoría / Producto` → `<title>` (50-60 caracteres con "Perú / Lima") → `<meta name="description">` (140-160 caracteres con beneficio claro y CTA).
  - Integración dinámica en el componente Head/SEO para las 11 categorías y productos del catálogo.
- **Acción usuario:** Revisión y aprobación del tono en la tabla antes de inyección masiva.

#### 7. Web Preview Links (Open Graph y Twitter Cards)
- **Alcance:**
  - Inserción de `og:title`, `og:description`, `og:image`, `og:url`, `og:type` y `twitter:card` (`summary_large_image`).
  - Fallback a imagen corporativa oficial con resolución óptima (1200x630 px) para compartir en WhatsApp, Facebook, Instagram y Telegram.
- **Acción usuario:** Ninguna (se utiliza el catálogo / logo oficial).

#### 8. Favicons y Manifest PWA
- **Alcance:**
  - Verificación y generación de favicon en todos los tamaños estándar: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180x180), `icon-192.png`, `icon-512.png`.
  - Creación de `manifest.json` con `name`, `short_name`, `theme_color` (#10b981 / #065f46) y `background_color`.
- **Acción usuario:** Confirmar logo fuente de alta resolución.

#### 9. Sitemap Dinámico & Robots.txt
- **Alcance:**
  - Generador de `sitemap.xml` dinámico que incluya URLs canónicas de todas las vistas, categorías y los 159 productos activos.
  - Creación de `robots.txt` con directiva `Allow: /`, `Disallow: /admin/` (si aplica) y referencia a `Sitemap: https://www.agujasacupunturaperu.com/sitemap.xml`.
  - Guía paso a paso para indexación en Google Search Console.
- **Acción usuario:** Iniciar sesión en Google Search Console y enviar la URL del sitemap.

---

### FASE 3: Performance, Accesibilidad y UX

#### 10. Atributos ALT Descriptivos en Imágenes
- **Alcance:**
  - Recorrido y auditoría de todas las etiquetas `<img>` del sitio.
  - Inyección de atributos `alt` contextuales y específicos (ej. `"Agujas Koreanas K-Med caja x 500 unidades para acupuntura y punción seca"`).
- **Acción usuario:** Ninguna requerida.

#### 11. Compresión y Optimización de Imágenes
- **Alcance:**
  - Auditoría de pesos de imágenes (locales y Wix CDN).
  - Implementación de `loading="lazy"` y `decoding="async"` en todas las imágenes fuera del viewport inicial.
  - Conversión a WebP con calidad ~80% para imágenes locales.
  - Comparativa antes vs. después del peso total transferido.
- **Acción usuario:** Ninguna requerida.

#### 12. Velocidad de Carga y Reporte Lighthouse
- **Alcance:**
  - Análisis de rendimiento con Lighthouse en Home y Ficha de Producto.
  - Medición de métricas Core Web Vitals (LCP, FID/INP, CLS, FCP).
  - Aplicación de las 3 optimizaciones de mayor impacto (code-splitting, minificación, reducción de bloqueo de renderizado).
- **Acción usuario:** Ninguna requerida.

#### 13. Contraste de Colores (WCAG 2.1 AA)
- **Alcance:**
  - Auditoría de ratio de contraste en textos, botones, badges y enlaces contra fondos.
  - Corrección de cualquier combinación que no cumpla con 4.5:1 (texto normal) o 3:1 (texto grande / UI components).
- **Acción usuario:** Validar si se desea ajustar algún tono corporativo específico.

#### 14. Optimización y Pruebas en Viewports Móviles (375px / 414px)
- **Alcance:**
  - Pruebas en resoluciones móviles reales (iPhone SE 375px, iPhone 11/14 390-414px, Androids).
  - Verificación de Navbar móvil, FAB de WhatsApp, modales de producto, tablas de medidas y ausencia de overflow horizontal.
  - Capturas de verificación.
- **Acción usuario:** Verificación en su propio dispositivo móvil.

#### 15. Página 404 Personalizada y Código de Estado Real
- **Alcance:**
  - Página 404 con diseño amigable e intuitivo.
  - Enlaces directos a las categorías principales, buscador rápido y botón directo de asesoría por WhatsApp (+51 930 830 427).
  - Configuración en servidor para retornar código HTTP 404 real.
- **Acción usuario:** Ninguna requerida.

---

### FASE 4: Conversión, Seguridad de Formularios y Analítica

#### 16. Auditoría y Corrección de Enlaces Rotos
- **Alcance:**
  - Crawler exhaustivo de enlaces internos y externos (incluyendo enlaces a YouTube en fichas de producto).
  - Reporte de enlaces caídos o URLs inválidas para aprobación antes de corregir.
- **Acción usuario:** Decidir si enlaces a videos caídos se reemplazan o se eliminan.

#### 17. Validación Robusta de Formularios
- **Alcance:**
  - Validación cliente con feedback inmediato: nombres, celular peruano (9 dígitos empezando en 9), correo electrónico válido.
  - Validación estructurada en lógica de procesamiento con mensajes claros por campo.
- **Acción usuario:** Ninguna requerida.

#### 18. Protección Anti-SPAM (Honeypot + reCAPTCHA v3)
- **Alcance:**
  - Campo trampa Honeypot invisible para humanos que descarta envíos automatizados.
  - Configuración preparada para reCAPTCHA v3 invisible sin fricción para el usuario.
- **Acción usuario:** Proporcionar Site Key y Secret Key de Google reCAPTCHA v3 si se activa el servicio de Google.

#### 19. Google Analytics 4 & E-commerce Tracking
- **Alcance:**
  - Integración de GA4 condicionada al Cookie Consent (Consent Mode v2).
  - Eventos de comercio electrónico configurados: `view_item`, `select_item`, `add_to_cart` y conversión principal `click_whatsapp_compra`.
- **Acción usuario:** Crear la propiedad en Google Analytics y proporcionar el `Measurement ID` (`G-XXXXXXXXXX`).

#### 20. CTA Unificado y Claro (Above the Fold)
- **Alcance:**
  - Unificación visual y de posicionamiento de los llamados a la acción ("Comprar por WhatsApp", "Consultar Medidas") visibles sin necesidad de scroll en desktop y móvil.
  - Tono y color estandarizados en todas las categorías y detalles de producto.
- **Acción usuario:** Revisión estética final.

---

## 📊 Matriz de Control y Seguimiento

| # | Ítem | Estado | Qué falta de mi parte (Usuario) |
|---|---|:---:|---|
| **1** | Política de Privacidad (Ley 29733) | 🟢 Implementado | Revisar datos legales/razón social en `/politica-privacidad` |
| **2** | Términos y Condiciones | 🟢 Implementado | Confirmar política de cambios/garantías en `/terminos-y-condiciones` |
| **3** | API y Secretos (.env / .gitignore) | 🟢 Implementado | Rotar claves expuestas anteriormente si aplica |
| **4** | Forzar HTTPS & Redirects 301 | 🟢 Implementado | Verificar delegación DNS en Vercel |
| **5** | Cookie Banner & Consent Mode | 🟢 Implementado | Listo (consentimiento y almacenamiento activo) |
| **6** | Metadescripciones & Titles | 🟢 Implementado | Listo (componente `SEOHead` dinámico por vista) |
| **7** | Web Preview Link (OG & Twitter) | 🟢 Implementado | Listo (metadatos Open Graph y Twitter Cards activos) |
| **8** | Favicon & Manifest PWA | 🟢 Implementado | Listo (`manifest.json` y accesos vinculados) |
| **9** | Sitemap Dinámico & Robots.txt | 🟢 Implementado | Enviar `https://www.agujasacupunturaperu.com/sitemap.xml` a Search Console |
| **10** | Atributos ALT en Imágenes | 🟢 Implementado | Listo (textos alternativos contextuales) |
| **11** | Compresión de Imágenes (WebP/Lazy) | 🟢 Implementado | Listo (`loading="lazy"` y `decoding="async"`) |
| **12** | Velocidad de Carga (Lighthouse) | 🟢 Implementado | Listo (manual chunks y compilación optimizada en Vite) |
| **13** | Contraste de Colores (WCAG AA) | 🟢 Implementado | Validar si se desea ajustar algún tono |
| **14** | Web en Móvil (375px/414px) | 🟢 Implementado | Probar en móvil personal |
| **15** | Página 404 Personalizada | 🟢 Implementado | Listo (`/404` con buscador y enlaces directos) |
| **16** | Enlaces Rotos (Crawler & YouTube) | 🟢 Implementado | Listo (rutas actualizadas y validadas) |
| **17** | Validar Formularios | 🟢 Implementado | Listo (validación de celular peruano de 9 dígitos y DNI) |
| **18** | Protección SPAM (Honeypot/reCAPTCHA) | 🟢 Implementado | Proporcionar keys de reCAPTCHA v3 si se activa servicio Google |
| **19** | Analytics GA4 & Eventos | 🟢 Implementado | Proporcionar `Measurement ID` (`G-XXXXXXXXXX`) cuando esté disponible |
| **20** | CTA Claro y Unificado | 🟢 Implementado | Listo (botones y flujos directos a WhatsApp) |

