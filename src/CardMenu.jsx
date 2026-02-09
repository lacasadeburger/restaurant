import React, { useState } from "react";
import "./style.css";
import background from "./assets/newspaper8.jpg";

export default function CardMenu(props) {
  const [isReversed, setIsReversed] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const [clickedButtons, setClickedButtons] = useState([]);

  const handleFlip = (e) => {
    if (e.target.classList.contains("add-btn") || e.target.parentElement.classList.contains("add-btn")) {
      setIsReversed(true);
    } else if (e.target.classList.contains("flip-btn") && !props.isDrinkCard) {
      setIsReversed(!isReversed);
    }
  };

  const handleAddToCart = (name, price) => {
    props.addToCart({ object: name, precio: price });
  };

  const handleClickExtra = (name, price) => {
    if (clickedButtons.includes(name)) {
      setClickedButtons(clickedButtons.filter((button) => button !== name));
    } else {
      setClickedButtons([...clickedButtons, name]);
      handleAddToCart(name, price);
    }
  };

  const isDrinkOrPostreCard = props.isDrinkCard || props.isPostreCard;

  return (
    <div className={`menu-items ${isDrinkOrPostreCard ? "centered" : ""}`} style={{ marginBottom: "40px" }}>
      <div className={`card ${isReversed ? "reversed" : ""}`} onClick={isDrinkOrPostreCard ? undefined : handleFlip}>
        <div className="menu-item card-inner">

          {/* FACE AVANT */}
          <div className="front">
            <header className="header-Card" style={{ padding: "10px" }}>
              <button
                className={`add-btn ${clickedButton === props.object ? "clicked" : ""}`}
                style={{
                  width: "100%",
                  backgroundColor: clickedButton === props.object ? "#2ed573" : "#ff4757",
                  color: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "900",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  transition: "all 0.2s ease",
                  textTransform: "uppercase"
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Évite de retourner la carte par erreur
                  props.addToCart(props);
                  setClickedButton(props.object);
                  setTimeout(() => setClickedButton(null), 1000);
                }}
              >
                {clickedButton === props.object ? "✓ ¡AÑADIDO!" : "AÑADIR AL CARRITO"}
                <span style={{ display: "block", fontSize: "1.2rem", marginTop: "4px" }}>{props.precio}</span>
              </button>
            </header>

            <div style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
              <img src={props.image} alt={props.object} style={{ width: "100%", objectFit: "contain" }} />
            </div>

            <h1 className="center" style={{ margin: "15px 0 5px" }}>{props.object}</h1>
            <p style={{ padding: "0 15px", fontSize: "0.9rem", color: "#444" }}>{props.description}</p>
          </div>

          {/* FACE ARRIÈRE (OPTIONS) */}
          <div className="back">
            <h3 style={{ marginTop: "15px", color: "#ff4757" }}>Personaliza tu Burger</h3>
            <ul className="backList">
              <li>Extra Huevo <button className="add-btn2" onClick={() => handleClickExtra("Extra Huevo", "€0.80")}>+0.80€</button></li>
              <li>Extra Bacon <button className="add-btn2" onClick={() => handleClickExtra("Extra Tocino", "€1.00")}>+1.00€</button></li>
              <li>Sin Tomate <button className="add-btn2" onClick={() => handleClickExtra("Sin Tomate", "€0.00")}>Sin</button></li>
              <li>Sin Cebolla <button className="add-btn2" onClick={() => handleClickExtra("Sin Cebolla", "€0.00")}>Sin</button></li>
            </ul>
            <button className="flip-btn add-btn2" onClick={handleFlip} style={{ backgroundColor: "#333", color: "white", marginTop: "20px" }}>
              CONFIRMAR Y VOLVER
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
