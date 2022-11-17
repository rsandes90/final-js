const pokemones = document.querySelector(".pokemones-container");
const carritoBtn = document.querySelector(".carrito");
const cartMenu = document.querySelector(".cart");
const carritoPokemones = document.querySelector(".carrito-container");
const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const total = document.querySelector(".total");
// BOTONES
const btnCargarMas = document.querySelector(".btn-ver-mas");
const tipos = document.querySelector(".tipos");
const btnComprar = document.querySelector(".btn-comprar");
const btnBorrar = document.querySelector(".btn-borrar");
// un html collection de todos los tipos de pokemon
const tiposLista = document.querySelectorAll(".tipo");
// MODAL
const modal = document.querySelector(".add-modal");

// Setear el array para el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Funcion para guardar en el localStorage
const saveLocalStorage = (ListaCarrito) => {
    localStorage.setItem("carrito", JSON.stringify(ListaCarrito));
};

//Abrir carrito
const toggleCart = () => {
    // console.log("sale carrito");
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return;
    }
    overlay.classList.toggle("show-overlay");
};

// Menu Interface
// Logica para abrir y cerrar el carrito/menu y mostrar el overlay
const toggleMenu = () => {
    // console.log("sale menu");
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    }
    overlay.classList.toggle("show-overlay");
};

// Funcion para retornar el html a renderizar
const renderPokemon = (pokemon) => {
    const { id, nombre, precio, tipo, img } = pokemon;
    return `
    <div class="pokemon-market">
        <img src=${img} alt="${nombre}" />
        <div class="pokemon-market-info">
            <div class="data">
                <h4>${nombre}</h4>
                <p>Precio: $${precio}</p>
                <p>Tipo: <span class=${tipo}>${tipo.toUpperCase()}</span></p>
            </div>
            <div class="comprar">
                <button class="btn btn-agregar"
                data-id='${id}'
                data-nombre='${nombre}'
                data-precio='${precio}'
                data-img='${img}'>Agregar</button>
            </div>
        </div>
    </div>`;
};

// Funcion para renderizar los productos divididos.
// Recibe uin index, si no recibe nada por defecto va a ser 0
// Si el index es 0  renderiza el primer array del data
const renderDividirPokemones = (index = 0) => {
    pokemones.innerHTML += pokemonesController.dividedProducts[index]
        .map(renderPokemon)
        .join("");
};

const renderizarPokemonesFiltrados = (tipo) => {
    const pokemonList = productsData.filter((pokemon) => pokemon.tipo === tipo);

    pokemones.innerHTML = pokemonList.map(renderPokemon).join("");
};

// Funcion para renderizar los productos
// Recibe un index, si no le pasamos nada por default va a ser 0 y una categoria, si no le pasamos nada por default va a ser undefined
// Si no hay categoria renderizame los productos del array dividido.
// Si hay categoria ejecuta renderFilteredProducts
const renderPokemones = (index = 0, tipo = undefined) => {
    if (!tipo) {
        renderDividirPokemones(index);
        return;
    }
    renderizarPokemonesFiltrados(tipo);
};

// Logica de filtros
const changeShowMoreBtnState = (tipo) => {
    if (!tipo) {
        btnCargarMas.classList.remove("hidden");
        return;
    }
    btnCargarMas.classList.add("hidden");
};

const changeBtnActiveState = (tipoSeleccionado) => {
    const tipos = [...tiposLista];
    tipos.forEach((tipoBtn) => {
        if (tipoBtn.dataset.tipo !== tipoSeleccionado) {
            tipoBtn.classList.remove("active");
            return;
        }
        tipoBtn.classList.add("active");
    });
};

const cambiarEstadoFiltro = (e) => {
    const tipoSeleccionado = e.target.dataset.filtro;
    changeBtnActiveState(tipoSeleccionado);
    changeShowMoreBtnState(tipoSeleccionado);
};

// Funcion para aplicar el filtro por tipos
const filtrarTipo = (e) => {
    console.log("entra");
    if (!e.target.classList.contains("tipo")) return;
    cambiarEstadoFiltro(e);
    if (!e.target.dataset.tipo) {
        pokemones.innerHTML = "";
        renderPokemones();
    } else {
        console.log(e.target.dataset.tipo);
        renderPokemones(0, e.target.dataset.tipo);
        pokemonesController.nextProductsIndex = 1;
    }
};

// Funcion que checkee si estamos en el ultimo array del array de productos divididos
const isLastIndexOf = () =>
    pokemonesController.nextProductsIndex === pokemonesController.productsLimit;

// Funcion para cargar mas productos
const showMoreProducts = () => {
    renderPokemones(pokemonesController.nextProductsIndex);
    pokemonesController.nextProductsIndex++;
    if (isLastIndexOf()) {
        btnCargarMas.classList.add("hidden");
    }
};

