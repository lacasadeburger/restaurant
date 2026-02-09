import React, { useState, useMemo, useEffect } from "react";
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

  // --- LOGIQUE DE SAUVEGARDE (ANTI-RESET LANGUE) ---
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
      padding: "5px",
      border: "none"
    }}>
      <style>{`
        .image-container { width: 100%; height: 170px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-img { width: 80%; height: 80%; object-fit: contain; z-index: 2; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.4)); }

        .price-badge-overlay {
          position: absolute; top: 10px; right: 15px; background: #ff4757 !important; color: white !important;
          padding: 6px 14px; border-radius: 4px; font-weight: 950; font-size: 1.4rem;
          z-index: 10; border: 3px solid #000 !important; box-shadow: 4px 4px 0px #000 !important;
          transform: rotate(5deg);
        }

        .card-content { padding: 10px 15px; display: flex; flex-direction: column; gap: 12px; flex-grow: 1; }

        /* DÉGRADÉ ROUGE PROFOND (RAPPEL BG-C.JPG) */
        .info-box, .options-box {
          background: linear-gradient(135deg, rgba(139, 0, 0, 0.85) 0%, rgba(40, 0, 0, 0.95) 100%) !important;
          padding: 12px;
          border-radius: 4px;
          border: 2px solid #000 !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4) !important;
          backdrop-filter: blur(3px);
        }

        .info-box { transform: rotate(-0.5deg); }
        .options-box { transform: rotate(0.5deg); }

        /* TEXTE EN BLANC / OR POUR RESSORTIR SUR LE ROUGE SOMBRE */
        .card-title { font-size: 1.25rem; font-weight: 950; color: #f1c40f !important; margin: 0; text-transform: uppercase; text-shadow: 1px 1px 2px #000; }
        .card-description { font-size: 0.85rem; font-weight: 700; color: #ffffff !important; margin-top: 5px; line-height: 1.2; }

        .option-group-label {
          font-size: 0.7rem; font-weight: 900; text-transform: uppercase;
          background: #f1c40f !important; color: #000 !important; padding: 2px 6px;
          display: inline-block; margin-bottom: 8px; transform: skewX(-10deg);
        }

        .chips-container { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
        .chip { padding: 5px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 900; cursor: pointer; border: 1px solid #000; background: rgba(255,255,255,0.1); color: #fff; transition: all 0.1s; }

        .chip.active { background: #f1c40f !important; color: #000 !important; transform: scale(1.05); border: 2px solid #000; }
        .chip.remove.active { background: #ff4757 !important; color: #fff !important; text-decoration: line-through; border: 2px solid #000; }

        .card-footer { padding: 10px 15px 20px 15px; margin-top: auto; }

        .add-btn-modern {
          width: 100%; background: #f1c40f !important; color: #000 !important; border: 3px solid #000 !important; padding: 15px;
          font-weight: 950; cursor: pointer; text-transform: uppercase; border-radius: 8px;
          font-size: 1.1rem; box-shadow: 0 6px 0px #c49b09; transition: all 0.1s;
        }
        .add-btn-modern:active { transform: translateY(3px); box-shadow: 0 2px 0px #c49b09; }
        .add-btn-modern.success { background: #2ed573 !important; color: white !important; box-shadow: 0 6px 0px #1d914d; }
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
