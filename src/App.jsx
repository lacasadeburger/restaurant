import React, { useState, useEffect, useMemo } from "react";
import Nav from "./Nav";
import Order from "./Order";
import CardMenu from "./CardMenu";
import data from "./data";
import { Helmet } from "react-helmet"

// --- ASSETS (Vérifiés) ---
import fb from "./assets/FB.png";
import Postre from "./assets/postre.webp";
import Burger from "./assets/burger.webp";
import Drink from "./assets/drink.webp";
import tripadvisor from "./assets/tripadvisor.png";
import googleIcon from "./assets/google.png";
import logo from "./assets/logo.webp";
import BurgerSignature from "/burger-signature-torrevieja.webp";
import insta from "./assets/instagram.png";
import whatsappIcon from "/wha2026.webp";


const T = {
  es: {
    heroTitle: "La Mejor Hamburguesa",
    heroSubtitle: "Hamburguesería Gourmet : Burgers Gourmet y Smash Burgers con Carne de Ternera Premium",
    btnOrder: "PEDIR A DOMICILIO",
    btnCall: "LLAMAR",
    catBurgers: "Burgers Gourmet",
    catDrinks: "Bebidas",
    catDesserts: "Postres Caseros",
    btnSeeMenu: "VER CARTA",
    yourOrder: "Tu Pedido",
    reviewsTitle: "Lo que dicen nuestros clientes",
    footerDesc: "Especialistas en Smash Burgers y Hamburguesas Gourmet de autor. Carne de ternera premium, buey y procesos artesanales.",
    location: "Ubicación",
    hours: "Horario",
    seoTitle: "La mejor Hamburguesería Artesanal de Torrevieja",
    seoContent: "En La Casa de Burger, nos hemos convertido en el referente de las hamburguesas gourmet en Torrevieja. Nuestra pasión por la calidad nos lleva a utilizar exclusivamente carne de ternera premium, buey y pollo, picada diariamente. Especialistas en Smash Burger, pan brioche local y patatas naturales. Opciones Halal, sin gluten y veganas."
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
    footerDesc: "Specialists Signature Gourmet Hamburgers and in Smash Burgers. Premium beef and artisan processes.",
    location: "Location",
    hours: "Hours",
    seoTitle: "The Best Artisan Burger Joint in Torrevieja",
    seoContent: "At La Casa de Burger, we are the benchmark for gourmet burgers in Torrevieja. Passion for quality with premium beef, ox, and chicken. Specialists in Gourmet Burgers, local brioche buns and hand-cut fries. Halal, gluten-free, and vegan options."
  },
  fr: {
    heroTitle: "Le Meilleur Burger",
    heroSubtitle: "Burger Gourmet & Smash Burgers : Viande de Bœuf Premium",
    btnOrder: "COMMANDER",
    btnCall: "APPELER",
    catBurgers: "Burgers Gourmet",
    catDrinks: "Boissons",
    catDesserts: "Desserts Maison",
    btnSeeMenu: "VOIR LA CARTE",
    yourOrder: "Votre Commande",
    reviewsTitle: "L'avis de nos clients",
    footerDesc: "Spécialistes du Smash Burger et Burgers Gourmet. Viande premium et frites maison.",
    location: "Emplacement",
    hours: "Horaires",
    seoTitle: "La meilleure Hamburguérerie Artisanale de Torrevieja",
    seoContent: "À La Casa de Burger, nous sommes la référence des burgers gourmet à Torrevieja. Viande premium, Smash Burgers, pain brioche local et frites maison. Options Halal, sans gluten et véganes disponibles."
  },
  nl: { // Ajout du Néerlandais
    heroTitle: "De Beste Burger",
    heroSubtitle: "Gourmet Burgers & Smash Burgers: Premium Rundvlees",
    btnOrder: "BESTEL NU",
    btnCall: "BELLEN",
    catBurgers: "Gourmet Burgers",
    catDrinks: "Dranken",
    catDesserts: "Huisgemaakte Desserts",
    btnSeeMenu: "ZIE MENU",
    yourOrder: "Jouw Bestelling",
    reviewsTitle: "Wat onze klanten zeggen",
    footerDesc: "Specialisten in Smash Burgers en Gourmet Burgers. Premium rundvlees en ambachtelijke processen.",
    location: "Locatie",
    hours: "Openingstijden",
    seoTitle: "De beste ambachtelijke hamburgertent in Torrevieja",
    seoContent: "Bij La Casa de Burger zijn we de referentie voor gourmetburgers in Torrevieja. Wij gebruiken uitsluitend premium rundvlees. Specialisten in Smash Burgers, lokaal briochebrood en verse frietjes. Halal, glutenvrije en veganistische opties."
  },
  no: {
    heroTitle: "Den Beste Burgeren",
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
    hours: "Åpningstider",
    seoTitle: "Torreviejas beste håndlagde burgerrestaurant",
    seoContent: "På La Casa de Burger er vi referansen for gourmetburgere i Torrevieja. Vi bruker eksklusivt modnet premium storfekjøtt. Spesialister på Smash Burger, lokalt briochebrød og ferske poteter. Halal, glutenfrie og veganske alternativer."
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
    hours: "Godziny otwarcia",
    seoTitle: "Najlepsza rzemieślnicza burgerownia w Torrevieja",
    seoContent: "W La Casa de Burger jesteśmy punktem odniesienia dla burgerów gourmet w Torrevieja. Używamy wyłącznie dojrzewającej wołowiny premium. Specjaliści od Smash Burger, lokalnych bułek brioche i domowych frytek. Opcje Halal, bezglutenowe i wegańskie."
  },
  uk: {
    heroTitle: "Найкращий Бургер",
    heroSubtitle: "Гурме Бургерна: Смеш-бургери та Преміальна Яловичина",
    btnOrder: "ЗАМАВИТИ",
    btnCall: "ДЗВІНОК",
    catBurgers: "Гурме Бургери",
    catDrinks: "Напої",
    catDesserts: "Десерти",
    btnSeeMenu: "МЕНЮ",
    yourOrder: "Замовлення",
    reviewsTitle: "Відгуки",
    footerDesc: "Спеціалісти зі смеш-бургерів та гурме-бургерів. Преміальна яловичина.",
    location: "Локація",
    hours: "Години",
    seoTitle: "Найкраща крафтова бургерна в Торрев'єсі",
    seoContent: "Еталон гурманських бургерів у Торрев'єсі. Витримана яловичина преміум-класу, булочки бріош та натуральна картопля. Халяль, безглютен та веган."
  },
  ru: {
    heroTitle: "Лучший Бургер",
    heroSubtitle: "Гурме Бургерная: Смэш-бургеры и Премиальная Говядина",
    btnOrder: "ЗАКАЗАТЬ",
    btnCall: "ПОЗВОНИТЬ",
    catBurgers: "Гурме Бургеры",
    catDrinks: "Напитки",
    catDesserts: "Десерты",
    btnSeeMenu: "МЕНЮ",
    yourOrder: "Ваш Заказ",
    reviewsTitle: "Отзывы",
    footerDesc: "Специалисты по смэш-бургерам и авторским гурме-бургерам. Премиальная говядина.",
    location: "Локация",
    hours: "График",
    seoTitle: "Лучшая ремесленная бургерная в Торревьехе",
    seoContent: "Эталон изысканных бургеров в Торревьехе. Выдержанная говядина премиум-класса, булочки бриошь и натуральный картофель. Халяль, безглютен и веган."
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
    footerDesc: "متخصصون في السماش برجر وبرجر الغوارميه المميز. لحم بقر معتق وفاخر.",
    location: "الموقع",
    hours: "ساعات العمل",
    seoTitle: "أفضل مطعم برجر حرفي في توريفايجا",
    seoContent: "المرجع الأول للبرجر الفاخر في توريفايجا. نستخدم لحم البقر الممتاز، خبز البريوش المحلي والبطاطس الطبيعية. حلال، خالي من الغلوتين ونباتي."
  },
  sv: {
    heroTitle: "Den Bästa Burgaren",
    heroSubtitle: "Gourmetburgare & Smashburgers: Premium Nötkött",
    btnOrder: "BESTÄLL",
    btnCall: "RING",
    catBurgers: "Gourmetburgare",
    catDrinks: "Drycker",
    catDesserts: "Efterrätter",
    btnSeeMenu: "VISA MENY",
    yourOrder: "Din Beställning",
    reviewsTitle: "Recensioner",
    footerDesc: "Specialister på Smash Burgers och gourmetburgare. Premium hängmörat nötkött.",
    location: "Plats",
    hours: "Öppettider",
    seoTitle: "Torreviejas bästa hantverksburgare",
    seoContent: "Ledande inom gourmetburgare i Torrevieja. Vi använder exklusivt mognat premiumkött. Smash Burgers, lokalt briochebröd och handskuren potatis. Halal, glutenfritt och vegan."
  },
  de: {
    heroTitle: "Der Beste Burger",
    heroSubtitle: "Gourmet Burger Laden: Smash Burgers & Premium Rindfleisch",
    btnOrder: "BESTELLEN",
    btnCall: "ANRUFEN",
    catBurgers: "Gourmet Burgers",
    catDrinks: "Getränke",
    catDesserts: "Nachspeisen",
    btnSeeMenu: "MENÜ SEHEN",
    yourOrder: "Ihre Bestellung",
    reviewsTitle: "Kundenstimmen",
    footerDesc: "Spezialisten für Smash Burgers und Gourmet-Burgers. Premium Rindfleisch.",
    location: "Standort",
    hours: "Öffnungszeiten",
    seoTitle: "Das beste handgemachte Burger-Restaurant in Torrevieja",
    seoContent: "Der Maßstab für Gourmet-Burger in Torrevieja. Erstklassiges Rindfleisch, Smash Burger, lokales Brioche. Halal, glutenfrei und vegane Optionen."
  },
  ro: {
    heroTitle: "Cel Mai Bun Burger",
    heroSubtitle: "Gourmet Burger: Smash Burgers și Carne de Vită Premium",
    btnOrder: "COMANDEAZĂ",
    btnCall: "SUNĂ",
    catBurgers: "Burgeri Gourmet",
    catDrinks: "Băuturi",
    catDesserts: "Deserturi",
    btnSeeMenu: "VEZI MENIUL",
    yourOrder: "Comanda Ta",
    reviewsTitle: "Recenzii",
    footerDesc: "Specialiști în Smash Burgers și burgeri gourmet. Carne de vită maturată premium.",
    location: "Locație",
    hours: "Program",
    seoTitle: "Cea mai bună burgerie artizanală din Torrevieja",
    seoContent: "Punctul de referință pentru burgeri gourmet în Torrevieja. Carne de vită maturată premium, Smash Burger, chifle brioche locale. Opțiuni Halal, fără gluten și vegane."
  }
};

