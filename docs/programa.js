var mapa = L.map('mapa').setView([4.628178084725448, -74.0659272612135], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    attribution: '© OpenStreetMap contributors'

}).addTo(mapa);

L.marker([4.628178084725448, -74.0659272612135]).addTo(mapa)
    .bindPopup('UD.')
    .openPopup();

async function cargarPuntos() {
    try {
        const respuesta = await fetch("microondas.geojson");
        const datos = await respuesta.json();
        const listaFeatures = datos.features;

        for (let i = 0; i < listaFeatures.length; i++) {
            const feature = listaFeatures[i];

                const coords = feature.geometry.coordinates;
                const propiedades = feature.properties;
                const marcador = L.marker(coords).addTo(mapa);

                console.log(marcador);

                

                const contenidoPopup = `
                    <strong>Modelo:</strong> ${propiedades.modelo}<br>
                    <strong>Capacidad:</strong> ${propiedades.capacidad} L<br>
                    <strong>Precio:</strong> $${propiedades.precio}<br>
                    <strong>Potencia:</strong> ${propiedades.potencia} W<br>
                    <strong>Voltaje:</strong> ${propiedades.voltaje} V
                `;

                marcador.bindPopup(contenidoPopup);
          
        }
    } catch (error) {
        console.error("Error al cargar el archivo GeoJSON:", error);
    }
}

cargarPuntos();