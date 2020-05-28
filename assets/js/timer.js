/**
 * Class Timer
 *
 * Génère le timer quand on réserve un vélo.
 *
 */


class Timer {

  /**
   * @constructor
   * @param {string} domTarget 	- Dom principal
   * @param {string} station 	- Nom de la station où l'on va réservé le vélo
   * @param {string} name 		- Nom de la personne qui réserve le vélo
   * @param {string} firstName 	- Prénom de la pesonne qui reverse le vélo
   *
   * @return {void}
   */
	constructor(domTarget, station, name, firstName){
		webBike.timer = this;
		this.domTimer = document.createElement("timer");

    	domTarget.appendChild(this.domTimer);

    	this.mainTemplate(station, firstName, name);
	}

  /**
   * @param {string} station	- Nom de la station où l'on va réservé le vélo
   * @param {string} name 		- Nom de la personne qui réserve le vélo
   * @param {string} firstName 	- Prénom de la pesonne qui reverse le vélo
   *
   * @return {void}
   */
	mainTemplate(station, firstName, name){
		this.domTimer.innerHTML = `
				Vélo réservé à la station ${station} par ${firstName} ${name}</br>
				Temps renstant : <compteur></compteur>
		`;

		this.time(config.timer, document.getElementsByTagName("compteur")[0]);
	}

  /**
   * @param {number} duree 	- Durée de la réservation
   * @param {string} dom 	- Dom où le timer sera affiché
   *
   * @return {void}
   */
	time(duree, dom) {
		var orderTime = window.webBike.dataManager.getSession("orderTime");

		if (orderTime != ""){
			var counter = Number(orderTime) + Number(duree);
		}

		else {
			var counter = Date.now() + duree;
		}

		this.startTimer = setInterval(function(){
			var timeNow   = Date.now()
			this.distance = counter - timeNow ;

			webBike.timer.timeConversion(this.distance, dom)
		}, 1000);
	}

  /**
   * @param {number} time 	- Durée de la reservation (en fonction de Date_now)
   * @param {string} dom 	- Dom lié au timer qui sera affiché
   *
   * @return {void}
   */
	timeConversion(time, dom) {
		let d = Math.round(time / 1000);
		let m = 0;
		let h = 0;
		this.domCompteur = document.getElementsByTagName("compteur")[0];

		if (d < 0) {
			this.domTimer.innerHTML = `Votre réservation à expiré.`;
			clearInterval(this.startTimer);
		}

		else  {
			if (d > 59) {
				m = Math.floor(d/60);
				d = d - m * 60;
			}

			if (m > 59) {
				h = Math.floor(m / 60);
				m = m - h * 60;
			}

			if (d < 10) {
				d = "0" + d;
			}

			if (m < 10) {
				m = "0" + m;
			}

			this.domCompteur.innerHTML = `${m} min ${d} s`;
		};
	}
}


 