const productsData = [{
        id: 1,
        nombre: "Squirtle",
        precio: 6.89,
        tipo: "agua",
        img: "./assets/img/pokemones/Squirtle.png",
    },
    {
        id: 2,
        nombre: "Wartortle",
        precio: 5.89,
        tipo: "agua",
        img: "./assets/img/pokemones/Wartortle.png",
    },
    {
        id: 3,
        nombre: "Blastoise",
        precio: 4.89,
        tipo: "agua",
        img: "./assets/img/pokemones/Blastoise.png",
    },
    {
        id: 4,
        nombre: "Charmander",
        precio: 3.67,
        tipo: "fuego",
        img: "./assets/img/pokemones/Charmander.png",
    },
    {
        id: 5,
        nombre: "Charmeleon",
        precio: 4.52,
        tipo: "fuego",
        img: "./assets/img/pokemones/Charmeleon.png",
    },
    {
        id: 6,
        nombre: "Charizard",
        precio: 7.33,
        tipo: "fuego",
        img: "./assets/img/pokemones/Charizard.png",
    },
    {
        id: 7,
        nombre: "Pikachu",
        precio: 2.2,
        tipo: "trueno",
        img: "./assets/img/pokemones/Pikachu.png",
    },
    {
        id: 8,
        nombre: "Raichu",
        precio: 1.12,
        tipo: "trueno",
        img: "./assets/img/pokemones/Raichu.png",
    },
    {
        id: 9,
        nombre: "Voltorb",
        precio: 0.5,
        tipo: "trueno",
        img: "./assets/img/pokemones/Voltorb.png",
    },
    {
        id: 10,
        nombre: "Chikorita",
        precio: 8.35,
        tipo: "planta",
        img: "./assets/img/pokemones/Chikorita.png",
    },
    {
        id: 11,
        nombre: "Tangela",
        precio: 8.65,
        tipo: "planta",
        img: "./assets/img/pokemones/Tangela.png",
    },
    {
        id: 12,
        nombre: "Bayleef",
        precio: 9.29,
        tipo: "planta",
        img: "./assets/img/pokemones/Bayleef.png",
    },
    {
        id: 13,
        nombre: "Caterpie",
        precio: 8.27,
        tipo: "bicho",
        img: "./assets/img/pokemones/Caterpie.png",
    },
    {
        id: 14,
        nombre: "Pinsir",
        precio: 5.55,
        tipo: "bicho",
        img: "./assets/img/pokemones/Pinsir.png",
    },
    {
        id: 15,
        nombre: "Wurmple",
        precio: 7.46,
        tipo: "bicho",
        img: "./assets/img/pokemones/Wurmple.png",
    },
];

// Para hacer la paginacion de Ver Más
// Usamos el array de productos y lo dividimos en arrays de size elementos
function splitProducts(size) {
    let dividedProducts = [];
    for (let i = 0; i < productsData.length; i += size) {
        dividedProducts.push(productsData.slice(i, i + size));
    }
    return dividedProducts;
}

// Funcion para dividir los productos en arrays de 6 y manejar la paginacion
const pokemonesController = {
    dividedProducts: splitProducts(6),
    nextProductsIndex: 1,
    productsLimit: splitProducts(6).length,
};

// console.log(productsController);