var carteInteractive = {};
// var slider = {};


var config = {
  api      : "https://developer.jcdecaux.com/rest/vls/stations/lyon.json",
  leaflet  : "pk.eyJ1IjoicmFmYTE4NyIsImEiOiJjazBlejByNTUwazBqM290aTR6ZTl1NHZsIn0.uen14wB6LPlL_450lJOynA",
  tokenJCD : "7ace2945195aee91101f2aac7bc8bd926e097e9c",
  lat      : 51.505, 
  long     : -0.09,
  zoom     : 13
}

new DataManager("carteInteractive");
new Slider(document.querySelector('.slideshow'), document.querySelector('.container'), "slider");
new Carte(document.getElementsByTagName("main")[0]);
carteInteractive.carte.initMap(config.api, config.tokenJCD);
new Reservation(document.getElementsByTagName("main")[0]);