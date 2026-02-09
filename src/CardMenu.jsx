import React, { useState, useMemo, useEffect } from "react";
import background from "./assets/newspaper8.jpg";

export default function CardMenu(props) {
  const { image, object, description, precio, addToCart, isDrinkCard, isPostreCard } = props;

  // 1. On définit les listes d'extras et d'ingrédients à retirer
  const extrasList = [
    { name: "Extra Huevo", price: 1.00 },
    { name: "Extra Carne y Queso", price: 4.50 },
    { name: "Extra Tocino", price: 1.00 },
    { name: "Salsa Picante", price: 0.50 }
  ];

  const removableList = ["Tomate", "Lechuga", "Pepinillos", "Salsa", "Queso", "Ajo", "Hierbas", "Especias"];

  // 2. États locaux pour les sélections
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  // 3. Calcul du prix (On utilise useMemo pour ne pas recalculer inutilement)
  const totalPrice = useMemo(() => {
    const numericValue = String(precio).replace(/[^0-9.,]/g, "").replace(",", ".");
    const base = parseFloat(numericValue) || 0;
    const extrasTotal = extraIngredients.reduce((sum, ingName) => {
      const ingredient = extrasList.find(item => item.name === ingName);
      return sum + (ingredient ? ingredient.price : 0);
    }, 0);
    return (base + extrasTotal).toFixed(2);
  }, [precio, extraIngredients]);

  // 4. Fonctions de basculement (Toggles)
  const toggleExtra = (name) => {
    setExtraIngredients(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const toggleRemove = (name) => {
    setRemovedIngredients(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const handleAddClick = () => {
    const itemToAdd = {
      ...props,
      precio: `${totalPrice}€`,
      object: extraIngredients.length > 0 ? `${object} (+${extraIngredients.join(", ")})` : object,
      removed: removedIngredients
    };
    addToCart(itemToAdd);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      // Optionnel : décommenter si vous voulez vider après l'ajout
      // setExtraIngredients([]);
      // setRemovedIngredients([]);
    }, 1000);
  };

  return (
    <div className="card-item" style={{
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      borderRadius: "15px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      border: "3px solid #000",
      boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
      height: "100%",
      position: "relative"
    }}>
      <style>{`
        .image-container { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-img { width: 100%; height: 90%; object-fit: contain; z-index: 2; }

        .price-badge-overlay {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #ff4757;
          color: white;
          padding: 5px 12px;
          border-radius: 8px;
          font-weight: 900;
          font-size: 1.3rem;
          z-index: 10;
          border: 2px solid #000;
          box-shadow: 4px 4px 0px #000;
          transform: rotate(3deg);
        }

        .card-content { padding: 12px; display: flex; flex-direction: column; gap: 8px; flex-grow: 1; }
        .info-box { background: rgba(255, 255, 255, 0.85); padding: 10px; border-radius: 8px; border: 2px solid #000; }
        .card-title { font-size: 1.3rem; font-weight: 950; color: #000; margin: 0; text-transform: uppercase; }
        .card-description { font-size: 0.85rem; font-weight: 600; color: #333; margin-top: 4px; }

        .options-box { background: rgba(255, 255, 255, 0.6); padding: 8px; border-radius: 8px; border: 1px dashed #000; }
        .option-group-label { font-size: 0.7rem; font-weight: 900; color: #000; text-transform: uppercase; display: block; margin-bottom: 4px; }

        .chips-container { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px; }
        .chip { padding: 4px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 800; cursor: pointer; border: 1px solid #000; background: #fff; transition: all 0.2s; }

        /* Couleur quand sélectionné */
        .chip.extra.active { background: #ffd32a; color: #000; box-shadow: 2px 2px 0px #000; transform: translate(-1px, -1px); }
        .chip.remove.active { background: #000; color: #fff; text-decoration: line-through; }

        .card-footer { padding: 10px; background: rgba(255,255,255,0.9); border-top: 2px solid #000; margin-top: auto; }

        .add-btn-modern {
          width: 100%;
          background: #f1c40f;
          color: #000;
          border: 2px solid #000;
          padding: 14px;
          font-weight: 900;
          cursor: pointer;
          text-transform: uppercase;
          border-radius: 10px;
          font-size: 1.1rem;
          box-shadow: 0 4px 0px #c49b09;
        }
        .add-btn-modern.success { background: #2ed573; color: #fff; box-shadow: 0 4px 0px #218c53; }
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
            <span className="option-group-label">Extras (+€)</span>
            <div className="chips-container">
              {extrasList.map(item => (
                <button
                  key={item.name}
                  type="button" // Important pour éviter les soumissions de formulaire
                  className={`chip extra ${extraIngredients.includes(item.name) ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); toggleExtra(item.name); }}
                >
                  +{item.price.toFixed(2)} {item.name}
                </button>
              ))}
            </div>
            <span className="option-group-label">Quitar (Sin)</span>
            <div className="chips-container">
              {removableList.map(ing => (
                <button
                  key={ing}
                  type="button"
                  className={`chip remove ${removedIngredients.includes(ing) ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); toggleRemove(ing); }}
                >
                  {ing}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button
          className={`add-btn-modern ${isAdded ? 'success' : ''}`}
          onClick={handleAddClick}
        >
          {isAdded ? "¡LISTO!" : "AÑADIR AL CARRITO"}
        </button>
      </div>
    </div>
  );
}
