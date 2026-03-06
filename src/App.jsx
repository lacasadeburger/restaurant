import React, { useState, useEffect, useMemo, Suspense, lazy } from "react";
import Nav from "./Nav";
import data from "./data";
import { Helmet } from "react-helmet";
import { T, ALL_REVIEWS } from "./translations";
const Order = lazy(() => import("./Order"));
const CardMenu = lazy(() => import("./CardMenu"));
const fb = "/FB.png";
const tripadvisor = "/tripadvisor.webp";
const googleIcon = "/google.webp";
const logo = "/logo.webp";
const instagramIcon = "/instagram.png";
const whatsappIcon = "/wha2026.webp";
const hero = "/burger-signature-torrevieja.webp";
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

    // B. Gestion Langue (Optimisée : différée de 50ms pour libérer le thread principal au démarrage)
    const timeoutLang = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && T[urlLang]) {
        setLang(urlLang);
      } else {
        const browserLang = navigator.language || navigator.userLanguage;
        const code = browserLang.substring(0, 2).toLowerCase();
        setLang(T[code] ? code : 'es');
      }
    }, 50);

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
      clearTimeout(timeoutLang);
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

  // --- LOGIC: MÉLANGE DES AVIS (Optimisé : Algorithme Fisher-Yates pour stabilité CPU) ---
  const randomReviews = useMemo(() => {
    if (!ALL_REVIEWS || ALL_REVIEWS.length === 0) return [];
    const shuffled = [...ALL_REVIEWS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 2);
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

  const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    // requestAnimationFrame garantit que le DOM a été mis à jour par React
    requestAnimationFrame(() => {
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - 120, // Ajustez votre offset de header ici
        behavior: "smooth"
      });
    });
  }
};

const handleStartOrder = () => {
  setShowCardBurger(true);
  // On laisse React terminer le rendu de CardMenu avant de scroller
  setTimeout(() => scrollToId("sec-burgers"), 50);
};

