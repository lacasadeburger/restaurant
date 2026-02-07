import React, { useState } from "react";
import "./style.css";
import Nav from "./Nav";
import Swal from "sweetalert2";

export default function Order({ cart, removeFromCart }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      if (item.precio) {
        total += Number(item.precio.replace(/[^0-9\.-]+/g, ""));
      }
    });
    return total.toFixed(2);
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (!name || !phone) {
      Swal.fire("Por favor ingrese su nombre y teléfono.");
      return;
    }

    if (!paymentOption) {
      Swal.fire("Por favor seleccione método de pago (Efectivo o Tarjeta).");
      return;
    }

    let orderList = "";
    cart.forEach((item, index) => {
      orderList += `\n*${index + 1}. ${item.object.toUpperCase()}* - ${item.precio}\n`;
      if (item.removed && item.removed.length > 0) {
        orderList += `    ❌ SIN: ${item.removed.join(", ").toUpperCase()}\n`;
      }
    });

    const message = `*NUEVO PEDIDO - LA CASA DE BURGER*\n\n` +
                    `👤 *Cliente:* ${name}\n` +
                    `📞 *Tel:* ${phone}\n` +
                    `📍 *Entrega:* ${address || "Recogida en local"}\n\n` +
                    `📝 *DETALLE DU PEDIDO:*\n${orderList}\n` +
                    `💰 *TOTAL:* ${getTotalPrice()}€\n` +
                    `💳 *PAGO:* ${paymentOption.toUpperCase()}`;

    const whatsappLink = `https://api.whatsapp.com/send/?phone=34602597210&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");

    setName(""); setPhone(""); setAddress(""); setPaymentOption("");
    removeFromCart([]);
  };

  return (
    <div className="container-items" id="order" style={{ padding: '10px' }}>
      <Nav totalPrice={getTotalPrice()} />

      <div className="item menuBurgers" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Liste des produits - TEXTE EN ROUGE VIF */}
        <ul style={{
          padding: 0,
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {cart.map((item, index) => (
            <li
              key={index}
              style={{
                fontSize: "18px",
                color: "#ff4757", // CHANGEMENT : ROUGE VIF pour le texte principal
                listStyle: "none",
                textAlign: "left",
                padding: "15px 10px",
                borderBottom: "1px solid #444",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: '100%',
                boxSizing: 'border-box',
                fontWeight: "bold" // Ajout de gras pour encore plus de visibilité
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ flex: 1, paddingRight: '10px' }}>{item.object}</span>
                <button className="btn-cart" onClick={() => removeFromCart(index)} style={{ minWidth: '30px' }}>✕</button>
              </div>

              {item.removed && item.removed.length > 0 && (
                <span style={{ fontSize: "14px", color: "#ffffff", backgroundColor: "#ff4757", padding: "2px 8px", borderRadius: "4px", width: "fit-content" }}>
                  ❌ SIN: {item.removed.join(", ")}
                </span>
              )}

              <span style={{ fontSize: "16px", color: "#ff4757", opacity: 0.9 }}>{item.precio}</span>
            </li>
          ))}
        </ul>

        {/* Formulaire et Total */}
        <div className="info-product" style={{ width: '100%', maxWidth: '500px', padding: '0 10px', boxSizing: 'border-box' }}>
          <p style={{color:"#ff4757", fontWeight: '900', fontSize: '1.8rem', marginBottom: '15px', textAlign: 'center', textTransform: 'uppercase'}}>
            Total: {getTotalPrice()}€
          </p>

          <input type="text" placeholder="Tu Nombre" className="placeholder" style={{ width: '100%', border: '1px solid #ff4757' }} value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Tu Teléfono" className="placeholder" style={{ width: '100%', border: '1px solid #ff4757' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
          <textarea placeholder="Dirección (Vacío para recoger)" className="placeholder" style={{ width: '100%', minHeight: '80px', border: '1px solid #ff4757' }} value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

          <div style={{ marginTop: '20px', width: '100%' }}>
            <p style={{ color: 'white', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold' }}>¿Cómo pagarás?</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setPaymentOption("Efectivo")}
                style={{ flex: 1, padding: '15px 5px', borderRadius: '8px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Efectivo" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
              >💵 Efectivo</button>
              <button
                onClick={() => setPaymentOption("Tarjeta")}
                style={{ flex: 1, padding: '15px 5px', borderRadius: '8px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Tarjeta" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
              >💳 Tarjeta</button>
            </div>
          </div>
        </div>

        <button
          className="add-btn2"
          onClick={handleOrder}
          disabled={!paymentOption}
          style={{
            marginTop: '30px',
            padding: '20px 20px',
            width: '95%',
            maxWidth: '400px',
            backgroundColor: paymentOption ? '#25D366' : '#444',
            color: 'white',
            fontSize: '18px',
            fontWeight: '900',
            borderRadius: '50px',
            border: 'none',
            boxShadow: paymentOption ? '0 4px 15px rgba(37, 211, 102, 0.4)' : 'none'
          }}
        >
          {paymentOption ? "🚀 ENVIAR POR WHATSAPP" : "ELIJA MÉTODO DE PAGO"}
        </button>
      </div>
    </div>
  );
}
