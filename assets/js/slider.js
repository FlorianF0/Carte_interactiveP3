

class Slider {
	constructor(domTarget, domTarget2, name) {
		this.domSlider	= document.createElement("slider");
		this.dom				= document.createElement("slideReader");
		this.duree			= 5000;
		this.ecoule			= null;
		this.idFigure		= -1;
		this.name				= name;
		this.start			= Date.now();
		this.tempo;
		
		domTarget2.appendChild(this.domSlider);
		domTarget.appendChild(this.dom);

		// for(let i = 0; i < this.figures.lenght; i++) {
		// 	this.figure.id = this.figures[i] + i;
		// }

		// console.log("figures")

		
		this.sliderTemplate();
		this.btnTemplate();
		

		this.changeSlide();
		window.carteInteractive[name] = this;


	}

	sliderTemplate() {
		this.domSlider.innerHTML = `
			<figure id="figure0">
				<img src="images/img1_Paris.jpg">
				<figcaption>Louer un vélo pour vous déplacer rapidement dans Paris !</figcaption>
			</figure>

			<figure id="figure1">
				<img src="images/img3_velo_ConvertImage.jpg">
				<figcaption>Regardez la station la plus proche de votre position sur la map. Cliquez sur la station, vous aurez son adresse, et le nombre de vélos disponibles.</figcaption>
			</figure>

			<figure id="figure2">
				<img src="images/paris_electrique_3_ConvertImage.jpg">
				<figcaption>Il ne vous reste plus qu'à réserver le vélo grâce au formulaire puis à aller le chercher dans les 20 minutes qui suivent. Si vous dépassez ce temps, il faudra refaire une réservation du vélo.</figcaption>
			</figure>

			<figure id="figure3">
				<img src="images/paris_electrique_3_ConvertImage.jpg">
				<figcaption>Maintenant vous pouvez profiter d'une belle balade sous un soleil radieux.</figcaption>
			</figure>

			<figure id="figure4">
				<img src="images/paris_electrique_3_ConvertImage.jpg">
				<figcaption>Pour terminer, déposez le vélo dans une station où des places sont disponibles.</figcaption>
			</figure>

			<figure id="figure5">
				<img src="images/img1_Paris.jpg">
				<figcaption>Louer un vélo pour vous déplacer rapidement dans Paris !</figcaption>
			</figure>
			`;
	}

	btnTemplate(){
	    this.dom.innerHTML = `
	      	<button class="arrowPrev"  onClick="carteInteractive.${this.name}.changeSlide('+')" > <i class="fa fa-arrow-left" aria-hidden="true">  </i></button>
			<button class="playBtn" id="playPause"  onClick="carteInteractive.${this.name}.playPause()" >  		<i class="fa fa-pause" aria-hidden="true">       </i></button>
			<button class="arrowNext"  onClick="carteInteractive.${this.name}.changeSlide('-')" > <i class="fa fa-arrow-right" aria-hidden="true"> </i></button>
	    `;
  	}

  	changeSlide(sens="+") {
 	
		this.figures = document.querySelectorAll("figure");
  		// console.log(this.idFigure)
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
			if (i !== this.idFigure) document.getElementById(`figure${i}`).className="hidden";
		}

		document.getElementById(`figure${this.idFigure}`).className="show";
		this.start = Date.now();
		this.tempo = setTimeout(this.changeSlide.bind(this), this.duree, "+");
	}

	play() {
		if (this.ecoule === null) {
	    }
	}

	pause() {
		// this.idFigure = 1;
		document.getElementById(`figure${this.idFigure}`).style.animationPlayState = "running"; 
		this.tempo = setTimeout(this.changeSlide, this.duree - this.ecoule, "+");
		this.ecoule = null;
	}

	playPause(){
		if (this.playPauseBtn === undefined) this.playPauseBtn = document.getElementById("playPause");
		if (this.ecoule === null){
	    clearTimeout(this.tempo);
	    document.getElementById(`figure${this.idFigure}`).style.animationPlayState = "paused";
	    this.ecoule = Date.now()-this.start;
	    this.playPauseBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
	    return;
		}
		document.getElementById(`figure${this.idFigure}`).style.animationPlayState = "running"; 
		this.tempo = setTimeout(this.changeSlide, this.duree - this.ecoule, "+");
		this.ecoule = null;
	  this.playPauseBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
	}
}


