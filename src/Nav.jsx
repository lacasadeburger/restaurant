import React from "react";

/**
 * Nav Component - VERSION FINALE CERTIFIÉE
 * - Logo intégral (contain) : aucune découpe ronde
 * - Structure 3 colonnes optimisée mobile
 * - Z-index 9999 pour éviter les superpositions
 */

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang, logo }) {
  const isEn = lang === 'en';

  // CONFIGURATION DESIGN OR & ROUGE
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
      padding: '0 12px',
      zIndex: 9999,
      borderBottom: '3px solid #ff4757',
      boxSizing: 'border-box',
      boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
    }}>

      {/* --- COLONNE GAUCHE : BOUTON APPEL (25%) --- */}
      <div style={{ width: '25%', display: 'flex', justifyContent: 'flex-start' }}>
        <a href="tel:+34602597210" style={{
          background: GOLD_GRADIENT,
          color: '#000',
          width: '45px',
          height: '45px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
          border: '1px solid #000',
          boxShadow: '0 3px 10px rgba(212, 175, 55, 0.4)'
        }}>
          <span style={{ fontSize: '1.3rem' }}>📞</span>
        </a>
      </div>

      {/* --- COLONNE CENTRALE : LOGO COMPLET (40%) --- */}
      <div style={{
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '52px', width: '100%' }}>
          <img
            src={logo}
            alt="La Casa de Burger Logo"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',  // GARANTIE : L'image n'est JAMAIS rognée
              filter: 'drop-shadow(0px 0px 5px rgba(255, 215, 0, 0.3))'
            }}
          />
        </div>

        {/* Statut d'ouverture compact */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
          <div className="dot-online"></div>
          <span style={{
            color: '#2ed573',
            fontSize: '0.65rem',
            fontWeight: '900',
            textTransform: 'uppercase'
          }}>
            {isEn ? "Open Now" : "Abierto"}
          </span>
        </div>
      </div>

      {/* --- COLONNE DROITE : PANIER (35%) --- */}
      <div
        onClick={scrollToOrder}
        style={{ width: '35%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
      >
        <div className={`cart-chip ${cartLength > 0 ? 'pulse-active' : ''}`} style={{
          backgroundColor: '#ff4757',
          padding: '8px 10px',
          borderRadius: '12px',
          border: `2px solid ${GOLD_BRIGHT}`,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ fontSize: '1.1rem' }}>🛒</span>
          <span style={{ color: '#fff', fontWeight: '950', fontSize: '1.05rem' }}>
            {totalPrice}€
          </span>
        </div>
      </div>

      <style>{`
        .dot-online {
          width: 7px;
          height: 7px;
          background-color: #2ed573;
          border-radius: 50%;
          animation: glow-green 2s infinite;
        }

        @keyframes glow-green {
          0% { box-shadow: 0 0 0 0 rgba(46, 213, 115, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(46, 213, 115, 0); }
          100% { box-shadow: 0 0 0 0 rgba(46, 213, 115, 0); }
        }

        .pulse-active {
          animation: cart-shake 2s infinite;
        }

        @keyframes cart-shake {
          0%, 100% { transform: scale(1); }
          5% { transform: scale(1.1) rotate(3deg); }
          10% { transform: scale(1) rotate(-3deg); }
          15% { transform: scale(1.1) rotate(0); }
        }

        @media (max-width: 360px) {
          nav { height: 75px; }
          .cart-chip { padding: 6px 8px; }
          .cart-chip span { font-size: 0.9rem !important; }
        }
      `}</style>
    </nav>
  );
}
