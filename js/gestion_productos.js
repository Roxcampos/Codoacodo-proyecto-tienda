document.addEventListener("DOMContentLoaded", function () {
    // Mostrar la pestaña seleccionada y ocultar las otras
    function openTab(tabName) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.style.display = 'none');
        document.getElementById(tabName).style.display = 'block';
    }

    // Función para guardar un nuevo producto
    window.guardarProducto = function () {
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
    window.buscarProductoModificar = function () {
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
    window.modificarProducto = function () {
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
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Producto modificado con éxito');
                // Limpiar el formulario
                document.getElementById('formModificarProducto').reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("Ocurrió un error al modificar el producto.");
            console.error('Error:', error);
        });
    };

    // Función para buscar un producto para eliminar
    window.buscarProductoEliminar = function () {
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
    window.borrarProducto = function () {
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

    window.openTab = openTab; // Exponer la función globalmente para usarla en el HTML
});