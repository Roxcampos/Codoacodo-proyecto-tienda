
function clickearFiltro(){
// Este codigo es para que me guarde en sessionstorage la categoria y genero.

const enlaces = document.querySelectorAll('.store');

// Itera sobre cada enlace y agrega un listener de evento a cada uno
enlaces.forEach(enlace => {
    enlace.addEventListener('click', function (event) {
        // Previene el comportamiento predeterminado del enlace
        event.preventDefault();

        // Obtiene el valor del atributo data-genero
        const genero = this.getAttribute('data-genero');
        const categoria = this.getAttribute('data-categoria');

        // Guarda el valor del atributo data-genero en sessionStorage
        // Usar beforeunload para asegurar que los datos se guarden
        window.addEventListener('beforeunload', function () {
            sessionStorage.setItem('genero', genero);
            sessionStorage.setItem('categoria', categoria);
        });
        new Promise((resolve) => {
            sessionStorage.setItem('genero', genero);
            sessionStorage.setItem('categoria', categoria);
            sessionStorage.setItem('precio', 0);
            resolve();
        }).then(() => {
            // Redirige a la página especificada en el enlace
            window.location.href = this.href;
        });
    });
});

}
/*
function mostrar(precio genero, categoria){
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

/*
// compara si el producto es mayor al precio seleccionado
if(producto.precio >= sessionStorage.getItem('precio') ){
    //compara si el genero es distinto de "todos"
    if(sessionStorage.genero != "all") {
        //si es distinto de todos pregunta si coincide el genero de la prenda y ademas la categoria es igual a todos o coincide la categoria con la categoria seleccionada.
        if((sessionStorage.genero == producto.genero)  && ((sessionStorage.categoria == "all")|| sessionStorage.categoria == producto.categoria ))
          //suma la cadena del producto a la variable "cade"
            cade += `
        <li>
            <img class="imagen" src="${producto.imagen}">
            <p class="producto-descripcion">${producto.nombre}</p>
            <p class="producto-precio">$ ${producto.precio}</p>
            <a href="#" class="btn-carrito" data-id="${producto.id}">Agregar Al Carrito</a>
        </li>
        `;
    }
    //si el genero todos entonces realiza la comparacion de si categoria  es igual a todos o coincide con la categoria del producto.
    else{
        if((sessionStorage.categoria == "all")|| (sessionStorage.categoria == producto.categoria ) ) {
            cade += `
            <li>
                <img class="imagen" src="${producto.imagen}">
                <p class="producto-descripcion">${producto.nombre}</p>
                <p class="producto-precio">$ ${producto.precio}</p>
                <a href="#" class="btn-carrito" data-id="${producto.id}">Agregar Al Carrito</a>
            </li>
            `;
        }
    }
}
*/
/*
  // Selecciona todos los elementos <a> con la clase 'store'
  const enlaces = document.querySelectorAll('.store');

  // Itera sobre cada enlace y agrega un listener de evento a cada uno
  enlaces.forEach(enlace => {
      enlace.addEventListener('click', function(event) {
          // Previene el comportamiento predeterminado del enlace
          event.preventDefault();

          // Obtiene el valor del atributo data-genero y data-categoria
          const genero = this.getAttribute('data-genero');
          const categoria = this.getAttribute('data-categoria');

          // Guarda los valores en sessionStorage
          sessionStorage.setItem('genero', genero);
          sessionStorage.setItem('categoria', categoria);
          sessionStorage.setItem('precio', 0);

          // Verificar que los datos se hayan guardado antes de redirigir
          setTimeout(() => {
              const storedGenero = sessionStorage.getItem('genero');
              const storedCategoria = sessionStorage.getItem('categoria');

              if (storedGenero === genero && storedCategoria === categoria) {
                  // Redirige a la página especificada en el enlace
                  window.location.href = enlace.href;
              } else {
                  console.error('Los datos no se guardaron correctamente en sessionStorage');
              }
          }, 100000); // 100 milisegundos de retraso para la verificación
      });
  });
  */

  /*funcion para lista administtrador*/
  function navigateAdmin() {
    const selectedOption = document.getElementById('admin-dropdown').value;
    if (selectedOption) {
        window.location.href = selectedOption;
    }
}



function index() {
    sessionStorage.setItem('genero', "all");
    sessionStorage.setItem('categoria', "all");
    sessionStorage.setItem('precio', 999999999);
    sessionStorage.setItem('orden',"Ascendente")
}


function toggleMenu() {
    const filtro = document.getElementById('filtro');
    filtro.classList.toggle('active');
}
function logout(){
sessionStorage.setItem('log', false)
window.location.href = 'index.html'; // Redirige a index.html
}
function logueado(){
    document.addEventListener('DOMContentLoaded', function () {
    // Supongamos que tienes una manera de verificar si el usuario está logueado
    // y obtener el nombre del usuario. Por ejemplo, podrías usar una cookie,
    // el almacenamiento local (localStorage), o una llamada a una API.

    // Aquí usaremos localStorage para este ejemplo:
    let usuarioLogueado = sessionStorage.getItem('usuario');

    if (usuarioLogueado) {
        // Si hay un usuario logueado, modifica el HTML
        console.log('log')
        let sesionContainer = document.getElementById('sesion-container');
        sesionContainer.innerHTML = `
            <span>Bienvenido, ${usuarioLogueado}</span>
        `;
    }
    else {
        console.log ('failed');
    }
});
}

function openTab(tabName) {
    var i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    document.querySelector(button[onclick="openTab('${tabName}')"]).className += " active";
}

// Inicializa la primera pestaña activa
document.addEventListener("DOMContentLoaded", function() {
    openTab('crear');
});

