import React from "react";

/**
 * Nav Component - VERSION FINALE CERTIFIÉE
 * - Intégration Logo Centrale
 * - Design Gold & Red Signature
 * - Full SEO-Ready & Responsive
 */

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang, logo }) {
  const isEn = lang === 'en';

  // --- CONFIGURATION DESIGN ---
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
      padding: '0 15px',
      zIndex: 2000,
      borderBottom: '3px solid #ff4757',
      boxSizing: 'border-box',
      boxShadow: '0 4px 25px rgba(0,0,0,0.7)'
    }}>

      {/* GAUCHE : APPEL DIRECT (Style Or) */}
      <div style={{ display: 'flex', alignItems: 'center', width: '30%', justifyContent: 'flex-start' }}>
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
          <span style={{ whiteSpace: 'nowrap' }}>{isEn ? 'CALL' : 'LLAMAR'}</span>
        </a>
      </div>

      {/* CENTRE : LE LOGO (L'élément qui manquait) */}
      <div style={{
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75px',
          height: '75px',
          background: GOLD_GRADIENT,
          borderRadius: '50%',
          zIndex: -1,
          opacity: 0.6,
          filter: 'blur(8px)'
        }}></div>
        <img
          src={logo}
          alt="La Casa de Burger Torrevieja"
          style={{
            height: '75px',
            width: '75px',
            borderRadius: '50%',
            border: `2px solid ${GOLD_BRIGHT}`,
            objectFit: 'cover',
            backgroundColor: '#000'
          }}
        />
      </div>

      {/* DROITE : PANIER (VIBRANT & BORDURE OR) */}
      <div
        onClick={scrollToOrder}
        className={`cart-button ${cartLength > 0 ? 'pulse-active' : ''}`}
        style={{
          width: '30%',
          display: 'flex',
          justifyContent: 'flex-end',
          cursor: 'pointer',
          alignItems: 'center',
          gap: '10px',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{
          backgroundColor: '#ff4757',
          padding: '6px 15px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)',
          border: `2px solid ${GOLD_BRIGHT}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '1.2rem' }}>🛒</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontWeight: '950', fontSize: '1rem', lineHeight: '1' }}>
              {totalPrice}€
            </span>
          </div>
        </div>
      </div>

      <style>{`
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

        @media (max-width: 480px) {
          nav { height: 75px; }
          img { height: 60px !important; width: 60px !important; }
        }
      `}</style>
    </nav>
  );
}
