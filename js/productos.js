/*
fetch("../productos.json") 
    .then(response => response.json()) 
    .then(data => {console.log(data)
        for (let producto of data) {
            let cade = cade + `
            <li>
                <img class="imagen" src="${producto.imagen}">
                <p class="producto-descripcion">${producto.nombre}</p>
                <p class="producto-precio">$ ${producto.precio}</p>
                <a href="#" class="btn-carrito" data-id="${producto.id}">Agregar Al Carrito</a>
            </li>
            `
            document.querySelector("#productos").innerHTML=cade
       
        }  
    }

);
console.log("hola")

*/


/*fetch("./js/productos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        let cade = ''; // Inicializa la variable fuera del bucle
        for (let producto of data.productos) {
            cade += `
            <li>
                <img class="imagen" src="${producto.imagen}">
                <p class="producto-descripcion">${producto.nombre}</p>
                <p class="producto-precio">$ ${producto.precio}</p>
                <a href="#" class="btn-carrito"  id= "btn-comprar" data-id="${producto.id}">Agregar Al Carrito</a>
            </li>
            `;
        }
        document.querySelector("#productos").innerHTML = cade;
    })
    .catch(error => {
        console.error('Error de fetch:', error);
    });*/


// productos.js
/*function guardarPrecio(precio) {
    sessionStorage.setItem('precio', precio);
}
function guardarOrden(orden) {
    sessionStorage.setItem('orden', orden);
}
function guardarCategoria(categoria) {
    sessionStorage.setItem('categoria', categoria);
}
function guardarGenero(genero) {
    sessionStorage.setItem('genero', genero);
}

let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
//funcion anterior de mostrar
/* 
function mostrar(genero, categoria, precio) {
    fetch("./js/productos.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            let cade = ''; // Inicializa la variable fuera del bucle
            data.productos.forEach(producto => {
                // compara si el producto es mayor al precio seleccionado
                if (producto.precio >= sessionStorage.getItem('precio')) {
                    //compara si el genero es distinto de "todos"
                    if (sessionStorage.genero != "all") {
                        //si es distinto de todos pregunta si coincide el genero de la prenda y ademas la categoria es igual a todos o coincide la categoria con la categoria seleccionada.
                        if ((sessionStorage.genero == producto.genero) && ((sessionStorage.categoria == "all") || sessionStorage.categoria == producto.categoria))
                            //suma la cadena del producto a la variable "cade"
                            cade += `
        <li>
            <img class="imagen" src="${producto.imagen}">
            <p class="producto-descripcion">${producto.nombre}</p>
            <p class="producto-precio">$ ${producto.precio}</p>
            <a href="#" class="btn-carrito" data-id="${producto.id}">Agregar Al Carrito</a>
        </li>
        `;
                    }
                    //si el genero todos entonces realiza la comparacion de si categoria  es igual a todos o coincide con la categoria del producto.
                    else {
                        if ((sessionStorage.categoria == "all") || (sessionStorage.categoria == producto.categoria)) {
                            cade += `
            <li>
                <img class="imagen" src="${producto.imagen}">
                <p class="producto-descripcion">${producto.nombre}</p>
                <p class="producto-precio">$ ${producto.precio}</p>
                <a href="#" class="btn-carrito" data-id="${producto.id}">Agregar Al Carrito</a>
            </li>
            `;
                        }
                    }
                }
            });
            document.querySelector("#productos").innerHTML = cade;

            // Añadir event listener a los botones "Agregar Al Carrito"
            document.querySelectorAll(".btn-carrito").forEach(button => {
                button.addEventListener('click', event => {
                    event.preventDefault();
                    const productId = button.getAttribute('data-id');
                    const product = data.productos.find(p => p.id == productId);
                    agregarAlCarrito(product);
                });
            });
        })
        .catch(error => {
            console.error('Error de fetch:', error);
        });
}
*/

