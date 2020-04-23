

class Carte {
    constructor(domTarget)	{
      window.carteInteractive.carte = this;
      const dom = document.createElement("div");
      dom.id = "mapid";
      domTarget.appendChild(dom);
      this.mymap = L.map('mapid').setView([config.lat, config.long], config.zoom);
    }

    createMap(data){
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: config.leaflet
      }).addTo(this.mymap);

      //boucle sur data
    }

    async initMap(dataSrc){
      const data = await carteInteractive.dataManager.getMapPoints(dataSrc);
      this.createMap(data);
    }

    markerOnClick(){
      console.log(this);
      carteInteractive.reservartion.update()
    }	
}


/*

this.markers = {};

this.markers["marker"+id] = L.marker([51.5, -0.09], {icon: greenIcon})
    .addTo(map)
    .on('click', markerOnClick);


 */