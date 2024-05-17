
  document.addEventListener('DOMContentLoaded', () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      actualizarCarrito(carrito);
  });

  function actualizarCarrito(carrito) {
      const carritoBody = document.querySelector("#carrito-body");
      const footer = document.querySelector("#tfooter");

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
              actualizarCantidad(carrito, productId, action);
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
          localStorage.setItem('carrito', JSON.stringify(carrito));
          actualizarCarrito(carrito);
      }
  }
