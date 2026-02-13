import React, { useState, useEffect, useMemo } from "react";
import Nav from "./Nav";
import Order from "./Order";
import CardMenu from "./CardMenu";
import "./style.css";
import data from "./data";
import { Helmet } from "react-helmet";

// --- ASSETS (Vérifiés) ---
import fb from "./assets/FB.png";
import Postre from "./assets/postre.webp";
import Burger from "./assets/burger.webp";
import Drink from "./assets/drink.webp";
import tripadvisor from "./assets/tripadvisor.png";
import googleIcon from "./assets/google.png";
import logo from "./assets/logo.jpg";
import BurgerSignature from "./assets/burger-signature-torrevieja.webp";

const T = {
  es: {
    heroTitle: "La Mejor Hamburguesa",
    heroSubtitle: "Hamburguesería Gourmet: Burgers Gourmet y Smash Burgers y Carne de Ternera Premium",
    btnOrder: "PEDIR A DOMICILIO",
    btnCall: "LLAMAR",
    catBurgers: "Burgers Gourmet",
    catDrinks: "Bebidas",
    catDesserts: "Postres Caseros",
    btnSeeMenu: "VER CARTA",
    yourOrder: "Tu Pedido",
    reviewsTitle: "Lo que dicen nuestros clientes",
    footerDesc: "Especialistas en Smash Burgers y Hamburguesas Gourmet de autor. Carne de vaca madurada premium, buey y procesos artesanales.",
    location: "Ubicación",
    hours: "Horario"
  },
  en: {
    heroTitle: "The Best Burger",
    heroSubtitle: "Gourmet Burger Joint: Gourmet Burgers, Smash Burgers & Premium Beef",
    btnOrder: "ORDER DELIVERY",
    btnCall: "CALL",
    catBurgers: "Gourmet Burgers",
    catDrinks: "Drinks",
    catDesserts: "Homemade Desserts",
    btnSeeMenu: "SEE MENU",
    yourOrder: "Your Order",
    reviewsTitle: "What our customers say",
    footerDesc: "Specialists in Smash Burgers and Signature Gourmet Hamburgers. Premium matured beef and artisan processes.",
    location: "Location",
    hours: "Hours"
  },
  fr: {
    heroTitle: "Le Meilleur Burger",
    heroSubtitle: "Burger Gourmet & Smash Burgers: Viande de Bœuf Premium",
    btnOrder: "COMMANDER",
    btnCall: "APPELER",
    catBurgers: "Burgers Gourmet",
    catDrinks: "Boissons",
    catDesserts: "Desserts Maison",
    btnSeeMenu: "VOIR LA CARTE",
    yourOrder: "Votre Commande",
    reviewsTitle: "L'avis de nos clients",
    footerDesc: "Spécialistes du Smash Burger et Burgers Gourmet. Viande maturée premium et frites maison.",
    location: "Emplacement",
    hours: "Horaires"
  },
  no: {
    heroTitle: "Den Beste Burgers",
    heroSubtitle: "Gourmetburger & Smashburgers: Premium Storfekjøtt",
    btnOrder: "BESTILL LEVERING",
    btnCall: "RING",
    catBurgers: "Gourmetburgere",
    catDrinks: "Drikke",
    catDesserts: "Hjemmelagde Desserter",
    btnSeeMenu: "SE MENY",
    yourOrder: "Din Bestilling",
    reviewsTitle: "Hva våre kunder sier",
    footerDesc: "Spesialister på Smash Burgers og gourmetburgere. Modnet storfekjøtt og håndverksmessige prosesser.",
    location: "Plassering",
    hours: "Åpningstider"
  },
  pl: {
    heroTitle: "Najlepszy Burger",
    heroSubtitle: "Burgery Gourmet i Smashburgery: Wołowina Premium",
    btnOrder: "ZAMÓW DOSTAWĘ",
    btnCall: "ZADZWOŃ",
    catBurgers: "Burgery Gourmet",
    catDrinks: "Napoje",
    catDesserts: "Domowe Desery",
    btnSeeMenu: "ZOBACZ MENU",
    yourOrder: "Twoje Zamówienie",
    reviewsTitle: "Co mówią nasi klienci",
    footerDesc: "Specjaliści od Smash Burgerów i burgerów rzemieślniczych. Wołowina sezonowana premium.",
    location: "Lokalizacja",
    hours: "Godziny otwarcia"
  },
  uk: {
    heroTitle: "Найкращий Бургер",
    heroSubtitle: "Гурме Бургерна: Смеш-бургери та Преміальна Яловичина",
    btnOrder: "ЗАМОВИТИ ДОСТАВКУ",
    btnCall: "ЗАТЕЛЕФОНУВАТИ",
    catBurgers: "Гурме Бургери",
    catDrinks: "Напої",
    catDesserts: "Домашні Десерти",
    btnSeeMenu: "ПЕРЕГЛЯНУТИ МЕНЮ",
    yourOrder: "Ваше Замовлення",
    reviewsTitle: "Що кажуть наші клієнти",
    footerDesc: "Спеціалісти зі смеш-бургерів та авторських гурме-бургерів. Витримана яловичина преміум-класу.",
    location: "Локація",
    hours: "Графік роботи"
  },
  ru: {
    heroTitle: "Лучший Бургер",
    heroSubtitle: "Гурме Бургерная: Смэш-бургеры и Премиальная Говядина",
    btnOrder: "ЗАКАЗАТЬ ДОСТАВКУ",
    btnCall: "ПОЗВОНИТЬ",
    catBurgers: "Гурме Бургеры",
    catDrinks: "Напитки",
    catDesserts: "Домашние Десерты",
    btnSeeMenu: "ПОСМОТРЕТЬ МЕНЮ",
    yourOrder: "Ваш Заказ",
    reviewsTitle: "Что говорят наши клиенты",
    footerDesc: "Специалисты по смэш-бургерам и авторским гурме-бургерам. Выдержанная говядина премиум-класса.",
    location: "Локация",
    hours: "График работы"
  },
  ar: {
    heroTitle: "أفضل برجر",
    heroSubtitle: "مطعم برجر غوارميه: سماش برجر ولحم بقر مميز",
    btnOrder: "طلب توصيل",
    btnCall: "اتصال",
    catBurgers: "برجر غوارميه",
    catDrinks: "مشروبات",
    catDesserts: "حلويات منزلية",
    btnSeeMenu: "عرض القائمة",
    yourOrder: "طلبك",
    reviewsTitle: "ما يقوله عملاؤنا",
    footerDesc: "متخصصون في السماش برجر وبرجر الغوارميه المميز. لحم بقر معتق وفاخر وعمليات حرفية.",
    location: "الموقع",
    hours: "ساعات العمل"
  },
  sv: {
    heroTitle: "Den Bästa Burgaren",
    heroSubtitle: "Gourmetburgare & Smashburgers: Premium Nötkött",
    btnOrder: "BESTÄLL HEMLEVERANS",
    btnCall: "RING",
    catBurgers: "Gourmetburgare",
    catDrinks: "Drycker",
    catDesserts: "Hemgjorda Efterrätter",
    btnSeeMenu: "VISA MENY",
    yourOrder: "Din Beställning",
    reviewsTitle: "Vad våra kunder säger",
    footerDesc: "Specialister på Smash Burgers och signaturgourmetburgare. Premium hängmörat nötkött.",
    location: "Plats",
    hours: "Öppettider"
  },
  de: {
    heroTitle: "Der Beste Burger",
    heroSubtitle: "Gourmet Burger Laden: Smash Burgers & Premium Rindfleisch",
    btnOrder: "LIEFERUNG BESTELLEN",
    btnCall: "ANRUFEN",
    catBurgers: "Gourmet Burgers",
    catDrinks: "Getränke",
    catDesserts: "Hausgemachte Desserts",
    btnSeeMenu: "MENÜ SEHEN",
    yourOrder: "Ihre Bestellung",
    reviewsTitle: "Was unsere Kunden sagen",
    footerDesc: "Spezialisten für Smash Burgers und Gourmet-Burgers. Premium gereiftes Rindfleisch.",
    location: "Standort",
    hours: "Öffnungszeiten"
    },
    ro: {
      heroTitle: "Cel Mai Bun Burger",
      heroSubtitle: "Gourmet Burger: Smash Burgers și Carne de Vită Premium",
      btnOrder: "COMANDEAZĂ",
      btnCall: "SUNĂ",
      catBurgers: "Burgeri Gourmet",
      catDrinks: "Băuturi",
      catDesserts: "Deserturi Casnice",
      btnSeeMenu: "VEZI MENIUL",
      yourOrder: "Comanda Ta",
      reviewsTitle: "Ce spun clienții noștri",
      footerDesc: "Specialiști în Smash Burgers și burgeri gourmet. Carne de vită maturată premium și procese artizanale.",
      location: "Locație",
      hours: "Program"
    }
};

