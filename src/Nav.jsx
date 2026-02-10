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

  const colorOpen = '#2ed573'; // Vert
  const colorClosed = '#ff4757'; // Rouge
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

      {/* --- GAUCHE : APPEL --- */}
      <div style={{ width: '15%', display: 'flex', justifyContent: 'flex-start' }}>
        <a href="tel:+34602597210" style={{
          background: GOLD_GRADIENT,
          color: '#000',
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
        }}>
          <span style={{ fontSize: '1.4rem' }}>📞</span>
        </a>
      </div>

      {/* --- CENTRE : STATUT ULTRA LARGE --- */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: statusColor,
            borderRadius: '50%',
            boxShadow: `0 0 8px ${statusColor}`, // Lueur réduite
            animation: isOpen ? 'blink-simple 1.5s infinite' : 'none'
          }}></div>
          <span
            style={{
              color: statusColor,
              fontSize: '1.8rem', // TAILLE MAXIMALE
              fontWeight: '1000', // ÉPAISSEUR MAXIMALE
              textTransform: 'uppercase',
              letterSpacing: '1px',
              lineHeight: 1,
              animation: isOpen ? 'soft-neon 2s infinite ease-in-out' : 'none',
            }}
          >
            {isOpen ? (isEn ? "OPEN" : "ABIERTO") : (isEn ? "CLOSED" : "CERRADO")}
          </span>
        </div>
      </div>

      {/* --- DROITE : PANIER --- */}
      <div
        onClick={scrollToOrder}
        style={{ width: '25%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
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
          <span style={{ fontSize: '1.2rem' }}>🛒</span>
          <span style={{ color: '#fff', fontWeight: '900', fontSize: '1.1rem' }}>
            {totalPrice}€
          </span>
        </div>
      </div>

      <style>{`
        /* Animation de pulsation simple sans trop de flou */
        @keyframes blink-simple {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        /* Lueur néon adoucie */
        @keyframes soft-neon {
          0%, 100% { text-shadow: 0 0 4px ${statusColor}88; }
          50% { text-shadow: 0 0 8px ${statusColor}aa; }
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

        @media (max-width: 400px) {
          span { font-size: 1.4rem !important; } /* Légère réduction sur petit mobile pour éviter de déborder */
        }
      `}</style>
    </nav>
  );
}
