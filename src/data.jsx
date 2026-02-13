import italiana from "./assets/italiana.png";
import suiza from "./assets/suiza.png";
import francesa from "./assets/francesa.png";
import marroqi from "./assets/marroqi.png";
import espanola from "./assets/Espanola.png";
import inglesa from "./assets/inglesa.png";
import india from "./assets/india.png";
import vinoRojo from "./assets/Vino Rojo.png";
import aguaSanPellegrino from "./assets/Agua San Pellegrino.png";
import aquarius from "./assets/Aquarius.png";
import aquariusNaranja from "./assets/Aquarius naranja.png";
import cocaCola from "./assets/Coca-Cola Sabor Original.png";
import cocaZero from "./assets/Coca-Cola Zero.png";
import fantaLimon from "./assets/fanta-limon.png";
import fantaNaranja from "./assets/Fanta Naranja.png";
import sprite from "./assets/Sprite lata.png";
import agua from "./assets/Agua Sin Gas.png";
import fritas from "./assets/PatatasFritas.jpg";
import bravas from "./assets/bravas.jpg";
import gofre from "./assets/gofre.png";
import mahou from "./assets/mahou.jpg";
import colombiana from "./assets/colombiana.png";
import francesa1 from "./assets/francesa1.png";
import combo from "./assets/combo.png";
import nuggets from "./assets/nuggets.png";
import croquetas from "./assets/croquetas.png";
import combo3 from "./assets/combo3.png";
import mexicana from "./assets/mexicana.png";
import smash from "./assets/smash.png";
import cheddarbacon from "./assets/cheddarbacon.webp";

