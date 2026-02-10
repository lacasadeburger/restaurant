import React from "react";

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang }) {
  const isEn = lang === 'en';

  // --- LOGIQUE D'OUVERTURE AUTOMATIQUE ---
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour + currentMinute / 60;

  // Horaires : 13h00 à 23h00
  const isOpen = currentTime >= 13 && currentTime < 23;

  const colorOpen = '#2ed573';
  const colorClosed = '#ff4757';
  const statusColor = isOpen ? colorOpen : colorClosed;

  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '85px',
      backgroundColor: 'rgba(0, 0, 0, 0.98)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 12px',
      zIndex: 9999,
      borderBottom: '3px solid #ff4757',
      boxSizing: 'border-box'
    }}>

      {/* --- GAUCHE : APPEL + NUMÉRO --- */}
      <div style={{ width: '35%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px' }}>
        <a href="tel:+34602597210" style={{
          background: GOLD_GRADIENT,
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '1.2rem' }}>📞</span>
        </a>

        {/* Ton numéro qui réapparaît ici */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            color: GOLD_BRIGHT,
            fontSize: '0.85rem',
            fontWeight: '800',
            letterSpacing: '0.5px'
          }}>
            602 597 210
          </span>
          <span style={{ color: '#666', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {lang === 'es' ? 'Llamar ahora' : 'Call now'}
          </span>
        </div>
      </div>

      {/* --- CENTRE : STATUT XXL --- */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          backgroundColor: statusColor,
          borderRadius: '50%',
          boxShadow: `0 0 8px ${statusColor}`,
          animation: isOpen ? 'blink-simple 1.5s infinite' : 'none',
          flexShrink: 0
        }}></div>
        <span
          style={{
            color: statusColor,
            fontSize: '1.6rem', // Ajusté pour laisser de la place au numéro
            fontWeight: '1000',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            lineHeight: 1,
            animation: isOpen ? 'soft-neon 2s infinite ease-in-out' : 'none',
          }}
        >
          {isOpen ? (isEn ? "OPEN" : "ABIERTO") : (isEn ? "CLOSED" : "CERRADO")}
        </span>
      </div>

      {/* --- DROITE : PANIER --- */}
      <div
        onClick={scrollToOrder}
        style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
      >
        <div className={cartLength > 0 ? 'pulse-active' : ''} style={{
          backgroundColor: '#ff4757',
          padding: '10px 12px',
          borderRadius: '12px',
          border: `2px solid ${GOLD_BRIGHT}`,
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <span style={{ fontSize: '1.1rem' }}>🛒</span>
          <span style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>
            {totalPrice}€
          </span>
        </div>
      </div>

      <style>{`
        @keyframes blink-simple {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes soft-neon {
          0%, 100% { text-shadow: 0 0 4px ${statusColor}66; }
          50% { text-shadow: 0 0 8px ${statusColor}99; }
        }

        .pulse-active {
          animation: cart-shake 2s infinite;
        }

        @keyframes cart-shake {
          0%, 100% { transform: scale(1); }
          5% { transform: scale(1.1) rotate(5deg); }
          10% { transform: scale(1) rotate(-5deg); }
          15% { transform: scale(1.1) rotate(0); }
        }

        @media (max-width: 420px) {
          span { font-size: 1.2rem !important; }
          div[style*="width: 35%"] span:last-child { display: none; } /* Cache "Llamar ahora" sur petit mobile */
        }
      `}</style>
    </nav>
  );
}
