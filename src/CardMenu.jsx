import React, { useState, useMemo } from "react";
import bgCard from "./assets/bg-c.jpg";

export default function CardMenu(props) {
  const { image, name, object, description, precio, addToCart, isDrinkCard, isPostreCard, lang, hasExtras, badge } = props;

  const GOLD_BRIGHT = "#FFD700";

  const stableName = useMemo(() => {
    if (typeof name === 'object') return name[lang] || name['es'];
    if (typeof object === 'object') return object[lang] || object['es'];
    return name || object || "Producto";
  }, [name, object, lang]);

  const t = {
    extra: { es: "Extras", en: "Extras", fr: "Suppléments" },
    remove: { es: "Quitar", en: "Remove", fr: "Retirer" },
    add: { es: "AÑADIR", en: "ADD", fr: "AJOUTER" },
    ready: { es: "¡LISTO!", en: "READY!", fr: "PRÊT !" },
    ingredients: {
      "Extra Huevo": { es: "Extra Huevo", en: "Extra Egg", fr: "Œuf suppl." },
      "Extra Carne y Queso": { es: "Extra Carne y Queso", en: "Extra Meat & Cheese", fr: "Viande & Fromage suppl." },
      "Extra Tocino": { es: "Extra Tocino", en: "Extra Bacon", fr: "Bacon suppl." },
      "Salsa Picante": { es: "Salsa Picante", en: "Hot Sauce", fr: "Sauce Piquante" },
      "Tomate": { es: "Tomate", en: "Tomato", fr: "Tomate" },
      "Lechuga": { es: "Lechuga", en: "Lettuce", fr: "Laitue" },
      "Pepinillos": { es: "Pepinillos", en: "Pickles", fr: "Cornichons" },
      "Cebolla": { es: "Cebolla", en: "Onion", fr: "Oignon" },
      "Queso": { es: "Queso", en: "Cheese", fr: "Fromage" }
    }
  };

  const getT = (key, subKey = null) => {
    try {
      if (subKey) return t[key][subKey][lang] || t[key][subKey]['es'];
      return t[key][lang] || t[key]['es'];
    } catch (e) { return subKey || key; }
  };

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
    { id: "Queso", name: getT("ingredients", "Queso") }
  ];

  const [extraIngredients, setExtraIngredients] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

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
        ? `${stableName} (+${extraIngredients.map(id => getT("ingredients", id)).join(", ")})`
        : stableName,
      removed: removedIngredients.map(id => getT("ingredients", id))
    };
    addToCart(itemToAdd);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setExtraIngredients([]);
      setRemovedIngredients([]);
    }, 800);
  };

  return (
    <div className="card-menu" style={{ backgroundImage: `url(${bgCard})` }}>

      {/* 1. IMAGE ET BADGE - Classe synchronisée avec App.jsx */}
      <div className="card-menu-image-container">
        {badge && (
          <div className="wobble-badge-container">
            <span className="wobble-badge">{badge}</span>
          </div>
        )}

        {/* Le prix flottant */}
        <div className="price-tag-overlay" style={{
            position: 'absolute', top: '10px', right: '10px',
            backgroundColor: 'rgba(0,0,0,0.85)', color: GOLD_BRIGHT,
            padding: '5px 12px', borderRadius: '12px', fontWeight: '950',
            border: `2px solid ${GOLD_BRIGHT}`, zIndex: 40
        }}>
            {totalPrice}€
        </div>

        <img src={image} alt={stableName} loading="lazy" />
      </div>

      {/* 2. TEXTE */}
      <div className="card-content">
        <h3 className="card-title" translate="no">{stableName}</h3>
        <p className="card-description">
          {typeof description === 'object' ? (description[lang] || description['es']) : (description || "")}
        </p>

        {/* 3. OPTIONS (SI EXISTENT) */}
        {!isDrinkCard && !isPostreCard && hasExtras && (
          <div className="options-box">
            <span style={{ color: GOLD_BRIGHT, fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                {getT("extra")}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px', justifyContent: 'center' }}>
              {extrasList.map(item => {
                const active = extraIngredients.includes(item.id);
                return (
                  <button key={item.id} onClick={() => toggleExtra(item.id)}
                    style={{
                        backgroundColor: active ? '#2ecc71' : 'transparent',
                        color: active ? '#fff' : '#2ecc71',
                        border: '1px solid #2ecc71', borderRadius: '20px',
                        padding: '2px 8px', fontSize: '0.65rem', cursor: 'pointer'
                    }}
                  >
                    +{item.price.toFixed(2)}
                  </button>
                );
              })}
            </div>

            {/* Ingrédients à retirer - Version compacte */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px', justifyContent: 'center' }}>
              {removableList.map(ing => {
                const active = removedIngredients.includes(ing.id);
                return (
                  <button key={ing.id} onClick={() => toggleRemove(ing.id)}
                    style={{
                        backgroundColor: active ? '#e74c3c' : 'transparent',
                        color: active ? '#fff' : '#e74c3c',
                        border: '1px solid #e74c3c', borderRadius: '20px',
                        padding: '2px 8px', fontSize: '0.65rem', cursor: 'pointer'
                    }}
                  >
                    ❌ {ing.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. FOOTER AVEC BOUTON PREMIUM */}
      <div className="card-footer" style={{ marginTop: 'auto' }}>
        <button
          onClick={handleAddClick}
          className={`gold-button-premium ${isAdded ? 'is-added' : ''}`}
        >
          {isAdded ? (
            <span style={{ width: '100%', textAlign: 'center' }}>{getT("ready")}</span>
          ) : (
            <>
              <span>{getT("add")}</span>
              <span style={{ backgroundColor: 'rgba(0,0,0,0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                {totalPrice}€
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
