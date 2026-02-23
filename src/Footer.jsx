import React from 'react';
// Importation du logo (Assure-toi que le chemin vers logo.webp est correct)
import navLogo from "../assets/logo.webp";

export default function Footer({ lang }) {

  // --- DICTIONNAIRE COMPLET (11 LANGUES) - CONSERVÉ ---
  const translations = {
    address: {
      es: "Dirección", en: "Address", fr: "Adresse", de: "Adresse",
      ru: "Адрес", uk: "Адреса", pl: "Adres", no: "Adresse",
      sv: "Adress", ro: "Adresă", ar: "العنوان"
    },
    phone: {
      es: "Teléfono", en: "Phone", fr: "Téléphone", de: "Telefon",
      ru: "Телефон", uk: "Телефон", pl: "Telefon", no: "Telefon",
      sv: "Telefon", ro: "Telefon", ar: "الهاتف"
    },
    delivery: {
      es: "Pedidos a domicilio, para llevar",
      en: "Delivery and take away",
      fr: "Livraison et à emporter",
      de: "Lieferung und zum Mitnehmen",
      ru: "Доставка и навынос",
      uk: "Доставка та самовивіз",
      pl: "Dostawa i na wynos",
      no: "Levering og takeaway",
      sv: "Leverans och takeaway",
      ro: "Livrare și la pachet",
      ar: "التوصيل والاستلام"
    },
    booking: {
      es: "Para reservaciones, llamar al teléfono o por WhatsApp",
      en: "For reservations, call or WhatsApp",
      fr: "Pour les réservations, appelez ou via WhatsApp",
      de: "Für Reservierungen rufen Sie an ou per WhatsApp",
      ru: "Для бронирования звоните или пишите в WhatsApp",
      uk: "Для бронювання телефонуйте або пишіть у WhatsApp",
      pl: "W celu rezerwacji zadzwoń lub napisz na WhatsApp",
      no: "For reservasjoner, ring eller bruk WhatsApp",
      sv: "För bokningar, ring eller använd WhatsApp",
      ro: "Pour les réservations, appelez ou via WhatsApp",
      ar: "للحجز، اتصل بنا أو عبر الواتساب"
    }
  };

  // --- ACCESSEUR SÉCURISÉ ---
  const getT = (key) => {
    if (!translations[key]) return "";
    const result = translations[key][lang] || translations[key]['es'];
    if (typeof result === 'object') return result['es'] || "";
    return result;
  };

  return (
    <footer className='footer' style={{
      backgroundColor: '#000',
      color: '#ffffff',
      padding: '60px 20px 40px',
      borderTop: '4px solid #ff5e6c' // Optimisé pour le contraste Insights
    }}>
      <div className="footer-content" style={{
        display: 'flex',
        flexDirection: 'column', // Centrage propre suite à la suppression de Devrod
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '40px'
      }}>

        {/* LOGO SECTION - UNIQUE */}
        <div className="logo-container">
          <img
            src={navLogo}
            alt="La Casa de Burger Logo"
            style={{ width: '90px', height: 'auto', borderRadius: '12px' }}
          />
        </div>

        {/* CONTACT INFO SECTION (Optimisée contraste & mobile) */}
        <div className="info-container" style={{
          textAlign: 'center',
          fontSize: '1.05rem',
          lineHeight: '2.1', // Espacement pour éviter l'erreur "Tap targets too close"
          color: '#ffffff'
        }}>
          <p style={{ margin: 0 }}>
            <strong style={{ color: '#ff5e6c' }}>{getT("address")}:</strong> Av. Diego Ramírez Pastor, 142, 03181 Torrevieja<br />

            <strong style={{ color: '#ff5e6c' }}>{getT("phone")}:</strong>
            <a href="tel:+34602597210" style={{ color: '#ffffff', textDecoration: 'underline', textDecorationColor: '#ff5e6c' }}>
              602 59 72 10
            </a><br />

            <strong style={{ color: '#ff5e6c' }}>WhatsApp:</strong>
            <a href="https://wa.me/34602597210" style={{ color: '#ffffff', textDecoration: 'underline', textDecorationColor: '#ff5e6c' }}>
              602 59 72 10
            </a><br />

            <span style={{ display: 'block', marginTop: '10px', color: '#BDBDBD' }}>
              {getT("delivery")}
            </span>

            <span style={{
              color: '#ffffff',
              fontWeight: 'bold',
              display: 'inline-block',
              backgroundColor: 'rgba(255, 94, 108, 0.15)',
              padding: '8px 16px',
              borderRadius: '8px',
              marginTop: '15px',
              border: '1px solid rgba(255, 94, 108, 0.4)'
            }}>
              {getT("booking")}
            </span>
          </p>
        </div>

      </div>

      {/* DIVIDER GOLD */}
      <div style={{
        width: '80px',
        height: '2px',
        background: 'linear-gradient(90deg, #BF953F, #FCF6BA, #B38728)',
        margin: '40px auto 20px',
        borderRadius: '2px'
      }} aria-hidden="true" />

      {/* COPYRIGHT SECTION (Gris conformes WCAG) */}
      <div style={{ textAlign: 'center' }}>
        <p className="copyright" style={{
          color: '#BDBDBD',
          fontSize: '1.1rem',
          margin: '0',
          letterSpacing: '0.5px'
        }}>
          La Casa de Burger &copy; {new Date().getFullYear()} | Torrevieja | The Artisan Experience
        </p>

        <p style={{
          color: '#AAAAAA', // Gris plus clair que #888 pour valider le test
          fontSize: '0.85rem',
          marginTop: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {lang === 'es' ? 'El mejor burger de Torrevieja' : 'Best burger in Torrevieja'}
        </p>
      </div>
    </footer>
  );
}
