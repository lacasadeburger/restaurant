import React from "react";

export default function CardMenu({ id, name, description, precio, price, addToCart, isDrinkCard, isPostreCard }) {
  // On gère les deux noms de variables possibles pour le prix
  const finalPrice = precio || price;

  return (
    <div className="menu-card">
      <div className="menu-card-content">
        <h3 className="menu-card-title">{name}</h3>
        <p className="menu-card-description">{description}</p>
        <span className="menu-card-price">{finalPrice}€</span>
      </div>

      {/* Bouton repositionné en bas pour être intuitif */}
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart({ id, name, precio: finalPrice })}
      >
        <span className="btn-icon">+</span> AGREGAR
      </button>

      <style>{`
        .menu-card {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 15px;
          padding: 20px;
          width: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* Aligne le bouton en bas */
          transition: transform 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          margin: 10px;
        }

        .menu-card:hover {
          transform: translateY(-5px);
          border-color: #ff4757;
        }

        .menu-card-content {
          margin-bottom: 20px;
          text-align: left;
        }

        .menu-card-title {
          color: #fff;
          font-size: 1.2rem;
          margin-bottom: 10px;
          text-transform: uppercase;
          font-weight: 900;
        }

        .menu-card-description {
          color: #aaa;
          font-size: 0.9rem;
          line-height: 1.4;
          margin-bottom: 15px;
          min-height: 40px;
        }

        .menu-card-price {
          display: block;
          color: #ff4757;
          font-size: 1.4rem;
          font-weight: 900;
        }

        .add-to-cart-btn {
          background: #ff4757;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: 0.2s;
          width: 100%;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .add-to-cart-btn:hover {
          background: #ff6b81;
          transform: scale(1.02);
        }

        .btn-icon {
          font-size: 1.2rem;
          background: rgba(255,255,255,0.2);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
