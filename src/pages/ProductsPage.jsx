import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS_CATALOG } from '../data/productsData';
import { useShop } from '../context/ShopContext';
import SEOHead from '../components/common/SEOHead';

// Catalog Specific Components
import ProductsHero from '../components/products/ProductsHero';
import ProductCard from '../components/products/ProductCard';
import ProductHorizontalFiltersBar from '../components/products/ProductHorizontalFiltersBar';
import MoreFiltersDrawer from '../components/products/MoreFiltersDrawer';
import ActiveFiltersBar from '../components/products/ActiveFiltersBar';
import ProductsTopBar from '../components/products/ProductsTopBar';
import Pagination from '../components/products/Pagination';
import EmptyState from '../components/products/EmptyState';
import BenefitsBar from '../components/products/BenefitsBar';

import { X, SlidersHorizontal, Check } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

// Helper to classify product type dynamically
const getProductTypesForProduct = (p) => {
  const types = [];
  const text = `${p.nombre || ''} ${p.categoria || ''} ${p.descripcionResumen || ''} ${p.descripcionCompleta || ''}`.toLowerCase();
  
  if (text.includes('aguja') || text.includes('lanceta') || text.includes('seirin') || text.includes('dongbang') || text.includes('huan qiu') || text.includes('koreana') || text.includes('chincheta')) {
    types.push('agujas');
  }
  if (text.includes('kit') || text.includes('set') || text.includes('caja') || text.includes('malet') || text.includes('pack')) {
    types.push('kits');
  }
  if (text.includes('equipo') || text.includes('electro') || text.includes('aparato') || text.includes('estimulador') || text.includes('lámpara') || text.includes('lampara') || text.includes('detector') || text.includes('tens')) {
    types.push('equipos');
  }
  if (text.includes('descartable') || text.includes('guante') || text.includes('alcohol') || text.includes('algod') || text.includes('parche') || text.includes('esteril') || text.includes('mascarilla') || text.includes('cubrecama')) {
    types.push('descartables');
  }
  if (text.includes('accesorio') || text.includes('tubo') || text.includes('guía') || text.includes('guia') || text.includes('palpador') || text.includes('rodillo') || text.includes('guasha') || text.includes('bandeja') || text.includes('pinza') || text.includes('martillo') || text.includes('soporte') || text.includes('anillo')) {
    types.push('accesorios');
  }

  // Default fallback if uncategorized
  if (types.length === 0) {
    types.push('accesorios');
  }
  return types;
};

