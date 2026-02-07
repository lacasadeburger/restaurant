import React from "react";

export default function Nav({ scrollToOrder, cartLength, totalPrice }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '70px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 25px',
      zIndex: 1000,
      borderBottom: '1px solid #333'
    }}>
      {/* CÔTÉ GAUCHE : TÉLÉPHONE */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="tel:+34602597210" style={{
          color: '#fff',
          textDecoration: 'none',
          fontWeight: '900',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ color: '#ff4757' }}>📞</span>
          <span className="nav-phone-text">+34 602 59 72 10</span>
        </a>
      </div>

      {/* CÔTÉ DROIT : LE CADDIE DIAMANT */}
      <div
        onClick={scrollToOrder}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#ff4757',
          padding: '8px 18px',
          borderRadius: '50px',
          transition: 'transform 0.2s ease',
          boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {/* L'icône Caddie */}
        <span style={{ fontSize: '1.4rem' }}>🛒</span>

        {/* Le Prix Dynamique */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{
            color: '#fff',
            fontWeight: '900',
            fontSize: '1.1rem',
            lineHeight: '1'
          }}>
            {totalPrice}€
          </span>
          <span style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 'bold'
          }}>
            {cartLength} {cartLength > 1 ? 'items' : 'item'}
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .nav-phone-text { display: none; } /* On cache le numéro sur mini mobile pour laisser place au prix */
          nav { padding: 0 15px; }
        }
      `}</style>
    </nav>
  );
}
