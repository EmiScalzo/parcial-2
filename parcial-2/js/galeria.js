// Array de objetos con al menos 5 obras
const obrasData = [
    { nombre: "Chalkroom", anio: 2017, img: "img/anderson-2.jpg" },
    { nombre: "Four Talks - The Weather", anio: 2021, img: "img/anderson-1.jpg" },
    { nombre: "Habeas Corpus", anio: 2015, img: "img/anderson-4.jpg" },
    { nombre: "Sidewalk", anio: 2012, img: "img/anderson-5.jpg" },
    { nombre: "To The Moon", anio: 2018, img: "img/anderson-6.jpg" }
];

const grid = document.querySelector("#grid-obras");

// Generar galería dinámicamente
for (let i = 0; i < obrasData.length; i++) {
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