

class Slider {
	constructor(domTarget, domTarget2) {
		this.domSlider = document.createElement("slider");
		this.dom = document.createElement("slideReader");
		
		domTarget2.appendChild(this.domSlider);
		domTarget.appendChild(this.dom);
		
		this.sliderTemplate();
		this.btnTemplate();

		// for(let i = 0; i < this.figures.lenght; i++) {
		// 	this.figure.id = this.figures[i] + i;
		// }

		// console.log("figures")
		const duree   = 5000;
		this.ecoule  = null;
		this.start   = Date.now();
		this.tempo;
		this.idFigure = -1;

  		
		

		this.changeSlide();

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
	      	<button class="arrowPrev"  onClick="changeSlide('+'')" > <i class="fa fa-arrow-left" aria-hidden="true">  </i></button>
			<button class="pauseBtn"   onClick="${this.pause}" >  		<i class="fa fa-pause" aria-hidden="true">       </i></button>
			<button class="playBtn"    onClick="play()" >   		<i class="fa fa-play" aria-hidden="true">        </i></button>
			<button class="arrowNext"  onClick="changeSlide('-'')" > <i class="fa fa-arrow-right" aria-hidden="true"> </i></button>
	    `;
  	}

  	changeSlide(sens="+") {
 	
		this.figures = document.querySelectorAll("figure");
  		// console.log(this.idFigure)
  		clearTimeout(this.tempo);

		switch (sens) {
			case "+":
			  this.idFigure++;
			  if (this.idFigure === this.figures.length) idFigure = 0;
			  break;
			case "-":
			  this.idFigure--;
			  if (this.idFigure === -1) idFigure = this.figures.length-1;
			  break;
			default:
			  return;
		}
		console.log(this.idFigure)

		for(let i = 0; i < this.figures.length; i++){
			if (i !== this.idFigure) document.getElementById(`figure${i}`).className="hidden";
		}

		document.getElementById(`figure${this.idFigure}`).className="show";
		this.start = Date.now();
		this.tempo = setTimeout(this.changeSlide, this.duree, "+");
		console.log(this.tempo)
	}

	play() {
		if (this.ecoule === null) {
		    clearTimeout(this.tempo);
		    document.getElementById(`figure${this.idFigure}`).style.animationPlayState = "paused";
		    this.ecoule = Date.now()-this.start;
		    return;
	    }
	}

	pause() {
		// this.idFigure = 1;
		document.getElementById(`figure${this.idFigure}`).style.animationPlayState = "running"; 
		this.tempo = setTimeout(this.changeSlide, this.duree - this.ecoule, "+");
		this.ecoule = null;
	}
}


