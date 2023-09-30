import React, { useState, useEffect } from "react";
import Nav from "../src/Nav";
import Order from "../src/Order";
import CardMenu from "./CardMenu";
import Footer from "../src/Footer";
import "../src/style.css";
import data from "../data";
import background from "../src/assets/india.png";
import background1 from "../src/assets/inglesa.png";
import background2 from "../src/assets/marroqi.png";
import fb from "../src/assets/FB.png";
import instagram from "../src/assets/INST.png";
import Postre from "../src/assets/postre.png";
import Burger from "../src/assets/burger.png";
import Drink from "../src/assets/drink.png";


const backgrounds = [background, background1, background2];

function Body() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const changeBackground = () => {
    const newIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundIndex(newIndex);
  };

  useEffect(() => {
    changeBackground();
  }, []);

  return (
    <div className="menuBurgers title">
      <h1>Bienvenidos a la casa del Frances</h1>
      <img src={backgrounds[backgroundIndex]} alt="Background" className="responsive-image image-size" />

          
      <p>¡Ven y prueba las hamburguesas con queso Francés!</p>
      <div className="button-container">
                 
        <a href="https://www.facebook.com/profile.php?id=100094610793536" target="_blank"><img src={fb} alt="facebook" className="round-button"/></a>
        
       
          
        <a href="https://www.instagram.com/lacasadeburger.es/?igshid=NGVhN2U2NjQ0Yg%3D%3D" target="_blank"><img src={instagram} alt="instagram" className="round-button"/></a>
        
      </div>
    </div>
  );
}

function TitleBurger() {
  return (
    <div className="menuBurgers">
      <h1>Menu de Burger</h1>
    </div>
  );
}

function TitleDrinks() {
  return (
    <div className="menuBurgers">
      <h1>Menu de Bebidas</h1>
    </div>
  );
}

function TitlePostre() {
  return (
    <div className="menuBurgers">
      <h1>Menu de Postres</h1>
    </div>
  );
}

function TitleOrder() {
  return (
    <div className="menuBurgers" id="order">
      <h1 >Listo para Ordenar</h1>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCardPostres, setShowCardPostres] = useState(false); // Estado para controlar si mostrar cardPostres *
  const [showCardBurger, setShowCardBurger] = useState(false);
  const [showCardDrink, setShowCardDrink] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const burgers = data.filter((item) => item.category === "food");
  const card = burgers.map((item) => {
    return (
      <CardMenu
        key={item.id}
        image={item.image}
        object={item.object}
        description={item.description}
        precio={item.precio}
        precioDoble={item.precioDoble}
        addToCart={addToCart}
      />
    );
  });

  const drinks = data.filter((item) => item.category === "drink");
  const cardDrinks = drinks.map((item) => {
    return (
      <CardMenu
        key={item.id}
        image={item.image}
        object={item.object}
        description={item.description}
        precio={item.precio}
        category={item.category}
        isDrinkCard={true}
        addToCart={addToCart}
      />
    );
  });

  const postres = data.filter((item) => item.category === "postre");
  const cardPostres = postres.map((item) => {
    return (
      <CardMenu
        key={item.id}
         image={item.image}
        object={item.object}
        description={item.description}
        precio={item.precio}
        category={item.category}
        isPostreCard={true}
        addToCart={addToCart}
      />
    );
  });

  const toggleCardPostres = () => {
    setShowCardPostres(!showCardPostres); // Cambia el estado cuando se hace clic en el botón
  };

  const toggleCardBurger = () => {
    setShowCardBurger(!showCardBurger); // Cambia el estado cuando se hace clic en el botón
  };

  const toggleCardDrink = () => {
    setShowCardDrink(!showCardDrink); // Cambia el estado cuando se hace clic en el botón
  };


  return (
    <div>
      <Nav />
      <br/><br/>
      <Body />
      {/*----------------------------------------------------------------------------------------*/}
      <TitleBurger />
      <section className="menu-items">
        {showCardBurger ? (
          // Si showCardPostres es verdadero, muestra cardPostres
          <div style={{ textAlign: "center",}} >
            <span className="menu-items">
              {card}
            </span> 
            <span style={{display:"flex", justifyContent: "center"}}>
              <button onClick={toggleCardBurger} style={{alignItems:"center", justifyContent:"center"}}>Ocultar menú</button>
            </span>           
            
          </div>
        ) : (
          // Si showCardPostres es falso, muestra el botón para mostrar cardPostres
          <div style={{display:"flex", justifyContent:"center"}}>
            <img src={Burger} alt="Imagen" style={{ maxWidth: "75%", height: "auto" }}/>
            <button onClick={toggleCardBurger}>Ver menú</button>
          </div>
        )}
      </section>
      {/*----------------------------------------------------------------------------------------*/}    
      <TitlePostre />
      <section className="menu-items">
        {showCardPostres ? (
          // Si showCardPostres es verdadero, muestra cardPostres
          <div style={{ textAlign: "center",}} >
            <span className="menu-items">
              {cardPostres}
            </span>
            <span style={{display:"flex", justifyContent: "center"}}>
              <button onClick={toggleCardPostres} style={{alignItems:"center", justifyContent:"center"}}>Ocultar menú</button>
            </span>
            
          </div>
        ) : (
          // Si showCardPostres es falso, muestra el botón para mostrar cardPostres
          <div style={{display:"flex", justifyContent: "center"}} >
            <img src={Postre} alt="Imagen" style={{ maxWidth: "75%", height: "auto" }}/>
            <button onClick={toggleCardPostres}>Ver menú</button>
          </div>
        )}
      </section>
        {/*----------------------------------------------------------------------------------------*/}
      <TitleDrinks />
      <section className="menu-items">
        {showCardDrink ? (
          // Si showCardPostres es verdadero, muestra cardPostres
          <div style={{ textAlign: "center",}} >
            <span className="menu-items">
              {cardDrinks}
            </span>  
            <span style={{display:"flex", justifyContent: "center"}}>
              <button onClick={toggleCardDrink} style={{alignItems:"center", justifyContent:"center"}}>Ocultar menú</button>
            </span>          
            
          </div>
        ) : (
          // Si showCardPostres es falso, muestra el botón para mostrar cardPostres
          <div style={{display:"flex", justifyContent: "center"}}>
            <img src={Drink} alt="Imagen" style={{ maxWidth: "75%", height: "auto" }}/>
            <button onClick={toggleCardDrink}>Ver menú</button>
          </div>
        )}
      </section>   
          {/*----------------------------------------------------------------------------------------*/}

      <TitleOrder />

      <Order  cart={cart} removeFromCart={removeFromCart} />

      <Footer />
    </div>
  );
}
/*Punto de partida*/