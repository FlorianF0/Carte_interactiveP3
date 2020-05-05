class Canva {
	constructor(domTarget) {
		webBike.canva = this;
		this.dom = document.createElement('canva');
		this.domP = document.querySelector('.reservation > p');

		domTarget.insertBefore(this.dom, this.domP);
		console.log(this.dom)
	}





}