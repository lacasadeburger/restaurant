import React, { useState, useEffect, useMemo } from "react";
import Nav from "./Nav";
import Order from "./Order";
import CardMenu from "./CardMenu";
import "./style.css";
import data from "./data";

// --- ASSETS ---
import fb from "./assets/FB.png";
import Postre from "./assets/postre.png";
import Burger from "./assets/burger.png";
import Drink from "./assets/drink.png";
import tripadvisor from "./assets/tripadvisor.png";
import googleIcon from "./assets/google.png";
import logo from "./assets/logo.jpg";

const instagramIcon = "https://cdn-icons-png.flaticon.com/512/2111/2111463.png";

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

  // 1. CALCUL PRIX BLINDÉ (Gestion virgules/points)
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const val = item.precio || item.price || 0;
      const numericValue = String(val).replace(/[^0-9.,]/g, "").replace(",", ".");
      return acc + (parseFloat(numericValue) || 0);
    }, 0).toFixed(2);
  }, [cart]);

  // 2. DYNAMISME LANGUES
  useEffect(() => {
    const interval = setInterval(() => setLang(l => l === 'es' ? 'en' : 'es'), 4500);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (i) => setCart(p => [...p, { ...i, uniqueKey: Math.random() }]);
  const removeFromCart = (idx) => setCart(p => p.filter((_, i) => i !== idx));
  const scrollToOrder = () => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  const scrollToMenu = () => {
      const target = document.getElementById("sec-burgers");
      if(target) window.scrollTo({ top: target.offsetTop - 100, behavior: "smooth" });
  };

  const closeAllMenus = () => {
    setShowCardBurger(false); setShowCardPostres(false); setShowCardDrink(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const burgers = data.filter(i => i.category === "food");
  const drinks = data.filter(i => i.category === "drink");
  const postres = data.filter(i => i.category === "postre");

  const GOLD_BRIGHT = "#FFD700";
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: '#111', color: '#fff' }}>
      <style>{`
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container {
          position: relative; cursor: pointer; display: inline-block; border-radius: 20px;
          overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.8); transition: 0.5s;
          max-width: 500px; width: 100%; margin-bottom: 20px; border: 2px solid rgba(255, 215, 0, 0.3);
        }
        .promo-container:hover { transform: translateY(-5px); border-color: ${GOLD_BRIGHT}; }
        .promo-img { width: 100%; display: block; transition: 0.5s; }
        .promo-container:hover .promo-img { opacity: 0.7; transform: scale(1.05); }
        .btn-overlay {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: ${GOLD_GRADIENT}; color: #000 !important; padding: 12px 25px; border-radius: 8px; font-weight: 950;
          border: 2px solid #000; font-size: 1rem; text-transform: uppercase; z-index: 5; white-space: nowrap;
        }
        .grid-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px 0 100px; }
        .floating-close { position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%); background: #ff4757; color: #fff; border: 3px solid #000; padding: 12px 25px; border-radius: 10px; font-weight: 900; z-index: 9998; cursor: pointer; box-shadow: 4px 4px 0px #000; }
        .whatsapp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
        .testimonial-card { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; border-left: 4px solid ${GOLD_BRIGHT}; text-align: left; }
        @keyframes pulse-gold { 0%, 100% { transform: rotate(5deg) scale(1); } 50% { transform: rotate(5deg) scale(1.05); } }
        .pulse-badge { animation: pulse-gold 2s infinite ease-in-out; }
      `}</style>

      {/* SEO CACHÉ */}
      <h1 style={{ display: 'none' }}>Mejor Hamburguesería en Torrevieja - Smash Burgers Gourmet</h1>

      <Nav scrollToOrder={scrollToOrder} cartLength={cart.length} totalPrice={totalPrice} lang={lang} logo={logo} />

      {/* HERO */}
      <header style={{ padding: '140px 20px 60px', textAlign: 'center', backgroundColor: '#000', borderRadius: '0 0 50px 50px', borderBottom: '4px solid #ff4757', position: 'relative' }}>
        <div className="pulse-badge" style={{ position: 'absolute', top: '110px', right: '10%', background: GOLD_GRADIENT, color: '#000', padding: '6px 15px', borderRadius: '50px', fontWeight: '950', fontSize: '0.8rem', transform: 'rotate(5deg)', zIndex: 10, border: '2px solid #000' }}>🏆 #1 TORREVIEJA 2026</div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h2>
        <p style={{ fontSize: '1.1rem', color: '#ccc' }}>{lang === 'es' ? 'Smash Burgers & Comida Casera' : 'Smash Burgers & Homemade Food'}</p>

        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="tel:+34602597210" style={{ background: GOLD_GRADIENT, color: '#000', padding: '12px 25px', borderRadius: '50px', textDecoration: 'none', fontWeight: '950', border: '2px solid #000' }}>📞 {lang === 'es' ? 'PEDIR' : 'ORDER'}</a>
          <button onClick={scrollToMenu} style={{ backgroundColor: '#fff', color: '#111', padding: '12px 25px', borderRadius: '50px', border: '2px solid #111', fontWeight: '950', cursor: 'pointer' }}>{lang === 'es' ? 'CARTA' : 'MENU'}</button>
        </div>
      </header>

      <main className="menu-page-container">
        {/* TESTIMONIALS */}
        <section style={{ padding: '30px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            <div className="testimonial-card">
              <p style={{ fontStyle: 'italic' }}>{lang === 'es' ? '¡La mejor Smash de la ciudad!' : 'Best Smash in town!'}</p>
              <p style={{ fontWeight: 'bold', color: '#ff4757' }}>— Carlos R. ⭐⭐⭐⭐⭐</p>
            </div>
            <div className="testimonial-card">
              <p style={{ fontStyle: 'italic' }}>{lang === 'es' ? 'Carne fresca y servicio top.' : 'Fresh meat and top service.'}</p>
              <p style={{ fontWeight: 'bold', color: '#ff4757' }}>— Sarah M. ⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        </section>

        {/* MENU SECTIONS */}
        <section>
          <SectionTitle id="sec-burgers">{lang === 'es' ? 'Burgers' : 'Burgers'}</SectionTitle>
          {showCardBurger ? (
            <div className="grid-cards">{burgers.map(item => <CardMenu key={item.id} {...item} addToCart={addToCart} lang={lang} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardBurger(true)}>
              <img src={Burger} className="promo-img" alt="Burgers" />
              <button className="btn-overlay">{lang === 'es' ? 'VER CARTA' : 'SEE MENU'}</button>
            </div>
          )}
        </section>

        <section>
          <SectionTitle id="sec-bebidas">{lang === 'es' ? 'Bebidas' : 'Drinks'}</SectionTitle>
          {showCardDrink ? (
            <div className="grid-cards">{drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={addToCart} lang={lang} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardDrink(true)}>
              <img src={Drink} className="promo-img" alt="Drinks" />
              <button className="btn-overlay">{lang === 'es' ? 'VER BEBIDAS' : 'SEE DRINKS'}</button>
            </div>
          )}
        </section>

        <section>
          <SectionTitle id="sec-postres">{lang === 'es' ? 'Postres' : 'Desserts'}</SectionTitle>
          {showCardPostres ? (
            <div className="grid-cards">{postres.map(item => <CardMenu key={item.id} {...item} isPostreCard={true} addToCart={addToCart} lang={lang} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardPostres(true)}>
              <img src={Postre} className="promo-img" alt="Desserts" />
              <button className="btn-overlay">{lang === 'es' ? 'VER POSTRES' : 'SEE DESSERTS'}</button>
            </div>
          )}
        </section>

        <section id="order">
          <SectionTitle>{lang === 'es' ? 'Tu Carrito' : 'Your Cart'}</SectionTitle>
          <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
        </section>
      </main>

      {/* FOOTER STRATÉGIQUE */}
      <footer style={{ padding: '60px 20px', backgroundColor: '#000', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '40px' }}>
            <div>
              <h3 style={{ color: '#ff4757' }}>La Casa de Burger</h3>
              <p>Av. Diego Ramírez Pastor, 142, 03181 Torrevieja.</p>
              <p>📞 <a href="tel:+34602597210" style={{ color: '#fff' }}>602 59 72 10</a></p>
            </div>
            <div>
              <h4 style={{ color: GOLD_BRIGHT }}>🕒 Horario</h4>
              <p>Lun - Sáb: 13:00 – 22:30</p>
              <p>Dom: Cerrado</p>
            </div>
          </div>

          {/* SOCIAL & TRUST */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer"><img src={fb} width="40" alt="FB" /></a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer"><img src={instagramIcon} width="40" alt="IG" /></a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja" target="_blank" rel="noreferrer"><img src={tripadvisor} width="120" alt="Tripadvisor" /></a>
            <a href="https://maps.app.goo.gl/YV9WnB8y2x4uUeS7A" target="_blank" rel="noreferrer"><img src={googleIcon} width="120" alt="Google" /></a>
          </div>

          <p style={{ fontSize: '0.7rem', color: '#555', textAlign: 'justify' }}>
            <strong>SEO:</strong> Hamburguesas Torrevieja, Smash Burgers Alicante, Delivery Torrevieja, Comida para llevar. Reparto en: Playa del Cura, Los Locos, La Siesta, Aguas Nuevas, Los Balcones, La Mata.
          </p>
        </div>
      </footer>

      <a href="https://wa.me/34602597210" className="whatsapp-float" target="_blank" rel="noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="35" alt="WA" />
      </a>

      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAllMenus}>✕ {lang === 'es' ? 'CERRAR' : 'CLOSE'}</button>
      )}
    </div>
  );
}
