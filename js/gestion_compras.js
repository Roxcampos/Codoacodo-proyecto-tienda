// funcion listar productos
function listarProductos() {
    fetch('https://tiendakappacode.pythonanywhere.com/compras', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const tablaProductos = document.getElementById('tablaCompras');
        const listaProductosBody = document.getElementById('listaCompras');
        listaProductosBody.innerHTML = ''; // Limpiar lista existente

        data.forEach(compra => {
            const filaCompra = document.createElement('tr');

            // Crear celdas de tabla con los datos del producto
            filaCompra.innerHTML = `
                <td>${compra.id}</td>
                <td>${compra.id_usuario}</td>
                <td>$${compra.id_producto}</td>
                <td>${compra.cantidad}</td>
                <td>${compra.importe_total}</td>
                <td>${compra.fecha_compra}</td>
            `;
            
            listaComprasBody.appendChild(filaCompra);
        });
    })
    .catch(error => {
        alert("Ocurrió un error al listar los compras.");
        console.error('Error:', error);
    });
}
