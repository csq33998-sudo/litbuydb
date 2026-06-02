(function () {
  "use strict";

  const STORAGE_KEY = "litbuy-language";
  const LANGUAGES = [
    ["en", "English"],
    ["de", "Deutsch"],
    ["fr", "Fran\u00e7ais"],
    ["es", "Espa\u00f1ol"],
    ["it", "Italiano"],
    ["nl", "Nederlands"],
    ["pt", "Portugu\u00eas"]
  ];

  const TEXT = {
    en: {
      "nav.home": "Home",
      "nav.finds": "Finds",
      "nav.resources": "Resources",
      "nav.categories": "Categories",
      "nav.faq": "FAQ",
      "nav.language": "Language",
      "home.heroLabel": "Independent LitBuy Guide",
      "home.heroTitle": "Discover Curated LitBuy Picks",
      "home.heroDesc": "A simple, fast, and efficient LitBuy spreadsheet resource - for finds, shopping lists, search, and category sorting, so you can browse faster and place orders through LitBuy with one click.",
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
      "home.openResource": "Open resource ->",
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
      "footer.about": "About",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms"
    },
    de: {
      "nav.home": "Startseite", "nav.finds": "Funde", "nav.resources": "Ressourcen", "nav.categories": "Kategorien", "nav.faq": "FAQ", "nav.language": "Sprache",
      "home.heroLabel": "Unabh\u00e4ngiger LitBuy Guide", "home.heroTitle": "Entdecke kuratierte LitBuy Picks", "home.heroDesc": "Eine einfache, schnelle LitBuy Spreadsheet-Ressource f\u00fcr Funde, Einkaufslisten, Suche und Kategorien, damit du schneller st\u00f6bern und mit einem Klick \u00fcber LitBuy bestellen kannst.",
      "home.products": "Produkte", "home.updated": "Aktualisiert", "home.shoppers": "Shopper", "home.badgeSellers": "Nur gepr\u00fcfte Verk\u00e4ufer", "home.badgeQc": "QC-Fotos gepr\u00fcft", "home.badgeUpdates": "T\u00e4gliche Updates", "home.badgeFree": "Kostenlos st\u00f6bern", "home.search": "Suchen", "home.searchPlaceholder": "LitBuy-Funde suchen...",
      "home.categoriesLabel": "Kategorien", "home.categoriesTitle": "LitBuy Finds nach Kategorien durchsuchen", "home.guideLabel": "LitBuy Guide", "home.guideTitle": "Was ist LitBuy Spreadsheet und wie nutzen Shopper es?", "home.guideBody1": "LitBuy ist ein China-Shopping-Agent f\u00fcr internationale K\u00e4ufer, die Produkte von Taobao, Weidian und 1688 entdecken m\u00f6chten.", "home.guideBody2": "Diese LitBuy Spreadsheet-Ressource hilft Nutzern, beliebte Produktkategorien schneller zu finden, darunter Schuhe, Hoodies, T-Shirts, Jacken, Taschen und Accessoires.", "home.guideSub1": "Warum Shopper nach einem LitBuy Spreadsheet suchen", "home.guideSub1Body": "Viele Nutzer suchen nach LitBuy Finds, wenn sie kuratierte Produktideen, QC-freundliche Verk\u00e4ufer, Budgetoptionen oder schnelle Links f\u00fcr einen Haul w\u00fcnschen.", "home.guideSub2": "So startest du", "home.guideSub2Body": "Nutze die Suche oben f\u00fcr ein Produkt-Keyword oder \u00f6ffne \u00fcber die Kategorien eine fokussierte Produktroute.",
      "home.resourcesLabel": "Ressourcen", "home.resourcesTitle": "LitBuy Ressourcen entdecken", "home.openResource": "Ressource \u00f6ffnen ->", "home.productRoutesLabel": "Produktrouten", "home.productRoutesTitle": "Beliebte LitBuy Finds", "home.brandRoutesLabel": "Markenrouten", "home.brandRoutesTitle": "Beliebte LitBuy Marken", "home.communityLabel": "Community", "home.communityTitle": "Community Picks", "home.communityCard1Title": "Diese Woche beliebt", "home.communityCard1Body": "Schnelle Kategorien f\u00fcr Shopper, die diese Woche LitBuy Spreadsheet-Suchen \u00f6ffnen.", "home.communityCard2Title": "Trend-Funde", "home.communityCard2Body": "Streetwear-, Schuh-, Hoodie- und Accessoire-Routen f\u00fcr schnelles LitBuy-Browsing.", "home.communityCard3Title": "Beste Budget-Funde", "home.communityCard3Body": "Budgetfreundliche Wege f\u00fcr Nutzer, die Plattform-Funde vergleichen.", "home.communityCard4Title": "Editor's Picks", "home.communityCard4Body": "Kompakte Routen f\u00fcr LitBuy-Nutzer, die Marken, Produkte und Suchabk\u00fcrzungen wollen.", "home.searchOnLitBuy": "Auf LitBuy suchen", "home.faqTitle": "LitBuy FAQ", "home.faqQ1": "Was ist LitBuy?", "home.faqQ2": "Ist das ein Onlineshop?", "home.faqQ3": "Wie nutze ich diese Ressource?", "home.faqQ4": "Was sind die besten LitBuy Finds?", "home.faqQ5": "Warum \u00fcber LitBuy kaufen?", "home.footerDesc": "Google-SEO-Ressource, Shopping-Guide und LitBuy-Redirect-Hub.", "footer.about": "\u00dcber uns", "footer.privacy": "Datenschutz", "footer.terms": "Bedingungen"
    },
    fr: {
      "nav.home": "Accueil", "nav.finds": "Trouvailles", "nav.resources": "Ressources", "nav.categories": "Cat\u00e9gories", "nav.faq": "FAQ", "nav.language": "Langue",
      "home.heroLabel": "Guide LitBuy ind\u00e9pendant", "home.heroTitle": "D\u00e9couvrez des s\u00e9lections LitBuy", "home.heroDesc": "Une ressource LitBuy Spreadsheet simple et rapide pour les trouvailles, listes d'achat, recherches et cat\u00e9gories, afin de parcourir plus vite et commander via LitBuy en un clic.",
      "home.products": "Produits", "home.updated": "Mis \u00e0 jour", "home.shoppers": "Acheteurs", "home.badgeSellers": "Vendeurs v\u00e9rifi\u00e9s", "home.badgeQc": "Photos QC v\u00e9rifi\u00e9es", "home.badgeUpdates": "Mises \u00e0 jour quotidiennes", "home.badgeFree": "Navigation gratuite", "home.search": "Rechercher", "home.searchPlaceholder": "Rechercher des trouvailles LitBuy...",
      "home.categoriesLabel": "Cat\u00e9gories", "home.categoriesTitle": "Parcourir les cat\u00e9gories LitBuy Finds", "home.guideLabel": "Guide LitBuy", "home.guideTitle": "Qu'est-ce que LitBuy Spreadsheet et comment l'utiliser ?", "home.guideBody1": "LitBuy est un agent d'achat en Chine utilis\u00e9 par les acheteurs internationaux pour parcourir Taobao, Weidian et 1688.", "home.guideBody2": "Cette ressource LitBuy Spreadsheet aide \u00e0 trouver plus vite les cat\u00e9gories populaires comme chaussures, hoodies, T-shirts, vestes, sacs et accessoires.", "home.guideSub1": "Pourquoi chercher un LitBuy Spreadsheet", "home.guideSub1Body": "Les utilisateurs cherchent des LitBuy finds pour des id\u00e9es s\u00e9lectionn\u00e9es, des vendeurs compatibles QC, des options budget ou des liens rapides pour composer un haul.", "home.guideSub2": "Comment commencer", "home.guideSub2Body": "Utilisez la recherche ci-dessus ou ouvrez une route produit cibl\u00e9e depuis les cartes de cat\u00e9gories.",
      "home.resourcesLabel": "Ressources", "home.resourcesTitle": "Explorer les ressources LitBuy", "home.openResource": "Ouvrir la ressource ->", "home.productRoutesLabel": "Routes produit", "home.productRoutesTitle": "LitBuy Finds populaires", "home.brandRoutesLabel": "Routes marque", "home.brandRoutesTitle": "Marques LitBuy populaires", "home.communityLabel": "Communaut\u00e9", "home.communityTitle": "S\u00e9lections communaut\u00e9", "home.communityCard1Title": "Les plus populaires cette semaine", "home.communityCard1Body": "Routes rapides pour les recherches de style LitBuy Spreadsheet cette semaine.", "home.communityCard2Title": "Trouvailles tendance", "home.communityCard2Body": "Routes streetwear, chaussures, hoodies et accessoires pour parcourir LitBuy rapidement.", "home.communityCard3Title": "Meilleures trouvailles budget", "home.communityCard3Body": "Parcours \u00e9conomiques pour comparer les trouvailles avant d'ouvrir les pages produit.", "home.communityCard4Title": "Choix de la r\u00e9daction", "home.communityCard4Body": "Routes compactes pour marques, produits et raccourcis de recherche.", "home.searchOnLitBuy": "Rechercher sur LitBuy", "home.faqTitle": "FAQ LitBuy", "home.faqQ1": "Qu'est-ce que LitBuy ?", "home.faqQ2": "Est-ce une boutique en ligne ?", "home.faqQ3": "Comment utiliser cette ressource ?", "home.faqQ4": "Quelles sont les meilleures trouvailles LitBuy ?", "home.faqQ5": "Pourquoi acheter via LitBuy ?", "home.footerDesc": "Ressource SEO Google, guide d'achat et hub de redirection LitBuy.", "footer.about": "\u00c0 propos", "footer.privacy": "Confidentialit\u00e9", "footer.terms": "Conditions"
    },
    es: {
      "nav.home": "Inicio", "nav.finds": "Hallazgos", "nav.resources": "Recursos", "nav.categories": "Categor\u00edas", "nav.faq": "FAQ", "nav.language": "Idioma",
      "home.heroLabel": "Gu\u00eda LitBuy independiente", "home.heroTitle": "Descubre selecciones LitBuy", "home.heroDesc": "Un recurso LitBuy Spreadsheet simple y r\u00e1pido para hallazgos, listas de compra, b\u00fasqueda y categor\u00edas, para navegar m\u00e1s r\u00e1pido y pedir por LitBuy con un clic.",
      "home.products": "Productos", "home.updated": "Actualizado", "home.shoppers": "Compradores", "home.badgeSellers": "Vendedores verificados", "home.badgeQc": "Fotos QC revisadas", "home.badgeUpdates": "Actualizaciones diarias", "home.badgeFree": "Gratis para navegar", "home.search": "Buscar", "home.searchPlaceholder": "Buscar hallazgos LitBuy...",
      "home.categoriesLabel": "Categor\u00edas", "home.categoriesTitle": "Explorar categor\u00edas de LitBuy Finds", "home.guideLabel": "Gu\u00eda LitBuy", "home.guideTitle": "\u00bfQu\u00e9 es LitBuy Spreadsheet y c\u00f3mo se usa?", "home.guideBody1": "LitBuy es un agente de compras en China para compradores internacionales que buscan productos en Taobao, Weidian y 1688.", "home.guideBody2": "Este recurso LitBuy Spreadsheet ayuda a encontrar m\u00e1s r\u00e1pido categor\u00edas populares como zapatillas, hoodies, camisetas, chaquetas, bolsos y accesorios.", "home.guideSub1": "Por qu\u00e9 se busca un LitBuy Spreadsheet", "home.guideSub1Body": "Muchos usuarios buscan LitBuy finds para ideas curadas, vendedores aptos para QC, opciones econ\u00f3micas o enlaces r\u00e1pidos para crear un haul.", "home.guideSub2": "C\u00f3mo empezar", "home.guideSub2Body": "Usa la b\u00fasqueda superior o abre una ruta de producto desde las tarjetas de categor\u00eda.",
      "home.resourcesLabel": "Recursos", "home.resourcesTitle": "Explorar recursos LitBuy", "home.openResource": "Abrir recurso ->", "home.productRoutesLabel": "Rutas de producto", "home.productRoutesTitle": "LitBuy Finds populares", "home.brandRoutesLabel": "Rutas de marca", "home.brandRoutesTitle": "Marcas LitBuy populares", "home.communityLabel": "Comunidad", "home.communityTitle": "Selecciones de la comunidad", "home.communityCard1Title": "M\u00e1s popular esta semana", "home.communityCard1Body": "Rutas r\u00e1pidas para b\u00fasquedas tipo LitBuy Spreadsheet esta semana.", "home.communityCard2Title": "Hallazgos en tendencia", "home.communityCard2Body": "Rutas de streetwear, zapatillas, hoodies y accesorios para navegar r\u00e1pido.", "home.communityCard3Title": "Mejores hallazgos econ\u00f3micos", "home.communityCard3Body": "Rutas econ\u00f3micas para comparar hallazgos antes de abrir p\u00e1ginas de producto.", "home.communityCard4Title": "Selecci\u00f3n editorial", "home.communityCard4Body": "Rutas compactas para marcas, productos y accesos de b\u00fasqueda.", "home.searchOnLitBuy": "Buscar en LitBuy", "home.faqTitle": "FAQ de LitBuy", "home.faqQ1": "\u00bfQu\u00e9 es LitBuy?", "home.faqQ2": "\u00bfEs una tienda online?", "home.faqQ3": "\u00bfC\u00f3mo uso este recurso?", "home.faqQ4": "\u00bfCu\u00e1les son los mejores LitBuy Finds?", "home.faqQ5": "\u00bfPor qu\u00e9 comprar con LitBuy?", "home.footerDesc": "Recurso SEO de Google, gu\u00eda de compras y hub de redirecci\u00f3n LitBuy.", "footer.about": "Acerca de", "footer.privacy": "Privacidad", "footer.terms": "T\u00e9rminos"
    },
    it: {
      "nav.home": "Home", "nav.finds": "Trova", "nav.resources": "Risorse", "nav.categories": "Categorie", "nav.faq": "FAQ", "nav.language": "Lingua",
      "home.heroLabel": "Guida LitBuy indipendente", "home.heroTitle": "Scopri selezioni LitBuy curate", "home.heroDesc": "Una risorsa LitBuy Spreadsheet semplice e veloce per finds, liste shopping, ricerca e categorie, cos\u00ec puoi navigare pi\u00f9 rapidamente e ordinare tramite LitBuy con un clic.",
      "home.products": "Prodotti", "home.updated": "Aggiornato", "home.shoppers": "Acquirenti", "home.badgeSellers": "Solo venditori verificati", "home.badgeQc": "Foto QC controllate", "home.badgeUpdates": "Aggiornamenti quotidiani", "home.badgeFree": "Navigazione gratuita", "home.search": "Cerca", "home.searchPlaceholder": "Cerca finds LitBuy...",
      "home.categoriesLabel": "Categorie", "home.categoriesTitle": "Sfoglia categorie LitBuy Finds", "home.guideLabel": "Guida LitBuy", "home.guideTitle": "Cos'\u00e8 LitBuy Spreadsheet e come si usa?", "home.guideBody1": "LitBuy \u00e8 un agente shopping in Cina usato da acquirenti internazionali per prodotti da Taobao, Weidian e 1688.", "home.guideBody2": "Questa risorsa LitBuy Spreadsheet aiuta a trovare pi\u00f9 rapidamente categorie popolari come scarpe, hoodie, T-shirt, giacche, borse e accessori.", "home.guideSub1": "Perch\u00e9 si cerca un LitBuy Spreadsheet", "home.guideSub1Body": "Gli utenti cercano LitBuy finds per idee curate, venditori adatti al QC, opzioni economiche o link rapidi per creare un haul.", "home.guideSub2": "Come iniziare", "home.guideSub2Body": "Usa la ricerca in alto o apri una rotta prodotto dalle categorie.",
      "home.resourcesLabel": "Risorse", "home.resourcesTitle": "Esplora risorse LitBuy", "home.openResource": "Apri risorsa ->", "home.productRoutesLabel": "Rotte prodotto", "home.productRoutesTitle": "LitBuy Finds popolari", "home.brandRoutesLabel": "Rotte brand", "home.brandRoutesTitle": "Brand LitBuy popolari", "home.communityLabel": "Community", "home.communityTitle": "Scelte community", "home.communityCard1Title": "Pi\u00f9 popolari questa settimana", "home.communityCard1Body": "Rotte rapide per ricerche stile LitBuy Spreadsheet questa settimana.", "home.communityCard2Title": "Finds di tendenza", "home.communityCard2Body": "Rotte streetwear, scarpe, hoodie e accessori per navigare velocemente.", "home.communityCard3Title": "Migliori finds economici", "home.communityCard3Body": "Percorsi budget per confrontare finds prima di aprire le pagine prodotto.", "home.communityCard4Title": "Scelte editoriali", "home.communityCard4Body": "Rotte compatte per brand, prodotti e scorciatoie di ricerca.", "home.searchOnLitBuy": "Cerca su LitBuy", "home.faqTitle": "FAQ LitBuy", "home.faqQ1": "Cos'\u00e8 LitBuy?", "home.faqQ2": "\u00c8 un ecommerce?", "home.faqQ3": "Come uso questa risorsa?", "home.faqQ4": "Quali sono i migliori LitBuy Finds?", "home.faqQ5": "Perch\u00e9 comprare tramite LitBuy?", "home.footerDesc": "Risorsa SEO Google, guida shopping e hub redirect LitBuy.", "footer.about": "Chi siamo", "footer.privacy": "Privacy", "footer.terms": "Termini"
    },
    nl: {
      "nav.home": "Home", "nav.finds": "Vondsten", "nav.resources": "Resources", "nav.categories": "Categorie\u00ebn", "nav.faq": "FAQ", "nav.language": "Taal",
      "home.heroLabel": "Onafhankelijke LitBuy gids", "home.heroTitle": "Ontdek geselecteerde LitBuy picks", "home.heroDesc": "Een eenvoudige, snelle LitBuy Spreadsheet-resource voor vondsten, shoppinglijsten, zoeken en categorie\u00ebn, zodat je sneller browset en met \u00e9\u00e9n klik via LitBuy bestelt.",
      "home.products": "Producten", "home.updated": "Bijgewerkt", "home.shoppers": "Shoppers", "home.badgeSellers": "Alleen geverifieerde verkopers", "home.badgeQc": "QC-foto's gecontroleerd", "home.badgeUpdates": "Dagelijkse updates", "home.badgeFree": "Gratis browsen", "home.search": "Zoeken", "home.searchPlaceholder": "Zoek LitBuy-vondsten...",
      "home.categoriesLabel": "Categorie\u00ebn", "home.categoriesTitle": "Browse LitBuy Finds-categorie\u00ebn", "home.guideLabel": "LitBuy gids", "home.guideTitle": "Wat is LitBuy Spreadsheet en hoe gebruik je het?", "home.guideBody1": "LitBuy is een China shopping agent voor internationale kopers die producten van Taobao, Weidian en 1688 bekijken.", "home.guideBody2": "Deze LitBuy Spreadsheet-resource helpt populaire categorie\u00ebn sneller te vinden, zoals schoenen, hoodies, T-shirts, jassen, tassen en accessoires.", "home.guideSub1": "Waarom shoppers een LitBuy Spreadsheet zoeken", "home.guideSub1Body": "Gebruikers zoeken LitBuy finds voor gecureerde idee\u00ebn, QC-vriendelijke verkopers, budgetopties of snelle links voor een haul.", "home.guideSub2": "Beginnen met browsen", "home.guideSub2Body": "Gebruik de zoekbalk bovenaan of open een gerichte productroute via de categoriekaarten.",
      "home.resourcesLabel": "Resources", "home.resourcesTitle": "Ontdek LitBuy resources", "home.openResource": "Resource openen ->", "home.productRoutesLabel": "Productroutes", "home.productRoutesTitle": "Populaire LitBuy Finds", "home.brandRoutesLabel": "Merkroutes", "home.brandRoutesTitle": "Populaire LitBuy merken", "home.communityLabel": "Community", "home.communityTitle": "Community picks", "home.communityCard1Title": "Populairst deze week", "home.communityCard1Body": "Snelle categorieroutes voor LitBuy Spreadsheet-achtige zoekopdrachten deze week.", "home.communityCard2Title": "Trending vondsten", "home.communityCard2Body": "Streetwear-, schoenen-, hoodie- en accessoireroutes voor snel browsen.", "home.communityCard3Title": "Beste budgetvondsten", "home.communityCard3Body": "Budgetvriendelijke routes om platformvondsten te vergelijken.", "home.communityCard4Title": "Editor's picks", "home.communityCard4Body": "Compacte routes voor merken, producten en zoekshortcuts.", "home.searchOnLitBuy": "Zoeken op LitBuy", "home.faqTitle": "LitBuy FAQ", "home.faqQ1": "Wat is LitBuy?", "home.faqQ2": "Is dit een webshop?", "home.faqQ3": "Hoe gebruik ik deze resource?", "home.faqQ4": "Wat zijn de beste LitBuy Finds?", "home.faqQ5": "Waarom kopen via LitBuy?", "home.footerDesc": "Google SEO-resource, shoppinggids en LitBuy redirect-hub.", "footer.about": "Over", "footer.privacy": "Privacybeleid", "footer.terms": "Voorwaarden"
    },
    pt: {
      "nav.home": "In\u00edcio", "nav.finds": "Achados", "nav.resources": "Recursos", "nav.categories": "Categorias", "nav.faq": "FAQ", "nav.language": "Idioma",
      "home.heroLabel": "Guia LitBuy independente", "home.heroTitle": "Descubra sele\u00e7\u00f5es LitBuy", "home.heroDesc": "Um recurso LitBuy Spreadsheet simples e r\u00e1pido para achados, listas, busca e categorias, para navegar mais r\u00e1pido e comprar pela LitBuy com um clique.",
      "home.products": "Produtos", "home.updated": "Atualizado", "home.shoppers": "Compradores", "home.badgeSellers": "Vendedores verificados", "home.badgeQc": "Fotos QC revisadas", "home.badgeUpdates": "Atualiza\u00e7\u00f5es di\u00e1rias", "home.badgeFree": "Gr\u00e1tis para navegar", "home.search": "Buscar", "home.searchPlaceholder": "Buscar achados LitBuy...",
      "home.categoriesLabel": "Categorias", "home.categoriesTitle": "Explorar categorias LitBuy Finds", "home.guideLabel": "Guia LitBuy", "home.guideTitle": "O que \u00e9 LitBuy Spreadsheet e como usar?", "home.guideBody1": "LitBuy \u00e9 um agente de compras na China usado por compradores internacionais para navegar por Taobao, Weidian e 1688.", "home.guideBody2": "Este recurso LitBuy Spreadsheet ajuda a encontrar mais r\u00e1pido categorias populares como t\u00eanis, hoodies, camisetas, jaquetas, bolsas e acess\u00f3rios.", "home.guideSub1": "Por que procurar um LitBuy Spreadsheet", "home.guideSub1Body": "Muitos usu\u00e1rios procuram LitBuy finds para ideias selecionadas, vendedores bons para QC, op\u00e7\u00f5es econ\u00f4micas ou links r\u00e1pidos para montar um haul.", "home.guideSub2": "Como come\u00e7ar", "home.guideSub2Body": "Use a busca acima ou abra uma rota de produto nas categorias.",
      "home.resourcesLabel": "Recursos", "home.resourcesTitle": "Explorar recursos LitBuy", "home.openResource": "Abrir recurso ->", "home.productRoutesLabel": "Rotas de produto", "home.productRoutesTitle": "LitBuy Finds populares", "home.brandRoutesLabel": "Rotas de marca", "home.brandRoutesTitle": "Marcas LitBuy populares", "home.communityLabel": "Comunidade", "home.communityTitle": "Escolhas da comunidade", "home.communityCard1Title": "Mais popular esta semana", "home.communityCard1Body": "Rotas r\u00e1pidas para pesquisas estilo LitBuy Spreadsheet nesta semana.", "home.communityCard2Title": "Achados em alta", "home.communityCard2Body": "Rotas de streetwear, t\u00eanis, hoodies e acess\u00f3rios para navega\u00e7\u00e3o r\u00e1pida.", "home.communityCard3Title": "Melhores achados econ\u00f4micos", "home.communityCard3Body": "Caminhos econ\u00f4micos para comparar achados antes de abrir p\u00e1ginas de produto.", "home.communityCard4Title": "Escolhas editoriais", "home.communityCard4Body": "Rotas compactas para marcas, produtos e atalhos de busca.", "home.searchOnLitBuy": "Buscar na LitBuy", "home.faqTitle": "FAQ LitBuy", "home.faqQ1": "O que \u00e9 LitBuy?", "home.faqQ2": "Isto \u00e9 uma loja online?", "home.faqQ3": "Como uso este recurso?", "home.faqQ4": "Quais s\u00e3o os melhores LitBuy Finds?", "home.faqQ5": "Por que comprar pela LitBuy?", "home.footerDesc": "Recurso SEO Google, guia de compras e hub de redirecionamento LitBuy.", "footer.about": "Sobre", "footer.privacy": "Privacidade", "footer.terms": "Termos"
    }
  };

  function getSavedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      return;
    }
  }

  function getInitialLanguage() {
    const saved = getSavedLanguage();
    if (TEXT[saved]) return saved;
    const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
    return TEXT[browserLang] ? browserLang : "en";
  }

  function applyLanguage(lang) {
    const messages = TEXT[lang] || TEXT.en;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = messages[el.dataset.i18n] || TEXT.en[el.dataset.i18n];
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = messages[el.dataset.i18nPlaceholder] || TEXT.en[el.dataset.i18nPlaceholder];
      if (value) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const value = messages[el.dataset.i18nAria] || TEXT.en[el.dataset.i18nAria];
      if (value) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll(".lang-select").forEach((select) => {
      select.value = lang;
    });
  }

  function setLanguage(lang) {
    if (!TEXT[lang]) return;
    saveLanguage(lang);
    applyLanguage(lang);
  }

  function ensureLanguageSelect(nav) {
    let select = nav.querySelector(".lang-select");
    if (!select) {
      select = document.createElement("select");
      select.className = "lang-select";
      select.setAttribute("aria-label", "Language");
      nav.append(select);
    }

    select.innerHTML = LANGUAGES.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
    select.onchange = () => setLanguage(select.value);
  }

  function markNavLinks(nav) {
    nav.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.includes("index.html") && !href.includes("#faq")) link.dataset.i18n = "nav.home";
      if (href.includes("finds.html")) link.dataset.i18n = "nav.finds";
      if (href.includes("review.html")) link.dataset.i18n = "nav.resources";
      if (href.includes("categories.html")) link.dataset.i18n = "nav.categories";
      if (href.includes("#faq")) link.dataset.i18n = "nav.faq";
    });
  }

  function initI18n() {
    document.querySelectorAll(".site-nav").forEach((nav) => {
      markNavLinks(nav);
      ensureLanguageSelect(nav);
    });
    applyLanguage(getInitialLanguage());
  }

  window.LitBuyI18n = { applyLanguage, setLanguage };
  document.addEventListener("change", (event) => {
    if (event.target && event.target.classList && event.target.classList.contains("lang-select")) {
      setLanguage(event.target.value);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initI18n);
  } else {
    initI18n();
  }
})();
