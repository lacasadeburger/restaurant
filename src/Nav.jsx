import React, { useState, useEffect } from "react";

export default function Nav({ scrollToOrder }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Effet pour changer le style de la barre au scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 5000,
      transition: 'all 0.3s ease',
      backgroundColor: isScrolled ? 'rgba(17, 17, 17, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      padding: isScrolled ? '10px 0' : '20px 0',
      borderBottom: isScrolled ? '2px solid #ff4757' : 'none',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        {/* LOGO */}
        <div style={{
          fontSize: '1.5rem',
          fontWeight: '900',
          color: '#fff',
          letterSpacing: '-1px',
          cursor: 'pointer'
        }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          LA CASA DE <span style={{color: '#ff4757'}}>BURGER</span>
        </div>

        {/* LIENS DESKTOP */}
        <div className="nav-links" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <button
            onClick={() => document.getElementById('sec-burgers').scrollIntoView({behavior: 'smooth'})}
            style={navButtonStyle}>CARTA</button>
          <button
            onClick={scrollToOrder}
            style={{
              ...navButtonStyle,
              backgroundColor: '#ff4757',
              padding: '8px 20px',
              borderRadius: '50px',
              color: '#fff'
            }}>PEDIR AHORA</button>
          <a href="tel:+34602597210" style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="fas fa-phone-alt" style={{color: '#ff4757', fontSize: '1rem'}}></i>
            <span className="nav-phone">602 597 210</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-phone { display: none; }
          .nav-links { gap: 10px !important; }
        }
      `}</style>
    </nav>
  );
}

const navButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  cursor: 'pointer',
  textTransform: 'uppercase',
  transition: 'color 0.3s ease'
};
