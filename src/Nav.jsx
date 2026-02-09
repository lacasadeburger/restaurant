import React from "react";

export default function Nav({ scrollToOrder, cartLength, totalPrice }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '70px',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 25px',
      zIndex: 1000,
      borderBottom: '2px solid #ff4757' // Légèrement plus épais pour le style
    }}>

      {/* CÔTÉ GAUCHE : TÉLÉPHONE (VÉRIFIÉ) */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="tel:+34602597210" style={{
          color: '#fff',
          textDecoration: 'none',
          fontWeight: '900',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <span style={{ fontSize: '1.2rem' }}>📞</span>
          {/* Classe nav-phone-text conservée pour le responsive */}
          <span className="nav-phone-text" style={{ letterSpacing: '0.5px' }}>
            +34 602 59 72 10
          </span>
        </a>
      </div>

      {/* CÔTÉ DROIT : LE CADDIE (VÉRIFIÉ) */}
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
          boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)',
          border: '2px solid #000' // Rappel du style "sticker"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ fontSize: '1.4rem' }}>🛒</span>

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
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 'bold'
          }}>
            {cartLength} {cartLength > 1 ? 'items' : 'item'}
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 500px) {
          /* On réduit la taille au lieu de cacher totalement pour que le client puisse toujours voir le tel */
          .nav-phone-text {
            font-size: 0.8rem;
          }
          nav {
            padding: 0 10px;
          }
        }
        @media (max-width: 380px) {
          /* Uniquement sur les écrans minuscules, on cache le texte pour éviter les chevauchements */
          .nav-phone-text { display: none; }
        }
      `}</style>
    </nav>
  );
}
