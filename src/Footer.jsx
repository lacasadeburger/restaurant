import React from 'react';
// Vérifie bien que les chemins d'assets sont corrects par rapport à ton projet
import navLogo from "../assets/logo.jpg";
import devrod from "../assets/devrod.png";

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

  // --- ACCESSEUR SÉCURISÉ (Anti-crash) ---
  const getT = (key) => {
    if (!translations[key]) return "";
    return translations[key][lang] || translations[key]['es'] || translations[key]['en'];
  };

  return (
    <footer className='footer' style={{ backgroundColor: '#000', color: '#fff', padding: '40px 20px', borderTop: '4px solid #ff4757' }}>
      <div className="footer-content" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', gap: '30px' }}>

        <div className="logo-container" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <img src={navLogo} alt="logo" className="logoFooter" style={{ width: '80px', borderRadius: '10px' }} />
          <a href="https://devrod.site/" target="_blank" rel="noreferrer">
            <img src={devrod} alt="disenadores web" className="logoFooter" style={{ width: '120px' }} />
          </a>
        </div>

        <div className="info-container" style={{ textAlign: lang === 'ar' ? 'right' : 'left', fontSize: '0.9rem', lineHeight: '1.8' }}>
          <p>
            <strong>{getT("address")}:</strong> Av. Diego Ramírez Pastor, 142, 03181 Torrevieja<br />
            <strong>{getT("phone")}:</strong> <a href="tel:+34602597210" style={{ color: '#fff', textDecoration: 'none' }}>602 59 72 10</a><br />
            <strong>WhatsApp:</strong> <a href="https://wa.me/34602597210" style={{ color: '#fff', textDecoration: 'none' }}>602 59 72 10</a><br />
            {getT("delivery")}<br />
            <span style={{ color: '#ff4757', fontWeight: 'bold' }}>{getT("booking")}</span>
          </p>
        </div>

      </div>
      <p className="copyright" style={{ textAlign: 'center', marginTop: '40px', opacity: 0.5, fontSize: '0.8rem' }}>
        La Casa de Burger &copy; {new Date().getFullYear()} | Torrevieja
      </p>
    </footer>
  );
}
