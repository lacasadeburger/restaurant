import React from "react";

export default function Nav({ scrollToOrder, cartLength, totalPrice, lang, setLang }) {
  const now = new Date();
  const day = now.getDay();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const isOpen = (currentHour >= 13 && currentHour < 23) && (day !== 0);
  const statusColor = isOpen ? '#2ed573' : '#ff4757';

  const promoTexts = {
    es: "AHORRE HASTA UN 20% A VISITARNOS",
    fr: "ÉCONOMISEZ JUSQU'À 20% EN NOUS VISITANT",
    en: "SAVE UP TO 20% BY VISITING US",
    // ... tes autres traductions sont conservées
  };

  const languages = [
    { code: 'es', flag: 'es' }, { code: 'en', flag: 'gb' }, { code: 'fr', flag: 'fr' },
    { code: 'de', flag: 'de' }, { code: 'nl', flag: 'nl' }, { code: 'no', flag: 'no' },
    { code: 'sv', flag: 'se' }, { code: 'pl', flag: 'pl' }, { code: 'uk', flag: 'ua' },
    { code: 'ru', flag: 'ru' }, { code: 'ro', flag: 'ro' }, { code: 'ar', flag: 'ma' }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 10000,
      backgroundColor: '#000',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
    }}>

      {/* NIVEAU 1 : CONTACT & PANIER (Hauteur réduite à 70px pour gagner de l'air) */}
      <div style={{
        height: '70px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 15px',
        borderBottom: '1px solid #222'
      }}>
        <a href="tel:+34602597210" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'linear-gradient(135deg, #BF953F, #FCF6BA)', width: '32px', height: '32px', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '1rem' }}>📞</span>
          </div>
          <span style={{ color: '#FFD700', fontWeight: '900', fontSize: '0.9rem' }}>602 597 210</span>
        </a>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: statusColor, borderRadius: '50%', boxShadow: `0 0 10px ${statusColor}` }} />
          <span style={{ color: statusColor, fontSize: '0.75rem', fontWeight: '900' }}>{isOpen ? "OPEN" : "CLOSED"}</span>
        </div>

        <div onClick={scrollToOrder} style={{
          backgroundColor: '#e60023', padding: '10px 15px', borderRadius: '10px',
          border: '2px solid #FFD700', cursor: 'pointer', boxShadow: '0 0 10px rgba(230,0,0,0.4)'
        }}>
          <span style={{ color: '#fff', fontWeight: '950', fontSize: '1.1rem' }}>{totalPrice}€</span>
        </div>
      </div>

      {/* NIVEAU 2 : DRAPEAUX (Hauteur 45px - Plus discret et propre) */}
      <div style={{
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 15px',
        overflowX: 'auto',
        backgroundColor: '#0a0a0a',
        borderBottom: '1px solid #333',
        WebkitOverflowScrolling: 'touch' // Scroll fluide sur iPhone
      }}>
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            style={{
              flexShrink: 0,
              padding: '2px',
              backgroundColor: 'transparent',
              border: lang === l.code ? '2px solid #FFD700' : '1px solid #444',
              borderRadius: '4px',
              opacity: lang === l.code ? 1 : 0.4,
              transition: '0.3s'
            }}
          >
            <img src={`/flags/${l.flag}.webp`} width="28" height="20" alt={l.code} style={{ display: 'block', borderRadius: '2px' }} />
          </button>
        ))}
      </div>

      {/* NIVEAU 3 : BANDEAU PROMO (Hauteur 35px - Or Premium) */}
      <div style={{
        height: '35px',
        background: 'linear-gradient(90deg, #000, #1a1a1a, #000)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '2px solid #FF4757',
        fontSize: '0.75rem',
        fontWeight: '900',
        color: '#fff',
        overflow: 'hidden'
      }}>
        <span style={{ color: '#FFD700', marginRight: '8px' }}>★</span>
        <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
          {promoTexts[lang] || promoTexts.en}
        </span>
        <span style={{ color: '#FFD700', marginLeft: '8px' }}>★</span>
      </div>
    </header>
  );
}
