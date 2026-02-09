import React, { useState } from "react";
import "./style.css";
// Chemin corrigé pour ton build
import background from "./assets/newspaper8.jpg";

export default function CardMenu(props) {
  const [isReversed, setIsReversed] = useState(false);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [clickedButton, setClickedButton] = useState(null);

  const handleFlip = (e) => {
    // Si on clique sur un bouton, on ne retourne pas la carte
    if (e.target.closest("button")) return;

    if (!props.isDrinkCard && !props.isPostreCard) {
      setIsReversed(!isReversed);
    }
  };

  const handleClick = (name, price) => {
    if (clickedButtons.includes(name)) {
      setClickedButtons(clickedButtons.filter((button) => button !== name));
    } else {
      setClickedButtons([...clickedButtons, name]);
      props.addToCart({ object: name, precio: price });
      setClickedButton(name);
      setTimeout(() => setClickedButton(null), 1000);
    }
  };

  const isDrinkOrPostreCard = props.isDrinkCard || props.isPostreCard;

  return (
    <div className={`menu-items ${isDrinkOrPostreCard ? "centered" : ""}`} style={{ marginBottom: "40px" }}>
      <div
        className={`card ${isReversed ? "reversed" : ""}`}
        onClick={handleFlip}
      >
        <div className="menu-item card-inner">

          {/* FACE AVANT (FRONT) */}
          <div className="front">
            <header className="header-Card">
              <button
                className={`add-btn ${clickedButton === props.object ? "clicked" : ""} centered`}
                onClick={() => {
                  props.addToCart(props);
                  setClickedButton(props.object);
                  setTimeout(() => setClickedButton(null), 1000);
                }}
              >
                Agregar
                <h4 className="center">{props.precio}</h4>
              </button>
            </header>

            <div className="image-container" style={{ backgroundImage: `url(${background})`, backgroundSize: "350px" }}>
              <img src={props.image} alt={props.object} style={{ width: "100%" }} />
            </div>

            <h1 className="center">{props.object}</h1>
            <p className="description-text">{props.description}</p>
          </div>

          {/* FACE ARRIÈRE (BACK) - LE DESIGN AVEC CADRES */}
          <div className="back">
            <div className="back-content">

              {/* SECTION EXTRAS */}
              <div className="options-section">
                <h5>EXTRAS</h5>
                <div className="options-grid">
                  <button className={`opt-btn ${clickedButtons.includes("Extra Huevo") ? "active" : ""}`} onClick={() => handleClick("Extra Huevo", "€0.80")}>+ Huevo</button>
                  <button className={`opt-btn ${clickedButtons.includes("Extra Bacon") ? "active" : ""}`} onClick={() => handleClick("Extra Bacon", "€1.00")}>+ Bacon</button>
                  <button className={`opt-btn ${clickedButtons.includes("Extra Carne") ? "active" : ""}`} onClick={() => handleClick("Extra Carne", "€3.00")}>+ Carne</button>
                  <button className={`opt-btn ${clickedButtons.includes("Salsa Picante") ? "active" : ""}`} onClick={() => handleClick("Salsa Picante", "€0.50")}>+ Picante</button>
                </div>
              </div>

              {/* SECTION QUITAR (LES "SIN") */}
              <div className="options-section">
                <h5>QUITAR</h5>
                <div className="options-grid">
                  <button className={`opt-btn sin ${clickedButtons.includes("Sin Tomate") ? "active" : ""}`} onClick={() => handleClick("Sin Tomate", "€0.00")}>Tomate</button>
                  <button className={`opt-btn sin ${clickedButtons.includes("Sin Cebolla") ? "active" : ""}`} onClick={() => handleClick("Sin Cebolla", "€0.00")}>Cebolla</button>
                  <button className={`opt-btn sin ${clickedButtons.includes("Sin Pepinillos") ? "active" : ""}`} onClick={() => handleClick("Sin Pepinillos", "€0.00")}>Pepinillo</button>
                  <button className={`opt-btn sin ${clickedButtons.includes("Sin Lechuga") ? "active" : ""}`} onClick={() => handleClick("Sin Lechuga", "€0.00")}>Lechuga</button>
                </div>
              </div>

              <button className="flip-btn-close" onClick={() => setIsReversed(false)}>
                LISTO
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
