import React, { useState, useMemo } from "react";
import background from "./assets/newspaper8.jpg";

export default function CardMenu(props) {
  const { image, object, description, precio, addToCart, isDrinkCard, isPostreCard } = props;

  // --- LOGIQUE DES EXTRAS ET INGRÉDIENTS ---
  const extrasList = [
    { name: "Extra Huevo", price: 1.00 },
    { name: "Extra Carne y Queso", price: 4.50 },
    { name: "Extra Tocino", price: 1.00 },
    { name: "Salsa Picante", price: 0.50 }
  ];

  const removableList = ["Tomate", "Lechuga", "Pepinillos", "Salsa", "Queso", "Ajo", "Hierbas", "Especias"];

  const [extraIngredients, setExtraIngredients] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);

  // Calcul dynamique du prix avec les extras
  const totalPrice = useMemo(() => {
    const numericValue = String(precio).replace(/[^0-9.,]/g, "").replace(",", ".");
    const base = parseFloat(numericValue) || 0;
    const extrasTotal = extraIngredients.reduce((sum, ingName) => {
      const ingredient = extrasList.find(item => item.name === ingName);
      return sum + (ingredient ? ingredient.price : 0);
    }, 0);
    return (base + extrasTotal).toFixed(2);
  }, [precio, extraIngredients]);

  const toggleExtra = (name) => {
    setExtraIngredients(prev => prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]);
  };

  const toggleRemove = (name) => {
    setRemovedIngredients(prev => prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]);
  };

  // --- GESTION DU CLIC "AJOUTER" ---
  const handleAddClick = () => {
    const itemToAdd = {
      ...props,
      precio: `${totalPrice}€`,
      object: extraIngredients.length > 0 ? `${object} (+${extraIngredients.join(", ")})` : object,
      removed: removedIngredients
    };
    addToCart(itemToAdd);
    setExtraIngredients([]); // Reset après ajout
    setRemovedIngredients([]);
  };

  return (
    <div className="card-item" style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      borderRadius: "15px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      border: "2px solid #000",
      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      height: "100%",
      width: "300px",
      margin: "10px"
    }}>
      <style>{`
        .image-container { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; position: relative; background: rgba(255,255,255,0.2); }
        .product-img { width: 100%; height: 100%; object-fit: contain; z-index: 2; padding: 10px; }

        .price-badge-overlay {
          position: absolute; top: 10px; right: 10px; background: #ff4757; color: white;
          padding: 5px 12px; border-radius: 8px; font-weight: 900; font-size: 1.1rem;
          z-index: 10; border: 2px solid #000; box-shadow: 3px 3px 0px #000; transform: rotate(3deg);
        }

        .card-content { padding: 15px; display: flex; flex-direction: column; gap: 12px; flex-grow: 1; }
        .info-box { background: rgba(255, 255, 255, 0.75); padding: 12px; border-radius: 10px; border: 1.5px solid #000; }
        .card-title { font-size: 1.3rem; font-weight: 900; color: #000; margin: 0; text-transform: uppercase; }
        .card-description { font-size: 0.85rem; font-weight: 700; color: #111; margin-top: 5px; line-height: 1.2; }

        .options-box { background: rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 10px; border: 1.2px dashed #000; }
        .option-group-label { font-size: 0.65rem; font-weight: 900; color: #000; text-transform: uppercase; display: block; margin-bottom: 5px; }

        .chips-container { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px; }
        .chip { padding: 4px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 800; cursor: pointer; border: 1px solid #000; background: #fff; }
        .chip.extra.active { background: #2ed573; color: #fff; }
        .chip.remove.active { background: #ff4757; color: #fff; text-decoration: line-through; }

        /* --- LE NOUVEAU BOUTON CIBLE --- */
        .add-to-cart-btn-full {
          background: #000;
          color: #fff;
          border: 2px solid #000;
          padding: 14px;
          border-radius: 10px;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
          width: 100%;
          text-transform: uppercase;
          font-size: 0.9rem;
          margin-top: auto; /* Pousse le bouton en bas */
        }

        .add-to-cart-btn-full:hover {
          background: #ff4757;
          border-color: #ff4757;
          transform: scale(1.02);
        }

        .btn-plus-icon {
          background: #fff;
          color: #000;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 1rem;
        }
      `}</style>

      <div className="image-container">
        <div className="price-badge-overlay">{totalPrice}€</div>
        <img src={image} alt={object} className="product-img" />
      </div>

      <div className="card-content">
        <div className="info-box">
          <h3 className="card-title">{object}</h3>
          <p className="card-description">{description}</p>
        </div>

        {!isDrinkCard && !isPostreCard && (
          <div className="options-box">
            <span className="option-group-label">Añadir Extras</span>
            <div className="chips-container">
              {extrasList.map(item => (
                <button key={item.name} className={`chip extra ${extraIngredients.includes(item.name) ? 'active' : ''}`} onClick={() => toggleExtra(item.name)}>
                  +{item.price.toFixed(2)}€ {item.name}
                </button>
              ))}
            </div>
            <span className="option-group-label">Quitar Ingredientes</span>
            <div className="chips-container">
              {removableList.map(ing => (
                <button key={ing} className={`chip remove ${removedIngredients.includes(ing) ? 'active' : ''}`} onClick={() => toggleRemove(ing)}>
                  Sin {ing}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* NOUVEAU BOUTON POSITIONNÉ ET TRADUIT */}
        <button className="add-to-cart-btn-full" onClick={handleAddClick}>
          <span className="btn-plus-icon">+</span> AÑADIR AL CARRITO
        </button>
      </div>
    </div>
  );
}
