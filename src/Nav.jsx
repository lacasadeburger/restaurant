import React from "react";

/**
 * Nav Component - Mise à jour 09/02/2026
 * - Point 2 : Ajout Badge FOMO "Abierto" avec pulsation
 * - Point 3 : Ajout Animation Vibrante sur Panier si rempli
 */

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang }) {
  const isEn = lang === 'en';

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '70px',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 10px',
      zIndex: 2000,
      borderBottom: '2px solid #ff4757',
      boxSizing: 'border-box'
    }}>

      {/* CÔTÉ GAUCHE : TÉLÉPHONE */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <a href="tel:+34602597210" style={{
          color: '#fff',
          textDecoration: 'none',
          fontWeight: '900',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '8px 10px',
          borderRadius: '8px',
          border: '1px solid #f1c40f',
          transition: 'all 0.2s ease'
        }}>
          <span style={{ fontSize: '1.1rem' }}>📞</span>
          <span style={{ whiteSpace: 'nowrap' }}>602 59 72 10</span>
        </a>
      </div>

      {/* CENTRE : BADGE D'URGENCE (FOMO) */}
      <div className="fomo-badge" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: 'rgba(46, 213, 115, 0.15)',
        padding: '5px 10px',
        borderRadius: '20px',
        border: '1px solid #2ed573',
      }}>
        <span className="dot-pulse"></span>
        <span style={{
          color: '#2ed573',
          fontSize: '0.65rem',
          fontWeight: '900',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          {isEn ? "Open - 30min delivery" : "Abierto - Entrega 30min"}
        </span>
      </div>

      {/* CÔTÉ DROIT : LE PANIER (VIBRANT SI CARTLENGTH > 0) */}
      <div
        onClick={scrollToOrder}
        className={`cart-button ${cartLength > 0 ? 'pulse-active' : ''}`}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#ff4757',
          padding: '6px 14px',
          borderRadius: '50px',
          transition: 'transform 0.2s ease',
          boxShadow: '0 4px 12px rgba(255, 71, 87, 0.4)',
          border: '1px solid #000',
          flexShrink: 0
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ fontSize: '1.2rem' }}>🛒</span>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{
            color: '#fff',
            fontWeight: '950',
            fontSize: '1rem',
            lineHeight: '1'
          }}>
            {totalPrice}€
          </span>
          <span style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}>
            {cartLength} {cartLength > 1 ? (isEn ? 'items' : 'unidades') : (isEn ? 'item' : 'unidad')}
          </span>
        </div>
      </div>

      <style>{`
        /* Animation du point lumineux (Abierto) */
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

        /* Animation du Panier (Heartbeat vibrant) */
        .pulse-active {
          animation: cart-vibration 1.5s ease-in-out infinite;
        }

        @keyframes cart-vibration {
          0% { transform: scale(1); }
          5% { transform: scale(1.1); }
          10% { transform: scale(1); }
          15% { transform: scale(1.1); }
          20% { transform: scale(1); }
          100% { transform: scale(1); }
        }

        @media (max-width: 430px) {
          .fomo-badge { display: none !important; } /* Masqué sur très petits écrans pour éviter le chevauchement */
        }

        @media (max-width: 360px) {
          nav { padding: 0 5px; }
          a[href^="tel"] { padding: 6px 8px; font-size: 0.75rem; }
        }
      `}</style>
    </nav>
  );
}