const instagramIcon = "https://cdn-icons-png.flaticon.com/512/2111/2111463.png";

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
  <header className="menuBurgers" id={id} style={{ margin: '40px 0 20px' }}>
    <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.8rem', color: '#FFD700' }}>{children}</h2>
  </header>
);

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCardPostres, setShowCardPostres] = useState(false);
  const [showCardBurger, setShowCardBurger] = useState(false);
  const [showCardDrink, setShowCardDrink] = useState(false);
  const [lang, setLang] = useState('es');
  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    const code = browserLang.substring(0, 2).toLowerCase(); // On récupère les 2 premières lettres

    const supportedLangs = ['es', 'en', 'fr', 'no', 'sv', 'de', 'pl', 'uk', 'ru', 'ar', 'ro'];

    if (supportedLangs.includes(code)) {
      setLang(code);
    } else {
      setLang('es'); // Par défaut
    }
  }, []);

  // Logic: Calcul du prix total ultra-précis
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const val = item.precio || item.price || 0;
      const numericValue = String(val).replace(/[^0-9.,]/g, "").replace(",", ".");
      return acc + (parseFloat(numericValue) || 0);
    }, 0).toFixed(2);
  }, [cart]);

  const randomReviews = useMemo(() => {
    // On mélange la liste de 10 et on prend les 2 premiers résultats
    return [...ALL_REVIEWS].sort(() => 0.5 - Math.random()).slice(0, 2);
  }, []); // [] signifie que le mélange change seulement quand on rafraîchit la page

  // IDs des produits qui ne doivent PAS avoir d'extras (ajout direct)
    const noExtrasIds = ["prod_nuggets", "prod_croquetas", "prod_fritas", "prod_bravas", "prod_cheddar-bacon"];

    const addToCart = (item) => {
      // Si le produit est dans la liste, on l'ajoute direct sans passer par les options
      // (Cette logique sera utilisée par CardMenu pour savoir s'il doit ouvrir le modal ou non)
      setCart(prev => [...prev, { ...item, uniqueKey: Math.random() }]);
    };
    const removeFromCart = (idx) => setCart(p => p.filter((_, i) => i !== idx));

  // 1. Fonction spécifique pour le panier
  const scrollToOrder = () => {
    const el = document.getElementById("order");
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  // 2. Fonction de scroll universelle
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 110; // Décalage pour ne pas que la Nav cache le titre
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
      // Fonction spécifique pour ouvrir le menu et descendre
      const handleStartOrder = () => {
        setShowCardBurger(true); // On force l'ouverture
        // On attend 150ms que React affiche la section avant de scroller
        setTimeout(() => scrollToId("sec-burgers"), 150);
      };
  const handleNextStep = () => {
    if (showCardBurger) {
      setShowCardBurger(false);
      setShowCardDrink(true);
      // On utilise window.scrollTo pour être sûr que ça remonte au début de la section
      setTimeout(() => {
        const el = document.getElementById("sec-bebidas");
        if(el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      }, 100);
    }
    else if (showCardDrink) {
      setShowCardDrink(false);
      setShowCardPostres(true);
      setTimeout(() => {
        const el = document.getElementById("sec-postres");
        if(el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      }, 100);
    }
    else if (showCardPostres) {
      setShowCardPostres(false);
      setTimeout(() => {
        const el = document.getElementById("order");
        if(el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      }, 100);
    }
  };

  const burgers = data.filter(i => i.category === "food");
  const drinks = data.filter(i => i.category === "drink");
  const postres = data.filter(i => i.category === "postre");

  const GOLD_BRIGHT = "#FFD700";
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_SHADOW = "0 4px 0px #8A6D3B";

  return (
    <div className="app-main-wrapper" style={{ position: 'relative', backgroundColor: '#111', color: '#fff' }}>
      <style>{`
        html, body {
  max-width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

.app-main-wrapper {
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container {
          position: relative; cursor: pointer; display: inline-block; border-radius: 20px;
          overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.8); transition: 0.5s;
          max-width: 500px; width: 100%; margin-bottom: 20px; border: 2px solid rgba(255, 215, 0, 0.3);
        }
        .promo-img { width: 100%; display: block; opacity: 1; transition: 0.5s; }
        .promo-container:hover .promo-img { opacity: 0.7; transform: scale(1.05); }
        .btn-overlay {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: ${GOLD_GRADIENT}; color: #000 !important; padding: 12px 30px; border-radius: 8px; font-weight: 950;
          border: 2px solid #000; pointer-events: none; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.6);
          text-transform: uppercase; z-index: 5; white-space: nowrap;
        }
        .grid-cards {
    display: grid;
    /* Garde tes colonnes automatiques */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    /* CHANGEMENT 1 : On laisse la hauteur s'adapter au contenu de la carte */
    grid-auto-rows: auto;

    /* CHANGEMENT 2 : Aligne les cartes en haut pour éviter qu'elles ne s'étirent par défaut */
    align-items: start;

    gap: 20px;
    justify-content: center;
    padding: 20px 0 120px;
  }
        @keyframes pulse-gold { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
        .pulse-gold-btn { animation: pulse-gold 2s infinite ease-in-out; }
        .pulse-badge { animation: pulse-gold 3s infinite ease-in-out; }

        /* AJOUTE ÇA ICI */
@keyframes wobble-badge {
  0% { transform: rotate(8deg) scale(1.1); }
  50% { transform: rotate(-2deg) scale(1.15); }
  100% { transform: rotate(8deg) scale(1.1); }
}
.wobble-badge { animation: wobble-badge 3s infinite ease-in-out; display: inline-block; }
/* BOUTON WHATSAPP FLOTTANT */
        .whatsapp-float {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background-color: #25d366;
          color: #fff;
          border-radius: 50px;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          z-index: 10001; /* Pour être au-dessus du bouton rouge "Siguiente" */
          transition: transform 0.3s ease;
        }
        .whatsapp-float:hover {
          transform: scale(1.1);
        }

        /* Ajustement pour mobile pour ne pas gêner la navigation */
        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 20px;
            right: 15px;
            width: 55px;
            height: 55px;
          }
        }
      `}</style>

      <Helmet>
  <link rel="preload" as="image" href={BurgerSignature} />
  <title>La Casa de Burger | Hamburguesas Gourmet Artesanales & Recetas Únicas en Torrevieja</title>
  <meta name="description" content="Especialistas en hamburguesas gourmet de autor y recetas artesanales únicas en Torrevieja. Carne premium, pan artesano y nuestras famosas Smashburgers. ¡Pide online!" />
  <meta name="keywords" content="hamburguesería gourmet Torrevieja, burger artesanal, recetas únicas, smash burger torrevieja, comida domicilio torrevieja, takeaway, halal burger torrevieja, gluten free burger" />
  <link rel="canonical" href="https://lacasadeburger.es" />
  <meta name="robots" content="index, follow" />

<link rel="alternate" href="https://lacasadeburger.es" hreflang="es" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="en" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="fr" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="no" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="sv" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="de" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="pl" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="uk" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="ru" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="ar" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="ro" />
<link rel="alternate" href="https://lacasadeburger.es" hreflang="x-default" />

  <meta property="og:type" content="restaurant" />
  <meta property="og:title" content="La Casa de Burger | Hamburguesas Gourmet de Autor" />
  <meta property="og:description" content="No es solo una burger, es una experiencia gourmet. Recetas únicas y artesanales en el corazón de Torrevieja." />
  <meta property="og:image" content="https://lacasadeburger.es/assets/burger-signature-torrevieja.webp" />
  <meta property="og:url" content="https://lacasadeburger.es" />
  <meta property="og:site_name" content="La Casa de Burger" />


  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="La Casa de Burger | Gourmet & Signature Burgers" />
  <meta name="twitter:description" content="Artesanal, Gourmet y Única. Descubre las mejores burgers de Torrevieja." />
  <meta name="twitter:image" content="https://lacasadeburger.es/assets/burger-signature-torrevieja.webp" />

  <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://lacasadeburger.es/#restaurant",
      "name": "La Casa de Burger Torrevieja",
      "image": "https://lacasadeburger.es/assets/burger-signature-torrevieja.webp",
      "logo": "https://lacasadeburger.es/assets/logo.jpg",
      "url": "https://lacasadeburger.es",
      "telephone": "+34602597210",
      "priceRange": "€€",
      "servesCuisine": ["Gourmet Burger", "Smash Burger", "Halal"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Diego Ramírez Pastor, 142",
        "addressLocality": "Torrevieja",
        "postalCode": "03181",
        "addressCountry": "ES"
      },
      "potentialAction": {
        "@type": "OrderAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://lacasadeburger.es/#order",
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
        },
        "deliveryMethod": ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"]
      }
    },
    {
      "@type": "Menu",
      "@id": "https://lacasadeburger.es/#menu",
      "name": "Carta La Casa de Burger",
      "mainEntityOfPage": "https://lacasadeburger.es",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      },
      "hasMenuItem": [
        {
          "@type": "MenuItem",
          "name": "Hamburguesas Gourmet",
          "offers": { "@type": "Offer", "price": "10.00", "priceCurrency": "EUR" }
        }
      ]
    }
  ]
})}
</script>
</Helmet>
<Nav
  scrollToOrder={scrollToOrder}
  cartLength={cart.length}
  totalPrice={totalPrice}
  lang={lang}
  setLang={setLang} // <--- AJOUTE ÇA, sinon cliquer sur les drapeaux ne fera rien !
  logo={logo}
