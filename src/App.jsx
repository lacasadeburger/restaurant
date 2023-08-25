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
                 
        <a href="https://www.facebook.com/profile.php?id=100090023714230" target="_blank"><img src={fb} alt="facebook" className="round-button"/></a>
        
       
          
        <a href="https://www.instagram.com/_la_casa_de_burger/?fbclid=IwAR0xxVUGtmcpizgzcZJw_bzZ-XitXogchncVns5qnWtZs9RDFGGCw3h1eSQ" target="_blank"><img src={instagram} alt="instagram" className="round-button"/></a>
        
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

  return (
    <div>
      <Nav />
      <br/><br/>
      <Body />
      <TitleBurger />
      <section className="menu-items">{card}</section>

      <TitlePostre />
      <section className="menu-items">{cardPostres}</section>

      <TitleDrinks />
      <section className="menu-items">{cardDrinks}</section>      

      <TitleOrder />
      <Order  cart={cart} removeFromCart={removeFromCart} />

      <Footer />
    </div>
  );
}
