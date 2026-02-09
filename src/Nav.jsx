import React from "react";

/**
 * Nav Component - VERSION ULTIME CERTIFIÉE 2026
 * - Affichage Logo intégral (sans rognage)
 * - Architecture 3 colonnes optimisée pour Mobile Portrait
 * - Indicateur d'état "Abierto" intégré
 */

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang, logo }) {
  const isEn = lang === 'en';

  // --- CONFIGURATION DESIGN SYSTÈME ---
  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '80px', // Hauteur optimale pour l'équilibre visuel
      backgroundColor: 'rgba(0, 0, 0, 0.98)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 12px',
      zIndex: 9999, // Priorité maximale au-dessus de tout
      borderBottom: '3px solid #ff4757', // Signature rouge
      boxSizing: 'border-box',
      boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
    }}>

      {/* --- COLONNE GAUCHE : APPEL (25%) --- */}
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
          boxShadow: '0 3px 10px rgba(212, 175, 55, 0.4)',
          transition: 'transform 0.2s active'
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
        {/* Conteneur d'image sans contrainte de forme ronde */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '55px' }}>
          <img
            src={logo}
            alt="La Casa de Burger Torrevieja"
            style={{
              maxHeight: '100%',     // Respecte la hauteur du conteneur
              maxWidth: '100%',      // S'adapte à la largeur mobile
              width: 'auto',         // Garde le ratio original
              height: 'auto',        // Garde le ratio original
              objectFit: 'contain',  // IMPORTANT : Affiche l'image ENTIÈRE
              filter: 'drop-shadow(0px 0px 8px rgba(255, 215, 0, 0.3))'
            }}
          />
        </div>

        {/* Status discret sous le logo pour gagner de la place latérale */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
          <div className="status-dot"></div>
          <span style={{
            color: '#2ed573',
            fontSize: '0.65rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {isEn ? "Open Now" : "Abierto Ahora"}
          </span>
        </div>
      </div>

      {/* --- COLONNE DROITE : PANIER (35%) --- */}
      <div
        onClick={scrollToOrder}
        style={{ width: '35%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
      >
        <div className={`cart-container ${cartLength > 0 ? 'vibrate' : ''}`} style={{
          backgroundColor: '#ff4757',
          padding: '8px 12px',
          borderRadius: '12px',
          border: `2px solid ${GOLD_BRIGHT}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 15px rgba(255, 71, 87, 0.5)'
        }}>
          <span style={{ fontSize: '1.2rem' }}>🛒</span>
          <span style={{
            color: '#fff',
            fontWeight: '950',
            fontSize: '1.1rem',
            fontFamily: 'sans-serif'
          }}>
            {totalPrice}€
          </span>
        </div>
      </div>

      {/* --- ANIMATIONS ET RESPONSIVE --- */}
      <style>{`
        .status-dot {
          width: 7px;
          height: 7px;
          background-color: #2ed573;
          border-radius: 50%;
          box-shadow: 0 0 8px #2ed573;
          animation: pulse-status 2s infinite;
        }

        @keyframes pulse-status {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        .vibrate {
          animation: cart-vibration 2s ease-in-out infinite;
        }

        @keyframes cart-vibration {
          0% { transform: scale(1); }
          5% { transform: scale(1.1); rotate: 2deg; }
          10% { transform: scale(1); rotate: -2deg; }
          15% { transform: scale(1.1); rotate: 2deg; }
          20% { transform: scale(1); rotate: 0deg; }
          100% { transform: scale(1); }
        }

        /* Ajustement pour écrans minuscules (ex: iPhone SE) */
        @media (max-width: 360px) {
          .cart-container { padding: 6px 8px; }
          .cart-container span { fontSize: 0.9rem !important; }
          img { maxHeight: 45px !important; }
        }
      `}</style>
    </nav>
  );
}
