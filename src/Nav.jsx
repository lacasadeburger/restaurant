import React from "react";

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang, setLang }) {
  // --- 1. LOGIQUE DE TEMPS ---
  const now = new Date();
  const day = now.getDay();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  const isSunday = (day === 0);
  const isWorkingHours = currentHour >= 13 && currentHour < 22.5;
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
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '80px',
        backgroundColor: 'rgba(0, 0, 0, 0.98)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 12px', zIndex: 10000, borderBottom: `3px solid ${VIBRANT_RED}`, boxSizing: 'border-box'
      }}>

        <div style={{ width: '35%', display: 'flex', alignItems: 'center' }}>
          <a href="tel:+34602597210" aria-label="Llamar" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <div style={{
              background: GOLD_GRADIENT, width: '35px', height: '35px', borderRadius: '8px',
              display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
            }}>
              <span style={{ fontSize: '1.1rem' }}>📞</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="nav-phone-number" style={{ color: GOLD_BRIGHT, fontSize: '0.85rem', fontWeight: '900', whiteSpace: 'nowrap' }}>
                602 597 210
              </span>
              <span style={{ color: '#FFFFFF', fontSize: '0.7rem', fontWeight: '900', animation: 'pulse-text 2s infinite', letterSpacing: '0.5px' }}>
                {(lang === 'es' || lang === 'ar') ? 'LLÁMANOS' : lang === 'fr' ? 'APPELER' : 'CALL US'}
              </span>
            </div>
          </a>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '8px', height: '8px', backgroundColor: statusColor, borderRadius: '50%',
            boxShadow: isOpen ? `0 0 10px ${statusColor}` : 'none',
            animation: isOpen ? 'blink-neon 1.5s infinite alternate' : 'none',
            marginBottom: '2px'
          }} />
          <span style={{ color: statusColor, fontSize: '1.1rem', fontWeight: '1000', lineHeight: 1 }}>
            {isOpen
              ? (lang === 'es' ? "ABIERTO" : lang === 'fr' ? "OUVERT" : "OPEN")
              : (lang === 'es' ? "CERRADO" : lang === 'fr' ? "FERMÉ" : "CLOSED")
            }
          </span>
        </div>

        <div onClick={scrollToOrder} style={{ width: '35%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
          <div className={cartLength > 0 ? 'pulse-active' : ''} style={{
            backgroundColor: '#e60023', padding: '8px 12px', borderRadius: '10px',
            border: `2px solid ${GOLD_BRIGHT}`, display: 'flex', alignItems: 'center',
            boxShadow: '0 4px 12px rgba(255, 71, 87, 0.4)'
          }}>
            <span style={{ color: '#fff', fontWeight: '950', fontSize: '1.1rem' }}>{totalPrice}€</span>
          </div>
        </div>
      </nav>

      {/* SÉLECTEUR DE LANGUES */}
      <div style={{
        marginTop: '80px',
        display: 'flex', justifyContent: 'center', gap: '6px', padding: '12px 8px',
        flexWrap: 'wrap', backgroundColor: 'rgba(15, 15, 15, 0.95)',
        position: 'relative', zIndex: 9999, borderBottom: '1px solid #333',
        minHeight: '44px',
        boxSizing: 'border-box'
      }}>
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            aria-label={l.label}
            style={{
              backgroundColor: lang === l.code ? 'rgba(255,255,255,0.1)' : 'transparent',
              background: 'none',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: lang === l.code ? GOLD_BRIGHT : '#444',
              borderRadius: '6px',
              cursor: 'pointer',
              padding: '3px',
              transition: '0.2s ease-in-out',
              transform: lang === l.code ? 'scale(1.15)' : 'scale(1)',
              filter: lang === l.code ? 'grayscale(0%)' : 'grayscale(50%)',
              width: '34px',
              height: '28px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxSizing: 'border-box'
            }}
          >
            <img
              src={`https://flagcdn.com/w80/${l.flag}.png`}
              width="26"
              alt={l.label}
              decoding="async"
              loading="eager"
              style={{
                borderRadius: '2px',
                display: 'block',
                pointerEvents: 'none',
                width: '26px',
                height: '18px',
                objectFit: 'cover'
              }}
            />
          </button>
        ))}
      </div>

      {/* BARRE DE PROMO */}
      <div style={{
        background: 'linear-gradient(to right, #000, #1a1a1a, #000)',
        color: '#fff', textAlign: 'center', padding: '10px 8px',
        borderBottom: `2px solid ${GOLD_BRIGHT}`,
        fontSize: '0.82rem', fontWeight: '900',
        display: 'block', width: '100%', boxSizing: 'border-box',
        letterSpacing: '0.3px', position: 'relative', zIndex: 9998
      }}>
        <span style={{ color: GOLD_BRIGHT }}>★</span>
        {` ${promoTexts[lang] || promoTexts.en} `}
        <span style={{ color: GOLD_BRIGHT }}>★</span>
      </div>
    </>
  );
}
