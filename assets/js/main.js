var carteInteractive = {};
var slider = {};


var config = {
  leaflet : "pk.eyJ1IjoicmFmYTE4NyIsImEiOiJjazBlejByNTUwazBqM290aTR6ZTl1NHZsIn0.uen14wB6LPlL_450lJOynA",
  api : " 7ace2945195aee91101f2aac7bc8bd926e097e9c",
  tokenJCD : "",
  lat : 51.505, 
  long : -0.09,
  zoom : 13
}

new Slider(document.querySelector('.slideshow'));
new Carte(document.getElementsByTagName("main")[0]);
new Reservation(document.getElementsByTagName("main")[0]);