import React, { useState, useMemo, useEffect } from "react";
// CORRECTION ICI : .jpg au lieu de .png
import bgCard from "./assets/bg-c.jpg";

export default function CardMenu(props) {
  const { image, object, description, precio, addToCart, isDrinkCard, isPostreCard } = props;

  const extrasList = [
    { name: "Extra Huevo", price: 1.00 },
    { name: "Extra Carne y Queso", price: 4.50 },
    { name: "Extra Tocino", price: 1.00 },
    { name: "Salsa Picante", price: 0.50 }
  ];

  const removableList = ["Tomate", "Lechuga", "Pepinillos", "Salsa", "Queso", "Ajo", "Hierbas", "Especias"];

  // --- LOGIQUE DE SAUVEGARDE ---
  const storageKeyExtras = `extras_${object}`;
  const storageKeyRemoved = `removed_${object}`;

  const [extraIngredients, setExtraIngredients] = useState(() => {
    const saved = localStorage.getItem(storageKeyExtras);
    return saved ? JSON.parse(saved) : [];
  });

  const [removedIngredients, setRemovedIngredients] = useState(() => {
    const saved = localStorage.getItem(storageKeyRemoved);
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKeyExtras, JSON.stringify(extraIngredients));
  }, [extraIngredients, storageKeyExtras]);

  useEffect(() => {
    localStorage.setItem(storageKeyRemoved, JSON.stringify(removedIngredients));
  }, [removedIngredients, storageKeyRemoved]);

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
    setIsAdded(true);

    localStorage.removeItem(storageKeyExtras);
    localStorage.removeItem(storageKeyRemoved);

    setTimeout(() => {
      setIsAdded(false);
      setExtraIngredients([]);
      setRemovedIngredients([]);
    }, 1000);
  };

  return (
    <div className="card-item" style={{
      backgroundImage: `url(${bgCard})`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      borderRadius: "15px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      position: "relative",
      padding: "5px"
    }}>
      <style>{`
        .image-container { width: 100%; height: 170px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-img { width: 80%; height: 80%; object-fit: contain; z-index: 2; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.3)); }

        .price-badge-overlay {
          position: absolute; top: 10px; right: 15px; background: #ff4757; color: white;
          padding: 6px 14px; border-radius: 4px; font-weight: 950; font-size: 1.4rem;
          z-index: 10; border: 3px solid #000; box-shadow: 4px 4px 0px #000;
          transform: rotate(5deg);
        }

        .card-content { padding: 10px 15px; display: flex; flex-direction: column; gap: 12px; flex-grow: 1; }

        .info-box, .options-box {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,240,0.85) 100%);
          padding: 12px;
          border-radius: 2px;
          border: 3px solid #000;
          box-shadow: 4px 4px 0px rgba(0,0,0,0.15);
        }

        .info-box { transform: rotate(-0.5deg); }
        .options-box { transform: rotate(0.5deg); }

        .card-title { font-size: 1.25rem; font-weight: 950; color: #000; margin: 0; text-transform: uppercase; }
        .card-description { font-size: 0.8rem; font-weight: 700; color: #333; margin-top: 5px; }

        .option-group-label {
          font-size: 0.7rem; font-weight: 900; text-transform: uppercase;
          background: #000; color: #fff; padding: 2px 6px;
          display: inline-block; margin-bottom: 8px; transform: skewX(-10deg);
        }

        .chips-container { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
        .chip { padding: 5px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 900; cursor: pointer; border: 2px solid #000; background: #fff; transition: all 0.1s; }
        .chip.active { background: #ffd32a; transform: translate(-1px, -1px); box-shadow: 2px 2px 0px #000; }
        .chip.remove.active { background: #ff4757; color: #fff; text-decoration: line-through; box-shadow: 2px 2px 0px #000; }

        .card-footer { padding: 10px 15px 20px 15px; margin-top: auto; }
        .add-btn-modern {
          width: 100%; background: #f1c40f; color: #000; border: 3px solid #000; padding: 15px;
          font-weight: 950; cursor: pointer; text-transform: uppercase; border-radius: 8px;
          font-size: 1.1rem; box-shadow: 0 6px 0px #c49b09; transition: all 0.1s;
        }
        .add-btn-modern:active { transform: translateY(3px); box-shadow: 0 2px 0px #c49b09; }
        .add-btn-modern.success { background: #2ed573; color: white; box-shadow: 0 6px 0px #1d914d; }
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
            <span className="option-group-label">Extras</span>
            <div className="chips-container">
              {extrasList.map(item => (
                <button key={item.name} type="button" className={`chip ${extraIngredients.includes(item.name) ? 'active' : ''}`} onClick={() => toggleExtra(item.name)}>
                  +{item.price.toFixed(2)} {item.name}
                </button>
              ))}
            </div>
            <span className="option-group-label">Quitar</span>
            <div className="chips-container">
              {removableList.map(ing => (
                <button key={ing} type="button" className={`chip remove ${removedIngredients.includes(ing) ? 'active' : ''}`} onClick={() => toggleRemove(ing)}>
                  {ing}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button className={`add-btn-modern ${isAdded ? 'success' : ''}`} onClick={handleAddClick}>
          {isAdded ? "¡LISTO!" : "AÑADIR AL CARRITO"}
        </button>
      </div>
    </div>
  );
}
