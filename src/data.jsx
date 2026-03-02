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
import combo from "./assets/combo.webp";
import nuggets from "./assets/nuggets.png";
import croquetas from "./assets/croquetas.webp";
import combo3 from "./assets/Combo3.webp";
import mexicana from "./assets/mexicana.png";
import smash from "./assets/smash.png";
import cheddarbacon from "./assets/cheddarbacon.webp";


const data = [
  {
    id: "prod_combo1",
    image: combo,
    badge: "BEST SELLER",
    name: { es: "Combo de Autor 1", en: "Signature Combo 1", fr: "Combo Signature 1", nl: "Handtekening Combo 1", no: "Signature Kombo 1", pl: "Zestaw Signature 1", uk: "КОМБО 1", ru: "КОМБО 1", ar: "كومبو 1", sv: "Signature Kombo 1", de: "Signature Kombo 1", ro: "Combo Signature 1" },
    description: {
      es: "La Inglesa (Signature) + Patatas Fritas caseras + 3 Nuggets Artesanales",
      en: "The English (Signature) + Homemade Fries + 3 Artisanal Nuggets",
      fr: "L'Anglaise (Signature) + Frites Maison + 3 Nuggets Artisanaux",
      nl: "De Engelse (Handtekening) + Huisgemaakte Frieten + 3 Ambachtelijke Nuggets",
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
    badge: "BEST SELLER",
    name: { es: "Combo de Autor 2", en: "Signature Combo 2", fr: "Combo Signature 2", nl: "Handtekening Combo 2", no: "Signature Kombo 2", pl: "Zestaw Signature 2", uk: "КОМБО 2", ru: "КОМБО 2", ar: "كومبو 2", sv: "Signature Kombo 2", de: "Signature Kombo 2", ro: "Combo Signature 2" },
    description: {
      es: "La Inglesa (Signature) + Patatas Fritas caseras + 3 Croquetas Caseras",
      en: "The English (Signature) + Homemade Fries + 3 Homemade Croquettes",
      fr: "L'Anglaise (Signature) + Frites Maison + 3 Croquettes Maison",
      nl: "De Engelse (Handtekening) + Huisgemaakte Frieten + 3 Huisgemaakte Krokketten",
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
    name: { es: "La India Gourmet", en: "The India Gourmet", fr: "L'Indienne Gourmet", nl: "De Indiase Gourmet", no: "La India", pl: "India", uk: "Індія", ru: "Индия", ar: "الهندية", sv: "Indien", de: "Die Indische", ro: "India" },
    description: {
      es: "Pollo Marinado con Especias Orientales, Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Marinated Chicken with Oriental Spices, Cheddar, Tomato, Onion, Lettuce, Pickles",
      fr: "Poulet Mariné aux Épices Orientales, Cheddar, Tomate, Oignon, Laitue, Cornichons",
      nl: "Gemarineerde Kip met Oosterse Kruiden, Cheddar, Tomaat, Ui, Sla, Augurken",
      no: "Marinert kylling, Cheddar, tomat, løk, salat, sylteagurk",
      pl: "Marynowany kurczak, Cheddar, pomidor, cebula, sałata, ogórki",
      uk: "Маринована курка, чеддер, томат, цибуля, салат, огірки",
      ru: "Маринованная курица, чеддер, томат, лук, салат, огурцы",
      ar: "دجاج متبل، تشيدر، طماطم، بصل، خس، مخلل",
      sv: "Marinerad kyckling, Cheddar, tomat, lök, sallad, gurka",
      de: "Mariniertes Hähnchen, Cheddar, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Pui marinat, Cheddar, roșii, ceapă, salată, murături"
    },
    precio: "€9.00",
    category: "food"
  },
  {
    id: "prod_francesa",
    image: francesa1,
    badge: "SIGNATURE",
    name: { es: "La Francesa Insignia", en: "The French Signature", fr: "La Française Signature", nl: "De Franse Signature", no: "Den Franske", pl: "Francuska", uk: "Французька", ru: "Французская", ar: "الفرنسية", sv: "Fransmannen", de: "Die Französische", ro: "Franceza" },
    description: {
      es: "Carne Premium, Hierbas Provenciales, Queso Reblochon, Purée de papa y tocino, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Premium Beef, Provencal Herbs, Reblochon Cheese, Mashed Potatoes and Bacon, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf Premium, Herbes de Provence, Reblochon, Purée de pomme de terre et bacon, Tomate, Oignon, Laitue, Cornichons",
      nl: "Premium Rundvlees, Provençaalse Kruiden, Reblochon Kaas, Aardappelpuree en Bacon, Tomaat, Ui, Sla, Augurken",
      no: "Kjøtt, urter, Reblochon, potetmos og bacon, Tomat, løk, salat, sylteagurk",
      pl: "Wołowina, zioła prowansalskie, ser Reblochon, purée i bekon, Pomidor, cebula, sałata, ogórki",
      uk: "Яловичина, прованські трави, сир реблошон, пюре та бекон, Томат, цибуля, салат, огірки",
      ru: "Говядина, прованские травы, сыр реблошон, пюре и бекон, Томат, лук, салат, огурцы",
      ar: "لحم، أعشاب، جبنة ريبلوشون، هريس البطاطس ولحم مقدد، طماطم، بصل، خس، مخلل",
      sv: "Nötkött, örter, Reblochon, potatismos och bacon, Tomat, lök, sallad, gurka",
      de: "Rindfleisch, Kräuter, Reblochon, Kartoffelstampf und Speck, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită, ierburi, brânză Reblochon, piure și bacon, Roșii, ceapă, salată, murături"
    },
    precio: "€12.00",
    category: "food"
  },
  {
    id: "prod_inglesa",
    image: inglesa,
    name: { es: "La Inglesa Classic", en: "The English Classic", fr: "L'Anglaise Classic", nl: "De Engelse Classic", no: "Den Engelske", pl: "Angielska", uk: "Англійська", ru: "Английская", ar: "الإنجليزية", sv: "Engelsmannen", de: "Die Englische", ro: "Engleza" },
    description: {
      es: "Carne Premium, Crema de Cheddar Casera, Cheddar fundido, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Premium Beef, Homemade Cheddar Cream, Melted Cheddar, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf Premium, Crème de Cheddar Maison, Cheddar Fondu, Tomate, Oignon, Laitue, Cornichons",
      nl: "Premium Rundvlees, Huisgemaakte Cheddar Crème, Gesmolten Cheddar, Tomaat, Ui, Sla, Augurken",
      no: "Kjøtt, cheddar-krem, cheddar, tomat, løk, salat, sylteagurk",
      pl: "Wołowina, krem cheddar, cheddar, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина, сирний соус чеддер, томат, цибуля, салат, огірки",
      ru: "Говядина, сырный соус чеддер, томат, лук, салат, огурцы",
      ar: "لحم، كريمة تشيدر، تشيدر، طماطم، بصل، خس، مخلل",
      sv: "Nötkött, cheddarkräm, cheddar, tomat, lök, sallad, gurka",
      de: "Rindfleisch, Cheddar-Creme, Cheddar, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită, cremă de Cheddar, Cheddar, roșii, ceapă, salată, murături"
    },
    precio: "€10.00",
    category: "food"
  },
  {
    id: "prod_marroqi",
    image: marroqi,
    badge: "AUTHENTIC",
    name: { es: "La Marroqui Autor", en: "The Moroccan Signature", fr: "La Marocaine Signature", nl: "De Marokkaanse Signature", no: "Den Marokkanske", pl: "Marokańska", uk: "Марокканська", ru: "Марокканская", ar: "المغربية", sv: "Marockanen", de: "Die Marokkanische", ro: "Marocana" },
    description: {
      es: "Carne Especiada (Ajo, Perejil, Comino), Cheddar, Crema de Cheddar Casera, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Spiced Beef (Garlic, Parsley, Cumin), Cheddar, Homemade Cheddar Cream, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf Épicé (Ail, Persil, Cumin), Cheddar, Crème de Cheddar Maison, Tomate, Oignon, Laitue, Cornichons",
      nl: "Gekruid Rundvlees (Knoflook, Peterselie, Komijn), Cheddar, Huisgemaakte Cheddar Crème, Tomaat, Ui, Sla, Augurken",
      no: "Kjøtt med krydder, cheddar, cheddar-krem, tomat, løk, salat, sylteagurk",
      pl: "Wołowina z przyprawami, cheddar, krem cheddar, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина зі спеціями, чеддер, сирний соус, томат, цибуля, салат, огірки",
      ru: "Говядина со специями, чеддер, сырный соус, томат, лук, салат, огурцы",
      ar: "لحم بالتوابل، تشيدر، كريمة تشيدر، طماطم، بصل، خس، مخلل",
      sv: "Nötkött med kryddor, cheddar, cheddarkräm, tomat, lök, sallad, gurka",
      de: "Rindfleisch mit Gewürzen, Cheddar, Cheddar-Creme, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită cu condimente, Cheddar, cremă de Cheddar, roșii, ceapă, salată, murături"
    },
    precio: "€12.00",
    category: "food"
  },
  {
    id: "prod_smash",
    image: smash,
    badge: "TRENDING",
    name: { es: "La Smash Doble", en: "Double Smash Burger", fr: "Double Smash Burger", nl: "Double Smash Burger", no: "Dobbel Smash", pl: "Double Smash", uk: "Подвійний Смеш", ru: "Двойной Смэш", ar: "سماش مزدوج", sv: "Dubbel Smash", de: "Doppelter Smash", ro: "Smash Dublu" },
    description: {
      es: "Doble Carne Smash Premium, Bacon, Cheddar fundido, nuestra Crema de Cheddar Casera, Cebolla y Pepenillos",
      en: "Double Premium Smash Beef, Bacon, Melted Cheddar, our Homemade Cheddar Cream, Onion and Pickles",
      fr: "Double Bœuf Smash Premium, Bacon, Cheddar fondu, notre Crème de Cheddar Maison, Oignon et Cornichons",
      nl: "Dubbel Premium Smash Rundvlees, Bacon, Gesmolten Cheddar, onze Huisgemaakte Cheddar Crème, Ui en Augurken",
      no: "Dobbel burger, bacon, cheddar, cheddar-krem, løk og sylteagurk",
      pl: "Podwójna wołowina, bekon, cheddar, krem cheddar, cebula i ogórki",
      uk: "Подвійна котлета, бекон, чеддер, сирний соус, цибуля та огірки",
      ru: "Двойная котлета, бекон, чеддер, сирный соус, лук и огурцы",
      ar: "لحم مزدوج، لحم مقدد، تشيدر، كريمة تشيدر، بصل ومخلل",
      sv: "Dubbelt nötkött, bacon, cheddar, cheddarkräm, lök och gurka",
      de: "Doppeltes Rindfleisch, Speck, Cheddar, Cheddar-Creme, Zwiebeln und Gewürzgurken",
      ro: "Vită dublă, bacon, Cheddar, cremă de Cheddar, ceapă și murături"
    },
    precio: "€13.00",
    category: "food"
  },
  {
    id: "prod_italiana",
    image: italiana,
    badge: "DELUXE",
    name: { es: "La Italiana Gourmet", en: "The Italian Gourmet", fr: "L'Italienne Gourmet", nl: "De Italiaanse Gourmet", no: "Den Italienske", pl: "Włoska", uk: "Італійська", ru: "Итальянская", ar: "الإيطالية", sv: "Italienaren", de: "Die Italienische", ro: "Italiana" },
    description: {
      es: "Carne al Tomillo, Mozza Burrata, Crema de Champiñones con Trufa Negra, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Thyme Beef, Mozza Burrata, Mushroom and Black Truffle Cream, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf au Thym, Mozza Burrata, Crème de Champignons et Truffe Noire, Tomate, Oignon, Laitue, Cornichons",
      nl: "Rundvlees met Tijm, Mozza Burrata, Champignon- en Zwarte Truffelcrème, Tomaat, Ui, Sla, Augurken",
      no: "Kjøtt, Mozza Burrata, soppkrem med trøffel, tomat, løk, salat, sylteagurk",
      pl: "Wołowina, Mozza Burrata, krem pieczarkowy z truflą, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина, моцарела буррата, грибний соус з трюфелем, томат, цибуля, салат, огірки",
      ru: "Говядина, моцарелла буррата, грибной соус с трюфелем, томат, лук, салат, огурцы",
      ar: "لحم، موزاريلا بوراتا، كريمة الفطر بالتروفل, طماطم، بصل، خس، مخلل",
      sv: "Nötkött, Mozza Burrata, svampkräm med tryffel, tomat, lök, sallad, gurka",
      de: "Rindfleisch, Mozza Burrata, Pilzcreme mit Trüffel, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită, Mozza Burrata, cremă de ciuperci cu trufe, roșii, ceapă, salată, murături"
    },
    precio: "€13.00",
    category: "food"
  },
  {
    id: "prod_suiza",
    image: suiza,
    name: { es: "La Auvergna de la Casa", en: "The Auvergne Signature", fr: "L'Auvergnate Signature", nl: "De Auvergne Signature", no: "L'Auvergna", pl: "Auvergna", uk: "Овернь", ru: "Овернь", ar: "أوفرنيا", sv: "L'Auvergna", de: "Die Auvergner", ro: "Auvergna" },
    description: {
      es: "Ternera caramelizada con Panela, Salsa Gourmet de Queso Azul de Francia, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Caramelized Beef with Panela, Gourmet French Blue Cheese Sauce, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf caramélisé à la Panela, Sauce Gourmet au Bleu de France, Tomate, Oignon, Laitue, Cornichons",
      nl: "Gekaramelliseerd Rundvlees met Panela, Gourmet Franse Blauwe Kaassaus, Tomaat, Ui, Sla, Augurken",
      no: "Karamellisert biff, fransk blåmuggostsaus, tomat, løk, salat, sylteagurk",
      pl: "Wołowina karmelizowana, francuski sos z niebieskiego sera, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина карамелізована, французький соус із блакитним сиром, томат, цибуля, салат, огірки",
      ru: "Говядина карамелизованная, французский соус с голубым сыром, томат, лук, салат, огурцы",
      ar: "لحم بقري مكرمل، صلصة الجبن الأزرق الفرنسي، طماطم، بصل، خس، مخلل",
      sv: "Karamelliserat nötkött, fransk blåmögelostsås, tomat, lök, sallad, gurka",
      de: "Karamellisiertes Rindfleisch, französische Blauschimmelkäse-Sauce, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită caramelizată, sos de brânză albastră franceză, roșii, ceapă, salată, murături"
    },
    precio: "€12.00",
    category: "food"
  },
  {
    id: "prod_espanola",
    image: espanola,
    badge: "TOP SELLER",
    name: { es: "La Española Auténtica", en: "The Spanish Signature", fr: "L'Espagnole Signature", nl: "De Spaanse Signature", no: "Den Spanske", pl: "Hiszpańska", uk: "Іспанська", ru: "Испанская", ar: "الإسبانية", sv: "Spanjoren", de: "Die Spanische", ro: "Spaniola" },
    description: {
      es: "Carne Premium, Pimiento de Padrón, Cecina, Huevo Frito de corral, Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Premium Beef, Padrón Peppers, Cecina, Free-range Fried Egg, Cheddar, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf Premium, Piment de Padrón, Cecina, Œuf au plat fermier, Cheddar, Tomate, Oignon, Laitue, Cornichons",
      nl: "Premium Rundvlees, Padrón Peppers, Cecina, Scharrelei, Cheddar, Tomaat, Ui, Sla, Augurken",
      no: "Kjøtt, Padron-pepper, Cecina, stekt egg, cheddar, tomat, løk, salat, sylteagurk",
      pl: "Wołowina, papryczki Padrón, Cecina, jajko sadzone, cheddar, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина, перець падрон, сесіна, яєчня, чеддер, томат, цибуля, салат, огірки",
      ru: "Говядина, перец падрон, сесина, яичница, чеддер, томат, лук, салат, огурцы",
      ar: "لحم، فلفل بادرون، لحم جاف، بيض مقلي، تشيدر، طماطم، بصل، خس، مخلل",
      sv: "Nötkött, Padron-peppar, Cecina, stekt ägg, cheddar, tomat, lök, sallad, gurka",
      de: "Rindfleisch, Padrón-Paprika, Cecina, Spiegelei, Cheddar, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită, ardei Padron, Cecina, ou ochi, Cheddar, roșii, ceapă, salată, murături"
    },
    precio: "€14.00",
    category: "food"
  },
  {
    id: "prod_colombiana",
    image: colombiana,
    badge: "TOP SELLER",
    name: { es: "La Colombiana Auténtica", en: "The Colombian Signature", fr: "La Colombienne Signature", nl: "De Colombiaanse Signature", no: "Den Colombianske", pl: "Kolumbijska", uk: "Колумбійська", ru: "Колумбийская", ar: "كولومبية", sv: "Colombianen", de: "Die Kolumbianische", ro: "Columbiana" },
    description: {
      es: "Receta de la casa: Carne especiada, Tocino, Papa, Piña natural, Tomate, Cebolla, Lechuga, Pepenillos, Cheddar y crema de cheddar",
      en: "House Recipe: Spiced Beef, Bacon, Potato, Fresh Pineapple, Tomato, Onion, Lettuce, Pickles, Double Cheddar",
      fr: "Recette Maison : Bœuf épicé, Bacon, Pomme de Terre, Ananas frais, Tomate, Oignon, Laitue, Cornichons, Double Cheddar",
      nl: "Huisrecept: Gekruid Rundvlees, Spek, Aardappel, Verse Ananas, Tomaat, Ui, Sla, Augurken, Dubbele Cheddar",
      no: "Kjøtt, bacon, potet, ananas, tomat, løk, salat, sylteagurk, cheddar",
      pl: "Wołowina, bekon, ziemniak, ananas, pomidor, cebula, sałata, ogórki, cheddar",
      uk: "Яловичина, бекон, картопля, ананас, томат, цибуля, салат, огірки, чеддер",
      ru: "Говядина, бекон, картофель, ананас, томат, лук, салат, огурцы, чеддер",
      ar: "لحم، لحم مقدد، بطاطس، أناناس، طماطم، بصل، خس، مخلل، جبنة تشيدر",
      sv: "Nötkött, bacon, potatis, ananas, tomat, lök, sallad, gurka, cheddar",
      de: "Rindfleisch, Speck, Kartoffel, Ananas, Tomate, Zwiebel, Salat, Gewürzgurken, Cheddar",
      ro: "Vită, bacon, cartof, ananas, roșii, ceapă, salată, murături, Cheddar"
    },
    precio: "€14.00",
    category: "food"
  },
  {
    id: "prod_mexicana",
    image: mexicana,
    badge: "NUEVO",
    name: { es: "La Mexicana Artesanal", en: "The Mexican Signature", fr: "La Mexicaine Signature", nl: "De Mexicaanse Signature", no: "Den Meksikanske", pl: "Meksykańska", uk: "Мексиканська", ru: "Мексиканская", ar: "المكسيكية", sv: "Mexikanen", de: "Die Mexikanische", ro: "Mexicana" },
    description: {
      es: "Carne Premium, Salsa de Pimiento Picante Casera, Crema de Maiz Artesanal, Tocino y Cheddar fundido, Tomate, Cebolla, Lechuga, Pepenillos",
      en: "Premium Beef, Homemade Hot Pepper Sauce, Artisanal Corn Cream, Bacon and Melted Cheddar, Tomato, Onion, Lettuce, Pickles",
      fr: "Bœuf Premium, Sauce Piment Maison, Crème de Maïs Artisanale, Bacon et Cheddar Fondu, Tomate, Oignon, Laitue, Cornichons",
      nl: "Premium Rundvlees, Huisgemaakte Hete Pepersaus, Ambachtelijke Maiscrème, Spek en Gesmolten Cheddar, Tomaat, Ui, Sla, Augurken",
      no: "Kjøtt, chilisaus, maissaus, bacon, cheddar, tomat, løk, salat, sylteagurk",
      pl: "Wołowina, sos z papryki, sos kukurydziany, bekon, cheddar, pomidor, cebula, sałata, ogórki",
      uk: "Яловичина, гострий соус, кукурудзяний соус, бекон, чеддер, томат, цибуля, салат, огірки",
      ru: "Говядина, острый соус, кукурузный соус, бекон, чеддер, томат, лук, салат, огурцы",
      ar: "لحم، صلصة حارة، صلصة الذرة، لحم مقدد، تشيدر، طماطم، بصل، خس، مخلل",
      sv: "Nötkött, stark sås, majssås, bacon, cheddar, tomat, lök, sallad, gurka",
      de: "Rindfleisch, scharfe Sauce, Maissauce, Speck, Cheddar, Tomate, Zwiebel, Salat, Gewürzgurken",
      ro: "Vită, sos iute, sos de porumb, bacon, Cheddar, roșii, ceapă, salată, murături"
    },
    precio: "€14.00",
    category: "food"
  },
  {
    id: "prod_nuggets",
    image: nuggets,
    name: { es: "Nuggets de Pollo Artesanos", en: "Artisanal Chicken Nuggets", fr: "Nuggets de Poulet Artisanaux", nl: "Ambachtelijke Kipnuggets", no: "Kyllingnuggets", pl: "Nuggetsy z kurczaka", uk: "Курячі нагетси", ru: "Куриные наггетса", ar: "ناجيتس دجاج", sv: "Kycklingnuggets", de: "Hähnchen-Nuggets", ro: "Nuggets de pui" },
    description: {
      es: "3 Nuggets Caseros Crujientes", en: "3 Crunchy Homemade Nuggets", fr: "3 Nuggets Maison Croustillants", nl: "3 Krokante Huisgemaakte Nuggets", no: "3 hjemmelaget nuggets", pl: "3 domowe nuggetsy",
      uk: "3 домашні нагетси", ru: "3 домашних наггетса", ar: "3 قطع ناجيتس منزلية", sv: "3 hemgjorda nuggets", de: "3 hausgemachte Nuggets", ro: "3 Nuggets de casă"
    },
    precio: "€6.00",
    category: "food"
  },
  {
    id: "prod_croquetas",
    image: croquetas,
    name: { es: "Croquetas Gourmet", en: "Gourmet Croquettes", fr: "Croquettes Gourmet", nl: "Gourmet Krokketten", no: "Kyllingkroketter", pl: "Krokiety z kurczaka", uk: "Курячі крокети", ru: "Куриные крокеты", ar: "كروكيت دجاج", sv: "Kycklingkroketter", de: "Hähnchen-Kroketten", ro: "Crochete de pui" },
    description: {
      es: "3 Croquetas de Pollo Cremosas con Cheddar", en: "3 Creamy Chicken Croquettes with Cheddar", fr: "3 Croquettes de Poulet Crémeuses au Cheddar", nl: "3 Romige Kipkrokketten met Cheddar", no: "3 kyllingkroketter med cheddar", pl: "3 krokiety z kurczaka z cheddarem",
      uk: "3 курячі крокети з чеддером", ru: "3 куриных крокета с чеддером", ar: "3 قطع كروكيت دجاج مع تشيدر", sv: "3 kycklingkroketter med cheddar", de: "3 Hähnchen-Kroketten mit Cheddar", ro: "3 Crochete de pui cu Cheddar"
    },
    precio: "€6.00",
    category: "food"
  },
  {
    id: "prod_fritas",
    image: fritas,
    name: { es: "Patatas Fritas Caseras", en: "Homemade French Fries", fr: "Frites Maison", nl: "Huisgemaakte Frieten", no: "Pommes frites", pl: "Frytki", uk: "Картопля фрі", ru: "Картофель фри", ar: "بطاطس مقلية", sv: "Pommes frites", de: "Pommes Frites", ro: "Cartofi prăjiți" },
    description: {
      es: "Papas fritas cortadas a mano", en: "Hand-cut French fries", fr: "Frites coupées à la main", nl: "Handgesneden frietjes", no: "Hjemmelaget pommes frites", pl: "Domowe frytki",
      uk: "Домашня картопля фрі", ru: "Домашний картофель фри", ar: "بطاطس مقلية منزلية", sv: "Hemgjorda pommes frites", de: "Hausgemachte Pommes", ro: "Cartofi prăjiți de casă"
    },
    precio: "€4.50",
    category: "food"
  },
  {
    id: "prod_gofre",
    image: gofre,
    badge: "DESSERT",
    name: { es: "Waffle XXL Nutella", en: "Waffle XXL Nutella", fr: "Gaufre XXL Nutella", nl: "Wafel XXL Nutella", no: "Vaffel XXL", pl: "Gofry XXL", uk: "Вафлі XXL", ru: "Вафли XXL", ar: "وافل XXL", sv: "Våffla XXL", de: "Waffel XXL", ro: "Gofre XXL" },
    description: {
      es: "Waffle Casera con Nutella generosa", en: "Homemade Waffle with generous Nutella", fr: "Gaufre Maison au Nutella généreux", nl: "Huisgemaakte Wafel met royale Nutella", no: "Hjemmelaget vaffel med Nutella", pl: "Domowe gofry z Nutellą",
      uk: "Домашня вафля з Nutella", ru: "Домашняя вафля с Nutella", ar: "وافل منزلي مع نوتيلا", sv: "Hemgjord våffla med Nutella", de: "Hausgemachte Waffel mit Nutella", ro: "Gofre de casă cu Nutella"
    },
    precio: "€7.00",
    category: "postre"
  },
  {
    id: "prod_bravas",
    image: bravas,
    name: { es: "Patatas Bravas Casa", en: "House Patatas Bravas", fr: "Patatas Bravas Maison", nl: "Huisgemaakte Patatas Bravas", no: "Patatas Bravas", pl: "Patatas Bravas", uk: "Пататас Бравас", ru: "Пататас Бравас", ar: "باتاتاس برافاس", sv: "Patatas Bravas", de: "Patatas Bravas", ro: "Patatas Bravas" },
    description: {
      es: "Patatas Bravas Caseras con Salsa Secreta Picante",
      en: "Homemade Patatas Bravas with Secret Spicy Sauce",
      fr: "Patatas Bravas Maison avec Sauce Secrète Picante",
      nl: "Huisgemaakte Patatas Bravas met Geheime Pittige Saus",
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
    badge: "LOADED",
    name: { es: "Fritas Cheddar & Bacon", en: "Cheddar & Bacon Fries", fr: "Frites Cheddar & Bacon", nl: "Cheddar & Bacon Frieten", no: "Cheddar og bacon frites", pl: "Frytki z cheddarem i bekonem", uk: "Картопля з чеддером та беконом", ru: "Картофель с чеддером и беконом", ar: "بطاطس بالتشيدر ولحم مقدد", sv: "Pommes med cheddar och bacon", de: "Cheddar-Speck-Pommes", ro: "Cartofi cu Cheddar și Bacon" },
    description: {
      es: "Patatas Fritas Caseras avec Salsa de Cheddar de la Casa y Bacon Crujiente",
      en: "Homemade Fries with Homemade Cheddar Sauce and Crunchy Bacon",
      fr: "Frites Maison avec Sauce Cheddar Maison et Bacon Croustillant",
      nl: "Huisgemaakte Frieten met Huisgemaakte Cheddarsaus en Krokante Bacon",
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
    name: { es: "Coca-Cola", en: "Coca-Cola", fr: "Coca-Cola", nl: "Coca-Cola", no: "Coca-Cola", pl: "Coca-Cola", uk: "Кока-Кола", ru: "Кока-Кола", ar: "كوكاكولا", sv: "Coca-Cola", de: "Coca-Cola", ro: "Coca-Cola" },
    description: { es: "Sabor Original Lata 330ml", en: "Original Taste Can 330ml", fr: "Goût Original Canette 330ml", nl: "Originele Smaak Blikje 330ml", no: "Original smak 330ml boks", pl: "Smak oryginalny puszka 330ml", uk: "Оригінальний смак 330мл", ru: "Оригинальный вкус 330мл", ar: "طعم أصلي علبة 330 مل", sv: "Originalsmak burk 330ml", de: "Originalgeschmack Dose 330ml", ro: "Gust Original Doză 330ml" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_cocazero",
    image: cocaZero,
    name: { es: "Coca-Cola Zero", en: "Coca-Cola Zero", fr: "Coca-Cola Zero", nl: "Coca-Cola Zero", no: "Coca-Cola Zero", pl: "Coca-Cola Zero", uk: "Кока-Кола Зеро", ru: "Кока-Кола Зеро", ar: "كوكاكولا زيرو", sv: "Coca-Cola Zero", de: "Coca-Cola Zero", ro: "Coca-Cola Zero" },
    description: { es: "Zero Azúcar Lata 330ml", en: "Zero Sugar Can 330ml", fr: "Sans Sucres Canette 330ml", nl: "Zonder Suiker Blikje 330ml", no: "Sukkerfri 330ml boks", pl: "Bez cukru puszka 330ml", uk: "Зеро цукру 330мл", ru: "Зеро сахара 330мл", ar: "بدون سكر علبة 330 مل", sv: "Sockerfri burk 330ml", de: "Zuckerfrei Dose 330ml", ro: "Zero Zahăr Doză 330ml" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_fantalimon",
    image: fantaLimon,
    name: { es: "Fanta Limón", en: "Lemon Fanta", fr: "Fanta Citron", nl: "Fanta Citroen", no: "Fanta Sitron", pl: "Fanta Cytrynowa", uk: "Фанта Лимон", ru: "Фанта Лимон", ar: "فانتا ليمون", sv: "Fanta Citron", de: "Fanta Zitrone", ro: "Fanta Lămâie" },
    description: { es: "Fanta Limón Lata 330ml", en: "Lemon Fanta Can 330ml", fr: "Fanta Citron Canette 330ml", nl: "Fanta Citroen Blikje 330ml", no: "Sitron 330ml boks", pl: "Puszka 330ml", uk: "330мл", ru: "330мл", ar: "علبة 330 مل", sv: "Burk 330ml", de: "Dose 330ml", ro: "Doză 330ml" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_fantanaranja",
    image: fantaNaranja,
    name: { es: "Fanta Naranja", en: "Orange Fanta", fr: "Fanta Orange", nl: "Fanta Sinaasappel", no: "Fanta Appelsin", pl: "Fanta Pomarańczowa", uk: "Фанта Апельсин", ru: "Фанта Апельсин", ar: "فانتا برتقال", sv: "Fanta Apelsin", de: "Fanta Orange", ro: "Fanta Portocale" },
    description: { es: "Fanta Naranja Lata 33cl", en: "Orange Fanta Can 33cl", fr: "Fanta Orange Canette 33cl", nl: "Fanta Sinaasappel Blikje 33cl", no: "Appelsin 33cl boks", pl: "Puszka 33cl", uk: "33cl", ru: "33cl", ar: "علبة 33 مل", sv: "Burk 33cl", de: "Dose 33cl", ro: "Doză 33cl" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_sprite",
    image: sprite,
    name: { es: "Sprite", en: "Sprite", fr: "Sprite", nl: "Sprite", no: "Sprite", pl: "Sprite", uk: "Спрайт", ru: "Спрайт", ar: "سبرايت", sv: "Sprite", de: "Sprite", ro: "Sprite" },
    description: { es: "Sprite Lata 33cl", en: "Sprite Can 33cl", fr: "Sprite Canette 33cl", nl: "Sprite Blikje 33cl", no: "33cl boks", pl: "Puszka 33cl", uk: "33cl", ru: "33cl", ar: "علبة 33 مل", sv: "Burk 33cl", de: "Dose 33cl", ro: "Doză 33cl" },
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_aquariuslimon",
    image: aquarius,
    name: { es: "Aquarius Limón", en: "Lemon Aquarius", fr: "Aquarius Citron", nl: "Aquarius Citroen", no: "Aquarius Sitron", pl: "Aquarius Cytrynowy", uk: "Акваріус Лимон", ru: "Аквариус Лимон", ar: "أكواريوس ليمون", sv: "Aquarius Citron", de: "Aquarius Zitrone", ro: "Aquarius Lămâie" },
    description: { es: "Aquarius 33cl.", en: "Aquarius 33cl.", fr: "Aquarius 33cl.", nl: "Aquarius 33cl.", no: "33cl.", pl: "33cl.", uk: "33cl.", ru: "33cl.", ar: "33 مل", sv: "33cl.", de: "33cl.", ro: "33cl." },
    precio: "€2.80",
    category: "drink"
  },
  {
    id: "prod_aquariusnaranja",
    image: aquariusNaranja,
    name: { es: "Aquarius Naranja", en: "Orange Aquarius", fr: "Aquarius Orange", nl: "Aquarius Sinaasappel", no: "Aquarius Appelsin", pl: "Aquarius Pomarańczowy", uk: "Акваріус Апельсин", ru: "Аквариус Апельсин", ar: "أكواريوس برتقال", sv: "Aquarius Apelsin", de: "Aquarius Orange", ro: "Aquarius Portocale" },
    description: { es: "Aquarius Naranja 33cl", en: "Orange Aquarius 33cl", fr: "Aquarius Orange 33cl", nl: "Aquarius Sinaasappel 33cl", no: "33cl", pl: "33cl", uk: "33cl", ru: "33cl", ar: "33 مل", sv: "33cl", de: "33cl", ro: "33cl" },
    precio: "€2.80",
    category: "drink"
  },
  {
    id: "prod_sanpellegrino",
    image: aguaSanPellegrino,
    name: { es: "Agua con Gas", en: "Sparkling Water", fr: "Eau Pétillante", nl: "Bruisend Water", no: "Farris", pl: "Woda gazowana", uk: "Газована вода", ru: "Газированная вода", ar: "مياه فوارة", sv: "Kolsyrat vatten", de: "Sprudelwasser", ro: "Apă Minerală" },
    description: { es: "Agua con Gas 50cl", en: "Sparkling Water 50cl", fr: "Eau Pétillante 50cl", nl: "Bruisend Water 50cl", no: "50cl", pl: "50cl", uk: "50cl", ru: "50cl", ar: "50 مل", sv: "50cl", de: "50cl", ro: "50cl" },
    precio: "€3.00",
    category: "drink"
  },
  {
    id: "prod_aguasingas",
    image: agua,
    name: { es: "Agua Sin Gas", en: "Still Water", fr: "Eau Plate", nl: "Plat Water", no: "Vann", pl: "Woda niegazowana", uk: "Вода без газу", ru: "Вода без газа", ar: "مياه معدنية", sv: "Vatten", de: "Stillen Wasser", ro: "Apă Plată" },
    description: { es: "Agua mineral natural 50cl", en: "Natural Mineral Water 50cl", fr: "Eau minérale naturelle 50cl", nl: "Natuurlijk Mineraalwater 50cl", no: "50cl", pl: "50cl", uk: "50cl", ru: "50cl", ar: "50 مل", sv: "50cl", de: "50cl", ro: "50cl" },
    precio: "€2.50",
    category: "drink"
  },
  {
    id: "prod_vinorojo",
    image: vinoRojo,
    name: { es: "Vino tinto", en: "Red Wine", fr: "Vin rouge", nl: "Rode Wijn", no: "Rødvin", pl: "Czerwone wino", uk: "Червоне вино", ru: "Красное вино", ar: "نبيذ أحمر", sv: "Rödvin", de: "Rotwein", ro: "Vin Roșu" },
    description: { es: "Botella de Vino Bullas 75cl", en: "Bullas Wine Bottle 75cl", fr: "Bouteille de vin Bullas 75cl", nl: "Fles Bullas Wijn 75cl", no: "Bullas flaske 75cl", pl: "Butelka wina Bullas 75cl", uk: "Пляшка вина Бульяс 75cl", ru: "Бутылка вина Бульяс 75cl", ar: "زجاجة نبيذ بوياس 75 مل", sv: "Flaska Bullas vin 75cl", de: "Flasche Bullas Wein 75cl", ro: "Sticlă de vin Bullas 75cl" },
    precio: "€15.00",
    category: "drink"
  },
  {
    id: "prod_mahou",
    image: mahou,
    name: { es: "Cerveza Mahou", en: "Mahou Beer", fr: "Bière Mahou", nl: "Mahou Bier", no: "Mahou øl", pl: "Piwo Mahou", uk: "Пиво Махоу", ru: "Пиво Махоу", ar: "بيرة ماهو", sv: "Mahou öl", de: "Mahou Bier", ro: "Bere Mahou" },
    description: { es: "Lata de cerveza 33cl", en: "Beer Can 33cl", fr: "Bière Canette 33cl", nl: "Bier Blikje 33cl", no: "33cl boks", pl: "Puszka piwa 33cl", uk: "Банка пива 33cl", ru: "Банка пива 33cl", ar: "علبة بيرة 33 مل", sv: "Ölburk 33cl", de: "Bierdose 33cl", ro: "Bere doză 33cl" },
    precio: "€2.80",
    category: "drink"
  }
];

export default data;