/*function mostrar(genero, categoria, precio) {
    fetch("./js/productos.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            const filtroOrden = sessionStorage.getItem('orden'); // Obtener el criterio de ordenación (ascendente o descendente)

            // Ordenar los productos según el criterio
            data.productos.sort((a, b) => {
                if (filtroOrden === 'Ascendente') {
                    return a.precio - b.precio;
                } else if (filtroOrden === 'Descendente') {
                    return b.precio - a.precio;
                }
            });

            let cade = ''; // Inicializa la variable fuera del bucle

            data.productos.forEach(producto => {
                // compara si el producto es mayor al precio seleccionado
                if (producto.precio >= sessionStorage.getItem('precio')) {
                    //compara si el genero es distinto de "todos"
                    if (sessionStorage.genero != "all") {
                        //si es distinto de todos pregunta si coincide el genero de la prenda y ademas la categoria es igual a todos o coincide la categoria con la categoria seleccionada.
                        if ((sessionStorage.genero == producto.genero) && ((sessionStorage.categoria == "all") || sessionStorage.categoria == producto.categoria))
                            //suma la cadena del producto a la variable "cade"
                            cade += `
        <li>
            <img class="imagen" src="${producto.imagen}">
            <p class="producto-descripcion">${producto.nombre}</p>
            <p class="producto-precio">$ ${producto.precio}</p>
            <button class="btn-carrito" data-id="${producto.id}" onclick="actualizarCantidadProductos()">Agregar Al Carrito</button>
        </li>
        `;
                    }
                    //si el genero todos entonces realiza la comparacion de si categoria  es igual a todos o coincide con la categoria del producto.
                    else {
                        if ((sessionStorage.categoria == "all") || (sessionStorage.categoria == producto.categoria)) {
                            cade += `
            <li>
                <img class="imagen" src="${producto.imagen}">
                <p class="producto-descripcion">${producto.nombre}</p>
                <p class="producto-precio">$ ${producto.precio}</p>
                <button onclick="actualizarCantidadProductos()" class="btn-carrito" data-id="${producto.id}">Agregar Al Carrito</button>
            </li>
            `;
                        }
                    }
                }
            });

            document.querySelector("#productos").innerHTML = cade;

            // Añadir event listener a los botones "Agregar Al Carrito"
            document.querySelectorAll(".btn-carrito").forEach(button => {
                button.addEventListener('click', event => {
                    event.preventDefault();
                    const productId = button.getAttribute('data-id');
                    const product = data.productos.find(p => p.id == productId);
                    agregarAlCarrito(product);
                });
            });
        })
        .catch(error => {
            console.error('Error de fetch:', error);
        });
}

function agregarAlCarrito(producto) {
    const index = carrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCantidadProductos();
    actualizarCantidad
}

function actualizarCarrito() {
    const carritoBody = document.querySelector("#carrito-body");
    const footer = document.querySelector("#tfooter");

    if (!carritoBody || !footer) return;  // Salir si no estamos en la página del carrito

    carritoBody.innerHTML = '';

    if (carrito.length === 0) {
        footer.innerHTML = '<tr><td class="border-bottom-left border-bottom-right" colspan="4">¡No hay ningún elemento en el carrito!</td></tr>';
        return;
    }

    let totalCarrito = 0;

    carrito.forEach(item => {
        const precioTotal = item.precio * item.cantidad;
        totalCarrito += precioTotal;

        carritoBody.innerHTML += `
        <tr>
            <td>${item.nombre}</td>
            <td>
                <button class="cantidad-btn" data-id="${item.id}" data-action="decrement">-</button>
                ${item.cantidad}
                <button class="cantidad-btn" data-id="${item.id}" data-action="increment">+</button>
            </td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>$${precioTotal.toFixed(2)}</td>
        </tr>
        `;
    });

    footer.innerHTML = `
    <tr>
        <td class="border-bottom-left" colspan="3">Total</td>
        <td class="border-bottom-right">$${totalCarrito.toFixed(2)}</td>
    </tr>
    `;

    document.querySelectorAll('.cantidad-btn').forEach(button => {
        button.addEventListener('click', event => {
            const productId = button.getAttribute('data-id');
            const action = button.getAttribute('data-action');
            actualizarCantidad(productId, action);
        });
    });
}

function actualizarCantidad(productId, action) {
    const index = carrito.findIndex(p => p.id == productId);
    if (index !== -1) {
        if (action === 'increment') {
            carrito[index].cantidad += 1;
        } else if (action === 'decrement' && carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        }
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }
}*/

// productos.js (consolidado con shop.js)

// Funciones de almacenamiento
function guardarPrecio(precio) {
    sessionStorage.setItem('precio', precio);
}
function guardarOrden(orden) {
    sessionStorage.setItem('orden', orden);
}
function guardarCategoria(categoria) {
    sessionStorage.setItem('categoria', categoria);
}
function guardarGenero(genero) {
    sessionStorage.setItem('genero', genero);
}

// Inicializar carrito
let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

