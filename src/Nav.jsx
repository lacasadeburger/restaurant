import React from "react";

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang }) {
  const isEn = lang === 'en';

  // --- LOGIQUE D'OUVERTURE AUTOMATIQUE ---
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour + currentMinute / 60;
  const isOpen = currentTime >= 13 && currentTime < 22.5;

  const colorOpen = '#2ed573';
  const colorClosed = '#ff4757';
  const statusColor = isOpen ? colorOpen : colorClosed;

  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '90px',
      backgroundColor: 'rgba(0, 0, 0, 0.98)', backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 12px', zIndex: 9999, borderBottom: '4px solid #ff4757', boxSizing: 'border-box'
    }}>

      {/* --- GAUCHE : APPEL + NUMÉRO COMPLET (35%) --- */}
      <div style={{ width: '35%', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a href="tel:+34602597210" style={{
          background: GOLD_GRADIENT, width: '40px', height: '40px', borderRadius: '10px',
          display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
          textDecoration: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          <span style={{ fontSize: '1.2rem' }}>📞</span>
        </a>
        <span style={{
          color: GOLD_BRIGHT,
          fontSize: '0.9rem',
          fontWeight: '900',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap'
        }}>
          602 597 210
        </span>
      </div>

      {/* --- CENTRE : STATUT XXL (FLEX AUTO) --- */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      }}>
        {/* Point lumineux avec effet Néon Boosté */}
        <div style={{
          width: '10px',
          height: '10px',
          backgroundColor: statusColor,
          borderRadius: '50%',
          boxShadow: isOpen
            ? `0 0 10px ${statusColor}, 0 0 20px ${statusColor}`
            : `0 0 5px ${statusColor}`,
          animation: isOpen ? 'blink-neon 1.5s infinite alternate' : 'none',
          marginBottom: '4px'
        }}></div>

        <span
          style={{
            color: statusColor,
            fontSize: '1.8rem',
            fontWeight: '1000',
            textTransform: 'uppercase',
            letterSpacing: '-0.5px',
            lineHeight: 0.9,
            animation: isOpen ? 'soft-neon 2s infinite ease-in-out' : 'none',
          }}
        >
          {isOpen ? (isEn ? "OPEN" : "ABIERTO") : (isEn ? "CLOSED" : "CERRADO")}
        </span>
      </div>
        >

      {/* --- DROITE : PANIER (25%) --- */}
      <div onClick={scrollToOrder} style={{ width: '25%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
        <div className={cartLength > 0 ? 'pulse-active' : ''} style={{
          backgroundColor: '#ff4757', padding: '10px 12px', borderRadius: '12px',
          border: `2px solid ${GOLD_BRIGHT}`, display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          <span style={{ color: '#fff', fontWeight: '950', fontSize: '1.1rem' }}>
            {totalPrice}€
          </span>
        </div>
      </div>

      <style>{`
  /* Animation du point lumineux (Néon) */
  @keyframes blink-neon {
    0% {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 0 10px ${statusColor}, 0 0 20px ${statusColor};
    }
    100% {
      opacity: 0.8;
      transform: scale(1.2);
      box-shadow: 0 0 15px ${statusColor}, 0 0 25px ${statusColor}, 0 0 35px ${statusColor};
    }
  }

  /* Animation douce sur le texte OPEN/ABIERTO */
  @keyframes soft-neon {
    0%, 100% { text-shadow: 0 0 5px ${statusColor}44; }
    50% { text-shadow: 0 0 12px ${statusColor}88; }
  }

  .pulse-active { animation: cart-shake 2s infinite; }

  @keyframes cart-shake {
    0%, 100% { transform: scale(1); }
    5% { transform: scale(1.1) rotate(5deg); }
    10% { transform: scale(1) rotate(-5deg); }
    15% { transform: scale(1.1) rotate(0); }
  }

  @media (max-width: 400px) {
    span[style*="font-size: 1.8rem"] { font-size: 1.4rem !important; }
    span[style*="font-size: 0.9rem"] { font-size: 0.75rem !important; }
  }
`}</style>
    </nav>
  );
}
