import React, { useState } from "react";
import "./style.css";
import background from "../src/assets/newspaper8.jpg";

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

  const handleAddToCartDoble = (name, price) => {
    const itemDoble = {
      object: name,
      precio: price,
    };
    props.addToCart(itemDoble);
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
  const showSingleButton = ["Patatas Fritas", "Patatas Bravas"].includes(props.object);

  return (
    <div className={`menu-items ${isDrinkOrPostreCard ? "centered" : ""}`} style={{ marginBottom: "40px" }}>
      <div
        className={`card ${isReversed ? "reversed" : ""}`}
        onClick={props.isDrinkCard || props.isPostreCard ? undefined : handleFlip}
      >
        <div className="menu-item card-inner">
          <div className="front">
            <header className="header-Card">
              {isDrinkOrPostreCard ? (
              /*modificar este boton*/  <button 
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
              ) : (
                <>
                  {showSingleButton ? (
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
                  ) : (
                    <>
                      <button
                        className={`add-btn ${clickedButton === props.object ? "clicked" : ""}centered`}
                        onClick={() => {
                          props.addToCart(props);
                          setClickedButton(props.object);
                          setTimeout(() => {
                            setClickedButton(null);
                          }, 1000);
                        }}
                      >
                        Normal
                        <h4 className="center">{props.precio}</h4>
                      </button>
                      
                    </>
                  )}
                </>
              )}
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
                alt="Burger 1"
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
            <br></br>
            <ul className="backList">
              <li>
                Extra Huevo {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Extra Huevo") ? "clicked" : ""}`}
                  onClick={() => handleClick("Extra Huevo", "€1.50")}
                >
                  {clickedButton === "Extra Huevo" ? "Agregado" : "€1.50"}
                </button>
              </li>
              <li>
                Extra Queso {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Extra Queso") ? "clicked" : ""}`}
                  onClick={() => handleClick("Extra Queso", "€1.50")}
                >
                  {clickedButton === "Extra Queso" ? "Agregado" : "€1.50"}
                </button>
              </li>
              <li>
                Tocino Extra {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Tocino Extra") ? "clicked" : ""}`}
                  onClick={() => handleClick("Tocino Extra", "€1.00")}
                >
                  {clickedButton === "Tocino Extra" ? "Agregado" : "€1.00"}
                </button>
              </li>
              <li>
                Salsa Picante {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Salsa Picante") ? "clicked" : ""}`}
                  onClick={() => handleClick("Salsa Picante", "€1.00")}
                >
                  {clickedButton === "Salsa Picante" ? "Agregado" : "€1.00"}
                </button>
              </li>
              <li>
                Sin Tomate {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Tomate") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Tomate", "€0.00")}
                >
                  {clickedButton === "Sin Tomate" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Ensalada {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Ensalada") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Ensalada", "€0.00")}
                >
                  {clickedButton === "Sin Ensalada" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Pepinillos {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Pepinillos") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Pepinillos", "€0.00")}
                >
                  {clickedButton === "Sin Pepinillos" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Salsa {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Salsa") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Salsa", "€0.00")}
                >
                  {clickedButton === "Sin Salsa" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Queso {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Queso") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Queso", "€0.00")}
                >
                  {clickedButton === "Sin Queso" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Ajo {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Ajo") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Ajo", "€0.00")}
                >
                  {clickedButton === "Sin Ajo" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Perejil {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Perejil") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Perejil", "€0.00")}
                >
                  {clickedButton === "Sin Perejil" ? "Agregado" : "€0.00"}
                </button>
              </li>
              <li>
                Sin Comino {""}
                <button
                  className={`add-btn2 ${clickedButtons.includes("Sin Comino") ? "clicked" : ""}`}
                  onClick={() => handleClick("Sin Comino", "€0.00")}
                >
                  {clickedButton === "Sin Comino" ? "Agregado" : "€0.00"}
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
