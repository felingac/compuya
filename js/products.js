/* ============================================
   CompuYá — Product Engine (JSON-driven)
   ============================================ */

(function () {
  'use strict';

  const PRODUCTS_URL = 'js/data/products.json';

  let allProducts = [];
  let currentFilter = 'todos';
  let searchQuery = '';

  // ─── Category config ───
  const CATEGORIES = {
    todos: { label: 'Todos', icon: '🖥️' },
    laptops: { label: 'Laptops', icon: '💻' },
    computadoras: { label: 'Computadoras', icon: '🖥️' },
    cpus: { label: 'Torres CPU', icon: '🖧' },
    combos: { label: 'Combos', icon: '🎁' },
    impresoras: { label: 'Impresoras', icon: '🖨️' },
    accesorios: { label: 'Accesorios', icon: '🎧' }
  };

  // ─── Init ───
  async function init() {
    try {
      const res = await fetch(PRODUCTS_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      allProducts = await res.json();
      renderFilters();
      renderProducts();
    } catch (err) {
      console.error('Error loading products:', err);
      const container = document.getElementById('products-grid');
      if (container) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <p style="color: var(--text-muted);">No se pudieron cargar los productos. Intenta recargar la página.</p>
          </div>
        `;
      }
    }
  }

  // ─── Render Filter Buttons ───
  function renderFilters() {
    const filterBar = document.getElementById('product-filters');
    if (!filterBar) return;

    filterBar.innerHTML = '';

    Object.entries(CATEGORIES).forEach(([key, { label }]) => {
      const btn = document.createElement('button');
      btn.className = `filter-btn${key === currentFilter ? ' active' : ''}`;
      btn.textContent = label;
      btn.setAttribute('data-filter', key);
      btn.addEventListener('click', () => {
        currentFilter = key;
        updateActiveFilter();
        renderProducts();
      });
      filterBar.appendChild(btn);
    });
  }

  function updateActiveFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === currentFilter);
    });
  }

  // ─── Render Product Cards ───
  function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let filtered = allProducts;

    // Apply category filter
    if (currentFilter !== 'todos') {
      filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.specs.some(s => s.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <p style="font-size: 3rem; margin-bottom: 1rem;">🔍</p>
          <p style="color: var(--text-muted); font-size: var(--fs-md);">No se encontraron productos.</p>
          <p style="color: var(--text-light); font-size: var(--fs-sm);">Intenta cambiar el filtro o la búsqueda.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(product => createProductCard(product)).join('');

    // Trigger reveal animations
    requestAnimationFrame(() => {
      const cards = grid.querySelectorAll('.product-card');
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.08}s`;
        requestAnimationFrame(() => card.classList.add('revealed'));
      });
    });
  }

  function createProductCard(product) {
    const specsHTML = product.specs
      .slice(0, 4)
      .map(spec => `<span class="product-card__spec">${spec}</span>`)
      .join('');

    const badgeHTML = product.featured
      ? `<span class="product-card__badge product-card__badge--featured">Destacado</span>`
      : '';

    const whatsappMsg = encodeURIComponent(
      `Hola, me interesa: ${product.name}. ¿Me pueden dar más información y precio?`
    );

    return `
      <article class="product-card reveal" aria-label="${product.name}">
        ${badgeHTML}
        <div class="product-card__image-wrap">
          <img
            class="product-card__image"
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            width="650"
            height="650"
          />
          <div class="product-card__overlay">
            <a href="https://wa.me/593992292199?text=${whatsappMsg}" target="_blank" rel="noopener" class="btn btn-sm btn-whatsapp" style="width:100%">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
              Consultar
            </a>
          </div>
        </div>
        <div class="product-card__body">
          <span class="product-card__category">${product.category}</span>
          <h3 class="product-card__title">${product.name}</h3>
          <div class="product-card__specs">${specsHTML}</div>
          <div class="product-card__action">
            <a href="https://wa.me/593992292199?text=${whatsappMsg}" target="_blank" rel="noopener" class="btn btn-sm btn-outline" style="width: 100%;">
              Cotizar ahora →
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // ─── Search handler ───
  function initSearch() {
    const searchInput = document.getElementById('product-search');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value;
        renderProducts();
      }, 300);
    });
  }

  // ─── Featured Products (for destacados section) ───
  function renderFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid) return;

    const featured = allProducts.filter(p => p.featured);

    grid.innerHTML = featured.map(product => createProductCard(product)).join('');

    requestAnimationFrame(() => {
      const cards = grid.querySelectorAll('.product-card');
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
        requestAnimationFrame(() => card.classList.add('revealed'));
      });
    });
  }

  // ─── Public init ───
  document.addEventListener('DOMContentLoaded', () => {
    init().then(() => {
      initSearch();
      renderFeaturedProducts();
    });
  });
})();
