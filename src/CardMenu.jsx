import React from "react";

export default function CardMenu({ id, name, description, precio, price, addToCart }) {
  // Gestion de la flexibilité du nom de la variable prix
  const finalPrice = precio || price;

  return (
    <div className="menu-card">
      <div className="menu-card-content">
        <h3 className="menu-card-title">{name}</h3>
        <p className="menu-card-description">{description}</p>
        <span className="menu-card-price">{finalPrice}€</span>
      </div>

      {/* Bouton optimisé : Texte en Espagnol & Largeur ergonomique */}
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart({ id, name, precio: finalPrice })}
      >
        <span className="btn-icon">+</span> AÑADIR AL CARRITO
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
          justify-content: space-between;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          margin: 10px;
          position: relative;
        }

        .menu-card:hover {
          transform: translateY(-8px);
          border-color: #ff4757;
          box-shadow: 0 10px 25px rgba(255, 71, 87, 0.2);
        }

        .menu-card-title {
          color: #fff;
          font-size: 1.2rem;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: 0.5px;
        }

        .menu-card-description {
          color: #aaa;
          font-size: 0.85rem;
          line-height: 1.4;
          margin-bottom: 15px;
          min-height: 45px;
        }

        .menu-card-price {
          display: block;
          color: #ff4757;
          font-size: 1.5rem;
          font-weight: 900;
          margin-bottom: 15px;
        }

        .add-to-cart-btn {
          background: #ff4757;
          color: white;
          border: none;
          padding: 14px 10px;
          border-radius: 10px;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s ease;
          width: 100%;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }

        .add-to-cart-btn:hover {
          background: #e03d4e;
        }

        .btn-icon {
          font-size: 1.1rem;
          background: rgba(255,255,255,0.15);
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }

        @media (max-width: 600px) {
          .menu-card { width: 90%; margin: 10px auto; }
        }
      `}</style>
    </div>
  );
}
