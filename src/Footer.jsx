import React from 'react';
// Imports sécurisés avec les bonnes extensions
import navLogo from "../assets/logo.webp";
import devrod from "../assets/devrod-logo.png";

export default function Footer({ lang }) {

  // --- DICTIONNAIRE COMPLET (11 LANGUES) ---
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
      de: "Für Reservierungen rufen Sie an oder per WhatsApp",
      ru: "Для бронирования звоните или пишите в WhatsApp",
      uk: "Для бронювання телефонуйте або пишіть у WhatsApp",
      pl: "W celu rezerwacji zadzwoń lub napisz na WhatsApp",
      no: "For reservasjoner, ring eller bruk WhatsApp",
      sv: "För bokningar, ring eller använd WhatsApp",
      ro: "Pentru rezervări, sunați sau scrieți pe WhatsApp",
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
      borderTop: '4px solid #ff4757'
    }}>
      <div className="footer-content" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '40px'
      }}>

        {/* LOGOS SECTION */}
        <div className="logo-container" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <img src={navLogo} alt="La Casa de Burger Logo" className="logoFooter" style={{ width: '85px', borderRadius: '12px' }} />
          <a href="https://devrod.site/" target="_blank" rel="noreferrer" style={{ transition: 'opacity 0.3s' }}>
            <img src={devrod} alt="Diseño Web Devrod" className="logoFooter" style={{ width: '130px' }} />
          </a>
        </div>

        {/* CONTACT INFO SECTION (Optimisée contraste) */}
        <div className="info-container" style={{
          textAlign: lang === 'ar' ? 'right' : 'left',
          fontSize: '1.05rem',
          lineHeight: '1.9',
          color: '#ffffff'
        }}>
          <p style={{ margin: 0 }}>
            <strong style={{ color: '#ff4757' }}>{getT("address")}:</strong> Av. Diego Ramírez Pastor, 142, 03181 Torrevieja<br />
            <strong style={{ color: '#ff4757' }}>{getT("phone")}:</strong> <a href="tel:+34602597210" style={{ color: '#ffffff', textDecoration: 'none', borderBottom: '1px solid #ff4757' }}>602 59 72 10</a><br />
            <strong style={{ color: '#ff4757' }}>WhatsApp:</strong> <a href="https://wa.me/34602597210" style={{ color: '#ffffff', textDecoration: 'none', borderBottom: '1px solid #ff4757' }}>602 59 72 10</a><br />
            <span style={{ display: 'block', marginTop: '10px' }}>{getT("delivery")}</span>
            <span style={{ color: '#ffffff', fontWeight: 'bold', display: 'block', backgroundColor: 'rgba(255, 71, 87, 0.1)', padding: '5px 10px', borderRadius: '5px', marginTop: '10px' }}>
              {getT("booking")}
            </span>
          </p>
        </div>

      </div>

      {/* DIVIDER GOLD (Optionnel mais premium) */}
      <div style={{
        width: '80px',
        height: '2px',
        background: 'linear-gradient(90deg, #BF953F, #FCF6BA, #B38728)',
        margin: '40px auto 20px',
        borderRadius: '2px'
      }} aria-hidden="true" />

      {/* COPYRIGHT SECTION (Gris clair conforme WCAG) */}
      <div style={{ textAlign: 'center' }}>
        <p className="copyright" style={{
          color: '#BDBDBD',
          fontSize: '0.9rem',
          margin: '0',
          letterSpacing: '0.5px'
        }}>
          La Casa de Burger &copy; {new Date().getFullYear()} | Torrevieja | The Artisan Experience
        </p>
        <p style={{ color: '#888', fontSize: '0.75rem', marginTop: '10px', textTransform: 'uppercase' }}>
          {lang === 'es' ? 'El mejor burger de Torrevieja' : 'Best burger in Torrevieja'}
        </p>
      </div>
    </footer>
  );
}
