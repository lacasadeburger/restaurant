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

  const addToCart = (i) => setCart(p => [...p, { ...i, uniqueKey: Math.random() }]);
  const removeFromCart = (idx) => setCart(p => p.filter((_, i) => i !== idx));
  const scrollToOrder = () => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  const scrollToMenu = () => window.scrollTo({ top: document.getElementById("sec-burgers")?.offsetTop - 100, behavior: "smooth" });
  const closeAll = () => { setShowCardBurger(false); setShowCardPostres(false); setShowCardDrink(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const burgers = data.filter(i => i.category === "food");
  const drinks = data.filter(i => i.category === "drink");
  const postres = data.filter(i => i.category === "postre");

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: '#111', color: '#fff' }}>
      <style>{`
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container { position: relative; cursor: pointer; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: 0.5s; width: 100%; max-width: 500px; margin: 0 auto 20px; }
        .promo-container:hover { transform: scale(1.02); }
        .promo-img { width: 100%; display: block; opacity: 0.8; }
        .btn-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff4757; color: white; padding: 12px 25px; border-radius: 50px; font-weight: 900; border: none; font-size: 1.1rem; pointer-events: none; }
        .grid-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding-bottom: 100px; }
        .floating-close { position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%); background: #ff4757; color: #fff; border: 2px solid #fff; padding: 12px 25px; border-radius: 50px; font-weight: 900; z-index: 9998; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
        .whatsapp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
      `}</style>

      <Nav scrollToOrder={scrollToOrder} cartLength={cart.length} totalPrice={totalPrice} />

      <header style={{ padding: '140px 20px 80px', textAlign: 'center', background: '#000', borderBottom: '4px solid #ff4757', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '110px', right: '10%', background: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem', transform: 'rotate(5deg)' }}>🏆 #1 Gourmet Burger</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h1>
        <p style={{ color: '#ccc' }}>{lang === 'es' ? 'La referencia de la hamburguesa artesanal.' : 'The reference for handcrafted burgers.'}</p>
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="tel:+34602597210" style={{ background: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>📞 LLAMAR</a>
          <button onClick={scrollToMenu} style={{ background: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>VER CARTA</button>
          <button onClick={scrollToOrder} style={{ background: '#ff4757', color: '#fff', padding: '10px 25px', borderRadius: '50px', border: 'none', fontWeight: '900', cursor: 'pointer' }}>🛒 {totalPrice}€</button>
        </div>
      </header>

      <main className="menu-page-container">
        <section><SectionTitle id="sec-burgers">Burgers</SectionTitle>
          {showCardBurger ? <div className="grid-cards">{burgers.map(item => <CardMenu key={item.id+Math.random()} {...item} addToCart={addToCart} />)}</div> :
          <div className="promo-container" onClick={() => setShowCardBurger(true)}><img src={Burger} className="promo-img" alt="Mejores Burgers Torrevieja"/><button className="btn-overlay">VER CARTA</button></div>}
        </section>

        <section><SectionTitle id="sec-bebidas">Bebidas</SectionTitle>
          {showCardDrink ? <div className="grid-cards">{drinks.map(item => <CardMenu key={item.id+Math.random()} {...item} isDrinkCard={true} addToCart={addToCart} />)}</div> :
          <div className="promo-container" onClick={() => setShowCardDrink(true)}><img src={Drink} className="promo-img" alt="Bebidas frías"/><button className="btn-overlay">VER BEBIDAS</button></div>}
        </section>

        <section><SectionTitle id="sec-postres">Postres</SectionTitle>
          {showCardPostres ? <div className="grid-cards">{postres.map(item => <CardMenu key={item.id+Math.random()} {...item} isPostreCard={true} addToCart={addToCart} />)}</div> :
          <div className="promo-container" onClick={() => setShowCardPostres(true)}><img src={Postre} className="promo-img" alt="Postres caseros"/><button className="btn-overlay">VER POSTRES</button></div>}
        </section>

        <section id="order"><SectionTitle>Tu Pedido</SectionTitle><Order cart={cart} removeFromCart={removeFromCart} /></section>
      </main>

      {/* --- FOOTER SEO DIAMANT --- */}
      <footer style={{ padding: '80px 20px 40px', background: '#000', borderTop: '4px solid #ff4757', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px' }}>
            <div>
              <h3 style={{ color: '#ff4757', marginBottom: '10px' }}>La Casa de Burger Torrevieja</h3>
              <p>La mejor hamburguesería artesanal de Torrevieja. Smash Burgers, carne Black Angus y productos frescos. Gourmet Take Away & Delivery.</p>
            </div>
            <div>
              <h4 style={{ color: '#fff' }}>📍 Ubicación y Horario</h4>
              <p>Av. Diego Ramírez Pastor, 142, 03181 Torrevieja, Alicante</p>
              <p>Lunes a Sábado: 13:00 – 22:30 (Domingo cerrado)</p>
            </div>
          </div>

          <div style={{ marginBottom: '40px', borderRadius: '15px', overflow: 'hidden', border: '3px solid #ff4757' }}>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/qN6VZYBojLs" title="Best Burger in Torrevieja" frameBorder="0" allowFullScreen></iframe>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', marginBottom: '40px', alignItems: 'center' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer"><img src={fb} width="45" alt="Facebook"/></a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer"><img src={instagramIcon} width="45" alt="Instagram"/></a>
            <a href="https://es.restaurantguru.com/La-Casa- de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ background: '#fff', color: '#000', padding: '12px 25px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>RESTAURANT GURU 2026</a>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer"><img src={googleIcon} width="140" alt="Google Maps"/></a>
            <a href="https://www.tripadvisor.es" target="_blank" rel="noreferrer"><img src={tripadvisor} width="140" alt="Tripadvisor"/></a>
          </div>

          <div style={{ background: '#0a0a0a', padding: '30px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify' }}>
            <p style={{ color: '#777', fontSize: '0.8rem', lineHeight: '1.8' }}>
              <strong>🇪🇸 ESPAÑOL:</strong> Hamburguesería en Torrevieja, mejores hamburguesas Alicante, Smash Burger cerca de mí, comida a domicilio Torrevieja, Playa del Cura.
              <br /><strong>🇬🇧 ENGLISH:</strong> Best burgers in Torrevieja, gourmet restaurant, takeaway near me, Smash burgers Costa Blanca, dinner near Playa de los Locos.
              <br /><strong>🇫🇷 FRANÇAIS:</strong> Meilleur burger Torrevieja, cuisine artisanale, livraison rapide, manger à Torrevieja centre.
              <br /><strong>🇸🇪 SVENSKA:</strong> Bästa burgare i Torrevieja, restaurang nära stranden, godaste smashburgaren Alicante.
              <br /><strong>🇷🇺 РУССКИЙ:</strong> Лучшие бургеры в Торревьехе, заказать еду, доставка бургеров Торревьеха.
              <br /><br />
              <strong>ZONAS DE SERVICIO:</strong> Playa del Cura, Playa de los Locos, Paseo Marítimo, La Siesta, Aguas Nuevas, Los Balcones, Punta Prima, Torre del Moro, Torrevieja Centro, La Mata, Los Altos, El Acequión, La Veleta.
            </p>
          </div>
          <p style={{ marginTop: '30px', color: '#444', fontSize: '0.8rem' }}>© {new Date().getFullYear()} La Casa de Burger - Gourmet Burger Specialist</p>
        </div>
      </footer>

      <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="40" alt="WhatsApp" />
      </a>
      {(showCardBurger || showCardPostres || showCardDrink) && <button className="floating-close" onClick={closeAll}>✕ CERRAR CARTA</button>}
    </div>
  );
}
