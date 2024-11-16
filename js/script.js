let paginaActual = 1;

const prevPagBtn = document.getElementById('prev-page');
const nextPagBtn = document.getElementById('next-page');
const listaPersonajes = document.getElementById('character-list');

/* ---------------------------------------------------------------------
Cargar la lista de personajes de la API. Endspoints de la API: 
    /character (este es el que nos interesa)     /location     /episode
--------------------------------------------------------------------- */
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
            mostrarPersonajes.innerHTML = '<p> No se han podido obtener los datos. </p>';
            console.error(error);
        });
};

/* ---------------------------------------------------------------------
                        Mostrar los personajes 
Ojo porque aquí me faltaba limpiar el contenedor para que se renueven 
los personajes al pasar de página.
----------------------------------------------------------------------*/
const mostrarPersonajes = (personaje) => { //personaje es lo mismo que data.result de arriba.
    listaPersonajes.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos personajes.
    personaje.forEach((personaje) => {
        const contenedorPersonaje = document.createElement('div');
        contenedorPersonaje.classList.add('personaje');
        contenedorPersonaje.innerHTML = '<img src="' + personaje.image + '" alt="' + personaje.name + '">' +
                                        '<h3>Name: ' + personaje.name + '</h3>' +
                                        '<p>Species: ' + personaje.species + '</p>';
        listaPersonajes.appendChild(contenedorPersonaje);
    });
};

/* ---------------------------------------------------------------------
           Eventos ----- Página previa y página siguiente 
----------------------------------------------------------------------*/
prevPagBtn.addEventListener('click', () => {
    if (paginaActual > 1) {
        paginaActual--;
        obtenerPersonajes(paginaActual);
        
    }
});

nextPagBtn.addEventListener('click', () => {
    paginaActual++;
    obtenerPersonajes(paginaActual);
});

obtenerPersonajes(paginaActual); // mostrar personajes en la página principal. 
// como se inializa paginaActual en 1, va a empezar por la 1.

/* ---------------------------------------------------------------------
                   Función deshabilitar botón 
----------------------------------------------------------------------*/
const actualizarPagina = (info) => {
    
    // deshabilitar botón NEXT cuando llegue al número total de páginas
    if ( paginaActual >= info.pages) {
        nextPagBtn.disabled = true;
        nextPagBtn.classList.add('disabled')
    } else {
        nextPagBtn.disabled = false;
        nextPagBtn.classList.remove('disabled')
    }

    // deshabilitar botón PREV cuando prev sea null
    if ( info.prev === null) {
        prevPagBtn.disabled = true;
        prevPagBtn.classList.add('disabled')
    } else {
        prevPagBtn.disabled = false;
        prevPagBtn.classList.remove('disabled')
    }

};

/* ---------------------------------------------------------------------
                      Comentarios TA (Yolanda)
---------------------------------------------------------------------- */ 
/* el evento del botón debe estar integrado en la función.
pag > 1, botón previo habilitado, cualquier cosa que no sea esta: deshabilitado
    "ternario"
pagActual > númTotalPag : botón next, deshabilitado
*/

/* 
info.next: URL de la página siguiente, o null si no hay más páginas.
info.prev: URL de la página anterior, o null si estás en la primera página.
*/