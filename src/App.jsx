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

  // --- CALCUL DU TOTAL (Synchro Nav) ---
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
        .video-footer-container { width: 100%; max-width: 700px; margin: 40px auto; border-radius: 15px; overflow: hidden; border: 3px solid #ff4757; }
        .footer-keywords { color: #555; font-size: 0.65rem; max-width: 1100px; margin: 25px auto; line-height: 1.6; text-align: justify; border-top: 1px solid #222; padding-top: 20px; }
        .whatsapp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
      `}</style>

      <Nav scrollToOrder={scrollToOrder} cartLength={cart.length} totalPrice={totalPrice} />

      <header style={{ padding: '140px 20px 80px', textAlign: 'center', backgroundColor: '#000', borderRadius: '0 0 50px 50px', borderBottom: '4px solid #ff4757', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '110px', right: '10%', background: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem', transform: 'rotate(5deg)', zIndex: 10 }}>🏆 #1 Gourmet Burger</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h1>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="tel:+34602597210" style={{ backgroundColor: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>📞 LLAMAR</a>
          <button onClick={scrollToMenu} style={{ backgroundColor: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>VER CARTA</button>
          <button onClick={scrollToOrder} style={{ backgroundColor: '#ff4757', color: '#fff', padding: '10px 25px', borderRadius: '50px', border: 'none', fontWeight: '900', cursor: 'pointer' }}>🛒 {totalPrice}€</button>
        </div>
      </header>

      <main className="menu-page-container">
        <section>
          <SectionTitle id="sec-burgers">Burgers</SectionTitle>
          {showCardBurger ? (
            <div className="grid-cards">{burgers.map(item => <CardMenu key={item.id + Math.random()} {...item} addToCart={addToCart} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardBurger(true)}><img src={Burger} className="promo-img" alt="Burgers" /><button className="btn-overlay">VER CARTA</button></div>
          )}
        </section>

        <section>
          <SectionTitle id="sec-postres">Postres</SectionTitle>
          {showCardPostres ? (
            <div className="grid-cards">{postres.map(item => <CardMenu key={item.id + Math.random()} {...item} isPostreCard={true} addToCart={addToCart} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardPostres(true)}><img src={Postre} className="promo-img" alt="Postres" /><button className="btn-overlay">VER POSTRES</button></div>
          )}
        </section>

        <section id="order"><SectionTitle>Tu Pedido</SectionTitle><Order cart={cart} removeFromCart={removeFromCart} /></section>
      </main>

      <footer style={{ padding: '60px 20px', backgroundColor: '#000', color: '#fff', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '20px', textAlign: 'left', marginBottom: '30px' }}>
             <h3 style={{ color: '#ff4757', textTransform: 'uppercase' }}>La Casa de Burger Torrevieja</h3>
             <p>📍 Av. Diego Ramírez Pastor, 142, 03181 Torrevieja, Espagne</p>
             <p>🕒 Lunes a Sábado - 13:00 a 22:30 (Domingo cerrado)</p>
          </div>

          {/* VIDÉO YOUTUBE DANS LE FOOTER */}
          <div className="video-footer-container">
            <iframe width="100%" height="380" src="https://www.youtube.com/embed/qN6VZYBojLs" title="YouTube video" frameBorder="0" allowFullScreen></iframe>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '35px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer"><img src={fb} style={{ width: '40px' }} alt="FB"/></a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer"><img src={instagramIcon} style={{ width: '40px' }} alt="IG"/></a>
            <a href="https://es.restaurantguru.com/La-Casa-de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ border: '2px solid #ff4757', padding: '10px 20px', borderRadius: '50px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Restaurant Guru 2026</a>
            <a href="https://www.google.com/maps/search/?api=1&query=La+Casa+de+Burger+Torrevieja" target="_blank" rel="noreferrer"><img src={googleIcon} style={{ width: '130px' }} alt="Maps" /></a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja_Costa_Blanca_Province_of_Alicante_Valencian_Communi.html" target="_blank" rel="noreferrer"><img src={tripadvisor} style={{ width: '130px' }} alt="Trip" /></a>
          </div>

          <div className="footer-keywords">
            <strong>Variantes:</strong> Hamburguesería Torrevieja, Smash Burguers, Gourmet Burger, Takeaway, Delivery.
            <br /><strong>Français:</strong> Meilleur burger Torrevieja, Restaurant de burgers centre-ville, Livraison rapide.
            <br /><strong>Svenska/Norsk:</strong> Bästa burgare i Torrevieja, Hemleverans mat, Playa del Cura.
            <br /><strong>Русский/Українська:</strong> Кращі бургери Торрев'єха, Смачні гамбургери, Доставка їжі.
            <br /><strong>Zonas de Servicio:</strong> Playa del Cura, Playa de los Locos, Paseo Marítimo, La Siesta, Aguas Nuevas, Los Balcones, Punta Prima, Torre del Moro, Centro Ciudad, Cabo Roig, Orihuela Costa, La Mata, Los Altos, El Acequión, La Veleta.
          </div>
          <p style={{ fontSize: '0.7rem', color: '#444', marginTop: '20px' }}>© {new Date().getFullYear()} La Casa de Burger</p>
        </div>
      </footer>

      <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{width: '60px'}} alt="WhatsApp" />
      </a>

      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAllMenus}>✕ CERRAR CARTA</button>
      )}
    </div>
  );
}