const handleNextStep = () => {
  if (showCardBurger) {
    setShowCardBurger(false);
    setShowCardDrink(true);
    setTimeout(() => scrollToId("sec-bebidas"), 50);
  } else if (showCardDrink) {
    setShowCardDrink(false);
    setShowCardPostres(true);
    setTimeout(() => scrollToId("sec-postres"), 50);
  } else if (showCardPostres) {
    setShowCardPostres(false);
    setTimeout(() => scrollToId("order"), 50);
  }
};
  };
  const burgers = useMemo(() => data.filter(i => i.category === "food"), [data]);
  const drinks = useMemo(() => data.filter(i => i.category === "drink"), [data]);
  const postres = useMemo(() => data.filter(i => i.category === "postre"), [data]);

  const GOLD_BRIGHT = "#FFD700";
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_SHADOW = "0 4px 15px rgba(255, 215, 0, 0.3)";
  return (
    <div className="app-main-wrapper" style={{
      position: 'relative',
      backgroundColor: 'transparent',
      color: '#fff',
      overflowX: 'hidden', // Empêche le scroll horizontal indésirable dû aux animations
      width: '100%'
    }}>
      {/* --- BACKGROUND FIXE (PERFORMANCE) --- */}
<div className="hero-fixed-container">
  <img
    id="hero-bg-perf"
    src={hero}
    className="hero-fixed-bg"
    alt="La Casa de Burger Background"
    /* On force l'image à rester au niveau 1 pour que le voile (niveau 2) soit devant elle */
    style={{ zIndex: 1 }}
  />
</div>
<style>{`
  /* --- 1. TYPOGRAPHIE & EFFETS OR --- */
  header h1 span:first-of-type {
    background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 20%, #B38728 40%, #FBF5B7 60%, #AA771C 80%, #FFF5C1 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    text-shadow: 0px 4px 15px rgba(0,0,0,0.5);
    font-weight: 950 !important;
    display: inline-block;
    line-height: 1.2 !important; /* STABILISATION CLS */
  }

  header h1 span:last-of-type {
    color: #FCF6BA !important;
    font-weight: 800 !important;
    font-size: 1.25em !important;
    letter-spacing: 2px;
    display: block;
    margin-top: 8px;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
    text-transform: uppercase;
    line-height: 1.2 !important; /* STABILISATION CLS */
  }

  h3.home-subtitle, .card-menu h3, .product-price, .SectionTitle, #order h2 {
    background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    font-weight: 800 !important;
    text-transform: uppercase;
    text-align: center !important;
    font-size: 1.2rem !important;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
    line-height: 1.4 !important; /* STABILISATION CLS */
  }

  /* --- 2. BOUTONS & CLIC UNIQUE --- */
  .gold-button-premium, .category-btn-overlay {
    position: relative;
    background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%) !important;
    background-size: 400% 400% !important;
    color: #000 !important;
    font-weight: 950 !important;
    text-transform: uppercase;
    border: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    z-index: 1;
    animation: gold-liquid 6s ease infinite !important;
    box-sizing: border-box !important;
  }

  .category-btn-overlay {
    position: absolute !important;
    bottom: 20px !important;
    right: 20px !important;
    padding: 12px 25px !important;
    border-radius: 50px;
    z-index: 20 !important;
    min-width: 180px;
    pointer-events: none !important;
  }

  .gold-button-premium::after, .category-btn-overlay::after {
    content: '';
    position: absolute;
    top: 0; left: -150%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-25deg);
    pointer-events: none;
    animation: shimmer-gold-clean 3s infinite;
    content-visibility: auto;
    contain-intrinsic-size: 100% 65px;
    box-sizing: border-box !important;
  }

  /* --- 3. STRUCTURES FIXES & DRAPEAUX (ANTI-CLS & INSIGHTS) --- */
  .logo-container-wrapper {
    position: absolute !important;
    top: 180px; left: 20px; z-index: 100;
    pointer-events: none;
  }

  .moving-header-logo {
    width: 150px; height: auto;
    pointer-events: auto;
    animation: float-logo 3s ease-in-out infinite !important;
  }

  .wobble-badge-container {
    position: absolute !important;
    top: 180px; right: 20px; z-index: 105;
    pointer-events: none;
  }

  .wobble-badge {
    pointer-events: auto;
    background: linear-gradient(135deg, #BF953F, #FCF6BA, #AA771C) !important;
    color: #000 !important;
    font-weight: 900;
    padding: 8px 15px !important;
    animation: wobble-inverse 3s infinite ease-in-out !important;
    border-radius: 5px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  }

  .language-switcher-container {
    height: 45px !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    padding: 0 15px !important;
    overflow-x: auto !important;
    background-color: #0a0a0a !important;
    border-bottom: 1px solid #333 !important;
    scrollbar-width: none;
  }
  .language-switcher-container::-webkit-scrollbar { display: none; }

  .flag-btn {
    flex-shrink: 0;
    padding: 0 !important;
    background: transparent !important;
    border: none !important;
    cursor: pointer;
    width: 32px;
    height: 22px;
    border-radius: 4px;
    overflow: hidden;
    opacity: 0.5;
    transition: transform 0.3s ease, opacity 0.3s ease !important;
  }

  .flag-btn.active {
    opacity: 1 !important;
    transform: scale(1.15) !important;
    box-shadow: 0 0 8px rgba(191,149,63,0.8);
  }

  .flag-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* --- 4. DIMENSIONS PROMO (STABILISÉES ANTI-CLS) --- */
  .promo-container {
    position: relative !important;
    width: 100%;
    max-width: 600px;
    aspect-ratio: 600 / 336 !important;
    height: auto !important;
    margin: 15px auto;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    z-index: 5;
    background: #111;
  }

  .promo-img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block;
    transition: transform 0.5s ease;
  }

  /* --- 5. ANIMATIONS --- */
  @keyframes gold-liquid { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.15); } }
  @keyframes wobble-inverse { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
  @keyframes float-logo { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
  @keyframes shimmer-gold-clean {
    0% { transform: translateX(-100%) skewX(-25deg); opacity: 0; }
    5% { opacity: 1; }
    25% { transform: translateX(250%) skewX(-25deg); opacity: 1; }
    100% { transform: translateX(250%) skewX(-25deg); opacity: 0; }
  }

  /* --- 6. RESPONSIVE (ZERO CLS MOBILE) --- */
    @media (max-width: 768px) {
      header h1 {
        font-size: 2.1rem !important; /* Légèrement réduit pour éviter les retours à la ligne imprévus */
        padding-top: 35px;
        /* On augmente la zone de sécurité du titre */
        min-height: 125px !important;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.1 !important;
      }

      /* FORCE la hauteur du bloc qui contient tes boutons Order/Call */
      /* Assure-toi que ton div React a bien la classe "mobile-actions-container" ou applique-le au div parent direct */
      .mobile-actions-container {
        height: 260px !important;
        min-height: 260px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 15px !important;
        contain: layout paint !important; /* Isole le bloc pour éviter les décalages en cascade */
      }

      .promo-container { margin: 10px auto; }

      /* Stabilisation des éléments flottants */
      .wobble-badge-container { top: 175px !important; right: 10px; height: 40px; }
      .logo-container-wrapper { top: 165px !important; left: 10px; height: 90px; }

      .moving-header-logo {
        width: 90px !important;
        height: 90px !important; /* Dimensions fixes pour le logo */
        object-fit: contain;
      }

      .category-btn-overlay {
        bottom: 15px; right: 15px;
        font-size: 0.9rem; padding: 10px 20px !important;
        min-width: 150px;
      }
    }
`}</style>
<Helmet>
  {/* SEO Dynamique selon la langue sélectionnée */}
  <title>{T[lang]?.seoTitle || T.es.seoTitle}</title>
  <meta name="description" content={T[lang]?.seoContent || T.es.seoContent} />
  <link rel="canonical" href="https://lacasadeburger.es" />

  {/* --- CONFIGURATION HREFLANG POUR TES 12 LANGUES --- */}
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="es" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="en" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="fr" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="de" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="sv" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="nl" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="no" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="pl" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="ru" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="uk" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="ro" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="ar" />

  {/* Langue par défaut (Espagnol) pour les autres zones */}
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="x-default" />

  {/* Open Graph pour WhatsApp, Facebook & Partages */}
  <meta property="og:title" content={T[lang]?.seoTitle || T.es.seoTitle} />
  <meta property="og:description" content={T[lang]?.seoContent || T.es.seoContent} />
  <meta property="og:image" content="https://lacasadeburger.es/logo.webp" />
  <meta property="og:url" content="https://lacasadeburger.es" />
  <meta property="og:type" content="website" />

  {/* Meta pour les langues s'écrivant de droite à gauche (Arabe) */}
  {lang === 'ar' && <html lang="ar" dir="rtl" />}
  {lang !== 'ar' && <html lang={lang} dir="ltr" />}
</Helmet>

{/* --- LOGO ANIMÉ --- */}
<div className="logo-container-wrapper" style={{
  position: 'absolute',
  top: '180px',
  left: '20px',
  zIndex: 100,
  pointerEvents: 'none'
}}>
  <img
    src={logo}
    alt="Logo"
    className="moving-header-logo"
    width="180"
    height="116"
    style={{
      width: '150px',
      height: 'auto',
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

<header style={{
  padding: '240px 15px 60px',
  textAlign: 'center',
  position: 'relative',
  borderRadius: '0 0 50px 50px',
  borderBottom: '5px solid #ff4757',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1
}}>

  {/* 1. BADGE DE PRESTIGE (Ancré via CSS) */}
  <div className="wobble-badge-container">
    <div className="wobble-badge">
      🏆 #1 BURGER EN TORREVIEJA
    </div>
  </div>

  {/* 2. CONTENU TEXTUEL */}
  <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
    <h1 style={{ margin: '0 auto', color: '#fff' }}>
      {/* UTILISATION DES SPANS POUR LE CSS OR 24K */}
      <span>{T[lang]?.heroTitle || T.es.heroTitle}</span>

      <span style={{
        fontSize: '0.45em',
        display: 'block',
        color: '#FCF6BA',
        marginTop: '10px',
        letterSpacing: '3px',
        fontWeight: '800'
      }}>
        {lang === 'fr' ? 'À TORREVIEJA' :
         lang === 'en' ? 'IN TORREVIEJA' :
         lang === 'es' ? 'EN TORREVIEJA' : 'IN TORREVIEJA'}
      </span>
    </h1>

    <h2 style={{
        fontSize: '1.1rem',
        color: '#f0f0f0',
        fontWeight: '600',
        marginTop: '20px',
        textTransform: 'uppercase',
        padding: '0 20px'
      }}>
        {T[lang]?.heroSubtitle || T.es.heroSubtitle}
    </h2>

    {/* 3. BLOC ACTIONS - ZERO CLS (VERROUILLÉ) */}
  <div style={{
    paddingTop: '40px',
    display: 'grid',              // Grid est plus rigide que Flex
    gridTemplateRows: '65px 50px 45px', // On définit la hauteur exacte de chaque ligne
    justifyItems: 'center',       // Centre horizontalement
    alignContent: 'start',        // Aligne au sommet
    gap: '20px',
    height: '280px',              // Hauteur fixe totale (boutons + gaps + padding)
    minHeight: '280px',
    width: '100%',
    boxSizing: 'border-box',
    contain: 'strict',            // Bloque tout recalcul du navigateur
    overflow: 'hidden'
  }}>

  <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. On active l'affichage
    setShowCardBurger(true);

    // 2. Fonction de scroll synchronisée
    const performScroll = () => {
      const el = document.getElementById("sec-burgers");
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        // Si l'élément n'est pas encore là, on réessaie au prochain cycle
        requestAnimationFrame(performScroll);
      }
    };

    // On lance la boucle de recherche dès que React a traité la mise à jour
    requestAnimationFrame(performScroll);
  }}
  className="gold-button-premium"
  style={{ width: '90%', maxWidth: '400px', fontSize: '1.3rem', height: '65px', margin: 0 }}
