
class Timer {
	constructor(domTarget, station, name, firstName, qtyAvaible){
		webBike.timer = this;
		this.domTimer = document.createElement("timer");

    	domTarget.appendChild(this.domTimer);

    	this.mainTemplate(station, firstName, name);
	}

	mainTemplate(station, firstName, name){
		// const timer    = window.webBike.dataManager.getSession("timer");

		this.domTimer.innerHTML = `
				Vélo réservé à la station ${station} par ${firstName} ${name}</br>
				Temps renstant : <compteur>20 min</compteur>
		`;

		this.t(config.timer, document.getElementsByTagName("compteur")[0]);
	}

	t(duree, domCompteur) {
		var counter = duree;

		this.startTimer = setInterval(function() {
			this.domCompteur = domCompteur;
			this.domCompteur.innerHTML = counter;
			counter--;

			webBike.timer.timeConversion(counter, domCompteur);
		}, 1000)
	}

	timeConversion(time, dom) {
		let d = time;
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


 