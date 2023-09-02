import React from 'react';
import navLogo from "../src/assets/Logo.jpeg";
import devrod from "../src/assets/devrod.png";

export default function Footer() {
  return (
    <footer className='footer'>
      <div className="footer-content">
        <div className="logo-container">
          <img src={navLogo} alt="logo" className="logoFooter" />
          <a href="https://devrod.site/"><img src={devrod} alt="disenadores web" className="logoFooter" /></a>
          
        </div>
        <div className="info-container">
          <p>
            Direccion: 700,0 m · Av. Diego Ramírez Pastor, 142<br />
            Telefono: 602 59 72 10<br />
            WhatsApp: 602 59 72 10<br />
            Pedidos a domicilio, para llevar<br />
            Para reservaciones, llamar al teléfono o por WhatsApp
          </p>
        </div>
      </div>
      <p className="copyright">La Casa de Burger &copy; 2023</p>
    </footer>
  );
}
