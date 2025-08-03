let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito) || [];

// Elementos del DOM
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#checkout-btn");
const walletContainer = document.querySelector("#wallet_container");

// Variables para MercadoPago
let mp;
let mercadoPagoButtonInstance = null;

// Cargar productos al iniciar
cargarProductosCarrito();

// Función para cargar los productos en el carrito
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h6>${producto.titulo}</h6>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <div class="contador-cantidad">
                        <button class="disminuir-cantidad" data-id="${producto.id}" ${producto.cantidad <= 1 ? 'disabled' : ''}>
                            <i class="bi bi-dash-lg"></i>
                        </button>
                        <span class="valor-cantidad">${producto.cantidad}</span>
                        <button class="aumentar-cantidad" data-id="${producto.id}">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            contenedorCarritoProductos.append(div);
        });

        actualizarBotonesEliminar();
        actualizarBotonesCantidad();
        actualizarTotal();
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        botonComprar.disabled = true;
        eliminarBotonMercadoPago();
    }
}

// Actualizar botones de eliminar
function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Actualizar botones de cantidad
function actualizarBotonesCantidad() {
    document.querySelectorAll('.disminuir-cantidad').forEach(boton => {
        boton.addEventListener('click', disminuirCantidad);
    });

    document.querySelectorAll('.aumentar-cantidad').forEach(boton => {
        boton.addEventListener('click', aumentarCantidad);
    });
}

// Función para eliminar el botón de MercadoPago
function eliminarBotonMercadoPago() {
    if (mercadoPagoButtonInstance) {
        mercadoPagoButtonInstance.unmount();
        mercadoPagoButtonInstance = null;
    }
    walletContainer.style.display = "none";
    walletContainer.innerHTML = '';
}

// Función para actualizar el botón de MercadoPago
async function actualizarBotonMercadoPago() {
    eliminarBotonMercadoPago();

    if (!productosEnCarrito || productosEnCarrito.length === 0) {
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                products: productosEnCarrito.map(producto => ({
                    titulo: producto.titulo,
                    quantity: producto.cantidad,
                    price: producto.precio
                }))
            })
        });

        if (!response.ok) {
            throw new Error('Error al crear la preferencia de pago');
        }

        const { id } = await response.json();
        
        walletContainer.style.display = "block";
        
        mercadoPagoButtonInstance = mp.bricks().create("wallet", "wallet_container", {
            initialization: {
                preferenceId: id,
            },
            customization: {
                texts: {
                    action: "pay",
                    valueProp: "security_safety",
                },
            },
        });

    } catch (error) {
        console.error("Error al actualizar el botón de pago:", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar el método de pago',
            icon: 'error'
        });
    }
}

// Disminuir cantidad
function disminuirCantidad(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const producto = productosEnCarrito.find(p => p.id === id);
    
    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        
        if (walletContainer.style.display === "block") {
            actualizarBotonMercadoPago();
        }
    }
}

// Aumentar cantidad
function aumentarCantidad(e) {
    const id = e.currentTarget.getAttribute('data-id');
    const producto = productosEnCarrito.find(p => p.id === id);
    
    if (producto) {
        producto.cantidad++;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        
        if (walletContainer.style.display === "block") {
            actualizarBotonMercadoPago();
        }
    }
}

// Eliminar producto del carrito
function eliminarDelCarrito(e) {
Toastify({
    text: "Producto eliminado",
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
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
    
    if (walletContainer.style.display === "block") {
        actualizarBotonMercadoPago();
    }
    

}

// Vaciar carrito
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se borrarán todos los productos del carrito',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito = [];
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
            eliminarBotonMercadoPago();
            
            Swal.fire(
                '¡Carrito vacío!',
                'Todos los productos han sido eliminados',
                'success'
            );
        }
    });
}

// Actualizar total
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
    botonComprar.disabled = totalCalculado <= 0;
}

// Cargar SDK de MercadoPago
function cargarMercadoPago() {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://sdk.mercadopago.com/js/v2';
        script.onload = () => {
            mp = new MercadoPago('APP_USR-f91e6fbd-a2f7-48e0-9a7f-00958e7e9884', {
                locale: 'es-AR'
            });
            resolve();
        };
        document.body.appendChild(script);
    });
}

// Manejar la compra
botonComprar.addEventListener("click", async () => {
    if (!productosEnCarrito || productosEnCarrito.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'Agrega productos al carrito antes de comprar',
            icon: 'warning'
        });
        return;
    }

    try {
        if (!mp) {
            await cargarMercadoPago();
        }

        await actualizarBotonMercadoPago();
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al procesar tu pago',
            icon: 'error'
        });
    }
});


