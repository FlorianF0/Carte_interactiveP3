/**
* Class Carte
*
* Crée la carte.
* Gère la carte : point / données spécifique à la station.
*
*/

class Carte {
  /**
   * @param {string} domTarget  - Dom principal
   * @param {string} name       - Nom de la class
   *
   * @return {void}
   */
    constructor(domTarget, name)	{
      window.webBike[name] = this;
      const dom = document.createElement("div");
      dom.id = "mapid";
      domTarget.appendChild(dom);
    }

    createMap(){
      const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          // tileSize: 18,
          // zoomOffset: -1,
          accessToken: config.leaflet
      });
      this.mymap = L.map('mapid', {
        center : L.latLng(config.lat, config.long),
        zoom   : config.zoom, 
        layers : [tiles]
      });
    }

  /**
   * Enleve le numéro et le tiret du nom de la station -> on ne garde que le nom (lettre) de la station
   *
   * @param {string} pointName - Nom du point
   *
   * @returns {string}
   */
    getTitle(pointName){
      return pointName.slice(pointName.indexOf(" - ")+3);
    }

  /**
   * Affiche les icons personnalisés sur la map
   *
   * @param {number} qty - Quantité de vélo disponible
   * 
   * @returns {JSON} icon
   */
    getIcon(qty){
      let iconUrl = "images/icons/map-icon-greenTr.png";
      if (qty <= config.warningIconQty) iconUrl = "images/icons/map-icon-orangeTr.png";
      if (qty===0)                      iconUrl = "images/icons/map-icon-redTr.png";
      return L.icon({
        iconUrl: iconUrl,
        iconSize:   [28, 38],
        iconAnchor: [19, 38],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
    }

  /**
   * Crée la map, récupère les données. 
   * Ajout des cluster -> regroupement des points
   * Au clic sur l'icon, on affiche les données dans la partie "info station".
   *
   * @param {string} dataSrc - Donnée récupérer via l'API
   * 
   * @returns {JSON} data 
   * @returns {JSON} divIcon
   */
    async initMap(dataSrc){
      this.createMap();
      const data = await webBike.dataManager.getMapPoints(dataSrc);

      var markersCluster = new L.MarkerClusterGroup({
        maxClusterRadius: 70,
        iconCreateFunction: function (cluster) {
          const markers = cluster.getAllChildMarkers();
          const n = markers.length;
          return L.divIcon({ html: n, 
                             className: 'mycluster', 
                             iconSize: L.point(40, 40) 
                            });
        },
        //Disable all of the defaults:
        spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false
      });


      for(let i = 0; i < data.length; i++){
        const title = this.getTitle(data[i].name);
        var marker = L.marker(
          new L.latLng(data[i].position.lat, data[i].position.lng),
          {
            address      : data[i].address,
            icon         : this.getIcon(data[i].available_bikes),
            qtyAvailable : data[i].available_bikes,
            qtyStation   : data[i].bike_stands,
            status       : data[i].status,
            title        : title,
          }
        );
        marker.on('click', function(event) {
            const data = this.options;
            delete data.icon;

            if ( data.status === "CLOSED" || data.qtyAvailable === 0) {
              window.webBike.reservation.noReservationTemplate(this.options);
            }

            else {
              window.webBike.reservation.mainTemplate(this.options);
            }
        });
        marker.bindPopup(title);
        markersCluster.addLayer(marker);
      }
      this.mymap.addLayer(markersCluster);
    }  
}
