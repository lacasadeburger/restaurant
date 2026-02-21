import React, { useState, useMemo } from "react";
import bgCard from "./assets/bg-c.jpg";

export default function CardMenu(props) {
  // 1. RÉCUPÉRATION DES PROPS
  const { image, name, object, description, precio, addToCart, isDrinkCard, isPostreCard, lang, hasExtras, badge } = props;

  // LA COULEUR OR GOURMET
  const GOLD_BRIGHT = "#FFD700";

  // 2. STABILISATION DU NOM
  const stableName = useMemo(() => {
    if (typeof name === 'object') return name[lang] || name['es'];
    if (typeof object === 'object') return object[lang] || object['es'];
    return name || object || "Producto";
  }, [name, object, lang]);

  // 3. SYSTÈME DE TRADUCTION
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

  // 4. LISTES ET ÉTATS
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

  // 5. CALCUL DU PRIX
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
    <div className="card-item" style={{
      backgroundImage: `url(${bgCard})`, backgroundSize: "cover", backgroundPosition: "center",
      borderRadius: "20px", display: "flex", flexDirection: "column", minHeight: "350px",
      position: "relative", padding: "10px", border: `1px solid ${GOLD_BRIGHT}44`,
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)", overflow: "hidden"
    }}>

      <div className="image-container" style={{ position: 'relative', width: '100%' }}>
        {badge && <span className="badge-promo" style={{ zIndex: 11 }}>{badge}</span>}

        {/* PRIX EN HAUT À DROITE (OR) - FORCÉ */}
        <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: GOLD_BRIGHT,
            padding: '5px 12px',
            borderRadius: '12px',
            fontWeight: '950',
            fontSize: '1.2rem',
            border: `2px solid ${GOLD_BRIGHT}`,
            zIndex: 100,
            boxShadow: `0 0 10px rgba(0,0,0,0.8)`
        }}>
            <span style={{ color: GOLD_BRIGHT }}>{totalPrice}€</span>
        </div>

        <img
          src={image}
          alt={stableName}
          className="product-img"
          loading="lazy"
          style={{ width: '100%', borderRadius: '15px', display: 'block' }}
        />
      </div>

      <div className="card-content" style={{ padding: '10px 5px' }}>
        <div className="info-box">
        <h3 className="card-title" translate="no">
{stableName}
</h3>
          <p className="card-description" style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.2' }}>
            {typeof description === 'object' ? (description[lang] || description['es']) : (description || "")}
          </p>
        </div>

        {!isDrinkCard && !isPostreCard && hasExtras && (
          <div className="options-box" style={{ marginTop: '10px' }}>
            <span style={{ color: GOLD_BRIGHT, fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                {getT("extra")}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '8px 0 15px 0' }}>
              {extrasList.map(item => {
                const active = extraIngredients.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleExtra(item.id)}
                    style={{
                        backgroundColor: active ? '#2ecc71' : 'transparent',
                        color: active ? '#fff' : '#2ecc71',
                        border: '1px solid #2ecc71',
                        borderRadius: '20px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        fontWeight: active ? 'bold' : 'normal',
                    }}
                  >
                    +{item.price.toFixed(2)} {item.name}
                  </button>
                );
              })}
            </div>

            <span style={{ color: GOLD_BRIGHT, fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                {getT("remove")}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '8px 0' }}>
              {removableList.map(ing => {
                const active = removedIngredients.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleRemove(ing.id)}
                    style={{
                        backgroundColor: active ? '#e74c3c' : 'transparent',
                        color: active ? '#fff' : '#e74c3c',
                        border: '1px solid #e74c3c',
                        borderRadius: '20px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        fontWeight: active ? 'bold' : 'normal',
                    }}
                  >
                    {ing.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="card-footer" style={{ marginTop: 'auto', padding: '10px 5px' }}>
      <button
onClick={handleAddClick}
style={{
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    // ON FORCE LE FOND AVEC !IMPORTANT POUR ÉCRASER APP.JSX
    background: isAdded ? '#2ecc71 !important' : `${GOLD_BRIGHT} !important`,
    backgroundColor: isAdded ? '#2ecc71 !important' : `${GOLD_BRIGHT} !important`,
    color: isAdded ? '#fff !important' : '#000 !important',
    border: `2px solid ${GOLD_BRIGHT}`,
    fontWeight: '950',
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: isAdded ? 'none' : `0 4px 15px rgba(212, 175, 55, 0.4)`,
    textTransform: 'uppercase',
    // Neutralisation totale des styles mobiles
    appearance: 'none !important',
    WebkitAppearance: 'none !important',
    MozAppearance: 'none !important'
}}
>
{isAdded ? (
    <span style={{ width: '100%', textAlign: 'center', color: '#fff !important' }}>
      {getT("ready")}
    </span>
) : (
  <>
    <span style={{ color: '#000 !important', fontWeight: '950' }}>
      {getT("add")}
    </span>
    <span style={{
      backgroundColor: 'rgba(0,0,0,0.15)',
      padding: '2px 8px',
      borderRadius: '6px',
      color: '#000 !important',
      fontWeight: '950'
    }}>
      {totalPrice}€
    </span>
  </>
)}
</button>
      </div>
    </div>
  );
}
