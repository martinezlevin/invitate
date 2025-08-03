/*
 * Copyright (c) 2025 Guillermo Martinez
 * All Rights Reserved.
 *
 * Este código es propiedad exclusiva del autor.
 * Queda prohibida su copia, distribución, modificación o uso sin autorización expresa.
 */


// Selección de elementos DOM
const openMenu = document.querySelector("#open-menu"); // Botón para abrir el menú
const closeMenu = document.querySelector("#close-menu"); // Botón para cerrar el menú
const aside = document.querySelector("aside"); // El menú lateral

// Evento para abrir el menú
openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible"); // Añade la clase para hacer visible el menú
});

// Evento para cerrar el menú
closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible"); // Elimina la clase para ocultar el menú
});
