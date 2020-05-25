/**
* Class Slider
*
* Gére le slider -> défilement des slides / bouton prev/next & play/pause
*
*/

class Slider {
	
  /**
   * @param {string} domTarget 	- Dom principal
   * @param {string} domTarget2 - Dom secondaire
   * @param {string} name 		- Nom de la class
   *
   */
	constructor(domTarget, domTarget2, name) {
		window.webBike[name] = this;
		this.domSlider		 = document.createElement("slider");
		this.dom			 = document.createElement("slideReader");
		this.duree			 = 5000;
		this.ecoule			 = null;
		this.idFigure		 = -1;
		this.name			 = name;
		this.start			 = Date.now();
		this.tempo;
		
		domTarget2.appendChild(this.domSlider);
		domTarget.appendChild(this.dom);
	
		this.sliderTemplate();
		this.btnTemplate();		
		this.changeSlide();
	}

	btnTemplate(){
	    this.dom.innerHTML = `
	      	<button class="arrowPrev"  				onClick="webBike.${this.name}.changeSlide('-')" > 	<i class="fa fa-arrow-left" aria-hidden="true">  </i></button>
			<button class="playBtn" id="playPause"  onClick="webBike.${this.name}.playPause()" >  		<i class="fa fa-pause" aria-hidden="true">       </i></button>
			<button class="arrowNext"  				onClick="webBike.${this.name}.changeSlide('+')" > 	<i class="fa fa-arrow-right" aria-hidden="true"> </i></button>
	    `;
  	}

  /**
   * Change automatiquement les slides toutes les 5 sec. -> "sens = +" (défilement de gauche à droite)
   * Cette fonction est aussi appelé par les boutons prev / next, pour pouvoir changer manuelement les slides -> "sens = +" ou "sens = -".
   *  
   * @param {string} sens - Sens du défilement des slides
   *
   */
  	changeSlide(sens="+") {
 	
		this.figures = document.querySelectorAll("figure");
 
  		clearTimeout(this.tempo);
		switch (sens) {
			case "+":
			  this.idFigure++;
			  if (this.idFigure === this.figures.length) this.idFigure = 0;
			  break;
			case "-":
			  this.idFigure--;
			  if (this.idFigure === -1) this.idFigure = this.figures.length-1;
			  break;
			default:
			  return;
		}

		for(let i = 0; i < this.figures.length; i++){
			if (i !== this.idFigure) document.getElementById(`figure${i}`).className = "hidden";
		}

		document.getElementById(`figure${this.idFigure}`).className = "show";
		this.start = Date.now();
		this.tempo = setTimeout(this.changeSlide.bind(this), this.duree, "+");
	}

	playPause(){
		if (this.playPauseBtn === undefined) this.playPauseBtn = document.getElementById("playPause");

		if (this.ecoule === null){
		    clearTimeout(this.tempo);

		    document.getElementById(`figure${this.idFigure}`).style.animationPlayState = "paused";
		    this.ecoule = Date.now() - this.start;
		    this.playPauseBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';

		    return;
		}

		document.getElementById(`figure${this.idFigure}`).style.animationPlayState = "running"; 
		this.tempo = setTimeout(this.changeSlide, this.duree - this.ecoule, "+");
		this.ecoule = null;
	  	this.playPauseBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
	}

	sliderTemplate() {
		this.domSlider.innerHTML = `
			<figure id="figure0">
				<img src="images/img_lyon.jpg">
				<figcaption>1Louer un vélo pour vous déplacer rapidement dans Lyon !</figcaption>
			</figure>
			<figure id="figure1">
				<img src="images/img3_velo_ConvertImage.jpg">
				<figcaption>2Regardez la station la plus proche de votre position sur la map. Cliquez sur la station, vous aurez son adresse, et le nombre de vélos disponibles.</figcaption>
			</figure>
			<figure id="figure2">
				<img src="images/img_foret.jpg">
				<figcaption>3Il ne vous reste plus qu'à réserver le vélo grâce au formulaire puis à aller le chercher dans les 20 minutes qui suivent. Si vous dépassez ce temps, il faudra refaire une réservation du vélo.</figcaption>
			</figure>
			<figure id="figure3">
				<img src="images/jardin.jpg">
				<figcaption>4Pour terminer, déposez le vélo dans une station où des places sont disponibles.</figcaption>
			</figure>
			`;
	}
}