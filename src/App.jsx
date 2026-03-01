import React, { useState, useEffect, useMemo, Suspense, lazy } from "react";
import Nav from "./Nav";
import data from "./data";
import { Helmet } from "react-helmet";
const Order = lazy(() => import("./Order"));
const CardMenu = lazy(() => import("./CardMenu"));
const fb = "/FB.png";
const tripadvisor = "/tripadvisor.webp";
const googleIcon = "/google.webp";
const logo = "/logo.webp";
const instagramIcon = "/instagram.png";
const whatsappIcon = "/wha2026.webp";
const hero = "/burger-signature-torrevieja.webp";
const T = {
  es: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Burgers Gourmet de Autor: Recetas Unicas, Smash Burgers y Carne Premium al Mejor Precio",
    btnOrder: "PEDIR A DOMICILIO",
    btnCall: "LLAMAR",
    catBurgers: "Burgers Signature",
    catDrinks: "Bebidas",
    catDesserts: "Postres Caseros",
    btnSeeMenu: "VER CARTA",
    yourOrder: "Tu Pedido",
    reviewsTitle: "Lo que dicen nuestros clientes",
    footerDesc: "La mejor experiencia de Burger Gourmet en Torrevieja. Recetas Signature, Smash Burgers y opciones Halal con calidad premium.",
    location: "Ubicación",
    hours: "Horario",
    seoTitle: "La Casa de Burger | Mejor Hamburguesería Gourmet y Signature en Torrevieja",
    seoContent: "Referente en Burgers Gourmet Signature en Torrevieja Centro. Disfruta de nuestras recetas originales, Smash Burgers y carne artesanal premium. Opciones Halal disponibles. Calidad imbatible cerca de Playa del Cura."
  },
  en: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Signature Gourmet Burgers: Original Recipes, Smash Burgers & Premium Beef at Best Price",
    btnOrder: "ORDER DELIVERY",
    btnCall: "CALL",
    catBurgers: "Signature Burgers",
    catDrinks: "Drinks",
    catDesserts: "Homemade Desserts",
    btnSeeMenu: "SEE MENU",
    yourOrder: "Your Order",
    reviewsTitle: "What our customers say",
    footerDesc: "The ultimate Gourmet Burger experience in Torrevieja. Signature recipes, Smash Burgers and Halal options at the best price.",
    location: "Location",
    hours: "Hours",
    seoTitle: "La Casa de Burger | Best Signature Gourmet & Smash Burgers Torrevieja",
    seoContent: "Discover Torrevieja's best Gourmet Signature Burgers. Unique recipes, premium selected beef, Smash Burgers and Halal options. Unbeatable value for money in the city center."
  },
  fr: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Burgers Gourmet Signature : Recettes Originales, Smash et Viande Premium au Meilleur Prix",
    btnOrder: "COMMANDER",
    btnCall: "APPELER",
    catBurgers: "Burgers Signature",
    catDrinks: "Boissons",
    catDesserts: "Desserts Maison",
    btnSeeMenu: "VOIR LA CARTE",
    yourOrder: "Votre Commande",
    reviewsTitle: "L'avis de nos clients",
    footerDesc: "L'expérience Burger Gourmet ultime à Torrevieja. Recettes Signature, Smash Burgers et options Halal au meilleur prix.",
    location: "Emplacement",
    hours: "Horaires",
    seoTitle: "La Casa de Burger | Meilleur Burger Gourmet Signature à Torrevieja",
    seoContent: "La référence du Burger Gourmet Signature à Torrevieja. Recettes originales, viande premium, Smash Burgers et options Halal. Le meilleur rapport qualité-prix artisanal du centre-ville."
  },
  de: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Signature Gourmet Burgers: Originelle Rezepte, Smash Burgers & Premium-Fleisch",
    btnOrder: "BESTELLEN",
    btnCall: "ANRUFEN",
    catBurgers: "Signature Burgers",
    catDrinks: "Getränke",
    catDesserts: "Nachspeisen",
    btnSeeMenu: "MENÜ SEHEN",
    yourOrder: "Ihre Bestellung",
    reviewsTitle: "Kundenstimmen",
    footerDesc: "Gourmet-Burger-Erlebnis in Torrevieja. Signature-Rezepte, Smash Burgers und Halal-Optionen zum Bestpreis.",
    location: "Standort",
    hours: "Öffnungszeiten",
    seoTitle: "La Casa de Burger | Beste Gourmet Signature Burgers Torrevieja",
    seoContent: "Premium Gourmet Signature Burgers in Torrevieja Centro. Einzigartige Rezepte, Smash Burgers und Halal-Fleisch. Unschlagbares Preis-Leistungs-Verhältnis."
  },
  sv: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Signature Gourmetburgare: Originalrecept, Smash Burgers & Premiumkött",
    btnOrder: "BESTÄLL",
    btnCall: "RING",
    catBurgers: "Signature Burgers",
    catDrinks: "Drycker",
    catDesserts: "Efterrätter",
    btnSeeMenu: "VISA MENY",
    yourOrder: "Din Beställning",
    reviewsTitle: "Recensioner",
    footerDesc: "Bästa Gourmetburgaren i Torrevieja. Signature-recept, Smash Burgers och Halal-alternativ.",
    location: "Plats",
    hours: "Öppettider",
    seoTitle: "La Casa de Burger | Gourmet Signature & Smash Burgers Torrevieja",
    seoContent: "Ledande inom Gourmet Signature Burgers i Torrevieja. Unika recept, utvalt premiumkött, Smash Burgers och Halal. Oslagbart pris nära Playa del Cura."
  },
  nl: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Signature Gourmet Burgers: Originele Recepten, Smash Burgers & Premium Rundvlees",
    btnOrder: "BESTEL NU",
    btnCall: "BELLEN",
    catBurgers: "Signature Burgers",
    catDrinks: "Dranken",
    catDesserts: "Desserts",
    btnSeeMenu: "ZIE MENU",
    yourOrder: "Jouw Bestelling",
    reviewsTitle: "Recensies",
    footerDesc: "De ultieme Gourmet Burger ervaring in Torrevieja. Signature recepten, Smash Burgers en Halal opties.",
    location: "Locatie",
    hours: "Openingstijden",
    seoTitle: "La Casa de Burger | Beste Gourmet Signature & Smash Burgers Torrevieja",
    seoContent: "De referentie voor Gourmet Signature Burgers in Torrevieja. Originele recepten, premium vlees, Smash Burgers en Halal opties tegen de beste prijs."
  },
  no: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Signature Gourmet Burger: Originale Oppskrifter, Smash Burger & Premium Storfekjøtt",
    btnOrder: "BESTILL",
    btnCall: "RING",
    catBurgers: "Signature Burgers",
    catDrinks: "Drikke",
    catDesserts: "Desserter",
    btnSeeMenu: "SE MENY",
    yourOrder: "Din Bestilling",
    reviewsTitle: "Våre kunder",
    footerDesc: "Den beste Gourmet Burger opplevelsen i Torrevieja. Signature oppskrifter, Smash Burgers og Halal.",
    location: "Plassering",
    hours: "Åpningstider",
    seoTitle: "La Casa de Burger | Beste Gourmet Signature & Smash Burger Torrevieja",
    seoContent: "Torreviejas ledende restaurant for Gourmet Signature Burgers. Unike oppskrifter, premium kjøtt, Smash Burgers og Halal til byens beste pris."
  },
  pl: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Burgery Gourmet Signature: Oryginalne Przepisy, Smash Burgers i Wołowina Premium",
    btnOrder: "ZAMÓW",
    btnCall: "ZADZWOŃ",
    catBurgers: "Burgery Signature",
    catDrinks: "Napoje",
    catDesserts: "Desery",
    btnSeeMenu: "ZOBACZ MENU",
    yourOrder: "Twoje Zamówienie",
    reviewsTitle: "Opinie",
    footerDesc: "Najlepsze Burgery Gourmet w Torrevieja. Przepisy Signature, Smash Burgers i opcje Halal.",
    location: "Lokalizacja",
    hours: "Godziny",
    seoTitle: "La Casa de Burger | Najlepsze Burgery Gourmet Signature w Torrevieja",
    seoContent: "Wyjątkowe Burgery Gourmet Signature w centrum Torrevieja. Autorskie przepisy, wołowina premium, Smash Burgers i opcje Halal w najlepszej cenie."
  },
  ru: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Авторские Гурме Бургеры: Signature Рецепты, Смэш-Бургеры и Премиум Говядина",
    btnOrder: "ЗАКАЗАТЬ",
    btnCall: "ПОЗВОНИТЬ",
    catBurgers: "Авторские Бургеры",
    catDrinks: "Напитки",
    catDesserts: "Десерты",
    btnSeeMenu: "МЕНЮ",
    yourOrder: "Ваш Заказ",
    reviewsTitle: "Отзывы",
    footerDesc: "Лучшие Гурме Бургеры в Торревьехе. Signature рецепты, Смэш-бургеры и Халяль.",
    location: "Локация",
    hours: "График",
    seoTitle: "La Casa de Burger | Лучшие Гурме и Signature Бургеры Торревьеха",
    seoContent: "Лучшие Гурме Бургеры в центре Торревьехи. Авторские Signature рецепты, премиальное мясо, Смэш-бургеры и Халяль по лучшей цене."
  },
  uk: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Авторські Гурме Бургери: Signature Рецепти, Смеш-Бургери та Преміум Яловичина",
    btnOrder: "ЗАМОВИТИ",
    btnCall: "ДЗВІНОК",
    catBurgers: "Авторські Бургери",
    catDrinks: "Напої",
    catDesserts: "Десерти",
    btnSeeMenu: "МЕНЮ",
    yourOrder: "Замовлення",
    reviewsTitle: "Відгуки",
    footerDesc: "Найкращі Гурме Бургери в Торрев'єсі. Signature рецепти, Смеш-бургери та Халяль.",
    location: "Локація",
    hours: "Години",
    seoTitle: "La Casa de Burger | Найкращі Гурме та Signature Бургери Торрев'єха",
    seoContent: "Еталон Гурме Бургерів у Торрев'єсі. Авторські Signature рецепти, яловичина преміум-класу, Смеш-бургери та Халяль за найкращою ціною."
  },
  ro: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "Burgeri Gourmet Signature: Rețete Originale, Smash Burgers și Carne Premium",
    btnOrder: "COMANDEAZĂ",
    btnCall: "SUNĂ",
    catBurgers: "Burgeri Signature",
    catDrinks: "Băuturi",
    catDesserts: "Deserturi",
    btnSeeMenu: "VEZI MENIUL",
    yourOrder: "Comanda Ta",
    reviewsTitle: "Recenzii",
    footerDesc: "Cea mai bună experiență Burger Gourmet din Torrevieja. Rețete Signature, Smash Burgers și Halal.",
    location: "Locație",
    hours: "Program",
    seoTitle: "La Casa de Burger | Cel mai bun Burger Gourmet Signature din Torrevieja",
    seoContent: "Punctul de referință pentru Burgeri Gourmet Signature în Torrevieja. Rețete originale, carne premium, Smash Burgers și opțiuni Halal la cel mai bun preț."
  },
  ar: {
    heroTitle: "La Casa de Burger",
    heroSubtitle: "برجر غوارميه سيجنتشر: وصفات أصلية، سماش برجر ولحم حلال فاخر بأفضل سعر",
    btnOrder: "طلب توصيل",
    btnCall: "اتصال",
    catBurgers: "برجر سيجنتشر",
    catDrinks: "مشروبات",
    catDesserts: "حلويات",
    btnSeeMenu: "القائمة",
    yourOrder: "طلبك",
    reviewsTitle: "آراء العملاء",
    footerDesc: "أفضل تجربة برجر غوارميه في توريفايجا. وصفات سيجنتشر، سماش برجر ولحم حلال فاخر.",
    location: "الموقع",
    hours: "ساعات العمل",
    seoTitle: "La Casa de Burger | أفضل برجر غوارميه وسيجنتشر في توريفايجا",
    seoContent: "مطعم البرجر الغوارميه الأول في وسط توريفايجا. وصفات سيجنتشر أصلية، سماش برجر، ولحم حلال ممتاز بأفضل الأسعار بالقرب من بلايا ديل كورا."
  }
};
const ALL_REVIEWS = [
  { es: "¡La mejor Smash de Torrevieja! Carne de calidad y entrega rápida.", en: "Best Smash in Torrevieja! Quality meat and fast delivery.", author: "Carlos R." },
  { es: "Increíble atención. Las patatas caseras son obligatorias. 10/10.", en: "Amazing service. Homemade fries are a must. 10/10.", author: "Sarah M." },
  { es: "La burger 'La Casa' es de otro planeta. La mejor que he probado.", en: "The 'La Casa' burger is from another planet. The best I've had.", author: "Juan P." },
  { es: "Sabor auténtico y productos frescos. Se nota la diferencia.", en: "Authentic flavor and fresh products. You can taste the difference.", author: "Elena G." },
  { es: "Calidad gourmet a un precio muy justo. Repetiremos seguro.", en: "Gourmet quality at a very fair price. We will definitely repeat.", author: "Sonia B." },
  { es: "He pedido a domicilio y llegó caliente y perfecto. ¡Sigan así!", en: "Ordered delivery and it arrived hot and perfect. Keep it up!", author: "Miguel T." },
  { es: "La salsa de la casa es adictiva. El pan brioche es súper tierno.", en: "The house sauce is addictive. The brioche bun is super soft.", author: "Laura V." },
  { es: "Best burgers in the area, hands down. Professional staff.", en: "Las mejores burgers de la zona, sin duda. Personal profesional.", author: "David K." },
  { es: "¡Brutal! La cocción de la carne en su punto. Muy recomendable.", en: "Brutal! The meat was cooked to perfection. Highly recommended.", author: "Roberto F." },
  { es: "A hidden gem in Torrevieja. Real ingredients and great taste.", en: "Una joya escondida en Torrevieja. Ingredientes reales y gran sabor.", author: "Emma S." }
];
const SectionTitle = ({ children, id }) => (
  <header className="menuBurgers" id={id} style={{ margin: '10px 0 20px' }}>
    <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.8rem', color: '#FFD700' }}>{children}</h2>
  </header>
);
export default function App() {
  const [cart, setCart] = useState([]);
  const [showCardPostres, setShowCardPostres] = useState(false);
  const [showCardBurger, setShowCardBurger] = useState(false);
  const [showCardDrink, setShowCardDrink] = useState(false);
  const [lang, setLang] = useState('es');
  const [view, setView] = useState('categories'); // 'categories', 'combos', 'burgers', 'sides'
  const [loadMedia, setLoadMedia] = useState(false); // Pour YouTube (Manuel)
const [loadMaps, setLoadMaps] = useState(false);   // Pour Google Maps (Auto-différé)
// --- 2. GESTION DE LA LANGUE + MAPS + EFFET BACKGROUND ---
  useEffect(() => {
    // A. Logique de disparition de l'image (Performance GPU)
    const bgImg = document.getElementById('hero-bg-perf');
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 800; // Point de disparition totale
      if (bgImg) {
        const newOpacity = Math.max(0, 1 - scrollY / threshold);
        if (scrollY <= threshold + 100) {
          bgImg.style.opacity = newOpacity;
        } else if (bgImg.style.opacity !== "0") {
          bgImg.style.opacity = "0";
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // B. Gestion Langue
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && T[urlLang]) {
      setLang(urlLang);
    } else {
      const browserLang = navigator.language || navigator.userLanguage;
      const code = browserLang.substring(0, 2).toLowerCase();
      setLang(T[code] ? code : 'es');
    }

    // C. Chargement Carte au Scroll
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadMaps(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    const mapTarget = document.querySelector('.map-container');
    if (mapTarget) {
      observer.observe(mapTarget);
    }

    // Nettoyage complet
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const val = item.precio || item.price || "0";
      const valStr = String(val);
      const numericValue = valStr.replace(/[^0-9.,]/g, "").replace(",", ".");
      return acc + (parseFloat(numericValue) || 0);
    }, 0).toFixed(2);
  }, [cart]);

  // --- LOGIC: MÉLANGE DES AVIS (CONSERVÉ) ---
  const randomReviews = useMemo(() => {
    return [...ALL_REVIEWS].sort(() => 0.5 - Math.random()).slice(0, 2);
  }, []);

  const noExtrasIds = ["prod_nuggets", "prod_croquetas", "prod_fritas", "prod_bravas", "prod_cheddar-bacon"];

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, uniqueKey: Math.random() }]);
  };

  const removeFromCart = (idx) => setCart(p => p.filter((_, i) => i !== idx));

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 110;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: "smooth"
      });
    }
  };

  const handleStartOrder = () => {
    setShowCardBurger(true);
    setTimeout(() => scrollToId("sec-burgers"), 150);
  };

  const handleNextStep = () => {
    if (showCardBurger) {
      setShowCardBurger(false);
      setShowCardDrink(true);
      setTimeout(() => scrollToId("sec-bebidas"), 100);
    }
    else if (showCardDrink) {
      setShowCardDrink(false);
      setShowCardPostres(true);
      setTimeout(() => scrollToId("sec-postres"), 100);
    }
    else if (showCardPostres) {
      setShowCardPostres(false);
      setTimeout(() => scrollToId("order"), 100);
    }
  };

  const burgers = useMemo(() => data.filter(i => i.category === "food"), [data]);
  const drinks = useMemo(() => data.filter(i => i.category === "drink"), [data]);
  const postres = useMemo(() => data.filter(i => i.category === "postre"), [data]);

  const GOLD_BRIGHT = "#FFD700";
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_SHADOW = "0 4px 15px rgba(255, 215, 0, 0.3)";

  return (
      <div className="app-main-wrapper" style={{ position: 'relative', backgroundColor: 'transparent', color: '#fff' }}>

        {/* --- BACKGROUND FIXE (PERFORMANCE) --- */}
        <div className="hero-fixed-container">
          <img
            id="hero-bg-perf"
            src={hero}
            className="hero-fixed-bg"
            alt="La Casa de Burger Background"
          />
        </div>
        <style>{`
        /* --- 1. NAVIGATION & SCROLL (FIXE & OPAQUE) --- */
        nav {
          background-color: #000 !important;
          z-index: 10001 !important;
          position: sticky !important;
          top: 0;
        }

        /* --- 2. HIÉRARCHIE DES TEXTES LUXE (OR, BLANC, JAUNE) --- */
        /* Titre principal : OR ROYAL */
        header h1 span:first-of-type {
          color: #BF953F !important;
          text-shadow: 2px 2px 15px rgba(0,0,0,0.8) !important;
        }
        /* Torrevieja : JAUNE AMBRE (Contraste SEO) */
        header h1 span:last-of-type {
          color: #FFD700 !important;
          font-weight: 300 !important;
        }
        /* Sous-titre : BLANC CRISTAL (Lisibilité) */
        header h2 {
          color: #ffffff !important;
          text-align: center !important;
          opacity: 0.9;
        }

        /* --- 3. L'OR ROYAL & SHIMMER (BOUTONS & BADGE) --- */
        .gold-button-premium, .category-btn-overlay, .wobble-badge {
          background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%) !important;
          background-size: 400% 400% !important;
          color: #000 !important;
          font-weight: 950 !important;
          border-radius: 50px !important;
          position: relative !important;
          overflow: hidden !important;
          animation: gold-liquid 6s ease infinite 2.5s !important;
        }

        .gold-button-premium::after, .category-btn-overlay::after {
          content: "" !important;
          display: block !important;
          position: absolute;
          top: -50%; left: -150%; width: 100%; height: 200%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%) !important;
          transform: rotate(25deg);
          animation: shine-luxury 3s infinite ease-in-out 3s !important;
          z-index: 10;
        }

        /* --- 4. LES PRODUITS (NOM EN OR / DESC EN BLANC) --- */
        .card-menu h3 {
          background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center !important;
          font-weight: 950 !important;
          text-transform: uppercase;
        }
        .card-menu p {
          text-align: center !important;
          color: #f0f0f0 !important; /* Blanc cassé luxe */
        }
        .product-price {
          color: #FFD700 !important; /* Prix en Jaune Ambre */
          font-weight: 900;
        }

        /* --- 5. EXTRAS (VERT) & QUITARS (ROUGE) --- */
        .extra-item, .text-green-500 { color: #2ecc71 !important; font-weight: bold !important; }
        .quitar-item, .text-red-500 { color: #e74c3c !important; font-weight: bold !important; text-decoration: line-through; }

        /* --- 6. ANIMATIONS & PLACEMENT --- */
        @keyframes gold-liquid { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes shine-luxury { 0% { transform: translateX(-200%) rotate(25deg); } 30%, 100% { transform: translateX(300%) rotate(25deg); } }

        .wobble-badge-container {
          position: absolute !important;
          top: 20px !important; right: 15px !important;
          z-index: 100 !important;
        }

        @media (max-width: 768px) {
          .logo-container-wrapper { top: 180px !important; left: 15px !important; }
          header h1 { font-size: 2.2rem !important; }
        }
      `}</style>
<Helmet>
{/* 1. DYNAMIQUE : Titre et Description traduits (Indispensable) */}
<title>{T[lang]?.seoTitle || T.es.seoTitle}</title>
<meta name="description" content={T[lang]?.seoContent || T.es.seoContent} />

{/* 2. HREFLANG : Indispensable pour Google International */}
<link rel="alternate" href="https://lacasadeburger.es/" hreflang="x-default" />
<link rel="alternate" href="https://lacasadeburger.es/" hreflang="es" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=en" hreflang="en" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=fr" hreflang="fr" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=no" hreflang="no" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=sv" hreflang="sv" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=de" hreflang="de" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=nl" hreflang="nl" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=pl" hreflang="pl" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=uk" hreflang="uk" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=ru" hreflang="ru" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=ar" hreflang="ar" />
<link rel="alternate" href="https://lacasadeburger.es/?lang=ro" hreflang="ro" />

{/* 3. SOCIAL : OG Tags dynamiques pour WhatsApp/FB/Insta */}
<meta property="og:title" content={T[lang]?.seoTitle || T.es.seoTitle} />
<meta property="og:description" content={T[lang]?.seoContent || T.es.seoContent} />
<meta property="og:url" content={`https://lacasadeburger.es${lang !== 'es' ? `?lang=${lang}` : ''}`} />

{/* 4. TWITTER DYNAMIQUE */}
<meta name="twitter:title" content={T[lang]?.seoTitle || T.es.seoTitle} />
<meta name="twitter:description" content={T[lang]?.seoContent || T.es.seoContent} />

{/* NOTE : Le JSON-LD massif, le Preload d'image et le Canonical sont déjà dans l'index.html.
  On ne les remet pas ici pour gagner du temps de calcul (TBT) sur Lighthouse. */}
</Helmet>
{/* --- LOGO ANIMÉ EN HAUT À GAUCHE --- */}
<div className="logo-container-wrapper" style={{
  position: 'absolute',
  left: '35px',
  zIndex: 99,
  pointerEvents: 'none'
}}>
  <img
    src={logo}
    alt="La Casa de Burger Logo"
    className="moving-header-logo"
    /* 1. Dimensions réelles du fichier pour le CLS */
    width="250"
    height="162"
    style={{
      /* 2. Affichage visuel proportionnel */
      height: 'auto',
      width: '180px', // Taille sur PC, le ratio 162 sera calculé auto
      pointerEvents: 'auto',
      cursor: 'pointer',
      filter: 'drop-shadow(0 0 10px rgba(191,149,63,0.7))'
    }}
    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
  />
</div>
<Nav
  scrollToOrder={() => scrollToId('order')}
  cartLength={cart.length}
  totalPrice={totalPrice}
  lang={lang}
  setLang={setLang}
  logo={logo}
/>
{<div style={{
  position: 'absolute',
  top: '450px',
  left: 0,
  width: '100%',
  height: '150px',
  background: 'linear-gradient(to bottom, transparent, #000)',
  zIndex: 1,
  pointerEvents: 'none'
}}></div>}
<header style={{
  // Calcul précis : on réduit le padding car la Nav occupe déjà 184px
  padding: '40px 15px 80px',
  textAlign: 'center',
  position: 'relative',
  borderRadius: '0 0 50px 50px',
  borderBottom: '5px solid #ff4757',
  backgroundColor: 'transparent',
  overflow: 'hidden',
  // minHeight réduit pour éviter un immense espace vide avant le chargement des images
  minHeight: '700px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', // Aligne en haut pour la stabilité
  alignItems: 'center',
  zIndex: 1
}}>
  {/* 1. BADGE DE PRESTIGE - Position ajustée pour éviter les chevauchements */}
  <div className="wobble-badge-container" style={{
    position: 'absolute',
    top: '20px',
    right: '15px',
    zIndex: 3
  }}>
    <div className="wobble-badge gold-button-premium" style={{
      padding: '6px 15px',
      fontSize: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontWeight: '900'
    }}>
      🏆 #1 BURGER EN TORREVIEJA
    </div>
  </div>

  {/* 2. CONTENU TEXTUEL (L'ARMURE SEO) */}
  <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
    <h1 style={{
      fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
      fontWeight: '900',
      textTransform: 'uppercase',
      textShadow: '2px 2px 15px rgba(0,0,0,0.8)',
      margin: '0 auto',
      color: '#fff',
      lineHeight: '1.1',
      // On fixe la hauteur minimale du bloc de titre pour éviter le CLS
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <span style={{ display: 'block', width: '100%' }}>
        {T[lang]?.heroTitle || T.es.heroTitle}
      </span>

      <span style={{
        fontSize: '0.6em',
        display: 'block',
        width: '100%',
        color: '#FFD700', // Jaune pour le contraste LCP
        marginTop: '5px'
      }}>
        {lang === 'fr' ? 'À TORREVIEJA' :
         lang === 'en' ? 'IN TORREVIEJA' :
         lang === 'es' ? 'EN TORREVIEJA' : 'IN TORREVIEJA'}
      </span>
    </h1>

    {/* H2 SEO : Burgers Gourmet */}
    <h2 style={{
        fontSize: '1.2rem',
        color: '#fff',
        fontWeight: '700',
        marginTop: '15px',
        textTransform: 'uppercase',
        minHeight: '3rem',
        padding: '0 10px'
      }}>
        {T[lang]?.heroSubtitle || T.es.heroSubtitle}
    </h2>

    {/* 3. BOUTONS D'ACTION */}
    <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>

      {/* BOUTON COMMANDER - Priorité LCP */}
      <button
        onClick={() => {
          setShowCardBurger(true);
          const el = document.getElementById("sec-burgers");
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="pulse-gold-btn gold-button-premium"
        style={{
            color: '#000',
            padding: '20px',
            borderRadius: '50px',
            border: '3px solid #000',
            fontWeight: '950',
            cursor: 'pointer',
            fontSize: '1.4rem',
            textTransform: 'uppercase',
            width: '90%',
            maxWidth: '400px',
            height: '75px'
        }}
      >
        🚀 {T[lang]?.btnOrder || T.es.btnOrder}
      </button>

      {/* BOUTON RÉSERVER */}
      <button
        onClick={() => window.open("https://app.tableo.com/widget/la-casa-de-burger", "_blank")}
        className="gold-button-premium"
        style={{
          padding: '15px',
          borderRadius: '50px',
          fontSize: '1.1rem',
          width: '80%',
          maxWidth: '350px',
          cursor: 'pointer',
          fontWeight: '700'
        }}
      >
        📅 RESERVAR MESA
      </button>

      {/* 4. BLOC APPEL */}
      <div style={{ marginTop: '10px' }}>
        <a
          href="tel:+34602597210"
          style={{
            background: '#ffffff',
            color: '#000000',
            padding: '12px 25px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '950',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1rem'
          }}
        >
          📞 {T[lang]?.btnCall || T.es.btnCall}
        </a>
      </div>
    </div>
  </div>
</header>
<main className="menu-page-container">
  {/* Le Suspense permet d'afficher le Header immédiatement sans attendre le code du menu */}
  <Suspense fallback={<div style={{ textAlign: 'center', padding: '50px', color: '#BF953F', fontWeight: 'bold' }}>Cargando menú...</div>}>

  {/* SECTION BURGERS */}
<section id="sec-burgers" style={{ marginTop: '5px' }}>
  <SectionTitle>{T[lang]?.catBurgers || T.es.catBurgers}</SectionTitle>
  {showCardBurger ? (
    <div className="grid-cards">
      {burgers.map(item => (
        <CardMenu key={item.id} {...item} addToCart={addToCart} lang={lang} hasExtras={!noExtrasIds.includes(item.id)} />
      ))}
    </div>
  ) : (
    <div className="promo-container" onClick={() => {
      setShowCardBurger(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById("sec-burgers");
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
        }, 150); // Délai de sécurité
      });
    }}>
      <img src="/Burger.webp" className="promo-img" alt="Mejor Hamburguesa Gourmet" fetchpriority="high" width="1024" height="573" />
      <span className="category-btn-overlay">{T[lang]?.catBurgers || T.es.catBurgers}</span>
    </div>
  )}
</section>

{/* SECTION BEBIDAS */}
<section id="sec-bebidas">
  <SectionTitle>{T[lang]?.catDrinks || T.es.catDrinks}</SectionTitle>
  {showCardDrink ? (
    <div className="grid-cards">
      {drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={addToCart} lang={lang} />)}
    </div>
  ) : (
    <div className="promo-container" onClick={() => {
      setShowCardDrink(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById("sec-bebidas");
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
        }, 150);
      });
    }}>
      <img src="/Drink.webp" className="promo-img" alt="Bebidas" loading="lazy" width="600" height="336" />
      <span className="category-btn-overlay">{T[lang]?.catDrinks || T.es.catDrinks}</span>
    </div>
  )}
