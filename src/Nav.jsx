import React, { useRef } from "react";
import navLogo from "../src/assets/Logo.jpeg";
import carrito from "../src/assets/carrito.png";

export default function Nav({ totalPrice }) {
  const orderRef = useRef(null);

  const handleButtonClick = () => {
    orderRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="header">
      <div className="nav-left">
        {/* Contenido del nav izquierdo */}
      </div>
      <div className="nav-center">
        <img src={navLogo} alt="logo" className="logo" />
      </div>
      <div className="nav-right">
        {/* Contenido del nav derecho */}
        <span>{totalPrice}</span>
        <a href="#order" className="link">
          <button className="carrito" onClick={handleButtonClick}>
            <img src={carrito} className="carritoN" />
          </button>
        </a>
      </div>
    </nav>
  );
}
