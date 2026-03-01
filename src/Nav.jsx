import React from "react";

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang, setLang }) {
  // --- 1. LOGIQUE DE TEMPS ---
  const now = new Date();
  const day = now.getDay();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const isSunday = (day === 0);
  const isWorkingHours = currentHour >= 13 && currentHour < 23;
  const isOpen = isWorkingHours && !isSunday;
  const statusColor = isOpen ? '#2ed573' : '#ff4757';

  // --- 2. DICTIONNAIRE ---
  const promoTexts = {
    es: "AHORRE HASTA UN 20% A VISITARNOS",
    fr: "ÉCONOMISEZ JUSQU'À 20% EN NOUS VISITANT",
    en: "SAVE UP TO 20% BY VISITING US",
    de: "SPAREN SIE BIS ZU 20% BEI IHREM BESUCH",
    nl: "BESPAAR TOT 20% BIJ UW BEZOEK",
    no: "SPAR OPPTIL 20% VED Å BESØKE OSS",
    sv: "SPARA UPP TILL 20% VID DITT BESÖK",
    pl: "ZAOSZCZĘDŹ DO 20% ODWIEDZAJĄC NAS",
    uk: "ЗЕКОНОМТЕ ДО 20% ПРИ ВІЗИТІ ДО НАС",
    ru: "СЭКОНОМЬТЕ ДО 20% ПРИ ПОСЕЩЕНИИ",
    ro: "ECONOMISIȚI PÂNĂ LA 20% VIZITÂNDU-NE",
    ar: "وفر حتى 20% عند زيارتنا"
  };

  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";
  const VIBRANT_RED = "#ff4757";

  const languages = [
    { code: 'es', flag: 'es', label: 'Español' },
    { code: 'en', flag: 'gb', label: 'English' },
    { code: 'fr', flag: 'fr', label: 'Français' },
    { code: 'de', flag: 'de', label: 'Deutsch' },
    { code: 'nl', flag: 'nl', label: 'Nederlands' },
    { code: 'no', flag: 'no', label: 'Norsk' },
    { code: 'sv', flag: 'se', label: 'Svenska' },
    { code: 'pl', flag: 'pl', label: 'Polski' },
    { code: 'uk', flag: 'ua', label: 'Українська' },
    { code: 'ru', flag: 'ru', label: 'Русский' },
    { code: 'ro', flag: 'ro', label: 'Română' },
    { code: 'ar', flag: 'ma', label: 'العربية' }
  ];

  return (
    <>
      {/* --- 1. NAV BAR (FIXE 80PX) --- */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '80px',
        backgroundColor: '#000000', // Noir pur pour perfs LCP
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 12px', zIndex: 10000,
        borderBottom: `3px solid ${VIBRANT_RED}`,
        boxSizing: 'border-box'
      }}>
        <div style={{ width: '35%', display: 'flex', alignItems: 'center' }}>
          <a href="tel:+34602597210" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <div style={{
              background: GOLD_GRADIENT, width: '35px', height: '35px', borderRadius: '8px',
              display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0
            }}>
              <span style={{ fontSize: '1.1rem' }}>📞</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: GOLD_BRIGHT, fontSize: '0.85rem', fontWeight: '900' }}>602 597 210</span>
              <span style={{ color: '#FFFFFF', fontSize: '0.7rem', fontWeight: '900' }}>
                {(lang === 'es' || lang === 'ar') ? 'LLÁMANOS' : lang === 'fr' ? 'APPELER' : 'CALL US'}
              </span>
            </div>
          </a>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: statusColor, borderRadius: '50%', marginBottom: '2px' }} />
          <span style={{ color: statusColor, fontSize: '1.1rem', fontWeight: '1000' }}>
            {isOpen ? (lang === 'es' ? "ABIERTO" : lang === 'fr' ? "OUVERT" : "OPEN") : (lang === 'es' ? "CERRADO" : lang === 'fr' ? "FERMÉ" : "CLOSED")}
          </span>
        </div>

        <div onClick={scrollToOrder} style={{ width: '35%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
          <div style={{ backgroundColor: '#e60023', padding: '8px 12px', borderRadius: '10px', border: `2px solid ${GOLD_BRIGHT}` }}>
            <span style={{ color: '#fff', fontWeight: '950', fontSize: '1.1rem' }}>{totalPrice}€</span>
          </div>
        </div>
      </nav>

      {/* --- 2. BLOC DRAPEAUX (FIXE 68PX) --- */}
      <div style={{
        marginTop: '80px',
        height: '68px', // HAUTEUR FIXE POUR CLS
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px',
        backgroundColor: '#000',
        position: 'relative', zIndex: 9999, borderBottom: '1px solid #333',
        boxSizing: 'border-box',
        overflowX: 'auto', // Scroll horizontal si trop de drapeaux sur petit écran au lieu de wrapper
        overflowY: 'hidden'
      }}>
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${GOLD_BRIGHT}`,
              borderRadius: '6px',
              padding: '3px',
              opacity: lang === l.code ? 1 : 0.4,
              width: '34px', height: '28px',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              flexShrink: 0
            }}
          >
            <img src={`/flags/${l.flag}.webp`} width="26" height="18" alt={l.label} loading="eager" />
          </button>
        ))}
      </div>

      {/* --- 3. BLOC PROMO (FIXE 36PX) --- */}
      <div style={{
        height: '36px', // HAUTEUR FIXE POUR CLS
        background: '#000',
        color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `2px solid ${GOLD_BRIGHT}`,
        fontSize: '0.82rem',
        fontWeight: '900',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative', zIndex: 9998
      }}>
        <span style={{ color: GOLD_BRIGHT, marginRight: '5px' }}>★</span>
        {promoTexts[lang] || promoTexts.en}
        <span style={{ color: GOLD_BRIGHT, marginLeft: '5px' }}>★</span>
      </div>
    </>
  );
}
