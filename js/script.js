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
            botonPagina(data.info); // la referencia a las páginas en el json está dentro de los corchetes de info.
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

/* Página previa y página siguiente */
let pagina = 0;
prevPagBtn.addEventListener('click', () => {
    if (pagina > 1) {
        pagina--;
        obtenerPersonajes(pagina);
    }
});

nextPagBtn.addEventListener('click', () => {
    pagina++;
    obtenerPersonajes(pagina);
});

obtenerPersonajes(pagina); // mostrar personajes en la página principal