>
  🚀 {T[lang]?.btnOrder || T.es.btnOrder}
</button>

    <button
      onClick={() => window.open("https://app.tableo.com/widget/la-casa-de-burger-hamburguesa-gourmet-torrevieja-hamburgueseria-casero-best-burger-in-town-spain?bgColor=%23ff0000&textColor=%23000000&googleFont=Police+par+d%C3%A9faut&fontSize=14&cornerStyle=none&textAlignment=left&formControlBgColor=%23ffffff&formControlColor=%23000000&formControlBorderColor=%23444444&formControlBorderShadow=6&formControlBorderWidth=1&formControlBorderOpacity=0.1&buttonBgColor=%23000000&buttonTextColor=%23ffffff")}
      className="gold-button-premium"
      style={{ width: '80%', maxWidth: '350px', fontSize: '1rem', height: '50px', margin: 0 }}
    >
      📅 RESERVAR MESA
    </button>

    <a href="tel:+34602597210" className="gold-button-premium" style={{
        width: '70%', maxWidth: '300px', height: '45px', fontSize: '0.9rem',
        background: '#fff', color: '#000', textDecoration: 'none', margin: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        📞 {T[lang]?.btnCall || T.es.btnCall}
    </a>
  </div>
  </div>
</header>
<main className="menu-page-container" style={{ minHeight: '100vh' }}>
  <Suspense fallback={
    <div style={{ textAlign: 'center', padding: '100px', background: 'black', minHeight: '80vh' }}>
      <div className="product-price" style={{ fontSize: '1.5rem' }}>CARGANDO MENÚ GOURMET...</div>
    </div>
  }>

    {/* SECTION BURGERS */}
    <section id="sec-burgers" style={{ marginTop: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '450px' }}>
      <SectionTitle>{T[lang]?.catBurgers || T.es.catBurgers}</SectionTitle>
      {showCardBurger ? (
        <div className="grid-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', width: '100%', padding: '15px', maxWidth: '1200px' }}>
          {burgers.map(item => (
            <CardMenu key={item.id} {...item} addToCart={addToCart} lang={lang} hasExtras={!noExtrasIds.includes(item.id)} />
          ))}
        </div>
      ) : (
        <div className="promo-container" onClick={() => {
          setShowCardBurger(true);
          setTimeout(() => {
            const el = document.getElementById("sec-burgers");
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
          }, 150);
        }}>
          <img
            src="/Burger.webp"
            className="promo-img"
            alt="Burger"
            width="600"
            height="336"
            style={{ width: '600px', height: '336px', display: 'block', objectFit: 'cover' }}
          />
          <button className="category-btn-overlay">{T[lang]?.catBurgers || T.es.catBurgers} ➔</button>
        </div>
      )}
    </section>

    {/* SECTION BEBIDAS */}
    <section id="sec-bebidas" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '450px' }}>
      <SectionTitle>{T[lang]?.catDrinks || T.es.catDrinks}</SectionTitle>
      {showCardDrink ? (
        <div className="grid-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', width: '100%', padding: '15px', maxWidth: '1200px' }}>
          {drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={addToCart} lang={lang} />)}
        </div>
      ) : (
        <div className="promo-container" onClick={() => {
          setShowCardDrink(true);
          setTimeout(() => {
            const el = document.getElementById("sec-bebidas");
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
          }, 150);
        }}>
          <img
            src="/Drink.webp"
            className="promo-img"
            alt="Bebidas"
            width="600"
            height="336"
            style={{ width: '600px', height: '336px', display: 'block', objectFit: 'cover' }}
          />
          <button className="category-btn-overlay">{T[lang]?.catDrinks || T.es.catDrinks} ➔</button>
        </div>
      )}
    </section>

    {/* SECTION POSTRES */}
    <section id="sec-postres" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '20px', minHeight: '450px' }}>
      <SectionTitle>{T[lang]?.catDesserts || "POSTRES"}</SectionTitle>
      {showCardPostres ? (
        <div className="grid-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', width: '100%', padding: '15px', maxWidth: '1200px' }}>
          {postres && postres.length > 0 ? (
            postres.map(item => (
              <CardMenu key={item.id} {...item} addToCart={addToCart} lang={lang} isPostreCard={true} />
            ))
          ) : (
            <p style={{ color: '#fff' }}>Cargando delicias...</p>
          )}
        </div>
      ) : (
        <div className="promo-container" onClick={() => {
          setShowCardPostres(true);
          setTimeout(() => {
            const el = document.getElementById("sec-postres");
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
          }, 150);
        }}>
          <img
            src="/Postre.webp"
            className="promo-img"
            alt="Postres"
            width="600"
            height="336"
            style={{ width: '600px', height: '336px', display: 'block', objectFit: 'cover' }}
          />
          <button className="category-btn-overlay">{T[lang]?.catDesserts || "POSTRES"} ➔</button>
        </div>
      )}
    </section>

    {/* SECTION COMMANDE */}
    <section id="order" style={{ paddingBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '200px' }}>
      <SectionTitle>{lang === 'es' ? 'Tu Pedido' : lang === 'fr' ? 'Votre Commande' : 'Your Order'}</SectionTitle>
      <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
    </section>

    {/* --- BOUTON DE NAVIGATION RAPIDE CORRIGÉ --- */}
  {(showCardBurger || showCardDrink || showCardPostres) && (
    <button
      type="button"
      className="floating-close"
      onClick={() => {
        if (showCardBurger) {
          setShowCardBurger(false);
          setShowCardDrink(true);
          requestAnimationFrame(() => {
            document.getElementById('sec-bebidas')?.scrollIntoView({ behavior: 'smooth' });
          });
        } else if (showCardDrink) {
          setShowCardDrink(false);
          setShowCardPostres(true);
          requestAnimationFrame(() => {
            document.getElementById('sec-postres')?.scrollIntoView({ behavior: 'smooth' });
          });
        } else {
          setShowCardPostres(false);
          requestAnimationFrame(() => {
            document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
          });
        }
      }}
      style={{
        position: 'fixed',
        bottom: '95px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#ff4757',
        color: '#fff',
        width: '280px',
        height: '60px',
        borderRadius: '12px',
        fontWeight: '950',
        zIndex: 10000,
        border: '3px solid #000',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
      }}
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
    <section style={{ padding: '20px 0 80px', minHeight: '400px' }}>
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
      <div className="map-container" style={{ width: '100%', maxWidth: '1100px', borderRadius: '15px', overflow: 'hidden', minHeight: '350px' }}>
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
              {lang === 'es' ? 'Cargando ubicación...has clic aqui' :
               lang === 'en' ? 'Loading location...push here to open the Maps' :
               lang === 'fr' ? 'Chargement de l\'emplacement...Clique ici pour voir la Maps' :
               'Cargando ubicación...Has clic Aqui'}
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
              height: '66px',
              aspectRatio: '118 / 66',
              imageRendering: 'auto'
            }}
          />
        </a>
        <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja" target="_blank" rel="noreferrer">
          <img
            src={tripadvisor}
            width="169"
            height="127"
            alt="Tripadvisor"
            loading="lazy"
            decoding="async"
            style={{
              objectFit: 'contain',
              width: '110px',
              height: 'auto',
              aspectRatio: '169 / 127'
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

              <p><strong>🇪🇸 ESPAÑOL:</strong> <strong>La Casa de Burger</strong> – Tu hamburguesa y Tu hamburguesería de referencia, el mejor restaurante de <strong>burger en Torrevieja</strong>. Especialistas en <strong>Burger Gourmet de Autor</strong> y <strong>Smash Burgers</strong> 100% artesanal con carne picada a diario. Opciones <strong>Halal y Vegetarianas (bajo reserva)</strong>. Disfruta de nuestra terraza y fácil aparcamiento. Servicio a domicilio (delivery) en todo Torrevieja.</p>

              <p><strong>🇬🇧 ENGLISH:</strong> <strong>Best burgers in Torrevieja</strong>. Specialists in 100% artisan <strong>Gourmet Burgers</strong> and <strong>Smash Burgers</strong> with freshly minced beef. <strong>Halal and Vegetarian options available (on request)</strong>. Enjoy our terrace and easy parking near the city center.</p>

              <p><strong>🇳🇴 NORSK:</strong> <strong>Beste burger i Torrevieja</strong>. 100% håndlagde <strong>Signature Burgers</strong> og <strong>Smash Burgers</strong>. <strong>Halal og vegetariske alternativer (ved bestilling)</strong>. Vi har terrasse og enkel parkering i nærheten av havnen.</p>

              <p><strong>🇵🇱 POLSKI:</strong> <strong>Najlepsze burgery w Torrevieja</strong>. Specjalność: 100% rzemieślnicze <strong>Signature Burgers</strong> i <strong>Smash Burgers</strong>. <strong>Opcje Halal i wegetariańskie (na zamówienie)</strong>. Zapraszamy na nasz taras i łatwy parking.</p>

              <p style={{ direction: 'rtl', textAlign: 'right' }}><strong>🇲🇦 ARABIC:</strong> <strong>أفضل مطعم برجر في توريفايجا</strong>. متخصصون في <strong>البرجر الحرفي 100%</strong> و <strong>سماش برجر</strong>. تتوفر <strong>خيارات حلال ونباتية (عند الحجز مسبقاً)</strong>. استمتع بجلساتنا الخارجية (تراس) وسهولة ركن السيارات في وسط المدينة.</p>

              <p><strong>🇺🇦 UKRAINIAN:</strong> <strong>Найкращі гурме-бургери в Торрев'єсі</strong>. 100% крафтові <strong>Signature Burgers</strong> та <strong>Smash Burgers</strong>. <strong>Халяльні та вегетаріанські страви (за попереднім замовленням)</strong>. Є тераса та зручна парковка.</p>

              <p><strong>🇫🇷 FRANÇAIS:</strong> <strong>Meilleur Burger de Torrevieja</strong>. Spécialiste du <strong>Burger Gourmet</strong> et <strong>Smashburger</strong> 100% artisanal. <strong>Options Halal et Végétarien disponibles (sur réservation)</strong>. Profitez de notre terrasse et du parking facile au centre-ville.</p>

              <p><strong>🇷🇺 RUSSIAN:</strong> <strong>Лучшие гурме-бургеры в Торревьехе</strong>. 100% авторские <strong>Gourmet Burgers</strong> и <strong>Smash Burgers</strong>. <strong>Халяльное и вегетарианское меню (по запросу)</strong>. Уютная терраса и удобная парковка рядом с вами.</p>

              <p><strong>🇸🇪 SVENSKA:</strong> <strong>Bästa burgare i Torrevieja</strong>. 100% hantverksmässiga <strong>Gourmet Burgers</strong> och <strong>Smash Burgers</strong>. <strong>Halal och vegetariska alternativ (vid bokning)</strong>. Vi erbjuder terrass och smidig parkering.</p>

              <p><strong>🇩🇪 DEUTSCH:</strong> <strong>Beste Burger in Torrevieja</strong>. 100% handgemachte <strong>Gourmet Burgers</strong> und <strong>Smash Burgers</strong>. <strong>Halal und vegetarische Optionen (auf Voranmeldung)</strong>. Mit Terrasse und guten Parkmöglichkeiten im Zentrum.</p>

              <p><strong>🇳🇱 NEDERLANDS:</strong> <strong>Beste burgers in Torrevieja</strong>. 100% ambachtelijke <strong>Gourmet Burgers</strong> en <strong>Smash Burgers</strong>. <strong>Halal en vegetarische opties (op aanvraag)</strong>. Geniet van ons terras en gemakkelijk parkeren.</p>

              <div style={{ marginTop: '25px', borderTop: '1px solid #222', paddingTop: '25px' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Especialistas en <span style={{ color: '#FFD700' }}>Hamburguesas de alta calidad</span> & <span style={{ color: '#FFD700' }}>Smash Burgers</span>
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

        {/* --- FOOTER FINAL UNIQUE --- */}
      <footer style={{
        padding: '60px 20px 100px', // On augmente le padding bas pour laisser de la place au bouton flottant
        textAlign: 'center',
        backgroundColor: '#050505',
        borderTop: '4px solid #ff5e6c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        marginTop: '50px',
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
              {lang === 'es' ? 'Especialistas en Hamburguesas y Hamburguesas Gourmet de autor.' : 'Specialists in Hamburguesas Gourmet & Smash Burgers.'}
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FFD700', marginBottom: '15px' }}>🕒 {T[lang]?.hours || T.es.hours}</h4>
            <p style={{ margin: '8px 0' }}>Lun - Sáb: 13:00 – 23:00</p>
            <p style={{ margin: '8px 0', color: '#AAAAAA' }}>Dom: Cerrado</p>
          </div>

          <div>
            <h4 style={{ color: '#FFD700', marginBottom: '15px' }}>📍 {T[lang]?.location || T.es.location}</h4>
            <p style={{ margin: '8px 0' }}>Av. Diego Ramírez Pastor, 142</p>
            <p>📞 <a href="tel:+34602597210" style={{ color: '#ffffff', fontWeight: 'bold' }}>+34 602 59 72 10</a></p>
          </div>
        </div>

        <div style={{ color: '#AAAAAA', fontSize: '0.85rem', marginTop: '20px' }}>
          <p>© {new Date().getFullYear()} LA CASA DE BURGER | THE ARTISAN EXPERIENCE</p>
        </div>
      </footer>

      {/* --- ÉLÉMENTS FLOTTANTS --- */}
      <a href="https://wa.me/34602597210" target="_blank" rel="noopener noreferrer" className="whatsapp-float" style={{ position: 'fixed', bottom: '25px', right: '20px', zIndex: 99999 }}>
        <img src={whatsappIcon} width="60" height="60" alt="WhatsApp" style={{ animation: 'wobble-inverse 3s infinite ease-in-out' }} />
      </a>

      {/* BOUTON DE NAVIGATION RAPIDE (Correction du nom showCardpostre) */}
      {(showCardBurger || showCardDrink || showCardPostres ) && (
        <button className="floating-close" onClick={handleNextStep} style={{ position: 'fixed', bottom: '95px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ff4757', color: '#fff', width: '280px', height: '60px', borderRadius: '12px', fontWeight: '950', zIndex: 10000, border: '3px solid #000', cursor: 'pointer' }}>
          <span>
            {showCardBurger && (lang === 'en' ? 'NEXT: DRINKS ➔' : 'SIGUIENTE: BEBIDAS ➔')}
            {showCardDrink && (lang === 'en' ? 'NEXT: DESSERTS ➔' : 'SIGUIENTE: POSTRES ➔')}
            {showCardPostres && (lang === 'en' ? 'VIEW ORDER ➔' : 'VER MI PEDIDO ➔')}
          </span>
        </button>
      )}

    </div> // Fermeture du container principal (menu-page-container ?)
    );
  };
