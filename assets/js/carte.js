class Carte {
    constructor(domTarget,name)	{
      window.webBike[name] = this;
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
    }

    async initMap(dataSrc){
      const data = await webBike.dataManager.getMapPoints(dataSrc);
      console.log(data);

      for(let i=0; i<data.length; i++){
        L.marker(
          [data[i].position.lat, data[i].position.lng], 
          {
            icon         : this.getIcon(data[i].available_bikes),
            qtyAvailable : data[i].available_bikes,
            qtyStation   : data[i].bike_stands,
            title        : this.getTitle(data[i].name),
          }
        ).addTo(this.mymap)
         .on('click', function(event) {
            const data = this.options;
            delete data.icon;
            window.webBike.reservation.make(this.options);
        });
      }
      this.createMap(data);
    }

    markerOnClick(){
      console.log(this);
      window.webBike.reservartion.update()
    }

    getTitle(pointName){
      return pointName.slice(pointName.indexOf(" - ")+3);
    }

    getIcon(qty){
      let iconUrl = "images/icons/icon-map-green.png";
      if (qty <= config.warningIconQty) iconUrl = "images/icons/icon-map-orange.png";
      if (qty===0)                      iconUrl = "images/icons/icon-map-red.png";
      return L.icon({
        iconUrl: iconUrl,
        iconSize:   [38, 38],
        iconAnchor: [19, 38],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
    }
}


/*

this.markers = {};

this.markers["marker"+id] = L.marker([51.5, -0.09], {icon: greenIcon})
    .addTo(map)
    .on('click', markerOnClick);


 */