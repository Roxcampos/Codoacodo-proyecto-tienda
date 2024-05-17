

// Este codigo es para que me guarde en sessionstorage la categoria y genero.

const enlaces = document.querySelectorAll('.store');

// Itera sobre cada enlace y agrega un listener de evento a cada uno
enlaces.forEach(enlace => {
    enlace.addEventListener('click', function(event) {
        // Previene el comportamiento predeterminado del enlace
        event.preventDefault();

        // Obtiene el valor del atributo data-genero
        const genero = this.getAttribute('data-genero');
        const categoria = this.getAttribute('data-categoria');
        
        // Guarda el valor del atributo data-genero en sessionStorage
        sessionStorage.setItem('genero', genero);
        sessionStorage.setItem('categoria', categoria);

        // Redirige a la página especificada en el enlace
        window.location.href = this.href;
        
        console.log("Género:",sessionStorage.getItem('genero')); // Salida: Género: hombre
        console.log("Categoría:", sessionStorage.getItem('categoria')); // Salida: Categoría: pantalones
    });
});


/*
function mostrar(categoria , genero , precio){
fetch("./js/productos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        //console.log(data);
        listaPersistente = data;
        let cade = ''; // Inicializa la variable fuera del bucle
        for (let producto of data.productos) {
            cade += `
            <li>
                <img class="imagen" src="${producto.imagen}">
                <p class="producto-descripcion">${producto.nombre}</p>
                <p class="producto-precio">$ ${producto.precio}</p>
            </li>
            `;
        }
        document.querySelector("#productos").innerHTML = cade;
    })
    .catch(error => {
        console.error('Error de fetch:', error);
    });
}
*/
