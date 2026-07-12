/* --- FUNCIONALIDAD DATO AL AZAR --- */
const datos = [
    "Fue la primera artista residente de la NASA en 2002.",
    "Inventó el 'tape-bow violin' usando cinta magnética.",
    "Su tema O Superman dura más de 8 minutos y fue un éxito pop.",
    "Laurie Anderson estuvo casada con el músico Lou Reed.",
    "Colaboró con Brian Eno en el álbum Bright Red."
];

document.querySelector("#btn-dato").addEventListener("click", function() {
    const azar = Math.floor(Math.random() * datos.length);
    document.querySelector("#p-dato").innerText = datos[azar];
});

/* --- EJERCICIO DE GESTIÓN MUSICAL --- */
let repo = [];
let maxObras = 0, tasaTrans = 0, tasaCosto = 0;

// Paso 1: Configuración
document.querySelector("#btn-iniciar").addEventListener("click", function() {
    const c = Number(document.querySelector("#inp-cant").value);
    const t = Number(document.querySelector("#inp-trans").value);
    const m = Number(document.querySelector("#inp-costo").value);

    if (c > 0 && t >= 0 && m >= 0) {
        maxObras = c; tasaTrans = t; tasaCosto = m;
        document.querySelector("#total").innerText = maxObras;
        document.querySelector("#sec-config").style.display = "none";
        document.querySelector("#sec-carga").style.display = "block";
    } else { alert("Valores inválidos"); }
});

// Paso 2: Carga con Objetos y Validación
document.querySelector("#btn-guardar").addEventListener("click", function() {
    const n = document.querySelector("#o-nombre").value;
    const d = Number(document.querySelector("#o-dur").value);
    const p = Number(document.querySelector("#o-peso").value);

    if (n !== "" && d > 0 && p > 0) {
        repo.push({ nombre: n, duracion: d, peso: p }); // Uso de objetos
        document.querySelector("#cont").innerText = repo.length;
        document.querySelector("#f-obra").reset();

        if (repo.length === maxObras) {
            document.querySelector("#btn-guardar").disabled = true;
            document.querySelector("#sec-res").style.display = "block";
        }
    }
});

// Paso 3: Cálculos y Salida
document.querySelector("#btn-calc").addEventListener("click", function() {
    let durTotal = 0, pesoTotal = 0, masLarga = repo;

    for (let i = 0; i < repo.length; i++) {
        durTotal += repo[i].duracion;
        pesoTotal += repo[i].peso;
        if (repo[i].duracion > masLarga.duracion) { masLarga = repo[i]; }
    }

    const tDescarga = masLarga.peso * tasaTrans;
    const presupuesto = pesoTotal * tasaCosto * 12;

    document.querySelector("#pantalla").innerHTML = `
        <p><strong>1. Duración:</strong> Total ${durTotal.toFixed(2)} min / Promedio ${(durTotal/repo.length).toFixed(2)} min.</p>
        <p><strong>2. Obra más extensa:</strong> "${masLarga.nombre}" (${masLarga.duracion} min). Tiempo transferencia: ${tDescarga} ms.</p>
        <p><strong>3. Presupuesto anual:</strong> $${presupuesto.toFixed(2)} por el almacenamiento total.</p>
    `;
    document.querySelector("#btn-calc").disabled = true;
    document.querySelector("#btn-reset").style.display = "block";
});

document.querySelector("#btn-reset").addEventListener("click", function() { location.reload(); });