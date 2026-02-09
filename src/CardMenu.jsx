import React, { useState, useMemo, useEffect } from "react";
import bgCard from "./assets/bg-c.png";

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
  // On utilise l'objet (nom du burger) comme clé pour ne pas mélanger les sélections entre burgers
  const storageKeyExtras = `extras_${object}`;
  const storageKeyRemoved = `removed_${object}`;

  // Initialisation des états avec ce qu'il y a en mémoire (si ça existe)
  const [extraIngredients, setExtraIngredients] = useState(() => {
    const saved = localStorage.getItem(storageKeyExtras);
    return saved ? JSON.parse(saved) : [];
  });

  const [removedIngredients, setRemovedIngredients] = useState(() => {
    const saved = localStorage.getItem(storageKeyRemoved);
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdded, setIsAdded] = useState(false);

  // Sauvegarder dès qu'une option change
  useEffect(() => {
    localStorage.setItem(storageKeyExtras, JSON.stringify(extraIngredients));
  }, [extraIngredients, storageKeyExtras]);

  useEffect(() => {
    localStorage.setItem(storageKeyRemoved, JSON.stringify(removedIngredients));
  }, [removedIngredients, storageKeyRemoved]);
  // -----------------------------

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

    // On nettoie la mémoire locale après l'ajout réussi
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
      position: "relative"
    }}>
      <style>{`
        .image-container { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-img { width: 85%; height: 85%; object-fit: contain; z-index: 2; }
        .price-badge-overlay {
          position: absolute; top: 10px; right: 15px; background: #ff4757; color: white;
          padding: 4px 12px; border-radius: 8px; font-weight: 900; font-size: 1.2rem;
          z-index: 10; border: 2px solid #000; box-shadow: 3px 3px 0px #000; transform: rotate(3deg);
        }
        .card-content { padding: 15px 20px; display: flex; flex-direction: column; gap: 8px; flex-grow: 1; }
        .info-box { background: rgba(255, 255, 255, 0.7); padding: 8px; border-radius: 8px; }
        .card-title { font-size: 1.2rem; font-weight: 950; color: #000; margin: 0; text-transform: uppercase; }
        .options-box { background: rgba(255, 255, 255, 0.4); padding: 8px; border-radius: 8px; border: 1px dashed rgba(0,0,0,0.3); }
        .chips-container { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 5px; }
        .chip { padding: 3px 7px; border-radius: 4px; font-size: 0.6rem; font-weight: 800; cursor: pointer; border: 1px solid #000; background: #fff; }
        .chip.active { background: #ffd32a; box-shadow: 2px 2px 0px #000; }
        .chip.remove.active { background: #000; color: #fff; text-decoration: line-through; }
        .card-footer { padding: 15px 20px 20px 20px; margin-top: auto; }
        .add-btn-modern {
          width: 100%; background: #f1c40f; color: #000; border: 2px solid #000; padding: 12px;
          font-weight: 900; cursor: pointer; text-transform: uppercase; border-radius: 10px;
          box-shadow: 0 4px 0px #c49b09;
        }
        .add-btn-modern.success { background: #2ed573; color: white; }
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
            <div className="chips-container">
              {extrasList.map(item => (
                <button key={item.name} className={`chip ${extraIngredients.includes(item.name) ? 'active' : ''}`} onClick={() => toggleExtra(item.name)}>
                  +{item.price.toFixed(2)} {item.name}
                </button>
              ))}
            </div>
            <div className="chips-container">
              {removableList.map(ing => (
                <button key={ing} className={`chip remove ${removedIngredients.includes(ing) ? 'active' : ''}`} onClick={() => toggleRemove(ing)}>
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
