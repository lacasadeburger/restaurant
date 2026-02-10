import React, { useState, useEffect, useMemo } from "react";
import Nav from "./Nav";
import Order from "./Order";
import CardMenu from "./CardMenu";
import "./style.css";
import data from "./data";
import { Helmet } from "react-helmet";

// --- ASSETS ---
import fb from "./assets/FB.png";
import Postre from "./assets/postre.webp";
import Burger from "./assets/burger.webp";
import Drink from "./assets/drink.webp";
import tripadvisor from "./assets/tripadvisor.png";
import googleIcon from "./assets/google.png";
import logo from "./assets/logo.jpg";
import BurgerSignature from "./assets/burger-signature-torrevieja.webp";

const instagramIcon = "https://cdn-icons-png.flaticon.com/512/2111/2111463.png";

const ALL_REVIEWS = [
  { es: "¡La mejor Smash de Torrevieja! Carne de calidad y entrega rápida.", en: "Best Smash in Torrevieja! Quality meat and fast delivery.", author: "Carlos R." },
  { es: "Increíble atención. Las patatas caseras son obligatorias. 10/10.", en: "Amazing service. Homemade fries are a must. 10/10.", author: "Sarah M." },
  { es: "La burger 'La Casa' es de otro planeta. La mejor que he probado.", en: "The 'La Casa' burger is from another planet. The best I've had.", author: "Juan P." },
  { es: "Sabor auténtico y productos frescos. Se nota la diferencia.", en: "Authentic flavor and fresh products. You can taste the difference.", author: "Elena G." }
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

  // 1. CALCUL PRIX TOTAL
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const val = item.precio || item.price || 0;
      const numericValue = String(val).replace(/[^0-9.,]/g, "").replace(",", ".");
      return acc + (parseFloat(numericValue) || 0);
    }, 0).toFixed(2);
  }, [cart]);

  // 2. DYNAMISME LANGUE
  useEffect(() => {
    const interval = setInterval(() => setLang(l => l === 'es' ? 'en' : 'es'), 4500);
    return () => clearInterval(interval);
  }, []);

  const randomReviews = useMemo(() => {
    return [...ALL_REVIEWS].sort(() => 0.5 - Math.random()).slice(0, 2);
  }, []);

  // 3. NAVIGATION CHIRURGICALE
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
  };

  const openAndScroll = (setter, id) => {
    setter(true);
    setTimeout(() => scrollToId(id), 150);
  };

  const closeAndNext = () => {
    if (showCardBurger) { setShowCardBurger(false); setTimeout(() => scrollToId("sec-bebidas"), 150); }
    else if (showCardDrink) { setShowCardDrink(false); setTimeout(() => scrollToId("sec-postres"), 150); }
    else if (showCardPostres) { setShowCardPostres(false); setTimeout(() => scrollToId("order"), 150); }
  };

  const addToCart = (i) => setCart(p => [...p, { ...i, uniqueKey: Math.random() }]);
  const removeFromCart = (idx) => setCart(p => p.filter((_, i) => i !== idx));

  const burgers = data.filter(i => i.category === "food");
  const drinks = data.filter(i => i.category === "drink");
  const postres = data.filter(i => i.category === "postre");

  const GOLD_BRIGHT = "#FFD700";
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: '#111', color: '#fff' }}>
      <Helmet>
        <title>La Casa de Burger | Las Mejores Smash Burgers de Torrevieja</title>
        <meta name="description" content="Pide las mejores Smash Burgers artesanales en Torrevieja. Servicio a domicilio rápido. ¡Qualidad gourmet 100%!" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "La Casa de Burger",
            "image": "https://lacasadeburger.es/assets/logo.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Diego Ramírez Pastor, 142",
              "addressLocality": "Torrevieja",
              "postalCode": "03181",
              "addressCountry": "ES"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": 37.9822, "longitude": -0.6782 },
            "telephone": "+34602597210",
            "openingHours": "Mo-Sa 13:00-22:30"
          })}
        </script>
      </Helmet>

      {/* Barre de navigation boostée */}
      <Nav
        scrollToOrder={() => scrollToId("order")}
        scrollToBurgers={() => openAndScroll(setShowCardBurger, "sec-burgers")}
        scrollToDrinks={() => openAndScroll(setShowCardDrink, "sec-bebidas")}
        scrollToPostres={() => openAndScroll(setShowCardPostres, "sec-postres")}
        cartLength={cart.length}
        totalPrice={totalPrice}
        lang={lang}
        logo={logo}
      />

      <header style={{
        padding: '160px 20px 100px', textAlign: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${BurgerSignature})`,
        backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0 0 50px 50px', borderBottom: '5px solid #ff4757'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', textShadow: '4px 4px 20px #000', margin: 0 }}>LA CASA DE BURGER</h1>
          <h2 style={{ color: GOLD_BRIGHT, textShadow: '2px 2px 10px #000', fontSize: '1.4rem' }}>{lang === 'es' ? 'Smash Burgers & Delivery Torrevieja' : 'Handcrafted Burgers & Fast Delivery'}</h2>
          <button onClick={() => openAndScroll(setShowCardBurger, "sec-burgers")} style={{ marginTop: '30px', background: GOLD_GRADIENT, padding: '18px 45px', borderRadius: '50px', border: '3px solid #000', fontWeight: '950', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
            {lang === 'es' ? 'VER CARTA' : 'SEE MENU'}
          </button>
        </div>
      </header>

      <main className="menu-page-container">
        <section style={{ padding: '30px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {randomReviews.map((rev, i) => (
              <div key={i} className="testimonial-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', borderLeft: `4px solid ${GOLD_BRIGHT}` }}>
                <div style={{ color: GOLD_BRIGHT, marginBottom: '5px' }}>⭐⭐⭐⭐⭐</div>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>"{lang === 'es' ? rev.es : rev.en}"</p>
                <small style={{ color: '#ff4757', fontWeight: 'bold' }}>— {rev.author}</small>
              </div>
            ))}
          </div>
        </section>

        <section id="sec-burgers">
          <SectionTitle>{lang === 'es' ? 'Burgers Gourmet' : 'Gourmet Burgers'}</SectionTitle>
          {showCardBurger ? <div className="grid-cards">{burgers.map(item => <CardMenu key={item.id} {...item} addToCart={addToCart} lang={lang} />)}</div> : <div className="promo-container" onClick={() => setShowCardBurger(true)}><img src={Burger} className="promo-img" alt="Smash Burgers" /><button className="btn-overlay">SHOW BURGERS</button></div>}
        </section>

        <section id="sec-bebidas">
          <SectionTitle>{lang === 'es' ? 'Bebidas' : 'Drinks'}</SectionTitle>
          {showCardDrink ? <div className="grid-cards">{drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={addToCart} lang={lang} />)}</div> : <div className="promo-container" onClick={() => setShowCardDrink(true)}><img src={Drink} className="promo-img" alt="Drinks" /><button className="btn-overlay">SHOW DRINKS</button></div>}
        </section>

        <section id="sec-postres">
          <SectionTitle>{lang === 'es' ? 'Postres Caseros' : 'Desserts'}</SectionTitle>
          {showCardPostres ? <div className="grid-cards">{postres.map(item => <CardMenu key={item.id} {...item} isPostreCard={true} addToCart={addToCart} lang={lang} />)}</div> : <div className="promo-container" onClick={() => setShowCardPostres(true)}><img src={Postre} className="promo-img" alt="Postres" /><button className="btn-overlay">SHOW DESSERTS</button></div>}
        </section>

        <section id="order" style={{ paddingBottom: '120px' }}>
          <SectionTitle>{lang === 'es' ? 'Tu Pedido' : 'Your Order'}</SectionTitle>
          <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
        </section>
      </main>

      <footer style={{ padding: '80px 20px 40px', backgroundColor: '#000', borderTop: '4px solid #ff4757', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '15px' }}>
            <div>
              <h3 style={{ color: '#ff4757', margin: '0 0 10px 0' }}>La Casa de Burger Torrevieja</h3>
              <p style={{ fontSize: '0.9rem', color: '#ccc' }}>La mejor hamburguesería artesanal de la ciudad. Carne fresca y servicio premium.</p>
              <p style={{ fontSize: '0.9rem' }}>📍 Av. Diego Ramírez Pastor, 142, 03181 Torrevieja</p>
              <p style={{ fontSize: '0.9rem' }}>📞 <a href="tel:+34602597210" style={{ color: '#fff', fontWeight: 'bold' }}>+34 602 59 72 10</a></p>
            </div>
            <div>
              <h4 style={{ color: GOLD_BRIGHT, margin: '0 0 10px 0' }}>🕒 {lang === 'es' ? 'Horario Gourmet' : 'Gourmet Hours'}</h4>
              <p style={{ fontSize: '0.9rem' }}>Lun - Sáb: 13:00 – 22:30</p>
              <p style={{ fontSize: '0.9rem', color: '#ff4757' }}>Dom: Cerrado</p>
            </div>
          </div>

          <div style={{ marginBottom: '50px', borderRadius: '15px', overflow: 'hidden', border: `3px solid ${GOLD_BRIGHT}` }}>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/qN6VZYBojLs" title="YouTube" frameBorder="0" allowFullScreen></iframe>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', marginBottom: '40px', alignItems: 'center' }}>
            <a href="https://facebook.com"><img src={fb} width="45" alt="Facebook" /></a>
            <a href="https://instagram.com"><img src={instagramIcon} width="45" alt="Instagram" /></a>
            <a href="https://es.restaurantguru.com" style={{ background: GOLD_GRADIENT, color: '#000', padding: '10px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', border: '2px solid #000' }}>GURU 2026</a>
            <img src={googleIcon} width="130" alt="Google Reviews" />
            <img src={tripadvisor} width="130" alt="Tripadvisor" />
          </div>

          {/* LE BLOC SEO MULTILINGUE DE COMPÉTITION (8 LANGUES) */}
          <div style={{ backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify', fontSize: '0.8rem', color: '#555', lineHeight: '1.8' }}>
             <strong>🇪🇸 ESPAÑOL:</strong> Hamburguesería en Torrevieja, mejores hamburguesas Alicante, Smash Burger cerca de mí, comida a domicilio, Playa del Cura, Playa de los Locos.
             <br /><strong>🇬🇧 ENGLISH:</strong> Best burgers in Torrevieja, gourmet restaurant, takeaway near me, Smash burgers Costa Blanca.
             <br /><strong>🇩🇪 DEUTSCH:</strong> Beste Burger Torrevieja, Smash Burger Alicante, Restaurant Lieferservice, Gourmet Essen.
             <br /><strong>🇳🇱 NEDERLANDS:</strong> Beste hamburgers Torrevieja, ambachtelijke burger, eten bestellen, bezorging in de buurt.
             <br /><strong>🇫🇷 FRANÇAIS:</strong> Meilleur burger Torrevieja, cuisine artisanale, livraison rapide, Torrevieja centre.
             <br /><strong>🇸🇪 SVENSKA:</strong> Bästa burgare i Torrevieja, restaurang nära stranden, matleverans Alicante.
             <br /><strong>🇵🇱 POLSKI:</strong> Najlepsze burgery w Torrevieja, dostawa jedzenia, prawdziwe burgery wołowe.
             <br /><strong>🇷🇺 РУССКИЙ:</strong> Лучшие бургеры в Торревьехе, заказать еду, доставка бургеров.
             <br /><br />
             <strong>ZONAS DE REPARTO:</strong> Playa del Cura, Playa de los Locos, Paseo Marítimo, La Siesta, Aguas Nuevas, Los Balcones, Punta Prima, La Mata, Los Altos, El Acequión, La Veleta, San Roque, Rocío del Mar, Torreta, Lago Jardín, El Salado.
          </div>

          <div style={{ marginTop: '50px' }}>
            <img src={logo} alt="Logo" style={{ height: "120px", borderRadius: "15px", marginBottom: '15px' }} />
            <p style={{ fontSize: '0.7rem', color: '#444' }}>© 2026 LA CASA DE BURGER | TORREVIEJA CENTER | ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/34602597210" className="whatsapp-float"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="40" alt="WhatsApp" /></a>

      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAndNext}>
          {showCardPostres ? 'FINALIZAR ✓' : 'SIGUIENTE PASO ➔'}
        </button>
      )}
    </div>
  );
}
