import React, { useState, useMemo } from "react";
// Importation du fond depuis le dossier assets
import background from "./assets/newspaper8.jpg";

export default function CardMenu(props) {
  const { image, object, description, precio, addToCart, isDrinkCard, isPostreCard } = props;

  const extrasList = [
    { name: "Extra Huevo", price: 1.00 },
    { name: "Extra Carne y Queso", price: 4.50 },
    { name: "Extra Tocino", price: 1.00 },
    { name: "Salsa Picante", price: 0.50 }
  ];

  const removableList = ["Tomate", "Lechuga", "Pepinillos", "Salsa", "Queso", "Ajo", "Hierbas", "Especias"];

  const [extraIngredients, setExtraIngredients] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);

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

  const handleAddClick = () => {
    const itemToAdd = {
      ...props,
      precio: `${totalPrice}€`,
      object: extraIngredients.length > 0 ? `${object} (+${extraIngredients.join(", ")})` : object,
      removed: removedIngredients
    };
    addToCart(itemToAdd);
    setExtraIngredients([]);
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
      height: "100%"
    }}>
      <style>{`
        .image-container { width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-img { width: 100%; height: 100%; object-fit: contain; z-index: 2; }

        /* Nouveau Price Tag Diamant sur l'image */
        .price-badge-overlay {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #ff4757;
          color: white;
          padding: 5px 12px;
          border-radius: 8px;
          font-weight: 900;
          font-size: 1.2rem;
          z-index: 10;
          border: 2px solid #000;
          box-shadow: 4px 4px 0px #000;
          transform: rotate(3deg);
        }

        .card-content { padding: 15px; display: flex; flex-direction: column; gap: 10px; flex-grow: 1; }

        /* Bloc Titre + Description encadré */
        .info-box { background: rgba(255, 255, 255, 0.65); padding: 12px; border-radius: 10px; border: 1.5px solid #000; }
        .card-title { font-size: 1.4rem; font-weight: 900; color: #000; margin: 0; text-transform: uppercase; }
        .card-description { font-size: 0.9rem; font-weight: 700; color: #111; margin-top: 5px; line-height: 1.2; }

        /* Bloc Options encadré */
        .options-box { background: rgba(255, 255, 255, 0.45); padding: 10px; border-radius: 10px; border: 1.5px dashed #000; }
        .option-group-label { font-size: 0.7rem; font-weight: 900; color: #000; text-transform: uppercase; display: block; margin-bottom: 5px; text-decoration: underline; }

        .chips-container { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px; }
        .chip { padding: 5px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; cursor: pointer; border: 1px solid #000; background: #fff; color: #000; }
        .chip.extra.active { background: #2ed573; color: #fff; border-color: #000; }
        .chip.remove.active { background: #ff4757; color: #fff; border-color: #000; text-decoration: line-through; }

        .card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 2px solid #000; margin-top: auto; }
        .price-label { font-size: 1.7rem; font-weight: 950; color: #000; }
        .add-btn-modern { background: #000; color: #fff; border: none; padding: 10px 15px; font-weight: 900; cursor: pointer; text-transform: uppercase; border-radius: 4px; }
      `}</style>

      {/* Image du produit avec le badge de prix par-dessus */}
      <div className="image-container">
        <div className="price-badge-overlay">{totalPrice}€</div>
        <img src={image} alt={object} className="product-img" />
      </div>

      <div className="card-content">
        {/* BLOC INFO ENCADRÉ */}
        <div className="info-box">
          <h3 className="card-title">{object}</h3>
          <p className="card-description">{description}</p>
        </div>

        {!isDrinkCard && !isPostreCard && (
          <div className="options-box">
            <span className="option-group-label">Extras</span>
            <div className="chips-container">
              {extrasList.map(item => (
                <button key={item.name} className={`chip extra ${extraIngredients.includes(item.name) ? 'active' : ''}`} onClick={() => toggleExtra(item.name)}>
                  +{item.price.toFixed(2)}€ {item.name}
                </button>
              ))}
            </div>
            <span className="option-group-label">Quitar</span>
            <div className="chips-container">
              {removableList.map(ing => (
                <button key={ing} className={`chip remove ${removedIngredients.includes(ing) ? 'active' : ''}`} onClick={() => toggleRemove(ing)}>
                  Sin {ing}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="card-footer">
          <div className="price-label">{totalPrice}€</div>
          <button className="add-btn-modern" onClick={handleAddClick}>AGREGAR +</button>
        </div>
      </div>
    </div>
  );
}
