const prevPagBtn = document.getElementById('prev-page');
const nextPagBtn = document.getElementById('next-page');
const listaPersonajes = document.getElementById('character-list');

/* Cargar la lista de personajes de la API. Endspoints de la API: 
    /character (este es el que nos interesa)     /location     /episode
*/
const obtenerPersonajes = (pagina) => {
    fetch("https://rickandmortyapi.com/api/character/?page=" + pagina)
        .then((response) => {
            if(!response.ok) {
                throw new Error('No ha sido posible acceder al enlace.');
            }
            return response.json();
        })
        .then((data) => {
            mostrarPersonajes(data.results); // el nombre y la especie de cada personaje están en el json en results.
            actualizarPagina(data.info); // la referencia a las páginas en el json está en info.
        })
        .catch((error) => {
            console.error(error);
        });
}

/* Mostrar los personajes */
const mostrarPersonajes = (personaje) => {
    personaje.forEach((personaje) => {
        const contenedorPersonaje = document.createElement('div');
        contenedorPersonaje.classList.add('personaje');
        contenedorPersonaje.innerHTML = '<img src="' + personaje.image + '" alt="' + personaje.name + '">' +
                                        '<h3>Name: ' + personaje.name + '</h3>' +
                                        '<p>Species: ' + personaje.species + '</p>';
        listaPersonajes.appendChild(contenedorPersonaje);
    });
}

/* Función para cambiar de página */
/* ******* no consigo dar con esto ******* */
const actualizarPagina = (info) => {
    if (info.prev == null){
        prevPagBtn.disabled;
    } else if (info.next == null) {
        nextPagBtn.disabled;
    } else {

    }
};

/* el evento del botón debe estar integrado en la función.
pag > 1, botón previo habilitado, cualquier cosa que no sea esta: deshabilitado
    "ternario"
pagActual > númTotalPag : botón next, deshabilitado
*/

/* 
info.next: URL de la página siguiente, o null si no hay más páginas.
info.prev: URL de la página anterior, o null si estás en la primera página.
*/

/* Página previa y página siguiente */
let paginaActual = 1;
prevPagBtn.addEventListener('click', () => {
    if (paginaActual > 1) {
        obtenerPersonajes(paginaActual - 1);
    }
});

nextPagBtn.addEventListener('click', () => {
    obtenerPersonajes(paginaActual + 1);
});

obtenerPersonajes(paginaActual); // mostrar personajes en la página principal