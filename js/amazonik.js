/**
 * Amazoni-k Exclusive Oils Data & Logic
 */

const AMAZONIK_PRODUCTS = [
  {
    id: "copaiba-pura",
    title: "Aceite Puro de Copaiba Amazónica",
    subtitle: "Bálsamo antiinflamatorio, cicatrizante y analgésico",
    category: "dolor",
    categoryLabel: "Alivio del Dolor & Masajes",
    badge: "100% Puro Silvestre",
    badgeColor: "emerald",
    rating: 5,
    reviews: 38,
    price: "S/ 38.00",
    presentation: "Frasco gotero 30ml",
    origin: "Selva Central / Madre de Dios, Perú",
    extraction: "Resina pura extraída mediante técnica tradicional de sangrado",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
    description: "El aceite-resina de Copaiba es uno de los antiinflamatorios y cicatrizantes naturales más potentes del planeta. Utilizado tradicionalmente en medicina amazónica y terapias de acupuntura para aliviar dolores articulares, lumbalgias, contracturas y afecciones dérmicas.",
    benefits: [
      "Potente antiinflamatorio y calmante muscular",
      "Alivio eficaz en dolores articulares, reumatismo y lumbalgia",
      "Acelera la regeneración celular y cicatrización",
      "Ideal para potenciar puntos de acupuntura y moxibustión"
    ],
    howToUse: "Aplicar 3 a 5 gotas directamente sobre la zona afectada o punto de acupuntura y masajear en círculos hasta su absorción. Para uso dérmico, puede diluirse en aceite portador."
  },
  {
    id: "sangre-grado",
    title: "Sangre de Grado 100% Pura (Croton lechleri)",
    subtitle: "Regenerador dérmico y cicatrizante supremo",
    category: "facial",
    categoryLabel: "Cuidado Facial & Dérmico",
    badge: "Grado Terapéutico",
    badgeColor: "emerald",
    rating: 5,
    reviews: 52,
    price: "S/ 35.00",
    presentation: "Frasco gotero 30ml",
    origin: "Ucayali, Perú",
    extraction: "Látex natural puro de la corteza del árbol de Croton lechleri",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
    description: "Auténtica Sangre de Grado amazónica de máxima pureza. Forma una capa protectora natural que estimula la síntesis de colágeno, combate bacterias y regenera tejidos dañados con rapidez.",
    benefits: [
      "Poderosa acción cicatrizante y reepitelizante",
      "Antiséptico natural y protector cutáneo",
      "Estimula la producción de colágeno y elastina",
      "Excelente en post-tratamientos de acupuntura estética y dermapen"
    ],
    howToUse: "Aplicar 2 a 4 gotas sobre la piel limpia y extender suavemente hasta formar una película protectora blanquecina natural."
  },
  {
    id: "palo-santo",
    title: "Aceite Esencial de Palo Santo (Bursera graveolens)",
    subtitle: "Armonización energética, antiestrés y calma mental",
    category: "aromaterapia",
    categoryLabel: "Aromaterapia & Relajación",
    badge: "Recolecta Sostenible",
    badgeColor: "gold",
    rating: 5,
    reviews: 44,
    price: "S/ 48.00",
    presentation: "Frasco ámbar 10ml con gotero",
    origin: "Bosque Seco del Norte del Perú",
    extraction: "Destilación al vapor de madera caída y curada naturalmente",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
    description: "Destilado de madera de Palo Santo 100% silvestre y sostenible. Su aroma dulce, amaderado y cítrico purifica el ambiente, calma la mente (Shen) y promueve un estado de meditación y serenidad profundo.",
    benefits: [
      "Disminuye el estrés, la ansiedad y la tensión emocional",
      "Purifica la energía del consultorio y espacio de terapia",
      "Favorece la respiración profunda y el descanso",
      "Alivia dolores de cabeza y migrañas por tensión"
    ],
    howToUse: "Difusión: 4 a 6 gotas en difusor ultrasónico. Tópico: 1 gota en muñecas y sienes diluida con aceite portador para inhalación consciente."
  },
  {
    id: "aguaje-rosa-mosqueta",
    title: "Aceite Facial Bio-Regenerador de Aguaje & Rosa Mosqueta",
    subtitle: "Nutrición antiedad con alta concentración de provitamina A",
    category: "facial",
    categoryLabel: "Cuidado Facial & Dérmico",
    badge: "Fórmula Exclusiva",
    badgeColor: "gold",
    rating: 5,
    reviews: 29,
    price: "S/ 45.00",
    presentation: "Frasco gotero 30ml",
    origin: "Loreto / Andes Centrales",
    extraction: "Prensado en frío virgen de pulpa de aguaje y semillas de rosa mosqueta",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
    description: "El fruto de Aguaje posee hasta 5 veces más betacarotenos que la zanahoria. Combinado con la Rosa Mosqueta pura, este elixir nutre, atenúa líneas de expresión y restaura la luminosidad de la piel tras sesiones de acupuntura facial o Gua Sha.",
    benefits: [
      "Potente efecto antioxidante y rejuvenecedor",
      "Restaura la elasticidad y firmeza dérmica",
      "Nutrición intensiva para pieles secas o desvitalizadas",
      "Vehículo ideal para masajes faciales con Gua Sha o rodillo de jade"
    ],
    howToUse: "Colocar 3 a 4 gotas en la palma, calentar suavemente y aplicar con movimientos ascendentes en rostro, cuello y escote."
  },
  {
    id: "muna-eucalipto",
    title: "Aceite Esencial de Muña Andina & Eucalipto Amazónico",
    subtitle: "Despeje respiratorio, digestivo y tonificación física",
    category: "aromaterapia",
    categoryLabel: "Aromaterapia & Relajación",
    badge: "Poder Herbal",
    badgeColor: "emerald",
    rating: 5,
    reviews: 31,
    price: "S/ 36.00",
    presentation: "Frasco ámbar 10ml",
    origin: "Cusco / Junín, Perú",
    extraction: "Destilación al vapor de hojas frescas seleccionadas",
    image: "https://images.unsplash.com/photo-1512290900672-1f486444e21b?auto=format&fit=crop&w=600&q=80",
    description: "Sinergia aromática y terapéutica de la milenaria Muña de los Andes y el Eucalipto de montaña. Abre las vías respiratorias, alivia la pesadez mental y dinamiza la energía vital (Qi).",
    benefits: [
      "Descongestionante respiratorio inmediato",
      "Alivia la fatiga física y el embotamiento mental",
      "Propiedades antisépticas y expectorantes",
      "Ayuda en el masaje abdominal para digestiones lentas"
    ],
    howToUse: "Inhalaciones directas o 5 gotas en difusor. Para masaje pectoral o abdominal, diluir 3 gotas en 1 cucharada de aceite vegetal."
  },
  {
    id: "masaje-arnica-castana",
    title: "Aceite de Masaje Descontracturante: Árnica, Romero & Castaña",
    subtitle: "Fórmula terapéutica para fisioterapia, ventosas y masaje clínico",
    category: "dolor",
    categoryLabel: "Alivio del Dolor & Masajes",
    badge: "Más Vendido",
    badgeColor: "emerald",
    rating: 5,
    reviews: 67,
    price: "S/ 42.00",
    presentation: "Botella 250ml con dosificador",
    origin: "Madre de Dios / Lima, Perú",
    extraction: "Maceración botánica concentrada en base de aceite de castaña amazónica",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    description: "El aceite predilecto por fisioterapeutas y masoterapeutas. Brinda un deslizamiento perfecto sin dejar sensación excesivamente grasa, permitiendo un trabajo profundo en contracturas y maniobras con ventosas.",
    benefits: [
      "Deslizamiento óptimo y absorción gradual",
      "Efecto calor suave y alivio muscular inmediato",
      "Enriquecido con ácidos grasos esenciales de castaña amazónica",
      "Compatible con ventosaterapia fija y deslizante"
    ],
    howToUse: "Aplicar una cantidad generosa en las manos, frotar para temperar y masajear la musculatura en espalda, cuello o extremidades."
  },
  {
    id: "maracuya-relax",
    title: "Aceite Corporal Calmante de Maracuyá (Passiflora)",
    subtitle: "Sedación nerviosa, sedosidad y descanso profundo",
    category: "aromaterapia",
    categoryLabel: "Aromaterapia & Relajación",
    badge: "Aroma Envolvente",
    badgeColor: "gold",
    rating: 5,
    reviews: 23,
    price: "S/ 39.00",
    presentation: "Botella 200ml con dispensador",
    origin: "San Martín, Perú",
    extraction: "Prensado en frío de semillas de maracuyá amazónico",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
    description: "Rico en pasiflorina y ácidos linoleicos. Calma el sistema nervioso, reduce la tensión acumulada durante el día y deja la piel aterciopelada con una fragancia exótica natural y relajante.",
    benefits: [
      "Induce una relajación muscular y mental progresiva",
      "Textura ligera de rápida penetración dérmica",
      "Ideal para masajes nocturnos antiestrés e insomnio",
      "Hidratación profunda sin obstruir los poros"
    ],
    howToUse: "Aplicar tras el baño o durante la sesión de masaje relajante realizando pases largos y suaves en todo el cuerpo."
  },
  {
    id: "ungurahui-puro",
    title: "Aceite Puro de Ungurahui (Oenocarpus bataua)",
    subtitle: "Regeneración capilar, dérmica y fortalecedor tisular",
    category: "puros",
    categoryLabel: "Puros & Esenciales",
    badge: "100% Prensado en Frío",
    badgeColor: "emerald",
    rating: 5,
    reviews: 18,
    price: "S/ 40.00",
    presentation: "Frasco gotero 30ml",
    origin: "Loreto, Perú",
    extraction: "Prensado artesanal en frío de frutos de la palmera ungurahui",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
    description: "Conocido como el 'aceite de oliva de la selva'. Posee un perfil lipídico extraordinario con alto contenido de ácido oleico (Omega 9), ideal para nutrir el cuero cabelludo, fortalecer folículos y restaurar pieles irritadas.",
    benefits: [
      "Estimula el crecimiento y fortalece la fibra capilar",
      "Combate la resequedad extrema y descamación dérmica",
      "Efecto emoliente natural no comedogénico",
      "Protege la barrera cutánea frente a agresiones externas"
    ],
    howToUse: "Capilar: Masajear unas gotas en el cuero cabelludo antes de dormir o lavar. Dérmico: Aplicar 2 a 3 gotas en zonas resecas."
  }
];

