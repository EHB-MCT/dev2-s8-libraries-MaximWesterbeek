"use strict";

const app = {
    map: null,
    init() {
        this.map = L.map('map').setView([50.846662, 4.352541], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        app.loadMarkers();

    },
    loadMarkers() {
        fetch('https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                data.records.forEach(function (toilets) {
                    let lon = toilets.geometry.coordinates[0];
                    let lat = toilets.geometry.coordinates[1];
                    console.log(lat, lon);
                    app.addMarker(lat, lon);
                });
            });

    },
    addMarker(lat, lon) {
        this.marker = L.marker([lat, lon]).addTo(this.map)
            .bindPopup('Lat: ' + lat + '<br> Lon: ' + lon)
            .openPopup();
    }
};

app.init();
