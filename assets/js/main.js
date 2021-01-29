var webBike = {};


var config = {
  api            : "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon",
  lat            : 45.756645,
  leaflet        : "pk.eyJ1IjoiZmxvcmlhbmYiLCJhIjoiY2s5am8yaW83MDBtdzNmdWh1aGR6ZHJzdyJ9.gIbTpGVfCx8TAaZpl6FT6w",
  long           : 4.835673,
  timer          : 20*60*1000,
  tokenJCD       : "7ace2945195aee91101f2aac7bc8bd926e097e9c",
  warningIconQty : 5,
  zoom           : 13,
}

new DataManager("webBike","l86pokgroek");
new Slider(document.querySelector('.slideshow'), document.querySelector('.container'), "slider");
new Carte(document.getElementsByTagName("main")[0],"carte");
webBike.carte.initMap(`${config.api}&apiKey=${config.tokenJCD}`);
new Reservation(document.getElementsByTagName("main")[0]);

if( window.webBike.dataManager.getSession("orderTime") != "") {
	const stationData = JSON.parse(window.webBike.dataManager.getSession("station"));
	var title        = stationData.station;

	new Timer(
        document.getElementsByTagName('body')[0],
        title, 
        window.webBike.dataManager.getLocal("prenom"), 
        window.webBike.dataManager.getLocal("nom"), 
      );
}
