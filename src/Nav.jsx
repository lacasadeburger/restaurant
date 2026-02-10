import React from "react";

/**
 * Nav Component - VERSION MAX VISIBILITY
 * - Logo supprimé pour focus total sur le statut
 * - Statut XXL avec effet néon
 * - Adaptabilité mobile renforcée
 */

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang }) {
  const isEn = lang === 'en';

  // --- LOGIQUE D'OUVERTURE AUTOMATIQUE ---
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour + currentMinute / 60;

  // Configuration Horaires : 13h00 à 23h00
  const isOpen = currentTime >= 13 && currentTime < 23;

  const colorOpen = '#2ed573'; // Vert néon
  const colorClosed = '#ff4757'; // Rouge vif
  const statusColor = isOpen ? colorOpen : colorClosed;

  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '80px',
      backgroundColor: 'rgba(0, 0, 0, 0.98)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 15px',
      zIndex: 9999,
      borderBottom: '3px solid #ff4757',
      boxSizing: 'border-box',
      boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
    }}>

      {/* --- COLONNE GAUCHE : APPEL --- */}
      <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-start' }}>
        <a href="tel:+34602597210" style={{
          background: GOLD_GRADIENT,
          color: '#000',
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
          border: '1px solid #000',
          boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
        }}>
          <span style={{ fontSize: '1.4rem' }}>📞</span>
        </a>
      </div>

      {/* --- COLONNE CENTRALE : STATUT XXL --- */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: statusColor,
            borderRadius: '50%',
            boxShadow: `0 0 15px ${statusColor}`,
            animation: isOpen ? 'blink-glow 1.5s infinite' : 'none'
          }}></div>
          <span
            style={{
              color: statusColor,
              fontSize: '1.4rem',
              fontWeight: '950',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              animation: isOpen ? 'neon-pulse 1.5s infinite ease-in-out' : 'none',
              lineHeight: 1
            }}
          >
            {isOpen ? (isEn ? "OPEN" : "ABIERTO") : (isEn ? "CLOSED" : "CERRADO")}
          </span>
        </div>
        {/* Rappel de la ville pour le style et le SEO local */}
        <span style={{ color: '#555', fontSize: '0.6rem', fontWeight: 'bold', marginTop: '4px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          Torrevieja
        </span>
      </div>

      {/* --- COLONNE DROITE : PANIER --- */}
      <div
        onClick={scrollToOrder}
        style={{ width: '25%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
      >
        <div className={cartLength > 0 ? 'pulse-active' : ''} style={{
          backgroundColor: '#ff4757',
          padding: '10px 14px',
          borderRadius: '12px',
          border: `2px solid ${GOLD_BRIGHT}`,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ fontSize: '1.2rem' }}>🛒</span>
          <span style={{ color: '#fff', fontWeight: '950', fontSize: '1.1rem' }}>
            {totalPrice}€
          </span>
        </div>
      </div>

      <style>{`
        @keyframes blink-glow {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes neon-pulse {
          0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px ${colorOpen}; }
          50% { text-shadow: 0 0 10px #fff, 0 0 20px ${colorOpen}, 0 0 35px ${colorOpen}; }
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

        @media (max-width: 380px) {
          span { font-size: 1.1rem !important; }
        }
      `}</style>
    </nav>
  );
}
