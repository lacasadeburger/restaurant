import React from "react";

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang, setLang }) {
  // --- LOGIQUE D'OUVERTURE (Synchronisée avec le footer : 13h - 22h30) ---
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  // Correction ici pour correspondre à tes textes de footer
  const isOpen = currentHour >= 13 && currentHour < 22.5;
  const statusColor = isOpen ? '#2ed573' : '#ff4757';

  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";
  const VIBRANT_RED = "#ff4757";

  const languages = [
    { code: 'es', flag: 'es', label: 'Español' },
    { code: 'en', flag: 'gb', label: 'English' },
    { code: 'fr', flag: 'fr', label: 'Français' },
    { code: 'de', flag: 'de', label: 'Deutsch' },
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

        {/* GAUCHE : APPEL */}
        <div style={{ width: '35%', display: 'flex', alignItems: 'center' }}>
          <a href="tel:+34602597210" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <div style={{
              background: GOLD_GRADIENT, width: '35px', height: '35px', borderRadius: '8px',
              display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
            }}>
              <span style={{ fontSize: '1rem' }}>📞</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="nav-phone-number" style={{ color: GOLD_BRIGHT, fontSize: '0.85rem', fontWeight: '900', whiteSpace: 'nowrap' }}>602 597 210</span>
              <span style={{ color: VIBRANT_RED, fontSize: '0.65rem', fontWeight: '900', animation: 'pulse-text 2s infinite' }}>
                {(lang === 'es' || lang === 'ar') ? 'LLÁMANOS' : lang === 'fr' ? 'APPELER' : 'CALL US'}
              </span>
            </div>
          </a>
        </div>

        {/* CENTRE : STATUT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '8px', height: '8px', backgroundColor: statusColor, borderRadius: '50%',
            boxShadow: isOpen ? `0 0 10px ${statusColor}` : 'none',
            animation: isOpen ? 'blink-neon 1.5s infinite alternate' : 'none',
            marginBottom: '2px'
          }} />
          <span style={{ color: statusColor, fontSize: '1.1rem', fontWeight: '1000', lineHeight: 1 }}>
            {isOpen ? (lang === 'es' ? "ABIERTO" : "OPEN") : (lang === 'es' ? "CERRADO" : "CLOSED")}
          </span>
        </div>

        {/* DROITE : PANIER */}
        <div onClick={scrollToOrder} style={{ width: '35%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
          <div className={cartLength > 0 ? 'pulse-active' : ''} style={{
            backgroundColor: VIBRANT_RED, padding: '8px 12px', borderRadius: '10px',
            border: `2px solid ${GOLD_BRIGHT}`, display: 'flex', alignItems: 'center',
            boxShadow: '0 4px 12px rgba(255, 71, 87, 0.4)'
          }}>
            <span style={{ color: '#fff', fontWeight: '950', fontSize: '1.1rem' }}>{totalPrice}€</span>
          </div>
        </div>
      </nav>

      {/* SELECTEUR DE LANGUES */}
      <div style={{
        marginTop: '80px',
        display: 'flex', justifyContent: 'center', gap: '6px', padding: '12px 8px',
        flexWrap: 'wrap', backgroundColor: 'rgba(15, 15, 15, 0.95)',
        position: 'relative', zIndex: 9999, borderBottom: '1px solid #333'
      }}>
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            style={{
              background: 'none',
              border: lang === l.code ? `2px solid ${GOLD_BRIGHT}` : '1px solid #444',
              borderRadius: '6px', cursor: 'pointer', padding: '3px',
              transition: '0.2s', transform: lang === l.code ? 'scale(1.15)' : 'scale(1)',
              filter: lang === l.code ? 'grayscale(0%)' : 'grayscale(50%)',
              backgroundColor: lang === l.code ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            <img
              src={`https://flagcdn.com/w40/${l.flag}.png`}
              width="26"
              alt={l.label}
              style={{ borderRadius: '2px', display: 'block' }}
            />
          </button>
        ))}
      </div>
    </>
  );
}
