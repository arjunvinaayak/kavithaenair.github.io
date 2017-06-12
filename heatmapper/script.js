var vector = new ol.source.Vector();

var heatMap = new ol.layer.Heatmap({
  source: vector,
  blur: 9,
  radius: 3
});

var raster = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var map = new ol.Map({
  target: 'map',
  layers: [ raster, heatMap ],
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});
