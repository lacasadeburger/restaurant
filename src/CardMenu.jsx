import React, { useState } from "react";
import "./style.css";
// Chemin pour ton build (vérifie s'il faut ./ ou ../ selon ton dossier)
import background from "./assets/newspaper8.jpg";

export default function CardMenu(props) {
  const [clickedButtons, setClickedButtons] = useState([]);
  const [clickedButton, setClickedButton] = useState(null);

  const handleAddToCart = (name, price) => {
    props.addToCart({
      object: name,
      precio: price,
    });
  };

  const handleClick = (name, price) => {
    if (clickedButtons.includes(name)) {
      setClickedButtons(clickedButtons.filter((button) => button !== name));
    } else {
      setClickedButtons([...clickedButtons, name]);
      handleAddToCart(name, price);
      setClickedButton(name);
      setTimeout(() => setClickedButton(null), 1000);
    }
  };

  const isDrinkOrPostreCard = props.isDrinkCard || props.isPostreCard;

  return (
    <div className={`menu-card-container ${isDrinkOrPostreCard ? "centered" : ""}`}>
      <div className="menu-card-main">

        {/* EN-TÊTE : NOM ET PRIX */}
        <div className="menu-card-header">
          <h1 className="item-title">{props.object}</h1>
          <button
            className={`main-add-btn ${clickedButton === props.object ? "added" : ""}`}
            onClick={() => {
              props.addToCart(props);
              setClickedButton(props.object);
              setTimeout(() => setClickedButton(null), 1000);
            }}
          >
            {clickedButton === props.object ? "✓" : `AÑADIR ${props.precio}`}
          </button>
        </div>

        {/* IMAGE AVEC LE FOND JOURNAL */}
        <div
          className="item-image-wrapper"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <img src={props.image} alt={props.object} className="item-img" />
        </div>

        {/* DESCRIPTION */}
        <p className="item-description">{props.description}</p>

        {/* OPTIONS DIRECTES (EXTRAS & QUITAR) */}
        {!isDrinkOrPostreCard && (
          <div className="custom-options-container">

            <div className="options-group">
              <span className="group-label">EXTRAS (+€)</span>
              <div className="options-grid">
                <button className={`opt-tag ${clickedButtons.includes("Huevo") ? "active" : ""}`} onClick={() => handleClick("Extra Huevo", "€0.80")}>+ Huevo</button>
                <button className={`opt-tag ${clickedButtons.includes("Bacon") ? "active" : ""}`} onClick={() => handleClick("Extra Bacon", "€1.00")}>+ Bacon</button>
                <button className={`opt-tag ${clickedButtons.includes("Carne") ? "active" : ""}`} onClick={() => handleClick("Extra Carne", "€3.00")}>+ Carne</button>
              </div>
            </div>

            <div className="options-group">
              <span className="group-label">QUITAR (SIN)</span>
              <div className="options-grid">
                <button className={`opt-tag sin ${clickedButtons.includes("Sin Tomate") ? "active" : ""}`} onClick={() => handleClick("Sin Tomate", "€0.00")}>Tomate</button>
                <button className={`opt-tag sin ${clickedButtons.includes("Sin Cebolla") ? "active" : ""}`} onClick={() => handleClick("Sin Cebolla", "€0.00")}>Cebolla</button>
                <button className={`opt-tag sin ${clickedButtons.includes("Sin Pepinillos") ? "active" : ""}`} onClick={() => handleClick("Sin Pepinillos", "€0.00")}>Pepinillo</button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
