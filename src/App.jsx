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

// --- 2. GESTION DE LA LANGUE + CHARGEMENT INTELLIGENT MAPS ---
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

    // CHARGEMENT DE LA CARTE AU SCROLL (Optimisation Google Insights)
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

    return () => observer.disconnect();
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
                html, body { max-width: 100%; overflow-x: hidden; margin: 0; padding: 0; background-color: #000; }

                h2, .SectionTitle, section h2, section h3 {
                  text-align: center !important;
                  width: 100%;
                  display: block;
                  margin: 40px auto 20px;
                  color: #BF953F;
                  font-weight: 900;
                  text-transform: uppercase;
                }

                .grid-cards {
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(320px, 360px));
                  gap: 30px;
                  padding: 20px;
                  width: 100%;
                  max-width: 1300px;
                  margin: 0 auto;
                  justify-content: center;
                  align-items: stretch;
                }

                .grid-cards > div {
                  display: flex;
                  flex-direction: column;
                  background: #111;
                  border-radius: 12px;
                  overflow: hidden;
                  border: 1px solid rgba(191, 149, 63, 0.1);
                  height: 100%;
                  position: relative;
                }

                /* 2. LOGO */
                .logo-container-wrapper {
                  position: absolute;
                  top: 150px;
                  left: 35px;
                  z-index: 101;
                  animation: wobble-inverse 5s infinite ease-in-out;
                }
                .moving-header-logo { height: auto; transition: 0.3s; width: 150px; }

                /* 3. IMAGES PRODUITS (L'ANTI-DÉCALAGE RADICAL) */
                .card-menu-image-container {
                  width: 100% !important;
                  height: 230px !important;
                  min-height: 230px !important;
                  max-height: 230px !important;
                  background: #000 !important;
                  position: relative !important;
                  overflow: hidden !important;
                  display: block !important; /* Force l'arrêt du comportement flex */
                  padding: 0 !important;
                  margin: 0 !important;
                }

                .card-menu-image-container img {
                  position: absolute !important;
                  top: 50% !important;
                  left: 50% !important;
                  transform: translate(-50%, -50%) !important;
                  width: 100% !important;
                  height: 100% !important;
                  object-fit: cover !important;
                  display: block !important;
                }

                /* 4. TEXTES ET TITRES (VERROUILLÉS) */
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
                  height: 3.5rem !important;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 0 10px;
                }

                .card-description {
                  text-align: center;
                  color: #ccc;
                  font-size: 0.85rem;
                  line-height: 1.5;
                  padding: 0 15px;
                  height: 3.5rem !important;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  margin-bottom: 15px;
                }

                /* 5. BOUTONS PREMIUM */
                .gold-button-premium {
                  background: linear-gradient(135deg, #BF953F, #FCF6BA, #D4AF37, #FBF5B7, #BF953F) !important;
                  background-size: 200% 200% !important;
                  animation: liquidGold 4s ease infinite !important;
                  color: #000 !important;
                  font-weight: 950 !important;
                  border: none !important;
                  border-radius: 12px !important;
                  padding: 15px !important;
                  width: 100% !important;
                  display: flex !important;
                  justify-content: space-between !important;
                  align-items: center !important;
                  margin-top: auto !important;
                  text-transform: uppercase !important;
                }

                /* 6. OPTIONS & EXTRAS */
                .options-box {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 6px;
                  margin: 5px 15px 12px;
                  padding: 8px;
                  background: rgba(0,0,0,0.6);
                  border: 1px solid rgba(191, 149, 63, 0.2);
                  border-radius: 12px;
                  min-height: 90px !important;
                  justify-content: center;
                }

                /* 7. BADGES (FORÇAGE GOLD TOTAL) */
                .wobble-badge-container {
                  position: absolute !important;
                  top: 15px !important;
                  right: 15px !important;
                  z-index: 100 !important; /* Priorité maximale */
                }

                .wobble-badge {
                  /* On écrase TOUT ce qui pourrait rendre le badge blanc ou moche */
                  background: linear-gradient(135deg, #BF953F, #FCF6BA, #D4AF37, #FBF5B7, #BF953F) !important;
                  background-size: 200% 200% !important;
                  animation: liquidGold 4s ease infinite, wobble-badge 3s infinite ease-in-out !important;
                  color: #000 !important;
                  -webkit-text-fill-color: #000 !important; /* Pour certains navigateurs mobiles */
                  font-weight: 950 !important;
                  text-transform: uppercase !important;
                  padding: 8px 15px !important;
                  border-radius: 50px !important;
                  font-size: 0.75rem !important;
                  box-shadow: 0 4px 15px rgba(0,0,0,0.8) !important;
                  border: 1px solid rgba(0,0,0,0.2) !important;
                  display: inline-block !important;
                  visibility: visible !important;
                  opacity: 1 !important;
                }

                /* 8. CATEGORIES OVERLAY */
                .promo-container {
                  position: relative;
                  width: 100%;
                  max-width: 800px;
                  margin: 0 auto 30px;
                  border-radius: 20px;
                  overflow: hidden;
                  border: 2px solid #BF953F;
                  background: #000;
                  height: 336px !important;
                }

                .promo-container a {
                  display: flex !important;
                  align-items: center;
                  justify-content: center;
                  width: 100% !important;
                  height: 100% !important;
                  position: relative;
                  z-index: 2;
                  text-decoration: none;
                }

                .promo-img {
                  position: absolute !important;
                  top: 0; left: 0; width: 100% !important; height: 100% !important;
                  object-fit: cover !important;
                  opacity: 0.5;
                  z-index: 1;
                }

                .promo-container h3 {
                  color: #fff !important;
                  font-size: 2.5rem !important;
                  font-weight: 900 !important;
                  text-shadow: 2px 2px 10px #000 !important;
                }

                /* 9. ANIMATIONS */
                @keyframes liquidGold { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                @keyframes wobble-badge { 0% { transform: rotate(-5deg) scale(1); } 50% { transform: rotate(5deg) scale(1.1); } 100% { transform: rotate(-5deg) scale(1); } }
                @keyframes wobble-inverse { 0% { transform: rotate(-4deg); } 50% { transform: rotate(4deg) scale(1.02); } 100% { transform: rotate(-4deg); } }

                /* 10. RESPONSIVE */
                @media (max-width: 768px) {
                  .card-menu-image-container { height: 180px !important; min-height: 180px !important; }
                  .promo-container { height: 220px !important; width: 92%; }
                  .card-title, .card-description { height: 3rem !important; }
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
          const el = document.getElementById("sec-burgers");
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
        });
      }} style={{ cursor: 'pointer' }}>
        <img src={Burger} className="promo-img" alt="Mejor Hamburguesa Gourmet" fetchpriority="high" width="1024" height="573" />
        <button className="btn-overlay gold-button-premium">{T[lang]?.btnSeeMenu || T.es.btnSeeMenu}</button>
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
          const el = document.getElementById("sec-bebidas");
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
        });
      }} style={{ cursor: 'pointer' }}>
        <img src={Drink} className="promo-img" alt="Bebidas" loading="lazy" width="600" height="336" />
        <button className="btn-overlay gold-button-premium">{T[lang]?.catDrinks || T.es.catDrinks}</button>
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
          const el = document.getElementById("sec-postres");
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
        });
      }} style={{ cursor: 'pointer' }}>
        <img src={Postre} className="promo-img" alt="Desserts" loading="lazy" width="600" height="336" />
        <button className="btn-overlay gold-button-premium">{T[lang]?.catDesserts || T.es.catDesserts}</button>
      </div>
    )}
  </section>

  {/* SECTION COMMANDE */}
  <section id="order" style={{ paddingBottom: '60px' }}>
    <SectionTitle>{lang === 'es' ? 'Tu Pedido' : lang === 'fr' ? 'Votre Commande' : 'Your Order'}</SectionTitle>
    <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
  </section>

  {/* SECTION SEO DYNAMIQUE */}
  <section style={{ padding: '40px 20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '20px', marginBottom: '40px', textAlign: lang === 'ar' ? 'right' : 'left', border: '1px solid #222' }}>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: GOLD_BRIGHT, fontSize: '1.6rem', marginBottom: '15px', textAlign: 'center' }}>
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

          {/* BLOC YOUTUBE OPTIMISÉ */}
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
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/atenta.webp')`,
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: '#000'
              }}>
                <img src="/atenta.webp" alt="" loading="lazy" style={{ display: 'none' }} fetchpriority="low" />
                <div style={{ fontSize: '4.5rem', color: GOLD_BRIGHT || '#BF953F', marginBottom: '10px', filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.8))', lineHeight: 1 }}>▶</div>
                <p style={{ fontSize: '1.1rem', color: GOLD_BRIGHT || '#BF953F', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '900', margin: 0, textAlign: 'center', padding: '0 20px', textShadow: '2px 2px 10px rgba(0,0,0,1)' }}>
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
              <img src={googleIcon} width="140" height="40" alt="Google Reviews" loading="lazy" decoding="async" style={{ objectFit: 'contain' }} />
            </a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja" target="_blank" rel="noreferrer">
              <img src={tripadvisor} width="140" height="40" alt="Tripadvisor" loading="lazy" decoding="async" style={{ objectFit: 'contain' }} />
            </a>
          </div>
        </div>

        {/* --- BLOC SEO MULTILINGUE (LES 11 LANGUES - VERSION COMPLÈTE) --- */}
        <div style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 20px' }}>
          <div style={{ backgroundColor: '#0a0a0a', padding: '35px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify' }}>
            <div style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>

              <p><strong>🇪🇸 ESPAÑOL:</strong> <strong>La Casa de Burger</strong> – Tu hamburguesería de referencia y el mejor restaurante de <strong>burger en Torrevieja</strong>. Especialistas en <strong>Smash Burgers</strong> y <strong>Burger Gourmet Signature</strong> 100% artesanal con carne picada a diario. Opciones <strong>Halal y Vegetarianas (bajo reserva)</strong>. Disfruta de nuestra terraza y fácil aparcamiento. Servicio a domicilio (delivery) en todo Torrevieja.</p>

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

                {/* --- SERVICES & ZONES (DERNIÈRE SECTION DU BLOC SEO) --- */}
                <div style={{ marginTop: '25px', borderTop: '1px solid #222', paddingTop: '25px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Especialistas en <span style={{ color: GOLD_BRIGHT }}>Burger Gourmet Signature</span> & <span style={{ color: GOLD_BRIGHT }}>Smash Burgers</span>
                    </h4>
                    <p style={{ color: '#888', fontSize: '0.85rem', fontStyle: 'italic' }}>
                      Experiencia 100% Artesanal • Carne fresca picada a diario
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '15px 25px', flexWrap: 'wrap', color: GOLD_BRIGHT, fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '20px', justifyContent: 'center' }}>
                    <span>🥩 100% Artesanal</span>
                    <span>☀️ Terraza</span>
                    <span>🚗 Parking fácil</span>
                    <span>🥡 Take Away & Delivery</span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: '#bbb', lineHeight: '1.6', textAlign: 'center' }}>
                    <strong style={{ color: '#fff' }}>📍 ZONAS DE REPARTO / DELIVERY AREAS:</strong>
                    <br />
                    <span style={{ color: '#777' }}>
                      Torrevieja Centro, Playa del Cura, Playa de los Locos, Paseo Marítimo, Puerto, La Mata, Punta Prima, Los Balcones, Aguas Nuevas, La Siesta, El Acequión, La Veleta, San Roque, Rocío del Mar, Los Altos, Lago Jardín, Torreta I, II, III, El Salado, Urbanización Doña Inés, Jardín del Mar, Las Nations, Centro Comercial Habaneras et hôtels.
                    </span>
                  </div>
                </div>

              </div> {/* FIN color #aaa */}
            </div> {/* FIN backgroundColor #0a0a0a */}
          </div> {/* FIN maxWidth 1100px */}

          {/* --- FOOTER FINAL UNIQUE --- */}
            <footer style={{
              padding: '60px 20px 40px',
              textAlign: 'center',
              backgroundColor: '#050505',
              borderTop: '1px solid #1a1a1a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px',
              marginTop: '50px'
            }}>
              {logo && (
                <img src={logo} alt="La Casa de Burger Torrevieja" width="150" height="80" style={{ height: '80px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} />
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', width: '100%', maxWidth: '1100px', textAlign: 'center', fontSize: '0.9rem', color: '#bbb' }}>
                <div>
                  <h3 style={{ color: '#ff4757', fontSize: '1.2rem', marginBottom: '15px' }}>La Casa de Burger</h3>
                  <p style={{ lineHeight: '1.6' }}>
                    {lang === 'es' ? 'Especialistas en Smash Burgers y Hamburguesas Gourmet de autor. Carne de ternera premium, buey y procesos artesanales.' : 'Specialists in Signature Gourmet & Smash Burgers. Premium beef and artisan processes.'}
                  </p>
                </div>
                <div>
                  <h4 style={{ color: GOLD_BRIGHT, marginBottom: '15px' }}>🕒 {T[lang]?.hours || T.es.hours}</h4>
                  <p style={{ margin: '5px 0' }}>Lun - Sáb: 13:00 – 23:00</p>
                  <p style={{ margin: '5px 0', color: '#666' }}>Dom: Cerrado / Closed</p>
                </div>
                <div>
                  <h4 style={{ color: GOLD_BRIGHT, marginBottom: '15px' }}>📍 {T[lang]?.location || T.es.location}</h4>
                  <p style={{ margin: '5px 0' }}>Av. Diego Ramírez Pastor, 142</p>
                  <p style={{ margin: '5px 0' }}>03181 Torrevieja, Spain</p>
                  <p style={{ marginTop: '10px' }}>📞 <a href="tel:+34602597210" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>+34 602 59 72 10</a></p>
                </div>
              </div>

              <div style={{ width: '60px', height: '2px', background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7)', borderRadius: '2px', margin: '10px 0' }} aria-hidden="true" />

              <div style={{ color: '#555', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#888' }}>© {new Date().getFullYear()} LA CASA DE BURGER | THE ARTISAN EXPERIENCE</p>
                <p style={{ margin: '5px 0 0' }}>{lang === 'es' ? 'El mejor burger de Torrevieja' : 'Best burger in Torrevieja'}</p>
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
              </main>
            </div>

        ); // Fermeture du return
    }; // Fermeture de la fonction App
