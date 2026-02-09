import italiana from "./assets/italiana.png";
import suiza from "./assets/suiza.png";
import francesa from "./assets/francesa.png";
import marroqi from "./assets/marroqi.png";
import espanola from "./assets/Espanola.png";
import inglesa from "./assets/inglesa.png";
import india from "./assets/india.png";
import vinoRojo from "./assets/Vino Rojo.png";
import heineken from "./assets/heineken.jpg";
import alhambra from "./assets/alhambra.jpg";
import aguaSanPellegrino from "./assets/Agua San Pellegrino.png";
import aquarius from "./assets/Aquarius.png";
import aquariusNaranja from "./assets/Aquarius naranja.png";
import cocaCola from "./assets/Coca-Cola Sabor Original.png";
import cocaZero from "./assets/Coca-Cola Zero.png";
import cocaZero2 from "./assets/Coca-Cola Zero2.png";
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
import alitas from "./assets/alitas.png";
import croquetas from "./assets/croquetas.png";
import combo2 from "./assets/combo2.png";
import combo3 from "./assets/combo3.png";
import mexicana from "./assets/mexicana.png";
import smash from "./assets/smash.png";

const data = [
  {
    id: "prod_combo1",
    image: combo,
    object: "El COMBO 1",
    description: "La Inglesa + Patatas Fritas caseras + 3 Nuggets Caseros",
    precio: "€18.00",
    category: "food"
  },
  {
    id: "prod_combo3",
    image: combo3,
    object: "El COMBO 2",
    description: "La Inglesa + Patatas Fritas caseras + 3 Croquetas Caseras",
    precio: "€18.00",
    category: "food"
  },
  {
    id: "prod_india",
    image: india,
    object: " La India",
    description: "Pollo Marinado con Especias, Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
    precio: "€9.00",
    category: "food"
  },
  {
    id: "prod_francesa",
    image: francesa1,
    object: "La Francesa",
    description: "Carne y Hierbas Provenciales, Reblochon, Purée de papa y tocino... Tomate, Cebolla, Lechuga, Pepenillos",
    precio: "€12.00",
    category: "food"
  },
  {
    id: "prod_inglesa",
    image: inglesa,
    object: "La Inglesa",
    description: "Carne, Crema de Cheddar Casera y Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
    precio: "€10.00",
    category: "food"
  },
  {
    id: "prod_marroqi",
    image: marroqi,
    object: "La Marroqui",
    description: "Carne con Ajo, Perejil, Cebolla y Comino, Cheddar y crema de Cheddar Casera, Tomate, Cebolla, Lechuga, Pepenillos",
    precio: "€12.00",
    category: "food"
  },
  {
    id: "prod_smash",
    image: smash,
    object: "La Smash doble",
    description: "Carne doble, Bacon, Cheddar y crema de Cheddar Casera, Cebolla y Pepenillos",
    precio: "€13.00",
    category: "food"
  },
  {
    id: "prod_italiana",
    image: italiana,
    object: "La Italiana",
    description: "Carne y Tomillo, Mozza Burrata, Crema de Champiñon con Trufa, Tomate, Cebolla, Lechuga, Pepenillos",
    precio: "€13.00",
    category: "food"
  },
  {
    id: "prod_suiza",
    image: suiza,
    object: "La Auvergna",
    description: "Ternera caramelizada con Panela, Salsa de queso Azul de Francia, Tomate, Cebolla, Lechuga, Pepenillos",
    precio: "€12.00",
    category: "food"
  },
  {
    id: "prod_espanola",
    image: espanola,
    object: "La Española",
    description: "Carne con Pimiento de Padron, Cecina, Huevo Frito, Cheddar, Tomate, Cebolla, Lechuga, Pepenillos",
    precio: "€14.00",
    category: "food"
  },
  {
    id: "prod_colombiana",
    image: colombiana,
    object: "La Colombiana",
    description: "Carne con ajo, perejil, cebolla y comino, Tocino,Papa, Piña, Tomate, Cebolla, Lechuga, Pepenillos, Queso Cheddar",
    precio: "€14.00",
    category: "food"
  },
  {
    id: "prod_mexicana",
    image: mexicana,
    object: "La Mexicana",
    description: "Carne, Salsa de Pimiento Picante Casera, Salsa de Maiz Casera, Cebolla Roja, Tocino, Tomate, Lechuga, Pepenillos, Queso Cheddar",
    precio: "€14.00",
    category: "food"
  },
  {
    id: "prod_nuggets",
    image: nuggets,
    object: "Nuggets de Pollo",
    description: "3 Nuggets Caseros",
    precio: "€6.00",
    category: "food"
  },
  {
    id: "prod_croquetas",
    image: croquetas,
    object: "Croquetas de Pollo",
    description: "3 Croquetas de Pollo con Cheddar",
    precio: "€6.00",
    category: "food"
  },
  {
    id: "prod_fritas",
    image: fritas,
    object: "Patatas Fritas",
    description: "Papas fritas Caseras",
    precio: "€4.50",
    category: "food"
  },
  {
    id: "prod_bravas",
    image: bravas,
    object: "Patatas Bravas",
    description: "Patatas Bravas Caseras con Salsa Brava de la Casa (Picante)",
    precio: "€5.50",
    category: "food"
  },
  {
    id: "prod_cocacola",
    image: cocaCola,
    object: "Coca-Cola ",
    description: "Sabor Original Lata 330ml",
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_cocazero",
    image: cocaZero,
    object: "Coca-Cola Zero ",
    description: "Zero Azúcar Lata 330ml",
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_fantalimon",
    image: fantaLimon,
    object: "Fanta Limón ",
    description: "Fanta Limón Lata 330ml",
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_fantanaranja",
    image: fantaNaranja,
    object: "Fanta Naranja ",
    description: "Fanta Naranja Lata 33cl",
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_sprite",
    image: sprite,
    object: "Sprite ",
    description: "Sprite Lata 33cl",
    precio: "€2.20",
    category: "drink"
  },
  {
    id: "prod_aquariuslimon",
    image: aquarius,
    object: "Aquarius Limón",
    description: "Aquarius 33cl.",
    precio: "€2.80",
    category: "drink"
  },
  {
    id: "prod_aquariusnaranja",
    image: aquariusNaranja,
    object: "Aquarius Naranja",
    description: "Aquarius Naranja 33cl",
    precio: "€2.80",
    category: "drink"
  },
  {
    id: "prod_sanpellegrino",
    image: aguaSanPellegrino,
    object: "Agua ",
    description: "Agua con Gas 50cl",
    precio: "€3.00",
    category: "drink"
  },
  {
    id: "prod_aguasingas",
    image: agua,
    object: "Agua Sin Gas 50cl",
    description: "Agua mineral natural",
    precio: "€2.50",
    category: "drink"
  },
  {
    id: "prod_vinorojo",
    image: vinoRojo,
    object: "Vino tinto",
    description: "Botella de Vino Bullas 75cl",
    precio: "€15.00",
    category: "drink"
  },
  {
    id: "prod_gofre",
    image: gofre,
    object: "Waffle",
    description: "Waffle con Nutella o Dulce de Leche o Azucar...Dime cual en Whatsapp",
    precio: "€6.00",
    category: "postre"
  },
  {
    id: "prod_mahou",
    image: mahou,
    object: "Cerveza Mahou Clasica",
    description: "Lata de cerveza 33cl",
    precio: "€2.80",
    category: "drink"
  }
];

export default data;
