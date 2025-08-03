/*
 * Copyright (c) 2025 Guillermo Martinez
 * All Rights Reserved.
 *
 * Este código es propiedad exclusiva del autor.
 * Queda prohibida su copia, distribución, modificación o uso sin autorización expresa.
 */


let productos = [];

// Elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const contadoresCarrito = document.querySelectorAll(".numerito"); // Selección modificada
let botonesAgregar = document.querySelectorAll(".producto-agregar");

// Cargar productos
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        if (contenedorProductos) {
            cargarProductos(productos);
        }
    })
    .catch(error => console.error('Error cargando productos:', error));

// Event listeners para categorías
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos") {
            const productoCategoria = productos.find(p => p.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria?.categoria?.nombre || "Categoría";
            cargarProductos(productos.filter(p => p.categoria.id === e.currentTarget.id));
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

// Función para cargar productos
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <a href="product.html?id=${producto.id}">
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            </a>
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

// Actualizar botones de agregar
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => boton.addEventListener("click", agregarAlCarrito));
}

// Función agregar al carrito
function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right,rgb(146, 85, 93),rgb(199, 112, 115))",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        }
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(p => p.id === idBoton);

    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    if (productosEnCarrito.some(p => p.id === idBoton)) {
        const index = productosEnCarrito.findIndex(p => p.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    actualizarNumerito();
}

// Actualizar contadores del carrito (lectura directa de localStorage)
function actualizarNumerito() {
    const carrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
    const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadoresCarrito.forEach(contador => contador.textContent = totalItems);
}

// Inicialización al cargar
document.addEventListener('DOMContentLoaded', () => {
    actualizarNumerito();
    contadoresCarrito.forEach(contador => {
        if (!contador.textContent) contador.textContent = "0";
    });
});


// Si estamos en product.html, cargar el producto individualmente
if (window.location.pathname.includes("product.html")) {
    const obtenerParametro = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    fetch("js/productos.json")
        .then(response => response.json())
        .then(productos => {
            const idProducto = obtenerParametro("id");
            const producto = productos.find(p => p.id === idProducto);

            if (producto) {
                document.getElementById("productoImagen").src = producto.imagen;
                document.getElementById("productoImagen").alt = producto.titulo;
                document.getElementById("productoTitulo").innerText = producto.titulo;
                document.getElementById("productoPrecio").innerText = "$" + producto.precio;
                document.getElementById("productoDescripcion").innerText = producto.descripcion || "Descripción no disponible";

                const botonAgregar = document.getElementById("botonAgregarCarrito");
                if (botonAgregar) {
                    botonAgregar.addEventListener("click", () => {
                        const cantidad = parseInt(document.getElementById("inputQuantity").value) || 1;
                        agregarAlCarritoConCantidad(producto, cantidad);
                    });
                }
            } else {
                document.getElementById("productoTitulo").innerText = "Producto no encontrado";
            }
        })
        .catch(err => {
            console.error("Error cargando producto:", err);
            document.getElementById("productoTitulo").innerText = "Error al cargar producto";
        });

    function agregarAlCarritoConCantidad(producto, cantidad) {
        let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

        const productoExistente = productosEnCarrito.find(p => p.id === producto.id);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            const productoParaCarrito = { ...producto, cantidad };
            productosEnCarrito.push(productoParaCarrito);
        }

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        actualizarNumerito();

        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right,rgb(146, 85, 93),rgb(199, 112, 115))",
                borderRadius: "2rem",
                textTransform: "uppercase",
                fontSize: ".75rem"
            },
            offset: {
                x: '1.5rem',
                y: '1.5rem'
            }
        }).showToast();
    }
}