</section>

{/* SECTION POSTRES */}
<section id="sec-postres">
  <SectionTitle>{T[lang]?.catDesserts || T.es.catDesserts}</SectionTitle>
  {showCardPostres ? (
    <div className="grid-cards">
      {postres.map(item => <CardMenu key={item.id} {...item} isPostreCard={true} addToCart={addToCart} lang={lang} />)}
    </div>
  ) : (
    <div className="promo-container" onClick={() => {
      setShowCardPostres(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById("sec-postres");
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
        }, 150);
      });
    }}>
      <img src="/Postre.webp" className="promo-img" alt="Desserts" loading="lazy" width="600" height="336" />
      <span className="category-btn-overlay">{T[lang]?.catDesserts || T.es.catDesserts}</span>
    </div>
  )}
</section>

    {/* SECTION COMMANDE (Lazy Loaded via Suspense) */}
    <section id="order" style={{ paddingBottom: '60px' }}>
      <SectionTitle>{lang === 'es' ? 'Tu Pedido' : lang === 'fr' ? 'Votre Commande' : 'Your Order'}</SectionTitle>
      <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
    </section>

    {/* --- BOUTON DE NAVIGATION RAPIDE (Flottant quand le menu est ouvert) --- */}
    {(showCardBurger || showCardDrink || showCardPostres) && (
      <button
        className="floating-close"
        onClick={() => {
            if (showCardBurger) { setShowCardBurger(false); setShowCardDrink(true); document.getElementById('sec-bebidas')?.scrollIntoView({behavior:'smooth'}); }
            else if (showCardDrink) { setShowCardDrink(false); setShowCardPostres(true); document.getElementById('sec-postres')?.scrollIntoView({behavior:'smooth'}); }
            else { setShowCardPostres(false); document.getElementById('order')?.scrollIntoView({behavior:'smooth'}); }
        }}
        style={{ position: 'fixed', bottom: '95px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ff4757', color: '#fff', width: '280px', height: '60px', borderRadius: '12px', fontWeight: '950', zIndex: 10000, border: '3px solid #000', cursor: 'pointer' }}
      >
        <span>
          {showCardBurger && (lang === 'fr' ? 'SUIVANT : BOISSONS ➔' : 'SIGUIENTE: BEBIDAS ➔')}
          {showCardDrink && (lang === 'fr' ? 'SUIVANT : DESSERTS ➔' : 'SIGUIENTE: POSTRES ➔')}
          {showCardPostres && (lang === 'fr' ? 'VOIR MON PANIER ➔' : 'VER MI PEDIDO ➔')}
        </span>
      </button>
    )}

    {/* SECTION SEO DYNAMIQUE */}
    <section style={{ padding: '40px 20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '20px', marginBottom: '40px', textAlign: lang === 'ar' ? 'right' : 'left', border: '1px solid #222' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ color: '#BF953F', fontSize: '1.6rem', marginBottom: '15px', textAlign: 'center' }}>
          {T[lang]?.seoTitle || T.es.seoTitle}
        </h2>
        <p style={{ lineHeight: '1.8', color: '#ccc', fontSize: '1rem' }}>
          {T[lang]?.seoContent || T.es.seoContent}
        </p>
      </div>
    </section>

  {/* REVIEWS */}
  <section style={{ padding: '20px 0 80px' }}>
    <h3 style={{ color: GOLD_BRIGHT, textTransform: 'uppercase', marginBottom: '30px', textAlign: 'center' }}>
      {T[lang]?.reviewsTitle || T.es.reviewsTitle}
    </h3>
    <div className="grid-reviews" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      {randomReviews.map((rev, index) => (
        <div key={index} className="testimonial-card" style={{ padding: '20px', backgroundColor: '#111', borderRadius: '15px', border: '1px solid #222' }}>
          <div style={{ color: GOLD_BRIGHT, marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
          <p style={{ fontStyle: 'italic', color: '#eee' }}>"{rev[lang] || rev.es}"</p>
          <p style={{ fontWeight: 'bold', marginTop: '10px', color: '#ff4757' }}>— {rev.author}</p>
        </div>
      ))}
    </div>
  </section>

{/* --- SECTION MAPS, VIDEO & SOCIALS --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', margin: '40px auto' }}>

          {/* BLOC MAPS OPTIMISÉ */}
          <div className="map-container" style={{ width: '100%', maxWidth: '1100px', borderRadius: '15px', overflow: 'hidden' }}>
            {loadMaps ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.543213567123!2d-0.6853244!3d37.9877443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63aa36e866a987%3A0x6b864a6f7b9f362!2sAv.%20Diego%20Ram%C3%ADrez%20Pastor%2C%20142%2C%2003181%20Torrevieja%2C%20Alicante!5e0!3m2!1sfr!2ses!4v1700000000000!5m2!1sfr!2ses"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de La Casa de Burger"
              ></iframe>
            ) : (
              <div className="map-placeholder" onClick={() => setLoadMaps(true)} style={{ height: '350px', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid #222', borderRadius: '15px' }}>
                <p style={{ color: GOLD_BRIGHT }}>
                  {lang === 'es' ? 'Cargando ubicación...' :
                   lang === 'en' ? 'Loading location...' :
                   lang === 'fr' ? 'Chargement de l\'emplacement...' :
                   'Cargando ubicación...'}
                </p>
              </div>
            )}
          </div>

          {/* BLOC YOUTUBE AVEC TON IMAGE SIGNATURE */}
  <div
    onClick={() => setLoadMedia(true)}
    style={{
      width: '90%', maxWidth: '800px', height: '400px', backgroundColor: '#050505',
      borderRadius: '15px', overflow: 'hidden', border: `3px solid ${GOLD_BRIGHT || '#BF953F'}`,
      margin: '30px auto', cursor: loadMedia ? 'default' : 'pointer', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transition: 'transform 0.3s ease'
    }}
  >
    {loadMedia === true ? (
      <iframe
        width="100%" height="100%"
        src="https://www.youtube-nocookie.com/embed/qN6VZYBojLs?autoplay=1&mute=0"
        title="Video de presentación"
        frameBorder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    ) : (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        /* On utilise ton image spécifique ici */
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/burger-signature-torrevieja2.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div style={{
          fontSize: '4.5rem',
          color: GOLD_BRIGHT || '#BF953F',
          marginBottom: '10px',
          filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.8))',
          lineHeight: 1
        }}>▶</div>
        <p style={{
          fontSize: '1.1rem',
          color: GOLD_BRIGHT || '#BF953F',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: '900',
          margin: 0,
          textAlign: 'center',
          padding: '0 20px',
          textShadow: '2px 2px 10px rgba(0,0,0,1)'
        }}>
          {lang === 'es' ? 'Ver video gourmet' : lang === 'fr' ? 'Voir la vidéo gourmet' : 'Watch gourmet video'}
        </p>
      </div>
    )}
  </div>

          {/* RÉSEAUX SOCIAUX & REVIEWS */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', marginBottom: '20px', marginTop: '20px', alignItems: 'center' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer">
              <img src={fb} width="45" height="45" alt="Facebook" loading="lazy" decoding="async" />
            </a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer">
              <img src={instagramIcon} width="45" height="45" alt="Instagram" loading="lazy" decoding="async" />
            </a>
            <a href="https://www.google.com/search?q=la+casa+de+burger+torrevieja" target="_blank" rel="noreferrer">
  <img
    src={googleIcon}
    width="118"
    height="66"
    alt="Google Reviews"
    loading="lazy"
    decoding="async"
    style={{
      objectFit: 'contain',
      width: '118px',
      height: '66px', // On fixe la taille exacte
      aspectRatio: '118 / 66',
      imageRendering: 'auto'
    }}
  />
</a>
<a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja" target="_blank" rel="noreferrer">
<img
src={tripadvisor}
width="169"  // La dimension RÉELLE de ton nouveau fichier
height="127" // La dimension RÉELLE de ton nouveau fichier
alt="Tripadvisor"
loading="lazy"
decoding="async"
style={{
objectFit: 'contain',
width: '110px', // On l'affiche un peu plus petit pour le design
height: 'auto',
aspectRatio: '169 / 127' // Indispensable pour éviter le CLS
}}
/>
</a>
          </div>
        </div>
        </Suspense>
      </main>
      {/* --- BLOC SEO MULTILINGUE (OPTIMISÉ POUR LA VITESSE) --- */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto 100px',
          padding: '0 20px',
          /* 🚀 PERFORMANCE : On ne calcule pas ce bloc massif au démarrage */
          contentVisibility: 'auto',
          containIntrinsicSize: '0 800px'
        }}>
          <div style={{ backgroundColor: '#0a0a0a', padding: '35px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify' }}>
            <div style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>

              <p><strong>🇪🇸 ESPAÑOL:</strong> <strong>La Casa de Burger</strong> – Tu hamburguesería de referencia y el mejor restaurante de <strong>burger en Torrevieja</strong>. Especialistas en <strong>Smash Burgers</strong> y <strong>Burger Gourmet de Autor</strong> 100% artesanal con carne picada a diario. Opciones <strong>Halal y Vegetarianas (bajo reserva)</strong>. Disfruta de nuestra terraza y fácil aparcamiento. Servicio a domicilio (delivery) en todo Torrevieja.</p>

              <p><strong>🇬🇧 ENGLISH:</strong> <strong>Best gourmet burgers in Torrevieja</strong>. Specialists in 100% artisan <strong>Signature Burgers</strong> and <strong>Smash Burgers</strong> with freshly minced beef. <strong>Halal and Vegetarian options available (on request)</strong>. Enjoy our terrace and easy parking near the city center.</p>

              <p><strong>🇳🇴 NORSK:</strong> <strong>Beste gourmetburger i Torrevieja</strong>. 100% håndlagde <strong>Signature Burgers</strong> og <strong>Smash Burgers</strong>. <strong>Halal og vegetariske alternativer (ved bestilling)</strong>. Vi har terrasse og enkel parkering i nærheten av havnen.</p>

              <p><strong>🇵🇱 POLSKI:</strong> <strong>Najlepsze burgery gourmet w Torrevieja</strong>. Specjalność: 100% rzemieślnicze <strong>Signature Burgers</strong> i <strong>Smash Burgers</strong>. <strong>Opcje Halal i wegetariańskie (na zamówienie)</strong>. Zapraszamy na nasz taras i łatwy parking.</p>

              <p style={{ direction: 'rtl', textAlign: 'right' }}><strong>🇲🇦 ARABIC:</strong> <strong>أفضل مطعم برجر في توريفايجا</strong>. متخصصون في <strong>البرجر الحرفي 100%</strong> و <strong>سماش برجر</strong>. تتوفر <strong>خيارات حلال ونباتية (عند الحجز مسبقاً)</strong>. استمتع بجلساتنا الخارجية (تراس) وسهولة ركن السيارات في وسط المدينة.</p>

              <p><strong>🇺🇦 UKRAINIAN:</strong> <strong>Найкращі гурме-бургери в Торрев'єсі</strong>. 100% крафтові <strong>Signature Burgers</strong> та <strong>Smash Burgers</strong>. <strong>Халяльні та вегетаріанські страви (за попереднім замовленням)</strong>. Є тераса та зручна парковка.</p>

              <p><strong>🇫🇷 FRANÇAIS:</strong> <strong>Meilleur Burger Gourmet Torrevieja</strong>. Spécialiste du <strong>Smash Burger</strong> et <strong>Burger Signature</strong> 100% artisanal. <strong>Options Halal et Végétarien disponibles (sur réservation)</strong>. Profitez de notre terrasse et du parking facile au centre-ville.</p>

              <p><strong>🇷🇺 RUSSIAN:</strong> <strong>Лучшие гурме-бургеры в Торревьехе</strong>. 100% авторские <strong>Signature Burgers</strong> и <strong>Smash Burgers</strong>. <strong>Халяльное и вегетарианское меню (по запросу)</strong>. Уютная терраса и удобная парковка рядом с вами.</p>

              <p><strong>🇸🇪 SVENSKA:</strong> <strong>Bästa gourmetburgare i Torrevieja</strong>. 100% hantverksmässiga <strong>Signature Burgers</strong> och <strong>Smash Burgers</strong>. <strong>Halal och vegetariska alternativ (vid bokning)</strong>. Vi erbjuder terrass och smidig parkering.</p>

              <p><strong>🇩🇪 DEUTSCH:</strong> <strong>Beste Gourmet-Burger in Torrevieja</strong>. 100% handgemachte <strong>Signature Burgers</strong> und <strong>Smash Burgers</strong>. <strong>Halal und vegetarische Optionen (auf Voranmeldung)</strong>. Mit Terrasse und guten Parkmöglichkeiten im Zentrum.</p>

              <p><strong>🇳🇱 NEDERLANDS:</strong> <strong>Beste gourmet burgers in Torrevieja</strong>. 100% ambachtelijke <strong>Signature Burgers</strong> en <strong>Smash Burgers</strong>. <strong>Halal en vegetarische opties (op aanvraag)</strong>. Geniet van ons terras en gemakkelijk parkeren.</p>

              <div style={{ marginTop: '25px', borderTop: '1px solid #222', paddingTop: '25px' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Especialistas en <span style={{ color: '#FFD700' }}>Burger Gourmet Signature</span> & <span style={{ color: '#FFD700' }}>Smash Burgers</span>
                  </h4>
                  <p style={{ color: '#888', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    Experiencia 100% Artesanal • Carne fresca picada a diario
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '15px 25px', flexWrap: 'wrap', color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px', justifyContent: 'center' }}>
                  <span>🥩 100% Artesanal</span>
                  <span>☀️ Terraza</span>
                  <span>🚗 Parking fácil</span>
                  <span>🥡 Take Away & Delivery</span>
                </div>

                <div style={{ fontSize: '1.1rem', color: '#bbb', lineHeight: '1.6', textAlign: 'center' }}>
                  <strong style={{ color: '#fff' }}>📍 ZONAS DE REPARTO / DELIVERY AREAS:</strong>
                  <br />
                  <span style={{ color: '#BDBDBD' }}>
                    Torrevieja Centro, Playa del Cura, Playa de los Locos, Paseo Marítimo, Puerto, La Mata, Punta Prima, Los Balcones, Aguas Nuevas, La Siesta, El Acequión, La Veleta, San Roque, Rocío del Mar, Los Altos, Lago Jardín, Torreta I, II, III, El Salado, Urbanización Doña Inés, Jardín del Mar, Las Nations, Centro Comercial Habaneras et hôtels.
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- FOOTER FINAL UNIQUE (OPTIMISÉ POUR LA VITESSE) --- */}
        <footer style={{
          padding: '60px 20px 40px',
          textAlign: 'center',
          backgroundColor: '#050505',
          borderTop: '4px solid #ff5e6c',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          marginTop: '50px',
          /* 🚀 PERFORMANCE : Le footer ne bloque plus l'affichage du haut de page */
          contentVisibility: 'auto',
          containIntrinsicSize: '0 500px'
        }}>
          {logo && (
            <img src={logo} alt="La Casa de Burger Torrevieja" width="150" height="80" style={{ height: '80px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} />
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', width: '100%', maxWidth: '1100px', textAlign: 'center', fontSize: '1.1rem', color: '#CCCCCC' }}>
            <div>
              <h3 style={{ color: '#ff5e6c', fontSize: '1.2rem', marginBottom: '15px' }}>La Casa de Burger</h3>
              <p style={{ lineHeight: '1.8' }}>
                {lang === 'es' ? 'Especialistas en Smash Burgers y Hamburguesas Gourmet de autor. Carne de ternera premium, buey y procesos artesanales.' : 'Specialists in Signature Gourmet & Smash Burgers. Premium beef and artisan processes.'}
              </p>
            </div>

            <div>
              <h4 style={{ color: '#FFD700', marginBottom: '15px' }}>🕒 {T[lang]?.hours || T.es.hours}</h4>
              <p style={{ margin: '8px 0' }}>Lun - Sáb: 13:00 – 23:00</p>
              <p style={{ margin: '8px 0', color: '#AAAAAA', fontWeight: '500' }}>Dom: Cerrado / Closed</p>
            </div>

            <div>
              <h4 style={{ color: '#FFD700', marginBottom: '15px' }}>📍 {T[lang]?.location || T.es.location}</h4>
              <p style={{ margin: '8px 0' }}>Av. Diego Ramírez Pastor, 142</p>
              <p style={{ margin: '8px 0' }}>03181 Torrevieja, Spain</p>
              <p style={{ marginTop: '15px' }}>
                📞 <a href="tel:+34602597210" style={{ color: '#ffffff', textDecoration: 'underline', textDecorationColor: '#ff5e6c', fontWeight: 'bold' }}>+34 602 59 72 10</a>
              </p>
            </div>
          </div>

          <div style={{ width: '60px', height: '2px', background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7)', borderRadius: '2px', margin: '10px 0' }} aria-hidden="true" />

          <div style={{ color: '#AAAAAA', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#BDBDBD' }}>© {new Date().getFullYear()} LA CASA DE BURGER | THE ARTISAN EXPERIENCE</p>
            <p style={{ margin: '8px 0 0' }}>{lang === 'es' ? 'El mejor burger de Torrevieja' : 'Best burger in Torrevieja'}</p>
          </div>
        </footer>
            {/* --- ÉLÉMENTS FLOTTANTS --- */}
            <a href="https://wa.me/34602597210" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
              <img src={whatsappIcon} width="100" height="100" alt="WhatsApp" style={{ objectFit: 'contain' }} />
            </a>

            {(showCardBurger || showCardDrink || showCardPostres) && (
              <button className="floating-close" onClick={handleNextStep} style={{ position: 'fixed', bottom: '95px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ff4757', color: '#fff', width: '280px', height: '60px', borderRadius: '12px', fontWeight: '950', zIndex: 10000, border: '3px solid #000', cursor: 'pointer' }}>
                <span>
                  {showCardBurger && (lang === 'en' ? 'NEXT: DRINKS ➔' : 'SIGUIENTE: BEBIDAS ➔')}
                  {showCardDrink && (lang === 'en' ? 'NEXT: DESSERTS ➔' : 'SIGUIENTE: POSTRES ➔')}
                  {showCardPostres && (lang === 'en' ? 'VIEW ORDER ➔' : 'VER MI PEDIDO ➔')}
                </span>
              </button>
            )}

            </div>

        ); // Fermeture du return
    }; // Fermeture de la fonction App
