var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function createMap(earthquakes,legend) {
    var satellite = L.tileLayer(MAPBOX_URL, {
        attribution: ATTRIBUTION,
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    var grayscale = L.tileLayer(MAPBOX_URL, {
        attribution: ATTRIBUTION,
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    var outdoors = L.tileLayer(MAPBOX_URL, {
        attribution: ATTRIBUTION,
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
    });

    var baseMaps = {
        "Satelitte": satellite,
        "Grayscale": grayscale,
        "Outdoors": outdoors
    };

    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    var myMap = L.map("map", {
        center: [34.052, -118.244],
        zoom: 2.5,
        layers: [satellite, earthquakes]
    });
    earthquakes.addTo(myMap);

    legend.addTo(myMap);

    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);
};

function circleSize(magnitude) {
    return magnitude * 3;
};

function circleColor(magnitude) {
    if (magnitude < 1) {
        return "#00FF00"
    } else if (magnitude < 2) {
        return "#C2FF00"
    } else if (magnitude < 3) {
        return "#FFE400"
    } else if (magnitude < 4) {
        return "#FFAF00"
    } else if (magnitude < 5) {
        return "#FF7B00"
    } else {
        return "#FF0000"
    };
};

function createFeatures(earthquakeData) {

    // var earthquakes = L.choropleth(earthquakeData, {
    //     filter: function(feature) {
    //         if (feature.properties.mag > 0) {
    //             return true;
    //         }
    //     },
    //     valueProperty: "mag",
    //     scale: ["#00ff00", "#ff0000"],
    //     steps: 6,
    //     mode: "q",
    //     style: {
    //         color: "#fff",
    //         weight: 1,
    //         fillOpacity: 0.8
    //     },

    //     onEachFeature: function (feature, layer) {
    //         layer.bindPopup(`<strong>${feature.properties.place}</strong><hr>Magnatude: ${feature.properties.mag}<br>${new Date(feature.properties.time)}`);
    //     }
    // });

    // var minMag = 0;
    // var maxMag = 0;
    // earthquakeData.features.forEach(d=>{ 
    //     if (d.properties.mag > maxMag) {
    //         maxMag = d.properties.mag;
    //     } else if (d.properties.mag < minMag) {
    //         minMag = d.properties.mag;
    //         console.log(d);
    //     }
    // })
    // console.log(`Min: ${minMag} - Max: ${maxMag}`);
    // console.log(earthquakes.options.limits);

    


    
    function onEachFeature(feature,layer) {
        layer.bindPopup(`<strong>${feature.properties.place}</strong><hr>Magnatude: ${feature.properties.mag}<br>${new Date(feature.properties.time)}`);
    }

    var earthquakes = L.geoJSON(earthquakeData,{
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: circleSize(feature.properties.mag),
                fillColor: circleColor(feature.properties.mag),
                color: "black",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });
        },
        onEachFeature: onEachFeature
    })

    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        // var limits = ["0-1","1-2","2-3","3-4","4-5","5+"]
        var limits = [0,1,2,3,4,5];
        // var colors = earthquakes.options.colors;
        var labels = [];

        // Add min & max
        // var legendInfo = 
        // "<div class=\"labels\">" +
        //     "<div class=\"min\">" + "0" + "</div>" +
        //     "<div class=\"max\">" + "5+" + "</div>" +
        // "</div>";

        // div.innerHTML = legendInfo;
        console.log(limits);

        // limits.forEach(function(limits, index) {
        //     console.log(index);
        // labels.push("<li style=\"background-color: white" + "\">" +
        // "<i style=\"background-color: " + circleColor(limits[index]) + "\"></i>" + 
        // limits[index] + (limits[index + 1] ? '&ndash;' + limits[index + 1] + "</li>" : "+" + "</li>"))
        // });

        // div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        for (var i = 0; i < limits.length; i++) {
            div.innerHTML +=
                '<i style="background:' + circleColor(limits[i]) + '"></i> ' +
                limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
        }
    
        return div;
    };

    createMap(earthquakes,legend);
};


d3.json(url, function (earthquakeData) {
    console.log(earthquakeData);
    createFeatures(earthquakeData);
});