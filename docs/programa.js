const mapa = L.map('mapa').setView([4.628178084725448, -74.0659272612135], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    attribution: '© OpenStreetMap contributors'

}).addTo(mapa);

L.marker([4.628178084725448, -74.0659272612135]).addTo(mapa)
    .bindPopup('Esta es nuestra universidad')
    .openPopup();

async function cargarPuntos() {
    try {
        const respuesta = await fetch("microondas.geojson");
        const datos = await respuesta.json();
        const listaFeatures = datos.features;

        for (let i = 0; i < listaFeatures.length; i++) {
            const feature = listaFeatures[i];

            if (
                feature &&
                feature.geometry &&
                Array.isArray(feature.geometry.coordinates) &&
                feature.geometry.coordinates.length === 2
            ) {
                const coords = feature.geometry.coordinates;
                const latLng = [coords[1], coords[0]];

                const propiedades = feature.properties;

                const marcador = L.marker(latLng).addTo(mapa);

                console.log(`Punto ${i + 1}`);
                console.log("Modelo:", propiedades.Modelo);
                console.log("Capacidad:", propiedades.Capacidad);
                console.log("Precio:", propiedades.Precio);
                console.log("Potencia:", propiedades.Potencia);
                console.log("Voltaje:", propiedades.Voltaje);
                console.log("---------------");

                const contenidoPopup = `
                    <strong>Modelo:</strong> ${propiedades.Modelo}<br>
                    <strong>Capacidad:</strong> ${propiedades.Capacidad} L<br>
                    <strong>Precio:</strong> $${propiedades.Precio}<br>
                    <strong>Potencia:</strong> ${propiedades.Potencia} W<br>
                    <strong>Voltaje:</strong> ${propiedades.Voltaje} V
                `;

                marcador.bindPopup(contenidoPopup);
            } else {
                console.warn(`Feature ${i} sin coordenadas válidas.`);
            }
        }
    } catch (error) {
        console.error("Error al cargar el archivo GeoJSON:", error);
    }
}

cargarPuntos();