/>
      <header style={{
        padding: '160px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${BurgerSignature})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0 0 50px 50px',
        borderBottom: `5px solid #ff4757`
      }}>
      <div
        className="wobble-badge"
        style={{
          position: 'absolute',
          top: '110px',
          right: '5%',
          background: GOLD_GRADIENT,
          color: '#000',
          padding: '10px 25px',
          borderRadius: '50px',
          fontWeight: '950',
          fontSize: '1.1rem',
          zIndex: 10,
          border: '3px solid #000',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap'
        }}
      >
        🏆 #1 BURGER TORREVIEJA
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
{/* H1 OPTIMISÉ : On place le mot-clé principal "Mejor Hamburguesa" avant le nom de la ville */}
<h1 style={{
  fontSize: 'clamp(2rem, 10vw, 3.5rem)',
  fontWeight: '900',
  textTransform: 'uppercase',
  textShadow: '2px 2px 15px rgba(0,0,0,0.9)',
  margin: 0,
  color: '#fff',
  lineHeight: '1.1'
}}>
  {/* On récupère le titre traduit dans l'objet T */}
  {T[lang]?.heroTitle || T.es.heroTitle}
  <br />
  en Torrevieja
</h1>

<h2 style={{
  fontSize: '1.5rem',
  color: GOLD_BRIGHT,
  fontWeight: '700',
  textShadow: '1px 1px 10px rgba(0,0,0,1)',
  marginTop: '10px',
  textTransform: 'uppercase'
}}>
  {/* On récupère le sous-titre traduit dans l'objet T */}
  {T[lang]?.heroSubtitle || T.es.heroSubtitle}
