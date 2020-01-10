var url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function createMap(earthquakes) {
    var myMap = L.map("map", {
        center: [34.052, -118.244], 
        zoom: 2.5
    });

    var satellite = L.tileLayer(MAPBOX_URL, {
        attribution: ATTRIBUTION,
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    var grayscale = 

    var outdoors = 

};

function createFeatures(earthquakeData) {
    function onEachFeature(feature,layer) {
        layer.bindPopup(`<strong>${feature.properties.place}</strong><hr>Magnatude: ${feature.properties.mag}<br>${new Date(feature.properties.time)}`);
    }

    var earthquakes = L.geoJSON(earthquakeData,{
        onEachFeature: onEachFeature
    })
    createMap(earthquakes);
};


d3.json(url, function(earthquakeData) {
    console.log(earthquakeData);
    createFeatures(earthquakeData);
});