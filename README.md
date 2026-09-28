# 🪡 Agujas Acupuntura Perú — Plataforma E-commerce & Asistente Clínico IA

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![GA4](https://img.shields.io/badge/Google_Analytics_4-Integrated-E37400?style=for-the-badge&logo=google-analytics&logoColor=white)](https://analytics.google.com/)
[![Ley 29733](https://img.shields.io/badge/Ley_29733-Perú_Compliant-123329?style=for-the-badge)](https://www.gob.pe/)

---

## 🏛️ 1. Descripción del Proyecto

**Agujas Acupuntura Perú** (`https://agujas-acupuntura-peru.vercel.app`) es una plataforma web de comercio electrónico de alta precisión desarrollada para el **Instituto de Terapias Integrales Perú**. Está especializada en el suministro de insumos médicos certificados, agujas de acupuntura estériles, conos y puros de moxibustión, ventosas terapéuticas, semillas de auriculoterapia y extractos amazónicos de la línea Amazoni-k en Lima y todo el territorio peruano.

---

## 🏗️ 2. Arquitectura Global del Sistema

```mermaid
flowchart TB
    subgraph CLIENT["🌐 Cliente Web (SPA - React 18 + Vite)"]
        UI["UI / Componentes (Tailwind v4 + GSAP + Lenis)"]
        Router["React Router DOM (10 Rutas + Catch-all 404)"]
        ShopCtx["ShopContext (Carrito, Wishlist, QuickView)"]
        ChatbotUI["Chatbot FAB (FloatingAssistantFAB)"]
        ConsentBar["PrivacyConsentBar (Consent Mode v2)"]
    end

    subgraph SERVERLESS["⚡ Vercel Edge / Serverless Gateway"]
        APIChat["POST /api/chat (Blindaje de API Keys)"]
    end

    subgraph AI_PROVIDERS["🧠 Cascada de Proveedores IA (LLM)"]
        P1["Groq (Llama 3.3 70B Versatile)"]
        P2["OpenRouter (Llama 3.3 Free Tier)"]
        P3["Mistral AI (Mistral Small)"]
        P4["Google Gemini (1.5 Flash)"]
        P5["RAG Determinístico Local (0ms Fallback)"]
    end

    subgraph SERVICES["📦 Servicios Externos & Almacenamiento"]
        GA4["Google Analytics 4 (ID: G-D949ZJGZ5Q)"]
        CDN["Cloudinary CDN (Formatos WebP/AVIF auto)"]
        WSP["WhatsApp API Oficial (wa.me)"]
    end

    UI --> Router
    Router --> ShopCtx
    ChatbotUI --> APIChat
    APIChat --> P1 --> P2 --> P3 --> P4
    P4 -.->|Fallo de red/cuota| P5
    ConsentBar --> GA4
    ShopCtx --> WSP
    UI --> CDN
```

---

## 🛒 3. Diagrama de Flujo de Usuario (E-commerce a WhatsApp)

```mermaid
sequenceDiagram
    autonumber
    actor Cliente as 👤 Terapeuta / Cliente
    participant Web as 🌐 Tienda Online
    participant Drawer as 🛍️ Carrito / Checkout
    participant GA as 📊 Google Analytics 4
    participant WSP as 📱 WhatsApp Directo (+51 930 830 427)

    Cliente->>Web: Explora catálogo (155+ productos) o consulta con IA
    Web->>GA: Evento view_item
    Cliente->>Web: Selecciona medidas / variantes y añade al carrito
    Web->>GA: Evento add_to_cart
    Cliente->>Drawer: Abre Carrito y procede al Checkout
    Cliente->>Drawer: Ingresa datos (DNI/RUC, Celular, Tipo de Envío)
    Drawer->>Drawer: Valida teléfono (9 dígitos) y Honeypot anti-spam
    Cliente->>Drawer: Clic en "Confirmar Pedido por WhatsApp"
    Drawer->>GA: Evento click_whatsapp_compra (Conversión)
    Drawer->>WSP: Redirección automática con mensaje formateado
    WSP-->>Cliente: Asesor oficial valida pago (Yape/BCP) y despacha 📦
```

---

## 🤖 4. Arquitectura del Asistente Clínico IA (RAG Cascada)

El chatbot interactivo implementa un pipeline de 5 fases para garantizar respuestas inmediatas, precisas y 100% fundamentadas en el catálogo de productos:

```mermaid
graph TD
    A["Entrada del Usuario"] --> B{"1. Clasificador de Intención<br/>(intent-router.js)"}
    B -->|Saludo / Despedida / Derivación| C["Respuesta Inmediata 0ms"]
    B -->|Consulta de Producto| D["2. Memoria Conversacional<br/>(conversation-memory.js)"]
    D --> E["3. Recuperación Híbrida RAG<br/>(retrieval.js + embeddings)"]
    E --> F["4. Inyección a System Prompt Grounded"]
    F --> G["5. Cascada Serverless: Groq -> OpenRouter -> Mistral -> Gemini"]
    G -->|Éxito| H["Salida formateada con precios S/ y botón WhatsApp"]
    G -->|Falla de proveedores| I["Generador RAG Local Determinístico"]
    I --> H
```

---

## 📱 5. Mapa de Rutas y Pantallas

| Ruta | Componente | Descripción |
| :--- | :--- | :--- |
| `/` | `HomePage.jsx` | Hero slider, categorías visuales, vitrina top 10, masterclasses y testimonios. |
| `/productos` | `ProductsPage.jsx` | Catálogo completo (155 productos) con filtros por categoría, marca, precio y buscador. |
| `/videos` | `VideosPage.jsx` | Galería de videos demostrativos de uso clínico de insumos. |
| `/aceites-amazonik` | `AmazonikPage.jsx` | Sección dedicada a aceites amazónicos 100% puros (Copaiba, Sangre de Grado, Palo Santo). |
| `/tutoriales` | `TutorialsPage.jsx` | Guías y artículos formativos para terapeutas y estudiantes. |
| `/sobre-nosotros` | `AboutUsPage.jsx` | Historia institucional, sede en Lince, mapa interactivo y libro de reclamaciones. |
| `/checkout` | `CheckoutPage.jsx` | Formulario de pago, selección de despacho (Lima/Provincia), cálculo de envío y cupones. |
| `/politica-privacidad`| `PrivacyPolicyPage.jsx`| Cumplimiento legal Ley N.° 29733 y ejercicio de Derechos ARCO. |
| `/terminos-y-condiciones`| `TermsPage.jsx`| Condiciones comerciales, garantías y políticas de devolución. |
| `*` | `NotFoundPage.jsx` | Error 404 personalizado con buscador integrado y accesos rápidos. |

---

## 💳 6. Medios de Pago Oficiales

Todas las transacciones se realizan directamente con las cuentas oficiales de la institución:

* **Titular Único:** `Instituto de terapias integrales Perú`
* **Yape:** `939 371 250`
* **Transferencia Bancaria BCP Soles:**
  * **Número de Cuenta:** `1932597886070`
  * **Código de Cuenta Interbancario (CCI):** `00219300259788607015`
* **Atención y Envíos WhatsApp:** `+51 930 830 427`

---

## 🔒 7. Seguridad, SEO y Cumplimiento Normativo

* **Blindaje Serverless de API Keys:** La carpeta `api/chat.js` aísla las claves de IA en el entorno backend de Vercel.
* **Seguridad HTTP:** Cabeceras HSTS pre-activadas (`max-age=63072000`), `X-Frame-Options: SAMEORIGIN` y `X-Content-Type-Options: nosniff`.
* **Google Consent Mode v2:** Cumplimiento estricto con la Ley N.° 29733 de Protección de Datos Personales del Perú mediante `PrivacyConsentBar.jsx`.
* **Sitemap Automatizado:** Script `scripts/generate-sitemap.js` genera `sitemap.xml` con 155 productos en cada compilación.
* **Anti-SPAM:** Trampa Honeypot invisible en Checkout que frena envíos masivos automatizados.

---

## 💻 8. Guía de Desarrollo Local

### Prerrequisitos
* Node.js v18 o superior
* npm v9 o superior

### Instalación
```bash
# 1. Clonar el repositorio
git clone https://github.com/Alessander9/AgujasAcupunturaPeru.git
cd AgujasAcupunturaPeru

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

### Variables de Entorno (`.env`)
```env
# Claves de IA para el Asistente Clínico
GROQ_API_KEY=tu_clave_de_groq
OPENROUTER_API_KEY=tu_clave_de_openrouter
GEMINI_API_KEY=tu_clave_de_gemini
MISTRAL_API_KEY=tu_clave_de_mistral

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=agujas-acupuntura-peru
```

### Construcción para Producción
```bash
# Genera el sitemap dinámico y compila el bundle optimizado
npm run build
```

---

## 🏢 9. Créditos y Titularidad

* **Entidad:** Instituto de Terapias Integrales Perú
* **Dirección:** Av. Julio César Tello 438, Lince 15046, Lima - Perú
* **Dominio Oficial:** [https://agujas-acupuntura-peru.vercel.app](https://agujas-acupuntura-peru.vercel.app)
* **Año:** 2026
