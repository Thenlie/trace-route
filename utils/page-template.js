const getScript = route => {
    cords = []
    for (let i = 1; i < route.length; i++) {
        if (i % 2 === 0) {
            cords.push(route[i]);
        }
    }
    return `
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([-111.9338, 40.7849]),
            zoom: 4
        })
    });

    var points = [
        ${cords}
    ];

    for (var i = 0; i < points.length; i++) {
        points[i] = ol.proj.transform(points[i], 'EPSG:4326', 'EPSG:3857');
    }

    var featureLine = new ol.Feature({
        geometry: new ol.geom.LineString(points)
    });

    var vectorLine = new ol.source.Vector({});
    vectorLine.addFeature(featureLine);

    var vectorLineLayer = new ol.layer.Vector({
        source: vectorLine,
        style: new ol.style.Style({
            fill: new ol.style.Fill({ color: '#00FF00', weight: 4 }),
            stroke: new ol.style.Stroke({ color: '#00FF00', width: 2 })
        })
    });

    map.addLayer(vectorLineLayer);
    `
}

const locationList = (location) => {
    return `
                    <li class="location-item">${location}</li>`
};

const getHTML = (route, url) => {
    let locations = [];
    let htmlLocations = [];
    for (let i = 1; i < route.length; i++) {
        if (i % 2 !== 0) {
            locations.push(route[i]);
        }
    }
    for (let i = 0; i < locations.length; i++) {
        htmlLocations += locationList(locations[i]);
    }
    return `
    <!doctype html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.9.0/css/ol.css" type="text/css">
        <link rel="stylesheet" href="styles.css">
        <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.9.0/build/ol.js"></script>
        <title>OpenLayers example</title>
    </head>

    <header>
        <h2>The trace route to ${url}!</h2>
    </header>

    <body>
        <section class="map-container">
            <div id="map" class="map"></div>
        </section>
        
        <section>
            <div class="location-container">
                <ul class="location-list">
                            ${htmlLocations}
                </ul>
            </div>
        </section>
        
        <script src='./script.js'></script>
    </body>

    </html>
    `
}

module.exports = { getScript, getHTML }