const instagramIcon = "/instagram.png";

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

  const [loadMedia, setLoadMedia] = useState(false); // Pour YouTube (Manuel)
const [loadMaps, setLoadMaps] = useState(false);   // Pour Google Maps (Auto-différé)

// --- 2. GESTION DE LA LANGUE + CHARGEMENT DIFFÉRÉ MAPS ---
useEffect(() => {
  // Gestion Langue
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');

  if (urlLang && T[urlLang]) {
    setLang(urlLang);
  } else {
    const browserLang = navigator.language || navigator.userLanguage;
    const code = browserLang.substring(0, 2).toLowerCase();
    setLang(T[code] ? code : 'es');
  }

  // CHARGEMENT DE LA CARTE (1 seconde après l'arrivée sur le site)
  // On utilise un timer court pour ne pas bloquer le score initial de Google
  const mapsTimer = setTimeout(() => {
    setLoadMaps(true);
  }, 1000);

  return () => clearTimeout(mapsTimer); // Nettoyage propre du timer
}, []); // Fermeture parfaite du useEffect
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

  const burgers = useMemo(() => data.filter(i => i.category === "food"), []);
  const drinks = useMemo(() => data.filter(i => i.category === "drink"), []);
  const postres = useMemo(() => data.filter(i => i.category === "postre"), []);

  const GOLD_BRIGHT = "#FFD700";
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_SHADOW = "0 4px 15px rgba(255, 215, 0, 0.3)";

  return (
    <div className="app-main-wrapper" style={{ position: 'relative', backgroundColor: '#111', color: '#fff' }}>
    <style>{`
        /* 1. STRUCTURE & GRID */
        html, body { max-width: 100%; overflow-x: hidden; margin: 0; padding: 0; }

        .grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 360px));
          gap: 30px;
          padding: 20px;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          justify-content: center;
        }

        .grid-cards > div {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* 2. LOGO ET NAVIGATION */
        .logo-container-wrapper {
          position: absolute;
          top: 150px;
          left: 35px;
          z-index: 101;
          animation: wobble-inverse 5s infinite ease-in-out;
        }
        .moving-header-logo { height: auto; transition: 0.3s; }

        /* 3. TITRES ET DESCRIPTIONS */
        .card-title {
          text-align: center;
          width: 100%;
          margin: 15px 0 10px;
          font-size: 1.4rem;
          text-transform: uppercase;
          background: linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
          letter-spacing: 1px;
          display: block;
        }

        .card-description {
          text-align: center;
          color: #ccc;
          font-size: 0.85rem;
          margin-bottom: 20px;
          line-height: 1.5;
          padding: 0 15px;
          min-height: 45px;
        }

        /* 4. BOUTONS PREMIUM & EFFETS */
        .gold-button-premium {
          background: linear-gradient(135deg, #BF953F, #FCF6BA, #D4AF37, #FBF5B7, #BF953F) !important;
          background-size: 200% 200% !important;
          animation: liquidGold 4s ease infinite !important;
          color: #000 !important;
          font-weight: 950 !important;
          border: none;
          border-radius: 12px;
          padding: 15px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          margin-top: auto;
        }

        .gold-button-premium::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -150%;
          width: 50%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: rotate(25deg);
          animation: mirrorReflection 4s infinite;
        }

        /* 5. BLOC OPTIONS */
        .options-box {
          display: flex; flex-direction: column; align-items: center;
          gap: 8px; margin: 15px 0; padding: 10px;
          background: rgba(0,0,0,0.4); border-radius: 12px;
        }
        .chips-container { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; width: 100%; }
        .option-group-label { font-size: 0.75rem; text-transform: uppercase; color: #BF953F; letter-spacing: 1.5px; font-weight: bold; }

        /* 6. WHATSAPP & BADGE #1 */
        .whatsapp-float {
          position: fixed;
          bottom: 25px;
          right: 25px;
          z-index: 9999;
          transition: transform 0.3s ease;
        }
        .whatsapp-float img { width: 100px; height: 100px; filter: drop-shadow(0 4px 15px rgba(0,0,0,0.4)); }
        .whatsapp-float:hover { transform: scale(1.1); }

        .wobble-badge-container {
          position: absolute !important;
          top: 150px !important;
          right: 20px !important;
          z-index: 10000 !important;
          pointer-events: none;
          display: flex !important;
          justify-content: flex-end !important;
        }

        .wobble-badge.gold-button-premium {
          pointer-events: auto;
          display: inline-block !important;
          width: auto !important;
          padding: 10px 18px !important;
          font-size: 0.8rem !important;
          border-radius: 50px !important;
          border: 1px solid #FCF6BA !important;
          animation: liquidGold 4s infinite, wobble-badge 3s infinite ease-in-out !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.5) !important;
          white-space: nowrap;
        }

        /* 7. CATEGORIES OVERLAY (POUR BURGERS, BEBIDAS, POSTRES) */
        .promo-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto 30px;
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid #BF953F;
          background: #000;
          /* On ajuste la hauteur pour le ratio 600x336 */
          height: 336px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .promo-img {
          width: 100%;
          height: 100%;
          /* 'contain' pour ne rien couper, 'cover' si tu veux remplir tout le cadre */
          object-fit: contain;
          opacity: 0.75;
          transition: 0.3s ease;
        }

        .promo-container:hover .promo-img {
          opacity: 1;
          transform: scale(1.03); /* Petit effet de zoom élégant au survol */
        }

        /* LE BOUTON SUR L'IMAGE */
        .btn-overlay {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: auto !important;
          min-width: 180px;
          padding: 12px 20px !important;
          font-size: 0.9rem !important;
          pointer-events: none;
          box-shadow: 0 5px 20px rgba(0,0,0,0.8) !important;
          border-radius: 50px !important; /* Bouton arrondi pour un look plus moderne */
        }

        @media (max-width: 768px) {
          .promo-container {
            height: auto;
            aspect-ratio: 600 / 336; /* Maintient le ratio parfait sur mobile */
            width: 92%;
          }
          .btn-overlay {
            bottom: 15px;
            min-width: 140px;
            font-size: 0.75rem !important;
          }
        }
        /* 8. ANIMATIONS */
        @keyframes liquidGold { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes mirrorReflection { 0% { transform: translateX(-200%) rotate(25deg); } 100% { transform: translateX(200%) rotate(25deg); } }
        @keyframes wobble-badge { 0% { transform: rotate(4deg); } 50% { transform: rotate(-4deg) scale(1.05); } 100% { transform: rotate(4deg); } }
        @keyframes wobble-inverse { 0% { transform: rotate(-4deg); } 50% { transform: rotate(4deg) scale(1.02); } 100% { transform: rotate(-4deg); } }

        /* 9. IMAGES DES PRODUITS */
        .card-menu-image-container {
          width: 100%;
          height: 230px;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 12px 12px 0 0;
        }
        .card-menu-image-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 5px;
        }

        /* 10. MAP CONTAINER */
        .map-container {
          margin: 30px auto;
          width: 90%;
          max-width: 1100px;
          height: 350px;
          background-color: #050505;
          border-radius: 15px;
          overflow: hidden;
          border: 2px solid #BF953F;
          box-shadow: 0 8px 25px rgba(0,0,0,0.5);
        }

        /* RESPONSIVE MOBILE */
        @media (max-width: 768px) {
          .logo-container-wrapper { top: 220px !important; left: 15px !important; }
          .moving-header-logo { width: 110px !important; }
          .grid-cards { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
          .whatsapp-float img { width: 70px; height: 70px; }
          .promo-container { height: 250px; }
          .btn-category-overlay { font-size: 0.65rem !important; padding: 8px 3px !important; }
        }
        /* BADGES DE PROMOTION (NUEVO / TOP) */
      .badge-promo {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 20;
        padding: 5px 12px;
        border-radius: 50px;
        font-size: 0.7rem;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #000;
        background: linear-gradient(135deg, #FCF6BA, #BF953F); /* Or dégradé */
        box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        border: 1px solid rgba(255,255,255,0.3);
        pointer-events: none;
      }

      /* Animation discrète pour attirer l'oeil sur le badge */
      .badge-promo {
        animation: pulse-badge 2s infinite;
      }

      @keyframes pulse-badge {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
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

<header style={{
  padding: '85px 20px 80px',
  textAlign: 'center',
  position: 'relative',
  borderRadius: '0 0 50px 50px',
  borderBottom: `5px solid #ff4757`,
  overflow: 'hidden'
}}>
  <img
    src={BurgerSignature}
    alt="La mejor hamburguesa gourmet de Torrevieja - La Casa de Burger"
    fetchPriority="high"
    loading="eager"
    decoding="sync"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      zIndex: 0
    }}
  />

  {/* Overlay dégradé de l'image (ne pas toucher) */}
