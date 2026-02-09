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

  // --- CALCUL DU TOTAL ---
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const val = item.precio || item.price || 0;
      const numericValue = String(val).replace(/[^0-9.,]/g, "").replace(",", ".");
      return acc + (parseFloat(numericValue) || 0);
    }, 0).toFixed(2);
  }, [cart]);

  // --- ALTERNANCE LANGUE (4.5s) ---
  useEffect(() => {
    const interval = setInterval(() => setLang(l => l === 'es' ? 'en' : 'es'), 4500);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (i) => setCart(p => [...p, { ...i, uniqueKey: Math.random() }]);
  const removeFromCart = (idx) => setCart(p => p.filter((_, i) => i !== idx));
  const scrollToOrder = () => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  const scrollToMenu = () => window.scrollTo({ top: document.getElementById("sec-burgers")?.offsetTop - 100, behavior: "smooth" });

  const closeAllMenus = () => {
    setShowCardBurger(false); setShowCardPostres(false); setShowCardDrink(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const burgers = data.filter(i => i.category === "food");
  const drinks = data.filter(i => i.category === "drink");
  const postres = data.filter(i => i.category === "postre");

  return (
    <div className="app-main-wrapper" style={{ position: 'relative', backgroundColor: '#111', color: '#fff' }}>
      <style>{`
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container { position: relative; cursor: pointer; display: inline-block; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: 0.5s; max-width: 500px; width: 100%; margin-bottom: 20px; border: 2px solid rgba(255,255,255,0.1); }
        .promo-container:hover { transform: scale(1.02); border-color: #f1c40f; }
        .promo-img { width: 100%; display: block; opacity: 1; transition: 0.3s; }
        .promo-container:hover .promo-img { opacity: 0.75; }

        .btn-overlay {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: #f1c40f;
          color: #000;
          padding: 10px 25px;
          border-radius: 6px;
          font-weight: 950;
          border: 3px solid #000;
          pointer-events: none;
          font-size: 1rem;
          box-shadow: 3px 3px 0px #000;
          text-transform: uppercase;
          z-index: 5;
          white-space: nowrap;
        }

        .grid-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px 0 120px; }

        .floating-close {
          position: fixed;
          bottom: 85px;
          left: 50%;
          transform: translateX(-50%);
          background: #ff4757;
          color: #fff;
          border: 3px solid #000;
          padding: 12px 25px;
          border-radius: 10px;
          font-weight: 900;
          z-index: 9998;
          cursor: pointer;
          box-shadow: 4px 4px 0px #000;
          text-transform: uppercase;
          font-size: 1rem;
        }

        .whatsapp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
      `}</style>

      <h1 style={{ position: 'absolute', left: '-9999px' }}>Mejor Hamburguesería en Torrevieja - Smash Burgers & Gourmet Delivery</h1>

      <Nav scrollToOrder={scrollToOrder} cartLength={cart.length} totalPrice={totalPrice} />

      <header style={{ padding: '140px 20px 80px', textAlign: 'center', backgroundColor: '#000', borderRadius: '0 0 50px 50px', borderBottom: '4px solid #ff4757', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '110px', right: '10%', background: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem', transform: 'rotate(5deg)', zIndex: 10 }}>🏆 #1 RESTAURANTE TORREVIEJA 2026</div>
        <h2 style={{ fontSize: '2.8rem', fontWeight: '900', textTransform: 'uppercase' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h2>
        <p style={{ fontSize: '1.2rem', color: '#ccc', minHeight: '1.5em' }}>
          {lang === 'es' ? 'Hamburguesas Artesanales & Smash Burgers a Domicilio' : 'Handcrafted Burgers & Gourmet Delivery in Torrevieja'}
        </p>
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="tel:+34602597210" style={{ backgroundColor: '#fff', color: '#111', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: '900' }}>📞 {lang === 'es' ? 'PEDIR AHORA' : 'ORDER NOW'}</a>
          <button onClick={scrollToMenu} style={{ backgroundColor: '#fff', color: '#111', padding: '15px 35px', borderRadius: '50px', border: 'none', fontWeight: '900', cursor: 'pointer' }}>{lang === 'es' ? 'CARTA ONLINE' : 'ONLINE MENU'}</button>
          <button onClick={scrollToOrder} style={{ backgroundColor: '#ff4757', color: '#fff', padding: '10px 25px', borderRadius: '50px', border: 'none', fontWeight: '900', cursor: 'pointer' }}>🛒 {totalPrice}€</button>
        </div>
      </header>

      <main className="menu-page-container">
        <section>
          <SectionTitle id="sec-burgers">{lang === 'es' ? 'Burgers Gourmet' : 'Gourmet Burgers'}</SectionTitle>
          {showCardBurger ? (
            <div className="grid-cards">{burgers.map(item => <CardMenu key={item.id + Math.random()} {...item} addToCart={addToCart} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardBurger(true)}>
              <img src={Burger} className="promo-img" alt="Smash Burger Torrevieja" />
              <button className="btn-overlay">{lang === 'es' ? 'VER BURGERS' : 'SEE BURGERS'}</button>
            </div>
          )}
        </section>

        <section>
          <SectionTitle id="sec-bebidas">{lang === 'es' ? 'Bebidas & Cocktails' : 'Drinks & Cocktails'}</SectionTitle>
          {showCardDrink ? (
            <div className="grid-cards">{drinks.map(item => <CardMenu key={item.id + Math.random()} {...item} isDrinkCard={true} addToCart={addToCart} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardDrink(true)}>
              <img src={Drink} className="promo-img" alt="Drinks Torrevieja" />
              <button className="btn-overlay">{lang === 'es' ? 'VER BEBIDAS' : 'SEE DRINKS'}</button>
            </div>
          )}
        </section>

        <section>
          <SectionTitle id="sec-postres">{lang === 'es' ? 'Postres Caseros' : 'Homemade Desserts'}</SectionTitle>
          {showCardPostres ? (
            <div className="grid-cards">{postres.map(item => <CardMenu key={item.id + Math.random()} {...item} isPostreCard={true} addToCart={addToCart} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardPostres(true)}>
              <img src={Postre} className="promo-img" alt="Desserts Torrevieja" />
              <button className="btn-overlay">{lang === 'es' ? 'VER POSTRES' : 'SEE DESSERTS'}</button>
            </div>
          )}
        </section>

        {/* MODIFICATION ICI : On passe la langue (lang) au composant Order */}
        <section id="order">
          <SectionTitle>{lang === 'es' ? 'Tu Pedido' : 'Your Order'}</SectionTitle>
          <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
        </section>
      </main>

      <footer style={{ padding: '80px 20px 40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px' }}>
              <div>
                <h3 style={{ color: '#ff4757' }}>La Casa de Burger Torrevieja</h3>
                <p>
                  {lang === 'es'
                    ? 'La mejor hamburguesería artesanal de Torrevieja. Smash Burgers, carne Fresca y productos locales.'
                    : 'The best handcrafted burger shop in Torrevieja. Smash Burgers, Fresh Meat and local products.'}
                </p>
              </div>
              <div>
                <h4 style={{ color: '#fff' }}>📍 {lang === 'es' ? 'Ubicación y Contacto' : 'Location & Contact'}</h4>
                <p>Av. Diego Ramírez Pastor, 142, 03181 Torrevieja, Alicante</p>
                <p>📞 <a href="tel:+34602597210" style={{ color: '#fff', textDecoration: 'none' }}>+34 602 59 72 10</a></p>
              </div>
              <div>
                <h4 style={{ color: '#fff' }}>🕒 {lang === 'es' ? 'Horario Gourmet' : 'Gourmet Hours'}</h4>
                <p>{lang === 'es' ? 'Lunes a Sábado: 13:00 – 22:30' : 'Monday to Saturday: 1:00 PM – 10:30 PM'}</p>
                <p>{lang === 'es' ? 'Domingo: Cerrado' : 'Sunday: Closed'}</p>
              </div>
          </div>

          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto 50px', borderRadius: '15px', overflow: 'hidden', border: '3px solid #ff4757' }}>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/qN6VZYBojLs" title="Mejor Burger Torrevieja" frameBorder="0" allowFullScreen></iframe>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', marginBottom: '40px', alignItems: 'center' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer"><img src={fb} width="45" alt="Facebook" /></a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer"><img src={instagramIcon} width="45" alt="Instagram" /></a>
            <a href="https://es.restaurantguru.com/La-Casa-de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ background: '#fff', color: '#000', padding: '12px 25px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>GURU 2026</a>
            <a href="https://www.google.com/maps/search/?api=1&query=La+Casa+de+Burger+Torrevieja" target="_blank" rel="noreferrer"><img src={googleIcon} width="140" alt="Google Maps" /></a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja_Costa_Blanca_Province_of_Alicante_Valencian_Communi.html" target="_blank" rel="noreferrer"><img src={tripadvisor} width="140" alt="Tripadvisor" /></a>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="40" alt="WhatsApp" />
      </a>

      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAllMenus}>
          {lang === 'es' ? '✕ CERRAR CARTA' : '✕ CLOSE MENU'}
        </button>
      )}
    </div>
  );
}
