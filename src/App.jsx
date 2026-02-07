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

  // --- CALCUL DU TOTAL (Synchro Nav & Header) ---
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const val = item.precio || item.price || 0;
      const numericValue = String(val).replace(/[^0-9.,]/g, "").replace(",", ".");
      return acc + (parseFloat(numericValue) || 0);
    }, 0).toFixed(2);
  }, [cart]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLang((prev) => (prev === 'es' ? 'en' : 'es'));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, uniqueKey: Math.random() }]);
  };

  const removeFromCart = (index) => {
    setCart(prev => {
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const scrollToOrder = () => {
    const element = document.getElementById("order");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMenu = () => {
    const element = document.getElementById("sec-burgers");
    if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        window.scrollTo({ top: elementRect - bodyRect - offset, behavior: "smooth" });
    }
  };

  const closeAllMenus = () => {
    setShowCardBurger(false);
    setShowCardPostres(false);
    setShowCardDrink(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const burgers = data.filter((item) => item.category === "food");
  const drinks = data.filter((item) => item.category === "drink");
  const postres = data.filter((item) => item.category === "postre");

  return (
    <div className="app-main-wrapper" style={{ position: 'relative', backgroundColor: '#111', color: '#fff' }}>
      <style>{`
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container { position: relative; cursor: pointer; display: inline-block; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: 0.5s; max-width: 500px; width: 100%; margin-bottom: 20px; }
        .promo-container:hover { transform: scale(1.03); }
        .promo-img { width: 100%; display: block; opacity: 0.85; }
        .btn-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff4757; color: white; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: none; pointer-events: none; font-size: 1.1rem; box-shadow: 0 5px 20px rgba(0,0,0,0.4); }
        .grid-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px 0 120px; }
        .floating-close { position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%); background: #ff4757; color: #fff; border: 2px solid #fff; padding: 12px 25px; border-radius: 50px; font-weight: 900; z-index: 9998; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.6); text-transform: uppercase; font-size: 1rem; }
        .whatsapp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
      `}</style>

      {/* --- NAVIGATION FIXE --- */}
      <Nav scrollToOrder={scrollToOrder} cartLength={cart.length} totalPrice={totalPrice} />

      {/* --- HEADER --- */}
      <header style={{ padding: '140px 20px 80px', textAlign: 'center', backgroundColor: '#000', borderRadius: '0 0 50px 50px', borderBottom: '4px solid #ff4757', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '110px', right: '10%', background: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem', transform: 'rotate(5deg)', zIndex: 10 }}>🏆 #1 Gourmet Burger</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h1>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="tel:+34602597210" style={{ backgroundColor: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>📞 LLAMAR</a>
          <button onClick={scrollToMenu} style={{ backgroundColor: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>VER CARTA</button>
          <button onClick={scrollToOrder} style={{ backgroundColor: '#ff4757', color: '#fff', padding: '10px 25px', borderRadius: '50px', border: 'none', fontWeight: '900', cursor: 'pointer' }}>🛒 {totalPrice}€</button>
        </div>
      </header>

      {/* --- MENU SECTIONS --- */}
      <main className="menu-page-container">
        <section>
          <SectionTitle id="sec-burgers">Nuestras Burgers</SectionTitle>
          {showCardBurger ? (
            <div className="grid-cards">{burgers.map(item => <CardMenu key={item.id + Math.random()} {...item} addToCart={addToCart} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardBurger(true)}><img src={Burger} className="promo-img" alt="Menu Burgers Torrevieja" /><button className="btn-overlay">VER CARTA</button></div>
          )}
        </section>

        <section>
          <SectionTitle id="sec-postres">Postres Caseros</SectionTitle>
          {showCardPostres ? (
            <div className="grid-cards">{postres.map(item => <CardMenu key={item.id + Math.random()} {...item} isPostreCard={true} addToCart={addToCart} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardPostres(true)}><img src={Postre} className="promo-img" alt="Postres Caseros" /><button className="btn-overlay">VER POSTRES</button></div>
          )}
        </section>

        <section id="order"><SectionTitle>Tu Pedido</SectionTitle><Order cart={cart} removeFromCart={removeFromCart} /></section>
      </main>

      {/* --- FOOTER SEO BLACK BELT --- */}
      <footer style={{ padding: '80px 20px 40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* IDENTITÉ & CONTACT */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px', border: '1px solid #222' }}>
             <div>
               <h3 style={{ color: '#ff4757', textTransform: 'uppercase', marginBottom: '15px', fontSize: '1.5rem' }}>La Casa de Burger Torrevieja</h3>
               <p style={{ lineHeight: '1.6' }}><strong>La mejor hamburguesería artesanal de Torrevieja.</strong> Smash Burgers, carne Black Angus y productos frescos. Gourmet Take Away & Delivery.</p>
             </div>
             <div>
               <h4 style={{ color: '#fff', marginBottom: '10px' }}>📍 Ubicación</h4>
               <p>Calle Diego Ramírez Pastor, 142<br />03181 Torrevieja, Alicante</p>
               <p style={{ marginTop: '10px' }}>📞 <a href="tel:+34602597210" style={{ color: '#ff4757', textDecoration: 'none' }}>+34 602 59 72 10</a></p>
             </div>
             <div>
               <h4 style={{ color: '#fff', marginBottom: '10px' }}>🕒 Horario</h4>
               <p>Lunes a Sábado: 13:00 – 22:30</p>
               <p>Domingo: Cerrado</p>
             </div>
          </div>

          {/* VIDÉO YOUTUBE STRATÉGIQUE */}
          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto 50px', borderRadius: '15px', overflow: 'hidden', border: '2px solid #333' }}>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/qN6VZYBojLs" title="Mejor Burger Torrevieja" frameBorder="0" allowFullScreen></iframe>
          </div>

          {/* TRUST SIGNALS & SOCIAL */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer"><img src={fb} style={{ width: '45px' }} alt="Facebook La Casa de Burger" /></a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer"><img src={instagramIcon} style={{ width: '45px' }} alt="Instagram Burger" /></a>
            <a href="https://es.restaurantguru.com/La-Casa-de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ background: '#fff', color: '#000', padding: '10px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>RESTAURANT GURU 2026</a>
            <a href="https://www.google.com/maps/search/?api=1&query=La+Casa+de+Burger+Torrevieja" target="_blank" rel="noreferrer"><img src={googleIcon} style={{ width: '130px' }} alt="Google Maps Reviews" /></a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews" target="_blank" rel="noreferrer"><img src={tripadvisor} style={{ width: '130px' }} alt="Tripadvisor Reviews" /></a>
          </div>

          {/* SEO KEYWORDS CLOUD */}
          <div style={{ backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '15px', border: '1px solid #111', textAlign: 'justify' }}>
            <p style={{ color: '#666', fontSize: '0.75rem', lineHeight: '1.8' }}>
              <strong>🇪🇸 ESPAÑOL:</strong> Hamburguesería en Torrevieja, mejores hamburguesas Alicante, Smash Burger cerca de mí, cena rápida Torrevieja, comida a domicilio, restaurante Playa del Cura.
              <br /><strong>🇬🇧 ENGLISH:</strong> Best burgers in Torrevieja, gourmet restaurant, takeaway near me, Smash burgers Costa Blanca, dinner near Playa de los Locos.
              <br /><strong>🇫🇷 FRANÇAIS:</strong> Meilleur burger Torrevieja, cuisine artisanale, livraison rapide, manger à Torrevieja centre.
              <br /><strong>🇸🇪 SVENSKA / 🇳🇴 NORSK:</strong> Bästa burgare i Torrevieja, restaurang nära stranden, godaste smashburgaren Alicante.
              <br /><strong>🇷🇺 РУССКИЙ / 🇺🇦 УКРАЇНСЬКА:</strong> Лучшие бургеры в Торревьехе, заказать еду, доставка бургеров Торревьеха.
            </p>
            <div style={{ height: '1px', background: '#222', margin: '20px 0' }}></div>
            <p style={{ color: '#555', fontSize: '0.75rem', lineHeight: '1.8' }}>
              <strong>ZONAS:</strong> Playa del Cura, Playa de los Locos, Paseo Marítimo, La Siesta, Aguas Nuevas, Los Balcones, Punta Prima, Torre del Moro, Torrevieja Centro, Cabo Roig, Orihuela Costa, La Mata, Los Altos, El Acequión, La Veleta.
            </p>
          </div>

          <p style={{ marginTop: '40px', fontSize: '0.8rem', color: '#444' }}>© {new Date().getFullYear()} La Casa de Burger Torrevieja</p>
        </div>
      </footer>

      {/* --- ELEMENTS FLOTTANTS --- */}
      <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{width: '60px'}} alt="WhatsApp" />
      </a>

      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAllMenus}>✕ CERRAR CARTA</button>
      )}
    </div>
  );
}
