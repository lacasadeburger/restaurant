import React from "react";

/**
 * Nav Component - VERSION IMPACT XXL
 * - Statut d'ouverture massif (2.2rem)
 * - Téléphone + Numéro discret à gauche
 * - Panier optimisé à droite
 */

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang }) {
  const isEn = lang === 'en';

  // --- LOGIQUE D'OUVERTURE AUTOMATIQUE (13h-23h) ---
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour + currentMinute / 60;

  const isOpen = currentTime >= 13 && currentTime < 23;

  // Couleurs de statut
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
      padding: '0 10px', zIndex: 9999, borderBottom: '4px solid #ff4757', boxSizing: 'border-box'
    }}>

      {/* --- GAUCHE : APPEL + NUMÉRO (20%) --- */}
      <div style={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <a href="tel:+34602597210" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{
            background: GOLD_GRADIENT, width: '35px', height: '35px', borderRadius: '8px',
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0
          }}>
            <span style={{ fontSize: '1rem' }}>📞</span>
          </div>
          <span style={{ color: GOLD_BRIGHT, fontSize: '0.75rem', fontWeight: '900', whiteSpace: 'nowrap' }}>
            602..
          </span>
        </a>
      </div>

      {/* --- CENTRE : STATUT XXL IMPACT (FLEX 1) --- */}
      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
      }}>
        <div style={{
          width: '12px', height: '12px', backgroundColor: statusColor, borderRadius: '50%',
          boxShadow: `0 0 10px ${statusColor}`,
          animation: isOpen ? 'blink-simple 1.5s infinite' : 'none',
          flexShrink: 0
        }}></div>
        <span
          style={{
            color: statusColor,
            fontSize: '2.2rem',
            fontWeight: '1000',
            textTransform: 'uppercase',
            letterSpacing: '-1px',
            lineHeight: 0.9,
            textAlign: 'center',
            animation: isOpen ? 'soft-neon 2s infinite ease-in-out' : 'none',
          }}
        >
          {isOpen ? (isEn ? "OPEN" : "ABIERTO") : (isEn ? "CLOSED" : "CERRADO")}
        </span>
      </div>

      {/* --- DROITE : PANIER (20%) --- */}
      <div onClick={scrollToOrder} style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
        <div className={cartLength > 0 ? 'pulse-active' : ''} style={{
          backgroundColor: '#ff4757', padding: '8px 10px', borderRadius: '10px',
          border: `2px solid ${GOLD_BRIGHT}`, display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          <span style={{ color: '#fff', fontWeight: '900', fontSize: '1rem' }}>
            {totalPrice}€
          </span>
        </div>
      </div>

      <style>{`
        @keyframes blink-simple {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

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

        @media (max-width: 420px) {
          /* Ajustement pour les écrans mobiles standards */
          span[style*="font-size: 2.2rem"] { font-size: 1.6rem !important; }
          div[style*="width: 20%"] span { display: none; } /* On cache le numéro pour laisser place au XXL */
        }
      `}</style>
    </nav>
  );
}
