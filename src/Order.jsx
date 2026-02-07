import React, { useState } from "react";
import "./style.css";
// On n'importe plus Nav ici car il est déjà géré par App.jsx de manière globale
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
        // Nettoyage robuste du prix pour éviter les erreurs NaN
        const priceValue = Number(item.precio.toString().replace(/[^0-9,.]+/g, "").replace(",", "."));
        total += priceValue;
      }
    });
    return total.toFixed(2);
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (!name || !phone) {
      Swal.fire({
        title: "Falta información",
        text: "Por favor ingrese su nombre y teléfono.",
        icon: "warning",
        confirmButtonColor: "#ff4757"
      });
      return;
    }

    if (!paymentOption) {
      Swal.fire({
        title: "Método de pago",
        text: "Por favor seleccione método de pago (Efectivo o Tarjeta).",
        icon: "warning",
        confirmButtonColor: "#ff4757"
      });
      return;
    }

    let orderList = "";
    cart.forEach((item, index) => {
      orderList += `\n*${index + 1}. ${item.object.toUpperCase()}* - ${item.precio}\n`;
      if (item.removed && item.removed.length > 0) {
        orderList += `   ❌ SIN: ${item.removed.join(", ").toUpperCase()}\n`;
      }
    });

    const message = `*NUEVO PEDIDO - LA CASA DE BURGER*\n\n` +
                    `👤 *Cliente:* ${name}\n` +
                    `📞 *Tel:* ${phone}\n` +
                    `📍 *Entrega:* ${address || "Recogida en local"}\n\n` +
                    `📝 *DETALLE DU PEDIDO:*\n${orderList}\n` +
                    `💰 *TOTAL:* ${getTotalPrice()}€\n` +
                    `💳 *PAGO:* ${paymentOption.toUpperCase()}`;

    // Utilisation de wa.me (plus moderne et rapide)
    const whatsappLink = `https://wa.me/34602597210?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");

    // Reset après commande
    setName(""); setPhone(""); setAddress(""); setPaymentOption("");
    // Optionnel : On vide le panier après l'envoi
    // removeFromCart("all");
  };

  return (
    <div className="container-items" id="order" style={{ padding: '20px 10px' }}>
      {/* Suppression du <Nav /> ici pour éviter les doublons avec App.jsx */}

      <div className="item menuBurgers" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#1a1a1a', // Fond légèrement plus clair pour détacher la section
        borderRadius: '20px',
        padding: '20px 0'
      }}>

        <ul style={{
          padding: 0,
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {cart.length === 0 ? (
            <p style={{color: '#888', fontStyle: 'italic'}}>(Tu carrito está vacío / Votre panier est vide)</p>
          ) : (
            cart.map((item, index) => (
              <li
                key={index}
                style={{
                  fontSize: "18px",
                  color: "#ff4757",
                  listStyle: "none",
                  textAlign: "left",
                  padding: "15px 15px",
                  borderBottom: "1px solid #333",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  width: '100%',
                  boxSizing: 'border-box',
                  fontWeight: "bold"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ flex: 1, paddingRight: '10px' }}>{item.object}</span>
                  <button className="btn-cart" onClick={() => removeFromCart(index)} style={{ minWidth: '30px', cursor: 'pointer' }}>✕</button>
                </div>

                {item.removed && item.removed.length > 0 && (
                  <span style={{ fontSize: "13px", color: "#ffffff", backgroundColor: "#ff4757", padding: "4px 10px", borderRadius: "50px", width: "fit-content", marginTop: '5px' }}>
                    ❌ SIN: {item.removed.join(", ")}
                  </span>
                )}

                <span style={{ fontSize: "16px", color: "#fff", opacity: 0.8 }}>{item.precio}</span>
              </li>
            ))
          )}
        </ul>

        {cart.length > 0 && (
          <div className="info-product" style={{ width: '100%', maxWidth: '500px', padding: '0 20px', boxSizing: 'border-box' }}>
            <p style={{color:"#ff4757", fontWeight: '900', fontSize: '2.2rem', margin: '25px 0', textAlign: 'center', textTransform: 'uppercase'}}>
              Total: {getTotalPrice()}€
            </p>

            <input type="text" placeholder="Tu Nombre" className="placeholder" style={{ width: '100%', border: '1px solid #ff4757', marginBottom: '10px', padding: '12px' }} value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Tu Teléfono" className="placeholder" style={{ width: '100%', border: '1px solid #ff4757', marginBottom: '10px', padding: '12px' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea placeholder="Dirección (Vacío para recoger en local)" className="placeholder" style={{ width: '100%', minHeight: '80px', border: '1px solid #ff4757', padding: '12px' }} value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

            <div style={{ marginTop: '20px', width: '100%' }}>
              <p style={{ color: 'white', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>¿Cómo pagarás?</p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  onClick={() => setPaymentOption("Efectivo")}
                  style={{ flex: 1, padding: '15px 5px', borderRadius: '12px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Efectivo" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: '0.3s' }}
                >💵 Efectivo</button>
                <button
                  onClick={() => setPaymentOption("Tarjeta")}
                  style={{ flex: 1, padding: '15px 5px', borderRadius: '12px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Tarjeta" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: '0.3s' }}
                >💳 Tarjeta</button>
              </div>
            </div>

            <button
              className="add-btn2"
              onClick={handleOrder}
              disabled={!paymentOption || cart.length === 0}
              style={{
                marginTop: '35px',
                padding: '20px',
                width: '100%',
                backgroundColor: (paymentOption && cart.length > 0) ? '#25D366' : '#444',
                color: 'white',
                fontSize: '18px',
                fontWeight: '900',
                borderRadius: '50px',
                border: 'none',
                cursor: (paymentOption && cart.length > 0) ? 'pointer' : 'not-allowed',
                boxShadow: (paymentOption && cart.length > 0) ? '0 6px 20px rgba(37, 211, 102, 0.4)' : 'none',
                transition: 'transform 0.2s active'
              }}
            >
              {paymentOption ? "🚀 ENVIAR POR WHATSAPP" : "ELIJA MÉTODO DE PAGO"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
