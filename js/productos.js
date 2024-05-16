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
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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
            cade += `
            <li>
                <img class="imagen" src="${producto.imagen}">
                <p class="producto-descripcion">${producto.nombre}</p>
                <p class="producto-precio">$ ${producto.precio}</p>
                <a href="#" class="btn-carrito" data-id="${producto.id}">Agregar Al Carrito</a>
            </li>
            `;
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
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoBody = document.querySelector("#carrito-body");
    const footer = document.querySelector("#footer");

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
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }
}