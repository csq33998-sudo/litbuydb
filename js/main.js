(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const AFFILIATE = cfg.affiliate || "https://litbuy.com";
  const SEARCH_REDIRECT_URL = "https://streetstyle.maisonlooks.com/en/search?q=";
  const BRAND_PRODUCTS_URL = "https://streetstyle.maisonlooks.com/en/products?brands=";
  const LANG_STORAGE_KEY = "litbuy-language";
  const LANG_OPTIONS = [
    ["en", "English"],
    ["de", "Deutsch"],
    ["fr", "Français"],
    ["es", "Español"],
    ["it", "Italiano"],
    ["nl", "Nederlands"],
    ["pt", "Português"]
  ];
  const I18N = {
    en: {
      "nav.home": "Home",
      "nav.finds": "Finds",
      "nav.resources": "Resources",
      "nav.categories": "Categories",
      "nav.faq": "FAQ",
      "nav.language": "Language",
      "home.heroLabel": "Independent LitBuy Guide",
      "home.heroTitle": "Discover Curated LitBuy Picks",
      "home.heroDesc": "A simple, fast, and efficient LitBuy spreadsheet resource — for finds, shopping lists, search, and category sorting, so you can browse faster and place orders through LitBuy with one click.",
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
    }
  };

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

  function escapeAttr(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function productImageHtml(product, fallbackIcon) {
    if (product.image) {
      return `<img src="${product.image}" alt="${escapeAttr(product.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="product-image-fallback" hidden>${fallbackIcon}</span>`;
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
    const browseUrl = p.url || maisonlooksCategoryUrl(p.category, p.badge);
    const hasProductUrl = Boolean(p.url);
    const badge = p.badge
      ? `<span class="product-badge product-badge--${p.badge}">${p.badge === "hot" ? "🔥 HOT" : "🔥 TRENDING"}</span>`
      : "";
    const icons = { shoes: "SH", hoodies: "HD", "t-shirts": "TS", jackets: "JK", pants: "PT", bags: "BG", headwear: "HW", accessories: "AC", jersey: "JR", electronics: "EL", other: "OT" };
    const icon = icons[p.category] || "LB";
    const browseLabel = hasProductUrl ? "View Product" : p.badge === "hot" ? "Browse Hot Picks" : p.badge === "trending" ? "Browse Trending" : "Browse Category";
    const category = categoryLabel(p.category);
    const productMeta = [p.brand, category].filter(Boolean).join(" / ");
    const productDesc = p.desc || "Selected LitBuy route for shoppers who want a fast product preview before opening LitBuy.";
    const primaryUrl = hasProductUrl ? browseUrl : buyUrl(p);
    const primaryLabel = hasProductUrl ? "Open Product" : "Buy On LitBuy";
    const price = p.price ? `<span class="product-price">$${p.price}</span>` : "";
    const styleCount = p.styles ? `<span class="product-chip">${p.styles} styles</span>` : "";

    return `
      <article class="product-card">
        <a href="${browseUrl}" class="product-image product-image-link maisonlooks-link"${externalTargetAttrs(browseUrl)} aria-label="${browseLabel}: ${p.name}">
          ${badge}
          ${price}
          ${productImageHtml(p, icon)}
        </a>
        <div class="product-body">
          <div class="product-kicker">
            <span class="product-category">${category}</span>
            ${styleCount}
          </div>
          <h3>${p.name}</h3>
          <div class="product-meta">${productMeta}</div>
          <p class="product-desc">${productDesc}</p>
          <div class="product-actions">
            <a href="${browseUrl}" class="btn btn-secondary product-browse-btn maisonlooks-link"${externalTargetAttrs(browseUrl)}>${browseLabel}</a>
            <a href="${primaryUrl}" class="btn btn-primary maisonlooks-link"${externalTargetAttrs(primaryUrl)}>${primaryLabel}</a>
          </div>
        </div>
      </article>`;
  }

  function renderProducts(container, products) {
    if (!container) return;
    container.innerHTML = products.length
      ? products.map(productCard).join("")
      : '<p style="color:var(--text-muted);grid-column:1/-1">No products found.</p>';
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
      if (href.includes("#faq")) link.dataset.i18n = "nav.faq";
    });
  }

  function ensureLanguageSelect(nav) {
    let select = nav.querySelector(".lang-select");
    if (!select) {
      select = document.createElement("select");
      select.className = "lang-select";
      select.dataset.i18nAria = "nav.language";
      nav.append(select);
    }

    select.innerHTML = LANG_OPTIONS.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
    return select;
  }

  function refreshOpenFaqHeights() {
    document.querySelectorAll(".faq-item.open .faq-answer").forEach((answer) => {
      answer.style.maxHeight = answer.scrollHeight + "px";
    });
  }

  function applyLanguage(lang) {
    const messages = I18N[lang] || I18N.en;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = messages[el.dataset.i18n] || I18N.en[el.dataset.i18n];
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = messages[el.dataset.i18nPlaceholder] || I18N.en[el.dataset.i18nPlaceholder];
      if (value) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const value = messages[el.dataset.i18nAria] || I18N.en[el.dataset.i18nAria];
      if (value) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll(".lang-select").forEach((select) => {
      select.value = lang;
    });

    refreshOpenFaqHeights();
  }

  function initI18n() {
    document.querySelectorAll(".site-nav").forEach((nav) => {
      markCommonNavKeys(nav);
      const select = ensureLanguageSelect(nav);
      select.addEventListener("change", () => {
        saveLanguage(select.value);
        applyLanguage(select.value);
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