// Función para mostrar productos
function mostrar(genero, categoria, precio) {
    fetch("./js/productos.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            const filtroOrden = sessionStorage.getItem('orden');
            data.productos.sort((a, b) => {
                if (filtroOrden === 'Ascendente') {
                    return a.precio - b.precio;
                } else if (filtroOrden === 'Descendente') {
                    return b.precio - a.precio;
                }
            });

            let cade = '';
            data.productos.forEach(producto => {
                if (producto.precio >= sessionStorage.getItem('precio')) {
                    if (sessionStorage.genero != "all") {
                        if ((sessionStorage.genero == producto.genero) && ((sessionStorage.categoria == "all") || sessionStorage.categoria == producto.categoria)) {
                            cade += crearProductoHTML(producto);
                        }
                    } else {
                        if ((sessionStorage.categoria == "all") || (sessionStorage.categoria == producto.categoria)) {
                            cade += crearProductoHTML(producto);
                        }
                    }
                }
            });

            document.querySelector("#productos").innerHTML = cade;

            document.querySelectorAll(".btn-carrito").forEach(button => {
                button.addEventListener('click', event => {
                    event.preventDefault();
                    const productId = button.getAttribute('data-id');
                    const product = data.productos.find(p => p.id == productId);
                    agregarProductoAlCarrito(product);
                });
            });
        })
        .catch(error => {
            console.error('Error de fetch:', error);
        });
}

// Crear HTML del producto
function crearProductoHTML(producto) {
    return `
        <li>
            <img class="imagen" src="${producto.imagen}">
            <p class="producto-descripcion">${producto.nombre}</p>
            <p class="producto-precio">$ ${producto.precio}</p>
            <button class="btn-carrito" data-id="${producto.id}">Agregar Al Carrito</button>
        </li>
    `;
}

// Agregar producto al carrito
function agregarProductoAlCarrito(producto) {
    const index = carrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCantidadProductos();
    actualizarCarrito();
    //location.reload();
}

// Actualizar cantidad de productos en el carrito
function actualizarCantidadProductos() {
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    const cantidadProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    const cantidadProductosSpan = document.getElementById("cantidad-productos-carrito");
    if (cantidadProductosSpan) {
        if (cantidadProductos > 0) {
            cantidadProductosSpan.textContent = cantidadProductos;
            cantidadProductosSpan.style.display = 'inline'; // Mostrar el span
        } else {
            cantidadProductosSpan.style.display = 'none'; // Ocultar el span
        }
    } else {
        console.error('No se encontró el span con id "cantidad-productos-carrito"');
    }
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const carritoBody = document.querySelector("#carrito-body");
    const footer = document.querySelector("#tfooter");

    if (!carritoBody || !footer) return;

    carritoBody.innerHTML = '';

    if (carrito.length === 0) {
        footer.innerHTML = '<tr><td class="border-bottom-left border-bottom-right" colspan="4">¡No hay ningún elemento en el carrito!</td></tr>';
        return;
    }

    let totalCarrito = 0;

    carrito.forEach(item => {
        const precioTotal = item.precio * item.cantidad;
        totalCarrito += precioTotal;

        carritoBody.innerHTML += `
        <tr data-id="${item.id}">
            <td>${item.nombre}</td>
            
            <td>
                <div class="btn-group">
                    <button class="cantidad-btn" data-id="${item.id}" data-action="decrement">-</button>
                    <span>${item.cantidad}</span>
                    <button class="cantidad-btn" data-id="${item.id}" data-action="increment">+</button>
                    <button class="eliminar-btn" data-id="${item.id}">Eliminar</button>
                </div>
            </td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>$${precioTotal.toFixed(2)}</td>
        </tr>
        `;
    });

    footer.innerHTML = `
    <tr>
        <td class="border-bottom-left" colspan="3">Total</td>
        <td class="border-bottom-right">$${totalCarrito.toFixed(2)}</td>
    </tr>
    `;

    document.querySelectorAll('.cantidad-btn').forEach(button => {
        button.addEventListener('click', event => {
            const productId = button.getAttribute('data-id');
            const action = button.getAttribute('data-action');
            actualizarCantidad(productId, action);
        });
    });

    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', event => {
            const productId = button.getAttribute('data-id');
            eliminarProducto(productId);
        });
    });
}

// Actualizar cantidad de un producto en el carrito
function actualizarCantidad(productId, action) {
    const index = carrito.findIndex(p => p.id == productId);
    if (index !== -1) {
        if (action === 'increment') {
            carrito[index].cantidad += 1;
        } else if (action === 'decrement' && carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        }
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadProductos();
        actualizarCarrito();
    }
}

// Función para eliminar producto del carrito
function eliminarProducto(productId) {
    const index = carrito.findIndex(p => p.id == productId);
    if (index !== -1) {
        carrito.splice(index, 1);
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadProductos();
        actualizarCarrito();
    }
}
// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCantidadProductos();
    if (typeof actualizarCarrito === 'function') {
        actualizarCarrito();
    }
});

//Funcion para volver a prodcutos cuando hago click en Continuar comprando
document.getElementById('continuar-comprando').addEventListener('click', function() {
    window.location.href = 'productos.html';
  });
  