// App State
let currentFilter = 'all';
let searchQuery = '';

function renderAmazonikCatalog() {
  const container = document.getElementById('amazonikGrid');
  const countEl = document.getElementById('productCount');
  if (!container) return;

  const filtered = AMAZONIK_PRODUCTS.filter(item => {
    const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.categoryLabel.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} producto${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
        <span class="material-symbols-outlined text-5xl text-slate-300 mb-3">search_off</span>
        <h3 class="text-lg font-bold text-slate-700">No encontramos aceites con ese criterio</h3>
        <p class="text-sm text-slate-500 mt-1">Intenta con otra búsqueda o selecciona "Todos los aceites".</p>
        <button onclick="resetFilters()" class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-semibold hover:bg-emerald-800 transition">
          Ver todos los aceites
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article class="amazonik-glass-card rounded-2xl overflow-hidden flex flex-col group">
      <!-- IMAGE BADGE WRAP -->
      <div class="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        <!-- Category Badge -->
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-lg ${item.badgeColor === 'gold' ? 'amazonik-gold-badge' : 'amazonik-card-badge'} text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
          ${item.badge}
        </span>

        <!-- Presentation pill -->
        <span class="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 text-white text-xs backdrop-blur-sm">
          <span class="material-symbols-outlined text-sm text-emerald-400">inventory_2</span>
          ${item.presentation}
        </span>
      </div>

      <!-- BODY CONTENT -->
      <div class="p-5 flex flex-col flex-1">
        <span class="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
          ${item.categoryLabel}
        </span>

        <h3 class="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
          ${item.title}
        </h3>

        <p class="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
          ${item.subtitle}
        </p>

        <!-- Highlights mini list -->
        <div class="mt-3 space-y-1 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
          <div class="flex items-center gap-1.5 truncate">
            <span class="material-symbols-outlined text-emerald-600 text-sm">nature</span>
            <span class="truncate">Origen: ${item.origin}</span>
          </div>
          <div class="flex items-center gap-1.5 truncate">
            <span class="material-symbols-outlined text-emerald-600 text-sm">verified</span>
            <span class="truncate">Grado Terapéutico y Masajes</span>
          </div>
        </div>

        <!-- FOOTER: PRICE & ACTIONS -->
        <div class="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 gap-2">
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Precio</span>
            <span class="text-lg font-extrabold text-emerald-700">${item.price}</span>
          </div>

          <div class="flex items-center gap-1.5">
            <button 
              type="button"
              onclick="openAmazonikModal('${item.id}')"
              class="inline-flex items-center justify-center p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition"
              title="Vista Rápida"
            >
              <span class="material-symbols-outlined text-[20px]">visibility</span>
            </button>

            <a 
              href="https://wa.me/51930830427?text=${encodeURIComponent(`Hola, quiero pedir el aceite Amazoni-k: ${item.title} (${item.presentation}) - Precio: ${item.price}`)}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm"
            >
              <span class="material-symbols-outlined text-sm">shopping_bag</span>
              Pedir
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join('');
}

// Modal Handler
function openAmazonikModal(productId) {
  const item = AMAZONIK_PRODUCTS.find(p => p.id === productId);
  if (!item) return;

  const modal = document.getElementById('amazonikModal');
  const modalBody = document.getElementById('amazonikModalContent');
  if (!modal || !modalBody) return;

  const waMessage = encodeURIComponent(`Hola, deseo más información y comprar el producto exclusivo Amazoni-k: *${item.title}* (${item.presentation}) por *${item.price}*. ¿Tienen stock disponible?`);

  modalBody.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <!-- Image side -->
      <div class="space-y-4">
        <div class="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
          <span class="absolute top-3 left-3 px-3 py-1 rounded-lg ${item.badgeColor === 'gold' ? 'amazonik-gold-badge' : 'amazonik-card-badge'} text-white text-xs font-bold uppercase tracking-wider">
            ${item.badge}
          </span>
        </div>
        <div class="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-900 border border-emerald-100">
          <p class="font-bold flex items-center gap-1">
            <span class="material-symbols-outlined text-base">eco</span>
            Garantía de Pureza Botánica
          </p>
          <p class="mt-0.5 text-emerald-700">Sin aditivos, conservantes artificiales ni diluciones químicas.</p>
        </div>
      </div>

      <!-- Details side -->
      <div class="flex flex-col justify-between space-y-4">
        <div>
          <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Amazoni-k • ${item.categoryLabel}
          </span>
          <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            ${item.title}
          </h2>
          <p class="text-sm text-slate-600 font-medium mt-1">
            ${item.subtitle}
          </p>

          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-2xl font-black text-emerald-700">${item.price}</span>
            <span class="text-xs text-slate-500 font-semibold">(${item.presentation})</span>
          </div>

          <div class="mt-4 pt-4 border-t border-slate-200">
            <h4 class="text-xs font-bold uppercase text-slate-700 mb-1">Descripción:</h4>
            <p class="text-xs text-slate-600 leading-relaxed">${item.description}</p>
          </div>

          <div class="mt-3">
            <h4 class="text-xs font-bold uppercase text-slate-700 mb-1.5">Beneficios Clave:</h4>
            <ul class="space-y-1 text-xs text-slate-600">
              ${item.benefits.map(b => `
                <li class="flex items-start gap-1.5">
                  <span class="material-symbols-outlined text-emerald-600 text-sm shrink-0">check_circle</span>
                  <span>${b}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <h4 class="text-[11px] font-bold uppercase text-slate-700 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm text-[#1a4f70]">science</span>
              Modo de Uso Sugerido:
            </h4>
            <p class="text-xs text-slate-600 mt-1">${item.howToUse}</p>
          </div>
        </div>

        <!-- Action Button -->
        <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5">
          <a 
            href="https://wa.me/51930830427?text=${waMessage}"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 font-bold text-sm shadow-md transition"
          >
            <span class="material-symbols-outlined text-lg">chat</span>
            <span>Comprar por WhatsApp</span>
          </a>
          <button 
            type="button" 
            onclick="closeAmazonikModal()"
            class="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAmazonikModal() {
  const modal = document.getElementById('amazonikModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function filterCategory(category, el) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('bg-emerald-700', 'text-white', 'shadow-sm');
    btn.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
  });
  if (el) {
    el.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
    el.classList.add('bg-emerald-700', 'text-white', 'shadow-sm');
  }
  renderAmazonikCatalog();
}

function resetFilters() {
  currentFilter = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('amazonikSearch');
  if (searchInput) searchInput.value = '';
  
  const allBtn = document.querySelector('[data-filter="all"]');
  if (allBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('bg-emerald-700', 'text-white', 'shadow-sm');
      btn.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
    });
    allBtn.classList.add('bg-emerald-700', 'text-white', 'shadow-sm');
  }
  renderAmazonikCatalog();
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
  renderAmazonikCatalog();

  const searchInput = document.getElementById('amazonikSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderAmazonikCatalog();
    });
  }

  const modal = document.getElementById('amazonikModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAmazonikModal();
      }
    });
  }
});
