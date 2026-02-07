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

// --- IMAGES POUR LA NOUVELLE GALERIE VISUELLE (Remplace ces URLs par tes propres photos de burgers !) ---
const galleryImages = [
  "https://via.placeholder.com/400x300?text=Burger+Gold+1", // Remplace par ta meilleure photo de burger
  "https://via.placeholder.com/400x300?text=Burger+Gold+2", // Remplace par une photo de smash burger juteux
  "https://via.placeholder.com/400x300?text=Burger+Gold+3", // Remplace par une photo de frites croustillantes
  "https://via.placeholder.com/400x300?text=Burger+Gold+4", // Remplace par une photo de combo (burger + boisson)
  "https://via.placeholder.com/400x300?text=Burger+Gold+5", // Remplace par une photo de dessert gourmand
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
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // --- CONFIGURATION SEO MULTILINGUE ET RICHE ---
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "La Casa de Burger Torrevieja",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Diego Ramírez Pastor, 142",
        "addressLocality": "Torrevieja",
        "addressRegion": "Alicante",
        "postalCode": "03181",
        "addressCountry": "ES"
      },
      "telephone": "+34602597210",
      "servesCuisine": ["Gourmet Burgers", "Smash Burgers", "Hamburguesas", "American Food"],
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "13:00",
          "closes": "22:30"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "180"
      }
    });
    document.head.appendChild(script);
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
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
    <div className="app-main-wrapper" style={{ position: 'relative' }}>
      <style>{`
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container { position: relative; cursor: pointer; display: inline-block; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); transition: 0.5s; max-width: 500px; width: 100%; margin-bottom: 20px; }
        .promo-container:hover { transform: scale(1.03); }
        .promo-img { width: 100%; display: block; }
        .btn-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff4757; color: white; padding: 12px 25px; border-radius: 50px; font-weight: bold; border: none; pointer-events: none; }
        .grid-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px 0; animation: fadeIn 0.6s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .floating-close { position: fixed; bottom: 30px; left: 30px; background: #000; color: #fff; border: none; padding: 15px 25px; border-radius: 50px; font-weight: bold; z-index: 3000; cursor: pointer; box-shadow: 0 10px 20px rgba(0,0,0,0.3); text-transform: uppercase; }
        .footer-keywords { color: #333; font-size: 0.6rem; max-width: 1100px; margin: 25px auto; line-height: 1.6; text-align: justify; border-top: 1px solid #222; padding-top: 20px; }
        .round-button { width: 40px; transition: transform 0.3s ease; }
        .round-button:hover { transform: scale(1.1); }
        .whatsapp-button {
          position: fixed; bottom: 90px; right: 20px;
          background-color: #25D366; color: white;
          border-radius: 50%; width: 60px; height: 60px;
          display: flex; justify-content: center; align-items: center;
          font-size: 2.5rem; text-decoration: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 3000; animation: pulse 2s infinite;
        }
        .whatsapp-button:hover { background-color: #1DA851; transform: scale(1.05); }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .gallery-section {
          background-color: #f8f8f8; padding: 40px 20px; margin: 40px 0; border-radius: 20px;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
        }
        .gallery-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px; max-width: 1200px; margin: 20px auto;
        }
        .gallery-item img {
          width: 100%; height: 200px; object-fit: cover; border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s ease;
        }
        .gallery-item img:hover { transform: scale(1.05); }
      `}</style>

      <Nav scrollToOrder={scrollToOrder} />

      <header style={{
        padding: '120px 20px 60px', textAlign: 'center', backgroundColor: '#111', color: '#fff',
        borderRadius: '0 0 50px 50px', marginBottom: '40px', borderBottom: '4px solid #ff4757', position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: '110px', right: '10%', background: '#FFD700', color: '#000', padding: '5px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem', transform: 'rotate(5deg)', zIndex: 10 }}>
          🏆 #1 Gourmet Burger Torrevieja
        </div>
        <div className="fade-text" style={{ minHeight: '160px' }}>
          {lang === 'es' ? (
            <>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span></h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#ccc' }}>
                La referencia de la <strong>hamburguesa artesanal</strong>, a dos pasos de la <strong>Playa del Cura</strong> y del <strong>Paseo Marítimo</strong>. Carne seleccionada y el mejor servicio a domicilio.
              </p>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>The Best Burger in <span style={{color:'#ff4757'}}>Torrevieja</span></h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#ccc' }}>
                Taste the <strong>ultimate gourmet experience</strong>, just a few steps from <strong>Playa del Cura</strong> and the <strong>Paseo Marítimo</strong>. Fresh ingredients and lightning fast delivery.
              </p>
            </>
          )}
        </div>
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="tel:+34602597210" style={{ backgroundColor: '#fff', color: '#111', padding: '15px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>📞 LLAMAR / CALL</a>
          <button onClick={scrollToMenu} style={{ backgroundColor: '#ff4757', color: '#fff', padding: '15px 30px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>🛒 VER CARTA / MENU</button>
        </div>
      </header>

      {/* NOUVELLE SECTION: GALERIE VISUELLE INSTAGRAM-STYLE */}
      <section className="gallery-section">
        <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '30px' }}>{lang === 'es' ? 'Nuestras Creaciones' : 'Our Creations'}</h2>
        <div className="gallery-grid">
          {galleryImages.map((src, index) => (
            <div key={index} className="gallery-item">
              <img src={src} alt={`${lang === 'es' ? 'Burger Gourmet' : 'Gourmet Burger'} ${index + 1}`} />
            </div>
          ))}
        </div>
        <p style={{ marginTop: '30px', color: '#555' }}>
          {lang === 'es' ? 'Descubre por qué somos la mejor hamburguesería de Torrevieja. ¡Cada bocado es una experiencia!' : 'Discover why we are the best burger joint in Torrevieja. Every bite is an experience!'}
        </p>
      </section>

      <main className="menu-page-container">
        <section aria-labelledby="sec-burgers">
          <SectionTitle id="sec-burgers">{lang === 'es' ? 'Nuestras Burgers' : 'Our Burgers'}</SectionTitle>
          {showCardBurger ? <div className="grid-cards">{renderCards(burgers, "food")}</div> : (
            <div className="promo-container" onClick={() => setShowCardBurger(true)}>
              <img src={Burger} alt="Best Smash Burguer Torrevieja" className="promo-img" />
              <button className="btn-overlay">{lang === 'es' ? 'Ver Carta' : 'View Menu'}</button>
            </div>
          )}
        </section>

        <section aria-labelledby="sec-postres">
          <SectionTitle id="sec-postres">{lang === 'es' ? 'Postres Caseros' : 'Homemade Desserts'}</SectionTitle>
          {showCardPostres ? <div className="grid-cards">{renderCards(postres, "postre")}</div> : (
            <div className="promo-container" onClick={() => setShowCardPostres(true)}>
              <img src={Postre} alt="Homemade Desserts Torrevieja" className="promo-img" />
              <button className="btn-overlay">{lang === 'es' ? 'Ver Postres' : 'View Desserts'}</button>
            </div>
          )}
        </section>

        <section aria-labelledby="sec-drinks">
          <SectionTitle id="sec-drinks">{lang === 'es' ? 'Bebidas' : 'Drinks'}</SectionTitle>
          {showCardDrink ? <div className="grid-cards">{renderCards(drinks, "drink")}</div> : (
            <div className="promo-container" onClick={() => setShowCardDrink(true)}>
              <img src={Drink} alt="Drinks and Beers Torrevieja" className="promo-img" />
              <button className="btn-overlay">{lang === 'es' ? 'Ver Bebidas' : 'View Drinks'}</button>
            </div>
          )}
        </section>

        <section id="order">
          <SectionTitle>{lang === 'es' ? 'Tu Pedido' : 'Your Order'}</SectionTitle>
          <Order cart={cart} removeFromCart={removeFromCart} />
        </section>
      </main>

      <footer style={{ padding: '60px 20px', backgroundColor: '#111', color: '#fff', textAlign: 'center', marginTop: '50px', borderTop: '4px solid #ff4757' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#ff4757', marginBottom: '10px' }}>La Casa de Burger Torrevieja</h2>

          <div style={{ marginBottom: '30px', fontSize: '1.1rem', borderBottom: '1px solid #222', paddingBottom: '20px' }}>
            <p style={{ margin: '5px 0' }}>📍 Av. Diego Ramírez Pastor, 142, 03181 Torrevieja, Alicante</p>
            <p style={{ margin: '10px 0', color: '#FFD700', fontWeight: 'bold' }}>⭐ Valoración Real: 4.9/5 en Google Maps</p>
            <p style={{ margin: '5px 0' }}>
              <a href="tel:+34602597210" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.3rem' }}>📞 +34 602 59 72 10</a>
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '35px' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer">
              <img src={fb} alt="facebook" className="round-button"/>
            </a>
            <a href="https://www.instagram.com/lacasadeburger.es/?igshid=NGVhN2U2NjQ0Yg%3D%3D" target="_blank" rel="noreferrer">
              <img src={instagram} alt="instagram" className="round-button"/>
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="https://es.restaurantguru.com/La-Casa-de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ border: '2px solid #ff4757', padding: '10px 20px', borderRadius: '50px', color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Restaurant Guru 2026</a>
            <a href="https://www.google.com/maps/search/?api=1&query=La+Casa+de+Burger+Torrevieja&query_place_id=ChIJMadejbCpYw0R_vfChL1f9og" target="_blank" rel="noreferrer">
              <img src={google} alt="Google Reviews #1" style={{ width: '130px' }} />
            </a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja_Costa_Blanca_Province_of_Alicante_Valencian_Communi.html" target="_blank" rel="noreferrer">
              <img src={tripadvisor} alt="Tripadvisor Reviews" style={{ width: '130px' }} />
            </a>
          </div>

          <div className="footer-keywords">
            <strong>Variantes (Español/English):</strong> Hamburguesería Torrevieja, Smash Burguers, Gourmet Burger near me, Hamburguesas artesanas, Takeaway Torrevieja, Delivery fast food.
            <strong> Français:</strong> Meilleur burger Torrevieja, Hamburgers artisanaux, Restaurant de burgers centre-ville, Livraison burger rapide, Cuisine américaine.
            <strong> Svenska/Norsk:</strong> Bästa burgare i Torrevieja, Hamburgare restaurang, Hemleverans mat, Smashburgare, Godaste burgaren nära Playa del Cura.
            <strong> Русский/Українська:</strong> Кращі бургери Торрев'єха, Бургерна поруч, Доставка їжі Торрев'єха, Смачні гамбургери, Лучшие бургеры Торревьеха, Заказать бургер с доставкой.
            <strong> Zonas:</strong> Playa del Cura, Los Locos, Paseo Marítimo, La Siesta, Aguas Nuevas, Los Balcones, Punta Prima, Torre del Moro, Centro Ciudad, Cabo Roig, Orihuela Costa.
            <strong> Tags:</strong> Black Angus, Brioche, Smash, Take Away, #1 Quality, Real 4.9 stars Google.
          </div>

          <p style={{ marginTop: '40px', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #222', paddingTop: '20px' }}>
            © {new Date().getFullYear()} La Casa de Burger - Torrevieja | <strong>Mejor Hamburguesería</strong> | <strong>Best Burgers in Town</strong>.
          </p>
        </div>
      </footer>

      {(showCardBurger || showCardPostres || showCardDrink) && (
        <button className="floating-close" onClick={closeAllMenus}>✕ CERRAR CARTA</button>
      )}

      {/* NOUVEAU BOUTON FLOTTANT WHATSAPP */}
      <a
        href="https://wa.me/34602597210"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-button"
        title={lang === 'es' ? 'Pedir por WhatsApp' : 'Order via WhatsApp'}
      >
        <i className="fab fa-whatsapp"></i> {/* Nécessite Font Awesome pour l'icône, ou un simple texte */}
      </a>
      {/* Pense à ajouter <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
          dans la section <head> de ton fichier index.html si l'icône n'apparaît pas. */}

    </div>
  );
}
