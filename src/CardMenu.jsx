import React, { useState, useMemo } from "react";
import bgCard from "./assets/bg-c.jpg";

export default function CardMenu(props) {
  const {
    image, name, object, description, precio, addToCart,
    isDrinkCard, isPostreCard, lang, hasExtras, badge, category
  } = props;

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

  const getT = (group, key) => {
    try {
      if (group === "ingredients") return t.ingredients[key][lang] || t.ingredients[key]['es'];
      return t[group][lang] || t[group]['es'];
    } catch (e) { return key || group; }
  };

  const [extraIngredients, setExtraIngredients] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  const totalPrice = useMemo(() => {
    const numericValue = String(precio).replace(/[^0-9.,]/g, "").replace(",", ".");
    const base = parseFloat(numericValue) || 0;
    const extrasTotal = extraIngredients.reduce((sum, ingId) => {
      const extrasList = [
        { id: "Extra Huevo", price: 1.00 },
        { id: "Extra Carne y Queso", price: 4.50 },
        { id: "Extra Tocino", price: 1.00 },
        { id: "Salsa Picante", price: 0.50 }
      ];
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

  const labelGoldStyle = {
    background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #D4AF37, #FBF5B7, #BF953F)',
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '950',
    fontSize: '0.75rem',
    padding: '5px 12px',
    borderRadius: '8px',
    margin: '12px auto 8px auto',
    display: 'table',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
  };

  // --- LOGIQUE DE DÉTECTION ---
  const isSpecial = isDrinkCard || isPostreCard || category === "drink" || category === "postre";

  return (
    <div className="card-menu" style={{
      backgroundImage: `url(${bgCard})`, backgroundSize: 'cover', backgroundPosition: 'center',
      display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', borderRadius: '15px', overflow: 'hidden',
      border: '1px solid rgba(255,215,0,0.1)'
    }}>

      {/* 1. CONTAINER IMAGE : On utilise Flexbox pour centrer parfaitement */}
      <div style={{
        position: 'relative',
        height: '230px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: isSpecial ? '12px' : '0px' // Padding léger pour les bouteilles
      }}>

        {badge && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 50 }}>
            <span className="wobble-badge">{badge}</span>
          </div>
        )}

        <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.85)', color: GOLD_BRIGHT, padding: '5px 12px', borderRadius: '12px', fontWeight: '950', border: `2px solid ${GOLD_BRIGHT}`, zIndex: 40 }}>
          {totalPrice}€
        </div>

        <img
          src={image}
          alt={stableName}
          onError={(e) => { e.target.src = "https://placehold.co/400x400/000000/FFD700?text=Logo"; }}
          style={{
            // LA CORRECTION EST ICI :
            // Pour les boissons : on ne force pas la largeur à 100%, on la laisse s'adapter (auto)
            // pour que la bouteille garde sa forme élancée.
            width: isSpecial ? 'auto' : '100%',
            height: isSpecial ? '100%' : '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: isSpecial ? 'contain' : 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* 2. TEXTE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '15px' }}>
        <h3 translate="no" style={{ margin: '0 0 10px 0', fontSize: '1.4rem', color: '#fff' }}>{stableName}</h3>
        <p style={{ marginBottom: '15px', color: '#ddd', fontSize: '0.9rem', lineHeight: '1.4' }}>
          {typeof description === 'object' ? (description[lang] || description['es']) : (description || "")}
        </p>

        {/* 3. OPTIONS */}
        {hasExtras && !isSpecial && (
          <div className="options-box" style={{ marginTop: 'auto' }}>
            <div style={labelGoldStyle}>{getT("extra")}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '12px' }}>
              {/* Mapping des extras (identique à ton code) */}
              {[
                { id: "Extra Huevo", name: getT("ingredients", "Extra Huevo"), price: 1.00 },
                { id: "Extra Carne y Queso", name: getT("ingredients", "Extra Carne y Queso"), price: 4.50 },
                { id: "Extra Tocino", name: getT("ingredients", "Extra Tocino"), price: 1.00 },
                { id: "Salsa Picante", name: getT("ingredients", "Salsa Picante"), price: 0.50 }
              ].map(item => (
                <button key={item.id} onClick={() => toggleExtra(item.id)}
                  style={{
                    backgroundColor: extraIngredients.includes(item.id) ? '#2ecc71' : 'rgba(255,255,255,0.05)',
                    color: extraIngredients.includes(item.id) ? '#fff' : '#2ecc71',
                    border: '1px solid #2ecc71', borderRadius: '20px', padding: '6px 12px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold'
                  }}
                >
                  {item.name} (+{item.price.toFixed(2)}€)
                </button>
              ))}
            </div>

            <div style={labelGoldStyle}>{getT("remove")}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {/* Mapping des retraits */}
              {[
                { id: "Tomate", name: getT("ingredients", "Tomate") },
                { id: "Lechuga", name: getT("ingredients", "Lechuga") },
                { id: "Pepinillos", name: getT("ingredients", "Pepinillos") },
                { id: "Cebolla", name: getT("ingredients", "Cebolla") },
                { id: "Queso", name: getT("ingredients", "Queso") }
              ].map(ing => (
                <button key={ing.id} onClick={() => toggleRemove(ing.id)}
                  style={{
                    backgroundColor: removedIngredients.includes(ing.id) ? '#e74c3c' : 'rgba(255,255,255,0.05)',
                    color: removedIngredients.includes(ing.id) ? '#fff' : '#e74c3c',
                    border: '1px solid #e74c3c', borderRadius: '20px', padding: '6px 12px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold'
                  }}
                >
                  ❌ {ing.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. BOUTON FINAL */}
      <div style={{ padding: '15px', paddingTop: '0' }}>
        <button
          onClick={handleAddClick}
          className={`gold-button-premium ${isAdded ? 'is-added' : ''}`}
          style={{ width: '100%', height: '50px', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
        >
          {isAdded ? (
            <span style={{ fontWeight: '950' }}>{getT("ready")}</span>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '0 10px' }}>
              <span style={{ fontWeight: '950' }}>{getT("add")}</span>
              <span style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '2px 10px', borderRadius: '6px' }}>{totalPrice}€</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
