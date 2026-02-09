import React from "react";

/**
 * Nav Component - Version Finale Gourmet Gold
 * - Harmonisation avec App.jsx (Or 24K)
 * - Badge FOMO dynamique
 * - Animation Panier Vibrant
 */

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang }) {
  const isEn = lang === 'en';

  // --- CONFIGURATION OR ÉCLATANT ---
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '75px',
      backgroundColor: 'rgba(0, 0, 0, 0.98)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 15px',
      zIndex: 2000,
      borderBottom: '3px solid #ff4757', // Ligne rouge signature
      boxSizing: 'border-box',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
    }}>

      {/* GAUCHE : APPEL DIRECT (Style Or) */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <a href="tel:+34602597210" style={{
          color: '#000',
          textDecoration: 'none',
          fontWeight: '950',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: GOLD_GRADIENT,
          padding: '8px 12px',
          borderRadius: '10px',
          border: '1px solid #000',
          transition: '0.2s ease',
          boxShadow: '0 2px 10px rgba(212, 175, 55, 0.3)'
        }}>
          <span style={{ fontSize: '1.1rem' }}>📞</span>
          <span style={{ whiteSpace: 'nowrap' }}>602 59 72 10</span>
        </a>
      </div>

      {/* CENTRE : STATUS "ABIERTO" (FOMO) */}
      <div className="fomo-badge" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(46, 213, 115, 0.1)',
        padding: '6px 12px',
        borderRadius: '50px',
        border: '1px solid #2ed573',
      }}>
        <span className="dot-pulse"></span>
        <span style={{
          color: '#2ed573',
          fontSize: '0.7rem',
          fontWeight: '900',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          letterSpacing: '0.5px'
        }}>
          {isEn ? "Open - 30min delivery" : "Abierto - Entrega 30min"}
        </span>
      </div>

      {/* DROITE : PANIER (VIBRANT & BORDURE OR) */}
      <div
        onClick={scrollToOrder}
        className={`cart-button ${cartLength > 0 ? 'pulse-active' : ''}`}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#ff4757',
          padding: '6px 15px',
          borderRadius: '12px',
          transition: 'transform 0.2s ease',
          boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)',
          border: `2px solid ${GOLD_BRIGHT}`,
          flexShrink: 0
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ fontSize: '1.3rem' }}>🛒</span>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{
            color: '#fff',
            fontWeight: '950',
            fontSize: '1.1rem',
            lineHeight: '1'
          }}>
            {totalPrice}€
          </span>
          <span style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            fontWeight: '900',
            whiteSpace: 'nowrap'
          }}>
            {cartLength} {cartLength > 1 ? (isEn ? 'items' : 'unidades') : (isEn ? 'item' : 'unidad')}
          </span>
        </div>
      </div>

      <style>{`
        /* Animation du point lumineux vert */
        .dot-pulse {
          width: 8px;
          height: 8px;
          background-color: #2ed573;
          border-radius: 50%;
          box-shadow: 0 0 0 rgba(46, 213, 115, 0.4);
          animation: dot-pulse-animation 2s infinite;
        }

        @keyframes dot-pulse-animation {
          0% { box-shadow: 0 0 0 0 rgba(46, 213, 115, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(46, 213, 115, 0); }
          100% { box-shadow: 0 0 0 0 rgba(46, 213, 115, 0); }
        }

        /* Animation du Panier vibrant quand il n'est pas vide */
        .pulse-active {
          animation: cart-vibration 2s ease-in-out infinite;
        }

        @keyframes cart-vibration {
          0% { transform: scale(1); }
          5% { transform: scale(1.15); }
          10% { transform: scale(1); }
          15% { transform: scale(1.15); }
          20% { transform: scale(1); }
          100% { transform: scale(1); }
        }

        /* Responsive : On cache le badge central sur mobile étroit pour éviter l'écrasement */
        @media (max-width: 480px) {
          .fomo-badge { display: none !important; }
        }

        @media (max-width: 360px) {
          nav { padding: 0 8px; }
          .cart-button { padding: 5px 10px; }
        }
      `}</style>
    </nav>
  );
}
