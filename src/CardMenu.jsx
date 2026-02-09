import React, { useState } from "react";
import "./style.css";
// On enlève un ".." car le fichier est maintenant plus proche du dossier assets
import background from "./assets/newspaper8.jpg";

export default function CardMenu(props) {
  const [isReversed, setIsReversed] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const [clickedButtons, setClickedButtons] = useState([]);

  // Gestion du retournement de la carte (Flip)
  const handleFlip = (e) => {
    // Sécurité : On ne retourne pas la carte si on clique sur le bouton d'ajout
    if (e.target.closest(".add-btn")) return;

    // Pas de flip pour les boissons ou desserts
    if (props.isDrinkCard || props.isPostreCard) return;

    setIsReversed(!isReversed);
  };

  // Ajout au panier pour les ingrédients Extras (Face arrière)
  const handleAddToCartExtra = (name, price) => {
    props.addToCart({ object: name, precio: price });
  };

  const handleClickExtra = (name, price) => {
    if (clickedButtons.includes(name)) {
      setClickedButtons(clickedButtons.filter((button) => button !== name));
    } else {
      setClickedButtons([...clickedButtons, name]);
      handleAddToCartExtra(name, price);
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

          {/* --- FACE AVANT (FRONT) --- */}
          <div className="front">
            {/* BOUTON AÑADIR : Visibilité maximale en haut */}
            <header className="header-Card" style={{ padding: "12px" }}>
              <button
                className={`add-btn ${clickedButton === props.object ? "clicked" : ""}`}
                style={{
                  width: "100%",
                  backgroundColor: clickedButton === props.object ? "#2ed573" : "#ff4757",
                  color: "white",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  fontWeight: "900",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                  transition: "all 0.2s ease",
                  textTransform: "uppercase",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px"
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Empêche le retournement de la carte
                  props.addToCart(props);
                  setClickedButton(props.object);
                  setTimeout(() => setClickedButton(null), 1000);
                }}
              >
                <span style={{ letterSpacing: "1px" }}>
                  {clickedButton === props.object ? "✓ ¡AÑADIDO!" : "AÑADIR AL CARRITO"}
                </span>
                <span style={{ fontSize: "1.3rem", opacity: "0.9" }}>{props.precio}</span>
              </button>
            </header>

            {/* ZONE IMAGE */}
            <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
              <img
                src={props.image}
                alt={props.object}
                style={{
                  width: "90%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.5))"
                }}
              />
            </div>

            {/* INFOS PRODUIT */}
            <h1 className="center" style={{ margin: "15px 0 5px", fontSize: "1.8rem", textTransform: "uppercase" }}>
              {props.object}
            </h1>
            <p style={{ padding: "0 15px", fontSize: "0.95rem", color: "#333", lineHeight: "1.4", minHeight: "50px" }}>
              {props.description}
            </p>
          </div>

          {/* --- FACE ARRIÈRE (BACK) --- */}
          <div className="back">
            <h3 style={{ marginTop: "20px", color: "#ff4757", textTransform: "uppercase" }}>Personaliza tu pedido</h3>
            <ul className="backList" style={{ padding: "10px", listStyle: "none" }}>
              <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                Extra Huevo
                <button className="add-btn2" onClick={() => handleClickExtra("Extra Huevo", "0.80")}>+0.80€</button>
              </li>
              <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                Extra Bacon
                <button className="add-btn2" onClick={() => handleClickExtra("Extra Bacon", "1.00")}>+1.00€</button>
              </li>
              <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                Sin Tomate
                <button className="add-btn2" onClick={() => handleClickExtra("Sin Tomate", "0.00")}>SIN</button>
              </li>
              <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                Sin Cebolla
                <button className="add-btn2" onClick={() => handleClickExtra("Sin Cebolla", "0.00")}>SIN</button>
              </li>
            </ul>

            <button
              className="flip-btn"
              onClick={handleFlip}
              style={{
                backgroundColor: "#1a1a1a",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "8px",
                marginTop: "15px",
                cursor: "pointer",
                fontWeight: "bold",
                textTransform: "uppercase"
              }}
            >
              CONFIRMAR Y VOLVER
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
