import React, { useState, useMemo, useEffect } from "react";
import bgCard from "./assets/bg-c.jpg";

export default function CardMenu(props) {
  // 'object' est ici le nom de l'item (ex: "La Francesa")
  const { image, object, description, precio, addToCart, isDrinkCard, isPostreCard, lang, hasExtras } = props;

  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";

  // 1. Système de traduction dynamique (Gère l'espagnol par défaut si la langue n'est pas trouvée)
  const t = {
    extra: { en: "Extras", fr: "Suppléments", de: "Extras", ru: "Добавки", es: "Extras" },
    remove: { en: "Remove", fr: "Retirer", de: "Entfernen", ru: "Убрать", es: "Quitar" },
    add: { en: "ADD", fr: "AJOUTER", de: "HINZUFÜGEN", ru: "ДОБАВИТЬ", es: "AÑADIR" },
    ready: { en: "READY!", fr: "PRÊT !", de: "FERTIG!", ru: "ГОТОВО!", es: "¡LISTO!" },
    ingredients: {
      "Extra Huevo": { en: "Extra Egg", fr: "Œuf supplémentaire", de: "Zusätzliches Ei", ru: "Доп. яйцо", es: "Extra Huevo" },
      "Extra Carne y Queso": { en: "Extra Meat & Cheese", fr: "Viande & Fromage suppl.", de: "Extra Fleisch & Käse", ru: "Доп. мясо и сыр", es: "Extra Carne y Queso" },
      "Extra Tocino": { en: "Extra Bacon", fr: "Bacon supplémentaire", de: "Extra Speck", ru: "Доп. бекон", es: "Extra Tocino" },
      "Salsa Picante": { en: "Hot Sauce", fr: "Sauce Piquante", de: "Scharfe Sauce", ru: "Острый соус", es: "Salsa Picante" },
      "Tomate": { en: "Tomato", fr: "Tomate", de: "Tomate", ru: "Помидор", es: "Tomate" },
      "Lechuga": { en: "Lettuce", fr: "Laitue", de: "Salat", ru: "Салат", es: "Lechuga" },
      "Pepinillos": { en: "Pickles", fr: "Cornichons", de: "Essiggurken", ru: "Огурцы", es: "Pepinillos" },
      "Cebolla": { en: "Onion", fr: "Oignon", de: "Zwiebeln", ru: "Лук", es: "Cebolla" },
      "Queso": { en: "Cheese", fr: "Fromage", de: "Käse", ru: "Сыр", es: "Queso" },
      "Ajo": { en: "Garlic", fr: "Ail", de: "Knoblauch", ru: "Чеснок", es: "Ajo" },
      "Hierbas": { en: "Herbs", fr: "Herbes", de: "Kräuter", ru: "Зелень", es: "Hierbas" },
      "Especias": { en: "Spices", fr: "Épices", de: "Gewürze", ru: "Специи", es: "Especias" }
    },
    // Note: Les descriptions devraient idéalement venir de tes props (data.js) pour éviter les doublons ici.
    descriptions: {
       // ... tes descriptions traduisibles ici ou passées via props.description
    }
  };

  // Helper pour récupérer la traduction
  const getT = (key, subKey = null) => {
    if (subKey) return t[key][subKey][lang] || t[key][subKey]['es'];
    return t[key][lang] || t[key]['es'];
  };

  const displayDescription = t.descriptions[object] ? (t.descriptions[object][lang] || t.descriptions[object]['es']) : description;

  const extrasList = [
    { id: "Extra Huevo", name: getT("ingredients", "Extra Huevo"), price: 1.00 },
    { id: "Extra Carne y Queso", name: getT("ingredients", "Extra Carne y Queso"), price: 4.50 },
    { id: "Extra Tocino", name: getT("ingredients", "Extra Tocino"), price: 1.00 },
    { id: "Salsa Picante", name: getT("ingredients", "Salsa Picante"), price: 0.50 }
  ];

  const removableList = [
    { id: "Tomate", name: getT("ingredients", "Tomate") },
    { id: "Lechuga", name: getT("ingredients", "Lechuga") },
    { id: "Pepinillos", name: getT("ingredients", "Pepinillos") },
    { id: "Cebolla", name: getT("ingredients", "Cebolla") },
    { id: "Queso", name: getT("ingredients", "Queso") },
    { id: "Ajo", name: getT("ingredients", "Ajo") },
    { id: "Hierbas", name: getT("ingredients", "Hierbas") },
    { id: "Especias", name: getT("ingredients", "Especias") }
  ];

  // Logic de sélection et panier
  const storageKeyExtras = `extras_${object.replace(/\s/g, '')}`;
  const storageKeyRemoved = `removed_${object.replace(/\s/g, '')}`;

  const [extraIngredients, setExtraIngredients] = useState(() => {
    const saved = localStorage.getItem(storageKeyExtras);
    return saved ? JSON.parse(saved) : [];
  });

  const [removedIngredients, setRemovedIngredients] = useState(() => {
    const saved = localStorage.getItem(storageKeyRemoved);
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => { localStorage.setItem(storageKeyExtras, JSON.stringify(extraIngredients)); }, [extraIngredients, storageKeyExtras]);
  useEffect(() => { localStorage.setItem(storageKeyRemoved, JSON.stringify(removedIngredients)); }, [removedIngredients, storageKeyRemoved]);

  const totalPrice = useMemo(() => {
    const numericValue = String(precio).replace(/[^0-9.,]/g, "").replace(",", ".");
    const base = parseFloat(numericValue) || 0;
    const extrasTotal = extraIngredients.reduce((sum, ingId) => {
      const ingredient = extrasList.find(item => item.id === ingId);
      return sum + (ingredient ? ingredient.price : 0);
    }, 0);
    return (base + extrasTotal).toFixed(2);
  }, [precio, extraIngredients]);

  const toggleExtra = (id) => setExtraIngredients(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleRemove = (id) => setRemovedIngredients(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleAddClick = () => {
    const itemToAdd = {
      ...props,
      precio: `${totalPrice}€`,
      object: extraIngredients.length > 0
        ? `${object} (+${extraIngredients.map(id => getT("ingredients", id)).join(", ")})`
        : object,
      removed: removedIngredients.map(id => getT("ingredients", id))
    };
    addToCart(itemToAdd);
    setIsAdded(true);
    // On ne vide pas le localStorage tout de suite pour laisser le feedback visuel
    setTimeout(() => {
      setIsAdded(false);
      setExtraIngredients([]);
      setRemovedIngredients([]);
      localStorage.removeItem(storageKeyExtras);
      localStorage.removeItem(storageKeyRemoved);
    }, 1000);
  };

  return (
    <div className="card-item" style={{
      backgroundImage: `url(${bgCard})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      height: "auto",
      minHeight: "350px",
      position: "relative",
      padding: "10px",
      border: "1px solid rgba(255, 215, 0, 0.2)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      overflow: "hidden"
    }}>
      {/* Styles CSS injectés */}
      <style>{`
        .image-container { width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-img { width: 80%; height: 80%; object-fit: contain; z-index: 2; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5)); }
        .price-badge-overlay {
          position: absolute; top: 10px; right: 10px; background: #ff4757 !important; color: white !important;
          padding: 5px 12px; border-radius: 6px; font-weight: 950; font-size: 1.3rem;
          z-index: 10; border: 2.5px solid ${GOLD_BRIGHT} !important; box-shadow: 3px 3px 0px #000;
          transform: rotate(5deg);
        }
        .card-content { padding: 5px; display: flex; flex-direction: column; gap: 10px; }
        .info-box, .options-box {
          background: rgba(0, 0, 0, 0.8) !important;
          padding: 12px; border-radius: 10px; border: 1.5px solid rgba(255, 215, 0, 0.15) !important;
          backdrop-filter: blur(5px);
        }
        .card-title { font-size: 1.3rem; font-weight: 950; color: ${GOLD_BRIGHT} !important; margin: 0; text-transform: uppercase; text-shadow: 2px 2px 2px #000; }
        .card-description { font-size: 0.85rem; font-weight: 600; color: #fff !important; margin-top: 5px; line-height: 1.3; }
        .option-group-label {
            font-size: 0.7rem; font-weight: 950; text-transform: uppercase;
            background: ${GOLD_GRADIENT} !important; color: #000 !important;
            padding: 2px 8px; display: inline-block; margin-bottom: 8px; border-radius: 3px;
            box-shadow: 2px 2px 0px #000;
        }
        .chips-container { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
        .chip { padding: 5px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 800; cursor: pointer; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: #fff; }
        .chip.active { background: ${GOLD_GRADIENT} !important; color: #000 !important; border: 1px solid #000; font-weight: 950; }
        .chip.remove.active { background: #ff4757 !important; color: #fff !important; text-decoration: line-through; border: 1px solid #000; }
        .card-footer { padding: 10px 5px 15px; margin-top: auto; }
        .add-btn-gold {
          width: 100%; background: ${GOLD_GRADIENT} !important; color: #000 !important;
          border: 2.5px solid #000 !important; padding: 12px; font-weight: 950;
          cursor: pointer; text-transform: uppercase; border-radius: 10px;
          font-size: 1rem; box-shadow: 0 4px 0px #8A6D3B; transition: 0.1s;
          display: flex; justify-content: space-between; align-items: center;
        }
        .add-btn-gold.success { background: #2ed573 !important; color: white !important; box-shadow: 0 4px 0px #1d914d; justify-content: center; }
      `}</style>

      <div className="image-container">
        <div className="price-badge-overlay">{totalPrice}€</div>
        <img src={image} alt={object} className="product-img" loading="lazy" />
      </div>

      <div className="card-content">
        <div className="info-box">
          <h3 className="card-title" translate="no">{object}</h3>
          <p className="card-description">{displayDescription}</p>
        </div>

        {!isDrinkCard && !isPostreCard && hasExtras && (
          <div className="options-box">
            <span className="option-group-label">{getT("extra")}</span>
            <div className="chips-container">
              {extrasList.map(item => (
                <button key={item.id} type="button" className={`chip ${extraIngredients.includes(item.id) ? 'active' : ''}`} onClick={() => toggleExtra(item.id)}>
                  +{item.price.toFixed(2)} {item.name}
                </button>
              ))}
            </div>
            <span className="option-group-label">{getT("remove")}</span>
            <div className="chips-container">
              {removableList.map(ing => (
                <button key={ing.id} type="button" className={`chip remove ${removedIngredients.includes(ing.id) ? 'active' : ''}`} onClick={() => toggleRemove(ing.id)}>
                  {ing.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button className={`add-btn-gold ${isAdded ? 'success' : ''}`} onClick={handleAddClick}>
          {isAdded ? <span>{getT("ready")}</span> : (
            <>
              <span>{getT("add")}</span>
              <span className="price-tag-inside">{totalPrice}€</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
