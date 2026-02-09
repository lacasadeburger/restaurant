import React, { useState } from "react";
import "./style.css";
// Chemin corrigé pour le build
import background from "./assets/newspaper8.jpg";

export default function CardMenu(props) {
  const [isReversed, setIsReversed] = useState(false);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [clickedButton, setClickedButton] = useState(null);

  const handleFlip = (e) => {
    if (
      e.target.classList.contains("add-btn") ||
      e.target.parentElement.classList.contains("add-btn")
    ) {
      setIsReversed(true);
    } else if (
      e.target.classList.contains("flip-btn") &&
      !props.isDrinkCard
    ) {
      setIsReversed(!isReversed);
    }
  };

  const handleAddToCart = (name, price) => {
    const item = {
      object: name,
      precio: price,
    };
    props.addToCart(item);
  };

  const handleClick = (name, price) => {
    if (clickedButtons.includes(name)) {
      setClickedButtons(clickedButtons.filter((button) => button !== name));
    } else {
      setClickedButtons([...clickedButtons, name]);
      handleAddToCart(name, price);
      setClickedButton(name);
      setTimeout(() => {
        setClickedButton(null);
      }, 1000);
    }
  };

  const isDrinkOrPostreCard = props.isDrinkCard || props.isPostreCard;

  return (
    <div className={`menu-items ${isDrinkOrPostreCard ? "centered" : ""}`} style={{ marginBottom: "40px" }}>
      <div
        className={`card ${isReversed ? "reversed" : ""}`}
        onClick={props.isDrinkCard || props.isPostreCard ? undefined : handleFlip}
      >
        <div className="menu-item card-inner">
          <div className="front">
            <header className="header-Card">
              <button
                className={`add-btn ${clickedButton === props.object ? "clicked" : ""} centered`}
                onClick={() => {
                  props.addToCart(props);
                  setClickedButton(props.object);
                  setTimeout(() => {
                    setClickedButton(null);
                  }, 1000);
                }}
              >
                Agregar
                <h4 className="center">{props.precio}</h4>
              </button>
              <br />
            </header>
            <div
              style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "350px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <img
                src={props.image}
                alt={props.object}
                style={{
                  width: "100%",
                }}
              />
            </div>
            <h1 className="center">{props.object}</h1>
            <p>{props.description}</p>
            <footer className="precio-card"></footer>
          </div>

          <div className="back">
            <br />
            <ul className="backList">
              <li>
                Extra Huevo{" "}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Extra Huevo") ? "clicked" : ""}`}
                  onClick={() => handleClick("Extra Huevo", "€0.80")}
                >
                  {clickedButton === "Extra Huevo" ? "Agregado" : "€0.80"}
                </button>
              </li>
              <li>
                Extra Carne y Queso{" "}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Extra Carne y Queso") ? "clicked" : ""}`}
                  onClick={() => handleClick("Extra Carne y Queso", "€3.00")}
                >
                  {clickedButton === "Extra Carne y Queso" ? "Agregado" : "€3.00"}
                </button>
              </li>
              <li>
                Extra Tocino{" "}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Extra Tocino") ? "clicked" : ""}`}
                  onClick={() => handleClick("Extra Tocino", "€1.00")}
                >
                  {clickedButton === "Extra Tocino" ? "Agregado" : "€1.00"}
                </button>
              </li>
              <li>
                Salsa Picante{" "}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Salsa Picante") ? "clicked" : ""}`}
                  onClick={() => handleClick("Salsa Picante", "€0.50")}
                >
                  {clickedButton === "Salsa Picante" ? "Agregado" : "€0.50"}
                </button>
              </li>
              <li>
                Sin Tomate{" "}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Tomate") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Tomate", "€0.00")}
                >
                  {clickedButton === "Sin Tomate" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Lechuga{" "}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Lechuga") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Lechuga", "€0.00")}
                >
                  {clickedButton === "Sin Lechuga" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Cebolla{" "}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Cebolla") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Cebolla", "€0.00")}
                >
                  {clickedButton === "Sin Cebolla" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Pepinillos{" "}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Pepinillos") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Pepinillos", "€0.00")}
                >
                  {clickedButton === "Sin Pepinillos" ? "Agregado" : "€0.00"}
                </button>
              </li>
            </ul>
            {!props.isDrinkCard && (
              <button className="flip-btn add-btn2" onClick={handleFlip}>
                Agregar Otra
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
