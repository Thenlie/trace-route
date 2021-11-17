
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
        [-111.891, 40.7608],[-111.891, 40.7608],[-74.1724, 40.7357],[-82.2073, 27.9634],[-74.1724, 40.7357],[-74.006, 40.7128],[139.761, 35.6632],[139.734, 35.6808],[139.734, 35.6808]
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
    