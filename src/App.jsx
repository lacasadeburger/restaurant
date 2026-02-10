import React, { useState, useEffect, useMemo } from "react";
import Nav from "./Nav";
import Order from "./Order";
import CardMenu from "./CardMenu";
import "./style.css";
import data from "./data";
import { Helmet } from "react-helmet";

// --- ASSETS (Vérifiés) ---
import fb from "./assets/FB.png";
import Postre from "./assets/postre.webp";
import Burger from "./assets/burger.webp";
import Drink from "./assets/drink.webp";
import tripadvisor from "./assets/tripadvisor.png";
import googleIcon from "./assets/google.png";
import logo from "./assets/logo.jpg";
import BurgerSignature from "./assets/burger-signature-torrevieja.webp";

const instagramIcon = "https://cdn-icons-png.flaticon.com/512/2111/2111463.png";

const ALL_REVIEWS = [
  { es: "¡La mejor Smash de Torrevieja! Carne de calidad y entrega rápida.", en: "Best Smash in Torrevieja! Quality meat and fast delivery.", author: "Carlos R." },
  { es: "Increíble atención. Las patatas caseras son obligatorias. 10/10.", en: "Amazing service. Homemade fries are a must. 10/10.", author: "Sarah M." },
  { es: "La burger 'La Casa' es de otro planeta. La mejor que he probado.", en: "The 'La Casa' burger is from another planet. The best I've had.", author: "Juan P." },
  { es: "Sabor auténtico y productos frescos. Se nota la diferencia.", en: "Authentic flavor and fresh products. You can taste the difference.", author: "Elena G." },
  { es: "Calidad gourmet a un precio muy justo. Repetiremos seguro.", en: "Gourmet quality at a very fair price. We will definitely repeat.", author: "Sonia B." },
  { es: "He pedido a domicilio y llegó caliente y perfecto. ¡Sigan así!", en: "Ordered delivery and it arrived hot and perfect. Keep it up!", author: "Miguel T." },
  { es: "La salsa de la casa es adictiva. El pan brioche es súper tierno.", en: "The house sauce is addictive. The brioche bun is super soft.", author: "Laura V." },
  { es: "Best burgers in the area, hands down. Professional staff.", en: "Las mejores burgers de la zona, sin duda. Personal profesional.", author: "David K." },
  { es: "¡Brutal! La cocción de la carne en su punto. Muy recomendable.", en: "Brutal! The meat was cooked to perfection. Highly recommended.", author: "Roberto F." },
  { es: "A hidden gem in Torrevieja. Real ingredients and great taste.", en: "Una joya escondida en Torrevieja. Ingredientes reales y gran sabor.", author: "Emma S." }
];

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

  // Logic: Calcul du prix total ultra-précis
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const val = item.precio || item.price || 0;
      const numericValue = String(val).replace(/[^0-9.,]/g, "").replace(",", ".");
      return acc + (parseFloat(numericValue) || 0);
    }, 0).toFixed(2);
  }, [cart]);

  // Logic: Rotation de la langue pour l'engagement client
  useEffect(() => {
    const interval = setInterval(() => setLang(l => l === 'es' ? 'en' : 'es'), 4500);
    return () => clearInterval(interval);
  }, []);

  const randomReviews = useMemo(() => {
    // On mélange la liste de 10 et on prend les 2 premiers résultats
    return [...ALL_REVIEWS].sort(() => 0.5 - Math.random()).slice(0, 2);
  }, []); // [] signifie que le mélange change seulement quand on rafraîchit la page

  // IDs des produits qui ne doivent PAS avoir d'extras (ajout direct)
    const noExtrasIds = ["prod_nuggets", "prod_croquetas", "prod_fritas", "prod_bravas"];

    const addToCart = (item) => {
      // Si le produit est dans la liste, on l'ajoute direct sans passer par les options
      // (Cette logique sera utilisée par CardMenu pour savoir s'il doit ouvrir le modal ou non)
      setCart(prev => [...prev, { ...item, uniqueKey: Math.random() }]);
    };
      const removeFromCart = (idx) => setCart(p => p.filter((_, i) => i !== idx));
  const scrollToOrder = () => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  const scrollToMenu = () => window.scrollTo({ top: (document.getElementById("sec-burgers")?.offsetTop || 0) - 100, behavior: "smooth" });

  const handleNextStep = () => {
    if (showCardBurger) {
      setShowCardBurger(false);
      setShowCardDrink(true);
      // On utilise window.scrollTo pour être sûr que ça remonte au début de la section
      setTimeout(() => {
        const el = document.getElementById("sec-bebidas");
        if(el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      }, 100);
    }
    else if (showCardDrink) {
      setShowCardDrink(false);
      setShowCardPostres(true);
      setTimeout(() => {
        const el = document.getElementById("sec-postres");
        if(el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      }, 100);
    }
    else if (showCardPostres) {
      setShowCardPostres(false);
      setTimeout(() => {
        const el = document.getElementById("order");
        if(el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
      }, 100);
    }
  };

  const burgers = data.filter(i => i.category === "food");
  const drinks = data.filter(i => i.category === "drink");
  const postres = data.filter(i => i.category === "postre");

  const GOLD_BRIGHT = "#FFD700";
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_SHADOW = "0 4px 0px #8A6D3B";

  return (
    <div className="app-main-wrapper" style={{ position: 'relative', backgroundColor: '#111', color: '#fff' }}>
      <style>{`
        .menu-page-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .promo-container {
          position: relative; cursor: pointer; display: inline-block; border-radius: 20px;
          overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.8); transition: 0.5s;
          max-width: 500px; width: 100%; margin-bottom: 20px; border: 2px solid rgba(255, 215, 0, 0.3);
        }
        .promo-img { width: 100%; display: block; opacity: 1; transition: 0.5s; }
        .promo-container:hover .promo-img { opacity: 0.7; transform: scale(1.05); }
        .btn-overlay {
          position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
          background: ${GOLD_GRADIENT}; color: #000 !important; padding: 12px 30px; border-radius: 8px; font-weight: 950;
          border: 2px solid #000; pointer-events: none; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.6);
          text-transform: uppercase; z-index: 5; white-space: nowrap;
        }
        .grid-cards { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px 0 120px; }
        .floating-close { position: fixed; bottom: 85px; left: 50%; transform: translateX(-50%); background: #ff4757; color: #fff; border: 3px solid #000; padding: 12px 25px; border-radius: 10px; font-weight: 900; z-index: 9998; cursor: pointer; box-shadow: 4px 4px 0px #000; text-transform: uppercase; font-size: 1rem; }
        .whatsapp-float { position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
        .testimonial-card { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; border-left: 4px solid ${GOLD_BRIGHT}; text-align: left; transition: 0.3s; margin-bottom: 10px; }

        @keyframes pulse-gold { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
        .pulse-gold-btn { animation: pulse-gold 2s infinite ease-in-out; }
        .pulse-badge { animation: pulse-gold 3s infinite ease-in-out; }

        /* AJOUTE ÇA ICI */
@keyframes wobble-badge {
  0% { transform: rotate(8deg) scale(1.1); }
  50% { transform: rotate(-2deg) scale(1.15); }
  100% { transform: rotate(8deg) scale(1.1); }
}
.wobble-badge { animation: wobble-badge 3s infinite ease-in-out; display: inline-block; }
      `}</style>

      <Helmet>
        <title>La Casa de Burger | Las Mejores Smash Burgers Artesanales en Torrevieja</title>
        <meta name="description" content="Descubre el auténtico sabor gourmet en Torrevieja. Hamburguesas artesanales, carne fresca diaria y entrega rápida a domicilio. ¡Pide tu Smash Burger online ahora!" />
      </Helmet>

      <Nav scrollToOrder={scrollToOrder} cartLength={cart.length} totalPrice={totalPrice} lang={lang} logo={logo} />

      {/* --- HEADER HERO --- */}
      <header style={{
        padding: '160px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${BurgerSignature})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0 0 50px 50px',
        borderBottom: `5px solid #ff4757`
      }}>
      <div
        className="wobble-badge"
        style={{
          position: 'absolute',
          top: '110px',
          right: '5%',
          background: GOLD_GRADIENT,
          color: '#000',
          padding: '10px 25px',
          borderRadius: '50px',
          fontWeight: '950',
          fontSize: '1.1rem',
          zIndex: 10,
          border: '3px solid #000',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap'
        }}
      >
        🏆 #1 BURGER TORREVIEJA
      </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', textTransform: 'uppercase', textShadow: '2px 2px 15px rgba(0,0,0,0.9)', margin: 0 }}>
            La Casa de Burger <span style={{color:'#ff4757'}}>Torrevieja</span>
          </h1>
          <h2 style={{ fontSize: '1.5rem', color: GOLD_BRIGHT, fontWeight: '700', textShadow: '1px 1px 10px rgba(0,0,0,1)', marginTop: '10px' }}>
            {lang === 'es' ? 'La Mejor Hamburguesería Artesanal y Smash Gourmet' : 'The Best Artisan Burger & Gourmet Smash Burger'}
          </h2>

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' }}>
            <button
onClick={() => { setShowCardBurger(true); setTimeout(() => document.getElementById("sec-burgers")?.scrollIntoView({ behavior: "smooth" }), 100); }}
className="pulse-gold-btn"
style={{
  background: GOLD_GRADIENT,
  color: '#000',
  padding: '22px 50px',
  borderRadius: '50px',
  border: '3px solid #000',
  fontWeight: '950',
  cursor: 'pointer',
  fontSize: '1.5rem',
  boxShadow: GOLD_SHADOW,
  textTransform: 'uppercase',
  width: '90%',
  maxWidth: '450px'
}}
>
              🚀 {lang === 'es' ? 'PEDIR A DOMICILIO' : 'ORDER DELIVERY'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <a href="tel:+34602597210" style={{ background: '#fff', color: '#000', padding: '14px 30px', borderRadius: '50px', textDecoration: 'none', fontWeight: '950', border: '2px solid #000' }}>📞 {lang === 'es' ? 'LLAMAR' : 'CALL'}</a>
              <button onClick={scrollToOrder} style={{ backgroundColor: '#ff4757', color: '#fff', padding: '14px 30px', borderRadius: '50px', border: '2px solid #000', fontWeight: '950', cursor: 'pointer', boxShadow: '0 4px 0px #b33939' }}>🛒 {totalPrice}€</button>
            </div>
          </div>
        </div>
      </header>

      {/* --- BODY --- */}
      <main className="menu-page-container">

        {/* Categories */}
        <section id="sec-burgers">
  <SectionTitle>{lang === 'es' ? 'Burgers Gourmet' : 'Gourmet Burgers'}</SectionTitle>
  {showCardBurger ? (
    <div className="grid-cards">
      {burgers.map(item => (
        <CardMenu
          key={item.id}
          {...item}
          addToCart={addToCart}
          lang={lang}
          hasExtras={!noExtrasIds.includes(item.id)}
        />
      ))}
    </div>
  ) : (
    <div className="promo-container" onClick={() => setShowCardBurger(true)}>
      <img src={Burger} className="promo-img" alt="Explorar carta de hamburguesas artesanales" />
      <button className="btn-overlay">{lang === 'es' ? 'VER CARTA' : 'SEE MENU'}</button>
    </div>
  )}
</section>
   ) : (
            <div className="promo-container" onClick={() => setShowCardBurger(true)}>
              <img src={Burger} className="promo-img" alt="Explorar carta de hamburguesas artesanales" />
              <button className="btn-overlay">{lang === 'es' ? 'VER CARTA' : 'SEE MENU'}</button>
            </div>
          )}
        </section>

        <section id="sec-bebidas">
          <SectionTitle>{lang === 'es' ? 'Bebidas' : 'Drinks'}</SectionTitle>
          {showCardDrink ? (
            <div className="grid-cards">{drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={addToCart} lang={lang} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardDrink(true)}>
              <img src={Drink} className="promo-img" alt="Refrescos y bebidas frías" />
              <button className="btn-overlay">{lang === 'es' ? 'BEBIDAS' : 'DRINKS'}</button>
            </div>
          )}
        </section>

        <section id="sec-postres">
          <SectionTitle>{lang === 'es' ? 'Postres Caseros' : 'Homemade Desserts'}</SectionTitle>
          {showCardPostres ? (
            <div className="grid-cards">{postres.map(item => <CardMenu key={item.id} {...item} isPostreCard={true} addToCart={addToCart} lang={lang} />)}</div>
          ) : (
            <div className="promo-container" onClick={() => setShowCardPostres(true)}>
              <img src={Postre} className="promo-img" alt="Postres dulces artesanales" />
              <button className="btn-overlay">{lang === 'es' ? 'POSTRES' : 'DESSERTS'}</button>
            </div>
          )}
        </section>

        <section id="order" style={{ paddingBottom: '100px' }}>
          <SectionTitle>{lang === 'es' ? 'Tu Pedido' : 'Your Order'}</SectionTitle>
          <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
        </section>
        {/* --- AVIS CLIENTS PLACÉS SOUS LE PANIER --- */}
<section style={{ padding: '20px 0 80px' }}>
  <h3 style={{
    color: GOLD_BRIGHT,
    textTransform: 'uppercase',
    marginBottom: '30px',
    fontSize: '1.4rem',
    letterSpacing: '1px'
  }}>
    {lang === 'es' ? 'Lo que dicen nuestros clientes' : 'What our customers say'}
  </h3>
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    textAlign: 'left'
  }}>
    {randomReviews.map((rev, index) => (
      <div key={index} className="testimonial-card">
        <div style={{ color: GOLD_BRIGHT, marginBottom: '10px', fontSize: '1.2rem' }}>⭐⭐⭐⭐⭐</div>
        <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>"{lang === 'es' ? rev.es : rev.en}"</p>
        <p style={{ fontWeight: 'bold', marginTop: '10px', color: '#ff4757' }}>— {rev.author}</p>
      </div>
    ))}
  </div>
</section>
      </main>

      {/* --- FOOTER MASTER --- */}
      <footer style={{ padding: '80px 20px 40px', backgroundColor: '#000', color: '#fff', textAlign: 'center', borderTop: '4px solid #ff4757' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '20px' }}>
            <div>
              <h3 style={{ color: '#ff4757' }}>La Casa de Burger Torrevieja</h3>
              <p>{lang === 'es' ? 'Especialistas en Smash Burgers. Carne de vacuno seleccionada y pan brioche artesano.' : 'Smash Burger specialists. Selected beef and artisan brioche bun.'}</p>
            </div>
            <div>
              <h4 style={{ color: GOLD_BRIGHT }}>📍 {lang === 'es' ? 'Ubicación' : 'Location'}</h4>
              <p>Av. Diego Ramírez Pastor, 142, 03181 Torrevieja</p>
              <p>📞 <a href="tel:+34602597210" style={{ color: '#fff', textDecoration: 'none' }}>+34 602 59 72 10</a></p>
            </div>
            <div>
              <h4 style={{ color: GOLD_BRIGHT }}>🕒 {lang === 'es' ? 'Horario' : 'Hours'}</h4>
              <p>Lun - Sáb: 13:00 – 22:30 | Dom: Cerrado</p>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto 50px', borderRadius: '15px', overflow: 'hidden', border: `3px solid ${GOLD_BRIGHT}` }}>
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/qN6VZYBojLs" title="Video de presentación La Casa de Burger" frameBorder="0" allowFullScreen aria-label="Video promocional"></iframe>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', marginBottom: '40px', alignItems: 'center' }}>
            <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank" rel="noreferrer" aria-label="Facebook"><img src={fb} width="45" alt="Facebook" /></a>
            <a href="https://www.instagram.com/lacasadeburger.es/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src={instagramIcon} width="45" alt="Instagram" /></a>
            <a href="https://es.restaurantguru.com/La-Casa-de-Burger-Torrevieja" target="_blank" rel="noreferrer" style={{ background: GOLD_GRADIENT, color: '#000', padding: '12px 25px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', border: '2px solid #000' }}>GURU 2026</a>
            <a href="https://www.google.com/maps?q=La+Casa+de+Burger+Torrevieja" target="_blank" rel="noreferrer" aria-label="Google Business"><img src={googleIcon} width="140" alt="Google Maps" /></a>
            <a href="https://www.tripadvisor.es/Restaurant_Review-g187527-d26835169-Reviews-La_Casa_De_Burger-Torrevieja_Costa_Blanca_Province_of_Alicante_Valencian_Communi.html" target="_blank" rel="noreferrer" aria-label="TripAdvisor"><img src={tripadvisor} width="140" alt="Tripadvisor" /></a>
          </div>

          <div style={{ backgroundColor: '#0a0a0a', padding: '30px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify' }}>
  <p style={{ color: '#777', fontSize: '0.8rem', lineHeight: '1.8', margin: 0 }}>
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
  </p>
</div>

          <div style={{ marginTop: '40px' }}>
            <img src={logo} alt="La Casa de Burger Oficial" style={{ height: "120px", borderRadius: "15px", marginBottom: '15px' }} />
            <div style={{ fontSize: '0.75rem', color: '#555' }}>
              © 2026 <span style={{ color: GOLD_BRIGHT, fontWeight: 'bold' }}>LA CASA DE BURGER</span> | {lang === 'es' ? 'TODOS LOS DERECHOS RESERVADOS' : 'ALL RIGHTS RESERVED'}
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION */}
      <a href="https://wa.me/34602597210" target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Pedir por WhatsApp">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="40" alt="WhatsApp Icon" />
      </a>
      {(showCardBurger || showCardPostres || showCardDrink) && (
              <button
                className="floating-close"
                onClick={handleNextStep}
                style={{
                  position: 'fixed', bottom: '95px', left: '50%', transform: 'translateX(-50%)',
                  backgroundColor: '#ff4757', color: '#fff', padding: '15px 30px',
                  borderRadius: '12px', fontWeight: '900', zIndex: 10000,
                  border: '3px solid #000', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
                  textTransform: 'uppercase'
                }}
              >
                {showCardBurger && (lang === 'es' ? 'SIGUIENTE: BEBIDAS ➔' : 'NEXT: DRINKS ➔')}
                {showCardDrink && (lang === 'es' ? 'SIGUIENTE: POSTRES ➔' : 'NEXT: DESSERTS ➔')}
                {showCardPostres && (lang === 'es' ? 'VER MI PEDIDO ✓' : 'VIEW MY ORDER ✓')}
              </button>
            )}
    </div>
  );
}
