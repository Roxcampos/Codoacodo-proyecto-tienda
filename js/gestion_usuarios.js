document.addEventListener("DOMContentLoaded", function () {
    // Mostrar la pestaña seleccionada y ocultar las otras
    function openTabUsuario(tabName) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.style.display = 'none');
        document.getElementById(tabName).style.display = 'block';

        if (tabName === 'listar') {
            listarUsuarios();
        }
    }

    // Función para guardar un nuevo producto
    window.guardarUsuario = function () {
        const usuario = document.getElementById('usuarioCrear').value;
        const nombres = document.getElementById('nombresCrear').value;
        const apellidos = document.getElementById('apellidosCrear').value;
        const correo = document.getElementById('correoCrear').value;
        const contrasena = document.getElementById('contrasenaCrear').value;
        const rol = document.getElementById('rolCrear').value;

        const data = {
            usuario: usuario,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            contrasena: contrasena,
            rol: rol
        };

        fetch('https://tiendakappacode.pythonanywhere.com/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Usuario creado con éxito');
                // Limpiar el formulario
                document.getElementById('formCrearUsuario').reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("Ocurrió un error al crear el usuario.");
            console.error('Error:', error);
        });
    };

    // Función para buscar un producto para modificar
    window.buscarUsuarioModificar = function () {
        const id = document.getElementById('idModificar').value;

        fetch(`https://tiendakappacode.pythonanywhere.com/usuarios/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('usuarioModificar').value = data.usuario;
                document.getElementById('nombresModificar').value = data.nombres;
                document.getElementById('apellidosModificar').value = data.apellidos;
                document.getElementById('correoModificar').value = data.correo;
                document.getElementById('contrasenaModificar').value = data.contrasena;
                document.getElementById('rolModificar').value = data.rol;
            } else {
                alert('Usuario no encontrado');
            }
        })
        .catch(error => {
            alert("Ocurrió un error al buscar el usuario.");
            console.error('Error:', error);
        });
    };

    // Función para modificar un producto
    window.modificarUsuario = function () {
        const id = document.getElementById('idModificar').value;
        const usuario = document.getElementById('usuarioModificar').value;
        const nombres = document.getElementById('nombresModificar').value;
        const apellidos = document.getElementById('apellidosModificar').value;
        const correo = document.getElementById('correoModificar').value;
        const contrasena = document.getElementById('contrasenaModificar').value;
        const rol = document.getElementById('rolModificar').value;

        const data = {
            usuario: usuario,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            contrasena: contrasena,
            rol: rol
        };

        fetch(`https://tiendakappacode.pythonanywhere.com/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Usuario modificado con éxito');
                // Limpiar el formulario
                document.getElementById('formModificarUsuario').reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("Ocurrió un error al modificar el Usuario.");
            console.error('Error:', error);
        });
    };

    // Función para buscar un producto para eliminar
    window.buscarUsuarioEliminar = function () {
        const id = document.getElementById('idEliminar').value;

        fetch(`https://tiendakappacode.pythonanywhere.com/usuarios/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('usuarioEliminar').value = data.usuario;
                document.getElementById('nombresEliminar').value = data.nombres;
                document.getElementById('apellidosEliminar').value = data.apellidos;
                document.getElementById('correoEliminar').value = data.correo;
                document.getElementById('contrasenaEliminar').value = data.contrasena;
                document.getElementById('rolEliminar').value = data.rol;
            } else {
                alert('Usuario no encontrado');
            }
        })
        .catch(error => {
            alert("Ocurrió un error al buscar el usuario.");
            console.error('Error:', error);
        });
    };

    // Función para eliminar un usuario
    window.borrarUsuario = function () {
        const id = document.getElementById('idEliminar').value;

        fetch(`https://tiendakappacode.pythonanywhere.com/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Usuario eliminado con éxito');
                // Limpiar el formulario
                document.getElementById('formEliminarUsuario').reset();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("Ocurrió un error al eliminar el usuario.");
            console.error('Error:', error);
        });
    };

 
    window.openTabUsuario = openTabUsuario;
});
// función listar usuarios
function listarUsuarios() {
    fetch('https://tiendakappacode.pythonanywhere.com/usuarios', {
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
        const tablaUsuarios = document.getElementById('tablaUsuarios');
        const listaUsuariosBody = document.getElementById('listaUsuarios');
        listaUsuariosBody.innerHTML = ''; // Limpiar lista existente

        data.forEach(usuario => {
            const filaUsuario = document.createElement('tr');

            // Crear celdas de tabla con los datos del usuario
            filaUsuario.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.nombres}</td>
                <td>${usuario.apellidos}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.contrasena}</td>
                <td>${usuario.rol}</td>
                `;
            
            listaUsuariosBody.appendChild(filaUsuario);
        });
    })
    .catch(error => {
        alert("Ocurrió un error al listar los usuarios.");
        console.error('Error:', error);
    });
}
