import React from "react";

/**
 * Nav Component - Vérifié le 09/02/2026
 * - Correction visibilité Portrait (Mobile)
 * - Optimisation Flexbox pour éviter le chevauchement
 * - Nettoyage des règles CSS média
 */

export default function Nav({ scrollToOrder, cartLength, totalPrice }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0, // Ajouté pour garantir l'alignement
      width: '100%',
      height: '70px',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)', // Support Safari
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 10px', // Padding réduit pour maximiser l'espace mobile
      zIndex: 2000, // Augmenté pour être sûr de passer au-dessus de tout
      borderBottom: '2px solid #ff4757',
      boxSizing: 'border-box' // Essentiel pour que le padding ne dépasse pas des 100%
    }}>

      {/* CÔTÉ GAUCHE : TÉLÉPHONE (VÉRIFIÉ POUR PORTRAIT) */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <a href="tel:+34602597210" style={{
          color: '#fff',
          textDecoration: 'none',
          fontWeight: '900',
          fontSize: '0.85rem', // Taille optimisée pour tenir partout
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
          {/* Suppression de la classe qui masquait le texte */}
          <span style={{ whiteSpace: 'nowrap' }}>602 59 72 10</span>
        </a>
      </div>

      {/* CÔTÉ DROIT : LE PANIER (VÉRIFIÉ) */}
      <div
        onClick={scrollToOrder}
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
          flexShrink: 0 // Empêche le bouton de s'écraser
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
            {cartLength} {cartLength > 1 ? 'items' : 'item'}
          </span>
        </div>
      </div>

      <style>{`
        /* Plus de "display: none", on gère uniquement la taille */
        @media (max-width: 360px) {
          nav { padding: 0 5px; }
          a[href^="tel"] { padding: 6px 8px; font-size: 0.75rem; }
        }
      `}</style>
    </nav>
  );
}
