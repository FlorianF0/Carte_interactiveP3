var webBike = {};


var config = {
  api            : "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon",
  leaflet        : "pk.eyJ1IjoiZmxvcmlhbmYiLCJhIjoiY2s5am8yaW83MDBtdzNmdWh1aGR6ZHJzdyJ9.gIbTpGVfCx8TAaZpl6FT6w",
  tokenJCD       : "7ace2945195aee91101f2aac7bc8bd926e097e9c",
  lat            : 45.756645,
  long           : 4.835673,
  zoom           : 13,
  warningIconQty : 5
}

new DataManager("webBike");
new Slider(document.querySelector('.slideshow'), document.querySelector('.container'), "slider");
new Carte(document.getElementsByTagName("main")[0],"carte");
webBike.carte.initMap(`${config.api}&apiKey=${config.tokenJCD}`);
new Reservation(document.getElementsByTagName("main")[0]);
