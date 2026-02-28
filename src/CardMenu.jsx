import React, { useState, useMemo } from "react";
import bgCard from "./assets/bg-c.jpg";

export default function CardMenu(props) {
  const {
    image, name, object, description, precio, addToCart,
    isDrinkCard, isPostreCard, lang, hasExtras, badge, category
  } = props;

  const GOLD_BRIGHT = "#FFD700";

  // --- LOGIQUE DE DÉTECTION SPÉCIALE ---
  const isSpecial = useMemo(() => {
    return (
      isDrinkCard ||
      isPostreCard ||
      ["drink", "postre", "bebida", "boisson"].includes(category)
    );
  }, [isDrinkCard, isPostreCard, category]);

  const stableName = useMemo(() => {
    if (typeof name === 'object') return name[lang] || name['es'];
    if (typeof object === 'object') return object[lang] || object['es'];
    return name || object || "Producto";
  }, [name, object, lang]);

  // --- SYSTÈME DE TRADUCTION INTÉGRAL (12 LANGUES) ---
  const t = {
    extra: {
      es: "Extras", en: "Extras", fr: "Suppléments", de: "Extras",
      ru: "Добавки", uk: "Добавки", pl: "Dodatki", ro: "Extra",
      ar: "إضافات", no: "Ekstra", sv: "Extra", nl: "Extra's"
    },
    remove: {
      es: "Quitar", en: "Remove", fr: "Retirer", de: "Entfernen",
      ru: "Удалить", uk: "Видалити", pl: "Usuń", ro: "Elimină",
      ar: "إزالة", no: "Fjern", sv: "Ta bort", nl: "Verwijderen"
    },
    add: {
      es: "AÑADIR", en: "ADD", fr: "AJOUTER", de: "HINZUFÜGEN",
      ru: "ДОБАВИТЬ", uk: "ДОДАТИ", pl: "DODAJ", ro: "ADAUGĂ",
      ar: "إضافة", no: "LEGG TIL", sv: "LÄGG TILL", nl: "TOEVOEGEN"
    },
    ready: {
      es: "¡LISTO!", en: "READY!", fr: "PRÊT !", de: "FERTIG!",
      ru: "ГОТОВО!", uk: "ГОТОВО!", pl: "GOTOWE!", ro: "GATA!",
      ar: "جاهز!", no: "KLAR!", sv: "KLAR!", nl: "KLAAR!"
    },
    ingredients: {
      "Extra Huevo": { es: "Extra Huevo", en: "Extra Egg", fr: "Œuf suppl.", de: "Extra Ei", ru: "Доп. яйцо", uk: "Дод. яйце", pl: "Dodatkowe jajko", ro: "Ou extra", ar: "بيضة إضافية", no: "Ekstra egg", sv: "Extra ägg", nl: "Extra ei" },
      "Extra Carne y Queso": { es: "Extra Carne y Queso", en: "Extra Meat & Cheese", fr: "Viande & Fromage suppl.", de: "Extra Fleisch & Käse", ru: "Доп. мясо и сыр", uk: "Дод. м'm'ясо та сир", pl: "Dodatkowe mięso i ser", ro: "Carne și brânză extra", ar: "لحم وجبن إضافي", no: "Ekstra kjøtt og ost", sv: "Extra kött och ost", nl: "Extra vlees en kaas" },
      "Extra Tocino": { es: "Extra Tocino", en: "Extra Bacon", fr: "Bacon suppl.", de: "Extra Speck", ru: "Доп. бекон", uk: "Дод. бекон", pl: "Dodatkowy bekon", ro: "Bacon extra", ar: "لحم قديد إضافي", no: "Ekstra bacon", sv: "Extra bacon", nl: "Extra spek" },
      "Salsa Picante": { es: "Salsa Picante", en: "Hot Sauce", fr: "Sauce Piquante", de: "Scharfe Soße", ru: "Острый соус", uk: "Гострий соус", pl: "Ostry sos", ro: "Sos iute", ar: "صلصة حارة", no: "Sterk saus", sv: "Stark sås", nl: "Hete saus" },
      "Tomate": { es: "Tomate", en: "Tomato", fr: "Tomate", de: "Tomate", ru: "Помидор", uk: "Помідор", pl: "Pomidor", ro: "Roșie", ar: "طماطم", no: "Tomat", sv: "Tomat", nl: "Tomaat" },
      "Lechuga": { es: "Lechuga", en: "Lettuce", fr: "Laitue", de: "Salat", ru: "Салат", uk: "Салат", pl: "Sałata", ro: "Salată", ar: "خس", no: "Salat", sv: "Sallad", nl: "Sla" },
      "Pepinillos": { es: "Pepinillos", en: "Pickles", fr: "Cornichons", de: "Essiggurken", ru: "Огурцы", uk: "Огірки", pl: "Ogórki", ro: "Castraveți murați", ar: "مخلل", no: "Sylteagurk", sv: "Gurka", nl: "Augurken" },
      "Cebolla": { es: "Cebolla", en: "Onion", fr: "Oignon", de: "Zwiebel", ru: "Лук", uk: "Цибуля", pl: "Cebula", ro: "Ceapă", ar: "بصل", no: "Løk", sv: "Lök", nl: "Ui" },
      "Queso": { es: "Queso", en: "Cheese", fr: "Fromage", de: "Käse", ru: "Сыр", uk: "Сир", pl: "Ser", ro: "Brânză", ar: "جبن", no: "Ost", sv: "Ost", nl: "Kaas" }
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
    const extrasList = [
      { id: "Extra Huevo", price: 1.00 },
      { id: "Extra Carne y Queso", price: 4.50 },
      { id: "Extra Tocino", price: 1.00 },
      { id: "Salsa Picante", price: 0.50 }
    ];
    const extrasTotal = extraIngredients.reduce((sum, ingId) => {
      const ingredient = extrasList.find(item => item.id === ingId);
      return sum + (ingredient ? ingredient.price : 0);
    }, 0);
    return (base + extrasTotal).toFixed(2);
  }, [precio, extraIngredients]);

  const toggleExtra = (id) => setExtraIngredients(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleRemove = (id) => setRemovedIngredients(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  // --- LOGIQUE D'AJOUT CORRIGÉE POUR WHATSAPP (FORCER L'ESPAGNOL) ---
  const handleAddClick = () => {
    // Fonction pour toujours avoir la valeur "es" de l'ingrédient
    const getSpanishIngredient = (id) => {
        return t.ingredients[id] ? t.ingredients[id]['es'] : id;
    };

    const itemToAdd = {
      ...props,
      precio: `${totalPrice}€`,
      // On force le nom du produit en ESPAGNOL
      object: extraIngredients.length > 0
        ? `${typeof name === 'object' ? name.es : stableName} (+${extraIngredients.map(id => getSpanishIngredient(id)).join(", ")})`
        : (typeof name === 'object' ? name.es : stableName),
      // On force les ingrédients retirés en ESPAGNOL
      removed: removedIngredients.map(id => getSpanishIngredient(id))
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

  return (
    <div className="card-menu" style={{
      backgroundImage: `url(${bgCard})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      borderRadius: '15px',
      overflow: 'hidden',
      border: '1px solid rgba(255,215,0,0.3)',
      backgroundColor: '#000'
    }}>

      <div className="card-menu-image-container" style={{
        position: 'relative',
        height: '230px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: isSpecial ? '15px' : '0px'
      }}>
        {badge && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 50 }}>
            <span className="wobble-badge">{badge}</span>
          </div>
        )}

        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.85)',
          color: GOLD_BRIGHT,
          padding: '5px 12px',
          borderRadius: '12px',
          fontWeight: '950',
          border: `2px solid ${GOLD_BRIGHT}`,
          zIndex: 40
        }}>
          {totalPrice}€
        </div>

        <img
          src={image}
          alt={stableName}
          className={isDrinkCard || category === "drink" ? "img-drink" : isPostreCard ? "img-postre" : "img-burger"}
          style={{
            width: '100%',
            height: '100%',
            objectFit: isSpecial ? 'contain' : 'cover',
            display: 'block',
            zIndex: 10
          }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '15px' }}>
        <h3 translate="no" className="card-title" style={{ margin: '0 0 10px 0', color: '#fff' }}>
          {stableName}
        </h3>

        <p className="card-description">
          {typeof description === 'object' ? (description[lang] || description['es']) : (description || "")}
        </p>

        {hasExtras && !isSpecial && (
          <div className="options-box" style={{ marginTop: 'auto' }}>
            <div style={labelGoldStyle}>{getT("extra")}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '12px' }}>
              {[
                { id: "Extra Huevo", price: 1.00 },
                { id: "Extra Carne y Queso", price: 4.50 },
                { id: "Extra Tocino", price: 1.00 },
                { id: "Salsa Picante", price: 0.50 }
              ].map(item => (
                <button key={item.id} onClick={() => toggleExtra(item.id)}
                  style={{
                    backgroundColor: extraIngredients.includes(item.id) ? '#2ecc71' : 'rgba(255,255,255,0.05)',
                    color: extraIngredients.includes(item.id) ? '#fff' : '#2ecc71',
                    border: '1px solid #2ecc71', borderRadius: '20px', padding: '6px 12px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold'
                  }}
                >
                  {getT("ingredients", item.id)} (+{item.price.toFixed(2)}€)
                </button>
              ))}
            </div>

            <div style={labelGoldStyle}>{getT("remove")}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {[
                { id: "Tomate" },
                { id: "Lechuga" },
                { id: "Pepinillos" },
                { id: "Cebolla" },
                { id: "Queso" }
              ].map(ing => (
                <button key={ing.id} onClick={() => toggleRemove(ing.id)}
                  style={{
                    backgroundColor: removedIngredients.includes(ing.id) ? '#e74c3c' : 'rgba(255,255,255,0.05)',
                    color: removedIngredients.includes(ing.id) ? '#fff' : '#e74c3c',
                    border: '1px solid #e74c3c', borderRadius: '20px', padding: '6px 12px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold'
                  }}
                >
                  ❌ {getT("ingredients", ing.id)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '15px', paddingTop: '0' }}>
        <button
          onClick={handleAddClick}
          className={`gold-button-premium ${isAdded ? 'is-added' : ''}`}
          style={{
            width: '100%',
            height: '55px',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          {isAdded ? (
            <span style={{ fontWeight: '950' }}>{getT("ready")}</span>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '0 10px' }}>
              <span style={{ fontWeight: '950' }}>{getT("add")}</span>
              <span style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.9rem' }}>
                {totalPrice}€
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
