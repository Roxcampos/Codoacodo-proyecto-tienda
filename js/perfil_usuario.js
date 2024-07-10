
function cargarDatosUsuario() {
    document.getElementById('perfilForm').addEventListener('submit', function(event) {
        event.preventDefault();
    });

    let userId = sessionStorage.getItem('id');
    console.log("Cargando datos del usuario con ID:", userId);

    if (userId) {
        fetch(`https://tiendakappacode.pythonanywhere.com/usuarios/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar los datos del usuario');
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    document.getElementById('usuario').value = data.usuario || '';
                    document.getElementById('nombres').value = data.nombres || '';
                    document.getElementById('apellidos').value = data.apellidos || '';
                    document.getElementById('correo').value = data.correo || '';
                    document.getElementById('contrasena').value = data.contrasena || '';
                } else {
                    console.error('Datos de usuario no encontrados');
                }
            })
            .catch(error => console.error('Error al cargar datos del usuario:', error));
    } else {
        console.error('No se encontró el usuario en sessionStorage');
    }

    document.getElementById('modificarBtn').addEventListener('click', function() {
        document.querySelectorAll('#perfilForm .perfil-input').forEach(input => input.disabled = false);
        document.getElementById('modificarBtn').style.display = 'none';
        document.getElementById('guardarBtn').style.display = 'inline';
    });

    document.getElementById('guardarBtn').addEventListener('click', guardarDatosUsuario);
}

function guardarDatosUsuario() {
    let userId = sessionStorage.getItem('id');
    
    if (!userId) {
        console.error('No se encontró el usuario en sessionStorage');
        return;
    }

    const data = {
        id: userId,
        usuario: document.getElementById('usuario').value,
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        correo: document.getElementById('correo').value,
        contrasena: document.getElementById('contrasena').value
    };

    fetch(`https://tiendakappacode.pythonanywhere.com/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo guardar los datos del usuario');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Datos modificados con éxito');
            document.querySelectorAll('#perfilForm .perfil-input').forEach(input => input.disabled = true);
            document.getElementById('modificarBtn').style.display = 'inline';
            document.getElementById('guardarBtn').style.display = 'none';
        } else {
            alert(data.message || 'Hubo un problema al intentar guardar los datos del usuario');
        }
    })
    .catch(error => console.error('Error al guardar datos del usuario:', error));
}

cargarDatosUsuario();
guardarDatosUsuario();
