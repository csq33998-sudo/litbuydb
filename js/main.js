(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const AFFILIATE = cfg.affiliate || "https://litbuy.com";
  const SEARCH_REDIRECT_URL = "https://streetstyle.maisonlooks.com/en/search?q=";
  const BRAND_SEARCH_URL = "https://streetstyle.maisonlooks.com/en/search?q=";
  const ALLOWED_EXTERNAL_URL_ORIGINS = new Set([
    "https://litbuy.com",
    "https://streetstyle.maisonlooks.com",
    "https://cdn.maisonlooks.com"
  ]);
  const LANG_STORAGE_KEY = "litbuy-language";
  const LANG_OPTIONS = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "pl", label: "Polski", flag: "🇵🇱" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "nl", label: "Nederlands", flag: "🇳🇱" },
    { code: "da", label: "Dansk", flag: "🇩🇰" },
    { code: "sv", label: "Svenska", flag: "🇸🇪" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "cs", label: "Čeština", flag: "🇨🇿" }
  ];
  LANG_OPTIONS.splice(0, LANG_OPTIONS.length,
    { code: "en", label: "English", flag: "EN" },
    { code: "pl", label: "Polski", flag: "PL" },
    { code: "de", label: "Deutsch", flag: "DE" },
    { code: "fr", label: "Français", flag: "FR" },
    { code: "it", label: "Italiano", flag: "IT" },
    { code: "pt", label: "Português", flag: "PT" },
    { code: "es", label: "Español", flag: "ES" },
    { code: "nl", label: "Nederlands", flag: "NL" },
    { code: "da", label: "Dansk", flag: "DA" },
    { code: "sv", label: "Svenska", flag: "SV" },
    { code: "ar", label: "العربية", flag: "AR" },
    { code: "cs", label: "Čeština", flag: "CS" }
  );
  const SUPPORTED_LANG_CODES = new Set(LANG_OPTIONS.map(({ code }) => code));
  let currentLanguage = "en";
  const I18N = {
    en: {
      "nav.home": "Home",
      "nav.finds": "Finds",
      "nav.resources": "Resources",
      "nav.qc": "QC",
      "nav.blog": "Blog",
      "nav.new": "New",
      "nav.categories": "Categories",
      "nav.help": "Help",
      "nav.faq": "FAQ",
      "nav.language": "Language",
      "home.heroLabel": "Independent LitBuy Guide",
      "home.heroTitle": "LitBuy Spreadsheet for Finds, QC Photos and Source Links",
      "home.heroDesc": "A simple LitBuy spreadsheet resource for finds, source links, QC photo checks, shopping lists, and shipping checklist steps before you place an order through LitBuy.",
      "home.products": "Products",
      "home.updated": "Updated",
      "home.shoppers": "Shoppers",
      "home.badgeSellers": "Verified sellers only",
      "home.badgeQc": "QC photos reviewed",
      "home.badgeUpdates": "Daily updates",
      "home.badgeFree": "Free to browse",
      "home.search": "Search",
      "home.searchPlaceholder": "Search LitBuy finds...",
      "home.categoriesLabel": "Categories",
      "home.categoriesTitle": "Browse LitBuy Finds Categories",
      "home.categoryProductsLabel": "StreetStyle product routes",
      "home.categoryProductsTitle": "Open a product card, then view the exact item.",
      "home.categoryProductsSubtitle": "Each card links to the matching StreetStyle product detail page, not a broad category page.",
      "home.categoryProductKicker": "LITBUY SPREADSHEET CATEGORY",
      "home.viewAllCategories": "View all categories",
      "home.openCategoryProducts": "Open products",
      "home.categoryPriceRange": "Price range",
      "home.categoryQcNote": "QC note",
      "home.guideLabel": "LitBuy Guide",
      "home.guideTitle": "What is LitBuy Spreadsheet and how do shoppers use it?",
      "home.guideBody1": "LitBuy is a China shopping agent used by international shoppers to browse products from marketplaces such as Taobao, Weidian, and 1688. Instead of ordering directly from sellers, shoppers can use LitBuy to place a purchase request, receive warehouse quality-check photos, combine multiple items into one parcel, and choose an international shipping line.",
      "home.guideBody2": "This LitBuy Spreadsheet resource helps users find popular product categories faster, including shoes, hoodies, T-shirts, jackets, bags, accessories, and other streetwear finds. Each category route is designed to make product discovery easier before opening a MaisonLooks or LitBuy shopping page.",
      "home.guideSub1": "Why shoppers search for a LitBuy Spreadsheet",
      "home.guideSub1Body": "Many users look for LitBuy finds when they want curated product ideas, QC-friendly sellers, budget options, or quick links for building a haul. A structured LitBuy Spreadsheet page saves time compared with browsing scattered posts or seller links one by one.",
      "home.guideSub2": "How to start browsing",
      "home.guideSub2Body": "Use the search box above to look up a product keyword, or browse the category cards to open a focused product route. For more details, read the LitBuy review, explore LitBuy finds, or compare LitBuy alternatives.",
      "home.resourcesLabel": "Resource Hub",
      "home.resourcesTitle": "Explore LitBuy Resources",
      "home.openResource": "Open resource →",
      "home.productRoutesLabel": "Product Routes",
      "home.productRoutesTitle": "Popular LitBuy Finds",
      "home.brandRoutesLabel": "Brand Routes",
      "home.brandRoutesTitle": "Popular LitBuy Finds Brands",
      "home.communityLabel": "Community",
      "home.communityTitle": "Community Picks",
      "home.communityCard1Title": "Most Popular This Week",
      "home.communityCard1Body": "Fast category routes for shoppers opening LitBuy spreadsheet style searches this week.",
      "home.communityCard2Title": "Trending Finds",
      "home.communityCard2Body": "Streetwear, shoes, hoodie, and accessories routes selected for quick LitBuy browsing.",
      "home.communityCard3Title": "Best Budget Finds",
      "home.communityCard3Body": "Budget-friendly discovery paths for users comparing platform finds before opening product pages.",
      "home.communityCard4Title": "Editor's Picks",
      "home.communityCard4Body": "Compact editor routes for LitBuy users who want brands, products, and search shortcuts.",
      "home.searchOnLitBuy": "Search on LitBuy",
      "home.faqTitle": "LitBuy FAQ",
      "home.faqQ1": "What is LitBuy?",
      "home.faqQ2": "Is this an ecommerce store?",
      "home.faqQ3": "How do I use this resource?",
      "home.faqQ4": "What are the best LitBuy Finds?",
      "home.faqQ5": "Why buy through LitBuy?",
      "home.footerDesc": "Google Spreadsheet, shopping guide, and LitBuy redirect hub.",
      "home.startLabel": "Start Here",
      "home.startTitle": "New to LitBuy? Start with the spreadsheet workflow",
      "home.startSubtitle": "Use this site as a practical route map before placing an order. The goal is to move from product discovery to QC review without wasting time on scattered links.",
      "home.startStep1Title": "Browse LitBuy Spreadsheet",
      "home.startStep1Body": "Start with curated categories, popular product routes, and brand shortcuts for Taobao, Weidian, and 1688 finds.",
      "home.startStep2Title": "Open Source Links",
      "home.startStep2Body": "Compare source links, product names, categories, seller notes, and live listing details before opening the LitBuy ordering page.",
      "home.startStep3Title": "Order Through LitBuy",
      "home.startStep3Body": "Use LitBuy to submit the item, manage warehouse intake, combine parcels, and prepare international shipping.",
      "home.startStep4Title": "Check QC Photos and Shipping",
      "home.startStep4Body": "Review warehouse photos, confirm sizing and quality, then use a shipping checklist before choosing a line for your haul.",
      "home.latestLabel": "Latest Guides",
      "home.latestTitle": "LitBuy shopping guides for beginners",
      "home.latestSubtitle": "Short resource pages for the questions shoppers usually ask before building a haul.",
      "home.aboutSpreadsheetLabel": "About Our Spreadsheet",
      "home.aboutSpreadsheetTitle": "Why this LitBuy Spreadsheet is built for product discovery",
      "home.compareLabel": "Compare & Tips",
      "home.compareTitle": "Compare agents and plan smarter orders",
      "footer.spreadsheet": "Spreadsheet",
      "footer.guides": "Guides",
      "footer.company": "Company",
      "footer.finds": "LitBuy Finds",
      "footer.spreadsheetLinks": "Spreadsheet Links",
      "footer.categories": "Categories",
      "footer.review": "LitBuy Review",
      "footer.qc": "LitBuy QC",
      "footer.blog": "LitBuy Blog",
      "footer.new": "LitBuy New",
      "footer.haul": "Haul Guide",
      "footer.alternatives": "Alternatives",
      "footer.help": "Help",
      "footer.about": "About",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms"
    },
    de: {
      "nav.home": "Startseite", "nav.finds": "Funde", "nav.resources": "Ressourcen", "nav.categories": "Kategorien", "nav.faq": "FAQ", "nav.language": "Sprache",
      "home.heroLabel": "Unabhängiger LitBuy Guide", "home.heroTitle": "Entdecke kuratierte LitBuy Picks", "home.heroDesc": "Eine einfache, schnelle LitBuy Spreadsheet-Ressource für Funde, Einkaufslisten, Suche und Kategorien, damit du schneller stöbern und mit einem Klick über LitBuy bestellen kannst.",
      "home.products": "Produkte", "home.updated": "Aktualisiert", "home.shoppers": "Shopper", "home.badgeSellers": "Nur geprüfte Verkäufer", "home.badgeQc": "QC-Fotos geprüft", "home.badgeUpdates": "Tägliche Updates", "home.badgeFree": "Kostenlos stöbern", "home.search": "Suchen", "home.searchPlaceholder": "LitBuy-Funde suchen...",
      "home.categoriesLabel": "Kategorien", "home.categoriesTitle": "LitBuy Finds nach Kategorien durchsuchen", "home.guideLabel": "LitBuy Guide", "home.guideTitle": "Was ist LitBuy Spreadsheet und wie nutzen Shopper es?", "home.guideBody1": "LitBuy ist ein China-Shopping-Agent für internationale Käufer, die Produkte von Taobao, Weidian und 1688 entdecken möchten. Statt direkt bei Verkäufern zu bestellen, können Käufer über LitBuy eine Bestellung aufgeben, QC-Fotos erhalten, mehrere Artikel bündeln und eine internationale Versandlinie wählen.", "home.guideBody2": "Diese LitBuy Spreadsheet-Ressource hilft Nutzern, beliebte Produktkategorien schneller zu finden, darunter Schuhe, Hoodies, T-Shirts, Jacken, Taschen, Accessoires und Streetwear-Funde.", "home.guideSub1": "Warum Shopper nach einem LitBuy Spreadsheet suchen", "home.guideSub1Body": "Viele Nutzer suchen nach LitBuy Finds, wenn sie kuratierte Produktideen, QC-freundliche Verkäufer, Budgetoptionen oder schnelle Links für einen Haul wünschen.", "home.guideSub2": "So startest du", "home.guideSub2Body": "Nutze die Suche oben für ein Produkt-Keyword oder öffne über die Kategorien eine fokussierte Produktroute.",
      "home.resourcesLabel": "Ressourcen", "home.resourcesTitle": "LitBuy Ressourcen entdecken", "home.openResource": "Ressource öffnen →", "home.productRoutesLabel": "Produktrouten", "home.productRoutesTitle": "Beliebte LitBuy Finds", "home.brandRoutesLabel": "Markenrouten", "home.brandRoutesTitle": "Beliebte LitBuy Marken", "home.communityLabel": "Community", "home.communityTitle": "Community Picks", "home.communityCard1Title": "Diese Woche beliebt", "home.communityCard1Body": "Schnelle Kategorien für Shopper, die diese Woche LitBuy Spreadsheet-Suchen öffnen.", "home.communityCard2Title": "Trend-Funde", "home.communityCard2Body": "Streetwear-, Schuh-, Hoodie- und Accessoire-Routen für schnelles LitBuy-Browsing.", "home.communityCard3Title": "Beste Budget-Funde", "home.communityCard3Body": "Budgetfreundliche Wege für Nutzer, die Plattform-Funde vergleichen.", "home.communityCard4Title": "Editor's Picks", "home.communityCard4Body": "Kompakte Routen für LitBuy-Nutzer, die Marken, Produkte und Suchabkürzungen wollen.", "home.searchOnLitBuy": "Auf LitBuy suchen", "home.faqTitle": "LitBuy FAQ", "home.faqQ1": "Was ist LitBuy?", "home.faqQ2": "Ist das ein Onlineshop?", "home.faqQ3": "Wie nutze ich diese Ressource?", "home.faqQ4": "Was sind die besten LitBuy Finds?", "home.faqQ5": "Warum über LitBuy kaufen?", "home.footerDesc": "Google-SEO-Ressource, Shopping-Guide und LitBuy-Redirect-Hub.", "footer.about": "Über uns", "footer.privacy": "Datenschutz", "footer.terms": "Bedingungen"
    },
    fr: {
      "nav.home": "Accueil", "nav.finds": "Trouvailles", "nav.resources": "Ressources", "nav.categories": "Catégories", "nav.faq": "FAQ", "nav.language": "Langue",
      "home.heroLabel": "Guide LitBuy indépendant", "home.heroTitle": "Découvrez des sélections LitBuy", "home.heroDesc": "Une ressource LitBuy Spreadsheet simple et rapide pour les trouvailles, listes d'achat, recherches et catégories, afin de parcourir plus vite et commander via LitBuy en un clic.",
      "home.products": "Produits", "home.updated": "Mis à jour", "home.shoppers": "Acheteurs", "home.badgeSellers": "Vendeurs vérifiés", "home.badgeQc": "Photos QC vérifiées", "home.badgeUpdates": "Mises à jour quotidiennes", "home.badgeFree": "Navigation gratuite", "home.search": "Rechercher", "home.searchPlaceholder": "Rechercher des trouvailles LitBuy...",
      "home.categoriesLabel": "Catégories", "home.categoriesTitle": "Parcourir les catégories LitBuy Finds", "home.guideLabel": "Guide LitBuy", "home.guideTitle": "Qu'est-ce que LitBuy Spreadsheet et comment l'utiliser ?", "home.guideBody1": "LitBuy est un agent d'achat en Chine utilisé par les acheteurs internationaux pour parcourir Taobao, Weidian et 1688. Les utilisateurs peuvent passer une demande d'achat, recevoir des photos QC, regrouper des articles et choisir une ligne d'expédition internationale.", "home.guideBody2": "Cette ressource LitBuy Spreadsheet aide à trouver plus vite les catégories populaires comme chaussures, hoodies, T-shirts, vestes, sacs, accessoires et streetwear.", "home.guideSub1": "Pourquoi chercher un LitBuy Spreadsheet", "home.guideSub1Body": "Les utilisateurs cherchent des LitBuy finds pour des idées sélectionnées, des vendeurs compatibles QC, des options budget ou des liens rapides pour composer un haul.", "home.guideSub2": "Comment commencer", "home.guideSub2Body": "Utilisez la recherche ci-dessus ou ouvrez une route produit ciblée depuis les cartes de catégories.",
      "home.resourcesLabel": "Ressources", "home.resourcesTitle": "Explorer les ressources LitBuy", "home.openResource": "Ouvrir la ressource →", "home.productRoutesLabel": "Routes produit", "home.productRoutesTitle": "LitBuy Finds populaires", "home.brandRoutesLabel": "Routes marque", "home.brandRoutesTitle": "Marques LitBuy populaires", "home.communityLabel": "Communauté", "home.communityTitle": "Sélections communauté", "home.communityCard1Title": "Les plus populaires cette semaine", "home.communityCard1Body": "Routes rapides pour les recherches de style LitBuy Spreadsheet cette semaine.", "home.communityCard2Title": "Trouvailles tendance", "home.communityCard2Body": "Routes streetwear, chaussures, hoodies et accessoires pour parcourir LitBuy rapidement.", "home.communityCard3Title": "Meilleures trouvailles budget", "home.communityCard3Body": "Parcours économiques pour comparer les trouvailles avant d'ouvrir les pages produit.", "home.communityCard4Title": "Choix de la rédaction", "home.communityCard4Body": "Routes compactes pour marques, produits et raccourcis de recherche.", "home.searchOnLitBuy": "Rechercher sur LitBuy", "home.faqTitle": "FAQ LitBuy", "home.faqQ1": "Qu'est-ce que LitBuy ?", "home.faqQ2": "Est-ce une boutique en ligne ?", "home.faqQ3": "Comment utiliser cette ressource ?", "home.faqQ4": "Quelles sont les meilleures trouvailles LitBuy ?", "home.faqQ5": "Pourquoi acheter via LitBuy ?", "home.footerDesc": "Ressource SEO Google, guide d'achat et hub de redirection LitBuy.", "footer.about": "À propos", "footer.privacy": "Confidentialité", "footer.terms": "Conditions"
    },
    es: {
      "nav.home": "Inicio", "nav.finds": "Hallazgos", "nav.resources": "Recursos", "nav.categories": "Categorías", "nav.faq": "FAQ", "nav.language": "Idioma",
      "home.heroLabel": "Guía LitBuy independiente", "home.heroTitle": "Descubre selecciones LitBuy", "home.heroDesc": "Un recurso LitBuy Spreadsheet simple y rápido para hallazgos, listas de compra, búsqueda y categorías, para navegar más rápido y pedir por LitBuy con un clic.",
      "home.products": "Productos", "home.updated": "Actualizado", "home.shoppers": "Compradores", "home.badgeSellers": "Vendedores verificados", "home.badgeQc": "Fotos QC revisadas", "home.badgeUpdates": "Actualizaciones diarias", "home.badgeFree": "Gratis para navegar", "home.search": "Buscar", "home.searchPlaceholder": "Buscar hallazgos LitBuy...",
      "home.categoriesLabel": "Categorías", "home.categoriesTitle": "Explorar categorías de LitBuy Finds", "home.guideLabel": "Guía LitBuy", "home.guideTitle": "¿Qué es LitBuy Spreadsheet y cómo se usa?", "home.guideBody1": "LitBuy es un agente de compras en China para compradores internacionales que buscan productos en Taobao, Weidian y 1688. Permite solicitar compras, recibir fotos QC, consolidar artículos y elegir envío internacional.", "home.guideBody2": "Este recurso LitBuy Spreadsheet ayuda a encontrar más rápido categorías populares como zapatillas, hoodies, camisetas, chaquetas, bolsos, accesorios y streetwear.", "home.guideSub1": "Por qué se busca un LitBuy Spreadsheet", "home.guideSub1Body": "Muchos usuarios buscan LitBuy finds para ideas curadas, vendedores aptos para QC, opciones económicas o enlaces rápidos para crear un haul.", "home.guideSub2": "Cómo empezar", "home.guideSub2Body": "Usa la búsqueda superior o abre una ruta de producto desde las tarjetas de categoría.",
      "home.resourcesLabel": "Recursos", "home.resourcesTitle": "Explorar recursos LitBuy", "home.openResource": "Abrir recurso →", "home.productRoutesLabel": "Rutas de producto", "home.productRoutesTitle": "LitBuy Finds populares", "home.brandRoutesLabel": "Rutas de marca", "home.brandRoutesTitle": "Marcas LitBuy populares", "home.communityLabel": "Comunidad", "home.communityTitle": "Selecciones de la comunidad", "home.communityCard1Title": "Más popular esta semana", "home.communityCard1Body": "Rutas rápidas para búsquedas tipo LitBuy Spreadsheet esta semana.", "home.communityCard2Title": "Hallazgos en tendencia", "home.communityCard2Body": "Rutas de streetwear, zapatillas, hoodies y accesorios para navegar rápido.", "home.communityCard3Title": "Mejores hallazgos económicos", "home.communityCard3Body": "Rutas económicas para comparar hallazgos antes de abrir páginas de producto.", "home.communityCard4Title": "Selección editorial", "home.communityCard4Body": "Rutas compactas para marcas, productos y accesos de búsqueda.", "home.searchOnLitBuy": "Buscar en LitBuy", "home.faqTitle": "FAQ de LitBuy", "home.faqQ1": "¿Qué es LitBuy?", "home.faqQ2": "¿Es una tienda online?", "home.faqQ3": "¿Cómo uso este recurso?", "home.faqQ4": "¿Cuáles son los mejores LitBuy Finds?", "home.faqQ5": "¿Por qué comprar con LitBuy?", "home.footerDesc": "Recurso SEO de Google, guía de compras y hub de redirección LitBuy.", "footer.about": "Acerca de", "footer.privacy": "Privacidad", "footer.terms": "Términos"
    },
    it: {
      "nav.home": "Home", "nav.finds": "Trova", "nav.resources": "Risorse", "nav.categories": "Categorie", "nav.faq": "FAQ", "nav.language": "Lingua",
      "home.heroLabel": "Guida LitBuy indipendente", "home.heroTitle": "Scopri selezioni LitBuy curate", "home.heroDesc": "Una risorsa LitBuy Spreadsheet semplice e veloce per finds, liste shopping, ricerca e categorie, così puoi navigare più rapidamente e ordinare tramite LitBuy con un clic.",
      "home.products": "Prodotti", "home.updated": "Aggiornato", "home.shoppers": "Acquirenti", "home.badgeSellers": "Solo venditori verificati", "home.badgeQc": "Foto QC controllate", "home.badgeUpdates": "Aggiornamenti quotidiani", "home.badgeFree": "Navigazione gratuita", "home.search": "Cerca", "home.searchPlaceholder": "Cerca finds LitBuy...",
      "home.categoriesLabel": "Categorie", "home.categoriesTitle": "Sfoglia categorie LitBuy Finds", "home.guideLabel": "Guida LitBuy", "home.guideTitle": "Cos'è LitBuy Spreadsheet e come si usa?", "home.guideBody1": "LitBuy è un agente shopping in Cina usato da acquirenti internazionali per prodotti da Taobao, Weidian e 1688. Permette richieste d'acquisto, foto QC, consolidamento pacchi e spedizione internazionale.", "home.guideBody2": "Questa risorsa LitBuy Spreadsheet aiuta a trovare più rapidamente categorie popolari come scarpe, hoodie, T-shirt, giacche, borse, accessori e streetwear.", "home.guideSub1": "Perché si cerca un LitBuy Spreadsheet", "home.guideSub1Body": "Gli utenti cercano LitBuy finds per idee curate, venditori adatti al QC, opzioni economiche o link rapidi per creare un haul.", "home.guideSub2": "Come iniziare", "home.guideSub2Body": "Usa la ricerca in alto o apri una rotta prodotto dalle categorie.",
      "home.resourcesLabel": "Risorse", "home.resourcesTitle": "Esplora risorse LitBuy", "home.openResource": "Apri risorsa →", "home.productRoutesLabel": "Rotte prodotto", "home.productRoutesTitle": "LitBuy Finds popolari", "home.brandRoutesLabel": "Rotte brand", "home.brandRoutesTitle": "Brand LitBuy popolari", "home.communityLabel": "Community", "home.communityTitle": "Scelte community", "home.communityCard1Title": "Più popolari questa settimana", "home.communityCard1Body": "Rotte rapide per ricerche stile LitBuy Spreadsheet questa settimana.", "home.communityCard2Title": "Finds di tendenza", "home.communityCard2Body": "Rotte streetwear, scarpe, hoodie e accessori per navigare velocemente.", "home.communityCard3Title": "Migliori finds economici", "home.communityCard3Body": "Percorsi budget per confrontare finds prima di aprire le pagine prodotto.", "home.communityCard4Title": "Scelte editoriali", "home.communityCard4Body": "Rotte compatte per brand, prodotti e scorciatoie di ricerca.", "home.searchOnLitBuy": "Cerca su LitBuy", "home.faqTitle": "FAQ LitBuy", "home.faqQ1": "Cos'è LitBuy?", "home.faqQ2": "È un ecommerce?", "home.faqQ3": "Come uso questa risorsa?", "home.faqQ4": "Quali sono i migliori LitBuy Finds?", "home.faqQ5": "Perché comprare tramite LitBuy?", "home.footerDesc": "Risorsa SEO Google, guida shopping e hub redirect LitBuy.", "footer.about": "Chi siamo", "footer.privacy": "Privacy", "footer.terms": "Termini"
    },
    nl: {
      "nav.home": "Home", "nav.finds": "Vondsten", "nav.resources": "Resources", "nav.categories": "Categorieën", "nav.faq": "FAQ", "nav.language": "Taal",
      "home.heroLabel": "Onafhankelijke LitBuy gids", "home.heroTitle": "Ontdek geselecteerde LitBuy picks", "home.heroDesc": "Een eenvoudige, snelle LitBuy Spreadsheet-resource voor vondsten, shoppinglijsten, zoeken en categorieën, zodat je sneller browset en met één klik via LitBuy bestelt.",
      "home.products": "Producten", "home.updated": "Bijgewerkt", "home.shoppers": "Shoppers", "home.badgeSellers": "Alleen geverifieerde verkopers", "home.badgeQc": "QC-foto's gecontroleerd", "home.badgeUpdates": "Dagelijkse updates", "home.badgeFree": "Gratis browsen", "home.search": "Zoeken", "home.searchPlaceholder": "Zoek LitBuy-vondsten...",
      "home.categoriesLabel": "Categorieën", "home.categoriesTitle": "Browse LitBuy Finds-categorieën", "home.guideLabel": "LitBuy gids", "home.guideTitle": "Wat is LitBuy Spreadsheet en hoe gebruik je het?", "home.guideBody1": "LitBuy is een China shopping agent voor internationale kopers die producten van Taobao, Weidian en 1688 bekijken. Je kunt een aankoopverzoek plaatsen, QC-foto's ontvangen, artikelen bundelen en internationale verzending kiezen.", "home.guideBody2": "Deze LitBuy Spreadsheet-resource helpt populaire categorieën sneller te vinden, zoals schoenen, hoodies, T-shirts, jassen, tassen, accessoires en streetwear.", "home.guideSub1": "Waarom shoppers een LitBuy Spreadsheet zoeken", "home.guideSub1Body": "Gebruikers zoeken LitBuy finds voor gecureerde ideeën, QC-vriendelijke verkopers, budgetopties of snelle links voor een haul.", "home.guideSub2": "Beginnen met browsen", "home.guideSub2Body": "Gebruik de zoekbalk bovenaan of open een gerichte productroute via de categoriekaarten.",
      "home.resourcesLabel": "Resources", "home.resourcesTitle": "Ontdek LitBuy resources", "home.openResource": "Resource openen →", "home.productRoutesLabel": "Productroutes", "home.productRoutesTitle": "Populaire LitBuy Finds", "home.brandRoutesLabel": "Merkroutes", "home.brandRoutesTitle": "Populaire LitBuy merken", "home.communityLabel": "Community", "home.communityTitle": "Community picks", "home.communityCard1Title": "Populairst deze week", "home.communityCard1Body": "Snelle categorieroutes voor LitBuy Spreadsheet-achtige zoekopdrachten deze week.", "home.communityCard2Title": "Trending vondsten", "home.communityCard2Body": "Streetwear-, schoenen-, hoodie- en accessoireroutes voor snel browsen.", "home.communityCard3Title": "Beste budgetvondsten", "home.communityCard3Body": "Budgetvriendelijke routes om platformvondsten te vergelijken.", "home.communityCard4Title": "Editor's picks", "home.communityCard4Body": "Compacte routes voor merken, producten en zoekshortcuts.", "home.searchOnLitBuy": "Zoeken op LitBuy", "home.faqTitle": "LitBuy FAQ", "home.faqQ1": "Wat is LitBuy?", "home.faqQ2": "Is dit een webshop?", "home.faqQ3": "Hoe gebruik ik deze resource?", "home.faqQ4": "Wat zijn de beste LitBuy Finds?", "home.faqQ5": "Waarom kopen via LitBuy?", "home.footerDesc": "Google SEO-resource, shoppinggids en LitBuy redirect-hub.", "footer.about": "Over", "footer.privacy": "Privacybeleid", "footer.terms": "Voorwaarden"
    },
    pt: {
      "nav.home": "Início", "nav.finds": "Achados", "nav.resources": "Recursos", "nav.categories": "Categorias", "nav.faq": "FAQ", "nav.language": "Idioma",
      "home.heroLabel": "Guia LitBuy independente", "home.heroTitle": "Descubra seleções LitBuy", "home.heroDesc": "Um recurso LitBuy Spreadsheet simples e rápido para achados, listas, busca e categorias, para navegar mais rápido e comprar pela LitBuy com um clique.",
      "home.products": "Produtos", "home.updated": "Atualizado", "home.shoppers": "Compradores", "home.badgeSellers": "Vendedores verificados", "home.badgeQc": "Fotos QC revisadas", "home.badgeUpdates": "Atualizações diárias", "home.badgeFree": "Grátis para navegar", "home.search": "Buscar", "home.searchPlaceholder": "Buscar achados LitBuy...",
      "home.categoriesLabel": "Categorias", "home.categoriesTitle": "Explorar categorias LitBuy Finds", "home.guideLabel": "Guia LitBuy", "home.guideTitle": "O que é LitBuy Spreadsheet e como usar?", "home.guideBody1": "LitBuy é um agente de compras na China usado por compradores internacionais para navegar por Taobao, Weidian e 1688. É possível enviar pedidos, receber fotos QC, consolidar itens e escolher envio internacional.", "home.guideBody2": "Este recurso LitBuy Spreadsheet ajuda a encontrar mais rápido categorias populares como tênis, hoodies, camisetas, jaquetas, bolsas, acessórios e streetwear.", "home.guideSub1": "Por que procurar um LitBuy Spreadsheet", "home.guideSub1Body": "Muitos usuários procuram LitBuy finds para ideias selecionadas, vendedores bons para QC, opções econômicas ou links rápidos para montar um haul.", "home.guideSub2": "Como começar", "home.guideSub2Body": "Use a busca acima ou abra uma rota de produto nas categorias.",
      "home.resourcesLabel": "Recursos", "home.resourcesTitle": "Explorar recursos LitBuy", "home.openResource": "Abrir recurso →", "home.productRoutesLabel": "Rotas de produto", "home.productRoutesTitle": "LitBuy Finds populares", "home.brandRoutesLabel": "Rotas de marca", "home.brandRoutesTitle": "Marcas LitBuy populares", "home.communityLabel": "Comunidade", "home.communityTitle": "Escolhas da comunidade", "home.communityCard1Title": "Mais popular esta semana", "home.communityCard1Body": "Rotas rápidas para pesquisas estilo LitBuy Spreadsheet nesta semana.", "home.communityCard2Title": "Achados em alta", "home.communityCard2Body": "Rotas de streetwear, tênis, hoodies e acessórios para navegação rápida.", "home.communityCard3Title": "Melhores achados econômicos", "home.communityCard3Body": "Caminhos econômicos para comparar achados antes de abrir páginas de produto.", "home.communityCard4Title": "Escolhas editoriais", "home.communityCard4Body": "Rotas compactas para marcas, produtos e atalhos de busca.", "home.searchOnLitBuy": "Buscar na LitBuy", "home.faqTitle": "FAQ LitBuy", "home.faqQ1": "O que é LitBuy?", "home.faqQ2": "Isto é uma loja online?", "home.faqQ3": "Como uso este recurso?", "home.faqQ4": "Quais são os melhores LitBuy Finds?", "home.faqQ5": "Por que comprar pela LitBuy?", "home.footerDesc": "Recurso SEO Google, guia de compras e hub de redirecionamento LitBuy.", "footer.about": "Sobre", "footer.privacy": "Privacidade", "footer.terms": "Termos"
    },
    zh: {
      "nav.home": "首页",
      "nav.finds": "好物",
      "nav.resources": "资源",
      "nav.categories": "分类",
      "nav.help": "帮助",
      "nav.faq": "常见问题",
      "nav.language": "语言",
      "home.heroLabel": "独立 LitBuy 指南",
      "home.heroTitle": "发现精选 LitBuy 好物",
      "home.heroDesc": "一个简单高效的 LitBuy 表格资源，覆盖好物、购物清单、搜索和分类浏览，帮助你更快找到商品并跳转到 LitBuy 下单。",
      "home.products": "商品",
      "home.updated": "更新",
      "home.shoppers": "买家",
      "home.badgeSellers": "仅收录已验证卖家",
      "home.badgeQc": "质检照片已审核",
      "home.badgeUpdates": "每日更新",
      "home.badgeFree": "免费浏览",
      "home.search": "搜索",
      "home.searchPlaceholder": "搜索 LitBuy 好物...",
      "home.categoriesLabel": "分类",
      "home.categoriesTitle": "浏览 LitBuy 好物分类",
      "home.resourcesLabel": "资源中心",
      "home.resourcesTitle": "探索 LitBuy 资源",
      "home.openResource": "打开资源 →",
      "home.productRoutesLabel": "商品路线",
      "home.productRoutesTitle": "热门 LitBuy 好物",
      "home.brandRoutesLabel": "品牌路线",
      "home.brandRoutesTitle": "热门 LitBuy 品牌好物",
      "home.communityLabel": "社区",
      "home.communityTitle": "社区精选",
      "home.searchOnLitBuy": "在 LitBuy 搜索",
      "home.faqTitle": "LitBuy 常见问题",
      "home.footerDesc": "Google 表格、购物指南和 LitBuy 跳转中心。",
      "footer.spreadsheet": "表格",
      "footer.guides": "指南",
      "footer.company": "公司",
      "footer.finds": "LitBuy 好物",
      "footer.spreadsheetLinks": "表格链接",
      "footer.categories": "分类",
      "footer.review": "LitBuy 评测",
      "footer.haul": "拼单指南",
      "footer.alternatives": "替代平台",
      "footer.help": "帮助",
      "footer.about": "关于",
      "footer.privacy": "隐私政策",
      "footer.terms": "条款"
    },
    pl: { "nav.home": "Strona główna", "nav.finds": "Znaleziska", "nav.resources": "Zasoby", "nav.categories": "Kategorie", "nav.help": "Pomoc", "nav.faq": "FAQ", "nav.language": "Język", "home.search": "Szukaj", "home.searchPlaceholder": "Szukaj znalezisk LitBuy...", "footer.help": "Pomoc", "footer.about": "O nas", "footer.privacy": "Prywatność", "footer.terms": "Warunki" },
    da: { "nav.home": "Forside", "nav.finds": "Fund", "nav.resources": "Ressourcer", "nav.categories": "Kategorier", "nav.help": "Hjælp", "nav.faq": "FAQ", "nav.language": "Sprog", "home.search": "Søg", "home.searchPlaceholder": "Søg efter LitBuy-fund...", "footer.help": "Hjælp", "footer.about": "Om", "footer.privacy": "Privatliv", "footer.terms": "Vilkår" },
    sv: { "nav.home": "Hem", "nav.finds": "Fynd", "nav.resources": "Resurser", "nav.categories": "Kategorier", "nav.help": "Hjälp", "nav.faq": "FAQ", "nav.language": "Språk", "home.search": "Sök", "home.searchPlaceholder": "Sök LitBuy-fynd...", "footer.help": "Hjälp", "footer.about": "Om", "footer.privacy": "Integritet", "footer.terms": "Villkor" },
    ar: { "nav.home": "الرئيسية", "nav.finds": "المنتجات", "nav.resources": "الموارد", "nav.categories": "الفئات", "nav.help": "المساعدة", "nav.faq": "الأسئلة", "nav.language": "اللغة", "home.search": "بحث", "home.searchPlaceholder": "ابحث عن منتجات LitBuy...", "footer.help": "المساعدة", "footer.about": "حول", "footer.privacy": "الخصوصية", "footer.terms": "الشروط" },
    cs: { "nav.home": "Domů", "nav.finds": "Nálezy", "nav.resources": "Zdroje", "nav.categories": "Kategorie", "nav.help": "Nápověda", "nav.faq": "FAQ", "nav.language": "Jazyk", "home.search": "Hledat", "home.searchPlaceholder": "Hledat LitBuy nálezy...", "footer.help": "Nápověda", "footer.about": "O nás", "footer.privacy": "Soukromí", "footer.terms": "Podmínky" }
  };
  const EXTRA_I18N = {
    en: {
      "nav.toggle": "Toggle navigation",
      "category.shoes": "Shoes",
      "category.hoodies": "Hoodies / Sweaters",
      "category.t-shirts": "T-Shirts",
      "category.jackets": "Jackets",
      "category.pants": "Pants / Shorts",
      "category.bags": "Bags",
      "category.headwear": "Headwear",
      "category.accessories": "Accessories",
      "category.jersey": "Jersey",
      "category.electronics": "Electronics",
      "category.other": "Other Stuff",
      "product.viewProduct": "View Product",
      "product.openProduct": "Open Product",
      "product.buyOnLitBuy": "Buy On LitBuy",
      "product.browseHot": "Browse Hot Picks",
      "product.browseTrending": "Browse Trending",
      "product.browseCategory": "Browse Category",
      "product.defaultDesc": "Selected LitBuy route for shoppers who want a fast product preview before opening LitBuy.",
      "finds.title": "LitBuy Finds",
      "finds.subtitle": "Browse curated products with search, filters, source links, QC photo reminders, and direct LitBuy purchase links.",
      "finds.searchPlaceholder": "Search products, brands...",
      "finds.searchAria": "Search products",
      "finds.filterAria": "Filter by category",
      "finds.allCategories": "All Categories",
      "finds.count": "{count} products found",
      "finds.empty": "No products found.",
      "home.daily": "Daily",
      "home.latestCard1Kicker": "Buying Guide",
      "home.latestCard1Title": "How to buy with LitBuy",
      "home.latestCard1Body": "Learn how paste-link ordering, warehouse storage, QC photos, and international shipping work together.",
      "home.latestCard1Link": "Read guide →",
      "home.latestCard2Kicker": "Haul Guide",
      "home.latestCard2Title": "Planning a LitBuy haul",
      "home.latestCard2Body": "Use spreadsheet routes to organize shoes, hoodies, jackets, accessories, and other finds before shipping.",
      "home.latestCard2Link": "Read guide →",
      "home.latestCard3Kicker": "QC Guide",
      "home.latestCard3Title": "How to check LitBuy QC photos",
      "home.latestCard3Body": "Use warehouse photos to confirm color, sizing details, visible defects, packaging, and shipping risks before submitting a parcel.",
      "home.latestCard3Link": "Open QC guide →",
      "home.latestCard4Kicker": "Shipping Checklist",
      "home.latestCard4Title": "Check a LitBuy haul before shipping",
      "home.latestCard4Body": "Review QC photos, source links, restrictions, parcel weight, packaging, address details, and tracking steps before paying freight.",
      "home.latestCard4Link": "Open checklist →",
      "home.seoBody1": "The LitBuy Spreadsheet is designed as a practical shopping index for international buyers who want to discover product ideas before placing an order. Instead of searching through scattered posts, old seller links, or disconnected marketplace pages, shoppers can start with organized categories, brand routes, and curated finds.",
      "home.seoBody2": "Each section is written around the way people actually search: LitBuy finds, product spreadsheets, source links, shopping agent reviews, hauls, QC photos, Taobao links, Weidian links, 1688 routes, shipping checklist steps, and category-specific items like shoes, hoodies, jackets, bags, and accessories.",
      "home.seoBody3": "This site is independent and informational. Product checkout, QC review, warehouse storage, and international shipping are handled through LitBuy.com or the linked shopping pages. Our role is to make discovery faster and give each shopper a clearer path from keyword search to order preparation.",
      "home.browseTitle": "What you can browse",
      "home.browse1": "Curated LitBuy finds and category routes",
      "home.browse2": "Spreadsheet-style product shortcuts",
      "home.browse3": "Shopping guide and review content",
      "home.browse4": "Haul planning, QC-focused tips, and shipping checklist steps",
      "home.browse5": "Agent comparison and alternative pages",
      "home.compareCard1Title": "LitBuy vs other agents",
      "home.compareCard1Body": "Use the alternatives page to compare shopping agent workflows, discovery routes, QC handling, warehouse steps, and shipping considerations.",
      "home.compareCard1Cta": "View alternatives",
      "home.compareCard2Title": "Deals and shopping tips",
      "home.compareCard2Body": "Before ordering, compare item cost, estimated shipping weight, coupon availability, storage needs, and whether the seller has enough product information.",
      "home.compareCard2Cta": "Read review",
      "home.compareCard3Title": "Build a better haul",
      "home.compareCard3Body": "Group similar items, check QC photos carefully, avoid duplicate routes, and use category pages to find matching pieces for one shipment.",
      "home.compareCard3Cta": "Plan haul",
      "categories.title": "LitBuy Categories",
      "categories.subtitle": "Browse finds by category: shoes, hoodies, T-shirts, jackets, and more.",
      "about.title": "About",
      "about.body1": "This site is an independent SEO resource and shopping guide for LitBuy users. We organize finds, spreadsheet routes, reviews, and category shortcuts to help shoppers discover products faster.",
      "about.body2": "We are not affiliated with LitBuy or its brand. Product purchases are handled on <a href=\"https://litbuy.com\" style=\"color:var(--accent)\" target=\"_blank\" rel=\"noopener noreferrer\">LitBuy.com</a>.",
      "privacy.title": "Privacy Policy",
      "privacy.body1": "This site is an informational resource. We do not collect personal data beyond standard analytics. When you click product links, you are redirected to LitBuy.com which has its own privacy policy.",
      "privacy.body2": "We use cookies only for basic site functionality. Contact us at support@litbuydb.com with any privacy concerns.",
      "terms.title": "Terms of Service",
      "terms.body1": "This website operates solely as an informational and redirect platform. We do not conduct commercial transactions. All purchases are made through LitBuy.com.",
      "terms.body2": "We have no formal association with LitBuy or its brand. Product information is provided for discovery purposes and may change without notice.",
      "alternatives.title": "LitBuy Alternatives",
      "alternatives.intro": "Looking for shopping agent alternatives to LitBuy? Here's how LitBuy compares to other popular China buying services.",
      "alternatives.h2.pandabuy": "LitBuy vs Pandabuy",
      "alternatives.pandabuy": "Both offer QC photos and consolidation. LitBuy is often praised for competitive shipping coupons and fast warehouse processing.",
      "alternatives.h2.superbuy": "LitBuy vs Superbuy",
      "alternatives.superbuy": "Superbuy is one of the oldest agents. LitBuy offers a more modern interface and frequent promotional discounts.",
      "alternatives.h2.sugargoo": "LitBuy vs Sugargoo",
      "alternatives.sugargoo": "Sugargoo is popular in the sneaker community. LitBuy covers a broader product range with similar QC and shipping features.",
      "alternatives.h2.why": "Why Choose LitBuy?",
      "alternatives.why": "LitBuy balances affordability, QC quality, and user experience. Browse our <a href=\"finds.html\" style=\"color:var(--accent)\">spreadsheet</a> to see curated finds, or visit <a href=\"https://litbuy.com\" style=\"color:var(--accent)\" target=\"_blank\" rel=\"noopener noreferrer\">LitBuy.com</a> directly.",
      "haul.title": "LitBuy Haul",
      "haul.intro": "Community haul gallery featuring real purchases through LitBuy. See what other shoppers are buying and get inspired for your next order.",
      "haul.featured": "Featured Hauls",
      "haul.item1": "<strong>Streetwear Haul</strong> - Essentials hoodie, Stussy tee, Nike Dunks via LitBuy",
      "haul.item2": "<strong>Designer Finds</strong> - Chrome Hearts accessories, Amiri jeans, Golden Goose sneakers",
      "haul.item3": "<strong>Budget Pickup</strong> - Under CNY 200 finds across shoes and T-shirts",
      "haul.cta": "Ready to build your own haul? Start browsing <a href=\"finds.html\" style=\"color:var(--accent)\">LitBuy Finds</a> or paste a product link directly on <a href=\"https://litbuy.com\" style=\"color:var(--accent)\" target=\"_blank\" rel=\"noopener noreferrer\">LitBuy.com</a>.",
      "spreadsheet.title": "LitBuy Spreadsheet Links",
      "spreadsheet.subtitle": "Use this page as the central index for LitBuy finds, source links, category routes, QC photo guides, shipping checklist steps, and product discovery shortcuts.",
      "spreadsheet.indexLabel": "Spreadsheet Index",
      "spreadsheet.indexTitle": "Browse curated LitBuy spreadsheet routes",
      "spreadsheet.card.finds": "All LitBuy Finds",
      "spreadsheet.card.findsCta": "Browse products →",
      "spreadsheet.card.categories": "Category Spreadsheet",
      "spreadsheet.card.categoriesCta": "Open categories →",
      "spreadsheet.card.reviewCta": "Read guide →",
      "spreadsheet.card.qcCta": "Check QC guide →",
      "spreadsheet.card.blogCta": "Read blog →",
      "spreadsheet.card.newCta": "Open new route →",
      "spreadsheet.card.haul": "Haul Planning",
      "spreadsheet.card.haulCta": "Plan a haul →",
      "spreadsheet.howLabel": "How It Works",
      "spreadsheet.whatTitle": "What is a LitBuy Spreadsheet?",
      "spreadsheet.body1": "A LitBuy Spreadsheet is an organized product discovery resource for shoppers who want quick access to finds, categories, brands, source links, and shopping guide links before ordering through a China shopping agent.",
      "spreadsheet.body2": "This index focuses on practical routes for Taobao, Weidian, and 1688 discovery. Start with a category, compare product ideas, check source links, then open the related LitBuy page when you are ready to prepare an order.",
      "spreadsheet.startTitle": "Best starting points",
      "spreadsheet.startBody": "Most shoppers begin with shoes, hoodies, T-shirts, jackets, bags, accessories, and budget basics before building a larger haul.",
      "spreadsheet.beforeTitle": "Before ordering",
      "spreadsheet.beforeBody": "Check product details, estimate shipping weight, review QC photos after warehouse arrival, and compare alternatives if you are choosing between agents.",
      "help.label": "Help Center",
      "help.title": "LitBuy Help",
      "help.intro": "Use this guide as a quick route map for the LitBuy shopping workflow: finding a product, placing an order, checking warehouse QC photos, consolidating items, choosing international shipping, and handling support requests.",
      "help.topic.orders": "Orders",
      "help.topic.ordersSmall": "Paste links, item details, seller purchase",
      "help.topic.warehouse": "Warehouse",
      "help.topic.warehouseSmall": "QC photos, storage, returns",
      "help.topic.shipping": "Shipping",
      "help.topic.shippingSmall": "Parcels, lines, tracking",
      "help.topic.payments": "Payments",
      "help.topic.paymentsSmall": "Top ups, fees, refunds",
      "help.ordersTitle": "Orders and product links",
      "help.ordersBody": "Start by copying a product URL from Taobao, Weidian, 1688, or another supported marketplace. Paste the link into LitBuy, then review the product title, color, size, quantity, domestic shipping, and any seller notes before paying the product cost.",
      "help.ordersLi1": "Use clear product links whenever possible, not screenshots or incomplete seller pages.",
      "help.ordersLi2": "Add size, color, batch, version, or remark details before submitting the order.",
      "help.ordersLi3": "If a seller changes the price or stock status, wait for LitBuy to confirm the update before continuing.",
      "help.warehouseTitle": "Warehouse, QC photos, and storage",
      "help.warehouseBody": "After the seller ships domestically, the item arrives at the LitBuy warehouse. The warehouse checks the package and uploads QC photos so you can inspect color, logos, tags, sizing information, defects, and packaging before international shipment.",
      "help.warehouseLi1": "Approve the item if the QC photos match your expectations.",
      "help.warehouseLi2": "Request support quickly if the wrong size, wrong color, stains, damage, or missing pieces are visible.",
      "help.warehouseLi3": "Combine multiple warehouse items into one parcel when you are ready to ship.",
      "help.shippingTitle": "Parcel consolidation and international shipping",
      "help.shippingBody": "Select the warehouse items you want to ship, submit a parcel, and compare available shipping lines. The final choice depends on destination country, weight, volume, delivery speed, tracking, parcel restrictions, and budget.",
      "help.shippingLi1": "Remove unnecessary packaging if you want to reduce volume where the line allows it.",
      "help.shippingLi2": "Check line restrictions before shipping branded goods, electronics, liquids, or fragile items.",
      "help.shippingLi3": "Use tracking after dispatch and keep your parcel number for support questions.",
      "help.paymentsTitle": "Payment, balance, refunds, and support",
      "help.paymentsBody": "LitBuy orders usually involve product payment first, then international shipping payment later. Refunds can return to your balance or original payment route depending on the case and platform rules.",
      "help.paymentsLi1": "Check the order status before opening a support request, because seller purchase, domestic transit, warehouse intake, and QC can happen as separate steps.",
      "help.paymentsLi2": "For refunds or exchanges, include the order number, item link, problem description, and the QC photo that shows the issue.",
      "help.paymentsLi3": "For shipping support, include the parcel number, destination country, selected line, and tracking screenshot if available.",
      "help.commonTitle": "Common help questions",
      "help.q1": "Why is my order still pending?",
      "help.a1": "Pending can mean the order is waiting for seller confirmation, stock verification, price confirmation, domestic shipment, or warehouse intake. Check the order timeline first, then contact support if the status has not moved for an unusually long time.",
      "help.q2": "Can I return an item after QC?",
      "help.a2": "Returns depend on seller policy, item condition, timing, and marketplace rules. If the QC photos show a clear issue, submit the request quickly with the order number and specific photo evidence.",
      "help.q3": "How should I choose a shipping line?",
      "help.a3": "Compare destination coverage, estimated delivery time, weight method, restrictions, tracking quality, and total price. The cheapest route is not always the best option for fragile, time-sensitive, or restricted goods.",
      "help.q4": "Where should I go for official account support?",
      "help.a4": "For account, payment, refund, or parcel issues, use the official LitBuy support channel on <a href=\"https://litbuy.com/help\" target=\"_blank\" rel=\"noopener noreferrer\">LitBuy.com/help</a>. This page is an independent guide and does not access your LitBuy account.",
      "help.official": "Open official LitBuy Help",
      "review.title": "LitBuy Review 2026",
      "review.intro": "LitBuy is a China shopping agent for international buyers who want to order from Taobao, Weidian, 1688, and similar marketplaces. This review focuses on the practical parts shoppers usually care about before placing a first order: product links, QC photos, warehouse handling, shipping costs, and support risk.",
      "review.bestFor": "Best for",
      "review.bestForTitle": "Spreadsheet shoppers building a multi-item haul",
      "review.bestForBody": "LitBuy makes the most sense when you already have product links or curated finds and want warehouse QC before international shipping.",
      "review.upside": "Main upside",
      "review.upsideTitle": "QC photos and parcel consolidation",
      "review.upsideBody": "You can inspect items before shipping and combine several purchases into one international parcel.",
      "review.caution": "Main caution",
      "review.cautionTitle": "Final cost depends on shipping",
      "review.cautionBody": "Product price is only part of the order. Domestic shipping, weight, volume, line restrictions, and coupons can change the final total.",
      "review.ctaFinds": "Browse LitBuy Finds",
      "review.ctaHelp": "Read Help Guide",
      "review.openLitBuy": "Open LitBuy.com",
      "review.shippingTitle": "Shipping & Delivery",
      "review.shippingBody": "LitBuy can offer multiple international shipping lines, and the best choice depends on destination country, parcel weight, volume, delivery speed, tracking quality, and item restrictions. Do not judge the order only by the product price. The final shipping quote usually matters more for larger hauls.",
      "review.qcTitle": "QC Photos",
      "review.qcBody": "Every item is inspected at the LitBuy warehouse. You receive detailed QC photos before approving international shipment, which is a critical step for verifying product quality.",
      "review.howTitle": "How LitBuy Works",
      "review.step1": "<strong>Paste a product link.</strong> Copy a Taobao, Weidian, 1688, or supported marketplace URL into LitBuy and confirm size, color, quantity, and notes.",
      "review.step2": "<strong>Pay the product cost.</strong> LitBuy purchases the item from the seller after stock and price are confirmed.",
      "review.step3": "<strong>Wait for warehouse intake.</strong> The seller ships domestically to the LitBuy warehouse.",
      "review.step4": "<strong>Review QC photos.</strong> Check color, tags, logos, sizing details, visible defects, and packaging before shipping internationally.",
      "review.step5": "<strong>Submit a parcel.</strong> Combine items, choose a shipping line, pay international shipping, and track the package after dispatch.",
      "review.uxTitle": "User Experience",
      "review.uxBody": "The LitBuy workflow is strongest for shoppers who are comfortable using product links and checking order statuses. Beginners should pay attention to item remarks, seller stock changes, warehouse messages, and shipping restrictions before submitting a parcel.",
      "review.prosConsTitle": "Pros and Cons",
      "review.pros": "Pros",
      "review.cons": "Cons",
      "review.pro1": "Useful for Taobao, Weidian, and 1688 product discovery workflows.",
      "review.pro2": "QC photos help catch obvious issues before international shipping.",
      "review.pro3": "Parcel consolidation can make multi-item hauls easier to manage.",
      "review.pro4": "Good fit for shoppers using curated spreadsheets and product routes.",
      "review.con1": "Final landed cost is hard to know until parcel weight and line options are available.",
      "review.con2": "Returns and exchanges depend on seller policy, timing, and item condition.",
      "review.con3": "Shipping speed can vary by line, country, season, and customs handling.",
      "review.con4": "New users need to understand QC photos, warehouse statuses, and restrictions.",
      "review.feesTitle": "Fees and Cost Factors",
      "review.feesBody": "Expect the total cost to include more than the item price. Common cost factors include item price, domestic shipping inside China, service or handling fees where applicable, value-added services, international shipping, currency conversion, and any coupon discounts. Coupons can help, but they should not be treated as guaranteed permanent pricing.",
      "review.risksTitle": "Risks to Check Before Ordering",
      "review.risk1": "Seller stock, price, or product page details can change after you submit a link.",
      "review.risk2": "Some goods may be restricted by shipping lines, customs rules, or payment policies.",
      "review.risk3": "QC photos reduce risk, but they do not guarantee sizing, material feel, or long-term quality.",
      "review.risk4": "Refunds, exchanges, and after-sales support may take time because seller, warehouse, and payment steps are separate.",
      "review.verdictTitle": "Verdict",
      "review.verdictBody1": "LitBuy is worth considering if you want a structured way to order China marketplace products, review warehouse QC photos, and consolidate multiple items into one haul. It is less suitable if you want instant checkout, guaranteed delivery dates, or a final all-in price before the item reaches the warehouse.",
      "review.verdictBody2": "For the best result, start with clear product links, compare expected shipping weight, check QC photos carefully, and avoid shipping restricted items without reading the line rules first. Browse our <a href=\"finds.html\" style=\"color:var(--accent)\">LitBuy Finds</a>, read the <a href=\"help.html\" style=\"color:var(--accent)\">LitBuy Help</a> guide, or compare <a href=\"alternatives.html\" style=\"color:var(--accent)\">LitBuy alternatives</a> before ordering.",
      "footer.copyright": "© 2026 LitBuy Spreadsheet Resource. Not affiliated with LitBuy brand."
    },
    zh: {
      "nav.toggle": "切换导航",
      "category.shoes": "鞋类",
      "category.hoodies": "连帽衫 / 毛衣",
      "category.t-shirts": "T 恤",
      "category.jackets": "夹克",
      "category.pants": "裤子 / 短裤",
      "category.bags": "包袋",
      "category.headwear": "帽子",
      "category.accessories": "配饰",
      "category.jersey": "球衣",
      "category.electronics": "电子产品",
      "category.other": "其他好物",
      "product.viewProduct": "查看商品",
      "product.openProduct": "打开商品",
      "product.buyOnLitBuy": "在 LitBuy 购买",
      "product.browseHot": "浏览热门",
      "product.browseTrending": "浏览趋势",
      "product.browseCategory": "浏览分类",
      "product.defaultDesc": "为希望在打开 LitBuy 前快速预览商品的买家精选的 LitBuy 路线。",
      "finds.title": "LitBuy 好物",
      "finds.subtitle": "浏览精选商品，支持搜索、筛选，并可直接跳转到 LitBuy 购买。",
      "finds.searchPlaceholder": "搜索商品、品牌...",
      "finds.searchAria": "搜索商品",
      "finds.filterAria": "按分类筛选",
      "finds.allCategories": "全部分类",
      "finds.count": "找到 {count} 个商品",
      "finds.empty": "没有找到商品。",
      "categories.title": "LitBuy 分类",
      "categories.subtitle": "按分类浏览好物：鞋类、连帽衫、T 恤、夹克等。",
      "about.title": "关于",
      "about.body1": "本站是面向 LitBuy 用户的独立 SEO 资源和购物指南。我们整理好物、表格路线、评测和分类快捷入口，帮助买家更快发现商品。",
      "about.body2": "我们与 LitBuy 及其品牌没有隶属关系。商品购买在 <a href=\"https://litbuy.com\" style=\"color:var(--accent)\" target=\"_blank\" rel=\"noopener noreferrer\">LitBuy.com</a> 完成。",
      "privacy.title": "隐私政策",
      "privacy.body1": "本站是信息资源网站。除标准分析数据外，我们不收集个人数据。点击商品链接时，你会跳转到 LitBuy.com，其拥有自己的隐私政策。",
      "privacy.body2": "我们仅为基础网站功能使用 Cookie。如有隐私问题，请联系 support@litbuydb.com。",
      "terms.title": "服务条款",
      "terms.body1": "本网站仅作为信息和跳转平台运营。我们不进行商业交易。所有购买均通过 LitBuy.com 完成。",
      "terms.body2": "我们与 LitBuy 及其品牌没有正式关联。商品信息仅用于发现参考，可能随时变更。",
      "alternatives.title": "LitBuy 替代平台",
      "alternatives.intro": "正在寻找 LitBuy 之外的购物代理？下面是 LitBuy 与其他热门中国代购服务的对比。",
      "alternatives.h2.pandabuy": "LitBuy 与 Pandabuy",
      "alternatives.pandabuy": "两者都提供 QC 照片和合包服务。LitBuy 常因有竞争力的运费优惠券和较快的仓库处理受到关注。",
      "alternatives.h2.superbuy": "LitBuy 与 Superbuy",
      "alternatives.superbuy": "Superbuy 是较早的一批代购平台。LitBuy 提供更现代的界面和更频繁的促销折扣。",
      "alternatives.h2.sugargoo": "LitBuy 与 Sugargoo",
      "alternatives.sugargoo": "Sugargoo 在球鞋社区较受欢迎。LitBuy 覆盖更广的商品范围，并提供类似的 QC 和运输功能。",
      "alternatives.h2.why": "为什么选择 LitBuy？",
      "alternatives.why": "LitBuy 在价格、QC 质量和用户体验之间取得平衡。浏览我们的 <a href=\"finds.html\" style=\"color:var(--accent)\">表格</a> 查看精选好物，或直接访问 <a href=\"https://litbuy.com\" style=\"color:var(--accent)\" target=\"_blank\" rel=\"noopener noreferrer\">LitBuy.com</a>。",
      "haul.title": "LitBuy Haul 晒单",
      "haul.intro": "社区晒单展示通过 LitBuy 购买的真实商品。看看其他买家在买什么，为你的下一单获得灵感。",
      "haul.featured": "精选晒单",
      "haul.item1": "<strong>街头穿搭晒单</strong> - Essentials 连帽衫、Stussy T 恤、Nike Dunk，通过 LitBuy 购买",
      "haul.item2": "<strong>设计师品牌好物</strong> - Chrome Hearts 配饰、Amiri 牛仔裤、Golden Goose 球鞋",
      "haul.item3": "<strong>预算好物</strong> - 鞋类和 T 恤中低于 200 元人民币的发现",
      "haul.cta": "准备创建自己的 haul？先浏览 <a href=\"finds.html\" style=\"color:var(--accent)\">LitBuy 好物</a>，或直接在 <a href=\"https://litbuy.com\" style=\"color:var(--accent)\" target=\"_blank\" rel=\"noopener noreferrer\">LitBuy.com</a> 粘贴商品链接。",
      "spreadsheet.title": "LitBuy 表格链接",
      "spreadsheet.subtitle": "把本页作为 LitBuy 好物、分类路线、购物指南和商品发现快捷入口的中心索引。",
      "spreadsheet.indexLabel": "表格索引",
      "spreadsheet.indexTitle": "浏览精选 LitBuy 表格路线",
      "spreadsheet.card.finds": "全部 LitBuy 好物",
      "spreadsheet.card.findsCta": "浏览商品 →",
      "spreadsheet.card.categories": "分类表格",
      "spreadsheet.card.categoriesCta": "打开分类 →",
      "spreadsheet.card.reviewCta": "阅读指南 →",
      "spreadsheet.card.haul": "Haul 规划",
      "spreadsheet.card.haulCta": "规划 haul →",
      "spreadsheet.howLabel": "运作方式",
      "spreadsheet.whatTitle": "什么是 LitBuy Spreadsheet？",
      "spreadsheet.body1": "LitBuy Spreadsheet 是一个有组织的商品发现资源，帮助买家在通过中国购物代理下单前快速访问好物、分类、品牌和购物指南链接。",
      "spreadsheet.body2": "这个索引聚焦 Taobao、Weidian 和 1688 的实用发现路线。先从分类开始，比较商品想法，然后在准备下单时打开相关 LitBuy 或 MaisonLooks 页面。",
      "spreadsheet.startTitle": "最佳起点",
      "spreadsheet.startBody": "多数买家会先从鞋类、连帽衫、T 恤、夹克、包袋、配饰和预算基础款开始，再组合更大的 haul。",
      "spreadsheet.beforeTitle": "下单前",
      "spreadsheet.beforeBody": "检查商品详情、估算运输重量、入仓后查看 QC 照片；如果在多个代理之间选择，也可以比较替代平台。",
      "help.label": "帮助中心",
      "help.title": "LitBuy 帮助",
      "help.intro": "把这份指南作为 LitBuy 购物流程的快速路线图：找商品、下单、检查仓库 QC 照片、合包、选择国际运输并处理支持请求。",
      "help.topic.orders": "订单",
      "help.topic.ordersSmall": "粘贴链接、商品细节、卖家采购",
      "help.topic.warehouse": "仓库",
      "help.topic.warehouseSmall": "QC 照片、存储、退换",
      "help.topic.shipping": "运输",
      "help.topic.shippingSmall": "包裹、线路、追踪",
      "help.topic.payments": "支付",
      "help.topic.paymentsSmall": "充值、费用、退款",
      "help.ordersTitle": "订单和商品链接",
      "help.ordersBody": "先从 Taobao、Weidian、1688 或其他支持的平台复制商品 URL。将链接粘贴到 LitBuy，然后在支付商品费用前确认标题、颜色、尺码、数量、国内运费和卖家备注。",
      "help.ordersLi1": "尽量使用清晰的商品链接，不要只用截图或不完整的卖家页面。",
      "help.ordersLi2": "提交订单前补充尺码、颜色、批次、版本或备注细节。",
      "help.ordersLi3": "如果卖家更改价格或库存状态，等待 LitBuy 确认更新后再继续。",
      "help.warehouseTitle": "仓库、QC 照片和存储",
      "help.warehouseBody": "卖家发出国内快递后，商品会到达 LitBuy 仓库。仓库检查包裹并上传 QC 照片，方便你在国际运输前检查颜色、Logo、标签、尺码信息、瑕疵和包装。",
      "help.warehouseLi1": "如果 QC 照片符合预期，可以批准该商品。",
      "help.warehouseLi2": "如果看到尺码错误、颜色错误、污渍、破损或缺件，请尽快请求支持。",
      "help.warehouseLi3": "准备发货时，可以把多个仓库商品合并成一个包裹。",
      "help.shippingTitle": "包裹合并和国际运输",
      "help.shippingBody": "选择要发出的仓库商品，提交包裹并比较可用运输线路。最终选择取决于目的地国家、重量、体积、配送速度、追踪、包裹限制和预算。",
      "help.shippingLi1": "如果线路允许，可以移除不必要包装以降低体积。",
      "help.shippingLi2": "运输品牌商品、电子产品、液体或易碎物品前，先检查线路限制。",
      "help.shippingLi3": "发出后使用追踪信息，并保留包裹号以便咨询客服。",
      "help.paymentsTitle": "支付、余额、退款和支持",
      "help.paymentsBody": "LitBuy 订单通常先支付商品费用，之后再支付国际运费。退款可能退回余额或原支付渠道，具体取决于情况和平台规则。",
      "help.paymentsLi1": "发起支持请求前先检查订单状态，因为卖家采购、国内运输、仓库入库和 QC 可能是分开的步骤。",
      "help.paymentsLi2": "退款或换货时，请提供订单号、商品链接、问题描述和显示问题的 QC 照片。",
      "help.paymentsLi3": "运输支持请提供包裹号、目的地国家、所选线路和可用的追踪截图。",
      "help.commonTitle": "常见帮助问题",
      "help.q1": "为什么我的订单仍在待处理？",
      "help.a1": "待处理可能表示订单正在等待卖家确认、库存核实、价格确认、国内发货或仓库入库。先查看订单时间线，如果状态异常长时间没有变化再联系支持。",
      "help.q2": "QC 后可以退货吗？",
      "help.a2": "退货取决于卖家政策、商品状态、时间和平台规则。如果 QC 照片显示明确问题，请尽快用订单号和具体照片证据提交请求。",
      "help.q3": "应该如何选择运输线路？",
      "help.a3": "比较目的地覆盖、预计时效、计重方式、限制、追踪质量和总价。对易碎、时效敏感或受限商品来说，最便宜的路线不一定最好。",
      "help.q4": "官方账号支持在哪里？",
      "help.a4": "账号、支付、退款或包裹问题，请使用 <a href=\"https://litbuy.com/help\" target=\"_blank\" rel=\"noopener noreferrer\">LitBuy.com/help</a> 的官方 LitBuy 支持渠道。本页是独立指南，无法访问你的 LitBuy 账号。",
      "help.official": "打开官方 LitBuy 帮助",
      "footer.copyright": "© 2026 LitBuy Spreadsheet Resource。本站与 LitBuy 品牌无关联。"
    }
  };

  Object.keys(EXTRA_I18N).forEach((lang) => {
    I18N[lang] = Object.assign(I18N[lang] || {}, EXTRA_I18N[lang]);
  });

  const I18N_NATIVE_KEYS = {};
  Object.keys(I18N).forEach((lang) => {
    I18N_NATIVE_KEYS[lang] = new Set(Object.keys(I18N[lang] || {}));
  });

  LANG_OPTIONS.forEach(({ code }) => {
    I18N[code] = Object.assign({}, I18N.en, I18N[code] || {});
  });

  Object.assign(I18N.en, {
    "footer.sourceLinks": "Source Links",
    "footer.shippingChecklist": "Shipping Checklist"
  });
  Object.assign(I18N.zh, {
    "footer.sourceLinks": "源链接",
    "footer.shippingChecklist": "运输清单",
    "nav.qc": "QC",
    "nav.blog": "博客",
    "nav.new": "最新",
    "footer.qc": "LitBuy QC",
    "footer.blog": "LitBuy 博客",
    "footer.new": "LitBuy 最新"
  });

  const ORIGINAL_PAGE_HTML = new WeakMap();
  const PAGE_I18N = {
    zh: {
      "qc.html": `
    <h1>LitBuy QC 照片指南</h1>
    <p>QC 是质量检查。对 LitBuy 订单来说，最关键的 QC 节点通常发生在卖家把商品发到 LitBuy 仓库之后、买家提交国际包裹之前。本页帮助你阅读仓库照片、核对商品细节，并避免常见下单错误。</p>
    <section class="review-summary" aria-label="LitBuy QC summary">
      <div><span class="review-kicker">服务事实</span><strong>免费 QC 和验货照片</strong><p>LitBuy 公开服务信息提到 Free QC &amp; Inspection，商品到仓后会检查并提供验货照片。</p></div>
      <div><span class="review-kicker">最佳用途</span><strong>发货前确认</strong><p>用 QC 照片核对颜色、尺码标、可见瑕疵、包装，以及商品是否符合订单备注。</p></div>
      <div><span class="review-kicker">限制</span><strong>降低风险，不消除风险</strong><p>仓库照片可以发现明显问题，但不能保证上身尺码、面料手感、长期耐用度、清关结果或售后处理。</p></div>
    </section>
    <div class="review-cta-row"><a href="finds.html" class="btn btn-secondary">浏览 LitBuy 好物</a><a href="review.html" class="btn btn-secondary">阅读 LitBuy 评测</a><a href="https://litbuy.com/" class="btn btn-primary" target="_blank" rel="noopener noreferrer">打开 LitBuy.com</a></div>
    <h2>平台确认了什么</h2>
    <p>LitBuy 将自己描述为中国购物代理，公开应用文案提到 1688、Taobao、Weidian、JD 等商品来源，也提到仓储、QC 检查和加固包装。对 QC 来说，重点是：检查发生在商品到仓之后。</p>
    <p>你应该在提交国际包裹前决定发货、退货或换货，因为一旦进入国际运输，成本和售后难度都会增加。</p>
    <h2>如何阅读 LitBuy QC 照片</h2>
    <ol class="review-steps"><li><strong>核对订单基础信息。</strong>检查标题、颜色、尺码、数量、卖家备注和变体选项。</li><li><strong>检查可见细节。</strong>放大查看 logo、走线、印花、标签、五金、鞋底、拉链、纽扣和包装状态。</li><li><strong>留意运输风险。</strong>重盒、易碎件、液体、电池、磁铁、超大包装都会影响线路和价格。</li><li><strong>提交包裹前处理问题。</strong>如果照片显示异常，先要求说明、退换或补拍，不要急着支付国际运费。</li><li><strong>保留记录。</strong>保存原商品链接、卖家消息、订单备注和 QC 照片，方便后续支持。</li></ol>
    <h2>QC 检查流程</h2>
    <div class="pros-cons-grid"><section class="pros-cons-card"><h3>QC 适合用于</h3><ul><li>确认仓库商品是否匹配所选规格。</li><li>发现明显污渍、划痕、错印、缺件或包装损坏。</li><li>发国际货前对比卖家图和仓库图。</li><li>判断是否值得退换、补拍或等待。</li></ul></section><section class="pros-cons-card"><h3>QC 不等于</h3><ul><li>保证尺码一定适合。</li><li>保证清关、时效或税费可预测。</li><li>替代阅读原商品页和卖家规则。</li><li>忽略限制品、线路规则或支付政策的理由。</li></ul></section></div>
    <h2>常见 QC 错误</h2>
    <ul><li>没有核对尺码和颜色就快速通过。</li><li>只看正面图，忽略标签、鞋底、袖口、背面和细节。</li><li>发现仓库问题后太晚申请退换。</li><li>只看商品价，忽略重量、体积、优惠券和线路限制。</li></ul>`,
      "source-links.html": `
    <h1>LitBuy 源链接指南</h1>
    <p>源链接是买家下 LitBuy 订单前需要核对的商品路径，可能是商品页、分类页、卖家页，或指向 Taobao、Weidian、1688、JD 等平台的表格行。本页说明如何在下单前验证这些链接。</p>
    <section class="review-summary" aria-label="LitBuy source links summary"><div><span class="review-kicker">搜索意图</span><strong>LitBuy source links</strong><p>用源链接从 LitBuy 好物或表格行进入真实商品信息。</p></div><div><span class="review-kicker">下单前</span><strong>检查实时商品页</strong><p>确认价格、库存、颜色、尺码、国内运费、卖家备注、商品图和退换规则。</p></div><div><span class="review-kicker">到仓后</span><strong>对比 QC 照片</strong><p>用仓库 QC 照片和原始源链接、订单备注进行对照。</p></div></section>
    <div class="review-cta-row"><a href="finds.html" class="btn btn-secondary">浏览 LitBuy 好物</a><a href="spreadsheet.html" class="btn btn-secondary">打开表格链接</a><a href="shipping-checklist.html" class="btn btn-primary">打开运输清单</a></div>
    <h2>什么是源链接？</h2><p>源链接是商品想法背后的原始路径。对 LitBuy 买家来说，它通常是商品 URL、卖家页、店铺路线或市场列表。表格条目只有在源链接仍然有效且与商品标签一致时才有价值。</p>
    <h2>源链接检查清单</h2><ol class="review-steps"><li><strong>打开当前链接。</strong>确认链接仍然可访问，并指向预期商品。</li><li><strong>确认商品选项。</strong>核对标题、颜色、尺码、数量、批次、版本和备注。</li><li><strong>检查价格和库存。</strong>价格、国内运费、优惠和库存都可能变化。</li><li><strong>查看卖家信息。</strong>关注清晰照片、更新情况、退换规则、尺寸、材质和包装说明。</li><li><strong>保存 QC 上下文。</strong>保留源链接和订单备注，方便到仓后核对 QC 照片。</li></ol>
    <h2>Taobao、Weidian 和 1688 源链接</h2><div class="pros-cons-grid"><section class="pros-cons-card"><h3>Taobao 源链接</h3><p>检查规格选择、尺码表、卖家图、备注、国内运费和商品信息完整度。</p></section><section class="pros-cons-card"><h3>Weidian 源链接</h3><p>重点看批次说明、店铺背景、相册、尺码选项和卖家更新。</p></section><section class="pros-cons-card"><h3>1688 源链接</h3><p>检查起订规则、颜色尺码、工厂图、国内运费，以及是否适合个人购买。</p></section><section class="pros-cons-card"><h3>表格源链接</h3><p>把每条表格路线当作起点。付款前验证实时链接，发货前再用 QC 照片确认。</p></section></div>
    <h2>源链接和 QC 照片</h2><p>源链接给出预期，QC 照片展示到仓实物。发货前要把仓库照片与商品标题、颜色、尺码、标签、可见细节和卖家图片对比。如果不一致，先联系支持再提交国际包裹。</p>`,
      "shipping-checklist.html": `
    <h1>LitBuy 运输清单</h1>
    <p>提交 LitBuy 包裹或支付国际运费前使用这份清单。它把完整流程串起来：LitBuy 好物、源链接、订单备注、仓库 QC 照片、包裹限制、线路选择、地址信息和追踪。</p>
    <section class="review-summary" aria-label="LitBuy shipping checklist summary"><div><span class="review-kicker">第一步</span><strong>复查 QC 照片</strong><p>确认颜色、尺码、数量、标签、瑕疵、包装，以及商品是否匹配源链接。</p></div><div><span class="review-kicker">第二步</span><strong>检查包裹规则</strong><p>比较线路限制、估重、体积、包装、目的地覆盖、追踪和时效。</p></div><div><span class="review-kicker">第三步</span><strong>确认运输信息</strong><p>核对地址、申报信息、包裹选项、付款金额、追踪号和售后记录。</p></div></section>
    <div class="review-cta-row"><a href="qc.html" class="btn btn-secondary">阅读 QC 照片指南</a><a href="source-links.html" class="btn btn-secondary">检查源链接</a><a href="finds.html" class="btn btn-primary">浏览 LitBuy 好物</a></div>
    <h2>提交包裹前</h2><ol class="review-steps"><li><strong>用源链接对比 QC 照片。</strong>确认仓库实物符合预期商品、颜色、尺码和细节。</li><li><strong>检查每件商品状态。</strong>仍需退换、说明、补拍或客服跟进的商品不要加入包裹。</li><li><strong>估算重量和体积。</strong>商品价不是总成本，重量、箱规和线路规则会影响运费。</li><li><strong>必要时去除包装。</strong>对大体积包装，判断是否需要去盒或加固。</li><li><strong>分开风险商品。</strong>电子、电池、液体、磁铁、易碎品、超大盒和品牌商品可能受不同线路限制。</li></ol>
    <h2>运输线路清单</h2><div class="pros-cons-grid"><section class="pros-cons-card"><h3>费用和重量</h3><p>比较估重、体积重、处理选项、优惠券，以及最便宜线路是否适合商品类型。</p></section><section class="pros-cons-card"><h3>限制</h3><p>阅读目的地、限制品、清关要求、申报价值、包裹尺寸和禁运品规则。</p></section><section class="pros-cons-card"><h3>时效和追踪</h3><p>比较预计时效、追踪质量、线路稳定性、支持预期和是否赶时间。</p></section><section class="pros-cons-card"><h3>地址和支持</h3><p>确认姓名、电话、完整地址、邮编、包裹号，以及需要客服处理时的截图。</p></section></div>
    <h2>支付运费后</h2><ul><li>保存包裹号、线路、付款金额、商品列表、QC 照片和源链接。</li><li>发出后持续追踪，异常时保留截图。</li><li>账户、支付、包裹、派送、退款或售后问题请走 LitBuy 官方支持。</li></ul>`,
      "new.html": `
    <h1>LitBuy 最新</h1><p>本页跟踪 LitBuy 发现流程中的最新实用路线：新的表格主题、近期 LitBuyDocs 文章、新手指南、分类更新和购物思路。它是独立更新中心，不是官方公告页。</p>
    <section class="review-summary" aria-label="LitBuy new summary"><div><span class="review-kicker">参考事实</span><strong>LitBuyDocs 发布近期文章</strong><p>公开博客显示近期文章、热门标签和分页，主题包括表格、好物、球衣、帽衫和店铺。</p></div><div><span class="review-kicker">平台事实</span><strong>新手指南和活动中心</strong><p>LitBuy 公开应用文案包含 New User Guide、Activity Center、Help Center，以及 1688、Taobao、Weidian、JD 商品来源入口。</p></div><div><span class="review-kicker">最佳用途</span><strong>下单前检查新想法</strong><p>先用本页决定下一步浏览什么，再确认实时商品、卖家规则、价格、库存和运输限制。</p></div></section>
    <div class="review-cta-row"><a href="finds.html" class="btn btn-secondary">浏览最新好物</a><a href="blog.html" class="btn btn-secondary">阅读博客</a><a href="litbuy-latest-finds.html" class="btn btn-primary">查看最新好物</a></div>
    <h2>最新 LitBuy 更新路线</h2><p>这里不是普通博客文章，而是给买家快速查看的新路线索引：近期表格主题、新分类需求、可见指南主题和会影响当前订单的操作提醒。</p>
    <div class="pros-cons-grid"><section class="pros-cons-card"><h3>近期文章信号</h3><p>优先关注表格新手指南、可信卖家、购买指南、批次路线和小众风格主题。</p></section><section class="pros-cons-card"><h3>需要刷新的分类</h3><p>优先更新球鞋、帽衫、球衣、T 恤、夹克、裤子、包、配饰、手表、电子和优惠路线。</p></section><section class="pros-cons-card"><h3>新买家提醒</h3><p>刷新商品链接下单、实时页面验证、尺码颜色备注、QC 照片、仓储、合包和运输限制内容。</p></section><section class="pros-cons-card"><h3>更新节奏</h3><p>新路线应每周复查，因为链接、库存、价格和 QC 结果都会变化。</p></section></div>
    <h2>如何评估新的 LitBuy 好物</h2><ol class="review-steps"><li><strong>从当前来源开始。</strong>使用近期文章、本站表格、分类页或实时市场链接。</li><li><strong>确认实时信息。</strong>检查价格、库存、尺码表、颜色、国内运费、卖家备注和退换规则。</li><li><strong>保存清晰路线。</strong>只保留信息明确、分类合理、便于比较的链接。</li><li><strong>下单前规划。</strong>重量、体积、包装、限制品和目的地都会影响是否值得加入 haul。</li></ol>`,
      "litbuy-latest-finds.html": `
    <h1>LitBuy 最新好物</h1><p>这是面向想快速查看新商品路线的独立索引页，重点是分类更新、预算好物、卖家路线和每周表格刷新优先级。</p>
    <section class="review-summary" aria-label="LitBuy latest finds summary"><div><span class="review-kicker">近期需求</span><strong>表格、卖家、批次、风格</strong><p>公开文章显示买家关注表格指南、可信卖家、购买指南、批次和小众风格路线。</p></div><div><span class="review-kicker">优先刷新</span><strong>球鞋、帽衫、球衣、配饰</strong><p>这些分类在导航、标签和搜索行为中反复出现，是最新好物的实用起点。</p></div><div><span class="review-kicker">发货前</span><strong>下单前验证实时页面</strong><p>新好物只有在商品详情、卖家备注、价格、库存、规格和运输限制都确认后才有价值。</p></div></section>
    <h2>最新分类路线</h2><div class="pros-cons-grid"><section class="pros-cons-card"><h3>最新球鞋好物</h3><p>按鞋型、配色、尺码、卖家备注、价格段和详情完整度刷新。</p></section><section class="pros-cons-card"><h3>最新帽衫好物</h3><p>优先选择尺码、面料、logo、颜色和季节需求清晰的路线。</p></section><section class="pros-cons-card"><h3>最新足球球衣</h3><p>按球队、赛季、球员名、章标、尺码和版本区分路线。</p></section><section class="pros-cons-card"><h3>最新包和配饰</h3><p>更新照片、尺寸、材质和包装信息足够清楚的包、腰带、帽子、钱包、首饰和手表路线。</p></section><section class="pros-cons-card"><h3>最新预算好物</h3><p>按真实总成本分组，不只看商品价；国内运费、重量和线路也会影响价值。</p></section><section class="pros-cons-card"><h3>最新卖家和店铺路线</h3><p>当卖家分类稳定、更新及时、备注清楚且便于比较时再保留。</p></section></div>
    <h2>每周更新清单</h2><ol class="review-steps"><li><strong>移除失效行。</strong>删除商品页失效、库存不清或标签不匹配的路线。</li><li><strong>刷新高需求分类。</strong>优先球鞋、帽衫、球衣、包、配饰、手表、电子和预算基础款。</li><li><strong>检查实时详情。</strong>确认价格、颜色、尺码、数量、国内运费、商品图和卖家备注。</li><li><strong>分开预算和高价路线。</strong>不要把低价基础款、批次商品和高价商品混在同一列表。</li><li><strong>用 QC 做最终确认。</strong>下单后用仓库照片确认，再决定是否国际发货。</li></ol>`,
      "litbuy-blog-article.html": `
    <h1>LitBuy 博客文章：表格、QC 和购物指南主题</h1><p>这篇独立文章基于公开 LitBuyDocs Blog 研究，涵盖表格性能、新手指南、可信卖家、购买指南、批次选择、风格主题和小众购物主题。</p>
    <h2>LitBuy Spreadsheet：快速加载大型表格</h2><p>大型表格容易变慢且难以浏览。好的 LitBuy 表格应按分类、品牌、商品类型、价格预期、QC 意图和购物目的组织路线。</p>
    <h2>表格新手指南</h2><p>新手流程应保持简单：选择商品路线，验证实时链接，提交准确尺码和颜色备注，等待入仓，检查 QC 照片，再决定是否加入国际包裹。</p>
    <h2>购物检查主题</h2><p>表格链接只是发现工具。实用指南应帮助买家比较实时商品详情、卖家备注、商品图、分类适配度，以及路线是否值得保存。</p>
    <h2>可信卖家和购买指南主题</h2><p>可信卖家和购买指南只能作为起点，不是保证。仍需检查页面详情、库存、退换规则、国内运费、限制品、QC 照片和最终包裹成本。</p>
    <h2>风格和小众表格主题</h2><p>Old Money、Lego、best batch、best finds 等主题说明买家常从风格、细分品类或批次开始搜索，再比较路线和平台流程。</p>`,
      "blog.html": `
    <h1>LitBuy 博客</h1><p>本页根据公开 LitBuyDocs 和 LitBuy 平台信息整理，围绕表格好物、TikTok 好物、足球球衣、帽衫、店铺链接、时尚分类和购物技巧，为买家提供下单前的实用路线。</p>
    <section class="review-summary" aria-label="LitBuy blog summary"><div><span class="review-kicker">参考站点事实</span><strong>LitBuyDocs 有博客板块</strong><p>公开页面展示近期文章、热门标签和商品/指南分类。</p></div><div><span class="review-kicker">近期主题模式</span><strong>表格、TikTok 好物、球衣、帽衫</strong><p>可见文章集中在发现型内容，如表格指南、TikTok 好物、球衣、帽衫、优质店铺和免运主题。</p></div><div><span class="review-kicker">适合读者</span><strong>准备 haul 的表格买家</strong><p>当你从商品发现进入订单备注、QC、仓储、合包和国际运输时，可以用本页规划路径。</p></div></section>
    <div class="review-cta-row"><a href="finds.html" class="btn btn-secondary">浏览 LitBuy 好物</a><a href="qc.html" class="btn btn-secondary">阅读 QC 指南</a><a href="litbuy-blog-article.html" class="btn btn-primary">阅读博客文章</a></div>
    <h2>参考博客文章</h2><p>本节把公开博客中可见的文章主题整理成本地阅读索引，帮助买家进行 LitBuy 风格的发现、表格研究、卖家评估和购物清单规划。</p>
    <div class="pros-cons-grid"><section class="pros-cons-card"><h3>大型表格加载</h3><p>保持表格路线按分类、品牌、商品类型和搜索意图组织，避免打开无关链接。</p></section><section class="pros-cons-card"><h3>表格新手指南</h3><p>阅读表格行、检查商品详情，并从发现阶段进入代理下单。</p></section><section class="pros-cons-card"><h3>购物检查指南</h3><p>验证实时页面、阅读卖家备注、比较详情，并保存清晰路线。</p></section><section class="pros-cons-card"><h3>可信卖家主题</h3><p>可信卖家只能作为起点，仍需检查详情、退换、QC 和运输限制。</p></section></div>
    <h2>下单前如何使用博客内容</h2><ol class="review-steps"><li><strong>用于发现。</strong>从表格、TikTok、分类、店铺或优惠文章寻找商品想法。</li><li><strong>验证实时页面。</strong>确认价格、尺码、颜色、国内运费、库存和卖家备注。</li><li><strong>围绕 QC 规划。</strong>到仓后用 QC 照片确认商品。</li><li><strong>注意仓储时间。</strong>规划合包，避免长期占用仓储。</li><li><strong>发货前检查限制。</strong>服饰、鞋、电子、液体、电池、大包装和易碎品都可能影响线路。</li></ol>`
    }
  };

  function buyUrl(product) {
    return AFFILIATE + (product ? "?product=" + encodeURIComponent(product.name) : "");
  }

  function t(key) {
    const messages = I18N[currentLanguage] || I18N.en;
    return messages[key] || I18N.en[key] || "";
  }

  const ORIGINAL_TEXT_NODES = new WeakMap();
  const ORIGINAL_ATTRS = new WeakMap();
  const ORIGINAL_TITLE = document.title;
  const TRANSLATABLE_META_SELECTORS = [
    'meta[name="description"]',
    'meta[name="keywords"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]'
  ];

  const LANGUAGE_TERM_MAP = {
    zh: {
      "LitBuy Spreadsheet": "LitBuy 表格", "LitBuy Finds": "LitBuy 好物", "Source Links": "源链接", "Shipping Checklist": "运输清单", "QC Photos": "QC 照片", "QC photos": "QC 照片", "QC photo": "QC 照片", "quality-check": "质检", "shopping guide": "购物指南", "shopping agent": "购物代理", "product discovery": "商品发现", "product routes": "商品路线", "category routes": "分类路线", "source link": "源链接", "source links": "源链接", "shipping line": "运输线路", "warehouse": "仓库", "parcel": "包裹", "hauls": "拼单", "haul": "拼单", "finds": "好物", "spreadsheet": "表格", "categories": "分类", "category": "分类", "products": "商品", "product": "商品", "brand": "品牌", "brands": "品牌", "review": "评测", "guide": "指南", "blog": "博客", "help": "帮助", "privacy": "隐私", "terms": "条款", "resources": "资源", "new": "最新", "popular": "热门", "latest": "最新", "browse": "浏览", "open": "打开", "read": "阅读", "search": "搜索", "check": "检查", "compare": "比较", "before ordering": "下单前", "before shipping": "发货前", "international shipping": "国际运输", "Taobao": "Taobao", "Weidian": "Weidian", "1688": "1688", "seller": "卖家", "sellers": "卖家", "order": "订单", "orders": "订单", "support": "支持", "cost": "成本", "price": "价格", "stock": "库存", "size": "尺码", "color": "颜色", "notes": "备注", "details": "详情", "items": "商品", "item": "商品", "route": "路线", "routes": "路线", "workflow": "流程", "checklist": "清单", "photos": "照片", "photo": "照片", "shipping": "运输"
    },
    pl: {
      "LitBuy Spreadsheet": "Arkusz LitBuy", "LitBuy Finds": "Znaleziska LitBuy", "Source Links": "Linki zrodlowe", "Shipping Checklist": "Lista wysylki", "QC Photos": "Zdjecia QC", "QC photos": "zdjecia QC", "shopping guide": "poradnik zakupowy", "shopping agent": "agent zakupowy", "product discovery": "odkrywanie produktow", "product routes": "sciezki produktow", "category routes": "sciezki kategorii", "source link": "link zrodlowy", "source links": "linki zrodlowe", "shipping line": "linia wysylki", "warehouse": "magazyn", "parcel": "paczka", "hauls": "haul", "haul": "haul", "finds": "znaleziska", "spreadsheet": "arkusz", "categories": "kategorie", "category": "kategoria", "products": "produkty", "product": "produkt", "brand": "marka", "brands": "marki", "review": "recenzja", "guide": "poradnik", "blog": "blog", "help": "pomoc", "privacy": "prywatnosc", "terms": "warunki", "resources": "zasoby", "new": "nowe", "popular": "popularne", "latest": "najnowsze", "browse": "przegladaj", "open": "otworz", "read": "czytaj", "search": "szukaj", "check": "sprawdz", "compare": "porownaj", "before ordering": "przed zamowieniem", "before shipping": "przed wysylka", "international shipping": "wysylka miedzynarodowa", "seller": "sprzedawca", "sellers": "sprzedawcy", "order": "zamowienie", "orders": "zamowienia", "support": "wsparcie", "cost": "koszt", "price": "cena", "stock": "stan", "size": "rozmiar", "color": "kolor", "notes": "notatki", "details": "szczegoly", "items": "rzeczy", "item": "rzecz", "route": "sciezka", "routes": "sciezki", "workflow": "proces", "checklist": "lista", "photos": "zdjecia", "photo": "zdjecie", "shipping": "wysylka"
    },
    de: {
      "LitBuy Spreadsheet": "LitBuy Tabelle", "LitBuy Finds": "LitBuy Funde", "Source Links": "Quelllinks", "Shipping Checklist": "Versand-Checkliste", "QC Photos": "QC-Fotos", "QC photos": "QC-Fotos", "shopping guide": "Einkaufsleitfaden", "shopping agent": "Einkaufsagent", "product discovery": "Produktsuche", "product routes": "Produktrouten", "category routes": "Kategorierouten", "source link": "Quelllink", "source links": "Quelllinks", "shipping line": "Versandlinie", "warehouse": "Lager", "parcel": "Paket", "hauls": "Hauls", "haul": "Haul", "finds": "Funde", "spreadsheet": "Tabelle", "categories": "Kategorien", "category": "Kategorie", "products": "Produkte", "product": "Produkt", "brand": "Marke", "brands": "Marken", "review": "Bewertung", "guide": "Leitfaden", "blog": "Blog", "help": "Hilfe", "privacy": "Datenschutz", "terms": "Bedingungen", "resources": "Ressourcen", "new": "Neu", "popular": "beliebt", "latest": "neueste", "browse": "durchsuchen", "open": "oeffnen", "read": "lesen", "search": "suchen", "check": "pruefen", "compare": "vergleichen", "before ordering": "vor der Bestellung", "before shipping": "vor dem Versand", "international shipping": "internationaler Versand", "seller": "Verkaeufer", "sellers": "Verkaeufer", "order": "Bestellung", "orders": "Bestellungen", "support": "Support", "cost": "Kosten", "price": "Preis", "stock": "Bestand", "size": "Groesse", "color": "Farbe", "notes": "Notizen", "details": "Details", "items": "Artikel", "item": "Artikel", "route": "Route", "routes": "Routen", "workflow": "Ablauf", "checklist": "Checkliste", "photos": "Fotos", "photo": "Foto", "shipping": "Versand"
    },
    fr: {
      "LitBuy Spreadsheet": "Tableur LitBuy", "LitBuy Finds": "Trouvailles LitBuy", "Source Links": "Liens source", "Shipping Checklist": "Liste d'expedition", "QC Photos": "Photos QC", "QC photos": "photos QC", "shopping guide": "guide d'achat", "shopping agent": "agent d'achat", "product discovery": "decouverte de produits", "product routes": "routes produit", "category routes": "routes categorie", "source link": "lien source", "source links": "liens source", "shipping line": "ligne d'expedition", "warehouse": "entrepot", "parcel": "colis", "hauls": "hauls", "haul": "haul", "finds": "trouvailles", "spreadsheet": "tableur", "categories": "categories", "category": "categorie", "products": "produits", "product": "produit", "brand": "marque", "brands": "marques", "review": "avis", "guide": "guide", "blog": "blog", "help": "aide", "privacy": "confidentialite", "terms": "conditions", "resources": "ressources", "new": "nouveau", "popular": "populaire", "latest": "dernier", "browse": "parcourir", "open": "ouvrir", "read": "lire", "search": "rechercher", "check": "verifier", "compare": "comparer", "before ordering": "avant de commander", "before shipping": "avant l'expedition", "international shipping": "expedition internationale", "seller": "vendeur", "sellers": "vendeurs", "order": "commande", "orders": "commandes", "support": "support", "cost": "cout", "price": "prix", "stock": "stock", "size": "taille", "color": "couleur", "notes": "notes", "details": "details", "items": "articles", "item": "article", "route": "route", "routes": "routes", "workflow": "flux", "checklist": "liste", "photos": "photos", "photo": "photo", "shipping": "expedition"
    },
    it: {
      "LitBuy Spreadsheet": "Foglio LitBuy", "LitBuy Finds": "Finds LitBuy", "Source Links": "Link sorgente", "Shipping Checklist": "Checklist spedizione", "QC Photos": "Foto QC", "QC photos": "foto QC", "shopping guide": "guida acquisti", "shopping agent": "agente acquisti", "product discovery": "scoperta prodotti", "product routes": "rotte prodotto", "category routes": "rotte categoria", "source link": "link sorgente", "source links": "link sorgente", "shipping line": "linea spedizione", "warehouse": "magazzino", "parcel": "pacco", "hauls": "haul", "haul": "haul", "finds": "finds", "spreadsheet": "foglio", "categories": "categorie", "category": "categoria", "products": "prodotti", "product": "prodotto", "brand": "brand", "brands": "brand", "review": "recensione", "guide": "guida", "blog": "blog", "help": "aiuto", "privacy": "privacy", "terms": "termini", "resources": "risorse", "new": "nuovo", "popular": "popolare", "latest": "ultimi", "browse": "sfoglia", "open": "apri", "read": "leggi", "search": "cerca", "check": "controlla", "compare": "confronta", "before ordering": "prima dell'ordine", "before shipping": "prima della spedizione", "international shipping": "spedizione internazionale", "seller": "venditore", "sellers": "venditori", "order": "ordine", "orders": "ordini", "support": "supporto", "cost": "costo", "price": "prezzo", "stock": "stock", "size": "taglia", "color": "colore", "notes": "note", "details": "dettagli", "items": "articoli", "item": "articolo", "route": "rotta", "routes": "rotte", "workflow": "flusso", "checklist": "checklist", "photos": "foto", "photo": "foto", "shipping": "spedizione"
    },
    pt: {
      "LitBuy Spreadsheet": "Planilha LitBuy", "LitBuy Finds": "Achados LitBuy", "Source Links": "Links de origem", "Shipping Checklist": "Checklist de envio", "QC Photos": "Fotos QC", "QC photos": "fotos QC", "shopping guide": "guia de compras", "shopping agent": "agente de compras", "product discovery": "descoberta de produtos", "product routes": "rotas de produto", "category routes": "rotas de categoria", "source link": "link de origem", "source links": "links de origem", "shipping line": "linha de envio", "warehouse": "armazem", "parcel": "pacote", "hauls": "hauls", "haul": "haul", "finds": "achados", "spreadsheet": "planilha", "categories": "categorias", "category": "categoria", "products": "produtos", "product": "produto", "brand": "marca", "brands": "marcas", "review": "avaliacao", "guide": "guia", "blog": "blog", "help": "ajuda", "privacy": "privacidade", "terms": "termos", "resources": "recursos", "new": "novo", "popular": "popular", "latest": "mais recente", "browse": "navegar", "open": "abrir", "read": "ler", "search": "buscar", "check": "verificar", "compare": "comparar", "before ordering": "antes do pedido", "before shipping": "antes do envio", "international shipping": "envio internacional", "seller": "vendedor", "sellers": "vendedores", "order": "pedido", "orders": "pedidos", "support": "suporte", "cost": "custo", "price": "preco", "stock": "estoque", "size": "tamanho", "color": "cor", "notes": "notas", "details": "detalhes", "items": "itens", "item": "item", "route": "rota", "routes": "rotas", "workflow": "fluxo", "checklist": "checklist", "photos": "fotos", "photo": "foto", "shipping": "envio"
    },
    es: {
      "LitBuy Spreadsheet": "Hoja LitBuy", "LitBuy Finds": "Hallazgos LitBuy", "Source Links": "Enlaces fuente", "Shipping Checklist": "Lista de envio", "QC Photos": "Fotos QC", "QC photos": "fotos QC", "shopping guide": "guia de compra", "shopping agent": "agente de compras", "product discovery": "descubrimiento de productos", "product routes": "rutas de producto", "category routes": "rutas de categoria", "source link": "enlace fuente", "source links": "enlaces fuente", "shipping line": "linea de envio", "warehouse": "almacen", "parcel": "paquete", "hauls": "hauls", "haul": "haul", "finds": "hallazgos", "spreadsheet": "hoja", "categories": "categorias", "category": "categoria", "products": "productos", "product": "producto", "brand": "marca", "brands": "marcas", "review": "resena", "guide": "guia", "blog": "blog", "help": "ayuda", "privacy": "privacidad", "terms": "terminos", "resources": "recursos", "new": "nuevo", "popular": "popular", "latest": "reciente", "browse": "explorar", "open": "abrir", "read": "leer", "search": "buscar", "check": "revisar", "compare": "comparar", "before ordering": "antes de pedir", "before shipping": "antes del envio", "international shipping": "envio internacional", "seller": "vendedor", "sellers": "vendedores", "order": "pedido", "orders": "pedidos", "support": "soporte", "cost": "costo", "price": "precio", "stock": "stock", "size": "talla", "color": "color", "notes": "notas", "details": "detalles", "items": "articulos", "item": "articulo", "route": "ruta", "routes": "rutas", "workflow": "flujo", "checklist": "lista", "photos": "fotos", "photo": "foto", "shipping": "envio"
    },
    nl: {
      "LitBuy Spreadsheet": "LitBuy spreadsheet", "LitBuy Finds": "LitBuy vondsten", "Source Links": "Bronlinks", "Shipping Checklist": "Verzendchecklist", "QC Photos": "QC-foto's", "QC photos": "QC-foto's", "shopping guide": "winkelgids", "shopping agent": "koopagent", "product discovery": "productontdekking", "product routes": "productroutes", "category routes": "categorieroutes", "source link": "bronlink", "source links": "bronlinks", "shipping line": "verzendlijn", "warehouse": "magazijn", "parcel": "pakket", "hauls": "hauls", "haul": "haul", "finds": "vondsten", "spreadsheet": "spreadsheet", "categories": "categorieen", "category": "categorie", "products": "producten", "product": "product", "brand": "merk", "brands": "merken", "review": "review", "guide": "gids", "blog": "blog", "help": "hulp", "privacy": "privacy", "terms": "voorwaarden", "resources": "resources", "new": "nieuw", "popular": "populair", "latest": "nieuwste", "browse": "bladeren", "open": "openen", "read": "lezen", "search": "zoeken", "check": "controleren", "compare": "vergelijken", "before ordering": "voor bestellen", "before shipping": "voor verzending", "international shipping": "internationale verzending", "seller": "verkoper", "sellers": "verkopers", "order": "bestelling", "orders": "bestellingen", "support": "support", "cost": "kosten", "price": "prijs", "stock": "voorraad", "size": "maat", "color": "kleur", "notes": "notities", "details": "details", "items": "items", "item": "item", "route": "route", "routes": "routes", "workflow": "workflow", "checklist": "checklist", "photos": "foto's", "photo": "foto", "shipping": "verzending"
    },
    da: {
      "LitBuy Spreadsheet": "LitBuy regneark", "LitBuy Finds": "LitBuy fund", "Source Links": "Kildelinks", "Shipping Checklist": "Forsendelsestjekliste", "QC Photos": "QC-fotos", "QC photos": "QC-fotos", "shopping guide": "shoppingguide", "shopping agent": "shoppingagent", "product discovery": "produktfund", "product routes": "produktruter", "category routes": "kategoriruter", "source link": "kildelink", "source links": "kildelinks", "shipping line": "forsendelseslinje", "warehouse": "lager", "parcel": "pakke", "hauls": "hauls", "haul": "haul", "finds": "fund", "spreadsheet": "regneark", "categories": "kategorier", "category": "kategori", "products": "produkter", "product": "produkt", "brand": "brand", "brands": "brands", "review": "anmeldelse", "guide": "guide", "blog": "blog", "help": "hjaelp", "privacy": "privatliv", "terms": "vilkar", "resources": "ressourcer", "new": "ny", "popular": "populaer", "latest": "seneste", "browse": "gennemse", "open": "abn", "read": "laes", "search": "sog", "check": "tjek", "compare": "sammenlign", "before ordering": "for bestilling", "before shipping": "for forsendelse", "international shipping": "international forsendelse", "seller": "saelger", "sellers": "saelgere", "order": "ordre", "orders": "ordrer", "support": "support", "cost": "pris", "price": "pris", "stock": "lagerstatus", "size": "storrelse", "color": "farve", "notes": "noter", "details": "detaljer", "items": "varer", "item": "vare", "route": "rute", "routes": "ruter", "workflow": "flow", "checklist": "tjekliste", "photos": "fotos", "photo": "foto", "shipping": "forsendelse"
    },
    sv: {
      "LitBuy Spreadsheet": "LitBuy kalkylblad", "LitBuy Finds": "LitBuy fynd", "Source Links": "Kallankar", "Shipping Checklist": "Fraktchecklista", "QC Photos": "QC-foton", "QC photos": "QC-foton", "shopping guide": "kopguide", "shopping agent": "kopagent", "product discovery": "produktupptackt", "product routes": "produktrutter", "category routes": "kategorirutter", "source link": "kallank", "source links": "kallankar", "shipping line": "fraktlinje", "warehouse": "lager", "parcel": "paket", "hauls": "hauls", "haul": "haul", "finds": "fynd", "spreadsheet": "kalkylblad", "categories": "kategorier", "category": "kategori", "products": "produkter", "product": "produkt", "brand": "varumarke", "brands": "varumarken", "review": "recension", "guide": "guide", "blog": "blogg", "help": "hjalp", "privacy": "integritet", "terms": "villkor", "resources": "resurser", "new": "nytt", "popular": "popular", "latest": "senaste", "browse": "bladdra", "open": "oppna", "read": "las", "search": "sok", "check": "kontrollera", "compare": "jamfor", "before ordering": "fore bestallning", "before shipping": "fore frakt", "international shipping": "internationell frakt", "seller": "saljare", "sellers": "saljare", "order": "order", "orders": "ordrar", "support": "support", "cost": "kostnad", "price": "pris", "stock": "lager", "size": "storlek", "color": "farg", "notes": "anteckningar", "details": "detaljer", "items": "artiklar", "item": "artikel", "route": "rutt", "routes": "rutter", "workflow": "flode", "checklist": "checklista", "photos": "foton", "photo": "foto", "shipping": "frakt"
    },
    ar: {
      "LitBuy Spreadsheet": "جدول LitBuy", "LitBuy Finds": "اكتشافات LitBuy", "Source Links": "روابط المصدر", "Shipping Checklist": "قائمة فحص الشحن", "QC Photos": "صور الفحص", "QC photos": "صور الفحص", "shopping guide": "دليل الشراء", "shopping agent": "وكيل شراء", "product discovery": "اكتشاف المنتجات", "product routes": "مسارات المنتجات", "category routes": "مسارات الفئات", "source link": "رابط المصدر", "source links": "روابط المصدر", "shipping line": "خط الشحن", "warehouse": "المستودع", "parcel": "الطرد", "hauls": "طلبات مجمعة", "haul": "طلب مجمع", "finds": "اكتشافات", "spreadsheet": "جدول", "categories": "الفئات", "category": "الفئة", "products": "المنتجات", "product": "المنتج", "brand": "العلامة", "brands": "العلامات", "review": "مراجعة", "guide": "دليل", "blog": "مدونة", "help": "مساعدة", "privacy": "الخصوصية", "terms": "الشروط", "resources": "الموارد", "new": "جديد", "popular": "شائع", "latest": "الاحدث", "browse": "تصفح", "open": "افتح", "read": "اقرا", "search": "ابحث", "check": "تحقق", "compare": "قارن", "before ordering": "قبل الطلب", "before shipping": "قبل الشحن", "international shipping": "الشحن الدولي", "seller": "البائع", "sellers": "البائعون", "order": "الطلب", "orders": "الطلبات", "support": "الدعم", "cost": "التكلفة", "price": "السعر", "stock": "المخزون", "size": "المقاس", "color": "اللون", "notes": "ملاحظات", "details": "التفاصيل", "items": "العناصر", "item": "العنصر", "route": "المسار", "routes": "المسارات", "workflow": "سير العمل", "checklist": "قائمة فحص", "photos": "صور", "photo": "صورة", "shipping": "الشحن"
    },
    cs: {
      "LitBuy Spreadsheet": "Tabulka LitBuy", "LitBuy Finds": "Nalezy LitBuy", "Source Links": "Zdrojove odkazy", "Shipping Checklist": "Kontrolni seznam dopravy", "QC Photos": "QC fotky", "QC photos": "QC fotky", "shopping guide": "nakupni pruvodce", "shopping agent": "nakupni agent", "product discovery": "objevovani produktu", "product routes": "produktove trasy", "category routes": "kategoricke trasy", "source link": "zdrojovy odkaz", "source links": "zdrojove odkazy", "shipping line": "dopravni linka", "warehouse": "sklad", "parcel": "balik", "hauls": "hauly", "haul": "haul", "finds": "nalezy", "spreadsheet": "tabulka", "categories": "kategorie", "category": "kategorie", "products": "produkty", "product": "produkt", "brand": "znacka", "brands": "znacky", "review": "recenze", "guide": "pruvodce", "blog": "blog", "help": "napoveda", "privacy": "soukromi", "terms": "podminky", "resources": "zdroje", "new": "nove", "popular": "popularni", "latest": "nejnovejsi", "browse": "prochazet", "open": "otevrit", "read": "cist", "search": "hledat", "check": "zkontrolovat", "compare": "porovnat", "before ordering": "pred objednanim", "before shipping": "pred odeslanim", "international shipping": "mezinarodni doprava", "seller": "prodejce", "sellers": "prodejci", "order": "objednavka", "orders": "objednavky", "support": "podpora", "cost": "naklad", "price": "cena", "stock": "sklad", "size": "velikost", "color": "barva", "notes": "poznamky", "details": "detaily", "items": "polozky", "item": "polozka", "route": "trasa", "routes": "trasy", "workflow": "postup", "checklist": "seznam", "photos": "fotky", "photo": "fotka", "shipping": "doprava"
    }
  };

  function localizedFallback(value, lang) {
    if (lang === "en" || !value) return value || "";
    const terms = LANGUAGE_TERM_MAP[lang];
    if (!terms) return value || "";
    let output = String(value);
    Object.keys(terms)
      .sort((a, b) => b.length - a.length)
      .forEach((source) => {
        output = output.replace(new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), terms[source]);
      });
    return output;
  }

  function localizedKey(key, lang) {
    const english = I18N.en[key] || "";
    if (lang === "en") return english;
    if (I18N_NATIVE_KEYS[lang]?.has(key)) return I18N[lang][key] || english;
    return localizedFallback(english, lang);
  }

  function shouldTranslateTextNode(node) {
    const parent = node.parentElement;
    if (!parent) return false;
    if (!node.nodeValue.trim()) return false;
    if (parent.closest("script, style, noscript, .lang-menu-panel")) return false;
    if (parent.closest("[data-i18n], [data-i18n-html], [data-i18n-placeholder], [data-i18n-content], [data-i18n-aria], [data-i18n-count]")) return false;
    return true;
  }

  function captureOriginalTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (shouldTranslateTextNode(node) && !ORIGINAL_TEXT_NODES.has(node)) {
        ORIGINAL_TEXT_NODES.set(node, node.nodeValue);
      }
    });
  }

  function translateLooseText(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (!shouldTranslateTextNode(node)) return;
      if (!ORIGINAL_TEXT_NODES.has(node)) ORIGINAL_TEXT_NODES.set(node, node.nodeValue);
      const original = ORIGINAL_TEXT_NODES.get(node);
      node.nodeValue = lang === "en" ? original : localizedFallback(original, lang);
    });
  }

  function translateAttr(el, attr, lang) {
    if (!el.hasAttribute(attr)) return;
    if (!ORIGINAL_ATTRS.has(el)) ORIGINAL_ATTRS.set(el, {});
    const attrs = ORIGINAL_ATTRS.get(el);
    if (!(attr in attrs)) attrs[attr] = el.getAttribute(attr);
    const original = attrs[attr] || "";
    el.setAttribute(attr, lang === "en" ? original : localizedFallback(original, lang));
  }

  function translateLooseAttributes(lang) {
    document.querySelectorAll("[aria-label], img[alt], input[placeholder], textarea[placeholder]").forEach((el) => {
      if (el.dataset.i18nAria) return;
      translateAttr(el, "aria-label", lang);
      translateAttr(el, "alt", lang);
      if (!el.dataset.i18nPlaceholder) translateAttr(el, "placeholder", lang);
    });
  }

  function translatePageMeta(lang) {
    document.title = lang === "en" ? ORIGINAL_TITLE : localizedFallback(ORIGINAL_TITLE, lang);
    TRANSLATABLE_META_SELECTORS.forEach((selector) => {
      const el = document.querySelector(selector);
      if (!el || el.dataset.i18nContent) return;
      translateAttr(el, "content", lang);
    });
  }

  function categoryLabel(slug) {
    const cat = (window.LITBUY_CATEGORIES || []).find((c) => c.slug === slug);
    return localizedKey(`category.${slug}`, currentLanguage) || (cat ? localizedFallback(cat.name, currentLanguage) : slug);
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
    if (!safeUrl(href).startsWith("http")) return "";
    return cfg.openInNewTab !== false ? ' target="_blank" rel="noopener noreferrer"' : "";
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttr(value) {
    return escapeHtml(value)
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeClassToken(value, fallback) {
    const token = String(value || "").toLowerCase();
    return /^[a-z0-9-]+$/.test(token) ? token : fallback;
  }

  function isAllowedRelativePath(value) {
    if (!/^[a-z0-9._/-]+(?:[?#].*)?$/i.test(value)) return false;
    return !value
      .split(/[?#]/)[0]
      .split("/")
      .some((part) => !part || part === "." || part === ".." || part.startsWith("."));
  }

  function safeUrl(value) {
    const url = String(value || "").trim();
    if (!url || /^(?:javascript|data):/i.test(url) || url.startsWith("//")) return "#";
    if (isAllowedRelativePath(url)) return url;

    try {
      const parsed = new URL(url);
      if (parsed.protocol === "https:" && ALLOWED_EXTERNAL_URL_ORIGINS.has(parsed.origin)) {
        return parsed.href;
      }
    } catch (e) {
      return "#";
    }
    return "#";
  }

  function categoryImage(category) {
    const product = (window.LITBUY_PRODUCTS || []).find((item) => item.category === category && item.image);
    return product ? product.image : "";
  }

  function productImageHtml(product, fallbackIcon) {
    const icon = escapeHtml(fallbackIcon);
    const image = safeUrl(product.image || categoryImage(product.category));
    if (image !== "#") {
      return `<img src="${escapeAttr(image)}" alt="${escapeAttr(product.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"><span class="product-image-fallback" hidden>${icon}</span>`;
    }

    return `<span class="product-image-fallback">${icon}</span>`;
  }

  function categoryCardHtml(c) {
    const href = safeUrl(categoryHref(c));
    const external = href.startsWith("http");
    const newTab = external && cfg.openInNewTab !== false;
    const slug = safeClassToken(c.slug, "other");
    return `
        <a href="${escapeAttr(href)}" class="category-card${external ? " category-card--external maisonlooks-link" : ""}"${newTab ? ' target="_blank" rel="noopener noreferrer"' : ""}>
          <span class="category-icon">${escapeHtml(c.icon)}</span>
          <span class="category-name" data-i18n="category.${slug}">${escapeHtml(categoryLabel(c.slug))}</span>
          ${c.count ? `<span class="category-count">${escapeHtml(c.count)}</span>` : ""}
        </a>`;
  }

  function renderCategoryGrid() {
    const catGrid = document.getElementById("categoryGrid");
    if (!catGrid) return;
    catGrid.innerHTML = (window.LITBUY_CATEGORIES || []).map(categoryCardHtml).join("");
  }

  function categoryProductCardItems() {
    const used = new Set();
    return (window.LITBUY_CATEGORIES || [])
      .map((category) => {
        const product = (window.LITBUY_PRODUCTS || []).find((item) => item.category === category.slug && !used.has(item.id));
        if (!product) return null;
        used.add(product.id);
        return {
          label: category.name,
          name: product.name,
          image: product.image,
          url: product.url
        };
      })
      .filter(Boolean);
  }

  function categoryProductCardHtml(item) {
    const href = safeUrl(item.url);
    const image = safeUrl(item.image);
    const imageAlt = `${item.name} product preview`;
    const description = localizedFallback("Open this exact StreetStyle product detail page before adding the item through LitBuy.", currentLanguage);
    const productCta = localizedFallback("View Product", currentLanguage).toUpperCase();
    const itemLabel = localizedFallback(item.label, currentLanguage);

    return `
      <a href="${escapeAttr(href)}" class="category-product-card maisonlooks-link"${externalTargetAttrs(href)} aria-label="${escapeAttr(localizedFallback(`Open ${item.name} on StreetStyle`, currentLanguage))}">
        <span class="category-product-media">
          ${image !== "#" ? `<img src="${escapeAttr(image)}" alt="${escapeAttr(imageAlt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">` : `<span class="category-product-media__fallback">${escapeHtml(item.name)}</span>`}
        </span>
        <span class="category-product-body">
          <span class="category-product-kicker">${escapeHtml(itemLabel)}</span>
          <span class="category-product-title">${escapeHtml(item.name)}</span>
          <span class="category-product-desc">${escapeHtml(description)}</span>
          <span class="category-product-count">${escapeHtml(productCta)}</span>
        </span>
      </a>`;
  }

  function bindCategoryProductImages(grid) {
    grid.querySelectorAll(".category-product-media img").forEach((img) => {
      img.addEventListener("error", () => {
        const media = img.closest(".category-product-media");
        if (!media) return;
        media.innerHTML = `
          <span class="category-product-media__fallback">
            ${escapeHtml(img.alt.replace(" product preview", ""))}
          </span>
        `;
      });
    });
  }

  function renderCategoryProductGrid() {
    const grid = document.getElementById("categoryProductGrid");
    if (!grid) return;
    grid.innerHTML = categoryProductCardItems().map(categoryProductCardHtml).join("");
    bindCategoryProductImages(grid);
  }

  function productCard(p) {
    const browseUrl = safeUrl(p.url || maisonlooksCategoryUrl(p.category, p.badge));
    const hasProductUrl = Boolean(p.url);
    const badgeToken = safeClassToken(p.badge, "");
    const badge = p.badge
      ? `<span class="product-badge product-badge--${badgeToken}">🔥 ${escapeHtml(localizedFallback(p.badge === "hot" ? "Hot" : "Trending", currentLanguage).toUpperCase())}</span>`
      : "";
    const icons = { shoes: "SH", hoodies: "HD", "t-shirts": "TS", jackets: "JK", pants: "PT", bags: "BG", headwear: "HW", accessories: "AC", jersey: "JR", electronics: "EL", other: "OT" };
    const icon = icons[p.category] || "LB";
    const browseKey = hasProductUrl ? "product.viewProduct" : p.badge === "hot" ? "product.browseHot" : p.badge === "trending" ? "product.browseTrending" : "product.browseCategory";
    const browseLabel = localizedKey(browseKey, currentLanguage) || (hasProductUrl ? "View Product" : p.badge === "hot" ? "Browse Hot Picks" : p.badge === "trending" ? "Browse Trending" : "Browse Category");
    const category = categoryLabel(p.category);
    const productMeta = [p.brand, category].filter(Boolean).join(" / ");
    const productDesc = localizedFallback(p.desc || t("product.defaultDesc") || "Selected LitBuy route for shoppers who want a fast product preview before opening LitBuy.", currentLanguage);
    const primaryUrl = safeUrl(hasProductUrl ? browseUrl : buyUrl(p));
    const primaryKey = hasProductUrl ? "product.openProduct" : "product.buyOnLitBuy";
    const primaryLabel = localizedKey(primaryKey, currentLanguage) || (hasProductUrl ? "Open Product" : "Buy On LitBuy");
    const price = p.price ? `<span class="product-price">$${escapeHtml(p.price)}</span>` : "";
    const styleCount = p.styles ? `<span class="product-chip">${escapeHtml(localizedFallback(`${p.styles} styles`, currentLanguage))}</span>` : "";

    return `
      <article class="product-card">
        <a href="${escapeAttr(browseUrl)}" class="product-image product-image-link maisonlooks-link"${externalTargetAttrs(browseUrl)} aria-label="${escapeAttr(`${browseLabel}: ${p.name}`)}">
          ${badge}
          ${price}
          ${productImageHtml(p, icon)}
        </a>
        <div class="product-body">
          <div class="product-kicker">
            <span class="product-category">${escapeHtml(category)}</span>
            ${styleCount}
          </div>
          <h3>${escapeHtml(p.name)}</h3>
          <div class="product-meta">${escapeHtml(productMeta)}</div>
          <p class="product-desc">${escapeHtml(productDesc)}</p>
          <div class="product-actions">
            <a href="${escapeAttr(browseUrl)}" class="btn btn-secondary product-browse-btn maisonlooks-link"${externalTargetAttrs(browseUrl)} data-i18n="${escapeAttr(browseKey)}">${escapeHtml(browseLabel)}</a>
            <a href="${escapeAttr(primaryUrl)}" class="btn btn-primary maisonlooks-link"${externalTargetAttrs(primaryUrl)} data-i18n="${escapeAttr(primaryKey)}">${escapeHtml(primaryLabel)}</a>
          </div>
        </div>
      </article>`;
  }

  function renderProducts(container, products) {
    if (!container) return;
    container.innerHTML = products.length
      ? products.map(productCard).join("")
      : `<p style="color:var(--text-muted);grid-column:1/-1" data-i18n="finds.empty">${escapeHtml(t("finds.empty") || "No products found.")}</p>`;
    container.querySelectorAll(".product-image img").forEach((img) => {
      img.addEventListener("error", () => {
        img.hidden = true;
        const fallback = img.nextElementSibling;
        if (fallback) fallback.hidden = false;
      });
    });
  }

  function productCountText(count) {
    const template = localizedKey("finds.count", currentLanguage) || "{count} products found";
    return template.replace("{count}", count);
  }

  function supportedLanguage(lang) {
    return SUPPORTED_LANG_CODES.has(lang) ? lang : "en";
  }

  function pageFileName() {
    const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    return file || "index.html";
  }

  function applyPageTranslations(lang) {
    const pageHtml = PAGE_I18N[lang]?.[pageFileName()];
    document.querySelectorAll(".content-page").forEach((content) => {
      if (!ORIGINAL_PAGE_HTML.has(content)) {
        ORIGINAL_PAGE_HTML.set(content, content.innerHTML);
      }
      content.innerHTML = pageHtml || ORIGINAL_PAGE_HTML.get(content);
    });
  }

  function markCommonFooterKeys() {
    document.querySelectorAll('a[href*="source-links.html"]').forEach((link) => {
      if (!link.dataset.i18n) link.dataset.i18n = "footer.sourceLinks";
    });
    document.querySelectorAll('a[href*="shipping-checklist.html"]').forEach((link) => {
      if (!link.dataset.i18n) link.dataset.i18n = "footer.shippingChecklist";
    });
  }

  function preferredLanguage() {
    let saved = "";
    try {
      saved = localStorage.getItem(LANG_STORAGE_KEY);
    } catch (e) {
      saved = "";
    }
    if (saved && SUPPORTED_LANG_CODES.has(saved)) return saved;
    if (saved && I18N[saved]) saveLanguage("en");
    const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED_LANG_CODES.has(browserLang) ? browserLang : "en";
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      // Language switching should still work even when storage is blocked.
    }
  }

  function markCommonNavKeys(nav) {
    nav.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.includes("index.html") && !href.includes("#faq")) link.dataset.i18n = "nav.home";
      if (href.includes("finds.html")) link.dataset.i18n = "nav.finds";
      if (href.includes("review.html")) link.dataset.i18n = "nav.resources";
      if (href.includes("qc.html")) link.dataset.i18n = "nav.qc";
      if (href.includes("blog.html")) link.dataset.i18n = "nav.blog";
      if (href.includes("new.html")) link.dataset.i18n = "nav.new";
      if (href.includes("categories.html")) link.dataset.i18n = "nav.categories";
      if (href.includes("help.html")) link.dataset.i18n = "nav.help";
      if (href.includes("#faq")) link.dataset.i18n = "nav.faq";
      if (href.includes("source-links.html")) link.dataset.i18n = "footer.sourceLinks";
      if (href.includes("shipping-checklist.html")) link.dataset.i18n = "footer.shippingChecklist";
    });
  }

  function languageOption(lang) {
    return LANG_OPTIONS.find((option) => option.code === lang) || LANG_OPTIONS[0];
  }

  function ensureLanguageMenu(nav) {
    nav.querySelectorAll(".lang-select").forEach((select) => select.remove());

    let menu = nav.querySelector(".lang-menu");
    if (!menu) {
      menu = document.createElement("div");
      menu.className = "lang-menu";
      menu.innerHTML = `
        <button class="lang-menu-button" type="button" aria-haspopup="listbox" aria-expanded="false" data-i18n-aria="nav.language">
          <span class="lang-menu-flag" aria-hidden="true"></span>
          <span class="lang-menu-current"></span>
        </button>
        <div class="lang-menu-panel" role="listbox"></div>`;
      nav.append(menu);
    }

    const panel = menu.querySelector(".lang-menu-panel");
    panel.innerHTML = LANG_OPTIONS.map((option) => `
      <button class="lang-menu-option" type="button" role="option" data-lang="${option.code}" aria-selected="false">
        <span class="lang-menu-flag" aria-hidden="true">${option.flag}</span>
        <span>${option.label}</span>
      </button>`).join("");

    return menu;
  }

  function refreshOpenFaqHeights() {
    document.querySelectorAll(".faq-item.open .faq-answer").forEach((answer) => {
      answer.style.maxHeight = answer.scrollHeight + "px";
    });
  }

  function applyLanguage(lang) {
    const nextLanguage = supportedLanguage(lang);
    const messages = I18N[nextLanguage] || I18N.en;
    currentLanguage = nextLanguage;
    document.documentElement.lang = nextLanguage;
    applyPageTranslations(nextLanguage);
    captureOriginalTextNodes();
    markCommonFooterKeys();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = I18N_NATIVE_KEYS[nextLanguage]?.has(el.dataset.i18n)
        ? messages[el.dataset.i18n]
        : localizedKey(el.dataset.i18n, nextLanguage);
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const value = I18N_NATIVE_KEYS[nextLanguage]?.has(el.dataset.i18nHtml)
        ? messages[el.dataset.i18nHtml]
        : localizedKey(el.dataset.i18nHtml, nextLanguage);
      if (value) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = I18N_NATIVE_KEYS[nextLanguage]?.has(el.dataset.i18nPlaceholder)
        ? messages[el.dataset.i18nPlaceholder]
        : localizedKey(el.dataset.i18nPlaceholder, nextLanguage);
      if (value) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const value = I18N_NATIVE_KEYS[nextLanguage]?.has(el.dataset.i18nContent)
        ? messages[el.dataset.i18nContent]
        : localizedKey(el.dataset.i18nContent, nextLanguage);
      if (value) el.setAttribute("content", value);
    });

    document.querySelectorAll("[data-i18n-count]").forEach((el) => {
      el.textContent = productCountText(Number(el.dataset.count || 0));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const value = I18N_NATIVE_KEYS[nextLanguage]?.has(el.dataset.i18nAria)
        ? messages[el.dataset.i18nAria]
        : localizedKey(el.dataset.i18nAria, nextLanguage);
      if (value) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll(".lang-menu").forEach((menu) => {
      const option = languageOption(lang);
      const button = menu.querySelector(".lang-menu-button");
      const flag = menu.querySelector(".lang-menu-button .lang-menu-flag");
      const current = menu.querySelector(".lang-menu-current");
      if (flag) flag.textContent = option.flag;
      if (current) current.textContent = option.label;
      if (button) button.dataset.lang = option.code;

      menu.querySelectorAll(".lang-menu-option").forEach((item) => {
        const active = item.dataset.lang === option.code;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
    });

    document.documentElement.dir = nextLanguage === "ar" ? "rtl" : "ltr";
    translateLooseText(nextLanguage);
    translateLooseAttributes(nextLanguage);
    translatePageMeta(nextLanguage);
    refreshOpenFaqHeights();
  }

  function initI18n() {
    document.querySelectorAll(".site-nav").forEach((nav) => {
      markCommonNavKeys(nav);
      const menu = ensureLanguageMenu(nav);
      const toggle = menu.querySelector(".lang-menu-button");
      const panel = menu.querySelector(".lang-menu-panel");

      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });

      panel.addEventListener("click", (event) => {
        const option = event.target.closest(".lang-menu-option");
        if (!option) return;
        saveLanguage(option.dataset.lang);
        applyLanguage(option.dataset.lang);
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".lang-menu.open").forEach((menu) => {
        menu.classList.remove("open");
        const toggle = menu.querySelector(".lang-menu-button");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      document.querySelectorAll(".lang-menu.open").forEach((menu) => {
        menu.classList.remove("open");
        const toggle = menu.querySelector(".lang-menu-button");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });

    applyLanguage(preferredLanguage());
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
    if (format === "plain") return `${n}+`;
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

  function initHomeRefreshScrollTop() {
    if (!isHomePage() || window.location.hash) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const navigation = performance.getEntriesByType?.("navigation")?.[0];
    const isReload = navigation ? navigation.type === "reload" : performance.navigation?.type === 1;
    if (!isReload) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
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
        .map((r) => `<a href="${escapeAttr(safeUrl(r.href))}" class="link-pill">${escapeHtml(r.label)}</a>`)
        .join("");
    }

    const brands = document.getElementById("brandRoutes");
    if (brands) {
      brands.innerHTML = (window.LITBUY_BRANDS || [])
        .map((b) => `<a href="${escapeAttr(BRAND_SEARCH_URL + encodeURIComponent(b))}" class="link-pill maisonlooks-link" target="_blank" rel="noopener noreferrer">${escapeHtml(b)} Finds</a>`)
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
      if (countEl) {
        countEl.dataset.i18nCount = "finds.count";
        countEl.dataset.count = String(filtered.length);
        countEl.textContent = productCountText(filtered.length);
      }
      renderProducts(document.getElementById("findsGrid"), filtered);
      applyLanguage(currentLanguage);
    }

    searchInput?.addEventListener("input", update);
    categoryFilter?.addEventListener("change", update);
    update();
  }

  function boot() {
    renderCategoryGrid();
    renderCategoryProductGrid();
    initHomeRefreshScrollTop();
    initNav();
    initSearch();
    initFaq();
    initHome();
    initFinds();
    initI18n();
    initHeroCountUp();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.LitBuySite = { buyUrl, renderProducts, productCard };
})();
