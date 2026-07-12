// Array de objetos con al menos 5 obras
const obrasData = [
    { nombre: "Chalkroom", anio: 2017, img: "img/anderson-2.jpg" },
    { nombre: "Four Talks - The Weather", anio: 2021, img: "img/anderson-1.jpg" },
    { nombre: "Habeas Corpus", anio: 2015, img: "img/anderson-4.jpg" },
    { nombre: "Sidewalk", anio: 2012, img: "img/anderson-5.jpg" },
    { nombre: "To The Moon", anio: 2018, img: "img/anderson-6.jpg" }
];

const grid = document.querySelector("#grid-obras");

// GENERACIÓN DINÁMICA DE CONTENIDO EN GALERIA
// Iniciamos una ESTRUCTURA REPETITIVA 'for' para recorrer el array.
// La condición 'i < obrasData.length' asegura que el ciclo se repita 
// tantas veces como elementos existan en la colección de obras.
for (let i = 0; i < obrasData.length; i++) {
    
    // MANIPULACIÓN DEL DOM Y ESTRUCTURA HTML
    // Utilizamos la propiedad .innerHTML para inyectar etiquetas directamente.
    // El operador de asignación combinado '+=' es fundamental aquí: 
    // permite "sumar" cada nueva obra al contenedor sin borrar las anteriores.
    grid.innerHTML += `
        <article class="obra-card">
            <img src="${obrasData[i].img}" alt="${obrasData[i].nombre}" class="img-obra">
            <h4>${obrasData[i].nombre}</h4>
            <p>Año: ${obrasData[i].anio}</p>
        </article>
    `;
}

// Funcionalidad de cambio de diseño
document.querySelector("#btn-estilo").addEventListener("click", function() {
    grid.classList.toggle("diseno-alternativo");
});