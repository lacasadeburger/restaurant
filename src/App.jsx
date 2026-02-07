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

  // Calcul du prix total avec useMemo pour garantir la synchronisation immédiate
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + (Number(item.price) || 0), 0).toFixed(2);
  }, [cart]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLang((prev) => (prev === 'es' ? 'en' : 'es'));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

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
    setShowCardBurger(false); setShowCardPostres(false); setShowCardDrink(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (item) => setCart([...cart, { ...item, uniqueId: Date.now() }]);
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const burgers = data.filter((item) => item.category === "food");
  const drinks = data.filter((item) => item.category === "drink");
  const postres = data.filter((item) => item.category === "postre");

  const renderCards = (items, type) => items.map((item) => (
    <CardMenu key={item.id} {...item} isDrinkCard={type === "drink"} isPostreCard={type === "postre"} addToCart={addToCart} />
  ));

  // LIEN GOOGLE MAPS ROBUSTE (Remplace l'ancien lien 404)
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=La+Casa+de+Burger+Torrevieja";

  return (
    <div className="app-main-wrapper" style={{ position: 'relative', backgroundColor: '#111', color: '#fff' }}>
      <style>{`
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container { position: relative; cursor: pointer; display: inline-block; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: 0.5s; max-width: 500px; width: 100%; margin-bottom: 20px; }
        .promo-container:hover { transform: scale(1.03); }
        .promo-img { width: 100%; display: block; opacity: 0.85; }
        .btn-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff4757; color: white; padding: 15px 25px; border-radius: 50px; font-weight: 900; border: none; pointer-events: none; font-size: 1.1rem; box-shadow: 0 5px 20px rgba(0,0,0,0.4); }
        .grid-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px 0 120px; animation: fadeIn 0.6s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .floating-close { position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%); background: #ff4757; color: #fff; border: 2px solid #fff; padding: 15px 35px; border-radius: 50px; font-weight: 900; z-index: 10000; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.6); text-transform: uppercase; font-size: 1.1rem; }
        .footer-info { background: rgba(255,255,255,0.05); padding: 25px; border-radius: 20px; margin-bottom: 30px; border: 1px solid #333; line-height: 1.8; text-align: left; }
        .footer-keywords { color: #555; font-size: 0.65rem; max-width: 1100px; margin: 25px auto; line-height: 1.6; text-align: justify; border-top: 1px solid #222; padding-top: 20px; }
        .whatsapp-float { position: fixed; bottom: 30px; right: 20px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 5px 15px rgba(0,0,0,0.4); z-index: 9999; }
        .header-cart-btn { background: #ff4757; color: #fff; min-width: 100px; height: 60px; padding: 0 20px; border-radius: 50px; border: none; fontSize: 1.2rem; fontWeight: bold; cursor: pointer; display: flex; justify-content: center; alignItems: center; gap: 10px; box-shadow: 0 4px 10px rgba(255,71,87,0.4); transition: 0.3s; }
        .header-cart-btn:hover { transform: scale(1.05); background: #ff6b81; }
      `}</style>

      {/* NAV DIAMANT - Le prix est passé ici */}
      <Nav
        scrollToOrder={scrollToOrder}
        cartLength={cart.length}
        totalPrice={totalPrice}
      />

      <header style={{ padding: '140px 20px 80px', textAlign: 'center', backgroundColor: '#000', borderRadius: '0 0 50px 50px', borderBottom: '4px solid #ff4757', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '110px', right: '10%', background: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem', transform: 'rotate(5deg)', zIndex: 10 }}>🏆 #1 Gourmet Burger Torrevieja</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h1>
        <p style={{ fontSize: '1.2rem', color: '#ccc' }}>{lang === 'es' ? 'La referencia de la hamburguesa artesanal.' : 'The reference for handcrafted burgers.'}</p>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="tel:+34602597210" style={{ backgroundColor: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>📞 LLAMAR</a>

          <button onClick={scrollToMenu} style={{ backgroundColor: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            {lang === 'es' ? 'VER CARTA' : 'VIEW MENU'}
          </button>

          {/* Bouton Caddie Header sync avec le prix */}
          <button onClick={scrollToOrder} className="header-cart-btn">
            <span style={{fontSize: '1.5rem'}}>🛒</span>
            <span style={{fontWeight: '900'}}>{totalPrice}€</span>
          </button>
        </div>
      </header>

      <main className="menu-page-container">
        {/* Sections du menu (Burgers, Postres, Drinks) */}
        <section><SectionTitle id="sec-burgers">{lang === 'es' ? 'Nuestras Burgers' : 'Our Burgers'}</SectionTitle>
          {showCardBurger ? <div className="grid-cards">{renderCards(burgers, "food")}</div> : (
            <div className="promo-container" onClick={() => setShowCardBurger(true)}>
              <img src={Burger} className="promo-img" alt="Menu Burgers" />
              <button className="btn-overlay">VER CARTA</button>
            </div>
          )}
        </section>

        <section><SectionTitle id="sec-postres">{lang === 'es' ? 'Postres Caseros' : 'Homemade Desserts'}</SectionTitle>
          {showCardPostres ? <div className="grid-cards">{renderCards(postres, "postre")}</div> : (
            <div className="promo-container" onClick={() => setShowCardPostres(true)}>
              <img src={Postre} className="promo-img" alt="Menu Postres" />
              <button className="btn-overlay">VER POSTRES</button>
            </div>
          )}
        </section>

        <section><SectionTitle id="sec-drinks">{lang === 'es' ? 'Bebidas' : 'Drinks'}</SectionTitle>
          {showCardDrink ? <div className="grid-cards">{renderCards(drinks, "drink")}</div> : (
            <div className="promo-container" onClick={() => setShowCardDrink(true)}>
              <img src={Drink} className="promo-img" alt="Menu Drinks" />
              <button className="btn-overlay">VER BEBIDAS</button>
            </div>
          )}
        </section>

        <section id="order"><SectionTitle>{lang === 'es' ? 'Tu Pedido' : 'Your Order'}</SectionTitle><Order cart={cart} removeFromCart={removeFromCart} /></section>
      </main>

      <footer style={{ padding: '60px 20px', backgroundColor: '#000', color: '#fff', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div className="footer-info">
             <h3 style={{ color: '#ff4757', marginBottom: '15px', textTransform: 'uppercase', fontSize: '1.4rem' }}>La Casa de Burger Torrevieja</h3>
             <p>📍 <strong>Dirección:</strong> Av. Diego Ramírez Pastor, 142, 03181 Torrevieja, Alicante, España</p>
             <p>📞 <strong>Teléfono:</strong> <a href="tel:+34602597210" style={{ color: '#fff', textDecoration: 'none' }}>+34 602 59 72 10</a></p>
             <p>🕒 <strong>Horario:</strong> Abierto Lunes a Sábado - 13:00 a 22:30 (Domingo cerrado)</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '35px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer"><img src={fb} style={{ width: '40px' }} alt="Facebook"/></a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer"><img src={instagramIcon} style={{ width: '40px' }} alt="Instagram"/></a>
            <a href="https://es.restaurantguru.com/La-Casa-de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ border: '2px solid #ff4757', padding: '10px 20px', borderRadius: '50px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Restaurant Guru 2026</a>
            {/* LIEN GOOGLE CORRIGÉ ICI */}
            <a href={googleMapsUrl} target="_blank" rel="noreferrer"><img src={googleIcon} style={{ width: '130px' }} alt="Google Maps" /></a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja_Costa_Blanca_Province_of_Alicante_Valencian_Communi.html" target="_blank" rel="noreferrer"><img src={tripadvisor} style={{ width: '130px' }} alt="Tripadvisor Reviews" /></a>
          </div>

          <div className="footer-keywords">
            <strong>Variantes:</strong> Hamburguesería Torrevieja, Smash Burguers, Gourmet Burger, Hamburguesas artesanas, Takeaway Torrevieja, Delivery.
            <br /><strong>Français/Svenska/Русский:</strong> Meilleur burger, Bästa burgare, Кращі бургери Torrevieja.
          </div>

          <p style={{ marginTop: '40px', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #222', paddingTop: '20px' }}>
            © {new Date().getFullYear()} La Casa de Burger - Torrevieja.
          </p>
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
