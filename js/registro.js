document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById('formulario-registro');
    const mensajeError = document.getElementById('mensajeError');

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault(); // Previene el envío del formulario para poder validarlo con Javascript
        
        let usuario = document.getElementById('usuario').value;
        let nombres = document.getElementById('nombres').value;
        let apellidos = document.getElementById('apellidos').value;
        let email = document.getElementById('correo').value;
        let contrasena = document.getElementById('contrasena').value;
        let terminos = document.getElementById('terminos').checked;

        // Validación de los campos
        if (!validarUsuario(usuario)) {
           alert('El campo nombre de usuario no puede estar vacío.');
            return;
        }
        
        if (!validarNombreApellido(nombres)) {
            alert('El campo nombre no puede estar vacío y debe contener solo letras.');
            return;
        }
        
        if (!validarNombreApellido(apellidos)) {
            alert('El campo apellido no puede estar vacío y debe contener solo letras.');
            return;
        }

        if (email.trim() === '') {
            alert('El campo email no puede estar vacío.');
            return;
        }

        if (!validarEmail(email)) {
            alert('El formato del email no es válido.');
            return;
        }

        if (!validarContrasena(contrasena)) {
            alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.');
            return;
        }

        if (!terminos) {
            alert('Debes aceptar los términos y condiciones.');
            return;
        }

        // Si todo está correcto, se puede proceder a enviar el formulario o hacer alguna otra acción
      
        formulario.submit(); // Descomentar esta línea para permitir el envío del formulario
    });
    function validarUsuario(texto) {
        // Verifica que el texto no esté vacío y contenga solo letras (mayúsculas y minúsculas) o números
        return /^[a-zA-Z0-9]+$/.test(texto.trim());
    }
    function validarNombreApellido(texto) {
        return /^[a-zA-Z\s]+$/.test(texto.trim());
    }

    function validarEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validarContrasena(contrasena) {
        const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return re.test(contrasena);
    }
});
