import React, { useState } from "react";
import "./style.css";
import Swal from "sweetalert2";

export default function Order({ cart, removeFromCart, lang }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  // --- SYSTÈME DE TRADUCTION SÉCURISÉ (11 LANGUES) ---
  const translations = {
    empty: { es: "Tu carrito está vacío", en: "Your cart is empty", fr: "Votre panier est vide", de: "Ihr Warenkorb ist leer", it: "Il tuo carrello è vuoto", pt: "Seu carrinho está vazio", ru: "Ваша корзина пуста", uk: "Ваш кошик порожній", pl: "Twój koszyk jest pusty", ro: "Coșul tău este gol", ar: "عربة التسوق فارغة", no: "Handlevognen er tom", sv: "Varukorgen är tom" },
    placeholderName: { es: "Tu Nombre", en: "Full Name", fr: "Votre Nom", de: "Ihr Name", it: "Il tuo nome", pt: "Seu Nome", ru: "Ваше имя", uk: "Ваше ім'я", pl: "Twoje imię", ro: "Numele tău", ar: "اسمك", no: "Ditt navn", sv: "Ditt namn" },
    placeholderPhone: { es: "Tu Teléfono", en: "Phone Number", fr: "Téléphone", de: "Telefonnummer", it: "Telefono", pt: "Seu Telefone", ru: "Телефон", uk: "Телефон", pl: "Numer telefonu", ro: "Telefon", ar: "رقم هاتفك", no: "Telefonnummer", sv: "Telefonnummer" },
    placeholderAddress: { es: "Dirección (Vacío para recoger)", en: "Address (Empty for pickup)", fr: "Adresse (Vide pour retrait)", de: "Adresse (Leer für Abholung)", it: "Indirizzo (Vuoto per ritiro)", pt: "Endereço (Vazio para retirar)", ru: "Адрес (Пусто для самовывоза)", uk: "Адреса (Пусто для самовивозу)", pl: "Adres (Puste dla odbioru)", ro: "Adresă (Gol pt ridicare)", ar: "العنوان (فارغ للاستلام)", no: "Adresse (Tom for henting)", sv: "Adress (Tom för hämtning)" },
    payTitle: { es: "¿Cómo pagarás?", en: "How will you pay?", fr: "Comment payez-vous ?", de: "Wie zahlen Sie?", it: "Come pagherai?", pt: "Como vai pagar?", ru: "Как вы оплатите?", uk: "Як ви оплатите?", pl: "Jak zapłacisz?", ro: "Cum vei plăti?", ar: "كيف ستدفع؟", no: "Hvordan vil du betale?", sv: "Hur vill du betala?" },
    cash: { es: "💵 Efectivo", en: "💵 Cash", fr: "💵 Espèces", de: "💵 Bargeld", it: "💵 Contanti", pt: "💵 Dinheiro", ru: "💵 Наличные", uk: "💵 Готівка", pl: "💵 Gotówka", ro: "💵 Numerar", ar: "💵 نقداً", no: "💵 Kontanter", sv: "💵 Kontanter" },
    card: { es: "💳 Tarjeta", en: "💳 Card", fr: "💳 Carte", de: "💳 Karte", it: "💳 Carta", pt: "💳 Cartão", ru: "💳 Карта", uk: "💳 Картка", pl: "💳 Karta", ro: "💳 Card", ar: "💳 بطاقة", no: "💳 Kort", sv: "💳 Kort" },
    btnSend: { es: "🚀 ENVIAR POR WHATSAPP", en: "🚀 SEND VIA WHATSAPP", fr: "🚀 ENVOYER PAR WHATSAPP", de: "🚀 PER WHATSAPP SENDEN", it: "🚀 INVIA VIA WHATSAPP", pt: "🚀 ENVIAR VIA WHATSAPP", ru: "🚀 ОТПРАВИТЬ В WHATSAPP", uk: "🚀 ВІДПРАВИТИ В WHATSAPP", pl: "🚀 WYŚLIJ PRZEZ WHATSAPP", ro: "🚀 TRIMITE PE WHATSAPP", ar: "🚀 إرسال عبر واتساب", no: "🚀 SEND VIA WHATSAPP", sv: "🚀 SKICKA VIA WHATSAPP" },
    btnSelectPay: { es: "ELIJA MÉTODO DE PAGO", en: "CHOOSE PAYMENT METHOD", fr: "CHOISIR LE PAIEMENT", de: "ZAHLUNGSART WÄHLEN", it: "SCEGLI PAGAMENTO", pt: "ESCOLHA O PAGAMENTO", ru: "ВЫБЕРИТЕ ОПЛАТУ", uk: "ВИБЕРІТЬ ОПЛАТУ", pl: "WYBIERZ PŁATNOŚĆ", ro: "ALEGE PLATA", ar: "اختر طريقة الدفع", no: "VELG BETALINGSMETODE", sv: "VÄLJ BETALNINGSMETOD" },
    sin: { es: "SIN", en: "WITHOUT", fr: "SANS", de: "OHNE", it: "SENZA", pt: "SEM", ru: "БЕЗ", uk: "БЕЗ", pl: "BEZ", ro: "FĂRĂ", ar: "بدون", no: "UTEN", sv: "UTAN" },
    alertTitle: { es: "Falta información", en: "Missing information", fr: "Infos manquantes", de: "Infos fehlen", it: "Info mancanti", pt: "Informação faltando", ru: "Не все заполнено", uk: "Не все заповнено", pl: "Brak informacji", ro: "Lipsesc informații", ar: "معلومات ناقصة", no: "Mangler informasjon", sv: "Information saknas" },
    alertText: { es: "Nombre y teléfono requeridos.", en: "Name and phone required.", fr: "Nom et téléphone requis.", de: "Name und Tel. benötigt.", it: "Nome e telefono richiesti.", pt: "Nome e telefone exigidos.", ru: "Имя и телефон обязательны.", uk: "Ім'я та телефон обов'язкові.", pl: "Imię i telefon są wymagane.", ro: "Numele și tel. sunt obligatorii.", ar: "الاسم والهاتف مطلوبان.", no: "Navn og telefon er påkrevd.", sv: "Namn och telefon krävs." },
    alertPayTitle: { es: "Método de pago", en: "Payment Method", fr: "Mode de paiement", de: "Zahlungsart", it: "Metodo di pagamento", pt: "Método de pagamento", ru: "Способ оплаты", uk: "Спосіб оплати", pl: "Metoda płatności", ro: "Metoda de plată", ar: "طريقة الدفع", no: "Betalingsmetode", sv: "Betalningsmetod" },
    alertPayText: { es: "Seleccione un método.", en: "Select a method.", fr: "Choisissez un mode.", de: "Wählen Sie eine Methode.", it: "Seleziona un metodo.", pt: "Selecione um método.", ru: "Выберите способ.", uk: "Виберіть спосіб.", pl: "Wybierz metodę.", ro: "Selectați o metodă.", ar: "اختر طريقة.", no: "Velg en metode.", sv: "Välj en metod." },
    pickup: { es: "Recogida en local", en: "Local pickup", fr: "Retrait sur place", de: "Abholung", it: "Ritiro locale", pt: "Retirada no local", ru: "Самовывоз", uk: "Самовивіз", pl: "Odbiór osobisty", ro: "Ridicare personală", ar: "استلام محلي", no: "Henting i butikk", sv: "Hämtning i butik" },
    whatsappHeader: { es: "NUEVO PEDIDO", en: "NEW ORDER", fr: "NOUVELLE COMMANDE", de: "NEUE BESTELLUNG", it: "NUOVO ORDINE", pt: "NOVO PEDIDO", ru: "НОВЫЙ ЗАКАЗ", uk: "НОВЕ ЗАМОВЛЕННЯ", pl: "NOWE ZAMÓWIENIE", ro: "COMANDĂ NOUĂ", ar: "طلب جديد", no: "NY BESTILLING", sv: "NY BESTÄLLNING" }
  };

  // Accesseur sécurisé anti-crash
  const t = (key) => {
    if (!translations[key]) return "";
    return translations[key][lang] || translations[key]['es'] || translations[key]['en'];
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
      Swal.fire({ title: t('alertTitle'), text: t('alertText'), icon: "warning", confirmButtonColor: "#ff4757" });
      return;
    }
    if (!paymentOption) {
      Swal.fire({ title: t('alertPayTitle'), text: t('alertPayText'), icon: "warning", confirmButtonColor: "#ff4757" });
      return;
    }

    let orderList = "";
    cart.forEach((item, index) => {
      const displayPrice = item.precio || item.totalPrice || "0€";
      const itemName = (item.object || "Producto").toUpperCase();
      orderList += `\n*${index + 1}. ${itemName}* - ${displayPrice}\n`;
      if (item.removed && item.removed.length > 0) {
        orderList += `    ❌ ${t('sin')}: ${item.removed.join(", ").toUpperCase()}\n`;
      }
    });

    const message = `*${t('whatsappHeader')} - LA CASA DE BURGER*\n\n` +
                    `👤 *${lang === 'en' ? 'Customer' : 'Cliente'}:* ${name}\n` +
                    `📞 *Tel:* ${phone}\n` +
                    `📍 *${lang === 'en' ? 'Delivery' : 'Entrega'}:* ${address || t('pickup')}\n\n` +
                    `📝 *${lang === 'en' ? 'DETAILS' : 'DETALLE'}:*\n${orderList}\n` +
                    `💰 *TOTAL:* ${getTotalPrice()}€\n` +
                    `💳 *${lang === 'en' ? 'PAYMENT' : 'PAGO'}:* ${paymentOption.toUpperCase()}`;

    window.open(`https://wa.me/34602597210?text=${encodeURIComponent(message)}`, "_blank");
    setName(""); setPhone(""); setAddress(""); setPaymentOption("");
  };

  return (
    <div className="container-items" id="order" style={{ padding: '20px 10px' }}>
      <div className="item menuBurgers" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '0 auto', backgroundColor: '#1a1a1a', borderRadius: '20px', padding: '20px 0' }}>

      <ul style={{ padding: 0, width: '100%', maxWidth: '600px', margin: '0 auto', listStyle: 'none' }}>
{cart.length === 0 ? (
  <li style={{ color: '#888', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
    ({t('empty')})
  </li>
) : (
            cart.map((item, index) => (
              <li key={index} style={{ fontSize: "18px", color: "#ff4757", listStyle: "none", textAlign: "left", padding: "15px 15px", borderBottom: "1px solid #333", display: "flex", flexDirection: "column", gap: "5px", width: '100%', boxSizing: 'border-box', fontWeight: "bold" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span translate="no" style={{ flex: 1, paddingRight: '10px' }}>{item.object}</span>
                  <button className="btn-cart" onClick={() => removeFromCart(index)} style={{ minWidth: '30px', cursor: 'pointer' }}>✕</button>
                </div>
                {item.removed && item.removed.length > 0 && (
                  <span style={{ fontSize: "13px", color: "#ffffff", backgroundColor: "#ff4757", padding: "4px 10px", borderRadius: "50px", width: "fit-content", marginTop: '5px' }}>
                    ❌ {t('sin')}: {item.removed.join(", ")}
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

            <input type="text" placeholder={t('placeholderName')} className="placeholder" style={{ width: '100%', border: '1px solid #ff4757', marginBottom: '10px', padding: '12px' }} value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder={t('placeholderPhone')} className="placeholder" style={{ width: '100%', border: '1px solid #ff4757', marginBottom: '10px', padding: '12px' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea placeholder={t('placeholderAddress')} className="placeholder" style={{ width: '100%', minHeight: '80px', border: '1px solid #ff4757', padding: '12px' }} value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

            <div style={{ marginTop: '20px', width: '100%' }}>
              <p style={{ color: 'white', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>{t('payTitle')}</p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button type="button" onClick={() => setPaymentOption("Efectivo")} style={{ flex: 1, padding: '15px 5px', borderRadius: '12px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Efectivo" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: '0.3s' }}>{t('cash')}</button>
                <button type="button" onClick={() => setPaymentOption("Tarjeta")} style={{ flex: 1, padding: '15px 5px', borderRadius: '12px', border: '2px solid #ff4757', backgroundColor: paymentOption === "Tarjeta" ? "#ff4757" : "transparent", color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: '0.3s' }}>{t('card')}</button>
              </div>
            </div>

            <button className="add-btn2" onClick={handleOrder} disabled={!paymentOption || cart.length === 0} style={{ marginTop: '35px', padding: '18px 10px', width: '100%', backgroundColor: (paymentOption && cart.length > 0) ? '#25D366' : '#444', color: 'white', fontSize: 'clamp(14px, 4vw, 18px)', fontWeight: '900', borderRadius: '50px', border: 'none', cursor: (paymentOption && cart.length > 0) ? 'pointer' : 'not-allowed', boxShadow: (paymentOption && cart.length > 0) ? '0 6px 20px rgba(37, 211, 102, 0.4)' : 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.2', boxSizing: 'border-box' }}>
              {paymentOption ? t('btnSend') : t('btnSelectPay')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
