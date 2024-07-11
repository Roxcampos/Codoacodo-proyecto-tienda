
document.addEventListener("DOMContentLoaded", function () {
    function openTab2(tabName) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.style.display = 'none');
        document.getElementById(tabName).style.display = 'block';

        // Verificar si se refiere a la lista de productos
        if (tabName === 'listar') {
            listarProductos();
        }
    }

    window.openTab2 = openTab2;
});

// Función para guardar un nuevo producto
function guardarProducto() {
    const nombre = document.getElementById('nombreCrear').value;
    const precio = document.getElementById('precioCrear').value;
    const stock = document.getElementById('stockCrear').value;
    const categoria = document.getElementById('categoriaCrear').value;
    const genero = document.getElementById('generoCrear').value;
    const imagen = document.getElementById('imagenCrear').value;

    const data = {
        nombre: nombre,
        precio: precio,
        stock: stock,
        categoria: categoria,
        genero: genero,
        imagen: imagen
    };

    fetch('https://tiendakappacode.pythonanywhere.com/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Producto creado con éxito');
                // Limpiar el formulario
                document.getElementById('formCrearProducto').reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("Ocurrió un error al crear el producto.");
            console.error('Error:', error);
        });
};

// Función para buscar un producto para modificar
function buscarProductoModificar() {
    const id = document.getElementById('idModificar').value;

    fetch(`https://tiendakappacode.pythonanywhere.com/productos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('nombreModificar').value = data.nombre;
                document.getElementById('precioModificar').value = data.precio;
                document.getElementById('stockModificar').value = data.stock;
                document.getElementById('categoriaModificar').value = data.categoria;
                document.getElementById('generoModificar').value = data.genero;
                document.getElementById('imagenModificar').value = data.imagen;
            } else {
                alert('Producto no encontrado');
            }
        })
        .catch(error => {
            alert("Ocurrió un error al buscar el producto.");
            console.error('Error:', error);
        });
};

// Función para modificar un producto
function modificarProducto() {
    const id = document.getElementById('idModificar').value;
    const nombre = document.getElementById('nombreModificar').value;
    const precio = document.getElementById('precioModificar').value;
    const stock = document.getElementById('stockModificar').value;
    const categoria = document.getElementById('categoriaModificar').value;
    const genero = document.getElementById('generoModificar').value;
    const imagen = document.getElementById('imagenModificar').value;

    const data = {
        nombre: nombre,
        precio: precio,
        stock: stock,
        categoria: categoria,
        genero: genero,
        imagen: imagen
    };

    fetch(`https://tiendakappacode.pythonanywhere.com/productos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(() => {
            alert('Producto modificado con éxito');
        })
        .catch(error => {
            alert("Ocurrió un error al modificar el producto.");
            console.error('Error:', error);
        });
};

// Función para buscar un producto para eliminar
function buscarProductoEliminar() {
    const id = document.getElementById('idEliminar').value;

    fetch(`https://tiendakappacode.pythonanywhere.com/productos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('nombreEliminar').value = data.nombre;
                document.getElementById('precioEliminar').value = data.precio;
                document.getElementById('stockEliminar').value = data.stock;
                document.getElementById('categoriaEliminar').value = data.categoria;
                document.getElementById('generoEliminar').value = data.genero;
                document.getElementById('imagenEliminar').value = data.imagen;
            } else {
                alert('Producto no encontrado');
            }
        })
        .catch(error => {
            alert("Ocurrió un error al buscar el producto.");
            console.error('Error:', error);
        });
};

// Función para eliminar un producto
function borrarProducto() {
    const id = document.getElementById('idEliminar').value;

    fetch(`https://tiendakappacode.pythonanywhere.com/productos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Producto eliminado con éxito');
                // Limpiar el formulario
                document.getElementById('formEliminarProducto').reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("Ocurrió un error al eliminar el producto.");
            console.error('Error:', error);
        });
};




// funcion listar productos
function listarProductos() {
    fetch('https://tiendakappacode.pythonanywhere.com/productos', {
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
            const tablaProductos = document.getElementById('tablaProductos');
            const listaProductosBody = document.getElementById('listaProductos');
            listaProductosBody.innerHTML = ''; // Limpiar lista existente

            data.forEach(producto => {
                const filaProducto = document.createElement('tr');

                // Crear celdas de tabla con los datos del producto
                filaProducto.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.categoria}</td>
                <td>${producto.genero}</td>
                <td><img src="${producto.imagen}" width="50" height="70" class="producto-imagen"></td>
            `;

                listaProductosBody.appendChild(filaProducto);
            });
        })
        .catch(error => {
            alert("Ocurrió un error al listar los productos.");
            console.error('Error:', error);
        });
}
