var carteInteractive = {};

var config = {
  leaflet : "pk.eyJ1IjoicmFmYTE4NyIsImEiOiJjazBlejByNTUwazBqM290aTR6ZTl1NHZsIn0.uen14wB6LPlL_450lJOynA",
  api : "",
  tokenJCD : "",
  lat : 51.505, 
  long : -0.09,
  zoom : 13
}

new Carte(document.getElementsByTagName("main")[0]);
new Reservation(document.getElementsByTagName("main")[0]);