// Helper for promotions match
const getPromosForProduct = (p) => {
  const promos = [];
  const badge = (p.badge || '').toLowerCase();
  const title = (p.nombre || '').toLowerCase();

  if (p.enStock !== false && (badge.includes('nuevo') || badge.includes('envío') || p.id === 'prod-154' || p.id === 'prod-153')) {
    promos.push('new');
  }
  if (badge.includes('vendido') || (p.reviewsCount && p.reviewsCount >= 40)) {
    promos.push('bestseller');
  }
  if (p.descuento || p.precioOriginal) {
    promos.push('onsale');
  }
  if (badge.includes('premium') || badge.includes('garantizado') || badge.includes('profesional') || title.includes('profesional') || title.includes('clínic')) {
    promos.push('pro');
  }
  return promos;
};

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery } = useShop();

  // Mobile menu & drawer states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Dynamic Price Bounds derived from EXACT 155 products
  const priceBounds = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    PRODUCTS_CATALOG.forEach((p) => {
      if (p.sinPrecio || p.precio === null || p.precio === undefined) return;
      const price = typeof p.precio === 'number' ? p.precio : parseFloat(String(p.precio).replace(/[^0-9.]/g, ''));
      if (isNaN(price)) return;
      if (price < min) min = price;
      if (price > max) max = price;
    });
    return {
      min: min === Infinity ? 0 : Math.floor(min),
      max: max === -Infinity ? 350 : Math.ceil(max)
    };
  }, []);

  // Filter states initialized from URL params
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const cat = searchParams.get('category') || searchParams.get('cat');
    return cat ? [cat] : [];
  });

  const [selectedProductTypes, setSelectedProductTypes] = useState(() => {
    const t = searchParams.get('type');
    return t ? t.split(',') : [];
  });

  const [selectedBrands, setSelectedBrands] = useState(() => {
    const b = searchParams.get('brand') || searchParams.get('marca');
    return b ? b.split(',') : [];
  });

  const [priceRange, setPriceRange] = useState(() => {
    const maxP = searchParams.get('maxPrice');
    return [priceBounds.min, maxP ? Number(maxP) : priceBounds.max];
  });

  const [selectedRatings, setSelectedRatings] = useState(() => {
    const r = searchParams.get('rating');
    return r ? r.split(',').map(Number) : [];
  });

  const [selectedPromos, setSelectedPromos] = useState(() => {
    const p = searchParams.get('promo') || searchParams.get('filter');
    if (p === 'ofertas') return ['onsale'];
    if (p === 'novedades') return ['new'];
    if (p === 'kits') return [];
    return p ? p.split(',') : [];
  });

  const [selectedAvailability, setSelectedAvailability] = useState(() => {
    const stock = searchParams.get('stock');
    return stock ? stock.split(',') : [];
  });

  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  const [sortBy, setSortBy] = useState(() => {
    return searchParams.get('sort') || 'recommended';
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const p = parseInt(searchParams.get('page') || '1', 10);
    return isNaN(p) || p < 1 ? 1 : p;
  });

  // Sync search query and filters from URL if present
  useEffect(() => {
    const urlSearch = searchParams.get('search') || searchParams.get('q');
    if (urlSearch !== null && urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }

    const cat = searchParams.get('category') || searchParams.get('cat');
    if (cat) {
      setSelectedCategories(cat.split(','));
    }

    const t = searchParams.get('type');
    if (t) {
      setSelectedProductTypes(t.split(','));
    }

    const p = searchParams.get('promo') || searchParams.get('filter');
    if (p === 'ofertas') setSelectedPromos(['onsale']);
    else if (p === 'novedades') setSelectedPromos(['new']);
    else if (p) setSelectedPromos(p.split(','));
  }, [searchParams]);

  // Sync state back to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedCategories.length === 1) params.set('category', selectedCategories[0]);
    else if (selectedCategories.length > 1) params.set('category', selectedCategories.join(','));
    
    if (selectedProductTypes.length > 0) params.set('type', selectedProductTypes.join(','));
    if (selectedBrands.length > 0) params.set('brand', selectedBrands.join(','));
    if (priceRange[1] < priceBounds.max) params.set('maxPrice', String(priceRange[1]));
    if (selectedRatings.length > 0) params.set('rating', selectedRatings.join(','));
    if (selectedPromos.length > 0) params.set('promo', selectedPromos.join(','));
    if (selectedAvailability.length > 0) params.set('stock', selectedAvailability.join(','));
    if (sortBy !== 'recommended') params.set('sort', sortBy);
    if (currentPage > 1) params.set('page', String(currentPage));

    setSearchParams(params, { replace: true });
  }, [
    searchQuery,
    selectedCategories,
    selectedProductTypes,
    selectedBrands,
    priceRange,
    selectedRatings,
    selectedPromos,
    selectedAvailability,
    sortBy,
    currentPage,
    priceBounds.max,
    setSearchParams
  ]);

  // Compute dynamic counts for all categories from EXACT 155 products
  const categoriesWithCounts = useMemo(() => {
    const countsMap = {};
    PRODUCTS_CATALOG.forEach((p) => {
      countsMap[p.categoria] = (countsMap[p.categoria] || 0) + 1;
    });

    return Object.entries(countsMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, []);

  // Compute dynamic counts for product types
  const productTypesWithCounts = useMemo(() => {
    const typesDef = [
      { id: 'agujas', label: 'Agujas' },
      { id: 'kits', label: 'Kits y Sets' },
      { id: 'equipos', label: 'Equipos y Electroterapia' },
      { id: 'descartables', label: 'Insumos Descartables' },
      { id: 'accesorios', label: 'Accesorios y Herramientas' }
    ];

    const counts = { agujas: 0, kits: 0, equipos: 0, descartables: 0, accesorios: 0 };
    PRODUCTS_CATALOG.forEach((p) => {
      const pTypes = getProductTypesForProduct(p);
      pTypes.forEach((t) => {
        if (counts[t] !== undefined) counts[t]++;
      });
    });

    return typesDef.map((t) => ({
      ...t,
      count: counts[t.id] || 0
    }));
  }, []);

  // Compute dynamic counts for brands
  const brandsWithCounts = useMemo(() => {
    const countsMap = {};
    PRODUCTS_CATALOG.forEach((p) => {
      let brand = p.marca || '';
      if (!brand || brand === 'N/A' || brand === 'No especificado') {
        const name = (p.nombre || '').toLowerCase();
        if (name.includes('seirin')) brand = 'Seirin';
        else if (name.includes('dongbang') || name.includes('dong bang')) brand = 'DongBang';
        else if (name.includes('hwato')) brand = 'Hwato';
        else if (name.includes('zhongyan') || name.includes('taihe')) brand = 'Zhongyan Taihe';
        else if (name.includes('cloud') || name.includes('dragon')) brand = 'Cloud & Dragon';
        else if (name.includes('huan qiu') || name.includes('huanqiu')) brand = 'Huan Qiu';
        else if (name.includes('shenli') || name.includes('wujiang')) brand = 'Wujiang Shenli';
        else if (name.includes('koreana') || name.includes('coreana')) brand = 'Agujas Coreanas';
        else brand = 'Otras Marcas';
      }
      countsMap[brand] = (countsMap[brand] || 0) + 1;
    });

    return Object.entries(countsMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, []);

  // Compute dynamic counts for ratings
  const ratingsWithCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    PRODUCTS_CATALOG.forEach((p) => {
      const r = Math.max(1, Math.min(5, Math.floor(p.rating || 5)));
      counts[r] = (counts[r] || 0) + 1;
    });

    return [
      { stars: 5, count: counts[5] },
      { stars: 4, count: counts[4] },
      { stars: 3, count: counts[3] },
      { stars: 2, count: counts[2] },
      { stars: 1, count: counts[1] }
    ];
  }, []);

  // Compute dynamic counts for promotions
  const promosWithCounts = useMemo(() => {
    const promoDefs = [
      { id: 'new', label: 'Novedades' },
      { id: 'bestseller', label: 'Más vendidos' },
      { id: 'onsale', label: 'En oferta' },
      { id: 'pro', label: 'Profesional' }
    ];

    const counts = { new: 0, bestseller: 0, onsale: 0, pro: 0 };
    PRODUCTS_CATALOG.forEach((p) => {
      const pPromos = getPromosForProduct(p);
      pPromos.forEach((pm) => {
        if (counts[pm] !== undefined) counts[pm]++;
      });
    });

    return promoDefs.map((pm) => ({
      ...pm,
      count: counts[pm.id] || 0
    }));
  }, []);

  // Compute dynamic availability counts
  const availabilityWithCounts = useMemo(() => {
    let inStockCount = 0;
    let outStockCount = 0;
    PRODUCTS_CATALOG.forEach((p) => {
      if (p.enStock !== false) inStockCount++;
      else outStockCount++;
    });

    return [
      { id: 'in_stock', label: 'En stock', count: inStockCount },
      { id: 'out_of_stock', label: 'Agotado', count: outStockCount }
    ];
  }, []);

  // Reset page when any filter or search changes
  const handleFilterChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Filter toggle handlers
  const handleToggleCategory = (catName) => {
    setSelectedCategories((prev) =>
      prev.includes(catName) ? prev.filter((c) => c !== catName) : [...prev, catName]
    );
    handleFilterChange();
  };

  const handleToggleProductType = (typeId) => {
    setSelectedProductTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    );
    handleFilterChange();
  };

  const handleToggleBrand = (brandName) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]
    );
    handleFilterChange();
  };

  const handleChangePriceRange = (range) => {
    setPriceRange(range);
    handleFilterChange();
  };

  const handleToggleRating = (stars) => {
    setSelectedRatings((prev) =>
      prev.includes(stars) ? prev.filter((r) => r !== stars) : [...prev, stars]
    );
    handleFilterChange();
  };

  const handleTogglePromo = (promoId) => {
    setSelectedPromos((prev) =>
      prev.includes(promoId) ? prev.filter((p) => p !== promoId) : [...prev, promoId]
    );
    handleFilterChange();
  };

  const handleToggleAvailability = (availId) => {
    setSelectedAvailability((prev) =>
      prev.includes(availId) ? prev.filter((a) => a !== availId) : [...prev, availId]
    );
    handleFilterChange();
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedProductTypes([]);
    setSelectedBrands([]);
    setPriceRange([priceBounds.min, priceBounds.max]);
    setSelectedRatings([]);
    setSelectedPromos([]);
    setSelectedAvailability([]);
    setSearchQuery('');
    setSortBy('recommended');
    setCurrentPage(1);
  };

  // MAIN FILTER & SORT PIPELINE EXECUTED ON THE 155 PRODUCTS
  const filteredAndSortedProducts = useMemo(() => {
    const query = (searchQuery || '').toLowerCase().trim();

    const filtered = PRODUCTS_CATALOG.filter((prod) => {
      // 1. Text search
      if (query) {
        const titleMatch = (prod.nombre || '').toLowerCase().includes(query);
        const catMatch = (prod.categoria || '').toLowerCase().includes(query);
        const descMatch = (prod.descripcionCompleta || '').toLowerCase().includes(query);
        const sumMatch = (prod.descripcionResumen || '').toLowerCase().includes(query);
        const brandMatch = (prod.marca || '').toLowerCase().includes(query);
        const skuMatch = (prod.sku || '').toLowerCase().includes(query);

        if (!titleMatch && !catMatch && !descMatch && !sumMatch && !brandMatch && !skuMatch) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategories.length > 0) {
        const matchesCat = selectedCategories.some((catFilter) => {
          if (!catFilter || catFilter === 'Todos') return true;
          const cf = catFilter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const pc = (prod.categoria || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return pc === cf || pc.includes(cf) || cf.includes(pc);
        });
        if (!matchesCat) {
          return false;
        }
      }

      // 3. Product type filter
      if (selectedProductTypes.length > 0) {
        const prodTypes = getProductTypesForProduct(prod);
        const hasMatchingType = selectedProductTypes.some((t) => prodTypes.includes(t));
        if (!hasMatchingType) return false;
      }

      // 3.1 Brand filter
      if (selectedBrands.length > 0) {
        const matchesBrand = selectedBrands.some((b) => {
          const prodBrand = (prod.marca || '').toLowerCase();
          const prodName = (prod.nombre || '').toLowerCase();
          const targetBrand = b.toLowerCase();
          return prodBrand.includes(targetBrand) || prodName.includes(targetBrand);
        });
        if (!matchesBrand) return false;
      }

      // 4. Price filter
      const isPriceFree = prod.sinPrecio || prod.precio === null || prod.precio === undefined;
      if (!isPriceFree) {
        const price = typeof prod.precio === 'number' ? prod.precio : parseFloat(String(prod.precio).replace(/[^0-9.]/g, '')) || 0;
        if (price < priceRange[0] || price > priceRange[1]) {
          return false;
        }
      } else if (priceRange[0] > priceBounds.min || priceRange[1] < priceBounds.max) {
        return false;
      }

      // 5. Rating filter
      if (selectedRatings.length > 0) {
        const r = Math.floor(prod.rating || 5);
        if (!selectedRatings.includes(r)) {
          return false;
        }
      }

      // 6. Promos filter
      if (selectedPromos.length > 0) {
        const prodPromos = getPromosForProduct(prod);
        const hasMatchingPromo = selectedPromos.some((p) => prodPromos.includes(p));
        if (!hasMatchingPromo) return false;
      }

      // 7. Stock availability filter
      if (selectedAvailability.length > 0) {
        const isStock = prod.enStock !== false;
        if (selectedAvailability.includes('in_stock') && !isStock) return false;
        if (selectedAvailability.includes('out_of_stock') && isStock) return false;
      }

      return true;
    });

    // 8. Sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'bestsellers':
        sorted.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case 'price_asc':
        sorted.sort((a, b) => {
          const pA = a.precio ?? Infinity;
          const pB = b.precio ?? Infinity;
          return pA - pB;
        });
        break;
      case 'price_desc':
        sorted.sort((a, b) => {
          const pA = a.precio ?? -Infinity;
          const pB = b.precio ?? -Infinity;
          return pB - pA;
        });
        break;
      case 'name_asc':
        sorted.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
        break;
      case 'name_desc':
        sorted.sort((a, b) => (b.nombre || '').localeCompare(a.nombre || ''));
        break;
      case 'newest':
        // Descending by ID/index
        sorted.reverse();
        break;
      case 'rating_desc':
        sorted.sort((a, b) => (b.rating || 5) - (a.rating || 5));
        break;
      case 'recommended':
      default:
        // Natural order preserved
        break;
    }

    return sorted;
  }, [
    searchQuery,
    selectedCategories,
    selectedProductTypes,
    priceRange,
    selectedRatings,
    selectedPromos,
    selectedAvailability,
    sortBy
  ]);

  // PAGINATION CALCULATIONS
  const totalFilteredCount = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalFilteredCount / ITEMS_PER_PAGE) || 1;

  // Ensure currentPage does not exceed totalPages
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, safeCurrentPage]);

  const startIndex = totalFilteredCount === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(safeCurrentPage * ITEMS_PER_PAGE, totalFilteredCount);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const catalogElem = document.getElementById('catalog-content-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Build active chips for display above product grid
  const activeChips = useMemo(() => {
    const chips = [];

    if (searchQuery.trim()) {
      chips.push({
        id: 'search',
        label: `Búsqueda: "${searchQuery.trim()}"`,
        type: 'search'
      });
    }

    selectedCategories.forEach((cat) => {
      chips.push({
        id: `cat-${cat}`,
        label: cat,
        type: 'category',
        value: cat
      });
    });

    selectedProductTypes.forEach((t) => {
      const typeObj = productTypesWithCounts.find((item) => item.id === t);
      chips.push({
        id: `type-${t}`,
        label: typeObj ? typeObj.label : t,
        type: 'type',
        value: t
      });
    });

    selectedBrands.forEach((b) => {
      chips.push({
        id: `brand-${b}`,
        label: `Marca: ${b}`,
        type: 'brand',
        value: b
      });
    });

    if (priceRange[1] < priceBounds.max) {
      chips.push({
        id: 'price',
        label: `Hasta S/ ${priceRange[1]}`,
        type: 'price'
      });
    }

    selectedRatings.forEach((r) => {
      chips.push({
        id: `rating-${r}`,
        label: `${r} ★`,
        type: 'rating',
        value: r
      });
    });

    selectedPromos.forEach((pm) => {
      const promoObj = promosWithCounts.find((item) => item.id === pm);
      chips.push({
        id: `promo-${pm}`,
        label: promoObj ? promoObj.label : pm,
        type: 'promo',
        value: pm
      });
    });

    selectedAvailability.forEach((av) => {
      const avObj = availabilityWithCounts.find((item) => item.id === av);
      chips.push({
        id: `stock-${av}`,
        label: avObj ? avObj.label : av,
        type: 'stock',
        value: av
      });
    });

    return chips;
  }, [
    searchQuery,
    selectedCategories,
    selectedProductTypes,
    selectedBrands,
    priceRange,
    priceBounds.max,
    selectedRatings,
    selectedPromos,
    selectedAvailability,
    productTypesWithCounts,
    promosWithCounts,
    availabilityWithCounts
  ]);

  const handleRemoveChip = (chip) => {
    switch (chip.type) {
      case 'search':
        setSearchQuery('');
        break;
      case 'category':
        setSelectedCategories((prev) => prev.filter((c) => c !== chip.value));
        break;
      case 'type':
        setSelectedProductTypes((prev) => prev.filter((t) => t !== chip.value));
        break;
      case 'brand':
        setSelectedBrands((prev) => prev.filter((b) => b !== chip.value));
        break;
      case 'price':
        setPriceRange([priceBounds.min, priceBounds.max]);
        break;
      case 'rating':
        setSelectedRatings((prev) => prev.filter((r) => r !== chip.value));
        break;
      case 'promo':
        setSelectedPromos((prev) => prev.filter((p) => p !== chip.value));
        break;
      case 'stock':
        setSelectedAvailability((prev) => prev.filter((a) => a !== chip.value));
        break;
      default:
        break;
    }
    handleFilterChange();
  };

  const hasActiveFilters = activeChips.length > 0;
  const moreFiltersCount = selectedRatings.length + selectedPromos.length + selectedAvailability.length;

  return (
    <>
      <SEOHead 
        title={selectedCategories.length === 1 ? `Catálogo de ${selectedCategories[0]} en Perú` : 'Catálogo de Agujas de Acupuntura & Insumos Médicos en Perú'}
        description={`Explora nuestros ${totalFilteredCount} insumos de acupuntura, moxas, ventosas y fisioterapia con envíos inmediatos en Lima y todo el Perú.`}
      />

      {/* 4 & 5. BREADCRUMBS & HERO */}
      <ProductsHero />

      {/* 6. MAIN CATALOG CONTAINER (FULL WIDTH WITH HORIZONTAL FILTERS) */}
      <main id="catalog-content-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* HORIZONTAL FILTERS BAR (ENCIMA DEL CATÁLOGO) */}
        <ProductHorizontalFiltersBar
          categories={categoriesWithCounts}
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
          productTypes={productTypesWithCounts}
          selectedProductTypes={selectedProductTypes}
          onToggleProductType={handleToggleProductType}
          brands={brandsWithCounts}
          selectedBrands={selectedBrands}
          onToggleBrand={handleToggleBrand}
          priceBounds={priceBounds}
          currentPriceRange={priceRange}
          onChangePriceRange={handleChangePriceRange}
          ratings={ratingsWithCounts}
          selectedRatings={selectedRatings}
          onToggleRating={handleToggleRating}
          promos={promosWithCounts}
          selectedPromos={selectedPromos}
          onTogglePromo={handleTogglePromo}
          availability={availabilityWithCounts}
          selectedAvailability={selectedAvailability}
          onToggleAvailability={handleToggleAvailability}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          onOpenMoreFilters={() => setMoreFiltersOpen(true)}
          moreFiltersCount={moreFiltersCount}
        />

        {/* COUNTER ("Mostrando 49–60 de 155 productos") + SORT DROPDOWN ("Ordenar por: Más vendidos ▼") + VIEW MODE */}
        <ProductsTopBar
          totalProducts={totalFilteredCount}
          startIndex={startIndex}
          endIndex={endIndex}
          sortBy={sortBy}
          onChangeSort={setSortBy}
          viewMode={viewMode}
          onChangeViewMode={setViewMode}
          onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          activeFilterCount={activeChips.length}
        />

        {/* ACTIVE FILTER CHIPS (IF ANY) */}
        <ActiveFiltersBar
          activeChips={activeChips}
          onRemoveChip={handleRemoveChip}
          onResetAll={handleResetFilters}
        />

        {/* PRODUCT GRID / LIST (FULL WIDTH - 4 COLUMNS ON DESKTOP) */}
        {totalFilteredCount === 0 ? (
          <EmptyState
            onResetFilters={handleResetFilters}
            searchQuery={searchQuery}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode="grid"
              />
            ))}
          </div>
        ) : (
          <>
            {/* En móviles siempre forzar vista cuadrícula de 2 columnas */}
            <div className="grid grid-cols-2 sm:hidden gap-3.5">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode="grid"
                />
              ))}
            </div>
            {/* En pantallas medianas y grandes, mostrar vista lista */}
            <div className="hidden sm:block space-y-4">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode="list"
                />
              ))}
            </div>
          </>
        )}

        {/* PAGINATION */}
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      {/* MORE FILTERS DRAWER (DESKTOP / TABLET) */}
      <MoreFiltersDrawer
        isOpen={moreFiltersOpen}
        onClose={() => setMoreFiltersOpen(false)}
        isMobileFull={false}
        ratings={ratingsWithCounts}
        selectedRatings={selectedRatings}
        onToggleRating={handleToggleRating}
        promos={promosWithCounts}
        selectedPromos={selectedPromos}
        onTogglePromo={handleTogglePromo}
        availability={availabilityWithCounts}
        selectedAvailability={selectedAvailability}
        onToggleAvailability={handleToggleAvailability}
        onResetFilters={handleResetFilters}
        totalFilteredCount={totalFilteredCount}
      />

      {/* MOBILE FULL FILTERS DRAWER */}
      <MoreFiltersDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        isMobileFull={true}
        categories={categoriesWithCounts}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        productTypes={productTypesWithCounts}
        selectedProductTypes={selectedProductTypes}
        onToggleProductType={handleToggleProductType}
        brands={brandsWithCounts}
        selectedBrands={selectedBrands}
        onToggleBrand={handleToggleBrand}
        priceBounds={priceBounds}
        currentPriceRange={priceRange}
        onChangePriceRange={handleChangePriceRange}
        ratings={ratingsWithCounts}
        selectedRatings={selectedRatings}
        onToggleRating={handleToggleRating}
        promos={promosWithCounts}
        selectedPromos={selectedPromos}
        onTogglePromo={handleTogglePromo}
        availability={availabilityWithCounts}
        selectedAvailability={selectedAvailability}
        onToggleAvailability={handleToggleAvailability}
        onResetFilters={handleResetFilters}
        totalFilteredCount={totalFilteredCount}
      />

      {/* 21. BENEFITS BAR */}
      <BenefitsBar />
    </>
  );
}


