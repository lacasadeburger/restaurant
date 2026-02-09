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

const instagramIcon = "https://cdn-icons-png.flaticon.com/512/2111/2111463.png";

// --- BASE DE DONNÉES DES AVIS (Rotation aléatoire) ---
const ALL_REVIEWS = [
  { es: "¡La mejor Smash de Torrevieja! Carne de calidad y entrega rápida.", en: "Best Smash in Torrevieja! Quality meat and fast delivery.", author: "Carlos R." },
  { es: "Increíble atención. Las patatas caseras son obligatorias. 10/10.", en: "Amazing service. Homemade fries are a must. 10/10.", author: "Sarah M." },
  { es: "La burger 'La Casa' es de otro planeta. La mejor que he probado.", en: "The 'La Casa' burger is from another planet. The best I've had.", author: "Juan P." },
  { es: "Sabor auténtico y productos frescos. Se nota la diferencia.", en: "Authentic flavor and fresh products. You can taste the difference.", author: "Elena G." },
  { es: "¡Por fin una buena Smash Burger en el centro de Torrevieja!", en: "Finally a great Smash Burger in Torrevieja center!", author: "Mark W." },
  { es: "Entrega a domicilio impecable, la comida llega muy caliente.", en: "Flawless delivery, food arrives piping hot.", author: "David L." },
  { es: "Calidad gourmet a un precio muy justo. Repetiremos seguro.", en: "Gourmet quality at a very fair price. We will definitely repeat.", author: "Sonia B." },
  { es: "La atención por WhatsApp es súper rápida. Muy profesionales.", en: "WhatsApp support is super fast. Very professional.", author: "Lucas T." }
];

