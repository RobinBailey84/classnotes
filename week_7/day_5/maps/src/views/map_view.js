const PubSub = require('../helpers/pub_sub.js');

const MapView = function(container){
  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")

  this.map = L.map(container).addLayer(osmLayer);

  this.marker = null;


}


MapView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:country-ready', (event) => {
    const country = event.detail;
    this.renderMap(country);

  })
}

MapView.prototype.renderMap = function(country){
  this.map.setView(country.latlng, 3);
  this.addMarker(country.latlng);
}

MapView.prototype.addMarker = function(coords){
  if (this.marker){
    this.map.removeLayer(this.marker);
  }

  this.marker = L.marker(coords);
  this.marker.addTo(this.map);
}

module.exports = MapView;