<div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
  zIndex: 1
}}></div>

{/* CORRECTION : On utilise le container pour forcer la position à droite */}
<div className="wobble-badge-container">
  <div className="wobble-badge gold-button-premium">
    🏆 #1 BURGER EN TORREVIEJA
  </div>
</div>

  <div style={{ position: 'relative', zIndex: 2 }}>
    <h1 style={{
      fontSize: 'clamp(2rem, 10vw, 3.5rem)',
      fontWeight: '900',
      textTransform: 'uppercase',
      textShadow: '2px 2px 15px rgba(0,0,0,0.9)',
      margin: 0,
      color: '#fff',
      lineHeight: '1.1'
    }}>
      {T[lang]?.heroTitle || T.es.heroTitle}
      <br />
      {
        lang === 'fr' ? 'à Torrevieja' :
        lang === 'en' ? 'in Torrevieja' :
        lang === 'de' ? 'in Torrevieja' :
        lang === 'nl' ? 'in Torrevieja' :
        lang === 'no' ? 'i Torrevieja' :
        lang === 'sv' ? 'i Torrevieja' :
        lang === 'pl' ? 'w Torrevieja' :
        lang === 'uk' ? 'у Торрев’єнті' :
        lang === 'ru' ? 'в Торревьехе' :
        lang === 'ar' ? 'في توريفايجا' :
        lang === 'ro' ? 'în Torrevieja' :
        'en Torrevieja'
      }
    </h1>

    <h2 style={{
      fontSize: '1.5rem',
      color: typeof GOLD_BRIGHT !== 'undefined' ? GOLD_BRIGHT : '#FFD700',
      fontWeight: '700',
      textShadow: '1px 1px 10px rgba(0,0,0,1)',
      marginTop: '10px',
      textTransform: 'uppercase'
    }}>
      {T[lang]?.heroSubtitle || T.es.heroSubtitle}
    </h2>

    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <button
        onClick={() => {
          setShowCardBurger(true);
          setTimeout(() => {
            const el = document.getElementById("sec-burgers");
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
        className="pulse-gold-btn gold-button-premium"
        style={{
            color: '#000',
            padding: '22px 50px',
            borderRadius: '50px',
            border: '3px solid #000',
            fontWeight: '950',
            cursor: 'pointer',
            fontSize: '1.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            textTransform: 'uppercase',
            width: '90%',
            maxWidth: '450px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
      >
        🚀 {T[lang]?.btnOrder || T.es.btnOrder}
      </button>

      <button
        onClick={() => window.open("https://app.tableo.com/widget/la-casa-de-burger-hamburguesa-gourmet-torrevieja-hamburgueseria-casero-best-burger-in-town-spain?bgColor=%23ff0000&textColor=%23000000&googleFont=Police+par+d%C3%A9faut&fontSize=14&cornerStyle=none&textAlignment=left&formControlBgColor=%23ffffff&formControlColor=%23000000&formControlBorderColor=%23444444&formControlBorderShadow=6&formControlBorderWidth=1&formControlBorderOpacity=0.1&buttonBgColor=%23000000&buttonTextColor=%23ffffff", "_blank")}
        className="gold-button-premium"
        style={{
          padding: '18px 40px',
          borderRadius: '50px',
          fontSize: '1.3rem',
          width: '90%',
          maxWidth: '450px',
          marginTop: '10px',
          display: 'block'
        }}
      >
        📅 RESERVAR MESA
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '15px', gap: '8px' }}>
        <a
          href="tel:+34602597210"
          aria-label={T[lang]?.btnCall || T.es.btnCall}
          style={{
            background: '#ffffff',
            color: '#000000',
            padding: '14px 30px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '950',
            border: '2px solid #000000',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}
        >
          <span aria-hidden="true">📞</span>
          {T[lang]?.btnCall || T.es.btnCall}
        </a>

        <span
          style={{
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {lang === 'es' ? '¡LLÁMANOS!' : 'CALL US!'}
        </span>
      </div>
    </div>
  </div>
</header>

<main className="menu-page-container">

      <section id="sec-burgers" style={{ marginTop: '05px' }}>
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
            // Utilisation de requestAnimationFrame pour éviter le "Forced Reflow"
            requestAnimationFrame(() => {
              const el = document.getElementById("sec-burgers");
              if (el) {
                window.scrollTo({
                  top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                  behavior: "smooth"
                });
              }
            });
          }} style={{ cursor: 'pointer' }}>

            {/* OPTIMISATION LCP ICI */}
            <img
              src={Burger}
              className="promo-img"
              alt="Mejor Hamburguesa Gourmet"
              fetchpriority="high" // Priorité max
              width="1024"          // Dimensions pour éviter le saut
              height="573"
            />

            <button className="btn-overlay gold-button-premium">
              {T[lang]?.btnSeeMenu || T.es.btnSeeMenu}
            </button>
          </div>
        )}
      </section>

      <section id="sec-bebidas">
        <SectionTitle>{T[lang]?.catDrinks || T.es.catDrinks}</SectionTitle>
        {showCardDrink ? (
          <div className="grid-cards">
            {drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={addToCart} lang={lang} />)}
          </div>
        ) : (
          <div className="promo-container" onClick={() => {
            setShowCardDrink(true);
            // Correction du scroll pour éviter l'ajustement forcé (Reflow)
            requestAnimationFrame(() => {
              const el = document.getElementById("sec-bebidas");
              if (el) {
                window.scrollTo({
                  top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                  behavior: "smooth"
                });
              }
            });
          }} style={{ cursor: 'pointer' }}>

            {/* OPTIMISATION ICI : Lazy loading pour les sections secondaires */}
            <img
              src={Drink}
              className="promo-img"
              alt="Bebidas"
              loading="lazy"      // On charge l'image seulement quand on arrive dessus
              width="600"         // Toujours mettre les dimensions
              height="336"
            />
            <button className="btn-overlay gold-button-premium">{T[lang]?.catDrinks || T.es.catDrinks}</button>
          </div>
        )}
      </section>

      <section id="sec-postres">
      <SectionTitle>{T[lang]?.catDesserts || T.es.catDesserts}</SectionTitle>
      {showCardPostres ? (
        <div className="grid-cards">
          {postres.map(item => <CardMenu key={item.id} {...item} isPostreCard={true} addToCart={addToCart} lang={lang} />)}
        </div>
      ) : (
        <div className="promo-container" onClick={() => {
          setShowCardPostres(true);
          // Correction pour éviter l'ajustement forcé de mise en page (63ms gagnées !)
          requestAnimationFrame(() => {
            const el = document.getElementById("sec-postres");
            if (el) {
              window.scrollTo({
                top: el.getBoundingClientRect().top + window.pageYOffset - 100,
                behavior: "smooth"
              });
            }
          });
        }} style={{ cursor: 'pointer' }}>

          <img
            src={Postre}
            className="promo-img"
            alt="Desserts"
            loading="lazy"      // Indispensable ici pour le score Performance
            width="600"
            height="336"
          />
          <button className="btn-overlay gold-button-premium">{T[lang]?.catDesserts || T.es.catDesserts}</button>
        </div>
      )}
    </section>

  {/* 4. SECTION COMMANDE */}
  <section id="order" style={{ paddingBottom: '60px' }}>
    <SectionTitle>{lang === 'es' ? 'Tu Pedido' : lang === 'fr' ? 'Votre Commande' : 'Your Order'}</SectionTitle>
    <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
  </section>

  {/* 5. TEXTE SEO DYNAMIQUE (Les 11 langues sont ici !) */}
  <section style={{ padding: '40px 20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '20px', marginBottom: '05px', textAlign: lang === 'ar' ? 'right' : 'left', border: '1px solid #222' }}>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: GOLD_BRIGHT, fontSize: '1.6rem', marginBottom: '05px', textAlign: 'center' }}>
        {T[lang]?.seoTitle || T.es.seoTitle}
      </h2>
      <p style={{ lineHeight: '1.8', color: '#ccc', fontSize: '1rem' }}>
        {T[lang]?.seoContent || T.es.seoContent}
      </p>
    </div>
  </section>

  {/* 6. REVIEWS */}
  <section style={{ padding: '20px 0 80px' }}>
    <h3 style={{ color: GOLD_BRIGHT, textTransform: 'uppercase', marginBottom: '30px', textAlign: 'center' }}>
      {T[lang]?.reviewsTitle || T.es.reviewsTitle}
    </h3>
    <div className="grid-reviews" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      {randomReviews.map((rev, index) => (
        <div key={index} className="testimonial-card" style={{ padding: '20px', backgroundColor: '#111', borderRadius: '15px' }}>
          <div style={{ color: GOLD_BRIGHT, marginBottom: '10px' }}>⭐⭐⭐⭐⭐</div>
          <p style={{ fontStyle: 'italic' }}>"{rev[lang] || rev.es}"</p>
          <p style={{ fontWeight: 'bold', marginTop: '10px', color: '#ff4757' }}>— {rev.author}</p>
        </div>
      ))}
    </div>
  </section>
</main>

        {/* FOOTER */}
        <footer style={{ padding: '80px 20px 40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '05px', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px' }}>
              <div>
                <h3 style={{ color: '#ff4757' }}>La Casa de Burger Torrevieja</h3>
                <p>{lang === 'es' ? 'Especialistas en Smash Burgers y Hamburguesas Gourmet de autor. Carne de ternera premium, buey y procesos artesanales.' : 'Specialists Signature Gourmet Hamburgers and in Smash Burgers. Premium beef and artisan processes.'}</p>
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

        {/* SECTION MAPS & VIDEO */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', margin: '40px auto' }}>

{/* BLOC MAPS OPTIMISÉ (NETTOYÉ) */}
<div className="map-container">
  {loadMaps ? (
    <iframe
      /* Ton adresse exacte : Av. Diego Ramírez Pastor, 142 */
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.543213567123!2d-0.6853244!3d37.9877443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63aa36e866a987%3A0x6b864a6f7b9f362!2sAv.%20Diego%20Ram%C3%ADrez%20Pastor%2C%20142%2C%2003181%20Torrevieja%2C%20Alicante!5e0!3m2!1sfr!2ses!4v1700000000000!5m2!1sfr!2ses"
      width="1100"
      height="350"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Ubicación de La Casa de Burger"
    ></iframe>
  ) : (
    <div className="map-placeholder">
      <p>
        {lang === 'es' ? 'Cargando ubicación...' :
         lang === 'en' ? 'Loading location...' :
         lang === 'fr' ? 'Chargement de l\'emplacement...' :
         'Cargando ubicación...'}
      </p>
    </div>
  )}
</div>

{/* 2. BLOC YOUTUBE OPTIMISÉ (Zéro CSS inutile au chargement) */}
<div
  onClick={() => setLoadMedia(true)}
  style={{
    width: '90%',
    maxWidth: '800px',
    height: '400px',
    backgroundColor: '#050505',
    borderRadius: '15px',
    overflow: 'hidden',
    border: `3px solid ${GOLD_BRIGHT || '#BF953F'}`,
    margin: '30px auto',
    cursor: loadMedia ? 'default' : 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    transition: 'transform 0.3s ease'
  }}
  onMouseEnter={(e) => !loadMedia && (e.currentTarget.style.transform = 'scale(1.02)')}
  onMouseLeave={(e) => !loadMedia && (e.currentTarget.style.transform = 'scale(1)')}
>
  {/* PROTECTION RADICALE : L'iframe n'existe PAS si loadMedia est false */}
  {loadMedia === true ? (
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube-nocookie.com/embed/qN6VZYBojLs?autoplay=1&mute=0"
      title="Video de presentación"
      frameBorder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : (
    /* Ce bloc est le seul que Google verra au chargement */
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/favicon.png')`,
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
      }}>
        ▶
      </div>
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
        {lang === 'es' ? 'Ver video gourmet' :
         lang === 'fr' ? 'Voir la vidéo gourmet' :
         'Watch gourmet video'}
      </p>
    </div>
  )}
</div>
</div> {/* Ta fameuse div de fermeture parente que je garde précieusement ! */}
<div style={{
display: 'flex',
justifyContent: 'center',
gap: '25px',
flexWrap: 'wrap',
marginBottom: '20px', // Un peu plus d'espace pour l'équilibre visuel
marginTop: '20px',
alignItems: 'center'
}}>
<a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer">
<img src={fb} width="45" height="45" alt="Facebook" loading="lazy" decoding="async" />
</a>

<a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer">
<img src={instagramIcon} width="45" height="45" alt="Instagram" loading="lazy" decoding="async" />
</a>

<a href="https://www.google.com/search?q=la+casa+de+burger+torrevieja" target="_blank" rel="noreferrer">
<img
src={googleIcon}
width="140"
height="40" // Ajuste la hauteur selon ton logo réel
alt="Google Reviews"
loading="lazy"
decoding="async"
style={{ objectFit: 'contain' }}
/>
</a>

<a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja" target="_blank" rel="noreferrer">
<img
src={tripadvisor}
width="140"
height="40" // Ajuste la hauteur selon ton logo réel
alt="Tripadvisor"
loading="lazy"
decoding="async"
style={{ objectFit: 'contain' }}
/>
</a>
</div>

        {/* BLOC SEO MULTILINGUE (11 LANGUES) */}
        <div style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 20px' }}>
          <div style={{ backgroundColor: '#0a0a0a', padding: '35px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify' }}>
            <div style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
              <p><strong>🇪🇸 ESPAÑOL:</strong> <strong>La Casa de Burger</strong> – Tu <strong>hamburguesería</strong> de referencia y el mejor restaurante de <strong>burger en Torrevieja</strong>. Especialistas en <strong>Smash Burgers</strong>, carne de ternera premium y buey. Si buscas la mejor experiencia de <strong>burger en Torrevieja</strong> (centro, puerto o Playa del Cura) o <strong>comida a domicilio (delivery)</strong>, somos tu elección número uno.</p>
              <p><strong>🇬🇧 ENGLISH:</strong> <strong>Best gourmet burgers in Torrevieja</strong>. We serve authentic <strong>Smash Burgers</strong> and premium aged beef. The highest-rated burger joint for delivery and takeout near the city center and beaches.</p>
              <p><strong>🇳🇴 NORSK:</strong> <strong>Beste gourmetburger i Torrevieja</strong>. Opplev de saftigste <strong>Smash Burgers</strong> med modnet storfekjøtt av høyeste kvalitet. Vi tilbyr hjemlevering i hele Torrevieja.</p>
              <p><strong>🇵🇱 POLSKI:</strong> <strong>Najlepsze burgery gourmet w Torrevieja</strong>. Specjalizujemy się w <strong>Smash Burgers</strong> z sezonowanej wołowiny premium. Zamów z dostawą do domu w Torrevieja i okolicach.</p>
              <p><strong>🇲🇦 ARABIC:</strong> <strong>أفضل مطعم برجر في توريفايجا</strong>. متخصصون في برجر سماش ولحم البقر المعتق الفاخر. استمتع بألذ برجر حرفي مع خدمة التوصيل في جميع أنحاء المدينة.</p>
              <p><strong>🇺🇦 UKRAINIAN:</strong> <strong>Найкращі гурме-бургери в Торрев'єсі</strong>. Наші <strong>Smash Burgers</strong> виготовлені з преміальної витриманої яловичини. Найкращий вибір для доставки їжі додому.</p>
              <p><strong>🇫🇷 FRANÇAIS:</strong> <strong>Meilleur Burger Gourmet Torrevieja</strong>. Spécialiste du <strong>Smash Burger</strong> et de la viande de bœuf premium. Livraison à domicile disponible pour le meilleur burger artisanal de la ville.</p>
              <p><strong>🇷🇺 RUSSIAN:</strong> <strong>Лучшие гурме-бургеры в Торревьехе</strong>. Мы готовим аутентичные <strong>Smash Burgers</strong> из выдержанной говядины премиум-класса. Заказывайте доставку прямо сейчас.</p>
              <p><strong>🇸🇪 SVENSKA:</strong> <strong>Bästa gourmetburgare i Torrevieja</strong>. Vi erbjuder <strong>Smash Burgers</strong> av högsta kvalitet med hängmörat nötkött. Den mest populära burgarrestaurangen för delivery.</p>
              <p><strong>🇩🇪 DEUTSCH:</strong> <strong>Beste Gourmet-Burger in Torrevieja</strong>. Spezialisiert auf <strong>Smash Burgers</strong> und erstklassiges gereiftes Rindfleisch. Genießen Sie handwerkliche Qualität direkt bei Ihnen zu Hause.</p>
              <p><strong>🇳🇱 NEDERLANDS:</strong> <strong>Beste gourmet burgers in Torrevieja</strong>. Authentieke <strong>Smash Burgers</strong> met premium gerijpt rundvlees. De beste keuze voor bezorging in Torrevieja.</p>

              <div style={{ marginTop: '05px', fontSize: '0.85rem', color: '#bbb', lineHeight: '1.6' }}>
                <strong>📍 ZONAS DE REPARTO / DELIVERY AREAS:</strong>
                <br />
                Torrevieja Centro, Playa del Cura, Playa de los Locos, Paseo Marítimo, Puerto, La Mata, Punta Prima, Los Balcones, Aguas Nuevas, La Siesta, El Acequión, La Veleta, San Roque, Rocío del Mar, Los Altos, Lago Jardín, Torreta I, II, III, El Salado, Urbanización Doña Inés, Jardín del Mar, Las Naciones, Centro Comercial Habaneras, Los Almendros, Altos del Limonar, Parque de las Naciones, y todos los hoteles de Torrevieja.
              </div>
            </div>
          </div>
        </div>
        {/* FOOTER FINAL : LOGO + COPYRIGHT */}
        <footer style={{
          padding: '60px 20px 40px',
          textAlign: 'center',
          backgroundColor: '#050505',
          borderTop: '1px solid #1a1a1a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '50px'
        }}>

          {/* LOGO OPTIMISÉ SEO */}
          {logo && (
            <img
              src={logo}
              alt="La Casa de Burger Torrevieja - Hamburguesas Gourmet y Smash Burgers"
              width="150" // Ajoute explicitement la largeur
              height="80"  // Ajoute explicitement la hauteur
              style={{
                height: '80px',
                width: 'auto',
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))',
                marginBottom: '10px'
              }}
            />
          )}

          {/* LIGNE DE SÉPARATION DORÉE */}
          <div style={{
            width: '50px',
            height: '2px',
            background: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)',
            borderRadius: '2px'
          }} aria-hidden="true" />

          {/* COPYRIGHT ET NAVIGATION FOOTER */}
          <div style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#ccc' }}>
              © 2026 LA CASA DE BURGER
            </p>
            <p style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {lang === 'es' ? 'Todos los derechos reservados' :
               lang === 'fr' ? 'Tous droits réservés' :
               'All rights reserved'}
            </p>
          </div>

          {/* ADRESSE PHYSIQUE */}
          <address style={{
            color: '#bbb',
            fontSize: '0.85rem',
            marginTop: '10px',
            fontStyle: 'normal',
            letterSpacing: '0.5px'
          }}>
            Av. Diego Ramírez Pastor, 142 • 03181 Torrevieja, Spain <br/>
            <strong style={{ color: '#fff' }}>The Artisan Burger Experience</strong>
          </address>
        </footer>

        {/* BOUTON WHATSAPP */}
        <a
          href="https://wa.me/34602597210"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label={lang === 'es' ? "Hacer pedido por WhatsApp" : "Order via WhatsApp"}
        >
          <img
            src="/wha2026.webp"
            width="100"
            height="100"
            alt="WhatsApp La Casa de Burger"
            style={{ objectFit: 'contain' }}
            decoding="async"
            loading="lazy"
          />
        </a>
        {/* BOUTON ETAPE SUIVANTE */}
                {(showCardBurger || showCardDrink || showCardPostres) && (
                  <button
                    className="floating-close"
                    onClick={handleNextStep}
                    aria-live="polite"
                    style={{
                      position: 'fixed',
                      bottom: '95px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#ff4757',
                      color: '#fff',
                      width: '280px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      contain: 'layout',
                      borderRadius: '12px',
                      fontWeight: '950',
                      zIndex: 10000,
                      border: '3px solid #000',
                      cursor: 'pointer',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
                      textTransform: 'uppercase',
                      fontSize: '0.9rem'
                    }}
                  >
                    <span style={{ textAlign: 'center' }}>
                      {showCardBurger && (lang === 'en' ? 'NEXT: DRINKS ➔' : 'SIGUIENTE: BEBIDAS ➔')}
                      {showCardDrink && (lang === 'en' ? 'NEXT: DESSERTS ➔' : 'SIGUIENTE: POSTRES ➔')}
                      {showCardPostres && (lang === 'en' ? 'VIEW ORDER ➔' : 'VER MI PEDIDO ➔')}
                      </span>
                      </button>
                    )}
          </div>
        ); // Fermeture du return (JSX)
    } // Fermeture de la fonction App
