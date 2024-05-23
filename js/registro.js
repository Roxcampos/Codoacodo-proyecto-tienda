document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;

        const user = { nombres, apellidos, correo, contrasena };

        // Guardar usuario en sessionStorage
        sessionStorage.setItem('registeredUser', JSON.stringify(user));
        alert('Usuario registrado con éxito');

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = 'login.html';
    });
});
