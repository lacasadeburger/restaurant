import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Order({ cart, removeFromCart, lang }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  // --- SYSTÈME DE TRADUCTION COMPLET (12 LANGUES) ---
  const translations = {
    empty: { es: "Tu carrito está vacío", en: "Your cart is empty", fr: "Votre panier est vide", de: "Ihr Warenkorb ist leer", ru: "Ваша корзина пуста", uk: "Ваш кошик порожній", pl: "Twój koszyk jest pusty", ro: "Coșul tău este gol", ar: "عربة التسوق فارغة", no: "Handlevognen er tom", sv: "Varukorgen är tom", nl: "Uw winkelwagen is leeg" },
    placeholderName: { es: "Tu Nombre", en: "Full Name", fr: "Votre Nom", de: "Ihr Name", ru: "Ваше имя", uk: "Ваше ім'я", pl: "Twoje imię", ro: "Numele tău", ar: "اسمك", no: "Ditt navn", sv: "Ditt namn", nl: "Uw Naam" },
    placeholderPhone: { es: "Tu Teléfono", en: "Phone Number", fr: "Téléphone", de: "Telefonnummer", ru: "Телефон", uk: "Телефон", pl: "Numer telefonu", ro: "Telefon", ar: "رقم هاتفك", no: "Telefonnummer", sv: "Telefonnummer", nl: "Telefoonnummer" },
    placeholderAddress: { es: "Dirección (Vacío para recoger)", en: "Address (Empty for pickup)", fr: "Adresse (Vide pour retrait)", de: "Adresse (Leer für Abholung)", ru: "Адрес (Пусто для самовывоза)", uk: "Адреса (Пусто для самовивозу)", pl: "Adres (Puste dla odbioru)", ro: "Adresă (Gol pt ridicare)", ar: "العنوان (فارغ للاستلام)", no: "Adresse (Tom for henting)", sv: "Adress (Tom for hämtning)", nl: "Adres (Leeg voor afhalen)" },
    payTitle: { es: "¿Cómo pagarás?", en: "How will you pay?", fr: "Comment payez-vous ?", de: "Wie zahlen Sie?", ru: "Как вы оплатите?", uk: "Як вы оплатите?", pl: "Jak zapłacisz?", ro: "Cum vei plăti?", ar: "كيف ستدفع؟", no: "Hvordan vil du betale?", sv: "Hur vil du betala?", nl: "Hoe gaat u betalen?" },
    cash: { es: "💵 Efectivo", en: "💵 Cash", fr: "💵 Espèces", de: "💵 Bargeld", ru: "💵 Наличные", uk: "💵 Готівка", pl: "💵 Gotówka", ro: "💵 Numerar", ar: "💵 نقداً", no: "💵 Kontanter", sv: "💵 Kontanter", nl: "💵 Contant" },
    card: { es: "💳 Tarjeta", en: "💳 Card", fr: "💳 Carte", de: "💳 Karte", ru: "💳 Карта", uk: "💳 Картка", pl: "💳 Karta", ro: "💳 Card", ar: "💳 بطاقة", no: "💳 Kort", sv: "💳 Kort", nl: "💳 Kaart" },
    btnSend: { es: "🚀 ENVIAR POR WHATSAPP", en: "🚀 SEND VIA WHATSAPP", fr: "🚀 ENVOYER PAR WHATSAPP", de: "🚀 PER WHATSAPP SENDEN", ru: "🚀 ОТПРАВИТЬ В WHATSAPP", uk: "🚀 ВІДПРАВИТИ В WHATSAPP", pl: "🚀 WYŚLIJ PRZEZ WHATSAPP", ro: "🚀 TRIMITE PE WHATSAPP", ar: "🚀 إرسال عبر واتساب", no: "🚀 SEND VIA WHATSAPP", sv: "🚀 SKICKA VIA WHATSAPP", nl: "🚀 VERSTUREN VIA WHATSAPP" },
    btnSelectPay: { es: "ELIJA MÉTODO DE PAGO", en: "CHOOSE PAYMENT METHOD", fr: "CHOISIR LE PAIEMENT", de: "ZAHLUNGSART WÄHLEN", ru: "ВЫБЕРИТЕ ОПЛАТУ", uk: "ВИБЕРІТЬ ОПЛАТУ", pl: "WYBIERZ PŁATNOŚĆ", ro: "ALEGE PLATA", ar: "اختر طريقة الدفع", no: "VELG BETALINGSMETODE", sv: "VÄLJ BETALNINGSMETOD", nl: "KIES BETAALMETHODE" },
    sin: { es: "SIN", en: "WITHOUT", fr: "SANS", de: "OHNE", ru: "БЕЗ", uk: "БЕЗ", pl: "BEZ", ro: "FĂRĂ", ar: "بدون", no: "UTEN", sv: "UTAN", nl: "ZONDER" },
    extraLabel: { es: "EXTRAS", en: "EXTRAS", fr: "SUPPLÉMENTS", de: "EXTRAS", ru: "ДОБАВКИ", uk: "ДОДАТКИ", pl: "DODATKI", ro: "EXTRA", ar: "إضافات", no: "EKSTRA", sv: "EXTRA", nl: "EXTRA'S" },
    pickup: { es: "Recogida en local", en: "Local pickup", fr: "Retrait sur place", de: "Abholung", ru: "Самовывоз", uk: "Самовивіз", pl: "Odbiór osobisty", ro: "Ridicare personală", ar: "استلام محلي", no: "Henting i butikk", sv: "Hämtning i butik", nl: "Afhalen in de zaak" },
    whatsappHeader: { es: "NUEVO PEDIDO", en: "NEW ORDER", fr: "NOUVELLE COMMANDE", de: "NEUE BESTELLUNG", ru: "НОВЫЙ ЗАКАЗ", uk: "НОВЕ ЗАМОВЛЕННЯ", pl: "NOWE ZAMÓWIENIE", ro: "COMANDĂ NOUĂ", ar: "طلب جديد", no: "NY BESTILLING", sv: "NY BESTÄLLNING", nl: "NIEUWE BESTELLING" },
    ingredients: {
      Tomate: { es: "Tomate", en: "Tomato", fr: "Tomate", de: "Tomate", ru: "Помидор", uk: "Помідор", pl: "Pomidor", ro: "Roșie", ar: "طماطم", no: "Tomat", sv: "Tomat", nl: "Tomaat" },
      Lechuga: { es: "Lechuga", en: "Lettuce", fr: "Laitue", de: "Salat", ru: "Салат", uk: "Салат", pl: "Sałata", ro: "Salată", ar: "خس", no: "Salat", sv: "Sallad", nl: "Sla" },
      Pepinillos: { es: "Pepinillos", en: "Pickles", fr: "Cornichons", de: "Gurken", ru: "Огурцы", uk: "Огірки", pl: "Ogórki", ro: "Castraveți", ar: "مخلل", no: "Sylteagurk", sv: "Gurka", nl: "Augurken" },
      Cebolla: { es: "Cebolla", en: "Onion", fr: "Oignon", de: "Zwiebel", ru: "Лук", uk: "Цибуля", pl: "Cebula", ro: "Ceapă", ar: "بصل", no: "Løk", sv: "Lök", nl: "Ui" },
      Queso: { es: "Queso", en: "Cheese", fr: "Fromage", de: "Käse", ru: "Сыр", uk: "Сир", pl: "Ser", ro: "Brânză", ar: "جبنة", no: "Ost", sv: "Ost", nl: "Kaas" }
    }
  };

  const t = (key) => {
    if (!translations[key]) return "";
    return translations[key][lang] || translations[key]['es'];
  };

  // Helper pour traduire un ingrédient
  const translateIng = (id) => {
    return translations.ingredients[id]?.[lang] || translations.ingredients[id]?.['es'] || id;
  };

  const getTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      const rawPrice = item.precio || item.totalPrice || "0";
      const cleanPrice = rawPrice.toString().replace(/[^0-9.,]/g, "").replace(",", ".");
      total += parseFloat(cleanPrice) || 0;
    });
    return total.toFixed(2);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      Swal.fire({ title: 'Attention', text: 'Nom et téléphone obligatoires', icon: "warning", confirmButtonColor: "#ff4757" });
      return;
    }
    if (!paymentOption) {
      Swal.fire({ title: 'Paiement', text: 'Sélectionnez un mode de paiement', icon: "warning", confirmButtonColor: "#ff4757" });
      return;
    }

    let orderList = "";
    cart.forEach((item, index) => {
      const displayPrice = item.precio || item.totalPrice || "0€";
      // --- FORCE ESPAGNOL POUR LE MESSAGE WHATSAPP ---
      const itemName = (item.name?.es || item.object?.es || item.object || "PRODUCTO").toUpperCase();

      orderList += `\n*${index + 1}. ${itemName}* - ${displayPrice}\n`;

      // Ingrédients retirés (Forcé en espagnol)
      if (item.removed && item.removed.length > 0) {
        const removedInSpanish = item.removed.map(id => (translations.ingredients[id]?.es || id).toUpperCase());
        orderList += `    ❌ SIN: ${removedInSpanish.join(", ")}\n`;
      }

      // Extras (Forcé en espagnol)
      if (item.extras && item.extras.length > 0) {
        orderList += `    ➕ EXTRAS: ${item.extras.join(", ").toUpperCase()}\n`;
      }
    });

    // En-têtes forcés en Espagnol pour la cuisine
    const message = `*NUEVO PEDIDO - LA CASA DE BURGER*\n\n` +
                    `👤 *Cliente:* ${name}\n` +
                    `📞 *Tel:* ${phone}\n` +
                    `📍 *Entrega:* ${address || "Recogida en local"}\n\n` +
                    `📝 *DETALLE:*\n${orderList}\n` +
                    `💰 *TOTAL:* ${getTotalPrice()}€\n` +
                    `💳 *PAGO:* ${paymentOption.toUpperCase()}`;

    window.open(`https://wa.me/34602597210?text=${encodeURIComponent(message)}`, "_blank");
    setName(""); setPhone(""); setAddress(""); setPaymentOption("");
  };

  return (
    <div className="container-items" id="order" style={{ padding: '20px 10px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="item menuBurgers" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '0 auto', backgroundColor: '#1a1a1a', borderRadius: '20px', padding: '20px 0' }}>

        <ul style={{ padding: 0, width: '100%', maxWidth: '600px', margin: '0 auto', listStyle: 'none' }}>
          {cart.length === 0 ? (
            <li style={{ color: '#888', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>({t('empty')})</li>
          ) : (
            cart.map((item, index) => (
              <li key={index} style={{ fontSize: "18px", color: "#ff4757", padding: "15px 15px", borderBottom: "1px solid #333", display: "flex", flexDirection: "column", gap: "5px", width: '100%', boxSizing: 'border-box', fontWeight: "bold" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ flex: 1, paddingRight: '10px' }}>{item.name?.[lang] || item.name?.['es'] || item.object}</span>
                  <button className="btn-cart" onClick={() => removeFromCart(index)} style={{ minWidth: '30px', cursor: 'pointer', background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem' }}>✕</button>
                </div>

                {/* AFFICHAGE DES INGRÉDIENTS RETIRÉS TRADUITS POUR LE CLIENT */}
                {item.removed && item.removed.length > 0 && (
                  <span style={{ fontSize: "13px", color: "#ffffff", backgroundColor: "#ff4757", padding: "4px 10px", borderRadius: "50px", width: "fit-content", marginTop: '5px' }}>
                    ❌ {t('sin')}: {item.removed.map(id => translateIng(id)).join(", ")}
                  </span>
                )}

                {/* AFFICHAGE DES EXTRAS TRADUITS POUR LE CLIENT */}
                {item.extras && item.extras.length > 0 && (
                  <span style={{ fontSize: "13px", color: "#000", backgroundColor: "#FFD700", padding: "4px 10px", borderRadius: "50px", width: "fit-content", marginTop: '5px' }}>
                    ➕ {t('extraLabel')}: {item.extras.join(", ")}
                  </span>
                )}

                <span style={{ fontSize: "16px", color: "#fff", opacity: 0.8 }}>{item.precio || item.totalPrice}</span>
              </li>
            ))
          )}
        </ul>

        {cart.length > 0 && (
          <div className="info-product" style={{ width: '100%', maxWidth: '500px', padding: '0 20px', boxSizing: 'border-box' }}>
            <p style={{ color:"#ff4757", fontWeight: '900', fontSize: '2.2rem', margin: '25px 0', textAlign: 'center', textTransform: 'uppercase' }}>
              Total: {getTotalPrice()}€
            </p>

            <input type="text" placeholder={t('placeholderName')} className="placeholder" style={{ width: '100%', border: '1px solid #ff4757', marginBottom: '10px', padding: '12px', background: '#222', color: '#fff', borderRadius: '8px' }} value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder={t('placeholderPhone')} className="placeholder" style={{ width: '100%', border: '1px solid #ff4757', marginBottom: '10px', padding: '12px', background: '#222', color: '#fff', borderRadius: '8px' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea placeholder={t('placeholderAddress')} className="placeholder" style={{ width: '100%', minHeight: '80px', border: '1px solid #ff4757', padding: '12px', background: '#222', color: '#fff', borderRadius: '8px', resize: 'none' }} value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

            <div style={{ marginTop: '20px', width: '100%' }}>
              <p style={{ color: 'white', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>{t('payTitle')}</p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button type="button" onClick={() => setPaymentOption("Efectivo")} style={{ flex: 1, padding: '15px 5px', borderRadius: '12px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Efectivo" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>{t('cash')}</button>
                <button type="button" onClick={() => setPaymentOption("Tarjeta")} style={{ flex: 1, padding: '15px 5px', borderRadius: '12px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Tarjeta" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>{t('card')}</button>
              </div>
            </div>

            <button className="add-btn2" onClick={handleOrder} disabled={!paymentOption || cart.length === 0} style={{ marginTop: '35px', padding: '18px 10px', width: '100%', backgroundColor: (paymentOption && cart.length > 0) ? '#25D366' : '#444', color: 'white', fontSize: '18px', fontWeight: '900', borderRadius: '50px', border: 'none', cursor: (paymentOption && cart.length > 0) ? 'pointer' : 'not-allowed', boxShadow: (paymentOption && cart.length > 0) ? '0 6px 20px rgba(37, 211, 102, 0.4)' : 'none', transition: '0.3s' }}>
              {paymentOption ? t('btnSend') : t('btnSelectPay')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
