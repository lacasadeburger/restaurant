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
    const interval = setInterval(() => setLang(l => l === 'es' ? 'en' : 'es'), 15000);
    return () => clearInterval(interval);
  }, []);

  const randomReviews = useMemo(() => {
    // On mélange la liste de 10 et on prend les 2 premiers résultats
    return [...ALL_REVIEWS].sort(() => 0.5 - Math.random()).slice(0, 2);
  }, []); // [] signifie que le mélange change seulement quand on rafraîchit la page

  // IDs des produits qui ne doivent PAS avoir d'extras (ajout direct)
    const noExtrasIds = ["prod_nuggets", "prod_croquetas", "prod_fritas", "prod_bravas", "prod_cheddar-bacon"];

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
        .grid-cards {
    display: grid;
    /* Garde tes colonnes automatiques */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    /* CHANGEMENT 1 : On laisse la hauteur s'adapter au contenu de la carte */
    grid-auto-rows: auto;

    /* CHANGEMENT 2 : Aligne les cartes en haut pour éviter qu'elles ne s'étirent par défaut */
    align-items: start;

    gap: 20px;
    justify-content: center;
    padding: 20px 0 120px;
  }
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
/* BOUTON WHATSAPP FLOTTANT */
        .whatsapp-float {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background-color: #25d366;
          color: #fff;
          border-radius: 50px;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          z-index: 10001; /* Pour être au-dessus du bouton rouge "Siguiente" */
          transition: transform 0.3s ease;
        }
        .whatsapp-float:hover {
          transform: scale(1.1);
        }

        /* Ajustement pour mobile pour ne pas gêner la navigation */
        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 20px;
            right: 15px;
            width: 55px;
            height: 55px;
          }
        }
      `}</style>

      <Helmet>
  {/* --- SEO DE BASE --- */}
  <title>La Casa de Burger | Hamburguesas Gourmet & Recetas Únicas en Torrevieja</title>
  <meta name="description" content="Especialistas en hamburguesas gourmet de autor y recetas artesanales únicas en Torrevieja. Carne premium, pan artesano y nuestras famosas Smashburgers. ¡Pide online!" />
  <meta name="keywords" content="hamburguesería gourmet Torrevieja, burger artesanal, recetas únicas, smash burger torrevieja, comida domicilio torrevieja, takeaway, halal burger torrevieja, gluten free burger" />
  <link rel="canonical" href="https://lacasadeburger.es" />
  <meta name="robots" content="index, follow" />

  {/* --- SEO INTERNATIONAL (Hreflang) --- */}
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="es" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="en" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="uk" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="ar" />
  <link rel="alternate" href="https://lacasadeburger.es" hreflang="x-default" />

  {/* --- FACEBOOK / OPEN GRAPH --- */}
  <meta property="og:type" content="restaurant" />
  <meta property="og:title" content="La Casa de Burger | Hamburguesas Gourmet de Autor" />
  <meta property="og:description" content="No es solo una burger, es una experiencia gourmet. Recetas únicas y artesanales en el corazón de Torrevieja." />
  <meta property="og:image" content="https://lacasadeburger.es/assets/burger-signature-torrevieja.webp" />
  <meta property="og:url" content="https://lacasadeburger.es" />
  <meta property="og:site_name" content="La Casa de Burger" />

  {/* --- TWITTER CARD --- */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="La Casa de Burger | Gourmet & Signature Burgers" />
  <meta name="twitter:description" content="Artesanal, Gourmet y Única. Descubre las mejores burgers de Torrevieja." />
  <meta name="twitter:image" content="https://lacasadeburger.es/assets/burger-signature-torrevieja.webp" />

  {/* --- DONNÉES STRUCTURÉES GOOGLE (JSON-LD) --- */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "La Casa de Burger",
      "alternateName": "La Casa de Burger Torrevieja",
      "image": "https://lacasadeburger.es/assets/burger-signature-torrevieja.webp",
      "logo": "https://lacasadeburger.es/assets/logo.jpg",
      "url": "https://lacasadeburger.es",
      "telephone": "+34602597210",
      "priceRange": "€€",
      "menu": "https://lacasadeburger.es/#order",
      "servesCuisine": ["Gourmet Burger", "Artisan Burger", "Smash Burger", "American"],
      "acceptsReservations": "false",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Diego Ramírez Pastor, 142",
        "addressLocality": "Torrevieja",
        "addressRegion": "Alicante",
        "postalCode": "03181",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.9821,
        "longitude": -0.6756
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "13:00",
          "closes": "22:30"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100094610793536",
        "https://www.instagram.com/lacasadeburger.es/"
      ],
      "hasMenu": {
        "@type": "Menu",
        "name": "Menú Gourmet y Artesanal",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Hamburguesas de Autor",
            "description": "Recetas únicas con carne premium"
          },
          {
            "@type": "MenuItem",
            "name": "Smash Burgers",
            "description": "Estilo americano crujiente"
          }
        ]
      }
    })}
  </script>
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
  {lang === 'es'
    ? 'Hamburguesas Gourmet de Autor y Recetas Únicas'
    : 'Gourmet Signature Burgers & Unique Artisan Recipes'}
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

              {/* Categories: BURGERS */}
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

              {/* Categories: DRINKS */}
              <section id="sec-bebidas">
                <SectionTitle>{lang === 'es' ? 'Bebidas' : 'Drinks'}</SectionTitle>
                {showCardDrink ? (
                  <div className="grid-cards">
                    {drinks.map(item => <CardMenu key={item.id} {...item} isDrinkCard={true} addToCart={addToCart} lang={lang} />)}
                  </div>
                ) : (
                  <div className="promo-container" onClick={() => setShowCardDrink(true)}>
                    <img src={Drink} className="promo-img" alt="Refrescos y bebidas frías" />
                    <button className="btn-overlay">{lang === 'es' ? 'BEBIDAS' : 'DRINKS'}</button>
                  </div>
                )}
              </section>

              {/* Categories: POSTRES */}
              <section id="sec-postres">
                <SectionTitle>{lang === 'es' ? 'Postres Caseros' : 'Homemade Desserts'}</SectionTitle>
                {showCardPostres ? (
                  <div className="grid-cards">
                    {postres.map(item => <CardMenu key={item.id} {...item} isPostreCard={true} addToCart={addToCart} lang={lang} />)}
                  </div>
                ) : (
                  <div className="promo-container" onClick={() => setShowCardPostres(true)}>
                    <img src={Postre} className="promo-img" alt="Postres dulces artesanales" />
                    <button className="btn-overlay">{lang === 'es' ? 'POSTRES' : 'DESSERTS'}</button>
                  </div>
                )}
              </section>

              {/* ORDER SUMMARY */}
              <section id="order" style={{ paddingBottom: '100px' }}>
                <SectionTitle>{lang === 'es' ? 'Tu Pedido' : 'Your Order'}</SectionTitle>
                <Order cart={cart} removeFromCart={removeFromCart} lang={lang} />
              </section>

              {/* REVIEWS SECTION */}
              <section style={{ padding: '20px 0 80px' }}>
                <h3 style={{ color: GOLD_BRIGHT, textTransform: 'uppercase', marginBottom: '30px', fontSize: '1.4rem', letterSpacing: '1px' }}>
                  {lang === 'es' ? 'Lo que dicen nuestros clientes' : 'What our customers say'}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left' }}>
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
          {/* --- CARTE GOOGLE MAPS INTERACTIVE --- */}
<div style={{
  width: '95%',
  maxWidth: '1100px',
  margin: '40px auto',
  borderRadius: '15px',
  overflow: 'hidden',
  border: `2px solid ${GOLD_BRIGHT}`,
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  backgroundColor: '#121212', // Fond très noir pour éviter le flash blanc au chargement
  minHeight: '350px', // On réserve l'espace pour éviter que le site saute
  contain: 'paint' // Optimisation pro : dit au PC de ne pas calculer l'intérieur si on ne le voit pas
}}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.4082236526146!2d-0.6782!3d37.9822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63aa1f58697193%3A0x6d70c9451478174c!2sAv.%20Diego%20Ram%C3%ADrez%20Pastor%2C%20142%2C%2003181%20Torrevieja%2C%20Alicante!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
    width="100%"
    height="350"
    style={{ border: 0, display: 'block' }}
    allowFullScreen=""
    loading="lazy" // Garde bien ça !
    referrerPolicy="no-referrer-when-downgrade"
    title="Ubicación La Casa de Burger Torrevieja"
  ></iframe>
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

          <div style={{ backgroundColor: '#0a0a0a', padding: '35px', borderRadius: '15px', border: '1px solid #222', textAlign: 'justify' }}>
  <p style={{ color: '#888', fontSize: '0.8rem', lineHeight: '1.8', margin: 0 }}>
    {/* ESPAÑOL - Focus: Gourmet & Artesanal First */}
    <strong>🇪🇸 ESPAÑOL:</strong> <strong>La Casa de Burger</strong> – Tu destino número uno para la auténtica <strong>hamburguesa gourmet en Torrevieja</strong>. Nuestra especialidad es la <strong>hamburguesa artesanal</strong> elaborada con carne de vacuno premium, pan brioche local y productos frescos de mercado. También somos expertos en la técnica <strong>Smash Burger</strong> para los amantes de la carne crujiente y jugosa. Ofrecemos <strong>comida a domicilio (delivery)</strong> y <strong>take away</strong> en todo el centro y playas. <em>Opciones disponibles: Carne Halal, hamburguesas sin gluten y alternativas vegetarianas.</em> La mejor experiencia gastronómica de la Costa Blanca.

    <br /><br />
    {/* ENGLISH - Focus: Gourmet & Handmade */}
    <strong>🇬🇧 ENGLISH:</strong> <strong>Best gourmet burgers in Torrevieja</strong>. We specialize in <strong>handmade artisanal burgers</strong> using premium matured beef, followed by our famous crispy <strong>smash burgers</strong>. Top-rated <strong>restaurant for food delivery</strong> and takeaway near Playa del Cura. Looking for <strong>Halal burgers</strong>, <strong>Gluten-free</strong> options, or <strong>Veggie burgers</strong> in Torrevieja? We have it all. Fresh ingredients, handmade fries, and local craft spirit.

    <br /><br />
    {/* ARABIC (MAROC / HALAL FOCUS) */}
    <strong>🇲🇦 MARRUECOS / ARABIC (العربية):</strong>
    <strong>أفضل برجر غوارميه (Gourmet) في توريفايجا</strong>. تخصصنا هو <strong>البرجر الحرفي والأصيل</strong> المصنوع من أجود أنواع اللحوم، بالإضافة إلى <strong>سماش برجر</strong> (Smash Burger) المقرمش. نحن فخورون بتقديم <strong>لحم حلال (Halal)</strong> مائة بالمائة لجميع زبائننا. خدمة <strong>توصيل الطعام</strong> سريعة للمنازل. خيارات <strong>خالية من الغلوتين</strong> ونباتية متوفرة.

    <br /><br />
    {/* UKRAINIAN (High visibility) */}
    <strong>🇺🇦 UKRAINIAN (Українська):</strong>
    <strong>Найкращі гурме-бургери в Торрев'єсі</strong>. Наша спеціалізація – <strong>крафтові та ремісничі бургери</strong> з добірної яловичини, а також популярні <strong>смаш-бургери</strong>. Швидка <strong>доставка їжі</strong> та замовлення з собою (takeaway). У нас ви знайдете <strong>халяльне м'ясо</strong>, бургери <strong>без глютену</strong> та вегетаріанські страви. Справжня якість у центрі міста.

    <br /><br />
    {/* FRENCH - Gourmet focus */}
    <strong>🇫🇷 FRANÇAIS:</strong> <strong>Burger Gourmet Torrevieja</strong>. Spécialiste du <strong>burger artisanal</strong> haut de gamme et du <strong>smash burger</strong>. Viande de qualité supérieure, frites maison et service de <strong>livraison à domicile</strong>. Options <strong>Halal</strong>, <strong>Sans Gluten</strong> et <strong>Végétarien</strong> disponibles pour tous nos clients de la Costa Blanca.

    <br /><br />
    {/* RUSSIAN */}
    <strong>🇷🇺 RUSSIAN (Русский):</strong>
    <strong>Гурме-бургеры в Торревьехе</strong>. Мы специализируемся на <strong>авторских крафтовых бургерах</strong> и сочных <strong>смаш-бургерах</strong>. Быстрая доставка на дом и заказ навынос. В наличии <strong>Халяль</strong>, <strong>безглютеновые</strong> и вегетарианские опции.

    <br /><br />
    {/* SCANDINAVIAN */}
    <strong>🇸🇪 SVENSKA:</strong>
    <strong>Gourmetburgare i Torrevieja</strong>. Vi erbjuder <strong>hantverksmässiga burgare</strong> av högsta kvalitet och krispiga <strong>smash burgers</strong>. Matleverans och takeaway. <strong>Halal</strong> och <strong>Glutenfritt</strong> alternativ finns.

    <br /><br />
    {/* ZONES DE LIVRAISON HYPER-PRÉCISES */}
    <strong>📍 ZONAS DE REPARTO / AREAS DE SERVICIO:</strong>
    <strong>Torrevieja Centro</strong>, Playa del Cura, Playa de los Locos, <strong>La Mata</strong>, Punta Prima, Los Balcones, <strong>Aguas Nuevas</strong>, La Siesta, El Acequión, La Veleta, San Roque, Rocío del Mar, Los Altos, Lago Jardín, Torreta I-II-III, El Salado, Urbanización Doña Inés, Jardín del Mar, <strong>Las Naciones</strong>, Centro Comercial Habaneras.
  </p>
</div>

          <div style={{ marginTop: '40px' }}>
            <img src={logo} alt="La Casa de Burger Torrevieja Oficial" style={{ height: "120px", borderRadius: "15px", marginBottom: '15px' }} />
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
