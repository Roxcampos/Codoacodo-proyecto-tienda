/*Registro: En register.js, capturamos los datos del formulario de registro 
y los almacenamos en sessionStorage como un objeto JSON.
Inicio de Sesión: En login.js, capturamos los datos del formulario de inicio de sesión, recuperamos 
los datos del usuario almacenado 
desde sessionStorage y verificamos si las credenciales coinciden. 
Si coinciden, mostramos un mensaje de bienvenida.*/

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const welcomeMessage = document.getElementById('welcomeMessage');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const loginCorreo = document.getElementById('loginCorreo').value;
        const loginContrasena = document.getElementById('loginContrasena').value;

        const storedUser = JSON.parse(sessionStorage.getItem('registeredUser'));

        if (storedUser && storedUser.correo === loginCorreo && storedUser.contrasena === loginContrasena) {
            sessionStorage.setItem('loggedInUser', storedUser.nombres);
            welcomeMessage.textContent = `Bienvenido, ${storedUser.nombres}`;
        } else {
            alert('Correo o contraseña incorrectos');
        }
    });

    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        welcomeMessage.textContent = `Bienvenido, ${loggedInUser}`;
    }
});
