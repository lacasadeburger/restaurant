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
    <header style={{ width: '100%', overflow: 'visible' }}>
      {/* --- 1. NAV BAR (FIXE 80PX - LARGEUR TOTALE FORCÉE) --- */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        width: '100vw',
        height: '80px',
        backgroundColor: '#000000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 10000,
        borderBottom: `3px solid ${VIBRANT_RED}`,
        boxSizing: 'border-box'
      }}>
        {/* BLOC GAUCHE */}
        <div style={{ width: '33%', display: 'flex', alignItems: 'center' }}>
          <a href="tel:+34602597210" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              background: GOLD_GRADIENT, width: '36px', height: '36px', borderRadius: '8px',
              display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0
            }}>
              <span style={{ fontSize: '1.2rem' }}>📞</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: GOLD_BRIGHT, fontSize: '0.9rem', fontWeight: '900', lineHeight: '1' }}>602 597 210</span>
              <span style={{ color: '#FFFFFF', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px' }}>CALL NOW</span>
            </div>
          </a>
        </div>

        {/* BLOC CENTRAL */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: statusColor, borderRadius: '50%', marginBottom: '4px', boxShadow: `0 0 10px ${statusColor}` }} />
          <span style={{ color: statusColor, fontSize: '0.85rem', fontWeight: '900', letterSpacing: '1px' }}>
            {isOpen ? "OPEN" : "CLOSED"}
          </span>
        </div>

        {/* BLOC DROITE */}
        <div onClick={scrollToOrder} style={{ width: '33%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
          <div style={{
            backgroundColor: '#e60023', padding: '8px 15px', borderRadius: '10px',
            border: `2px solid ${GOLD_BRIGHT}`, whiteSpace: 'nowrap',
            boxShadow: '0 4px 15px rgba(230,0,0,0.3)'
          }}>
            <span style={{ color: '#fff', fontWeight: '950', fontSize: '1.1rem' }}>{totalPrice}€</span>
          </div>
        </div>
      </nav>

      {/* --- 2. BLOC DRAPEAUX (LARGEUR TOTALE FORCÉE) --- */}
      <div style={{
        marginTop: '80px',
        height: '68px',
        width: '100vw',
        left: '50%',
        marginLeft: '-50vw',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#000',
        zIndex: 9999,
        borderBottom: '1px solid #222',
        boxSizing: 'border-box',
        padding: '0 20px',
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}>
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            style={{
              backgroundColor: 'transparent',
              border: lang === l.code ? `2px solid ${GOLD_BRIGHT}` : '1px solid #333',
              borderRadius: '8px',
              padding: '3px',
              opacity: lang === l.code ? 1 : 0.4,
              width: '44px', height: '30px', flexShrink: 0,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <img src={`/flags/${l.flag}.webp`} width="32" height="22" alt={l.label} loading="eager" style={{ objectFit: 'cover', borderRadius: '2px' }} />
          </button>
        ))}
      </div>

      {/* --- 3. BLOC PROMO (LARGEUR TOTALE FORCÉE) --- */}
      <div style={{
        height: '40px',
        background: '#000',
        color: '#fff',
        width: '100vw',
        left: '50%',
        marginLeft: '-50vw',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: `2px solid ${GOLD_BRIGHT}`,
        fontSize: '0.8rem',
        fontWeight: '900',
        boxSizing: 'border-box',
        overflow: 'hidden',
        letterSpacing: '0.5px'
      }}>
        <span style={{ whiteSpace: 'nowrap', color: GOLD_BRIGHT }}>★</span>
        <span style={{ whiteSpace: 'nowrap', margin: '0 10px' }}>{promoTexts[lang] || promoTexts.en}</span>
        <span style={{ whiteSpace: 'nowrap', color: GOLD_BRIGHT }}>★</span>
      </div>
    </header>
  );
}