const SectionTitle = ({ children, id }) => (
  <header className="menuBurgers" id={id} style={{ margin: '40px 0 20px' }}>
    <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.8rem' }}>{children}</h2>
  </header>
);

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCardPostres, setShowCardPostres] = useState(false);
  const [showCardBurger, setShowCardBurger] = useState(false);
  const [showCardDrink, setShowCardDrink] = useState(false);
  const [lang, setLang] = useState('es');

  // 1. CALCUL PRIX TOTAL (Point & Virgule safe)
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const val = item.precio || item.price || 0;
      const numericValue = String(val).replace(/[^0-9.,]/g, "").replace(",", ".");
      return acc + (parseFloat(numericValue) || 0);
    }, 0).toFixed(2);
  }, [cart]);

  // 2. DYNAMISME LANGUE (Intervalle 4.5s)
  useEffect(() => {
    const interval = setInterval(() => setLang(l => l === 'es' ? 'en' : 'es'), 4500);
    return () => clearInterval(interval);
  }, []);

  // 3. SÉLECTION ALÉATOIRE DE 2 AVIS (Fixés au chargement)
  const randomReviews = useMemo(() => {
    return [...ALL_REVIEWS].sort(() => 0.5 - Math.random()).slice(0, 2);
  }, []);

  const addToCart = (i) => setCart(p => [...p, { ...i, uniqueKey: Math.random() }]);
  const removeFromCart = (idx) => setCart(p => p.filter((_, i) => i !== idx));
  const scrollToOrder = () => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  const scrollToMenu = () => window.scrollTo({ top: (document.getElementById("sec-burgers")?.offsetTop || 0) - 100, behavior: "smooth" });

  const closeAllMenus = () => {
    setShowCardBurger(false); setShowCardPostres(false); setShowCardDrink(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container {
          position: relative; cursor: pointer; display: inline-block; border-radius: 20px;
          overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.8); transition: 0.5s;
          max-width: 500px; width: 100%; margin-bottom: 20px; border: 2px solid rgba(255, 215, 0, 0.3);
        }
        .promo-container:hover { transform: translateY(-5px); border-color: ${GOLD_BRIGHT}; }
        .promo-img { width: 100%; display: block; opacity: 1; transition: 0.5s; }
        .promo-container:hover .promo-img { opacity: 0.7; transform: scale(1.05); }
        .btn-overlay {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: ${GOLD_GRADIENT}; color: #000 !important; padding: 12px 30px; border-radius: 8px; font-weight: 950;
          border: 2px solid #000; pointer-events: none; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.6);
          text-transform: uppercase; z-index: 5; white-space: nowrap;
        }
        .grid-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px 0 120px; }
        .floating-close { position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%); background: #ff4757; color: #fff; border: 3px solid #000; padding: 12px 25px; border-radius: 10px; font-weight: 900; z-index: 9998; cursor: pointer; box-shadow: 4px 4px 0px #000; text-transform: uppercase; font-size: 1rem; }
        .whatsapp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
        .testimonial-card { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; border-left: 4px solid ${GOLD_BRIGHT}; text-align: left; transition: 0.3s; margin-bottom: 10px; }
        .testimonial-card:hover { background: rgba(255,255,255,0.08); border-left-width: 8px; }
        @keyframes pulse-gold { 0% { transform: rotate(5deg) scale(1); } 50% { transform: rotate(5deg) scale(1.05); } 100% { transform: rotate(5deg) scale(1); } }
        .pulse-badge { animation: pulse-gold 2s infinite ease-in-out; }
      `}</style>

            {/* --- BLOC SEO & GOOGLE SCHEMA --- */}
            <Helmet>
              <title>La Casa de Burger | Las mejores hamburguesas de Torrevieja</title>
              <meta name="description" content="Las mejores Smash Burgers de Torrevieja. Carne artesanal, gaufres al Nutella y entrega a domicilio. ¡Pide ahora!" />

              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Restaurant",
                  "name": "La Casa de Burger",
                  "image": "https://lacasadeburger.es/logo.jpg",
                  "@id": "https://lacasadeburger.es",
                  "url": "https://lacasadeburger.es",
                  "telephone": "+34602597210",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Av. Diego Ramírez Pastor, 142",
                    "addressLocality": "Torrevieja",
                    "addressRegion": "Alicante",
                    "postalCode": "03181",
                    "addressCountry": "ES"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 37.9822,
                    "longitude": -0.6782
                  },
                  "servesCuisine": ["Burgers", "American", "Waffles"],
                  "priceRange": "$$",
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                      "opens": "13:00",
                      "closes": "22:30"
                    }
                  ],
                  "menu": "https://lacasadeburger.es"
                })}
              </script>
            </Helmet>

            {/* SEO STRATÉGIQUE CACHÉ */}
            <h1 style={{ position: 'absolute', left: '-9999px' }}>Mejor Hamburguesería en Torrevieja - Smash Burgers & Gourmet Delivery</h1>
      {/* SEO STRATÉGIQUE CACHÉ */}
      <h1 style={{ position: 'absolute', left: '-9999px' }}>Mejor Hamburguesería en Torrevieja - Smash Burgers & Gourmet Delivery</h1>

      <Nav scrollToOrder={scrollToOrder} cartLength={cart.length} totalPrice={totalPrice} lang={lang} logo={logo} />

      {/* HERO SECTION */}
      <header style={{ padding: '140px 20px 80px', textAlign: 'center', backgroundColor: '#000', borderRadius: '0 0 50px 50px', borderBottom: '4px solid #ff4757', position: 'relative' }}>
        <div className="pulse-badge" style={{ position: 'absolute', top: '110px', right: '10%', background: GOLD_GRADIENT, color: '#000', padding: '6px 18px', borderRadius: '50px', fontWeight: '950', fontSize: '0.85rem', transform: 'rotate(5deg)', zIndex: 10, border: '2px solid #000', boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}>🏆 #1 RESTAURANTE TORREVIEJA 2026</div>
        <h2 style={{ fontSize: '2.8rem', fontWeight: '900', textTransform: 'uppercase' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h2>
        <p style={{ fontSize: '1.2rem', color: '#ccc', minHeight: '1.5em' }}>{lang === 'es' ? 'Hamburguesas Artesanales & Smash Burgers a Domicilio' : 'Handcrafted Burgers & Gourmet Delivery in Torrevieja'}</p>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="tel:+34602597210" style={{ background: GOLD_GRADIENT, color: '#000', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: '950', border: '2px solid #000', boxShadow: GOLD_SHADOW }}>📞 {lang === 'es' ? 'PEDIR AHORA' : 'ORDER NOW'}</a>
          <button onClick={scrollToMenu} style={{ backgroundColor: '#fff', color: '#111', padding: '15px 35px', borderRadius: '50px', border: '2px solid #111', fontWeight: '950', cursor: 'pointer', boxShadow: '0 4px 0px #ccc' }}>{lang === 'es' ? 'CARTA ONLINE' : 'ONLINE MENU'}</button>
          <button onClick={scrollToOrder} style={{ backgroundColor: '#ff4757', color: '#fff', padding: '15px 35px', borderRadius: '50px', border: '2px solid #000', fontWeight: '950', cursor: 'pointer', boxShadow: '0 4px 0px #b33939' }}>🛒 {totalPrice}€</button>
        </div>
      </header>

      <main className="menu-page-container">
        {/* SECTION AVIS DYNAMIQUES */}
        <section style={{ padding: '40px 0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {randomReviews.map((rev, index) => (
              <div key={index} className="testimonial-card">
                <div style={{ color: GOLD_BRIGHT, marginBottom: '10px', fontSize: '1.2rem' }}>⭐⭐⭐⭐⭐</div>
                <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>{lang === 'es' ? rev.es : rev.en}</p>
                <p style={{ fontWeight: 'bold', marginTop: '10px', color: '#ff4757' }}>— {rev.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MENU BURGERS */}
        <section>
          <SectionTitle id="sec-burgers">{lang === 'es' ? 'Burgers Gourmet' : 'Gourmet Burgers'}</SectionTitle>
          {showCardBurger ? (
            <div className="grid-cards">{burgers.map(item => <CardMenu key={item.id} {...item} addToCart={addToCart} lang={lang} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardBurger(true)}>
              <img src={Burger} className="promo-img" alt="Smash Burger Torrevieja" />
              <button className="btn-overlay">{lang === 'es' ? 'VER BURGERS' : 'SEE BURGERS'}</button>
            </div>
          )}
        </section>

        {/* MENU BEBIDAS */}
        <section>
          <SectionTitle id="sec-bebidas">{lang === 'es' ? 'Bebidas & Cocktails' : 'Drinks & Cocktails'}</SectionTitle>
          {showCardDrink ? (
            <div className="grid-cards">{drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={addToCart} lang={lang} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardDrink(true)}>
              <img src={Drink} className="promo-img" alt="Drinks Torrevieja" />
              <button className="btn-overlay">{lang === 'es' ? 'VER BEBIDAS' : 'SEE DRINKS'}</button>
            </div>
          )}
        </section>

        {/* MENU POSTRES */}
        <section>
          <SectionTitle id="sec-postres">{lang === 'es' ? 'Postres Caseros' : 'Homemade Desserts'}</SectionTitle>
          {showCardPostres ? (
            <div className="grid-cards">{postres.map(item => <CardMenu key={item.id} {...item} isPostreCard={true} addToCart={addToCart} lang={lang} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardPostres(true)}>
              <img src={Postre} className="promo-img" alt="Desserts Torrevieja" />
              <button className="btn-overlay">{lang === 'es' ? 'VER POSTRES' : 'SEE DESSERTS'}</button>
            </div>
          )}
        </section>

        <section id="order">
          <SectionTitle>{lang === 'es' ? 'Tu Pedido' : 'Your Order'}</SectionTitle>
          <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
        </section>
      </main>

      {/* FOOTER COMPLET AVEC SEO MASSIVE */}
      <footer style={{ padding: '80px 20px 40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px' }}>
            <div>
              <h3 style={{ color: '#ff4757' }}>La Casa de Burger Torrevieja</h3>
              <p>{lang === 'es' ? 'La mejor hamburguesería artesanal de Torrevieja. Smash Burgers, carne fresca y productos locales.' : 'The best handcrafted burger shop in Torrevieja. Smash Burgers, fresh meat and local products.'}</p>
            </div>
            <div>
              <h4 style={{ color: GOLD_BRIGHT }}>📍 {lang === 'es' ? 'Ubicación y Contacto' : 'Location & Contact'}</h4>
              <p>Av. Diego Ramírez Pastor, 142, 03181 Torrevieja, Alicante</p>
              <p>📞 <a href="tel:+34602597210" style={{ color: '#fff', textDecoration: 'none' }}>+34 602 59 72 10</a></p>
            </div>
            <div>
              <h4 style={{ color: GOLD_BRIGHT }}>🕒 {lang === 'es' ? 'Horario Gourmet' : 'Gourmet Hours'}</h4>
              <p>{lang === 'es' ? 'Lunes a Sábado: 13:00 – 22:30' : 'Monday to Saturday: 1:00 PM – 10:30 PM'}</p>
              <p>{lang === 'es' ? 'Domingo: Cerrado' : 'Sunday: Closed'}</p>
            </div>
          </div>

          {/* VIDÉO YOUTUBE */}
          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto 50px', borderRadius: '15px', overflow: 'hidden', border: `3px solid ${GOLD_BRIGHT}` }}>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/qN6VZYBojLs" title="Mejor Burger Torrevieja" frameBorder="0" allowFullScreen></iframe>
          </div>

          {/* SOCIALS & PARTNERS */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', marginBottom: '40px', alignItems: 'center' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer"><img src={fb} width="45" alt="Facebook" /></a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer"><img src={instagramIcon} width="45" alt="Instagram" /></a>
            <a href="https://es.restaurantguru.com/La-Casa-de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ background: GOLD_GRADIENT, color: '#000', padding: '12px 25px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', border: '2px solid #000' }}>GURU 2026</a>
            <a href="https://maps.app.goo.gl/5FRkjpDFaQWeqp21A" target="_blank" rel="noreferrer"><img src={googleIcon} width="140" alt="Google Maps" /></a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja_Costa_Blanca_Province_of_Alicante_Valencian_Communi.html" target="_blank" rel="noreferrer"><img src={tripadvisor} width="140" alt="Tripadvisor" /></a>
          </div>

          {/* --- BLOC SEO POWER MULTILINGUE --- */}
          <div style={{ backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify' }}>
            <p style={{ color: '#777', fontSize: '0.8rem', lineHeight: '1.8', margin: 0 }}>
              <strong>🇪🇸 ESPAÑOL:</strong> Hamburguesería en Torrevieja, mejores hamburguesas Alicante, Smash Burger cerca de mí, comida a domicilio, Playa del Cura, Playa de los Locos.
              <br /><strong>🇬🇧 ENGLISH:</strong> Best burgers in Torrevieja, gourmet restaurant, takeaway near me, Smash burgers Costa Blanca.
              <br /><strong>🇩🇪 DEUTSCH:</strong> Beste Burger Torrevieja, Smash Burger Alicante, Restaurant Lieferservice, Gourmet Essen.
              <br /><strong>🇳🇱 NEDERLANDS:</strong> Beste hamburgers Torrevieja, ambachtelijke burger, eten bestellen, bezorging in de buurt.
              <br /><strong>🇫🇷 FRANÇAIS:</strong> Meilleur burger Torrevieja, cuisine artisanale, livraison rapide, Torrevieja centre.
              <br /><strong>🇸🇪 SVENSKA:</strong> Bästa burgare i Torrevieja, restaurang nära stranden, matleverans Alicante.
              <br /><strong>🇵🇱 POLSKI:</strong> Najlepsze burgery w Torrevieja, dostawa jedzenia, prawdziwe burgery wołowe.
              <br /><strong>🇷🇺 РУССКИЙ:</strong> Лучшие бургеры в Торревьехе, заказать еду, доставка бургеров.
              <br /><br />
              <strong>ZONAS DE REPARTO:</strong> Playa del Cura, Playa de los Locos, Paseo Marítimo, La Siesta, Aguas Nuevas, Los Balcones, Punta Prima, La Mata, Los Altos, El Acequión, La Veleta, San Roque, Rocío del Mar.
            </p>
          </div>

          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', color: '#555' }}>
            © 2026 <span style={{ color: GOLD_BRIGHT, fontWeight: 'bold' }}>LA CASA DE BURGER</span> | {lang === 'es' ? 'TODOS LOS DERECHOS RESERVADOS' : 'ALL RIGHTS RESERVED'}
          </div>
        </div>
        <div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '40px 0',
  marginTop: '20px'
}}>
  <img
    src="/logo.jpg"
    alt="La Casa de Burger Logo"
    style={{
      height: "150px", // J'ai augmenté la taille ici (c'était 80px avant)
      width: "auto",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)" // Petit effet d'ombre pour le relief
    }}
  />
  <p style={{ marginTop: '15px', fontSize: '0.9rem', opacity: 0.7 }}>
    © 2026 La Casa de Burger - Tous droits réservés
  </p>
</div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="40" alt="WhatsApp" />
      </a>

      {/* BOUTON FERMER CARTA */}
      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAllMenus}>
          {lang === 'es' ? '✕ CERRAR CARTA' : '✕ CLOSE MENU'}
        </button>
      )}
    </div>
  );
}
