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
    hours: "Horario",
    seoTitle: "La mejor Hamburguesería Artesanal de Torrevieja",
    seoContent: "En La Casa de Burger, nos hemos convertido en el referente de las hamburguesas gourmet en Torrevieja. Nuestra pasión por la calidad nos lleva a utilizar exclusivamente carne de vaca madurada premium, buey y angus, picada diariamente. Especialistas en Smash Burger, pan brioche local y patatas naturales. Opciones Halal, sin gluten y veganas."
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
    hours: "Hours",
    seoTitle: "The Best Artisan Burger Joint in Torrevieja",
    seoContent: "At La Casa de Burger, we are the benchmark for gourmet burgers in Torrevieja. Our passion for quality leads us to use exclusively premium matured beef, ox, and angus. Specialists in Smash Burgers, using local brioche buns and hand-cut fries. Halal, gluten-free, and vegan options available."
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
    hours: "Horaires",
    seoTitle: "La meilleure Hamburguérerie Artisanale de Torrevieja",
    seoContent: "À La Casa de Burger, nous sommes la référence des burgers gourmet à Torrevieja. Passionnés par la qualité, nous utilisons exclusivement de la viande maturée premium. Spécialistes du Smash Burger, pain brioche local et frites maison. Options Halal, sans gluten et véganes disponibles."
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
    hours: "Åpningstider",
    seoTitle: "Torreviejas beste håndlagde burgerrestaurant",
    seoContent: "På La Casa de Burger er vi referansen for gourmetburgere i Torrevieja. Vi bruker eksklusivt modnet premium storfekjøtt, kvernet daglig. Spesialister på Smash Burger, lokalt briochebrød og ferske poteter. Halal, glutenfrie og veganske alternativer."
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
    hours: "Графік роботи",
    seoTitle: "Найкраща крафтова бургерна в Торрев'єсі",
    seoContent: "La Casa de Burger — це еталон гурманських бургерів у Торрев'єсі. Ми використовуємо виключно витриману яловичину преміум-класу. Спеціалісти зі Smash Burger, місцевих булочок бріош та натуральної картоплі. Халяльні, безглютенові та веганські страви."
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
    hours: "График работы",
    seoTitle: "Лучшая ремесленная бургерная в Торревьехе",
    seoContent: "La Casa de Burger — эталон изысканных бургеров в Торревьехе. Мы используем только выдержанную говядину премиум-класса. Специалисты по Smash Burger, местным булочкам бриошь и натуральному картофелю. Халяльные, безглютеновые и веганские опции."
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
    hours: "ساعات العمل",
    seoTitle: "أفضل مطعم برجر حرفي في توريفايجا",
    seoContent: "في La Casa de Burger، أصبحنا المرجع الأول للبرجر الفاخر في توريفايجا. نستخدم حصرياً لحم البقر المعتق الممتاز. متخصصون في سماتش برجر، خبز البريوش المحلي والبطاطس الطبيعية. متوفر خيارات حلال، خالية من الغلوتين ونباتية."
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
    hours: "Öppettider",
    seoTitle: "Torreviejas bästa hantverksburgare",
    seoContent: "På La Casa de Burger är vi ledande inom gourmetburgare i Torrevieja. Vi använder exklusivt mognat premiumkött. Specialister på Smash Burger, lokalt briochebrød och handskuren potatis. Halal, glutenfria och veganska alternativ."
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
    hours: "Öffnungszeiten",
    seoTitle: "Das beste handgemachte Burger-Restaurant in Torrevieja",
    seoContent: "Im La Casa de Burger sind wir der Maßstab für Gourmet-Burger in Torrevieja. Wir verwenden ausschließlich erstklassiges gereiftes Rindfleisch. Spezialisten für Smash Burger, lokales Brioche und handgeschnittene Pommes. Halal, glutenfreie und vegane Optionen."
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
    hours: "Program",
    seoTitle: "Cea mai bună burgerie artizanală din Torrevieja",
    seoContent: "La Casa de Burger, suntem punctul de referință pentru burgeri gourmet în Torrevieja. Folosim exclusiv carne de vită maturată premium. Specialiști în Smash Burger, chifle brioche locale și cartofi naturali. Opțiuni Halal, fără gluten și vegane."
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

  // Logic: Calcul du prix total ultra-précis (CORRIGÉ)
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      // 1. On récupère la valeur (si rien n'existe, on met "0")
      const val = item.precio || item.price || "0";

      // 2. On s'assure que c'est du texte pour pouvoir utiliser .replace()
      const valStr = String(val);

      // 3. Nettoyage : on ne garde que chiffres, points et virgules
      const numericValue = valStr.replace(/[^0-9.,]/g, "").replace(",", ".");

      // 4. Addition
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
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    /* On a supprimé le background ici car c'est la classe gold-button-premium qui va le donner */
    color: #000 !important;
    padding: 12px 30px;
    border-radius: 8px;
    font-weight: 950;
    border: 2px solid #000;
    pointer-events: none;
    font-size: 1.1rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.6);
    text-transform: uppercase;
    z-index: 5;
    white-space: nowrap;
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

        /* 1. L'animation de balancement */
        @keyframes wobble-badge {
          0% { transform: rotate(8deg) scale(1.1); }
          50% { transform: rotate(-2deg) scale(1.15); }
          100% { transform: rotate(8deg) scale(1.1); }
        }

        /* 2. L'animation de l'or liquide */
        @keyframes liquidGold {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* 3. L'application combinée sur le badge */
        .wobble-badge.gold-button-premium {
          display: inline-block;
          /* ICI LE SECRET : On met les deux animations ensemble */
          animation:
            liquidGold 6s ease infinite,
            wobble-badge 3s infinite ease-in-out !important;

          /* On s'assure que le point d'ancrage est au centre pour la rotation */
          transform-origin: center;
        }

        /* On garde le reste du style premium pour le badge */
        .gold-button-premium {
          background: linear-gradient(
            135deg,
            #8A6426 0%,
            #D4AF37 25%,
            #FFF9AA 50%,
            #AA771C 75%,
            #8A6426 100%
          ) !important;
          background-size: 300% 300% !important;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.5) !important;
        }

        /* Le reflet miroir qui passe par dessus le mouvement */
        .gold-button-premium::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -150%;
          width: 45%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.9),
            transparent
          );
          transform: rotate(25deg);
          animation: mirrorReflection 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

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

        /* ANIMATION DU LOGO EN HAUT À DROITE */
        @keyframes logoFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .moving-header-logo {
          animation: logoFloat 3s ease-in-out infinite;
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .moving-header-logo:hover {
          filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.9)) !important;
          transform: scale(1.1) !important;
          cursor: pointer;
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

        /* --- EFFET OR VÉRITABLE "ULTRA-DYNAMIC" --- */

        /* 1. Mouvement de l'or liquide (5 tons profonds) */
        @keyframes liquidGold {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* 2. Le flash "Miroir" (net et luxueux) */
        @keyframes mirrorReflection {
          0% { left: -100%; opacity: 0; }
          10% { opacity: 1; }
          35% { left: 150%; opacity: 1; }
          100% { left: 150%; opacity: 0; }
        }

        .gold-button-premium {
          /* Dégradé 5 tons avec contrastes accentués */
          background: linear-gradient(
            135deg,
            #8A6426 0%,   /* Or Bronze sombre */
            #D4AF37 25%,  /* Or Pur */
            #FFF9AA 50%,  /* Éclat Blanc Or (le point brillant) */
            #AA771C 75%,  /* Or Riche */
            #8A6426 100%
          ) !important;
          background-size: 300% 300% !important; /* Plus de fluidité dans le mouvement */
          animation: liquidGold 6s ease infinite !important;

          position: relative;
          overflow: hidden;
          color: #000 !important;
          border: 1.5px solid rgba(0,0,0,0.8) !important;
          font-weight: 950 !important;
          text-transform: uppercase;
          letter-spacing: 1.5px;

          /* Ombre portée et effet de biseau interne (ULTRA RÉALISTE) */
          box-shadow: 0 4px 15px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.5) !important;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }

        /* Le reflet miroir qui traverse le bouton */
        .gold-button-premium::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -150%;
          width: 45%; /* Un peu plus large pour un flash plus dynamique */
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.9), /* Plus brillant */
            transparent
          );
          transform: rotate(25deg);
          animation: mirrorReflection 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* Effet au survol : le bouton s'illumine et monte */
        .gold-button-premium:hover {
          transform: scale(1.06) translateY(-4px) !important;
          filter: brightness(1.1);
          box-shadow: 0 15px 30px rgba(191, 149, 63, 0.6) !important;
        }

        /* Effet au clic : le bouton s'enfonce */
        .gold-button-premium:active {
          transform: scale(0.96) translateY(-1px) !important;
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
{/* --- LOGO ANIMÉ EN HAUT À Gauche --- */}
<div style={{
  position: 'absolute',
  top: '195px',
  left: '35px',
  zIndex: 99,      // Plus haut que la Nav et le bouton WhatsApp
  pointerEvents: 'none'
}}>
  <img
    src={logo}
    alt="La Casa de Burger Logo"
    className="moving-header-logo"
    style={{
      height: '100px',
      width: 'auto',
      pointerEvents: 'auto',
      cursor: 'pointer',
      filter: 'drop-shadow(0 0 10px rgba(191,149,63,0.7))'
    }}
    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
  />
</div>
<Nav
  scrollToOrder={scrollToOrder}
  cartLength={cart.length}
  totalPrice={totalPrice}
  lang={lang}
  setLang={setLang} // <--- AJOUTE ÇA, sinon cliquer sur les drapeaux ne fera rien !
  logo={logo}
/>
      <header style={{
        padding: '85px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${BurgerSignature})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0 0 50px 50px',
        borderBottom: `5px solid #ff4757`
      }}>
      <div
        className="wobble-badge gold-button-premium"
        style={{
          position: 'absolute',
          // On le remonte pour qu'il soit au début du header,
          // juste sous la limite des drapeaux
          top: '20px',
          right: '5%',
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

<div style={{ marginTop: '05px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '05px' }}>
<button
  onClick={() => {
    setShowCardBurger(true);
    setTimeout(() => scrollToId("sec-burgers"), 150);
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
    boxShadow: GOLD_SHADOW, // Assure-toi que GOLD_SHADOW est bien défini en haut
    textTransform: 'uppercase',
    width: '90%',
    maxWidth: '450px'
  }}
>
  🚀 {T[lang]?.btnOrder || T.es.btnOrder}
</button>

<div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '05px' }}>


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

  {/* 1. SECTION BURGERS */}
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
        setTimeout(() => {
          const el = document.getElementById("sec-burgers");
          if (el) window.scrollTo({ top: el.offsetTop - 150, behavior: "smooth" });
        }, 150);
      }} style={{ cursor: 'pointer' }}>
        <img src={Burger} className="promo-img" alt="Mejor Hamburguesa Gourmet" />
        <button className="btn-overlay gold-button-premium">{T[lang]?.btnSeeMenu || T.es.btnSeeMenu}</button>
      </div>
    )}
  </section>

  {/* 2. SECTION BEBIDAS */}
  <section id="sec-bebidas">
    <SectionTitle>{T[lang]?.catDrinks || T.es.catDrinks}</SectionTitle>
    {showCardDrink ? (
      <div className="grid-cards">
        {drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={addToCart} lang={lang} />)}
      </div>
    ) : (
      <div className="promo-container" onClick={() => {
        setShowCardDrink(true);
        setTimeout(() => {
          const el = document.getElementById("sec-bebidas");
          if (el) window.scrollTo({ top: el.offsetTop - 150, behavior: "smooth" });
        }, 150);
      }} style={{ cursor: 'pointer' }}>
        <img src={Drink} className="promo-img" alt="Drinks" />
        <button className="btn-overlay gold-button-premium">{T[lang]?.catDrinks || T.es.catDrinks}</button>
      </div>
    )}
  </section>

  {/* 3. SECTION POSTRES */}
  <section id="sec-postres">
    <SectionTitle>{T[lang]?.catDesserts || T.es.catDesserts}</SectionTitle>
    {showCardPostres ? (
      <div className="grid-cards">
        {postres.map(item => <CardMenu key={item.id} {...item} isPostreCard={true} addToCart={addToCart} lang={lang} />)}
      </div>
    ) : (
      <div className="promo-container" onClick={() => {
        setShowCardPostres(true);
        setTimeout(() => {
          const el = document.getElementById("sec-postres");
          if (el) window.scrollTo({ top: el.offsetTop - 150, behavior: "smooth" });
        }, 150);
      }} style={{ cursor: 'pointer' }}>
        <img src={Postre} className="promo-img" alt="Desserts" />
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

        {/* SECTION MAPS & VIDEO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center', margin: '05px auto' }}>
          <div style={{ width: '90%', maxWidth: '1100px', borderRadius: '15px', overflow: 'hidden', border: `2px solid ${GOLD_BRIGHT}` }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.514757530635!2d-0.6807478!3d37.9811364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63a9b08d9e7931%3A0x88f65fbd84c2f7fe!2sLa%20Casa%20de%20Burger!5e0!3m2!1sfr!2ses!4v1700000000000!5m2!1sfr!2ses" width="100%" height="350" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
          </div>
          <div style={{ width: '90%', maxWidth: '800px', borderRadius: '15px', overflow: 'hidden', border: `3px solid ${GOLD_BRIGHT}` }}>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/qN6VZYBojLs" title="Video" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        {/* RÉSEAUX SOCIAUX */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', marginBottom: '05px', alignItems: 'center' }}>
          <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer"><img src={fb} width="45" alt="Facebook" /></a>
          <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer"><img src={instagramIcon} width="45" alt="Instagram" /></a>
          <a href="https://www.google.com/search?q=la+casa+de+burger+torrevieja" target="_blank" rel="noreferrer"><img src={googleIcon} width="140" alt="Google" /></a>
          <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja" target="_blank" rel="noreferrer"><img src={tripadvisor} width="140" alt="Tripadvisor" /></a>
        </div>

        {/* BLOC SEO MULTILINGUE (11 LANGUES) */}
        <div style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 20px' }}>
          <div style={{ backgroundColor: '#0a0a0a', padding: '35px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify' }}>
            <div style={{ color: '#888', fontSize: '0.75rem', lineHeight: '1.6', margin: 0 }}>
              <p><strong>🇪🇸 ESPAÑOL:</strong> <strong>La Casa de Burger</strong> – El <strong>mejor restaurante de hamburguesas gourmet en Torrevieja</strong>. Especialistas en <strong>Smash Burgers</strong>, carne de vaca madurada premium y buey. Si buscas comida a domicilio (delivery) o una experiencia artesanal cerca del puerto o Playa del Cura, somos tu elección número uno.</p>
              <p><strong>🇬🇧 ENGLISH:</strong> <strong>Best gourmet burgers in Torrevieja</strong>. We serve authentic <strong>Smash Burgers</strong> and premium aged beef. The highest-rated burger joint for delivery and takeout near the city center and beaches.</p>
              <p><strong>🇳🇴 NORSK:</strong> <strong>Beste gourmetburger i Torrevieja</strong>. Opplev de saftigste <strong>Smash Burgers</strong> med modnet storfekjøtt av høyeste kvalitet. Vi tilbyr hjemlevering i hele Torrevieja.</p>
              <p><strong>🇵🇱 POLSKI:</strong> <strong>Najlepsze burgery gourmet w Torrevieja</strong>. Specjalizujemy się w <strong>Smash Burgers</strong> z sezonowanej wołowiny premium. Zamów z dostawą do domu w Torrevieja i okolicach.</p>
              <p><strong>🇲🇦 ARABIC:</strong> <strong>أفضل مطعم برجر في توريفايجا</strong>. متخصصون في برجر سماش ولحم البقر المعتق الفاخر. استمتع بألذ برجر حرفي مع خدمة التوصيل في جميع أنحاء المدينة.</p>
              <p><strong>🇺🇦 UKRAINIAN:</strong> <strong>Найкращі гурме-бургери в Торрев'єсі</strong>. Наші <strong>Smash Burgers</strong> виготовлені з преміальної витриманої яловичини. Найкращий вибір для доставки їжі додому.</p>
              <p><strong>🇫🇷 FRANÇAIS:</strong> <strong>Meilleur Burger Gourmet Torrevieja</strong>. Spécialiste du <strong>Smash Burger</strong> et de la viande de bœuf maturée premium. Livraison à domicile disponible pour le meilleur burger artisanal de la ville.</p>
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

          {/* LOGO AVEC "l" MINUSCULE */}
          {logo && (
            <img
              src={logo}
              alt="La Casa de Burger"
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
          }} />

          {/* COPYRIGHT ET DROITS */}
          <div style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#ccc' }}>
              © 2026 LA CASA DE BURGER
            </p>
            <p style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {typeof lang !== 'undefined' && lang === 'es' ? 'Todos los derechos reservados' :
               typeof lang !== 'undefined' && lang === 'fr' ? 'Tous droits réservés' :
               'All rights reserved'}
            </p>
          </div>

          <p style={{ color: '#444', fontSize: '0.65rem', marginTop: '10px' }}>
            Torrevieja, Spain • The Artisan Burger Experience
          </p>
        </footer>
        {/* BOUTON WHATSAPP */}
        <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="40" alt="WA" />
        </a>

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
            {showCardBurger && (lang === 'es' ? 'SIGUIENTE: BEBIDAS ➔' : 'NEXT: DRINKS ➔')}
            {showCardDrink && (lang === 'es' ? 'SIGUIENTE: POSTRES ➔' : 'NEXT: DESSERTS ➔')}
            {showCardPostres && (lang === 'es' ? 'VER MI PEDIDO ➔' : 'VIEW ORDER ➔')}
          </button>
        )}
      </div>
    );
  }
