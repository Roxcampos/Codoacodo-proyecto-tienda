document.addEventListener('DOMContentLoaded', () => {
    actualizarCantidadProductos();
});

function actualizarCantidadProductos() {
    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    const cantidadProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    const cantidadProductosSpan = document.getElementById("cantidad-productos-carrito");
    if (cantidadProductosSpan) {
        cantidadProductosSpan.textContent = cantidadProductos;
    } else {
        console.error('No se encontró el span con id "cantidad-productos-carrito"');
    }
}

function actualizarCarrito() {
    const carritoBody = document.querySelector("#carrito-body");
    const emptyCartMessage = document.querySelector("#empty-cart-message");
    const totalRow = document.querySelector("#total-row");
    const totalPrice = document.querySelector("#total-price");

    const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

    carritoBody.innerHTML = '';

    if (carrito.length === 0) {
        emptyCartMessage.style.display = 'table-row';
        totalRow.style.display = 'none';
        return;
    } else {
        emptyCartMessage.style.display = 'none';
    }

    let totalCarrito = 0;

    carrito.forEach(item => {
        const precioTotal = item.precio * item.cantidad;
        totalCarrito += precioTotal;

        carritoBody.innerHTML += `
        <tr data-id="${item.id}">
            <td>${item.nombre}</td>
            <td>
                <button class="cantidad-btn" data-id="${item.id}" data-action="decrement">-</button>
                ${item.cantidad}
                <button class="cantidad-btn" data-id="${item.id}" data-action="increment">+</button>
            </td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>$${precioTotal.toFixed(2)}</td>
            <td class="sin-bordes"><button class="eliminar-btn" data-id="${item.id}">Eliminar</button></td>
        </tr>
        `;
    });

    totalPrice.textContent = `$${totalCarrito.toFixed(2)}`;
    totalRow.style.display = 'table-row';

    actualizarCantidadProductos(carrito);

    document.querySelectorAll('.cantidad-btn').forEach(button => {
        button.addEventListener('click', event => {
            const productId = button.getAttribute('data-id');
            const action = button.getAttribute('data-action');
            actualizarCantidad(carrito, productId, action);
        });
    });

    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', event => {
            const productId = button.getAttribute('data-id');
            eliminarProducto(carrito, productId);
        });
    });
}

function actualizarCantidad(carrito, productId, action) {
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

function eliminarProducto(carrito, productId) {
    const index = carrito.findIndex(p => p.id == productId);
    if (index !== -1) {
        carrito.splice(index, 1);
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadProductos();
        actualizarCarrito();
    }
}