// Funcion para cerrar menu y carrito si scrolleamos
const cerrarConScroll = () => {
    if (!barsMenu.classList.contains("open-menu") &&
        !cartMenu.classList.contains("open-cart")
    )
        return;

    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

const cerrarConClick = (e) => {
    if (!e.target.classList.contains("navbar-link")) return;
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
};

const cerrarConClickOverlay = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

// Logica carrito

const renderCarritoPokemon = (carritopokemon) => {
    const { id, nombre, precio, img, cantidad } = carritopokemon;
    return `
    <div class="carrito-item">
      <img src=${img} alt="Pokemon del carrito" />
      <div class="item-info">
        <h3 class="item-nombre">${nombre}</h3>
        <span class="item-precio">$${precio}</span>
      </div>
      <div class="item-btn">
        <span class="btn-cantidad down" data-id=${id}>-</span>
        <span class="item-quantity">${cantidad}</span>
        <span class="btn-cantidad up" data-id=${id}>+</span>
      </div>
    </div>
    `;
};

const renderCarrito = () => {
    if (!carrito.length) {
        carritoPokemones.innerHTML = `<p class="empty-msg">No agregaste ningún Pokemon</p>`;
        return;
    }
    carritoPokemones.innerHTML = carrito.map(renderCarritoPokemon).join("");
};

const totalDeCarrito = () => {
    return carrito.reduce(
        (acc, cant) => acc + Number(cant.precio) * cant.cantidad,
        0
    );
};

const verTotal = () => {
    total.innerHTML = `$${totalDeCarrito().toFixed(2)}`;
};

const crearPokemonData = (id, nombre, precio, img) => {
    return { id, nombre, precio, img };
};

const existePokemonEnCarro = (pokemon) => {
    return carrito.find((item) => item.id === pokemon.id);
};

//Recorremos el carrito y cuando encuentra el producto el cual agregamos, sumamos una unidad.
const agregarUnidad = (pokemon) => {
    carrito = carrito.map((carritoPokemon) => {
        return carritoPokemon.id === pokemon.id ?
            {...carritoPokemon, cantidad: carritoPokemon.cantidad + 1 } :
            carritoPokemon;
    });
};

const crearPokemonEnCarro = (pokemon) => {
    carrito = [...carrito, {...pokemon, cantidad: 1 }];
};

const verNotificacionModal = (msg) => {
    modal.classList.add("mostrar-modal");
    modal.textContent = msg;
    setTimeout(() => {
        modal.classList.remove("mostrar-modal");
    }, 1500);
};

const deshabilitarBtn = (btn) => {
    if (!carrito.length) {
        btn.classList.add("deshabilitar");
    } else {
        btn.classList.remove("deshabilitar");
    }
};

const checkearEstadoCarro = () => {
    saveLocalStorage(carrito);
    renderCarrito(carrito);
    verTotal(carrito);
    deshabilitarBtn(btnComprar);
    deshabilitarBtn(btnBorrar);
};

// Agregar al carrito
const agregarPokemon = (e) => {
    if (!e.target.classList.contains("btn-agregar")) return;
    const { id, nombre, precio, img } = e.target.dataset;

    console.log(id, nombre, precio);

    const pokemon = crearPokemonData(id, nombre, precio, img);

    if (existePokemonEnCarro(pokemon)) {
        // Añadir una unidad
        agregarUnidad(pokemon);
        //Mostrar el modal de que se agrego una unidad
        verNotificacionModal("Se agregó una unidad del producto al carrito");
    } else {
        //Crear el producto
        crearPokemonEnCarro(pokemon);
        //Mostrar el modal de que se agrego el producto
        verNotificacionModal("El producto se ha agregado al carrito");
    }
    checkearEstadoCarro();
};

const borrarPokemonDelCarrito = (existePokemonEnCarro) => {
    carrito = carrito.filter((pokemon) => pokemon.id !== existePokemonEnCarro.id);
    checkearEstadoCarro();
};

const bajarCantidadPokemonDeCarro = (existePokemonEnCarro) => {
    carrito = carrito.map((pokemon) => {
        return pokemon.id === existePokemonEnCarro.id ?
            {...pokemon, cantidad: Number(pokemon.cantidad) - 1 } :
            pokemon;
    });
};

const bajarCantidad = (id) => {
    const existingCartProduct = carrito.find((item) => item.id === id);

    if (existingCartProduct.cantidad === 1) {
        if (window.confirm("Desea eliminar el producto del carrito")) {
            // borrar producto
            borrarPokemonDelCarrito(existingCartProduct);
        }
        return;
    }
    // Restar uno al producto existente
    bajarCantidadPokemonDeCarro(existingCartProduct);
};

const subirCantidad = (id) => {
    const existePokemonEnCarro = carrito.find((item) => item.id === id);
    agregarUnidad(existePokemonEnCarro);
};

const modificarCantidades = (e) => {
    if (e.target.classList.contains("down")) {
        bajarCantidad(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
        subirCantidad(e.target.dataset.id);
    }
    checkearEstadoCarro();
};

const resetearCarrito = () => {
    carrito = [];
    checkearEstadoCarro();
};

const finalizarCarro = (consultaMgs, confirmadaMsg) => {
    if (!carrito.length) return;
    if (window.confirm(consultaMgs)) {
        resetearCarrito();
        alert(confirmadaMsg);
    }
};

const comprar = () => {
    finalizarCarro("¿Desea completar su compra?", "¡Gracias por su compra!");
};

const vaciarCarro = () => {
    finalizarCarro("¿Desea vaciar el carrito?", "No hay productos en el carrito");
};

// Funcion inicializadora
const init = () => {
    renderPokemones();
    console.log(tiposLista);
    tipos.addEventListener("click", filtrarTipo);
    btnCargarMas.addEventListener("click", showMoreProducts);
    carritoBtn.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", cerrarConScroll);
    barsMenu.addEventListener("click", cerrarConClick);
    overlay.addEventListener("click", cerrarConClickOverlay);
    document.addEventListener("DOMContentLoaded", renderCarrito);
    document.addEventListener("DOMContentLoaded", verTotal);
    pokemones.addEventListener("click", agregarPokemon);
    carritoPokemones.addEventListener("click", modificarCantidades);
    deshabilitarBtn(btnComprar);
    deshabilitarBtn(btnBorrar);
    btnComprar.addEventListener("click", comprar);
    btnBorrar.addEventListener("click", vaciarCarro);
};

init();