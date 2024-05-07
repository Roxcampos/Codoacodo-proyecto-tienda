/*Buscador
document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("searchInput");
    var list = document.getElementById("resultList");
    var items = list.getElementsByTagName("li");
    input.addEventListener("input", function () {
        var searchTerm = input.value.toLowerCase();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    });
});
*/
fetch(`productos.json`) 
    .then(response => response.json()) 
    .then(data => {console.log(data)
        let cad=`
        <li>
        <img class="imagen" src="${data.imagen}">
        <p class="producto-descripcion">${data.nombre}</p>
        <p class="producto-precio">$ ${data.precio}</p>
        </li>
        
        `
        

        document.querySelector("#productos").innerHTML=cad
    }

);
console.log("hola")