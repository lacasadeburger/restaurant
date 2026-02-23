import React, { useState, useMemo } from "react";
import bgCard from "./assets/bg-c.jpg";

export default function CardMenu(props) {
  const { image, name, object, description, precio, addToCart, isDrinkCard, isPostreCard, lang, hasExtras, badge } = props;

  const GOLD_BRIGHT = "#FFD700";

  // --- LOGIQUE DE NOM STABLE ---
  const stableName = useMemo(() => {
    if (typeof name === 'object') return name[lang] || name['es'];
    if (typeof object === 'object') return object[lang] || object['es'];
    return name || object || "Producto";
  }, [name, object, lang]);

  // --- DICTIONNAIRE DE TRADUCTION COMPLET ---
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

  const getT = (group, key) => {
    try {
      if (group === "ingredients") {
        return t.ingredients[key][lang] || t.ingredients[key]['es'];
      }
      return t[group][lang] || t[group]['es'];
    } catch (e) {
      return key || group;
    }
  };

  // --- LISTES DES OPTIONS ---
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

  // --- CALCUL DU PRIX TOTAL ---
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

  // Style commun pour les étiquettes Or/Noir (Extras/Quitar)
  const labelGoldStyle = {
    background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #D4AF37, #FBF5B7, #BF953F)',
    backgroundSize: '200% 200%',
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: '0.75rem',
    padding: '5px 12px',
    borderRadius: '8px',
    margin: '12px auto 8px auto',
    display: 'table',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
    letterSpacing: '1px'
  };

  return (
    <div className="card-menu" style={{
      backgroundImage: `url(${bgCard})`, backgroundSize: 'cover', backgroundPosition: 'center',
      display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', borderRadius: '15px', overflow: 'hidden'
    }}>

      {/* 1. IMAGE & BADGE */}
      <div className="card-menu-image-container" style={{
        background: 'transparent',
        position: 'relative',
        height: '230px',
        width: '100%',
        overflow: 'hidden'
      }}>

        {badge && (
          <div className="wobble-badge-container" style={{
            position: 'absolute', top: '10px', left: '10px', zIndex: 50
          }}>
            <span className="wobble-badge" style={{ margin: 0 }}>{badge}</span>
          </div>
        )}

        <div className="price-tag-overlay" style={{
            position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.85)', color: GOLD_BRIGHT,
            padding: '5px 12px', borderRadius: '12px', fontWeight: '950', border: `2px solid ${GOLD_BRIGHT}`, zIndex: 40
        }}>{totalPrice}€</div>

        <img
          src={image}
          alt={stableName}
          loading="lazy"
          onError={(e) => { e.target.src = "https://placehold.co/400x400/000000/FFD700?text=Logo"; }}
          style={{
            background: 'transparent',
            width: '100%', height: '100%', display: 'block',
            objectFit: (isDrinkCard || isPostreCard) ? 'contain' : 'cover',
            padding: (isDrinkCard || isPostreCard) ? '25px' : '0px'
          }}
        />
      </div>

      {/* 2. CONTENU TEXTE */}
      <div className="card-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '15px' }}>
        <h3 className="card-title" translate="no" style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>{stableName}</h3>
        <p className="card-description" style={{ marginBottom: '15px', color: '#ddd' }}>
          {typeof description === 'object' ? (description[lang] || description['es']) : (description || "")}
        </p>

        {/* 3. OPTIONS & EXTRAS (Style PREMIUM RE-VÉRIFIÉ) */}
        {!isDrinkCard && !isPostreCard && hasExtras && (
          <div className="options-box" style={{ marginTop: 'auto' }}>

            <div style={labelGoldStyle}>{getT("extra")}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '12px' }}>
              {extrasList.map(item => {
                const active = extraIngredients.includes(item.id);
                return (
                  <button key={item.id} onClick={() => toggleExtra(item.id)}
                    style={{
                        backgroundColor: active ? '#2ecc71' : 'rgba(255,255,255,0.05)',
                        color: active ? '#fff' : '#2ecc71',
                        border: `1px solid ${active ? '#2ecc71' : 'rgba(46, 204, 113, 0.4)'}`,
                        borderRadius: '20px', padding: '6px 12px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold'
                    }}
                  >
                    {item.name} (+{item.price.toFixed(2)}€)
                  </button>
                );
              })}
            </div>

            <div style={labelGoldStyle}>{getT("remove")}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {removableList.map(ing => {
                const active = removedIngredients.includes(ing.id);
                return (
                  <button key={ing.id} onClick={() => toggleRemove(ing.id)}
                    style={{
                        backgroundColor: active ? '#e74c3c' : 'rgba(255,255,255,0.05)',
                        color: active ? '#fff' : '#e74c3c',
                        border: `1px solid ${active ? '#e74c3c' : 'rgba(231, 76, 60, 0.4)'}`,
                        borderRadius: '20px', padding: '6px 12px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold'
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

      {/* 4. BOUTON FINAL PREMIUM */}
      <div className="card-footer" style={{ padding: '15px', paddingTop: '0' }}>
        <button
          onClick={handleAddClick}
          className={`gold-button-premium ${isAdded ? 'is-added' : ''}`}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {isAdded ? (
            <span style={{ fontWeight: '900' }}>{getT("ready")}</span>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '0 5px' }}>
              <span style={{ fontWeight: '900' }}>{getT("add")}</span>
              <span style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '2px 10px',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}>{totalPrice}€</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
