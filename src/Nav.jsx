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
    <header style={{ width: '100%', overflow: 'hidden' }}>
      {/* --- 1. NAV BAR (FIXE 80PX) --- */}
      <nav style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '80px',
        backgroundColor: '#000000',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 10px', zIndex: 10000,
        borderBottom: `3px solid ${VIBRANT_RED}`,
        boxSizing: 'border-box' // CRITIQUE : Empêche le débordement
      }}>
        {/* BLOC GAUCHE */}
        <div style={{ width: '33%', display: 'flex', alignItems: 'center' }}>
          <a href="tel:+34602597210" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <div style={{
              background: GOLD_GRADIENT, width: '32px', height: '32px', borderRadius: '8px',
              display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0
            }}>
              <span style={{ fontSize: '1rem' }}>📞</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span style={{ color: GOLD_BRIGHT, fontSize: '0.8rem', fontWeight: '900', lineHeight: '1' }}>602 597 210</span>
              <span style={{ color: '#FFFFFF', fontSize: '0.6rem', fontWeight: '900' }}>CALL</span>
            </div>
          </a>
        </div>

        {/* BLOC CENTRAL */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
          <div style={{ width: '6px', height: '6px', backgroundColor: statusColor, borderRadius: '50%', marginBottom: '2px' }} />
          <span style={{ color: statusColor, fontSize: '0.9rem', fontWeight: '900' }}>
            {isOpen ? "OPEN" : "CLOSED"}
          </span>
        </div>

        {/* BLOC DROITE */}
        <div onClick={scrollToOrder} style={{ width: '33%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
          <div style={{
            backgroundColor: '#e60023', padding: '6px 10px', borderRadius: '8px',
            border: `2px solid ${GOLD_BRIGHT}`, whiteSpace: 'nowrap'
          }}>
            <span style={{ color: '#fff', fontWeight: '950', fontSize: '1rem' }}>{totalPrice}€</span>
          </div>
        </div>
      </nav>

      {/* --- 2. BLOC DRAPEAUX (FIXE 68PX) --- */}
      <div style={{
        marginTop: '80px', height: '68px',
        display: 'flex', alignItems: 'center', gap: '10px',
        backgroundColor: '#000', position: 'relative', zIndex: 9999,
        borderBottom: '1px solid #222',
        boxSizing: 'border-box', padding: '0 10px',
        width: '100%', overflowX: 'auto', overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}>
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            style={{
              backgroundColor: 'transparent',
              border: lang === l.code ? `2px solid ${GOLD_BRIGHT}` : '1px solid #444',
              borderRadius: '6px', padding: '2px',
              opacity: lang === l.code ? 1 : 0.5,
              width: '40px', height: '28px', flexShrink: 0,
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}
          >
            <img src={`/flags/${l.flag}.webp`} width="30" height="20" alt={l.label} loading="eager" style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>

      {/* --- 3. BLOC PROMO --- */}
      <div style={{
        height: '36px', background: '#000', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `2px solid ${GOLD_BRIGHT}`,
        fontSize: '0.75rem', fontWeight: '900',
        width: '100%', boxSizing: 'border-box', overflow: 'hidden'
      }}>
        <span style={{ whiteSpace: 'nowrap' }}>★ {promoTexts[lang] || promoTexts.en} ★</span>
      </div>
    </header>
  );
}
