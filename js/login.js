function login() {
    //Manejo del login

  document.getElementById('loginForm').addEventListener('click', function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const usuario = document.getElementById('usuario').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();
        let mensajeError = document.getElementById('mensajeError');

        // Limpiar mensaje de error
        mensajeError = '';

        // Validar campos
        if (usuario === '' || contrasena === '') {
            mensajeError.textContent = 'Por favor, complete todos los campos.';
            return;
        }

        // URL del archivo Python alojado que verifica las credenciales
        const url = 'https://tiendakappacode.pythonanywhere.com/usuarios';

        // Realizar la solicitud para obtener la lista de usuarios
        fetch(url)
            .then(response => response.json())
            // Verificar las credenciales
            .then(data => {
                const user = data.find(user => user.usuario === usuario && user.contrasena === contrasena);
                if (user) {
                    // Guardar información en localStorage
                    sessionStorage.setItem('usuario', JSON.stringify({ usuario: usuario }));

                    // Redirigir a la página principal o la página de usuario
                    window.location.href = 'index.html';

                } else {
                    // Mostrar mensaje de error
                    alert('Credenciales incorrectas. Inténtalo de nuevo.');
                    //window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                mensajeError.textContent = 'Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
            });
    });

}