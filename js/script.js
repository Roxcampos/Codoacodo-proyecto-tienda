/*
fetch("../productos.json") 
    .then(response => response.json()) 
    .then(data => {console.log(data)
        for (let producto of data) {
            let cade = cade + `
            <li>
                <img class="imagen" src="${producto.imagen}">
                <p class="producto-descripcion">${producto.nombre}</p>
                <p class="producto-precio">$ ${producto.precio}</p>
            </li>
            `
            document.querySelector("#productos").innerHTML=cade
       
        }  
    }

);
console.log("hola")

*/
fetch("./js/productos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
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