import React from 'react';
import navLogo from "../assets/logo.webp";

export default function Footer({ lang }) {

  // --- DICTIONNAIRE COMPLET (12 LANGUES) OPTIMISÉ ---
  const translations = {
    address: {
      es: "Dirección", en: "Address", fr: "Adresse", de: "Adresse",
      ru: "Адрес", uk: "Адреса", pl: "Adres", no: "Adresse",
      sv: "Adress", ro: "Adresă", ar: "العنوان", nl: "Adres"
    },
    phone: {
      es: "Teléfono", en: "Phone", fr: "Téléphone", de: "Telefon",
      ru: "Телефон", uk: "Телефон", pl: "Telefon", no: "Telefon",
      sv: "Telefon", ro: "Telefon", ar: "الهاتف", nl: "Telefoon"
    },
    delivery: {
      es: "hamburguesa y Hamburguesa Gourmet : A domicilio y para llevar",
      en: "Burger and Gourmet Burgers & Signature Burgers: Delivery and takeaway",
      fr: "Burgers & Burgers Gourmet & Signature : Livraison et à emporter",
      de: "Burgers & Gourmet Burgers: Lieferung und zum Mitnehmen",
      ru: "Гурме Бургеры: Доставка и навынос",
      uk: "Гурме Бургери: Доставка та самовивіз",
      pl: "Burgery i Burgery Gourmet : Dostawa i na wynos",
      no: "Gourmet & Signature Burgere : Levering og takeaway",
      sv: "Gourmet & Signature Burgare : Leverans och takeaway",
      ro: "Burgeri și Burgeri Gourmet : Livrare și la pachet",
      ar: "برجر غوارميه وسيجنتشر: التوصيل والاستلام",
      nl: "Burgers & Gourmet Burgers: Bezorging en afhalen"
    },
    booking: {
      es: "Reservas por Teléfono o WhatsApp",
      en: "Reservations by Phone or WhatsApp",
      fr: "Réservations par Téléphone ou WhatsApp",
      de: "Reservierungen per Telefon oder WhatsApp",
      ru: "Бронирование по телефону или WhatsApp",
      uk: "Бронювання за телефоном або WhatsApp",
      pl: "Rezerwacja telefoniczna lub przez WhatsApp",
      no: "Reservasjoner via telefon eller WhatsApp",
      sv: "Bokningar via telefon eller WhatsApp",
      ro: "Rezervări prin Telefon sau WhatsApp",
      ar: "للحجز عبر الهاتف أو الواتساب",
      nl: "Reserveringen via telefoon of WhatsApp"
    }
  };

  const getT = (key) => {
    if (!translations[key]) return "";
    return translations[key][lang] || translations[key]['es'];
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer' style={{
      backgroundColor: '#000',
      color: '#ffffff',
      padding: '60px 20px 40px',
      borderTop: '4px solid #ff5e6c'
    }}>
      <div className="footer-content" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '30px'
      }}>

        {/* LOGO SECTION */}
        <div className="logo-container">
          <img
            src={navLogo}
            alt="La Casa de Burger Logo"
            style={{ width: '100px', height: 'auto', borderRadius: '15px', border: '1px solid #333' }}
          />
        </div>

        {/* CONTACT INFO SECTION */}
        <div className="info-container" style={{
          textAlign: 'center',
          fontSize: '1.05rem',
          lineHeight: '2.2',
          color: '#ffffff'
        }}>
          <p style={{ margin: 0 }}>
            {/* LIEN MAPS POUR SEO LOCAL */}
            <strong style={{ color: '#ff5e6c' }}>{getT("address")}:</strong><br />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Av.+Diego+Ramírez+Pastor,+142,+03181+Torrevieja"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ffffff', textDecoration: 'none', borderBottom: '1px dashed #ff5e6c' }}
            >
              Av. Diego Ramírez Pastor, 142, 03181 Torrevieja (Centro)
            </a><br />

            <strong style={{ color: '#ff5e6c' }}>{getT("phone")}:</strong>
            <a href="tel:+34602597210" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '5px' }}>
              602 59 72 10
            </a><br />

            <strong style={{ color: '#ff5e6c' }}>WhatsApp:</strong>
            <a href="https://wa.me/34602597210" style={{ color: '#ffffff', textDecoration: 'none', marginLeft: '5px' }}>
              602 59 72 10
            </a><br />

            <span style={{ display: 'block', marginTop: '10px', color: '#BDBDBD', fontStyle: 'italic' }}>
              {getT("delivery")}
            </span>

            <span style={{
              color: '#ffffff',
              fontWeight: 'bold',
              display: 'inline-block',
              backgroundColor: 'rgba(255, 94, 108, 0.2)',
              padding: '10px 20px',
              borderRadius: '50px',
              marginTop: '15px',
              border: '1px solid #ff5e6c'
            }}>
              {getT("booking")}
            </span>
          </p>
        </div>

      </div>

      {/* DIVIDER GOLD LUXE */}
      <div style={{
        width: '120px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #BF953F, #FCF6BA, #B38728, transparent)',
        margin: '40px auto 20px',
      }} aria-hidden="true" />

      {/* COPYRIGHT & BRANDING */}
      <div style={{ textAlign: 'center' }}>
        <p className="copyright" style={{
          color: '#BDBDBD',
          fontSize: '1rem',
          margin: '0',
          fontWeight: '500'
        }}>
          LA CASA DE BURGER &copy; {currentYear} | Torrevieja | Sitio web optimizado por <a href="https://localpatron.app" target="_blank" rel="noopener noreferrer" style={{ color: '#8bdbdb', textDecoration: 'underline' }}>LocalPatron</a>
        </p>

        <p style={{
          color: '#ff5e6c',
          fontSize: '0.85rem',
          marginTop: '10px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: 'bold'
        }}>
          {lang === 'es' ? 'La mejor hamburguesa y Hamburguesa gourmet de autor' : 'The best signature gourmet burger'}
        </p>
      </div>
    </footer>
  );
}
