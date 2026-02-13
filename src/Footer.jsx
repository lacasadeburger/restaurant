import React from 'react';
import navLogo from "../src/assets/Logo.jpg";
import devrod from "../src/assets/devrod.png";

export default function Footer({ lang }) { // On récupère 'lang' ici

  // Petit dictionnaire pour le Footer
  const t = {
    address: { es: "Dirección", en: "Address", fr: "Adresse", de: "Adresse", ru: "Адрес" },
    phone: { es: "Teléfono", en: "Phone", fr: "Téléphone", de: "Telefon", ru: "Телефон" },
    delivery: {
      es: "Pedidos a domicilio, para llevar",
      en: "Delivery and take away",
      fr: "Livraison et à emporter",
      de: "Lieferung und zum Mitnehmen",
      ru: "Доставка и навынос"
    },
    booking: {
      es: "Para reservaciones, llamar al teléfono o por WhatsApp",
      en: "For reservations, call or WhatsApp",
      fr: "Pour les réservations, appelez ou via WhatsApp",
      de: "Für Reservierungen rufen Sie an oder per WhatsApp",
      ru: "Для бронирования звоните или пишите в WhatsApp"
    }
  };

  // Fonction helper pour traduire
  const getT = (key) => t[key][lang] || t[key]['es'];

  return (
    <footer className='footer'>
      <div className="footer-content">
        <div className="logo-container">
          <img src={navLogo} alt="logo" className="logoFooter" />
          <a href="https://devrod.site/">
            <img src={devrod} alt="disenadores web" className="logoFooter" />
          </a>
        </div>
        <div className="info-container">
          <p>
            {getT("address")}: Av. Diego Ramírez Pastor, 142<br />
            {getT("phone")}: 602 59 72 10<br />
            WhatsApp: 602 59 72 10<br />
            {getT("delivery")}<br />
            {getT("booking")}
          </p>
        </div>
      </div>
      <p className="copyright">La Casa de Burger &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}