</h2>

<div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' }}>
<button
  onClick={() => {
    setShowCardBurger(true);
    setTimeout(() => scrollToId("sec-burgers"), 150);
  }}
  className="pulse-gold-btn"
  style={{
    background: GOLD_GRADIENT,
    color: '#000',
    padding: '22px 50px',
    borderRadius: '50px',
    border: '3px solid #000',
    fontWeight: '950',
    cursor: 'pointer',
    fontSize: '1.5rem',
    boxShadow: GOLD_SHADOW, // Assure-toi que GOLD_SHADOW est bien défini en haut
    textTransform: 'uppercase',
    width: '90%',
    maxWidth: '450px'
  }}
>
  🚀 {T[lang]?.btnOrder || T.es.btnOrder}
</button>

<div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '20px' }}>

  {/* AJOUTE CE BOUTON ICI */}
  <button
    onClick={() => scrollToId('sec-burgers')}
    style={{ background: '#fff', color: '#000', padding: '14px 30px', borderRadius: '50px', fontWeight: '950', border: '2px solid #000', cursor: 'pointer' }}
  >
    📖 {T[lang]?.btnSeeMenu || T.es.btnSeeMenu}
  </button>

  <a href="tel:+34602597210" style={{ background: '#fff', color: '#000', padding: '14px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: '950', border: '2px solid #000' }}>
    📞 {T[lang]?.btnCall || T.es.btnCall}
  </a>

  <button onClick={scrollToOrder} style={{ backgroundColor: '#ff4757', color: '#fff', padding: '14px 30px', borderRadius: '50px', border: '2px solid #000', fontWeight: '950', cursor: 'pointer', boxShadow: '0 4px 0px #b33939' }}>
    🛒 {totalPrice}€
  </button>
</div>
</div>
</div>
      </header>
      <main className="menu-page-container">
              {/* Tes sections commencent ici */}
              {showCardBurger && (
                <section id="sec-burgers">
                   <SectionTitle id="sec-burgers-title">{T[lang]?.catBurgers || T.es.catBurgers}</SectionTitle>
                   {/* ... le reste de ta logique burgers */}
                </section>
              )}
        <section style={{ padding: '40px 20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '20px', marginBottom: '40px', textAlign: 'left', border: '1px solid #222' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ color: GOLD_BRIGHT, fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>
              {lang === 'es' ? 'La mejor Hamburguesería Artesanal de Torrevieja' : 'The best Artisan Burger Joint in Torrevieja'}
            </h2>
            <p style={{ lineHeight: '1.8', color: '#ccc', fontSize: '1.05rem' }}>
              {lang === 'es' ? (
                <>
                  En <strong>La Casa de Burger</strong>, nos hemos convertido en el referente de las <strong>hamburguesas gourmet en Torrevieja</strong>.
                  Nuestra pasión por la calidad nos lleva a utilizar exclusivamente <strong>carne de vaca madurada premium</strong>, buey y angus,
                  picada diariamente para ofrecer una textura inigualable. Especialistas en la técnica <strong>Smash Burger</strong>,
                  sellamos cada pieza para lograr un caramelizado perfecto y jugoso. <br/><br/>
                  No solo somos una <strong>hamburguesería cerca de ti</strong>; somos artesanos que utilizan <strong>pan brioche local</strong>
                  y <strong>patatas fritas naturales</strong> cortadas a mano. Si buscas <strong>comida a domicilio en Torrevieja (delivery)</strong>
                  o <strong>take away</strong> con opciones <strong>Halal</strong>, <strong>sin gluten</strong> o veganas,
                  nuestra carta está diseñada para satisfacer a los paladares más exigentes con el mejor rapport calidad-precio.
                </>
              ) : (
                <>
                  At <strong>La Casa de Burger</strong>, we have become the benchmark for <strong>gourmet burgers in Torrevieja</strong>.
                  Our passion for quality leads us to use exclusively <strong>premium matured beef</strong>, ox, and angus,
                  minced daily to offer an unparalleled texture. Specialists in the <strong>Smash Burger</strong> technique,
                  we sear each piece to achieve perfect, juicy caramelization. <br/><br/>
                  We are not just a <strong>burger restaurant near you</strong>; we are artisans using <strong>local brioche buns</strong>
                  and <strong>hand-cut natural fries</strong>. If you are looking for <strong>food delivery in Torrevieja</strong>
                  or <strong>takeaway</strong> with <strong>Halal</strong>, <strong>gluten-free</strong>, or vegan options,
                  our menu is designed to satisfy the most demanding palates with the best value for money.
                </>
              )}
            </p>
          </div>
        </section>


        {/* SECTION BURGERS */}
        <section id="sec-burgers">
          <SectionTitle>{T[lang]?.catBurgers || T.es.catBurgers}</SectionTitle>
          {showCardBurger ? (
            <div className="grid-cards">
              {burgers.map(item => (
                <CardMenu
                  key={item.id}
                  {...item}
                  addToCart={addToCart}
                  lang={lang}
                  hasExtras={!noExtrasIds.includes(item.id)}
                />
              ))}
            </div>
          ) : (
            <div
              className="promo-container"
              onClick={() => {
                setShowCardBurger(true);
                setTimeout(() => {
                  const el = document.getElementById("sec-burgers");
                  if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
                }, 150);
              }}
              style={{ cursor: 'pointer' }}
            >
              <img src={Burger} className="promo-img" alt="Mejor Hamburguesa Gourmet y Smash Burger en Torrevieja" />
              <button className="btn-overlay">{T[lang]?.btnSeeMenu || T.es.btnSeeMenu}</button>
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
            <div
              className="promo-container"
              onClick={() => {
                setShowCardDrink(true);
                setTimeout(() => {
                  const el = document.getElementById("sec-bebidas");
                  if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
                }, 150);
              }}
              style={{ cursor: 'pointer' }}
            >
              <img src={Drink} className="promo-img" alt="Refrescos y bebidas frías" />
              <button className="btn-overlay">{T[lang]?.catDrinks || T.es.catDrinks}</button>
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
            <div
              className="promo-container"
              onClick={() => {
                setShowCardPostres(true);
                setTimeout(() => {
                  const el = document.getElementById("sec-postres");
                  if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
                }, 150);
              }}
              style={{ cursor: 'pointer' }}
            >
              <img src={Postre} className="promo-img" alt="Postres caseros" />
              <button className="btn-overlay">{T[lang]?.catDesserts || T.es.catDesserts}</button>
            </div>
          )}
        </section>

        <section id="order" style={{ paddingBottom: '100px' }}>
          <SectionTitle>{lang === 'es' ? 'Tu Pedido' : lang === 'fr' ? 'Votre Commande' : 'Your Order'}</SectionTitle>
          <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
        </section>

        {/* SECTION REVIEWS */}
              <section style={{ padding: '20px 0 80px' }}>
                <h3 style={{ color: GOLD_BRIGHT, textTransform: 'uppercase', marginBottom: '30px', fontSize: '1.4rem', letterSpacing: '1px' }}>
                  {T[lang]?.reviewsTitle || T.es.reviewsTitle}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left' }}>
                  {randomReviews.map((rev, index) => (
                    <div key={index} className="testimonial-card">
                      <div style={{ color: GOLD_BRIGHT, marginBottom: '10px', fontSize: '1.2rem' }}>⭐⭐⭐⭐⭐</div>
                      <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                        "{rev[lang] || rev.es}"
                      </p>
                      <p style={{ fontWeight: 'bold', marginTop: '10px', color: '#ff4757' }}>— {rev.author}</p>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            <footer style={{ padding: '80px 20px 40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px' }}>
                        <div>
                          <h3 style={{ color: '#ff4757' }}>La Casa de Burger Torrevieja</h3>
                          <p>{lang === 'es' ? 'Especialistas en Smash Burgers y Hamburguesas Gourmet de autor. Carne de vaca madurada premium, buey y procesos artesanales.' : 'Specialists in Smash Burgers and Signature Gourmet Hamburgers. Premium matured beef and artisan processes.'}</p>
                        </div>

                        <div>
                          <h4 style={{ color: GOLD_BRIGHT }}>📍 {T[lang]?.location || T.es.location}</h4>
                          <p>Av. Diego Ramírez Pastor, 142, 03181 Torrevieja</p>
                          <p>📞 <a href="tel:+34602597210" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>+34 602 59 72 10</a></p>
                        </div>

                        <div>
                          <h4 style={{ color: GOLD_BRIGHT }}>🕒 {T[lang]?.hours || T.es.hours}</h4>
                          <p>Lun - Sáb: 13:00 – 22:30 | Dom: Cerrado</p>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', fontSize: '0.8rem', color: '#888' }}>
                        © {new Date().getFullYear()} | {lang === 'es' ? 'EL MEJOR BURGER DE TORREVIEJA' : 'BEST BURGER IN TORREVIEJA'}
                      </div>
                    </div>
                  </footer>

                  {/* BOUTON WHATSAPP */}
                  <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="40" alt="WA" />
                  </a>

                  {/* SECTION MAPS */}
                  <div style={{
                    width: '60%',
                    maxWidth: '1100px',
                    margin: '40px auto',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    border: `2px solid ${GOLD_BRIGHT}`,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    backgroundColor: '#121212',
                    minHeight: '350px',
                    contain: 'paint'
                  }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.626750016147!2d-0.6833227234676118!3d37.98113637193437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63a9b08d9e6633%3A0x88f65fbd84c2f7fe!2sLa%20Casa%20de%20Burger!5e0!3m2!1sfr!2ses!4v1707826000000!5m2!1sfr!2ses"
                      width="100%"
                      height="350"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación La Casa de Burger Torrevieja"
                    ></iframe>
                  </div>

                  {/* SECTION VIDEO */}
                  <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto 50px', borderRadius: '15px', overflow: 'hidden', border: `3px solid ${GOLD_BRIGHT}` }}>
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/qN6VZYBojLs" title="Video de presentación La Casa de Burger" frameBorder="0" allowFullScreen aria-label="Video promocional"></iframe>
                  </div>

                  {/* RÉSEAUX SOCIAUX */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', marginBottom: '40px', alignItems: 'center' }}>
                    <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer" aria-label="Facebook"><img src={fb} width="45" alt="Facebook" /></a>
                    <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src={instagramIcon} width="45" alt="Instagram" /></a>
                    <a href="https://es.restaurantguru.com/La-Casa-de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ background: GOLD_GRADIENT, color: '#000', padding: '12px 25px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', border: '2px solid #000' }}>GURU 2026</a>
                    <a href="https://www.google.com/search?q=la+casa+de+burger+torrevieja" target="_blank" rel="noreferrer" aria-label="Google Business"><img src={googleIcon} width="140" alt="Google Maps" /></a>
                    <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja" target="_blank" rel="noreferrer" aria-label="TripAdvisor"><img src={tripadvisor} width="140" alt="Tripadvisor" /></a>
                  </div>

                  {/* BLOC SEO MULTILINGUE (11 LANGUES) */}
                  <div style={{ backgroundColor: '#0a0a0a', padding: '35px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify' }}>
                    <div style={{ color: '#888', fontSize: '0.8rem', lineHeight: '1.8', margin: 0 }}>
                      <strong>🇪🇸 ESPAÑOL:</strong> <strong>La Casa de Burger</strong> – El <strong>mejor restaurante de hamburguesas gourmet en Torrevieja</strong>. Especialistas en <strong>hamburguesas de autor</strong> preparadas con carne de <strong>ternera premium</strong>, buey y Chicken. Cada <strong>hamburguesa artesanal</strong> se sirve con <strong>salsas caseras</strong> y <strong>patatas fritas naturales</strong>. Si buscas una <strong>Smash Burger</strong> auténtica, somos tu sitio. <strong>Comida a domicilio (delivery)</strong>. <em>Carne Halal, sin gluten.</em>
                      <br /><br />
                      <strong>🇬🇧 ENGLISH:</strong> <strong>Best gourmet burgers in Torrevieja</strong>. <strong>Signature burgers</strong>, <strong>premium beef</strong>, <strong>Smash Burgers</strong>, <strong>food delivery</strong>. <em>Halal meat, Gluten-free.</em>
                      <br /><br />
                      <strong>🇳🇴 NORSK:</strong> <strong>Beste gourmetburger i Torrevieja</strong>. <strong>Signaturburgere</strong>, <strong>modnet storfekjøtt</strong>, <strong>Smash Burgers</strong>, <strong>matlevering</strong>. <em>Halal, glutenfrie.</em>
                      <br /><br />
                      <strong>🇵🇱 POLSKI:</strong> <strong>Najlepsze burgery gourmet w Torrevieja</strong>. <strong>Autorskie burgery</strong>, <strong>sezonowana wołowina</strong>, <strong>Smash Burgers</strong>, <strong>dostawa</strong>. <em>Halal, bezglutenowe.</em>
                      <br /><br />
                      <strong>🇲🇦 ARABIC:</strong> <strong>أفضل مطعم برجر في توريفايجا</strong>. <strong>برجر أصيل</strong>، <strong>لحم حلال</strong>، <strong>سماش برجر</strong>، <strong>توصيل طعام</strong>.
                      <br /><br />
                      <strong>🇺🇦 UKRAINIAN:</strong> <strong>Найкращі гурме-бургери в Торрев'єсі</strong>. <strong>Авторські бургери</strong>, <strong>витримана яловичина</strong>, <strong>смаш-бургери</strong>. <em>Халяль.</em>
                      <br /><br />
                      <strong>🇫🇷 FRANÇAIS:</strong> <strong>Meilleur Burger Gourmet Torrevieja</strong>. <strong>Burgers signatures</strong>, <strong>viande maturée</strong>, <strong>smash burgers</strong>, <strong>livraison</strong>. <em>Halal, Sans Gluten.</em>
                      <br /><br />
                      <strong>🇷🇺 RUSSIAN:</strong> <strong>Лучшие гурме-бургеры в Торревьехе</strong>. Авторские рецепты, <strong>смаш-бургеры</strong>, доставка. <em>Халяль.</em>
                      <br /><br />
                      <strong>🇸🇪 SVENSKA:</strong> <strong>Bästa gourmetburgare i Torrevieja</strong>. <strong>Signaturburgare</strong>, <strong>smash burgers</strong>, matleverans. <em>Halal.</em>
                      <br /><br />
                      <strong>🇩🇪 DEUTSCH:</strong> <strong>Beste Gourmet-Burger in Torrevieja</strong>. <strong>Signature-Burger</strong>, <strong>Premium-Rindfleisch</strong>, <strong>Smash Burger</strong>. <em>Halal.</em>
                      <br /><br />
                      <strong>🇳🇱 NEDERLANDS:</strong> <strong>Beste gourmet burgers in Torrevieja</strong>. <strong>Signature burgers</strong>, <strong>premium rundvlees</strong>, <strong>Smash Burgers</strong>. <em>Halal.</em>

                      <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#bbb', lineHeight: '1.6' }}>
                        <strong>📍 ZONAS DE REPARTO / DELIVERY AREAS:</strong>
                        <br />
                        Torrevieja Centro, Playa del Cura, Playa de los Locos, Paseo Marítimo, Puerto, La Mata, Punta Prima, Los Balcones, Aguas Nuevas, La Siesta, El Acequión, La Veleta, San Roque, Rocío del Mar, Los Altos, Lago Jardín, Torreta I, II, III, El Salado, Urbanización Doña Inés, Jardín del Mar, Las Naciones, Centro Comercial Habaneras, Los Almendros, Altos del Limonar, Parque de las Naciones, y todos los hoteles de Torrevieja.
                      </div>
                    </div>

                    <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                      <div style={{ fontSize: '0.75rem', color: '#555', textAlign: 'center' }}>
                        © 2026 <span style={{ color: GOLD_BRIGHT, fontWeight: 'bold' }}>LA CASA DE BURGER</span> | {lang === 'es' ? 'EL MEJOR BURGER DE TORREVIEJA - TODOS LOS DERECHOS RESERVADOS' : 'BEST BURGER IN TORREVIEJA - ALL RIGHTS RESERVED'}
                      </div>
                    </div>
                  </div>

                  {/* BOUTON ETAPE SUIVANTE */}
                  {(showCardBurger || showCardDrink || showCardPostres) && (
              <button
                className="floating-close"
                onClick={handleNextStep}
                style={{
                  position: 'fixed', bottom: '95px', left: '50%', transform: 'translateX(-50%)',
                  backgroundColor: '#ff4757', color: '#fff', padding: '15px 30px',
                  borderRadius: '12px', fontWeight: '900', zIndex: 10000,
                  border: '3px solid #000', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
                  textTransform: 'uppercase'
                }}
              >
                {showCardBurger && (lang === 'fr' ? 'SUIVANT : BOISSONS ➔' : lang === 'es' ? 'SIGUIENTE: BEBIDAS ➔' : 'NEXT: DRINKS ➔')}
                {showCardDrink && (lang === 'fr' ? 'SUIVANT : DESSERTS ➔' : lang === 'es' ? 'SIGUIENTE: POSTRES ➔' : 'NEXT: DESSERTS ➔')}
                {showCardPostres && (lang === 'fr' ? 'VOIR MON PANIER ➔' : lang === 'es' ? 'VER MI CESTA ➔' : 'VIEW BASKET ➔')}
              </button>
            )}
          </div> {/* Fermeture finale du div SEO multilingue ou du container précédent */}
        </main>

        {/* Les éléments hors du main (Modals, etc.) peuvent aller ici */}

      </div> // Fin de app-main-wrapper
    ); // Fin du return
  } // Fin de la fonction App
