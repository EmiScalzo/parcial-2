let repo = []; 
let maxObras = 0, tasaTrans = 0, tasaCosto = 0;

// CONFIGURACIÓN INICIAL DEL SISTEMA
// Capturamos el botón de inicio por su ID y le asignamos un "escuchador" de eventos
document.querySelector("#btn-iniciar").addEventListener("click", function() {
    
    // CAPTURA Y CONVERSIÓN DE DATOS
    // Accedemos al contenido de los inputs usando .value y los convertimos de String a Number
    const c = Number(document.querySelector("#inp-cant").value);
    const t = Number(document.querySelector("#inp-trans").value);
    const m = Number(document.querySelector("#inp-costo").value);

    // VALIDACIÓN DE DATOS 
    // Verificamos mediante un condicional if que los valores sean lógicos (cant > 0)
    if (c > 0 && t >= 0 && m >= 0) {
        
        // ASIGNACIÓN A VARIABLES GLOBALES
        // Guardamos los datos validados para que estén disponibles en todo el programa
        maxObras = c; 
        tasaTrans = t; 
        tasaCosto = m;

        // SALIDA DE DATOS AL DOM 
        // Mostramos la cantidad total esperada en la interfaz usando innerText
        document.querySelector("#total").innerText = maxObras;

        // GESTIÓN DE VISIBILIDAD Y FLUJO (Control de ejecución solicitado)
        // Ocultamos la sección de configuración y habilitamos la de carga modificando el CSS
        document.querySelector("#sec-config").style.display = "none";
        document.querySelector("#sec-carga").style.display = "block";

    } else {
        // MENSAJE DE ERROR
        // Si los datos no pasan la validación, avisamos al usuario mediante una alerta
        alert("Valores inválidos. La cantidad debe ser mayor a 0.");
    }
});

// CARGA DE OBRAS
document.querySelector("#btn-guardar").addEventListener("click", function() {
    const n = document.querySelector("#o-nombre").value;
    const d = Number(document.querySelector("#o-dur").value);
    const p = Number(document.querySelector("#o-peso").value);

    if (n !== "" && d > 0 && p > 0) {
        // Guardamos cada obra como un objeto en el array
        repo.push({ nombre: n, duracion: d, peso: p }); 
        document.querySelector("#cont").innerText = repo.length;
        document.querySelector("#f-obra").reset();

        if (repo.length === maxObras) {
            document.querySelector("#btn-guardar").disabled = true;
            document.querySelector("#sec-res").style.display = "block";
            // Elimine el alert() para una mejor experiencia de usuario ya que podria resultar molesto luego de varias pruebas
        }
    }
});

// 3. CÁLCULOS Y RESULTADOS
document.querySelector("#btn-calc").addEventListener("click", function() {
    let durTotal = 0;
    let pesoTotal = 0;
    
    // Inicializamos con el primer elemento del array 
    let masLarga = repo[0];

    for (let i = 0; i < repo.length; i++) {
        durTotal += repo[i].duracion; // Acumulador de duración
        pesoTotal += repo[i].peso;    // Acumulador de peso

        // Lógica para encontrar el valor máximo 
        if (repo[i].duracion > masLarga.duracion) {
            masLarga = repo[i];
        }
    }

    const tDescarga = masLarga.peso * tasaTrans;
    const presupuestoAnual = pesoTotal * tasaCosto * 12; // x12 por ser un año completo

    // Utilizamos la propiedad .innerHTML para insertar una estructura HTML completa 
    // dentro del contenedor de resultados. Usamos "Template Strings" (comillas invertidas)
    // para incrustar las variables calculadas de forma legible.
    document.querySelector("#pantalla").innerHTML = `
        <article style="border: 1px solid #111; padding: 1rem; background: #eee;">
            <p><strong>1. Duración:</strong> Total ${durTotal.toFixed(2)} min. / Promedio ${(durTotal/repo.length).toFixed(2)} min.</p>
            <p><strong>2. Obra Extensa:</strong> "${masLarga.nombre}" (${masLarga.duracion} min). Tiempo descarga: ${tDescarga} ms.</p>
            <p><strong>3. Presupuesto Anual:</strong> $${presupuestoAnual.toFixed(2)} para el repositorio.</p>
        </article>
    `;

    // CONTROL DE FLUJO Y VISIBILIDAD 
    // Ocultamos la sección de carga para limpiar la interfaz al mostrar los resultados
    // modificando la propiedad style.display 
    document.querySelector("#sec-carga").style.display = "none";

    // Deshabilitamos el botón de calcular para evitar que el usuario repita el proceso 
    // innecesariamente, usando el atributo .disabled
    document.querySelector("#btn-calc").disabled = true;

    // Habilitamos el botón de reinicio para permitir que el sistema vuelva a empezar,
    // cambiando su estado visual a 'block' para que aparezca en pantalla
    document.querySelector("#btn-reset").style.display = "block";
});

document.querySelector("#btn-reset").addEventListener("click", function() {
    location.reload(); // Recarga la página 
});
