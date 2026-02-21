import React, { useState, useMemo } from "react";
import bgCard from "./assets/bg-c.jpg";

export default function CardMenu(props) {
  // 1. RÉCUPÉRATION DES PROPS (On garde 'name' et 'object' pour la compatibilité)
  const { image, name, object, description, precio, addToCart, isDrinkCard, isPostreCard, lang, hasExtras } = props;

  // 2. STABILISATION DU NOM (Empêche la disparition au re-rendu)
  const stableName = useMemo(() => {
    if (typeof name === 'object') return name[lang] || name['es'];
    if (typeof object === 'object') return object[lang] || object['es'];
    return name || object || "Producto";
  }, [name, object, lang]);

  // 3. SYSTÈME DE TRADUCTION (DICTIONNAIRE COMPLET CONSERVÉ)
  const t = {
    extra: { es: "Extras", en: "Extras", fr: "Suppléments", de: "Extras", ru: "Добавки", uk: "Додатки", pl: "Dodatki", no: "Ekstra", sv: "Tillval", ro: "Extra", ar: "إضافات" },
    remove: { es: "Quitar", en: "Remove", fr: "Retirer", de: "Entfernen", ru: "Убрать", uk: "Прибрати", pl: "Usuń", no: "Fjern", sv: "Ta bort", ro: "Elimină", ar: "إزالة" },
    add: { es: "AÑADIR", en: "ADD", fr: "AJOUTER", de: "HINZUFÜGEN", ru: "ДОБАВИТЬ", uk: "ДОДАТИ", pl: "DODAJ", no: "LEGG TIL", sv: "LÄGG TILL", ro: "ADAUGĂ", ar: "إضافة" },
    ready: { es: "¡LISTO!", en: "READY!", fr: "PRÊT !", de: "FERTIG!", ru: "ГОТОВО!", uk: "ГОТОВО!", pl: "GOTOWE!", no: "KLAR!", sv: "KLAR!", ro: "GATA!", ar: "جاهز!" },
    ingredients: {
      "Extra Huevo": { es: "Extra Huevo", en: "Extra Egg", fr: "Œuf suppl.", de: "Extra Ei", ru: "Доп. яйцо", uk: "Дод. яйце", pl: "Dodatkowe jajko", no: "Ekstra egg", sv: "Extra ägg", ro: "Ou în plus", ar: "بيضة إضافية" },
      "Extra Carne y Queso": { es: "Extra Carne y Queso", en: "Extra Meat & Cheese", fr: "Viande & Fromage suppl.", de: "Extra Fleisch & Käse", ru: "Доп. мясо и сыр", uk: "Дод. m'ясо та сир", pl: "Dodatkowe mięso i ser", no: "Ekstra kjøtt og ost", sv: "Extra kött och ost", ro: "Carne și brânză în plus", ar: "لحم وجبن إضافي" },
      "Extra Tocino": { es: "Extra Tocino", en: "Extra Bacon", fr: "Bacon suppl.", de: "Extra Speck", ru: "Доп. бекон", uk: "Дод. бекон", pl: "Dodatkowy bekon", no: "Ekstra bacon", sv: "Extra bacon", ro: "Bacon în plus", ar: "لحm مقدد إضافي" },
      "Salsa Picante": { es: "Salsa Picante", en: "Hot Sauce", fr: "Sauce Piquante", de: "Scharfe Sauce", ru: "Острый соус", uk: "Гострий соус", pl: "Ostry sos", no: "Sterk saus", sv: "Stark sås", ro: "Sos iute", ar: "صلصة حارة" },
      "Tomate": { es: "Tomate", en: "Tomato", fr: "Tomate", de: "Tomate", ru: "Помидор", uk: "Помідор", pl: "Pomidor", no: "Tomat", sv: "Tomat", ro: "Roșie", ar: "طماطم" },
      "Lechuga": { es: "Lechuga", en: "Lettuce", fr: "Laitue", de: "Salat", ru: "Салат", uk: "Салат", pl: "Sałata", no: "Salat", sv: "Sallad", ro: "Salată", ar: "خس" },
      "Pepinillos": { es: "Pepinillos", en: "Pickles", fr: "Cornichons", de: "Gurken", ru: "Огурцы", uk: "Огірки", pl: "Ogórki", no: "Sylteagurk", sv: "Gurka", ro: "Castraveți murați", ar: "مخلل" },
      "Cebolla": { es: "Cebolla", en: "Onion", fr: "Oignon", de: "Zwiebel", ru: "Лук", uk: "Цибуля", pl: "Cebula", no: "Løk", sv: "Lök", ro: "Ceapă", ar: "بصل" },
      "Queso": { es: "Queso", en: "Cheese", fr: "Fromage", de: "Käse", ru: "Сыр", uk: "Сир", pl: "Ser", no: "Ost", sv: "Ost", ro: "Brânză", ar: "جبن" }
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

  // 6. ACTION D'AJOUT AU PANIER
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
      position: "relative", padding: "10px", border: "1px solid rgba(255, 215, 0, 0.2)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)", overflow: "hidden"
    }}>

    <div className="image-container" style={{ position: 'relative' }}>
      {/* INSERTION DU BADGE (TOP/NUEVO) */}
      {badge && <span className="badge-promo">{badge}</span>}

      <div className="price-badge-overlay">{totalPrice}€</div>
      <img
        src={image}
        alt={stableName}
        className="product-img"
        loading="lazy"
        width="600"
        height="336"
      />
    </div>

    <div className="card-content" style={{ padding: '5px' }}>
      <div className="info-box">
        <h3 className="card-title" translate="no">
          {stableName}
        </h3>
        <p className="card-description">
          {typeof description === 'object' ? (description[lang] || description['es']) : (description || "")}
        </p>
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

      <div className="card-footer" style={{ marginTop: 'auto', paddingBottom: '10px' }}>
        <button className={`add-btn-gold gold-button-premium ${isAdded ? 'success' : ''}`} onClick={handleAddClick}>
          {isAdded ? <span>{getT("ready")}</span> : (
            <>
              <span>{getT("add")}</span>
              <span>{totalPrice}€</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