const data = [
  {
    id: "prod_combo1",
    image: combo,
    name: {
      es: "El COMBO 1", en: "COMBO 1", fr: "Le COMBO 1", no: "KOMBO 1", pl: "ZESTAW 1",
      uk: "КОМБО 1", ru: "КОМБО 1", ar: "كومبو 1", sv: "KOMBO 1", de: "KOMBO 1", ro: "COMBO 1"
    },
    description: {
      es: "La Inglesa + Patatas Fritas caseras + 3 Nuggets Caseros",
      en: "The English + Homemade Fries + 3 Homemade Nuggets",
      fr: "L'Anglaise + Frites Maison + 3 Nuggets Maison",
      no: "The English + Hjemmelaget pommes frites + 3 Nuggets",
      pl: "La Inglesa + Domowe frytki + 3 nuggetsy",
      uk: "The English + Домашня картопля фрі + 3 нагетси",
      ru: "The English + Домашний картофель фри + 3 наггетса",
      ar: "برجر إنجليزي + بطاطس مقلية + 3 ناجيتس",
      sv: "The English + Hemgjorda pommes frites + 3 Nuggets",
      de: "The English + Hausgemachte Pommes + 3 Nuggets",
      ro: "La Inglesa + Cartofi prăjiți + 3 Nuggets"
    },
    precio: "€18.00",
    category: "food"
  },
  {
    id: "prod_combo3",
    image: combo3,
    name: {
      es: "El COMBO 2", en: "COMBO 2", fr: "Le COMBO 2", no: "KOMBO 2", pl: "ZESTAW 2",
      uk: "КОМБО 2", ru: "КОМБО 2", ar: "كومبو 2", sv: "KOMBO 2", de: "KOMBO 2", ro: "COMBO 2"
    },
    description: {
      es: "La Inglesa + Patatas Fritas caseras + 3 Croquetas Caseras",
      en: "The English + Homemade Fries + 3 Homemade Croquettes",
      fr: "L'Anglaise + Frites Maison + 3 Croquettes Maison",
      no: "The English + Hjemmelaget pommes frites + 3 Kroketter",
      pl: "La Inglesa + Domowe frytki + 3 krokiety",
      uk: "The English + Домашня картопля фрі + 3 крокети",
      ru: "The English + Домашний картофель фри + 3 крокета",
      ar: "برجر إنجليزي + بطاطس مقلية + 3 كروكيت",
      sv: "The English + Hemgjorda pommes frites + 3 Kroketter",
      de: "The English + Hausgemachte Pommes + 3 Kroketten",
      ro: "La Inglesa + Cartofi prăjiți + 3 Crochete"
    },
    precio: "€18.00",
    category: "food"
  },
  {
    id: "prod_india",
    image: india,
    name: {
      es: "La India", en: "The India", fr: "L'Indienne", no: "La India", pl: "India",
      uk: "Індія", ru: "Индия", ar: "الهندية", sv: "Indien", de: "Die Indische", ro: "India"
    },
    description: {
      es: "Pollo Marinado con Especias, Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Marinated Chicken with Spices, Cheddar, Tomato, Onion, Lettuce, Pickles",
      fr: "Poulet Mariné aux Épices, Cheddar, Tomate, Oignon, Laitue, Cornichons",
      no: "Marinert kylling med krydder, Cheddar, tomat, løk, salat, sylteagurk",
      pl: "Marynowany kurczak z przyprawami, Cheddar, pomidor, cebula, sałata, ogórki",
      uk: "Маринована курка зі спеціями, чеддер, томат, цибуля, салат, огірки",
      ru: "Маринованная курица со специями, чеддер, томат, лук, салат, огурцы",
      ar: "دجاج متبل بالتوابل، تشيدر، طماطم، بصل، خس، مخلل",
      sv: "Marinerad kyckling med kryddor, Cheddar, tomat, lök, sallad, gurka",
      de: "Mariniertes Hähnchen mit Gewürzen, Cheddar, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Pui marinat cu condimente, Cheddar, roșii, ceapă, salată, murături"
    },
    precio: "€9.00",
    category: "food"
  },
  {
    id: "prod_francesa",
    image: francesa1,
    name: {
      es: "La Francesa", en: "The French", fr: "La Française", no: "Den Franske", pl: "Francuska",
      uk: "Французька", ru: "Французская", ar: "الفرنسية", sv: "Fransmannen", de: "Die Französische", ro: "Franceza"
    },
    description: {
      es: "Carne y Hierbas Provenciales, Reblochon, Purée de papa y tocino... Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Beef with Provencal Herbs, Reblochon Cheese, Mashed Potatoes and Bacon... Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf et Herbes de Provence, Reblochon, Purée de pomme de terre et bacon... Tomate, Oignon, Laitue, Cornichons",
      no: "Kjøtt med urter, Reblochon, potetmos og bacon... Tomat, løk, salat, sylteagurk",
      pl: "Wołowina z ziołami prowansalskimi, ser Reblochon, purée ziemniaczane i bekon... Pomidor, cebula, sałata, ogórki",
      uk: "Яловичина з прованськими травами, сир реблошон, картопляне пюре та бекон... Томат, цибуля, салат, огірки",
      ru: "Говядина с прованскими травами, сыр реблошон, картофельное пюре и бекон... Томат, лук, салат, огурцы",
      ar: "لحم وأعشاب بروفنسال، جبنة ريبلوشون، هريس البطاطس ولحم مقدد... طماطم، بصل، خس، مخلل",
      sv: "Nötkött med örter, Reblochon-ost, potatismos och bacon... Tomat, lök, sallad, gurka",
      de: "Rindfleisch mit Kräutern der Provence, Reblochon-Käse, Kartoffelstampf und Speck... Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită cu ierburi de Provence, brânză Reblochon, piure de cartofi și bacon... Roșii, ceapă, salată, murături"
    },
    precio: "€12.00",
    category: "food"
  },
  {
    id: "prod_inglesa",
    image: inglesa,
    name: {
      es: "La Inglesa", en: "The English", fr: "L'Anglaise", no: "Den Engelske", pl: "Angielska",
      uk: "Англійська", ru: "Английская", ar: "الإنجليزية", sv: "Engelsmannen", de: "Die Englische", ro: "Engleza"
    },
    description: {
      es: "Carne, Crema de Cheddar Casera y Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Beef, Homemade Cheddar Cream and Cheddar, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf, Crème de Cheddar Maison et Cheddar, Tomate, Oignon, Laitue, Cornichons",
      no: "Kjøtt, hjemmelaget cheddar-krem og cheddar, tomat, løk, salat, sylteagurk",
      pl: "Wołowina, domowy krem cheddar i cheddar, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина, домашній сирний соус чеддер, томат, цибуля, салат, огірки",
      ru: "Говядина, домашний сырный соус чеддер, томат, лук, салат, огурцы",
      ar: "لحم، كريمة تشيدر منزلية وتشيدر، طماطم، بصل، خس، مخلل",
      sv: "Nötkött, hemgjord cheddarkräm och cheddar, tomat, lök, sallad, gurka",
      de: "Rindfleisch, hausgemachte Cheddar-Creme und Cheddar, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită, cremă de Cheddar de casă și Cheddar, roșii, ceapă, salată, murături"
    },
    precio: "€10.00",
    category: "food"
  },
  {
    id: "prod_marroqi",
    image: marroqi,
    name: {
      es: "La Marroqui", en: "The Moroccan", fr: "La Marocaine", no: "Den Marokkanske", pl: "Marokańska",
      uk: "Марокканська", ru: "Марокканская", ar: "المغربية", sv: "Marockanen", de: "Die Marokkanische", ro: "Marocana"
    },
    description: {
      es: "Carne con Ajo, Perejil, Cebolla y Comino, Cheddar y crema de Cheddar Casera, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Beef with Garlic, Parsley, Onion and Cumin, Cheddar and Homemade Cheddar Cream, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf avec Ail, Persil, Oignon et Cumin, Cheddar et Crème de Cheddar Maison, Tomate, Oignon, Laitue, Cornichons",
      no: "Kjøtt med hvitløk, persille, løk og spisskummen, cheddar og hjemmelaget cheddar-krem, tomat, løk, salat, sylteagurk",
      pl: "Wołowina z czosnkiem, pietruszką, cebulą i kuminem, cheddar i domowy krem cheddar, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина з часником, петрушкою, цибулею та кумином, чеддер та домашній сирний соус, томат, цибуля, салат, огірки",
      ru: "Говядина с чесноком, петрушкой, луком и кумином, чеддер и домашний сырный соус, томат, лук, салат, огурцы",
      ar: "لحم بالثوم، بقدونس، بصل وكمون، تشيدر وكريمة تشيدر منزلية، طماطم، بصل، خس، مخلل",
      sv: "Nötkött med vitlök, persilja, lök och spiskummin, cheddar och hemgjord cheddarkräm, tomat, lök, sallad, gurka",
      de: "Rindfleisch mit Knoblauch, Petersilie, Zwiebeln und Kreuzkümmel, Cheddar und hausgemachte Cheddar-Creme, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită cu usturoi, pătrunjel, ceapă și chimion, Cheddar și cremă de Cheddar de casă, roșii, ceapă, salată, murături"
    },
    precio: "€12.00",
    category: "food"
  },
  {
    id: "prod_smash",
    image: smash,
    name: {
      es: "La Smash doble", en: "Double Smash", fr: "Double Smash", no: "Dobbel Smash", pl: "Double Smash",
      uk: "Подвійний Смеш", ru: "Двойной Смэш", ar: "سماش مزدوج", sv: "Dubbel Smash", de: "Doppelter Smash", ro: "Smash Dublu"
    },
    description: {
      es: "Carne doble, Bacon, Cheddar y crema de Cheddar Casera, Cebolla y Pepenillos",
      en: "Double Beef Patty, Bacon, Cheddar and Homemade Cheddar Cream, Onion and Pickles",
      fr: "Double Steak, Bacon, Cheddar et Crème de Cheddar Maison, Oignon et Cornichons",
      no: "Dobbel burger, bacon, cheddar og hjemmelaget cheddar-krem, løk og sylteagurk",
      pl: "Podwójna wołowina, bekon, cheddar i domowy krem cheddar, cebula i ogórki",
      uk: "Подвійна котлета, бекон, чеддер та домашній сирний соус, цибуля та огірки",
      ru: "Двойная котлета, бекон, чеддер и домашний сырный соус, лук и огурцы",
      ar: "لحم مزدوج، لحم مقدد، تشيدر وكريمة تشيدر منزلية، بصل ومخلل",
      sv: "Dubbelt nötkött, bacon, cheddar och hemgjord cheddarkräm, lök och gurka",
      de: "Doppeltes Rindfleisch, Speck, Cheddar und hausgemachte Cheddar-Creme, Zwiebeln und Gewürzgurken",
      ro: "Vită dublă, bacon, Cheddar și cremă de Cheddar de casă, ceapă și murături"
    },
    precio: "€13.00",
    category: "food"
  },
  {
    id: "prod_italiana",
    image: italiana,
    name: {
      es: "La Italiana", en: "The Italian", fr: "L'Italienne", no: "Den Italienske", pl: "Włoska",
      uk: "Італійська", ru: "Итальянская", ar: "الإيطالية", sv: "Italienaren", de: "Die Italienische", ro: "Italiana"
    },
    description: {
      es: "Carne y Tomillo, Mozza Burrata, Crema de Champiñon con Trufa, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Beef and Thyme, Mozza Burrata, Mushroom Cream with Truffle, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf et Thym, Mozza Burrata, Crème de Champignons à la Truffe, Tomate, Oignon, Laitue, Cornichons",
      no: "Kjøtt og timian, Mozza Burrata, soppkrem med trøffel, tomat, løk, salat, sylteagurk",
      pl: "Wołowina i tymianek, Mozza Burrata, krem pieczarkowy z truflą, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина з чебрецем, моцарела буррата, грибний соус з трюфелем, томат, цибуля, салат, огірки",
      ru: "Говядина с тимьяном, моцарелла буррата, грибной соус с трюфелем, томат, лук, салат, огурцы",
      ar: "لحم وزعتر، موزاريلا بوراتا، كريمة الفطر بالتروفل، طماطم، بصل، خس، مخلل",
      sv: "Nötkött och timjan, Mozza Burrata, svampkräm med tryffel, tomat, lök, sallad, gurka",
      de: "Rindfleisch und Thymian, Mozza Burrata, Pilzcreme mit Trüffel, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită și cimbru, Mozza Burrata, cremă de ciuperci cu trufe, roșii, ceapă, salată, murături"
    },
    precio: "€13.00",
    category: "food"
  },
  {
    id: "prod_suiza",
    image: suiza,
    name: {
      es: "La Auvergna", en: "The Auvergne", fr: "L'Auvergnate", no: "L'Auvergna", pl: "Auvergna",
      uk: "Овернь", ru: "Овернь", ar: "أوفرنيا", sv: "L'Auvergna", de: "Die Auvergner", ro: "Auvergna"
    },
    description: {
      es: "Ternera caramelizada con Panela, Salsa de queso Azul de Francia, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Caramelized Beef with Panela, French Blue Cheese Sauce, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf caramélisé à la Panela, Sauce au Bleu de France, Tomate, Oignon, Laitue, Cornichons",
      no: "Karamellisert biff med panela, fransk blåmuggostsaus, tomat, løk, salat, sylteagurk",
      pl: "Wołowina karmelizowana z panelą, francuski sos z niebieskiego sera, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина карамелізована з панелою, французький соус із блакитним сиром, томат, цибуля, салат, огірки",
      ru: "Говядина карамелизованная с панелой, французский соус с голубым сыром, томат, лук, салат, огурцы",
      ar: "لحم بقري مكرمل، صلصة الجبن الأزرق الفرنسي، طماطم، بصل، خس، مخلل",
      sv: "Karamelliserat nötkött med panela, fransk blåmögelostsås, tomat, lök, sallad, gurka",
      de: "Karamellisiertes Rindfleisch mit Panela, französische Blauschimmelkäse-Sauce, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită caramelizată cu panela, sos de brânză albastră franceză, roșii, ceapă, salată, murături"
    },
    precio: "€12.00",
    category: "food"
  },
  {
    id: "prod_espanola",
    image: espanola,
    name: {
      es: "La Española", en: "The Spanish", fr: "L'Espagnole", no: "Den Spanske", pl: "Hiszpańska",
      uk: "Іспанська", ru: "Испанская", ar: "الإسبانية", sv: "Spanjoren", de: "Die Spanische", ro: "Spaniola"
    },
    description: {
      es: "Carne con Pimiento de Padron, Cecina, Huevo Frito, Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Beef with Padrón Peppers, Cecina (Cured Meat), Fried Egg, Cheddar, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf avec Piment de Padrón, Cecina, Œuf au plat, Cheddar, Tomate, Oignon, Laitue, Cornichons",
      no: "Kjøtt med Padron-pepper, Cecina, stekt egg, cheddar, tomat, løk, salat, sylteagurk",
      pl: "Wołowina z papryczkami Padrón, Cecina, jajko sadzone, cheddar, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина з перцем падрон, сесіна (в'ялене м'ясо), яєчня, чеддер, томат, цибуля, салат, огірки",
      ru: "Говядина с перцем падрон, сесина (вяленое мясо), яичница, чеддер, томат, лук, салат, огурцы",
      ar: "لحم مع فلفل بادرون، لحم جاف، بيض مقلي، تشيدر، طماطم، بصل، خس، مخلل",
      sv: "Nötkött med Padron-peppar, Cecina, stekt ägg, cheddar, tomat, lök, sallad, gurka",
      de: "Rindfleisch mit Padrón-Paprika, Cecina (Trockenfleisch), Spiegelei, Cheddar, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită cu ardei Padron, Cecina, ou ochi, Cheddar, roșii, ceapă, salată, murături"
    },
    precio: "€14.00",
    category: "food"
  },
  {
    id: "prod_colombiana",
    image: colombiana,
    name: {
      es: "La Colombiana", en: "The Colombian", fr: "La Colombienne", no: "Den Colombianske", pl: "Kolumbijska",
      uk: "Колумбійська", ru: "Колумбийская", ar: "كولومبية", sv: "Colombianen", de: "Die Kolumbianische", ro: "Columbiana"
    },
    description: {
      es: "Carne con ajo, perejil, cebolla y comino, Tocino, Papa, Piña, Tomate, Cebolla, Lechuga, Pepenillos, Queso Cheddar",
      en: "Beef with Garlic, Parsley, Onion and Cumin, Bacon, Potato, Pineapple, Tomato, Onion, Lettuce, Pickles, Cheddar",
      fr: "Bœuf avec Ail, Persil, Oignon et Cumin, Bacon, Pomme de Terre, Ananas, Tomate, Oignon, Laitue, Cornichons, Cheddar",
      no: "Kjøtt med hvitløk, persille, løk og spisskummen, bacon, potet, ananas, tomat, løk, salat, sylteagurk, cheddar",
      pl: "Wołowina z czosnkiem, pietruszką, cebulą i kuminem, bekon, ziemniak, ananas, pomidor, cebula, sałata, ogórki, cheddar",
      uk: "Яловичина з часником, петрушкою, цибулею та кумином, бекон, картопля, ананас, томат, цибуля, салат, огірки, чеддер",
      ru: "Говядина с чесноком, петрушкой, луком и кумином, бекон, картофель, ананас, томат, лук, салат, огурцы, чеддер",
      ar: "لحم بالثوم، بقدونس، بصل وكمون، لحم مقدد، بطاطس، أناناس، طماطم، بصل، خس، مخلل، جبنة تشيدر",
      sv: "Nötkött med vitlök, persilja, lök och spiskummin, bacon, potatis, ananas, tomat, lök, sallad, gurka, cheddar",
      de: "Rindfleisch mit Knoblauch, Petersilie, Zwiebeln und Kreuzkümmel, Speck, Kartoffel, Ananas, Tomate, Zwiebel, Salat, Gewürzgurken, Cheddar",
      ro: "Vită cu usturoi, pătrunjel, ceapă și chimion, bacon, cartof, ananas, roșii, ceapă, salată, murături, Cheddar"
    },
    precio: "€14.00",
    category: "food"
  },
  {
    id: "prod_mexicana",
    image: mexicana,
    name: {
      es: "La Mexicana", en: "The Mexican", fr: "La Mexicaine", no: "Den Meksikanske", pl: "Meksykańska",
      uk: "Мексиканська", ru: "Мексиканская", ar: "المكسيكية", sv: "Mexikanen", de: "Die Mexikanische", ro: "Mexicana"
    },
    description: {
      es: "Carne, Salsa de Pimiento Picante Casera, Salsa de Maiz Casera, Cebolla Roja, Tocino, Tomate, Lechuga, Pepenillos, Queso Cheddar",
      en: "Beef, Homemade Hot Pepper Sauce, Homemade Corn Sauce, Red Onion, Bacon, Tomato, Lettuce, Pickles, Cheddar",
      fr: "Bœuf, Sauce Piment Maison, Sauce Maïs Maison, Oignon Rouge, Bacon, Tomate, Laitue, Cornichons, Cheddar",
      no: "Kjøtt, hjemmelaget chilisaus, hjemmelaget maissaus, rødløk, bacon, tomat, salat, sylteagurk, cheddar",
      pl: "Wołowina, domowy sos z ostrej papryki, domowy sos kukurydziany, czerwona cebula, bekon, pomidor, sałata, ogórki, cheddar",
      uk: "Яловичина, домашній гострий соус, домашній кукурудзяний соус, червона цибуля, бекон, томат, салат, огірки, чеддер",
      ru: "Говядина, домашний острый соус, домашний кукурузный соус, красный лук, бекон, томат, салат, огурцы, чеддер",
      ar: "لحم، صلصة الفلفل الحار المنزلية، صلصة الذرة المنزلية، بصل أحمر، لحم مقدد، طماطم، خس، مخلل، جبنة تشيدر",
      sv: "Nötkött, hemgjord stark paprikasås, hemgjord majssås, rödlök, bacon, tomat, sallad, gurka, cheddar",
      de: "Rindfleisch, hausgemachte scharfe Paprikasauce, hausgemachte Maissauce, rote Zwiebel, Speck, Tomate, Salat, Gewürzgurken, Cheddar",
      ro: "Vită, sos de ardei iute de casă, sos de porumb de casă, ceapă roșie, bacon, roșii, salată, murături, Cheddar"
    },
    precio: "€14.00",
    category: "food"
  },
  {
    id: "prod_nuggets",
    image: nuggets,
    name: {
      es: "Nuggets de Pollo", en: "Chicken Nuggets", fr: "Nuggets de Poulet", no: "Kyllingnuggets", pl: "Nuggetsy z kurczaka",
      uk: "Курячі нагетси", ru: "Куриные наггетса", ar: "ناجيتس دجاج", sv: "Kycklingnuggets", de: "Hähnchen-Nuggets", ro: "Nuggets de pui"
    },
    description: {
      es: "3 Nuggets Caseros", en: "3 Homemade Nuggets", fr: "3 Nuggets Maison", no: "3 hjemmelaget nuggets", pl: "3 domowe nuggetsy",
      uk: "3 домашні нагетси", ru: "3 домашних наггетса", ar: "3 قطع ناجيتس منزلية", sv: "3 hemgjorda nuggets", de: "3 hausgemachte Nuggets", ro: "3 Nuggets de casă"
    },
    precio: "€6.00",
    category: "food"
  },
  {
    id: "prod_croquetas",
    image: croquetas,
    name: {
      es: "Croquetas de Pollo", en: "Chicken Croquettes", fr: "Croquettes de Poulet", no: "Kyllingkroketter", pl: "Krokiety z kurczaka",
      uk: "Курячі крокети", ru: "Куриные крокеты", ar: "كروكيت دجاج", sv: "Kycklingkroketter", de: "Hähnchen-Kroketten", ro: "Crochete de pui"
    },
    description: {
      es: "3 Croquetas de Pollo con Cheddar", en: "3 Chicken Croquettes with Cheddar", fr: "3 Croquettes de Poulet au Cheddar", no: "3 kyllingkroketter med cheddar", pl: "3 krokiety z kurczaka z cheddarem",
      uk: "3 курячі крокети з чеддером", ru: "3 куриных крокета с чеддером", ar: "3 قطع كروكيت دجاج مع تشيدر", sv: "3 kycklingkroketter med cheddar", de: "3 Hähnchen-Kroketten mit Cheddar", ro: "3 Crochete de pui cu Cheddar"
    },
    precio: "€6.00",
    category: "food"
  },
  {
    id: "prod_fritas",
    image: fritas,
    name: {
      es: "Patatas Fritas", en: "French Fries", fr: "Frites", no: "Pommes frites", pl: "Frytki",
      uk: "Картопля фрі", ru: "Картофель фри", ar: "بطاطس مقلية", sv: "Pommes frites", de: "Pommes Frites", ro: "Cartofi prăjiți"
    },
    description: {
      es: "Papas fritas Caseras", en: "Homemade Fries", fr: "Frites Maison", no: "Hjemmelaget pommes frites", pl: "Domowe frytki",
      uk: "Домашня картопля фрі", ru: "Домашний картофель фри", ar: "بطاطس مقلية منزلية", sv: "Hemgjorda pommes frites", de: "Hausgemachte Pommes", ro: "Cartofi prăjiți de casă"
    },
    precio: "€4.50",
    category: "food"
  },
  {
    id: "prod_gofre",
    image: gofre,
    name: {
      es: "Waffle XXL", en: "Waffle XXL", fr: "Gaufre XXL", no: "Vaffel XXL", pl: "Gofry XXL",
      uk: "Вафлі XXL", ru: "Вафли XXL", ar: "وافل XXL", sv: "Våffla XXL", de: "Waffel XXL", ro: "Gofre XXL"
    },
    description: {
      es: "Waffle Casera con Nutella", en: "Homemade Waffle with Nutella", fr: "Gaufre Maison au Nutella", no: "Hjemmelaget vaffel med Nutella", pl: "Domowe gofry z Nutellą",
      uk: "Домашня вафля з Nutella", ru: "Домашняя вафля с Nutella", ar: "وافل منزلي مع نوتيلا", sv: "Hemgjord våffla med Nutella", de: "Hausgemachte Waffel mit Nutella", ro: "Gofre de casă cu Nutella"
    },
    precio: "€7.00",
    category: "postre"
  },
  {
    id: "prod_bravas",
    image: bravas,
    name: {
      es: "Patatas Bravas", en: "Patatas Bravas", fr: "Patatas Bravas", no: "Patatas Bravas", pl: "Patatas Bravas",
      uk: "Пататас Бравас", ru: "Пататас Бравас", ar: "باتاتاس برافاس", sv: "Patatas Bravas", de: "Patatas Bravas", ro: "Patatas Bravas"
    },
    description: {
      es: "Patatas Bravas Caseras con Salsa Brava de la Casa (Picante)",
      en: "Homemade Patatas Bravas with Homemade Spicy Sauce",
      fr: "Patatas Bravas Maison avec Sauce Spicy Maison (Piquant)",
      no: "Hjemmelaget Patatas Bravas med spicy saus",
      pl: "Domowe Patatas Bravas z ostrym sosem własnej roboty",
      uk: "Домашня пататас бравас із фірмовим гострим соусом",
      ru: "Домашний пататас бравас с фирменным острым соусом",
      ar: "باتاتاس برافاس منزلية مع صلصة برافا الحارة",
      sv: "Hemgjorda Patatas Bravas med husets starka sås",
      de: "Hausgemachte Patatas Bravas mit scharfer Haussauce",
      ro: "Patatas Bravas de casă cu sos iute artizanal"
    },
    precio: "€5.50",
    category: "food"
  },
  {
    id: "prod_cheddar-bacon",
    image: cheddarbacon,
    name: {
      es: "Patatas Cheddar y Bacon", en: "Cheddar and Bacon Fries", fr: "Frites Cheddar et Bacon", no: "Cheddar og bacon frites", pl: "Frytki z cheddarem i bekonem",
      uk: "Картопля з чеддером та беконом", ru: "Картофель с чеддером и беконом", ar: "بطاطس بالتشيدر ولحم مقدد", sv: "Pommes med cheddar och bacon", de: "Cheddar-Speck-Pommes", ro: "Cartofi cu Cheddar și Bacon"
    },
    description: {
      es: "Patatas Fritas Caseras con Salsa de Cheddar de la Casa y Bacon",
      en: "Homemade Fries with Homemade Cheddar Sauce and Bacon",
      fr: "Frites Maison avec Sauce Cheddar Maison et Bacon",
      no: "Hjemmelaget pommes frites med cheddarsaus og bacon",
      pl: "Domowe frytki z sosem cheddar własnej roboty i bekonem",
      uk: "Домашня картопля фрі з фірмовим сирним соусом та беконом",
      ru: "Домашний картофель фри с фирменным сырным соусом и беконом",
      ar: "بطاطس مقلية منزلية مع صلصة تشيدر ولحم مقدد",
      sv: "Hemgjorda pommes frites med cheddarsås och bacon",
      de: "Hausgemachte Pommes mit Cheddar-Sauce und Speck",
      ro: "Cartofi prăjiți de casă cu sos de Cheddar artizanal și bacon"
    },
    precio: "€8.50",
    category: "food"
  },
  {
    id: "prod_cocacola",
    image: cocaCola,
    name: { es: "Coca-Cola", en: "Coca-Cola", fr: "Coca-Cola", no: "Coca-Cola", pl: "Coca-Cola", uk: "Кока-Кола", ru: "Кока-Кола", ar: "كوكاكولا", sv: "Coca-Cola", de: "Coca-Cola", ro: "Coca-Cola" },
    description: { es: "Sabor Original Lata 330ml", en: "Original Taste Can 330ml", fr: "Goût Original Canette 330ml", no: "Original smak 330ml boks", pl: "Smak oryginalny puszka 330ml", uk: "Оригінальний смак 330мл", ru: "Оригинальный вкус 330мл", ar: "طعم أصلي علبة 330 مل", sv: "Originalsmak burk 330ml", de: "Originalgeschmack Dose 330ml", ro: "Gust Original Doză 330ml" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_cocazero",
    image: cocaZero,
    name: { es: "Coca-Cola Zero", en: "Coca-Cola Zero", fr: "Coca-Cola Zero", no: "Coca-Cola Zero", pl: "Coca-Cola Zero", uk: "Кока-Кола Зеро", ru: "Кока-Кола Зеро", ar: "كوكاكولا زيرو", sv: "Coca-Cola Zero", de: "Coca-Cola Zero", ro: "Coca-Cola Zero" },
    description: { es: "Zero Azúcar Lata 330ml", en: "Zero Sugar Can 330ml", fr: "Sans Sucres Canette 330ml", no: "Sukkerfri 330ml boks", pl: "Bez cukru puszka 330ml", uk: "Зеро цукру 330мл", ru: "Зеро сахара 330мл", ar: "بدون سكر علبة 330 مل", sv: "Sockerfri burk 330ml", de: "Zuckerfrei Dose 330ml", ro: "Zero Zahăr Doză 330ml" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_fantalimon",
    image: fantaLimon,
    name: { es: "Fanta Limón", en: "Lemon Fanta", fr: "Fanta Citron", no: "Fanta Sitron", pl: "Fanta Cytrynowa", uk: "Фанта Лимон", ru: "Фанта Лимон", ar: "فانتا ليمون", sv: "Fanta Citron", de: "Fanta Zitrone", ro: "Fanta Lămâie" },
    description: { es: "Fanta Limón Lata 330ml", en: "Lemon Fanta Can 330ml", fr: "Fanta Citron Canette 330ml", no: "Sitron 330ml boks", pl: "Puszka 330ml", uk: "330мл", ru: "330мл", ar: "علبة 330 مل", sv: "Burk 330ml", de: "Dose 330ml", ro: "Doză 330ml" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_fantanaranja",
    image: fantaNaranja,
    name: { es: "Fanta Naranja", en: "Orange Fanta", fr: "Fanta Orange", no: "Fanta Appelsin", pl: "Fanta Pomarańczowa", uk: "Фанта Апельсин", ru: "Фанта Апельсин", ar: "فانتا برتقال", sv: "Fanta Apelsin", de: "Fanta Orange", ro: "Fanta Portocale" },
    description: { es: "Fanta Naranja Lata 33cl", en: "Orange Fanta Can 33cl", fr: "Fanta Orange Canette 33cl", no: "Appelsin 33cl boks", pl: "Puszka 33cl", uk: "33cl", ru: "33cl", ar: "علبة 33 مل", sv: "Burk 33cl", de: "Dose 33cl", ro: "Doză 33cl" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_sprite",
    image: sprite,
    name: { es: "Sprite", en: "Sprite", fr: "Sprite", no: "Sprite", pl: "Sprite", uk: "Спрайт", ru: "Спрайт", ar: "سبرايت", sv: "Sprite", de: "Sprite", ro: "Sprite" },
    description: { es: "Sprite Lata 33cl", en: "Sprite Can 33cl", fr: "Sprite Canette 33cl", no: "33cl boks", pl: "Puszka 33cl", uk: "33cl", ru: "33cl", ar: "علبة 33 مل", sv: "Burk 33cl", de: "Dose 33cl", ro: "Doză 33cl" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_aquariuslimon",
    image: aquarius,
    name: { es: "Aquarius Limón", en: "Lemon Aquarius", fr: "Aquarius Citron", no: "Aquarius Sitron", pl: "Aquarius Cytrynowy", uk: "Акваріус Лимон", ru: "Аквариус Лимон", ar: "أكواريوس ليمون", sv: "Aquarius Citron", de: "Aquarius Zitrone", ro: "Aquarius Lămâie" },
    description: { es: "Aquarius 33cl.", en: "Aquarius 33cl.", fr: "Aquarius 33cl.", no: "33cl.", pl: "33cl.", uk: "33cl.", ru: "33cl.", ar: "33 مل", sv: "33cl.", de: "33cl.", ro: "33cl." },
    precio: "€2.80",
    category: "drink"
  },
  {
    id: "prod_aquariusnaranja",
    image: aquariusNaranja,
    name: { es: "Aquarius Naranja", en: "Orange Aquarius", fr: "Aquarius Orange", no: "Aquarius Appelsin", pl: "Aquarius Pomarańczowy", uk: "Акваріус Апельсин", ru: "Аквариус Апельсин", ar: "أكواريوس برتقال", sv: "Aquarius Apelsin", de: "Aquarius Orange", ro: "Aquarius Portocale" },
    description: { es: "Aquarius Naranja 33cl", en: "Orange Aquarius 33cl", fr: "Aquarius Orange 33cl", no: "33cl", pl: "33cl", uk: "33cl", ru: "33cl", ar: "33 مل", sv: "33cl", de: "33cl", ro: "33cl" },
    precio: "€2.80",
    category: "drink"
  },
  {
    id: "prod_sanpellegrino",
    image: aguaSanPellegrino,
    name: { es: "Agua con Gas", en: "Sparkling Water", fr: "Eau Pétillante", no: "Farris", pl: "Woda gazowana", uk: "Газована вода", ru: "Газированная вода", ar: "مياه فوارة", sv: "Kolsyrat vatten", de: "Sprudelwasser", ro: "Apă Minerală" },
    description: { es: "Agua con Gas 50cl", en: "Sparkling Water 50cl", fr: "Eau Pétillante 50cl", no: "50cl", pl: "50cl", uk: "50cl", ru: "50cl", ar: "50 مل", sv: "50cl", de: "50cl", ro: "50cl" },
    precio: "€3.00",
    category: "drink"
  },
  {
    id: "prod_aguasingas",
    image: agua,
    name: { es: "Agua Sin Gas", en: "Still Water", fr: "Eau Plate", no: "Vann", pl: "Woda niegazowana", uk: "Вода без газу", ru: "Вода без газа", ar: "مياه معدنية", sv: "Vatten", de: "Stillen Wasser", ro: "Apă Plată" },
    description: { es: "Agua mineral natural 50cl", en: "Natural Mineral Water 50cl", fr: "Eau minérale naturelle 50cl", no: "50cl", pl: "50cl", uk: "50cl", ru: "50cl", ar: "50 مل", sv: "50cl", de: "50cl", ro: "50cl" },
    precio: "€2.50",
    category: "drink"
  },
  {
    id: "prod_vinorojo",
    image: vinoRojo,
    name: { es: "Vino tinto", en: "Red Wine", fr: "Vin rouge", no: "Rødvin", pl: "Czerwone wino", uk: "Червоне вино", ru: "Красное вино", ar: "نبيذ أحمر", sv: "Rödvin", de: "Rotwein", ro: "Vin Roșu" },
    description: { es: "Botella de Vino Bullas 75cl", en: "Bullas Wine Bottle 75cl", fr: "Bouteille de vin Bullas 75cl", no: "Bullas flaske 75cl", pl: "Butelka wina Bullas 75cl", uk: "Пляшка вина Бульяс 75cl", ru: "Бутылка вина Бульяс 75cl", ar: "زجاجة نبيذ بوياس 75 مل", sv: "Flaska Bullas vin 75cl", de: "Flasche Bullas Wein 75cl", ro: "Sticlă de vin Bullas 75cl" },
    precio: "€15.00",
    category: "drink"
  },
  {
    id: "prod_mahou",
    image: mahou,
    name: { es: "Cerveza Mahou", en: "Mahou Beer", fr: "Bière Mahou", no: "Mahou øl", pl: "Piwo Mahou", uk: "Пиво Махоу", ru: "Пиво Махоу", ar: "بيرة ماهو", sv: "Mahou öl", de: "Mahou Bier", ro: "Bere Mahou" },
    description: { es: "Lata de cerveza 33cl", en: "Beer Can 33cl", fr: "Bière Canette 33cl", no: "33cl boks", pl: "Puszka piwa 33cl", uk: "Банка пива 33cl", ru: "Банка пива 33cl", ar: "علبة بيرة 33 مل", sv: "Ölburk 33cl", de: "Bierdose 33cl", ro: "Bere doză 33cl" },
    precio: "€2.80",
    category: "drink"
  }
];

export default data;
