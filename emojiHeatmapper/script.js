// Geometries
var point = new ol.geom.Point(
    ol.proj.transform([3,50], 'EPSG:4326', 'EPSG:3857')
    );

// Features
var pointFeature = new ol.Feature(point);

// Source and vector layer
var vectorSource = new ol.source.Vector();

var style = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'http://openlayers.org/en/v3.9.0/examples/data/icon.png'
    })
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: style
});

// Maps
var map = new ol.Map({
target: 'map',  // The DOM element that will contains the map
renderer: 'canvas', // Force the renderer to be used
layers: [
// Add a new Tile layer getting tiles from OpenStreetMap source
new ol.layer.Tile({
    source: new ol.source.OSM()
}),
vectorLayer
],
// Create a view centered on the specified location and zoom level
view: new ol.View({
    center: ol.proj.transform([2.1833, 41.3833], 'EPSG:4326', 'EPSG:3857'),
    zoom: 2
})
});

function emptyVector() {
  var features = vectorSource.getFeatures();

  for(var i = 0; i < features.length; i++) {
    vectorSource.removeFeature(features[i]);
  }
}

function updateMap() {
  if(vectorSource.getFeatures().length > 0) { // Empty the vector, if full
    emptyVector();
  }

var query = document.getElementById('searchField').value;

// Fetch loklak API data, and fill the vector
loklakFetcher.getTweets(query, function(tweets) {
    for(var i = 0; i < tweets.statuses.length; i++) {
        if(tweets.statuses[i].location_point !== undefined){
            // Creation of the point with the tweet's coordinates
            //  Coords system swap is required: OpenLayers uses by default
            //  EPSG:3857, while loklak's output is EPSG:4326
            var point = new ol.geom.Point(ol.proj.transform(tweets.statuses[i].location_point, 'EPSG:4326', 'EPSG:3857'));
            vectorSource.addFeature(new ol.Feature({  // Add the point to the data vector
                geometry: point
            }));
        }
    }
});
}

// Event listeners for updating the map
document.getElementById('searchButton').addEventListener('click', updateMap);

document.getElementById('searchField').addEventListener('keyup', function(e) {
  if(e.keyCode === 13) {
    updateMap();
  }
});
