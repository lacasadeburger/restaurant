import React, { useState, useMemo, useEffect } from "react";
import bgCard from "./assets/bg-c.jpg";

export default function CardMenu(props) {
  const { image, object, description, precio, addToCart, isDrinkCard, isPostreCard, lang, hasExtras } = props;

  const isEn = lang === 'en';
  const isFr = lang === 'fr';
  const isDe = lang === 'de';
  const isRu = lang === 'ru';

  const GOLD_GRADIENT = "linear-gradient(135deg, #BF953F 0%, #FCF6BA 45%, #B38728 55%, #FBF5B7 100%)";
  const GOLD_BRIGHT = "#FFD700";

  const t = {
    extra: isEn ? "Extras" : isFr ? "Suppléments" : isDe ? "Extras" : isRu ? "Добавки" : "Extras",
    remove: isEn ? "Remove" : isFr ? "Retirer" : isDe ? "Entfernen" : isRu ? "Убрать" : "Quitar",
    add: isEn ? "ADD" : isFr ? "AJOUTER" : isDe ? "HINZUFÜGEN" : isRu ? "ДОБАВИТЬ" : "AÑADIR",
    ready: isEn ? "READY!" : isFr ? "PRÊT !" : isDe ? "FERTIG!" : isRu ? "ГОТОВО!" : "¡LISTO!",
    ingredients: {
      "Extra Huevo": isEn ? "Extra Egg" : isFr ? "Œuf supplémentaire" : isDe ? "Zusätzliches Ei" : isRu ? "Доп. яйцо" : "Extra Huevo",
      "Extra Carne y Queso": isEn ? "Extra Meat & Cheese" : isFr ? "Viande & Fromage suppl." : isDe ? "Extra Fleisch & Käse" : isRu ? "Доп. мясо и сыр" : "Extra Carne y Queso",
      "Extra Tocino": isEn ? "Extra Bacon" : isFr ? "Bacon supplémentaire" : isDe ? "Extra Speck" : isRu ? "Доп. бекон" : "Extra Tocino",
      "Salsa Picante": isEn ? "Hot Sauce" : isFr ? "Sauce Piquante" : isDe ? "Scharfe Sauce" : isRu ? "Острый соус" : "Salsa Picante",
      "Tomate": isEn ? "Tomato" : isFr ? "Tomate" : isDe ? "Tomate" : isRu ? "Помидор" : "Tomate",
      "Lechuga": isEn ? "Lettuce" : isFr ? "Laitue" : isDe ? "Salat" : isRu ? "Салат" : "Lechuga",
      "Pepinillos": isEn ? "Pickles" : isFr ? "Cornichons" : isDe ? "Essiggurken" : isRu ? "Огурцы" : "Pepinillos",
      "Cebolla": isEn ? "Onion" : isFr ? "Oignon" : isDe ? "Zwiebeln" : isRu ? "Лук" : "Cebolla",
      "Queso": isEn ? "Cheese" : isFr ? "Fromage" : isDe ? "Käse" : isRu ? "Сыр" : "Queso",
      "Ajo": isEn ? "Garlic" : isFr ? "Ail" : isDe ? "Knoblauch" : isRu ? "Чеснок" : "Ajo",
      "Hierbas": isEn ? "Herbs" : isFr ? "Herbes" : isDe ? "Kräuter" : isRu ? "Зелень" : "Hierbas",
      "Especias": isEn ? "Spices" : isFr ? "Épices" : isDe ? "Gewürze" : isRu ? "Специи" : "Especias"
    },
    descriptions: {
      "El COMBO 1": isEn ? "The English Burger + Homemade Fries + 3 Homemade Nuggets" : isFr ? "Le Burger Anglais + Frites Maison + 3 Nuggets Maison" : isDe ? "Englischer Burger + Hausgemachte Pommes + 3 Hausgemachte Nuggets" : isRu ? "Английский бургер + Картофель фри + 3 наггетса" : "La Inglesa + Patatas Fritas caseras + 3 Nuggets Caseros",
      "El COMBO 2": isEn ? "The English Burger + Homemade Fries + 3 Homemade Croquettes" : isFr ? "Le Burger Anglais + Frites Maison + 3 Croquettes Maison" : isDe ? "Englischer Burger + Hausgemachte Pommes + 3 Hausgemachte Kroketten" : isRu ? "Английский бургер + Картофель фри + 3 крокета" : "La Inglesa + Patatas Fritas caseras + 3 Croquetas Caseras",
      " La India": isEn ? "Spiced Marinated Chicken, Cheddar, Tomato, Onion, Lettuce, Pickles" : isFr ? "Poulet mariné aux épices, Cheddar, Tomate, Oignon, Laitue, Cornichons" : isDe ? "Gewürztes Hähnchen, Cheddar, Tomate, Zwiebel, Salat, Essiggurken" : isRu ? "Курица со специями, чеддер, помидор, лук, салат, огурцы" : "Pollo Marinado con Especias, Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
      "La Francesa": isEn ? "Beef with Provencal Herbs, Reblochon Cheese, Potato Puree and Bacon... Tomato, Onion, Lettuce, Pickles" : isFr ? "Bœuf aux herbes de Provence, Reblochon, Purée et Bacon... Tomate, Oignon, Laitue, Cornichons" : isDe ? "Rindfleisch mit Kräutern, Reblochon, Kartoffelbrei und Speck... Tomate, Zwiebel, Salat, Essiggurken" : isRu ? "Говядина с травами, сыр реблошон, пюре и бекон... помидор, лук, салат, огурцы" : "Carne y Hierbas Provenciales, Reblochon, Purée de papa y tocino... Tomate, Cebolla, Lechuga, Pepenillos",
      "La Inglesa": isEn ? "Beef, Homemade Cheddar Cream and Cheddar, Tomato, Onion, Lettuce, Pickles" : isFr ? "Bœuf, Crème Cheddar Maison et Cheddar, Tomate, Oignon, Laitue, Cornichons" : isDe ? "Rindfleisch, Hausgemachte Cheddar-Creme, Tomate, Zwiebel, Salat, Essiggurken" : isRu ? "Говядина, крем-чеддер, помидор, лук, салат, огурцы" : "Carne, Crema de Cheddar Casera et Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
      "La Marroqui": isEn ? "Beef with Garlic, Parsley, Onion and Cumin, Cheddar and Homemade Cheddar Cream, Tomato, Onion, Lettuce, Pickles" : isFr ? "Bœuf à l'ail, Persil et Cumin, Cheddar et Crème Cheddar Maison, Tomate, Oignon, Laitue, Cornichons" : isDe ? "Rindfleisch mit Knoblauch, Petersilie, Cheddar-Creme, Tomate, Zwiebel, Salat, Essiggurken" : isRu ? "Говядина с чесноком, петрушкой и кумином, чеддер, помидор, лук, салат, огурцы" : "Carne con Ajo, Perejil, Cebolla y Comino, Cheddar y crema de Cheddar Casera, Tomate, Cebolla, Lechuga, Pepenillos",
      "La Smash doble": isEn ? "Double Beef, Bacon, Cheddar and Homemade Cheddar Cream, Onion and Pickles" : isFr ? "Double Bœuf, Bacon, Cheddar et Crème Cheddar Maison, Oignon et Cornichons" : isDe ? "Doppeltes Rindfleisch, Speck, Cheddar, Zwiebeln und Essiggurken" : isRu ? "Двойная говядина, бекон, чеддер, лук и огурцы" : "Carne doble, Bacon, Cheddar y crema de Cheddar Casera, Cebolla y Pepenillos",
      "La Italiana": isEn ? "Beef with Thyme, Burrata Mozzarella, Mushroom and Truffle Cream, Tomato, Onion, Lettuce, Pickles" : isFr ? "Bœuf au thym, Burrata, Crème Champignons & Truffe, Tomate, Oignon, Laitue, Cornichons" : isDe ? "Rindfleisch mit Thymian, Burrata, Pilz-Trüffel-Creme, Tomate, Zwiebel, Salat, Essiggurken" : isRu ? "Говядина с тимьяном, буррата, грибной крем с трюфелем, помидор, лук, салат, огурцы" : "Carne y Tomillo, Mozza Burrata, Crema de Champiñon con Trufa, Tomate, Cebolla, Lechuga, Pepenillos",
      "La Auvergna": isEn ? "Caramelized Beef with Panela, French Blue Cheese Sauce, Tomato, Onion, Lettuce, Pickles" : isFr ? "Bœuf caramélisé à la Panela, Sauce au Bleu de France, Tomate, Oignon, Laitue, Cornichons" : isDe ? "Rindfleisch mit Panela, Französische Blauschimmelkäse-Sauce, Tomate, Zwiebel, Salat, Essiggurken" : isRu ? "Говядина с панелой, соус из голубого сыра, помидор, лук, салат, огурцы" : "Ternera caramelizada con Panela, Salsa de queso Azul de Francia, Tomate, Cebolla, Lechuga, Pepenillos",
      "La Española": isEn ? "Beef with Padron Peppers, Cecina (Cured Beef), Fried Egg, Cheddar, Tomato, Onion, Lettuce, Pickles" : isFr ? "Bœuf aux Piments Padrón, Cecina, Œuf au plat, Cheddar, Tomate, Oignon, Laitue, Cornichons" : isDe ? "Rindfleisch mit Padron-Paprika, Cecina, Spiegelei, Cheddar, Tomate, Zwiebel, Salat, Essiggurken" : isRu ? "Говядина с перцем падрон, сесина, яйцо, чеддер, помидор, лук, салат, огурцы" : "Carne con Pimiento de Padron, Cecina, Huevo Frito, Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
      "La Colombiana": isEn ? "Beef with garlic, parsley, onion and cumin, Bacon, Potato, Pineapple, Tomato, Onion, Lettuce, Pickles, Cheddar" : isFr ? "Bœuf à l'ail et cumin, Bacon, Pomme de Terre, Ananas, Tomate, Oignon, Laitue, Cornichons, Cheddar" : isDe ? "Rindfleisch mit Knoblauch, Speck, Kartoffel, Ananas, Tomate, Zwiebel, Salat, Essiggurken, Cheddar" : isRu ? "Говядина с чесноком, бекон, картофель, ананас, помидор, лук, салат, огурцы, чеддер" : "Carne con ajo, perejil, cebolla y comino, Tocino,Papa, Piña, Tomate, Cebolla, Lechuga, Pepenillos, Queso Cheddar",
      "La Mexicana": isEn ? "Beef, Homemade Hot Pepper Sauce, Homemade Corn Sauce, Red Onion, Bacon, Tomato, Lettuce, Pickles, Cheddar" : isFr ? "Bœuf, Sauce Piment Maison, Sauce Maïs Maison, Oignon Rouge, Bacon, Tomate, Laitue, Cornichons, Cheddar" : isDe ? "Rindfleisch, Scharfe Sauce, Maissauce, Rote Zwiebel, Speck, Tomate, Salat, Essiggurken, Cheddar" : isRu ? "Говядина, острый соус, кукурузный соус, лук, бекон, помидор, салат, огурцы, чеддер" : "Carne, Salsa de Pimiento Picante Casera, Salsa de Maiz Casera, Cebolla Roja, Tocino, Tomate, Lechuga, Pepenillos, Queso Cheddar",
      "Nuggets de Pollo": isEn ? "3 Homemade Nuggets" : isFr ? "3 Nuggets Maison" : isDe ? "3 Hausgemachte Nuggets" : isRu ? "3 домашних наггетса" : "3 Nuggets Caseros",
      "Croquetas de Pollo": isEn ? "3 Chicken Croquettes with Cheddar" : isFr ? "3 Croquettes de Poulet au Cheddar" : isDe ? "3 Hähnchenkroketten mit Cheddar" : isRu ? "3 куриных крокета с чеддером" : "3 Croquetas de Pollo con Cheddar",
      "Patatas Fritas": isEn ? "Homemade French Fries" : isFr ? "Frites Maison" : isDe ? "Hausgemachte Pommes" : isRu ? "Картофель фри" : "Papas fritas Caseras",
      "Patatas Bravas": isEn ? "Homemade Potatoes with House Brava Sauce (Spicy)" : isFr ? "Pommes de Terre Maison avec Sauce Brava (Piquant)" : isDe ? "Hausgemachte Bratkartoffeln mit Brava-Sauce (Scharf)" : isRu ? "Картофель брава с острым соусом" : "Patatas Bravas Caseras con Salsa Brava de la Casa (Picante)",
      "Coca-Cola ": isEn ? "Original Taste Can 330ml" : isFr ? "Goût Original Cannette 330ml" : isDe ? "Originalgeschmack Dose 330ml" : isRu ? "Классическая кола 330мл" : "Sabor Original Lata 330ml",
      "Coca-Cola Zero ": isEn ? "Zero Sugar Can 330ml" : isFr ? "Zéro Sucre Cannette 330ml" : isDe ? "Zero Zucker Dose 330ml" : isRu ? "Кола Зеро 330мл" : "Zero Azúcar Lata 330ml",
      "Fanta Limón ": isEn ? "Lemon Fanta Can 330ml" : isFr ? "Fanta Citron 330ml" : isDe ? "Fanta Zitrone Dose 330ml" : isRu ? "Фанта Лимон 330мл" : "Fanta Limón Lata 330ml",
      "Fanta Naranja ": isEn ? "Orange Fanta Can 33cl" : isFr ? "Fanta Orange 33cl" : isDe ? "Fanta Orange Dose 33cl" : isRu ? "Фанта Апельсин 33cl" : "Fanta Naranja Lata 33cl",
      "Sprite ": isEn ? "Sprite Can 33cl" : isFr ? "Sprite 33cl" : isDe ? "Sprite Dose 33cl" : isRu ? "Спрайт 33cl" : "Sprite Lata 33cl",
      "Aquarius Limón": isEn ? "Aquarius 33cl" : isFr ? "Aquarius Citron 33cl" : isDe ? "Aquarius Zitrone 33cl" : isRu ? "Аквариус Лимон 33cl" : "Aquarius 33cl.",
      "Aquarius Naranja": isEn ? "Orange Aquarius 33cl" : isFr ? "Aquarius Orange 33cl" : isDe ? "Aquarius Orange 33cl" : isRu ? "Аквариус Апельсин 33cl" : "Aquarius Naranja 33cl",
      "Agua ": isEn ? "Sparkling Water 50cl" : isFr ? "Eau Gazeuse 50cl" : isDe ? "Sprudelwasser 50cl" : isRu ? "Газированная вода 50cl" : "Agua con Gas 50cl",
      "Agua Sin Gas 50cl": isEn ? "Natural Mineral Water" : isFr ? "Eau Minérale Naturelle" : isDe ? "Stilles Mineralwasser" : isRu ? "Минеральная вода" : "Agua mineral natural",
      "Vino tinto": isEn ? "Red Wine Bottle Bullas 75cl" : isFr ? "Bouteille de Vin Rouge Bullas 75cl" : isDe ? "Rotwein Bullas 75cl" : isRu ? "Бутылка красного вина Bullas 75cl" : "Botella de Vino Bullas 75cl",
      "Waffle": isEn ? "Waffle with Nutella" : isFr ? "Gaufre au Nutella" : isDe ? "Waffel mit Nutella" : isRu ? "Вафля с Нутеллой" : "Waffle con Nutella",
      "Cerveza Mahou Clasica": isEn ? "Beer can 33cl" : isFr ? "Bière cannette 33cl" : isDe ? "Bier Dose 33cl" : isRu ? "Пиво 33cl" : "Lata de cerveza 33cl"
    }
  };

  const displayDescription = t.descriptions[object] || description;

  const extrasList = [
    { id: "Extra Huevo", name: t.ingredients["Extra Huevo"], price: 1.00 },
    { id: "Extra Carne y Queso", name: t.ingredients["Extra Carne y Queso"], price: 4.50 },
    { id: "Extra Tocino", name: t.ingredients["Extra Tocino"], price: 1.00 },
    { id: "Salsa Picante", name: t.ingredients["Salsa Picante"], price: 0.50 }
  ];

  const removableList = [
    { id: "Tomate", name: t.ingredients["Tomate"] },
    { id: "Lechuga", name: t.ingredients["Lechuga"] },
    { id: "Pepinillos", name: t.ingredients["Pepinillos"] },
    { id: "Cebolla", name: t.ingredients["Cebolla"] },
    { id: "Queso", name: t.ingredients["Queso"] },
    { id: "Ajo", name: t.ingredients["Ajo"] },
    { id: "Hierbas", name: t.ingredients["Hierbas"] },
    { id: "Especias", name: t.ingredients["Especias"] }
  ];

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
        ? `${object} (+${extraIngredients.map(id => t.ingredients[id]).join(", ")})`
        : object,
      removed: removedIngredients.map(id => t.ingredients[id])
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
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      height: "auto", /* MODIFIÉ : laisse la carte s'adapter */
      minHeight: "350px", /* Optionnel : base minimum */
      position: "relative",
      padding: "10px",
      border: "1px solid rgba(255, 215, 0, 0.2)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      overflow: "hidden"
    }}>
      <style>{`
        .image-container { width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-img { width: 80%; height: 80%; object-fit: contain; z-index: 2; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5)); }

        .price-badge-overlay {
          position: absolute; top: 10px; right: 10px; background: #ff4757 !important; color: white !important;
          padding: 5px 12px; border-radius: 6px; font-weight: 950; font-size: 1.3rem;
          z-index: 10; border: 2.5px solid ${GOLD_BRIGHT} !important; box-shadow: 3px 3px 0px #000;
          transform: rotate(5deg);
        }

        .card-content { padding: 5px; display: flex; flex-direction: column; gap: 10px; flex-grow: 0; }

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
        .add-btn-gold:active { transform: translateY(2px); box-shadow: 0 2px 0px #8A6D3B; }
        .add-btn-gold.success { background: #2ed573 !important; color: white !important; box-shadow: 0 4px 0px #1d914d; justify-content: center; }
        .price-tag-inside { background: rgba(0,0,0,0.1); padding: 2px 8px; border-radius: 4px; font-size: 0.9rem; border-left: 1px solid rgba(0,0,0,0.1); }
      `}</style>

      <div className="image-container">
        <div className="price-badge-overlay">{totalPrice}€</div>
        <img
          src={image}
          alt={`${object} - La Casa de Burger Torrevieja`}
          className="product-img"
          loading="lazy"
        />
      </div>

      <div className="card-content">
        <div className="info-box">
          <h3 className="card-title" translate="no">{object}</h3>
          <p className="card-description">{displayDescription}</p>
        </div>

        {!isDrinkCard && !isPostreCard && hasExtras && (
          <div className="options-box">
            <span className="option-group-label">{t.extra}</span>
            <div className="chips-container">
              {extrasList.map(item => (
                <button
                  key={item.id}
                  type="button"
                  translate="no"
                  className={`chip ${extraIngredients.includes(item.id) ? 'active' : ''}`}
                  onClick={() => toggleExtra(item.id)}
                >
                  +{item.price.toFixed(2)} {item.name}
                </button>
              ))}
            </div>
            <span className="option-group-label">{t.remove}</span>
            <div className="chips-container">
              {removableList.map(ing => (
                <button
                  key={ing.id}
                  type="button"
                  translate="no"
                  className={`chip remove ${removedIngredients.includes(ing.id) ? 'active' : ''}`}
                  onClick={() => toggleRemove(ing.id)}
                >
                  {ing.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-footer">
        <button className={`add-btn-gold ${isAdded ? 'success' : ''}`} onClick={handleAddClick} translate="no">
          {isAdded ? <span>{t.ready}</span> : (
            <>
              <span>{t.add}</span>
              <span className="price-tag-inside">{totalPrice}€</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
