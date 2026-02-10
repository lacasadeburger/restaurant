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

  const GOLD_BRIGHT = "#FFD700";
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const val = item.precio || item.price || 0;
      const numericValue = String(val).replace(/[^0-9.,]/g, "").replace(",", ".");
      return acc + (parseFloat(numericValue) || 0);
    }, 0).toFixed(2);
  }, [cart]);

  useEffect(() => {
    const interval = setInterval(() => setLang(l => l === 'es' ? 'en' : 'es'), 4500);
    return () => clearInterval(interval);
  }, []);

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

  const burgers = data.filter(i => i.category === "food");
  const drinks = data.filter(i => i.category === "drink");
  const postres = data.filter(i => i.category === "postre");

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: '#111', color: '#fff', position: 'relative' }}>
      <style>{`
        .promo-container { position: relative; cursor: pointer; display: inline-block; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.8); transition: 0.5s; max-width: 500px; width: 100%; margin: 0 auto 20px; border: 2px solid rgba(255, 215, 0, 0.3); }
        .promo-container:hover { transform: translateY(-5px); border-color: ${GOLD_BRIGHT}; }
        .promo-img { width: 100%; display: block; transition: 0.5s; }
        .promo-container:hover .promo-img { opacity: 0.6; transform: scale(1.05); }
        .btn-overlay { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); background: ${GOLD_GRADIENT}; color: #000 !important; padding: 12px 30px; border-radius: 8px; font-weight: 950; border: 2px solid #000; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.6); text-transform: uppercase; z-index: 5; white-space: nowrap; pointer-events: none; }
        .whatsapp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; width: 65px; height: 65px; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 9999; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
      `}</style>

      <Helmet>
        <title>La Casa de Burger | Smash Burgers Torrevieja Delivery</title>
        <meta name="description" content="Pide las mejores Smash Burgers de Torrevieja. Servicio a domicilio rápido. ¡Calidad artesanal!" />
      </Helmet>

      <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="40" alt="WA" />
      </a>

      <Nav scrollToOrder={() => scrollToId("order")} cartLength={cart.length} totalPrice={totalPrice} lang={lang} logo={logo} />

      <header style={{
        padding: '160px 20px 100px', textAlign: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${BurgerSignature})`,
        backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0 0 50px 50px', borderBottom: '5px solid #ff4757'
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '950', textShadow: '2px 2px 15px #000', margin: 0 }}>LA CASA DE BURGER</h1>
        <h2 style={{ color: GOLD_BRIGHT }}>{lang === 'es' ? 'Smash Burgers & Delivery Torrevieja' : 'Artisan Burgers & Delivery'}</h2>
        <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="tel:+34602597210" style={{ background: GOLD_GRADIENT, color: '#000', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: '950', border: '2px solid #000' }}>
            📞 {lang === 'es' ? 'LLAMAR AHORA' : 'CALL NOW'}
          </a>
          <button onClick={() => openAndScroll(setShowCardBurger, "sec-burgers")} style={{ background: '#fff', color: '#000', padding: '15px 35px', borderRadius: '50px', fontWeight: '950', cursor: 'pointer', border: '2px solid #000' }}>
            🍔 {lang === 'es' ? 'VER CARTA' : 'SEE MENU'}
          </button>
        </div>
      </header>

      <main className="menu-page-container" style={{ textAlign: 'center' }}>
        <section id="sec-burgers">
          <SectionTitle>{lang === 'es' ? 'Burgers' : 'Burgers'}</SectionTitle>
          {showCardBurger ? <div className="grid-cards">{burgers.map(item => <CardMenu key={item.id} {...item} addToCart={(i) => setCart(p => [...p, {...i, uniqueKey: Math.random()}])} lang={lang} />)}</div> : <div className="promo-container" onClick={() => setShowCardBurger(true)}><img src={Burger} className="promo-img" alt="Burgers" /><button className="btn-overlay">ORDER BURGERS</button></div>}
        </section>

        <section id="sec-bebidas">
          <SectionTitle>{lang === 'es' ? 'Bebidas' : 'Drinks'}</SectionTitle>
          {showCardDrink ? <div className="grid-cards">{drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={(i) => setCart(p => [...p, {...i, uniqueKey: Math.random()}])} lang={lang} />)}</div> : <div className="promo-container" onClick={() => setShowCardDrink(true)}><img src={Drink} className="promo-img" alt="Bebidas" /><button className="btn-overlay">ORDER DRINKS</button></div>}
        </section>

        <section id="sec-postres">
          <SectionTitle>{lang === 'es' ? 'Postres' : 'Desserts'}</SectionTitle>
          {showCardPostres ? <div className="grid-cards">{postres.map(item => <CardMenu key={item.id} {...item} isPostreCard={true} addToCart={(i) => setCart(p => [...p, {...i, uniqueKey: Math.random()}])} lang={lang} />)}</div> : <div className="promo-container" onClick={() => setShowCardPostres(true)}><img src={Postre} className="promo-img" alt="Postres" /><button className="btn-overlay">ORDER DESSERTS</button></div>}
        </section>

        <section id="order" style={{ paddingBottom: '120px' }}>
          <SectionTitle>{lang === 'es' ? 'Tu Pedido' : 'Your Order'}</SectionTitle>
          <Order cart={cart} removeFromCart={(idx) => setCart(p => p.filter((_, i) => i !== idx))} lang={lang} />
        </section>
      </main>

      <footer style={{ padding: '60px 20px', backgroundColor: '#000', borderTop: '4px solid #ff4757', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '40px' }}>
            <div>
              <h3 style={{ color: '#ff4757' }}>La Casa de Burger</h3>
              <p>📍 Av. Diego Ramírez Pastor, 142, 03181 Torrevieja</p>
              <p>📞 +34 602 59 72 10</p>
            </div>
            <div>
              <h4 style={{ color: GOLD_BRIGHT }}>{lang === 'es' ? 'Horario' : 'Hours'}</h4>
              <p>Lun - Sáb: 13:00 – 22:30 | Dom: Cerrado</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px', borderRadius: '15px', overflow: 'hidden', border: `3px solid ${GOLD_BRIGHT}` }}>
            <iframe width="100%" height="350" src="https://www.youtube.com/embed/qN6VZYBojLs" title="YouTube" frameBorder="0" allowFullScreen></iframe>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            <img src={fb} width="40" alt="FB" />
            <img src={instagramIcon} width="40" alt="IG" />
            <img src={googleIcon} width="110" alt="Google" />
            <img src={tripadvisor} width="110" alt="Trip" />
          </div>

          {/* --- LE BLOC SEO MULTILINGUE ULTIME (RÉINTÉGRÉ) --- */}
          <div style={{ backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify', fontSize: '0.8rem', color: '#666', lineHeight: '1.8' }}>
             <strong>🇪🇸 ESPAÑOL:</strong> Las mejores hamburguesas de Torrevieja. Smash burgers gourmet, comida para llevar y a domicilio. Playa del Cura, Playa de los Locos, Centro.
             <br /><strong>🇬🇧 ENGLISH:</strong> Best burgers in Torrevieja, gourmet smash burgers, takeaway near me, food delivery Costa Blanca.
             <br /><strong>🇫🇷 FRANÇAIS:</strong> Meilleur burger Torrevieja, livraison à domicile, cuisine artisanale et frites maison.
             <br /><strong>🇩🇪 DEUTSCH:</strong> Beste Burger Torrevieja, Lieferservice, Smash Burger Alicante Region.
             <br /><strong>🇳🇱 NEDERLANDS:</strong> Beste hamburgers Torrevieja, ambachtelijke burgers, eten bestellen en bezorgen.
             <br /><strong>🇷🇺 РУССКИЙ:</strong> Лучшие бургеры в Торревьехе, доставка еды на дом, крафтовые бургеры.
             <br /><strong>🇸🇪 SVENSKA:</strong> Bästa burgarna i Torrevieja, matleverans, takeaway i närheten.
             <br /><strong>🇵🇱 POLSKI:</strong> Najlepsze burgery w Torrevieja, dostawa do domu, burgery rzemieślnicze.
             <br /><br />
             <strong>ZONAS DE REPARTO:</strong> Playa del Cura, Playa de los Locos, Paseo Marítimo, La Siesta, Aguas Nuevas, Los Balcones, Punta Prima, La Mata, Los Altos, El Acequión, La Veleta, San Roque, Rocío del Mar, Torreta, Lago Jardín, El Salado.
          </div>

          <img src={logo} alt="Logo" style={{ height: "100px", marginTop: '40px' }} />
        </div>
      </footer>

      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAndNext} style={{ position: 'fixed', bottom: '95px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ff4757', color: '#fff', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', zIndex: 10000, border: '3px solid #000' }}>
          {showCardPostres ? 'FINALIZAR ✓' : 'SIGUIENTE PASO ➔'}
        </button>
      )}
    </div>
  );
}
