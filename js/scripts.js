document.getElementById('cotizador-seguro').addEventListener('submit', function (e) {
    e.preventDefault();

    const valorVehiculo = parseFloat(document.getElementById('valor-vehiculo').value);
    const edad = parseInt(document.getElementById('edad').value);

    const costoSeguro = calcularCostoSeguro(valorVehiculo, edad);
    document.getElementById('costo-seguro').textContent = formatCurrency(costoSeguro);
});

document.getElementById('simulador-credito').addEventListener('submit', function (e) {
    e.preventDefault();

    const monto = parseFloat(document.getElementById('monto').value);
    const tasa = parseFloat(document.getElementById('tasa').value);
    const plazo = parseInt(document.getElementById('plazo').value);

    const pagoMensual = calcularPagoMensual(monto, tasa, plazo);
    document.getElementById('pago-mensual').textContent = formatCurrency(pagoMensual);
});

function calcularCostoSeguro(valorVehiculo, edad) {
    const tasaBase = 0.03;
    const tasaEdad = edad < 25 ? 0.02 : 0;

    const costoSeguro = valorVehiculo * (tasaBase + tasaEdad);
    return costoSeguro;
}

function calcularPagoMensual(monto, tasa, plazo) {
    const tasaMensual = tasa / 100 / 12;
    const pagoMensual = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
    return pagoMensual;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(amount);
}


function llenarOpcionesPlazo() {
    const plazoSelect = document.getElementById('plazo');
    const minPlazo = 12; // 12 meses como plazo mínimo
    const maxPlazo = 120; // 120 meses como plazo máximo

    for (let i = minPlazo; i <= maxPlazo; i += 12) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        plazoSelect.appendChild(option);
    }
}

// Llamar a llenarOpcionesPlazo() cuando el contenido del documento esté cargado
document.addEventListener('DOMContentLoaded', function () {
    llenarOpcionesPlazo();
});
