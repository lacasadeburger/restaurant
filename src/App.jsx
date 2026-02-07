import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Order from "./Order";
import CardMenu from "./CardMenu";
import Footer from "./Footer";
import "./style.css";
import data from "./data";

// --- ASSETS ---
import fb from "./assets/FB.png";
import instagram from "./assets/instagram.png";
import Postre from "./assets/postre.png";
import Burger from "./assets/burger.png";
import Drink from "./assets/drink.png";
import tripadvisor from "./assets/tripadvisor.png";
import google from "./assets/google.png";

// --- GALERIE VISUELLE HAUTE QUALITÉ ---
const galleryImages = [
  "http://googleusercontent.com/image_generation_content/1",
  "http://googleusercontent.com/image_generation_content/1",
  "http://googleusercontent.com/image_generation_content/1",
  "http://googleusercontent.com/image_generation_content/1"
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

  useEffect(() => {
    const interval = setInterval(() => {
      setLang((prev) => (prev === 'es' ? 'en' : 'es'));
    }, 5000);
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
    setShowCardBurger(false);
    setShowCardPostres(false);
    setShowCardDrink(false);
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
        .floating-close {
          position: fixed;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          background: #ff4757;
          color: #fff;
          border: 2px solid #fff;
          padding: 15px 35px;
          border-radius: 50px;
          font-weight: 900;
          z-index: 10000;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          text-transform: uppercase;
          font-size: 1.1rem;
          white-space: nowrap;
        }
        .grid-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          padding: 20px 0 120px;
          animation: fadeIn 0.5s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .whatsapp-button {
          position: fixed; bottom: 30px; right: 20px;
          background-color: #25D366; color: white; borderRadius: 50%;
          width: 60px; height: 60px; display: flex; justifyContent: center;
          align-items: center; fontSize: 2rem; boxShadow: 0 4px 15px rgba(0,0,0,0.4);
          zIndex: 9998; textDecoration: none;
        }
      `}</style>

      <Nav scrollToOrder={scrollToOrder} />

      <header style={{
        padding: '140px 20px 80px', textAlign: 'center', backgroundColor: '#000',
        borderRadius: '0 0 50px 50px', borderBottom: '4px solid #ff4757', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '120px', right: '10%', background: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem', transform: 'rotate(5deg)', zIndex: 10 }}>
          🏆 #1 Burger Torrevieja
        </div>

        <div style={{ minHeight: '140px' }}>
          {lang === 'es' ? (
            <>
              <h1 style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '10px' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#ccc' }}>
                Hamburguesas artesanales gourmet a pasos de la <strong>Playa del Cura</strong>. Calidad real, sabor inigualable.
              </p>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '10px' }}>Gourmet Burgers in <span style={{color:'#ff4757'}}>Torrevieja</span></h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#ccc' }}>
                The best smash burgers near <strong>Paseo Maritimo</strong>. Handcrafted with passion, delivered to you.
              </p>
            </>
          )}
        </div>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={scrollToMenu} style={{ backgroundColor: '#ff4757', color: '#fff', padding: '15px 35px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>🛒 VER CARTA</button>
          <a href="tel:+34602597210" style={{ backgroundColor: '#fff', color: '#111', padding: '15px 35px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>📞 LLAMAR</a>
        </div>
      </header>

      <section style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '30px', textTransform: 'uppercase' }}>
          {lang === 'es' ? 'Nuestras Creaciones' : 'Our Creations'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {galleryImages.map((img, idx) => (
            <div key={idx} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
              <img src={img} alt="Gourmet Burger" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      <main className="menu-page-container">
        <section>
          <SectionTitle id="sec-burgers">{lang === 'es' ? 'Burgers' : 'Burgers'}</SectionTitle>
          {showCardBurger ? <div className="grid-cards">{renderCards(burgers, "food")}</div> : (
            <div className="promo-container" onClick={() => setShowCardBurger(true)}>
              <img src={Burger} alt="Burgers" className="promo-img" />
              <button className="btn-overlay">VER CARTA</button>
            </div>
          )}
        </section>

        <section>
          <SectionTitle id="sec-postres">{lang === 'es' ? 'Postres' : 'Desserts'}</SectionTitle>
          {showCardPostres ? <div className="grid-cards">{renderCards(postres, "postre")}</div> : (
            <div className="promo-container" onClick={() => setShowCardPostres(true)}>
              <img src={Postre} alt="Postres" className="promo-img" />
              <button className="btn-overlay">VER POSTRES</button>
            </div>
          )}
        </section>

        <section>
          <SectionTitle id="sec-drinks">{lang === 'es' ? 'Bebidas' : 'Drinks'}</SectionTitle>
          {showCardDrink ? <div className="grid-cards">{renderCards(drinks, "drink")}</div> : (
            <div className="promo-container" onClick={() => setShowCardDrink(true)}>
              <img src={Drink} alt="Bebidas" className="promo-img" />
              <button className="btn-overlay">VER BEBIDAS</button>
            </div>
          )}
        </section>

        <section id="order">
          <SectionTitle>{lang === 'es' ? 'Tu Pedido' : 'Your Order'}</SectionTitle>
          <Order cart={cart} removeFromCart={removeFromCart} />
        </section>
      </main>

      <Footer />

      {/* BOUTON FERMER LE MENU (FIXE ET CENTRÉ) */}
      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAllMenus}>
          ✕ {lang === 'es' ? 'CERRAR CARTA' : 'CLOSE MENU'}
        </button>
      )}

      {/* BOUTON WHATSAPP */}
      <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-button">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}
