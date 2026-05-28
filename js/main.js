(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const AFFILIATE = cfg.affiliate || "https://litbuy.com";
  const SEARCH_REDIRECT_URL = "https://streetstyle.maisonlooks.com/en/search?q=";
  const BRAND_PRODUCTS_URL = "https://streetstyle.maisonlooks.com/en/products?brands=";

  function buyUrl(product) {
    return AFFILIATE + (product ? "?product=" + encodeURIComponent(product.name) : "");
  }

  function categoryLabel(slug) {
    const cat = (window.LITBUY_CATEGORIES || []).find((c) => c.slug === slug);
    return cat ? cat.name : slug;
  }

  function categoryHref(cat) {
    return cat.url || "finds.html?category=" + cat.slug;
  }

  function maisonlooksCategoryUrl(categorySlug, badge) {
    const cat = (window.LITBUY_CATEGORIES || []).find((c) => c.slug === categorySlug);
    const fallback = `${cfg.maisonlooks || "https://streetstyle.maisonlooks.com/en/s/StreetStyle"}/c/${categorySlug}`;
    if (!cat) return fallback;

    if (badge === "hot" && cat.hotUrl) return cat.hotUrl;
    if (badge === "trending" && cat.trendingUrl) return cat.trendingUrl;
    return cat.url || fallback;
  }

  function externalTargetAttrs(href) {
    if (!href.startsWith("http")) return "";
    return cfg.openInNewTab !== false ? ' target="_blank" rel="noopener noreferrer"' : "";
  }

  function productImageHtml(product, fallbackIcon) {
    if (product.image) {
      return `<img src="${product.image}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="product-image-fallback" hidden>${fallbackIcon}</span>`;
    }

    return `<span class="product-image-fallback">${fallbackIcon}</span>`;
  }

  function categoryCardHtml(c) {
    const href = categoryHref(c);
    const external = href.startsWith("http");
    const newTab = external && cfg.openInNewTab !== false;
    return `
        <a href="${href}" class="category-card${external ? " category-card--external maisonlooks-link" : ""}"${newTab ? ' target="_blank" rel="noopener noreferrer"' : ""}>
          <span class="category-icon">${c.icon}</span>
          <span class="category-name">${c.name}</span>
          ${c.count ? `<span class="category-count">${c.count}</span>` : ""}
        </a>`;
  }

  function renderCategoryGrid() {
    const catGrid = document.getElementById("categoryGrid");
    if (!catGrid) return;
    catGrid.innerHTML = (window.LITBUY_CATEGORIES || []).map(categoryCardHtml).join("");
  }

  function productCard(p) {
    const styles = p.styles ? ` [${p.styles} styles]` : "";
    const browseUrl = p.url || maisonlooksCategoryUrl(p.category, p.badge);
    const hasProductUrl = Boolean(p.url);
    const badge = p.badge
      ? `<span class="product-badge product-badge--${p.badge}">${p.badge === "hot" ? "🔥 HOT" : "🔥 TRENDING"}</span>`
      : "";
    const icons = { shoes: "👟", hoodies: "🧥", "t-shirts": "👕", jackets: "🧥", pants: "👖", bags: "👜", headwear: "🧢", accessories: "⌚", jersey: "⚽", electronics: "📱", other: "✨" };
    const icon = icons[p.category] || "📦";
    const browseLabel = hasProductUrl ? "View Product" : p.badge === "hot" ? "Browse Hot Picks" : p.badge === "trending" ? "Browse Trending" : "Browse Category";
    const productMeta = [p.brand, categoryLabel(p.category)].filter(Boolean).join(" / ");
    const productDesc = p.desc || "Selected LitBuy route for shoppers who want a fast product preview before opening LitBuy.";
    const primaryUrl = hasProductUrl ? browseUrl : buyUrl(p);
    const primaryLabel = hasProductUrl ? "Open Product" : "Buy On LitBuy";

    return `
      <article class="product-card">
        <a href="${browseUrl}" class="product-image product-image-link maisonlooks-link"${externalTargetAttrs(browseUrl)} aria-label="${browseLabel}: ${p.name}">
          ${badge}
          ${productImageHtml(p, icon)}
        </a>
        <div class="product-body">
          <div class="product-category">${productMeta}</div>
          <h3>${p.name}${styles}</h3>
          <p class="product-desc">${productDesc}</p>
          <a href="${browseUrl}" class="btn btn-secondary product-browse-btn maisonlooks-link"${externalTargetAttrs(browseUrl)}>${browseLabel}</a>
          <a href="${primaryUrl}" class="btn btn-primary maisonlooks-link"${externalTargetAttrs(primaryUrl)}>${primaryLabel}</a>
        </div>
      </article>`;
  }

  function renderProducts(container, products) {
    if (!container) return;
    container.innerHTML = products.length
      ? products.map(productCard).join("")
      : '<p style="color:var(--text-muted);grid-column:1/-1">No products found.</p>';
  }

  function initNav() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("siteNav");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
      });
    }
  }

  function initSearch() {
    const form = document.getElementById("heroSearch");
    const input = document.getElementById("heroSearchInput");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const q = input ? input.value.trim() : "";
        window.open(SEARCH_REDIRECT_URL + encodeURIComponent(q), "_blank", "noopener,noreferrer");
      });
    }
  }

  function initFaq() {
    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const answer = item.querySelector(".faq-answer");
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item").forEach((i) => {
          i.classList.remove("open");
          const a = i.querySelector(".faq-answer");
          const q = i.querySelector(".faq-question");
          if (a) a.style.maxHeight = "0";
          if (q) q.setAttribute("aria-expanded", "false");
        });

        if (!isOpen && answer) {
          item.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function formatHeroCount(value, format) {
    const n = Math.round(value);
    if (format === "k") return `${n}k+`;
    return `${n.toLocaleString("en-US")}+`;
  }

  function animateHeroCount(el) {
    const target = Number(el.dataset.target);
    const format = el.dataset.format || "number";
    const duration = 1000;
    const startTime = performance.now();

    el.classList.remove("is-counting");
    void el.offsetWidth;
    el.classList.add("is-counting");

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = easeOutExpo(progress) * target;
      el.textContent = formatHeroCount(current, format);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatHeroCount(target, format);
        setTimeout(() => el.classList.remove("is-counting"), 450);
      }
    }

    el.textContent = formatHeroCount(0, format);
    requestAnimationFrame(tick);
  }

  function playHeroStatCountUp() {
    const stats = document.querySelectorAll(".hero-stat-num--count");
    if (!stats.length) return;

    stats.forEach((el, index) => {
      setTimeout(() => animateHeroCount(el), index * 80);
    });
  }

  function isHomePage() {
    return document.body.dataset.page === "home";
  }

  function isHomeHref(href) {
    if (!href) return false;
    return href === "index.html" || href === "./" || href === "/" || href.endsWith("/index.html");
  }

  function initHeroCountUp() {
    if (!isHomePage()) return;

    playHeroStatCountUp();

    window.addEventListener("pageshow", (event) => {
      if (event.persisted) playHeroStatCountUp();
    });

    document.querySelectorAll("a.link-home, a.logo[href='index.html']").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (!isHomeHref(link.getAttribute("href"))) return;
        if (!isHomePage()) return;

        e.preventDefault();
        playHeroStatCountUp();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function initHome() {
    if (document.body.dataset.page !== "home") return;

    renderProducts(document.getElementById("popularProducts"), (window.LITBUY_PRODUCTS || []).slice(0, 6));

    const seoRoutes = document.getElementById("seoRoutes");
    if (seoRoutes) {
      seoRoutes.innerHTML = (window.LITBUY_SEO_ROUTES || [])
        .map((r) => `<a href="${r.href}" class="link-pill">${r.label}</a>`)
        .join("");
    }

    const brands = document.getElementById("brandRoutes");
    if (brands) {
      brands.innerHTML = (window.LITBUY_BRANDS || [])
        .map((b) => `<a href="${BRAND_PRODUCTS_URL}${encodeURIComponent(b)}" class="link-pill" target="_blank" rel="noopener noreferrer">${b} Finds</a>`)
        .join("");
    }
  }

  function initFinds() {
    if (document.body.dataset.page !== "finds") return;

    const params = new URLSearchParams(window.location.search);
    const q = (params.get("q") || "").toLowerCase();
    const category = params.get("category") || "";

    const searchInput = document.getElementById("findsSearch");
    const categoryFilter = document.getElementById("findsCategory");
    const countEl = document.getElementById("findsCount");

    if (searchInput && q) searchInput.value = params.get("q") || "";
    if (categoryFilter && category) categoryFilter.value = category;

    let products = window.LITBUY_PRODUCTS || [];

    function filterProducts() {
      const term = (searchInput?.value || "").toLowerCase();
      const cat = categoryFilter?.value || "";
      return products.filter((p) => {
        const matchCat = !cat || p.category === cat;
        const matchTerm =
          !term ||
          p.name.toLowerCase().includes(term) ||
          (p.brand && p.brand.toLowerCase().includes(term)) ||
          p.category.includes(term);
        return matchCat && matchTerm;
      });
    }

    function update() {
      const filtered = filterProducts();
      if (countEl) countEl.textContent = filtered.length + " products found";
      renderProducts(document.getElementById("findsGrid"), filtered);
    }

    searchInput?.addEventListener("input", update);
    categoryFilter?.addEventListener("change", update);
    update();
  }

  function boot() {
    renderCategoryGrid();
    initNav();
    initSearch();
    initFaq();
    initHome();
    initFinds();
    initHeroCountUp();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.LitBuySite = { buyUrl, renderProducts, productCard };
})();
