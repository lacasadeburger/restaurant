import React from "react";

// AJOUT DE setLang DANS LES PROPS
export default function Nav({ scrollToOrder, cartLength, totalPrice, lang, setLang }) {
  const isEn = lang === 'en';

  // --- LOGIQUE D'OUVERTURE ---
  const now = new Date();
  const isOpen = (now.getHours() + now.getMinutes() / 60) >= 13 && (now.getHours() + now.getMinutes() / 60) < 22.5;
  const statusColor = isOpen ? '#2ed573' : '#ff4757';

  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";
  const VIBRANT_RED = "#ff4757";

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '90px',
        backgroundColor: 'rgba(0, 0, 0, 0.98)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 12px', zIndex: 9999, borderBottom: `4px solid ${VIBRANT_RED}`, boxSizing: 'border-box'
      }}>

        {/* --- GAUCHE : APPEL --- */}
        <div style={{ width: '38%', display: 'flex', alignItems: 'center' }}>
          <a href="tel:+34602597210" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              background: GOLD_GRADIENT, width: '40px', height: '40px', borderRadius: '10px',
              display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📞</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="nav-phone-number" style={{ color: GOLD_BRIGHT, fontSize: '0.95rem', fontWeight: '900', whiteSpace: 'nowrap' }}>602 597 210</span>
              <span className="nav-call-text" style={{ color: VIBRANT_RED, fontSize: '0.7rem', fontWeight: '900', animation: 'pulse-text 2s infinite' }}>
                {lang === 'es' ? 'LLÁMANOS' : lang === 'fr' ? 'APPELEZ' : 'CALL US'}
              </span>
            </div>
          </a>
        </div>

        {/* --- CENTRE : STATUT --- */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '10px', height: '10px', backgroundColor: statusColor, borderRadius: '50%',
            boxShadow: isOpen ? `0 0 10px ${statusColor}` : 'none',
            animation: isOpen ? 'blink-neon 1.5s infinite alternate' : 'none',
            marginBottom: '4px'
          }}></div>
          <span style={{ color: statusColor, fontSize: '1.4rem', fontWeight: '1000', lineHeight: 0.9 }}>
            {isOpen ? (lang === 'es' ? "ABIERTO" : "OPEN") : (lang === 'es' ? "CERRADO" : "CLOSED")}
          </span>
        </div>

        {/* --- DROITE : PANIER --- */}
        <div onClick={scrollToOrder} style={{ width: '32%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
          <div className={cartLength > 0 ? 'pulse-active' : ''} style={{
            backgroundColor: VIBRANT_RED, padding: '10px 14px', borderRadius: '14px',
            border: `2px solid ${GOLD_BRIGHT}`, display: 'flex', alignItems: 'center',
            boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)'
          }}>
            <span style={{ color: '#fff', fontWeight: '950', fontSize: '1.2rem' }}>{totalPrice}€</span>
          </div>
        </div>
      </nav>

      {/* --- SELECTEUR DE LANGUES (Placé sous le Nav pour être accessible) --- */}
      <div style={{
        marginTop: '100px', // Pour passer sous le nav fixe
        display: 'flex', justifyContent: 'center', gap: '8px', padding: '10px',
        flexWrap: 'wrap', backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '0 0 20px 20px',
        margin: '0 auto', maxWidth: '95%', position: 'relative', zIndex: 9998
      }}>
        {[
          { code: 'es', flag: '🇪🇸' }, { code: 'en', flag: '🇬🇧' }, { code: 'fr', flag: '🇫🇷' },
          { code: 'no', flag: '🇳🇴' }, { code: 'sv', flag: '🇸🇪' }, { code: 'de', flag: '🇩🇪' },
          { code: 'pl', flag: '🇵🇱' }, { code: 'uk', flag: '🇺🇦' }, { code: 'ru', flag: '🇷🇺' },
          { code: 'ro', flag: '🇷🇴' }, { code: 'ar', flag: '🇲🇦' }
        ].map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)} // FONCTIONNE MAINTENANT
            style={{
              background: 'none', border: lang === l.code ? `2px solid ${VIBRANT_RED}` : '2px solid transparent',
              borderRadius: '50%', cursor: 'pointer', fontSize: '22px', padding: '4px',
              transition: '0.3s', transform: lang === l.code ? 'scale(1.2)' : 'scale(1)',
              filter: lang === l.code ? 'grayscale(0%)' : 'grayscale(40%)'
            }}
          >
            {l.flag}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes blink-neon { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.3); opacity: 0.8; } }
        .pulse-active { animation: cart-shake 0.5s ease-in-out infinite alternate; }
        @keyframes cart-shake { from { transform: scale(1); } to { transform: scale(1.05); } }
        @media (max-width: 450px) {
          .nav-phone-number { font-size: 0.8rem !important; }
          span[style*="font-size: 1.4rem"] { font-size: 1.1rem !important; }
        }
      `}</style>
    </>
  );
}
