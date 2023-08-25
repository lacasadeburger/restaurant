import React, { useState } from "react";
import "./style.css";
import Swal from 'sweetalert2';
import StripeCheckout from 'react-stripe-checkout';
import background from "../src/assets/burger-5712704_1920.jpg";
import Nav from "./Nav"; // Importa el componente Nav

export default function Order({ cart, removeFromCart }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState(null);

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

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += Number(item.precio.replace(/[^0-9\.-]+/g, ""));
    });
    return total.toFixed(2);
  };

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    let orderList = "";
    cart.forEach((item) => {
      orderList += `${item.object} - ${item.precio}\n`;
    });
    const message = `Nombre del cliente: ${name}\nNúmero de teléfono: ${phone}\nDirección: ${address}\n\nLista de productos:\n${orderList}\n\nTotal a pagar:\n${getTotalPrice()}`;
    console.log(message);
    if (!name || !phone) {
      Swal.fire('Por favor ingrese su nombre y teléfono.');
      return;
    }
    const whatsappLink = `https://api.whatsapp.com/send/?phone=34602597210&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
    setName("");
    setPhone("");
    setAddress("");
    setCart([]);
  };

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const handleToken = (token) => {
    console.log(token); // Aquí puedes enviar el token de pago a tu servidor para procesar el pago
  };

  const isPaymentSelected = () => {
    return paymentOption !== null;
  };

  return (
    <div className="container-items">
      <Nav totalPrice={getTotalPrice()} /> {/* Pasa el valor de getTotalPrice() como prop al componente Nav */}
      <div className="item menuBurgers">
        <ul
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}
        >
          {cart.map((item, index) => (
            <li
              key={index}
              style={{
                fontSize: backOptions.includes(item.object.toLowerCase())
                  ? "20px"
                  : "30px",
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
          <p>Total a pagar: {getTotalPrice()}</p>
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
          <div className="payment-btn">
            <button
              className={`payment-btn1 ${paymentOption === "cash" ? "active" : ""}`}
              onClick={() => handlePaymentOptionChange("cash")}
            >
              <input
                type="radio"
                checked={paymentOption === "cash"}
                onChange={() => {}}
              />
              Pago en efectivo
            </button>
            <StripeCheckout
              token={handleToken}
              stripeKey="pk_test_51NTPABDSO9S1wLMQtIkAvMAAJHbwhbXRx0RfIaqySBmn6wDhCV5291bm65VivrrPbrOIvmexcLeU73SLOxq32db800wZKu4BBP"
              amount={getTotalPrice() * 100}
              name={name} // Nombre del cliente
            >
              <button
                className={`payment-btn2 ${paymentOption === "credit" ? "active" : ""}`}
                onClick={() => handlePaymentOptionChange("credit")}
              >
                Tarjeta de crédito
              </button>
            </StripeCheckout>
          </div>
        </div>
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
