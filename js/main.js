(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const AFFILIATE = cfg.affiliate || "https://litbuy.com";
  const SEARCH_REDIRECT_URL = "https://streetstyle.maisonlooks.com/en/search?q=";
  const BRAND_SEARCH_URL = "https://streetstyle.maisonlooks.com/en/search?q=";
  const LANG_STORAGE_KEY = "litbuy-language";
  const LANG_OPTIONS = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
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
  let currentLanguage = "en";
  const I18N = {
    en: {
      "nav.home": "Home",
      "nav.finds": "Finds",
      "nav.resources": "Resources",
      "nav.categories": "Categories",
      "nav.help": "Help",
      "nav.faq": "FAQ",
      "nav.language": "Language",
      "home.heroLabel": "Independent LitBuy Guide",
      "home.heroTitle": "Discover Curated LitBuy Picks",
      "home.heroDesc": "A simple, fast, and efficient LitBuy spreadsheet resource for finds, shopping lists, search, and category sorting, so you can browse faster and place orders through LitBuy with one click.",
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
      "home.startStep2Title": "Open a Product Link",
      "home.startStep2Body": "Compare product names, categories, and route pages before opening the LitBuy or MaisonLooks ordering page.",
      "home.startStep3Title": "Order Through LitBuy",
      "home.startStep3Body": "Use LitBuy to submit the item, manage warehouse intake, combine parcels, and prepare international shipping.",
      "home.startStep4Title": "Check QC Photos",
      "home.startStep4Body": "Review warehouse photos, confirm sizing and quality, then choose a shipping line for your haul.",
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
      "finds.subtitle": "Browse curated products with search, filters, and direct LitBuy purchase links.",
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
      "home.latestCard3Kicker": "Finds Guide",
      "home.latestCard3Title": "Best categories to browse first",
      "home.latestCard3Body": "Start with high-demand routes like shoes, streetwear, bags, accessories, and budget-friendly basics.",
      "home.latestCard3Link": "Open finds →",
      "home.latestCard4Kicker": "Compare Guide",
      "home.latestCard4Title": "LitBuy alternatives and agent comparison",
      "home.latestCard4Body": "Compare LitBuy with other shopping agents before choosing where to order and ship your items.",
      "home.latestCard4Link": "Compare agents →",
      "home.seoBody1": "The LitBuy Spreadsheet is designed as a practical shopping index for international buyers who want to discover product ideas before placing an order. Instead of searching through scattered posts, old seller links, or disconnected marketplace pages, shoppers can start with organized categories, brand routes, and curated finds.",
      "home.seoBody2": "Each section is written around the way people actually search: LitBuy finds, product spreadsheets, shopping agent reviews, hauls, QC photos, Taobao links, Weidian links, 1688 routes, and category-specific items like shoes, hoodies, jackets, bags, and accessories.",
      "home.seoBody3": "This site is independent and informational. Product checkout, QC review, warehouse storage, and international shipping are handled through LitBuy.com or the linked shopping pages. Our role is to make discovery faster and give each shopper a clearer path from keyword search to order preparation.",
      "home.browseTitle": "What you can browse",
      "home.browse1": "Curated LitBuy finds and category routes",
      "home.browse2": "Spreadsheet-style product shortcuts",
      "home.browse3": "Shopping guide and review content",
      "home.browse4": "Haul planning and QC-focused tips",
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
      "spreadsheet.subtitle": "Use this page as the central index for LitBuy finds, category routes, shopping guides, and product discovery shortcuts.",
      "spreadsheet.indexLabel": "Spreadsheet Index",
      "spreadsheet.indexTitle": "Browse curated LitBuy spreadsheet routes",
      "spreadsheet.card.finds": "All LitBuy Finds",
      "spreadsheet.card.findsCta": "Browse products →",
      "spreadsheet.card.categories": "Category Spreadsheet",
      "spreadsheet.card.categoriesCta": "Open categories →",
      "spreadsheet.card.reviewCta": "Read guide →",
      "spreadsheet.card.haul": "Haul Planning",
      "spreadsheet.card.haulCta": "Plan a haul →",
      "spreadsheet.howLabel": "How It Works",
      "spreadsheet.whatTitle": "What is a LitBuy Spreadsheet?",
      "spreadsheet.body1": "A LitBuy Spreadsheet is an organized product discovery resource for shoppers who want quick access to finds, categories, brands, and shopping guide links before ordering through a China shopping agent.",
      "spreadsheet.body2": "This index focuses on practical routes for Taobao, Weidian, and 1688 discovery. Start with a category, compare product ideas, then open the related LitBuy or MaisonLooks page when you are ready to prepare an order.",
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

  LANG_OPTIONS.forEach(({ code }) => {
    I18N[code] = Object.assign({}, I18N.en, I18N[code] || {});
  });

  function buyUrl(product) {
    return AFFILIATE + (product ? "?product=" + encodeURIComponent(product.name) : "");
  }

  function t(key) {
    const messages = I18N[currentLanguage] || I18N.en;
    return messages[key] || I18N.en[key] || "";
  }

  function categoryLabel(slug) {
    const cat = (window.LITBUY_CATEGORIES || []).find((c) => c.slug === slug);
    return t(`category.${slug}`) || (cat ? cat.name : slug);
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

  function safeUrl(value) {
    const url = String(value || "");
    if (/^(?:https?:\/\/|[a-z0-9._/-]+(?:[?#].*)?$)/i.test(url) && !/^(?:javascript|data):/i.test(url)) {
      return url;
    }
    return "#";
  }

  function categoryImage(category) {
    const images = {
      shoes: "images/products/nike-air-jordan-3-sail-university-blue-sneakers-833aa8.webp",
      hoodies: "images/products/moncler-single-white-logo-crewneck-sweatshirt-1b4c9e.webp",
      "t-shirts": "images/products/moncler-logo-crewneck-sweatshirt-single-black-with-fire-cap-c4a5c2.webp",
      jackets: "images/products/unisex-e54346.webp",
      pants: "images/products/unisex-e54346.webp",
      bags: "images/products/moncler-nfc-93f7de.webp",
      headwear: "images/products/moncler-logo-crewneck-sweatshirt-single-black-with-fire-cap-c4a5c2.webp",
      accessories: "images/products/nike-air-jordan-3-white-university-red-sneakers-92ad36.webp",
      jersey: "images/products/unisex-e54346.webp",
      electronics: "images/products/moncler-nfc-93f7de.webp",
      other: "images/products/moncler-single-white-logo-crewneck-sweatshirt-1b4c9e.webp"
    };
    return images[category] || "";
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

  function productCard(p) {
    const browseUrl = safeUrl(p.url || maisonlooksCategoryUrl(p.category, p.badge));
    const hasProductUrl = Boolean(p.url);
    const badgeToken = safeClassToken(p.badge, "");
    const badge = p.badge
      ? `<span class="product-badge product-badge--${badgeToken}">${p.badge === "hot" ? "🔥 HOT" : "🔥 TRENDING"}</span>`
      : "";
    const icons = { shoes: "SH", hoodies: "HD", "t-shirts": "TS", jackets: "JK", pants: "PT", bags: "BG", headwear: "HW", accessories: "AC", jersey: "JR", electronics: "EL", other: "OT" };
    const icon = icons[p.category] || "LB";
    const browseKey = hasProductUrl ? "product.viewProduct" : p.badge === "hot" ? "product.browseHot" : p.badge === "trending" ? "product.browseTrending" : "product.browseCategory";
    const browseLabel = t(browseKey) || (hasProductUrl ? "View Product" : p.badge === "hot" ? "Browse Hot Picks" : p.badge === "trending" ? "Browse Trending" : "Browse Category");
    const category = categoryLabel(p.category);
    const productMeta = [p.brand, category].filter(Boolean).join(" / ");
    const productDesc = p.desc || t("product.defaultDesc") || "Selected LitBuy route for shoppers who want a fast product preview before opening LitBuy.";
    const primaryUrl = safeUrl(hasProductUrl ? browseUrl : buyUrl(p));
    const primaryKey = hasProductUrl ? "product.openProduct" : "product.buyOnLitBuy";
    const primaryLabel = t(primaryKey) || (hasProductUrl ? "Open Product" : "Buy On LitBuy");
    const price = p.price ? `<span class="product-price">$${escapeHtml(p.price)}</span>` : "";
    const styleCount = p.styles ? `<span class="product-chip">${escapeHtml(p.styles)} styles</span>` : "";

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
    const template = t("finds.count") || "{count} products found";
    return template.replace("{count}", count);
  }

  function preferredLanguage() {
    let saved = "";
    try {
      saved = localStorage.getItem(LANG_STORAGE_KEY);
    } catch (e) {
      saved = "";
    }
    if (saved && I18N[saved]) return saved;
    const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
    return I18N[browserLang] ? browserLang : "en";
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
      if (href.includes("categories.html")) link.dataset.i18n = "nav.categories";
      if (href.includes("help.html")) link.dataset.i18n = "nav.help";
      if (href.includes("#faq")) link.dataset.i18n = "nav.faq";
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
    const messages = I18N[lang] || I18N.en;
    currentLanguage = I18N[lang] ? lang : "en";
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = messages[el.dataset.i18n] || I18N.en[el.dataset.i18n];
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const value = messages[el.dataset.i18nHtml] || I18N.en[el.dataset.i18nHtml];
      if (value) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = messages[el.dataset.i18nPlaceholder] || I18N.en[el.dataset.i18nPlaceholder];
      if (value) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const value = messages[el.dataset.i18nContent] || I18N.en[el.dataset.i18nContent];
      if (value) el.setAttribute("content", value);
    });

    document.querySelectorAll("[data-i18n-count]").forEach((el) => {
      el.textContent = productCountText(Number(el.dataset.count || 0));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const value = messages[el.dataset.i18nAria] || I18N.en[el.dataset.i18nAria];
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

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
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
