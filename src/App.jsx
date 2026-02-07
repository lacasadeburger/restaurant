import React, { useState, useEffect } from "react";
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
import google from "./assets/google.png";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setLang((prev) => (prev === 'es' ? 'en' : 'es'));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // --- FONCTION PANIER / SCROLL ---
  const scrollToOrder = () => {
    const element = document.getElementById("order");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

  const addToCart = (item) => setCart([...cart, item]);
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

  return (
    <div className="app-main-wrapper" style={{ position: 'relative', backgroundColor: '#111', color: '#fff' }}>
      <style>{`
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container { position: relative; cursor: pointer; display: inline-block; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: 0.5s; max-width: 500px; width: 100%; margin-bottom: 20px; }
        .promo-container:hover { transform: scale(1.03); }
        .promo-img { width: 100%; display: block; }
        .btn-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff4757; color: white; padding: 12px 25px; border-radius: 50px; font-weight: bold; border: none; pointer-events: none; }
        .grid-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px 0 120px; animation: fadeIn 0.6s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .floating-close { position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%); background: #ff4757; color: #fff; border: 2px solid #fff; padding: 15px 35px; border-radius: 50px; font-weight: 900; z-index: 10000; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.6); text-transform: uppercase; font-size: 1.1rem; }
        .footer-keywords { color: #555; font-size: 0.65rem; max-width: 1100px; margin: 25px auto; line-height: 1.6; text-align: justify; border-top: 1px solid #222; padding-top: 20px; }
        .whatsapp-float { position: fixed; bottom: 30px; right: 20px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 2.2rem; box-shadow: 0 5px 15px rgba(0,0,0,0.4); z-index: 9999; text-decoration: none; }
      `}</style>

      {/* Le composant Nav reçoit la fonction scrollToOrder pour le panier */}
      <Nav scrollToOrder={scrollToOrder} cartLength={cart.length} />

      <header style={{ padding: '140px 20px 80px', textAlign: 'center', backgroundColor: '#000', borderRadius: '0 0 50px 50px', borderBottom: '4px solid #ff4757', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '110px', right: '10%', background: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem', transform: 'rotate(5deg)', zIndex: 10 }}>🏆 #1 Gourmet Burger Torrevieja</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h1>
        <p style={{ fontSize: '1.2rem', color: '#ccc' }}>{lang === 'es' ? 'La referencia de la hamburguesa artesanal.' : 'The reference for handcrafted burgers.'}</p>
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="tel:+34602597210" style={{ backgroundColor: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>📞 LLAMAR</a>
          <button onClick={scrollToMenu} style={{ backgroundColor: '#ff4757', color: '#fff', padding: '15px 30px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🛒 VER CARTA</button>
        </div>
      </header>

      <main className="menu-page-container">
        <section><SectionTitle id="sec-burgers">Burgers</SectionTitle>
          {showCardBurger ? <div className="grid-cards">{renderCards(burgers, "food")}</div> : <div className="promo-container" onClick={() => setShowCardBurger(true)}><img src={Burger} className="promo-img" alt="Menu Burgers" /><button className="btn-overlay">VER CARTA</button></div>}
        </section>
        <section><SectionTitle id="sec-postres">Postres</SectionTitle>
          {showCardPostres ? <div className="grid-cards">{renderCards(postres, "postre")}</div> : <div className="promo-container" onClick={() => setShowCardPostres(true)}><img src={Postre} className="promo-img" alt="Menu Postres" /><button className="btn-overlay">VER POSTRES</button></div>}
        </section>
        <section><SectionTitle id="sec-drinks">Bebidas</SectionTitle>
          {showCardDrink ? <div className="grid-cards">{renderCards(drinks, "drink")}</div> : <div className="promo-container" onClick={() => setShowCardDrink(true)}><img src={Drink} className="promo-img" alt="Menu Drinks" /><button className="btn-overlay">VER BEBIDAS</button></div>}
        </section>
        <section id="order"><SectionTitle>Tu Pedido</SectionTitle><Order cart={cart} removeFromCart={removeFromCart} /></section>
      </main>

      <footer style={{ padding: '60px 20px', backgroundColor: '#000', color: '#fff', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '35px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="https://www.facebook.com/share/1FZ8EswJS/" target="_blank" rel="noreferrer"><img src={fb} style={{ width: '40px' }} alt="Facebook"/></a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer"><img src={instagramIcon} style={{ width: '40px' }} alt="Instagram"/></a>
            <a href="https://es.restaurantguru.com/La-Casa-de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ border: '2px solid #ff4757', padding: '10px 20px', borderRadius: '50px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Restaurant Guru 2026</a>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer"><img src={google} style={{ width: '130px' }} alt="Google Reviews" /></a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187531-d26656728-Reviews-La_Casa_de_Burger-Torrevieja_Province_of_Alicante_Valencian_Community.html" target="_blank" rel="noreferrer"><img src={tripadvisor} style={{ width: '130px' }} alt="Tripadvisor Reviews" /></a>
          </div>

          <div className="footer-keywords">
            <strong>Variantes (Español/English):</strong> Hamburguesería Torrevieja, Smash Burguers, Gourmet Burger near me, Hamburguesas artesanas, Takeaway Torrevieja, Delivery fast food.
            <br /><strong> Français:</strong> Meilleur burger Torrevieja, Hamburgers artisanaux, Restaurant de burgers centre-ville, Livraison burger rapide, Cuisine américaine.
            <br /><strong> Svenska/Norsk:</strong> Bästa burgare i Torrevieja, Hamburgare restaurang, Hemleverans mat, Smashburgare, Godaste burgaren nära Playa del Cura.
            <br /><strong> Русский/Українська:</strong> Кращі бургери Торрев'єха, Бургерна поруч, Доставка їжі Торрев'єха, Смачні гамбургери, Лучшие бургеры Торревьеха, Заказать бургер с доставкой.
            <br /><strong> Zonas:</strong> Playa del Cura, Los Locos, Paseo Marítimo, La Siesta, Aguas Nuevas, Los Balcones, Punta Prima, Torre del Moro, Centro Ciudad, Cabo Roig, Orihuela Costa.
            <br /><strong> Tags:</strong> Black Angus, Brioche, Smash, Take Away, #1 Quality, Real 4.9 stars Google.
          </div>

          <p style={{ marginTop: '40px', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #222', paddingTop: '20px' }}>
            © {new Date().getFullYear()} La Casa de Burger - Torrevieja | <strong>Mejor Hamburguesería</strong> | <strong>Best Burgers in Town</strong>.
          </p>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{width: '100%'}} alt="WhatsApp" />
      </a>

      {/* BOUTON FERMER CENTRÉ */}
      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAllMenus}>✕ CERRAR CARTA</button>
      )}
    </div>
  );
}
