//Local Storage donde almaceno el array de productos seleccionados del CARRITO
let carrito = [];
let carritoJSON = JSON.stringify(carrito);
localStorage.setItem("carrito", carritoJSON);

//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() {
    let carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    return carritoStorage;
}


//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    let carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    console.log(elementoClickeado);

    // -----Sumo los datos del producto al carrito y al Storage
    // Obtener datos del producto desde el DOM
    let li = elementoClickeado.parentElement;
    let nombre = li.querySelector(".nombre-producto").textContent;
    let precioTexto = li.querySelector(".precio-producto").textContent;
    let precio = parseInt(precioTexto.replace("$", "").trim());

    // Obtener carrito actual
    let carritoStorage = obtenerCarrito();

    // Buscar si el producto ya existe
    let productoExistente = carritoStorage.find(item => item.nombre === nombre);
    //console.log(productoExistente);

    if (productoExistente) {
        productoExistente.cantidad += 1; // Si existe suma uno
    } else {
        carritoStorage.push({ nombre, precio, cantidad: 1 }); // Sino existe el producto, lo agrega
    }

    // Avisa con Alert el nombre del producto agregado al carrito
    alert(`${nombre} fue agregado al carrito!`);

    // Mostrar carrito en consola antes de guardarlo
    console.log("El Carrito ha sido actualizado:", carritoStorage);

    // Guardar en LocalStorage
    guardarCarrito(carritoStorage);

}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    // Obtener datos del producto desde el DOM
    let li = elementoClickeado.parentElement;
    let nombre = li.querySelector(".nombre-producto").textContent;
    let precioTexto = li.querySelector(".precio-producto").textContent;
    let precio = parseInt(precioTexto.replace("$", "").trim());

    // Obtener carrito actual
    let carritoStorage = obtenerCarrito();

    // Buscar si el producto ya existe
    let productoExistente = carritoStorage.find(item => item.nombre === nombre);
    console.log(productoExistente);

    if (productoExistente) {

        if (productoExistente.cantidad > 1) {
                // Resta si hay aunque sea 1
                productoExistente.cantidad -= 1;
                alert(`Un/a ${nombre} fue eliminado del carrito!`);
            } else {
                // Si la cantidad es 1, al restar se elimina del carrito
                carritoStorage = carritoStorage.filter(item => item.nombre !== nombre);
                alert(`El producto ${nombre} fue quitado del carrito!`);
            
                } 
        } else {
            alert(`No hay más - ${nombre} - en el Carrito`);
    }


    // Mostrar carrito en consola antes de guardarlo
    console.log("El Carrito ha sido actualizado:", carritoStorage);

    // Guardar en LocalStorage
    guardarCarrito(carritoStorage);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
