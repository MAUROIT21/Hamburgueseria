function obtenerCarrito() 
{
    return JSON.parse(localStorage.getItem("carrito")) || []; // trae el carrito del Storage, sino existe trae un array vacio para que no de null al parsearlo
}

function cargarProductosCarrito() {
    let tabla = document.getElementById("tabla-carrito");
    let carrito = obtenerCarrito();

    // Eliminar filas previas > limpio la tabla 
    tabla.querySelectorAll(".fila-producto").forEach(fila => fila.remove());

    let total = 0; // inicializo la variable del total

    // para cada producto del carrito creo una fila, clase, y sus valores de los campos del producto en cada celda de esa fila.
    carrito.forEach(producto => {
        if (producto.cantidad > 0) {
            let fila = document.createElement("tr");
            fila.classList.add("fila-producto");

            // Nombre
            let celdaNombre = document.createElement("td");
            celdaNombre.textContent = producto.nombre;

            // Cantidad
            let celdaCantidad = document.createElement("td");
            celdaCantidad.textContent = producto.cantidad;

            // Precio unitario
            let celdaPrecio = document.createElement("td");
            celdaPrecio.textContent = `$${producto.precio}`;

            // appendeo las celdas a la fila
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCantidad);
            fila.appendChild(celdaPrecio);

            // appendeo las filas a la tabla
            tabla.appendChild(fila);

            // Acumular total
            total += producto.precio * producto.cantidad;
        }
    });

    // Mostrar total
    document.getElementById("valor-final").textContent =
        `El valor final a pagar es de: $${total}`;
}


function limpiarCarrito() {
    // elimina del Storage el carrito y sus productos
    localStorage.removeItem("carrito");
    // carga vacio el carrito para mostrar en la tabla
    cargarProductosCarrito();
}


// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});