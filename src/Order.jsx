import React, { useState } from "react";
import "./style.css";
import Nav from "./Nav";
import Swal from "sweetalert2";
import StripeCheckout from "react-stripe-checkout";

export default function Order({ cart, removeFromCart }) {
  // Estados para manejar los datos del cliente y opciones de pago
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [paymentOptionText, setPaymentOptionText] = useState("");

  // Opciones adicionales para el pedido
  const backOptions = [
    "extra huevo",
    "extra queso",
    "tocino extra",
    "salsa picante",
    "sin tomate",
    "sin ensalada",
    "sin pepinillos",
    "sin salsa",
    "sin queso",
    "sin ajo",
    "sin perejil",
    "sin comino"
  ];

  // Función para calcular el total a pagar
  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += Number(item.precio.replace(/[^0-9\.-]+/g, ""));
    });
    return total.toFixed(2);
  };

  // Función para manejar el clic en el botón "Pago en efectivo" o "Tarjeta de crédito"
  const handleButtonClick = () => {
    const selectedOption = paymentOption === "Efectivo" ? "" : "Efectivo";
    setPaymentOption(selectedOption);
    setPaymentOptionText(selectedOption === "Efectivo" ? "Efectivo" : "Tarjeta de crédito");
  };

  // Función para manejar el token de pago con tarjeta recibido de Stripe
  const handleToken = (token) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token,
        amount: getTotalPrice() // Aquí debes pasar el monto total a pagar
      })
    };
    
    fetch('https://lacasadeburger.es/api/payment', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPaymentOption("Tarjeta de crédito");
        setPaymentOptionText("Tarjeta de crédito");
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  // Función para verificar si se ha seleccionado alguna opción de pago
  const isPaymentSelected = () => {
    return paymentOption === "Efectivo" || paymentOption === "Tarjeta de crédito";
  };

  // Función para manejar el envío del pedido
  const handleOrder = (e) => {
    e.preventDefault();
    let orderList = "";
    cart.forEach((item) => {
      orderList += `${item.object} - ${item.precio}\n`;
    });
    const message = `Nombre del cliente: ${name}\nNúmero de teléfono: ${phone}\nDirección: ${address}\n\nLista de productos:\n${orderList}\n\nTotal a pagar:\n${getTotalPrice()}\n\nOpción de pago: ${paymentOptionText}`;
    console.log(message);

    if (!name || !phone) {
      Swal.fire("Por favor ingrese su nombre y teléfono.");
      return;
    }

    const whatsappLink = `https://api.whatsapp.com/send/?phone=34602597210&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");

    // Limpiar los campos y resetear las opciones de pago
    setName("");
    setPhone("");
    setAddress("");
    setPaymentOption("");
    setPaymentOptionText("");
    removeFromCart([]);
  };

  return (
    <div className="container-items">
      {/* Componente de navegación que muestra el total a pagar */}
      <Nav totalPrice={getTotalPrice()} />

      <div className="item menuBurgers" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {/* Lista de elementos en el carrito */}
        <ul
          
        >
          {cart.map((item, index) => (
            <li
              key={index}
              style={{
                fontSize: backOptions.includes(item.object.toLowerCase())
                  ? "20px" 
                  : "25px",
                color: backOptions.includes(item.object.toLowerCase())
                  ? "red" 
                  : "white",
                listStyle: "none",
                textAlign: "left"
              }}
            >
              {item.object} - {item.precio}
              <button
                className="btn-cart"
                onClick={() => removeFromCart(index)}
              >
                x
              </button>
            </li>
          ))}
        </ul>

        <div className="info-product">
          <p style={{color:"blue"}}>Total a pagar: {getTotalPrice()}</p>

          {/* Formulario para ingresar los datos del cliente */}
          <label htmlFor="name" className="cart-Order">
            Nombre del cliente
          </label>
          <input
            id="name"
            type="text"
            placeholder="Escriba su nombre"
            className="placeholder"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />

          <label htmlFor="phone" className="cart-Order">
            Número de teléfono
          </label>
          <input
            type="text"
            placeholder="Número de teléfono"
            className="placeholder"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />

          <label htmlFor="address">Dirección</label>
          <br />
          <textarea
            name="address"
            cols="30"
            rows="4"
            className="placeholder"
            placeholder="Escriba su dirección si su orden es para entrega a domicilio"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <br />

          {/* Opciones de pago */}
          <div className="payment-btn">
            <button
              className="payment-btn1"
              onClick={handleButtonClick}
              disabled={paymentOption === "Tarjeta de crédito"}
            >
              <input
                type="checkbox"
                checked={paymentOption === "Efectivo"}
                onChange={() => {}}
              />
              Pago en efectivo
            </button>
            <StripeCheckout
              token={handleToken}
              stripeKey="pk_test_51NYAhRCTQdBdq2KhM9EaWgTjihAtpYSuf1zyeIppTk2D0Air2Bca1dx1lHSar0e0XaNpvAAbj8bNWgewLXntzSgr00OZQaX9O8"
              amount={getTotalPrice() * 100}
              name={name}
              disabled={paymentOption === "Efectivo"}
              style={{ background: "#FF0000", color: "#FFFFFF" }}
              
            >
              <button disabled={paymentOption === "Efectivo"}>
                Tarjeta de crédito
              </button>
            </StripeCheckout>
          </div>
        </div>
        <br/>

        {/* Botón para enviar el pedido */}
        <button
          className="add-btn2"
          onClick={handleOrder}
          disabled={!isPaymentSelected()}
        >
          Enviar Orden
        </button>
      </div>
    </div>
  );
}
