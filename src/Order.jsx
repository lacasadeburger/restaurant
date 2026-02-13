import React, { useState } from "react";
import "./style.css";
import Swal from "sweetalert2";

export default function Order({ cart, removeFromCart, lang }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  // --- TRADUCTIONS ---
  const isEn = lang === 'en';
  const t = {
    empty: isEn ? "Your cart is empty" : "Tu carrito está vacío",
    totalLabel: "Total",
    placeholderName: isEn ? "Full Name" : "Tu Nombre",
    placeholderPhone: isEn ? "Phone Number" : "Tu Teléfono",
    placeholderAddress: isEn ? "Address (Empty for local pickup)" : "Dirección (Vacío para recoger en local)",
    payTitle: isEn ? "How will you pay?" : "¿Cómo pagarás?",
    cash: isEn ? "💵 Cash" : "💵 Efectivo",
    card: isEn ? "💳 Card" : "💳 Tarjeta",
    btnSend: isEn ? "🚀 SEND VIA WHATSAPP" : "🚀 ENVIAR POR WHATSAPP",
    btnSelectPay: isEn ? "CHOOSE PAYMENT METHOD" : "ELIJA MÉTODO DE PAGO",
    sin: isEn ? "WITHOUT" : "SIN",
    alertTitle: isEn ? "Missing information" : "Falta información",
    alertText: isEn ? "Please enter your name and phone." : "Por favor ingrese su nombre y teléfono.",
    alertPayTitle: isEn ? "Payment Method" : "Método de pago",
    alertPayText: isEn ? "Please select a payment method." : "Por favor seleccione método de pago.",
  };

  // --- CALCUL DU TOTAL (SÉCURISÉ CONTRE LES TRADUCTEURS) ---
  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      // On récupère la donnée brute (pas celle affichée à l'écran)
      const rawPrice = item.precio || item.totalPrice || "0";

      // Nettoyage strict : ne garde que chiffres, points et virgules
      const cleanPrice = rawPrice
        .toString()
        .replace(/[^0-9.,]/g, "")
        .replace(",", ".");

      const priceValue = parseFloat(cleanPrice) || 0;
      total += priceValue;
    });
    return total.toFixed(2);
  };

  const handleOrder = (e) => {
    e.preventDefault();

    if (!name || !phone) {
      Swal.fire({
        title: t.alertTitle,
        text: t.alertText,
        icon: "warning",
        confirmButtonColor: "#ff4757"
      });
      return;
    }

    if (!paymentOption) {
      Swal.fire({
        title: t.alertPayTitle,
        text: t.alertPayText,
        icon: "warning",
        confirmButtonColor: "#ff4757"
      });
      return;
    }

    let orderList = "";
    cart.forEach((item, index) => {
      const displayPrice = item.precio || item.totalPrice || "0€";
      orderList += `\n*${index + 1}. ${item.object.toUpperCase()}* - ${displayPrice}\n`;
      if (item.removed && item.removed.length > 0) {
        orderList += `    ❌ ${t.sin}: ${item.removed.join(", ").toUpperCase()}\n`;
      }
    });

    const totalCalculated = getTotalPrice();
    const message = `*NUEVO PEDIDO - LA CASA DE BURGER*\n\n` +
                    `👤 *${isEn ? 'Customer' : 'Cliente'}:* ${name}\n` +
                    `📞 *Tel:* ${phone}\n` +
                    `📍 *${isEn ? 'Delivery' : 'Entrega'}:* ${address || (isEn ? "Pickup at local" : "Recogida en local")}\n\n` +
                    `📝 *${isEn ? 'ORDER DETAILS' : 'DETALLE DEL PEDIDO'}:*\n${orderList}\n` +
                    `💰 *TOTAL:* ${totalCalculated}€\n` +
                    `💳 *${isEn ? 'PAYMENT' : 'PAGO'}:* ${paymentOption.toUpperCase()}`;

    const whatsappLink = `https://wa.me/34602597210?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");

    // Reset formulaire
    setName(""); setPhone(""); setAddress(""); setPaymentOption("");
  };

  return (
    <div className="container-items" id="order" style={{ padding: '20px 10px' }}>
      <div className="item menuBurgers" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#1a1a1a',
        borderRadius: '20px',
        padding: '20px 0'
      }}>

        <ul style={{ padding: 0, width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          {cart.length === 0 ? (
            <p style={{color: '#888', fontStyle: 'italic', textAlign: 'center'}}>({t.empty})</p>
          ) : (
            cart.map((item, index) => (
              <li key={index} style={{
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
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span translate="no" style={{ flex: 1, paddingRight: '10px' }}>{item.object}</span>
                  <button className="btn-cart" onClick={() => removeFromCart(index)} style={{ minWidth: '30px', cursor: 'pointer' }}>✕</button>
                </div>

                {item.removed && item.removed.length > 0 && (
                  <span style={{ fontSize: "13px", color: "#ffffff", backgroundColor: "#ff4757", padding: "4px 10px", borderRadius: "50px", width: "fit-content", marginTop: '5px' }}>
                    ❌ {t.sin}: {item.removed.join(", ")}
                  </span>
                )}

                <span translate="no" style={{ fontSize: "16px", color: "#fff", opacity: 0.8 }}>{item.precio || item.totalPrice}</span>
              </li>
            ))
          )}
        </ul>

        {cart.length > 0 && (
          <div className="info-product" style={{ width: '100%', maxWidth: '500px', padding: '0 20px', boxSizing: 'border-box' }}>

            <p translate="no" style={{color:"#ff4757", fontWeight: '900', fontSize: '2.2rem', margin: '25px 0', textAlign: 'center', textTransform: 'uppercase'}}>
              Total: {getTotalPrice()}€
            </p>

            <input type="text" placeholder={t.placeholderName} className="placeholder" style={{ width: '100%', border: '1px solid #ff4757', marginBottom: '10px', padding: '12px' }} value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder={t.placeholderPhone} className="placeholder" style={{ width: '100%', border: '1px solid #ff4757', marginBottom: '10px', padding: '12px' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea placeholder={t.placeholderAddress} className="placeholder" style={{ width: '100%', minHeight: '80px', border: '1px solid #ff4757', padding: '12px' }} value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

            <div style={{ marginTop: '20px', width: '100%' }}>
              <p style={{ color: 'white', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>{t.payTitle}</p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  type="button"
                  onClick={() => setPaymentOption("Efectivo")}
                  style={{ flex: 1, padding: '15px 5px', borderRadius: '12px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Efectivo" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: '0.3s' }}
                >{t.cash}</button>
                <button
                  type="button"
                  onClick={() => setPaymentOption("Tarjeta")}
                  style={{ flex: 1, padding: '15px 5px', borderRadius: '12px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Tarjeta" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: '0.3s' }}
                >{t.card}</button>
              </div>
            </div>

            <button
  className="add-btn2"
  onClick={handleOrder}
  disabled={!paymentOption || cart.length === 0}
  style={{
    marginTop: '35px',
    padding: '18px 10px', // Padding vertical de 18px, latéral réduit pour mobile
    width: '100%',
    backgroundColor: (paymentOption && cart.length > 0) ? '#25D366' : '#444',
    color: 'white',
    fontSize: 'clamp(14px, 4vw, 18px)', // Taille de police fluide : s'adapte à l'écran
    fontWeight: '900',
    borderRadius: '50px',
    border: 'none',
    cursor: (paymentOption && cart.length > 0) ? 'pointer' : 'not-allowed',
    boxShadow: (paymentOption && cart.length > 0) ? '0 6px 20px rgba(37, 211, 102, 0.4)' : 'none',

    // --- CENTRAGE PARFAIT ---
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    // --- SÉCURITÉ TEXTE ---
    whiteSpace: 'normal', // Permet au texte de passer sur deux lignes si nécessaire sur petit mobile
    wordBreak: 'break-word',
    lineHeight: '1.2',
    boxSizing: 'border-box'
  }}
>
  {paymentOption ? t.btnSend : t.btnSelectPay}
</button>
          </div>
        )}
      </div>
    </div>
  );
}
